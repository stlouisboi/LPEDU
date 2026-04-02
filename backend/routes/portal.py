"""Portal routes: access, checkout, module-urls, PDFs, ground0 progress/waitlist, signal."""
import asyncio
import random
import string
import uuid
from datetime import datetime, timezone, timedelta, date
from typing import Optional, List

import stripe as stripe_lib
from bson import ObjectId
from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr
from emergentintegrations.payments.stripe.checkout import StripeCheckout

from core import (
    db, logger, STRIPE_API_KEY, FRONTEND_URL, MAILERLITE_API_TOKEN, MAILERLITE_URL,
    MAILERLITE_COHORT_WAITLIST_GROUP_ID, MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID,
    COACH_EMAIL,
    get_user_from_request, _require_paid, send_mailersend_email,
)

import httpx

router = APIRouter()


# ── VRF Auto-Issuance ─────────────────────────────────────────────────────────
async def _issue_vrf_id_if_eligible(user_id: str):
    """Auto-issue Verified Registry ID when all core modules (1–6, plus 7 if conditional) are complete."""
    existing = await db.registry_ids.find_one({"user_id": user_id}, {"_id": 0})
    if existing:
        return  # Already issued

    docs = await db.module_progress.find({"user_id": user_id}, {"_id": 0}).to_list(20)
    statuses = {d["module_id"]: d.get("status") for d in docs}

    DONE = {"approved", "complete", "conditional"}
    core_modules = ["module-1", "module-2", "module-3", "module-4", "module-5", "module-6"]

    if not all(statuses.get(mod) in DONE for mod in core_modules):
        return  # Not all core modules done yet

    # If module-6 was conditional, module-7 must also be complete
    if statuses.get("module-6") == "conditional":
        if statuses.get("module-7") not in DONE:
            return

    # All conditions met — issue VRF ID
    user_info = await db.users.find_one({"user_id": user_id}, {"_id": 0}) or {}
    registry_code = "LP-VRF-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    now = datetime.now(timezone.utc).isoformat()
    await db.registry_ids.update_one(
        {"user_id": user_id},
        {"$set": {
            "user_id": user_id,
            "registry_id": registry_code,
            "operator_name": user_info.get("name", "Operator"),
            "operator_email": user_info.get("email", ""),
            "issued_at": now,
            "issued_trigger": "program_completion",
        }},
        upsert=True,
    )
    logger.info(f"VRF ID issued for user {user_id}: {registry_code}")


class PortalCheckoutRequest(BaseModel):
    origin_url: str


class Ground0ProgressRequest(BaseModel):
    completed_lessons: List[int]
    decision: Optional[str] = None


class Ground0WaitlistRequest(BaseModel):
    email: EmailStr
    status: str
    first_name: Optional[str] = ""
    source_tag: Optional[str] = None
    completion_date: Optional[str] = None
    reach_resources: Optional[str] = None
    reach_experience: Optional[str] = None
    reach_authority: Optional[str] = None
    reach_commitment: Optional[str] = None
    reach_discipline: Optional[str] = None
    gaps_remaining: Optional[int] = None


class SignalResponse(BaseModel):
    carrierId: str
    integrity: int
    pulse: int
    alignment: int
    signal: int
    last_active_days: Optional[int] = None


@router.get("/portal/access")
async def check_portal_access(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"has_access": False}
    record = await db.user_access.find_one({"user_id": user["user_id"]}, {"_id": 0})
    has_access = bool(record and record.get("has_access") and record.get("access_level") == "cohort")
    return {"has_access": has_access, "user_id": user["user_id"]}


