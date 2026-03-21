"""Product catalog, checkout, download, and admin file management."""
import asyncio
import uuid
from datetime import datetime, timezone
from typing import Optional

import stripe as stripe_lib
import httpx
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Form, Depends
from fastapi.responses import Response as FastAPIResponse
from pydantic import BaseModel, EmailStr

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
    "LP-RES-001": {"sku": "LP-RES-006", "label": "Complete Compliance Library",          "price": "$197", "pitch": "All five resources in one bundle — $80 off individual pricing."},
    "LP-RES-002": {"sku": "LP-RES-006", "label": "Complete Compliance Library",          "price": "$197", "pitch": "All five resources in one bundle — $80 off individual pricing."},
    "LP-RES-003": {"sku": "LP-RES-006", "label": "Complete Compliance Library",          "price": "$197", "pitch": "All five resources in one bundle — $80 off individual pricing."},
    "LP-RES-004": {"sku": "LP-RES-006", "label": "Complete Compliance Library",          "price": "$197", "pitch": "All five resources in one bundle — $80 off individual pricing."},
    "LP-RES-005": {"sku": "LP-RES-006", "label": "Complete Compliance Library",          "price": "$197", "pitch": "All five resources in one bundle — $80 off individual pricing."},
    "LP-RES-006": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Add the five domain packets, implementation calendar, and folder architecture."},
    "LP-PKT-001": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Get all five domain packets plus the implementation structure — one bundle."},
    "LP-PKT-002": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Get all five domain packets plus the implementation structure — one bundle."},
    "LP-PKT-003": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Get all five domain packets plus the implementation structure — one bundle."},
    "LP-PKT-004": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Get all five domain packets plus the implementation structure — one bundle."},
    "LP-PKT-005": {"sku": "LP-BDL-001", "label": "Complete New Carrier Document System", "price": "$497", "pitch": "Get all five domain packets plus the implementation structure — one bundle."},
    "LP-BDL-001": {"sku": "cohort",     "label": "LaunchPath Standard Cohort",           "price": "$2,500", "pitch": "90-day guided implementation with coach verification. Your next step."},
}


# ── Helpers ───────────────────────────────────────────────────────────────────
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
    download_url = f"{FRONTEND_URL}/products/confirmed?session_id={session_id}&sku={sku}"
    upsell = UPSELL.get(sku)
    upsell_block = ""
    if upsell:
        if upsell["sku"] == "cohort":
            upsell_href = f"{FRONTEND_URL}/admission"
        else:
            upsell_href = f"{FRONTEND_URL}/compliance-library"
        upsell_block = f"""
        <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:32px;padding-top:28px;">
          <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 8px;">NEXT STEP</p>
          <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 6px;">{upsell['label']} — {upsell['price']}</p>
          <p style="font-size:13px;color:rgba(255,255,255,0.55);margin:0 0 20px;">{upsell['pitch']}</p>
          <a href="{upsell_href}" style="display:inline-block;background:transparent;color:#d4900a;border:1px solid rgba(212,144,10,0.45);font-family:'Inter',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 24px;text-decoration:none;">View {upsell['label']} →</a>
        </div>"""
    subject = f"Your download: {product_name}"
    html = f"""
    <div style="font-family:'Inter',sans-serif;max-width:560px;margin:0 auto;background:#0D1B30;color:#f4f7fb;padding:40px 36px;border-top:3px solid #d4900a;">
      <p style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#d4900a;margin:0 0 20px;">LaunchPath — Purchase Confirmed</p>
      <h2 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;">{product_name}</h2>
      <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:0 0 28px;">{sku}</p>
      <p style="font-size:15px;color:rgba(255,255,255,0.70);line-height:1.75;margin:0 0 24px;">
        {first}, your purchase is confirmed. Use the link below to access your download. This link is permanent — bookmark it or return to it any time.
      </p>
      <a href="{download_url}" style="display:inline-block;background:#d4900a;color:#0b1628;font-family:'Inter',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:2px;">Download {product_name} →</a>
      {upsell_block}
      <p style="font-size:11px;color:rgba(255,255,255,0.22);margin:32px 0 0;line-height:1.6;">LaunchPath Transportation EDU · Accuracy Over Hype. Systems Over Shortcuts.</p>
    </div>"""
    return subject, html


# ── Routes ────────────────────────────────────────────────────────────────────
class ProductCheckoutRequest(BaseModel):
    sku: str
    origin_url: str
    buyer_name: Optional[str] = None
    buyer_email: Optional[EmailStr] = None


