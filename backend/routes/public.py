"""Public-facing routes: contact, reach, admission, ground0, diagnostic, etc."""
import asyncio
import httpx
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr

from core import (
    db, logger,
    MAILERLITE_API_TOKEN, MAILERLITE_URL,
    COACH_EMAIL, FRONTEND_URL,
    send_mailersend_email,
)

router = APIRouter()


# ── Models ────────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    mc: Optional[str] = None
    authorityAge: Optional[str] = None
    inquiryType: Optional[str] = None
    message: Optional[str] = None


class PartnerInquiryForm(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: str
    message: Optional[str] = None


class DiagnosticSubmit(BaseModel):
    email: EmailStr
    score: int
    result: str
    red_count: int
    yellow_count: int


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


class AdmissionSubmit(BaseModel):
    name: str
    email: EmailStr
    usdot_number: str
    cohort_preference: str
    message: Optional[str] = None


class AdmissionRequestNew(BaseModel):
    carrier_name: str
    email: EmailStr
    dot_mc_number: Optional[str] = None
    authority_activation_date: Optional[str] = None
    compliance_status: str
    lane: str
    message: Optional[str] = None


class Ground0Submit(BaseModel):
    email: EmailStr


class GOEmailCapture(BaseModel):
    email: EmailStr
    name: Optional[str] = None


class SinsChecklistCapture(BaseModel):
    email: EmailStr


class CPMEmailCapture(BaseModel):
    email: EmailStr


class ControlRoomCapture(BaseModel):
    email: EmailStr
    tool_name: str
    tool_summary: Optional[str] = None
    score: Optional[int] = None
    failing_domains: Optional[list] = None


class RiskMapCapture(BaseModel):
    first_name: Optional[str] = ""
    email: EmailStr


# ── 7-Day Health Plan Email Builder ───────────────────────────────────────────
_DOMAIN_ACTIONS = {
    "D&A Program": [
        ("Day 1", "Enroll in a DOT-compliant Drug & Alcohol testing consortium. This is federally required before any CDL driver operates under your authority."),
        ("Day 2", "Obtain and execute a written DOT Drug & Alcohol Policy signed by every driver. File originals in your D&A folder."),
        ("Day 3", "Schedule and complete pre-employment drug testing for all current CDL drivers. No driver should operate without a documented negative result."),
    ],
    "Driver Files": [
        ("Day 1", "Open a Driver Qualification File (DQF) for every CDL driver. The folder must exist before the driver turns a wheel under your authority."),
        ("Day 2", "Collect and file: CDL copy, medical examiner's certificate, driver application, and prior employer verification for each driver."),
        ("Day 3", "Order an MVR (Motor Vehicle Record) and PSP report for each driver. File results in the DQF immediately upon receipt."),
    ],
    "Insurance": [
        ("Day 1", "Contact your insurance broker and confirm your MCS-90 endorsement is actively filed with FMCSA. Request written confirmation."),
        ("Day 2", "Verify cargo insurance meets required minimums for your cargo type. Confirm the certificate is on file with FMCSA."),
        ("Day 3", "Pull your FMCSA insurance record at li-public.fmcsa.dot.gov and confirm both policies appear as active."),
    ],
    "Maintenance": [
        ("Day 1", "Create a written Preventive Maintenance Schedule for each vehicle. Minimum: oil change intervals, brake inspections, tire checks, annual inspection date."),
        ("Day 2", "Implement a DVIR (Driver Vehicle Inspection Report) system. Every trip starts and ends with a completed DVIR — no exceptions."),
        ("Day 3", "File your first batch of completed DVIRs. Back-fill any missed reports with a written notation of the gap and a corrective action statement."),
    ],
    "HOS": [
        ("Day 1", "Determine your HOS compliance method: ELD or paper logbooks. Register your ELD with FMCSA if applicable."),
        ("Day 2", "Create and distribute a written Hours of Service policy. Every driver must have a signed copy in their DQF."),
        ("Day 3", "Audit the last 7 days of log records. Flag any gaps or violations and document corrective actions in writing."),
    ],
    "Authority": [
        ("Day 1", "Log into FMCSA SAFER Web and verify your USDOT/MC profile is accurate. Correct any errors immediately via MCS-150 update."),
        ("Day 2", "Verify your BOC-3 process agent filing is active. Contact your process agent for written confirmation of current filing status."),
        ("Day 3", "Confirm your UCR (Unified Carrier Registration) is current for this calendar year. Renew at ucr.gov if expired."),
    ],
}

_GENERAL_DAYS = [
    ("Day 5", "Conduct a full compliance folder audit. Every domain folder should have its required documents. Log any gaps with a remediation date."),
    ("Day 6", "Run a mock self-audit using the FMCSA New Entrant Safety Audit checklist. Score each domain. Any RED domain is a priority before Day 7."),
    ("Day 7", "Document today's compliance status in writing. Date and sign it. This creates a compliance record that shows proactive intent — which matters in an audit."),
]


def _build_health_plan_email(email: str, score: int, failing_domains: list) -> tuple:
    verdict = "GO" if score >= 8 else "CAUTION" if score >= 6 else "NOT READY"
    verdict_color = "#27ae60" if score >= 8 else "#C8933F" if score >= 6 else "#c0392b"

    unique_failing = list(dict.fromkeys(failing_domains)) if failing_domains else []

    # Build day-by-day action items from failing domains
    day_items = []
    seen_days = set()
    for domain in unique_failing:
        if domain in _DOMAIN_ACTIONS:
            for day, action in _DOMAIN_ACTIONS[domain]:
                key = f"{domain}-{day}"
                if key not in seen_days:
                    seen_days.add(key)
                    day_items.append((day, domain, action))

    # Fill remaining days with general items if fewer than 4 domain-specific days
    for day, action in _GENERAL_DAYS:
        if day not in [d for d, _, _ in day_items]:
            day_items.append((day, "General Compliance", action))

    day_rows = ""
    for day_label, domain, action in day_items[:10]:
        day_rows += f"""
        <tr>
          <td style="padding:12px 16px; border-bottom:1px solid #1a2535; width:80px; vertical-align:top;">
            <span style="font-family:'Courier New',monospace; font-size:11px; font-weight:700; color:#C8933F; letter-spacing:0.08em; white-space:nowrap;">{day_label}</span>
          </td>
          <td style="padding:12px 16px; border-bottom:1px solid #1a2535; vertical-align:top;">
            <div style="font-family:'Courier New',monospace; font-size:10px; font-weight:700; color:#C8933F; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">{domain}</div>
            <div style="font-family:Arial,sans-serif; font-size:14px; color:rgba(244,241,235,0.85); line-height:1.6;">{action}</div>
          </td>
        </tr>"""

    failing_list = "".join(
        f'<li style="font-family:Arial,sans-serif; font-size:14px; color:#e74c3c; margin-bottom:4px;">{d}</li>'
        for d in unique_failing
    ) if unique_failing else '<li style="font-family:Arial,sans-serif; font-size:14px; color:#27ae60;">All domains reported compliant.</li>'

    subject = f"Your 7-Day Compliance Action Plan — {score}/10 Domains Ready"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#040a14;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#040a14;">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="100%" style="max-width:600px;background:#0D1829;border:1px solid rgba(200,147,63,0.25);">

        <!-- Header -->
        <tr><td style="padding:32px 32px 24px; border-bottom:2px solid #C8933F;">
          <div style="font-family:'Courier New',monospace; font-size:10px; font-weight:700; letter-spacing:0.20em; color:rgba(200,147,63,0.60); text-transform:uppercase; margin-bottom:8px;">LP-TOOL-002 — COMPLIANCE HEALTH CHECK RESULTS</div>
          <h1 style="font-family:Georgia,serif; font-size:28px; font-weight:800; color:#fff; margin:0 0 8px; line-height:1.2;">Your 7-Day Compliance Action Plan</h1>
          <p style="font-family:Arial,sans-serif; font-size:15px; color:rgba(244,241,235,0.60); margin:0;">Based on your readiness assessment results.</p>
        </td></tr>

        <!-- Score block -->
        <tr><td style="padding:24px 32px; border-bottom:1px solid #1a2535;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:50%; vertical-align:middle;">
                <div style="font-family:'Courier New',monospace; font-size:11px; color:rgba(255,255,255,0.40); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:4px;">READINESS SCORE</div>
                <div style="font-family:Georgia,serif; font-size:42px; font-weight:800; color:#fff; line-height:1;">{score}<span style="font-size:20px; color:rgba(255,255,255,0.35)">/10</span></div>
              </td>
              <td style="width:50%; vertical-align:middle; text-align:right;">
                <div style="display:inline-block; padding:10px 20px; border:2px solid {verdict_color}; background:{verdict_color}18;">
                  <div style="font-family:'Courier New',monospace; font-size:16px; font-weight:700; color:{verdict_color}; letter-spacing:0.15em;">{verdict}</div>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Failing domains -->
        <tr><td style="padding:20px 32px; border-bottom:1px solid #1a2535; background:#080e1a;">
          <div style="font-family:'Courier New',monospace; font-size:10px; font-weight:700; letter-spacing:0.15em; color:rgba(200,147,63,0.55); text-transform:uppercase; margin-bottom:10px;">DOMAINS REQUIRING IMMEDIATE ATTENTION</div>
          <ul style="margin:0; padding-left:18px;">
            {failing_list}
          </ul>
        </td></tr>

        <!-- Action plan table -->
        <tr><td style="padding:24px 32px 0;">
          <div style="font-family:'Courier New',monospace; font-size:10px; font-weight:700; letter-spacing:0.15em; color:rgba(200,147,63,0.55); text-transform:uppercase; margin-bottom:12px;">7-DAY ACTION SEQUENCE</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1a2535;">
            {day_rows}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:28px 32px 32px; text-align:center; border-top:1px solid #1a2535; margin-top:24px;">
          <p style="font-family:Arial,sans-serif; font-size:14px; color:rgba(244,241,235,0.55); margin:0 0 16px;">Need a structured system installed — not just a checklist?</p>
          <a href="https://launchpathedu.com/compliance-library" style="display:inline-block; background:#C8933F; color:#060D1A; font-family:'Courier New',monospace; font-weight:700; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; padding:14px 28px;">VIEW THE COMPLIANCE LIBRARY →</a>
          <p style="font-family:'Courier New',monospace; font-size:10px; color:rgba(255,255,255,0.25); margin:20px 0 0; letter-spacing:0.06em;">LAUNCHPATH TRANSPORTATION EDU · NOT DONE-FOR-YOU COMPLIANCE</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""

    return subject, html


# ── Helpers ───────────────────────────────────────────────────────────────────
# Correct REACH max scores: R=9, E=9, A=9, C=9, H=6 → total=42
_CAT_MAX = {"r": 9, "e": 9, "a": 9, "c": 9, "h": 6}
_CAT_TOTAL = 42

_GAP_GUIDANCE = {
    "r": {
        "label": "Resources",
        "warning_copy": "Limited capital runway is the single most common reason new authorities fail in Year 1. Most carriers need 3–6 months of operating reserves before consistent freight revenue arrives. Map your true cost per mile before the first load.",
        "critical_copy": "Your resource profile shows significant financial risk. Operating authority without adequate reserves dramatically increases early failure probability — regardless of compliance preparation.",
        "action": "Use the LaunchPath TCO Calculator to calculate your exact operating cost per mile and monthly reserve requirement.",
        "link_label": "Open TCO Calculator →",
        "link": "/tools/tco-calculator",
    },
    "e": {
        "label": "Experience",
        "warning_copy": "Limited industry experience increases your compliance learning curve. The gaps experience would have taught you — broker contracts, dispatch mechanics, HOS patterns — are documented in Ground 0.",
        "critical_copy": "Minimal trucking or compliance experience means you are entering a highly regulated environment without the pattern recognition that prevents costly mistakes. Structured preparation is not optional.",
        "action": "Ground 0 covers the operational realities that field experience would teach — before you pay for that education on the road.",
        "link_label": "Begin Ground 0 →",
        "link": "/ground-0-briefing",
    },
    "a": {
        "label": "Authority Readiness",
        "warning_copy": "Your authority setup shows incomplete filings. UCR, BOC-3, and MCS-150 must all be confirmed active in SAFER before the first load moves. Brokers check SAFER in real time.",
        "critical_copy": "Your authority profile has critical gaps. Incomplete or inactive filings are the most cited findings in FMCSA new entrant audits — and the fastest path to authority suspension.",
        "action": "The Authority Registrations Brief walks through every required filing with a verification checklist and common failure patterns.",
        "link_label": "Read the Authority Brief →",
        "link": "/knowledge-center/authority-registrations-brief",
    },
    "c": {
        "label": "Commitment",
        "warning_copy": "Limited time availability increases implementation risk. The LaunchPath Standard requires 5–10 hours per week in the first 90 days. Compliance doesn't wait for freight to slow down.",
        "critical_copy": "Minimal commitment to compliance management is one of the clearest predictors of early authority failure. The carriers who survive the first year are not the most talented — they are the ones who showed up for the business side when the freight got busy.",
        "action": "Review the 90-Day Compliance Calendar to understand the exact time commitment required at each phase.",
        "link_label": "View the 90-Day Calendar →",
        "link": "/control-room",
    },
    "h": {
        "label": "Operational Discipline",
        "warning_copy": "Your operational planning shows gaps in timeline structure and contingency thinking. The carriers who fail audits aren't the ones who broke the rules — they're the ones who never built the rhythm.",
        "critical_copy": "Critical gaps in operational discipline indicate your compliance systems aren't functioning as a system yet. Document control, maintenance records, and HOS patterns need to be established before the audit window opens.",
        "action": "The 90-Day Compliance Calendar maps every required action from Day 1 through the FMCSA audit window.",
        "link_label": "Open the Control Room →",
        "link": "/control-room",
    },
}


def _gap_status(score: int, max_score: int) -> str:
    pct = score / max_score
    if pct >= 0.78:
        return "pass"
    if pct >= 0.44:
        return "warning"
    return "critical"


def _build_gap_sections(scores_dict: dict) -> str:
    """Build personalized per-category gap sections for flagged domains."""
    sections = ""
    for k, guidance in _GAP_GUIDANCE.items():
        s = scores_dict[k]
        status = _gap_status(s, _CAT_MAX[k])
        if status == "pass":
            continue
        border_color = "#F59E0B" if status == "warning" else "#e74c3c"
        bg_color = "#1A1000" if status == "warning" else "#1A0500"
        copy = guidance["warning_copy"] if status == "warning" else guidance["critical_copy"]
        status_label = "GAP IDENTIFIED" if status == "warning" else "CRITICAL GAP"
        sections += (
            f'<div style="background:{bg_color};border-left:3px solid {border_color};'
            f'padding:20px 24px;margin:0 0 16px;">'
            f'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
            f'<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;'
            f'color:{border_color};margin:0;font-weight:700;">{guidance["label"]}</p>'
            f'<p style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;'
            f'color:{border_color};margin:0;opacity:0.75;">{status_label} &nbsp;·&nbsp; {s}/{_CAT_MAX[k]}</p>'
            f'</div>'
            f'<p style="font-size:14px;color:rgba(255,255,255,0.78);line-height:1.75;margin:0 0 14px;">{copy}</p>'
            f'<p style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.65;margin:0 0 14px;">'
            f'{guidance["action"]}</p>'
            f'<a href="{FRONTEND_URL}{guidance["link"]}" '
            f'style="font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;'
            f'color:{border_color};text-decoration:none;">{guidance["link_label"]}</a>'
            f'</div>'
        )
    return sections or '<p style="font-size:14px;color:rgba(255,255,255,0.65);">No specific gaps identified. Proceed with implementation.</p>'


def _build_reach_email(result: str, total_score: int, scores: REACHCategoryScores, email: str) -> tuple:
    score_dict = {"r": scores.r, "e": scores.e, "a": scores.a, "c": scores.c, "h": scores.h}
    score_pct = round((total_score / _CAT_TOTAL) * 100)

    def score_bar(score: int, max_score: int) -> str:
        filled = round((score / max_score) * 10)
        bar = "█" * filled + "░" * (10 - filled)
        return f'<span style="font-family:monospace;color:#C5A059;letter-spacing:1px;">{bar}</span>'

    def category_rows() -> str:
        rows = ""
        for k, guidance in _GAP_GUIDANCE.items():
            s = score_dict[k]
            mx = _CAT_MAX[k]
            status = _gap_status(s, mx)
            color = "#4CAF50" if status == "pass" else ("#F59E0B" if status == "warning" else "#e74c3c")
            status_tag = "" if status == "pass" else f' <span style="font-size:10px;color:{color};opacity:0.8;">{"⚠" if status == "warning" else "✗"}</span>'
            rows += (
                f'<tr><td style="padding:8px 0;font-size:13px;color:rgba(255,255,255,0.75);width:160px;">'
                f'{guidance["label"]}{status_tag}</td>'
                f'<td style="padding:8px 0;">{score_bar(s, mx)}</td>'
                f'<td style="padding:8px 0 8px 12px;font-size:13px;color:{color};font-weight:600;">{s}/{mx}</td></tr>'
            )
        return rows

    header_base = (
        '<div style="font-family:\'Inter\',sans-serif;max-width:600px;margin:0 auto;background:#002244;'
        'color:#f4f7fb;padding:48px 40px;">'
        '<p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;'
        'margin:0 0 28px;border-top:4px solid #C5A059;padding-top:20px;">'
        'LaunchPath Operating Standard &nbsp;|&nbsp; REACH Assessment Result</p>'
    )
    score_block = (
        f'<div style="background:#0F1E35;padding:20px 24px;margin:0 0 28px;">'
        f'<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;'
        f'color:rgba(197,160,89,0.75);margin:0 0 16px;">YOUR CATEGORY SCORES</p>'
        f'<table style="width:100%;border-collapse:collapse;">{category_rows()}</table>'
        f'<div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:12px;padding-top:12px;">'
        f'<span style="font-size:12px;color:rgba(255,255,255,0.50);">Total: </span>'
        f'<span style="font-size:14px;font-weight:700;color:#C5A059;">{total_score}/{_CAT_TOTAL} &nbsp;({score_pct}%)</span>'
        f'</div></div>'
    )
    gap_sections = _build_gap_sections(score_dict)
    footer = (
        '<p style="font-size:12px;color:rgba(255,255,255,0.28);margin:36px 0 0;line-height:1.6;">'
        'This result was generated by the LaunchPath REACH Assessment.<br>'
        'LaunchPath Operating Standard &nbsp;·&nbsp; Accuracy Over Hype. Systems Over Shortcuts.</p></div>'
    )

    def btn(label, href, primary=True):
        return (
            f'<a href="{href}" style="display:inline-block;background:{"#C5A059" if primary else "transparent"};'
            f'color:{"#002244" if primary else "#C5A059"};font-weight:700;font-size:14px;letter-spacing:0.06em;'
            f'text-transform:uppercase;padding:{"16px 32px" if primary else "15px 24px"};text-decoration:none;'
            f'{"" if primary else "border:1px solid rgba(197,160,89,0.45);"}'
            f'margin-right:12px;">{label}</a>'
        )

    if result == "GO":
        subject = "REACH Result: GO — You're cleared to move forward."
        has_gaps = any(_gap_status(v, _CAT_MAX[k]) != "pass" for k, v in score_dict.items())
        gap_note = ""
        if has_gaps:
            gap_note = (
                f'<div style="background:#0a1520;border:1px solid rgba(197,160,89,0.2);'
                f'padding:20px 24px;margin:0 0 28px;">'
                f'<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;'
                f'color:rgba(197,160,89,0.6);margin:0 0 12px;">AREAS TO MONITOR DURING IMPLEMENTATION</p>'
                f'{gap_sections}</div>'
            )
        html = (
            header_base
            + '<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#4CAF50;margin:0 0 6px;">RESULT</p>'
            + '<h1 style="font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">GO</h1>'
            + '<p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your readiness profile clears you to begin the implementation sequence.</p>'
            + '<p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 28px;">'
            + 'Your REACH score indicates you have the foundational resources, authority setup, and operational commitment needed to install the LaunchPath Operating Standard. The window is open.</p>'
            + score_block + gap_note
            + '<p style="font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75;margin:0 0 28px;">Your next step is the LaunchPath Standard — the 90-day guided implementation program that installs the compliance infrastructure before the FMCSA audit window opens.</p>'
            + btn("Proceed to the 90-Day Standard →", f"{FRONTEND_URL}/launchpath-standard")
            + btn("Review Ground 0 First →", f"{FRONTEND_URL}/ground-0-briefing", primary=False)
            + footer
        )
    elif result == "WAIT":
        subject = "REACH Result: WAIT — Address these gaps before proceeding."
        html = (
            header_base
            + '<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#F59E0B;margin:0 0 6px;">RESULT</p>'
            + '<h1 style="font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">WAIT</h1>'
            + '<p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your profile shows gaps that should be resolved before you begin the full implementation sequence.</p>'
            + '<p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 28px;">'
            + 'WAIT is not failure — it is the system protecting you from a preventable loss. The gaps identified below are resolvable. Address them, then retake the assessment.</p>'
            + score_block
            + '<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.6);margin:0 0 16px;">YOUR GAP SUMMARY</p>'
            + gap_sections
            + '<div style="margin:28px 0;">'
            + btn("Retake the REACH Assessment →", f"{FRONTEND_URL}/reach-diagnostic")
            + btn("Explore the Knowledge Center →", f"{FRONTEND_URL}/knowledge-center", primary=False)
            + '</div>'
            + footer
        )
    else:
        subject = "REACH Result: NO-GO — Critical gaps require attention before proceeding."
        html = (
            header_base
            + '<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#e74c3c;margin:0 0 6px;">RESULT</p>'
            + '<h1 style="font-size:32px;font-weight:700;color:#ffffff;margin:0 0 6px;">NO-GO</h1>'
            + '<p style="font-size:16px;color:rgba(255,255,255,0.65);margin:0 0 28px;">Your current position carries significant compliance risk across multiple domains.</p>'
            + '<p style="font-size:15px;color:rgba(255,255,255,0.78);line-height:1.85;margin:0 0 28px;">'
            + 'This is not a rejection — it is the system telling you the conditions for survival aren\'t in place yet. '
            + 'Every gap below is resolvable. The Knowledge Center contains the resources to address each one. Come back when your position changes.</p>'
            + score_block
            + '<p style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.6);margin:0 0 16px;">CRITICAL GAP ANALYSIS</p>'
            + gap_sections
            + '<div style="margin:28px 0;">'
            + btn("Explore the Knowledge Center →", f"{FRONTEND_URL}/knowledge-center")
            + btn("Contact LaunchPath →", f"{FRONTEND_URL}/contact", primary=False)
            + '</div>'
            + footer
        )
    return subject, html


# ── Routes ────────────────────────────────────────────────────────────────────
@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.post("/contact")
async def submit_contact(form: ContactForm):
    parts = form.name.strip().split(" ", 1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""
    payload = {
        "email": form.email, "status": "active",
        "fields": {"name": first, "last_name": last, "phone": form.phone or "", "company": form.mc or "", "lead_source": "contact_form"},
    }
    if form.authorityAge:
        payload["fields"]["authority_age"] = form.authorityAge
    if form.inquiryType:
        payload["fields"]["inquiry_type"] = form.inquiryType
    if form.message:
        payload["fields"]["contact_message"] = form.message[:1000]
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save contact. Please try again.")
    return {"ok": True}


@router.post("/partners")
async def submit_partner_inquiry(form: PartnerInquiryForm):
    parts = form.name.strip().split(" ", 1)
    first = parts[0]
    last = parts[1] if len(parts) > 1 else ""
    payload = {
        "email": form.email, "status": "active",
        "fields": {"name": first, "last_name": last, "company": form.company, "lead_source": "partner_inquiry", "partner_role": form.role},
    }
    if form.message:
        payload["fields"]["contact_message"] = form.message[:1000]
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite partner error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not submit inquiry. Please try again.")
    return {"ok": True}


@router.post("/diagnostic")
async def submit_diagnostic(data: DiagnosticSubmit):
    payload = {
        "email": data.email, "status": "active",
        "fields": {"diagnostic_result": data.result, "diagnostic_score": f"{data.score}/28", "red_flags": str(data.red_count), "yellow_flags": str(data.yellow_count), "lead_source": "diagnostic_assessment"},
    }
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite diagnostic error: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not log result.")
    return {"ok": True, "result": data.result}


def _ground0_go_email_html(first_name: str) -> str:
    """Build the Ground 0 GO outcome follow-up email."""
    GOLD = "#C5A059"
    NAVY = "#001B36"
    TEXT = "rgba(255,255,255,0.82)"
    MUTED = "rgba(255,255,255,0.48)"
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:'Inter',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="100%" style="max-width:600px;background:{NAVY};border-top:3px solid {GOLD};">
      <tr><td style="padding:40px 40px 0;">
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:rgba(197,160,89,0.60);margin:0 0 28px;">LP-GRD-0 &nbsp;|&nbsp; GROUND 0 RESULT &nbsp;|&nbsp; GROUND0_GO_EMAIL_01</p>
        <p style="font-size:16px;color:{TEXT};line-height:1.75;margin:0 0 20px;">{first_name},</p>
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 24px;line-height:1.3;">Your Ground 0 result has been recorded as GO.</h2>
        <p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">That means your current position meets the present standard to continue forward.</p>
        <p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">This does not mean the work is finished. It means you are cleared to proceed in the correct order.</p>
        <p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">From here, the next step is to continue into the LaunchPath admission path and review what is required to move from readiness into structure.</p>
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-family:'JetBrains Mono','Courier New',monospace;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(197,160,89,0.55);margin:0 0 12px;">WHAT HAPPENS NEXT</p>
        <ul style="margin:0 0 24px;padding:0 0 0 18px;">
          <li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">Your result has been saved</li>
          <li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">Your place in the process has been recorded</li>
          <li style="font-size:14px;color:{MUTED};line-height:1.75;margin:0 0 6px;">You will receive the next instruction for progression</li>
        </ul>
        <div style="height:1px;background:rgba(255,255,255,0.07);margin:24px 0;"></div>
        <p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 14px;">This system is built to help operators move with order, not speed alone. What is built correctly is easier to protect later.</p>
        <p style="font-size:15px;color:{TEXT};line-height:1.80;margin:0 0 24px;">Watch your inbox for the next step.</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;"><tr>
          <td style="background:{GOLD};"><a href="https://www.launchpathedu.com/admission" style="display:inline-block;background:{GOLD};color:{NAVY};font-family:'Inter',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">Continue Forward &#8594;</a></td>
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


@router.post("/go-email-capture")
async def go_email_capture(data: GOEmailCapture):
    """Capture email from Lesson 0.7 GO-path — add to MailerLite 'GO Result' group."""
    ML_BASE = "https://connect.mailerlite.com/api"
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    name_parts = (data.name or "").strip().split(" ", 1)
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "name": name_parts[0] if name_parts[0] else "",
            "last_name": name_parts[1] if len(name_parts) > 1 else "",
            "lead_source": "ground0_go_capture",
            "ground_0_result": "GO",
        },
    }
    async with httpx.AsyncClient(timeout=10) as http:
        # Upsert subscriber
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite GO capture error: {resp.text}")
            raise HTTPException(status_code=502, detail="Could not save email.")
        subscriber_id = resp.json().get("data", {}).get("id")

        # Create/find "GO Result" group and add subscriber
        if subscriber_id:
            try:
                gr = await http.post(f"{ML_BASE}/groups", headers=headers, json={"name": "GO Result"})
                gid = gr.json().get("data", {}).get("id")
                if not gid:
                    gs = await http.get(f"{ML_BASE}/groups", headers=headers, params={"filter[name]": "GO Result"})
                    items = gs.json().get("data", [])
                    gid = str(items[0]["id"]) if items else None
                if gid:
                    await http.post(MAILERLITE_URL, headers=headers, json={
                        "email": data.email, "status": "active", "groups": [gid],
                    })
            except Exception as exc:
                logger.warning(f"GO group assignment failed for {data.email}: {exc}")

    logger.info(f"GO email captured: {data.email}")

    # Send Ground 0 GO follow-up email
    first_name = (data.name or "").strip().split()[0] if data.name else "Operator"
    go_subject = "Your Ground 0 result has been recorded as GO."
    go_html = _ground0_go_email_html(first_name)
    asyncio.create_task(send_mailersend_email(data.email, first_name, go_subject, go_html))
    logger.info(f"Ground 0 GO email queued: {data.email}")

    return {"ok": True}


