import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const gold = "#d4900a";
const darkBg = "#0b1628";
const midBg = "#0d1c30";
const MONO = "'Inter', sans-serif";
const COND = "'Playfair Display', serif";
const SANS = "'Inter', sans-serif";
const BORDER = "rgba(255,255,255,0.07)";

const sectionLabel = {
  fontFamily: MONO, fontSize: "0.762rem", fontWeight: 700,
  letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "0.75rem",
};

const DIRECTIONS = [
  {
    vector: "AROUND",
    direction: "Around",
    pillar: "Insurance Continuity",
    threat: "Insurance Exposure",
    body: "Risk that moves around your operation through gaps in coverage — missed payments, policy lapses, or operating outside declared lanes. The authority survives on paper while the protection behind it disappears.",
    failurePoints: [
      "Insurance cancellation due to missed payment",
      "Operating outside declared coverage area",
      "Carrier policy non-renewal without replacement",
      "Insurance gaps following claims",
    ],
    cfr: "49 CFR 387.7, 387.9",
    cfrNote: "Financial Responsibility, Filing Requirements",
  },
  {
    vector: "UNDER",
    direction: "Under",
    pillar: "Compliance Backbone",
    threat: "Documentation Failure",
    body: "Risk that enters from beneath the operation through missing or incomplete documentation infrastructure. When FMCSA inspectors arrive, the records that should exist do not.",
    failurePoints: [
      "Missing Driver Qualification files",
      "Incomplete maintenance documentation",
      "Missing vehicle inspection records",
      "Clearinghouse query gaps",
    ],
    cfr: "49 CFR 391.51, 382.701",
    cfrNote: "Driver Qualification Files, Clearinghouse Queries",
  },
  {
    vector: "THROUGH",
    direction: "Through",
    pillar: "Authority Protection",
    threat: "Operational Violations",
    body: "Risk that passes directly through the operation via driver behavior and HOS violations. The authority is technically compliant on paper but operationally non-compliant in the field.",
    failurePoints: [
      "Hours-of-Service violations",
      "Unassigned ELD records",
      "Driver falsification of logs",
      "Non-compliant ELD operation in the cab",
    ],
    cfr: "49 CFR 395.8, 396.11",
    cfrNote: "Hours of Service Records, Driver Vehicle Inspection Reports",
  },
  {
    vector: "OVER",
    direction: "Over",
    pillar: "Cash-Flow Oxygen",
    threat: "Financial Collapse",
    body: "Risk that overwhelms the operation from above through financial pressure. The authority survives compliance but cannot survive the economics of early operations without a documented financial structure.",
    expanded: true,
    failurePoints: [
      "Insufficient cash reserves for early operations",
      "Poor cost-per-mile tracking",
      "Freight payment delays without runway",
      "Repair costs exceeding operating capital",
    ],
    extraBody: "This is the vector most operators miss. They assume compliance and finances are separate concerns. They're not. When cash flow tightens, operators take loads below their rate floor. They delay maintenance. They skip random testing payments. They push drivers past HOS limits to make delivery windows. Financial pressure doesn't cause one violation — it causes a cascade across all four pillars.\n\nFMCSA doesn't audit your bank account. But they audit the decisions you made when your bank account was empty.",
    cfr: "49 CFR 395, 396, 382, 387",
    cfrNote: "Financial collapse triggers violations across HOS, Maintenance, D&A, and Insurance domains simultaneously",
  },
];

