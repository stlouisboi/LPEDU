const paths = [
  {
    id: "self-study",
    name: "TRIAL-AND-ERROR SELF-STUDY",
    cost: "$10,000–$25,000+",
    costColor: "var(--red)",
    description: "Experience you paid too much for",
    highlight: false,
  },
  {
    id: "consultant",
    name: "PRIVATE CONSULTANT / COMPLIANCE FIRM",
    cost: "$5,000–$12,000",
    costColor: "#ffffff",
    description: "Their knowledge, not your system",
    highlight: false,
  },
  {
    id: "launchpath",
    name: "LAUNCHPATH STANDARD",
    cost: "$5,000",
    costColor: "var(--gold)",
    description: "Built infrastructure you own and operate — verified by the Station Custodian before your audit window closes",
    highlight: true,
  },
];

export default function ThreePathsSection() {
  return (
    <section
      data-testid="three-paths-section"
      style={{
        background: "var(--bg-secondary)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          IMPLEMENTATION CONTEXT
        </div>

        <h2
          className="font-headline"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.95,
            margin: "0 0 3rem",
            color: "#ffffff",
          }}
        >
          THREE PATHS. ONE DECISION.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {paths.map((path, i) => (
            <div
              key={path.id}
              data-testid={`path-row-${path.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "1.5rem",
                alignItems: "center",
                padding: "1.5rem 1.75rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderLeft: path.highlight ? "2px solid var(--gold)" : "2px solid transparent",
                background: path.highlight ? "rgba(200,150,62,0.04)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: path.highlight ? "var(--gold)" : "#c8d8e8",
              }}>
                {path.name}
              </div>

              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.35rem",
                color: path.costColor,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}>
                {path.cost}
              </div>

              <div style={{
                color: "#8899aa",
                fontSize: "0.9rem",
                textAlign: "right",
                lineHeight: 1.5,
              }}>
                {path.description}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

        <p
          data-testid="three-paths-footer"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "#8899aa",
            marginTop: "2rem",
            textTransform: "uppercase",
          }}
        >
          WE ARE NOT THE CHEAPEST OPTION. WE ARE THE MOST SYSTEMATIZED ONE.
        </p>

      </div>
    </section>
  );
}
