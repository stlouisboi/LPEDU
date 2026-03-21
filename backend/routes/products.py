"""Product catalog, checkout, delivery, download, and admin file management."""
import asyncio
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

import stripe as stripe_lib
import httpx
from fastapi import APIRouter, HTTPException, Request, UploadFile, File
from fastapi.responses import Response as FastAPIResponse
from pydantic import BaseModel
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest as StripeCheckoutRequest

from core import (
    db, logger, STRIPE_API_KEY, FRONTEND_URL,
    MAILERLITE_API_TOKEN, MAILERLITE_URL, COACH_EMAIL, PAYMENT_EMAIL,
    _require_coach, send_mailersend_email,
    storage_put, storage_get, APP_NAME,
)

router = APIRouter()

# ── Product catalog ──────────────────────────────────────────────────────────
PRODUCTS = {
    "LP-RES-001": {"name": "16 Deadly Sins Pocket Guide",            "price_cents": 1700,  "price": "$17"},
    "LP-RES-002": {"name": "DQ File Builder Kit",                    "price_cents": 3700,  "price": "$37"},
    "LP-RES-003": {"name": "New Carrier Compliance Starter Kit",     "price_cents": 4700,  "price": "$47"},
    "LP-RES-004": {"name": "Safety Audit Prep Pack",                 "price_cents": 6700,  "price": "$67"},
    "LP-RES-005": {"name": "Four Pillars Compliance Blueprint",      "price_cents": 9700,  "price": "$97"},
    "LP-RES-006": {"name": "Complete Compliance Library",            "price_cents": 19700, "price": "$197"},
    "LP-PKT-001": {"name": "New Entrant Compliance Packet",          "price_cents": 9700,  "price": "$97"},
    "LP-PKT-002": {"name": "Drug & Alcohol Compliance Packet",       "price_cents": 9700,  "price": "$97"},
    "LP-PKT-003": {"name": "HOS & Dispatch Compliance Packet",       "price_cents": 12700, "price": "$127"},
    "LP-PKT-004": {"name": "Maintenance & Unit File Packet",         "price_cents": 12700, "price": "$127"},
    "LP-PKT-005": {"name": "Insurance & Authority Packet",           "price_cents": 12700, "price": "$127"},
    "LP-BDL-001": {"name": "Complete New Carrier Document System",   "price_cents": 49700, "price": "$497"},
}

# ── Upsell chain ─────────────────────────────────────────────────────────────
UPSELL = {
    "LP-RES-001": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Your self-audit identified exposure. The Document System Bundle installs the infrastructure to close it."},
    "LP-RES-002": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "DQ files are one of five audit domains. Cover the rest."},
    "LP-RES-003": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "You have the first 30 days covered. Now build the full system."},
    "LP-RES-004": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "You know what the investigator will ask for. Now make sure you have it."},
    "LP-RES-005": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "You have the architecture. Now install the documents."},
    "LP-RES-006": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "You have all five standalone resources. The Bundle adds the unified system and 0-30-90 installation guide."},
    "LP-PKT-001": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "This packet covers one domain. You have 1 of 5 covered. Complete the system."},
    "LP-PKT-002": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "This packet covers one domain. You have 1 of 5 covered. Complete the system."},
    "LP-PKT-003": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "This packet covers one domain. You have 1 of 5 covered. Complete the system."},
    "LP-PKT-004": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "This packet covers one domain. You have 1 of 5 covered. Complete the system."},
    "LP-PKT-005": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "This packet covers one domain. You have 1 of 5 covered. Complete the system."},
    "LP-BDL-001": {"sku": "cohort",     "label": "LaunchPath Standard Cohort",           "price": "$2,500", "pitch": "Your document system is installed. The LaunchPath Standard adds guided implementation and Station Custodian verification."},
}


# ── Email helpers ──────────────────────────────────────────────────────────────
async def _record_buyer_in_mailerlite(email: str, name: str, sku: str, product_name: str):
    if not MAILERLITE_API_TOKEN:
        return
    parts = name.strip().split(" ", 1)
    try:
        async with httpx.AsyncClient(timeout=8) as http:
            await http.post(
                MAILERLITE_URL,
                headers={"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"},
                json={"email": email, "status": "active", "fields": {
                    "name": parts[0], "last_name": parts[1] if len(parts) > 1 else "",
                    "lead_source": f"product_purchase_{sku.lower().replace('-','_')}",
                    "last_product_purchased": product_name,
                    "last_purchase_sku": sku,
                }},
            )
    except Exception as exc:
        logger.error(f"MailerLite buyer record failed: {exc}")


