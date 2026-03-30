"""Audit Readiness — monthly self-assessment + Station Custodian verification routes.
New config-driven implementation using QUESTION_BANK, DOMAIN_CONFIG, OVERALL_CONFIG.
Collection: monthly_checks (one document per check per user, not single-doc-per-user).
"""
from datetime import datetime, timezone
from typing import Optional, List

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from core import db, _require_coach, send_mailersend_email, FRONTEND_URL
from routes.auth import get_current_user

router = APIRouter()

# ─── Config ───────────────────────────────────────────────────────────────────

QUESTION_BANK = [
    {"id": "dq_01", "domain": "driver_qualification", "order": 1,
     "prompt": "Do you have a complete DQ file for every active driver — application, MVR, medical certificate, road test, and Clearinghouse query all on file?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "dq_02", "domain": "driver_qualification", "order": 2,
     "prompt": "Have you run an annual Clearinghouse query for every driver within the past 12 months?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "da_01", "domain": "drug_alcohol", "order": 1,
     "prompt": "Are you enrolled with a registered C/TPA and is your random testing pool currently active?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "da_02", "domain": "drug_alcohol", "order": 2,
     "prompt": "Does every driver have a signed D&A policy acknowledgment on file, and was a pre-employment drug test completed before their first dispatch?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "hos_01", "domain": "hos_eld", "order": 1,
     "prompt": "Is your ELD registered with an FMCSA-approved provider and is the instruction card in every cab?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0}},
    {"id": "hos_02", "domain": "hos_eld", "order": 2,
     "prompt": "Do you have 6 months of complete driver logs and supporting documents (BOLs, fuel receipts) on file?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "vm_01", "domain": "vehicle_maintenance", "order": 1,
     "prompt": "Does every vehicle have a current annual inspection within the past 365 days?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0}},
    {"id": "vm_02", "domain": "vehicle_maintenance", "order": 2,
     "prompt": "Do you have DVIRs on file for every day each vehicle was operated in the past 90 days?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "ia_01", "domain": "insurance_authority", "order": 1,
     "prompt": "Does SAFER currently show Active insurance with your exact legal name matching your policy?",
     "isCritical": True, "criticalFailOn": ["NO", "NOT_SURE"], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0}},
    {"id": "ia_02", "domain": "insurance_authority", "order": 2,
     "prompt": "Is your MCS-150 current — filed within the past two years or since your last operational change?",
     "isCritical": False, "criticalFailOn": [], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
    {"id": "ar_01", "domain": "audit_response", "order": 1,
     "prompt": "Have you reviewed and responded to all FMCSA correspondence, portal messages, and audit notices within required deadlines?",
     "isCritical": True, "criticalFailOn": ["NO"], "weights": {"YES": 1, "NO": 0, "NOT_SURE": 0.5}},
]

DOMAIN_CONFIG = {
    "driver_qualification": {"greenMin": 85, "yellowMin": 50, "criticalFailureForcesRed": False},
    "drug_alcohol":         {"greenMin": 85, "yellowMin": 50, "criticalFailureForcesRed": False},
    "hos_eld":              {"greenMin": 85, "yellowMin": 50, "criticalFailureForcesRed": False},
    "vehicle_maintenance":  {"greenMin": 85, "yellowMin": 50, "criticalFailureForcesRed": False},
    "insurance_authority":  {"greenMin": 100, "yellowMin": 50, "criticalFailureForcesRed": True},
    "audit_response":       {"greenMin": 100, "yellowMin": 50, "criticalFailureForcesRed": True},
}

OVERALL_CONFIG = {
    "greenMin": 85,
    "yellowMin": 60,
    "criticalOverrideDomains": ["insurance_authority", "audit_response"],
}

NOT_SURE_MESSAGES = {
    "dq_01": "Verify that every active driver has all 12 required DQ file elements on file before next dispatch.",
    "dq_02": "Verify annual Clearinghouse queries are current for all drivers. Required annually under 49 CFR 382.701.",
    "da_01": "Confirm your C/TPA enrollment is active and your driver is in the random testing pool.",
    "da_02": "Verify pre-employment drug test result is on file before this driver's next dispatch.",
    "hos_01": "Locate your ELD registration confirmation and verify instruction card is physically present in every cab.",
    "hos_02": "Pull 6 months of ELD logs and confirm supporting documents (BOLs, fuel receipts) are filed by trip.",
    "vm_01": "Check annual inspection date on certificate. Must be within 365 days. Schedule immediately if overdue.",
    "vm_02": "Pull DVIRs for the past 90 days. Any operating day without a DVIR on file is a violation.",
    "ia_01": "Check SAFER now at safer.fmcsa.dot.gov. Verify Active status and exact legal name match.",
    "ia_02": "Log into portal.fmcsa.dot.gov and confirm your MCS-150 due date. File if within 60 days.",
    "ar_01": "Log into FMCSA portal and review all correspondence. Any unanswered notice is an open liability.",
}

DOMAIN_LABELS = {
    "driver_qualification": "Driver Qualification",
    "drug_alcohol": "Drug & Alcohol",
    "hos_eld": "HOS / ELD",
    "vehicle_maintenance": "Vehicle Maintenance",
    "insurance_authority": "Insurance & Authority",
    "audit_response": "Audit Response",
}

DOMAIN_ORDER = [
    "driver_qualification", "drug_alcohol", "hos_eld",
    "vehicle_maintenance", "insurance_authority", "audit_response",
]

DOMAIN_COPY = {
    "driver_qualification": {
        "GREEN":  "Every active driver has a complete, current DQ file and annual Clearinghouse query on record.",
        "YELLOW": "Files exist but one element is uncertain. Check the action items below and confirm before next dispatch.",
        "RED":    "A driver is operating without a complete DQ file or without a Clearinghouse query. Automatic audit failure under 49 CFR Part 391. Fix before next dispatch.",
    },
    "drug_alcohol": {
        "GREEN":  "C/TPA enrollment active, random pool running, pre-employment tests and signed policies on file.",
        "YELLOW": "Program exists but one element is uncertain. Verify the item flagged below.",
        "RED":    "No C/TPA enrollment, no pre-employment test, or no written policy. Every driver is retroactively at risk.",
    },
    "hos_eld": {
        "GREEN":  "ELD registered and in-cab. Logs complete. Supporting documents filed by trip.",
        "YELLOW": "Device registered but log documentation has gaps. Pull 6 months and verify.",
        "RED":    "ELD not registered with FMCSA or logs are missing. Roadside OOS order is the immediate consequence.",
    },
    "vehicle_maintenance": {
        "GREEN":  "Every vehicle has a current annual inspection and DVIRs on file for every operating day.",
        "YELLOW": "Annual inspections current but DVIR documentation has gaps. Pull and file the past 90 days.",
        "RED":    "A vehicle is past its annual inspection date or no DVIR process exists. Vehicle OOS per unit.",
    },
    "insurance_authority": {
        "GREEN":  "SAFER shows Active with exact legal name match. MCS-150 is current.",
        "YELLOW": "Insurance active but MCS-150 timing is uncertain. Verify due date in the FMCSA portal.",
        "RED":    "SAFER does not show Active or name does not match. Authority revocation process can begin within days. Fix this before anything else on this dashboard.",
    },
    "audit_response": {
        "GREEN":  "All FMCSA correspondence answered within required deadlines. No open items.",
        "YELLOW": "Portal messages may be unreviewed. Log in and check for any pending correspondence.",
        "RED":    "An audit notice or FMCSA communication has not been responded to. Automatic Unsatisfactory rating begins. This overrides every other item on this dashboard.",
    },
}

ACTION_MAP = {
    "driver_qualification": {
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
    "drug_alcohol": {
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
    "hos_eld": {
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
    "vehicle_maintenance": {
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
    "insurance_authority": {
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
    "audit_response": {
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

# ── Scoring ───────────────────────────────────────────────────────────────────

def _compute_domain_result(domain_key: str, answers_list: list, submitted_at: str) -> dict:
    cfg = DOMAIN_CONFIG[domain_key]
    questions = [q for q in QUESTION_BANK if q["domain"] == domain_key]
    answers_map = {a["questionId"]: a["answer"] for a in answers_list if a["domain"] == domain_key}

    max_weight = float(len(questions))  # all YES weights = 1
    earned_weight = 0.0
    critical_failures = []
    not_sure_verify_lines = []
    yes_count = no_count = not_sure_count = 0

    for q in questions:
        answer = answers_map.get(q["id"])
        if not answer:
            continue
        if q["isCritical"] and answer in q["criticalFailOn"]:
            critical_failures.append(q["id"])
        if answer == "NOT_SURE" and q["id"] in NOT_SURE_MESSAGES:
            not_sure_verify_lines.append(NOT_SURE_MESSAGES[q["id"]])
        earned_weight += q["weights"].get(answer, 0)
        if answer == "YES":
            yes_count += 1
        elif answer == "NO":
            no_count += 1
        else:
            not_sure_count += 1

    answered = yes_count + no_count + not_sure_count
    score_percent = round((earned_weight / max_weight) * 100, 1) if (max_weight > 0 and answered > 0) else 0.0
    critical_failure = bool(critical_failures) and cfg["criticalFailureForcesRed"]

    if critical_failure:
        color = "RED"
    elif score_percent >= cfg["greenMin"]:
        color = "GREEN"
    elif score_percent >= cfg["yellowMin"]:
        color = "YELLOW"
    else:
        color = "RED"

    return {
        "domain": domain_key,
        "color": color,
        "scorePercent": score_percent,
        "yesCount": yes_count,
        "noCount": no_count,
        "notSureCount": not_sure_count,
        "criticalFailure": critical_failure,
        "criticalFailures": critical_failures,
        "notSureVerifyLines": not_sure_verify_lines,
        "domainUpdatedAt": submitted_at,
        "sc_verified": False,
        "sc_verifiedAt": None,
        "sc_verifiedBy": None,
        "sc_colorOverride": None,
        "sc_note": None,
    }


def _compute_overall_result(answers_list: list, domain_results: list) -> dict:
    """Critical override fires before any numeric scoring."""
    for domain_key in OVERALL_CONFIG["criticalOverrideDomains"]:
        crit_qs = [q for q in QUESTION_BANK if q["domain"] == domain_key and q["isCritical"]]
        answers_map = {a["questionId"]: a["answer"] for a in answers_list if a["domain"] == domain_key}
        for q in crit_qs:
            answer = answers_map.get(q["id"])
            if answer and answer in q["criticalFailOn"]:
                return {
                    "color": "RED",
                    "scorePercent": 0.0,
                    "criticalOverride": True,
                    "criticalOverrideReason": "Critical failure in Insurance & Authority or Audit Response",
                }

    if not domain_results:
        return {"color": "RED", "scorePercent": 0.0, "criticalOverride": False, "criticalOverrideReason": None}

    avg_score = round(sum(r["scorePercent"] for r in domain_results) / len(domain_results), 1)

    if avg_score >= OVERALL_CONFIG["greenMin"]:
        color = "GREEN"
    elif avg_score >= OVERALL_CONFIG["yellowMin"]:
        color = "YELLOW"
    else:
        color = "RED"

    return {"color": color, "scorePercent": avg_score, "criticalOverride": False, "criticalOverrideReason": None}


def _build_check_doc(user_id: str, answers_list: list, notes: str, company_name=None) -> dict:
    now = datetime.now(timezone.utc)
    submitted_iso = now.isoformat()
    check_month = now.strftime("%Y-%m")

    domain_results = [_compute_domain_result(dk, answers_list, submitted_iso) for dk in DOMAIN_ORDER]
    overall_result = _compute_overall_result(answers_list, domain_results)

    summary_json = {
        "userId": user_id,
        "companyName": company_name,
        "checkMonth": check_month,
        "submittedAt": submitted_iso,
        "overall": overall_result,
        "domains": [
            {k: dr[k] for k in ("domain", "color", "scorePercent", "yesCount", "noCount",
                                 "notSureCount", "criticalFailure", "criticalFailures", "notSureVerifyLines")}
            for dr in domain_results
        ],
        "answers": answers_list,
        "notes": notes,
    }

    return {
        "userId": user_id,
        "companyName": company_name,
        "checkMonth": check_month,
        "submittedAt": now,
        "notes": notes,
        "answers": answers_list,
        "domainResults": domain_results,
        "overallResult": overall_result,
        "summaryJson": summary_json,
    }


def _serialize_check(doc: dict) -> dict:
    """Remove _id, convert datetime to ISO string, return with checkId."""
    doc = dict(doc)
    check_id = str(doc.pop("_id", ""))
    submitted = doc.get("submittedAt")
    if isinstance(submitted, datetime):
        doc["submittedAt"] = submitted.isoformat()
    return {"checkId": check_id, **doc}


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
    enrolled = await _enrollment(uid)
    latest_raw = await db.monthly_checks.find_one(
        {"userId": uid},
        sort=[("submittedAt", -1)],
    )
    total = await db.monthly_checks.count_documents({"userId": uid})
    result = {"enrolled": enrolled, "latestCheck": None, "totalChecks": total}
    if latest_raw:
        result["latestCheck"] = _serialize_check(latest_raw)
    return result


class AnswerItem(BaseModel):
    questionId: str
    domain: str
    answer: str


class SubmitCheckPayload(BaseModel):
    answers: List[AnswerItem]
    notes: Optional[str] = ""
    companyName: Optional[str] = None


@router.post("/audit-readiness")
async def submit_check(payload: SubmitCheckPayload, request: Request):
    user = await get_current_user(request)
    uid = user["user_id"]

    answers_list = [
        {"questionId": a.questionId, "domain": a.domain, "answer": a.answer}
        for a in payload.answers
    ]
    doc = _build_check_doc(uid, answers_list, payload.notes or "", payload.companyName)

    insert_result = await db.monthly_checks.insert_one(doc)
    check_id = str(insert_result.inserted_id)
    doc.pop("_id", None)

    submitted = doc.get("submittedAt")
    if isinstance(submitted, datetime):
        doc["submittedAt"] = submitted.isoformat()

    return {"ok": True, "checkId": check_id, **doc}


@router.get("/audit-readiness/history")
async def get_history(request: Request):
    user = await get_current_user(request)
    uid = user["user_id"]
    checks = await db.monthly_checks.find(
        {"userId": uid},
        sort=[("submittedAt", -1)],
    ).to_list(100)
    return [_serialize_check(c) for c in checks]


@router.get("/audit-readiness/{check_id}")
async def get_check(check_id: str, request: Request):
    await get_current_user(request)
    try:
        oid = ObjectId(check_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid check ID")
    doc = await db.monthly_checks.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Check not found")
    return _serialize_check(doc)


# ── Admin routes ──────────────────────────────────────────────────────────────

@router.get("/admin/audit-readiness")
async def admin_list(request: Request):
    await _require_coach(request)
    pipeline = [
        {"$sort": {"submittedAt": -1}},
        {"$group": {"_id": "$userId", "latestCheck": {"$first": "$$ROOT"}, "totalChecks": {"$sum": 1}}},
    ]
    groups = await db.monthly_checks.aggregate(pipeline).to_list(500)
    uids = [g["_id"] for g in groups]
    users = await db.users.find({"user_id": {"$in": uids}}, {"_id": 0}).to_list(500)
    umap = {u["user_id"]: u for u in users}

    result = []
    for g in groups:
        uid = g["_id"]
        u = umap.get(uid, {})
        lc = g["latestCheck"]
        submitted = lc.get("submittedAt")
        submitted_iso = submitted.isoformat() if isinstance(submitted, datetime) else submitted
        result.append({
            "userId": uid,
            "name": u.get("name", "Unknown"),
            "email": u.get("email", ""),
            "totalChecks": g["totalChecks"],
            "latestCheckId": str(lc["_id"]),
            "latestCheckMonth": lc.get("checkMonth"),
            "latestSubmittedAt": submitted_iso,
            "overallResult": lc.get("overallResult", {}),
            "domainResults": lc.get("domainResults", []),
            "isStale": _is_stale(submitted),
        })
    return result


@router.get("/admin/audit-readiness/{user_id}")
async def admin_get_carrier(user_id: str, request: Request):
    await _require_coach(request)
    checks = await db.monthly_checks.find(
        {"userId": user_id},
        sort=[("submittedAt", -1)],
    ).to_list(100)
    if not checks:
        raise HTTPException(status_code=404, detail="No checks for this carrier")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0}) or {}
    return {
        "userId": user_id,
        "name": user.get("name", ""),
        "email": user.get("email", ""),
        "checks": [_serialize_check(c) for c in checks],
    }


class SCVerifyPayload(BaseModel):
    verified: bool
    note: Optional[str] = ""
    color_override: Optional[str] = None


@router.put("/admin/audit-readiness/check/{check_id}/domain/{domain}")
async def admin_verify_domain(check_id: str, domain: str, payload: SCVerifyPayload, request: Request):
    await _require_coach(request)
    if domain not in DOMAIN_CONFIG:
        raise HTTPException(status_code=400, detail="Invalid domain key")
    try:
        oid = ObjectId(check_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid check ID")

    upd = {
        "domainResults.$[elem].sc_verified": payload.verified,
        "domainResults.$[elem].sc_note": payload.note or "",
        "domainResults.$[elem].sc_colorOverride": payload.color_override,
    }
    if payload.verified:
        upd["domainResults.$[elem].sc_verifiedAt"] = datetime.now(timezone.utc).isoformat()

    res = await db.monthly_checks.update_one(
        {"_id": oid},
        {"$set": upd},
        array_filters=[{"elem.domain": domain}],
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Check not found")
    return {"ok": True}


@router.post("/admin/audit-readiness/{user_id}/send-email")
async def admin_send_email(user_id: str, request: Request):
    await _require_coach(request)
    latest = await db.monthly_checks.find_one(
        {"userId": user_id},
        sort=[("submittedAt", -1)],
    )
    if not latest:
        raise HTTPException(status_code=404, detail="No check found for this carrier")
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    enrolled = await _enrollment(user_id)
    html = _build_email_html(user, latest, enrolled)
    month_label = datetime.now(timezone.utc).strftime("%B")
    subject = f"{month_label} Audit Readiness: Do These 3 Things First"

    await send_mailersend_email(
        to_email=user["email"],
        to_name=user.get("name", ""),
        subject=subject,
        html=html,
    )

    await db.monthly_checks.update_one(
        {"_id": latest["_id"]},
        {"$push": {"emailHistory": {
            "sentAt": datetime.now(timezone.utc).isoformat(),
            "overallColor": latest.get("overallResult", {}).get("color", ""),
            "triggeredBy": "manual",
        }}},
    )
    return {"ok": True}


# ── Email builder ─────────────────────────────────────────────────────────────

def _badge_html(color: str) -> str:
    styles = {
        "RED":    ("background:#7f1d1d;color:#fca5a5", "RED"),
        "YELLOW": ("background:#78350f;color:#fcd34d", "YELLOW"),
        "GREEN":  ("background:#14532d;color:#86efac", "GREEN"),
    }
    if color not in styles:
        return '<span style="color:rgba(255,255,255,0.35);font-size:11px;font-family:monospace;">NOT STARTED</span>'
    s, label = styles[color]
    return f'<span style="{s};font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;padding:3px 8px;">{label}</span>'


def _build_email_html(user: dict, check: dict, enrolled: bool) -> str:
    fname = (user.get("name") or "Carrier").split()[0]
    month = datetime.now(timezone.utc).strftime("%B")
    cur_month_year = datetime.now(timezone.utc).strftime("%B %Y")

    overall = check.get("overallResult", {})
    overall_color = overall.get("color", "")
    domain_results = check.get("domainResults", [])
    dr_map = {dr["domain"]: dr for dr in domain_results}

    priority_order = [
        "insurance_authority", "audit_response",
        "driver_qualification", "drug_alcohol", "hos_eld", "vehicle_maintenance",
    ]
    priority = [
        (d, dr_map[d]["color"])
        for d in priority_order
        if d in dr_map and dr_map[d]["color"] in ("RED", "YELLOW")
    ]
    priority.sort(key=lambda x: 0 if x[1] == "RED" else 1)
    top3 = priority[:3]

    if top3:
        items_html = "".join(
            f'<p style="margin:0 0 7px;font-family:monospace;font-size:13px;color:rgba(255,255,255,0.85);">'
            f'{i+1}. {DOMAIN_LABELS[d]} — {_badge_html(c)}</p>'
            for i, (d, c) in enumerate(top3)
        )
        priorities_html = (
            f'<div style="border:1px solid rgba(255,255,255,0.08);padding:20px 24px;margin:0 0 24px;">'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;'
            f'color:rgba(197,160,89,0.7);margin:0 0 14px;">TOP PRIORITIES THIS MONTH</p>'
            f'{items_html}</div>'
        )
    else:
        priorities_html = (
            '<p style="color:rgba(134,239,172,0.9);font-family:monospace;font-size:13px;margin:0 0 24px;">'
            'All domains GREEN. Confirm each domain remains current this month.</p>'
        )

    detail_blocks = ""
    for dk, dc in top3:
        dr = dr_map.get(dk, {})
        copy_text = DOMAIN_COPY.get(dk, {}).get(dc, "")
        actions = ACTION_MAP.get(dk, {}).get(dc, [])
        border_color = "#ef4444" if dc == "RED" else "#fbbf24"
        label_color = "rgba(239,68,68,0.8)" if dc == "RED" else "rgba(251,191,36,0.8)"

        ns_html = "".join(
            f'<p style="font-size:13px;color:#fcd34d;font-family:sans-serif;line-height:1.65;'
            f'margin:0 0 8px;padding-left:12px;border-left:2px solid rgba(252,211,77,0.4);">Verify: {line}</p>'
            for line in dr.get("notSureVerifyLines", [])
        )
        acts_html = "".join(
            f'<p style="font-size:13px;color:rgba(255,255,255,0.75);font-family:sans-serif;'
            f'line-height:1.65;margin:0 0 6px;padding-left:12px;">→ {a}</p>'
            for a in actions
        )
        tool = (
            "See your <strong>DQ File Builder Kit</strong> in the portal — Checklist on page 3."
            if enrolled
            else f'Access your portal at <a href="{FRONTEND_URL}/portal" style="color:#C5A059;">launchpathedu.com/portal</a>.'
        )
        detail_blocks += (
            f'<div style="border:1px solid rgba(255,255,255,0.08);border-left:3px solid {border_color};'
            f'padding:20px 24px;margin:0 0 20px;">'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;'
            f'color:{label_color};margin:0 0 10px;">{DOMAIN_LABELS[dk]}: {dc}</p>'
            f'<p style="font-size:14px;color:rgba(255,255,255,0.85);font-family:sans-serif;line-height:1.7;'
            f'margin:0 0 14px;">{copy_text}</p>'
            f'{ns_html}'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;'
            f'color:rgba(197,160,89,0.6);margin:0 0 8px;">Actions for the next 7–30 days:</p>'
            f'{acts_html}'
            f'<p style="font-size:12px;color:rgba(255,255,255,0.35);font-family:sans-serif;margin:12px 0 0;'
            f'padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">Tool: {tool}</p>'
            f'</div>'
        )

    micro_html = ""
    if overall_color in ("RED", "YELLOW") and top3:
        d1_act = ACTION_MAP.get(top3[0][0], {}).get(top3[0][1], ["Review this domain."])[0]
        d3_act = (
            ACTION_MAP.get(top3[1][0], {}).get(top3[1][1], ["Review flagged domain."])[0]
            if len(top3) > 1
            else "Review remaining flagged domains."
        )
        micro_html = (
            f'<div style="border:1px solid rgba(197,160,89,0.2);padding:20px 24px;margin:0 0 28px;'
            f'background:rgba(197,160,89,0.03);">'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;'
            f'color:rgba(197,160,89,0.7);margin:0 0 14px;">YOUR 7-DAY MICRO-PLAN</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;'
            f'margin:0 0 8px;"><strong style="color:#fff;">Day 1–2:</strong> {d1_act}</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;'
            f'margin:0 0 8px;"><strong style="color:#fff;">Day 3–4:</strong> {d3_act}</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.8);font-family:sans-serif;line-height:1.65;'
            f'margin:0;"><strong style="color:#fff;">Day 5–7:</strong> Run your Monthly Audit Readiness Check '
            f'again in the portal. Update any domain that has changed.</p>'
            f'</div>'
        )

    return (
        f'<!DOCTYPE html><html><head><meta charset="UTF-8">'
        f'<meta name="viewport" content="width=device-width,initial-scale=1"></head>'
        f'<body style="margin:0;padding:0;background:#000f1f;">'
        f'<div style="max-width:600px;margin:0 auto;background:#000f1f;">'
        f'<div style="border-bottom:1px solid rgba(197,160,89,0.2);padding:28px 32px 20px;">'
        f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;'
        f'color:rgba(197,160,89,0.6);margin:0 0 4px;">LaunchPath Transportation EDU</p>'
        f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;'
        f'color:rgba(255,255,255,0.25);margin:0;">{month} Audit Readiness Check</p>'
        f'</div>'
        f'<div style="padding:32px;">'
        f'<p style="font-size:16px;color:rgba(255,255,255,0.88);line-height:1.7;margin:0 0 6px;">{fname},</p>'
        f'<p style="font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;margin:0 0 28px;">'
        f'Based on your {month} Audit Readiness Check, here is what to focus on this month — in order of impact.</p>'
        f'<div style="border:1px solid rgba(255,255,255,0.08);padding:14px 20px;margin:0 0 20px;">'
        f'<span style="font-family:monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;'
        f'color:rgba(255,255,255,0.3);">OVERALL STATUS</span>&nbsp;&nbsp;{_badge_html(overall_color)}</div>'
        f'<div style="border:1px solid rgba(255,255,255,0.06);padding:12px 18px;margin:0 0 28px;'
        f'background:rgba(255,255,255,0.02);">'
        f'<p style="font-size:12px;color:rgba(255,255,255,0.4);font-family:monospace;line-height:1.8;margin:0;">'
        f'Red = urgent. Fix now. Authority or audit at risk.<br>'
        f'Yellow = important. Fix within 30 days.<br>'
        f'Green = maintain. Confirm monthly.</p></div>'
        f'<div style="width:36px;height:1px;background:rgba(197,160,89,0.4);margin:0 0 28px;"></div>'
        f'{priorities_html}'
        f'<div style="width:36px;height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>'
        f'{detail_blocks}'
        f'{micro_html}'
        f'<div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;">'
        f'<p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.8;margin:0 0 16px;">'
        f'When your dashboard shows all GREEN, you are in a minimum defensible position for a New Entrant Safety Audit. '
        f'Run this check monthly so no FMCSA letter ever becomes a crisis.</p>'
        f'<p style="font-size:14px;color:rgba(255,255,255,0.75);margin:0 0 4px;">— Vince Lawrence</p>'
        f'<p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">'
        f'Station Custodian, LP-VNL<br>LaunchPath Transportation EDU</p>'
        f'</div></div>'
        f'<div style="background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.05);padding:16px 32px;">'
        f'<p style="font-size:10px;color:rgba(255,255,255,0.2);font-family:monospace;letter-spacing:0.05em;'
        f'margin:0;line-height:1.7;">LP-STD-001 · Current as of {cur_month_year}<br>'
        f'LaunchPath is an educational program. Content does not constitute legal, compliance, or financial advice.</p>'
        f'</div></div></body></html>'
    )
