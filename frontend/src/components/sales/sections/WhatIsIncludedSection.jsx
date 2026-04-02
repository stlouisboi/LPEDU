import { T, mono, serif, display } from "../tokens";
import { CheckItem, GoldDivider, SectionLabel, section } from "../SharedComponents";

export default function WhatIsIncludedSection() {
  const blocks = [
    {
      code: "LP-DEL-01 · CURRICULUM", title: "10 MODULES · 72 LESSONS · 17 HOURS",
      body: "Ground 0 through Module 9. Every lesson is implementation-focused — you leave each one with something built, not something memorized.",
      items: [
        "Ground 0: The Wisdom Module",
        "Module 1: Driver Qualification File",
        "Module 2: Authority & Insurance",
        "Module 3: The 16 Deadly Sins",
        "Module 4: Drug & Alcohol Program",
        "Module 5: Hours of Service & Dispatch",
        "Module 6: Integrity Audit",
        "Module 7: Post-Audit Recovery",
        "Module 8: ELD Compliance",
        "Module 9: Hazmat Decisions",
      ],
      note: "Modules 7–9 are included in enrollment. Module 7 activates conditionally. Modules 8–9 are extension modules. The Verified Registry ID is issued at Module 6 completion.",
    },
    {
      code: "LP-DEL-02 · DOCUMENT SYSTEM PACKETS", title: "5 COMPLIANCE PACKETS · 30+ FEDERAL FORMS",
      body: "One packet per compliance domain. Every form mapped to its CFR citation. Built to pass the first document request — not just to exist in a folder.",
      items: [
        "Packet 1 — DQ File Builder Kit: completed employment applications, MVRs, medical certificates, and pre-employment test results — one file per driver, built to 49 CFR Part 391.",
        "Packet 2 — Drug & Alcohol Compliance Packet: signed DER designation, C/TPA enrollment confirmation, and pre-employment test documentation on file before first dispatch.",
        "Packet 3 — HOS & Dispatch Compliance Packet: ELD device registration, in-cab instruction sheet, malfunction procedure, and HOS policy with driver acknowledgement signatures.",
        "Packet 4 — Maintenance & Unit File Packet: printed and digital unit file for every power unit — annual inspection on file, DVIRs current, repair documentation organized.",
        "Packet 5 — Insurance & Authority Packet: BMC-91 filing confirmation, renewal calendar, and internal lapse-prevention checklist in place.",
      ],
    },
    {
      code: "LP-DEL-03 · STATION CUSTODIAN ACCESS", title: "5 VERIFICATION CHECKPOINTS · DIRECT ACCESS THROUGHOUT",
      body: "Not automated. Not AI-reviewed. Vince Lawrence reviews your actual compliance files at five structured milestones — the same way an FMCSA investigator would.",
      items: [
        "Checkpoint 01 — Week 1: Authority Foundation. Custodian reviews your actual DQ file, D&A enrollment confirmation, insurance certificate, and UCR registration. Verified or flagged before you advance.",
        "Checkpoint 02 — Week 4: Implementation Sequence Audit. Every active compliance task reviewed against the Standard. You receive a written advance confirmation or a documented correction window.",
        "Checkpoint 03 — Week 7: Mid-Point Documentation Review. DQ, D&A, HOS, maintenance, and insurance files reviewed simultaneously against operational reality — not just policy intent. Systems verified as built, not planned.",
        "Checkpoint 04 — Week 11: Pre-Audit Simulation. Installed systems walked against all 16 documented exposure patterns. Gaps identified on your timeline — not the investigator's. Written correction window issued where needed.",
        "Checkpoint 05 — Week 13: Integrity Audit. All six compliance domains reviewed against the final Standard. All pass — the Verified Registry ID is issued. This is the document you hold at Day 90.",
      ],
    },
    {
      code: "LP-DEL-04 · OPERATOR PORTAL", title: "90-DAY IMPLEMENTATION DASHBOARD",
      body: "Your portal tracks every task, every milestone, and every checkpoint across the full 90-day window.",
      items: ["Implementation sequence by week", "Administrative Signal tracking", "Module progress and lesson completion", "Document submission for custodian review", "Direct communication with Station Custodian"],
    },
    {
      code: "LP-DEL-05 · PRE-AUDIT SIMULATION", title: "WEEK 11 · AUDIT REHEARSAL",
      body: "Before the FMCSA New Entrant Audit window opens, your installed systems are walked against the 16 documented failure patterns. This is the closest thing to a real audit you can run without an investigator in the room.",
      items: [
        "A written gap report identifying every exposure pattern found in your installed systems — before the audit window, not during it.",
        "A documented correction window with specific items to close before the New Entrant audit arrives.",
        "Confirmation that your installed systems have been walked against all 16 documented failure patterns.",
      ],
    },
    {
      code: "LP-DEL-06 · VERIFIED REGISTRY ID", title: "LP-VRF · ISSUED AT COMPLETION",
      body: "When all six compliance domains pass the Integrity Audit, the LaunchPath Verified Registry ID is issued. LP-VRF is your documented proof that the compliance infrastructure was installed, verified, and built under the Standard — not assembled under audit pressure.",
      items: [
        "A Verified Registry ID — issued in your carrier name, documenting that all six core compliance domains were installed, verified, and passed the Integrity Audit under the LaunchPath Standard.",
        "A documented installation record showing the date each domain was verified by the Station Custodian.",
        "Written confirmation that your compliance infrastructure was built under the Standard — not assembled under audit pressure.",
        "No other program issues this credential.",
      ],
      highlight: true,
    },
  ];

  return section(
    <>
      <SectionLabel>LP-STD-001 · DELIVERABLES · FULL SYSTEM INVENTORY</SectionLabel>
      <h2 className="section-headline" style={{ ...display, fontSize: 48, fontWeight: 800, color: T.white, lineHeight: 1.1, maxWidth: 680, marginBottom: 20 }}>
        Everything That Gets<br />
        <span style={{ color: T.goldText }}>Installed in 90 Days.</span>
      </h2>
      <p style={{ ...serif, fontSize: 18, color: T.mist, lineHeight: 1.8, maxWidth: 620, marginBottom: 64 }}>
        This is not a list of videos to watch.
        This is the infrastructure that gets built, verified, and documented in your operation.
      </p>

      <div className="two-col" style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {blocks.map((b, i) => (
          <div key={i} style={{
            flex: "1 1 calc(50% - 1px)", minWidth: 280,
            background: b.highlight ? `linear-gradient(135deg, ${T.navyCard}, #1A2540)` : T.navyCard,
            border: `1px solid ${b.highlight ? T.gold : T.navyBorder}`,
            padding: "32px",
          }}>
            <p style={{ ...mono, fontSize: 11, color: T.goldText, letterSpacing: "0.14em", marginBottom: 8 }}>{b.code}</p>
            <p style={{ ...mono, fontSize: 12, color: T.white, letterSpacing: "0.08em", marginBottom: 16, fontWeight: 600 }}>{b.title}</p>
            <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.8, marginBottom: 20 }}>{b.body}</p>
            {b.items.map((item, j) => (
              <CheckItem key={j} accent={b.highlight ? T.gold : T.goldDim}>{item}</CheckItem>
            ))}
            {b.note && (
              <p style={{ ...mono, fontSize: 11, color: T.fog, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.navyBorder}` }}>{b.note}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}`, padding: "48px", marginTop: 2, textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 11, color: T.gold, letterSpacing: "0.14em", marginBottom: 24 }}>THE REAL COST COMPARISON</p>
        <p style={{ ...serif, fontSize: 17, color: T.mist, lineHeight: 1.85, maxWidth: 640, margin: "0 auto 18px" }}>
          Compliance consultant — $300–$500/hr. Five verification checkpoints at consultant rates — $1,500–$2,500 alone.
        </p>
        <p style={{ ...serif, fontSize: 18, color: T.white, lineHeight: 1.85, maxWidth: 640, margin: "0 auto 18px" }}>
          The LaunchPath Standard delivers the full curriculum, all five document packets,
          five human verification checkpoints, the pre-audit simulation, the Operator Portal,
          and the Verified Registry ID —
        </p>
        <p style={{ ...display, fontSize: 26, color: T.goldText, fontWeight: 700, marginBottom: 10 }}>for $2,500.</p>
        <p style={{ ...serif, fontSize: 16, color: T.fog }}>Or $3,000 phased over 45 days.</p>
        <GoldDivider />
        <p style={{ ...display, fontSize: 22, color: T.white, fontWeight: 700 }}>One audit failure costs more than either.</p>
      </div>
    </>,
    T.navy
  );
}
