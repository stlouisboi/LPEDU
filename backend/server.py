from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, UploadFile, File, Form, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
import asyncio
import json
from datetime import datetime, timezone, timedelta, date
import stripe as stripe_lib
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

MAILERLITE_API_TOKEN = os.environ.get('MAILERLITE_API_TOKEN', '')
MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers"
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', '')
STRIPE_WEBHOOK_SECRET = os.environ.get('STRIPE_WEBHOOK_SECRET', '')
stripe_lib.api_key = STRIPE_API_KEY
MAILERSEND_API_KEY = os.environ.get('MAILERSEND_API_KEY', '')
MAILERSEND_FROM_EMAIL = os.environ.get('MAILERSEND_FROM_EMAIL', '')
MAILERSEND_FROM_NAME = os.environ.get('MAILERSEND_FROM_NAME', 'LaunchPath')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://launchpathedu.com')
EMERGENT_AUTH_URL = os.environ.get('EMERGENT_AUTH_URL', 'https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data')
SUPPORT_EMAIL = os.environ.get('SUPPORT_EMAIL', 'support@launchpathedu.com')
PAYMENT_EMAIL = os.environ.get('PAYMENT_EMAIL', 'payment@launchpathedu.com')
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# ── Emergent Object Storage ───────────────────────────────────────────────────
import requests as sync_requests
STORAGE_URL = "https://integrations.emergentagent.com/objstore/api/v1/storage"
APP_NAME = "launchpath"
_storage_key = None

def init_storage():
    global _storage_key
    if _storage_key:
        return _storage_key
    if not EMERGENT_LLM_KEY:
        return None
    resp = sync_requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_LLM_KEY}, timeout=30)
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    return _storage_key

