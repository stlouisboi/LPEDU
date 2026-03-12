from fastapi import FastAPI, APIRouter, HTTPException, Request
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
from datetime import datetime, timezone
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

@api_router.post("/portal/checkout")
async def create_portal_checkout(data: PortalCheckoutRequest, request: Request):
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Payment service not configured.")
    stripe = get_stripe(request)
    success_url = f"{data.origin_url}/portal?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/portal"
    req = CheckoutSessionRequest(
        amount=2500.00,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"product": "launchpath_cohort_admission"},
    )
    session = await stripe.create_checkout_session(req)
    await db.payment_transactions.insert_one({
        "session_id": session.session_id,
        "amount": 2500.00,
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
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": {
            "payment_status": status.payment_status,
            "status": status.status,
            "updated_at": datetime.now(timezone.utc).isoformat(),
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
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed.")
    return {"ok": True}


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