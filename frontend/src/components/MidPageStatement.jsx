import FadeIn from "./FadeIn";

export default function MidPageStatement() {
  return (
    <section
      data-testid="mid-page-statement"
      style={{
        background: "#000508",
        borderTop: "1px solid rgba(197,160,89,0.2)",
        borderBottom: "1px solid rgba(197,160,89,0.2)",
        padding: "120px 24px",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <FadeIn y={24}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(197,160,89,0.6)",
            marginBottom: "3rem",
          }}>
            LP-SYS-RECORD | FAILURE ANALYSIS
          </p>

          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "2.5rem",
          }}>
            There are 49 documented failure patterns<br />
            <span style={{ color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>in the new entrant record.</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.9,
            maxWidth: 620,
            margin: "0 auto 2.5rem",
          }}>
            None of them are surprises. Every one is predictable, recurring, and preventable. The carriers who failed were not unlucky — they were unstructured.
          </p>

          <div style={{
            width: 48,
            height: 2,
            background: "var(--gold-primary)",
            margin: "0 auto",
          }} />
        </FadeIn>
      </div>
    </section>
  );
}
