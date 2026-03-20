export default function SocialProofPlaceholder() {
  return (
    <section
      data-testid="social-proof-placeholder"
      style={{
        background: "#060c16",
        borderTop: "1px solid rgba(212,144,10,0.14)",
        borderBottom: "1px solid rgba(212,144,10,0.10)",
        padding: "4.5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.40)",
          marginBottom: "1.5rem",
        }}>
          LP-PRF-001 — COHORT OUTCOMES
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.05rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.75,
          marginBottom: "0.5rem",
        }}>
          First cohort launching Q2 2026.
          Outcome reporting begins with inaugural operators.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-sm)",
          color: "rgba(255,255,255,0.28)",
          lineHeight: 1.7,
          margin: 0,
        }}>
          Built for the first installation cohort of new authorities.
        </p>

      </div>
    </section>
  );
}
