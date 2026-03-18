import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const PILLARS = [
  {
    label: "Authority Protection",
    desc: "Ensures the carrier maintains active operating authority through correct filings, audit readiness, and regulatory monitoring.",
  },
  {
    label: "Insurance Continuity",
    desc: "Protects the carrier from coverage cancellation or non-renewal through risk management and underwriting stability.",
  },
  {
    label: "Compliance Backbone",
    desc: "Installs the documentation systems required under FMCSA regulations including driver qualification files, hours-of-service oversight, and vehicle maintenance records.",
  },
  {
    label: "Cash-Flow Oxygen",
    desc: "Establishes financial stability systems that allow the carrier to operate without operational pressure that leads to compliance violations.",
  },
];

const AUTO_VECTORS = [
  { v: "A", direction: "AROUND", body: "Risk bypasses the control through coverage gaps, policy lapses, or declared-lane violations." },
  { v: "U", direction: "UNDER", body: "Risk slips below the monitoring system through missing documentation and incomplete compliance records." },
  { v: "T", direction: "THROUGH", body: "Risk passes directly through weak procedures via driver behavior, HOS violations, and unassigned ELD events." },
  { v: "O", direction: "OVER", body: "Risk overwhelms the system capacity when financial pressure removes the runway required to maintain compliance." },
];

const GUARDS = [
  { name: "Driver Guard", reg: "49 CFR Part 391", stops: "Driver Qualification file gaps and DQ violations" },
  { name: "Drug & Alcohol Guard", reg: "49 CFR Part 382", stops: "Clearinghouse violations and testing program failures" },
  { name: "Log Guard", reg: "49 CFR Part 395", stops: "Hours-of-service violations and unassigned ELD records" },
  { name: "Shop Guard", reg: "49 CFR Part 396", stops: "Maintenance failures and vehicle inspection record gaps" },
  { name: "Insurance Guard", reg: "49 CFR Part 387", stops: "Coverage lapses, policy non-renewal, and filing failures" },
  { name: "Authority Guard", reg: "49 CFR Part 365", stops: "Operating authority revocation and inactive MC status" },
];

const PHASES = [
  { num: "01", label: "Authority Stabilization", desc: "Establish operating authority, insurance structure, and entity compliance before first load." },
  { num: "02", label: "Compliance Infrastructure", desc: "Install Driver Qualification files, Drug & Alcohol program, and vehicle maintenance records." },
  { num: "03", label: "Operational Oversight", desc: "Activate ELD monitoring, HOS discipline, and load documentation protocols." },
  { num: "04", label: "Audit Readiness", desc: "Complete New Entrant Safety Audit preparation and long-term authority protection systems." },
];

const FOR_LIST = [
  "New motor carriers within their first 12 months of authority",
  "Owner-operators transitioning from driver to carrier",
  "Carriers preparing for the FMCSA New Entrant Safety Audit",
  "Operators seeking structured compliance systems rather than ad-hoc paperwork",
];

const NOT_FOR_LIST = [
  "Carriers looking for paperwork shortcuts",
  "Operators who expect compliance to manage itself",
  "Companies unwilling to build operational discipline into their business",
  "Operators seeking the fastest path rather than the correct one",
];

// ── Shared styles ────────────────────────────────────────
const sectionLabel = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#d4900a",
  marginBottom: "1.5rem",
};

const sectionWrap = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "80px 24px",
};

