import { Link } from "react-router-dom";

export default function VinceCTASection() {
  return (
    <section
      data-testid="vince-cta-section"
      style={{
        background: "var(--bg-paper)",
        borderTop: "3px solid var(--gold-primary)",
        padding: "72px 24px",
      }}
    >
      <div style={{
        maxWidth: 880,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "3.5rem",
        alignItems: "start",
      }} className="vince-grid">

        {/* Photo */}
        <div style={{ overflow: "hidden" }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
            alt="Vince Lawrence"
            style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.616rem",
            color: "var(--text-paper-heading)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}>
            STATION CUSTODIAN — LP-SYS-V4.2
          </p>
        </div>

        {/* Bio + CTA */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(0,34,68,0.55)",
            marginBottom: "0.5rem",
          }}>
            Standard Custodian
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "-0.02em",
            color: "var(--text-paper-heading)",
            marginBottom: "0.5rem",
          }}>
            Vince Lawrence
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.784rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-paper-heading)",
            marginBottom: "1.25rem",
            opacity: 0.7,
          }}>
            Station Custodian
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "0.625rem",
          }}>
            25 years in safety, compliance, and manufacturing operations.
            U.S. Navy veteran. OSHA certified.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            LaunchPath was built after observing the same operational failures repeat across new motor carriers year after year.
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(0,34,68,0.15)", marginBottom: "2rem" }} />

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1.008rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "1.75rem",
          }}>
            Ground 0 is the first installation phase of the LaunchPath Operating Standard.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "1.75rem",
            opacity: 0.85,
          }}>
            And if you've already failed? The system still applies.<br />
            It's harder — but it's not over.
          </p>

          <Link
            to="/ground-0-briefing"
            data-testid="vince-cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--gold-primary)",
              color: "var(--bg-onyx)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.896rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "1rem 2.25rem",
              textDecoration: "none",
              transition: "background 0.2s",
              minHeight: 48,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold-primary)")}
          >
            Begin Ground 0 Briefing
          </Link>
        </div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .vince-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
