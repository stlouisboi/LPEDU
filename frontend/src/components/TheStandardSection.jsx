import { Link } from '../compat/Link';

const GOLD   = "#C8933F";
const NAVY   = "#1B2A47";
const DEEP   = "#111D33";
const BODY   = "rgba(244,241,235,0.80)";
const MUTED  = "rgba(138,150,168,0.85)";
const MONO   = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Inter', sans-serif";

// ── Section label ────────────────────────────────────────────────────────
function SubLabel({ children }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: "0.668rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

// ── 5a: Four Pillars ─────────────────────────────────────────────────────
const PILLARS = [
  { name: "Authority Protection", desc: "Drivers and files that actually pass a look." },
  { name: "Insurance Continuity", desc: "Filings and coverage that don't quietly lapse." },
  { name: "Compliance Backbone", desc: "D&A, HOS, and maintenance that are documented, not guessed." },
  { name: "Cash-Flow Oxygen", desc: "Revenue and costs that keep the truck — and you — breathing." },
];

function FourPillarsSubsection() {
  return (
    <div style={{ marginBottom: "5rem" }}>
      <SubLabel>THE GUARD</SubLabel>
      <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.75rem" }}>
        THE FOUR PILLARS
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 600 }}>
        First, we help you build the Four Pillars that hold up your authority:
      </p>
      <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.75rem" }}>
        {PILLARS.map((p, i) => (
          <div
            key={i}
            data-testid={`pillar-card-${i}`}
            style={{ background: DEEP, borderTop: `3px solid ${GOLD}`, padding: "1.75rem 1.5rem", position: "relative", overflow: "hidden" }}
          >
            {/* Pulsing LED status dot */}
            <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <div className={`led-dot led-dot-${i}`} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: GOLD,
                boxShadow: `0 0 4px ${GOLD}, 0 0 8px rgba(200,147,63,0.5)`,
              }} />
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1rem", color: GOLD, marginBottom: "0.625rem" }}>
              {p.name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: MUTED, fontStyle: "italic", margin: 0 }}>
        These are not forms or checklists. This is the physical guard around your authority.
      </p>
    </div>
  );
}

// ── 5b: AUTO Method ──────────────────────────────────────────────────────
const AUTO_VECTORS = [
  { letter: "A", direction: "Around", desc: "Money leaks and broker dependence that bypass your cash controls." },
  { letter: "U", direction: "Under",  desc: "Missed updates, expired certs, and quiet admin misses." },
  { letter: "T", direction: "Through", desc: "No lanes, no SOPs, dispatch by gut feel." },
  { letter: "O", direction: "Over",   desc: "Costs and bad deals that climb over your margins." },
];

