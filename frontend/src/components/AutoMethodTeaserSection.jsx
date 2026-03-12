const AUTO_CARDS = [
  {
    letter: "A",
    dir: "AROUND",
    code: "LP-MOD-AUTO-A",
    threat: "Insurance exposure, liability gaps",
  },
  {
    letter: "U",
    dir: "UNDER",
    code: "LP-MOD-AUTO-U",
    threat: "Financial collapse, cash flow failure",
  },
  {
    letter: "T",
    dir: "THROUGH",
    code: "LP-MOD-AUTO-T",
    threat: "Compliance failure, documentation gaps",
  },
  {
    letter: "O",
    dir: "OVER",
    code: "LP-MOD-AUTO-O",
    threat: "Regulatory enforcement, audit failure",
  },
];

export default function AutoMethodTeaserSection() {
  return (
    <section
      data-testid="auto-method-teaser"
      style={{
        background: "#002244",
        borderTop: "1px solid rgba(197,160,89,0.15)",
        borderBottom: "1px solid rgba(197,160,89,0.15)",
        padding: "72px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header — 2 lines max */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            color: "rgba(197,160,89,0.85)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            LP-MOD-AUTO | AUTHORITY PROTECTION MODEL
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "0.875rem",
          }}>
            The AUTO Method
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            maxWidth: 520,
          }}>
            Risk approaches a carrier authority from four directions. The AUTO model maps each threat vector to a defensive system.
          </p>
        </div>

        {/* 4 cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(197,160,89,0.12)",
        }} className="auto-teaser-grid">
          {AUTO_CARDS.map((card) => (
            <div
              key={card.letter}
              data-testid={`auto-card-${card.letter.toLowerCase()}`}
              style={{
                background: "#002244",
                padding: "2rem 1.5rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#003366")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#002244")}
            >
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "2.5rem",
                color: "#C5A059",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                {card.letter}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.784rem",
                color: "#FFFFFF",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>
                {card.dir}
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.616rem",
                color: "rgba(197,160,89,0.65)",
                letterSpacing: "0.08em",
                marginBottom: "0.75rem",
              }}>
                {card.code}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.896rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
              }}>
                {card.threat}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .auto-teaser-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .auto-teaser-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
