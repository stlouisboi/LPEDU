const FOR_YOU = [
  "You received your MC number in the last 90 days and haven't built your compliance files",
  "You are pre-authority and want the system installed before Day 1",
  "You are approaching Month 9 and have not been audited yet",
  "You run 1–3 trucks and are the person responsible for your own compliance",
];

const NOT_FOR_YOU = [
  "You are looking for someone to file your paperwork or manage your operation",
  "You need a compliance broker, a dispatch service, or a freight agent",
  "You already have a dedicated safety director or compliance team in place",
  "You want a general trucking course or CDL training program",
];

export default function OperatorQualifierSection() {
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
            fontSize: "0.64rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.50)",
            marginBottom: "2rem",
          }}>
            LP-QFY-001 — OPERATOR QUALIFICATION FILTER
          </p>

          {/* Two-column card grid */}
          <div className="qualifier-grid">

            {/* Left card — FOR YOU */}
            <div style={{
              background: "#0c1420",
              borderLeft: "4px solid #d4900a",
              padding: "2.25rem 2rem 2.25rem 1.75rem",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.70rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#d4900a",
                marginBottom: "1.75rem",
              }}>
                THIS IS FOR YOU IF:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {FOR_YOU.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
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
            </div>

            {/* Right card — NOT FOR YOU */}
            <div style={{
              background: "#0c1420",
              borderLeft: "4px solid #8b2f2f",
              padding: "2.25rem 2rem 2.25rem 1.75rem",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.70rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9b3535",
                marginBottom: "1.75rem",
              }}>
                THIS IS NOT FOR YOU IF:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {NOT_FOR_YOU.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
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

          </div>

          {/* Below cards — diagnostic link */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
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
