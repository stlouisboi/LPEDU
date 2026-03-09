const steps = [
  {
    num: "01",
    badge: "FREE",
    badgeColor: "#4ade80",
    name: "GROUND 0 BRIEFING",
    desc: "6 lessons. ~90 minutes. Determines whether your operation is structured to survive before a single dollar is committed.",
    link: "BEGIN GROUND 0 BRIEFING",
  },
  {
    num: "02",
    badge: "FREE",
    badgeColor: "#4ade80",
    name: "AUTO DIAGNOSTIC + TCO ENGINE",
    desc: "Four-pillar readiness diagnostic and real cost-of-authority calculation. Survival is a math problem, not a passion project.",
    link: "RUN THE AUTO DIAGNOSTIC",
  },
  {
    num: "03",
    badge: "GATED",
    badgeColor: "var(--red)",
    name: "ADMISSION DECISION",
    desc: "Admission is granted only when the operational structure supports survival. Readiness determines entry — not urgency.",
    link: "REQUEST LAUNCHPATH ADMISSION",
  },
  {
    num: "04",
    badge: "$5,000",
    badgeColor: "var(--gold)",
    name: "90-DAY OPERATING SYSTEM",
    desc: "Structured implementation: compliance infrastructure, insurance stability, audit readiness, and financial controls.",
    link: null,
  },
];

export default function StepsSection() {
  return (
    <section
      data-testid="steps-section"
      style={{
        background: "var(--bg-primary)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "2.5rem" }}>
          THE SYSTEM // 4-STEP OPERATING SEQUENCE
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          {steps.map((step) => (
            <div
              key={step.num}
              data-testid={`step-${step.num}`}
              style={{
                background: "var(--bg-primary)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#8899aa",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "0.25rem 0.5rem",
                }}>
                  {step.num}
                </span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  color: step.badgeColor,
                  border: `1px solid ${step.badgeColor}`,
                  padding: "0.25rem 0.5rem",
                  letterSpacing: "0.08em",
                }}>
                  {step.badge}
                </span>
              </div>

              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: "0.75rem",
              }}>
                {step.name}
              </div>

              <p style={{ color: "#8899aa", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem", flex: 1 }}>
                {step.desc}
              </p>

              {step.link && (
                <a
                  href="https://www.launchpathedu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "#8899aa",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#8899aa"}
                >
                  {step.link} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