function AutoMethodSubsection() {
  return (
    <div style={{ marginBottom: "5rem" }}>
      <SubLabel>THE TEST</SubLabel>
      <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.75rem" }}>
        THE AUTO METHOD
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 600 }}>
        Once the guard is built, we test it from four directions:
      </p>
      <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.75rem" }}>
        {AUTO_VECTORS.map((v, i) => (
          <div
            key={i}
            data-testid={`auto-card-${v.letter.toLowerCase()}`}
            className="inset-card"
            style={{ background: "rgba(244,241,235,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem 1.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.625rem" }}>
              <span
                className="auto-letter-btn"
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
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0e1829"; e.currentTarget.style.boxShadow = `inset 0 -2px 4px rgba(0,0,0,0.20), 0 0 18px rgba(200,147,63,0.60), 0 0 6px rgba(200,147,63,0.90)`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F4F1EB"; e.currentTarget.style.color = NAVY; e.currentTarget.style.boxShadow = "inset 0 -2px 4px rgba(0,0,0,0.25), 0 2px 0 rgba(0,0,0,0.40)"; }}
              >
                {v.letter}
              </span>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "0.952rem", color: "#FFFFFF" }}>
                {v.direction}
              </span>
            </div>
            <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.7, margin: 0 }}>
              {v.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.906rem", color: MUTED, lineHeight: 1.7, marginBottom: "1.5rem" }}>
        If risk can reach your authority from any direction, the guard has failed. Doesn't matter how good the other three sides look.
      </p>
      <Link
        to="/auto-method"
        data-testid="auto-method-link"
        style={{ fontFamily: MONO, fontSize: "0.806rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "#e8a958"}
        onMouseLeave={e => e.currentTarget.style.color = GOLD}
      >
        See how the AUTO Method works →
      </Link>
    </div>
  );
}

// ── 5c: REACH Assessment ─────────────────────────────────────────────────
const REACH_STATUS = [
  { label: "GO",     desc: "Guard is installed. You're ready to move.",                                    color: "#16A34A", border: "rgba(22,163,74,0.35)", bg: "rgba(22,163,74,0.06)" },
  { label: "WAIT",   desc: "Guard has gaps. Fix them before you push harder.",                             color: "#D97706", border: "rgba(217,119,6,0.35)",  bg: "rgba(217,119,6,0.06)"  },
  { label: "NO-GO",  desc: "Guard has failed. Running like this is putting your authority on the line.",   color: "#C0392B", border: "rgba(192,57,43,0.35)", bg: "rgba(192,57,43,0.06)"  },
];

function ReachAssessmentSubsection() {
  return (
    <div>
      <SubLabel>YOUR STATUS</SubLabel>
      <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", letterSpacing: "-0.03em", color: "#FFFFFF", marginBottom: "0.75rem" }}>
        THE REACH ASSESSMENT
      </h3>
      <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 600 }}>
        Finally, we run the REACH Assessment — a 14-question inspection that tells you in plain language where you stand:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
        {REACH_STATUS.map((s, i) => (
          <div
            key={i}
            data-testid={`reach-status-${s.label.toLowerCase().replace("-", "")}`}
            style={{ background: s.bg, border: `1px solid ${s.border}`, borderLeft: `3px solid ${s.color}`, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden" }}
          >
            {/* Scan line animation */}
            <div className={`reach-scan reach-scan-${i}`} style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              pointerEvents: "none",
            }}>
              <div style={{
                position: "absolute", top: 0, left: "-15%", width: "12%", height: "100%",
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)`,
                animation: `reach-scan-anim 3s linear ${i * 0.8}s infinite`,
              }} />
            </div>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.857rem", letterSpacing: "0.12em", color: s.color, background: `rgba(${s.color === "#16A34A" ? "22,163,74" : s.color === "#D97706" ? "217,119,6" : "192,57,43"},0.12)`, padding: "0.3rem 0.7rem", flexShrink: 0 }}>
              {s.label}
            </span>
            <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: BODY, lineHeight: 1.65, margin: 0 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: MUTED, lineHeight: 1.7, marginBottom: "2.5rem" }}>
        You don't need to guess where you stand. You'll see it in black and white.
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
        BEGIN REACH CHECK →
      </Link>
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

        {/* Section label */}
        <p style={{ fontFamily: MONO, fontSize: "0.714rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.60)", marginBottom: "1.25rem" }}>
          THE STANDARD
        </p>

        {/* Headline */}
        <h2 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "2rem" }}>
          THE LAUNCHPATH COMPLIANCE<br />HIERARCHY OF PROTECTION
        </h2>

        {/* Opening copy */}
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 760, marginBottom: "1.25rem" }}>
          The LaunchPath Compliance Hierarchy of Protection is the guard we install around your MC authority. It is built from OSHA machine-guarding methodology — layered, directional, and tested from every angle risk can come at you.
        </p>
        <p style={{ fontFamily: SANS, fontSize: "1.064rem", color: BODY, lineHeight: 1.85, maxWidth: 760, marginBottom: "4.5rem" }}>
          A wise carrier doesn't wait on FMCSA to point out the gaps. You find them yourself, fix them, and then go to work.
        </p>

        {/* Horizontal divider */}
        <div className="struct-rail" style={{ marginBottom: "4rem" }} />

        {/* 5a */}
        <FourPillarsSubsection />

        {/* Divider */}
        <div className="struct-rail" style={{ margin: "4rem 0" }} />

        {/* 5b */}
        <AutoMethodSubsection />

        {/* Divider */}
        <div className="struct-rail" style={{ margin: "4rem 0" }} />

        {/* 5c */}
        <ReachAssessmentSubsection />

      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}
