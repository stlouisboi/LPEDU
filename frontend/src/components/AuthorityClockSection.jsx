const TIMELINE = [
  {
    code: "DAY 1",
    label: "Authority Active",
    body: "Insurance filings, driver files, safety systems, and compliance records must already be operational. The compliance clock starts at activation, not at the first load.",
    accent: true,
  },
  {
    code: "DAYS 1–60",
    label: "Operational Pattern Formation",
    body: "Driver logs, maintenance records, and dispatch behavior begin establishing the compliance patterns investigators later review. What is built here defines the audit record.",
  },
  {
    code: "DAYS 60–90",
    label: "Audit Exposure Window",
    body: "Many carriers receive their New Entrant Safety Audit notification during this period. If operational systems are not installed, the audit becomes a reconstruction exercise rather than verification.",
    warning: true,
  },
  {
    code: "MONTHS 12–24",
    label: "Safety Review Monitoring",
    body: "The New Entrant monitoring period continues until the carrier successfully passes the safety audit and maintains compliance performance.",
  },
];

export default function AuthorityClockSection() {
  return (
    <section
      data-testid="authority-clock-section"
      style={{
        background: "#001A33",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* LP code label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.672rem",
          color: "rgba(197,160,89,0.55)",
          letterSpacing: "0.12em",
          marginBottom: "2rem",
        }}>
          LP-TIM-001 | AUTHORITY ACTIVATION TIMELINE
        </div>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem", fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#C5A059", marginBottom: "1rem",
          }}>
            The 90-Day Authority Clock
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "1.25rem",
            maxWidth: 620,
          }}>
            When a motor carrier activates authority, the compliance timeline begins immediately.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.85,
            maxWidth: 580,
          }}>
            The first ninety days are not a grace period. They are the period when the operational systems that determine long-term survival must be installed. Carriers that wait until the audit notice arrives are already behind.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: "3.5rem" }}>
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              data-testid={`clock-stage-${idx}`}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "2.5rem",
                borderLeft: `3px solid ${item.accent ? "#C5A059" : item.warning ? "rgba(197,130,89,0.7)" : "rgba(197,160,89,0.25)"}`,
                padding: "2rem 0 2rem 2.5rem",
                borderBottom: idx < TIMELINE.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
              className="clock-row"
            >
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.784rem",
                  fontWeight: 700,
                  color: item.accent ? "#C5A059" : item.warning ? "rgba(197,130,89,0.8)" : "rgba(197,160,89,0.55)",
                  letterSpacing: "0.06em",
                  marginBottom: "0.3rem",
                }}>
                  {item.code}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                }}>
                  {item.label}
                </p>
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.8,
                alignSelf: "center",
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "2.5rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.98rem, 2vw, 1.12rem)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            marginBottom: "0.5rem",
          }}>
            FMCSA does not audit paperwork.
          </p>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(0.98rem, 2vw, 1.12rem)",
            color: "#C5A059",
            lineHeight: 1.7,
          }}>
            They audit the operational patterns created during the first months of authority.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .clock-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  );
}
