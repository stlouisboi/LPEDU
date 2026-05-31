"""Admin + coach routes: modules, admission-requests, PDFs, carriers, tasks."""
import asyncio
import random
import string
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
from routes.portal import _issue_vrf_id_if_eligible

router = APIRouter()


# ── Models ────────────────────────────────────────────────────────────────────
class LessonUrlUpdate(BaseModel):
    lesson_id: str
    vimeo_url: str = ""
    pdf_url: str = ""


class ModuleContentSave(BaseModel):
    description: Optional[str] = None
    lessons: List[LessonUrlUpdate] = []
    visible: bool = True


class CoachActionRequest(BaseModel):
    carrierId: str
    coachNote: Optional[str] = None


class GateDecisionRequest(BaseModel):
    decision: str  # "approved" | "declined" | "conditional"
    custodian_notes: str = ""


class QAReplyRequest(BaseModel):
    reply: str


class AnnouncementRequest(BaseModel):
    title: str
    body: str
    priority: str = "normal"  # "normal" | "important" | "critical"


# ── Gate Reviews (Station Custodian) ──────────────────────────────────────────
@router.get("/admin/gate-reviews")
async def list_gate_reviews(status_filter: str = "pending", coach_id: str = Depends(_require_coach)):
    query = {} if status_filter == "all" else {"status": status_filter}
    docs = await db.custodian_reviews.find(query, {"_id": 0}).sort("submitted_at", -1).to_list(200)
    return docs


@router.post("/admin/gate-reviews/{review_id}/decide")
async def decide_gate_review(review_id: str, data: GateDecisionRequest, coach_id: str = Depends(_require_coach)):
    valid = {"approved", "declined", "conditional", "revisions_needed"}
    if data.decision not in valid:
        raise HTTPException(status_code=400, detail=f"Decision must be one of {valid}")
    review = await db.custodian_reviews.find_one({"review_id": review_id}, {"_id": 0})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    now = datetime.now(timezone.utc).isoformat()
    await db.custodian_reviews.update_one(
        {"review_id": review_id},
        {"$set": {"status": data.decision, "custodian_notes": data.custodian_notes, "reviewed_at": now}},
    )
    module_id = review["module_id"]
    user_id = review["user_id"]
    new_status = (
        "approved" if data.decision == "approved"
        else "conditional" if data.decision == "conditional"
        else "revisions_needed" if data.decision == "revisions_needed"
        else "in_progress"
    )
    await db.module_progress.update_one(
        {"user_id": user_id, "module_id": module_id},
        {"$set": {"status": new_status, "outcome": data.decision, "custodian_notes": data.custodian_notes, "approved_at": now if data.decision in ("approved", "conditional") else None, "updated_at": now}},
    )
    user_info = await db.users.find_one({"user_id": user_id}, {"_id": 0}) or {}
    # Auto-generate Verified Registry ID when all core modules (1–6, plus 7 if conditional) are complete
    await _issue_vrf_id_if_eligible(user_id)
    if user_info.get("email"):
        if data.decision == "approved":
            subject = f"Approved: {module_id.upper()} — Next Module Unlocked"
            headline = "Your Module Has Been Approved"
            body_text = "Your submission has been reviewed and approved by the Station Custodian. Your next module is now unlocked — return to the portal to continue."
            border_color = "#22c55e"
        elif data.decision == "conditional":
            subject = "Integrity Audit — Conditional Outcome"
            headline = "Integrity Audit: Conditional Result"
            body_text = "Your Integrity Audit has been reviewed. The outcome is conditional. Module 7 (Post-Audit Recovery) has been activated for you in the portal."
            border_color = "#f97316"
        else:
            subject = f"Action Required: {module_id.upper()}"
            headline = "Additional Items Required"
            body_text = f"Your submission for {module_id.upper()} requires additional items before it can be approved. Review the Station Custodian's notes below."
            border_color = "#ef4444"
        note_block = f'<div style="background:#0a1220;border-left:3px solid {border_color};padding:16px 20px;margin-bottom:28px;"><p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:{border_color};">Station Custodian Note</p><p style="margin:0;font-size:14px;color:#dde5ec;">{data.custodian_notes}</p></div>' if data.custodian_notes else ""
        html = f"""<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:40px 32px;border-top:4px solid {border_color};">
<p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A059;margin-bottom:24px;">LaunchPath Operating Standard</p>
<h1 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#f4f7fb;">{headline}</h1>
<p style="font-size:16px;color:#dde5ec;margin-bottom:24px;">{body_text}</p>
{note_block}
<a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:14px 28px;text-decoration:none;">Return to Portal</a>
</div>"""
        asyncio.create_task(send_mailersend_email(user_info["email"], user_info.get("name", "Operator"), subject, html))
    return {"ok": True, "review_id": review_id, "decision": data.decision}