const GUARDS = [
  {
    code: "LP-GRD-01",
    name: "Driver Guard",
    blocks: "UNDER vector",
    blocksDetail: "Driver qualification and DQ file exposure",
    desc: "The Driver Guard installs complete Driver Qualification File systems for every driver under your authority. It blocks unqualified drivers from dispatch, ensures medical certificates are current before operation, and maintains the documentation structure investigators expect to see.",
    consequence: "Without this guard, a single missing document can trigger a conditional rating that freezes your entire operation.",
    cfr: "49 CFR 391.51",
    cfrNote: "Driver Qualification Files",
  },
  {
    code: "LP-GRD-02",
    name: "Drug Guard",
    blocks: "UNDER vector",
    blocksDetail: "Drug & Alcohol program violations and Clearinghouse exposure",
    desc: "The Drug Guard installs compliant Drug & Alcohol program enrollment, ensures pre-employment and random testing protocols are followed, and maintains Clearinghouse query documentation. It blocks the \"Ghost Driver\" pattern — dispatching drivers before test results are filed.",
    consequence: "Without this guard, a positive result returned after dispatch creates retroactive violation exposure across every load that driver ran.",
    cfr: "49 CFR 382.301, 382.701",
    cfrNote: "Drug Testing, Clearinghouse Queries",
  },
  {
    code: "LP-GRD-03",
    name: "Log Guard",
    blocks: "THROUGH vector",
    blocksDetail: "HOS violations and ELD compliance failures",
    desc: "The Log Guard installs Hours-of-Service compliance documentation, ELD instruction protocols, and supporting records for violation response. It blocks falsified logs, unregistered ELD operation, and the documentation gaps that convert roadside inspections into audit triggers.",
    consequence: "Without this guard, HOS violations accumulate invisibly until an investigator pulls the records.",
    cfr: "49 CFR 395.8, 395.22",
    cfrNote: "HOS Records, ELD Requirements",
  },
  {
    code: "LP-GRD-04",
    name: "Shop Guard",
    blocks: "ALL VECTORS",
    blocksDetail: "Maintenance and vehicle inspection failures",
    allVectors: true,
    desc: "The Shop Guard installs vehicle maintenance record systems, DVIR documentation protocols, and annual inspection tracking. It crosses all four AUTO vectors because maintenance failures can trigger insurance exposure, documentation gaps, operational violations, and regulatory enforcement simultaneously.",
    consequence: "Without this guard, a single uninspected unit can shut down a roadside encounter and accelerate audit scheduling.",
    cfr: "49 CFR 396.3, 396.11, 396.17",
    cfrNote: "Maintenance, DVIR, Annual Inspection",
  },
];

const PILLARS = [
  { label: "Authority Protection", desc: "The authority itself — MC number, operating status, and DOT compliance record." },
  { label: "Insurance Continuity", desc: "Active, correctly structured coverage maintained without interruption." },
  { label: "Compliance Backbone", desc: "Documentation systems — DQ files, maintenance records, drug programs." },
  { label: "Cash-Flow Oxygen", desc: "Financial runway sufficient to sustain operations through early volatility." },
];

