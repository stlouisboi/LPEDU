"""Shared config, DB connection, and helper functions for all route modules."""
import os
import logging
import asyncio
import httpx
import uuid
import requests as sync_requests
from datetime import datetime, timezone, date, timedelta
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from fastapi import HTTPException, Request

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ── Database ─────────────────────────────────────────────────────────────────
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# ── Config ────────────────────────────────────────────────────────────────────
MAILERLITE_API_TOKEN = os.environ.get("MAILERLITE_API_TOKEN", "")
MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers"
MAILERLITE_COHORT_WAITLIST_GROUP_ID = os.environ.get("MAILERLITE_COHORT_WAITLIST_GROUP_ID", "")
MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID = os.environ.get("MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID", "")

STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "")
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

MAILERSEND_API_KEY = os.environ.get("MAILERSEND_API_KEY", "")
MAILERSEND_FROM_EMAIL = os.environ.get("MAILERSEND_FROM_EMAIL", "")
MAILERSEND_FROM_NAME = os.environ.get("MAILERSEND_FROM_NAME", "LaunchPath")

FRONTEND_URL = os.environ.get("FRONTEND_URL")
EMERGENT_AUTH_URL = os.environ.get("EMERGENT_AUTH_URL")
SUPPORT_EMAIL = os.environ.get("SUPPORT_EMAIL")
PAYMENT_EMAIL = os.environ.get("PAYMENT_EMAIL")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

COACH_EMAIL = os.environ.get("COACH_EMAIL")
COACH_PASSWORD = os.environ.get("COACH_PASSWORD")
SINS_CHECKLIST_URL = os.environ.get("SINS_CHECKLIST_URL", "")

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# ── Auth helpers ──────────────────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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


# ── Email ─────────────────────────────────────────────────────────────────────
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
            resp = await http.post(
                "https://api.mailersend.com/v1/email",
                headers={"Authorization": f"Bearer {MAILERSEND_API_KEY}", "Content-Type": "application/json"},
                json=payload,
            )
        if resp.status_code not in (200, 201, 202):
            logger.error(f"MailerSend error {resp.status_code}: {resp.text[:500]}")
        else:
            logger.info(f"MailerSend email sent to {to_email} ({resp.status_code})")
    except Exception as e:
        logger.error(f"MailerSend send failed: {e}")


# ── Emergent Object Storage ───────────────────────────────────────────────────
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


def storage_delete(path: str) -> None:
    key = init_storage()
    resp = sync_requests.delete(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key}, timeout=30,
    )
    # 404 is fine — file already gone
    if resp.status_code not in (200, 204, 404):
        resp.raise_for_status()


# ── Implementation Sequence ───────────────────────────────────────────────────
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
