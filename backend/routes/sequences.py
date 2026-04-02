"""
Email Sequence System — LaunchPath
Flow 4: WAIT / NO-GO Correction Sequence  (reach_correction)
Flow 5: 16 Deadly Sins Lead Nurture       (sins_nurture)

Sequences are stored in db.email_sequences.
Call process_pending_sequences() to flush pending emails.
"""
import asyncio
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends
from core import db, logger, send_mailersend_email, _require_coach, FRONTEND_URL

router = APIRouter()

FRONTEND = (FRONTEND_URL or "https://launchpathedu.com").rstrip("/")
GOLD   = "#C5A059"
NAVY   = "#001B36"
BG     = "#0a0f1a"
TEXT   = "rgba(255,255,255,0.82)"
MUTED  = "rgba(255,255,255,0.48)"
MONO   = "'JetBrains Mono','Courier New',monospace"
SERIF  = "'Playfair Display','Georgia',serif"


# ── Shared HTML helpers ────────────────────────────────────────────────────────

def _wrap(code: str, body: str) -> str:
    return f"""<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:{BG};font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:{BG};">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {GOLD};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:{MONO};font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(197,160,89,0.55);margin:0 0 28px;">{code}</p>
        {body}
      </td></tr>
      <tr><td style="padding:28px 40px 40px;">
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
        <p style="font-family:{MONO};font-size:9px;color:{MUTED};margin:0;letter-spacing:0.10em;">
          LaunchPath Transportation EDU &nbsp;|&nbsp; launchpathedu.com<br>
          You received this because you interacted with LaunchPath.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""


def _cta(label: str, href: str) -> str:
    return f"""<table cellpadding="0" cellspacing="0" style="margin:24px 0;">
  <tr><td style="background:{GOLD};">
    <a href="{href}" style="display:inline-block;background:{GOLD};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">{label} &#8594;</a>
  </td></tr>
</table>"""


def _secondary_cta(label: str, href: str) -> str:
    return f'<p style="font-size:14px;color:{MUTED};margin:8px 0 24px;"><a href="{href}" style="color:{GOLD};text-decoration:none;">{label}</a></p>'


def _para(text: str) -> str:
    return f'<p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 16px;">{text}</p>'


def _sig(full: bool = False) -> str:
    if full:
        return f"""<div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-size:14px;color:{MUTED};margin:0 0 4px;">— Vince Lawrence</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.30);margin:0 0 4px;">Founder, LaunchPath Transportation EDU</p>
        <p style="font-style:italic;font-size:13px;color:rgba(255,255,255,0.30);margin:0;">I don't do your compliance. I built the system so you can do it yourself.</p>"""
    return f'<p style="font-size:14px;color:{MUTED};margin:16px 0 0;">— Vince</p>'


def _bullet(items: list) -> str:
    lis = "".join(f'<li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 4px;">{i}</li>' for i in items)
    return f'<ul style="margin:0 0 20px;padding:0 0 0 18px;">{lis}</ul>'


# ── FLOW 4 — WAIT / NO-GO Correction Sequence ─────────────────────────────────

