const pillars = [
  {
    num: "I",
    name: "INSURANCE CONTINUITY",
    desc: "Maintains uninterrupted coverage. A single lapse suspends authority.",
  },
  {
    num: "II",
    name: "CASH-FLOW OXYGEN",
    desc: "Ensures capital reserves to survive freight volatility and delayed payments.",
  },
  {
    num: "III",
    name: "AUTHORITY PROTECTION",
    desc: "Prevents operational decisions that trigger CSA score damage and enforcement risk.",
  },
  {
    num: "IV",
    name: "COMPLIANCE BACKBONE",
    desc: "DQ files, HOS records, maintenance logs, and policy manuals built to audit standard.",
  },
];

export default function FourPillarsSection() {
  return (
    <section
      data-testid="four-pillars-section"
      style={{
        background: "var(--bg-secondary)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          THE LAUNCHPATH OPERATING STANDARD
        </div>

        <h2
          className="font-headline"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.95,
            margin: "0 0 1.5rem",
            color: "#ffffff",
          }}
        >
          FOUR PILLARS.<br />
          INSTALLED BEFORE SCALE.
        </h2>

        <p style={{ color: "#8899aa", lineHeight: 1.7, maxWidth: 580, marginBottom: "3rem" }}>
          The first 90 days determine whether a carrier stabilizes or fails.
          LaunchPath installs four pillars required to survive the New Entrant period.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {pillars.map((p) => (
            <div
              key={p.num}
              data-testid={`pillar-${p.num}`}
              style={{
                background: "var(--bg-secondary)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                right: "1rem",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "5rem",
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                userSelect: "none",
              }}>{p.num}</div>

              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.55rem",
                color: "#8899aa",
                letterSpacing: "0.1em",
                marginBottom: "0.75rem",
              }}>{p.num}</div>

              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "var(--gold)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>
                {p.name}
              </div>

              <p style={{ color: "#8899aa", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <p style={{ color: "#8899aa", marginTop: "2rem", fontSize: "0.9rem" }}>
          If any of these systems fail, authority risk rises immediately.{" "}
          <strong style={{ color: "#c8d8e8" }}>LaunchPath exists to install them before failure occurs.</strong>
        </p>
      </div>
    </section>
  );
}