def _build_download_email(name: str, product_name: str, sku: str, session_id: str) -> tuple:
    first = name.strip().split()[0] if name.strip() else "Operator"
    confirmed_url = f"{FRONTEND_URL}/products/confirmed?session_id={session_id}"
    upsell = UPSELL.get(sku)
    upsell_block = ""
    if upsell:
        upsell_href = f"{FRONTEND_URL}/admission" if upsell["sku"] == "cohort" else f"{FRONTEND_URL}/compliance-library"
        upsell_block = f"""
        <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:32px;padding-top:28px;">
          <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 8px;">NEXT STEP</p>
          <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 6px;">{upsell['label']} — {upsell['price']}</p>
          <p style="font-size:13px;color:rgba(255,255,255,0.55);margin:0 0 20px;">{upsell['pitch']}</p>
          <a href="{upsell_href}" style="display:inline-block;background:transparent;color:#d4900a;border:1px solid rgba(212,144,10,0.45);font-family:'Inter',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 24px;text-decoration:none;">View {upsell['label']} →</a>
        </div>"""
    subject = f"Your LaunchPath {product_name} — Download Ready"
    html = f"""
    <div style="font-family:'Inter',sans-serif;max-width:560px;margin:0 auto;background:#0D1B30;color:#f4f7fb;padding:40px 36px;border-top:3px solid #d4900a;">
      <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#d4900a;margin:0 0 20px;">LaunchPath Transportation EDU</p>
      <h2 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;">{product_name}</h2>
      <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:0 0 28px;">{sku} — Purchase Confirmed</p>
      <p style="font-size:15px;color:rgba(255,255,255,0.70);line-height:1.75;margin:0 0 24px;">
        {first}, your purchase is confirmed. Click below to access your download page. The link is permanent — bookmark it or return any time.
      </p>
      <a href="{confirmed_url}" style="display:inline-block;background:#d4900a;color:#0b1628;font-family:'Inter',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:2px;">Access Your Download →</a>
      {upsell_block}
      <p style="font-size:11px;color:rgba(255,255,255,0.22);margin:32px 0 0;line-height:1.6;">Questions? Contact support@launchpathedu.com<br>LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.</p>
    </div>"""
    return subject, html


# ── Checkout ──────────────────────────────────────────────────────────────────
class ProductCheckoutRequest(BaseModel):
    product_sku: str
    origin_url: Optional[str] = None


