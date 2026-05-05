"""
Post all 16 LaunchPath Pinterest pins via Pinterest API v5
"""
import requests, json, time, os

TOKEN = os.environ.get("PINTEREST_ACCESS_TOKEN")
BASE  = "https://api.pinterest.com/v5"
SITE  = "https://launchpathedu.com"
IMG   = "https://launchpathedu.com/images/pinterest"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

# ── Existing boards to reuse ──────────────────────────────────────
BOARD_DRIVER_QUALS    = "771523048604639654"   # Driver Quals
BOARD_TRUCKING_BIZ    = "771523048603804564"   # Trucking Business

def create_board(name, description):
    r = requests.post(f"{BASE}/boards",
        headers=HEADERS,
        json={"name": name, "description": description, "privacy": "PUBLIC"})
    d = r.json()
    if "id" in d:
        print(f"  Created board: {name} ({d['id']})")
        return d["id"]
    print(f"  Board error: {d}")
    return None

def create_pin(board_id, title, description, img_file, link):
    payload = {
        "board_id": board_id,
        "title": title,
        "description": description,
        "link": link,
        "media_source": {
            "source_type": "image_url",
            "url": f"{IMG}/{img_file}",
        },
    }
    r = requests.post(f"{BASE}/pins", headers=HEADERS, json=payload)
    d = r.json()
    if "id" in d:
        print(f"  ✓ Pin created: {title[:50]}")
        return d["id"]
    print(f"  ✗ Pin error for {title}: {d.get('message', d)}")
    return None

