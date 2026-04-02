import { Link } from '../compat/Link';

const GOLD   = "#C8933F";
const NAVY   = "#1B2A47";
const DEEP   = "#111D33";
const BODY   = "rgba(244,241,235,0.80)";
const MUTED  = "rgba(138,150,168,0.85)";
const MONO   = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Inter', sans-serif";
const SERIF  = "'Newsreader', 'Playfair Display', serif";

function SubLabel({ children, color }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: color || "rgba(200,147,63,0.55)", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

// ── Section 6: Four Pillars ──────────────────────────────────────────────
const PILLARS = [
  {
    name: "Authority Protection",
    desc: "Protects the authority from filing, timing, and operating gaps that leave it exposed early. Missing here means the foundation is already cracked.",
  },
  {
    name: "Insurance Continuity",
    desc: "Protects against coverage breakdowns, filing issues, and preventable lapses that can shut movement down fast. A lapse is not a paperwork inconvenience — it is a shutdown.",
  },
  {
    name: "Compliance Backbone",
    desc: "Protects the operation through required records, file discipline, and control of the compliance areas DOT will expect to see. If the records are not there, the compliance is not there.",
  },
  {
    name: "Cash-Flow Oxygen",
    desc: "Protects the carrier from the financial pressure that causes desperate decisions, skipped discipline, and preventable breakdown. Operations that cannot breathe financially cannot hold a standard.",
  },
];

function FourPillarsSubsection() {
  return (
    <div style={{ marginBottom: "5rem" }}>
      <SubLabel>THE GUARD — LP-PROTECT-001</SubLabel>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.875rem" }}>
        THE FOUR PILLARS ARE THE GUARD AROUND THE AUTHORITY.
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 640 }}>
        Every new carrier needs more than a truck, a number, and good intentions. The authority needs a guard. LaunchPath is built on four pillars that protect the operation where new carriers break most often.
      </p>
      <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.75rem" }}>
        {PILLARS.map((p, i) => (
          <div
            key={i}
            data-testid={`pillar-card-${i}`}
            style={{ background: DEEP, borderTop: `3px solid ${GOLD}`, padding: "1.75rem 1.5rem", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
              <div className={`led-dot led-dot-${i}`} style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, boxShadow: `0 0 4px ${GOLD}, 0 0 8px rgba(200,147,63,0.5)` }} />
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1rem", color: GOLD, marginBottom: "0.625rem" }}>
              {p.name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.72, margin: 0 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: MUTED, fontStyle: "italic", margin: 0 }}>
        These are not forms or checklists. They are the structural guard around the authority.
      </p>
    </div>
  );
}

// ── Protected Authority Definition Block (LP-WEB-002 v2.0 Element 3) ────────
function ProtectedAuthorityBlock() {
  return (
    <div
      data-testid="protected-authority-block"
      style={{
        background: "rgba(11,22,39,0.70)",
        border: "1px solid rgba(200,147,63,0.22)",
        borderLeft: `3px solid ${GOLD}`,
        padding: "2rem 2.25rem",
        marginTop: "2.5rem",
      }}
    >
      <h3 style={{
        fontFamily: SERIF, fontWeight: 700,
        fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
        color: "#FFFFFF", letterSpacing: "-0.01em",
        lineHeight: 1.2, marginBottom: "0.75rem",
      }}>
        What "Protected Authority" Means
      </h3>

      <p style={{ fontFamily: SANS, fontSize: "0.980rem", color: BODY, lineHeight: 1.8, marginBottom: "1.25rem" }}>
        Protected authority is not a slogan. It means:
      </p>

      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {[
          "FMCSA can open your files and see a functioning system — not a stack of ad-hoc paperwork assembled the night before an audit.",
          "Your insurance, filings, and safety programs are stable enough that one bad week does not put your MC number at risk.",
          "If an investigator shows up tomorrow, you are explaining your systems — not apologizing for missing documents.",
        ].map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <span style={{ color: GOLD, fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, flexShrink: 0, marginTop: "0.25rem" }}>—</span>
            <p style={{ fontFamily: SANS, fontSize: "0.938rem", color: MUTED, lineHeight: 1.78, margin: 0 }}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Section 7: AUTO ──────────────────────────────────────────────────────
const AUTO_VECTORS = [
  { letter: "A", direction: "Around", desc: "The threat bypasses what should have been protecting you. External filings lapse. Coverage slips. A gap you didn't know existed lets risk move past the perimeter." },
  { letter: "U", direction: "Under",  desc: "The threat stays below your awareness until it is already doing damage. Missed deadlines, expired certificates, quiet admin failures — none of them announce themselves." },
  { letter: "T", direction: "Through", desc: "The threat enters through a missing, weak, or broken control. No DQ file. No compliant D&A program. A control that was assumed to exist but wasn't installed." },
  { letter: "O", direction: "Over",   desc: "The threat overwhelms the structure because the guard was never strong enough to hold it. Financial pressure, scale before systems, speed before structure." },
];

function AutoMethodSubsection() {
  return (
    <div style={{ marginBottom: "5rem" }}>
      <SubLabel color="rgba(148,163,184,0.60)">THE BREACH MAP — LP-AUTO-001</SubLabel>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.5rem" }}>
        FAILURE DOES NOT JUST HAPPEN. IT FINDS A WAY IN.
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(148,163,184,0.85)", lineHeight: 1.75, marginBottom: "0.625rem", maxWidth: 600 }}>
        AUTO shows the four ways danger tries to get past the guard:
      </p>
      <p style={{ fontFamily: MONO, fontSize: "0.857rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(148,163,184,0.60)", marginBottom: "2.5rem" }}>
        AROUND &nbsp;·&nbsp; UNDER &nbsp;·&nbsp; THROUGH &nbsp;·&nbsp; OVER
      </p>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 640 }}>
        Problems do not wait politely outside your operation. They move. They bypass. They slip through weak spots. AUTO is the breach map inside LaunchPath. It shows how missing controls, weak records, bad assumptions, and pressure get past the guard and reach the authority.
      </p>
      <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.75rem" }}>
        {AUTO_VECTORS.map((v, i) => (
          <div
            key={i}
            data-testid={`auto-card-${v.letter.toLowerCase()}`}
            className="inset-card"
            style={{ background: "rgba(244,241,235,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem 1.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontFamily: SANS, fontWeight: 800, fontSize: "2rem", color: NAVY,
                  background: "#F4F1EB",
                  width: 52, height: 52,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, lineHeight: 1,
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.25), 0 2px 0 rgba(0,0,0,0.40)",
                  transition: "background 0.18s, box-shadow 0.18s, color 0.18s",
                  cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0e1829"; e.currentTarget.style.boxShadow = `inset 0 -2px 4px rgba(0,0,0,0.20), 0 0 18px rgba(200,147,63,0.60)`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F4F1EB"; e.currentTarget.style.color = NAVY; e.currentTarget.style.boxShadow = "inset 0 -2px 4px rgba(0,0,0,0.25), 0 2px 0 rgba(0,0,0,0.40)"; }}
              >
                {v.letter}
              </span>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", color: "#FFFFFF" }}>
                {v.direction}
              </span>
            </div>
            <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.72, margin: 0 }}>
              {v.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.7, marginBottom: "1.5rem" }}>
        AUTO is not the guard. The Four Pillars are the guard. AUTO is the breach map — it shows where the guard needs to hold and where it most commonly fails.
      </p>
      <Link
        to="/standards/auto-method"
        data-testid="auto-method-link"
        style={{ fontFamily: MONO, fontSize: "0.806rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "#e8a958"}
        onMouseLeave={e => e.currentTarget.style.color = GOLD}
      >
        See the AUTO breach map →
      </Link>
    </div>
  );
}

// ── Section 8: REACH ─────────────────────────────────────────────────────
const REACH_STATUS = [
  {
    label: "GO",
    desc: "The structure is strong enough to move forward. Proceed into Ground 0 and begin installation.",
    color: "#16A34A", border: "rgba(22,163,74,0.35)", bg: "rgba(22,163,74,0.06)",
  },
  {
    label: "WAIT",
    desc: "The operation is not ready yet. Correct the gaps, then return. Proceeding now would build on a weak foundation.",
    color: "#D97706", border: "rgba(217,119,6,0.35)", bg: "rgba(217,119,6,0.06)",
  },
  {
    label: "NO-GO",
    desc: "The exposure is too serious to ignore. Do not move forward like nothing is wrong. Hold, correct, and return when conditions have materially changed.",
    color: "#C0392B", border: "rgba(192,57,43,0.35)", bg: "rgba(192,57,43,0.06)",
  },
];

function ReachSubsection() {
  return (
    <div>
      <SubLabel>EXPOSURE DIAGNOSTIC — LP-REACH-001</SubLabel>
      <h3 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.875rem" }}>
        BEFORE YOU BUILD, KNOW HOW EXPOSED YOU ARE.
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 640 }}>
        REACH is not a motivation test. It is the first exposure check. It shows whether danger can already reach your authority, how close the risk is, and whether you should proceed, wait, or stop.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
        {REACH_STATUS.map((s, i) => (
          <div
            key={i}
            data-testid={`reach-status-${s.label.toLowerCase().replace("-", "")}`}
            style={{ background: s.bg, border: `1px solid ${s.border}`, borderLeft: `3px solid ${s.color}`, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <div style={{ position: "absolute", top: 0, left: "-15%", width: "12%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", animation: `reach-scan-anim 4s linear ${i * 1.2}s infinite` }} />
            </div>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", color: s.color, background: `${s.bg}`, border: `1px solid ${s.border}`, padding: "0.3rem 0.7rem", flexShrink: 0 }}>
              {s.label}
            </span>
            <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: BODY, lineHeight: 1.65, margin: 0 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: MUTED, lineHeight: 1.7, marginBottom: "2.5rem" }}>
        REACH reveals the exposure. It does not guess, soften, or estimate. The result is what the result is.
      </p>
      <Link
        to="/reach-diagnostic"
        data-testid="reach-check-btn"
        className="btn-scan"
        style={{
          display: "inline-flex", alignItems: "center",
          fontFamily: SANS, fontWeight: 700,
          fontSize: "0.857rem", letterSpacing: "0.10em", textTransform: "uppercase",
          color: DEEP, background: GOLD,
          padding: "1rem 2rem", textDecoration: "none",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#e8a958"}
        onMouseLeave={e => e.currentTarget.style.background = GOLD}
      >
        RUN THE REACH TEST →
      </Link>
    </div>
  );
}

// ── System Architecture Diagram ──────────────────────────────────────────
const ARCH_STEPS = [
  { num: "01", code: "LP-01", name: "REACH",         role: "Exposure-Awareness & Readiness",   sub: "Reveals exposure — GO / WAIT / NO-GO",             color: GOLD,        href: "/reach-diagnostic" },
  { num: "02", code: "LP-02", name: "GROUND 0",      role: "Wisdom & Orientation Layer",        sub: "Posture before the build begins",                  color: GOLD,        href: "/ground-0-briefing" },
  { num: "03", code: "LP-03", name: "FOUR PILLARS",  role: "The Guard Around the Authority",    sub: "Authority · Insurance · Compliance · Cash-Flow",   color: "#3d9970",   href: "/doctrine" },
  { num: "04", code: "LP-04", name: "AUTO",          role: "Breach-Path Model",                 sub: "Around · Under · Through · Over",                  color: "#C0392B",   href: "/standards/auto-method" },
  { num: "05", code: "LP-05", name: "16 SINS",       role: "Threat Taxonomy",                   sub: "Preventable failures that reach the authority",    color: "#C0392B",   href: "/standards/16-deadly-sins" },
  { num: "06", code: "LP-06", name: "MODULES",       role: "Installation Sequence",             sub: "Files, records, controls, discipline",             color: GOLD,        href: "/standard" },
];

function SystemArchitectureDiagram() {
  return (
    <div
      data-testid="system-architecture-diagram"
      style={{
        background: "#050D1A",
        border: "1px solid rgba(200,147,63,0.18)",
        borderTop: `3px solid ${GOLD}`,
        position: "relative",
        overflow: "hidden",
        marginBottom: "5rem",
      }}
    >
      {/* Dot-grid background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(200,147,63,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />

      {/* Corner brackets */}
      {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, i) => (
        <div key={i} style={{ position: "absolute", width: 18, height: 18, ...pos, pointerEvents: "none",
          borderTop: i < 2 ? `2px solid rgba(200,147,63,0.45)` : "none",
          borderBottom: i >= 2 ? `2px solid rgba(200,147,63,0.45)` : "none",
          borderLeft: i % 2 === 0 ? `2px solid rgba(200,147,63,0.45)` : "none",
          borderRight: i % 2 === 1 ? `2px solid rgba(200,147,63,0.45)` : "none",
        }} />
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(200,147,63,0.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div style={{ width: 6, height: 6, background: GOLD, borderRadius: "50%", boxShadow: `0 0 6px ${GOLD}` }} />
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(200,147,63,0.70)", margin: 0 }}>
              SYSTEM ARCHITECTURE · OPERATIONAL DOCTRINE
            </p>
          </div>
          <p style={{ fontFamily: MONO, fontSize: "0.580rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(200,147,63,0.28)", margin: 0 }}>
            LP-SYS-001 · REV 04.2026
          </p>
        </div>

        {/* Step cards */}
        <div className="arch-sequence" style={{ display: "flex", alignItems: "stretch" }}>
          {ARCH_STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 0, position: "relative" }}>

              <Link
                to={step.href}
                data-testid={`arch-step-${step.num}`}
                className="arch-step-card"
                style={{
                  flex: 1, minWidth: 0,
                  display: "flex", flexDirection: "column",
                  padding: "2rem 1.5rem 1.5rem",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  borderRight: i < ARCH_STEPS.length - 1 ? "1px solid rgba(255,255,255,0.045)" : "none",
                  transition: "background 0.22s",
                  cursor: "pointer",
                  minHeight: 220,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${step.color}09`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {/* Watermark number */}
                <span style={{ position: "absolute", bottom: -10, right: 8, fontFamily: MONO, fontSize: "5rem", fontWeight: 900, color: `${step.color}07`, letterSpacing: "-0.04em", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
                  {step.num}
                </span>

                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: step.color, opacity: 0.55 }} />

                {/* Code */}
                <p style={{ fontFamily: MONO, fontSize: "0.540rem", fontWeight: 700, letterSpacing: "0.18em", color: `${step.color}55`, margin: "0 0 0.875rem" }}>
                  {step.code}
                </p>

                {/* Name */}
                <p style={{ fontFamily: SANS, fontWeight: 900, fontSize: "clamp(0.72rem, 1.2vw, 0.92rem)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 0.5rem", lineHeight: 1.2 }}>
                  {step.name}
                </p>

                {/* Separator */}
                <div style={{ width: "100%", height: 1, background: `${step.color}20`, marginBottom: "0.625rem" }} />

                {/* Role */}
                <p style={{ fontFamily: SANS, fontSize: "clamp(0.60rem, 0.95vw, 0.75rem)", color: step.color, margin: "0 0 0.5rem", fontWeight: 700, lineHeight: 1.35 }}>
                  {step.role}
                </p>

                {/* Sub */}
                <p style={{ fontFamily: MONO, fontSize: "clamp(0.48rem, 0.72vw, 0.60rem)", color: "rgba(148,163,184,0.55)", margin: 0, lineHeight: 1.55, letterSpacing: "0.04em", flex: 1 }}>
                  {step.sub}
                </p>

                {/* View indicator */}
                <p style={{ fontFamily: MONO, fontSize: "0.52rem", color: `${step.color}40`, margin: "1rem 0 0", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  VIEW →
                </p>
              </Link>

              {/* Connector arrow between cards */}
              {i < ARCH_STEPS.length - 1 && (
                <div className="arch-arrow" style={{ position: "absolute", right: -11, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 22, height: 22, background: "#050D1A", border: `1px solid rgba(200,147,63,0.20)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(200,147,63,0.45)", fontSize: "0.6rem", userSelect: "none", flexShrink: 0 }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer seal */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 2rem", borderTop: "1px solid rgba(200,147,63,0.08)" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(200,147,63,0.08)" }} />
          <p style={{ fontFamily: MONO, fontSize: "0.555rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(138,150,168,0.30)", margin: 0, textAlign: "center", flexShrink: 0 }}>
            Each layer has one function · None of those functions belong to another layer · The order is not optional
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(200,147,63,0.08)" }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .arch-sequence { flex-direction: column !important; }
          .arch-step-card { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.045) !important; min-height: 140px !important; }
          .arch-arrow { display: none !important; }
        }
      `}} />
    </div>
  );
}

// ── Compliance Hierarchy Header ───────────────────────────────────────────
function ComplianceHierarchyHeader() {
  return (
    <div data-testid="compliance-hierarchy-header" style={{ marginBottom: "3.5rem" }}>
      {/* Label */}
      <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,147,63,0.50)", marginBottom: "1.25rem" }}>
        DOCTRINAL FRAMEWORK
      </p>

      {/* Title */}
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.2, maxWidth: 700, marginBottom: "1.75rem" }}>
        The LaunchPath Compliance<br />Hierarchy of Protection
      </h2>

      {/* Rule */}
      <div style={{ width: 48, height: 2, background: GOLD, marginBottom: "1.75rem", opacity: 0.7 }} />

      {/* Body copy */}
      <p style={{ fontFamily: SANS, fontSize: "1.05rem", color: "rgba(224,218,208,0.82)", lineHeight: 1.85, maxWidth: 680, marginBottom: "1rem" }}>
        The LaunchPath Compliance Hierarchy of Protection is the guard we install around your MC authority. It is built from OSHA machine-guarding methodology — layered, directional, and tested from every angle risk can come at you.
      </p>
      <p style={{ fontFamily: SANS, fontSize: "1.05rem", color: "rgba(224,218,208,0.82)", lineHeight: 1.85, maxWidth: 680 }}>
        A wise carrier doesn't wait on FMCSA to point out the gaps. You find them yourself, fix them, and then go to work.
      </p>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────
export default function TheStandardSection() {
  return (
    <section
      id="the-standard"
      data-testid="the-standard-section"
      style={{
        background: NAVY,
        borderTop: "1px solid rgba(200,147,63,0.15)",
        borderBottom: "1px solid rgba(200,147,63,0.15)",
        padding: "6rem 1.5rem",
        backgroundImage: `radial-gradient(rgba(200,147,63,0.07) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Compliance Hierarchy Header */}
        <ComplianceHierarchyHeader />

        {/* System Architecture Diagram */}
        <SystemArchitectureDiagram />

        {/* Section label */}
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.25rem" }}>
          THE LAUNCHPATH PROTECTION SYSTEM
        </p>

        {/* Opening copy */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 720, marginBottom: "1.25rem" }}>
          REACH reveals the exposure. Ground 0 forms the posture. The Four Pillars are the guard. AUTO is the breach map. The 16 Deadly Sins are the threats. The modules install the protection.
        </p>
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 720, marginBottom: "4.5rem" }}>
          That is the system. That is the order. Each layer has one specific function. None of those functions belong to another layer.
        </p>

        <div className="struct-rail" style={{ marginBottom: "4rem" }} />

        {/* Four Pillars */}
        <FourPillarsSubsection />

        {/* Protected Authority definition (LP-WEB-002 v2.0 Element 3) */}
        <ProtectedAuthorityBlock />

        <div className="struct-rail" style={{ margin: "4rem 0" }} />

        {/* AUTO */}
        <AutoMethodSubsection />

        <div className="struct-rail" style={{ margin: "4rem 0" }} />

        {/* REACH */}
        <ReachSubsection />

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #C8933F, 0 0 8px rgba(200,147,63,0.5); }
          50%       { opacity: 0.35; box-shadow: 0 0 2px #C8933F; }
        }
        .led-dot { animation: led-pulse 3s ease-in-out infinite; }
        .led-dot-1 { animation-delay: 0.75s; }
        .led-dot-2 { animation-delay: 1.5s; }
        .led-dot-3 { animation-delay: 2.25s; }
        @keyframes reach-scan-anim {
          0%   { left: -15%; }
          100% { left: 110%; }
        }
      `}} />
    </section>
  );
}
