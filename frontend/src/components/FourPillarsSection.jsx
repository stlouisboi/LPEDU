const PILLARS = [
  {
    num: "01",
    name: "Authority Protection",
    body: "Your MC number survives its first 18 months. The New Entrant period has defined audit triggers, CSA scoring thresholds, and enforcement patterns. The Standard maps them before they reach you.",
  },
  {
    num: "02",
    name: "Insurance Continuity",
    body: "Your coverage stays active and your rates stay manageable. A single lapse suspends authority automatically. The Standard installs the protocols that prevent it — and the documentation that protects your premiums after a CSA event.",
  },
  {
    num: "03",
    name: "Compliance Backbone",
    body: "Your documentation passes federal scrutiny before it happens. Driver qualification files, HOS records, maintenance logs, drug program documentation — built to audit standard before the auditor calls.",
  },
  {
    num: "04",
    name: "Cash-Flow Oxygen",
    body: "You know your real cost per mile and run profitable loads. Most new authorities run at a loss for the first 90 days without knowing it. The Standard establishes a freight rate floor and a cash discipline protocol before the first dispatch.",
  },
];

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "var(--bg-2)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ maxWidth: 680, marginBottom: "5rem" }}>
          <p className="overline" style={{ marginBottom: "1.25rem" }}>The Standard</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}>
            The four systems you'll be running.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
          }}>
            These are not modules. They are operating systems. Each one addresses a documented failure
            pattern that ends new carrier authorities in the first 12 months. All four run simultaneously.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1px",
          background: "var(--border)",
        }}>
          {PILLARS.map((p) => (
            <div key={p.num} data-testid={`pillar-${p.num}`} style={{
              background: "var(--bg-2)",
              padding: "2.5rem",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--gold)",
                letterSpacing: "0.12em",
                marginBottom: "1.25rem",
              }}>{p.num}</div>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--text)",
                marginBottom: "1rem",
                lineHeight: 1.3,
              }}>{p.name}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                lineHeight: 1.8,
              }}>{p.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
