"""Auth routes: login, register, logout, session, me."""
import asyncio
import uuid
import httpx
from datetime import datetime, timezone, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr

from core import (
    db, logger, pwd_context,
    COACH_EMAIL, COACH_PASSWORD, EMERGENT_AUTH_URL, FRONTEND_URL,
    send_mailersend_email, seed_standard_tasks_for_carrier,
)

router = APIRouter(prefix="/auth")


class UserOut(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


async def _create_user_session(user_id: str, response: Response) -> str:
    session_token = uuid.uuid4().hex
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.update_one(
        {"user_id": user_id},
        {"$set": {"session_token": session_token, "expires_at": expires_at, "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    response.set_cookie("session_token", session_token, httponly=True, secure=True, samesite="none", path="/", max_age=604800)
    return session_token


@router.get("/session")
async def create_auth_session(session_id: str, response: Response):
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.get(EMERGENT_AUTH_URL, headers={"X-Session-ID": session_id})
    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")
    data = resp.json()
    email = data["email"]
    name = data.get("name", "")
    picture = data.get("picture", "")
    session_token = data["session_token"]
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one({"user_id": user_id}, {"$set": {"name": name, "picture": picture}})
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({"user_id": user_id, "email": email, "name": name, "picture": picture, "created_at": datetime.now(timezone.utc)})
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.update_one(
        {"user_id": user_id},
        {"$set": {"session_token": session_token, "expires_at": expires_at, "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    existing_tasks = await db.tasks.count_documents({"carrierId": user_id})
    if existing_tasks == 0:
        await seed_standard_tasks_for_carrier(user_id)
        await db.carrierProfiles.update_one(
            {"carrierId": user_id},
            {"$set": {"carrierId": user_id, "lastActiveAt": datetime.now(timezone.utc).isoformat(), "createdAt": datetime.now(timezone.utc).isoformat()}},
            upsert=True,
        )
        first_name = name.split()[0] if name else "Operator"
        welcome_html = f"""
        <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; LP-SYS-001</p>
          <h1 style="font-family:'Manrope',sans-serif;font-size:28px;font-weight:700;line-height:1.2;color:#ffffff;margin:0 0 8px;">Your authority is active.</h1>
          <h2 style="font-family:'Manrope',sans-serif;font-size:22px;font-weight:500;line-height:1.2;color:#C5A059;margin:0 0 28px;">Now the clock is running.</h2>
          <p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 24px;">Welcome, {first_name}. You've been enrolled in the LaunchPath Operating Standard — a 90-day guided implementation program built specifically for new motor carriers navigating the FMCSA compliance window.</p>
          <a href="{FRONTEND_URL}/ground-0-briefing" style="display:inline-block;background:#C5A059;color:#002244;font-family:'Inter',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Begin Ground 0 →</a>
          <p style="font-size:12px;color:rgba(255,255,255,0.30);margin:36px 0 0;line-height:1.6;">LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p>
        </div>"""
        asyncio.create_task(send_mailersend_email(email, first_name, "Your authority is active. Now the clock is running.", welcome_html))
    response.set_cookie("session_token", session_token, httponly=True, secure=True, samesite="none", path="/", max_age=604800)
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    return {"ok": True, "user": UserOut(**user).model_dump()}


@router.get("/me")
async def get_current_user(request: Request):
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


@router.post("/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


@router.post("/login")
async def login(body: LoginRequest, response: Response):
    if body.email == COACH_EMAIL and body.password == COACH_PASSWORD:
        existing = await db.users.find_one({"email": COACH_EMAIL}, {"_id": 0})
        if existing:
            user_id = existing["user_id"]
        else:
            user_id = f"user_{uuid.uuid4().hex[:12]}"
            await db.users.insert_one({"user_id": user_id, "email": COACH_EMAIL, "name": "Vince Lawrence", "picture": "", "created_at": datetime.now(timezone.utc)})
        await _create_user_session(user_id, response)
        return {"ok": True, "user": {"user_id": user_id, "email": COACH_EMAIL, "name": "Vince Lawrence", "picture": ""}}
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


@router.post("/register")
async def register_user(body: RegisterRequest, response: Response):
    existing = await db.users.find_one({"email": body.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists. Please sign in.")
    hashed = pwd_context.hash(body.password)
    user_id = f"user_{uuid.uuid4().hex[:12]}"
    now = datetime.now(timezone.utc)
    display_name = (body.name or "").strip() or body.email.split("@")[0]
    await db.users.insert_one({"user_id": user_id, "email": body.email, "name": display_name, "picture": "", "password_hash": hashed, "created_at": now})
    await _create_user_session(user_id, response)
    existing_tasks = await db.tasks.count_documents({"carrierId": user_id})
    if existing_tasks == 0:
        await seed_standard_tasks_for_carrier(user_id)
        await db.carrierProfiles.update_one(
            {"carrierId": user_id},
            {"$set": {"carrierId": user_id, "lastActiveAt": now.isoformat(), "createdAt": now.isoformat()}},
            upsert=True,
        )
    user_out = {"user_id": user_id, "email": body.email, "name": display_name, "picture": ""}
    return {"ok": True, "user": UserOut(**user_out).model_dump()}
