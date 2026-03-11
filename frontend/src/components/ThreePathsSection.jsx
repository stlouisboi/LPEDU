import FadeIn from "./FadeIn";

const PATHS = [
  {
    id: "go",
    label: "GO",
    description: "Trial and error self-study",
    cost: "$10,000–$25,000+",
    costNote: "in recoverable and unrecoverable losses",
    result: "Experience you paid too much for",
    isLP: false,
  },
  {
    id: "wait",
    label: "WAIT",
    description: "Private consultant or compliance firm",
    cost: "$5,000–$12,000",
    costNote: "",
    result: "Their knowledge, not your system",
    isLP: false,
  },
  {
    id: "stop",
    label: "STOP",
    description: "LaunchPath Standard",
    cost: "$2,500",
    costNote: "",
    result: "Built infrastructure you own and operate — verified by the Station Custodian before your audit window closes",
    isLP: true,
  },
];

export default function ThreePathsSection() {
  return (
    <section data-testid="three-paths-section" style={{
      background: "#001530",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid rgba(197,160,89,0.2)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--gold-primary)" }}>
            The Decision Framework
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1rem",
          }}>
            Three paths. One decision.
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            color: "var(--text-muted)",
            marginBottom: "4rem",
            lineHeight: 1.7,
          }}>
            Every authority reaches the same decision point. The difference is when.
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <div style={{ border: "1px solid var(--divider-dark)", overflow: "hidden", marginBottom: "3rem" }}>
            {/* Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr 200px 1fr",
              background: "var(--card-dark)",
              borderBottom: "1px solid var(--divider-dark)",
              padding: "0.875rem 1.5rem",
              gap: "1.5rem",
            }}>
              {["PATH", "APPROACH", "COST", "OUTCOME"].map((h) => (
                <p key={h} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--text-subtle)",
                  textTransform: "uppercase",
                  margin: 0,
                }}>{h}</p>
              ))}
            </div>

            {PATHS.map((path, i) => (
              <div key={path.id} data-testid={`path-${path.id}`} style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 200px 1fr",
                gap: "1.5rem",
                padding: "1.5rem",
                borderTop: i > 0 ? "1px solid var(--divider-dark)" : "none",
                background: path.isLP ? "rgba(197,160,89,0.06)" : "transparent",
                borderLeft: path.isLP ? "3px solid var(--gold-primary)" : "3px solid transparent",
              }}>
                <div>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    color: path.isLP ? "var(--gold-primary)" : "var(--text-subtle)",
                  }}>{path.label}</span>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>{path.description}</p>
                <div>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: path.isLP ? "var(--gold-primary)" : "var(--red)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}>{path.cost}</p>
                  {path.costNote && (
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "var(--text-subtle)",
                      marginTop: "0.25rem",
                      lineHeight: 1.4,
                    }}>{path.costNote}</p>
                  )}
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: path.isLP ? "0.925rem" : "0.9rem",
                  fontStyle: path.isLP ? "italic" : "normal",
                  color: path.isLP ? "var(--text-muted)" : "var(--text-subtle)",
                  lineHeight: 1.65,
                  margin: 0,
                }}>{path.result}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "var(--text)",
            textAlign: "center",
            lineHeight: 1.7,
          }}>
            The wise decision is the one that preserves the household.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
