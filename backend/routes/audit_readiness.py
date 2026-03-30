"""Audit Readiness — monthly self-assessment + Station Custodian verification routes."""
from datetime import datetime, timezone
from typing import Optional, Dict

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from core import db, _require_coach, send_mailersend_email, COACH_EMAIL, FRONTEND_URL
from routes.auth import get_current_user

router = APIRouter()

# ── Static metadata ───────────────────────────────────────────────────────────

DOMAIN_QUESTIONS = {
    "dq":  ["q1", "q2"],
    "da":  ["q3", "q4"],
    "hos": ["q5", "q6"],
    "vm":  ["q7", "q8"],
    "ia":  ["q9", "q10"],
    "ar":  ["q11"],
}

DOMAIN_LABELS = {
    "dq": "Driver Qualification",
    "da": "Drug & Alcohol",
    "hos": "HOS / ELD",
    "vm": "Vehicle Maintenance",
    "ia": "Insurance & Authority",
    "ar": "Audit Response",
}

CRITICAL_DOMAINS = {"ia", "ar"}

QUESTIONS = {
    "q1":  {"domain": "dq",  "text": "Do you have a complete DQ file for every active driver — application, MVR, medical certificate, road test, and Clearinghouse query all on file?"},
    "q2":  {"domain": "dq",  "text": "Have you run an annual Clearinghouse query for every driver within the past 12 months?"},
    "q3":  {"domain": "da",  "text": "Are you enrolled with a registered C/TPA and is your random testing pool currently active?"},
    "q4":  {"domain": "da",  "text": "Does every driver have a signed D&A policy acknowledgment on file, and was a pre-employment drug test completed before their first dispatch?"},
    "q5":  {"domain": "hos", "text": "Is your ELD registered with an FMCSA-approved provider and is the instruction card in every cab?"},
    "q6":  {"domain": "hos", "text": "Do you have 6 months of complete driver logs and supporting documents (BOLs, fuel receipts) on file?"},
    "q7":  {"domain": "vm",  "text": "Does every vehicle have a current annual inspection within the past 365 days?"},
    "q8":  {"domain": "vm",  "text": "Do you have DVIRs on file for every day each vehicle was operated in the past 90 days?"},
    "q9":  {"domain": "ia",  "text": "Does SAFER currently show 'Active' insurance with your exact legal name matching your policy?"},
    "q10": {"domain": "ia",  "text": "Is your MCS-150 current — filed within the past two years or since your last operational change?"},
    "q11": {"domain": "ar",  "text": "Have you reviewed and responded to all FMCSA correspondence, portal messages, and audit notices within required deadlines?"},
}

NOT_SURE_ACTIONS = {
    "q1":  "Verify that every active driver has all 12 required DQ file elements on file before next dispatch.",
    "q2":  "Verify annual Clearinghouse queries are current for all drivers. Required annually under 49 CFR 382.701.",
    "q3":  "Confirm your C/TPA enrollment is active and your driver is in the random testing pool.",
    "q4":  "Verify pre-employment drug test result is on file before this driver's next dispatch.",
    "q5":  "Locate your ELD registration confirmation and verify instruction card is physically present in every cab.",
    "q6":  "Pull 6 months of ELD logs and confirm supporting documents (BOLs, fuel receipts) are filed by trip.",
    "q7":  "Check annual inspection date on certificate. Must be within 365 days. Schedule immediately if overdue.",
    "q8":  "Pull DVIRs for the past 90 days. Any operating day without a DVIR on file is a violation.",
    "q9":  "Check SAFER now at safer.fmcsa.dot.gov. Verify 'Active' status and exact legal name match.",
    "q10": "Log into portal.fmcsa.dot.gov and confirm your MCS-150 due date. File if within 60 days.",
    "q11": "Log into FMCSA portal and review all correspondence. Any unanswered notice is an open liability.",
}