def storage_put(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = sync_requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    resp.raise_for_status()
    return resp.json()

def storage_get(path: str) -> tuple:
    key = init_storage()
    resp = sync_requests.get(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=60,
    )
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")


async def send_mailersend_email(to_email: str, to_name: str, subject: str, html: str, reply_to: str = None) -> None:
    """Fire-and-forget transactional email via MailerSend REST API."""
    if not MAILERSEND_API_KEY or not MAILERSEND_FROM_EMAIL:
        return
    try:
        payload = {
            "from": {"email": MAILERSEND_FROM_EMAIL, "name": MAILERSEND_FROM_NAME},
            "to": [{"email": to_email, "name": to_name}],
            "subject": subject,
            "html": html,
        }
        if reply_to:
            payload["reply_to"] = {"email": reply_to, "name": MAILERSEND_FROM_NAME}
        async with httpx.AsyncClient(timeout=10) as http:
            await http.post(
                "https://api.mailersend.com/v1/email",
                headers={
                    "Authorization": f"Bearer {MAILERSEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
    except Exception as e:
        logger.error(f"MailerSend send failed: {e}")

# ── Implementation Sequence Tasks Definition ─────────────────────────────
STANDARD_10_TASKS = [
    {"taskId": "DQ-001",     "name": "Driver Qualification File",         "category": "Documentation", "priority": "critical", "weekOffset": 1,  "description": "Compile complete DQ file per FMCSA §391. Include medical certificate, MVR, CDL copy, employment application, and prior employer verification."},
    {"taskId": "DA-001",     "name": "Drug & Alcohol Program",            "category": "Compliance",    "priority": "critical", "weekOffset": 1,  "description": "Enroll in FMCSA-compliant C/TPA consortium. Document designation and obtain written D&A testing policy."},
    {"taskId": "INS-001",    "name": "Insurance Certificate Filed",       "category": "Authority",     "priority": "critical", "weekOffset": 1,  "description": "File Form H with FMCSA. Minimum $750K liability for general freight. Confirm MCS-90 endorsement on policy."},
    {"taskId": "UCR-001",    "name": "UCR Registration",                  "category": "Authority",     "priority": "high",     "weekOffset": 2,  "description": "Complete Unified Carrier Registration for the current operating year. File in base state before operations begin."},
    {"taskId": "BOC3-001",   "name": "BOC-3 Process Agent Filed",         "category": "Authority",     "priority": "high",     "weekOffset": 2,  "description": "Designate process agents in all states of operation via a registered BOC-3 service. File with FMCSA."},
    {"taskId": "MCS150-001", "name": "MCS-150 Update Filed",              "category": "Authority",     "priority": "high",     "weekOffset": 2,  "description": "File or update USDOT biennial update (MCS-150). Required to maintain active operating authority."},
    {"taskId": "ELD-001",    "name": "ELD Provider Configured",           "category": "Operations",    "priority": "high",     "weekOffset": 3,  "description": "Configure and test FMCSA-registered ELD in each CMV. Document provider name, model, and registration number."},
    {"taskId": "IFTA-001",   "name": "IFTA Registration",                 "category": "Compliance",    "priority": "medium",   "weekOffset": 3,  "description": "Register for International Fuel Tax Agreement in base jurisdiction. Obtain IFTA license and decals for each CMV."},
    {"taskId": "PM-001",     "name": "Preventive Maintenance Schedule",   "category": "Operations",    "priority": "medium",   "weekOffset": 4,  "description": "Establish documented PM schedule per FMCSA §396. Include oil changes, brake inspections, and annual vehicle inspection intervals."},
    {"taskId": "HOS-001",    "name": "HOS Policy Document",               "category": "Compliance",    "priority": "medium",   "weekOffset": 4,  "description": "Create written Hours of Service policy. Document driver duties, 60/70-hour rules, and break requirements per 49 CFR Part 395."},
]

async def seed_standard_tasks_for_carrier(carrier_id: str):
    """Auto-seed the implementation sequence compliance tasks for a new carrier."""
    current_week = date.today().isocalendar()[1]
    now_iso = datetime.now(timezone.utc).isoformat()
    tasks = []
    for t in STANDARD_10_TASKS:
        tasks.append({
            "carrierId": carrier_id,
            "taskId": t["taskId"],
            "name": t["name"],
            "category": t["category"],
            "priority": t["priority"],
            "description": t["description"],
            "status": "pending",
            "assignedWeek": current_week + t["weekOffset"] - 1,
            "createdAt": now_iso,
        })
    await db.tasks.insert_many(tasks)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ── Models ──────────────────────────────────────────────
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    mc: Optional[str] = None
    authorityAge: Optional[str] = None
    inquiryType: Optional[str] = None
    message: Optional[str] = None

class PartnerInquiryForm(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: str
    message: Optional[str] = None


# ── Routes ──────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(100)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact")
async def submit_contact(form: ContactForm):
    # Split full name into first / last
    parts = form.name.strip().split(" ", 1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""

    payload = {
        "email": form.email,
        "status": "active",
        "fields": {
            "name": first,
            "last_name": last,
            "phone": form.phone or "",
            "company": form.mc or "",
            "lead_source": "contact_form",
        },
    }
    # Store extra context as custom fields (MailerLite auto-creates them)
    if form.authorityAge:
        payload["fields"]["authority_age"] = form.authorityAge
    if form.inquiryType:
        payload["fields"]["inquiry_type"] = form.inquiryType
    if form.message:
        payload["fields"]["contact_message"] = form.message[:1000]

    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)

    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save contact. Please try again.")

    return {"ok": True}


@api_router.post("/partners")
async def submit_partner_inquiry(form: PartnerInquiryForm):
    parts = form.name.strip().split(" ", 1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""

    payload = {
        "email": form.email,
        "status": "active",
        "fields": {
            "name": first,
            "last_name": last,
            "company": form.company,
            "lead_source": "partner_inquiry",
            "partner_role": form.role,
        },
    }
    if form.message:
        payload["fields"]["contact_message"] = form.message[:1000]

    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)

    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite partner error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not submit inquiry. Please try again.")

    return {"ok": True}


class DiagnosticSubmit(BaseModel):
    email: EmailStr
    score: int
    result: str
    red_count: int
    yellow_count: int

@api_router.post("/diagnostic")
async def submit_diagnostic(data: DiagnosticSubmit):
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "diagnostic_result": data.result,
            "diagnostic_score": f"{data.score}/28",
            "red_flags": str(data.red_count),
            "yellow_flags": str(data.yellow_count),
            "lead_source": "diagnostic_assessment",
        },
    }
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite diagnostic error: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not log result.")
    return {"ok": True, "result": data.result}


# ── REACH Assessment ─────────────────────────────────────
class REACHCategoryScores(BaseModel):
    r: int
    e: int
    a: int
    c: int
    h: int

class REACHSubmit(BaseModel):
    email: EmailStr
    result: str
    total_score: int
    category_scores: REACHCategoryScores
    open_response: Optional[str] = None

def _build_reach_email(result: str, total_score: int, scores: "REACHCategoryScores", email: str) -> tuple[str, str]:
    """Return (subject, html) for a REACH result email."""
    CATEGORY_NAMES = {
        "r": "Resources",
        "e": "Experience",
        "a": "Authority Setup",
        "c": "Commitment",
        "h": "Hustle & Capacity",
    }
    MAX_PER = 6  # max score per category (3 questions × 2 pts)
    MAX_TOTAL = 30

    score_dict = {"r": scores.r, "e": scores.e, "a": scores.a, "c": scores.c, "h": scores.h}
    # Identify flagged categories (below 60% of max)
    flagged = [CATEGORY_NAMES[k] for k, v in score_dict.items() if v < MAX_PER * 0.6]

    score_pct = round((total_score / MAX_TOTAL) * 100)

    def score_bar(score: int, max_score: int = MAX_PER) -> str:
        filled = round((score / max_score) * 10)
        bar = "█" * filled + "░" * (10 - filled)
        return f'<span style="font-family:monospace;color:#C5A059;letter-spacing:1px;">{bar}</span>'

    def category_rows() -> str:
        rows = ""
        for k, label in CATEGORY_NAMES.items():
            s = score_dict[k]
            color = "#C5A059" if s >= MAX_PER * 0.6 else "#E8590F"
            rows += f"""
            <tr>
              <td style="padding:8px 0;font-size:13px;color:rgba(255,255,255,0.75);width:140px;">{label}</td>
              <td style="padding:8px 0;">{score_bar(s)}</td>
              <td style="padding:8px 0 8px 12px;font-size:13px;color:{color};font-weight:600;">{s}/{MAX_PER}</td>
            </tr>"""
        return rows

    header_base = """
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;border-top:4px solid #C5A059;padding-top:20px;">LaunchPath Operating Standard &nbsp;|&nbsp; REACH Assessment Result</p>"""

    score_block = f"""
          <div style="background:#0F1E35;border-radius:6px;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.75);margin:0 0 16px;">YOUR SCORES</p>
            <table style="width:100%;border-collapse:collapse;">
              {category_rows()}
            </table>
            <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:12px;padding-top:12px;">
              <span style="font-size:12px;color:rgba(255,255,255,0.50);">Total: </span>
              <span style="font-size:14px;font-weight:700;color:#C5A059;">{total_score}/{MAX_TOTAL} &nbsp;({score_pct}%)</span>
            </div>
          </div>"""

    footer = """
          <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">
            This result was generated by the LaunchPath REACH Assessment.<br>
            LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.
          </p>
        </div>"""

    if result == "GO":
        subject = "REACH Result: GO — You're cleared to move forward."
        html = header_base + f"""
          <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#4CAF50;margin:0 0 6px;">RESULT</p>
          <h1 style="font-family:'Manrope',sans-serif;font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">GO</h1>
          <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your readiness profile clears you to begin the implementation sequence.</p>
          <p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 24px;">
            Your REACH score indicates you have the foundational resources, authority setup, and operational commitment needed to install the LaunchPath Operating Standard in the next 90 days. This is the result that moves you forward.
          </p>
          {score_block}
          <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">
            Your next step is the Operator Portal. Your Implementation Sequence — 10 compliance tasks assigned by week — is already loaded and waiting. Your LaunchPath coach will verify each item as you complete it.
          </p>
          <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Enter the Operator Portal →</a>
          {footer}"""

    elif result == "WAIT":
        gap_list = "".join(f'<li style="margin-bottom:6px;">{g}</li>' for g in flagged) if flagged else "<li>Review all five domains before proceeding.</li>"
        subject = "REACH Result: WAIT — Address these gaps before proceeding."
        html = header_base + f"""
          <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#F59E0B;margin:0 0 6px;">RESULT</p>
          <h1 style="font-family:'Manrope',sans-serif;font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">WAIT</h1>
          <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your profile shows gaps that should be addressed before you begin the full implementation sequence.</p>
          <p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 24px;">
            A WAIT result does not mean you're not ready to operate — it means your current position in one or more domains creates elevated risk if you proceed without a structured plan. The LaunchPath Standard is designed to close exactly these gaps.
          </p>
          {score_block}
          <div style="background:#1A1000;border-left:3px solid #F59E0B;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#F59E0B;margin:0 0 12px;">Domains flagged for attention</p>
            <ul style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0;padding-left:18px;">
              {gap_list}
            </ul>
          </div>
          <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">
            We recommend completing Ground 0 — all six foundational modules — before retaking the assessment. Ground 0 directly addresses the most common gap areas in new carrier readiness profiles.
          </p>
          <a href="{FRONTEND_URL}/ground-0-briefing" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;margin-right:12px;">Begin Ground 0 →</a>
          <a href="{FRONTEND_URL}/reach-diagnostic" style="display:inline-block;background:transparent;color:#C5A059;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:15px 24px;text-decoration:none;border-radius:4px;border:1px solid rgba(197,160,89,0.45);">Retake Assessment →</a>
          {footer}"""

    else:  # NO-GO
        gap_list = "".join(f'<li style="margin-bottom:6px;">{g}</li>' for g in flagged) if flagged else "<li>Review all five compliance domains immediately.</li>"
        subject = "REACH Result: NO-GO — Your current position requires intervention."
        html = header_base + f"""
          <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#E8590F;margin:0 0 6px;">RESULT</p>
          <h1 style="font-family:'Manrope',sans-serif;font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">NO-GO</h1>
          <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your current position carries significant compliance risk. Immediate structured action is required.</p>
          <p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 24px;">
            A NO-GO result means your profile reflects multiple unresolved gaps across critical compliance domains. Operating without addressing these increases your exposure to FMCSA intervention, audit deficiency findings, and potential authority revocation.
          </p>
          {score_block}
          <div style="background:#1A0500;border-left:3px solid #E8590F;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#E8590F;margin:0 0 12px;">Critical gaps identified</p>
            <ul style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0;padding-left:18px;">
              {gap_list}
            </ul>
          </div>
          <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">
            The LaunchPath Standard exists specifically for this situation. Begin with Ground 0 to establish the operational foundation, then work through the Implementation Sequence with your coach. If you are already operating and concerned about your current exposure, contact us directly.
          </p>
          <a href="{FRONTEND_URL}/ground-0-briefing" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;margin-right:12px;">Begin Ground 0 →</a>
          <a href="{FRONTEND_URL}/contact" style="display:inline-block;background:transparent;color:#C5A059;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:15px 24px;text-decoration:none;border-radius:4px;border:1px solid rgba(197,160,89,0.45);">Contact LaunchPath →</a>
          {footer}"""

    return subject, html


@api_router.post("/reach")
async def submit_reach(data: REACHSubmit):
    tag_map = {"GO": "REACH_GO", "WAIT": "REACH_WAIT", "NO-GO": "REACH_NOGO"}
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "lead_source": f"reach_{data.result.lower().replace('-', '_')}",
            "reach_result": data.result,
            "reach_total_score": str(data.total_score),
            "reach_resources": str(data.category_scores.r),
            "reach_experience": str(data.category_scores.e),
            "reach_authority": str(data.category_scores.a),
            "reach_commitment": str(data.category_scores.c),
            "reach_hustle": str(data.category_scores.h),
            "reach_open_response": data.open_response or "",
            "reach_tag": tag_map.get(data.result, "REACH_COMPLETE"),
        },
    }
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite REACH error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save assessment.")

    # Fire-and-forget result email
    subject, html = _build_reach_email(data.result, data.total_score, data.category_scores, data.email)
    asyncio.create_task(send_mailersend_email(data.email, data.email.split("@")[0], subject, html))

    return {"ok": True, "result": data.result}


# ── Admission Request ─────────────────────────────────────
class AdmissionSubmit(BaseModel):
    name: str
    email: EmailStr
    usdot_number: str
    cohort_preference: str
    message: Optional[str] = None

@api_router.post("/admission")
async def submit_admission(data: AdmissionSubmit):
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "name": data.name,
            "lead_source": "admission_request",
            "usdot_number": data.usdot_number,
            "cohort_preference": data.cohort_preference,
            "admission_message": data.message or "",
            "admission_requested": "true",
        },
    }
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite admission error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save submission.")
    return {"ok": True}


# ── Cohort Admission Request (v2 — full funnel) ────────────
class AdmissionRequestNew(BaseModel):
    carrier_name: str
    email: EmailStr
    dot_mc_number: Optional[str] = None
    authority_activation_date: Optional[str] = None
    compliance_status: str
    lane: str  # "box_truck" | "semi"
    message: Optional[str] = None