def main():
    print("\n=== Step 1: Creating new boards ===")
    board_fmcsa = create_board(
        "FMCSA Compliance — New Motor Carriers",
        "FMCSA compliance systems, domain checklists, and audit preparation resources for new motor carriers."
    )
    time.sleep(1)
    board_startup = create_board(
        "Trucking Startup Guide",
        "Step-by-step guidance for launching a compliant trucking operation — Ground 0, documents, and DOT requirements."
    )
    time.sleep(1)

    print("\n=== Step 2: Posting domain compliance pins ===")
    domain_pins = [
        ("New Entrant Safety Program — FMCSA Compliance for New Motor Carriers",
         "Start compliant. Stay protected. The New Entrant Safety Program packet covers everything FMCSA checks in your first 18 months — authority filings, insurance, and operating discipline. Build the system before the audit window opens. #FMCSA #NewEntrant #TruckingCompliance #DOTCompliance #MotorCarrier",
         "pin_domain_new_entrant.webp", f"{SITE}/products/new-entrant"),
        ("DQ File Builder — Driver Qualification Files for Motor Carriers",
         "Missing a DQ file is the most common FMCSA violation. The DQ File Builder packet gives you all 8 required components pre-built and audit-ready. MVR, medical cert, road test, Clearinghouse query — all included. #DriverQualification #DQFile #FMCSA #TruckingCompliance #DOT",
         "pin_domain_dq.webp", f"{SITE}/products/dq-file-builder"),
        ("Drug & Alcohol Compliance Program — DOT Requirements for Motor Carriers",
         "Build the DOT-compliant Drug & Alcohol program FMCSA requires. Written policy, random testing consortium enrollment, pre-employment testing records — everything in one packet. #DrugAndAlcohol #DOTCompliance #FMCSA #TruckingBusiness #MotorCarrier",
         "pin_domain_drug.webp", f"{SITE}/products/drug-alcohol"),
        ("HOS & Dispatch Compliance — Hours of Service for New Carriers",
         "ELD records, driver logs, dispatch documentation — the HOS & Dispatch packet covers every record FMCSA checks. Stop guessing what goes in the file. #HoursOfService #ELD #FMCSA #TruckingCompliance #DOT",
         "pin_domain_hos.webp", f"{SITE}/products/hos-dispatch"),
        ("Vehicle Maintenance Compliance — PM Schedule & DVIR for Motor Carriers",
         "A written PM schedule and signed DVIRs are required — not optional. The Vehicle Maintenance packet gives you the templates, checklists, and inspection records FMCSA looks for. #VehicleMaintenance #DVIR #FMCSA #TruckingCompliance #PreTripInspection",
         "pin_domain_maintenance.webp", f"{SITE}/products/vehicle-maintenance"),
        ("Insurance Continuity Packet — FMCSA Filing & Coverage for New Carriers",
         "An insurance lapse — even one day — puts your authority at risk. The Insurance Continuity packet covers MCS-90, BMC-91, and the filing discipline to keep your authority active. #TruckingInsurance #FMCSA #MotorCarrier #AuthorityProtection #DOT",
         "pin_domain_insurance.webp", f"{SITE}/products/insurance-continuity"),
    ]
    for title, desc, img, link in domain_pins:
        create_pin(board_fmcsa or BOARD_DRIVER_QUALS, title, desc, img, link)
        time.sleep(1.2)

    print("\n=== Step 3: Posting compliance library pins ===")
    library_pins = [
        ("Complete DIY Compliance Library — All 8 LaunchPath Documents",
         "Every document LaunchPath publishes in one library. 8 compliance resources covering all 6 FMCSA domains — $699, instant access, one-time payment. Save $273 vs buying individually. #TruckingCompliance #FMCSA #MotorCarrier #DIYCompliance #TruckingBusiness",
         "pin_library.webp", f"{SITE}/products/library"),
        ("Document System Bundle — Complete FMCSA Compliance for $499",
         "The complete document system for new motor carriers. 5 domain packets + folder architecture + 90-day implementation calendar + master checklist. Install it yourself. Pass the audit. #FMCSACompliance #TruckingStartup #DocumentSystem #NewCarrier #DOT",
         "pin_bundle.webp", f"{SITE}/compliance-library"),
    ]
    for title, desc, img, link in library_pins:
        create_pin(board_fmcsa or BOARD_TRUCKING_BIZ, title, desc, img, link)
        time.sleep(1.2)

    print("\n=== Step 4: Posting Ground 0 / startup pins ===")
    g0_pins = [
        ("Ground 0 — Free FMCSA Orientation for New Motor Carriers",
         "Before you spend a dollar on compliance — take Ground 0. Free, 20 minutes. Understand what you're building, why the order matters, and what FMCSA actually checks. No purchase required. #Ground0 #FMCSA #TruckingStartup #NewCarrier #FMCSACompliance",
         "pin_g0_truck.webp", f"{SITE}/ground-0-briefing"),
        ("Starting a Trucking Company? Do This First.",
         "Most new carriers skip the foundation and go straight to paperwork. Ground 0 is the orientation step that fixes that. Free, 20 minutes, no email required. #StartATruckingCompany #TruckingBusiness #FMCSA #NewEntrant #MotorCarrier",
         "pin_g0_road.webp", f"{SITE}/ground-0-briefing"),
        ("FMCSA New Entrant Audit — What to Study",
         "The FMCSA New Entrant Safety Audit checks 6 domains. Most carriers have gaps in 3 or 4 of them before Day 1. Start with the free REACH Diagnostic to find yours. #FMCSAAudit #NewEntrant #TruckingCompliance #FMCSA #DOT",
         "pin_g0_study.webp", f"{SITE}/reach-diagnostic"),
        ("The REACH Diagnostic — Free FMCSA Compliance Gap Check",
         "15 minutes. 6 domains. GO, WAIT, or NO-GO. The REACH Diagnostic maps your compliance exposure before you spend a dollar on documents. Free, no purchase required. #REACHDiagnostic #FMCSACompliance #TruckingStartup #NewCarrier #MotorCarrier",
         "pin_g0_starter.webp", f"{SITE}/reach-diagnostic"),
    ]
    for title, desc, img, link in g0_pins:
        create_pin(board_startup or BOARD_TRUCKING_BIZ, title, desc, img, link)
        time.sleep(1.2)

    print("\n=== Step 5: Posting Knowledge Center pins ===")
    kc_pins = [
        ("Complete Audit Binder Series — 6 FMCSA Compliance Checklists",
         "All 6 FMCSA compliance checklists in one free printable PDF. New Entrant, HOS, Drug & Alcohol, Maintenance, Insurance, Authority Registrations. Download free — no email required. #FMCSAChecklist #TruckingCompliance #AuditBinder #DOT #MotorCarrier",
         "pin_kc_binder.webp", f"{SITE}/knowledge-center/how-to-start-a-trucking-company"),
        ("FMCSA New Entrant Safety Audit Checklist — What They Check",
         "A full breakdown of everything FMCSA looks for in the New Entrant Safety Audit — all 6 domains, all required documents, CFR citations included. Free guide. #FMCSAAudit #NewEntrant #TruckingChecklist #DOTCompliance #MotorCarrier",
         "pin_kc_checklist.webp", f"{SITE}/knowledge-center/new-entrant-safety-audit-checklist"),
        ("Driver Qualification File Requirements — FMCSA 49 CFR 391",
         "The DQ file has 8 required components. Most carriers have 4 or 5. Here's exactly what goes in a compliant Driver Qualification file — with CFR citations. Free guide. #DriverQualification #DQFile #FMCSA #49CFR391 #TruckingCompliance",
         "pin_kc_documents.webp", f"{SITE}/knowledge-center/driver-qualification-file-requirements-fmcsa"),
        ("FMCSA Compliance Workspace — Build It Before the Audit",
         "The document system doesn't have to be complicated — but it does have to exist. Here's how new motor carriers build an audit-ready compliance workspace in 90 days. #TruckingCompliance #FMCSA #DocumentSystem #NewCarrier #MotorCarrier",
         "pin_kc_workspace.webp", f"{SITE}/compliance-library"),
    ]
    for title, desc, img, link in kc_pins:
        create_pin(board_startup or BOARD_TRUCKING_BIZ, title, desc, img, link)
        time.sleep(1.2)

    print("\n=== All pins posted ===")

if __name__ == "__main__":
    main()
