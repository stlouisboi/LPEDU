from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta, date
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

MAILERLITE_API_TOKEN = os.environ.get('MAILERLITE_API_TOKEN', '')
MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers"
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', '')
COACH_EMAIL = "vince@launchpathedu.com"

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
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
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
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite Ground 0 error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save submission.")
    return {"ok": True}


# ── Portal / Stripe Checkout ──────────────────────────────
class PortalCheckoutRequest(BaseModel):
    origin_url: str

def get_stripe(request: Request) -> StripeCheckout:
    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    return StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)


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
    # Attach user_id if authenticated
    user = await get_user_from_request(request)
    user_id = user["user_id"] if user else None

    stripe = get_stripe(request)
    success_url = f"{data.origin_url}/portal?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/portal"
    req = CheckoutSessionRequest(
        amount=5000.00,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product": "launchpath_cohort_admission", "user_id": user_id or ""},
    )
    session = await stripe.create_checkout_session(req)
    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "user_id": user_id,
        "amount": 5000.00,
        "currency": "usd",
        "payment_status": "pending",
        "status": "initiated",
        "metadata": {"product": "launchpath_cohort_admission"},
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/portal/checkout/status/{session_id}")
async def get_portal_checkout_status(session_id: str, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    stripe = get_stripe(request)
    status = await stripe.get_checkout_status(session_id)

    update_fields = {
        "payment_status": status.payment_status,
        "status": status.status,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": update_fields},
        upsert=True,
    )

    # Grant cohort access to the user when payment is confirmed
    if status.payment_status == "paid":
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

    return {"status": status.status, "payment_status": status.payment_status}

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    stripe = get_stripe(request)
    body = await request.body()
    signature = request.headers.get("Stripe-Signature", "")
    try:
        event = await stripe.handle_webhook(body, signature)
        if event.payment_status == "paid":
            await db.payment_transactions.update_one(
                {"session_id": event.session_id},
                {"$set": {
                    "payment_status": "paid",
                    "status": "complete",
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }},
                upsert=True,
            )
            # Also grant access via webhook
            transaction = await db.payment_transactions.find_one({"session_id": event.session_id}, {"_id": 0})
            user_id = transaction.get("user_id") if transaction else None
            if user_id:
                await db.user_access.update_one(
                    {"user_id": user_id},
                    {"$set": {
                        "has_access": True,
                        "access_level": "cohort",
                        "granted_at": datetime.now(timezone.utc).isoformat(),
                        "stripe_session_id": event.session_id,
                    }},
                    upsert=True,
                )
                # Post-payment confirmation — update subscriber in MailerLite
                # with paid cohort fields to trigger welcome automation
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
                                        "stripe_session_id": event.session_id,
                                    },
                                },
                            )
                    except Exception as ml_err:
                        logger.error(f"MailerLite post-payment update failed: {ml_err}")
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed.")
    return {"ok": True}


# ── Auth ─────────────────────────────────────────────────
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

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
    all_tasks = await db.tasks.find({"carrierId": carrierId}, {"_id": 0}).to_list(1000)
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
    await db.tasks.update_one(
        {"carrierId": data.carrierId, "taskId": taskId},
        {"$set": {
            "status": "needs_changes",
            "coachNote": data.coachNote or "",
            "remediationAt": now_iso,
            "remediatedBy": user["email"],
        }},
    )
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