DOMAIN_COPY = {
    "dq": {
        "GREEN":  "Every active driver has a complete, current DQ file and annual Clearinghouse query on record.",
        "YELLOW": "Files exist but one element is uncertain. Check the action items below and confirm before next dispatch.",
        "RED":    "A driver is operating without a complete DQ file or without a Clearinghouse query. Automatic audit failure under 49 CFR Part 391. Fix before next dispatch.",
    },
    "da": {
        "GREEN":  "C/TPA enrollment active, random pool running, pre-employment tests and signed policies on file.",
        "YELLOW": "Program exists but one element is uncertain. Verify the item flagged below.",
        "RED":    "No C/TPA enrollment, no pre-employment test, or no written policy. Every driver is retroactively at risk.",
    },
    "hos": {
        "GREEN":  "ELD registered and in-cab. Logs complete. Supporting documents filed by trip.",
        "YELLOW": "Device registered but log documentation has gaps. Pull 6 months and verify.",
        "RED":    "ELD not registered with FMCSA or logs are missing. Roadside OOS order is the immediate consequence.",
    },
    "vm": {
        "GREEN":  "Every vehicle has a current annual inspection and DVIRs on file for every operating day.",
        "YELLOW": "Annual inspections current but DVIR documentation has gaps. Pull and file the past 90 days.",
        "RED":    "A vehicle is past its annual inspection date or no DVIR process exists. Vehicle OOS per unit.",
    },
    "ia": {
        "GREEN":  "SAFER shows Active with exact legal name match. MCS-150 is current.",
        "YELLOW": "Insurance active but MCS-150 timing is uncertain. Verify due date in the FMCSA portal.",
        "RED":    "SAFER does not show Active or name does not match. Authority revocation process can begin within days. Fix this before anything else on this dashboard.",
    },
    "ar": {
        "GREEN":  "All FMCSA correspondence answered within required deadlines. No open items.",
        "YELLOW": "Portal messages may be unreviewed. Log in and check for any pending correspondence.",
        "RED":    "An audit notice or FMCSA communication has not been responded to. Automatic Unsatisfactory rating begins. This overrides every other item on this dashboard.",
    },
}

ACTION_MAP = {
    "dq": {
        "RED": [
            "Open DQ File Builder Kit — Master Checklist (p.3). Audit every active driver file against all 12 elements.",
            "Log into FMCSA Clearinghouse. Run queries for any driver missing a pre-employment or annual query.",
            "Do not dispatch any driver whose file is incomplete.",
        ],
        "YELLOW": [
            "Identify the specific uncertain element from your check-in.",
            "Pull that document and verify it is current and on file.",
            "Update your dashboard answer after verifying.",
        ],
    },
    "da": {
        "RED": [
            "Contact your C/TPA today. Confirm enrollment is active and your driver is in the random testing pool.",
            "If no C/TPA: enroll immediately before next dispatch. Operating without one is a federal violation.",
            "Pull every driver's pre-employment test result and policy signature. File any that are missing.",
        ],
        "YELLOW": [
            "Identify which element is uncertain.",
            "Contact C/TPA or pull the relevant document.",
            "Update your dashboard after verifying.",
        ],
    },
    "hos": {
        "RED": [
            "Go to fmcsa.dot.gov/registration/eld and verify your device is on the registered provider list.",
            "Confirm instruction card is physically present in every cab.",
            "Pull 6 months of logs. Flag any gaps for immediate correction.",
        ],
        "YELLOW": [
            "Pull supporting documents (BOLs, fuel receipts) for the past 6 months. File by trip date.",
            "Update your dashboard after filing.",
        ],
    },
    "vm": {
        "RED": [
            "Pull annual inspection certificates for every unit. Any past 365 days must be scheduled immediately.",
            "Pull DVIRs for the past 90 days. File any missing days.",
            "Do not operate a vehicle past its annual inspection date.",
        ],
        "YELLOW": [
            "Pull DVIRs for the past 90 days.",
            "File any missing days.",
            "Update your dashboard after filing.",
        ],
    },
    "ia": {
        "RED": [
            "Go to safer.fmcsa.dot.gov right now. Check your authority status and insurance filing.",
            "If name mismatch: call your insurance agent today. File a corrected BMC-91X immediately.",
            "If lapsed: contact agent for reinstatement before operating another load.",
            "This overrides everything else on this list.",
        ],
        "YELLOW": [
            "Log into portal.fmcsa.dot.gov.",
            "Check your MCS-150 due date.",
            "If due within 60 days: file now, not at the deadline.",
        ],
    },
    "ar": {
        "RED": [
            "Log into portal.fmcsa.dot.gov immediately.",
            "Open all correspondence. Read every message.",
            "If an audit notice exists: respond today regardless of what else is on your schedule.",
            "This overrides everything else on this list.",
        ],
        "YELLOW": [
            "Log into FMCSA portal.",
            "Review all messages and confirm nothing is pending.",
            "Update your dashboard after confirming.",
        ],
    },
}


