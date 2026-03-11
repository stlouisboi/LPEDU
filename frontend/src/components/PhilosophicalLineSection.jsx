export default function PhilosophicalLineSection({ text }) {
  return (
    <div style={{
      background: "var(--bg-onyx)",
      padding: "4rem 1.5rem",
      borderBottom: "1px solid var(--divider-dark)",
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: "clamp(1rem, 2vw, 1.25rem)",
        color: "var(--text)",
        maxWidth: 740,
        margin: "0 auto",
        lineHeight: 1.8,
        letterSpacing: "-0.01em",
      }}>
        {text}
      </p>
    </div>
  );
}
