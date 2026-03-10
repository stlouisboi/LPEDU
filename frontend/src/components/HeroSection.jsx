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
      position: "relative",
      background: "var(--bg)",
      padding: "8rem 1.5rem 6rem",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
    }}>

      {/* Ambient background — dot grid + scan beam */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045 }} aria-hidden="true">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#8A96A3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(232,89,15,0.18) 50%, transparent 100%)",
          animation: "scanLine 9s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(232,89,15,0.04) 0%, transparent 70%)",
          animation: "pulseRing 8s ease-in-out infinite",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: "5rem",
        alignItems: "start",
      }} className="hero-grid">

        {/* Left — Orientation */}
        <div>
          <p className="overline" style={{
            marginBottom: "2rem",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.05s",
          }}>
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
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.15s",
          }}>
            The 90-Day Compliance Operating Standard for new motor carrier authorities.
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 580,
            marginBottom: "1.25rem",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.25s",
          }}>
            LaunchPath is not a course. It installs the compliance infrastructure,
            financial controls, and governance systems required to survive the
            FMCSA New Entrant period.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            color: "var(--text-subtle)",
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: "1rem",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.3s",
          }}>
            New authorities do not fail because they lack ambition.<br />
            They fail because operational systems were never installed.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem",
            color: "var(--orange)",
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: "3rem",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.38s",
          }}>
            The LaunchPath Standard is documented in a 5-brief series and 90-day checklists
            that show what your records actually have to prove in a New Entrant audit.
          </p>

          <div style={{
            display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.48s",
          }}>
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
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "var(--text-subtle)",
              maxWidth: 420,
              lineHeight: 1.6,
            }}>
              Runs through the same failure points FMCSA checks in your first audit.
            </p>
          </div>
        </div>

        {/* Right — FMCSA New Entrant Brief */}
        <div style={{
          border: "1px solid var(--border)",
          background: "var(--bg-2)",
          padding: "1.75rem",
          position: "sticky",
          top: "80px",
          animation: "heroEnter 0.65s ease both",
          animationDelay: "0.2s",
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
                animation: "fadeInRow 0.5s ease both",
                animationDelay: `${0.3 + i * 0.07}s`,
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
