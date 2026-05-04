"""
LaunchPath Slideshare Deck Generator
"The New Carrier FMCSA Survival Guide"
Dark navy + gold — 1920x1080 landscape slides
"""
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

OUT = "/app/frontend/public/downloads/LaunchPath_FMCSA_Survival_Guide.pdf"
W, H = landscape((1920, 1080))  # widescreen 16:9

# Brand colors
NAVY      = HexColor("#071422")
NAVY_MID  = HexColor("#0B1C2E")
GOLD      = HexColor("#C9A84C")
GOLD_LITE = HexColor("#EDD99A")
WHITE     = HexColor("#FFFFFF")
GRAY      = HexColor("#7A8590")
RED       = HexColor("#b12a1e")
GREEN     = HexColor("#3d9970")
CORAL     = HexColor("#D85A30")

def new_slide(c, bg=NAVY):
    c.setFillColor(bg)
    c.rect(0, 0, W, H, fill=1, stroke=0)

def gold_rule(c, y, x1=80, x2=None):
    if x2 is None:
        x2 = W - 80
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(x1, y, x2, y)

def label(c, text, x, y, size=14, color=GOLD, font="Helvetica-Bold"):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)

def body(c, text, x, y, size=22, color=WHITE, font="Helvetica", max_width=None, leading=32):
    c.setFont(font, size)
    c.setFillColor(color)
    if max_width:
        # word wrap
        words = text.split()
        lines = []
        current = ""
        for w in words:
            test = (current + " " + w).strip()
            if c.stringWidth(test, font, size) <= max_width:
                current = test
            else:
                if current:
                    lines.append(current)
                current = w
        if current:
            lines.append(current)
        for i, line in enumerate(lines):
            c.drawString(x, y - i * leading, line)
        return y - (len(lines) - 1) * leading
    else:
        c.drawString(x, y, text)
        return y

def bullet(c, items, x, y, size=20, color=WHITE, dot_color=GOLD, spacing=44):
    for i, item in enumerate(items):
        c.setFillColor(dot_color)
        c.setFont("Helvetica-Bold", size)
        c.drawString(x, y - i * spacing, "—")
        c.setFillColor(color)
        c.setFont("Helvetica", size)
        c.drawString(x + 32, y - i * spacing, item)

def slide_number(c, num, total=20):
    c.setFont("Helvetica", 13)
    c.setFillColor(GRAY)
    c.drawRightString(W - 60, 36, f"{num} / {total}")

def lp_footer(c):
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(80, 36, "LaunchPath EDU  |  launchpathedu.com")
    c.setFillColor(GRAY)
    c.setFont("Helvetica", 13)
    c.drawRightString(W - 80, 36, "FMCSA Compliance for New Motor Carriers")

TOTAL = 20

c = canvas.Canvas(OUT, pagesize=(W, H))
c.setTitle("The New Carrier FMCSA Survival Guide — LaunchPath EDU")
c.setAuthor("LaunchPath EDU")
c.setSubject("FMCSA compliance system for new motor carriers")
c.setKeywords("FMCSA, DOT, new entrant, compliance, trucking, motor carrier")

# ─── SLIDE 1: COVER ────────────────────────────────────────────────
new_slide(c)
# Gold top border
c.setFillColor(GOLD)
c.rect(0, H - 6, W, 6, fill=1, stroke=0)

label(c, "LP-GUIDE-001  |  NEW CARRIER SERIES", 80, H - 80, size=16)
gold_rule(c, H - 96, x2=500)

# Title block
lines = ["THE NEW CARRIER", "FMCSA SURVIVAL GUIDE"]
c.setFont("Helvetica-Bold", 76)
c.setFillColor(WHITE)
c.drawString(80, H - 200, lines[0])
c.setFillColor(GOLD)
c.drawString(80, H - 295, lines[1])

c.setFont("Helvetica", 28)
c.setFillColor(GRAY)
c.drawString(80, H - 370, "Ground 0  ·  16 Deadly Sins  ·  New Entrant Audit Checklist")

gold_rule(c, H - 410, x2=900)

c.setFont("Helvetica", 22)
c.setFillColor(WHITE)
c.drawString(80, H - 460, "A step-by-step system for building audit-ready compliance")
c.drawString(80, H - 492, "before FMCSA shows up at your door.")

# Bottom CTA box
c.setFillColor(GOLD)
c.roundRect(80, 80, 420, 64, 6, fill=1, stroke=0)
c.setFont("Helvetica-Bold", 22)
c.setFillColor(NAVY)
c.drawString(140, 120, "FREE DIAGNOSTIC: launchpathedu.com/reach")

c.setFont("Helvetica-Bold", 14)
c.setFillColor(GOLD)
c.drawRightString(W - 80, 100, "LaunchPath EDU  |  launchpathedu.com")

slide_number(c, 1, TOTAL)
c.showPage()

# ─── SLIDE 2: THE PROBLEM ──────────────────────────────────────────
new_slide(c)
label(c, "THE PROBLEM", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=340)

c.setFont("Helvetica-Bold", 64)
c.setFillColor(WHITE)
c.drawString(80, H - 210, "Most new carriers")
c.setFillColor(GOLD)
c.drawString(80, H - 285, "don't see the audit coming.")

