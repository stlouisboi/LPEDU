import FadeIn from "./FadeIn";

export default function ConsequenceNumberBlock() {
  return (
    <section
      data-testid="consequence-number-block"
      style={{
        background: "#000D1A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 24px",
      }}
    >
      <FadeIn>
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
          borderLeft: "3px solid rgba(248,113,113,0.55)",
          paddingLeft: "2rem",
        }}>

          {/* Header */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(248,113,113,0.85)",
            marginBottom: "1.25rem",
          }}>
            The Cost of Getting This Wrong
          </p>

          {/* Body */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            marginBottom: "2rem",
            maxWidth: 620,
          }}>
            A conditional safety rating after a New Entrant Safety Audit can trigger insurance non-renewal, broker blacklisting, and authority shutdown within 30 days.
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "2rem" }} />

          {/* Comparison */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "2.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}>
            <div>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#f87171",
                lineHeight: 1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}>
                $15,000 – $30,000
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.55,
              }}>
                Average post-audit<br />remediation cost
              </p>
            </div>

            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.98rem",
              color: "rgba(255,255,255,0.18)",
              alignSelf: "center",
              paddingTop: "0.125rem",
            }}>
              vs.
            </p>

            <div>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#C5A059",
                lineHeight: 1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}>
                $5,000
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.55,
              }}>
                The LaunchPath<br />Standard
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />

          {/* Footer note */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.65,
          }}>
            This does not include lost revenue from suspended operations, insurance premium increases, or the cost of rebuilding broker relationships.
          </p>

        </div>
      </FadeIn>
    </section>
  );
}
