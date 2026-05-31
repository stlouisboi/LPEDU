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


async def _dropout_recovery_worker():
    """
    LP-WRK-001 §4.6 — Drop-out recovery protocol.
    Runs daily, checks for checkpoints whose target_day has passed
    without being marked PASSED, and fires MailerSend recovery emails.
    """
    from routes.sequences import send_dropout_recovery_day3, send_dropout_recovery_day7, send_deferred_enrollment_offer, _update_crm_state

    now = datetime.now(timezone.utc)

    # Get all enrolled carriers
    carriers = await db.user_access.find(
        {"has_access": True, "access_level": "cohort"},
        {"_id": 0}
    ).to_list(200)

    for carrier_rec in carriers:
        carrier_id = carrier_rec.get("user_id")
        if not carrier_id:
            continue

        granted_at_str = carrier_rec.get("granted_at", "")
        if not granted_at_str:
            continue
        try:
            granted_at = datetime.fromisoformat(granted_at_str.replace("Z", "+00:00"))
            if granted_at.tzinfo is None:
                granted_at = granted_at.replace(tzinfo=timezone.utc)
        except ValueError:
            continue

        user = await db.users.find_one({"user_id": carrier_id}, {"_id": 0})
        if not user or not user.get("email"):
            continue
        email = user["email"]
        first_name = (user.get("name") or "").split()[0] or "Operator"

        checkpoints = await db.carrier_checkpoints.find(
            {"carrier_id": carrier_id, "status": {"$in": ["PENDING", "SUBMITTED", "UNDER_REVIEW"]}},
            {"_id": 0}
        ).to_list(10)

        for cp in checkpoints:
            target_day = cp.get("target_day", 0)
            cp_code = cp.get("checkpoint_code", "")
            cp_label = cp.get("checkpoint_label", "")
            checkpoint_id = cp.get("checkpoint_id", "")

            deadline = granted_at + timedelta(days=target_day)
            days_overdue = (now - deadline).days

            if days_overdue < 3:
                continue  # Not yet overdue enough

            # Day +3: first reminder
            if days_overdue == 3 and not cp.get("recovery_day3_sent"):
                try:
                    await send_dropout_recovery_day3(email, first_name, cp_label, cp_code)
                    await db.carrier_checkpoints.update_one(
                        {"checkpoint_id": checkpoint_id},
                        {"$set": {"recovery_day3_sent": True, "recovery_day3_sent_at": now.isoformat()}}
                    )
                except Exception as exc:
                    logger.error(f"Dropout Day+3 failed for {email}: {exc}")

            # Day +5: update MailerLite tag to AT-RISK
            elif days_overdue == 5 and not cp.get("at_risk_tagged"):
                try:
                    await _update_crm_state(email, "COHORT-AT-RISK")
                    await db.carrier_checkpoints.update_one(
                        {"checkpoint_id": checkpoint_id},
                        {"$set": {"at_risk_tagged": True}}
                    )
                except Exception as exc:
                    logger.error(f"AT-RISK tag failed for {email}: {exc}")

            # Day +7: final cure notice
            elif days_overdue == 7 and not cp.get("recovery_day7_sent"):
                try:
                    await send_dropout_recovery_day7(email, first_name, cp_label, cp_code)
                    await db.carrier_checkpoints.update_one(
                        {"checkpoint_id": checkpoint_id},
                        {"$set": {"recovery_day7_sent": True, "recovery_day7_sent_at": now.isoformat()}}
                    )
                except Exception as exc:
                    logger.error(f"Dropout Day+7 failed for {email}: {exc}")

            # Day +14: move to COHORT-PAUSED
            elif days_overdue >= 14 and not cp.get("cohort_paused"):
                try:
                    await _update_crm_state(email, "COHORT-PAUSED")
                    await db.carrier_checkpoints.update_one(
                        {"checkpoint_id": checkpoint_id},
                        {"$set": {"cohort_paused": True, "cohort_paused_at": now.isoformat()}}
                    )
                    await db.user_access.update_one(
                        {"user_id": carrier_id},
                        {"$set": {"cohort_status": "PAUSED"}}
                    )
                except Exception as exc:
                    logger.error(f"COHORT-PAUSED update failed for {email}: {exc}")

            # Day +44: seat released — deferred enrollment offer
            elif days_overdue >= 44 and not cp.get("deferred_offer_sent"):
                try:
                    from routes.sequences import send_deferred_enrollment_offer
                    await send_deferred_enrollment_offer(email, first_name)
                    await db.carrier_checkpoints.update_one(
                        {"checkpoint_id": checkpoint_id},
                        {"$set": {"deferred_offer_sent": True, "deferred_offer_sent_at": now.isoformat()}}
                    )
                    await db.user_access.update_one(
                        {"user_id": carrier_id},
                        {"$set": {"cohort_status": "SEAT_RELEASED"}}
                    )
                except Exception as exc:
                    logger.error(f"Deferred offer failed for {email}: {exc}")

    logger.info("Dropout recovery worker completed.")


