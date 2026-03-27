import { useState } from "react";
import { Link } from '../compat/Link';
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

// ── LP Brief Color Palette (per LP-BRF-01 v2 spec) ──────────────────────
const C = {
  navy: "#002244",
  gold: "#C5A059",
  goldLight: "#D4AA6E",
  white: "#FFFFFF",
  lgray: "#3C4A5E",
  bgDark: "#001630",
  bgMain: "#001A33",
  bgSection: "#00213F",
  bgCard: "rgba(0,26,51,0.85)",
  border: "rgba(197,160,89,0.18)",
  borderLight: "rgba(255,255,255,0.08)",
  red: "#C0392B",
  redBg: "rgba(139,0,0,0.12)",
  amber: "#D97706",
  amberBg: "rgba(217,119,6,0.12)",
  green: "#16A34A",
  greenBg: "rgba(22,163,74,0.10)",
  textMuted: "rgba(255,255,255,0.55)",
  textDim: "rgba(255,255,255,0.35)",
  textBody: "rgba(255,255,255,0.82)",
};

const T = {
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Inter', sans-serif",
};

// ── Maturity Cycle ───────────────────────────────────────────────────────
const MATURITY = [
  { key: "adhoc", label: "Ad-hoc", color: C.red, bg: C.redBg },
  { key: "emerging", label: "Emerging", color: C.amber, bg: C.amberBg },
  { key: "installed", label: "Installed", color: C.green, bg: C.greenBg },
];