@router.post("/products/checkout")
async def create_product_checkout(data: ProductCheckoutRequest):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    product = PRODUCTS.get(data.sku)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    success_url = f"{data.origin_url}/products/confirmed?session_id={{CHECKOUT_SESSION_ID}}&sku={data.sku}"
    cancel_url = f"{data.origin_url}/compliance-library"
    session = await asyncio.to_thread(
        stripe_lib.checkout.Session.create,
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": product["name"], "description": f"LaunchPath {data.sku}"},
                "unit_amount": product["price_cents"],
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product_type": "resource", "sku": data.sku, "product_name": product["name"]},
        customer_creation="always",
    )
    await db.product_purchases.insert_one({
        "session_id": session.id, "sku": data.sku,
        "product_name": product["name"], "amount_cents": product["price_cents"],
        "payment_status": "pending", "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.id}


@router.get("/products/verify")
async def verify_product_purchase(session_id: str, sku: str):
    """Check payment status — called by the confirmation page."""
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    purchase = await db.product_purchases.find_one({"session_id": session_id, "sku": sku}, {"_id": 0})
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found.")
    if purchase.get("payment_status") == "paid":
        product = PRODUCTS.get(sku, {})
        upsell = UPSELL.get(sku)
        return {"paid": True, "product_name": purchase["product_name"], "sku": sku, "upsell": upsell, "product": product}
    # Re-check Stripe live status
    session = await asyncio.to_thread(stripe_lib.checkout.Session.retrieve, session_id)
    if session.payment_status == "paid":
        buyer_email = session.customer_details.email if session.customer_details else None
        buyer_name = session.customer_details.name if session.customer_details else "Operator"
        await db.product_purchases.update_one(
            {"session_id": session_id, "sku": sku},
            {"$set": {"payment_status": "paid", "buyer_email": buyer_email, "buyer_name": buyer_name, "paid_at": datetime.now(timezone.utc).isoformat()}},
        )
        product = PRODUCTS.get(sku, {})
        upsell = UPSELL.get(sku)
        return {"paid": True, "product_name": purchase["product_name"], "sku": sku, "upsell": upsell, "product": product}
    return {"paid": False, "product_name": purchase["product_name"], "sku": sku}


@router.get("/products/{sku}/download")
async def download_product(sku: str, session_id: str):
    """Verify purchase and stream the PDF file."""
    purchase = await db.product_purchases.find_one(
        {"session_id": session_id, "sku": sku, "payment_status": "paid"}, {"_id": 0}
    )
    if not purchase:
        raise HTTPException(status_code=403, detail="Purchase not verified.")
    file_rec = await db.product_files.find_one({"sku": sku}, {"_id": 0})
    if not file_rec:
        raise HTTPException(status_code=404, detail="File not yet available. Contact support@launchpathedu.com.")
    try:
        data, content_type = await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_get(file_rec["storage_path"])
        )
    except Exception as e:
        logger.error(f"Product download storage error: {e}")
        raise HTTPException(status_code=502, detail="Could not retrieve file.")
    await db.product_purchases.update_one(
        {"session_id": session_id, "sku": sku},
        {"$inc": {"download_count": 1}, "$set": {"last_downloaded_at": datetime.now(timezone.utc).isoformat()}},
    )
    safe_name = file_rec.get("filename", f"{sku}.pdf").replace('"', '')
    return FastAPIResponse(
        content=data, media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )


# ── Admin: upload product file ────────────────────────────────────────────────
@router.post("/admin/products/{sku}/file")
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
        logger.error(f"Product file upload failed: {e}")
        raise HTTPException(status_code=502, detail="Storage upload failed.")
    rec = {
        "sku": sku,
        "storage_path": result["path"],
        "filename": file.filename,
        "size": len(data),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.product_files.replace_one({"sku": sku}, rec, upsert=True)
    return {"ok": True, "sku": sku, "filename": file.filename}


@router.get("/admin/products/files")
async def list_product_files(coach_id: str = Depends(_require_coach)):
    files = await db.product_files.find({}, {"_id": 0}).to_list(50)
    uploaded_skus = {f["sku"] for f in files}
    return {
        "uploaded": files,
        "missing": [sku for sku in PRODUCTS if sku not in uploaded_skus],
        "products": PRODUCTS,
    }


# ── Webhook helper (called from payments.py webhook handler) ──────────────────
async def handle_product_purchase_webhook(checkout_session):
    """Called from the main Stripe webhook when product_type == 'resource'."""
    sku = checkout_session.metadata.get("sku")
    product_name = checkout_session.metadata.get("product_name", "")
    buyer_email = checkout_session.customer_details.email if checkout_session.customer_details else None
    buyer_name = checkout_session.customer_details.name if checkout_session.customer_details else "Operator"
    if not buyer_email or not sku:
        return
    await db.product_purchases.update_one(
        {"session_id": checkout_session.id},
        {"$set": {
            "payment_status": "paid", "buyer_email": buyer_email, "buyer_name": buyer_name,
            "sku": sku, "product_name": product_name,
            "paid_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    # MailerLite
    asyncio.create_task(_record_buyer_in_mailerlite(buyer_email, buyer_name, sku, product_name))
    # Download email
    subject, html = _build_download_email(buyer_name, product_name, sku, checkout_session.id)
    asyncio.create_task(send_mailersend_email(buyer_email, buyer_name, subject, html, reply_to=PAYMENT_EMAIL))
    # Coach notification
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
