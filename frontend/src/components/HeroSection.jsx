export default function HeroSection() {
  return (
    <section data-testid="hero-section" style={{
      background: "var(--bg)",
      padding: "8rem 1.5rem 6rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <p className="overline" style={{ marginBottom: "2rem" }}>
          90-Day Compliance Operating Standard — New Motor Carrier Authorities
        </p>

        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2.4rem, 5vw, 4rem)",
          lineHeight: 1.12,
          letterSpacing: "-0.025em",
          color: "var(--text)",
          marginBottom: "2rem",
          maxWidth: 780,
        }}>
          The 90-Day Compliance Operating Standard for new authorities.
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: 1.8,
          maxWidth: 620,
          marginBottom: "1.25rem",
        }}>
          Built for new carriers in their first 12 months of authority. Not a course. Not a coaching program.
          A documented operating standard that installs the systems required to survive what comes next.
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "var(--text-subtle)",
          lineHeight: 1.7,
          maxWidth: 580,
          marginBottom: "3rem",
        }}>
          The New Entrant period has a defined audit window, documented failure patterns, and predictable
          consequences. The carriers who survive it are not more talented. They are more prepared.
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
    </section>
  );
}