@router.post("/reach")
async def submit_reach(data: REACHSubmit):
    tag_map = {"GO": "REACH_GO", "WAIT": "REACH_WAIT", "NO-GO": "REACH_NOGO"}
    payload = {
        "email": data.email, "status": "active",
        "fields": {
            "lead_source": f"reach_{data.result.lower().replace('-', '_')}",
            "reach_result": data.result, "reach_total_score": str(data.total_score),
            "reach_resources": str(data.category_scores.r), "reach_experience": str(data.category_scores.e),
            "reach_authority": str(data.category_scores.a), "reach_commitment": str(data.category_scores.c),
            "reach_hustle": str(data.category_scores.h), "reach_open_response": data.open_response or "",
            "reach_tag": tag_map.get(data.result, "REACH_COMPLETE"),
        },
    }
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite REACH error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save assessment.")
    subject, html = _build_reach_email(data.result, data.total_score, data.category_scores, data.email)
    asyncio.create_task(send_mailersend_email(data.email, data.email.split("@")[0], subject, html))
    return {"ok": True, "result": data.result}


@router.post("/admission")
async def submit_admission(data: AdmissionSubmit):
    payload = {
        "email": data.email, "status": "active",
        "fields": {"name": data.name, "lead_source": "admission_request", "usdot_number": data.usdot_number, "cohort_preference": data.cohort_preference, "admission_message": data.message or "", "admission_requested": "true"},
    }
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
    if resp.status_code not in (200, 201):
        logger.error(f"MailerLite admission error {resp.status_code}: {resp.text}")
        raise HTTPException(status_code=502, detail="Could not save submission.")
    return {"ok": True}