def _audit_window_urgency_email(first_name: str, tier: str, days_remaining: int) -> tuple:
    """Build audit window urgency reminder email. Returns (subject, html)."""
    NAVY = "#001B36"
    TEXT = "rgba(255,255,255,0.82)"
    MUTED = "rgba(255,255,255,0.48)"
    PORTAL_URL = (FRONTEND_URL or "https://www.launchpathedu.com") + "/portal"

    if tier == "moderate":
        color = "#FBBF24"
        subject = f"Your FMCSA audit window — {days_remaining} days remaining."
        header_label = f"AUDIT WINDOW · MODERATE URGENCY · {days_remaining} DAYS REMAINING"
        headline = "Your New Entrant audit window has entered the middle phase."
        paras = [
            f"You have {days_remaining} days remaining in your 18-month New Entrant Safety Audit window.",
            "This is the phase where carriers building correctly have time to complete the installation and verify each domain before FMCSA arrives. Carriers not building correctly are running out of that time.",
            "The LaunchPath Standard is designed to be completed in 90 days. If you have not started, the window to do it properly is narrowing.",
        ]
        bullets = [
            "Run your Audit Readiness Check in the portal to confirm your current exposure",
            "Ensure your Driver Qualification Files, D&A program, and insurance certificates are complete and current",
            "Review the 16 Deadly Sins — these are the gaps FMCSA finds most often",
        ]
        cta_label = "Run Audit Readiness Check →"
    elif tier == "high":
        color = "#F59E0B"
        subject = f"FMCSA audit window: {days_remaining} days remaining. Action required."
        header_label = f"AUDIT WINDOW · HIGH URGENCY · {days_remaining} DAYS REMAINING"
        headline = f"Your FMCSA audit window closes in {days_remaining} days."
        paras = [
            f"You have {days_remaining} days remaining. That is not a safety margin — that is the close of the window.",
            "At this stage, gaps in your compliance infrastructure are visible to FMCSA before they are visible to you. The time to find them first is now, not when you receive notice of a scheduled audit.",
            "If any domain — driver qualification, drug and alcohol, hours of service, vehicle maintenance, or insurance authority — is incomplete, that is where FMCSA will go first.",
        ]
        bullets = [
            "Run a full Audit Readiness Check immediately",
            "Verify all DQ files are complete and current for every operating driver",
            "Confirm your D&A program enrollment and random testing pool are active",
            "Check that insurance certificates reflect current operations and are filed with FMCSA",
        ]
        cta_label = "Open Portal — Check Compliance Status →"
    else:  # critical
        color = "#F87171"
        subject = f"URGENT — FMCSA audit window closes in {days_remaining} days."
        header_label = f"AUDIT WINDOW · CRITICAL · {days_remaining} DAYS REMAINING"
        headline = f"Your FMCSA audit window closes in {days_remaining} days."
        paras = [
            "This is not a warning you should set aside. At this stage, the probability that FMCSA will schedule a New Entrant Safety Audit before this window closes is high.",
            "Any outstanding compliance gaps — missing documents, unverified files, inactive programs — are the same items FMCSA will use to evaluate your authority status.",
            "The cost of a failed New Entrant audit is not a fine. It is loss of operating authority, disrupted operations, and remediation that can run $10,000–$25,000 in professional correction fees.",
            "You have time to act. You do not have time to delay.",
        ]
        bullets = [
            "Run Audit Readiness Check NOW — every domain",
            "Review flagged items and correct them immediately",
            "Contact the Station Custodian if you need urgent review support",
        ]
        cta_label = "OPEN PORTAL — IMMEDIATE ACTION REQUIRED →"

    body_html = "".join(
        f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">{p}</p>'
        for p in paras
    )
    bullets_html = "".join(
        f'<li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 8px;">{b}</li>'
        for b in bullets
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000a14;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#000a14;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {color};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:{color};margin:0 0 28px;">{header_label}</p>
        <p style="font-size:16px;color:{TEXT};line-height:1.75;margin:0 0 20px;">{first_name},</p>
        <h2 style="font-size:21px;font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.3;">{headline}</h2>
        {body_html}
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:{color};margin:0 0 12px;">ACTION ITEMS</p>
        <ul style="margin:0 0 24px;padding:0 0 0 18px;">{bullets_html}</ul>
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr>
          <td><a href="{PORTAL_URL}" style="display:inline-block;background:{color};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">{cta_label}</a></td>
        </tr></table>
        <p style="font-size:15px;color:{TEXT};margin:0 0 4px;">— Vince Lawrence</p>
        <p style="font-size:12px;color:{MUTED};margin:0;">Station Custodian, LaunchPath Transportation EDU</p>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:9px;letter-spacing:0.12em;color:rgba(255,255,255,0.20);margin:0;text-transform:uppercase;">LP-WRK-001 &nbsp;·&nbsp; launchpathedu.com &nbsp;·&nbsp; Not legal or compliance advice.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""
    return subject, html


async def _send_audit_window_urgency_reminders():
    """
    LP-WRK-001 — Audit window urgency portal reminders.
    Fires MailerSend emails when a carrier's New Entrant audit window
    crosses into 'moderate' (120–240 days), 'high' (60–120 days),
    or 'critical' (<60 days) urgency tiers. Each tier sends once per carrier
    (deduped via flags on icp_assessments).
    """
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    assessments = await db.icp_assessments.find(
        {"authority_grant_date": {"$exists": True, "$nin": ["", None]}},
        {"_id": 0},
    ).to_list(500)

    sent = 0
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
            continue  # Window closed

        # Determine urgency tier
        if days_remaining <= 60:
            tier = "critical"
        elif days_remaining <= 120:
            tier = "high"
        elif days_remaining <= 240:
            tier = "moderate"
        else:
            continue  # Low urgency — no reminder yet

        flag_key = f"audit_window_{tier}_sent"
        if rec.get(flag_key):
            continue  # Already sent this tier's reminder

        # Fetch user name
        user = await db.users.find_one({"email": email}, {"_id": 0})
        first_name = "Operator"
        if user:
            first_name = (user.get("name") or "").split()[0] or "Operator"

        subject, html = _audit_window_urgency_email(first_name, tier, days_remaining)
        try:
            await send_mailersend_email(email, first_name, subject, html)
            await db.icp_assessments.update_one(
                {"email": email},
                {"$set": {flag_key: True, f"{flag_key}_at": datetime.now(timezone.utc).isoformat()}},
            )
            sent += 1
            logger.info(f"Audit window {tier} reminder sent to {email} ({days_remaining} days remaining)")
        except Exception as exc:
            logger.error(f"Audit window urgency email failed for {email}: {exc}")

    logger.info(f"Audit window urgency worker: {sent} reminders sent.")


async def _reevaluation_180d_worker():
    """
    LP-WRK-001 §1.4 — NOT-ADMITTED-TIMING re-evaluation at 180 days.
    Checks icp_assessments for NURTURE_NEAR / NURTURE_FAR leads 180+ days old.
    """
    from routes.sequences import send_180day_reevaluation_email

    cutoff = datetime.now(timezone.utc) - timedelta(days=180)
    candidates = await db.icp_assessments.find(
        {
            "icp_classification": {"$in": ["NURTURE_NEAR", "NURTURE_FAR"]},
            "assessed_at": {"$lte": cutoff.isoformat()},
            "reevaluation_180d_sent": {"$ne": True},
        },
        {"_id": 0}
    ).to_list(500)

    sent = 0
    for rec in candidates:
        email = rec.get("email", "")
        if not email:
            continue
        first_name = email.split("@")[0]
        score = rec.get("icp_score", 0)
        try:
            await send_180day_reevaluation_email(email, first_name, original_score=score)
            sent += 1
        except Exception as exc:
            logger.error(f"180-day re-eval failed for {email}: {exc}")

    logger.info(f"180-day re-evaluation worker: {sent} emails sent.")


async def followup_email_worker():
    """Background worker — runs once daily."""
    await asyncio.sleep(3600)
    while True:
        try:
            await _send_onboarding_checkin_emails()
            await _send_followup_emails()
            await _send_monthly_audit_reminders()
            await _send_audit_window_urgency_reminders()
            await _send_ground0_sequence_emails()
            await process_pending_sequences()
            await _dropout_recovery_worker()
            await _reevaluation_180d_worker()
        except Exception as e:
            logger.error(f"Followup email worker error: {e}")
        await asyncio.sleep(86400)
