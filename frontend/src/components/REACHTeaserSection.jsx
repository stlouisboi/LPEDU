import { Link } from '../compat/Link';

const PILLARS = [
  { letter: "R", name: "Resources", desc: "Capital runway, reserve depth, repair buffer", status: "PENDING_SCAN" },
  { letter: "E", name: "Experience", desc: "Logistics, HOS, broker contract knowledge", status: "PENDING_SCAN" },
  { letter: "A", name: "Authority Readiness", desc: "DQ file, D&A program, maintenance records", status: "PENDING_SCAN" },
  { letter: "C", name: "Commitment", desc: "Operational hours, long-term discipline index", status: "PENDING_SCAN" },
  { letter: "H", name: "Operational Discipline", desc: "Launch timeline, contingency structure", status: "PENDING_SCAN" },
];

// Traffic-light color map — status → color + glow
const TRAFFIC_LIGHT = {
  COMPLETE:     { color: "#22c55e", glow: "rgba(34,197,94,0.55)" },
  VERIFIED:     { color: "#22c55e", glow: "rgba(34,197,94,0.55)" },
  GO:           { color: "#22c55e", glow: "rgba(34,197,94,0.55)" },
  PENDING_SCAN: { color: "#F59E0B", glow: "rgba(245,158,11,0.55)" },
  WAIT:         { color: "#F59E0B", glow: "rgba(245,158,11,0.55)" },
  PENDING:      { color: "#F59E0B", glow: "rgba(245,158,11,0.55)" },
  FAILED:       { color: "#f87171", glow: "rgba(248,113,113,0.55)" },
  CRITICAL:     { color: "#f87171", glow: "rgba(248,113,113,0.55)" },
  "NO-GO":      { color: "#f87171", glow: "rgba(248,113,113,0.55)" },
};

const METRICS = [
  { key: "MIN_COMMITMENT", value: "100%" },
  { key: "OP_DISCIPLINE", value: "REQUIRED" },
  { key: "AUTHORITY_READINESS", value: "VERIFIED" },
  { key: "DIAGNOSTIC_PRECEDENCE", value: "ABSOLUTE" },
  { key: "DATA_POINTS", value: "15" },
  { key: "THRESHOLD_CLASS", value: "LP-STD-001" },
];

const mono = "'JetBrains Mono', monospace";
const sans = "'Inter', sans-serif";
const heading = "'Newsreader', 'Playfair Display', serif";

