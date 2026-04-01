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
  { num: "01", name: "REACH",         role: "Qualification Gate",    sub: "GO / WAIT / NO-GO",        color: GOLD,      href: "/reach-diagnostic" },
  { num: "02", name: "GROUND 0",      role: "Orientation & Posture", sub: "Awareness before action",   color: GOLD,      href: "/ground-0-briefing" },
  { num: "03", name: "FOUR PILLARS",  role: "The Guard",             sub: "Authority · Insurance · Compliance · Cash", color: "#3d9970", href: "/doctrine" },
  { num: "04", name: "AUTO",          role: "The Breach Map",        sub: "Around · Under · Through · Over", color: "#C0392B", href: "/standards/auto-method" },
  { num: "05", name: "16 SINS",       role: "The Threat Taxonomy",   sub: "Named exposure patterns",   color: "#C0392B", href: "/standards/16-deadly-sins" },
  { num: "06", name: "MODULES",       role: "The Installation",      sub: "9 safeguards installed",    color: GOLD,      href: "/standard" },
];

function SystemArchitectureDiagram() {
  return (
    <div
      data-testid="system-architecture-diagram"
      style={{
        background: "#0B1525",
        border: "1px solid rgba(200,147,63,0.20)",
        borderTop: `3px solid ${GOLD}`,
        padding: "2.5rem 2rem 2rem",
        marginBottom: "4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", margin: 0 }}>
            SYSTEM ARCHITECTURE
          </p>
          <div style={{ flex: 1, height: 1, background: "rgba(200,147,63,0.15)" }} />
          <p style={{ fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(200,147,63,0.30)", margin: 0 }}>
            LP-SYS-001
          </p>
        </div>

        {/* Step sequence */}
        <div className="arch-sequence" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {ARCH_STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
              {/* Step card — linked */}
              <Link
                to={step.href}
                data-testid={`arch-step-${step.num}`}
                className="arch-step-card"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "rgba(244,241,235,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderTop: `2px solid ${step.color}`,
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                  position: "relative",
                  textDecoration: "none",
                  display: "block",
                  transition: "background 0.18s, border-color 0.18s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${step.color}12`; e.currentTarget.style.borderColor = `${step.color}55`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(244,241,235,0.025)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* Step number */}
                <p style={{ fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.18em", color: `${step.color}66`, margin: "0 0 0.5rem" }}>
                  {step.num}
                </p>
                {/* Step name */}
                <p style={{ fontFamily: SANS, fontWeight: 800, fontSize: "clamp(0.62rem, 1.1vw, 0.82rem)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 0.35rem", lineHeight: 1.3 }}>
                  {step.name}
                </p>
                {/* Role */}
                <p style={{ fontFamily: SANS, fontSize: "clamp(0.58rem, 0.9vw, 0.72rem)", color: step.color, margin: "0 0 0.35rem", fontWeight: 600 }}>
                  {step.role}
                </p>
                {/* Sub-descriptor */}
                <p style={{ fontFamily: MONO, fontSize: "clamp(0.50rem, 0.75vw, 0.62rem)", color: "rgba(138,150,168,0.65)", margin: 0, lineHeight: 1.45, letterSpacing: "0.03em" }}>
                  {step.sub}
                </p>
                {/* Link indicator */}
                <p style={{ fontFamily: MONO, fontSize: "0.52rem", color: `${step.color}55`, margin: "0.6rem 0 0", letterSpacing: "0.10em" }}>→</p>
              </Link>

              {/* Arrow connector */}
              {i < ARCH_STEPS.length - 1 && (
                <div className="arch-arrow" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 22, color: "rgba(200,147,63,0.35)", fontSize: "0.75rem", userSelect: "none" }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p style={{ fontFamily: MONO, fontSize: "0.600rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(138,150,168,0.40)", margin: "1.5rem 0 0", textAlign: "center" }}>
          Each layer has a specific function. Each connects to the next. The order is not optional.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .arch-sequence { flex-direction: column !important; gap: 0 !important; }
          .arch-arrow { transform: rotate(90deg); width: 100% !important; height: 20px; }
          .arch-step-card { text-align: left !important; padding: 1rem 1.25rem !important; }
        }
      `}} />
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

        {/* System Architecture Diagram */}
        <SystemArchitectureDiagram />

        {/* Section label */}
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.25rem" }}>
          THE LAUNCHPATH PROTECTION SYSTEM
        </p>

        {/* Opening copy */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 720, marginBottom: "1.25rem" }}>
          REACH reveals the exposure. Ground 0 forms the posture. The Four Pillars create the guard. AUTO maps the breach paths. The 16 Deadly Sins name the threats. The modules install the protection.
        </p>
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 720, marginBottom: "4.5rem" }}>
          That is the system. That is the order. Each layer has a specific function and connects to the next.
        </p>

        <div className="struct-rail" style={{ marginBottom: "4rem" }} />

        {/* Four Pillars */}
        <FourPillarsSubsection />

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