export default function AutoMethodPage() {
  return (
    <div style={{ fontFamily: SANS, background: midBg, minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <div style={{ background: darkBg, padding: "100px 24px 80px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={sectionLabel}>THE AUTO METHOD — RISK DOCTRINE</p>
          <h1 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem",
          }}>
            Risk does not ask permission to attack an authority.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.82, maxWidth: 620, marginBottom: "1.25rem" }}>
            AUTO is not a checklist. It is a doctrine that maps every direction from which operational failure approaches a motor carrier authority.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, maxWidth: 600 }}>
            Most authorities do not fail from one catastrophic mistake. They fail because risk entered from a direction that was never guarded — around the coverage, under the documentation, through the operations, or over the financial runway.
          </p>
        </div>
      </div>

      {/* ── 2. A/U/T/O STRIP (expanded, prominent) ──────────── */}
      <div style={{ padding: "72px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={sectionLabel}>WHAT AUTO DESCRIBES</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", background: `rgba(212,144,10,0.15)` }} className="auto-strip">
            {[
              { v: "A", dir: "AROUND", sub: "Insurance\nExposure" },
              { v: "U", dir: "UNDER", sub: "Documentation\nFailures" },
              { v: "T", dir: "THROUGH", sub: "Operations\nViolations" },
              { v: "O", dir: "OVER", sub: "Financial\nCollapse" },
            ].map((item) => (
              <div key={item.v} style={{
                background: "rgba(11,22,40,0.95)",
                padding: "2rem 1.25rem 1.75rem",
                textAlign: "center",
                borderTop: "2px solid rgba(212,144,10,0.35)",
              }}>
                <p style={{
                  fontFamily: COND, fontWeight: 700,
                  fontSize: "clamp(3rem, 5vw, 4rem)", color: gold, lineHeight: 1,
                  marginBottom: "0.5rem", letterSpacing: "-0.02em",
                }}>{item.v}</p>
                <p style={{
                  fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem",
                  color: "#FFFFFF", letterSpacing: "0.12em", marginBottom: "0.6rem",
                }}>{item.dir}</p>
                <p style={{
                  fontFamily: SANS, fontSize: "0.857rem",
                  color: "rgba(255,255,255,0.50)", lineHeight: 1.5,
                  whiteSpace: "pre-line",
                }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. AUTO ORIGIN STORY ─────────────────────────────── */}
      <div style={{ background: darkBg, padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={sectionLabel}>LP-MOD-AUTO | THE ORIGIN</p>
          <h2 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", marginBottom: "0.5rem",
          }}>Where AUTO Came From</h2>
          <div style={{ height: 2, background: gold, width: 40, marginBottom: "2rem" }} />

          <div style={{
            borderLeft: "3px solid rgba(212,144,10,0.35)",
            paddingLeft: "1.75rem",
          }}>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.88, marginBottom: "1.25rem" }}>
              The AUTO Method didn't start in trucking. It started in manufacturing — from the OSHA machine-guarding framework I spent 25 years building safety systems around.
            </p>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.88, marginBottom: "1.25rem" }}>
              The principle is the same: hazards don't arrive randomly. They move Around, Under, Through, or Over whatever guard you've built. If you don't map the vectors, you can't install the right protection.
            </p>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.88, marginBottom: "1.25rem" }}>
              I adapted the model for motor carrier compliance after watching the same failure patterns end new authorities year after year. The hazards were different. The vectors were identical.
            </p>
            <p style={{ fontFamily: COND, fontSize: "1.35rem", fontWeight: 700, color: gold, lineHeight: 1.3 }}>
              OSHA taught me to guard machines. AUTO guards authority.
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. THE FOUR VECTORS ──────────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <p style={sectionLabel}>THE FOUR DIRECTIONS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {DIRECTIONS.map((d, idx) => (
              <div
                key={d.vector}
                data-testid={`auto-direction-${d.vector.toLowerCase()}`}
                style={{
                  borderLeft: "3px solid rgba(212,144,10,0.3)",
                  padding: "2.75rem 2rem 2.75rem 2.5rem",
                  borderBottom: idx < DIRECTIONS.length - 1 ? `1px solid ${BORDER}` : "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = gold)}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "rgba(212,144,10,0.3)")}
              >
                {/* Vector header */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: COND, fontWeight: 700, fontSize: "1.5rem",
                    color: gold, letterSpacing: "0.08em",
                  }}>{d.vector}</span>
                  <span style={{ fontFamily: SANS, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
                    {d.threat} — attacks {d.pillar}
                  </span>
                </div>

                {/* Body */}
                <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.85, marginBottom: d.expanded ? "1rem" : "1.5rem", maxWidth: 580 }}>
                  {d.body}
                </p>

                {/* Extra body for OVER */}
                {d.expanded && (
                  <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "1.5rem", maxWidth: 580, fontStyle: "italic", borderLeft: "2px solid rgba(212,144,10,0.20)", paddingLeft: "1rem" }}>
                    {d.extraBody.split("\n\n").map((p, i) => (
                      <span key={i}>{p}{i < 1 ? <><br /><br /></> : null}</span>
                    ))}
                  </p>
                )}

                {/* Failure points */}
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.85)", marginBottom: "0.75rem" }}>
                  FAILURE POINTS
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem" }}>
                  {d.failurePoints.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
                      <span style={{ color: "rgba(212,144,10,0.80)", marginTop: "0.15rem", flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{s}</span>
                    </li>
                  ))}
                </ul>

                {/* CFR */}
                <p style={{
                  fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  CFR ANCHOR: {d.cfr} — {d.cfrNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. GUARD INSTALLATION ────────────────────────────── */}
      <div style={{ background: darkBg, padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={sectionLabel}>LP-GRD-000 | GUARD INSTALLATION</p>
          <h2 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.2, marginBottom: "1.25rem", maxWidth: 520,
          }}>
            Understanding the attack vectors is not enough. Guards must be installed.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.60)", lineHeight: 1.85, maxWidth: 580, marginBottom: "3rem" }}>
            LaunchPath installs four operational guard systems that protect the Four Pillars against AUTO attack vectors. Each guard directly blocks specific violations before they can enter the authority.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {GUARDS.map((g) => (
              <div
                key={g.code}
                data-testid={`guard-${g.code.toLowerCase()}`}
                style={{
                  background: midBg,
                  borderLeft: g.allVectors ? `3px solid ${gold}` : "3px solid rgba(212,144,10,0.35)",
                  padding: "1.75rem 2rem",
                }}
              >
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(212,144,10,0.45)", textTransform: "uppercase", marginBottom: "0.3rem" }}>{g.code}</p>
                    <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1.1rem", color: gold, margin: 0 }}>{g.name}</p>
                  </div>
                  <div style={{
                    background: g.allVectors ? "rgba(212,144,10,0.10)" : "rgba(212,144,10,0.05)",
                    border: `1px solid ${g.allVectors ? "rgba(212,144,10,0.35)" : "rgba(212,144,10,0.15)"}`,
                    padding: "0.3rem 0.75rem",
                    alignSelf: "center",
                  }}>
                    <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", color: gold, textTransform: "uppercase", margin: 0 }}>
                      BLOCKS: {g.blocks}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.72)", lineHeight: 1.82, marginBottom: "0.875rem", maxWidth: 620 }}>
                  {g.desc}
                </p>

                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontStyle: "italic", borderLeft: "2px solid rgba(212,144,10,0.18)", paddingLeft: "0.875rem", marginBottom: "0.875rem", maxWidth: 580 }}>
                  {g.consequence}
                </p>

                <p style={{ fontFamily: MONO, fontSize: "0.714rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
                  CFR ANCHOR: {g.cfr} — {g.cfrNote}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.50)", lineHeight: 1.75, marginTop: "2rem", marginBottom: "1rem" }}>
            These guards are installed through the 90-day LaunchPath Standard.
          </p>
          <Link
            to="/operating-standard"
            data-testid="auto-view-standard-link"
            style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.82)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = gold; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.82)"; }}
          >
            View the Operating Standard →
          </Link>
        </div>
      </div>

      {/* ── 6. THE THREE-LAYER SYSTEM ─────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p style={sectionLabel}>THE THREE-LAYER SYSTEM</p>
          <h2 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", marginBottom: "1.25rem",
          }}>AUTO does not stand alone.</h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.85, maxWidth: 580, marginBottom: "3rem" }}>
            The AUTO model describes attack vectors. The Four Pillars describe what is being protected. The 16 Deadly Sins describe what actually fails. Three layers. One system.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }} className="three-layer-grid">
            {[
              { label: "FOUR PILLARS", role: "What is being protected", items: PILLARS.map(p => p.label) },
              { label: "AUTO VECTORS", role: "How risk attacks them", items: ["AROUND", "UNDER", "THROUGH", "OVER"] },
              { label: "16 DEADLY SINS", role: "What actually fails", items: ["Insurance gaps", "DQ file violations", "HOS failures", "Financial collapse"] },
            ].map((col) => (
              <div key={col.label} style={{ background: midBg, padding: "2rem 1.5rem" }}>
                <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: gold, marginBottom: "0.4rem" }}>{col.label}</p>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.40)", marginBottom: "1.25rem", fontStyle: "italic" }}>{col.role}</p>
                {col.items.map((item, i) => (
                  <p key={i} style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.65)", marginBottom: "0.4rem", lineHeight: 1.5 }}>{item}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <Link to="/16-deadly-sins" data-testid="auto-method-sins-link"
              style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.72)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = gold; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.72)"; }}
            >View the 16 Deadly Sins →</Link>
          </div>
        </div>
      </div>

      {/* ── 7. FOUR PILLARS ──────────────────────────────────── */}
      <div style={{ background: darkBg, padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p style={sectionLabel}>THE FOUR PILLARS — WHAT MUST BE PROTECTED</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }} className="pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.label} style={{ background: darkBg, padding: "2rem" }}>
                <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1rem", color: "#FFFFFF", marginBottom: "0.6rem" }}>{p.label}</p>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", lineHeight: 1.72 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. WISDOM DOCTRINE (connected to AUTO) ───────────── */}
      <div style={{ padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ ...sectionLabel, marginBottom: "1.5rem" }}>LP-DOCTRINE | THE SEQUENCE</p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: "2rem", maxWidth: 560 }}>
            The AUTO Method exists because most operators get the sequence backwards. They scale before they're stable. They chase revenue before they've installed protection.
          </p>
          {[
            "Wisdom before hustle.",
            "Systems before scale.",
            "Compliance before revenue.",
            "Protection before growth.",
          ].map((line, i) => (
            <p key={i} style={{
              fontFamily: COND, fontWeight: 700,
              fontSize: "clamp(1rem, 2vw, 1.25rem)", color: i === 0 ? gold : "rgba(255,255,255,0.65)",
              marginBottom: i < 3 ? "0.75rem" : "2rem",
              borderLeft: "2px solid rgba(212,144,10,0.25)",
              paddingLeft: "1.25rem",
            }}>{line}</p>
          ))}
          <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.40)", fontStyle: "italic" }}>
            This is the sequence AUTO enforces.
          </p>
        </div>
      </div>

      {/* ── 9. CLOSE + CTAs ──────────────────────────────────── */}
      <div style={{ background: darkBg, padding: "80px 24px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={sectionLabel}>NEXT STEP</p>
          <h2 style={{
            fontFamily: COND, fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.2, marginBottom: "1rem",
          }}>
            The AUTO Method maps where failure enters.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.82, marginBottom: "0.75rem", maxWidth: 520 }}>
            The Four Pillars define what must be protected. The LaunchPath Standard installs the guards that block all four vectors.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.82, marginBottom: "2.5rem", maxWidth: 520 }}>
            The Standard is accessed through Ground 0 — the free qualification and readiness module that determines where your operation stands before implementation begins.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              data-testid="auto-view-standard-cta"
              to="/operating-standard"
              style={{
                display: "inline-block", background: gold,
                color: darkBg, fontFamily: SANS, fontWeight: 700,
                fontSize: "var(--text-sm)", letterSpacing: "0.09em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2.25rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e8a520")}
              onMouseLeave={(e) => (e.currentTarget.style.background = gold)}
            >
              VIEW THE OPERATING STANDARD →
            </Link>
            <Link
              data-testid="auto-ground0-cta"
              to="/ground-0-briefing"
              style={{
                display: "inline-block", background: "transparent",
                color: gold, fontFamily: SANS, fontWeight: 700,
                fontSize: "var(--text-sm)", letterSpacing: "0.09em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2.25rem",
                border: "1px solid rgba(212,144,10,0.40)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              INITIATE GROUND 0 →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 10. NEXT IN THE FRAMEWORK ────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,144,10,0.45)", marginBottom: "0.35rem" }}>
              NEXT IN THE FRAMEWORK
            </p>
            <p style={{ fontFamily: SANS, fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.55)", margin: 0 }}>
              The Operating Standard: What Gets Installed
            </p>
          </div>
          <Link
            to="/operating-standard"
            data-testid="auto-next-framework-link"
            style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase", color: darkBg, background: gold, padding: "0.875rem 1.75rem", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e8a520")}
            onMouseLeave={e => (e.currentTarget.style.background = gold)}
          >
            VIEW THE OPERATING STANDARD →
          </Link>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 768px) {
          .auto-strip { grid-template-columns: repeat(2, 1fr) !important; }
          .three-layer-grid { grid-template-columns: 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .auto-strip { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