@api_router.post("/admission-request")
async def submit_admission_request(data: AdmissionRequestNew):
    now = datetime.now(timezone.utc)
    record = {
        "carrier_name": data.carrier_name,
        "email": data.email,
        "dot_mc_number": data.dot_mc_number or "",
        "authority_activation_date": data.authority_activation_date or "",
        "compliance_status": data.compliance_status,
        "lane": data.lane,
        "message": data.message or "",
        "source": "admission_form",
        "submission_date": now.isoformat(),
        "status": "pending_review",
    }
    await db.admission_requests.insert_one(record)
    admission_id = str(record["_id"])

    # Tag in MailerLite
    lane_label = "Box Truck" if data.lane == "box_truck" else "Semi / Tractor-Trailer"
    ml_payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "name": data.carrier_name,
            "lead_source": "admission_request",
            "admission_status": "pending_review",
            "admission_lane": lane_label,
            "admission_compliance_status": data.compliance_status,
        },
    }
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            ml_resp = await http.post(MAILERLITE_URL, json=ml_payload, headers=headers)
        if ml_resp.status_code not in (200, 201):
            logger.error(f"MailerLite admission-request error {ml_resp.status_code}: {ml_resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite admission-request failed: {exc}")

    # Notify Vince via MailerSend
    act_date = data.authority_activation_date or "Not provided"
    notify_html = f"""
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 24px;">LaunchPath Operating Standard &nbsp;|&nbsp; New Admission Request</p>
      <h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 6px;">New Admission Request</h1>
      <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;">A qualified operator has submitted an admission request. Review and respond within 24–48 hours.</p>
      <div style="background:#0F1E35;border-left:3px solid #C5A059;padding:20px 24px;margin:0 0 28px;">
        <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A059;margin:0 0 14px;">Submission Details</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);width:180px;">Carrier Name</td><td style="padding:6px 0;font-size:13px;color:#ffffff;font-weight:600;">{data.carrier_name}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Email</td><td style="padding:6px 0;font-size:13px;color:#C5A059;">{data.email}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">DOT / MC Number</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{data.dot_mc_number or "Not provided"}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Authority Active Since</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{act_date}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Compliance Status</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{data.compliance_status}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Lane / Equipment</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{lane_label}</td></tr>
        </table>
      </div>
      {f'<div style="background:#0a1a2e;border-left:3px solid rgba(197,160,89,0.4);padding:16px 20px;margin:0 0 28px;"><p style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.7);margin:0 0 8px;">Operator Note</p><p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.65;margin:0;">{data.message}</p></div>' if data.message else ""}
      <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:28px 0 0;line-height:1.6;">Submitted {now.strftime("%B %d, %Y at %H:%M UTC")}<br>Source: LaunchPath Operating Standard — Admission Form</p>
    </div>"""
    asyncio.create_task(send_mailersend_email(
        COACH_EMAIL, "Vince Lawrence",
        f"New Admission Request — {data.carrier_name}",
        notify_html,
        reply_to=data.email,
    ))

    return {"ok": True, "admission_id": admission_id}


from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest

STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "")
COHORT_PRICE_USD = 2500.00

class AdmissionCheckoutRequest(BaseModel):
    admission_id: str
    origin_url: str

@api_router.post("/create-admission-checkout")
async def create_admission_checkout(data: AdmissionCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    # Verify admission exists
    admission = await db.admission_requests.find_one({"_id": ObjectId(data.admission_id)}, {"_id": 0, "email": 1, "carrier_name": 1})
    if not admission:
        raise HTTPException(status_code=404, detail="Admission request not found")
    host_url = str(request.base_url)
    stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=f"{host_url}api/webhook/stripe")
    success_url = f"{data.origin_url}/admission/confirmed?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/admission"
    metadata = {
        "admission_id": data.admission_id,
        "carrier_name": admission["carrier_name"],
        "email": admission["email"],
        "product": "launchpath_standard_cohort",
    }
    session = await stripe.create_checkout_session(
        CheckoutSessionRequest(
            amount=COHORT_PRICE_USD,
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
        )
    )
    now = datetime.now(timezone.utc)
    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "admission_id": data.admission_id,
        "email": admission["email"],
        "carrier_name": admission["carrier_name"],
        "amount": COHORT_PRICE_USD,
        "currency": "usd",
        "payment_status": "initiated",
        "status": "pending",
        "created_at": now.isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.session_id}


@api_router.get("/admission-payment-status/{session_id}")
async def get_admission_payment_status(session_id: str):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    tx = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not tx:
        raise HTTPException(status_code=404, detail="Session not found")
    stripe = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url="")
    checkout_status = await stripe.get_checkout_status(session_id)
    # Prevent double-processing
    if checkout_status.payment_status == "paid" and tx.get("payment_status") != "paid":
        admission_id = tx.get("admission_id")
        if admission_id:
            await db.admission_requests.update_one(
                {"_id": ObjectId(admission_id)},
                {"$set": {"status": "approved", "approved_at": datetime.now(timezone.utc).isoformat()}},
            )
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": "paid", "status": "completed", "completed_at": datetime.now(timezone.utc).isoformat()}},
        )
        # Notify Vince of payment
        carrier = tx.get("carrier_name", "Unknown Carrier")
        asyncio.create_task(send_mailersend_email(
            COACH_EMAIL, "Vince Lawrence",
            f"Payment Confirmed — {carrier} enrolled in the Standard",
            f"""<div style="font-family:sans-serif;max-width:600px;background:#002244;color:#fff;padding:40px;border-top:4px solid #C5A059;">
            <p style="color:#C5A059;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px;">LaunchPath Standard — Enrollment Confirmed</p>
            <h2 style="color:#fff;font-size:22px;margin:0 0 16px;">{carrier} has paid and is now enrolled.</h2>
            <p style="color:rgba(255,255,255,0.70);font-size:14px;">Email: {tx.get("email")}<br>Amount: $2,500.00 USD<br>Session: {session_id}</p>
            </div>""",
        ))
    return {
        "payment_status": checkout_status.payment_status,
        "status": checkout_status.status,
        "admission_status": "approved" if checkout_status.payment_status == "paid" else tx.get("status", "pending"),
    }


async def _require_coach(request: Request):
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    if not session_token:
        raise HTTPException(status_code=403, detail="Not authorised")
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=403, detail="Not authorised")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Not authorised")
    return session["user_id"]


class LessonUrlUpdate(BaseModel):
    lesson_id: str
    vimeo_url: str = ""
    pdf_url: str = ""

class ModuleContentSave(BaseModel):
    description: Optional[str] = None
    lessons: List[LessonUrlUpdate] = []

@api_router.get("/admin/module-content/{module_id}")
async def get_module_content(module_id: str, coach_id: str = Depends(_require_coach)):
    """Admin: get saved content overrides for a module."""
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    return {"content": doc or {"module_id": module_id, "description": "", "lessons": []}}

@api_router.put("/admin/module-content/{module_id}")
async def save_module_content(module_id: str, data: ModuleContentSave, coach_id: str = Depends(_require_coach)):
    """Admin: save Vimeo URLs, PDF URLs, and description overrides for a module."""
    record = {
        "module_id": module_id,
        "description": data.description or "",
        "lessons": [{"lesson_id": l.lesson_id, "vimeo_url": l.vimeo_url, "pdf_url": l.pdf_url} for l in data.lessons],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.module_content.replace_one({"module_id": module_id}, record, upsert=True)
    return {"ok": True}

@api_router.get("/portal/module-urls/{module_id}")
async def get_module_urls(module_id: str):
    """Portal: get lesson Vimeo/PDF URLs for a module (public endpoint for lesson players)."""
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    if not doc:
        return {"lessons": []}
    return {"lessons": doc.get("lessons", [])}


# ── Admin — Admission Requests ────────────────────────────────────────────────

@api_router.get("/admin/admission-requests")
async def list_admission_requests(coach_id: str = Depends(_require_coach)):
    cursor = db.admission_requests.find({}, {"_id": 1, "carrier_name": 1, "email": 1, "dot_mc_number": 1, "authority_activation_date": 1, "compliance_status": 1, "lane": 1, "submission_date": 1, "status": 1, "approved_at": 1})
    docs = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        docs.append(doc)
    return docs


@api_router.patch("/admin/admission-requests/{admission_id}/status")
async def update_admission_status(admission_id: str, status: str, coach_id: str = Depends(_require_coach)):
    valid_statuses = {"pending_review", "approved", "rejected"}
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")
    await db.admission_requests.update_one(
        {"_id": ObjectId(admission_id)},
        {"$set": {"status": status}},
    )
    return {"ok": True}


# ── Ground 0 ─────────────────────────────────────────────
class Ground0Submit(BaseModel):
    email: EmailStr

@api_router.post("/ground0")
async def submit_ground0(data: Ground0Submit):
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "lead_source": "ground_0_complete",
            "ground_0_complete": "true",
        },
    }
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite Ground 0 error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite Ground 0 request failed: {exc}")
    return {"ok": True}


# ── CPM Calculator ─────────────────────────────────────────
class CPMEmailCapture(BaseModel):
    email: EmailStr

class CPMSaveRequest(BaseModel):
    fixed_cpm: float
    variable_cpm: float
    total_cpm: float
    inputs: dict

class SinsChecklistCapture(BaseModel):
    email: EmailStr

@api_router.post("/sins-checklist")
async def sins_checklist_capture(data: SinsChecklistCapture):
    """16 Deadly Sins checklist download email gate — tags subscriber in MailerLite."""
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "sins_checklist_download", "lead_group": "16 Deadly Sins Downloads"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite sins checklist error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite sins checklist request failed: {exc}")
    return {"ok": True}

