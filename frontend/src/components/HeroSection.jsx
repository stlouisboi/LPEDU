import { Link } from "react-router-dom";

const FMCSA_DATA = [
  { label: "Audit window", value: "12–24 months" },
  { label: "Required filings", value: "10+" },
  { label: "Documented failure points", value: "49" },
  { label: "Standard implementation", value: "90 days" },
];

export default function HeroSection() {
  return (
    <section data-testid="hero-section" style={{
      position: "relative",
      background: "#002244",
      padding: "8rem 1.5rem 6rem",
      borderBottom: "1px solid rgba(197,160,89,0.25)",
      overflow: "hidden",
    }}>

      {/* Ambient background — animated dot grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(197,160,89,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: "dotDrift 22s linear infinite",
        }} />
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.22) 50%, transparent 100%)",
          animation: "scanLine 9s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(197,160,89,0.05) 0%, transparent 70%)",
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
            fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
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
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: "var(--text)",
            lineHeight: 1.5,
            maxWidth: 560,
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.25s",
          }}>
            The first ninety days do not test ambition.<br />
            They test operational structure.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.204rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: "3rem",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.3s",
          }}>
            LaunchPath installs the four compliance systems every new authority needs to survive FMCSA oversight in the first 90 days. This is not a course. It is an operating standard built around a federal audit timeline.
          </p>

          <div style={{
            display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start",
            animation: "heroEnter 0.65s ease both",
            animationDelay: "0.48s",
          }}>
            <Link
              to="/readiness"
              data-testid="hero-readiness-cta"
              style={{
                display: "inline-block",
                background: "var(--gold-primary)",
                color: "var(--bg-onyx)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.98rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                textDecoration: "none",
                transition: "background 0.2s",
                minHeight: 52,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--gold-primary)"}
            >
              Begin Ground 0 Briefing
            </Link>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              fontSize: "0.98rem",
              color: "var(--text-subtle)",
              maxWidth: 420,
              lineHeight: 1.6,
            }}>
              Ground 0 is the first installation phase of the LaunchPath Operating Standard.
            </p>
            <Link
              to="/knowledge-center/authority-reinstatement-brief"
              data-testid="hero-recovery-link"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.50)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
            >
              Already facing a compliance action? See the Recovery Path &rarr;
            </Link>
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
            fontSize: "0.728rem",
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
                  fontSize: "0.924rem",
                  color: "var(--text-subtle)",
                }}>{item.label}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.98rem",
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
              fontSize: "0.98rem",
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
