import { Link } from "react-router-dom";

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

const mono = "'JetBrains Mono', 'Courier New', monospace";
const sans = "'Inter', sans-serif";
const heading = "'Manrope', sans-serif";

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
        borderTop: "1px solid rgba(197,160,89,0.18)",
        borderBottom: "1px solid rgba(197,160,89,0.18)",
        padding: "88px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(197,160,89,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* ── Registry Header ──────────────────────────── */}
        <div style={{ marginBottom: "2.75rem" }}>
          <p style={{
            fontFamily: mono, fontSize: "0.616rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(197,160,89,0.75)", marginBottom: "0.625rem",
          }}>
            LPOS v1.0 | LP-MOD-REACH | DIAGNOSTIC_ENGINE_v1
          </p>

          <h2 style={{
            fontFamily: heading, fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            color: "#FFFFFF", lineHeight: 1,
            letterSpacing: "-0.035em", textTransform: "uppercase",
            marginBottom: "0.875rem",
          }}>
            REACH Diagnostic
          </h2>

          <p style={{
            fontFamily: sans, fontSize: "clamp(0.925rem, 1.5vw, 1.05rem)",
            color: "rgba(255,255,255,0.62)", lineHeight: 1.7, maxWidth: 480,
          }}>
            Test whether your operation can survive the first 90 days after receiving trucking authority.
            A threshold measurement for LaunchPath Standard admission.
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
              {pillars.map((p) => {
                const tl = TRAFFIC_LIGHT[p.status] || TRAFFIC_LIGHT.PENDING_SCAN;
                return (
                <div
                  key={p.letter}
                  data-testid={`reach-pillar-${p.letter.toLowerCase()}`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(197,160,89,0.14)",
                    padding: "1.5rem 1.125rem 1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "default",
                    minWidth: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,93,4,0.55)";
                    e.currentTarget.style.background = "rgba(232,93,4,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(197,160,89,0.14)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Letter */}
                  <p style={{
                    fontFamily: mono, fontWeight: 700,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "#C5A059", lineHeight: 1,
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
                    fontFamily: sans, fontSize: "0.672rem",
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
                    <div style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: tl.color,
                      boxShadow: `0 0 5px ${tl.glow}`,
                      flexShrink: 0,
                    }} />
                    <p style={{
                      fontFamily: mono, fontSize: "0.504rem",
                      fontWeight: 700, letterSpacing: "0.14em",
                      color: tl.color,
                      textTransform: "uppercase",
                    }}>
                      {p.status}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>

            {/* System Progress Monitor */}
            <div style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(197,160,89,0.12)",
              padding: "1.25rem 1.5rem",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "0.75rem",
              }}>
                <p style={{
                  fontFamily: mono, fontSize: "0.728rem",
                  fontWeight: 700, letterSpacing: "0.1em",
                  color: "rgba(232,93,4,0.85)",
                  textTransform: "uppercase",
                }}>
                  DIAGNOSTIC_STATE:&nbsp;
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>INITIALIZING... 0%</span>
                </p>
                <p style={{
                  fontFamily: mono, fontSize: "0.504rem",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                }}>
                  ADMINISTRATIVE_STRESS_TEST: 15 DATA POINTS &nbsp;|&nbsp; EST. DURATION: 240 SECONDS
                </p>
              </div>

              {/* Progress track */}
              <div style={{
                height: 2,
                background: "rgba(255,255,255,0.07)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: "4%",
                  background: "#E85D04",
                  boxShadow: "0 0 8px rgba(232,93,4,0.6)",
                }} />
              </div>
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
                  BEGIN DIAGNOSTIC SCAN — STEP 1 OF THE STANDARD
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
                  BEGIN DIAGNOSTIC SCAN — STEP 1 OF THE STANDARD
                </p>
                <span style={{ fontFamily: mono, fontSize: "1.25rem", color: "rgba(255,255,255,0.8)", flexShrink: 0 }}>→</span>
              </Link>
            )}

          </div>

          {/* RIGHT: Vector Analysis Sidebar */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(197,160,89,0.14)",
            padding: "1.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Sidebar header */}
            <p style={{
              fontFamily: mono, fontSize: "0.56rem",
              fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(197,160,89,0.75)",
              marginBottom: "0.25rem",
            }}>
              REACH_THRESHOLD_METRICS
            </p>
            <div style={{
              height: 1, background: "rgba(197,160,89,0.22)",
              marginBottom: "1.5rem",
            }} />

            {/* Metric rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0px", flex: 1 }}>
              {METRICS.map((m, i) => (
                <div
                  key={m.key}
                  style={{
                    padding: "0.875rem 0",
                    borderBottom: i < METRICS.length - 1
                      ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <p style={{
                    fontFamily: mono, fontSize: "0.504rem",
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.38)",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}>
                    {m.key}
                  </p>
                  <p style={{
                    fontFamily: mono, fontWeight: 700,
                    fontSize: "0.784rem",
                    letterSpacing: "0.06em",
                    color: m.value === "100%" ? "#22c55e"
                      : m.value === "REQUIRED" || m.value === "ABSOLUTE" ? "#E85D04"
                      : m.value === "VERIFIED" ? "#C5A059"
                      : "rgba(255,255,255,0.72)",
                  }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}>
              <p style={{
                fontFamily: mono, fontSize: "0.504rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.28)",
                lineHeight: 1.7,
                textTransform: "uppercase",
              }}>
                DIAGNOSTIC_ACCESS: OPEN{"\n"}
                REGISTRY: LP-ASSESS-REACH-v1{"\n"}
                STANDARD: LP-STD-001
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .reach-main-grid {
            grid-template-columns: 1fr !important;
          }
          .pillar-grid {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .pillar-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 375px) {
          .pillar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