# ── Scoring logic ─────────────────────────────────────────────────────────────

def compute_scores(answers: dict) -> tuple:
    def v(k):
        return answers.get(k)

    # Driver Qualification
    if v("q1") == "NO" or v("q2") == "NO" or (v("q1") == "NOT SURE" and v("q2") == "NOT SURE"):
        dq = "RED"
    elif v("q1") == "NOT SURE" or v("q2") == "NOT SURE":
        dq = "YELLOW"
    elif v("q1") == "YES" and v("q2") == "YES":
        dq = "GREEN"
    else:
        dq = None

    # Drug & Alcohol
    if v("q3") == "NO" or v("q4") == "NO":
        da = "RED"
    elif v("q3") == "NOT SURE" or v("q4") == "NOT SURE":
        da = "YELLOW"
    elif v("q3") == "YES" and v("q4") == "YES":
        da = "GREEN"
    else:
        da = None

    # HOS / ELD
    if v("q5") == "NO" or v("q6") == "NO" or v("q5") == "NOT SURE":
        hos = "RED"
    elif v("q5") == "YES" and v("q6") == "NOT SURE":
        hos = "YELLOW"
    elif v("q5") == "YES" and v("q6") == "YES":
        hos = "GREEN"
    else:
        hos = None

    # Vehicle Maintenance
    if v("q7") == "NO" or v("q8") == "NO":
        vm = "RED"
    elif v("q7") == "YES" and v("q8") == "NOT SURE":
        vm = "YELLOW"
    elif v("q7") == "YES" and v("q8") == "YES":
        vm = "GREEN"
    else:
        vm = None

    # Insurance & Authority (critical)
    if v("q9") == "NO" or v("q9") == "NOT SURE":
        ia = "RED"
    elif v("q9") == "YES" and v("q10") == "NOT SURE":
        ia = "YELLOW"
    elif v("q9") == "YES" and v("q10") == "YES":
        ia = "GREEN"
    else:
        ia = None

    # Audit Response (critical)
    if v("q11") == "NO":
        ar = "RED"
    elif v("q11") == "NOT SURE":
        ar = "YELLOW"
    elif v("q11") == "YES":
        ar = "GREEN"
    else:
        ar = None

    colors = {"dq": dq, "da": da, "hos": hos, "vm": vm, "ia": ia, "ar": ar}
    scored = [c for c in colors.values() if c]

    if not scored:
        overall = "NOT STARTED"
    elif ia == "RED":
        overall = "RED"
    elif ar == "RED":
        overall = "RED"
    elif "RED" in scored:
        overall = "RED"
    elif sum(1 for c in scored if c == "YELLOW") >= 1:
        overall = "YELLOW"
    elif all(c == "GREEN" for c in scored):
        overall = "GREEN"
    else:
        overall = "IN PROGRESS"

    return colors, overall


# ── Helpers ───────────────────────────────────────────────────────────────────

def _blank_sc_verified():
    return {d: {"verified": False, "date": None, "note": "", "override": None}
            for d in DOMAIN_QUESTIONS}


def _blank_domain_map(default=None):
    return {d: default for d in DOMAIN_QUESTIONS}


async def _get_or_create(user_id: str) -> dict:
    doc = await db.audit_readiness.find_one({"userId": user_id}, {"_id": 0})
    if not doc:
        doc = {
            "userId": user_id,
            "domainAnswers": {},
            "domainColors": _blank_domain_map(),
            "domainUpdated": _blank_domain_map(),
            "overallStatus": "NOT STARTED",
            "lastCompleted": None,
            "scVerified": _blank_sc_verified(),
            "emailHistory": [],
        }
        await db.audit_readiness.insert_one(doc)
        doc.pop("_id", None)
    return doc


def _is_stale(ts, days: int = 45) -> bool:
    if not ts:
        return False
    if isinstance(ts, str):
        try:
            ts = datetime.fromisoformat(ts)
        except Exception:
            return False
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    return (datetime.now(timezone.utc) - ts).days >= days


async def _enrollment(user_id: str) -> bool:
    rec = await db.product_purchases.find_one(
        {"user_id": user_id, "has_access": True, "access_level": "cohort"},
        {"_id": 0},
    )
    return bool(rec)


# ── Carrier routes ────────────────────────────────────────────────────────────

