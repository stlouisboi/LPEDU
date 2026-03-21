"""Admin + coach routes: modules, admission-requests, PDFs, carriers, tasks."""
import asyncio
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional, List

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Form, Depends
from pydantic import BaseModel

from core import (
    db, logger, COACH_EMAIL, FRONTEND_URL,
    _require_coach, send_mailersend_email,
    STANDARD_10_TASKS, storage_put, APP_NAME,
)

router = APIRouter()


# ── Models ────────────────────────────────────────────────────────────────────
class LessonUrlUpdate(BaseModel):
    lesson_id: str
    vimeo_url: str = ""
    pdf_url: str = ""


class ModuleContentSave(BaseModel):
    description: Optional[str] = None
    lessons: List[LessonUrlUpdate] = []


class CoachActionRequest(BaseModel):
    carrierId: str
    coachNote: Optional[str] = None


# ── Module Content ────────────────────────────────────────────────────────────
@router.get("/admin/module-content/{module_id}")
async def get_module_content(module_id: str, coach_id: str = Depends(_require_coach)):
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    return {"content": doc or {"module_id": module_id, "description": "", "lessons": []}}


@router.put("/admin/module-content/{module_id}")
async def save_module_content(module_id: str, data: ModuleContentSave, coach_id: str = Depends(_require_coach)):
    record = {
        "module_id": module_id, "description": data.description or "",
        "lessons": [{"lesson_id": l.lesson_id, "vimeo_url": l.vimeo_url, "pdf_url": l.pdf_url} for l in data.lessons],
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.module_content.replace_one({"module_id": module_id}, record, upsert=True)
    return {"ok": True}


# ── Admission Requests ────────────────────────────────────────────────────────
@router.get("/admin/admission-requests")
async def list_admission_requests(coach_id: str = Depends(_require_coach)):
    cursor = db.admission_requests.find({}, {"_id": 1, "carrier_name": 1, "email": 1, "dot_mc_number": 1, "authority_activation_date": 1, "compliance_status": 1, "lane": 1, "submission_date": 1, "status": 1, "approved_at": 1})
    docs = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        docs.append(doc)
    return docs


@router.patch("/admin/admission-requests/{admission_id}/status")
async def update_admission_status(admission_id: str, status: str, coach_id: str = Depends(_require_coach)):
    valid_statuses = {"pending_review", "approved", "rejected"}
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Status must be one of {valid_statuses}")
    await db.admission_requests.update_one({"_id": ObjectId(admission_id)}, {"$set": {"status": status}})
    return {"ok": True}


# ── PDFs ──────────────────────────────────────────────────────────────────────
@router.post("/admin/pdfs/upload")
async def upload_pdf(request: Request, file: UploadFile = File(...), display_name: str = Form(...), description: str = Form(""), category: str = Form("general")):
    await _require_coach(request)
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")
    data = await file.read()
    if len(data) > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 50MB)")
    file_id = str(uuid.uuid4())
    path = f"{APP_NAME}/pdfs/{file_id}.pdf"
    try:
        result = await asyncio.get_event_loop().run_in_executor(None, lambda: storage_put(path, data, "application/pdf"))
    except Exception as e:
        logger.error(f"Storage upload failed: {e}")
        raise HTTPException(status_code=502, detail="Storage upload failed")
    doc = {"id": file_id, "storage_path": result["path"], "original_filename": file.filename, "display_name": display_name, "description": description, "category": category, "size": len(data), "is_deleted": False, "download_count": 0, "created_at": datetime.now(timezone.utc).isoformat()}
    await db.pdfs.insert_one({**doc, "_id": file_id})
    return {k: v for k, v in doc.items()}