def _f4_email1(first_name: str) -> tuple[str, str, str]:
    subject    = "Your REACH result is saved"
    preview    = "The result is not punishment. It is exposure made visible."
    body = (
        _para(f"Hi {first_name},")
        + _para("Your REACH result is saved.")
        + _para("If you received a WAIT or NO-GO, the point is not shame. The point is clarity.")
        + _para("Too many carriers move forward because the authority is active and the operation feels close enough. That is how preventable gaps stay hidden until pressure finds them.")
        + _para("REACH exists to show you something early: whether danger can already reach the operation, how exposed the authority is, and whether now is the right time to proceed.")
        + _bullet(["A WAIT does not mean never.", "A NO-GO does not mean failure forever."])
        + _para("It means the same thing in both cases: something important is not in place yet.")
        + _para("That is not the time for speed. That is the time for correction.")
        + _para("If you want the next right step, start with Ground 0. It will show you what this path really requires and why carriers break when structure comes late.")
        + _cta("Begin Ground 0 Briefing", f"{FRONTEND}/ground-0-briefing")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-04-01 | REACH CORRECTION SEQUENCE | EMAIL 1", body)


def _f4_email2(first_name: str) -> tuple[str, str, str]:
    subject    = "Active does not mean protected"
    preview    = "An MC number can be live before the operation behind it is ready."
    body = (
        _para(f"Hi {first_name},")
        + _para("An active authority can still be exposed.")
        + _para("That is the mistake a lot of carriers make early. They think movement means readiness. It does not.")
        + _para("A carrier can be dispatched, insured, answering calls, trying to move freight — and still be missing the structure FMCSA expects to find when records are reviewed.")
        + _para("That is where trouble starts. Not always with a dramatic shutdown. Usually with something smaller first:")
        + _bullet([
            "a file that is incomplete",
            "a required control that was never fully installed",
            "records that are scattered",
            "responsibilities that are unclear",
            "gaps that nobody felt until they became expensive",
        ])
        + _para("This is why REACH matters. It does not ask whether you are motivated. It asks whether the operation is exposed.")
        + _para("If your result was WAIT or NO-GO, do not argue with the warning. Use it.")
        + _cta("Review the Ground 0 Briefing", f"{FRONTEND}/ground-0-briefing")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-04-02 | REACH CORRECTION SEQUENCE | EMAIL 2", body)


def _f4_email3(first_name: str) -> tuple[str, str, str]:
    subject    = "The right answer is not speed"
    preview    = "Correction first. Movement second."
    body = (
        _para(f"Hi {first_name},")
        + _para("When a carrier is exposed, the right answer is not speed.")
        + _para("The right answer is correction.")
        + _para("That means stepping back long enough to deal with what should have been dealt with before pressure found it first.")
        + _para("At LaunchPath, protection is not built with motivation. It is built with structure.")
        + _para("That is why the standard is organized around:")
        + _bullet([
            "REACH to reveal exposure",
            "Ground 0 to form posture",
            "The Four Pillars to create the guard",
            "AUTO to show how failure gets in",
            "The 16 Deadly Sins to name the threats",
            "The modules to install the protection",
        ])
        + _para("If you received WAIT or NO-GO, that does not mean you are out. It means you should not pretend the guard is already built when it is not.")
        + _para("If you are ready to correct what is missing, begin with the briefing.")
        + _cta("Start Ground 0", f"{FRONTEND}/ground-0-briefing")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-04-03 | REACH CORRECTION SEQUENCE | EMAIL 3", body)


def _f4_email4(first_name: str) -> tuple[str, str, str]:
    subject    = "Small gaps do not stay small"
    preview    = "Most early failures are not dramatic at first. They get expensive later."
    body = (
        _para(f"Hi {first_name},")
        + _para("Most early failures do not begin as dramatic events.")
        + _para("They begin as quiet gaps.")
        + _bullet([
            "A missing record.",
            "An incomplete file.",
            "A control that was never fully installed.",
            "A false sense that the operation is 'basically ready.'",
        ])
        + _para("Then FMCSA asks questions. Or the audit window opens. Or insurance pressure shows up. Or a weak area that seemed manageable suddenly is not.")
        + _para("That is why a failed New Entrant audit is not just a paperwork problem. It can turn into:")
        + _bullet([
            "corrective action",
            "downtime",
            "added cost",
            "trust loss",
            "more instability than the carrier can absorb early",
        ])
        + _para("A lot of that exposure is preventable. But only if it is dealt with before the operation is forced to explain what should have already been in place.")
        + _para("If your REACH result was WAIT or NO-GO, treat it like early mercy, not bad news.")
        + _cta("Check What Ground 0 Covers", f"{FRONTEND}/ground-0-briefing")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-04-04 | REACH CORRECTION SEQUENCE | EMAIL 4", body)


def _f4_email5(first_name: str) -> tuple[str, str, str]:
    subject    = "Correction first. Then return."
    preview    = "When the gaps are addressed, come back and test the structure again."
    body = (
        _para(f"Hi {first_name},")
        + _para("A WAIT or NO-GO result is not the end of the road.")
        + _para("It is a stop sign.")
        + _para("Not because you are disqualified forever. Because moving forward without correction would cost more later.")
        + _para("Here is the right sequence:")
        + _bullet([
            "face what is missing",
            "correct what you can",
            "understand the structure",
            "return through REACH when you are ready",
        ])
        + _para("That is how responsible operators build. Not by ignoring the warning. Not by chasing momentum. By dealing with the exposure before it turns into damage.")
        + _para("When you are ready, start with Ground 0, then come back through REACH with better structure behind you.")
        + _cta("Begin Ground 0 and Return Ready", f"{FRONTEND}/ground-0-briefing")
        + _secondary_cta("Or retake REACH when ready", f"{FRONTEND}/reach-diagnostic")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-04-05 | REACH CORRECTION SEQUENCE | EMAIL 5", body)


FLOW4_STEPS = [
    (0,   _f4_email1),   # immediately
    (48,  _f4_email2),   # Day 2
    (120, _f4_email3),   # Day 5
    (216, _f4_email4),   # Day 9
    (336, _f4_email5),   # Day 14
]


# ── FLOW 5 — 16 Deadly Sins Lead Nurture ──────────────────────────────────────

def _f5_email1(first_name: str) -> tuple[str, str, str]:
    subject    = "Your 16 Deadly Sins checklist"
    preview    = "These failures repeat. That is why they need names."
    body = (
        _para(f"Hi {first_name},")
        + _para("Here is your 16 Deadly Sins checklist.")
        + _para("These are not random mistakes. They are recurring failures that show up early when a carrier has authority, movement, and pressure, but not enough structure behind any of it.")
        + _para("That is why they need names.")
        + _para("A lot of carriers think early failure comes from one dramatic bad break. Usually it does not. Usually it comes from:")
        + _bullet([
            "missing controls",
            "weak records",
            "incomplete files",
            "poor sequence",
            "pressure getting into places the operation never guarded",
        ])
        + _para("The point of this checklist is not fear. It is pattern recognition.")
        + _para("If you can name the threat, you have a better chance of dealing with it before it does damage.")
        + _para("Read through the checklist, and don't just ask, 'Do I know this term?' Ask: <em>Could this already reach my operation?</em>")
        + _cta("Review the 16 Deadly Sins", f"{FRONTEND}/standards/16-deadly-sins")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-05-01 | 16 SINS NURTURE SEQUENCE | EMAIL 1", body)


def _f5_email2(first_name: str) -> tuple[str, str, str]:
    subject    = "Most carriers do not fail all at once"
    preview    = "The pattern is usually quiet before it gets expensive."
    body = (
        _para(f"Hi {first_name},")
        + _para("Most carriers do not fail all at once.")
        + _para("They weaken first.")
        + _bullet([
            "A gap stays in place.",
            "A file is incomplete.",
            "A required control is missing.",
            "Responsibilities are fuzzy.",
            "The operation keeps moving anyway.",
        ])
        + _para("Then something applies pressure. That is when the 'small' issue stops being small.")
        + _para("This is why LaunchPath uses the language of the 16 Deadly Sins. It forces the operator to stop pretending that early failure is random.")
        + _bullet([
            "The threats repeat.",
            "The paths repeat.",
            "The consequences repeat.",
        ])
        + _para("That means protection can be built on purpose.")
        + _para("The first step is not confidence. The first step is awareness.")
        + _cta("See How LaunchPath Reads Exposure", f"{FRONTEND}/reach-diagnostic")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-05-02 | 16 SINS NURTURE SEQUENCE | EMAIL 2", body)


def _f5_email3(first_name: str) -> tuple[str, str, str]:
    subject    = "A threat still needs a path"
    preview    = "The failure matters. But so does how it gets in."
    body = (
        _para(f"Hi {first_name},")
        + _para("A threat is only part of the picture.")
        + _para("The failure matters. But so does the path it takes to reach the operation.")
        + _para("That is why LaunchPath does not stop at naming the threats.")
        + _para("The 16 Deadly Sins name the recurring failures. AUTO shows the four ways those failures try to get past the guard:")
        + _bullet(["Around", "Under", "Through", "Over"])
        + _para("That matters because a carrier can know a rule and still not understand how the operation is being breached.")
        + _para("You do not protect authority just by knowing what can go wrong. You protect it by understanding:")
        + _bullet([
            "where the operation is weak",
            "how danger moves",
            "what guard is missing",
            "what needs to be built before pressure gets there first",
        ])
        + _para("That is the difference between information and structure.")
        + _cta("Learn How the Protection Model Works", f"{FRONTEND}/standards/auto-method")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-05-03 | 16 SINS NURTURE SEQUENCE | EMAIL 3", body)


def _f5_email4(first_name: str) -> tuple[str, str, str]:
    subject    = "Information does not protect an authority"
    preview    = "The operation needs a guard, not just awareness."
    body = (
        _para(f"Hi {first_name},")
        + _para("Information by itself does not protect an authority.")
        + _bullet([
            "A checklist does not protect it.",
            "A saved PDF does not protect it.",
            "Knowing the right words does not protect it.",
        ])
        + _para("The operation needs a guard.")
        + _para("At LaunchPath, that guard is built through the Four Pillars:")
        + _bullet([
            "Authority Protection",
            "Insurance Continuity",
            "Compliance Backbone",
            "Cash-Flow Oxygen",
        ])
        + _para("The point is not to sound smart. The point is to make sure the operation is defended where new carriers break most often.")
        + _para("That is why the standard is not just educational. It is structural.")
        + _para("The modules are there to install the protection in practice.")
        + _cta("Begin the Ground 0 Briefing", f"{FRONTEND}/ground-0-briefing")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-05-04 | 16 SINS NURTURE SEQUENCE | EMAIL 4", body)


def _f5_email5(first_name: str) -> tuple[str, str, str]:
    subject    = "The checklist is not the end of the process"
    preview    = "The next step is to test the operation, not just collect information."
    body = (
        _para(f"Hi {first_name},")
        + _para("If the 16 Deadly Sins checklist did its job, one thing should be clearer now:")
        + _para("The real question is not whether these threats exist. The real question is: <em>how close are they to your operation right now?</em>")
        + _para("That is where REACH comes in.")
        + _para("REACH is not a motivation quiz. It is an exposure-awareness check. It helps reveal:")
        + _bullet([
            "whether danger can already reach the authority",
            "how exposed the operation is",
            "whether you should proceed, wait, or stop",
        ])
        + _para("If you want a clear next step, take REACH. If you want the briefing first, start with Ground 0.")
        + _para("Either way, do not stop at information. Use it to make the structure visible.")
        + _cta("Check My Exposure", f"{FRONTEND}/reach-diagnostic")
        + _secondary_cta("Or begin Ground 0", f"{FRONTEND}/ground-0-briefing")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-05-05 | 16 SINS NURTURE SEQUENCE | EMAIL 5", body)


FLOW5_STEPS = [
    (0,   _f5_email1),   # immediately
    (48,  _f5_email2),   # Day 2
    (96,  _f5_email3),   # Day 4
    (168, _f5_email4),   # Day 7
    (264, _f5_email5),   # Day 11
]


# ── FLOW 6 — Pre-Op Checklist Welcome Sequence ────────────────────────────────

def _f6_email1(first_name: str) -> tuple[str, str, str]:
    subject = "Your startup checklist — one phase makes or breaks the rest"
    preview = "Phase 3 does not close when the authority is active."
    body = (
        _para(f"Hi {first_name},")
        + _para("The checklist you accessed covers four phases. Phases 1 and 2 are sequential and mostly administrative. Phase 3 is the compliance install — and it is the phase where most new carriers cut corners.")
        + _para("Phase 3 does not close when the authority is active. It closes when every item on this list is documented:")
        + _bullet([
            "Insurance filed via BMC-91 — active and verified in SAFER",
            "Drug and Alcohol program established — consortium enrolled, DER designated",
            "Pre-employment drug test completed for every CDL driver — result on file",
            "Complete DQ file in place for every CDL driver",
            "ELD installed — confirmed on FMCSA approved device list",
        ])
        + _para("FMCSA does not review what you planned to complete. The audit reviews what was in place before the first dispatch.")
        + _para("Tomorrow: the Phase 3 item that new carriers are most commonly found missing at audit.")
        + _cta("Review the Full Startup Sequence", f"{FRONTEND}/knowledge-center/how-to-start-a-trucking-company")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-06-01 | PRE-OP CHECKLIST SEQUENCE | EMAIL 1", body)


def _f6_email2(first_name: str) -> tuple[str, str, str]:
    subject = "The Phase 3 item FMCSA finds missing most often"
    preview = "Most carriers understand a CDL driver needs a drug test. Most stop there."
    body = (
        _para(f"Hi {first_name},")
        + _para("In a new entrant safety audit, one Phase 3 item shows up as missing more than any other.")
        + _para("The Drug and Alcohol program.")
        + _para("Not because carriers know it is required and skip it. Because most carriers understand that CDL drivers need a drug test before dispatch — and stop there.")
        + _para("That is not a program.")
        + _para("A program requires:")
        + _bullet([
            "Consortium enrollment — documented",
            "A designated DER (Designated Employer Representative) — named and on record",
            "Pre-employment drug test result — MRO-verified, in the DQ file, before first dispatch",
            "Random testing pool — active and managed",
            "Post-accident protocol — documented",
        ])
        + _para("When FMCSA audits and finds a driver who was dispatched without a documented negative pre-employment result, that is not a paperwork deficiency. It is evidence that the carrier dispatched without meeting a federal requirement.")
        + _para("The DOT Drug and Alcohol Program Requirements page covers what the program actually requires — the six testing types, the DER designation, the Clearinghouse registration, and how to set up a consortium.")
        + _cta("Read the D&A Program Requirements", f"{FRONTEND}/knowledge-center/dot-drug-alcohol-program-requirements")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-06-02 | PRE-OP CHECKLIST SEQUENCE | EMAIL 2", body)


def _f6_email3(first_name: str) -> tuple[str, str, str]:
    subject = "The checklist tells you what to build. REACH tells you what is already exposed."
    preview = "A free scored diagnostic. Less than ten minutes."
    body = (
        _para(f"Hi {first_name},")
        + _para("The checklist covers what a carrier needs before first dispatch.")
        + _para("REACH covers something different.")
        + _para("It is a free scored diagnostic — less than ten minutes. It shows your current exposure across the Four Pillars of the LaunchPath Protection System: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen.")
        + _para("The checklist assumes you are building correctly from the start. REACH checks whether the operation already has gaps that danger can reach — regardless of where you are in the build.")
        + _para("If you have not run it yet, it takes less time than reading this email twice.")
        + _cta("Run the REACH Test", f"{FRONTEND}/auto-diagnostic")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-06-03 | PRE-OP CHECKLIST SEQUENCE | EMAIL 3", body)


FLOW6_STEPS = [
    (24,  _f6_email1),   # Day 1
    (72,  _f6_email2),   # Day 3
    (168, _f6_email3),   # Day 7
]


# ── Enrollment ─────────────────────────────────────────────────────────────────

async def _enroll(email: str, first_name: str, sequence_type: str, steps: list):
    """Create or refresh a sequence record in db.email_sequences."""
    now = datetime.now(timezone.utc)
    emails = [
        {
            "step": i + 1,
            "send_at": (now + timedelta(hours=delay_hours)).isoformat(),
            "sent": False,
            "sent_at": None,
            "subject": builders(first_name)[0],
        }
        for i, (delay_hours, builders) in enumerate(steps)
    ]
    await db.email_sequences.update_one(
        {"email": email, "sequence_type": sequence_type},
        {"$setOnInsert": {
            "email": email,
            "first_name": first_name,
            "sequence_type": sequence_type,
            "enrolled_at": now.isoformat(),
            "emails": emails,
            "completed": False,
        }},
        upsert=True,
    )
    logger.info(f"Enrolled {email} in {sequence_type} ({len(steps)} steps)")


async def enroll_reach_correction_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "reach_correction", FLOW4_STEPS)


async def enroll_sins_nurture_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "sins_nurture", FLOW5_STEPS)


async def enroll_pre_op_checklist_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "pre_op_checklist", FLOW6_STEPS)


# ── Processor ─────────────────────────────────────────────────────────────────

BUILDERS = {
    "reach_correction": FLOW4_STEPS,
    "sins_nurture":     FLOW5_STEPS,
    "pre_op_checklist": FLOW6_STEPS,
}


async def process_pending_sequences() -> dict:
    """Send any emails whose send_at time has passed. Call this from a cron or admin trigger."""
    now       = datetime.now(timezone.utc)
    sent_count = 0
    errors     = []

    cursor = db.email_sequences.find({"completed": False})
    async for seq in cursor:
        steps    = BUILDERS.get(seq["sequence_type"], [])
        email    = seq["email"]
        fname    = seq.get("first_name") or "there"
        updated  = False
        all_done = True

        for i, (_, builder) in enumerate(steps):
            step_rec = seq["emails"][i] if i < len(seq["emails"]) else None
            if not step_rec or step_rec.get("sent"):
                continue
            all_done = False
            send_at_str = step_rec.get("send_at", "")
            send_at = datetime.fromisoformat(send_at_str.replace("Z", "+00:00"))
            if send_at.tzinfo is None:
                send_at = send_at.replace(tzinfo=timezone.utc)
            if now < send_at:
                all_done = False
                continue
            try:
                subject, _preview, html = builder(fname)
                await send_mailersend_email(email, fname, subject, html)
                seq["emails"][i]["sent"]    = True
                seq["emails"][i]["sent_at"] = now.isoformat()
                updated  = True
                sent_count += 1
                logger.info(f"Sequence email sent: {email} / {seq['sequence_type']} step {i+1}")
            except Exception as exc:
                errors.append(f"{email}/{seq['sequence_type']}/step{i+1}: {exc}")
                logger.error(f"Sequence send failed: {exc}")

        all_done = all(e.get("sent") for e in seq["emails"])
        if updated:
            await db.email_sequences.update_one(
                {"_id": seq["_id"]},
                {"$set": {"emails": seq["emails"], "completed": all_done}},
            )

    return {"sent": sent_count, "errors": errors}


# ── API endpoints ──────────────────────────────────────────────────────────────

@router.post("/sequences/process")
async def trigger_process(coach_id: str = Depends(_require_coach)):
    """Admin-triggered sequence processor. Hook this to a cron or call manually."""
    result = await process_pending_sequences()
    return {"ok": True, **result}


@router.get("/admin/sequences")
async def list_sequences(coach_id: str = Depends(_require_coach)):
    docs = await db.email_sequences.find({}, {"_id": 0}).sort("enrolled_at", -1).to_list(500)
    total        = len(docs)
    active       = sum(1 for d in docs if not d.get("completed"))
    completed    = sum(1 for d in docs if d.get("completed"))
    reach_count      = sum(1 for d in docs if d.get("sequence_type") == "reach_correction")
    sins_count       = sum(1 for d in docs if d.get("sequence_type") == "sins_nurture")
    checklist_count  = sum(1 for d in docs if d.get("sequence_type") == "pre_op_checklist")
    return {
        "sequences": docs,
        "stats": {
            "total": total, "active": active, "completed": completed,
            "reach_correction": reach_count, "sins_nurture": sins_count,
            "pre_op_checklist": checklist_count,
        },
    }
