import FadeIn from "./FadeIn";

export default function AboutSection() {
  return (
    <section data-testid="about-section" style={{
      background: "var(--bg-paper)",
      padding: "7rem 1.5rem",
      borderTop: "3px solid var(--gold-primary)",
      borderBottom: "1px solid var(--divider-light)",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 400px",
        gap: "5rem",
        alignItems: "start",
      }} className="about-grid">

        <FadeIn>
          <div>
            <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--text-paper-heading)" }}>
              Standard Custodian
            </p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-paper-heading)",
              marginBottom: "0.5rem",
            }}>
              Vince Lawrence
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.806rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-paper-heading)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}>
              U.S. Navy Veteran &nbsp;|&nbsp; OSHA Certified &nbsp;|&nbsp; 20+ Yrs Manufacturing Management &amp; Leadership &nbsp;|&nbsp; Founder, LaunchPath EDU
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {[
                "I did not come from trucking. I came from 20 years of building operational systems in manufacturing environments — where a missing record was not an inconvenience, it was a liability.",
                "When I looked at what new motor carriers were operating without, I recognized the failure pattern. Not ignorance. Not laziness. The absence of a system.",
                "LaunchPath is the system.",
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.12rem",
                  color: "var(--text-paper)",
                  lineHeight: 1.85,
                }}>{para}</p>
              ))}
            </div>

            {/* Pull quote */}
            <div style={{
              borderLeft: "3px solid var(--gold-primary)",
              paddingLeft: "1.5rem",
              marginBottom: "2.5rem",
            }}>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "1.176rem",
                color: "var(--text-paper-heading)",
                lineHeight: 1.7,
              }}>
                "My responsibility is not to motivate carriers — it is to prevent preventable failure."
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden", height: 520 }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
                alt="Vince Lawrence"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(245,246,247,0.95))",
              padding: "3rem 1.25rem 1.25rem",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.694rem",
                color: "var(--text-paper-heading)",
                letterSpacing: "0.1em",
              }}>
                STATION CUSTODIAN — LP-SYS-V4.2
              </p>
            </div>
          </div>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
