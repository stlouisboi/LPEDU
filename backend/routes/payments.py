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

router = APIRouter()

COHORT_PRICE_USD = 2500.00


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
    stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    success_url = f"{data.origin_url}/admission/confirmed?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/admission"
    metadata = {"admission_id": data.admission_id, "carrier_name": admission["carrier_name"], "email": admission["email"], "product": "launchpath_standard_cohort"}
    session = await stripe.create_checkout_session(CheckoutSessionRequest(amount=COHORT_PRICE_USD, currency="usd", success_url=success_url, cancel_url=cancel_url, metadata=metadata))
    now = datetime.now(timezone.utc)
    await db.payment_transactions.insert_one({"session_id": session.session_id, "admission_id": data.admission_id, "email": admission["email"], "carrier_name": admission["carrier_name"], "amount": COHORT_PRICE_USD, "currency": "usd", "payment_status": "initiated", "status": "pending", "created_at": now.isoformat()})
    return {"checkout_url": session.url, "session_id": session.session_id}


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


@router.post("/webhook/stripe")
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
                                await http.post(MAILERLITE_URL, headers={"Content-Type": "application/json", "Authorization": f"Bearer {MAILERLITE_API_TOKEN}"}, json={"email": user_record["email"], "status": "active", "fields": {"name": user_record.get("name", ""), "cohort_access": "true", "cohort_tier": "LPOS_v1_Standard", "payment_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"), "stripe_session_id": checkout_session.id}})
                        except Exception as ml_err:
                            logger.error(f"MailerLite post-payment update failed: {ml_err}")
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
                    # Coach notification
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
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed.")
    return {"ok": True}
