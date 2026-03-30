"""Product catalog, checkout, delivery, download, and admin file management."""
import asyncio
import uuid
from datetime import datetime, timezone, timedelta
from types import SimpleNamespace
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
    storage_put, storage_get, storage_delete, APP_NAME,
)

router = APIRouter()

# ── Product catalog ──────────────────────────────────────────────────────────
PRODUCTS = {
    "LP-PKT-SINS": {
        "name": "16 Deadly Sins Pocket Guide",
        "price_cents": 5900, "price": "$59",
        "description": "PDF · 24 pages · Instant download. 16-sin self-audit with CFR citations, GREEN/YELLOW/RED risk scoring, 7-Day Stabilization Plan, System Skeletons, and Monthly Verification Checklist.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/e6e37b56f306e908562c4dc91052b7695302c8404ca902a8b7fa959480564816.png",
    },
    "LP-RES-004": {
        "name": "Safety Audit Prep Pack",
        "price_cents": 16900, "price": "$169",
        "description": "PDF · 28 pages · Instant download. Document pull list, mock audit self-review, 48-hour response sequence, rating guide, Audit-Ready Grab Folder checklist, and common findings by domain.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/f1ddc39e48c368c4ef812892aa94c6788efe10c117dc9a062c4d9c57d9dd07b5.png",
    },
    "LP-PKT-DQ": {
        "name": "DQ File Builder Kit",
        "price_cents": 12900, "price": "$129",
        "description": "PDF · 32 pages · Instant download. Master DQ checklist, driver application template, annual review form, previous employer inquiry letter, multi-driver audit worksheet, and expiration tracking calendar.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/67647f90968a7ec9171089ba2a7c65339acd6b6c9f8c3f269144cdbb1488b789.png",
    },
    "LP-PKT-001": {
        "name": "New Entrant Compliance Packet",
        "price_cents": 13900, "price": "$139",
        "description": "PDF · 40 pages · Instant download. Domain 1: Authority & New Entrant. New Entrant Safety Audit brief, pre-launch checklist, audit prep index, 8-folder structure map, and implementation guide.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/2a792816a78b73cdc5cdda45a303201ac524991f95981c97aae09cb1f52e738e.png",
    },
    "LP-PKT-002": {
        "name": "Drug & Alcohol Compliance Packet",
        "price_cents": 12900, "price": "$129",
        "description": "PDF · 36 pages · Instant download. Domain 2: D&A Program. Part 382 brief, program setup checklist, 10-section written policy outline, driver handout, recordkeeping checklist, and testing trigger log.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/1bad3292205ed62246b466e0dcf3b09ada132cea612035cc9f8674f8802472c3.png",
    },
    "LP-PKT-003": {
        "name": "HOS & Dispatch Compliance Packet",
        "price_cents": 11900, "price": "$119",
        "description": "PDF · 36 pages · Instant download. Domain 3: Hours of Service & Dispatch. HOS rules brief, dispatch standards checklist, ELD usage checklist, daily compliance checklist, and weekly review checklist.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/546de6eb252c5e998f89c6565bc7193a3c0c002bff62910ac9e730b31f8d82dc.png",
    },
    "LP-PKT-004": {
        "name": "Maintenance & Unit File Packet",
        "price_cents": 11900, "price": "$119",
        "description": "PDF · 36 pages · Instant download. Domain 4: Vehicle Maintenance. Part 396 brief, unit file template, PM schedule outline, defect and repair tracking sheet, and pre-trip inspection checklist.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/1dc88494a074059a36d3b6b46b6b8a956c70a05a5a219c9f88e69300f3a6ec3e.png",
    },
    "LP-PKT-005": {
        "name": "Insurance & Authority Packet",
        "price_cents": 10900, "price": "$109",
        "description": "PDF · 36 pages · Instant download. Domain 5: Insurance Continuity. Coverage types brief, broker/shipper contract risk checklist, 90/60/30-day renewal checklist, authority filings checklist.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/1765edddd11eb37db174f165574154c8c2680e6ea93eec2b608a15b19ed2bfcd.png",
    },
    "LP-RES-006": {
        "name": "LaunchPath Starter Stack",
        "price_cents": 21900, "price": "$219",
        "description": "3 PDFs · Instant download. Includes: 16 Deadly Sins Pocket Guide ($59), DQ File Builder Kit ($129), Safety Audit Prep Pack ($169). $357 anchor value — save $138.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/3e4a1a7c6cccefa64a3714b009dbfa366f636c720274436e5dce3d2ad6317e75.png",
    },
    "LP-BDL-001": {
        "name": "Document System Bundle",
        "price_cents": 49900, "price": "$499",
        "description": "All 5 domain compliance packets + Unified Folder Structure Guide + 0–30–60–90 Day Implementation Calendar + Master Compliance Checklist. $615 packet value + 3 exclusive documents not sold separately. Save $116.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/64d8c85e1b2fcbdc822a1cfbd3e6d33b0474d2e2ebb60f845755c564dc6bb5d7.png",
    },
    "LP-LIB-001": {
        "name": "Complete LaunchPath Library",
        "price_cents": 69900, "price": "$699",
        "description": "Everything in the Starter Stack + everything in the Document System Bundle. All 8 documents. $824 anchor value — save $225.",
        "image": "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/ba13e1f09f25be491b74d21a8881aa5358746f98863b63aedbe9d0409cbd65af.png",
    },
    # ── Internal test SKU — NOT shown in storefront ───────────────────────────
    "LP-TEST-001": {
        "name": "LaunchPath E2E Test (Admin Only)",
        "price_cents": 100, "price": "$1.00",
        "description": "Internal pipeline test. Not for real purchase.",
        "image": "",
    },
}