@router.post("/admission-request")
async def submit_admission_request(data: AdmissionRequestNew):
    now = datetime.now(timezone.utc)
    record = {
        "carrier_name": data.carrier_name, "email": data.email,
        "dot_mc_number": data.dot_mc_number or "", "authority_activation_date": data.authority_activation_date or "",
        "compliance_status": data.compliance_status, "lane": data.lane, "message": data.message or "",
        "source": "admission_form", "submission_date": now.isoformat(), "status": "pending_review",
    }
    await db.admission_requests.insert_one(record)
    admission_id = str(record["_id"])
    lane_label = "Box Truck" if data.lane == "box_truck" else "Semi / Tractor-Trailer"
    ml_payload = {
        "email": data.email, "status": "active",
        "fields": {"name": data.carrier_name, "lead_source": "admission_request", "admission_status": "pending_review", "admission_lane": lane_label, "admission_compliance_status": data.compliance_status},
    }
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            ml_resp = await http.post(MAILERLITE_URL, json=ml_payload, headers=headers)
        if ml_resp.status_code not in (200, 201):
            logger.error(f"MailerLite admission-request error {ml_resp.status_code}: {ml_resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite admission-request failed: {exc}")
    act_date = data.authority_activation_date or "Not provided"
    notify_html = f"""
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#002244;color:#f4f7fb;padding:48px 40px;border-top:4px solid #C5A059;">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;margin:0 0 24px;">LaunchPath Operating Standard &nbsp;|&nbsp; New Admission Request</p>
      <h1 style="font-family:'Manrope',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 6px;">New Admission Request</h1>
      <p style="font-size:15px;color:rgba(255,255,255,0.65);margin:0 0 28px;">A qualified operator has submitted an admission request.</p>
      <div style="background:#0F1E35;border-left:3px solid #C5A059;padding:20px 24px;margin:0 0 28px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);width:180px;">Carrier Name</td><td style="padding:6px 0;font-size:13px;color:#ffffff;font-weight:600;">{data.carrier_name}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Email</td><td style="padding:6px 0;font-size:13px;color:#C5A059;">{data.email}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">DOT / MC Number</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{data.dot_mc_number or "Not provided"}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Authority Active Since</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{act_date}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Compliance Status</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{data.compliance_status}</td></tr>
          <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,0.55);">Lane / Equipment</td><td style="padding:6px 0;font-size:13px;color:#ffffff;">{lane_label}</td></tr>
        </table>
      </div>
      {f'<div style="background:#0a1a2e;border-left:3px solid rgba(197,160,89,0.4);padding:16px 20px;margin:0 0 28px;"><p style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(197,160,89,0.7);margin:0 0 8px;">Operator Note</p><p style="font-size:14px;color:rgba(255,255,255,0.75);line-height:1.65;margin:0;">{data.message}</p></div>' if data.message else ""}
      <p style="font-size:13px;color:rgba(255,255,255,0.45);margin:28px 0 0;line-height:1.6;">Submitted {now.strftime("%B %d, %Y at %H:%M UTC")}</p>
    </div>"""
    asyncio.create_task(send_mailersend_email(COACH_EMAIL, "Vince Lawrence", f"New Admission Request — {data.carrier_name}", notify_html, reply_to=data.email))
    return {"ok": True, "admission_id": admission_id}