function MaturityCheckboxes({ itemId }) {
  const [state, setState] = useState(null);
  return (
    <div className="maturity-boxes" style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
      {MATURITY.map(m => (
        <button
          key={m.key}
          onClick={() => setState(state === m.key ? null : m.key)}
          title={m.label}
          data-testid={`maturity-${itemId}-${m.key}`}
          data-maturity={state === m.key ? m.key : "none"}
          style={{
            width: 22, height: 22,
            border: `1.5px solid ${state === m.key ? m.color : "rgba(255,255,255,0.18)"}`,
            background: state === m.key ? m.bg : "transparent",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
            flexShrink: 0,
          }}
        >
          {state === m.key && (
            <span style={{ color: m.color, fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>
          )}
        </button>
      ))}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="section-label" style={{
      fontFamily: T.mono, fontSize: "0.714rem", fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: "rgba(197,160,89,0.65)", marginBottom: "1.25rem",
    }}>
      {children}
    </p>
  );
}

function RiskGrid({ rows }) {
  const heads = ["FAILURE DOMAIN", "PROBABLE FINE RANGE", "DOWNTIME / DISRUPTION", "REMEDIATION COST"];
  return (
    <div style={{ overflowX: "auto", marginBottom: "2.5rem" }}>
      <table className="risk-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
        <thead>
          <tr style={{ background: C.navy }}>
            {heads.map(h => (
              <th key={h} style={{
                fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: C.gold, padding: "0.875rem 1rem", textAlign: "left",
                borderBottom: `2px solid ${C.gold}`, whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "rgba(0,34,68,0.60)" : "rgba(0,22,48,0.80)", borderBottom: `1px solid ${C.borderLight}` }}>
              <td style={{ padding: "0.875rem 1rem", fontFamily: T.sans, fontSize: "0.857rem", fontWeight: 600, color: C.white, borderLeft: `2px solid ${C.red}` }}>
                {row.domain}
              </td>
              <td style={{ padding: "0.875rem 1rem", fontFamily: T.mono, fontSize: "0.806rem", color: "#FC8181" }}>
                {row.fineRange}
              </td>
              <td style={{ padding: "0.875rem 1rem", fontFamily: T.sans, fontSize: "0.857rem", color: C.textBody }}>
                {row.downtime}
              </td>
              <td style={{ padding: "0.875rem 1rem", fontFamily: T.sans, fontSize: "0.857rem", color: C.amber }}>
                {row.remediation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Template ────────────────────────────────────────────────────────
export default function KnowledgeCenterBriefTemplate({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  const handlePrint = () => {
    document.title = `${data.code} — ${data.title} — LaunchPath`;
    window.print();
  };

  return (
    <div className="brief-root" style={{ background: C.bgMain, minHeight: "100vh", color: C.white }}>
      <Navbar />

      {/* ── HERO BLOCK ───────────────────────────────────────────────── */}
      <section className="brief-hero" style={{ background: `linear-gradient(160deg, ${C.navy} 0%, #001833 100%)`, borderBottom: `2px solid ${C.gold}`, padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Top bar: back link + download button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <Link to="/knowledge-center" className="no-print" style={{ fontFamily: T.mono, fontSize: "0.714rem", color: C.textMuted, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.08em" }}>
              ← KNOWLEDGE CENTER
            </Link>
            <button
              onClick={handlePrint}
              data-testid="download-pdf-btn"
              className="no-print"
              style={{
                fontFamily: T.sans, fontWeight: 700,
                fontSize: "0.806rem", letterSpacing: "0.08em",
                color: C.bgMain, background: C.gold,
                padding: "0.6rem 1.25rem", border: "none", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.goldLight}
              onMouseLeave={e => e.currentTarget.style.background = C.gold}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: T.mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", color: C.bgMain, background: C.gold, padding: "0.3rem 0.75rem" }}>
              {data.code}
            </span>
            <span style={{ fontFamily: T.mono, fontSize: "0.714rem", color: C.textMuted, letterSpacing: "0.10em" }}>
              {data.cfr}
            </span>
          </div>
          <h1 style={{
            fontFamily: T.sans, fontWeight: 800,
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            letterSpacing: "-0.02em", lineHeight: 1.08,
            color: C.white, marginBottom: "1.25rem",
          }}>
            {data.title}
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: C.gold, lineHeight: 1.6, maxWidth: 700, marginBottom: "2rem" }}>
            {data.subtitle}
          </p>
          <div style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, padding: "1.25rem 1.5rem", maxWidth: 720 }}>
            <p style={{ fontFamily: T.sans, fontSize: "1rem", color: C.white, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
              "{data.decisionHeadline}"
            </p>
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE SUMMARY ────────────────────────────────────────── */}
      <section className="brief-section brief-exec" style={{ background: C.bgSection, borderBottom: `1px solid ${C.borderLight}`, padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="brief-grid">
          <div>
            <SectionLabel>{data.code} — EXECUTIVE SUMMARY</SectionLabel>
            <p style={{ fontFamily: T.sans, fontSize: "1rem", color: C.gold, lineHeight: 1.75, marginBottom: "1.5rem", fontWeight: 600 }}>
              {data.executiveSummary.intent}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {data.executiveSummary.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{ color: C.gold, fontFamily: T.mono, fontSize: "0.857rem", marginTop: "0.15rem", flexShrink: 0 }}>→</span>
                  <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textBody, lineHeight: 1.7, margin: 0 }}>{pt}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(197,160,89,0.06)", border: `1px solid ${C.border}`, padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: T.sans, fontSize: "0.857rem", color: C.textMuted, lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: C.gold }}>Cohort note: </strong>{data.executiveSummary.cohortNote}
              </p>
            </div>
          </div>
          <div className="brief-meta-card" style={{ background: C.navy, border: `1px solid ${C.border}`, padding: "1.5rem", minWidth: 220 }}>
            <p style={{ fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, marginBottom: "1rem" }}>DOCUMENT REFERENCE</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <div><p style={{ fontFamily: T.mono, fontSize: "0.668rem", color: C.textDim, margin: "0 0 0.15rem" }}>BRIEF CODE</p><p style={{ fontFamily: T.sans, fontSize: "0.857rem", color: C.gold, margin: 0, fontWeight: 700 }}>{data.code}</p></div>
              <div><p style={{ fontFamily: T.mono, fontSize: "0.668rem", color: C.textDim, margin: "0 0 0.15rem" }}>CFR AUTHORITY</p><p style={{ fontFamily: T.sans, fontSize: "0.806rem", color: C.white, margin: 0 }}>{data.cfr}</p></div>
              <div><p style={{ fontFamily: T.mono, fontSize: "0.668rem", color: C.textDim, margin: "0 0 0.15rem" }}>READ TIME</p><p style={{ fontFamily: T.sans, fontSize: "0.806rem", color: C.white, margin: 0 }}>{data.readTime}</p></div>
              <div style={{ paddingTop: "0.5rem", borderTop: `1px solid ${C.borderLight}` }}>
                <p style={{ fontFamily: T.mono, fontSize: "0.668rem", color: C.textDim, margin: "0 0 0.15rem" }}>UNGATED</p>
                <p style={{ fontFamily: T.sans, fontSize: "0.75rem", color: C.textMuted, margin: 0 }}>No email required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEVERAGE SECTION ─────────────────────────────────────────── */}
      <section className="brief-section brief-leverage" style={{ padding: "4rem 1.5rem", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>LEVERAGE POINT — REGULATORY CONTEXT</SectionLabel>
          <p style={{ fontFamily: T.sans, fontSize: "1.064rem", color: C.textBody, lineHeight: 1.85, maxWidth: 760, marginBottom: "3rem" }}>
            {data.leverage.body}
          </p>
          <div style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.amber}`, padding: "2rem 2.25rem" }}>
            <p style={{ fontFamily: T.mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.amber, marginBottom: "1.5rem" }}>
              OWNER DECISIONS IN THIS WINDOW
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {data.leverage.ownerDecisions.map((decision, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: T.mono, fontSize: "0.714rem", color: C.amber, flexShrink: 0, marginTop: "0.25rem" }}>•</span>
                  <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textBody, lineHeight: 1.75, margin: 0 }}>{decision}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RISK GRID ────────────────────────────────────────────────── */}
      <section className="brief-section brief-risk" style={{ background: C.bgSection, padding: "4rem 1.5rem", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>RISK GRID — ECONOMIC FRAMING</SectionLabel>
          <h2 style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: C.white, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
            What failure costs at each domain
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textMuted, marginBottom: "2.5rem", lineHeight: 1.7 }}>
            These are not hypothetical. They are documented outcomes from FMCSA enforcement actions and carrier remediation cases.
          </p>
          <RiskGrid rows={data.riskGrid} />

          {/* Cost Comparison Callout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="brief-grid">
            <div style={{ background: C.greenBg, border: `1px solid rgba(22,163,74,0.30)`, borderLeft: `3px solid ${C.green}`, padding: "1.5rem" }}>
              <p style={{ fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.14em", color: C.green, marginBottom: "0.75rem" }}>CLEAN INSTALL</p>
              <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textBody, lineHeight: 1.7, margin: 0 }}>{data.costComparison.clean}</p>
            </div>
            <div style={{ background: C.redBg, border: `1px solid rgba(192,57,43,0.30)`, borderLeft: `3px solid ${C.red}`, padding: "1.5rem" }}>
              <p style={{ fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.14em", color: C.red, marginBottom: "0.75rem" }}>REMEDIATION PATH</p>
              <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textBody, lineHeight: 1.7, margin: 0 }}>{data.costComparison.remediation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEM MATURITY ASSESSMENT ───────────────────────────────── */}
      <section className="brief-section brief-maturity" style={{ padding: "4rem 1.5rem", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>SYSTEM MATURITY ASSESSMENT</SectionLabel>
          <h2 style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: C.white, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
            Where does your operation stand right now?
          </h2>
          <p className="no-print" style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textMuted, marginBottom: "2rem", lineHeight: 1.7 }}>
            Click each checkbox to mark your current maturity level. This assessment is private — no data is collected or transmitted.
          </p>

          {/* Maturity Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            {MATURITY.map(m => (
              <div key={m.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: m.bg, border: `1px solid ${m.color}`, padding: "0.4rem 0.875rem" }}>
                <span style={{ width: 10, height: 10, background: m.color, flexShrink: 0 }} />
                <span style={{ fontFamily: T.mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.10em", color: m.color }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Domain Checklists */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {data.maturityDomains.map((domain, di) => (
              <div key={di} className="maturity-domain" style={{ border: `1px solid ${C.borderLight}`, overflow: "hidden" }}>
                <div style={{ background: C.navy, padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: T.mono, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.14em", color: C.gold, background: "rgba(197,160,89,0.12)", padding: "0.25rem 0.625rem", flexShrink: 0 }}>
                    {domain.code}
                  </span>
                  <span style={{ fontFamily: T.sans, fontSize: "0.952rem", fontWeight: 700, color: C.white }}>
                    {domain.name}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {domain.items.map((item, ii) => {
                    const itemId = `${di}-${ii}`;
                    return (
                      <div key={ii} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
                        padding: "0.875rem 1.25rem",
                        background: ii % 2 === 0 ? "rgba(0,22,48,0.80)" : "rgba(0,34,68,0.60)",
                        borderBottom: ii < domain.items.length - 1 ? `1px solid ${C.borderLight}` : "none",
                      }}>
                        <p style={{ fontFamily: T.sans, fontSize: "0.857rem", color: C.textBody, lineHeight: 1.6, margin: 0, flex: 1 }}>
                          {item}
                        </p>
                        <MaturityCheckboxes itemId={itemId} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIT BINDER ARCHITECTURE ────────────────────────────────── */}
      <section className="brief-section brief-binder" style={{ background: C.bgSection, padding: "4rem 1.5rem", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionLabel>AUDIT BINDER ARCHITECTURE</SectionLabel>
          <h2 style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", color: C.white, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
            What the auditor will ask to see
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: "0.952rem", color: C.textMuted, marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Each tab represents a compliance domain. If you cannot retrieve any item below within 60 seconds, that item is not "installed" — it is missing.
          </p>

          {/* Tab Bar — hidden during print */}
          <div className="binder-tabs no-print" style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: 0 }}>
            {data.binderTabs.map((tab, ti) => (
              <button
                key={ti}
                onClick={() => setActiveTab(ti)}
                data-testid={`binder-tab-${tab.code?.replace(/[^a-z0-9]/gi, "").toLowerCase() || ti}`}
                style={{
                  fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "0.625rem 0.875rem",
                  background: activeTab === ti ? C.gold : "transparent",
                  color: activeTab === ti ? C.bgMain : C.textMuted,
                  border: `1px solid ${activeTab === ti ? C.gold : C.borderLight}`,
                  cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                }}
              >
                {tab.code}
              </button>
            ))}
          </div>

          {/* Active Tab Content — shown on screen */}
          {data.binderTabs[activeTab] && (
            <div className="no-print" style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.gold}`, padding: "2rem 2.25rem" }}>
              <p style={{ fontFamily: T.sans, fontSize: "1rem", fontWeight: 700, color: C.white, marginBottom: "0.25rem" }}>
                {data.binderTabs[activeTab].name}
              </p>
              <p style={{ fontFamily: T.sans, fontSize: "0.857rem", color: C.textMuted, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                {data.binderTabs[activeTab].description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {data.binderTabs[activeTab].items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: T.mono, fontSize: "0.714rem", color: C.gold, marginTop: "0.25rem", flexShrink: 0 }}>□</span>
                    <p style={{ fontFamily: T.sans, fontSize: "0.857rem", color: C.textBody, lineHeight: 1.65, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Tabs Content — shown only when printing */}
          <div className="print-only binder-print-all">
            {data.binderTabs.map((tab, ti) => (
              <div key={ti} style={{ marginBottom: "1.5rem", border: "1px solid #BBBBBB", overflow: "hidden" }}>
                <div style={{ background: "#002244", padding: "0.6rem 1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontFamily: T.mono, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", color: "#C5A059", background: "rgba(197,160,89,0.15)", padding: "0.2rem 0.5rem" }}>{tab.code}</span>
                  <span style={{ fontFamily: T.sans, fontSize: "0.857rem", fontWeight: 700, color: "#FFFFFF" }}>{tab.name}</span>
                </div>
                <div style={{ padding: "0.875rem 1rem", background: "#F8F9FA" }}>
                  <p style={{ fontFamily: T.sans, fontSize: "0.75rem", color: "#555555", marginBottom: "0.625rem", marginTop: 0 }}>{tab.description}</p>
                  {tab.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <span style={{ fontFamily: T.mono, color: "#002244", fontSize: "0.75rem", flexShrink: 0, marginTop: "0.15rem" }}>□</span>
                      <p style={{ fontFamily: T.sans, fontSize: "0.75rem", color: "#333333", lineHeight: 1.5, margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXTUAL CTA BAND ─────────────────────────────────────────── */}
      <section data-testid="brief-cta-band" className="brief-cta-band no-print" style={{ background: C.bgSection, borderTop: `3px solid ${C.gold}`, borderBottom: `1px solid ${C.border}`, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontFamily: T.mono, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(197,160,89,0.50)", marginBottom: "1rem" }}>
            {data.code} — NEXT STEP
          </p>
          <p style={{ fontFamily: T.sans, fontSize: "1.064rem", color: C.textBody, lineHeight: 1.85, marginBottom: "2.25rem", maxWidth: 580 }}>
            {data.cta?.context}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", alignItems: "flex-start" }}>
            <Link
              to={data.cta?.primary?.to || "/reach-diagnostic"}
              data-testid="brief-cta-primary"
              style={{ fontFamily: T.sans, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em", color: C.bgMain, background: C.gold, padding: "1rem 2rem", textDecoration: "none", transition: "background 0.2s", display: "inline-block" }}
              onMouseEnter={e => e.currentTarget.style.background = C.goldLight}
              onMouseLeave={e => e.currentTarget.style.background = C.gold}
            >
              {data.cta?.primary?.text || "Take the Compliance Gap Assessment →"}
            </Link>
            {data.cta?.secondary && (
              <Link
                to={data.cta.secondary.to}
                data-testid="brief-cta-secondary"
                style={{ fontFamily: T.sans, fontWeight: 600, fontSize: "0.857rem", letterSpacing: "0.04em", color: C.gold, textDecoration: "none", opacity: 0.75, transition: "opacity 0.2s", paddingLeft: "0.25rem" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}
              >
                {data.cta.secondary.text}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Brief footer note */}
      <div className="brief-footer-note" style={{ background: C.bgDark, padding: "1.5rem", textAlign: "center", borderBottom: `1px solid ${C.borderLight}` }}>
        <p style={{ fontFamily: T.mono, fontSize: "0.625rem", color: C.textDim, margin: 0, letterSpacing: "0.06em" }}>
          {data.code} · {data.title} · All documents current as of {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })} · Verify current regulatory requirements at ecfr.gov · LaunchPath Transportation EDU is an educational program and does not provide legal, compliance, or financial advice.
        </p>
      </div>

      <FooterSection />

      <style dangerouslySetInnerHTML={{__html: `
        /* ── Screen layout helpers ── */
        @media (max-width: 768px) {
          .brief-grid { grid-template-columns: 1fr !important; }
        }
        .print-only { display: none !important; }

        /* ── Print Stylesheet ─────────────────────────────────────────── */
        @media print {
          /* Hide screen-only elements */
          .no-print { display: none !important; }
          .print-only { display: block !important; }

          /* Page setup */
          @page {
            size: letter portrait;
            margin: 0.65in 0.65in 0.65in 0.65in;
          }

          /* Reset backgrounds and base colors */
          html, body {
            background: #FFFFFF !important;
            color: #333333 !important;
            font-size: 10pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide nav and footer */
          nav, header, .footer-section, footer { display: none !important; }

          /* Root */
          .brief-root {
            background: #FFFFFF !important;
            color: #333333 !important;
          }

          /* Hero */
          .brief-hero {
            background: #002244 !important;
            border-bottom: 2pt solid #C5A059 !important;
            padding: 1.5rem !important;
            page-break-after: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .brief-hero h1 {
            color: #FFFFFF !important;
            font-size: 20pt !important;
          }
          .brief-hero p { color: #C5A059 !important; }
          .brief-hero div[style*="italic"] p { color: #FFFFFF !important; }

          /* Section labels */
          .section-label {
            color: #C5A059 !important;
            font-size: 7pt !important;
          }

          /* Body sections */
          .brief-section {
            background: #FFFFFF !important;
            padding: 1rem 0 !important;
            border-bottom: 0.5pt solid #CCCCCC !important;
            page-break-inside: avoid !important;
          }
          .brief-exec { page-break-before: always !important; }
          .brief-risk { page-break-before: always !important; }
          .brief-maturity { page-break-before: always !important; }
          .brief-binder { page-break-before: always !important; background: #FFFFFF !important; }

          /* All text in sections → dark on white */
          .brief-section h2 { color: #002244 !important; font-size: 14pt !important; }
          .brief-section p { color: #333333 !important; }

          /* Meta card */
          .brief-meta-card {
            background: #F0F2F4 !important;
            border: 1pt solid #BBBBBB !important;
          }
          .brief-meta-card p { color: #333333 !important; }

          /* Risk table */
          .risk-table { border-collapse: collapse !important; width: 100% !important; }
          .risk-table thead tr { background: #002244 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .risk-table thead th { color: #C5A059 !important; font-size: 7pt !important; padding: 6pt 8pt !important; border-bottom: 1.5pt solid #C5A059 !important; }
          .risk-table tbody tr:nth-child(odd) { background: #F0F2F4 !important; }
          .risk-table tbody tr:nth-child(even) { background: #FFFFFF !important; }
          .risk-table tbody td { color: #333333 !important; font-size: 8pt !important; padding: 6pt 8pt !important; border-bottom: 0.5pt solid #CCCCCC !important; }

          /* Owner decisions block */
          .brief-leverage div[style*="amber"] {
            background: #FFF8E7 !important;
            border-top: 2pt solid #D97706 !important;
            -webkit-print-color-adjust: exact !important;
          }

          /* Maturity domains */
          .maturity-domain { page-break-inside: avoid !important; border: 0.5pt solid #CCCCCC !important; margin-bottom: 0.5rem !important; }
          .maturity-domain > div:first-child {
            background: #002244 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .maturity-domain > div:first-child span { color: #C5A059 !important; }
          .maturity-domain > div:last-child > div {
            background: #FFFFFF !important;
            border-bottom: 0.5pt solid #EEEEEE !important;
          }
          .maturity-domain p { color: #333333 !important; font-size: 8pt !important; }
          .maturity-boxes button {
            border: 1pt solid #999999 !important;
            background: #FFFFFF !important;
            -webkit-print-color-adjust: exact !important;
          }

          /* CTA band */
          .brief-cta-band {
            background: #002244 !important;
            padding: 1.5rem 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .brief-cta-band h2 { color: #FFFFFF !important; font-size: 14pt !important; }
          .brief-cta-band p { color: #DDDDDD !important; }

          /* Footer note */
          .brief-footer-note { background: #F0F2F4 !important; }
          .brief-footer-note p { color: #555555 !important; font-size: 7pt !important; }

          /* Binder print all */
          .binder-print-all { display: block !important; }
        }
      `}} />
    </div>
  );
}