# ── Module Content ────────────────────────────────────────────────────────────
@router.get("/admin/module-content/{module_id}")
async def get_module_content(module_id: str, coach_id: str = Depends(_require_coach)):
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    return {"content": doc or {"module_id": module_id, "description": "", "lessons": [], "visible": True}}


@router.put("/admin/module-content/{module_id}")
async def save_module_content(module_id: str, data: ModuleContentSave, coach_id: str = Depends(_require_coach)):
    record = {
        "module_id": module_id, "description": data.description or "",
        "lessons": [{"lesson_id": l.lesson_id, "vimeo_url": l.vimeo_url, "pdf_url": l.pdf_url} for l in data.lessons],
        "visible": data.visible,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.module_content.replace_one({"module_id": module_id}, record, upsert=True)
    return {"ok": True}


@router.patch("/admin/module-content/{module_id}/visibility")
async def toggle_module_visibility(module_id: str, coach_id: str = Depends(_require_coach)):
    """Toggle visible flag for a module. Creates the record if it doesn't exist."""
    doc = await db.module_content.find_one({"module_id": module_id}, {"_id": 0})
    current = doc.get("visible", True) if doc else True
    new_visible = not current
    await db.module_content.update_one(
        {"module_id": module_id},
        {"$set": {"visible": new_visible, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "module_id": module_id, "visible": new_visible}


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

    # Batch-fetch all users and profiles in 2 queries instead of N+1
    carrier_ids = [s["_id"] for s in carrier_stats]
    user_docs    = await db.users.find({"user_id": {"$in": carrier_ids}}, {"_id": 0}).to_list(200)
    profile_docs = await db.carrierProfiles.find({"carrierId": {"$in": carrier_ids}}, {"_id": 0}).to_list(200)
    user_map    = {u["user_id"]: u for u in user_docs}
    profile_map = {p["carrierId"]: p for p in profile_docs}

    carriers = []
    for stat in carrier_stats:
        cid = stat["_id"]
        user_info = user_map.get(cid, {})
        profile   = profile_map.get(cid, {})
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
        carriers.append({"carrierId": cid, "name": user_info.get("name", "Unknown"), "email": user_info.get("email", ""), "totalTasks": stat["totalTasks"], "verifiedTasks": stat["verifiedTasks"], "submittedTasks": stat["submittedTasks"], "needsChangesTasks": stat["needsChangesTasks"], "integrity": integrity, "pulse": pulse, "signal": signal})
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



# ── Lesson Q&A (Admin) ────────────────────────────────────────────────────────
@router.get("/admin/lesson-qa")
async def list_all_qa(coach_id: str = Depends(_require_coach)):
    docs = await db.lesson_qa.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return {"qa": docs}


@router.post("/admin/lesson-qa/{qa_id}/reply")
async def reply_to_qa(qa_id: str, data: QAReplyRequest, coach_id: str = Depends(_require_coach)):
    if not data.reply.strip():
        raise HTTPException(status_code=400, detail="Reply cannot be empty")
    now = datetime.now(timezone.utc).isoformat()
    result = await db.lesson_qa.update_one(
        {"qa_id": qa_id},
        {"$set": {"reply": data.reply.strip(), "replied_at": now}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Q&A not found")
    return {"ok": True, "qa_id": qa_id}


# ── Announcements (Admin) ─────────────────────────────────────────────────────
@router.get("/admin/announcements")
async def list_announcements(coach_id: str = Depends(_require_coach)):
    docs = await db.announcements.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return {"announcements": docs}


@router.post("/admin/announcements")
async def create_announcement(data: AnnouncementRequest, coach_id: str = Depends(_require_coach)):
    if data.priority not in ("normal", "important", "critical"):
        raise HTTPException(status_code=400, detail="Invalid priority")
    ann_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "announcement_id": ann_id,
        "title": data.title.strip(),
        "body": data.body.strip(),
        "priority": data.priority,
        "is_active": True,
        "created_at": now,
        "updated_at": now,
    }
    await db.announcements.insert_one({**doc, "_id": ann_id})
    return {k: v for k, v in doc.items()}


@router.patch("/admin/announcements/{announcement_id}/toggle")
async def toggle_announcement(announcement_id: str, coach_id: str = Depends(_require_coach)):
    doc = await db.announcements.find_one({"announcement_id": announcement_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Announcement not found")
    new_state = not doc.get("is_active", True)
    await db.announcements.update_one(
        {"announcement_id": announcement_id},
        {"$set": {"is_active": new_state, "updated_at": datetime.now(timezone.utc).isoformat()}},
    )
    return {"ok": True, "is_active": new_state}


@router.delete("/admin/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str, coach_id: str = Depends(_require_coach)):
    result = await db.announcements.delete_one({"announcement_id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"ok": True}


# ── Registry IDs (Admin view) ─────────────────────────────────────────────────
@router.get("/admin/registry-ids")
async def list_registry_ids(coach_id: str = Depends(_require_coach)):
    docs = await db.registry_ids.find({}, {"_id": 0}).sort("issued_at", -1).to_list(200)
    return {"registry_ids": docs}


@router.get("/admin/audit-windows")
async def list_audit_windows(coach_id: str = Depends(_require_coach)):
    """Admin view: all carriers with authority_grant_date, urgency tier, and reminder email status."""
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    assessments = await db.icp_assessments.find(
        {"authority_grant_date": {"$exists": True, "$nin": ["", None]}},
        {"_id": 0},
    ).to_list(500)

    results = []
    for rec in assessments:
        email = rec.get("email", "")
        authority_grant_date = rec.get("authority_grant_date", "")
        if not email or not authority_grant_date:
            continue
        try:
            grant = datetime.strptime(authority_grant_date[:10], "%Y-%m-%d")
        except ValueError:
            continue

        window_end = grant + timedelta(days=548)
        days_remaining = (window_end - now).days

        if days_remaining <= 0:
            tier = "expired"
        elif days_remaining <= 60:
            tier = "critical"
        elif days_remaining <= 120:
            tier = "high"
        elif days_remaining <= 240:
            tier = "moderate"
        else:
            tier = "low"

        user = await db.users.find_one({"email": email}, {"_id": 0})
        name = (user.get("name", "") if user else "") or ""

        results.append({
            "email": email,
            "name": name,
            "authority_grant_date": authority_grant_date[:10],
            "days_remaining": days_remaining,
            "window_end": window_end.strftime("%Y-%m-%d"),
            "urgency": tier,
            "moderate_sent": bool(rec.get("audit_window_moderate_sent")),
            "high_sent": bool(rec.get("audit_window_high_sent")),
            "critical_sent": bool(rec.get("audit_window_critical_sent")),
            "moderate_sent_at": rec.get("audit_window_moderate_sent_at"),
            "high_sent_at": rec.get("audit_window_high_sent_at"),
            "critical_sent_at": rec.get("audit_window_critical_sent_at"),
        })

    tier_order = {"expired": 0, "critical": 1, "high": 2, "moderate": 3, "low": 4}
    results.sort(key=lambda x: tier_order.get(x["urgency"], 5))
    return {"carriers": results, "total": len(results)}


# ── 16 Deadly Sins Checklist Leads ───────────────────────────────────────────
@router.get("/admin/sins-leads")
async def list_sins_leads(coach_id: str = Depends(_require_coach)):
    docs = await db.sins_leads.find({}, {"_id": 0}).sort("captured_at", -1).to_list(500)
    return {"leads": docs, "total": len(docs)}


# ── Carrier Checkpoints — LP-WRK-001 §4.2 / §7.6 ─────────────────────────────

CHECKPOINT_CONFIG = [
    {"code": "CP-01", "label": "Authority & Entity Foundation",   "target_day": 14},
    {"code": "CP-02", "label": "Driver Qualification Files",      "target_day": 30},
    {"code": "CP-03", "label": "Drug & Alcohol Program",          "target_day": 45},
    {"code": "CP-04", "label": "HOS, Maintenance & Insurance",    "target_day": 60},
    {"code": "CP-05", "label": "Integrity Audit Simulation",      "target_day": 90},
]

VALID_CP_STATUSES = {"PENDING", "SUBMITTED", "UNDER_REVIEW", "PASSED", "FAILED"}


class CheckpointUpdateRequest(BaseModel):
    status: str
    admin_notes: Optional[str] = ""


async def _ensure_checkpoints(carrier_id: str, carrier_email: str, carrier_name: str):
    """Idempotently create the 5 LP-WRK-001 checkpoints for a carrier."""
    existing = await db.carrier_checkpoints.count_documents({"carrier_id": carrier_id})
    if existing >= 5:
        return
    now = datetime.now(timezone.utc).isoformat()
    docs = []
    for cp in CHECKPOINT_CONFIG:
        docs.append({
            "checkpoint_id": str(uuid.uuid4()),
            "carrier_id": carrier_id,
            "carrier_email": carrier_email,
            "carrier_name": carrier_name,
            "checkpoint_code": cp["code"],
            "checkpoint_label": cp["label"],
            "target_day": cp["target_day"],
            "status": "PENDING",
            "admin_notes": "",
            "submitted_at": None,
            "reviewed_at": None,
            "created_at": now,
        })
    await db.carrier_checkpoints.insert_many(docs)
    logger.info(f"Initialized 5 checkpoints for carrier {carrier_id}")


@router.get("/admin/checkpoints")
async def list_all_checkpoints(coach_id: str = Depends(_require_coach)):
    """List all checkpoints grouped by enrolled carrier. Auto-initializes if needed."""
    # Get all cohort-enrolled carriers
    carriers = await db.user_access.find(
        {"has_access": True, "access_level": "cohort"},
        {"_id": 0}
    ).to_list(200)

    # Ensure checkpoints exist for every enrolled carrier
    for c in carriers:
        user = await db.users.find_one({"user_id": c["user_id"]}, {"_id": 0}) or {}
        await _ensure_checkpoints(
            carrier_id=c["user_id"],
            carrier_email=user.get("email", ""),
            carrier_name=user.get("name", user.get("email", "Unknown")),
        )

    # Fetch all checkpoints sorted
    docs = await db.carrier_checkpoints.find(
        {}, {"_id": 0}
    ).sort([("carrier_id", 1), ("target_day", 1)]).to_list(2000)

    # Group by carrier
    grouped: dict = {}
    for doc in docs:
        cid = doc["carrier_id"]
        if cid not in grouped:
            grouped[cid] = {
                "carrier_id": cid,
                "carrier_email": doc.get("carrier_email", ""),
                "carrier_name": doc.get("carrier_name", "Unknown"),
                "checkpoints": [],
            }
        grouped[cid]["checkpoints"].append(doc)

    return {"carriers": list(grouped.values()), "total_carriers": len(grouped)}


@router.get("/admin/checkpoints/carrier/{carrier_id}")
async def get_carrier_checkpoints(carrier_id: str, coach_id: str = Depends(_require_coach)):
    """Fetch the 5 checkpoints for a specific carrier."""
    docs = await db.carrier_checkpoints.find(
        {"carrier_id": carrier_id}, {"_id": 0}
    ).sort("target_day", 1).to_list(10)
    if not docs:
        raise HTTPException(status_code=404, detail="No checkpoints found for this carrier")
    return {"carrier_id": carrier_id, "checkpoints": docs}


@router.patch("/admin/checkpoints/{checkpoint_id}")
async def update_checkpoint(
    checkpoint_id: str,
    body: CheckpointUpdateRequest,
    coach_id: str = Depends(_require_coach),
):
    """Mark a checkpoint PASSED / FAILED / SUBMITTED / UNDER_REVIEW and add written notes."""
    if body.status not in VALID_CP_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {VALID_CP_STATUSES}")
    now = datetime.now(timezone.utc).isoformat()
    update_fields: dict = {
        "status": body.status,
        "admin_notes": body.admin_notes or "",
        "reviewed_at": now,
    }
    result = await db.carrier_checkpoints.update_one(
        {"checkpoint_id": checkpoint_id},
        {"$set": update_fields},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Checkpoint not found")

    # Trigger CRM tag update if transitioning to terminal state
    if body.status in {"PASSED", "FAILED"}:
        cp = await db.carrier_checkpoints.find_one({"checkpoint_id": checkpoint_id}, {"_id": 0})
        if cp:
            from routes.sequences import _update_crm_state  # type: ignore
            carrier_email = cp.get("carrier_email", "")
            if carrier_email:
                crm_tag = "COHORT-ACTIVE" if body.status == "PASSED" else "COHORT-AT-RISK"
                try:
                    await _update_crm_state(carrier_email, crm_tag)
                except Exception:
                    pass  # CRM update is best-effort

    return {"ok": True, "checkpoint_id": checkpoint_id, "new_status": body.status}


@router.post("/admin/checkpoints/initialize/{carrier_id}")
async def init_checkpoints_for_carrier(carrier_id: str, coach_id: str = Depends(_require_coach)):
    """Manually initialize checkpoints for a specific carrier."""
    user = await db.users.find_one({"user_id": carrier_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="Carrier not found")
    await _ensure_checkpoints(
        carrier_id=carrier_id,
        carrier_email=user.get("email", ""),
        carrier_name=user.get("name", user.get("email", "Unknown")),
    )
    return {"ok": True, "carrier_id": carrier_id}

