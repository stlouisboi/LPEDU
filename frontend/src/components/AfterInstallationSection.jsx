const OUTCOMES = [
  "Files stop living in random folders",
  "Compliance tasks stop living in memory",
  "Authority runs on documented controls",
  "Audit exposure becomes visible and manageable",
  "The operation moves out of survival mode",
];

export default function AfterInstallationSection() {
  return (
    <section
      data-testid="after-installation-section"
      style={{
        background: "#0b1628",
        borderTop: "1px solid rgba(212,144,10,0.18)",
        borderBottom: "1px solid rgba(212,144,10,0.10)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.714rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(212,144,10,0.55)",
          marginBottom: "2rem",
        }}>
          LP-OUT-001 — WHAT CHANGES
        </p>

        <h2 style={{
          fontFamily: "'Newsreader', 'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "#FFFFFF",
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
          marginBottom: "2.5rem",
        }}>
          After Installation
        </h2>

        <div style={{ marginBottom: "3rem" }}>
          {OUTCOMES.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1.25rem",
                padding: "1.1rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#d4900a",
                flexShrink: 0,
                marginTop: "0.05rem",
              }}>→</span>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.80)",
                lineHeight: 1.6,
                margin: 0,
              }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          borderLeft: "2px solid rgba(212,144,10,0.30)",
          paddingLeft: "1.75rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.50)",
            lineHeight: 1.8,
            margin: 0,
          }}>
            This is not transformation. It's structure. The system holds because the structure holds.
          </p>
        </div>

      </div>
    </section>
  );
}