@router.get("/admin/pdfs")
async def list_pdfs_admin(request: Request):
    await _require_coach(request)
    docs = await db.pdfs.find({"is_deleted": False}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs


@router.patch("/admin/pdfs/{pdf_id}")
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


@router.delete("/admin/pdfs/{pdf_id}")
async def delete_pdf(pdf_id: str, request: Request):
    await _require_coach(request)
    result = await db.pdfs.update_one({"id": pdf_id}, {"$set": {"is_deleted": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="PDF not found")
    return {"ok": True}


# ── Coach Registry ────────────────────────────────────────────────────────────
@router.get("/coach/carriers")
async def get_coach_carriers(request: Request):
    from core import get_user_from_request
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")
    pipeline = [
        {"$group": {"_id": "$carrierId", "totalTasks": {"$sum": 1}, "verifiedTasks": {"$sum": {"$cond": [{"$eq": [{"$toLower": "$status"}, "verified"]}, 1, 0]}}, "submittedTasks": {"$sum": {"$cond": [{"$eq": ["$status", "submitted"]}, 1, 0]}}, "needsChangesTasks": {"$sum": {"$cond": [{"$eq": ["$status", "needs_changes"]}, 1, 0]}}}},
        {"$sort": {"submittedTasks": -1, "_id": 1}},
    ]
    carrier_stats = await db.tasks.aggregate(pipeline).to_list(100)
    carriers = []
    for stat in carrier_stats:
        cid = stat["_id"]
        user_info = await db.users.find_one({"user_id": cid}, {"_id": 0})
        profile = await db.carrierProfiles.find_one({"carrierId": cid}, {"_id": 0})
        if profile and profile.get("lastActiveAt"):
            la = profile["lastActiveAt"]
            if isinstance(la, str): la = datetime.fromisoformat(la)
            if la.tzinfo is None: la = la.replace(tzinfo=timezone.utc)
            days = (datetime.now(timezone.utc) - la).days
            pulse = 100 if days <= 3 else 70 if days <= 7 else 40 if days <= 14 else 20
        else:
            pulse = 100
        integrity = round((stat["verifiedTasks"] / stat["totalTasks"]) * 100) if stat["totalTasks"] > 0 else 0
        signal = round(0.4 * integrity + 0.3 * pulse)
        carriers.append({"carrierId": cid, "name": (user_info or {}).get("name", "Unknown"), "email": (user_info or {}).get("email", ""), "totalTasks": stat["totalTasks"], "verifiedTasks": stat["verifiedTasks"], "submittedTasks": stat["submittedTasks"], "needsChangesTasks": stat["needsChangesTasks"], "integrity": integrity, "pulse": pulse, "signal": signal})
    submitted_queue = await db.tasks.find({"status": "submitted"}, {"_id": 0}).sort("submittedAt", 1).to_list(200)
    return {"carriers": carriers, "submittedQueue": submitted_queue}


# ── Tasks ─────────────────────────────────────────────────────────────────────
@router.get("/tasks/{carrierId}")
async def get_carrier_tasks(carrierId: str, request: Request):
    from core import get_user_from_request
    user = await get_user_from_request(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if user.get("email") != COACH_EMAIL and user["user_id"] != carrierId:
        raise HTTPException(status_code=403, detail="Access denied")
    priority_rank = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    tasks = await db.tasks.find({"carrierId": carrierId}, {"_id": 0}).to_list(100)
    tasks.sort(key=lambda t: (t.get("assignedWeek", 99), priority_rank.get(t.get("priority", "low"), 3)))
    return {"tasks": tasks}


@router.patch("/tasks/{taskId}/submit")
async def submit_task(taskId: str, request: Request):
    from core import get_user_from_request
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
    await db.tasks.update_one({"carrierId": carrier_id, "taskId": taskId}, {"$set": {"status": "submitted", "submittedAt": now_iso}})
    await db.carrierProfiles.update_one({"carrierId": carrier_id}, {"$set": {"lastActiveAt": now_iso, "updatedAt": now_iso}}, upsert=True)
    return {"ok": True, "taskId": taskId, "status": "submitted"}


@router.patch("/tasks/{taskId}/verify")
async def verify_task(taskId: str, data: CoachActionRequest, request: Request):
    from core import get_user_from_request
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")
    task = await db.tasks.find_one({"carrierId": data.carrierId, "taskId": taskId}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    now_iso = datetime.now(timezone.utc).isoformat()
    await db.tasks.update_one({"carrierId": data.carrierId, "taskId": taskId}, {"$set": {"status": "verified", "verifiedAt": now_iso, "verifiedBy": user["email"], "coachNote": ""}})
    carrier = await db.users.find_one({"user_id": data.carrierId}, {"_id": 0})
    if carrier and carrier.get("email"):
        task_name = task.get("name", taskId)
        html = f"""<div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid #C5A059;"><p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">LaunchPath Operating Standard</p><h1 style="font-size:24px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">Compliance Item Verified</h1><p style="font-size:16px;color:#dde5ec;margin-bottom:24px;">Your submission for <strong style="color:#C5A059;">{task_name}</strong> has been reviewed and verified by your LaunchPath coach.</p><a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">View Portal</a></div>"""
        asyncio.create_task(send_mailersend_email(carrier["email"], carrier.get("name", "Operator"), f"Verified: {task_name}", html))
    return {"ok": True, "taskId": taskId, "status": "verified"}


@router.patch("/tasks/{taskId}/remediate")
async def remediate_task(taskId: str, data: CoachActionRequest, request: Request):
    from core import get_user_from_request
    user = await get_user_from_request(request)
    if not user or user.get("email") != COACH_EMAIL:
        raise HTTPException(status_code=403, detail="Coach access required")
    task = await db.tasks.find_one({"carrierId": data.carrierId, "taskId": taskId}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    now_iso = datetime.now(timezone.utc).isoformat()
    coach_note = data.coachNote or ""
    await db.tasks.update_one({"carrierId": data.carrierId, "taskId": taskId}, {"$set": {"status": "needs_changes", "coachNote": coach_note, "remediationAt": now_iso, "remediatedBy": user["email"]}})
    carrier = await db.users.find_one({"user_id": data.carrierId}, {"_id": 0})
    if carrier and carrier.get("email"):
        task_name = task.get("name", taskId)
        note_block = f'<div style="background:#1a0a00;border-left:3px solid #E8590F;padding:16px 20px;margin-bottom:28px;"><p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#E8590F;">Coach Note</p><p style="margin:0;font-size:14px;color:#dde5ec;">{coach_note}</p></div>' if coach_note else ""
        html = f"""<div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid #E8590F;"><p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">LaunchPath Operating Standard</p><h1 style="font-size:24px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">Action Required</h1><p style="font-size:16px;color:#dde5ec;margin-bottom:24px;">Your submission for <strong style="color:#C5A059;">{task_name}</strong> requires additional attention.</p>{note_block}<a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">Go to Portal</a></div>"""
        asyncio.create_task(send_mailersend_email(carrier["email"], carrier.get("name", "Operator"), f"Action Required: {task_name}", html))
    return {"ok": True, "taskId": taskId, "status": "needs_changes"}


# ── Signal seed (demo) ────────────────────────────────────────────────────────
@router.post("/signal/seed/{carrierId}")
async def seed_carrier_data(carrierId: str):
    await db.carrierProfiles.update_one(
        {"carrierId": carrierId},
        {"$set": {"carrierId": carrierId, "lastActiveAt": (datetime.now(timezone.utc) - timedelta(days=1)).isoformat(), "updatedAt": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    await db.tasks.delete_many({"carrierId": carrierId})
    current_week = datetime.now(timezone.utc).isocalendar()[1]
    now_iso = datetime.now(timezone.utc).isoformat()
    verified_ids = {"DQ-001", "DA-001", "INS-001", "UCR-001", "BOC3-001", "MCS150-001"}
    task_templates = []
    for t in STANDARD_10_TASKS:
        status = "verified" if t["taskId"] in verified_ids else "pending"
        task = {"carrierId": carrierId, "taskId": t["taskId"], "name": t["name"], "category": t["category"], "priority": t["priority"], "description": t["description"], "status": status, "assignedWeek": current_week + t["weekOffset"] - 1, "createdAt": now_iso}
        if status == "verified":
            task["verifiedAt"] = now_iso
            task["verifiedBy"] = COACH_EMAIL
        task_templates.append(task)
    await db.tasks.insert_many(task_templates)
    return {"ok": True, "carrierId": carrierId, "tasks_seeded": len(task_templates)}