@router.post("/ground0")
async def submit_ground0(data: Ground0Submit):
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "ground_0_complete", "ground_0_complete": "true"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite Ground 0 error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite Ground 0 request failed: {exc}")
    return {"ok": True}


@router.post("/sins-checklist")
async def sins_checklist_capture(data: SinsChecklistCapture):
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "sins_checklist_download", "lead_group": "16 Deadly Sins Downloads"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite sins checklist error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite sins checklist request failed: {exc}")
    return {"ok": True}


@router.post("/library/email-capture")
async def library_email_capture(data: SinsChecklistCapture):
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "library_not_ready", "lead_group": "Library Email Capture"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite library capture error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite library capture failed: {exc}")
    return {"ok": True}


@router.post("/cpm/email-capture")
async def cpm_email_capture(data: CPMEmailCapture):
    payload = {"email": data.email, "status": "active", "fields": {"lead_source": "cpm_calculator"}}
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite CPM error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite CPM request failed: {exc}")
    return {"ok": True}


@router.post("/control-room/capture")
async def control_room_capture(data: ControlRoomCapture):
    tool_key = data.tool_name.lower().replace(" ", "_")
    payload = {
        "email": data.email, "status": "active",
        "fields": {
            "lead_source": f"control_room_{tool_key}",
            "lead_group": f"Control Room — {data.tool_name}",
            "tool_summary": (data.tool_summary or "")[:500],
        },
    }
    headers = {"Authorization": f"Bearer {MAILERLITE_API_TOKEN}", "Content-Type": "application/json", "Accept": "application/json"}
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite Control Room error {resp.status_code}: {resp.text}")
    except Exception as exc:
        logger.error(f"MailerLite Control Room request failed: {exc}")

    # Send 7-day action plan email for Health Check submissions
    if data.tool_name == "Compliance Health Check" and data.score is not None:
        subject, html = _build_health_plan_email(data.email, data.score, data.failing_domains or [])
        asyncio.create_task(send_mailersend_email(data.email, data.email.split("@")[0], subject, html))

    return {"ok": True}


