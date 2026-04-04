"""Background email workers: 7-day nudge, Day 3 / Day 14 onboarding check-ins."""
import asyncio
import logging
from datetime import datetime, timezone, timedelta

from core import db, FRONTEND_URL, COACH_EMAIL, send_mailersend_email
from routes.sequences import process_pending_sequences

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


async def _send_monthly_audit_reminders():
    """Remind enrolled carriers to run their monthly audit check if they haven't in 30 days."""
    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)

    enrolled = await db.user_access.find(
        {"has_access": True, "access_level": "cohort"},
        {"_id": 0},
    ).to_list(200)

    sent_count = 0
    for record in enrolled:
        user_id = record.get("user_id")
        if not user_id:
            continue

        # Skip if we sent a reminder in the last 30 days
        last_sent = record.get("monthly_audit_reminder_sent_at")
        if last_sent:
            try:
                last_dt = datetime.fromisoformat(last_sent)
                if last_dt > thirty_days_ago:
                    continue
            except Exception:
                pass

        # Skip if they already submitted a check this month
        latest_check = await db.monthly_checks.find_one(
            {"userId": user_id, "submittedAt": {"$gte": thirty_days_ago.isoformat()}},
            {"_id": 0, "submittedAt": 1},
        )
        if latest_check:
            continue

        user = await db.users.find_one({"user_id": user_id}, {"_id": 0})
        if not user or not user.get("email"):
            continue

        first_name = (user.get("name") or "Operator").split()[0]
        email = user["email"]
        month_label = now.strftime("%B")

        html = (
            f'<!DOCTYPE html><html><body style="margin:0;padding:0;background:#000f1f;">'
            f'<div style="max-width:600px;margin:0 auto;font-family:\'Inter\',sans-serif;background:#000f1f;color:#f4f7fb;">'
            f'<div style="border-bottom:1px solid rgba(197,160,89,0.2);padding:28px 32px 20px;">'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(197,160,89,0.6);margin:0 0 4px;">LaunchPath Transportation EDU</p>'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin:0;">{month_label} Audit Readiness — Monthly Reminder</p>'
            f'</div>'
            f'<div style="padding:32px;">'
            f'<p style="font-size:16px;color:rgba(255,255,255,0.88);line-height:1.7;margin:0 0 6px;">{first_name},</p>'
            f'<p style="font-size:15px;color:rgba(255,255,255,0.72);line-height:1.75;margin:0 0 28px;">'
            f'Your {month_label} Audit Readiness Check hasn\'t been submitted yet. '
            f'Running your check takes under 5 minutes and keeps your compliance posture current before FMCSA does it for you.</p>'
            f'<div style="border:1px solid rgba(197,160,89,0.18);border-left:3px solid rgba(197,160,89,0.55);padding:20px 24px;margin:0 0 28px;">'
            f'<p style="font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(197,160,89,0.7);margin:0 0 12px;">WHY THIS MATTERS</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 8px;">— New Entrant audit window is active. Each month you skip is a month with blind spots.</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 8px;">— FMCSA does not warn you before scheduling. Your check is your early warning system.</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0;">— 5 minutes now prevents 87+ days of remediation later.</p>'
            f'</div>'
            f'<a href="{FRONTEND_URL}/portal" style="display:inline-block;background:#C5A059;color:#002244;font-weight:700;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;padding:16px 32px;text-decoration:none;">Run {month_label} Check →</a>'
            f'<div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-top:32px;">'
            f'<p style="font-size:14px;color:rgba(255,255,255,0.75);margin:0 0 4px;">— Vince Lawrence</p>'
            f'<p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">Station Custodian, LP-VNL<br>LaunchPath Transportation EDU</p>'
            f'</div></div>'
            f'<div style="background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.05);padding:16px 32px;">'
            f'<p style="font-size:10px;color:rgba(255,255,255,0.2);font-family:monospace;letter-spacing:0.05em;margin:0;">'
            f'LP-STD-001 · You are receiving this because you are enrolled in the LaunchPath Standard cohort.</p>'
            f'</div></div></body></html>'
        )

        await send_mailersend_email(email, first_name, f"{month_label} Audit Readiness Check — Due This Month", html)
        await db.user_access.update_one(
            {"user_id": user_id},
            {"$set": {"monthly_audit_reminder_sent_at": now.isoformat()}},
        )
        sent_count += 1
        logger.info(f"Monthly audit reminder sent to {user_id}")

    logger.info(f"Monthly audit reminder worker: {sent_count} reminders sent.")


