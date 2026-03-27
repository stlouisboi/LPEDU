import FadeIn from "./FadeIn";

export default function PhilosophyQuoteBlock({ quote, attribution }) {
  return (
    <section
      data-testid="philosophy-quote-block"
      style={{
        background: "#0b1628",
        borderTop: "1px solid rgba(212,144,10,0.1)",
        borderBottom: "1px solid rgba(212,144,10,0.1)",
        padding: "56px 24px",
      }}
    >
        <FadeIn>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.6)",
            marginBottom: "1.5rem",
          }}>
            LP-DOCTRINE
          </p>
          <p style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              letterSpacing: "0.12em",
              color: "rgba(212,144,10,0.7)",
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
            fontSize: "1rem",
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