@router.post("/portal/checkout")
async def create_portal_checkout(data: PortalCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    user = await get_user_from_request(request)
    user_id = user["user_id"] if user else None
    success_url = f"{data.origin_url}/portal?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/portal"
    host_url = str(request.base_url)
    StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    session = await asyncio.to_thread(
        stripe_lib.checkout.Session.create,
        payment_method_types=["card"],
        line_items=[{"price_data": {"currency": "usd", "product_data": {"name": "LaunchPath LPOS Cohort Access"}, "unit_amount": 250000}, "quantity": 1}],
        mode="payment",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product": "launchpath_cohort_admission", "user_id": user_id or ""},
    )
    await db.payment_transactions.insert_one({
        "session_id": session.id, "user_id": user_id, "amount": 2500.00, "currency": "usd",
        "payment_status": "pending", "status": "initiated",
        "metadata": {"product": "launchpath_cohort_admission"},
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.id}


@router.get("/portal/checkout/status/{session_id}")
async def get_portal_checkout_status(session_id: str, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    session = await asyncio.to_thread(stripe_lib.checkout.Session.retrieve, session_id)
    update_fields = {"payment_status": session.payment_status, "status": session.status, "updated_at": datetime.now(timezone.utc).isoformat()}
    await db.payment_transactions.update_one({"session_id": session_id}, {"$set": update_fields}, upsert=True)
    if session.payment_status == "paid":
        transaction = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        user_id = transaction.get("user_id") if transaction else None
        if user_id:
            await db.user_access.update_one(
                {"user_id": user_id},
                {"$set": {"has_access": True, "access_level": "cohort", "granted_at": datetime.now(timezone.utc).isoformat(), "stripe_session_id": session_id}},
                upsert=True,
            )
    return {"status": session.status, "payment_status": session.payment_status}


@router.get("/portal/module-urls/{module_id}")
async def get_module_urls(module_id: str):
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    if not doc:
        return {"lessons": []}
    return {"lessons": doc.get("lessons", [])}


@router.get("/portal/pdfs")
async def list_pdfs_portal(request: Request):
    await _require_paid(request)
    docs = await db.pdfs.find({"is_deleted": False}, {"_id": 0, "storage_path": 0}).sort("created_at", -1).to_list(200)
    return docs


@router.get("/portal/pdfs/{pdf_id}/download")
async def download_pdf(pdf_id: str, request: Request):
    from fastapi.responses import Response as FastAPIResponse
    from core import storage_get
    await _require_paid(request)
    doc = await db.pdfs.find_one({"id": pdf_id, "is_deleted": False}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="PDF not found")
    try:
        data, content_type = await asyncio.get_event_loop().run_in_executor(None, lambda: storage_get(doc["storage_path"]))
    except Exception as e:
        logger.error(f"Storage download failed: {e}")
        raise HTTPException(status_code=502, detail="Could not retrieve file")
    await db.pdfs.update_one({"id": pdf_id}, {"$inc": {"download_count": 1}})
    safe_name = doc.get("original_filename", "document.pdf").replace('"', '')
    return FastAPIResponse(content=data, media_type="application/pdf", headers={"Content-Disposition": f'attachment; filename="{safe_name}"'})


@router.post("/ground0/progress")
async def save_ground0_progress(data: Ground0ProgressRequest, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    await db.ground0_progress.update_one(
        {"user_id": user["user_id"]},
        {"$set": {"user_id": user["user_id"], "completed_lessons": data.completed_lessons, "decision": data.decision, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True}


@router.get("/ground0/progress")
async def get_ground0_progress(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"completed_lessons": [], "decision": None}
    progress = await db.ground0_progress.find_one({"user_id": user["user_id"]}, {"_id": 0, "user_id": 0})
    if not progress:
        return {"completed_lessons": [], "decision": None}
    return progress


def _ground0_email_html(first_name: str, outcome: str, subject: str) -> str:
    """Build a Ground 0 result notification email for WAIT or NO-GO outcomes."""
    GOLD = "#C5A059"
    NAVY = "#001B36"
    TEXT = "rgba(255,255,255,0.82)"
    MUTED = "rgba(255,255,255,0.48)"

    if outcome == "WAIT":
        headline = "Your Ground 0 result has been recorded as WAIT."
        body_paragraphs = [
            "That means some conditions need to be corrected before moving forward.",
            "This is not a rejection. It is a warning to slow down and repair what is weak before weakness becomes operating reality.",
            "Your place has been saved.",
            "When you are ready to return, you will not be starting from zero. You will be returning with more clarity about what needs attention and why it matters.",
        ]
        bullets = [
            "Your result has been recorded",
            "Your place in the process has been saved",
            "You will remain connected for future return",
        ]
        closing_paras = [
            "A delayed step taken in the correct order is better than a rushed step taken on a weak foundation.",
            "When the time is right, return and re-enter the process with stronger footing.",
        ]
        cta_label = "Return Later"
        cta_href = "https://www.launchpathedu.com/ground-0-briefing"
        internal_tag = "ground0_wait_email_01"
    else:
        headline = "Your Ground 0 result has been recorded as NO-GO."
        body_paragraphs = [
            "That means moving forward at this time would not be the correct step.",
            "Not every next move is a wise move simply because it is available. Ground 0 exists to make that clear before preventable damage becomes harder to reverse.",
            "Your information has been saved, and you have been added to the list for future follow-up if your situation changes.",
        ]
        bullets = [
            "Your result has been recorded",
            "You have not been cleared to proceed at this time",
            "Your place for future re-entry has been preserved",
        ]
        closing_paras = [
            "If conditions change later, you can return and revisit the process with a different starting point.",
            "Order matters. Timing matters. Readiness matters.",
        ]
        cta_label = "Stay Notified"
        cta_href = "https://www.launchpathedu.com/ground-0-briefing"
        internal_tag = "ground0_nogo_email_01"

    body_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in body_paragraphs
    )
    bullets_html = "".join(
        f'<li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">{b}</li>'
        for b in bullets
    )
    closing_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in closing_paras
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {GOLD};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 28px;">LP-GRD-0 &nbsp;|&nbsp; GROUND 0 RESULT &nbsp;|&nbsp; {internal_tag.upper()}</p>
        <p style="font-size:16px;color:{TEXT};line-height:1.75;margin:0 0 20px;">{first_name},</p>
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.3;">{headline}</h2>
        {body_html}
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.55);margin:0 0 12px;">STATUS SUMMARY</p>
        <ul style="margin:0 0 24px;padding:0 0 0 18px;">{bullets_html}</ul>
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        {closing_html}
        <table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr>
          <td style="background:{GOLD};"><a href="{cta_href}" style="display:inline-block;background:{GOLD};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">{cta_label} &#8594;</a></td>
        </tr></table>
        <p style="font-size:15px;color:{TEXT};margin:0 0 4px;">— LaunchPath</p>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;letter-spacing:0.12em;color:rgba(255,255,255,0.20);margin:0;text-transform:uppercase;">LP-GRD-0 &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""


async def _schedule_ground0_email2(email: str, first_name: str, outcome: str, delay_hours: int):
    now = datetime.now(timezone.utc)
    send_at = now + timedelta(hours=delay_hours)
    await db.ground0_sequences.update_one(
        {"email": email, "outcome": outcome},
        {"$set": {
            "email": email,
            "first_name": first_name,
            "outcome": outcome,
            "email1_sent_at": now.isoformat(),
            "email2_send_at": send_at.isoformat(),
            "email2_sent": False,
        }},
        upsert=True,
    )
    logger.info(f"Ground 0 Email 2 scheduled: {email} ({outcome}) at {send_at.isoformat()}")



    """Build a Ground 0 result notification email for WAIT or NO-GO outcomes."""
    GOLD = "#C5A059"
    NAVY = "#001B36"
    TEXT = "rgba(255,255,255,0.82)"
    MUTED = "rgba(255,255,255,0.48)"

    if outcome == "WAIT":
        headline = "Your Ground 0 result has been recorded as WAIT."
        body_paragraphs = [
            "That means some conditions need to be corrected before moving forward.",
            "This is not a rejection. It is a warning to slow down and repair what is weak before weakness becomes operating reality.",
            "Your place has been saved.",
            "When you are ready to return, you will not be starting from zero. You will be returning with more clarity about what needs attention and why it matters.",
        ]
        bullets = [
            "Your result has been recorded",
            "Your place in the process has been saved",
            "You will remain connected for future return",
        ]
        closing_paras = [
            "A delayed step taken in the correct order is better than a rushed step taken on a weak foundation.",
            "When the time is right, return and re-enter the process with stronger footing.",
        ]
        cta_label = "Return Later"
        cta_href = "https://www.launchpathedu.com/ground-0-briefing"
        internal_tag = "ground0_wait_email_01"
    else:
        headline = "Your Ground 0 result has been recorded as NO-GO."
        body_paragraphs = [
            "That means moving forward at this time would not be the correct step.",
            "Not every next move is a wise move simply because it is available. Ground 0 exists to make that clear before preventable damage becomes harder to reverse.",
            "Your information has been saved, and you have been added to the list for future follow-up if your situation changes.",
        ]
        bullets = [
            "Your result has been recorded",
            "You have not been cleared to proceed at this time",
            "Your place for future re-entry has been preserved",
        ]
        closing_paras = [
            "If conditions change later, you can return and revisit the process with a different starting point.",
            "Order matters. Timing matters. Readiness matters.",
        ]
        cta_label = "Stay Notified"
        cta_href = "https://www.launchpathedu.com/ground-0-briefing"
        internal_tag = "ground0_nogo_email_01"

    body_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in body_paragraphs
    )
    bullets_html = "".join(
        f'<li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">{b}</li>'
        for b in bullets
    )
    closing_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in closing_paras
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {GOLD};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 28px;">LP-GRD-0 &nbsp;|&nbsp; GROUND 0 RESULT &nbsp;|&nbsp; {internal_tag.upper()}</p>
        <p style="font-size:16px;color:{TEXT};line-height:1.75;margin:0 0 20px;">{first_name},</p>
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.3;">{headline}</h2>
        {body_html}
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.55);margin:0 0 12px;">STATUS SUMMARY</p>
        <ul style="margin:0 0 24px;padding:0 0 0 18px;">{bullets_html}</ul>
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        {closing_html}
        <table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr>
          <td style="background:{GOLD};"><a href="{cta_href}" style="display:inline-block;background:{GOLD};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">{cta_label} &#8594;</a></td>
        </tr></table>
        <p style="font-size:15px;color:{TEXT};margin:0 0 4px;">— LaunchPath</p>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;letter-spacing:0.12em;color:rgba(255,255,255,0.20);margin:0;text-transform:uppercase;">LP-GRD-0 &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""


class Ground0TrackEvent(BaseModel):
    event: str
    outcome: Optional[str] = None
    email: Optional[str] = None
    metadata: Optional[dict] = None


@router.post("/ground0/track")
async def ground0_track(data: Ground0TrackEvent):
    """Store a Ground 0 analytics event (page views, CTA clicks, re-entries)."""
    await db.ground0_analytics.insert_one({
        "event": data.event,
        "outcome": data.outcome,
        "email": data.email,
        "metadata": data.metadata or {},
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })
    return {"ok": True}


@router.post("/ground0/waitlist")
async def ground0_waitlist(data: Ground0WaitlistRequest):
    if data.status not in ("WAIT", "NO-GO"):
        raise HTTPException(status_code=400, detail="Invalid status value.")
    now = datetime.now(timezone.utc)
    await db.ground0_waitlist.update_one(
        {"email": data.email},
        {"$set": {
            "email": data.email,
            "first_name": data.first_name or "",
            "status": data.status,
            "source_tag": data.source_tag or ("ground0_wait_capture" if data.status == "WAIT" else "ground0_nogo_capture"),
            "completion_date": data.completion_date or now.isoformat()[:10],
            "reach_resources": data.reach_resources, "reach_experience": data.reach_experience,
            "reach_authority": data.reach_authority, "reach_commitment": data.reach_commitment,
            "reach_discipline": data.reach_discipline, "gaps_remaining": data.gaps_remaining,
            "created_at": now.isoformat(),
        }},
        upsert=True,
    )
    lead_source = data.source_tag or ("ground0_wait_capture" if data.status == "WAIT" else "ground0_nogo_capture")
    group_id = MAILERLITE_COHORT_WAITLIST_GROUP_ID if data.status == "WAIT" else MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID
    ml_fields: dict = {
        "name": data.first_name or "",
        "lead_source": lead_source,
        "ground0_status": data.status,
        "ground0_completion_date": data.completion_date or now.isoformat()[:10],
    }
    if data.reach_resources: ml_fields["reach_resources"] = data.reach_resources
    if data.reach_experience: ml_fields["reach_experience"] = data.reach_experience
    if data.reach_authority: ml_fields["reach_authority"] = data.reach_authority
    if data.reach_commitment: ml_fields["reach_commitment"] = data.reach_commitment
    if data.reach_discipline: ml_fields["reach_discipline"] = data.reach_discipline
    if data.gaps_remaining is not None: ml_fields["gaps_remaining"] = str(data.gaps_remaining)
    ml_payload: dict = {"email": data.email, "status": "active", "fields": ml_fields}
    if group_id:
        ml_payload["groups"] = [group_id]
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=ml_payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite ground0_waitlist error {resp.status_code}: {resp.text}")

    first_name = (data.first_name or "").strip() or "Operator"

    if data.status == "WAIT":
        subject = f"Your Ground 0 result has been recorded as WAIT."
        html = _ground0_email_html(first_name, "WAIT", subject)
        asyncio.create_task(send_mailersend_email(data.email, first_name, subject, html))
        asyncio.create_task(_schedule_ground0_email2(data.email, first_name, "WAIT", delay_hours=72))
        logger.info(f"Ground 0 WAIT email queued: {data.email}")
    else:
        subject = f"Your Ground 0 result has been recorded as NO-GO."
        html = _ground0_email_html(first_name, "NO-GO", subject)
        asyncio.create_task(send_mailersend_email(data.email, first_name, subject, html))
        asyncio.create_task(_schedule_ground0_email2(data.email, first_name, "NO-GO", delay_hours=120))
        logger.info(f"Ground 0 NO-GO email queued: {data.email}")

    return {"ok": True}


# ── Gate Status & Submission ──────────────────────────────────────────────────
class GateSubmitRequest(BaseModel):
    module_id: str
    attestation: str


@router.get("/portal/gate-status")
async def get_gate_status(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"statuses": {}}
    docs = await db.module_progress.find({"user_id": user["user_id"]}, {"_id": 0}).to_list(20)
    statuses = {
        d["module_id"]: {
            "status": d.get("status", "not_started"),
            "custodian_notes": d.get("custodian_notes", ""),
            "outcome": d.get("outcome"),
            "approved_at": d.get("approved_at"),
        }
        for d in docs
    }
    return {"statuses": statuses}


@router.post("/portal/gate/{gate_type}/submit")
async def submit_gate(gate_type: str, data: GateSubmitRequest, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    valid_gates = {"dqf_gate": "module-1", "integrity_audit": "module-6"}
    if gate_type not in valid_gates:
        raise HTTPException(status_code=400, detail="Invalid gate type")
    if valid_gates[gate_type] != data.module_id:
        raise HTTPException(status_code=400, detail="Module/gate type mismatch")
    user_info = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0}) or {}
    review_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    await db.custodian_reviews.insert_one({
        "review_id": review_id,
        "user_id": user["user_id"],
        "user_email": user_info.get("email", ""),
        "user_name": user_info.get("name", "Operator"),
        "module_id": data.module_id,
        "gate_type": gate_type,
        "attestation": data.attestation,
        "status": "pending",
        "outcome": None,
        "custodian_notes": "",
        "submitted_at": now,
        "reviewed_at": None,
    })
    await db.module_progress.update_one(
        {"user_id": user["user_id"], "module_id": data.module_id},
        {"$set": {"user_id": user["user_id"], "module_id": data.module_id, "status": "pending_review", "review_id": review_id, "submitted_at": now, "updated_at": now}},
        upsert=True,
    )
    gate_label = "Driver Qualification File" if gate_type == "dqf_gate" else "Integrity Audit"
    html = f"""<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid #C5A059;">
<p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">Station Custodian — Review Required</p>
<h1 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">Gate Review: {gate_label}</h1>
<p style="font-size:16px;color:#dde5ec;margin-bottom:16px;"><strong>{user_info.get('name','An operator')}</strong> ({user_info.get('email','')}) has submitted their {data.module_id.upper()} for Custodian review.</p>
<p style="font-size:14px;color:#adc0cc;background:#001a33;padding:16px;margin-bottom:24px;">Attestation: {data.attestation}</p>
<a href="{FRONTEND_URL}/admin/gate-reviews" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;margin-right:12px;">Review Now</a>
</div>"""
    asyncio.create_task(send_mailersend_email(COACH_EMAIL, "Vince Lawrence", f"Gate Review Required: {user_info.get('name','Operator')} — {gate_label}", html))
    return {"ok": True, "review_id": review_id}


@router.post("/portal/module/{module_id}/complete")
async def mark_module_complete(module_id: str, request: Request):
    """Operator self-certifies completion for non-gate modules (MOD-2 through MOD-5)."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    gate_modules = {"module-1", "module-6"}
    if module_id in gate_modules:
        raise HTTPException(status_code=400, detail="Gate modules require Custodian review — use /portal/gate/{gate_type}/submit")
    now = datetime.now(timezone.utc).isoformat()
    await db.module_progress.update_one(
        {"user_id": user["user_id"], "module_id": module_id},
        {"$set": {"user_id": user["user_id"], "module_id": module_id, "status": "complete", "completed_at": now, "updated_at": now}},
        upsert=True,
    )
    await _issue_vrf_id_if_eligible(user["user_id"])
    return {"ok": True}


# ── Lesson View Tracking ──────────────────────────────────────────────────────
@router.post("/portal/module/{module_id}/lesson/{lesson_id}/viewed")
async def mark_lesson_viewed(module_id: str, lesson_id: str, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    await db.lesson_progress.update_one(
        {"user_id": user["user_id"], "module_id": module_id},
        {"$addToSet": {"viewed_lessons": lesson_id}, "$set": {"updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True}


@router.get("/portal/lesson-progress")
async def get_lesson_progress(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"progress": {}}
    docs = await db.lesson_progress.find({"user_id": user["user_id"]}, {"_id": 0}).to_list(20)
    progress = {d["module_id"]: d.get("viewed_lessons", []) for d in docs}
    return {"progress": progress}


# ── Module Completion Checklist ───────────────────────────────────────────────
class ChecklistUpdateRequest(BaseModel):
    item_id: str
    checked: bool


@router.get("/portal/module/{module_id}/checklist")
async def get_module_checklist(module_id: str, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    doc = await db.module_checklists.find_one(
        {"user_id": user["user_id"], "module_id": module_id}, {"_id": 0}
    )
    return {"checked_items": doc.get("checked_items", []) if doc else []}


@router.post("/portal/module/{module_id}/checklist")
async def update_module_checklist(module_id: str, data: ChecklistUpdateRequest, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    now = datetime.now(timezone.utc).isoformat()
    if data.checked:
        await db.module_checklists.update_one(
            {"user_id": user["user_id"], "module_id": module_id},
            {"$addToSet": {"checked_items": data.item_id}, "$set": {"updated_at": now}},
            upsert=True,
        )
    else:
        await db.module_checklists.update_one(
            {"user_id": user["user_id"], "module_id": module_id},
            {"$pull": {"checked_items": data.item_id}},
        )
    return {"ok": True}


# ── Verified Registry ID ──────────────────────────────────────────────────────
@router.get("/portal/registry-id")
async def get_registry_id(request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    doc = await db.registry_ids.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if not doc:
        return {"issued": False}
    return {"issued": True, **{k: v for k, v in doc.items()}}


# ── Lesson Q&A ────────────────────────────────────────────────────────────────
class LessonQARequest(BaseModel):
    question: str


@router.get("/portal/lesson/{lesson_id}/qa")
async def get_lesson_qa(lesson_id: str, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    docs = await db.lesson_qa.find({"lesson_id": lesson_id}, {"_id": 0}).sort("created_at", 1).to_list(100)
    return {"qa": docs}


@router.post("/portal/lesson/{lesson_id}/qa")
async def post_lesson_question(lesson_id: str, data: LessonQARequest, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if not data.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    user_info = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0}) or {}
    qa_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "qa_id": qa_id,
        "lesson_id": lesson_id,
        "user_id": user["user_id"],
        "user_name": user_info.get("name", "Operator"),
        "question": data.question.strip(),
        "reply": None,
        "replied_at": None,
        "created_at": now,
    }
    await db.lesson_qa.insert_one({**doc, "_id": qa_id})
    return {k: v for k, v in doc.items()}


# ── Announcements (user-facing) ───────────────────────────────────────────────
@router.get("/portal/announcements")
async def get_announcements(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"announcements": []}
    docs = await db.announcements.find({"is_active": True}, {"_id": 0}).sort("created_at", -1).to_list(20)
    return {"announcements": docs}


@router.get("/signal/{carrierId}", response_model=SignalResponse)
async def get_carrier_signal(carrierId: str):
    profile = await db.carrierProfiles.find_one({"carrierId": carrierId}, {"_id": 0})
    last_active_days = None
    if profile and profile.get("lastActiveAt"):
        last_active = profile["lastActiveAt"]
        if isinstance(last_active, str):
            last_active = datetime.fromisoformat(last_active)
        if last_active.tzinfo is None:
            last_active = last_active.replace(tzinfo=timezone.utc)
        last_active_days = (datetime.now(timezone.utc) - last_active).days
        pulse = 100 if last_active_days <= 3 else 70 if last_active_days <= 7 else 40 if last_active_days <= 14 else 20
    else:
        pulse = 100
    all_tasks = await db.tasks.find({"carrierId": carrierId}, {"_id": 0}).to_list(100)
    if all_tasks:
        total = len(all_tasks)
        verified = sum(1 for t in all_tasks if t.get("status", "").lower() == "verified")
        integrity = round((verified / total) * 100)
    else:
        integrity = 0
    current_week = date.today().isocalendar()[1]
    week_tasks = [t for t in all_tasks if t.get("assignedWeek") == current_week]
    if week_tasks:
        verified_week = sum(1 for t in week_tasks if t.get("status", "").lower() == "verified")
        alignment = round((verified_week / len(week_tasks)) * 100)
    else:
        alignment = 0
    signal = round(0.4 * integrity + 0.3 * pulse + 0.3 * alignment)
    return SignalResponse(carrierId=carrierId, integrity=integrity, pulse=pulse, alignment=alignment, signal=signal, last_active_days=last_active_days)