def _g0_email2_html(first_name: str, outcome: str) -> tuple[str, str]:
    """Return (subject, html) for Ground 0 Email 2 by outcome."""
    GOLD = "#C5A059"
    NAVY = "#001B36"
    TEXT = "rgba(255,255,255,0.82)"
    MUTED = "rgba(255,255,255,0.48)"
    FRONTEND_URL_BASE = "https://www.launchpathedu.com"

    if outcome == "GO":
        subject = "A GO result is not permission to relax. It is permission to proceed."
        internal_tag = "GROUND0_GO_EMAIL_02"
        headline = "A GO result is not permission to relax. It is permission to proceed."
        paras = [
            "Ground 0 does not exist to give encouragement without structure. It exists to identify whether forward movement is justified.",
            "Your result shows that you are presently positioned to continue. The next responsibility is to move with discipline and build in the correct order.",
        ]
        bullets = [
            "Protecting what is already in place",
            "Correcting what is still incomplete",
            "Refusing shortcuts that create preventable exposure later",
        ]
        closing = [
            "Readiness is not the same as completion. It is the point where proper installation can begin.",
            "Continue while the structure is still clean enough to build correctly.",
        ]
        cta_label = "Proceed to Next Step"
        cta_href = f"{FRONTEND_URL_BASE}/admission"
    elif outcome == "WAIT":
        subject = "A WAIT result is not meant to discourage you. It is meant to protect you."
        internal_tag = "GROUND0_WAIT_EMAIL_02"
        headline = "A WAIT result is not meant to discourage you. It is meant to protect you."
        paras = [
            "Most preventable damage begins when someone keeps moving after the warning signs have already appeared.",
            "Ground 0 is designed to interrupt that pattern.",
            "A WAIT result means there are issues that need correction before moving forward. That pause may feel inconvenient, but inconvenience now is often cheaper than disorder later.",
            "What matters next is not speed. What matters next is correction.",
        ]
        bullets = [
            "Treat it as instruction, not insult",
            "Repair weak areas before adding pressure",
            "Return when the foundation is stronger than it was before",
        ]
        closing = [
            "A carrier does not become safer by moving faster than its structure can support.",
            "When you are ready, return with a cleaner position.",
        ]
        cta_label = "Revisit Ground 0"
        cta_href = f"{FRONTEND_URL_BASE}/ground-0-briefing"
    else:  # NO-GO
        subject = "A NO-GO result exists for a reason."
        internal_tag = "GROUND0_NOGO_EMAIL_02"
        headline = "A NO-GO result exists for a reason."
        paras = [
            "It is there to stop momentum from overriding judgment.",
            "There are times when the right decision is not to push harder, but to refuse the wrong timing. A system with no refusal mechanism is not protective. It is careless.",
            "Ground 0 is designed to mark that line clearly.",
            "A NO-GO result does not mean the future is closed. It means the present condition does not support the next step.",
            "That distinction matters.",
        ]
        bullets = []
        closing = [
            "For now, the correct move is restraint. If your position changes later, you can return and reassess from a stronger place.",
            "Until then, the result stands for your protection.",
        ]
        cta_label = "Remain on the List"
        cta_href = f"{FRONTEND_URL_BASE}/ground-0-briefing"

    body_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in paras
    )
    bullets_section = ""
    if bullets:
        bl = "".join(
            f'<li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">{b}</li>'
            for b in bullets
        )
        bullets_section = (
            f'<div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>'
            f'<ul style="margin:0 0 24px;padding:0 0 0 18px;">{bl}</ul>'
            f'<div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>'
        )
    closing_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in closing
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {GOLD};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 28px;">LP-GRD-0 &nbsp;|&nbsp; GROUND 0 FOLLOW-UP &nbsp;|&nbsp; {internal_tag}</p>
        <p style="font-size:16px;color:{TEXT};line-height:1.75;margin:0 0 20px;">{first_name},</p>
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.3;">{headline}</h2>
        {body_html}
        {bullets_section}
        {closing_html}
        <table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr>
          <td style="background:{GOLD};"><a href="{cta_href}" style="display:inline-block;background:{GOLD};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">{cta_label} &#8594;</a></td>
        </tr></table>
        <p style="font-size:15px;color:{TEXT};margin:0 0 4px;">— LaunchPath</p>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;letter-spacing:0.12em;color:rgba(255,255,255,0.20);margin:0;text-transform:uppercase;">LP-GRD-0 &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Content does not constitute legal, compliance, or financial advice.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""
    return subject, html


async def _send_ground0_sequence_emails():
    """Send scheduled Ground 0 Email 2 messages (GO 24h, WAIT 3d, NO-GO 5d)."""
    now = datetime.now(timezone.utc)
    due = await db.ground0_sequences.find(
        {"email2_sent": False, "email2_send_at": {"$lte": now.isoformat()}},
        {"_id": 0},
    ).to_list(200)

    sent = 0
    for rec in due:
        email = rec.get("email")
        first_name = (rec.get("first_name") or "Operator").strip() or "Operator"
        outcome = rec.get("outcome", "")
        if not email or outcome not in ("GO", "WAIT", "NO-GO"):
            continue
        try:
            subject, html = _g0_email2_html(first_name, outcome)
            await send_mailersend_email(email, first_name, subject, html)
            await db.ground0_sequences.update_one(
                {"email": email, "outcome": outcome},
                {"$set": {"email2_sent": True, "email2_sent_at": now.isoformat()}},
            )
            sent += 1
            logger.info(f"Ground 0 Email 2 sent: {email} ({outcome})")
        except Exception as exc:
            logger.error(f"Ground 0 Email 2 failed for {email} ({outcome}): {exc}")

    logger.info(f"Ground 0 sequence worker: {sent} Email 2s sent from {len(due)} due.")


async def followup_email_worker():
    """Background worker — runs once daily."""
    await asyncio.sleep(3600)
    while True:
        try:
            await _send_onboarding_checkin_emails()
            await _send_followup_emails()
            await _send_monthly_audit_reminders()
            await _send_ground0_sequence_emails()
            await process_pending_sequences()
        except Exception as e:
            logger.error(f"Followup email worker error: {e}")
        await asyncio.sleep(86400)
