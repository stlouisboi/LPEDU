import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

// ── Doctrine data ─────────────────────────────────────────
const DIRECTIONS = [
  {
    vector: "AROUND",
    pillar: "Insurance Continuity",
    threat: "Insurance exposure",
    body: "Risk that moves around your operation through gaps in coverage — missed payments, policy lapses, or operating outside declared lanes. The authority survives on paper while the protection behind it disappears.",
    sins: [
      "Insurance cancellation due to missed payment",
      "Operating outside declared coverage area",
      "Carrier policy non-renewal",
      "Insurance gaps following claims",
    ],
    guard: "Insurance Continuity protocols installed at authority activation.",
  },
  {
    vector: "UNDER",
    pillar: "Compliance Backbone",
    threat: "Documentation failure",
    body: "Risk that enters from beneath the operation through missing or incomplete documentation infrastructure. When FMCSA inspectors arrive, the records that should exist do not.",
    sins: [
      "Missing Driver Qualification files",
      "Incomplete maintenance documentation",
      "Missing vehicle inspection records",
      "Disorganized compliance paperwork",
    ],
    guard: "Driver Guard and Shop Guard installed before first load.",
  },
  {
    vector: "THROUGH",
    pillar: "Authority Protection",
    threat: "Compliance failure",
    body: "Risk that passes directly through the operation via driver behavior and HOS violations. The authority is technically compliant on paper but operationally non-compliant in the field.",
    sins: [
      "Hours-of-Service violations",
      "Unassigned ELD records",
      "Driver compliance failures",
      "Clearinghouse violations",
    ],
    guard: "Log Guard and Drug Guard installed before driver activation.",
  },
  {
    vector: "OVER",
    pillar: "Cash-Flow Oxygen",
    threat: "Financial collapse",
    body: "Risk that overwhelms the operation from above through financial pressure. The authority survives compliance but cannot survive the economics of early operations without a documented financial structure.",
    sins: [
      "Insufficient cash reserves for early operations",
      "Poor cost-per-mile tracking",
      "Freight payment delays without runway",
      "Repair costs exceeding operating capital",
    ],
    guard: "Financial structure documented before authority activation.",
  },
];

const PILLARS = [
  { label: "Authority Protection", desc: "The authority itself — MC number, operating status, and DOT compliance record." },
  { label: "Insurance Continuity", desc: "Active, correctly structured coverage maintained without interruption." },
  { label: "Compliance Backbone", desc: "Documentation systems — DQ files, maintenance records, drug programs." },
  { label: "Cash-Flow Oxygen", desc: "Financial runway sufficient to sustain operations through early volatility." },
];

const GUARDS = [
  { name: "Driver Guard", stops: "Driver qualification and HOS exposure" },
  { name: "Drug Guard", stops: "Clearinghouse and testing program violations" },
  { name: "Log Guard", stops: "ELD and hours-of-service compliance gaps" },
  { name: "Shop Guard", stops: "Maintenance and vehicle inspection failures" },
];

