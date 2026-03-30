import { T, mono, serif, display } from "../tokens";
import { CheckItem, GoldDivider, SectionLabel, section } from "../SharedComponents";

export default function WhatIsIncludedSection() {
  const blocks = [
    {
      code: "LP-DEL-01 · CURRICULUM", title: "10 MODULES · 72 LESSONS · 17 HOURS",
      body: "Ground 0 orientation through Module 9 broker and freight network. Every lesson is implementation-focused — you leave each one with something built, not something memorized.",
      items: ["Business & Authority Setup", "Driver Qualification System", "Drug & Alcohol Compliance", "Hours of Service & Dispatch", "Preventive Maintenance & Vehicle Files", "Insurance & Authority Continuity", "Post-Failure Recovery", "Load Profitability & Financial Structure", "Broker Relationships & Freight Network"],
    },
    {
      code: "LP-DEL-02 · DOCUMENT SYSTEM PACKETS", title: "5 COMPLIANCE PACKETS · 30+ FEDERAL FORMS",
      body: "One packet per compliance domain. Every form mapped to its CFR citation. Built to pass the first document request — not just to exist in a folder.",
      items: ["Packet 1 — Driver Qualification File System", "Packet 2 — Drug & Alcohol Program Documentation", "Packet 3 — Hours of Service & ELD Records", "Packet 4 — Preventive Maintenance & Vehicle Files", "Packet 5 — Insurance & Authority Continuity"],
    },
    {
      code: "LP-DEL-03 · STATION CUSTODIAN ACCESS", title: "5 VERIFICATION CHECKPOINTS · DIRECT ACCESS THROUGHOUT",
      body: "Not automated. Not AI-reviewed. Vince Lawrence reviews your actual compliance files at five structured milestones — the same way an FMCSA investigator would.",
      items: ["Checkpoint 01 — Week 1 · Authority Foundation", "Checkpoint 02 — Week 4 · Implementation Sequence Audit", "Checkpoint 03 — Week 7 · Mid-Point Documentation Review", "Checkpoint 04 — Week 11 · Pre-Audit Simulation", "Checkpoint 05 — Week 13 · Integrity Audit"],
    },
    {
      code: "LP-DEL-04 · OPERATOR PORTAL", title: "90-DAY IMPLEMENTATION DASHBOARD",
      body: "Your portal tracks every task, every milestone, and every checkpoint across the full 90-day window.",
      items: ["Implementation sequence by week", "Administrative Signal tracking", "Module progress and lesson completion", "Document submission for custodian review", "Direct communication with Station Custodian"],
    },
    {
      code: "LP-DEL-05 · PRE-AUDIT SIMULATION", title: "WEEK 11 · AUDIT REHEARSAL",
      body: "Before the FMCSA New Entrant Audit window opens, your installed systems are walked against the 16 documented failure patterns. This is the closest thing to a real audit you can run without an investigator in the room.",
      items: ["Gaps identified on your timeline — not theirs", "Walked against all 16 exposure patterns", "Correction window before audit arrives"],
    },
    {
      code: "LP-DEL-06 · VERIFIED REGISTRY ID", title: "LP-VRF · ISSUED AT COMPLETION",
      body: "When all six compliance domains pass the Integrity Audit, the LaunchPath Verified Registry ID is issued. LP-VRF is your documented proof that the compliance infrastructure was installed, verified, and built under the Standard — not assembled under audit pressure.",
      items: ["No other program issues this credential"],
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