# ── Bundle-only items (exclusive — not for individual sale) ───────────────────
BUNDLE_EXTRAS = {
    "LP-SYS-DIR-001": {"name": "Unified Folder Structure Guide",           "bundle_only": True},
    "LP-SYS-CAL-001": {"name": "0–30–60–90 Day Implementation Calendar",  "bundle_only": True},
    "LP-SYS-CHK-001": {"name": "Master Compliance Checklist",             "bundle_only": True},
}

# ── Bundle composition ───────────────────────────────────────────────────────
BUNDLE_CONTENTS = {
    "LP-RES-006": ["LP-PKT-SINS", "LP-PKT-DQ", "LP-RES-004"],
    "LP-BDL-001": ["LP-PKT-001", "LP-PKT-002", "LP-PKT-003", "LP-PKT-004", "LP-PKT-005",
                   "LP-SYS-DIR-001", "LP-SYS-CAL-001", "LP-SYS-CHK-001"],
    "LP-LIB-001": ["LP-PKT-SINS", "LP-PKT-DQ", "LP-RES-004",
                   "LP-PKT-001", "LP-PKT-002", "LP-PKT-003", "LP-PKT-004", "LP-PKT-005",
                   "LP-SYS-DIR-001", "LP-SYS-CAL-001", "LP-SYS-CHK-001"],
}

# ── Upsell chain ─────────────────────────────────────────────────────────────
UPSELL = {
    "LP-PKT-SINS": {"sku": "LP-RES-006", "label": "LaunchPath Starter Stack", "price": "$219",
                    "savings": "Save $138", "savings_context": "vs. $357 retail value",
                    "pitch": "Your self-audit identified exposure. Add the DQ File Builder Kit and Safety Audit Prep Pack — bundled at $219, saving $138."},
    "LP-PKT-DQ":   {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "DQ files are one of five audit domains. The Document System Bundle covers all five."},
    "LP-RES-004":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "You know what the investigator will ask for. The Document System Bundle makes sure you have it across all five domains."},
    "LP-RES-006":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "The Starter Stack covers diagnostics and DQ. The Document System Bundle installs the full five-domain compliance infrastructure."},
    "LP-PKT-001":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "This packet covers one domain. You have 1 of 5. The Document System Bundle completes the system — plus three exclusive documents."},
    "LP-PKT-002":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "This packet covers one domain. You have 1 of 5. The Document System Bundle completes the system — plus three exclusive documents."},
    "LP-PKT-003":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "This packet covers one domain. You have 1 of 5. The Document System Bundle completes the system — plus three exclusive documents."},
    "LP-PKT-004":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "This packet covers one domain. You have 1 of 5. The Document System Bundle completes the system — plus three exclusive documents."},
    "LP-PKT-005":  {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$497",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "This packet covers one domain. You have 1 of 5. The Document System Bundle completes the system — plus three exclusive documents."},
    "LP-BDL-001":  {"sku": "cohort",     "label": "LaunchPath Standard",      "price": "$2,500",
                    "pitch": "Your document system is installed. The LaunchPath Standard adds guided implementation and Station Custodian verification."},
    "LP-LIB-001":  {"sku": "cohort",     "label": "LaunchPath Standard",      "price": "$2,500",
                    "pitch": "You have the complete library. The LaunchPath Standard adds the guided installation and five human verification checkpoints."},
    "LP-TEST-001": {"sku": "LP-BDL-001", "label": "Document System Bundle",   "price": "$499",
                    "savings": "Save $118+", "savings_context": "vs. $615 for all 5 packets · 3 exclusive docs included",
                    "pitch": "Test upsell: The Document System Bundle covers all five compliance domains plus three exclusive documents not sold separately."},
}


