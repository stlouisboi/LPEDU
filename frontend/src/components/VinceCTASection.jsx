// VinceCTASection

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
        <div style={{ position: "relative" }} className="vince-photo-wrapper">
          {/* Fix 6 — micro-quote above photo */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.857rem",
            fontStyle: "italic",
            color: "rgba(212,144,10,0.80)",
            lineHeight: 1.5,
            marginBottom: "0.875rem",
            paddingLeft: "2px",
          }}>
            "I don't do your compliance. I built the system so you can do it yourself."
          </p>
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "2px solid var(--gold-primary)", borderLeft: "2px solid var(--gold-primary)", zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: "2px solid var(--gold-primary)", borderRight: "2px solid var(--gold-primary)", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: "2px solid var(--gold-primary)", borderLeft: "2px solid var(--gold-primary)", zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "2px solid var(--gold-primary)", borderRight: "2px solid var(--gold-primary)", zIndex: 2 }} />
          {/* Photo */}
          <div style={{ overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
              alt="Vince Lawrence"
              width={864}
              height={1184}
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                objectPosition: "50% 10%",
                display: "block",
                filter: "contrast(1.06) brightness(0.94) saturate(0.92)",
              }}
            />
          </div>
          {/* Credential tag */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            color: "var(--gold-primary)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: "0.75rem",
            paddingLeft: "2px",
          }}>
            STATION CUSTODIAN — LP-SYS-V4.2
          </p>
        </div>

        {/* Bio + CTA */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(0,34,68,0.55)",
            marginBottom: "0.5rem",
          }}>
            Standard Custodian
          </p>
          <h2 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "var(--text-2xl)",
            letterSpacing: "-0.02em",
            color: "var(--text-paper-heading)",
            marginBottom: "0.5rem",
          }}>
            Vince Lawrence
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.857rem",
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
            fontSize: "1rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "0.625rem",
          }}>
            25 years in safety, compliance, and manufacturing operations. U.S. Navy veteran. OSHA certified.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "0.625rem",
          }}>
            The Station Custodian built this system after watching the same compliance failures repeat across new carriers for 25 years. He doesn't do your compliance — he built the structure so you can do it yourself.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            LaunchPath was built after watching the same operational failures repeat across new motor carriers year after year — not because operators lacked commitment, but because no one handed them the system.
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(0,34,68,0.15)", marginBottom: "2rem" }} />

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "1.75rem",
          }}>
            "Wisdom sees ahead and prepares for what's coming."
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-paper)",
            lineHeight: 1.8,
            marginBottom: "2rem",
            opacity: 0.78,
            maxWidth: 520,
          }}>
            Whether you are pre-authority, in your first 30 days, or approaching Month 9 of the New Entrant period — the Authority Readiness Test tells you where your operation stands and what needs to be built first.
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 700px) {
          .vince-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .vince-photo-wrapper { max-width: 220px; }
        }
      `}} />
    </section>
  );
}
