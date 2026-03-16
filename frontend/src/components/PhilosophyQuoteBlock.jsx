import FadeIn from "./FadeIn";

export default function PhilosophyQuoteBlock({ quote, attribution }) {
  return (
    <section
      data-testid="philosophy-quote-block"
      style={{
        background: "#001530",
        borderTop: "1px solid rgba(197,160,89,0.1)",
        borderBottom: "1px solid rgba(197,160,89,0.1)",
        padding: "56px 24px",
      }}
    >
        <FadeIn>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.616rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.6)",
            marginBottom: "1.5rem",
          }}>
            LP-DOCTRINE
          </p>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.75,
            fontStyle: "italic",
            marginBottom: "1.25rem",
          }}>
            "{quote}"
          </p>
          {attribution && (
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.616rem",
              letterSpacing: "0.12em",
              color: "rgba(197,160,89,0.7)",
              textTransform: "uppercase",
            }}>
              — {attribution}
            </p>
          )}
        </div>
        <div style={{ maxWidth: 680, margin: "1.75rem auto 0", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "0.98rem",
            color: "rgba(255,255,255,0.68)",
            lineHeight: 1.7,
          }}>
            In trucking, that missing structure is usually discovered only when the New Entrant Safety Audit exposes it.
          </p>
        </div>
        </FadeIn>
    </section>
  );
}