# ── MailerLite tag architecture (LP-BLD-EML-001 rev2) ─────────────────────────
ML_BASE = "https://connect.mailerlite.com/api"

# Tags to add/remove per purchased SKU
_BUYER_TAG_MAP: dict[str, dict] = {
    "LP-PKT-SINS": {
        "add": ["LP-Buyer-16S-59", "LP-DoNotPitch-16S"],
        "remove": ["LP-Lead-Cold"],
    },
    "LP-RES-006": {
        "add": ["LP-Buyer-Stack-219", "LP-DoNotPitch-Stack", "LP-DoNotPitch-16S"],
        "remove": ["LP-Lead-Cold"],
    },
    "LP-BDL-001": {
        "add": ["LP-Buyer-Bundle-499", "LP-DoNotPitch-Stack"],
        "remove": ["LP-Lead-Cold"],
    },
    "LP-LIB-001": {
        "add": ["LP-Buyer-Bundle-499", "LP-DoNotPitch-Stack"],
        "remove": ["LP-Lead-Cold"],
    },
    # Individual domain packets — treated as bundle-tier buyers
    "LP-PKT-001": {"add": ["LP-Buyer-Bundle-499"], "remove": ["LP-Lead-Cold"]},
    "LP-PKT-002": {"add": ["LP-Buyer-Bundle-499"], "remove": ["LP-Lead-Cold"]},
    "LP-PKT-003": {"add": ["LP-Buyer-Bundle-499"], "remove": ["LP-Lead-Cold"]},
    "LP-PKT-004": {"add": ["LP-Buyer-Bundle-499"], "remove": ["LP-Lead-Cold"]},
    "LP-PKT-005": {"add": ["LP-Buyer-Bundle-499"], "remove": ["LP-Lead-Cold"]},
    "LP-PKT-DQ":  {"add": ["LP-Buyer-Stack-219", "LP-DoNotPitch-16S"], "remove": ["LP-Lead-Cold"]},
    "LP-RES-004": {"add": ["LP-Buyer-Stack-219", "LP-DoNotPitch-16S"], "remove": ["LP-Lead-Cold"]},
}


async def _get_or_create_ml_group(http: httpx.AsyncClient, headers: dict, name: str) -> str | None:
    """Return MailerLite group ID for `name`, creating it if needed."""
    try:
        r = await http.post(f"{ML_BASE}/groups", headers=headers, json={"name": name})
        data = r.json().get("data", {})
        if data.get("id"):
            return str(data["id"])
        # Fallback: search existing groups
        r2 = await http.get(f"{ML_BASE}/groups", headers=headers, params={"filter[name]": name})
        items = r2.json().get("data", [])
        return str(items[0]["id"]) if items else None
    except Exception as exc:
        logger.error(f"MailerLite get/create group '{name}' failed: {exc}")
        return None