@router.get("/audit-readiness")
async def get_readiness(request: Request):
    user = await get_current_user(request)
    uid = user["user_id"]
    doc = await _get_or_create(uid)
    enrolled = await _enrollment(uid)
    stale = [d for d, ts in (doc.get("domainUpdated") or {}).items() if ts and _is_stale(ts)]
    return {**doc, "enrolled": enrolled, "staleDomains": stale}


class AnswersPayload(BaseModel):
    answers: Dict[str, str]
    domain: Optional[str] = None


@router.post("/audit-readiness/answers")
async def submit_answers(payload: AnswersPayload, request: Request):
    user = await get_current_user(request)
    uid = user["user_id"]
    doc = await _get_or_create(uid)
    now = datetime.now(timezone.utc)

    merged = {**doc.get("domainAnswers", {}), **payload.answers}
    colors, overall = compute_scores(merged)

    domain_updated = dict(doc.get("domainUpdated") or {})
    if payload.domain:
        domain_updated[payload.domain] = now.isoformat()
    else:
        for domain, qs in DOMAIN_QUESTIONS.items():
            if any(merged.get(q) for q in qs) and not domain_updated.get(domain):
                domain_updated[domain] = now.isoformat()

    all_answered = all(merged.get(f"q{i}") for i in range(1, 12))
    last_completed = now.isoformat() if all_answered else doc.get("lastCompleted")

    await db.audit_readiness.update_one(
        {"userId": uid},
        {"$set": {
            "domainAnswers": merged,
            "domainColors": colors,
            "domainUpdated": domain_updated,
            "overallStatus": overall,
            "lastCompleted": last_completed,
        }},
    )
    return {"ok": True, "domainColors": colors, "overallStatus": overall}


# ── Admin routes ──────────────────────────────────────────────────────────────

@router.get("/admin/audit-readiness")
async def admin_list(request: Request):
    await _require_coach(request)
    records = await db.audit_readiness.find({}, {"_id": 0}).to_list(500)
    uids = [r["userId"] for r in records]
    users = await db.users.find({"user_id": {"$in": uids}}, {"_id": 0}).to_list(500)
    umap = {u["user_id"]: u for u in users}

    result = []
    for r in records:
        u = umap.get(r["userId"], {})
        stale = [d for d, ts in (r.get("domainUpdated") or {}).items() if ts and _is_stale(ts)]
        result.append({
            "userId": r["userId"],
            "name": u.get("name", "Unknown"),
            "email": u.get("email", ""),
            "overallStatus": r.get("overallStatus", "NOT STARTED"),
            "domainColors": r.get("domainColors", {}),
            "domainUpdated": r.get("domainUpdated", {}),
            "lastCompleted": r.get("lastCompleted"),
            "staleDomains": stale,
            "scVerified": r.get("scVerified", {}),
        })
    return result


@router.get("/admin/audit-readiness/{user_id}")
async def admin_get_carrier(user_id: str, request: Request):
    await _require_coach(request)
    doc = await db.audit_readiness.find_one({"userId": user_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="No record for this carrier")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0}) or {}
    stale = [d for d, ts in (doc.get("domainUpdated") or {}).items() if ts and _is_stale(ts)]
    return {**doc, "name": user.get("name", ""), "email": user.get("email", ""), "staleDomains": stale}


class SCVerifyPayload(BaseModel):
    verified: bool
    note: Optional[str] = ""
    override: Optional[str] = None


@router.put("/admin/audit-readiness/{user_id}/domain/{domain}")
async def admin_verify_domain(user_id: str, domain: str, payload: SCVerifyPayload, request: Request):
    await _require_coach(request)
    if domain not in DOMAIN_QUESTIONS:
        raise HTTPException(status_code=400, detail="Invalid domain")

    upd = {
        f"scVerified.{domain}.verified": payload.verified,
        f"scVerified.{domain}.note": payload.note or "",
        f"scVerified.{domain}.override": payload.override,
    }
    if payload.verified:
        upd[f"scVerified.{domain}.date"] = datetime.now(timezone.utc).isoformat()

    res = await db.audit_readiness.update_one({"userId": user_id}, {"$set": upd})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Carrier record not found")
    return {"ok": True}


