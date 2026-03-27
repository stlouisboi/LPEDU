import { useState, useMemo } from "react";

const FOR_YOU = [
  "You received your MC number and you are not certain every required file is complete and current",
  "You are pre-authority and want the infrastructure installed before the clock starts — not while it's running",
  "You are approaching Month 9 and your compliance documentation has not been formally verified",
  "You run 1–5 trucks and you are the only person responsible for your own compliance record",
];

const NOT_FOR_YOU = [
  "You are looking for someone to file your paperwork or manage your operation",
  "You need a compliance broker, a dispatch service, or a freight agent",
  "You already have a dedicated safety director or compliance team in place",
  "You want a general trucking course or CDL training program",
];

export default function OperatorQualifierSection() {
  const [authorityDate, setAuthorityDate] = useState("");

  const windowData = useMemo(() => {
    if (!authorityDate) return null;
    const issued = new Date(authorityDate);
    const today = new Date();
    const days = Math.max(0, Math.floor((today - issued) / (1000 * 60 * 60 * 24)));
    const pct = Math.min(100, Math.round((days / 90) * 100));
    if (days <= 30) return { days, pct, label: "EARLY WINDOW", color: "#d4900a", msg: "System installation is recommended within the first 30 days." };
    if (days <= 60) return { days, pct, label: "ACTIVE WINDOW", color: "#d4900a", msg: "You are in the critical compliance installation phase." };
    if (days <= 89) return { days, pct, label: "CLOSING WINDOW", color: "#c45c00", msg: `${90 - days} days remaining before the 90-day threshold.` };
    return { days, pct, label: "THRESHOLD REACHED", color: "#8b2f2f", msg: "Month 3 exposure is active. Immediate action recommended." };
  }, [authorityDate]);

  return (
    <>
      <style>{`
        .qualifier-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 720px) {
          .qualifier-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        data-testid="operator-qualifier-section"
        style={{
          background: "#090f16",
          borderTop: "1px solid rgba(212,144,10,0.32)",
          borderBottom: "1px solid rgba(212,144,10,0.32)",
          padding: "4.5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* System code label */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.50)",
            marginBottom: "2rem",
          }}>
            LP-QFY-001 — OPERATOR QUALIFICATION FILTER
          </p>

          {/* Two-column card grid — scan container */}
          <div className="qualifier-grid scan-container">

            {/* ── Left card — FOR YOU ── */}
            <div className="inset-card" style={{
              background: "#0c1420",
              borderLeft: "3px solid #d4900a",
              padding: "2.25rem 2rem 2.25rem 1.75rem",
              position: "relative",
            }}>
              {/* LED + label row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.75rem" }}>
                <div className="led-gold" />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#d4900a", margin: 0,
                }}>THIS IS FOR YOU IF:</p>
              </div>

              {/* Checklist items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {FOR_YOU.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
                      color: "#d4900a",
                      flexShrink: 0,
                      lineHeight: 1.65,
                      fontWeight: 700,
                    }}>→</span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.938rem",
                      color: "rgba(255,255,255,0.82)",
                      lineHeight: 1.68,
                      margin: 0,
                    }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* ── Authority Window Clock ── */}
              <div style={{
                marginTop: "1.75rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(212,144,10,0.18)",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(212,144,10,0.45)",
                  marginBottom: "0.875rem",
                }}>
                  LP-WIN-001 — AUTHORITY WINDOW STATUS
                </p>

                {/* Date input */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <label style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.857rem",
                    color: "rgba(255,255,255,0.50)",
                    whiteSpace: "nowrap",
                  }}>
                    MC issue date:
                  </label>
                  <input
                    data-testid="authority-date-input"
                    type="date"
                    value={authorityDate}
                    onChange={(e) => setAuthorityDate(e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(212,144,10,0.22)",
                      color: "rgba(255,255,255,0.75)",
                      padding: "0.375rem 0.625rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
                      outline: "none",
                      cursor: "pointer",
                      colorScheme: "dark",
                    }}
                  />
                </div>

                {windowData ? (
                  <div data-testid="window-status-display">
                    {/* Day counter + status badge */}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.625rem", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: windowData.color,
                        lineHeight: 1,
                      }}>
                        Day {windowData.days}
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.857rem",
                        color: "rgba(255,255,255,0.35)",
                      }}>
                        of 90
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.714rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: windowData.color,
                        border: `1px solid ${windowData.color}`,
                        padding: "0.15rem 0.5rem",
                        marginLeft: "0.25rem",
                      }}>
                        {windowData.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                      height: 3,
                      background: "rgba(255,255,255,0.07)",
                      marginBottom: "0.625rem",
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute",
                        left: 0, top: 0, bottom: 0,
                        width: `${windowData.pct}%`,
                        background: windowData.color,
                        transition: "width 0.4s ease",
                      }} />
                    </div>

                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
                      color: "rgba(255,255,255,0.52)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      {windowData.msg}
                    </p>
                  </div>
                ) : (
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.857rem",
                    color: "rgba(255,255,255,0.28)",
                    fontStyle: "italic",
                    margin: 0,
                  }}>
                    Enter your MC issue date to see your window status.
                  </p>
                )}
              </div>
              {/* ── end Authority Window Clock ── */}

            </div>
            {/* ── end Left card ── */}

            {/* ── Right card — NOT FOR YOU ── */}
            <div className="inset-card" style={{
              background: "#0c1420",
              borderLeft: "3px solid #8b2f2f",
              padding: "2.25rem 2rem 2.25rem 1.75rem",
              position: "relative",
            }}>
              {/* LED + label row */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.75rem" }}>
                <div className="led-red" />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.714rem", fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#9b3535", margin: 0,
                }}>THIS IS NOT FOR YOU IF:</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {NOT_FOR_YOU.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
                      color: "#8b2f2f",
                      flexShrink: 0,
                      lineHeight: 1.65,
                      fontWeight: 700,
                    }}>✗</span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.938rem",
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.68,
                      margin: 0,
                    }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* ── end Right card ── */}

          </div>
          {/* ── end qualifier-grid ── */}

          {/* Below cards — diagnostic link */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-sm)",
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginTop: "2.25rem",
            lineHeight: 1.6,
          }}>
            If you are not sure,{" "}
            <a
              href="/reach-diagnostic"
              data-testid="reach-diagnostic-link"
              style={{
                color: "rgba(212,144,10,0.65)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(212,144,10,0.25)",
                paddingBottom: "1px",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#d4900a"; e.currentTarget.style.borderColor = "rgba(212,144,10,0.55)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(212,144,10,0.65)"; e.currentTarget.style.borderColor = "rgba(212,144,10,0.25)"; }}
            >
              the REACH Diagnostic will tell you in 4 minutes.
            </a>
          </p>

        </div>
      </section>
    </>
  );
}