@api_router.post("/cpm/email-capture")
async def cpm_email_capture(data: CPMEmailCapture):
    """Public CPM calculator email gate — tags subscriber in MailerLite."""
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "cpm_calculator"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite CPM error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite CPM request failed: {exc}")
    return {"ok": True}

@api_router.get("/tools/access")
async def check_tool_access(request: Request):
    """Soft access check — returns login/paid status for tool gating (no 403)."""
    user = await get_user_from_request(request)
    if not user:
        return {"logged_in": False, "has_access": False}
    if user.get("email") == COACH_EMAIL:
        return {"logged_in": True, "has_access": True}
    access = await db.user_access.find_one({"user_id": user["user_id"]}, {"_id": 0})
    has_access = bool(access and access.get("has_access"))
    return {"logged_in": True, "has_access": has_access}

@api_router.post("/cpm/save")
async def save_cpm_result(data: CPMSaveRequest, request: Request):
    """Portal: save user's calculated CPM to their record."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    record = {
        "user_id": user["user_id"],
        "fixed_cpm": data.fixed_cpm,
        "variable_cpm": data.variable_cpm,
        "total_cpm": data.total_cpm,
        "inputs": data.inputs,
        "calculated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.cpm_results.replace_one({"user_id": user["user_id"]}, record, upsert=True)
    return {"ok": True}

@api_router.get("/cpm/saved")
async def get_saved_cpm(request: Request):
    """Portal: retrieve user's most recent saved CPM."""
    user = await get_user_from_request(request)
    if not user:
        return {"saved": None}
    result = await db.cpm_results.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {"saved": result}


# ── Load Profitability Analyzer ───────────────────
class LoadAnalysisSave(BaseModel):
    load_rate: float
    loaded_miles: float
    deadhead_miles: float
    fuel_surcharge: float
    detention: float
    other_accessorials: float
    load_rpm: float
    verdict: str
    saved_cpm: float

@api_router.post("/tools/load-save")
async def save_load_analysis(data: LoadAnalysisSave, request: Request):
    """Portal: save user's load profitability analysis and push to history (last 10)."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    now = datetime.now(timezone.utc).isoformat()
    record = {
        "load_rate": data.load_rate,
        "loaded_miles": data.loaded_miles,
        "deadhead_miles": data.deadhead_miles,
        "fuel_surcharge": data.fuel_surcharge,
        "detention": data.detention,
        "other_accessorials": data.other_accessorials,
        "load_rpm": data.load_rpm,
        "verdict": data.verdict,
        "saved_cpm": data.saved_cpm,
        "saved_at": now,
    }
    # Most-recent snapshot (for load-on-mount)
    await db.load_analyses.replace_one(
        {"user_id": user["user_id"]},
        {"user_id": user["user_id"], **record},
        upsert=True,
    )
    # History: prepend and cap at 10 entries (newest first)
    await db.load_analysis_history.update_one(
        {"user_id": user["user_id"]},
        {"$push": {"history": {"$each": [record], "$position": 0, "$slice": 10}}},
        upsert=True,
    )
    return {"ok": True}

@api_router.get("/tools/load-saved")
async def get_saved_load_analysis(request: Request):
    """Portal: retrieve user's most recent load analysis."""
    user = await get_user_from_request(request)
    if not user:
        return {"saved": None}
    result = await db.load_analyses.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {"saved": result}

@api_router.get("/tools/load-history")
async def get_load_history(request: Request):
    """Portal: retrieve user's last 10 saved load analyses (newest first)."""
    user = await get_user_from_request(request)
    if not user:
        return {"history": []}
    doc = await db.load_analysis_history.find_one(
        {"user_id": user["user_id"]}, {"_id": 0, "user_id": 0}
    )
    return {"history": doc.get("history", []) if doc else []}


class PortalCheckoutRequest(BaseModel):
    origin_url: str


async def get_user_from_request(request: Request) -> Optional[dict]:
    """Extract and validate the current user from session cookie or Bearer token."""
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    if not session_token:
        return None
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        return None
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        return None
    return await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})


@api_router.get("/portal/access")
async def check_portal_access(request: Request):
    """Return whether the authenticated user has paid cohort access."""
    user = await get_user_from_request(request)
    if not user:
        return {"has_access": False}
    record = await db.user_access.find_one({"user_id": user["user_id"]}, {"_id": 0})
    has_access = bool(record and record.get("has_access") and record.get("access_level") == "cohort")
    return {"has_access": has_access, "user_id": user["user_id"]}