export function REACHTeaserSection({ onBegin, pillarStatuses }) {
  // Merge any passed-in statuses over the defaults
  const pillars = pillarStatuses
    ? PILLARS.map((p, i) => ({ ...p, status: pillarStatuses[i] || p.status }))
    : PILLARS;
  return (
    <section
      data-testid="reach-teaser-section"
      style={{
        background: "#020617",
        borderTop: "1px solid rgba(212,144,10,0.18)",
        borderBottom: "1px solid rgba(212,144,10,0.18)",
        padding: "88px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(212,144,10,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,144,10,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── Registry Header ──────────────────────────── */}
        <div style={{ marginBottom: "2.75rem" }}>
          <p style={{
            fontFamily: mono, fontSize: "0.714rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(212,144,10,0.75)", marginBottom: "0.625rem",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            LP-MOD-REACH · DIAGNOSTIC_ENGINE_v1
          </p>

          <h2 style={{
            fontFamily: heading, fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            color: "#FFFFFF", lineHeight: 1,
            letterSpacing: "-0.035em", textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            REACH Assessment
          </h2>

          <p style={{
            fontFamily: sans, fontSize: "clamp(0.925rem, 1.5vw, 1.05rem)",
            color: "rgba(212,144,10,0.8)", lineHeight: 1.4, maxWidth: 520,
            fontStyle: "italic", marginBottom: "1rem",
          }}>
            A survival check — not a quiz.
          </p>

          <p style={{
            fontFamily: sans, fontSize: "clamp(0.875rem, 1.4vw, 0.975rem)",
            color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 520,
            marginBottom: "0.75rem",
          }}>
            Before we install any compliance system, we run a simple REACH check. Fifteen questions about money, experience, paperwork, commitment, and how you make decisions.
          </p>
          <p style={{
            fontFamily: sans, fontSize: "clamp(0.875rem, 1.4vw, 0.975rem)",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 520,
            marginBottom: "0.75rem",
          }}>
            It's not about judging you. It's about finding out if the conditions to survive are actually there right now.
          </p>
          <p style={{
            fontFamily: sans, fontSize: "clamp(0.875rem, 1.4vw, 0.975rem)",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 520,
          }}>
            This is not a test you pass to impress us. This is a reality check to keep you from walking into a bad deal with your own name on the door.
          </p>
        </div>

        {/* ── Main Grid: Content + Sidebar ─────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "2px",
          marginBottom: "2px",
        }} className="reach-main-grid">

          {/* LEFT: Pillar grid + Monitor + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>

            {/* R-E-A-C-H Pillar Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "2px",
            }} className="pillar-grid">
              {pillars.map((p, pi) => {
                const tl = TRAFFIC_LIGHT[p.status] || TRAFFIC_LIGHT.PENDING_SCAN;
                return (
                <div
                  key={p.letter}
                  data-testid={`reach-pillar-${p.letter.toLowerCase()}`}
                  className="pillar-card"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,144,10,0.14)",
                    padding: "1.5rem 1.125rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(0,0,0,0.20), inset -2px 0 6px rgba(0,0,0,0.35)",
                    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                    cursor: "default",
                    minWidth: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,93,4,0.55)";
                    e.currentTarget.style.background = "rgba(232,93,4,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,144,10,0.14)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Letter */}
                  <p style={{
                    fontFamily: mono, fontWeight: 700,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "#d4900a", lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}>
                    {p.letter}
                  </p>

                  {/* Pillar name */}
                  <p style={{
                    fontFamily: sans, fontWeight: 700,
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.3,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}>
                    {p.name}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontFamily: sans, fontSize: "0.762rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.55, flexGrow: 1,
                  }}>
                    {p.desc}
                  </p>

                  {/* Traffic-light status indicator */}
                  <div style={{
                    marginTop: "auto",
                    paddingTop: "0.625rem",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                  }}>
                    <div
                      className={`reach-tl-dot${pi > 0 ? ` reach-tl-dot-${pi}` : ""}${(p.status === "PENDING_SCAN" || p.status === "PENDING") ? " reach-tl-pending" : ""}`}
                      style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: tl.color,
                        boxShadow: `0 0 5px ${tl.glow}`,
                        flexShrink: 0,
                      }}
                    />
                    <p style={{
                      fontFamily: mono, fontSize: "0.714rem",
                      fontWeight: 700, letterSpacing: "0.12em",
                      color: tl.color,
                      textTransform: "uppercase",
                    }}>
                      {p.status === "PENDING_SCAN" ? "PENDING" : p.status}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Progress track */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4%", background: "#E85D04", boxShadow: "0 0 8px rgba(232,93,4,0.6)" }} />
            </div>

            {/* Microcopy above start */}
            <div style={{ padding: "1rem 1.5rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(212,144,10,0.1)", borderLeft: "2px solid rgba(212,144,10,0.35)" }}>
              <p style={{ fontFamily: mono, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0 }}>
                Answer every question for where you are today, not where you hope to be. This check only works if it tells the truth.
              </p>
            </div>

            {/* WHAT YOU GET AT THE END */}
            <div style={{ padding: "1.25rem 1.5rem", background: "rgba(212,144,10,0.04)", border: "1px solid rgba(212,144,10,0.14)", borderTop: "2px solid rgba(212,144,10,0.35)" }}>
              <p style={{ fontFamily: mono, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.55)", marginBottom: "0.875rem" }}>
                WHAT YOU GET AT THE END
              </p>
              <p style={{ fontFamily: mono, fontSize: "0.762rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "0.875rem" }}>
                After 15 questions, you receive one of three ratings:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                {[
                  { label: "GO", color: "#27ae60", desc: "Guard is installed. Your operation is structurally sound." },
                  { label: "WAIT", color: "#C8933F", desc: "Guard has gaps. Specific domains need attention before you push harder." },
                  { label: "NO-GO", color: "#e74c3c", desc: "Guard has failed. Running like this puts your authority at risk." },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: mono, fontSize: "0.625rem", fontWeight: 700, color: r.color, letterSpacing: "0.10em", flexShrink: 0, minWidth: 50, marginTop: "0.1rem" }}>{r.label}</span>
                    <p style={{ fontFamily: mono, fontSize: "0.714rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.55, margin: 0 }}>{r.desc}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: mono, fontSize: "0.625rem", color: "rgba(255,255,255,0.30)", lineHeight: 1.65, margin: 0, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem", letterSpacing: "0.04em" }}>
                Each rating includes a domain-by-domain breakdown showing exactly where your exposure is — and which LaunchPath resource addresses it. No sales call. No email required. Results are immediate.
              </p>
            </div>

            {/* CTA — button when embedded (onBegin), Link when standalone */}
            {onBegin ? (
              <button
                onClick={onBegin}
                data-testid="reach-begin-diagnostic-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "1.5rem", background: "#E85D04", padding: "1.375rem 1.75rem",
                  border: "none", width: "100%", cursor: "pointer",
                  transition: "background 0.2s, transform 0.15s", minHeight: 64,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FF6B1A"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#E85D04"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <p style={{ fontFamily: sans, fontWeight: 800, fontSize: "clamp(0.825rem, 1.5vw, 0.95rem)", color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3, margin: 0 }}>
                  BEGIN REACH CHECK
                </p>
                <span style={{ fontFamily: mono, fontSize: "1.25rem", color: "rgba(255,255,255,0.8)", flexShrink: 0 }}>→</span>
              </button>
            ) : (
              <Link
                to="/reach-diagnostic"
                data-testid="reach-begin-diagnostic-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "1.5rem", background: "#E85D04", padding: "1.375rem 1.75rem",
                  textDecoration: "none", transition: "background 0.2s, transform 0.15s", minHeight: 64,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FF6B1A"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#E85D04"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <p style={{ fontFamily: sans, fontWeight: 800, fontSize: "clamp(0.825rem, 1.5vw, 0.95rem)", color: "#FFFFFF", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3 }}>
                  BEGIN REACH CHECK
                </p>
                <span style={{ fontFamily: mono, fontSize: "1.25rem", color: "rgba(255,255,255,0.8)", flexShrink: 0 }}>→</span>
              </Link>
            )}

          </div>

        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes reach-scan-anim {
          0%   { left: -15%; }
          100% { left: 110%; }
        }
        @keyframes reach-led-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 5px currentColor; }
          50%       { opacity: 0.35; box-shadow: 0 0 2px currentColor; }
        }
        .reach-tl-dot { animation: none; }
        .reach-tl-dot.reach-tl-pending { animation: none; }
        .reach-tl-dot.reach-tl-pending.reach-tl-dot-1 { animation: none; }
        .reach-tl-dot.reach-tl-pending.reach-tl-dot-2 { animation: none; }
        .reach-tl-dot.reach-tl-pending.reach-tl-dot-3 { animation: none; }
        .reach-tl-dot.reach-tl-pending.reach-tl-dot-4 { animation: none; }
        @media (max-width: 768px) {
          .reach-main-grid {
            grid-template-columns: 1fr !important;
          }
          .pillar-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .pillar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .pillar-card {
            padding: 1rem 0.75rem !important;
          }
        }
        @media (max-width: 320px) {
          .pillar-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