const divider = {
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

export default function OperatingStandardPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0d1c30", minHeight: "100vh", color: "#FFFFFF" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <div style={{ background: "#000F1F", borderBottom: "1px solid rgba(212,144,10,0.2)", padding: "100px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ ...sectionLabel, marginBottom: "2rem" }}>
            LAUNCHPATH — OPERATING STANDARD
          </p>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: "2rem",
            maxWidth: 700,
          }}>
            The LaunchPath<br />Operating Standard
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.90)",
            lineHeight: 1.8,
            maxWidth: 620,
            marginBottom: "2.5rem",
          }}>
            A structured operational framework for new motor carriers designed to prevent authority loss, insurance failure, and compliance breakdown during the first 90 days of operation.
          </p>
          <div style={{ borderLeft: "2px solid rgba(212,144,10,0.4)", paddingLeft: "1.5rem" }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "#d4900a", marginBottom: "0.4rem" }}>
              Accuracy Over Hype.
            </p>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "rgba(212,144,10,0.90)" }}>
              Systems Over Shortcuts.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: WHY THIS STANDARD EXISTS ──────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <p style={sectionLabel}>SECTION 01 — WHY THIS STANDARD EXISTS</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="standard-two-col">
          <div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}>
              Most new trucking companies do not fail because drivers lack skill.
            </h2>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.90)", lineHeight: 1.85, marginBottom: "2rem" }}>
              They fail because the operational systems required to support a motor carrier were never installed.
            </p>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.90)", lineHeight: 1.85 }}>
              The LaunchPath Operating Standard was created to solve that problem. It defines the minimum operational systems a motor carrier must install in order to operate safely and remain compliant during the early stages of authority.
            </p>
          </div>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "3rem" }}>
            {[
              "Insurance policies lapse.",
              "Driver files are incomplete.",
              "Hours-of-service violations accumulate.",
              "Audits arrive before the infrastructure exists.",
            ].map((line, i) => (
              <div key={i} style={{
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                padding: "1.25rem 0",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}>
                <span style={{ color: "#d4900a", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                <span style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.82)", fontStyle: "italic", lineHeight: 1.6 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: THE FOUR PILLARS ──────────────── */}
      <div style={{ background: "#0b1628", ...divider }}>
        <div style={{ ...sectionWrap, padding: "80px 24px" }}>
          <p style={sectionLabel}>SECTION 02 — THE FOUR PILLARS</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", marginBottom: "0.75rem",
          }}>
            What the standard protects.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", marginBottom: "3rem", maxWidth: 560, lineHeight: 1.8 }}>
            The LaunchPath Operating Standard is organized around four operational pillars. Each pillar represents a domain of the carrier operation that must be actively protected.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.08)" }} className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={i} style={{ background: "#0b1628", padding: "2.5rem 2rem" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4900a", marginBottom: "0.75rem",
                }}>
                  PILLAR {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.12rem", color: "#FFFFFF", marginBottom: "0.875rem" }}>
                  {p.label}
                </p>
                <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: AUTO GUARDING MODEL ───────────── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <p style={sectionLabel}>SECTION 03 — THE AUTO GUARDING MODEL</p>
        <div style={{ maxWidth: 660, marginBottom: "3rem" }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1.25rem",
          }}>
            Operational failures rarely occur because a single rule was broken.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85 }}>
            They occur because risk reaches the operation around, under, through, or over the controls that were supposed to stop it. The LaunchPath standard installs operational guards designed to prevent risk from reaching the authority from any direction.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(212,144,10,0.15)" }} className="auto-grid">
          {AUTO_VECTORS.map((item) => (
            <div key={item.v} style={{ background: "#0d1c30", padding: "2rem 1.5rem" }}>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "2.25rem", color: "#d4900a", marginBottom: "0.5rem", lineHeight: 1,
              }}>
                {item.v}
              </p>
              <p style={{ fontWeight: 700, fontSize: "0.924rem", color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {item.direction}
              </p>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
          <Link to="/auto-method" style={{ fontSize: "0.924rem", color: "rgba(212,144,10,0.92)", textDecoration: "none", letterSpacing: "0.06em" }}>
            VIEW FULL AUTO DOCTRINE →
          </Link>
        </div>
      </div>

      {/* ── SECTION 4: THE 6 OPERATIONAL GUARDS ─────── */}
      <div style={{ background: "#0b1628", ...divider }}>
        <div style={{ ...sectionWrap, padding: "80px 24px" }}>
          <p style={sectionLabel}>SECTION 04 — THE 6 OPERATIONAL GUARDS</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", marginBottom: "1rem",
          }}>
            Understanding the attack vectors is not enough. Guards must be installed.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 580 }}>
            Each guard is tied to specific FMCSA regulations and designed to intercept failure before it reaches the authority.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
            {GUARDS.map((g, idx) => (
              <div
                key={g.name}
                data-testid={`guard-row-${idx}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1.5fr",
                  gap: "2rem",
                  alignItems: "center",
                  padding: "1.25rem 2rem",
                  background: idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                  borderBottom: idx < GUARDS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
                className="guard-row"
              >
                <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#d4900a" }}>{g.name}</span>
                <span style={{ fontSize: "0.875rem", color: "rgba(212,144,10,0.85)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
                  {g.reg}
                </span>
                <span style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{g.stops}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 5: 90-DAY INSTALLATION SEQUENCE ──── */}
      <div style={{ ...sectionWrap, ...divider }}>
        <p style={sectionLabel}>SECTION 05 — THE 90-DAY INSTALLATION SEQUENCE</p>
        <div style={{ maxWidth: 560, marginBottom: "3.5rem" }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1.25rem",
          }}>
            The LaunchPath curriculum installs the operating standard through a structured 90-day sequence.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }} className="phases-grid">
          {PHASES.map((p) => (
            <div key={p.num} style={{ background: "#0d1c30", padding: "2rem 1.5rem" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.68rem", fontWeight: 700,
                color: "rgba(212,144,10,0.35)",
                marginBottom: "1rem", lineHeight: 1,
              }}>
                {p.num}
              </p>
              <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "#FFFFFF", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                {p.label}
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6 & 7: WHO THIS IS FOR / NOT FOR ── */}
      <div style={{ background: "#0b1628", ...divider }}>
        <div style={{ ...sectionWrap, padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="for-grid">
            {/* For */}
            <div>
              <p style={sectionLabel}>SECTION 06 — WHO THIS STANDARD IS FOR</p>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#FFFFFF",
                letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "2rem",
              }}>
                The LaunchPath Operating Standard is designed for:
              </h2>
              {FOR_LIST.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#d4900a", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                  <span style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Not For */}
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "3rem" }}>
              <p style={sectionLabel}>SECTION 07 — WHO THIS STANDARD IS NOT FOR</p>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#FFFFFF",
                letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "2rem",
              }}>
                This standard is not for:
              </h2>
              {NOT_FOR_LIST.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(255,255,255,0.85)", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                  <span style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 8: ADOPTION ──────────────────────── */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={sectionLabel}>SECTION 08 — ADOPTION</p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFFFFF",
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "1.5rem",
          }}>
            Motor carriers implement the LaunchPath Operating Standard through the Ground 0 program.
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.85, marginBottom: "3rem", maxWidth: 520 }}>
            Ground 0 installs the operational infrastructure required to meet the standard and prepares the carrier for long-term compliance stability. It is the foundation of the LaunchPath system — six implementation modules, no charge.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              data-testid="standard-ground0-cta"
              to="/ground-0-briefing"
              style={{
                display: "inline-block", minHeight: 52, background: "#d4900a",
                color: "#0b1628", fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2.5rem", lineHeight: "32px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D4B87A")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#d4900a")}
            >
              Enter Ground 0
            </Link>
            <Link
              data-testid="standard-reach-cta"
              to="/reach-diagnostic"
              style={{
                display: "inline-block", minHeight: 52, background: "transparent",
                color: "#d4900a", fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase",
                textDecoration: "none", padding: "1rem 2.5rem", lineHeight: "32px",
                border: "1px solid rgba(212,144,10,0.4)", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,144,10,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Run the REACH Diagnostic
            </Link>
          </div>
        </div>
      </div>

      <FooterSection />

      <style>{`
        @media (max-width: 900px) {
          .standard-two-col { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .standard-two-col > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .auto-grid { grid-template-columns: 1fr 1fr !important; }
          .phases-grid { grid-template-columns: 1fr 1fr !important; }
          .for-grid { grid-template-columns: 1fr !important; }
          .for-grid > div:last-child { border-left: none !important; padding-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; }
          .guard-row { grid-template-columns: 1fr !important; gap: 0.3rem !important; }
        }
        @media (max-width: 560px) {
          .auto-grid { grid-template-columns: 1fr !important; }
          .phases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