# ── Email helpers ──────────────────────────────────────────────────────────────
async def _record_buyer_in_mailerlite(email: str, name: str, sku: str, product_name: str):
    if not MAILERLITE_API_TOKEN:
        return
    parts = name.strip().split(" ", 1)
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    tag_rules = _BUYER_TAG_MAP.get(sku, {"add": [], "remove": ["LP-Lead-Cold"]})

    try:
        async with httpx.AsyncClient(timeout=10) as http:
            # Step 1: Create/update subscriber
            resp = await http.post(
                MAILERLITE_URL,
                headers=headers,
                json={
                    "email": email,
                    "status": "active",
                    "fields": {
                        "name": parts[0],
                        "last_name": parts[1] if len(parts) > 1 else "",
                        "lead_source": f"product_purchase_{sku.lower().replace('-','_')}",
                        "last_product_purchased": product_name,
                        "last_purchase_sku": sku,
                    },
                },
            )
            subscriber_id = resp.json().get("data", {}).get("id")
            if not subscriber_id:
                logger.error(f"MailerLite: no subscriber ID returned for {email}")
                return

            # Step 2: Resolve group IDs and add subscriber to groups
            add_group_ids = []
            for group_name in tag_rules.get("add", []):
                gid = await _get_or_create_ml_group(http, headers, group_name)
                if gid:
                    add_group_ids.append(gid)

            # Re-upsert subscriber with group membership (single API call)
            if add_group_ids:
                await http.post(
                    MAILERLITE_URL,
                    headers=headers,
                    json={
                        "email": email,
                        "status": "active",
                        "groups": add_group_ids,
                        "fields": {
                            "name": parts[0],
                            "last_name": parts[1] if len(parts) > 1 else "",
                            "lead_source": f"product_purchase_{sku.lower().replace('-','_')}",
                            "last_product_purchased": product_name,
                            "last_purchase_sku": sku,
                        },
                    },
                )

            # Step 3: Remove subscriber from suppressed groups (e.g. LP-Lead-Cold)
            for group_name in tag_rules.get("remove", []):
                gid = await _get_or_create_ml_group(http, headers, group_name)
                if gid and subscriber_id:
                    await http.delete(
                        f"{ML_BASE}/groups/{gid}/subscribers/{subscriber_id}",
                        headers=headers,
                    )

    except Exception as exc:
        logger.error(f"MailerLite buyer record failed: {exc}")


def _build_download_email(name: str, product_name: str, sku: str, session_id: str) -> tuple:
    first = name.strip().split()[0] if name.strip() else "Operator"
    confirmed_url = f"{FRONTEND_URL}/products/confirmed?session_id={session_id}"
    upsell = UPSELL.get(sku)
    is_bundle = sku in BUNDLE_CONTENTS

    # Upsell block
    upsell_block = ""
    if upsell:
        upsell_href = f"{FRONTEND_URL}/admission" if upsell["sku"] == "cohort" else f"{FRONTEND_URL}/compliance-library"
        upsell_block = f"""
        <tr>
          <td style="padding:0 40px 32px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid rgba(255,255,255,0.08); padding-top:28px;">
              <tr><td style="padding-bottom:6px;">
                <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(197,160,89,0.55);">RECOMMENDED NEXT STEP</span>
              </td></tr>
              <tr><td style="padding-bottom:4px;">
                <span style="font-family:Georgia,serif;font-size:17px;font-weight:700;color:#ffffff;">{upsell['label']}</span>
                <span style="font-family:Arial,sans-serif;font-size:15px;color:#d4900a;margin-left:8px;">{upsell['price']}</span>
              </td></tr>
              <tr><td style="padding-bottom:20px;">
                <span style="font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.50);line-height:1.65;">{upsell['pitch']}</span>
              </td></tr>
              <tr><td>
                <a href="{upsell_href}" style="display:inline-block;background:transparent;color:#d4900a;border:1px solid rgba(212,144,10,0.45);font-family:Arial,sans-serif;font-weight:700;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;padding:11px 22px;text-decoration:none;">VIEW {upsell['label'].upper()} &rarr;</a>
              </td></tr>
            </table>
          </td>
        </tr>"""

    # Bundle contents block
    bundle_contents_block = ""
    if is_bundle:
        components = BUNDLE_CONTENTS.get(sku, [])
        rows = "".join(
            f'<tr><td style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.06);">'
            f'<span style="font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.65);">&#10003;&nbsp;&nbsp;{PRODUCTS.get(c, {}).get("name", c)}</span>'
            f'</td></tr>'
            for c in components
        )
        bundle_contents_block = f"""
        <tr>
          <td style="padding:0 40px 24px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:rgba(212,144,10,0.06);border-left:3px solid #d4900a;padding:16px 20px;">
              <tr><td style="padding-bottom:10px;">
                <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.60);">WHAT&apos;S INCLUDED IN YOUR BUNDLE</span>
              </td></tr>
              {rows}
            </table>
          </td>
        </tr>"""

    subject = f"Your {product_name} — Download Ready | LaunchPath"
    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>{subject}</title></head>
