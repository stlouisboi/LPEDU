const SEQUENCE = [
  {
    step: "01",
    name: "Readiness Test",
    desc: "12-minute diagnostic. Establishes where the operation stands before the Standard is applied.",
    badge: "Free",
    badgeOrange: false,
  },
  {
    step: "02",
    name: "AUTO Diagnostic",
    desc: "Four-pillar readiness assessment and cost-of-authority calculation.",
    badge: "Free",
    badgeOrange: false,
  },
  {
    step: "03",
    name: "Ground 0 Briefing",
    desc: "Six structured lessons. The operational framework before systems installation begins.",
    badge: "Free",
    badgeOrange: false,
  },
  {
    step: "04",
    name: "90-Day Cohort",
    desc: "Structured implementation. The Standard installed, verified, and documented by the Station Custodian.",
    badge: "$5,000",
    badgeOrange: true,
  },
];

export default function NextStepSection() {
  return (
    <section data-testid="next-step-section" style={{
      background: "var(--bg)",
      padding: "7rem 1.5rem",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <p className="overline" style={{ marginBottom: "1.25rem" }}>What Happens Next</p>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
        }}>
          The sequence is fixed. There are no shortcuts.
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "var(--text-muted)",
          lineHeight: 1.8,
          marginBottom: "4rem",
          maxWidth: 580,
        }}>
          Admission is not purchased at the front door.
          It is earned through the sequence.
          Each step establishes whether the carrier is prepared to operate under the Standard.
        </p>

        {/* Sequence */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "4rem" }}>
          {SEQUENCE.map((s, i) => (
            <div key={s.step} data-testid={`sequence-step-${s.step}`} style={{
              display: "grid",
              gridTemplateColumns: "2.5rem 1fr auto",
              gap: "1.75rem",
              alignItems: "start",
              padding: "1.75rem 0",
              borderTop: "1px solid var(--border)",
              borderLeft: s.badgeOrange ? "2px solid var(--orange)" : "2px solid transparent",
              paddingLeft: s.badgeOrange ? "1.25rem" : "0",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--text-subtle)",
                paddingTop: "0.3rem",
                letterSpacing: "0.05em",
              }}>{s.step}</div>

              <div>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: s.badgeOrange ? "var(--text)" : "var(--text)",
                  marginBottom: "0.4rem",
                }}>{s.name}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}>{s.desc}</p>
              </div>

              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: s.badgeOrange ? "var(--orange)" : "var(--text-subtle)",
                whiteSpace: "nowrap",
                paddingTop: "0.3rem",
                letterSpacing: "0.02em",
              }}>{s.badge}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

        {/* Urgency — factual, no manipulation */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "var(--text-subtle)",
          lineHeight: 1.75,
          marginBottom: "2.75rem",
          maxWidth: 560,
        }}>
          The FMCSA New Entrant audit window opens between 12 and 24 months of authority.
          Cohort placement is limited to what can be verified and installed within the
          Standard's implementation timeline.
          If the authority is already active, the sequence begins now.
        </p>

        {/* One CTA — the only door */}
        <a
          href="https://www.launchpathedu.com/admission"
          target="_blank" rel="noopener noreferrer"
          data-testid="apply-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "var(--orange)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "1rem 2.25rem",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
        >
          Apply for the 90-Day Standard
        </a>

      </div>
    </section>
  );
}
