"""Payment routes: admission checkout, Stripe webhook."""
import asyncio
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from bson import ObjectId
import stripe as stripe_lib
import httpx

from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest

from core import (
    db, logger, STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET,
    MAILERLITE_API_TOKEN, MAILERLITE_URL, COACH_EMAIL, FRONTEND_URL, PAYMENT_EMAIL,
    send_mailersend_email,
)
from routes.products import handle_product_purchase_webhook, _get_or_create_ml_group, ML_BASE

router = APIRouter()

COHORT_PRICE_USD = 2500.00


class ProgramCheckoutRequest(BaseModel):
    origin_url: str


@router.get("/cohort-seats")
async def get_cohort_seats():
    """Returns remaining seats in the current cohort (max 12)."""
    MAX_SEATS = 12
    taken = await db.payment_transactions.count_documents({"payment_status": "paid", "status": {"$in": ["completed", "complete"]}})
    remaining = max(0, MAX_SEATS - taken)
    return {"remaining": remaining, "total": MAX_SEATS, "taken": taken}


@router.post("/create-program-checkout")
async def create_program_checkout(data: ProgramCheckoutRequest, request: Request):
    """Direct $2,500 checkout from the /program sales page — no admission_id required."""
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    host_url = str(request.base_url)
    success_url = f"{data.origin_url}/admission/confirmed?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/program"
    metadata = {"product": "launchpath_standard_cohort", "source": "program_page",
                "webhook_url": f"{host_url}api/webhook/stripe"}
    StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    try:
        session = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: stripe_lib.checkout.Session.create(
                mode="payment",
                line_items=[{"price_data": {"currency": "usd", "unit_amount": int(COHORT_PRICE_USD * 100),
                              "product_data": {"name": "LaunchPath Standard — New Entrant Operating System"}},
                              "quantity": 1}],
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata,
                payment_method_types=["card"],
            )
        )
    except Exception as e:
        logger.error(f"Stripe cohort checkout error: {e}")
        raise HTTPException(status_code=502, detail="Could not create checkout session.")
    now = datetime.now(timezone.utc)
    await db.payment_transactions.insert_one({
        "session_id": session.id,
        "amount": COHORT_PRICE_USD,
        "currency": "usd",
        "payment_status": "initiated",
        "status": "pending",
        "source": "program_page",
        "created_at": now.isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


class AdmissionCheckoutRequest(BaseModel):
    admission_id: str
    origin_url: str


@router.post("/create-admission-checkout")
async def create_admission_checkout(data: AdmissionCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    admission = await db.admission_requests.find_one({"_id": ObjectId(data.admission_id)}, {"_id": 0, "email": 1, "carrier_name": 1})
    if not admission:
        raise HTTPException(status_code=404, detail="Admission request not found")
    host_url = str(request.base_url)
    success_url = f"{data.origin_url}/admission/confirmed?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/admission"
    metadata = {"admission_id": data.admission_id, "carrier_name": admission["carrier_name"],
                "email": admission["email"], "product": "launchpath_standard_cohort",
                "webhook_url": f"{host_url}api/webhook/stripe"}
    StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    try:
        session = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: stripe_lib.checkout.Session.create(
                mode="payment",
                line_items=[{"price_data": {"currency": "usd", "unit_amount": int(COHORT_PRICE_USD * 100),
                              "product_data": {"name": "LaunchPath Standard — New Entrant Operating System"}},
                              "quantity": 1}],
                success_url=success_url,
                cancel_url=cancel_url,
                metadata=metadata,
                payment_method_types=["card"],
            )
        )
    except Exception as e:
        logger.error(f"Stripe admission checkout error: {e}")
        raise HTTPException(status_code=502, detail="Could not create checkout session.")
    now = datetime.now(timezone.utc)
    await db.payment_transactions.insert_one({"session_id": session.id, "admission_id": data.admission_id, "email": admission["email"], "carrier_name": admission["carrier_name"], "amount": COHORT_PRICE_USD, "currency": "usd", "payment_status": "initiated", "status": "pending", "created_at": now.isoformat()})
    return {"checkout_url": session.url, "session_id": session.id}


@router.get("/admission-payment-status/{session_id}")
async def get_admission_payment_status(session_id: str):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    tx = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not tx:
        raise HTTPException(status_code=404, detail="Session not found")
    stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
    checkout_status = await stripe.get_checkout_status(session_id)
    if checkout_status.payment_status == "paid" and tx.get("payment_status") != "paid":
        admission_id = tx.get("admission_id")
        if admission_id:
            await db.admission_requests.update_one({"_id": ObjectId(admission_id)}, {"$set": {"status": "approved", "approved_at": datetime.now(timezone.utc).isoformat()}})
        await db.payment_transactions.update_one({"session_id": session_id}, {"$set": {"payment_status": "paid", "status": "completed", "completed_at": datetime.now(timezone.utc).isoformat()}})
        carrier = tx.get("carrier_name", "Unknown Carrier")
        asyncio.create_task(send_mailersend_email(
            COACH_EMAIL, "Vince Lawrence",
            f"Payment Confirmed — {carrier} enrolled in the Standard",
            f"""<div style="font-family:sans-serif;max-width:600px;background:#002244;color:#fff;padding:40px;border-top:4px solid #C5A059;"><p style="color:#C5A059;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px;">LaunchPath Standard — Enrollment Confirmed</p><h2 style="color:#fff;font-size:22px;margin:0 0 16px;">{carrier} has paid and is now enrolled.</h2><p style="color:rgba(255,255,255,0.70);font-size:14px;">Email: {tx.get("email")}<br>Amount: $2,500.00 USD<br>Session: {session_id}</p></div>""",
        ))
    return {"payment_status": checkout_status.payment_status, "status": checkout_status.status, "admission_status": "approved" if checkout_status.payment_status == "paid" else tx.get("status", "pending")}


async def _process_cohort_payment(checkout_session):
    """Handle cohort/subscription payment from Stripe webhook."""
    await db.payment_transactions.update_one(
        {"session_id": checkout_session.id},
        {"$set": {"payment_status": "paid", "status": "complete", "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    transaction = await db.payment_transactions.find_one({"session_id": checkout_session.id}, {"_id": 0})
    user_id = transaction.get("user_id") if transaction else None
    if user_id:
        await db.user_access.update_one(
            {"user_id": user_id},
            {"$set": {"has_access": True, "access_level": "cohort", "granted_at": datetime.now(timezone.utc).isoformat(), "stripe_session_id": checkout_session.id}},
            upsert=True,
        )
        user_record = await db.users.find_one({"user_id": user_id}, {"_id": 0})
        if user_record and user_record.get("email") and MAILERLITE_API_TOKEN:
            try:
                async with httpx.AsyncClient(timeout=8) as http:
                    ml_headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
                        "Accept": "application/json",
                    }
                    # Resolve group IDs for cohort buyer groups
                    add_group_names = ["LP-Buyer-Standard-2500", "LP-DoNotPitch-Standard"]
                    group_ids = []
                    for g_name in add_group_names:
                        gid = await _get_or_create_ml_group(http, ml_headers, g_name)
                        if gid:
                            group_ids.append(gid)
                    # Create/update subscriber with group membership in one call
                    resp = await http.post(MAILERLITE_URL, headers=ml_headers, json={
                        "email": user_record["email"],
                        "status": "active",
                        "groups": group_ids,
                        "fields": {
                            "name": user_record.get("name", ""),
                            "cohort_access": "true",
                            "cohort_tier": "LPOS_v1_Standard",
                            "payment_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                            "stripe_session_id": checkout_session.id,
                        },
                    })
                    subscriber_id = resp.json().get("data", {}).get("id")
                    # Remove from LP-Lead-Cold group
                    if subscriber_id:
                        cold_gid = await _get_or_create_ml_group(http, ml_headers, "LP-Lead-Cold")
                        if cold_gid:
                            await http.delete(
                                f"{ML_BASE}/groups/{cold_gid}/subscribers/{subscriber_id}",
                                headers=ml_headers,
                            )
            except Exception as ml_err:
                logger.error(f"MailerLite cohort post-payment update failed: {ml_err}")
        if user_record and user_record.get("email"):
            first_name = (user_record.get("name") or "").split()[0] or "Operator"
            conf_html = f"""
            <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
              <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Payment Confirmed</p>
              <h1 style="font-family:'Manrope',sans-serif;font-size:28px;font-weight:700;color:#ffffff;margin:0 0 8px;">You're in the cohort.</h1>
              <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">Your payment has been confirmed and your Operator Portal access is active.</p>
              <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Enter the Operator Portal →</a>
              <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p>
            </div>"""
            asyncio.create_task(send_mailersend_email(user_record["email"], first_name, "Payment confirmed. You have cohort access.", conf_html, reply_to=PAYMENT_EMAIL))
        buyer_name = user_record.get("name", "Unknown") if user_record else "Unknown"
        buyer_email = user_record.get("email", "unknown") if user_record else "unknown"
        amount_total = getattr(checkout_session, "amount_total", None)
        amount_str = f"${amount_total / 100:,.0f}" if amount_total else "$2,500"
        paid_at = datetime.now(timezone.utc).strftime("%b %d, %Y at %H:%M UTC")
        notify_html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:560px;margin:0 auto;background:#0D1B30;color:#f4f7fb;padding:40px 36px;border-top:3px solid #C5A059;">
          <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 20px;">LaunchPath — Admin Alert</p>
          <h2 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;">New Cohort Enrollment</h2>
          <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0 0 28px;">{paid_at}</p>
          <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#C5A059;text-transform:uppercase;letter-spacing:0.1em;width:38%;">Operator</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#fff;">{buyer_name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#C5A059;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#fff;">{buyer_email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;color:#C5A059;text-transform:uppercase;letter-spacing:0.1em;">Amount</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#fff;">{amount_str}</td></tr>
            <tr><td style="padding:10px 0;font-size:12px;color:#C5A059;text-transform:uppercase;letter-spacing:0.1em;">Session ID</td><td style="padding:10px 0;font-size:12px;color:rgba(255,255,255,0.45);word-break:break-all;">{checkout_session.id}</td></tr>
          </table>
          <a href="{FRONTEND_URL}/admin/admissions" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:3px;">View Admin Dashboard →</a>
        </div>"""
        asyncio.create_task(send_mailersend_email(COACH_EMAIL, "Vince Lawrence", f"New enrollment: {buyer_name} ({amount_str})", notify_html))


@router.post("/admin/simulate-cohort-payment")
async def simulate_cohort_payment(request: Request):
    """Admin-only: simulate the full cohort payment pipeline without charging Stripe.
    Tests: DB record creation, portal access grant, MailerSend emails (buyer + admin),
    MailerLite group enrollment. Safe to run repeatedly for E2E verification.
    """
    from routes.auth import get_current_user
    user = await get_current_user(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Not authorised")

    import uuid
    from types import SimpleNamespace
    sim_session_id = f"sim_cohort_{uuid.uuid4().hex[:12]}"

    # Pre-seed a payment_transaction so _process_cohort_payment can resolve user_id
    await db.payment_transactions.update_one(
        {"session_id": sim_session_id},
        {"$set": {
            "session_id": sim_session_id,
            "user_id": user["user_id"],
            "email": user.get("email", ""),
            "product": "launchpath_standard_cohort",
            "payment_status": "pending",
            "source": "admin_simulate",
        }},
        upsert=True,
    )

    mock_session = SimpleNamespace(
        id=sim_session_id,
        payment_status="paid",
        metadata={"product": "launchpath_standard_cohort", "source": "admin_simulate"},
        amount_total=250000,
    )
    await _process_cohort_payment(mock_session)
    return {
        "ok": True,
        "session_id": sim_session_id,
        "message": "Pipeline simulated. Check: (1) buyer confirmation email, (2) admin alert email, (3) MailerLite groups: LP-Buyer-Standard-2500 + LP-DoNotPitch-Standard added, LP-Lead-Cold removed.",
    }


@router.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    body = await request.body()
    signature = request.headers.get("Stripe-Signature", "")
    try:
        if not STRIPE_WEBHOOK_SECRET:
            raise HTTPException(status_code=503, detail="Webhook secret not configured.")
        event = stripe_lib.Webhook.construct_event(body, signature, STRIPE_WEBHOOK_SECRET)
        if event.type == "checkout.session.completed":
            checkout_session = event.data.object
            if checkout_session.payment_status == "paid":
                product_type = (checkout_session.metadata or {}).get("product_type")
                if product_type == "resource":
                    await handle_product_purchase_webhook(checkout_session)
                else:
                    await _process_cohort_payment(checkout_session)
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed.")
    return {"ok": True}