@router.post("/admin/audit-readiness/{user_id}/send-email")
async def admin_send_email(user_id: str, request: Request):
    await _require_coach(request)
    doc = await db.audit_readiness.find_one({"userId": user_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="No readiness record")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    enrolled = await _enrollment(user_id)
    html = _build_email_html(user, doc, enrolled)
    month = datetime.now(timezone.utc).strftime("%B")
    subject = f"{month} Audit Readiness: Do These 3 Things First"

    await send_mailersend_email(
        to_email=user["email"],
        to_name=user.get("name", ""),
        subject=subject,
        html=html,
    )

    await db.audit_readiness.update_one(
        {"userId": user_id},
        {"$push": {"emailHistory": {
            "sentAt": datetime.now(timezone.utc).isoformat(),
            "overallStatus": doc.get("overallStatus", "NOT STARTED"),
            "triggeredBy": "manual",
        }}},
    )
    return {"ok": True}


# ── Email builder ─────────────────────────────────────────────────────────────

def _badge(color: str) -> str:
    styles = {
        "RED":    ("background:#7f1d1d;color:#fca5a5", "RED"),
        "YELLOW": ("background:#78350f;color:#fcd34d", "YELLOW"),
        "GREEN":  ("background:#14532d;color:#86efac", "GREEN"),
    }
    if color not in styles:
        return f'<span style="color:rgba(255,255,255,0.35);font-size:11px;font-family:monospace;">NOT STARTED</span>'
    s, label = styles[color]
    return f'<span style="{s};font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;padding:3px 8px;">{label}</span>'


def _build_email_html(user: dict, doc: dict, enrolled: bool) -> str:
    fname = (user.get("name") or "Carrier").split()[0]
    month = datetime.now(timezone.utc).strftime("%B")
    colors = doc.get("domainColors") or {}
    answers = doc.get("domainAnswers") or {}
    overall = doc.get("overallStatus", "NOT STARTED")

    # Priority domains: RED first, then YELLOW, critical first
    order = ["ia", "ar", "dq", "da", "hos", "vm"]
    priority = [(d, colors[d]) for d in order if colors.get(d) in ("RED", "YELLOW")]
    priority.sort(key=lambda x: 0 if x[1] == "RED" else 1)
    top3 = priority[:3]

    # Build priority list
    if top3:
        items_html = "".join(
            f'<p style="margin:0 0 7px;font-family:monospace;font-size:13px;color:rgba(255,255,255,0.85);">{i+1}. {DOMAIN_LABELS[d]} — {_badge(c)}</p>'
            for i, (d, c) in enumerate(top3)
        )
        priorities_html = f'<div style="border:1px solid rgba(255,255,255,0.08);padding:20px 24px;margin:0 0 24px;"><p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(197,160,89,0.7);margin:0 0 14px;">TOP PRIORITIES THIS MONTH</p>{items_html}</div>'
    else:
        priorities_html = '<p style="color:rgba(134,239,172,0.9);font-family:monospace;font-size:13px;margin:0 0 24px;">All domains GREEN. Confirm each domain remains current this month.</p>'

    # Domain detail blocks
    detail_blocks = ""
    for dk, dc in top3:
        copy_text = DOMAIN_COPY.get(dk, {}).get(dc, "")
        actions = ACTION_MAP.get(dk, {}).get(dc, [])
        border_color = "#ef4444" if dc == "RED" else "#fbbf24"
        label_color = "rgba(239,68,68,0.8)" if dc == "RED" else "rgba(251,191,36,0.8)"

        ns_html = ""
        for q in DOMAIN_QUESTIONS.get(dk, []):
            if answers.get(q) == "NOT SURE" and NOT_SURE_ACTIONS.get(q):
                ns_html += f'<p style="font-size:13px;color:#fcd34d;font-family:sans-serif;line-height:1.65;margin:0 0 8px;padding-left:12px;border-left:2px solid rgba(252,211,77,0.4);">Verify: {NOT_SURE_ACTIONS[q]}</p>'

        acts_html = "".join(
            f'<p style="font-size:13px;color:rgba(255,255,255,0.75);font-family:sans-serif;line-height:1.65;margin:0 0 6px;padding-left:12px;">→ {a}</p>'
            for a in actions
        )
        tool = "See your <strong>DQ File Builder Kit</strong> in the portal — Checklist on page 3." if enrolled else f'Access your portal at <a href="{FRONTEND_URL}/portal" style="color:#C5A059;">launchpathedu.com/portal</a>.'

        detail_blocks += f'''
<div style="border:1px solid rgba(255,255,255,0.08);border-left:3px solid {border_color};padding:20px 24px;margin:0 0 20px;">
  <p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:{label_color};margin:0 0 10px;">{DOMAIN_LABELS[dk]}: {dc}</p>
  <p style="font-size:14px;color:rgba(255,255,255,0.85);font-family:sans-serif;line-height:1.7;margin:0 0 14px;">{copy_text}</p>
  {ns_html}
  <p style="font-family:monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.6);margin:0 0 8px;">Actions for the next 7–30 days:</p>
  {acts_html}
  <p style="font-size:12px;color:rgba(255,255,255,0.35);font-family:sans-serif;margin:12px 0 0;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">Tool: {tool}</p>
</div>'''

    # Micro plan
    micro_html = ""
    if overall in ("RED", "YELLOW") and top3:
        d1_act = ACTION_MAP.get(top3[0][0], {}).get(top3[0][1], ["Review this domain."])[0]
        d3_act = ACTION_MAP.get(top3[1][0], {}).get(top3[1][1], ["Review flagged domain."])[0] if len(top3) > 1 else "Review remaining flagged domains."
        micro_html = f'''
<div style="border:1px solid rgba(197,160,89,0.2);padding:20px 24px;margin:0 0 28px;background:rgba(197,160,89,0.03);">
  <p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(197,160,89,0.7);margin:0 0 14px;">YOUR 7-DAY MICRO-PLAN</p>
  <p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;margin:0 0 8px;"><strong style="color:#fff;">Day 1–2:</strong> {d1_act}</p>
  <p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;margin:0 0 8px;"><strong style="color:#fff;">Day 3–4:</strong> {d3_act}</p>
  <p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;margin:0;"><strong style="color:#fff;">Day 5–7:</strong> Run your Monthly Audit Readiness Check again in the portal. Update any domain that has changed.</p>
</div>'''

    cur_month_year = datetime.now(timezone.utc).strftime("%B %Y")
    return f'''<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000f1f;">
<div style="max-width:600px;margin:0 auto;background:#000f1f;">
  <div style="border-bottom:1px solid rgba(197,160,89,0.2);padding:28px 32px 20px;">
    <p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(197,160,89,0.6);margin:0 0 4px;">LaunchPath Transportation EDU</p>
    <p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin:0;">{month} Audit Readiness Check</p>
  </div>
  <div style="padding:32px;">
    <p style="font-size:16px;color:rgba(255,255,255,0.88);line-height:1.7;margin:0 0 6px;">{fname},</p>
    <p style="font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;margin:0 0 28px;">Based on your {month} Audit Readiness Check, here is what to focus on this month — in order of impact.</p>
    <div style="border:1px solid rgba(255,255,255,0.08);padding:14px 20px;margin:0 0 20px;display:flex;align-items:center;gap:16px;">
      <span style="font-family:monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.3);">OVERALL STATUS</span>
      {_badge(overall)}
    </div>
    <div style="border:1px solid rgba(255,255,255,0.06);padding:12px 18px;margin:0 0 28px;background:rgba(255,255,255,0.02);">
      <p style="font-size:12px;color:rgba(255,255,255,0.4);font-family:monospace;line-height:1.8;margin:0;">Red = urgent. Fix now. Authority or audit at risk.<br>Yellow = important. Fix within 30 days.<br>Green = maintain. Confirm monthly.</p>
    </div>
    <div style="width:36px;height:1px;background:rgba(197,160,89,0.4);margin:0 0 28px;"></div>
    {priorities_html}
    <div style="width:36px;height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
    {detail_blocks}
    {micro_html}
    <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">
      <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.8;margin:0 0 16px;">When your dashboard shows all GREEN, you are in a minimum defensible position for a New Entrant Safety Audit. Run this check monthly so no FMCSA letter ever becomes a crisis.</p>
      <p style="font-size:14px;color:rgba(255,255,255,0.75);margin:0 0 4px;">— Vince Lawrence</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">Station Custodian, LP-VNL<br>LaunchPath Transportation EDU</p>
    </div>
  </div>
  <div style="background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.05);padding:16px 32px;">
    <p style="font-size:10px;color:rgba(255,255,255,0.2);font-family:monospace;letter-spacing:0.05em;margin:0;line-height:1.7;">LP-STD-001 · Current as of {cur_month_year}<br>LaunchPath is an educational program. Content does not constitute legal, compliance, or financial advice.</p>
  </div>
</div>
</body></html>'''
