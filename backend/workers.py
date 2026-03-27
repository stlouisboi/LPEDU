"""Background email workers: 7-day nudge, Day 3 / Day 14 onboarding check-ins."""
import asyncio
import logging
from datetime import datetime, timezone, timedelta

from core import db, FRONTEND_URL, COACH_EMAIL, send_mailersend_email

logger = logging.getLogger(__name__)


async def _send_onboarding_checkin_emails():
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
            {"has_access": True, "access_level": "cohort", "granted_at": {"$gte": start.isoformat(), "$lte": end.isoformat()}, flag: {"$exists": False}},
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
            all_tasks = await db.tasks.find({"carrierId": user_id}, {"_id": 0}).to_list(20)
            verified = sum(1 for t in all_tasks if t.get("status") == "verified")
            submitted = sum(1 for t in all_tasks if t.get("status") == "submitted")
            pending = sum(1 for t in all_tasks if t.get("status") == "pending")
            total = len(all_tasks)
            if day == 3:
                subject = "Day 3: Have you opened Module 1 yet?"
                html = f"""<div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;"><p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Day 3 Check-In</p><h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">You're 3 days into your 90-day window.</h1><div style="background:#0F1E35;border-radius:6px;padding:20px 24px;margin:0 0 28px;"><p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.75);margin:0 0 14px;">Your progress so far</p><div style="display:flex;gap:24px;"><div><p style="font-size:28px;font-weight:700;color:#C5A059;margin:0 0 2px;">{verified}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Verified</p></div><div><p style="font-size:28px;font-weight:700;color:#F59E0B;margin:0 0 2px;">{submitted}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Submitted</p></div><div><p style="font-size:28px;font-weight:700;color:rgba(255,255,255,0.35);margin:0 0 2px;">{pending}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Pending</p></div></div></div><a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Open Module 1 →</a></div>"""
            else:
                integrity_pct = round((verified / total) * 100) if total else 0
                pace_msg = '<p style="font-size:13px;color:#4CAF50;margin:0;">You\'re on pace. Keep submitting tasks to maintain momentum.</p>' if verified >= 3 else '<p style="font-size:13px;color:#E8590F;margin:0;">You\'re behind pace. Prioritize the critical items in your Implementation Sequence this week.</p>'
                subject = "Two weeks in. Where does your compliance stand?"
                html = f"""<div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;"><p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Day 14 Milestone</p><h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">Two weeks in, {90-14} days remaining.</h1><div style="background:#0F1E35;border-radius:6px;padding:20px 24px;margin:0 0 28px;"><p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.75);margin:0 0 14px;">Administrative Signal — Day 14</p><div style="display:flex;gap:32px;margin-bottom:16px;"><div><p style="font-size:32px;font-weight:700;color:#C5A059;margin:0 0 2px;">{verified}/{total}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Tasks verified</p></div><div><p style="font-size:32px;font-weight:700;color:#C5A059;margin:0 0 2px;">{integrity_pct}%</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">Documentary Integrity</p></div></div>{pace_msg}</div><a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Check Your Signal →</a></div>"""
            await send_mailersend_email(email, first_name, subject, html)
            await db.user_access.update_one({"user_id": user_id}, {"$set": {flag: now.isoformat()}})
            logger.info(f"Onboarding Day {day} email sent to {user_id}")


async def _send_followup_emails():
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    candidates = await db.users.find({"created_at": {"$lte": cutoff}, "followup_7d_sent_at": {"$exists": False}}, {"_id": 0}).to_list(200)
    sent_count = 0
    for user in candidates:
        user_id = user.get("user_id")
        email = user.get("email")
        if not user_id or not email:
            continue
        active = await db.tasks.count_documents({"carrierId": user_id, "status": {"$in": ["submitted", "verified"]}})
        if active > 0:
            await db.users.update_one({"user_id": user_id}, {"$set": {"followup_7d_sent_at": "skipped_engaged"}})
            continue
        priority_rank = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        pending = await db.tasks.find({"carrierId": user_id, "status": "pending"}, {"_id": 0}).to_list(20)
        pending.sort(key=lambda t: priority_rank.get(t.get("priority", "low"), 3))
        top_tasks = pending[:2]
        task_rows = ""
        for t in top_tasks:
            priority_color = {"critical": "#E8590F", "high": "#F59E0B", "medium": "#C5A059"}.get(t.get("priority", "medium"), "#C5A059")
            task_rows += f'<tr><td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);"><p style="font-size:13px;font-weight:600;color:#ffffff;margin:0 0 3px;">{t.get("name","")}</p><p style="font-size:12px;color:rgba(255,255,255,0.55);margin:0;">{t.get("description","")[:90]}...</p></td><td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);white-space:nowrap;vertical-align:top;"><span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:{priority_color};">{t.get("priority","").upper()}</span></td></tr>'
        task_table = f'<table style="width:100%;border-collapse:collapse;background:#0F1E35;border-radius:6px;overflow:hidden;margin:0 0 28px;"><thead><tr style="background:#0A1520;"><th style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.75);font-weight:600;">Pending Task</th><th style="padding:10px 16px;text-align:left;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.75);font-weight:600;">Priority</th></tr></thead><tbody>{task_rows}</tbody></table>' if task_rows else ""
        first_name = user.get("name", "").split()[0] if user.get("name") else "Operator"
        html = f"""<div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;"><p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 28px;">LaunchPath Operating Standard &nbsp;|&nbsp; Implementation Sequence</p><h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">Your Implementation Sequence is still waiting.</h1><p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;line-height:1.75;">{first_name}, you signed in to LaunchPath but your compliance tasks haven't moved yet.</p>{task_table}<a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border-radius:4px;">Return to the Portal →</a></div>"""
        await send_mailersend_email(email, first_name, "Your Implementation Sequence is still waiting.", html)
        await db.users.update_one({"user_id": user_id}, {"$set": {"followup_7d_sent_at": datetime.now(timezone.utc).isoformat()}})
        sent_count += 1
    logger.info(f"7-day followup worker: {sent_count} emails sent out of {len(candidates)} candidates.")


async def followup_email_worker():
    """Background worker — runs once daily."""
    await asyncio.sleep(3600)
    while True:
        try:
            await _send_onboarding_checkin_emails()
            await _send_followup_emails()
        except Exception as e:
            logger.error(f"Followup email worker error: {e}")
        await asyncio.sleep(86400)
