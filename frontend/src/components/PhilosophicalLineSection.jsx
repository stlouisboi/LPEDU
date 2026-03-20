export default function PhilosophicalLineSection({ text }) {
  return (
    <div data-testid="philosophical-line-section" style={{
      background: "#060D18",
      padding: "5.5rem 1.5rem",
      borderTop: "1px solid rgba(212,144,10,0.35)",
      borderBottom: "1px solid rgba(212,144,10,0.35)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative large quotation mark */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "-1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "Georgia, serif",
        fontSize: "12rem",
        color: "rgba(212,144,10,0.07)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>"</div>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
        color: "rgba(244,247,251,0.88)",
        maxWidth: 740,
        margin: "0 auto",
        lineHeight: 1.85,
        letterSpacing: "-0.01em",
        position: "relative",
        zIndex: 1,
      }}>
        {text}
      </p>
    </div>
  );
}