@router.post("/products/checkout")
async def create_product_checkout(data: ProductCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    product = PRODUCTS.get(data.product_sku)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    origin = (data.origin_url or FRONTEND_URL).rstrip("/")
    success_url = f"{origin}/products/confirmed?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/compliance-library"
    host_url = str(request.base_url)
    stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    req = StripeCheckoutRequest(
        amount=product["price_cents"] / 100.0,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product_type": "resource", "sku": data.product_sku, "product_name": product["name"]},
    )
    session = await stripe.create_checkout_session(req)
    await db.product_purchases.insert_one({
        "session_id": session.session_id, "sku": data.product_sku,
        "product_name": product["name"], "amount_cents": product["price_cents"],
        "payment_status": "pending", "download_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.session_id}


# ── Verify (3-state) ──────────────────────────────────────────────────────────
@router.get("/products/verify")
async def verify_product_purchase(session_id: str):
    """3-state verify: confirmed | pending | failed"""
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")

    # State 1 — CONFIRMED: purchase record exists and is paid
    purchase = await db.product_purchases.find_one(
        {"session_id": session_id, "payment_status": "paid"}, {"_id": 0}
    )
    if purchase:
        sku = purchase["sku"]
        # Generate time-limited download token (60 min expiry)
        token = str(uuid.uuid4())
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        await db.product_download_tokens.insert_one({
            "token": token, "session_id": session_id, "sku": sku,
            "expires_at": expires_at.isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        await db.product_purchases.update_one(
            {"session_id": session_id}, {"$inc": {"download_count": 1}}
        )
        upsell = UPSELL.get(sku)
        return {
            "status": "confirmed",
            "product_sku": sku,
            "product_name": purchase["product_name"],
            "download_token": token,
            "upsell": upsell,
        }

    # State 2 — PENDING: Stripe says paid but webhook hasn't written the record yet
    try:
        stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
        checkout_status = await stripe.get_checkout_status(session_id)
        if checkout_status.payment_status == "paid":
            return {"status": "pending"}
    except Exception as exc:
        logger.warning(f"Stripe session lookup failed for {session_id}: {exc}")

    # State 3 — FAILED
    return {"status": "failed"}


# ── Token-gated download ──────────────────────────────────────────────────────
@router.get("/products/download")
async def download_by_token(token: str):
    """Time-limited, token-gated file download."""
    token_rec = await db.product_download_tokens.find_one({"token": token}, {"_id": 0})
    if not token_rec:
        raise HTTPException(status_code=403, detail="Invalid or expired download link.")
    expires_at = datetime.fromisoformat(token_rec["expires_at"])
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=403, detail="Download link expired. Return to your confirmation page for a fresh link.")
    sku = token_rec["sku"]
    file_rec = await db.product_files.find_one({"sku": sku}, {"_id": 0})
    if not file_rec:
        raise HTTPException(status_code=404, detail="File not yet available. Contact support@launchpathedu.com.")
    try:
        data, content_type = await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_get(file_rec["storage_path"])
        )
    except Exception as e:
        logger.error(f"Download storage error for {sku}: {e}")
        raise HTTPException(status_code=502, detail="Could not retrieve file. Please try again or contact support.")
    safe_name = file_rec.get("filename", f"{sku}.pdf").replace('"', '')
    return FastAPIResponse(
        content=data, media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )


# ── Admin: list files ─────────────────────────────────────────────────────────
@router.get("/admin/products/files")
async def list_product_files(request: Request):
    await _require_coach(request)
    files = await db.product_files.find({}, {"_id": 0}).to_list(50)
    uploaded_skus = {f["sku"] for f in files}
    return {
        "uploaded": files,
        "missing": [sku for sku in PRODUCTS if sku not in uploaded_skus],
        "products": PRODUCTS,
    }


# ── Admin: upload file ────────────────────────────────────────────────────────
@router.post("/admin/products/{sku}/upload")
async def upload_product_file(sku: str, request: Request, file: UploadFile = File(...)):
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted.")
    data = await file.read()
    if len(data) > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 50MB).")
    path = f"{APP_NAME}/products/{sku.lower()}.pdf"
    try:
        result = await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_put(path, data, "application/pdf")
        )
    except Exception as e:
        logger.error(f"Product file upload failed for {sku}: {e}")
        raise HTTPException(status_code=502, detail="Storage upload failed.")
    rec = {
        "sku": sku,
        "storage_path": result["path"],
        "filename": file.filename,
        "size": len(data),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.product_files.replace_one({"sku": sku}, rec, upsert=True)
    return {"ok": True, "sku": sku, "filename": file.filename, "size": len(data), "updated_at": rec["updated_at"]}


# ── Admin: test download ──────────────────────────────────────────────────────
@router.get("/admin/products/{sku}/test-download")
async def admin_test_download(sku: str, request: Request):
    """Admin-only: generate a test download token for any SKU (bypasses purchase check)."""
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    file_rec = await db.product_files.find_one({"sku": sku}, {"_id": 0})
    if not file_rec:
        raise HTTPException(status_code=404, detail="No file uploaded for this SKU yet.")
    token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    await db.product_download_tokens.insert_one({
        "token": token, "session_id": "admin_test", "sku": sku,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "is_admin_test": True,
    })
    return {"ok": True, "token": token, "sku": sku}


# ── Webhook helper (called from payments.py webhook handler) ──────────────────
async def handle_product_purchase_webhook(checkout_session):
    """Called from the Stripe webhook when product_type == 'resource'."""
    sku = checkout_session.metadata.get("sku")
    product_name = checkout_session.metadata.get("product_name", "")
    buyer_email = checkout_session.customer_details.email if checkout_session.customer_details else None
    buyer_name = checkout_session.customer_details.name if checkout_session.customer_details else "Operator"
    if not buyer_email or not sku:
        logger.warning(f"Product webhook: missing data — sku={sku}, email={buyer_email}")
        return
    await db.product_purchases.update_one(
        {"session_id": checkout_session.id},
        {"$set": {
            "payment_status": "paid", "status": "active",
            "buyer_email": buyer_email, "buyer_name": buyer_name,
            "sku": sku, "product_name": product_name,
            "download_count": 0,
            "paid_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    asyncio.create_task(_record_buyer_in_mailerlite(buyer_email, buyer_name, sku, product_name))
    subject, html = _build_download_email(buyer_name, product_name, sku, checkout_session.id)
    asyncio.create_task(send_mailersend_email(buyer_email, buyer_name, subject, html, reply_to=PAYMENT_EMAIL))
    amount = getattr(checkout_session, "amount_total", None)
    amount_str = f"${amount/100:,.0f}" if amount else PRODUCTS.get(sku, {}).get("price", "")
    notify_html = f"""<div style="font-family:'Inter',sans-serif;max-width:560px;background:#0D1B30;color:#f4f7fb;padding:40px 36px;border-top:3px solid #d4900a;">
      <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#d4900a;margin:0 0 16px;">LaunchPath — Product Sale</p>
      <h2 style="font-size:20px;font-weight:700;color:#fff;margin:0 0 4px;">{product_name}</h2>
      <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:0 0 24px;">{sku} · {amount_str}</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:12px;color:#d4900a;width:35%;text-transform:uppercase;letter-spacing:0.1em;">Buyer</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.07);font-size:13px;color:#fff;">{buyer_name}</td></tr>
        <tr><td style="padding:8px 0;font-size:12px;color:#d4900a;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:8px 0;font-size:13px;color:#fff;">{buyer_email}</td></tr>
      </table>
    </div>"""
    asyncio.create_task(send_mailersend_email(COACH_EMAIL, "Vince Lawrence", f"Sale: {product_name} ({amount_str})", notify_html))
    logger.info(f"Product purchase processed: {sku} — {buyer_email}")