@api_router.post("/portal/checkout")
async def create_portal_checkout(data: PortalCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    user = await get_user_from_request(request)
    user_id = user["user_id"] if user else None

    success_url = f"{data.origin_url}/portal?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/portal"
    session = await asyncio.to_thread(
        stripe_lib.checkout.Session.create,
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": "LaunchPath LPOS Cohort Access"},
                "unit_amount": 250000,
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product": "launchpath_cohort_admission", "user_id": user_id or ""},
    )
    await db.payment_transactions.insert_one({
        "session_id": session.id,
        "user_id": user_id,
        "amount": 2500.00,
        "currency": "usd",
        "payment_status": "pending",
        "status": "initiated",
        "metadata": {"product": "launchpath_cohort_admission"},
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.id}

@api_router.get("/portal/checkout/status/{session_id}")
async def get_portal_checkout_status(session_id: str, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    session = await asyncio.to_thread(stripe_lib.checkout.Session.retrieve, session_id)

    update_fields = {
        "payment_status": session.payment_status,
        "status": session.status,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": update_fields},
        upsert=True,
    )

    if session.payment_status == "paid":
        transaction = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        user_id = transaction.get("user_id") if transaction else None
        if user_id:
            await db.user_access.update_one(
                {"user_id": user_id},
                {"$set": {
                    "has_access": True,
                    "access_level": "cohort",
                    "granted_at": datetime.now(timezone.utc).isoformat(),
                    "stripe_session_id": session_id,
                }},
                upsert=True,
            )

    return {"status": session.status, "payment_status": session.payment_status}

@api_router.post("/webhook/stripe")
@api_router.post("/stripe-webhook")
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
                    {"$set": {
                        "payment_status": "paid",
                        "status": "complete",
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    }},
                    upsert=True,
                )
                transaction = await db.payment_transactions.find_one({"session_id": checkout_session.id}, {"_id": 0})
                user_id = transaction.get("user_id") if transaction else None
                if user_id:
                    await db.user_access.update_one(
                        {"user_id": user_id},
                        {"$set": {
                            "has_access": True,
                            "access_level": "cohort",
                            "granted_at": datetime.now(timezone.utc).isoformat(),
                            "stripe_session_id": checkout_session.id,
                        }},
                        upsert=True,
                    )
                    user_record = await db.users.find_one({"user_id": user_id}, {"_id": 0})
                    if user_record and user_record.get("email") and MAILERLITE_API_TOKEN:
                        try:
                            async with httpx.AsyncClient(timeout=8) as http:
                                await http.post(
                                    MAILERLITE_URL,
                                    headers={
                                        "Content-Type": "application/json",
                                        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
                                    },
                                    json={
                                        "email": user_record["email"],
                                        "status": "active",
                                        "fields": {
                                            "name": user_record.get("name", ""),
                                            "cohort_access": "true",
                                            "cohort_tier": "LPOS_v1_Standard",
                                            "payment_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                                            "stripe_session_id": checkout_session.id,
                                        },
                                    },
                                )
                        except Exception as ml_err:
                            logger.error(f"MailerLite post-payment update failed: {ml_err}")
                    # Email 1 — Immediate payment confirmation
                    if user_record and user_record.get("email"):
                        first_name = (user_record.get("name") or "").split()[0] or "Operator"
                        conf_html = f"""
                        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
                          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Payment Confirmed</p>
                          <h1 style="font-family:'Manrope',sans-serif;font-size:28px;font-weight:700;color:#ffffff;margin:0 0 8px;">You're in the cohort.</h1>
                          <p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">Your payment has been confirmed and your Operator Portal access is active.</p>
                          <div style="background:#0F1E35;border-left:3px solid #C5A059;padding:20px 24px;margin:0 0 28px;">
                            <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A059;margin:0 0 14px;">What's unlocked</p>
                            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0 0 8px;"><strong style="color:#fff;">Modules 1–7</strong> — The full 90-day LaunchPath Operating Standard curriculum, from Business Setup through Post-Audit Recovery.</p>
                            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0 0 8px;"><strong style="color:#fff;">Implementation Sequence</strong> — 10 coach-verified compliance tasks assigned by week.</p>
                            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0;"><strong style="color:#fff;">Administrative Signal</strong> — Live compliance score tracking your Documentary Integrity, System Pulse, and Regulatory Alignment.</p>
                          </div>
                          <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">Your 90-day window is running. The fastest path forward is to open Module 1 today — Business and Authority Setup. It takes less than 30 minutes and sets the foundation for everything else.</p>
                          <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Enter the Operator Portal →</a>
                          <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p>
                        </div>"""
                        asyncio.create_task(send_mailersend_email(
                            user_record["email"], first_name,
                            "Payment confirmed. You have cohort access.",
                            conf_html,
                            reply_to=PAYMENT_EMAIL,
                        ))
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed.")
    return {"ok": True}


# ── Auth ─────────────────────────────────────────────────

class UserOut(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None

@api_router.get("/auth/session")
async def create_auth_session(session_id: str, response: Response):
    """Exchange Emergent session_id for a stored session token and set httpOnly cookie."""
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.get(EMERGENT_AUTH_URL, headers={"X-Session-ID": session_id})
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")

    data = resp.json()
    email = data["email"]
    name = data.get("name", "")
    picture = data.get("picture", "")
    session_token = data["session_token"]

    # Upsert user by email
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc),
        })

    # Upsert session
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.update_one(
        {"user_id": user_id},
        {"$set": {
            "session_token": session_token,
            "expires_at": expires_at,
            "updated_at": datetime.now(timezone.utc),
        }},
        upsert=True,
    )

    # Auto-seed implementation sequence tasks for new carriers (first-time login)
    existing_tasks = await db.tasks.count_documents({"carrierId": user_id})
    if existing_tasks == 0:
        await seed_standard_tasks_for_carrier(user_id)
        await db.carrierProfiles.update_one(
            {"carrierId": user_id},
            {"$set": {
                "carrierId": user_id,
                "lastActiveAt": datetime.now(timezone.utc).isoformat(),
                "createdAt": datetime.now(timezone.utc).isoformat(),
            }},
            upsert=True,
        )
        # Send welcome email on first login
        first_name = name.split()[0] if name else "Operator"
        welcome_html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; LP-SYS-001</p>

          <h1 style="font-family:'Manrope',sans-serif;font-size:28px;font-weight:700;line-height:1.2;color:#ffffff;margin:0 0 8px;">Your authority is active.</h1>
          <h2 style="font-family:'Manrope',sans-serif;font-size:22px;font-weight:500;line-height:1.2;color:#C5A059;margin:0 0 28px;">Now the clock is running.</h2>

          <p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 24px;">
            Welcome, {first_name}. You've been enrolled in the LaunchPath Operating Standard — a 90-day guided implementation program built specifically for new motor carriers navigating the FMCSA compliance window.
          </p>

          <div style="background:#0F1E35;border-left:3px solid #C5A059;padding:20px 24px;margin:0 0 28px;">
            <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A059;margin:0 0 12px;">What happens next</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0 0 8px;">
              <strong style="color:#ffffff;">Step 1 — Begin Ground 0.</strong> Six foundational modules that establish the operational reality every new carrier must understand before touching a compliance document.
            </p>
            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0 0 8px;">
              <strong style="color:#ffffff;">Step 2 — Run the REACH Assessment.</strong> A 15-question readiness diagnostic that scores your current position across five compliance domains and returns a GO / WAIT / NO-GO result.
            </p>
            <p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0;">
              <strong style="color:#ffffff;">Step 3 — Work the Implementation Sequence.</strong> Ten prioritized compliance tasks, assigned by week, verified by your LaunchPath coach.
            </p>
          </div>

          <p style="font-size:14px;color:rgba(255,255,255,0.60);line-height:1.75;margin:0 0 32px;">
            Most carriers focus on loads in the first 90 days. FMCSA is already watching. What you build now shapes what the agency finds between Month 9 and Month 18. Authority failure is rarely caused by lack of effort — it is caused by missing operational infrastructure.
          </p>

          <a href="{FRONTEND_URL}/ground-0-briefing" style="display:inline-block;background:#C5A059;color:#002244;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Begin Ground 0 →</a>

          <p style="font-size:12px;color:rgba(255,255,255,0.30);margin:36px 0 0;line-height:1.6;">
            This message was sent because you signed in to LaunchPath for the first time.<br>
            LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.
          </p>
        </div>"""
        asyncio.create_task(send_mailersend_email(
            email, first_name,
            "Your authority is active. Now the clock is running.",
            welcome_html,
        ))

    response.set_cookie(
        "session_token",
        session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=604800,
    )
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return {"ok": True, "user": UserOut(**user).model_dump()}


@api_router.get("/auth/me")
async def get_current_user(request: Request):
    """Verify session token and return current user."""
    # Check cookie first, then Authorization header as fallback
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")

    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")

    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return UserOut(**user).model_dump()


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    """Delete session and clear cookie."""
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


class LoginRequest(BaseModel):
    email: str
    password: str

COACH_EMAIL = os.environ.get("COACH_EMAIL", "vince@launchpathedu.com")
COACH_PASSWORD = os.environ.get("COACH_PASSWORD", "safestart2024!")

async def _create_user_session(user_id: str, response: Response) -> str:
    """Create a session for a user and set httpOnly cookie. Returns session_token."""
    session_token = uuid.uuid4().hex
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.update_one(
        {"user_id": user_id},
        {"$set": {
            "session_token": session_token,
            "expires_at": expires_at,
            "updated_at": datetime.now(timezone.utc),
        }},
        upsert=True,
    )
    response.set_cookie(
        "session_token",
        session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=604800,
    )
    return session_token


@api_router.post("/auth/login")
async def login(body: LoginRequest, response: Response):
    """Login for coach (hardcoded) and regular operators (email/password)."""
    # Coach shortcut
    if body.email == COACH_EMAIL and body.password == COACH_PASSWORD:
        existing = await db.users.find_one({"email": COACH_EMAIL}, {"_id": 0})
        if existing:
            user_id = existing["user_id"]
        else:
            user_id = f"user_{uuid.uuid4().hex[:12]}"
            await db.users.insert_one({
                "user_id": user_id,
                "email": COACH_EMAIL,
                "name": "Vince Lawrence",
                "picture": "",
                "created_at": datetime.now(timezone.utc),
            })
        await _create_user_session(user_id, response)
        return {"ok": True, "user": {"user_id": user_id, "email": COACH_EMAIL, "name": "Vince Lawrence", "picture": ""}}

    # Regular operator login
    user = await db.users.find_one({"email": body.email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    password_hash = user.get("password_hash")
    if not password_hash:
        raise HTTPException(status_code=401, detail="This account uses Google sign-in. Please use 'Continue with Google'.")
    if not pwd_context.verify(body.password, password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await _create_user_session(user["user_id"], response)
    user_out = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0, "password_hash": 0})
    return {"ok": True, "user": UserOut(**user_out).model_dump()}


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


@api_router.post("/auth/register")
async def register_user(body: RegisterRequest, response: Response):
    """Register a new operator account with email and password."""
    existing = await db.users.find_one({"email": body.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists. Please sign in.")

    hashed = pwd_context.hash(body.password)
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    now = datetime.now(timezone.utc)
    display_name = (body.name or "").strip() or body.email.split("@")[0]

    await db.users.insert_one({
        "user_id": user_id,
        "email": body.email,
        "name": display_name,
        "picture": "",
        "password_hash": hashed,
        "created_at": now,
    })

    await _create_user_session(user_id, response)

    # Seed implementation tasks for new carrier
    existing_tasks = await db.tasks.count_documents({"carrierId": user_id})
    if existing_tasks == 0:
        await seed_standard_tasks_for_carrier(user_id)
        await db.carrierProfiles.update_one(
            {"carrierId": user_id},
            {"$set": {
                "carrierId": user_id,
                "lastActiveAt": now.isoformat(),
                "createdAt": now.isoformat(),
            }},
            upsert=True,
        )

    user_out = {"user_id": user_id, "email": body.email, "name": display_name, "picture": ""}
    return {"ok": True, "user": UserOut(**user_out).model_dump()}


# ── Ground 0 Progress ─────────────────────────────────────────────────────────

class Ground0ProgressRequest(BaseModel):
    completed_lessons: List[int]
    decision: Optional[str] = None


@api_router.post("/ground0/progress")
async def save_ground0_progress(data: Ground0ProgressRequest, request: Request):
    """Save Ground 0 lesson completion progress for the authenticated user."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    await db.ground0_progress.update_one(
        {"user_id": user["user_id"]},
        {"$set": {
            "user_id": user["user_id"],
            "completed_lessons": data.completed_lessons,
            "decision": data.decision,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    return {"ok": True}


@api_router.get("/ground0/progress")
async def get_ground0_progress(request: Request):
    """Get Ground 0 progress for the authenticated user."""
    user = await get_user_from_request(request)
    if not user:
        return {"completed_lessons": [], "decision": None}
    progress = await db.ground0_progress.find_one({"user_id": user["user_id"]}, {"_id": 0, "user_id": 0})
    if not progress:
        return {"completed_lessons": [], "decision": None}
    return progress


# ── Ground 0 Eligibility Capture (WAIT / NO-GO) ───────────────────────────────

MAILERLITE_COHORT_WAITLIST_GROUP_ID = os.environ.get("MAILERLITE_COHORT_WAITLIST_GROUP_ID", "")
MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID = os.environ.get("MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID", "")


class Ground0WaitlistRequest(BaseModel):
    email: EmailStr
    status: str
    completion_date: Optional[str] = None
    reach_resources: Optional[str] = None
    reach_experience: Optional[str] = None
    reach_authority: Optional[str] = None
    reach_commitment: Optional[str] = None
    reach_discipline: Optional[str] = None
    gaps_remaining: Optional[int] = None


@api_router.post("/ground0/waitlist")
async def ground0_waitlist(data: Ground0WaitlistRequest):
    """Capture WAIT/NO-GO completions: save to DB and subscribe to MailerLite."""
    if data.status not in ("WAIT", "NO-GO"):
        raise HTTPException(status_code=400, detail="Invalid status value.")

    now = datetime.now(timezone.utc)

    # Persist lead to MongoDB for tracking
    await db.ground0_waitlist.update_one(
        {"email": data.email},
        {"$set": {
            "email": data.email,
            "status": data.status,
            "completion_date": data.completion_date or now.isoformat()[:10],
            "reach_resources": data.reach_resources,
            "reach_experience": data.reach_experience,
            "reach_authority": data.reach_authority,
            "reach_commitment": data.reach_commitment,
            "reach_discipline": data.reach_discipline,
            "gaps_remaining": data.gaps_remaining,
            "created_at": now.isoformat(),
        }},
        upsert=True,
    )

    # Resolve MailerLite group and lead source tag
    if data.status == "WAIT":
        lead_source = "ground0_wait"
        group_id = MAILERLITE_COHORT_WAITLIST_GROUP_ID
    else:
        lead_source = "ground0_nogo"
        group_id = MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID

    ml_fields: dict = {
        "lead_source": lead_source,
        "ground0_status": data.status,
        "ground0_completion_date": data.completion_date or now.isoformat()[:10],
    }
    if data.reach_resources:
        ml_fields["reach_resources"] = data.reach_resources
    if data.reach_experience:
        ml_fields["reach_experience"] = data.reach_experience
    if data.reach_authority:
        ml_fields["reach_authority"] = data.reach_authority
    if data.reach_commitment:
        ml_fields["reach_commitment"] = data.reach_commitment
    if data.reach_discipline:
        ml_fields["reach_discipline"] = data.reach_discipline
    if data.gaps_remaining is not None:
        ml_fields["gaps_remaining"] = str(data.gaps_remaining)

    ml_payload: dict = {
        "email": data.email,
        "status": "active",
        "fields": ml_fields,
    }
    if group_id:
        ml_payload["groups"] = [group_id]

    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=ml_payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite ground0_waitlist error {resp.status_code}: {resp.text}")
            # MongoDB record already saved — don't fail the user-facing request

    return {"ok": True}


# ── Administrative Signal ─────────────────────────────────

class SignalResponse(BaseModel):
    carrierId: str
    integrity: int
    pulse: int
    alignment: int
    signal: int
    last_active_days: Optional[int] = None


@api_router.get("/signal/{carrierId}", response_model=SignalResponse)
async def get_carrier_signal(carrierId: str):
    """
    Calculate the Administrative Signal for a carrier.
    Signal = 0.4 * Documentary Integrity + 0.3 * System Pulse + 0.3 * Regulatory Alignment
    """
    # 1. System Pulse — decay based on lastActiveAt
    profile = await db.carrierProfiles.find_one({"carrierId": carrierId}, {"_id": 0})
    last_active_days = None
    if profile and profile.get("lastActiveAt"):
        last_active = profile["lastActiveAt"]
        if isinstance(last_active, str):
            last_active = datetime.fromisoformat(last_active)
        if last_active.tzinfo is None:
            last_active = last_active.replace(tzinfo=timezone.utc)
        last_active_days = (datetime.now(timezone.utc) - last_active).days
        if last_active_days <= 3:
            pulse = 100
        elif last_active_days <= 7:
            pulse = 70
        elif last_active_days <= 14:
            pulse = 40
        else:
            pulse = 20
    else:
        pulse = 100  # No profile yet — treat as fully active

    # 2. Documentary Integrity — (Verified / Total) * 100
    all_tasks = await db.tasks.find({"carrierId": carrierId}, {"_id": 0}).to_list(100)
    if all_tasks:
        total = len(all_tasks)
        verified = sum(1 for t in all_tasks if t.get("status", "").lower() == "verified")
        integrity = round((verified / total) * 100)
    else:
        integrity = 0

    # 3. Regulatory Alignment — (Verified this week / Total this week) * 100
    current_week = date.today().isocalendar()[1]
    week_tasks = [t for t in all_tasks if t.get("assignedWeek") == current_week]
    if week_tasks:
        total_week = len(week_tasks)
        verified_week = sum(1 for t in week_tasks if t.get("status", "").lower() == "verified")
        alignment = round((verified_week / total_week) * 100)
    else:
        alignment = 0

    signal = round(0.4 * integrity + 0.3 * pulse + 0.3 * alignment)

    return SignalResponse(
        carrierId=carrierId,
        integrity=integrity,
        pulse=pulse,
        alignment=alignment,
        signal=signal,
        last_active_days=last_active_days,
    )


@api_router.post("/signal/seed/{carrierId}")
async def seed_carrier_data(carrierId: str):
    """Seed realistic mock data for a carrier — for testing and demo purposes."""
    await db.carrierProfiles.update_one(
        {"carrierId": carrierId},
        {"$set": {
            "carrierId": carrierId,
            "lastActiveAt": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )

    # Replace tasks for this carrier — use full implementation sequence definitions
    await db.tasks.delete_many({"carrierId": carrierId})
    current_week = date.today().isocalendar()[1]
    now_iso = datetime.now(timezone.utc).isoformat()

    # First 6 tasks verified, last 4 pending (for realistic demo data)
    verified_ids = {"DQ-001", "DA-001", "INS-001", "UCR-001", "BOC3-001", "MCS150-001"}
    task_templates = []
    for t in STANDARD_10_TASKS:
        status = "verified" if t["taskId"] in verified_ids else "pending"
        week = current_week + t["weekOffset"] - 1
        task = {
            "carrierId": carrierId,
            "taskId": t["taskId"],
            "name": t["name"],
            "category": t["category"],
            "priority": t["priority"],
            "description": t["description"],
            "status": status,
            "assignedWeek": week,
            "createdAt": now_iso,
        }
        if status == "verified":
            task["verifiedAt"] = now_iso
            task["verifiedBy"] = COACH_EMAIL
        task_templates.append(task)

    await db.tasks.insert_many(task_templates)

    return {"ok": True, "carrierId": carrierId, "tasks_seeded": len(task_templates)}


# ── Task Submission & Verification Workflow ──────────────────

class CoachActionRequest(BaseModel):
    carrierId: str
    coachNote: Optional[str] = None


@api_router.get("/tasks/{carrierId}")
async def get_carrier_tasks(carrierId: str, request: Request):
    """Returns the full task list for a carrier. Carriers see own tasks; coach sees any."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if user.get("email") != COACH_EMAIL and user["user_id"] != carrierId:
        raise HTTPException(status_code=403, detail="Access denied")
    priority_rank = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    tasks = await db.tasks.find({"carrierId": carrierId}, {"_id": 0}).to_list(100)
    tasks.sort(key=lambda t: (t.get("assignedWeek", 99), priority_rank.get(t.get("priority", "low"), 3)))
    return {"tasks": tasks}


@api_router.patch("/tasks/{taskId}/submit")
async def submit_task(taskId: str, request: Request):
    """Carrier submits a task for coach verification."""
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    carrier_id = user["user_id"]
    task = await db.tasks.find_one({"carrierId": carrier_id, "taskId": taskId}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.get("status") == "verified":
        raise HTTPException(status_code=400, detail="Task already verified")
    now_iso = datetime.now(timezone.utc).isoformat()
    await db.tasks.update_one(
        {"carrierId": carrier_id, "taskId": taskId},
        {"$set": {"status": "submitted", "submittedAt": now_iso}},
    )
    # Pulse boost — update lastActiveAt for immediate signal improvement
    await db.carrierProfiles.update_one(
        {"carrierId": carrier_id},
        {"$set": {"lastActiveAt": now_iso, "updatedAt": now_iso}},
        upsert=True,
    )
    return {"ok": True, "taskId": taskId, "status": "submitted"}


@api_router.patch("/tasks/{taskId}/verify")
async def verify_task(taskId: str, data: CoachActionRequest, request: Request):
    """Coach verifies a submitted task — triggers Integrity increase."""
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")
    task = await db.tasks.find_one({"carrierId": data.carrierId, "taskId": taskId}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    now_iso = datetime.now(timezone.utc).isoformat()
    await db.tasks.update_one(
        {"carrierId": data.carrierId, "taskId": taskId},
        {"$set": {"status": "verified", "verifiedAt": now_iso, "verifiedBy": user["email"], "coachNote": ""}},
    )
    # Send verified notification email
    carrier = await db.users.find_one({"user_id": data.carrierId}, {"_id": 0})
    if carrier and carrier.get("email"):
        task_name = task.get("name", taskId)
        html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid #C5A059;">
          <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">LaunchPath Operating Standard</p>
          <h1 style="font-size:24px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">Compliance Item Verified</h1>
          <p style="font-size:16px;color:#dde5ec;margin-bottom:24px;">Your submission for <strong style="color:#C5A059;">{task_name}</strong> has been reviewed and verified by your LaunchPath coach.</p>
          <div style="background:#0F1E35;border-left:3px solid #C5A059;padding:16px 20px;margin-bottom:28px;">
            <p style="margin:0;font-size:14px;color:#dde5ec;">This item is now marked <strong style="color:#C5A059;">VERIFIED</strong> in your Implementation Sequence. Your Administrative Signal has been updated.</p>
          </div>
          <p style="font-size:14px;color:#dde5ec;margin-bottom:32px;">Log in to your portal to view your updated compliance score and next priority items.</p>
          <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">View Portal</a>
          <p style="font-size:12px;color:#8a9ab0;margin-top:32px;">This is an automated notification from the LaunchPath Operating Standard. Do not reply to this email.</p>
        </div>"""
        asyncio.create_task(send_mailersend_email(
            carrier["email"], carrier.get("name", "Operator"),
            f"Verified: {task_name}", html
        ))
    return {"ok": True, "taskId": taskId, "status": "verified"}


@api_router.patch("/tasks/{taskId}/remediate")
async def remediate_task(taskId: str, data: CoachActionRequest, request: Request):
    """Coach requests changes on a submitted task."""
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")
    task = await db.tasks.find_one({"carrierId": data.carrierId, "taskId": taskId}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    now_iso = datetime.now(timezone.utc).isoformat()
    coach_note = data.coachNote or ""
    await db.tasks.update_one(
        {"carrierId": data.carrierId, "taskId": taskId},
        {"$set": {
            "status": "needs_changes",
            "coachNote": coach_note,
            "remediationAt": now_iso,
            "remediatedBy": user["email"],
        }},
    )
    # Send action required notification email
    carrier = await db.users.find_one({"user_id": data.carrierId}, {"_id": 0})
    if carrier and carrier.get("email"):
        task_name = task.get("name", taskId)
        note_block = f'<div style="background:#1a0a00;border-left:3px solid #E8590F;padding:16px 20px;margin-bottom:28px;"><p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#E8590F;">Coach Note</p><p style="margin:0;font-size:14px;color:#dde5ec;">{coach_note}</p></div>' if coach_note else ""
        html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid #E8590F;">
          <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">LaunchPath Operating Standard</p>
          <h1 style="font-size:24px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">Action Required</h1>
          <p style="font-size:16px;color:#dde5ec;margin-bottom:24px;">Your submission for <strong style="color:#C5A059;">{task_name}</strong> requires additional attention before it can be verified.</p>
          {note_block}
          <p style="font-size:14px;color:#dde5ec;margin-bottom:32px;">Log in to your portal, review the note above, and resubmit when ready.</p>
          <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">Go to Portal</a>
          <p style="font-size:12px;color:#8a9ab0;margin-top:32px;">This is an automated notification from the LaunchPath Operating Standard. Do not reply to this email.</p>
        </div>"""
        asyncio.create_task(send_mailersend_email(
            carrier["email"], carrier.get("name", "Operator"),
            f"Action Required: {task_name}", html
        ))
    return {"ok": True, "taskId": taskId, "status": "needs_changes"}


# ── Coach Registry ────────────────────────────────────────────

@api_router.get("/coach/carriers")
async def get_coach_carriers(request: Request):
    """Coach command center: all carriers with signal + submitted task queue."""
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")

    pipeline = [
        {"$group": {
            "_id": "$carrierId",
            "totalTasks": {"$sum": 1},
            "verifiedTasks": {"$sum": {"$cond": [{"$eq": [{"$toLower": "$status"}, "verified"]}, 1, 0]}},
            "submittedTasks": {"$sum": {"$cond": [{"$eq": ["$status", "submitted"]}, 1, 0]}},
            "needsChangesTasks": {"$sum": {"$cond": [{"$eq": ["$status", "needs_changes"]}, 1, 0]}},
        }},
        {"$sort": {"submittedTasks": -1, "_id": 1}},
    ]
    carrier_stats = await db.tasks.aggregate(pipeline).to_list(100)

    carriers = []
    for stat in carrier_stats:
        cid = stat["_id"]
        user_info = await db.users.find_one({"user_id": cid}, {"_id": 0})
        profile = await db.carrierProfiles.find_one({"carrierId": cid}, {"_id": 0})
        # Pulse calculation
        if profile and profile.get("lastActiveAt"):
            la = profile["lastActiveAt"]
            if isinstance(la, str):
                la = datetime.fromisoformat(la)
            if la.tzinfo is None:
                la = la.replace(tzinfo=timezone.utc)
            days = (datetime.now(timezone.utc) - la).days
            pulse = 100 if days <= 3 else 70 if days <= 7 else 40 if days <= 14 else 20
        else:
            pulse = 100
        integrity = round((stat["verifiedTasks"] / stat["totalTasks"]) * 100) if stat["totalTasks"] > 0 else 0
        signal = round(0.4 * integrity + 0.3 * pulse)
        carriers.append({
            "carrierId": cid,
            "name": (user_info or {}).get("name", "Unknown"),
            "email": (user_info or {}).get("email", ""),
            "totalTasks": stat["totalTasks"],
            "verifiedTasks": stat["verifiedTasks"],
            "submittedTasks": stat["submittedTasks"],
            "needsChangesTasks": stat["needsChangesTasks"],
            "integrity": integrity,
            "pulse": pulse,
            "signal": signal,
        })

    submitted_queue = await db.tasks.find(
        {"status": "submitted"}, {"_id": 0}
    ).sort("submittedAt", 1).to_list(200)

    return {"carriers": carriers, "submittedQueue": submitted_queue}


# ── PDF / Deliverables Endpoints ──────────────────────────────────────────────

async def _require_paid(request: Request):
    session_token = request.cookies.get("session_token")
    if not session_token:
        raise HTTPException(status_code=403, detail="Not authorised")
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=403, detail="Not authorised")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0, "email": 1})
    if user and user.get("email") == COACH_EMAIL:
        return session["user_id"]
    access = await db.user_access.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not access or not access.get("has_access"):
        raise HTTPException(status_code=403, detail="Access not granted")
    return session["user_id"]

@api_router.post("/admin/pdfs/upload")
async def upload_pdf(
    request: Request,
    file: UploadFile = File(...),
    display_name: str = Form(...),
    description: str = Form(""),
    category: str = Form("general"),
):
    await _require_coach(request)
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")
    data = await file.read()
    if len(data) > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 50MB)")
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/pdfs/{file_id}.pdf"
    try:
        result = await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_put(path, data, "application/pdf")
        )
    except Exception as e:
        logger.error(f"Storage upload failed: {e}")
        raise HTTPException(status_code=502, detail="Storage upload failed")
    doc = {
        "id": file_id,
        "storage_path": result["path"],
        "original_filename": file.filename,
        "display_name": display_name,
        "description": description,
        "category": category,
        "size": len(data),
        "is_deleted": False,
        "download_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.pdfs.insert_one({**doc, "_id": file_id})
    return {k: v for k, v in doc.items()}

@api_router.get("/admin/pdfs")
async def list_pdfs_admin(request: Request):
    await _require_coach(request)
    docs = await db.pdfs.find({"is_deleted": False}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs

@api_router.patch("/admin/pdfs/{pdf_id}")
async def update_pdf(pdf_id: str, request: Request):
    await _require_coach(request)
    body = await request.json()
    allowed = {k: v for k, v in body.items() if k in ("display_name", "description", "category")}
    if not allowed:
        raise HTTPException(status_code=400, detail="Nothing to update")
    result = await db.pdfs.update_one({"id": pdf_id, "is_deleted": False}, {"$set": allowed})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="PDF not found")
    return {"ok": True}

@api_router.delete("/admin/pdfs/{pdf_id}")
async def delete_pdf(pdf_id: str, request: Request):
    await _require_coach(request)
    result = await db.pdfs.update_one({"id": pdf_id}, {"$set": {"is_deleted": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="PDF not found")
    return {"ok": True}

@api_router.get("/portal/pdfs")
async def list_pdfs_portal(request: Request):
    await _require_paid(request)
    docs = await db.pdfs.find(
        {"is_deleted": False}, {"_id": 0, "storage_path": 0}
    ).sort("created_at", -1).to_list(200)
    return docs

@api_router.get("/portal/pdfs/{pdf_id}/download")
async def download_pdf(pdf_id: str, request: Request):
    await _require_paid(request)
    doc = await db.pdfs.find_one({"id": pdf_id, "is_deleted": False}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="PDF not found")
    try:
        data, content_type = await asyncio.get_event_loop().run_in_executor(
            None, lambda: storage_get(doc["storage_path"])
        )
    except Exception as e:
        logger.error(f"Storage download failed: {e}")
        raise HTTPException(status_code=502, detail="Could not retrieve file")
    await db.pdfs.update_one({"id": pdf_id}, {"$inc": {"download_count": 1}})
    safe_name = doc.get("original_filename", "document.pdf").replace('"', '')
    return Response(
        content=data,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )


# ── 7-Day Follow-Up Email Worker ─────────────────────────────

async def _send_onboarding_checkin_emails():
    """Send Day 3 and Day 14 post-payment check-in emails to cohort members."""
    now = datetime.now(timezone.utc)
    day3_start = now - timedelta(days=4)
    day3_end = now - timedelta(days=3)
    day14_start = now - timedelta(days=15)
    day14_end = now - timedelta(days=14)

    for day, start, end, flag, subject_prefix in [
        (3, day3_start, day3_end, "onboarding_day3_sent_at", "Day 3"),
        (14, day14_start, day14_end, "onboarding_day14_sent_at", "Day 14"),
    ]:
        records = await db.user_access.find(
            {
                "has_access": True,
                "access_level": "cohort",
                "granted_at": {"$gte": start.isoformat(), "$lte": end.isoformat()},
                flag: {"$exists": False},
            },
            {"_id": 0},
        ).to_list(100)

        for record in records:
            user_id = record.get("user_id")
            if not user_id:
                continue
            user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
            if not user or not user.get("email"):
                continue

            first_name = (user.get("name") or "").split()[0] or "Operator"
            email = user["email"]

            # Get task progress
            all_tasks = await db.tasks.find({"carrierId": user_id}, {"_id": 0}).to_list(20)
            verified = sum(1 for t in all_tasks if t.get("status") == "verified")
            submitted = sum(1 for t in all_tasks if t.get("status") == "submitted")
            pending = sum(1 for t in all_tasks if t.get("status") == "pending")
            total = len(all_tasks)

            if day == 3:
                subject = "Day 3: Have you opened Module 1 yet?"
                html = f"""
                <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
                  <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Day 3 Check-In</p>
                  <h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">You're 3 days into your<br>90-day window.</h1>
                  <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">Most carriers who lose their authority made the same mistake: they assumed the compliance work could wait. Day 3 is when the operators who succeed start.</p>
                  <div style="background:#0F1E35;border-radius:6px;padding:20px 24px;margin:0 0 28px;">
                    <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.75);margin:0 0 14px;">Your progress so far</p>
                    <div style="display:flex;gap:24px;">
                      <div><p style="font-size:28px;font-weight:700;color:#C5A059;margin:0 0 2px;">{verified}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Verified</p></div>
                      <div><p style="font-size:28px;font-weight:700;color:#F59E0B;margin:0 0 2px;">{submitted}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Submitted</p></div>
                      <div><p style="font-size:28px;font-weight:700;color:rgba(255,255,255,0.35);margin:0 0 2px;">{pending}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Pending</p></div>
                    </div>
                  </div>
                  <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 14px;"><strong style="color:#fff;">Module 1 — Business and Authority Setup</strong> covers the foundational documents every new carrier must have in place before FMCSA starts the clock on your New Entrant Safety Audit window. It takes under an hour.</p>
                  <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">Open the portal, find Module 1 in your curriculum, and complete the first lesson today.</p>
                  <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Open Module 1 →</a>
                  <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p>
                </div>"""
            else:  # day == 14
                subject = "Two weeks in. Where does your compliance stand?"
                integrity_pct = round((verified / total) * 100) if total else 0
                if verified >= 3:
                    pace_msg = '<p style="font-size:13px;color:#4CAF50;margin:0;">You\'re on pace. Keep submitting tasks to maintain momentum.</p>'
                else:
                    pace_msg = '<p style="font-size:13px;color:#E8590F;margin:0;">You\'re behind pace. Prioritize the critical items in your Implementation Sequence this week.</p>'
                html = f"""
                <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
                  <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Day 14 Milestone</p>
                  <h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">Two weeks in,<br>{90 - 14} days remaining.</h1>
                  <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">At the two-week mark, operators on pace with the LaunchPath Standard have typically completed their first 3–4 critical compliance items. Here's where you stand.</p>
                  <div style="background:#0F1E35;border-radius:6px;padding:20px 24px;margin:0 0 28px;">
                    <p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.75);margin:0 0 14px;">Administrative Signal — Day 14</p>
                    <div style="display:flex;gap:32px;margin-bottom:16px;">
                      <div><p style="font-size:32px;font-weight:700;color:#C5A059;margin:0 0 2px;">{verified}/{total}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Tasks verified</p></div>
                      <div><p style="font-size:32px;font-weight:700;color:#C5A059;margin:0 0 2px;">{integrity_pct}%</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Documentary Integrity</p></div>
                    </div>
                    {pace_msg}
                  </div>
                  <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">Your LaunchPath coach is ready to verify any submitted tasks. Submit your completed items in the portal — each verification increases your Documentary Integrity score and moves your signal higher.</p>
                  <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Check Your Signal →</a>
                  <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p>
                </div>"""

            await send_mailersend_email(email, first_name, subject, html)
            await db.user_access.update_one(
                {"user_id": user_id},
                {"$set": {flag: now.isoformat()}},
            )
            logger.info(f"Onboarding Day {day} email sent to {user_id}")


async def _send_followup_emails():
    """Find users who signed in 7+ days ago but never submitted a task, and nudge them."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    # Users created before the cutoff who haven't been sent a followup yet
    candidates = await db.users.find(
        {
            "created_at": {"$lte": cutoff},
            "followup_7d_sent_at": {"$exists": False},
        },
        {"_id": 0},
    ).to_list(200)

    sent_count = 0
    for user in candidates:
        user_id = user.get("user_id")
        email = user.get("email")
        if not user_id or not email:
            continue

        # Skip if they've already submitted or verified any task
        active = await db.tasks.count_documents(
            {"carrierId": user_id, "status": {"$in": ["submitted", "verified"]}}
        )
        if active > 0:
            # They're engaged — just mark so we don't re-check endlessly
            await db.users.update_one(
                {"user_id": user_id},
                {"$set": {"followup_7d_sent_at": "skipped_engaged"}},
            )
            continue

        # Get their top 2 pending tasks (critical → high → medium)
        priority_rank = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        pending = await db.tasks.find(
            {"carrierId": user_id, "status": "pending"},
            {"_id": 0},
        ).to_list(20)
        pending.sort(key=lambda t: priority_rank.get(t.get("priority", "low"), 3))
        top_tasks = pending[:2]

        task_rows = ""
        for t in top_tasks:
            priority_color = {"critical": "#E8590F", "high": "#F59E0B", "medium": "#C5A059"}.get(
                t.get("priority", "medium"), "#C5A059"
            )
            task_rows += f"""
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);">
                <p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 3px;">{t.get("name","")}</p>
                <p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">{t.get("description","")[:90]}...</p>
              </td>
              <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);white-space:nowrap;vertical-align:top;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:{priority_color};">{t.get("priority","").upper()}</span>
              </td>
            </tr>"""

        task_table = f"""
          <table style="width:100%;border-collapse:collapse;background:#0F1E35;border-radius:6px;overflow:hidden;margin:0 0 28px;">
            <thead>
              <tr style="background:#0A1520;">
                <th style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.75);font-weight:600;">Pending Task</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.75);font-weight:600;">Priority</th>
              </tr>
            </thead>
            <tbody>{task_rows}</tbody>
          </table>""" if task_rows else ""

        first_name = user.get("name", "").split()[0] if user.get("name") else "Operator"
        html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Implementation Sequence</p>

          <h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">Your Implementation Sequence<br>is still waiting.</h1>
          <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">
            {first_name}, you signed in to LaunchPath but your compliance tasks haven't moved yet. Every day inside the 90-day window that passes without action narrows your margin.
          </p>

          {task_table}

          <p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">
            Your Implementation Sequence has {len(pending)} item{"s" if len(pending) != 1 else ""} pending. Your LaunchPath coach is ready to verify each one as you complete it. The portal is where the work happens.
          </p>

          <a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Return to the Portal →</a>

          <p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">
            You're receiving this because you enrolled in the LaunchPath Operating Standard 7 days ago and your implementation sequence hasn't started. Reply to opt out of follow-up reminders.<br>
            LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.
          </p>
        </div>"""

        await send_mailersend_email(
            email, first_name,
            "Your Implementation Sequence is still waiting.",
            html,
        )
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"followup_7d_sent_at": datetime.now(timezone.utc).isoformat()}},
        )
        sent_count += 1

    logger.info(f"7-day followup worker: {sent_count} emails sent out of {len(candidates)} candidates.")


async def followup_email_worker():
    """Background worker — runs once daily. Handles: 7-day nudge + Day 3/14 onboarding check-ins."""
    await asyncio.sleep(3600)  # Initial delay: 1 hour after startup
    while True:
        try:
            await _send_onboarding_checkin_emails()
            await _send_followup_emails()
        except Exception as e:
            logger.error(f"Followup email worker error: {e}")
        await asyncio.sleep(86400)  # Run every 24 hours


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(followup_email_worker())


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()