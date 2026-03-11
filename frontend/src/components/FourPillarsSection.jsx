import FadeIn from "./FadeIn";

const PILLARS = [
  {
    name: "Authority Protection",
    body: "Your DOT authority is a federal operating license. It can be suspended, conditioned, or revoked. Every decision in the first 90 days either protects it or exposes it.",
  },
  {
    name: "Insurance Continuity",
    body: "A lapsed policy suspends your authority the same day. No grace period. No warning. The 35-Day Standard and the 24-Hour Guard exist because insurance failure is the fastest way to lose what you just built.",
  },
  {
    name: "Compliance Backbone",
    body: "Driver Qualification files. Drug and alcohol program. Hours of Service. ELD. Vehicle maintenance records. These are not administrative tasks. They are the file system that survives or fails a federal audit.",
  },
  {
    name: "Cash-Flow Oxygen",
    body: "Load selection discipline. True cost per mile. Payment gap management. A carrier who cannot stay liquid cannot stay compliant. The 30% Ceiling exists because cash-flow failure and compliance failure arrive together.",
  },
];

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "var(--bg-onyx)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--divider-dark)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--gold-primary)" }}>
            The Operating Standard
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1rem",
            maxWidth: 640,
          }}>
            The Four Pillars of the Standard
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: "1rem",
            color: "var(--text-muted)",
            marginBottom: "4rem",
            lineHeight: 1.7,
          }}>
            These four systems are installed before scale. Not after the first violation. Before.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
          marginBottom: "3rem",
        }} className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.name} delay={i * 80}>
              <div data-testid={`pillar-${i + 1}`} style={{
                background: "var(--card-dark)",
                border: "1px solid var(--gold-primary)",
                padding: "2rem 2rem 2.25rem",
              }}>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "var(--gold-primary)",
                  marginBottom: "0.875rem",
                  letterSpacing: "-0.01em",
                }}>{pillar.name}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.925rem",
                  color: "#CCCCCC",
                  lineHeight: 1.8,
                  margin: 0,
                }}>{pillar.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={360}>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--text)",
            textAlign: "center",
            lineHeight: 1.7,
          }}>
            LaunchPath installs all four. In sequence. Before the audit window opens.
          </p>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 768px) { .pillars-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
