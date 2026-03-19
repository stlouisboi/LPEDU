const VINCE_PHOTO = "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d";

export default function CredibilityStrip() {
  return (
    <>
      <style>{`
        .cred-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .cred-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cred-photo { max-width: 160px !important; }
        }
      `}</style>

      <section
        data-testid="credibility-strip"
        style={{
          background: "#0b1628",
          borderTop: "3px solid rgba(212,144,10,0.35)",
          padding: "5rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="cred-grid">

            {/* Photo */}
            <div className="cred-photo">
              <img
                src={VINCE_PHOTO}
                alt="Vince Lawrence"
                style={{
                  width: "100%",
                  display: "block",
                  filter: "grayscale(15%)",
                }}
              />
            </div>

            {/* Text */}
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.60rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,144,10,0.55)",
                marginBottom: "0.5rem",
              }}>
                Station Custodian
              </p>

              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}>
                Vince Lawrence
              </h2>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.60)",
                lineHeight: 1.8,
                marginBottom: "1.75rem",
                maxWidth: 480,
              }}>
                25 years in safety, compliance, and manufacturing operations. U.S. Navy veteran. OSHA certified.
              </p>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                fontStyle: "italic",
                color: "rgba(212,144,10,0.85)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 460,
              }}>
                I don't do your compliance. I built the system so you can do it yourself.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
