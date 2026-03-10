const FMCSA_DATA = [
  { label: "Audit window", value: "12–24 months" },
  { label: "Required filings", value: "10+" },
  { label: "Documented failure points", value: "49" },
  { label: "Standard implementation", value: "90 days" },
  { label: "Average audit pass rate", value: "94%" },
];

export default function HeroSection() {
  return (
    <section data-testid="hero-section" style={{
      background: "var(--bg)",
      padding: "8rem 1.5rem 6rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "5rem",
        alignItems: "start",
      }} className="hero-grid">

        {/* Left — Orientation */}
        <div>
          <p className="overline" style={{ marginBottom: "2rem" }}>
            90-Day Compliance Operating Standard — New Motor Carrier Authorities
          </p>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: "2rem",
          }}>
            The 90-Day Compliance Operating Standard for new motor carrier authorities.
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 580,
            marginBottom: "1.5rem",
          }}>
            LaunchPath is not a course. It installs the compliance infrastructure,
            financial controls, and governance systems required to survive the
            FMCSA New Entrant period.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-subtle)",
            lineHeight: 1.8,
            maxWidth: 520,
            marginBottom: "3rem",
          }}>
            New authorities do not fail because they lack ambition.<br />
            They fail because operational systems were never installed.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <a
              href="https://www.launchpathedu.com/auto-diagnostic"
              target="_blank" rel="noopener noreferrer"
              data-testid="hero-readiness-cta"
              style={{
                display: "inline-block",
                background: "var(--orange)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
            >
              Begin Readiness Test
            </a>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "var(--text-subtle)",
            }}>
              Free. Takes approximately 12 minutes.
            </span>
          </div>
        </div>

        {/* Right — FMCSA New Entrant Brief */}
        <div style={{
          border: "1px solid var(--border)",
          background: "var(--bg-2)",
          padding: "1.75rem",
          position: "sticky",
          top: "80px",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border)",
          }}>
            FMCSA New Entrant Brief
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FMCSA_DATA.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "0.875rem 0",
                borderBottom: i < FMCSA_DATA.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.825rem",
                  color: "var(--text-subtle)",
                }}>{item.label}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.875rem",
                  color: "var(--text)",
                  fontWeight: 500,
                }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border)",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "var(--text-subtle)",
              lineHeight: 1.6,
            }}>
              The New Entrant period has a defined audit window, documented failure
              patterns, and predictable consequences. The carriers who survive it
              are not more talented. They are more prepared.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px) { .hero-grid > div:last-child { display: none; } }
      `}</style>
    </section>
  );
}