c.setFont("Helvetica", 26)
c.setFillColor(WHITE)
c.drawString(80, H - 360, "FMCSA conducts a New Entrant Safety Audit within")
c.drawString(80, H - 395, "the first 18 months of your authority being active.")

c.setFont("Helvetica-Bold", 26)
c.setFillColor(CORAL)
c.drawString(80, H - 460, "Fail it — and your operating authority is revoked.")

bullet(c, [
    "No warning. No second chance on first revocation.",
    "Most failures are from missing documents, not bad driving.",
    "The FMCSA tells you exactly what they want — most carriers ignore it."
], 80, H - 560, size=22)

lp_footer(c)
slide_number(c, 2, TOTAL)
c.showPage()

# ─── SLIDE 3: THE COST ─────────────────────────────────────────────
new_slide(c)
label(c, "THE COST DECISION", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=380)

c.setFont("Helvetica-Bold", 36)
c.setFillColor(WHITE)
c.drawString(80, H - 180, "Two numbers. One decision.")

# Left box
c.setFillColor(HexColor("#0d1e33"))
c.roundRect(80, H - 620, 700, 380, 8, fill=1, stroke=0)
c.setStrokeColor(RED)
c.setLineWidth(3)
c.roundRect(80, H - 620, 700, 380, 8, fill=0, stroke=1)
c.setFont("Helvetica-Bold", 16)
c.setFillColor(GRAY)
c.drawCentredString(430, H - 290, "COST OF REMEDIATION AFTER FAILURE")
c.setFont("Helvetica-Bold", 86)
c.setFillColor(RED)
c.drawCentredString(430, H - 420, "$10,000")
c.setFont("Helvetica-Bold", 36)
c.setFillColor(GRAY)
c.drawCentredString(430, H - 470, "— $25,000")
c.setFont("Helvetica", 18)
c.setFillColor(GRAY)
c.drawCentredString(430, H - 540, "Legal fees + corrections + re-audit costs")

# Right box
c.setFillColor(HexColor("#0d1e33"))
c.roundRect(860, H - 620, 700, 380, 8, fill=1, stroke=0)
c.setStrokeColor(GOLD)
c.setLineWidth(3)
c.roundRect(860, H - 620, 700, 380, 8, fill=0, stroke=1)
c.setFont("Helvetica-Bold", 16)
c.setFillColor(GRAY)
c.drawCentredString(1210, H - 290, "COST OF THE COMPLETE DOCUMENT SYSTEM")
c.setFont("Helvetica-Bold", 86)
c.setFillColor(GOLD)
c.drawCentredString(1210, H - 420, "$499")
c.setFont("Helvetica", 18)
c.setFillColor(GRAY)
c.drawCentredString(1210, H - 540, "Install it yourself. One-time payment.")

c.setFont("Helvetica-Bold", 20)
c.setFillColor(WHITE)
c.drawCentredString(W / 2, H - 680, "The system costs less than one hour of legal remediation.")

lp_footer(c)
slide_number(c, 3, TOTAL)
c.showPage()

# ─── SLIDE 4: THE 18-MONTH WINDOW ─────────────────────────────────
new_slide(c)
label(c, "THE 18-MONTH AUDIT WINDOW", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=520)

c.setFont("Helvetica-Bold", 56)
c.setFillColor(WHITE)
c.drawString(80, H - 200, "You have 18 months.")
c.setFont("Helvetica-Bold", 56)
c.setFillColor(GOLD)
c.drawString(80, H - 270, "The clock starts when your authority goes active.")

# Timeline bar
zones = [
    (80,  560, GOLD,  "MONTHS 1–3\nGround 0 +\nDocument Install"),
    (590, 560, GREEN, "MONTHS 4–6\nOperations +\nRecord Keeping"),
    (1100,560, CORAL, "MONTHS 7–18\nAudit Window\nOPEN"),
]
for x, w, col, txt in zones:
    c.setFillColor(col)
    c.roundRect(x, H - 540, w, 200, 6, fill=1, stroke=0)
    lines = txt.split("\n")
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(NAVY if col == GOLD else WHITE)
    for i, ln in enumerate(lines):
        c.drawCentredString(x + w / 2, H - 420 + (len(lines) - i - 1) * 30, ln)

c.setFont("Helvetica-Bold", 22)
c.setFillColor(WHITE)
c.drawString(80, H - 620, "FMCSA auditors check 6 domains: Driver Qualification  ·  Drug & Alcohol  ·  HOS  ·  Vehicle Maintenance  ·  Insurance  ·  Accident Records")

lp_footer(c)
slide_number(c, 4, TOTAL)
c.showPage()

# ─── SLIDE 5: GROUND 0 OVERVIEW ───────────────────────────────────
new_slide(c)
label(c, "GROUND 0  |  LP-G0-001", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=380)

c.setFont("Helvetica-Bold", 58)
c.setFillColor(WHITE)
c.drawString(80, H - 200, "Start here.")
c.setFont("Helvetica-Bold", 40)
c.setFillColor(GOLD)
c.drawString(80, H - 260, "Before you buy anything. Before you build anything.")

