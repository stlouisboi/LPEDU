import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

export default function RecoveryPathBlock() {
  return (
    <section
      data-testid="recovery-path-block"
      style={{
        background: "#001020",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "72px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.672rem",
            color: "rgba(197,160,89,0.75)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            LP-STD-002
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
          }}>
            The Recovery Path
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: "0.875rem",
          }}>
            Not everyone finds LaunchPath before the audit notice arrives.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: "0.875rem",
          }}>
            If you've already received a conditional rating, a warning letter, or are facing authority revocation — there is still a path forward.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: "2.75rem",
          }}>
            The LaunchPath Standard was built for both:
          </p>
        </FadeIn>

        {/* Two-path cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(197,160,89,0.1)",
          marginBottom: "2.5rem",
        }} className="recovery-grid">

          {/* INSTALLATION */}
          <FadeIn delay={100}>
            <div style={{
              background: "#001530",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.672rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(197,160,89,0.88)",
                marginBottom: "0.875rem",
              }}>
                INSTALLATION
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                flex: 1,
              }}>
                For carriers who haven't yet faced an audit — install the Standard before the new entrant review period begins.
              </p>
              <Link
                to="/ground-0-briefing"
                data-testid="recovery-install-btn"
                style={{
                  display: "inline-block",
                  background: "var(--gold-primary)",
                  color: "var(--bg-onyx)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.784rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.875rem 1.75rem",
                  textDecoration: "none",
                  transition: "background 0.2s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-light)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--gold-primary)")}
              >
                Begin Ground 0
              </Link>
            </div>
          </FadeIn>

          {/* RECOVERY */}
          <FadeIn delay={180}>
            <div style={{
              background: "#001530",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.672rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(197,160,89,0.88)",
                marginBottom: "0.875rem",
              }}>
                RECOVERY
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.98rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                flex: 1,
              }}>
                For carriers who have already failed an audit — the system still applies. The starting point is different. The destination is the same.
              </p>
              <Link
                to="/knowledge-center/authority-reinstatement-brief"
                data-testid="recovery-path-cta"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "var(--gold-primary)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.784rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.875rem 1.75rem",
                  textDecoration: "none",
                  border: "1px solid rgba(197,160,89,0.5)",
                  transition: "all 0.2s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(197,160,89,0.08)";
                  e.currentTarget.style.borderColor = "rgba(197,160,89,0.8)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(197,160,89,0.5)";
                }}
              >
                Start the Rebuild →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Closing line */}
        <FadeIn delay={260}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.58)",
            textAlign: "center",
          }}>
            The system is the same. The starting point is different.
          </p>
        </FadeIn>

      </div>

      <style>{`
        @media (max-width: 680px) {
          .recovery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
