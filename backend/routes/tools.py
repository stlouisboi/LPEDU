"""Operator tools: CPM calculator, Load Profitability Analyzer."""
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import httpx
from core import db, COACH_EMAIL, get_user_from_request, MAILERLITE_API_TOKEN, MAILERLITE_URL

router = APIRouter()


class CPMSaveRequest(BaseModel):
    fixed_cpm: float
    variable_cpm: float
    total_cpm: float
    inputs: dict


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


@router.get("/tools/access")
async def check_tool_access(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"logged_in": False, "has_access": False}
    if user.get("email") == COACH_EMAIL:
        return {"logged_in": True, "has_access": True}
    access = await db.user_access.find_one({"user_id": user["user_id"]}, {"_id": 0})
    has_access = bool(access and access.get("has_access"))
    return {"logged_in": True, "has_access": has_access}


@router.post("/cpm/save")
async def save_cpm_result(data: CPMSaveRequest, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    record = {
        "user_id": user["user_id"], "fixed_cpm": data.fixed_cpm, "variable_cpm": data.variable_cpm,
        "total_cpm": data.total_cpm, "inputs": data.inputs, "calculated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.cpm_results.replace_one({"user_id": user["user_id"]}, record, upsert=True)
    return {"ok": True}


@router.get("/cpm/saved")
async def get_saved_cpm(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"saved": None}
    result = await db.cpm_results.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {"saved": result}


@router.post("/tools/load-save")
async def save_load_analysis(data: LoadAnalysisSave, request: Request):
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    now = datetime.now(timezone.utc).isoformat()
    record = {
        "load_rate": data.load_rate, "loaded_miles": data.loaded_miles, "deadhead_miles": data.deadhead_miles,
        "fuel_surcharge": data.fuel_surcharge, "detention": data.detention, "other_accessorials": data.other_accessorials,
        "load_rpm": data.load_rpm, "verdict": data.verdict, "saved_cpm": data.saved_cpm, "saved_at": now,
    }
    await db.load_analyses.replace_one({"user_id": user["user_id"]}, {"user_id": user["user_id"], **record}, upsert=True)
    await db.load_analysis_history.update_one(
        {"user_id": user["user_id"]},
        {"$push": {"history": {"$each": [record], "$position": 0, "$slice": 10}}},
        upsert=True,
    )
    return {"ok": True}


@router.get("/tools/load-saved")
async def get_saved_load_analysis(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"saved": None}
    result = await db.load_analyses.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {"saved": result}


@router.get("/tools/load-history")
async def get_load_history(request: Request):
    user = await get_user_from_request(request)
    if not user:
        return {"history": []}
    doc = await db.load_analysis_history.find_one({"user_id": user["user_id"]}, {"_id": 0, "user_id": 0})
    return {"history": doc.get("history", []) if doc else []}



class TCOGateRequest(BaseModel):
    email: str
    name: str = ""


@router.post("/tools/tco-subscribe")
async def tco_subscribe(data: TCOGateRequest):
    """Email gate for TCO Calculator — subscribes to MailerLite and unlocks results."""
    email = data.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Valid email required.")
    # Record locally
    await db.tco_leads.update_one(
        {"email": email},
        {"$set": {"email": email, "name": data.name.strip(), "source": "tco_calculator", "subscribed_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    # Subscribe to MailerLite + assign LP-Lead-Cold tag (brief: LP-BLD-EML-001 rev2)
    if MAILERLITE_API_TOKEN:
        payload = {
            "email": email,
            "status": "active",
            "fields": {"name": data.name.strip(), "source": "tco_calculator"},
        }
        headers_ml = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
        async with httpx.AsyncClient(timeout=8) as http:
            resp = await http.post(MAILERLITE_URL, headers=headers_ml, json=payload)
            subscriber_id = resp.json().get("data", {}).get("id")
            if subscriber_id:
                # Assign LP-Lead-Cold (default entry tag per brief Section 3.1)
                tag_r = await http.post("https://connect.mailerlite.com/api/tags", headers=headers_ml, json={"name": "LP-Lead-Cold"})
                tag_id = tag_r.json().get("data", {}).get("id")
                if tag_id:
                    await http.post(f"https://connect.mailerlite.com/api/subscribers/{subscriber_id}/tags", headers=headers_ml, json={"tags": [tag_id]})
    return {"ok": True}
