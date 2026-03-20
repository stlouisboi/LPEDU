import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";

export default function RecoveryPathBlock() {
  return (
    <section
      data-testid="recovery-path-block"
      style={{
        background: `linear-gradient(rgba(0,4,8,0.93), rgba(0,4,8,0.93)), url("https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/4923lix7_lp-std-002-emergency.png") center 30%/cover no-repeat`,
        borderTop: "3px solid rgba(248,113,113,0.5)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            color: "rgba(248,113,113,0.85)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}>
            LP-STD-002 — For Operators Already In The Window
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.85rem, 3.8vw, 3rem)",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}>
            You already got the letter.<br />
            <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: "0.72em" }}>
              It's not over — but the clock just got shorter.
            </span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.85,
            maxWidth: 640,
            marginBottom: "1.25rem",
          }}>
            A conditional rating or warning letter gives most carriers 45–60 days to cure findings before authority action. That window is not theoretical. It closes.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.85,
            maxWidth: 640,
            marginBottom: "3rem",
          }}>
            The carriers who survive this moment are not the ones who panic — they're the ones who get organized fast, document the right things, and put a compliant operating structure on paper before the follow-up window closes. That is what the Standard installs.
          </p>
        </FadeIn>

        {/* Two-path cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(212,144,10,0.1)",
          marginBottom: "2.5rem",
        }} className="recovery-grid">

          <FadeIn delay={100}>
            <div style={{
              background: "#0b1628",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
              borderTop: "2px solid rgba(212,144,10,0.4)",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,144,10,0.88)",
                marginBottom: "0.875rem",
              }}>
                Pre-Audit / New Authority
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.75,
                marginBottom: "2rem",
                flex: 1,
              }}>
                Your audit window is open. You haven't been reviewed yet. This is the best time to install the Standard — before an investigator tells you what's missing.
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
                  fontSize: "0.8rem",
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

          <FadeIn delay={180}>
            <div style={{
              background: "#0f0008",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
              borderTop: "2px solid rgba(248,113,113,0.6)",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(248,113,113,0.88)",
                marginBottom: "0.875rem",
              }}>
                Conditional Rating / Findings Received
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.75,
                marginBottom: "1rem",
                flex: 1,
              }}>
                Your rating is conditional. You have a remediation window. The Standard still applies — the starting point is different and the urgency is higher. Most carriers who cure a conditional rating do it by installing the same documentation infrastructure the Standard builds. The difference is you're doing it under pressure.
              </p>
              <Link
                to="/admission"
                data-testid="recovery-path-cta"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#f87171",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.875rem 1.75rem",
                  textDecoration: "none",
                  border: "1px solid rgba(248,113,113,0.5)",
                  transition: "all 0.2s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(248,113,113,0.08)";
                  e.currentTarget.style.borderColor = "rgba(248,113,113,0.8)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(248,113,113,0.5)";
                }}
              >
                Request Emergency Admission →
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={260}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
          }}>
            The Standard was not built for easy situations. It was built for this one.
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