<body style="margin:0;padding:0;background-color:#060e1c;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#060e1c;">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <!-- Outer card -->
      <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;background-color:#0d1b30;border-top:3px solid #d4900a;">

        <!-- Header band -->
        <tr>
          <td style="background-color:#091220;padding:18px 40px;border-bottom:1px solid rgba(212,144,10,0.15);">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#d4900a;">LAUNCHPATH TRANSPORTATION EDU</span>
                </td>
                <td align="right">
                  <span style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);">PURCHASE CONFIRMED</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Product title block -->
        <tr>
          <td style="padding:32px 40px 8px;">
            <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(212,144,10,0.55);">{sku}</p>
            <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">{product_name}</h1>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px 24px;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="height:1px;background-color:rgba(255,255,255,0.07);"></td></tr></table></td></tr>

        <!-- Greeting & message -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:15px;color:rgba(255,255,255,0.80);line-height:1.75;">
              {first}, your purchase is confirmed.
            </p>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.50);line-height:1.75;">
              {'Your bundle includes ' + str(len(BUNDLE_CONTENTS.get(sku, []))) + ' documents — each has its own download button on your confirmation page.' if is_bundle else 'Your document is ready. The download link is permanent — bookmark the page or return any time.'}
            </p>
          </td>
        </tr>

        <!-- Bundle contents -->
        {bundle_contents_block}

        <!-- CTA button -->
        <tr>
          <td style="padding:0 40px 36px;" align="left">
            <a href="{confirmed_url}" style="display:inline-block;background-color:#d4900a;color:#07111f;font-family:Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;padding:15px 30px;text-decoration:none;">ACCESS YOUR DOWNLOADS &rarr;</a>
            <p style="margin:10px 0 0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);">Link is permanent. No account required.</p>
          </td>
        </tr>

        <!-- Upsell -->
        {upsell_block}

        <!-- Footer -->
        <tr>
          <td style="background-color:#060e1c;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);">Questions? <a href="mailto:support@launchpathedu.com" style="color:#d4900a;text-decoration:none;">support@launchpathedu.com</a></p>
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.15);">LaunchPath Transportation EDU &middot; Accuracy Over Hype &middot; Systems Over Shortcuts</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Outer card -->

    </td>
  </tr>