c.setFont("Helvetica", 24)
c.setFillColor(WHITE)
c.drawString(80, H - 330, "Ground 0 is a free orientation module. It takes 20 minutes.")
c.drawString(80, H - 365, "It answers the question every new carrier skips:")

c.setFont("Helvetica-Bold", 30)
c.setFillColor(GOLD_LITE)
c.drawString(80, H - 430, '"Do I understand what I am actually building — and what it protects?"')

bullet(c, [
    "What FMCSA authority really means (and what exposes it)",
    "The order of operations: REACH → Ground 0 → Four Pillars → Modules",
    "Why 80% of new entrant failures are structural, not behavioral",
    "What happens if you skip the foundation and go straight to paperwork"
], 80, H - 560, size=21, spacing=46)

c.setFillColor(GOLD)
c.roundRect(80, 76, 560, 58, 6, fill=1, stroke=0)
c.setFont("Helvetica-Bold", 22)
c.setFillColor(NAVY)
c.drawCentredString(360, 113, "BEGIN GROUND 0 FREE  →  launchpathedu.com/ground-0")

lp_footer(c)
slide_number(c, 5, TOTAL)
c.showPage()

# ─── SLIDE 6: THE 6 COMPLIANCE DOMAINS ────────────────────────────
new_slide(c)
label(c, "THE 6 COMPLIANCE DOMAINS  |  WHAT FMCSA AUDITS", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=700)

c.setFont("Helvetica-Bold", 42)
c.setFillColor(WHITE)
c.drawString(80, H - 185, "Every new carrier is audited across 6 domains.")
c.setFont("Helvetica", 26)
c.setFillColor(GRAY)
c.drawString(80, H - 230, "Missing documentation in any one of these can trigger a conditional or unsatisfactory rating.")

