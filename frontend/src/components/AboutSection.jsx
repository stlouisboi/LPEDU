import FadeIn from "./FadeIn";

export default function AboutSection() {
  return (
    <section data-testid="about-section" style={{
      background: "var(--bg-paper)",
      padding: "7rem 1.5rem",
      borderTop: "3px solid var(--gold-primary)",
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
              fontFamily: "'Barlow Condensed', sans-serif",
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
                fontFamily: "'Barlow Condensed', sans-serif",
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
            {/* Corner accents */}
            <div style={{ position: "absolute", top: -6, left: -6, width: 28, height: 28, borderTop: "2px solid var(--gold-primary)", borderLeft: "2px solid var(--gold-primary)", zIndex: 2 }} />
            <div style={{ position: "absolute", top: -6, right: -6, width: 28, height: 28, borderTop: "2px solid var(--gold-primary)", borderRight: "2px solid var(--gold-primary)", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: -6, left: -6, width: 28, height: 28, borderBottom: "2px solid var(--gold-primary)", borderLeft: "2px solid var(--gold-primary)", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: -6, right: -6, width: 28, height: 28, borderBottom: "2px solid var(--gold-primary)", borderRight: "2px solid var(--gold-primary)", zIndex: 2 }} />
            {/* Photo */}
            <div style={{
              overflow: "hidden",
              height: 560,
              boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,160,89,0.15)",
            }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
                alt="Vince Lawrence"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "contrast(1.07) brightness(0.93) saturate(0.88)",
                  display: "block",
                }}
              />
            </div>
            {/* Bottom credential overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent 0%, rgba(10,16,26,0.88) 55%, rgba(10,16,26,0.98) 100%)",
              padding: "4rem 1.5rem 1.5rem",
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--gold-primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}>
                STATION CUSTODIAN — LP-SYS-V4.2
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.06em",
              }}>
                U.S. Navy · OSHA Certified · 25 Yrs Ops
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