</table>
</body>
</html>"""
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
    success_url = f"{origin}/thank-you?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/compliance-library"
    host_url = str(request.base_url)

    # Init emergentintegrations to configure the proxy (sets stripe.api_key + api_base)
    StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")

    product_data = {"name": product["name"]}
    if product.get("description"):
        product_data["description"] = product["description"]
    if product.get("image"):
        product_data["images"] = [product["image"]]

    try:
        session = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: stripe_lib.checkout.Session.create(
                automatic_payment_methods={"enabled": True},
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "unit_amount": product["price_cents"],
                        "product_data": product_data,
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={"product_type": "resource", "sku": data.product_sku, "product_name": product["name"],
                          "webhook_url": f"{host_url}api/webhook/stripe"},
            )
        )
    except Exception as e:
        logger.error(f"Stripe checkout error for {data.product_sku}: {e}")
        raise HTTPException(status_code=502, detail="Could not create checkout session.")

    await db.product_purchases.insert_one({
        "session_id": session.id, "sku": data.product_sku,
        "product_name": product["name"], "amount_cents": product["price_cents"],
        "payment_status": "pending", "download_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.id}


# ── Verify (3-state) ──────────────────────────────────────────────────────────
@router.get("/products/verify")
async def verify_product_purchase(session_id: str, request: Request):
    """3-state verify: confirmed | pending | failed"""
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")

    # Ensure Stripe proxy is configured for self-heal calls
    host_url = str(request.base_url)
    StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")

    # State 1 — CONFIRMED: purchase record exists and is paid
    purchase = await db.product_purchases.find_one(
        {"session_id": session_id, "payment_status": "paid"}, {"_id": 0}
    )
    if purchase:
        sku = purchase["sku"]
        # For bundles: generate one token per component SKU
        component_skus = BUNDLE_CONTENTS.get(sku, [sku])
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        download_tokens = []
        for comp_sku in component_skus:
            token = str(uuid.uuid4())
            await db.product_download_tokens.insert_one({
                "token": token, "session_id": session_id, "sku": comp_sku,
                "parent_sku": sku,
                "expires_at": expires_at.isoformat(),
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            download_tokens.append({
                "token": token,
                "sku": comp_sku,
                "name": PRODUCTS.get(comp_sku, {}).get("name", comp_sku),
            })
        await db.product_purchases.update_one(
            {"session_id": session_id}, {"$inc": {"download_count": 1}}
        )
        upsell = UPSELL.get(sku)
        if upsell and upsell["sku"] != "cohort":
            up_product = PRODUCTS.get(upsell["sku"], {})
            upsell = {
                **upsell,
                "image": up_product.get("image", ""),
                "description": up_product.get("description", ""),
            }
        return {
            "status": "confirmed",
            "product_sku": sku,
            "product_name": purchase["product_name"],
            "is_bundle": sku in BUNDLE_CONTENTS,
            "download_tokens": download_tokens,
            "download_token": download_tokens[0]["token"] if download_tokens else None,
            "upsell": upsell,
        }

    # State 2 — PENDING: Stripe says paid but webhook hasn't written the record yet.
    # Self-heal: retrieve full session from Stripe directly, process purchase, return confirmed.
    try:
        import asyncio as _asyncio
        full_session = await _asyncio.get_event_loop().run_in_executor(
            None, lambda: stripe_lib.checkout.Session.retrieve(
                session_id, expand=["customer_details"]
            )
        )
        if full_session.payment_status == "paid":
            sku = (full_session.metadata or {}).get("sku")
            if sku:
                logger.info(f"Verify self-heal: processing purchase for {sku} / {session_id}")
                await handle_product_purchase_webhook(full_session)
                purchase = await db.product_purchases.find_one(
                    {"session_id": session_id, "payment_status": "paid"}, {"_id": 0}
                )
                if purchase:
                    component_skus = BUNDLE_CONTENTS.get(sku, [sku])
                    expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
                    download_tokens = []
                    for comp_sku in component_skus:
                        token = str(uuid.uuid4())
                        await db.product_download_tokens.insert_one({
                            "token": token, "session_id": session_id, "sku": comp_sku,
                            "parent_sku": sku,
                            "expires_at": expires_at.isoformat(),
                            "created_at": datetime.now(timezone.utc).isoformat(),
                        })
                        download_tokens.append({
                            "token": token, "sku": comp_sku,
                            "name": PRODUCTS.get(comp_sku, {}).get("name", comp_sku),
                        })
                    upsell = UPSELL.get(sku)
                    if upsell and upsell["sku"] != "cohort":
                        up_product = PRODUCTS.get(upsell["sku"], {})
                        upsell = {**upsell, "image": up_product.get("image", ""), "description": up_product.get("description", "")}
                    return {
                        "status": "confirmed",
                        "product_sku": sku,
                        "product_name": purchase["product_name"],
                        "is_bundle": sku in BUNDLE_CONTENTS,
                        "download_tokens": download_tokens,
                        "download_token": download_tokens[0]["token"] if download_tokens else None,
                        "upsell": upsell,
                    }
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
    all_products = {**PRODUCTS, **{k: {**v, "price": "BUNDLE ONLY", "price_cents": 0} for k, v in BUNDLE_EXTRAS.items()}}
    return {
        "uploaded": files,
        "missing": [sku for sku in PRODUCTS if sku not in uploaded_skus],
        "products": all_products,
        "bundle_contents": BUNDLE_CONTENTS,
    }


# ── Admin: upload file ────────────────────────────────────────────────────────
@router.post("/admin/products/{sku}/upload")
async def upload_product_file(sku: str, request: Request, file: UploadFile = File(...)):
    await _require_coach(request)
    all_uploadable = {**PRODUCTS, **BUNDLE_EXTRAS}
    if sku not in all_uploadable:
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


# ── Admin: delete file ────────────────────────────────────────────────────────
@router.delete("/admin/products/{sku}/file")
async def delete_product_file(sku: str, request: Request):
    """Admin-only: delete an uploaded product file."""
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    file_rec = await db.product_files.find_one({"sku": sku}, {"_id": 0})
    if not file_rec:
        raise HTTPException(status_code=404, detail="No file on record for this SKU.")
    try:
        await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_delete(file_rec["storage_path"])
        )
    except Exception as e:
        logger.warning(f"Storage delete for {sku} failed (continuing): {e}")
    await db.product_files.delete_one({"sku": sku})
    logger.info(f"Product file deleted: {sku}")
    return {"ok": True, "sku": sku}


# ── Admin: test download ──────────────────────────────────────────────────────
@router.get("/admin/products/{sku}/test-download")
async def admin_test_download(sku: str, request: Request):
    """Admin-only: generate test download tokens for a SKU (or all bundle components)."""
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    component_skus = BUNDLE_CONTENTS.get(sku, [sku])
    results = []
    for comp_sku in component_skus:
        file_rec = await db.product_files.find_one({"sku": comp_sku}, {"_id": 0})
        if not file_rec:
            results.append({"sku": comp_sku, "error": "No file uploaded yet."})
            continue
        token = str(uuid.uuid4())
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        await db.product_download_tokens.insert_one({
            "token": token, "session_id": "admin_test", "sku": comp_sku,
            "parent_sku": sku,
            "expires_at": expires_at.isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "is_admin_test": True,
        })
        results.append({"sku": comp_sku, "token": token, "name": PRODUCTS[comp_sku]["name"]})
    return {"ok": True, "sku": sku, "is_bundle": sku in BUNDLE_CONTENTS, "tokens": results}


# ── Admin: send test confirmation email ───────────────────────────────────────
@router.post("/admin/products/{sku}/test-email")
async def test_product_email(sku: str, request: Request, to_email: str = None):
    """Admin-only: send a real confirmation email to verify delivery."""
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    recipient = to_email or COACH_EMAIL
    # Build a fake session ID so the confirmed page link resolves
    fake_session_id = f"admin_test_{sku}_{uuid.uuid4().hex[:8]}"
    product_name = PRODUCTS[sku]["name"]
    await db.product_purchases.insert_one({
        "session_id": fake_session_id, "sku": sku,
        "product_name": product_name, "amount_cents": PRODUCTS[sku]["price_cents"],
        "payment_status": "paid", "download_count": 0,
        "buyer_email": recipient, "buyer_name": "Admin Test",
        "is_admin_test": True,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "paid_at": datetime.now(timezone.utc).isoformat(),
    })
    subject, html = _build_download_email("Admin Test", product_name, sku, fake_session_id)
    try:
        await send_mailersend_email(recipient, "Vince Lawrence", subject, html, reply_to=PAYMENT_EMAIL)
    except Exception as e:
        logger.error(f"Test email send failed: {e}")
        raise HTTPException(status_code=502, detail=f"Email send failed: {e}")
    logger.info(f"Test confirmation email sent for {sku} → {recipient}")
    return {"ok": True, "sku": sku, "sent_to": recipient, "session_id": fake_session_id}


# ── Admin: simulate full purchase pipeline (E2E test without Stripe) ──────────
@router.post("/admin/products/{sku}/simulate-purchase")
async def simulate_full_purchase(sku: str, request: Request, to_email: str = None):
    """Admin-only: simulate the complete webhook→record→email pipeline for E2E testing.
    Does NOT charge Stripe. Tests: purchase record creation, MailerSend delivery, upsell logic.
    """
    await _require_coach(request)
    if sku not in PRODUCTS:
        raise HTTPException(status_code=404, detail="Unknown product SKU.")
    product = PRODUCTS[sku]
    recipient = to_email or COACH_EMAIL
    session_id = f"sim_{uuid.uuid4().hex[:12]}"

    mock_session = SimpleNamespace(
        id=session_id,
        metadata={"sku": sku, "product_name": product["name"], "product_type": "resource"},
        amount_total=product["price_cents"],
        customer_details=SimpleNamespace(email=recipient, name="Admin Simulation"),
    )
    await handle_product_purchase_webhook(mock_session)
    logger.info(f"simulate-purchase fired for {sku} → {recipient} | session={session_id}")
    return {
        "ok": True,
        "sku": sku,
        "session_id": session_id,
        "sent_to": recipient,
        "confirmed_page": f"{FRONTEND_URL}/products/confirmed?session_id={session_id}",
        "message": f"Full purchase pipeline simulated for {sku}. Check {recipient} for confirmation email.",
    }


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