domains = [
    ("01", "DRIVER QUALIFICATION",   "DQ files, MVR, CDL, medical cert, road test"),
    ("02", "DRUG & ALCOHOL",          "Testing policy, MRO, random program, records"),
    ("03", "HOURS OF SERVICE",        "Logs, ELD, dispatch records, violation tracking"),
    ("04", "VEHICLE MAINTENANCE",     "PM schedule, DVIR, inspection records, repairs"),
    ("05", "INSURANCE & AUTHORITY",   "FMCSA filings, coverage types, lapse prevention"),
    ("06", "ACCIDENT RECORDS",        "Accident register, post-accident testing, reports"),
]
col_w = (W - 200) / 3
row_h = 180
for i, (num, name, desc) in enumerate(domains):
    col = i % 3
    row = i // 3
    x = 80 + col * (col_w + 20)
    y = H - 430 - row * (row_h + 20)
    c.setFillColor(HexColor("#0d1e33"))
    c.roundRect(x, y, col_w, row_h, 6, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.roundRect(x, y, col_w, row_h, 6, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(GOLD)
    c.drawString(x + 16, y + row_h - 30, f"DOMAIN {num}")
    c.setFont("Helvetica-Bold", 19)
    c.setFillColor(WHITE)
    c.drawString(x + 16, y + row_h - 58, name)
    c.setFont("Helvetica", 15)
    c.setFillColor(GRAY)
    # wrap desc
    words = desc.split(", ")
    line1 = ", ".join(words[:2])
    line2 = ", ".join(words[2:]) if len(words) > 2 else ""
    c.drawString(x + 16, y + row_h - 90, line1)
    if line2:
        c.drawString(x + 16, y + row_h - 112, line2)

lp_footer(c)
slide_number(c, 6, TOTAL)
c.showPage()

# ─── SLIDE 7: 16 DEADLY SINS — INTRO ──────────────────────────────
new_slide(c)
label(c, "THE 16 DEADLY SINS  |  LP-SIN-001–016", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=540)

c.setFont("Helvetica-Bold", 62)
c.setFillColor(WHITE)
c.drawString(80, H - 200, "16 patterns that")
c.setFillColor(RED)
c.drawString(80, H - 275, "reach the authority.")

c.setFont("Helvetica", 26)
c.setFillColor(WHITE)
c.drawString(80, H - 360, "These are not random mistakes. They are recurring, preventable failures")
c.drawString(80, H - 395, "that weaken, expose, or damage new carriers during the New Entrant period.")

c.setFont("Helvetica-Bold", 24)
c.setFillColor(GOLD)
c.drawString(80, H - 465, "They reach the authority four ways:")

breach_paths = [
    (HexColor("#1a0f0f"), RED,  "A — AROUND", "Bypassing controls entirely"),
    (HexColor("#0f1a10"), GREEN,"U — UNDER",  "Slipping through undetected gaps"),
    (HexColor("#1a1008"), GOLD, "T — THROUGH","Breaking through weak documentation"),
    (HexColor("#0f1020"), HexColor("#6688cc"), "O — OVER", "Overloading the system until it collapses"),
]
bw = (W - 240) / 4
for i, (bg, col, title, desc) in enumerate(breach_paths):
    x = 80 + i * (bw + 26)
    c.setFillColor(bg)
    c.roundRect(x, H - 760, bw, 230, 6, fill=1, stroke=0)
    c.setStrokeColor(col)
    c.setLineWidth(2)
    c.roundRect(x, H - 760, bw, 230, 6, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(col)
    c.drawCentredString(x + bw / 2, H - 600, title)
    c.setFont("Helvetica", 17)
    c.setFillColor(WHITE)
    c.drawCentredString(x + bw / 2, H - 640, desc)

lp_footer(c)
slide_number(c, 7, TOTAL)
c.showPage()

# ─── SLIDE 8: SINS 1–8 ────────────────────────────────────────────
new_slide(c)
label(c, "THE 16 DEADLY SINS  |  SINS 01–08", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=500)

sins_1_8 = [
    ("01", "No DQ File System",          "Drivers operating without proper qualification files on record"),
    ("02", "Missing Drug & Alcohol Policy","Operating without a written, DOT-compliant D&A program"),
    ("03", "No Random Testing Consortium","Required random testing pool not established before first driver"),
    ("04", "HOS Log Gaps",               "Missing or incomplete hours-of-service records for inspected drivers"),
    ("05", "Lapsed ELD Compliance",      "ELD malfunctions not documented or corrected within required window"),
    ("06", "No Pre/Post-Trip DVIRs",     "Driver Vehicle Inspection Reports missing or unsigned"),
    ("07", "PM Schedule Not Documented", "No preventive maintenance intervals established in writing"),
    ("08", "Insurance Lapse Window",     "Gap between policy cancellation and replacement filing"),
]
col_w2 = (W - 220) / 2
for i, (num, name, desc) in enumerate(sins_1_8):
    col = i % 2
    row = i // 2
    x = 80 + col * (col_w2 + 60)
    y = H - 200 - row * 160
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(GOLD)
    c.drawString(x, y, f"SIN {num}")
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(WHITE)
    c.drawString(x + 90, y, name)
    c.setFont("Helvetica", 17)
    c.setFillColor(GRAY)
    c.drawString(x + 90, y - 28, desc)
    c.setStrokeColor(HexColor("#1a2a3a"))
    c.setLineWidth(1)
    c.line(x, y - 46, x + col_w2, y - 46)

lp_footer(c)
slide_number(c, 8, TOTAL)
c.showPage()

# ─── SLIDE 9: SINS 9–16 ───────────────────────────────────────────
new_slide(c)
label(c, "THE 16 DEADLY SINS  |  SINS 09–16", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=500)

sins_9_16 = [
    ("09", "No Accident Register",        "Accidents not logged in a DOT-required written register"),
    ("10", "Post-Accident Testing Missed","Failed to test driver after qualifying accident within window"),
    ("11", "Authority Registered Wrong",  "MC/DOT authority filed under wrong entity or wrong address"),
    ("12", "No Operating Authority on File","MCS-150 or OP-1 not updated after material changes"),
    ("13", "Driver File Incomplete",      "Missing road test certificate, MVR, or annual review"),
    ("14", "No Written Safety Policy",    "Carrier operating without a documented safety management plan"),
    ("15", "Leased Driver Not on Program","Owner-operator under lease not in D&A consortium"),
    ("16", "MCS-150 Not Biennial Filed",  "Operating authority invalidated by missed biennial update"),
]
col_w2 = (W - 220) / 2
for i, (num, name, desc) in enumerate(sins_9_16):
    col = i % 2
    row = i // 2
    x = 80 + col * (col_w2 + 60)
    y = H - 200 - row * 160
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(GOLD)
    c.drawString(x, y, f"SIN {num}")
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(WHITE)
    c.drawString(x + 90, y, name)
    c.setFont("Helvetica", 17)
    c.setFillColor(GRAY)
    c.drawString(x + 90, y - 28, desc)
    c.setStrokeColor(HexColor("#1a2a3a"))
    c.setLineWidth(1)
    c.line(x, y - 46, x + col_w2, y - 46)

lp_footer(c)
slide_number(c, 9, TOTAL)
c.showPage()

# ─── SLIDE 10: NEW ENTRANT AUDIT CHECKLIST INTRO ──────────────────
new_slide(c)
label(c, "NEW ENTRANT SAFETY AUDIT  |  WHAT FMCSA CHECKS", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=680)

c.setFont("Helvetica-Bold", 56)
c.setFillColor(WHITE)
c.drawString(80, H - 200, "The audit is a document audit.")
c.setFont("Helvetica-Bold", 36)
c.setFillColor(GOLD)
c.drawString(80, H - 260, "Not a road inspection. Not a surprise. A structured document review.")

c.setFont("Helvetica", 24)
c.setFillColor(WHITE)
c.drawString(80, H - 340, "FMCSA publishes exactly what they will look for. Most carriers have never read it.")

items = [
    "Pass = authority remains active",
    "Conditional = 60 days to correct deficiencies",
    "Unsatisfactory = authority revocation proceedings begin",
    "The standard is not high — but you have to actually have the documents",
]
bullet(c, items, 80, H - 450, size=22, spacing=52)

c.setFont("Helvetica-Bold", 24)
c.setFillColor(GOLD_LITE)
c.drawString(80, H - 720, '"The system does not fail carriers. Carriers fail themselves by not building the system."')
c.setFont("Helvetica", 18)
c.setFillColor(GRAY)
c.drawString(80, H - 760, "— Vince Lawrence, Founder LaunchPath EDU")

lp_footer(c)
slide_number(c, 10, TOTAL)
c.showPage()

# ─── SLIDE 11: DOMAIN 1 — DQ ──────────────────────────────────────
new_slide(c)
label(c, "AUDIT CHECKLIST  |  DOMAIN 01: DRIVER QUALIFICATION", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=640)

c.setFont("Helvetica-Bold", 44)
c.setFillColor(WHITE)
c.drawString(80, H - 185, "What FMCSA looks for:")

items = [
    "Driver Application (49 CFR 391.21)",
    "Motor Vehicle Record — MVR (391.23)",
    "Medical Examiner's Certificate — current (391.41–391.45)",
    "Road Test Certificate or equivalent (391.31)",
    "Annual Driving Record Review (391.25)",
    "Driver's License copy (391.11)",
    "Previous employer safety performance history (391.23)",
    "Clearinghouse query results (382.701)",
]
bullet(c, items, 80, H - 290, size=22, dot_color=GOLD, spacing=48)

c.setFillColor(HexColor("#0d1e33"))
c.roundRect(W - 600, H - 760, 500, 600, 8, fill=1, stroke=0)
c.setStrokeColor(GOLD)
c.setLineWidth(2)
c.roundRect(W - 600, H - 760, 500, 600, 8, fill=0, stroke=1)
c.setFont("Helvetica-Bold", 16)
c.setFillColor(GOLD)
c.drawCentredString(W - 350, H - 220, "LP-PKT-DQ")
c.setFont("Helvetica-Bold", 22)
c.setFillColor(WHITE)
c.drawCentredString(W - 350, H - 258, "DQ FILE BUILDER")
c.setFont("Helvetica", 17)
c.setFillColor(GRAY)
for i, ln in enumerate(["Pre-built DQ file folder", "All 8 required forms", "CFR-cited instructions", "Audit-ready format", "$129 one-time"]):
    c.drawCentredString(W - 350, H - 320 - i * 36, f"— {ln}")
c.setFillColor(GOLD)
c.roundRect(W - 560, H - 720, 420, 52, 6, fill=1, stroke=0)
c.setFont("Helvetica-Bold", 18)
c.setFillColor(NAVY)
c.drawCentredString(W - 350, H - 687, "GET THE DQ FILE BUILDER  →")

lp_footer(c)
slide_number(c, 11, TOTAL)
c.showPage()

# ─── SLIDE 12: DOMAIN 2 — D&A ─────────────────────────────────────
new_slide(c)
label(c, "AUDIT CHECKLIST  |  DOMAIN 02: DRUG & ALCOHOL", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=580)

c.setFont("Helvetica-Bold", 44)
c.setFillColor(WHITE)
c.drawString(80, H - 185, "What FMCSA looks for:")

items = [
    "Written Drug & Alcohol policy (49 CFR 382.601)",
    "Random testing consortium enrollment (382.305)",
    "Pre-employment testing record (382.301)",
    "Reasonable suspicion training for supervisors (382.603)",
    "Post-accident testing procedures documented (382.303)",
    "SAP referral records if applicable (382.605)",
    "MRO contact information on file",
]
bullet(c, items, 80, H - 290, size=22, dot_color=GOLD, spacing=50)

c.setFont("Helvetica-Bold", 22)
c.setFillColor(CORAL)
c.drawString(80, H - 680, "Deadly Sin #02 — No written policy | Sin #03 — Not enrolled in consortium")
c.setFont("Helvetica", 20)
c.setFillColor(GRAY)
c.drawString(80, H - 715, "These are the two most cited D&A violations in New Entrant audits.")

lp_footer(c)
slide_number(c, 12, TOTAL)
c.showPage()

# ─── SLIDE 13: DOMAINS 3-5 SUMMARY ───────────────────────────────
new_slide(c)
label(c, "AUDIT CHECKLIST  |  DOMAINS 03–05", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=500)

domain_blocks = [
    ("DOMAIN 03: HOS & DISPATCH", [
        "ELD device registered + functioning (395.8)",
        "Driver logs — 6 months minimum (395.8)",
        "HOS violation documentation (395.3)",
        "Time zone records for interstate ops",
    ]),
    ("DOMAIN 04: VEHICLE MAINTENANCE", [
        "Preventive maintenance schedule written (396.3)",
        "Driver Vehicle Inspection Reports — DVIR (396.11)",
        "Annual inspection records per vehicle (396.17)",
        "Repair orders for DVIR defects (396.11)",
    ]),
    ("DOMAIN 05: INSURANCE & AUTHORITY", [
        "MCS-90 endorsement on file (387.7)",
        "BMC-91 or BMC-91X (cargo insurance) (387.301)",
        "FMCSA proof of insurance filing current",
        "Authority registration — biennial MCS-150 filed",
    ]),
]
col_w3 = (W - 240) / 3
for i, (title, chk) in enumerate(domain_blocks):
    x = 80 + i * (col_w3 + 40)
    c.setFillColor(HexColor("#0d1e33"))
    c.roundRect(x, H - 820, col_w3, 640, 6, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.5)
    c.roundRect(x, H - 820, col_w3, 640, 6, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 16)
    c.setFillColor(GOLD)
    c.drawString(x + 20, H - 220, title)
    gold_rule(c, H - 244, x + 20, x + col_w3 - 20)
    for j, item in enumerate(chk):
        c.setFont("Helvetica", 16)
        c.setFillColor(WHITE)
        # wrap long items
        words = item.split()
        line = ""
        lines_out = []
        for w in words:
            test = line + " " + w if line else w
            if c.stringWidth(test, "Helvetica", 16) < col_w3 - 56:
                line = test
            else:
                lines_out.append(line)
                line = w
        lines_out.append(line)
        for k, ln in enumerate(lines_out):
            c.drawString(x + 36, H - 300 - j * 80 - k * 22, ln)

lp_footer(c)
slide_number(c, 13, TOTAL)
c.showPage()

# ─── SLIDE 14: THE LAUNCHPATH SYSTEM ─────────────────────────────
new_slide(c)
label(c, "THE LAUNCHPATH PROTECTION SYSTEM  |  LP-SYS-001", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=620)

c.setFont("Helvetica-Bold", 46)
c.setFillColor(WHITE)
c.drawString(80, H - 190, "Six steps. One system.")
c.setFont("Helvetica", 26)
c.setFillColor(GRAY)
c.drawString(80, H - 235, "The order is not optional.")

steps = [
    (GOLD,  "01", "REACH",         "Exposure diagnostic — GO / WAIT / NO-GO"),
    (GOLD,  "02", "GROUND 0",      "Orientation — posture before the build"),
    (GREEN, "03", "FOUR PILLARS",  "Protective structure — the guard"),
    (RED,   "04", "AUTO",          "Breach-path model — how failure tries to enter"),
    (RED,   "05", "16 DEADLY SINS","Threat taxonomy — what you are guarding against"),
    (GOLD,  "06", "MODULES",       "Installation sequence — build it in practice"),
]
sw = (W - 280) / 6
for i, (col, num, name, role) in enumerate(steps):
    x = 80 + i * (sw + 24)
    c.setFillColor(col)
    c.roundRect(x, H - 700, sw, 380, 6, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(NAVY if col == GOLD else WHITE)
    c.drawCentredString(x + sw / 2, H - 420, num)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(x + sw / 2, H - 450, name)
    # wrap role
    words = role.split(" — ")
    c.setFont("Helvetica", 14)
    c.drawCentredString(x + sw / 2, H - 490, words[0] + " —")
    if len(words) > 1:
        rw = words[1].split()
        l1, l2 = " ".join(rw[:4]), " ".join(rw[4:])
        c.drawCentredString(x + sw / 2, H - 512, l1)
        if l2:
            c.drawCentredString(x + sw / 2, H - 534, l2)
    # connector arrow
    if i < len(steps) - 1:
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 20)
        c.drawString(x + sw + 4, H - 505, "→")

c.setFont("Helvetica-Bold", 20)
c.setFillColor(GOLD_LITE)
c.drawCentredString(W / 2, H - 760,
    '"REACH reveals exposure. Ground 0 forms posture. Pillars build the guard. AUTO maps the breach. Sins name the threats. Modules install the protection."')

lp_footer(c)
slide_number(c, 14, TOTAL)
c.showPage()

# ─── SLIDE 15: 90/5/5 ─────────────────────────────────────────────
new_slide(c)
label(c, "THE INSTALLATION PLAN", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=400)

c.setFont("Helvetica-Bold", 48)
c.setFillColor(WHITE)
c.drawString(80, H - 185, "90 days. 5 domains. 5 checkpoints.")

stats = [("90", "Days to full installation"), ("5", "Compliance domains"), ("5", "Custodian checkpoints")]
sw2 = 340
for i, (num, label_text) in enumerate(stats):
    x = 80 + i * (sw2 + 60)
    c.setFont("Helvetica-Bold", 96)
    c.setFillColor(GOLD)
    c.drawString(x, H - 360, num)
    c.setFont("Helvetica", 22)
    c.setFillColor(WHITE)
    c.drawString(x, H - 400, label_text)

c.setFont("Helvetica-Bold", 28)
c.setFillColor(WHITE)
c.drawString(80, H - 490, "What you walk away with after 90 days:")

deliverables = [
    "A complete Driver Qualification file system",
    "A DOT-compliant Drug & Alcohol program",
    "HOS records architecture and ELD protocol",
    "A written Preventive Maintenance schedule",
    "Insurance and authority filing discipline",
    "A Verified Registry ID confirming completion",
]
bullet(c, deliverables, 80, H - 580, size=21, spacing=46)

lp_footer(c)
slide_number(c, 15, TOTAL)
c.showPage()

# ─── SLIDE 16: WHAT'S INCLUDED ────────────────────────────────────
new_slide(c)
label(c, "DOCUMENT SYSTEM BUNDLE  |  LP-BDL-001", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=520)

c.setFont("Helvetica-Bold", 22)
c.setFillColor(GRAY)
c.drawString(80, H - 160, "RECOMMENDED FOR MOST CARRIERS")
c.setFont("Helvetica-Bold", 54)
c.setFillColor(WHITE)
c.drawString(80, H - 230, "The Complete Document System Bundle")
c.setFont("Helvetica-Bold", 44)
c.setFillColor(GOLD)
c.drawString(80, H - 285, "$499  —  one-time payment")

includes = [
    ("All 5 domain compliance packets", "$323 value individually"),
    ("Folder architecture + file naming system", "Audit-ready organization"),
    ("0–30–60–90 implementation calendar", "Paced installation roadmap"),
    ("Master compliance checklist", "Single-page audit prep summary"),
]
for i, (item, note) in enumerate(includes):
    y = H - 400 - i * 80
    c.setFillColor(GOLD)
    c.circle(96, y + 8, 6, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 22)
    c.setFillColor(WHITE)
    c.drawString(120, y, item)
    c.setFont("Helvetica", 18)
    c.setFillColor(GRAY)
    c.drawString(120, y - 26, note)

c.setFillColor(HexColor("#0d1e33"))
c.roundRect(W - 600, H - 760, 500, 640, 8, fill=1, stroke=0)
c.setStrokeColor(GOLD)
c.setLineWidth(2)
c.roundRect(W - 600, H - 760, 500, 640, 8, fill=0, stroke=1)
c.setFont("Helvetica-Bold", 18)
c.setFillColor(GRAY)
c.drawCentredString(W - 350, H - 200, "INDIVIDUAL DOMAIN PACKETS")
for j, (dom, price) in enumerate([
    ("New Entrant Safety", "$109"), ("DQ File Builder", "$129"),
    ("Drug & Alcohol", "$129"), ("HOS & Dispatch", "$119"),
    ("Vehicle Maintenance", "$119"),
]):
    c.setFont("Helvetica", 17)
    c.setFillColor(WHITE)
    c.drawString(W - 570, H - 270 - j * 56, dom)
    c.setFont("Helvetica-Bold", 17)
    c.setFillColor(GRAY)
    c.drawRightString(W - 110, H - 270 - j * 56, price)
c.setFont("Helvetica-Bold", 18)
c.setFillColor(GRAY)
c.drawString(W - 570, H - 560, "Individual total:")
c.setFillColor(GRAY)
c.drawRightString(W - 110, H - 560, "$605")
c.setStrokeColor(GOLD)
c.line(W - 570, H - 578, W - 110, H - 578)
c.setFont("Helvetica-Bold", 22)
c.setFillColor(GOLD)
c.drawString(W - 570, H - 620, "Bundle price:")
c.drawRightString(W - 110, H - 620, "$499")
c.setFont("Helvetica", 16)
c.setFillColor(GREEN)
c.drawCentredString(W - 350, H - 660, "You save $106")

lp_footer(c)
slide_number(c, 16, TOTAL)
c.showPage()

# ─── SLIDE 17: REACH DIAGNOSTIC ───────────────────────────────────
new_slide(c)
label(c, "START HERE  |  THE REACH DIAGNOSTIC", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=460)

c.setFont("Helvetica-Bold", 60)
c.setFillColor(WHITE)
c.drawString(80, H - 210, "Before you spend a dollar —")
c.setFont("Helvetica-Bold", 60)
c.setFillColor(GOLD)
c.drawString(80, H - 285, "know where you are exposed.")

c.setFont("Helvetica", 26)
c.setFillColor(WHITE)
c.drawString(80, H - 370, "The REACH Diagnostic is a free 15-minute assessment that maps your")
c.drawString(80, H - 405, "current compliance exposure across all 6 FMCSA domains.")

outcomes = [
    (GREEN, "GO",   "You are ready to build. Proceed to Ground 0."),
    (GOLD,  "WAIT", "Gaps identified. Address flagged areas first."),
    (RED,   "NO-GO","Significant exposure. Stop and remediate before proceeding."),
]
for i, (col, result, desc) in enumerate(outcomes):
    y = H - 540 - i * 100
    c.setFillColor(col)
    c.roundRect(80, y - 8, 120, 52, 6, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 26)
    c.setFillColor(NAVY if col == GOLD else WHITE)
    c.drawCentredString(140, y + 20, result)
    c.setFont("Helvetica", 24)
    c.setFillColor(WHITE)
    c.drawString(228, y + 20, desc)

c.setFillColor(GOLD)
c.roundRect(80, 76, 680, 68, 8, fill=1, stroke=0)
c.setFont("Helvetica-Bold", 26)
c.setFillColor(NAVY)
c.drawCentredString(420, 118, "TAKE THE FREE REACH DIAGNOSTIC  →  launchpathedu.com/reach-diagnostic")

lp_footer(c)
slide_number(c, 17, TOTAL)
c.showPage()

# ─── SLIDE 18: TESTIMONIAL / SOCIAL PROOF ─────────────────────────
new_slide(c)
new_slide(c, NAVY_MID)
label(c, "WHY LAUNCHPATH", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=340)

c.setFont("Helvetica-Bold", 56)
c.setFillColor(WHITE)
c.drawString(80, H - 200, "Built by someone who has watched")
c.setFillColor(GOLD)
c.drawString(80, H - 268, "this break in the real world.")

c.setFont("Helvetica", 26)
c.setFillColor(WHITE)
c.drawString(80, H - 360, "Vince Lawrence — Navy veteran. OSHA-certified. 25+ years operational leadership.")

credentials = ["Navy Veteran", "OSHA-Certified Safety Professional", "25+ Years Operational Leadership", "Founder, LaunchPath EDU"]
for i, cred in enumerate(credentials):
    x = 80 + i * 440
    c.setFillColor(HexColor("#0d1e33"))
    c.roundRect(x, H - 620, 400, 100, 6, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.roundRect(x, H - 620, 400, 100, 6, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(GOLD)
    words = cred.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, "Helvetica-Bold", 18) < 360:
            cur = test
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    for j, ln in enumerate(lines):
        c.drawCentredString(x + 200, H - 544 + (len(lines) - j - 1) * 24, ln)

c.setFont("Helvetica", 22)
c.setFillColor(GOLD_LITE)
c.drawString(80, H - 700, '"LaunchPath is not a course funnel. It is a governed standard. The system either protects the authority or it does not."')

lp_footer(c)
slide_number(c, 18, TOTAL)
c.showPage()

# ─── SLIDE 19: NEXT STEPS ─────────────────────────────────────────
new_slide(c)
label(c, "YOUR NEXT STEPS", 80, H - 80, size=20)
gold_rule(c, H - 100, x2=360)

c.setFont("Helvetica-Bold", 52)
c.setFillColor(WHITE)
c.drawString(80, H - 190, "Three paths. Start where you are.")

steps_data = [
    ("01", GOLD,  "NOT SURE WHERE YOU STAND?",
     "Take the free REACH Diagnostic.", "launchpathedu.com/reach-diagnostic"),
    ("02", GREEN, "READY TO ORIENT?",
     "Start Ground 0 — free, 20 minutes.", "launchpathedu.com/ground-0-briefing"),
    ("03", GOLD,  "READY TO INSTALL?",
     "Get the Document System Bundle.", "launchpathedu.com/compliance-library"),
]
sw3 = (W - 280) / 3
for i, (num, col, title, body_text, url) in enumerate(steps_data):
    x = 80 + i * (sw3 + 60)
    c.setFillColor(HexColor("#0d1e33"))
    c.roundRect(x, H - 780, sw3, 500, 8, fill=1, stroke=0)
    c.setStrokeColor(col)
    c.setLineWidth(3)
    c.roundRect(x, H - 780, sw3, 500, 8, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 42)
    c.setFillColor(col)
    c.drawCentredString(x + sw3 / 2, H - 360, num)
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(WHITE)
    words = title.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, "Helvetica-Bold", 20) < sw3 - 40:
            cur = test
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    for j, ln in enumerate(lines):
        c.drawCentredString(x + sw3 / 2, H - 430 - j * 28, ln)
    c.setFont("Helvetica", 18)
    c.setFillColor(GRAY)
    c.drawCentredString(x + sw3 / 2, H - 540, body_text)
    c.setFont("Helvetica-Bold", 15)
    c.setFillColor(col)
    c.drawCentredString(x + sw3 / 2, H - 590, url)

lp_footer(c)
slide_number(c, 19, TOTAL)
c.showPage()

# ─── SLIDE 20: CLOSING ────────────────────────────────────────────
new_slide(c)
c.setFillColor(GOLD)
c.rect(0, H - 6, W, 6, fill=1, stroke=0)

c.setFont("Helvetica-Bold", 18)
c.setFillColor(GOLD)
c.drawCentredString(W / 2, H - 80, "LP-GUIDE-001  |  LAUNCHPATH EDU  |  launchpathedu.com")

c.setFont("Helvetica-Bold", 76)
c.setFillColor(WHITE)
c.drawCentredString(W / 2, H / 2 + 100, "The system either protects")
c.setFillColor(GOLD)
c.drawCentredString(W / 2, H / 2 + 10, "the authority —")
c.setFillColor(WHITE)
c.drawCentredString(W / 2, H / 2 - 80, "or it doesn't.")

gold_rule(c, H / 2 - 140, W / 2 - 400, W / 2 + 400)

c.setFont("Helvetica", 26)
c.setFillColor(GRAY)
c.drawCentredString(W / 2, H / 2 - 210, "launchpathedu.com  |  FMCSA Compliance for New Motor Carriers")

c.setFillColor(GOLD)
c.roundRect(W / 2 - 400, 120, 800, 72, 8, fill=1, stroke=0)
c.setFont("Helvetica-Bold", 28)
c.setFillColor(NAVY)
c.drawCentredString(W / 2, 165, "TAKE THE FREE REACH DIAGNOSTIC  →  launchpathedu.com/reach-diagnostic")

slide_number(c, 20, TOTAL)
c.save()
print(f"Done: {OUT}")
import os
size_kb = os.path.getsize(OUT) // 1024
print(f"File size: {size_kb} KB")