export default function AutoMethodPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#001A33", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── Header ──────────────────────────────────────── */}
      <div style={{ background: "#002244", padding: "100px 24px 80px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "1.5rem",
          }}>
            THE AUTO METHOD — RISK DOCTRINE
          </p>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-0.02em",
            color: "#FFFFFF", lineHeight: 1.1, marginBottom: "1.5rem",
          }}>
            Risk does not ask permission to attack an authority.
          </h1>
          <p style={{ fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 620, marginBottom: "1.5rem" }}>
            AUTO is not a checklist. It is a doctrine that maps every direction from which operational failure approaches a motor carrier authority.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-subtle)", lineHeight: 1.85, maxWidth: 600 }}>
            Most authorities do not fail from one catastrophic mistake. They fail because risk entered from a direction that was never guarded — around the coverage, under the documentation, through the operations, or over the financial runway.
          </p>
        </div>
      </div>

      {/* ── What AUTO Is ────────────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "2rem",
          }}>
            WHAT AUTO DESCRIBES
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }} className="auto-grid">
            {[
              { v: "A", label: "AROUND", sub: "Insurance" },
              { v: "U", label: "UNDER", sub: "Documentation" },
              { v: "T", label: "THROUGH", sub: "Operations" },
              { v: "O", label: "OVER", sub: "Finances" },
            ].map((item) => (
              <div
                key={item.v}
                style={{
                  border: "1px solid rgba(197,160,89,0.25)",
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  background: "rgba(197,160,89,0.04)",
                }}
              >
                <p style={{
                  fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                  fontSize: "2rem", color: "#C5A059", marginBottom: "0.5rem",
                }}>
                  {item.v}
                </p>
                <p style={{ fontWeight: 700, fontSize: "0.924rem", color: "#FFFFFF", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-subtle)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four Directions ─────────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "3rem",
          }}>
            THE FOUR DIRECTIONS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {DIRECTIONS.map((d, idx) => (
              <div
                key={d.vector}
                data-testid={`auto-direction-${d.vector.toLowerCase()}`}
                style={{
                  borderLeft: "3px solid rgba(197,160,89,0.3)",
                  padding: "2.5rem 2rem 2.5rem 2.5rem",
                  borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "#C5A059")}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "rgba(197,160,89,0.3)")}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                    fontSize: "1.232rem", color: "#C5A059", letterSpacing: "0.1em",
                  }}>
                    {d.vector}
                  </span>
                  <span style={{ fontSize: "0.924rem", color: "var(--text-subtle)", letterSpacing: "0.04em" }}>
                    {d.threat} — attacks {d.pillar}
                  </span>
                </div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.85, marginBottom: "1.5rem", maxWidth: 560 }}>
                  {d.body}
                </p>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(197,160,89,0.92)", marginBottom: "0.75rem" }}>
                  FAILURE POINTS
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {d.sins.map((s, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
                      <span style={{ color: "rgba(197,160,89,0.88)", marginTop: "0.15rem", flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.6 }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── The Three Layers ────────────────────────────── */}
      <div style={{ background: "#002244", padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "0.75rem",
          }}>
            THE THREE-LAYER SYSTEM
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", marginBottom: "1.25rem",
          }}>
            AUTO does not stand alone.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.85, maxWidth: 580, marginBottom: "3rem" }}>
            The AUTO model describes attack vectors. The Four Pillars describe what is being protected. The 16 Deadly Sins describe what actually fails. Three layers. One system.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }} className="three-layer-grid">
            {[
              { label: "FOUR PILLARS", role: "What is being protected", items: PILLARS.map(p => p.label) },
              { label: "AUTO VECTORS", role: "How risk attacks them", items: ["AROUND", "UNDER", "THROUGH", "OVER"] },
              { label: "16 DEADLY SINS", role: "What actually fails", items: ["Insurance gaps", "DQ file violations", "HOS failures", "Financial collapse"] },
            ].map((col) => (
              <div key={col.label} style={{ background: "#002244", padding: "2rem 1.5rem" }}>
                <p style={{
                  fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#C5A059", marginBottom: "0.4rem",
                }}>
                  {col.label}
                </p>
                <p style={{ fontSize: "0.924rem", color: "var(--text-subtle)", marginBottom: "1.25rem", fontStyle: "italic" }}>
                  {col.role}
                </p>
                {col.items.map((item, i) => (
                  <p key={i} style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.4rem", lineHeight: 1.5 }}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four Pillars ────────────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "2.5rem",
          }}>
            THE FOUR PILLARS — WHAT MUST BE PROTECTED
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }} className="pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.label} style={{ background: "#001A33", padding: "2rem" }}>
                <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "#FFFFFF", marginBottom: "0.6rem" }}>
                  {p.label}
                </p>
                <p style={{ fontSize: "1rem", color: "var(--text-subtle)", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Guard Installation ───────────────────────────── */}
      <div style={{ padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "0.75rem",
          }}>
            GUARD INSTALLATION — THE RESPONSE
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", marginBottom: "1.25rem",
          }}>
            Understanding the attack vectors is not enough. Guards must be installed.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.85, maxWidth: 580, marginBottom: "3rem" }}>
            LaunchPath installs four operational guard systems that protect the Four Pillars against AUTO attack vectors. Each guard directly blocks specific sins before they can enter the authority.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {GUARDS.map((g, idx) => (
              <div
                key={g.name}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.25rem 1.5rem",
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: idx < GUARDS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  flexWrap: "wrap", gap: "0.5rem",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#C5A059" }}>{g.name}</span>
                <span style={{ fontSize: "1rem", color: "var(--text-subtle)" }}>{g.stops}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Philosophy ─────────────────────────────── */}
      <div style={{ background: "#002244", padding: "80px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {[
            "Wisdom before hustle.",
            "Systems before scale.",
            "Compliance before revenue.",
            "Protection before growth.",
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.232rem)", color: i === 0 ? "#C5A059" : "var(--text-muted)",
                marginBottom: i < 3 ? "0.75rem" : 0,
                borderLeft: "2px solid rgba(197,160,89,0.3)",
                paddingLeft: "1.25rem",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────── */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#C5A059", marginBottom: "1.25rem",
          }}>
            NEXT STEP
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", marginBottom: "1rem",
          }}>
            Find out whether the failure modes in the AUTO Method are active in your operation today.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            The REACH Assessment evaluates your operation across five categories: Resources, Experience, Authority Readiness, Commitment, and Operational Discipline. It takes approximately four minutes. It identifies the specific vectors — Around, Under, Through, or Over — where your authority is currently exposed.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              data-testid="auto-reach-cta"
              to="/reach-diagnostic"
              style={{
                display: "inline-block", minHeight: 52, background: "#C5A059",
                color: "#002244", fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2rem", lineHeight: "32px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C5A059")}
            >
              Run the REACH Diagnostic
            </Link>
            <Link
              data-testid="auto-ground0-cta"
              to="/ground-0-briefing"
              style={{
                display: "inline-block", minHeight: 52, background: "transparent",
                color: "#C5A059", fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2rem", lineHeight: "32px",
                border: "1px solid rgba(197,160,89,0.4)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(197,160,89,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Begin Ground 0
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 768px) {
          .auto-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .three-layer-grid { grid-template-columns: 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .auto-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
