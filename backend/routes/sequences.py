"""
Email Sequence System — LaunchPath
Flow 4: WAIT / NO-GO Correction Sequence       (reach_correction)
Flow 5: 16 Deadly Sins Lead Nurture            (sins_nurture)
Flow 6: Pre-Op Checklist Welcome               (pre_op_checklist)
Flow 7: Track A — NURTURE-NEAR (LP-WRK-001)   (nurture_near)
Flow 8: Track B — NURTURE-FAR  (LP-WRK-001)   (nurture_far)
Flow 9: Post-Credential Alumni (LP-WRK-001)   (alumni)

Sequences are stored in db.email_sequences.
Call process_pending_sequences() to flush pending emails.
"""
import asyncio
import os
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends
from core import db, logger, send_mailersend_email, _require_coach, FRONTEND_URL

MAILERLITE_API_KEY = os.environ.get("MAILERLITE_API_KEY", "")

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


# ── FLOW 7 — Track A: NURTURE-NEAR (Score 40–59, 30-Day Cycle) ────────────────
# LP-WRK-001 §3.1 — 5 emails at Days 0, 3, 7, 14, 21. Day 30 = system re-score only.

def _f7_email1(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Day 0 — Personalized REACH score summary. No pitch."""
    ed = extra_data or {}
    icp_score = ed.get("icp_score", 0)
    dims = ed.get("icp_dimensions", {})
    _DIM = {"d1": ("Authority Status", 25), "d2": ("Audit Window Position", 20),
            "d3": ("Fleet Profile", 15), "d4": ("File State", 25), "d5": ("Decision Authority", 15)}
    gaps = sorted(((v / m, lbl, v, m) for k, (lbl, m) in _DIM.items() for v in [dims.get(k, 0)]), key=lambda x: x[0])
    g1 = f"{gaps[0][1]} ({gaps[0][2]}/{gaps[0][3]})"
    g2 = f"{gaps[1][1]} ({gaps[1][2]}/{gaps[1][3]})"

    subject = "Your REACH Score is in — here is what it means"
    preview = "Your ICP score shows you are close. Here is what is holding the threshold."
    body = (
        _para(f"Hi {first_name},")
        + _para(f"Your REACH score came in at {icp_score}/100. That places you in the near-threshold range — close to qualification, not there yet.")
        + _para("The score measures five dimensions: authority status, audit window position, fleet profile, current file state, and decision authority.")
        + _para(f"The two areas with the most room to improve are {g1}, and {g2}.")
        + _para("These are not permanent disqualifiers. They are a picture of your current position — and what needs to shift before the timing is right for the Standard.")
        + _para("Over the next several weeks you will receive one email at a time. Each one addresses a specific part of what FMCSA actually measures — not what most carriers assume it measures. No pitch. Just the picture.")
        + _cta("Read Your Full Diagnostic Report", f"{FRONTEND}/reach-diagnostic")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-07-01 | TRACK A — NURTURE NEAR | EMAIL 1 OF 5", body)


def _f7_email2(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Day 3 — The 18-month new entrant safety audit window."""
    subject = "The audit window most new carriers don't know they're in"
    preview = "When you filed for your MC number, a clock started."
    body = (
        _para(f"Hi {first_name},")
        + _para("When you received operating authority, FMCSA started a clock you probably were not told about.")
        + _para("It is called the New Entrant Safety Audit. Every new carrier is subject to it within 18 months of receiving authority.")
        + _para("Here is how it works:")
        + _bullet([
            "FMCSA will contact you within 18 months — by letter, by phone, or by showing up at your principal place of business.",
            "They will request records from five compliance domains: driver qualification, drug and alcohol, hours of service, vehicle maintenance, and accident register.",
            "They are not looking for a perfect operation. They are looking for a documented one.",
            "If your records do not meet the standard, you receive a Conditional or Unsatisfactory safety rating.",
            "An Unsatisfactory rating triggers a 45-day window to correct. Failure to correct results in authority revocation.",
        ])
        + _para("Most carriers do not fail the audit because their operation was dangerous. They fail because the documentation was not there when asked for it.")
        + _para("The phrase that captures this exactly: if it is not documented, it does not exist.")
        + _cta("Download the Audit Window Checklist", f"{FRONTEND}/knowledge-center/new-entrant-safety-audit")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-07-02 | TRACK A — NURTURE NEAR | EMAIL 2 OF 5", body)


def _f7_email3(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Day 7 — The 3 files FMCSA opens first."""
    subject = "The 3 files FMCSA opens first"
    preview = "Not a summary. The actual files. In the actual order."
    body = (
        _para(f"Hi {first_name},")
        + _para("When an FMCSA investigator arrives, there is a standard sequence. They do not review everything at once. They open three files first.")
        + _para("Here is what those three are — and what a compliant version looks like versus what most new carriers actually have:")
        + _bullet([
            "Driver Qualification File — contains CDL copy, MVR, medical certificate, road test, employment history, and pre-employment drug test result for every driver. Most new carriers have a partial file for at least one driver.",
            "Drug and Alcohol Program Records — consortium enrollment, DER designation, pre-employment test results, and random selection documentation. Most new carriers have a test result but not a full program on file.",
            "Vehicle Maintenance Log — inspection records, maintenance schedule, and repair documentation for every unit. Most new carriers maintain their equipment but have no written schedule or inspection records.",
        ])
        + _para("Each of these has a specific documentation standard. A record that exists but is incomplete counts the same as a record that does not exist.")
        + _para("The Document System Bundle installs all three of these correctly — construction sequence, annotated templates, and the standard FMCSA uses to evaluate them.")
        + _cta("Install the Document System Bundle — $499", f"{FRONTEND}/compliance-library")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-07-03 | TRACK A — NURTURE NEAR | EMAIL 3 OF 5", body)


def _f7_email4(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Day 14 — FMCSA enforcement case study, no pitch."""
    subject = "A carrier flagged by FMCSA — what it means for you"
    preview = "The enforcement findings are public. The pattern is instructive."
    body = (
        _para(f"Hi {first_name},")
        + _para("FMCSA enforcement actions are public record. When a carrier receives an Unsatisfactory safety rating, the findings are documented and searchable in SAFER.")
        + _para("The pattern across new entrant enforcement actions is consistent. The most cited findings are not exotic failures. They are the same four categories, in the same order:")
        + _bullet([
            "Driver qualification file incomplete or missing required elements",
            "Drug and alcohol program not properly documented or administered",
            "Hours of service records not maintained or not accessible",
            "Vehicle maintenance records not organized or not tied to a written inspection schedule",
        ])
        + _para("When a carrier receives an Unsatisfactory rating, their authority is placed on a 45-day corrective action clock. Carriers that cannot correct within 45 days face revocation.")
        + _para("That clock does not start when FMCSA arrives. It starts 18 months after the authority was granted — when the audit window opens.")
        + _para("There is a reason these findings repeat. The same gaps, the same domains, the same timing. The carriers who avoid enforcement are not more talented. They built documentation before the window opened.")
        + _cta("See the 16 Exposure Patterns", f"{FRONTEND}/standards/16-deadly-sins")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-07-04 | TRACK A — NURTURE NEAR | EMAIL 4 OF 5", body)


def _f7_email5(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Day 21 — Dynamic audit window countdown. LP-WRK-001 §3.1 critical email."""
    from datetime import datetime as _dt
    ed = extra_data or {}
    authority_grant_date = ed.get("authority_grant_date", "")
    days_remaining = None
    window_context = ""
    if authority_grant_date:
        try:
            grant = _dt.strptime(authority_grant_date[:10], "%Y-%m-%d")
            window_end = grant + timedelta(days=548)  # 18 months
            days_remaining = max(0, (window_end - _dt.now()).days)
        except ValueError:
            pass

    if days_remaining is not None:
        subject = f"You have {days_remaining} days left in your audit window"
        preview = f"{days_remaining} days. That is the actual number."
        window_context = (
            f"<div style='background:rgba(200,169,110,0.08);border-left:3px solid {GOLD};padding:16px 20px;margin:0 0 20px;'>"
            f"<p style='font-family:{MONO};font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:{GOLD};margin:0 0 8px;'>AUDIT WINDOW STATUS</p>"
            f"<p style='font-size:22px;font-weight:700;color:#ffffff;margin:0 0 4px;'>{days_remaining} days remaining</p>"
            f"<p style='font-size:13px;color:rgba(255,255,255,0.55);margin:0;'>Based on authority grant date: {authority_grant_date}</p>"
            f"</div>"
        )
    else:
        subject = "Your audit window is open. Here is what that means."
        preview = "This is not manufactured urgency. This is how the FMCSA new entrant program works."
        days_remaining = "an unknown number of"
        window_context = ""

    body = (
        _para(f"Hi {first_name},")
        + window_context
        + _para("The 18-month new entrant safety audit window is not a formality. FMCSA has a statutory obligation to conduct new entrant audits. Carriers inside the window are scheduled based on available investigator capacity — not on whether you asked for one.")
        + _para("This email is not manufactured urgency. This is how the FMCSA new entrant program works.")
        + _para("Here is what matters in the time remaining:")
        + _bullet([
            "Driver qualification files must be complete for every active driver — not in progress, complete.",
            "Your drug and alcohol program must be documented and administered — not just enrollment, the full program.",
            "Hours of service records must be current and accessible — log books or ELD exports, organized by driver and date.",
            "Vehicle maintenance logs must be tied to a written inspection schedule — not just maintenance records, a documented system.",
        ])
        + _para("These are not suggestions. These are the four categories FMCSA is trained to check in every new entrant audit.")
        + _para("If any one of these is incomplete when the investigator arrives, the audit result reflects it.")
        + _cta("Check Your Audit Window Status", f"{FRONTEND}/reach-diagnostic")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-07-05 | TRACK A — NURTURE NEAR | EMAIL 5 OF 5 (DAY 21 COUNTDOWN)", body)


FLOW7_STEPS = [
    (0,    _f7_email1),   # Day 0  — immediate
    (72,   _f7_email2),   # Day 3
    (168,  _f7_email3),   # Day 7
    (336,  _f7_email4),   # Day 14
    (504,  _f7_email5),   # Day 21 — countdown email
]


# ── FLOW 8 — Track B: NURTURE-FAR (Score 20–39, 12-Week / 90-Day Cycle) ───────
# LP-WRK-001 §3.2 — Month 1 (Foundation), Month 2 (Consequence), Month 3 (Positioning)

def _f8_email1(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 1 — Before you haul your first load. The compliance system Day 1 requires."""
    subject = "Before you haul your first load"
    preview = "The compliance system FMCSA expects on Day 1 of authority."
    body = (
        _para(f"Hi {first_name},")
        + _para("There is a compliance system FMCSA expects to exist on the day your first load moves. Most carriers discover this only when the audit arrives.")
        + _para("Day 1 of operating authority is not the start of a ramp-up period. It is the start of a compliance clock.")
        + _para("By the time freight is moving, these five systems must be in place:")
        + _bullet([
            "Driver qualification file — complete for every CDL driver before first dispatch",
            "Drug and alcohol program — consortium enrolled, policy written, pre-employment test documented",
            "Hours of service — ELD confirmed on FMCSA approved device list, records policy written",
            "Vehicle maintenance — unit files for every piece of equipment, inspection schedule on file",
            "Accident register — initialized before the first mile, not after the first incident",
        ])
        + _para("These are not bureaucratic checkboxes. They are the five areas FMCSA's investigators are trained to review in every new entrant audit.")
        + _para("Most carriers do not fail audits because they were operating dangerously. They fail because they were operating without documentation.")
        + _cta("Read the New Entrant Guide", f"{FRONTEND}/ground-0-briefing")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-01 | TRACK B — NURTURE FAR | MONTH 1 / WEEK 1", body)


def _f8_email2(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 2 — The MC number is just the beginning."""
    subject = "The MC number is just the beginning"
    preview = "What authority actually means — the 7 systems that must be in place."
    body = (
        _para(f"Hi {first_name},")
        + _para("An active MC number is not operating authority. It is the beginning of operating authority.")
        + _para("Before a carrier can legally and safely dispatch their first load, seven systems must be operational:")
        + _bullet([
            "Active operating authority — MC number confirmed active in FMCSA SAFER system",
            "Insurance filed and verified — BMC-91 on file, current limits, SAFER reflects active coverage",
            "UCR registration — current year, filed before operations begin",
            "BOC-3 process agent designation — agent assigned in all states of operation",
            "Driver qualification program — complete DQ file for every CDL driver",
            "Drug and alcohol program — consortium enrollment, DER designation, pre-employment testing",
            "ELD compliance — approved device, operating, records accessible",
        ])
        + _para("Each of these has a specific federal requirement behind it. Missing one does not make the operation illegal in the casual sense. It makes the carrier out of compliance in the regulatory sense — which has consequences when FMCSA looks.")
        + _para("The audit window does not start when you feel ready. It starts when the MC number is activated.")
        + _cta("Download the Authority Checklist", f"{FRONTEND}/knowledge-center/authority-registrations-brief")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-02 | TRACK B — NURTURE FAR | MONTH 1 / WEEK 2", body)


def _f8_email3(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 3 — Why most new carriers fail their first audit."""
    subject = "Why most new carriers fail their first audit"
    preview = "Not negligence. Pattern. The same three failures, the same order."
    body = (
        _para(f"Hi {first_name},")
        + _para("New entrant audit failures are not random. They follow a pattern.")
        + _para("The three most common findings, in order of frequency:")
        + _bullet([
            "Incomplete driver qualification files — a file exists but is missing required elements. FMCSA does not grade on partial credit. An incomplete file is treated the same as no file.",
            "Drug and alcohol program not properly administered — the carrier enrolled in a consortium but never created a written policy, designated a DER, or documented the supervisor training requirement.",
            "No HOS record-keeping system in the first 60–90 days — carriers assume ELD compliance handles this. It does not. The underlying record-keeping policy must exist and be demonstrated.",
        ])
        + _para("In each case, the carrier was not negligent. They were incomplete.")
        + _para("The distinction matters because incomplete is fixable. The window to fix it is before the audit — not during it.")
        + _cta("See the 16 Exposure Patterns", f"{FRONTEND}/standards/16-deadly-sins")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-03 | TRACK B — NURTURE FAR | MONTH 1 / WEEK 3", body)


def _f8_email4(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 4 — Your first 90 days on authority. FMCSA timeline."""
    subject = "Your first 90 days on authority"
    preview = "The timeline of what FMCSA expects — from grant date through new entrant audit."
    body = (
        _para(f"Hi {first_name},")
        + _para("The first 90 days after receiving operating authority are the most consequential compliance period a new carrier goes through.")
        + _para("Here is what that timeline actually looks like from FMCSA's perspective:")
        + _bullet([
            "Day 1 — All seven compliance systems must be active before the first dispatch.",
            "Day 1–30 — First compliance test: is everything documented that should be from day one?",
            "Day 30–60 — Second test: are the systems running, not just installed? HOS records, maintenance logs, D&A program records.",
            "Day 60–90 — Third test: are the records organized and accessible? Not scattered across email and folders — filed and retrievable.",
            "Month 6–18 — New entrant audit window. FMCSA will schedule within this range.",
        ])
        + _para("Most carriers treat the first 90 days as setup time. FMCSA treats it as the period when documentation should have been running.")
        + _para("The carriers who pass audits cleanly are the ones who treated Day 1 as the start of a compliance system — not the start of a grace period.")
        + _cta("View the 90-Day Compliance Roadmap", f"{FRONTEND}/knowledge-center/first-90-days-trucking-authority-compliance")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-04 | TRACK B — NURTURE FAR | MONTH 1 / WEEK 4", body)


def _f8_email5(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 5 (Month 2) — What an out-of-service order actually costs."""
    subject = "What an out-of-service order actually costs"
    preview = "The revenue loss, the insurance impact, the authority revocation risk."
    body = (
        _para(f"Hi {first_name},")
        + _para("An out-of-service order does not just stop a truck. It creates a financial cascade that most new carriers are not positioned to absorb.")
        + _para("Here is what the cost structure looks like:")
        + _bullet([
            "Immediate revenue loss — the load does not move. The shipper has to find another carrier. The relationship is damaged.",
            "Driver downtime — the driver sits until the OOS violation is corrected and a reinspection is cleared.",
            "Insurance repricing — an OOS violation goes on the carrier's safety history. At renewal, underwriters look at that record. Premiums adjust accordingly.",
            "Authority risk — a pattern of OOS violations, particularly in driver or vehicle categories, triggers FMCSA intervention. Compliance reviews. Targeted audits. Safety ratings.",
            "Recovery cost — fixing the underlying gap after OOS costs more than building it correctly before dispatch.",
        ])
        + _para("Most OOS violations that hit new carriers are preventable. They are not caused by dangerous driving. They are caused by documentation gaps that should have been closed before the first load moved.")
        + _para("The carriers who avoid this pattern are not lucky. They built the compliance system before pressure found the gap.")
        + _cta("Read the Audit Cost Analysis", f"{FRONTEND}/knowledge-center/fmcsa-new-entrant-safety-audit")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-05 | TRACK B — NURTURE FAR | MONTH 2 / WEEK 5", body)


def _f8_email6(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 6 (Month 2) — The DQ file most carriers don't have."""
    subject = "The DQ file most carriers don't have"
    preview = "Driver qualification file requirements — what is missing in most new carrier files."
    body = (
        _para(f"Hi {first_name},")
        + _para("Most new carriers know that drivers need a drug test before dispatch.")
        + _para("Most new carriers stop there.")
        + _para("A compliant driver qualification file requires seven elements — in place, in order, before the driver operates:")
        + _bullet([
            "Application for employment — the actual FMCSA-compliant form, signed by the driver",
            "Motor vehicle record — obtained within 30 days of hire, from every state licensed in during the past 3 years",
            "Medical examiner's certificate — current, from a FMCSA-registered medical examiner",
            "Road test or equivalent — documented certificate of driving ability before first dispatch",
            "Employment history verification — 3 years back, written response or good faith effort documented",
            "Pre-employment drug test result — MRO-verified negative, on file before first dispatch",
            "Annual review record — MVR and safety performance review for every year of employment",
        ])
        + _para("A partial file is not a work in progress from FMCSA's perspective. It is an incomplete file. An incomplete file at audit generates findings.")
        + _para("The DQ File Builder Kit installs the complete file correctly — construction sequence, required forms, and the retention schedule that keeps it compliant going forward.")
        + _cta("Install the DQ File Builder Kit", f"{FRONTEND}/compliance-library")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-06 | TRACK B — NURTURE FAR | MONTH 2 / WEEK 6", body)


def _f8_email7(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 7 (Month 2) — Drug and alcohol: the program FMCSA expects."""
    subject = "Drug and alcohol: the program FMCSA expects"
    preview = "Part 382 requirements — what a compliant program actually looks like."
    body = (
        _para(f"Hi {first_name},")
        + _para("Federal Motor Carrier Safety Regulations Part 382 requires every carrier with CDL drivers to have a fully administered drug and alcohol testing program in place before the first dispatch.")
        + _para("A compliant program is not a drug test. It is six components:")
        + _bullet([
            "Written drug and alcohol testing policy — signed by employer, provided to all drivers",
            "Consortium or third-party administrator enrollment — documented before first dispatch",
            "Pre-employment drug test — negative result, MRO-verified, on file before the driver operates",
            "Designated Employer Representative (DER) — named in the policy and responsible for program administration",
            "FMCSA Drug and Alcohol Clearinghouse registration — required for every employer of CDL drivers",
            "Random testing program — enrolled, pool established, random rate compliant with current FMCSA requirements",
        ])
        + _para("When an FMCSA investigator audits the drug and alcohol program, they check each of these components independently. A carrier can have five of six in place and still receive findings on the one that is missing.")
        + _para("The Drug and Alcohol Compliance Packet walks through every component in the order FMCSA checks them — with the forms and documentation templates to complete each one.")
        + _cta("Get the D&A Compliance Packet", f"{FRONTEND}/compliance-library")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-07 | TRACK B — NURTURE FAR | MONTH 2 / WEEK 7", body)


def _f8_email8(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 8 (Month 2) — The maintenance record that protected this carrier."""
    subject = "The maintenance record that protected this carrier"
    preview = "What proper Part 396 documentation looks like in an audit."
    body = (
        _para(f"Hi {first_name},")
        + _para("A carrier eight months into his authority received notice of a new entrant safety audit. When the investigator arrived, one category he was not worried about was maintenance.")
        + _para("His trucks ran well. Regular oil changes. No breakdowns in the first year. He kept receipts.")
        + _para("The investigator found three findings in his maintenance records.")
        + _bullet([
            "No written inspection schedule on file — he had maintenance receipts but no documented schedule showing what was inspected, at what intervals, and by whom.",
            "Pre-trip inspections not recorded — drivers were doing them, but no records existed. If it is not documented, it does not exist.",
            "No systematic defect report system — drivers verbally reported issues. No written defect report, no correction-made notation, no sign-off process.",
        ])
        + _para("His trucks were in good condition. His records were not.")
        + _para("Part 396 does not require a perfect maintenance operation. It requires a documented one. A written inspection schedule, driver vehicle inspection reports, and a defect/correction record that connects the inspection to the repair.")
        + _para("The Maintenance Documentation Packet builds this system correctly — from the inspection schedule to the DVIR form to the records retention process.")
        + _cta("View the Maintenance Packet", f"{FRONTEND}/compliance-library")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-08 | TRACK B — NURTURE FAR | MONTH 2 / WEEK 8", body)


def _f8_email9(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 9 (Month 3) — The difference between surviving an audit and not. Routes to Ground 0."""
    subject = "The difference between a carrier who survives an audit and one who doesn't"
    preview = "It is not talent. It is not luck. It is documented infrastructure built before the window opened."
    body = (
        _para(f"Hi {first_name},")
        + _para("After working with new carriers through the audit window, the difference between the ones who pass cleanly and the ones who receive findings is consistent.")
        + _para("It is not the quality of their operation. It is not their experience. It is not the size of their fleet.")
        + _para("It is whether they built the documentation infrastructure before the window opened — or scrambled to assemble it after the investigator called.")
        + _para("Carriers who pass cleanly share three things:")
        + _bullet([
            "They built the compliance system before the first dispatch, not concurrently with operations.",
            "Their records are organized and accessible — not scattered across email and folders.",
            "They know exactly what is in their files and what is not. There are no gaps they are hoping the investigator does not notice.",
        ])
        + _para("Carriers who receive findings share three things:")
        + _bullet([
            "They treated the first year as a learning period rather than an installation period.",
            "They assembled records reactively — built when asked, not maintained as a system.",
            "They had documentation in progress rather than documentation in place.",
        ])
        + _para("If you are still building, the window is still open. The question is whether you close the gaps before or after the investigator arrives.")
        + _cta("See the Ground 0 Briefing", f"{FRONTEND}/ground-0-briefing")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-08-09 | TRACK B — NURTURE FAR | MONTH 3 / WEEK 9", body)


def _f8_email10(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 10 (Month 3) — First direct cohort mention. LP-COH description, not a pitch."""
    subject = "LP-COH-002 is filling — here is what it includes"
    preview = "Not a pitch. A description of what the program delivers."
    body = (
        _para(f"Hi {first_name},")
        + _para("The LaunchPath Standard cohort is a 90-day guided installation of the compliance operating system that FMCSA expects to find when they audit a new carrier.")
        + _para("Here is what it includes — not what it promises, what it delivers:")
        + _bullet([
            "Five Station Custodian checkpoints — your compliance files are reviewed at Days 14, 30, 45, 60, and 90. Not scored. Reviewed. If something is built incorrectly, it is flagged and corrected before the next module.",
            "Module sequence — Authority Protection, Driver Qualification, Drug and Alcohol, Hours of Service, Vehicle Maintenance, and the final Integrity Audit Simulation.",
            "Document Vault — organized filing infrastructure that makes the audit binder a natural output of the installation, not a last-minute assembly.",
            "LP-VRF Credential — issued at program completion. Verified carrier registry entry showing FMCSA auditors and brokers that the compliance system was independently reviewed.",
        ])
        + _para("The cohort is 12 carriers. The cap is not a sales tactic — it exists because the verification layer requires it. Checkpoint reviews are real reviews, not spot checks.")
        + _para("If the timing is right, the Ground 0 Briefing is the first step — a direct assessment of your current position and what closing the gap requires.")
        + _cta("Request the Ground 0 Briefing", f"{FRONTEND}/admission")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-08-10 | TRACK B — NURTURE FAR | MONTH 3 / WEEK 10", body)


def _f8_email11(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 11 (Month 3) — Prompt to retake REACH. Progress check framing."""
    subject = "Your REACH score, 90 days later"
    preview = "If your position has changed, the score will show it."
    body = (
        _para(f"Hi {first_name},")
        + _para("Ninety days ago, your REACH score placed you in the NURTURE-FAR range. That score was a snapshot of your position at that moment.")
        + _para("Positions change.")
        + _bullet([
            "Authority granted — changes your authority status score",
            "Equipment acquired — changes your fleet profile score",
            "File state improved — the highest-weight dimension in the ICP scoring model",
            "Decision authority clarified — sole owner vs. fleet manager changes routing",
        ])
        + _para("Retaking REACH is not a sales funnel. It is a measurement. If your position has improved, the score will reflect it. If your score reaches 60 or above, the Ground 0 Briefing pathway opens automatically.")
        + _para("If your situation has not changed, the score will confirm that too. Either result is useful information.")
        + _cta("Retake the REACH Diagnostic", f"{FRONTEND}/reach-diagnostic")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-08-11 | TRACK B — NURTURE FAR | MONTH 3 / WEEK 11", body)


FLOW8_STEPS = [
    (0,    _f8_email1),   # Week 1  — Day 0
    (168,  _f8_email2),   # Week 2  — Day 7
    (336,  _f8_email3),   # Week 3  — Day 14
    (504,  _f8_email4),   # Week 4  — Day 21
    (672,  _f8_email5),   # Week 5  — Day 28
    (840,  _f8_email6),   # Week 6  — Day 35
    (1008, _f8_email7),   # Week 7  — Day 42
    (1176, _f8_email8),   # Week 8  — Day 49
    (1344, _f8_email9),   # Week 9  — Day 56
    (1512, _f8_email10),  # Week 10 — Day 63
    (1680, _f8_email11),  # Week 11 — Day 70
]


# ── FLOW 9 — Post-Credential Alumni Sequence ───────────────────────────────────
# LP-WRK-001 §5 — Tag: LP-VRF-ISSUED. 4 emails: Week 1, Month 1, Month 3, Month 6.

def _f9_email1(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Week 1 post-VRF — How to use the LP-VRF credential."""
    ed = extra_data or {}
    registry_id = ed.get("registry_id", "LP-VRF-XXXXXXXX")
    subject = "Your LP-VRF credential is live — here is how to use it"
    preview = "The credential signals something specific to brokers and shippers."
    body = (
        _para(f"Hi {first_name},")
        + _para(f"Your LP-VRF credential is now active: <strong style='color:{GOLD};font-family:{MONO};'>{registry_id}</strong>")
        + _para("Here is what it represents and how to use it:")
        + _bullet([
            "It signals that your compliance system was independently reviewed at five checkpoints — not self-reported, reviewed.",
            "Brokers who ask for it can verify it through the LaunchPath Verified Registry. Your carrier name and verification date are on record.",
            "You can display it on your carrier packet, your rate confirmation signature, and your broker outreach — it is a differentiator in markets where most carriers are unverified.",
        ])
        + _para("You completed the 90-day installation. What happens next is maintenance — not rebuilding.")
        + _para("The compliance systems you built during the program require monthly attention, not monthly reconstruction. Your 6-month compliance calendar covers what that looks like in practice.")
        + _para("Over the coming months you will receive a small number of emails covering ongoing compliance maintenance, what changes in year two of authority, and how to introduce LaunchPath to other carriers who need what you built.")
        + _cta("View Your Verified Registry Listing", f"{FRONTEND}/portal")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-09-01 | ALUMNI | LP-VRF-ISSUED | EMAIL 1 OF 4", body)


def _f9_email2(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Month 1 post-VRF — 6-month compliance calendar."""
    subject = "Your 6-month compliance calendar"
    preview = "The recurring tasks that maintain what the cohort built."
    body = (
        _para(f"Hi {first_name},")
        + _para("The 90-day installation is complete. What follows is maintenance.")
        + _para("The compliance system you built during the cohort does not run itself. It requires recurring attention on a specific schedule. Here is what that looks like:")
        + _bullet([
            "Monthly — Audit Readiness Check via the Control Room. Run the 5-domain review. Flag anything that has shifted. Update records if needed.",
            "Quarterly — MVR pulls for every active driver. Confirm the medical examiner certificates are current. Update the annual review cycle.",
            "Biannually — Review your drug and alcohol program with your consortium. Confirm random testing rate is current. Confirm DER designation is still accurate.",
            "Annually — Full DQ file review for every driver. Written annual review, signature on file. Insurance renewal check — confirm FMCSA filings match current coverage.",
            "As-needed — Accident register update within 24 hours of any DOT-recordable incident. SAFER portal check after any address, contact, or insurance change.",
        ])
        + _para("None of these tasks are complicated when the system is already built. They are maintenance, not reconstruction.")
        + _para("The carriers who maintain authority are not working harder than the ones who lose it. They are working on schedule.")
        + _cta("Run Your Monthly Audit Check", f"{FRONTEND}/portal")
        + _sig()
    )
    return subject, preview, _wrap("LP-SEQ-09-02 | ALUMNI | LP-VRF-ISSUED | EMAIL 2 OF 4", body)


def _f9_email3(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Month 3 post-VRF — Referral ask. Professional framing."""
    subject = "LP-COH-003 is forming — know a carrier who needs this?"
    preview = "Owner-operators talk to other owner-operators. That is how this program grows."
    body = (
        _para(f"Hi {first_name},")
        + _para("LP-COH-003 is forming. The cohort opens when seats are filled — 12 carriers, same structure you went through.")
        + _para("If you know a carrier in their new entrant window who is still assembling compliance documentation reactively, they are a fit for this.")
        + _para("Not every carrier is. The program requires:")
        + _bullet([
            "Active operating authority or authority pending within 60 days",
            "Owner-operator or decision-maker — someone who can move on compliance without procurement committee approval",
            "Willingness to work through the sequence in 90 days, not 9 months",
        ])
        + _para("If someone comes to mind, the simplest way to introduce them is to point them at the Ground 0 Briefing page. They take the REACH assessment. The ICP score determines whether the timing is right.")
        + _para("This is not an affiliate program. There is no commission structure. Owner-operators talk to other owner-operators. That is how carriers who need this find it.")
        + _cta("Share the Ground 0 Briefing", f"{FRONTEND}/ground-0-briefing")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-09-03 | ALUMNI | LP-VRF-ISSUED | EMAIL 3 OF 4", body)


def _f9_email4(first_name: str, extra_data: dict = None) -> tuple[str, str, str]:
    """Month 6 post-VRF — Annual compliance review. What changes in year two."""
    subject = "Your annual compliance review — what changes in year two"
    preview = "The new entrant audit window has closed. What FMCSA expects from year two is different."
    body = (
        _para(f"Hi {first_name},")
        + _para("You are past the new entrant audit window. That clock closed, and you maintained authority through it.")
        + _para("Year two of authority is different in several ways worth knowing:")
        + _bullet([
            "The new entrant safety audit program no longer applies — you are no longer in the 18-month window. You are now subject to FMCSA's ongoing compliance review program for established carriers.",
            "Safety rating reviews are triggered by crash involvement, inspection violations, or complaint activity — not by the clock. Clean operations with good records are rarely targeted.",
            "Compliance reviews for established carriers focus more heavily on operational consistency — are you maintaining the same standard you demonstrated in year one?",
            "Insurance renewal — underwriters will review your safety history from your first 18 months. A clean record is an asset. Carriers with OOS violations or audit findings will see it priced.",
        ])
        + _para("The system you built during the cohort is designed to run as a maintenance operation from this point forward. The structure is in place. The work is staying on schedule.")
        + _para("If your operation has grown — additional drivers, additional units, additional lanes — the compliance requirements scale with it. DQ files for every new driver. Insurance coverage for every new unit. The same standard, applied to the expanded operation.")
        + _cta("Review Your Portal and Control Room", f"{FRONTEND}/portal")
        + _sig(full=True)
    )
    return subject, preview, _wrap("LP-SEQ-09-04 | ALUMNI | LP-VRF-ISSUED | EMAIL 4 OF 4", body)


FLOW9_STEPS = [
    (168,  _f9_email1),   # Week 1  — 7 days post-VRF
    (720,  _f9_email2),   # Month 1 — 30 days
    (2160, _f9_email3),   # Month 3 — 90 days
    (4320, _f9_email4),   # Month 6 — 180 days
]


# ── Enrollment ─────────────────────────────────────────────────────────────────

async def _enroll(email: str, first_name: str, sequence_type: str, steps: list, extra_data: dict = None):
    """Create or refresh a sequence record in db.email_sequences."""
    now = datetime.now(timezone.utc)
    emails = [
        {
            "step": i + 1,
            "send_at": (now + timedelta(hours=delay_hours)).isoformat(),
            "sent": False,
            "sent_at": None,
            "subject": builder(first_name)[0],
        }
        for i, (delay_hours, builder) in enumerate(steps)
    ]
    update_doc = {
        "email": email,
        "first_name": first_name,
        "sequence_type": sequence_type,
        "enrolled_at": now.isoformat(),
        "emails": emails,
        "completed": False,
    }
    if extra_data:
        update_doc["extra_data"] = extra_data
    await db.email_sequences.update_one(
        {"email": email, "sequence_type": sequence_type},
        {"$setOnInsert": update_doc},
        upsert=True,
    )
    logger.info(f"Enrolled {email} in {sequence_type} ({len(steps)} steps)")


async def enroll_reach_correction_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "reach_correction", FLOW4_STEPS)


async def enroll_sins_nurture_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "sins_nurture", FLOW5_STEPS)


async def enroll_pre_op_checklist_sequence(email: str, first_name: str):
    await _enroll(email, first_name, "pre_op_checklist", FLOW6_STEPS)


async def enroll_nurture_near_sequence(email: str, first_name: str, icp_score: int = 0, icp_dimensions: dict = None, authority_grant_date: str = ""):
    """LP-WRK-001 §3.1 — Track A (NURTURE-NEAR, score 40–59, 30-day cycle)."""
    extra = {"icp_score": icp_score, "icp_dimensions": icp_dimensions or {}, "authority_grant_date": authority_grant_date}
    await _enroll(email, first_name, "nurture_near", FLOW7_STEPS, extra_data=extra)


async def enroll_nurture_far_sequence(email: str, first_name: str):
    """LP-WRK-001 §3.2 — Track B (NURTURE-FAR, score 20–39, 12-week / 90-day cycle)."""
    await _enroll(email, first_name, "nurture_far", FLOW8_STEPS)


async def enroll_alumni_sequence(email: str, first_name: str, registry_id: str = ""):
    """LP-WRK-001 §5 — Post-credential alumni sequence (tag: LP-VRF-ISSUED)."""
    extra = {"registry_id": registry_id}
    await _enroll(email, first_name, "alumni", FLOW9_STEPS, extra_data=extra)


# ── Processor ─────────────────────────────────────────────────────────────────

BUILDERS = {
    "reach_correction": FLOW4_STEPS,
    "sins_nurture":     FLOW5_STEPS,
    "pre_op_checklist": FLOW6_STEPS,
    "nurture_near":     FLOW7_STEPS,
    "nurture_far":      FLOW8_STEPS,
    "alumni":           FLOW9_STEPS,
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
        extra    = seq.get("extra_data") or {}
        updated  = False

        for i, (_, builder) in enumerate(steps):
            step_rec = seq["emails"][i] if i < len(seq["emails"]) else None
            if not step_rec or step_rec.get("sent"):
                continue
            send_at_str = step_rec.get("send_at", "")
            send_at = datetime.fromisoformat(send_at_str.replace("Z", "+00:00"))
            if send_at.tzinfo is None:
                send_at = send_at.replace(tzinfo=timezone.utc)
            if now < send_at:
                continue
            try:
                # New-style builders accept extra_data; existing builders do not
                try:
                    subject, _preview, html = builder(fname, extra_data=extra)
                except TypeError:
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
        if updated or all_done:
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
    completed_c  = sum(1 for d in docs if d.get("completed"))
    def _count(t): return sum(1 for d in docs if d.get("sequence_type") == t)
    return {
        "sequences": docs,
        "stats": {
            "total": total, "active": active, "completed": completed_c,
            "reach_correction": _count("reach_correction"),
            "sins_nurture":     _count("sins_nurture"),
            "pre_op_checklist": _count("pre_op_checklist"),
            "nurture_near":     _count("nurture_near"),
            "nurture_far":      _count("nurture_far"),
            "alumni":           _count("alumni"),
        },
    }



# ── CRM State Machine — LP-WRK-001 §6 ─────────────────────────────────────────

# Complete state taxonomy from LP-WRK-001 Section 6
CRM_STATES = {
    "REACH-SUBMITTED", "ICP-SCORED", "GROUND-0-PENDING", "GROUND-0-SCHEDULED",
    "GROUND-0-DEFERRED", "GROUND-0-DEFERRED-LONG", "NOT-ADMITTED-MISMATCH",
    "NOT-ADMITTED-TIMING", "COHORT-ENROLLED", "COHORT-ACTIVE", "COHORT-AT-RISK",
    "COHORT-PAUSED", "COHORT-COMPLETE", "LP-VRF-ISSUED",
    "NURTURE-NEAR", "NURTURE-FAR", "DIY-CUSTOMER",
}


async def _update_crm_state(email: str, new_state: str):
    """
    LP-WRK-001 §6 CRM State Machine.
    Updates the subscriber's crm_state in MailerLite (best-effort) and stores
    the latest state in the local crm_states collection for audit trail.
    """
    if new_state not in CRM_STATES:
        logger.warning(f"_update_crm_state: unknown state '{new_state}' for {email}")
        return

    now = datetime.now(timezone.utc).isoformat()
    # Persist state transition locally
    await db.crm_states.update_one(
        {"email": email},
        {"$set": {"email": email, "current_state": new_state, "updated_at": now},
         "$push": {"history": {"state": new_state, "at": now}}},
        upsert=True,
    )
    logger.info(f"CRM state: {email} → {new_state}")

    # Update MailerLite subscriber fields
    if not MAILERLITE_API_KEY:
        return
    try:
        import httpx
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.put(
                "https://connect.mailerlite.com/api/subscribers/" + email,
                headers={"Authorization": f"Bearer {MAILERLITE_API_KEY}", "Content-Type": "application/json"},
                json={"fields": {"crm_state": new_state, "crm_state_updated": now}},
            )
            if resp.status_code not in (200, 201):
                logger.warning(f"MailerLite CRM update failed for {email}: {resp.status_code}")
    except Exception as exc:
        logger.warning(f"MailerLite CRM update error for {email}: {exc}")


# ── Dropout Recovery Emails — LP-WRK-001 §4.6 ────────────────────────────────

async def send_dropout_recovery_day3(email: str, first_name: str, checkpoint_label: str, checkpoint_code: str):
    """Day +3 after missed deadline. MailerSend transactional. Includes gap prompt."""
    GOLD_C = "#C8A96E"
    subject = f"Checkpoint {checkpoint_code} — deadline passed. Here is the next step."
    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
<tr><td align="center" style="padding:40px 16px;">
<table width="100%" style="max-width:600px;background:#001B36;border-top:3px solid {GOLD_C};">
<tr><td style="padding:40px 40px 0;">
<p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(200,169,110,0.55);margin:0 0 28px;">LP-RECOVERY | {checkpoint_code}</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Hi {first_name},</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">The deadline for <strong style="color:{GOLD_C};">{checkpoint_label}</strong> has passed.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">This is a reminder, not a penalty. The cure period is still open.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">To clear this checkpoint, review the admin notes in your portal and submit the missing documentation before the cure period closes.</p>
<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:{GOLD_C};">
<a href="{FRONTEND}/portal" style="display:inline-block;background:{GOLD_C};color:#001B36;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">REVIEW PORTAL AND SUBMIT &#8594;</a>
</td></tr></table>
<p style="font-size:14px;color:rgba(255,255,255,0.48);margin:16px 0 0;">— Vince</p>
</td></tr>
<tr><td style="padding:28px 40px 40px;"><div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
<p style="font-size:9px;color:rgba(255,255,255,0.48);margin:0;letter-spacing:0.10em;">LaunchPath Transportation EDU &nbsp;|&nbsp; launchpathedu.com</p>
</td></tr></table></td></tr></table></body></html>"""
    await send_mailersend_email(email, first_name, subject, html)
    logger.info(f"Dropout Day+3 email sent to {email} for {checkpoint_code}")


async def send_dropout_recovery_day7(email: str, first_name: str, checkpoint_label: str, checkpoint_code: str):
    """Day +7 — Final cure period notice. MailerSend transactional."""
    GOLD_C = "#C8A96E"
    subject = f"Final notice — {checkpoint_code} cure period closes in 7 days"
    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
<tr><td align="center" style="padding:40px 16px;">
<table width="100%" style="max-width:600px;background:#001B36;border-top:3px solid #cc3333;">
<tr><td style="padding:40px 40px 0;">
<p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(204,51,51,0.75);margin:0 0 28px;">LP-RECOVERY FINAL NOTICE | {checkpoint_code}</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Hi {first_name},</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">This is the final notice for <strong style="color:{GOLD_C};">{checkpoint_label}</strong>.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">If missing documentation is not submitted within 7 days, your cohort seat status will be reviewed and may be moved to PAUSED.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">This is not a punishment. It is the consequence of the 90-day installation timeline. The program is built around a fixed calendar because the compliance window does not pause.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">If you have a specific gap preventing completion, reply to this email directly. We will work through it.</p>
<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:{GOLD_C};">
<a href="{FRONTEND}/portal" style="display:inline-block;background:{GOLD_C};color:#001B36;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">ACCESS PORTAL AND SUBMIT &#8594;</a>
</td></tr></table>
<p style="font-size:14px;color:rgba(255,255,255,0.48);margin:16px 0 0;">— Vince Lawrence, Station Custodian</p>
</td></tr>
<tr><td style="padding:28px 40px 40px;"><div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
<p style="font-size:9px;color:rgba(255,255,255,0.48);margin:0;letter-spacing:0.10em;">LaunchPath Transportation EDU &nbsp;|&nbsp; launchpathedu.com</p>
</td></tr></table></td></tr></table></body></html>"""
    await send_mailersend_email(email, first_name, subject, html)
    logger.info(f"Dropout Day+7 final notice sent to {email} for {checkpoint_code}")


async def send_deferred_enrollment_offer(email: str, first_name: str):
    """Day +44 — Seat released. Offer deferred enrollment in next cohort cycle."""
    GOLD_C = "#C8A96E"
    subject = "Your cohort seat has been released — deferred enrollment option available"
    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
<tr><td align="center" style="padding:40px 16px;">
<table width="100%" style="max-width:600px;background:#001B36;border-top:3px solid {GOLD_C};">
<tr><td style="padding:40px 40px 0;">
<p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(200,169,110,0.55);margin:0 0 28px;">LP-DEFERRED ENROLLMENT OFFER</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Hi {first_name},</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Your current cohort seat has been released after the extended hold period.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">This is not a removal. This is a reset.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">You are being offered deferred enrollment in the next cohort cycle — a one-time option to pick up where the program requires. No repricing. Same Standard. A fresh calendar start.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">To accept deferred enrollment, reply to this email directly. Vince will review your current compliance position before the next cohort seats are assigned.</p>
<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:{GOLD_C};">
<a href="mailto:vince@launchpathedu.com?subject=Deferred Enrollment Request" style="display:inline-block;background:{GOLD_C};color:#001B36;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">REQUEST DEFERRED ENROLLMENT &#8594;</a>
</td></tr></table>
<p style="font-size:14px;color:rgba(255,255,255,0.48);margin:16px 0 0;">— Vince Lawrence<br><span style="font-size:13px;color:rgba(255,255,255,0.30);">Founder, LaunchPath Transportation EDU</span></p>
</td></tr>
<tr><td style="padding:28px 40px 40px;"><div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
<p style="font-size:9px;color:rgba(255,255,255,0.48);margin:0;letter-spacing:0.10em;">LaunchPath Transportation EDU &nbsp;|&nbsp; launchpathedu.com</p>
</td></tr></table></td></tr></table></body></html>"""
    await send_mailersend_email(email, first_name, subject, html)
    logger.info(f"Deferred enrollment offer sent to {email}")


# ── 180-day Re-evaluation Trigger — LP-WRK-001 §1.4 ──────────────────────────

async def send_180day_reevaluation_email(email: str, first_name: str, original_score: int = 0):
    """Auto re-score trigger for NOT-ADMITTED-TIMING leads at 180 days."""
    GOLD_C = "#C8A96E"
    subject = "180 days since your REACH result — is your position different now?"
    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0f1a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
<tr><td align="center" style="padding:40px 16px;">
<table width="100%" style="max-width:600px;background:#001B36;border-top:3px solid {GOLD_C};">
<tr><td style="padding:40px 40px 0;">
<p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(200,169,110,0.55);margin:0 0 28px;">LP-WRK-001 | 180-DAY RE-EVALUATION</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Hi {first_name},</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">180 days ago, your REACH score placed you outside the Standard enrollment threshold{f" (score: {original_score}/100)" if original_score else ""}.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">Positions change. Authority gets granted. Equipment gets acquired. File state improves.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">The ICP scorecard measures five dimensions of readiness. If any of the following have changed since your last assessment, your score may now reach the threshold:</p>
<ul style="margin:0 0 20px;padding:0 0 0 18px;">
<li style="font-size:14px;color:rgba(255,255,255,0.48);line-height:1.75;margin:0 0 4px;">Authority granted or operational status changed</li>
<li style="font-size:14px;color:rgba(255,255,255,0.48);line-height:1.75;margin:0 0 4px;">Fleet size or equipment acquired</li>
<li style="font-size:14px;color:rgba(255,255,255,0.48);line-height:1.75;margin:0 0 4px;">File state improved — documentation assembled</li>
<li style="font-size:14px;color:rgba(255,255,255,0.48);line-height:1.75;margin:0 0 4px;">Decision authority clarified — now sole decision-maker</li>
</ul>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">If your position has changed, retake the REACH Diagnostic. If your score reaches 60 or above, the Ground 0 Briefing pathway opens.</p>
<p style="font-size:15px;color:rgba(255,255,255,0.82);line-height:1.80;margin:0 0 16px;">If your position has not changed, this email contains no pressure. Return when it does.</p>
<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td style="background:{GOLD_C};">
<a href="{FRONTEND}/reach-diagnostic" style="display:inline-block;background:{GOLD_C};color:#001B36;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">RETAKE THE REACH DIAGNOSTIC &#8594;</a>
</td></tr></table>
<p style="font-size:14px;color:rgba(255,255,255,0.48);margin:16px 0 0;">— Vince Lawrence<br><span style="font-size:13px;color:rgba(255,255,255,0.30);">Founder, LaunchPath Transportation EDU</span></p>
</td></tr>
<tr><td style="padding:28px 40px 40px;"><div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 24px;"></div>
<p style="font-size:9px;color:rgba(255,255,255,0.48);margin:0;letter-spacing:0.10em;">LaunchPath Transportation EDU &nbsp;|&nbsp; launchpathedu.com</p>
</td></tr></table></td></tr></table></body></html>"""
    await send_mailersend_email(email, first_name, subject, html)
    # Mark re-evaluation as sent so we don't re-trigger every day
    await db.icp_assessments.update_one(
        {"email": email},
        {"$set": {"reevaluation_180d_sent": True, "reevaluation_sent_at": datetime.now(timezone.utc).isoformat()}},
    )
    logger.info(f"180-day re-evaluation email sent to {email}")