OG_IMAGE = "https://static.prod-images.emergentagent.com/jobs/af40d51d-d305-49f1-a1bf-bdfcdf7e2c6c/images/28bd7774d58d7dc4db1413b43d0df951dc18b485f155595b59aef6f767df0cd1.png"


@router.get("/og/health-check", response_class=HTMLResponse)
async def og_health_check(score: int = 0):
    score = max(0, min(10, score))
    verdict = "GO" if score >= 8 else "CAUTION" if score >= 6 else "NOT READY"
    verdict_color = "#27ae60" if score >= 8 else "#C8933F" if score >= 6 else "#c0392b"
    redirect_url = f"{FRONTEND_URL}/control-room?tab=health&score={score}"

    title = f"{verdict} — {score}/10 Compliance Domains Ready | LaunchPath"
    description = (
        f"This carrier scored {score}/10 on the LaunchPath Compliance Health Check. "
        f"Verdict: {verdict}. Run your own 10-question readiness diagnostic across 6 FMCSA compliance domains."
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>

  <!-- Open Graph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="{redirect_url}" />
  <meta property="og:title"       content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image"       content="{OG_IMAGE}" />
  <meta property="og:image:width"  content="1536" />
  <meta property="og:image:height" content="1024" />
  <meta property="og:site_name"   content="LaunchPath" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image"       content="{OG_IMAGE}" />

  <!-- Instant redirect for human visitors -->
  <meta http-equiv="refresh" content="0;url={redirect_url}" />
</head>
<body style="margin:0;background:#060D1A;color:#fff;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;padding:2rem;">
    <p style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#C8933F;margin-bottom:0.5rem;">LAUNCHPATH OPERATOR CONTROL ROOM</p>
    <h1 style="font-size:1.5rem;font-weight:800;color:{verdict_color};margin-bottom:0.5rem;">{verdict}</h1>
    <p style="color:rgba(255,255,255,0.60);font-size:0.9rem;">{score}/10 compliance domains ready — redirecting&hellip;</p>
    <a href="{redirect_url}" style="color:#C8933F;font-size:0.8rem;">Click here if not redirected</a>
  </div>
  <script>window.location.replace("{redirect_url}");</script>
</body>
</html>"""
    return HTMLResponse(content=html)


@router.post("/risk-map/email-capture")
async def risk_map_email_capture(data: RiskMapCapture):
    """Capture lead for First 90 Days Risk Map — MailerLite group + MongoDB leads."""
    ML_BASE = "https://connect.mailerlite.com/api"
    headers = {
        "Authorization": f"Bearer {MAILERLITE_API_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    payload = {
        "email": data.email,
        "status": "active",
        "fields": {
            "name": data.first_name,
            "lead_source": "first_90_days_risk_map",
        },
    }
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.post(MAILERLITE_URL, json=payload, headers=headers)
        if resp.status_code not in (200, 201):
            logger.error(f"MailerLite risk-map error: {resp.text}")
            raise HTTPException(status_code=502, detail="Could not save email. Please try again.")
        subscriber_id = resp.json().get("data", {}).get("id")

        if subscriber_id:
            try:
                gr = await http.post(f"{ML_BASE}/groups", headers=headers, json={"name": "First-90-Days-Risk-Map"})
                gid = gr.json().get("data", {}).get("id")
                if not gid:
                    gs = await http.get(f"{ML_BASE}/groups", headers=headers, params={"filter[name]": "First-90-Days-Risk-Map"})
                    items = gs.json().get("data", [])
                    gid = str(items[0]["id"]) if items else None
                if gid:
                    await http.post(MAILERLITE_URL, headers=headers, json={
                        "email": data.email, "status": "active", "groups": [gid],
                    })
            except Exception as exc:
                logger.warning(f"Risk-map group assignment failed for {data.email}: {exc}")

    now = datetime.now(timezone.utc)
    await db.leads.update_one(
        {"email": data.email},
        {"$set": {
            "first_name": data.first_name,
            "email": data.email,
            "source": "first-90-days-risk-map",
            "submitted_at": now.isoformat(),
        }},
        upsert=True,
    )
    logger.info(f"Risk Map lead captured: {data.email}")
    return {"ok": True}
