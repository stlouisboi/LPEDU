import FadeIn from "./FadeIn";

export default function ConsequenceNumberBlock() {
  return (
    <section
      data-testid="consequence-number-block"
      style={{
        background: "#080f1e",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 24px",
      }}
    >
      <FadeIn>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(248,113,113,0.85)",
            marginBottom: "1.5rem",
          }}>
            What Authority Revocation Actually Means
          </p>

          <h2 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(1.85rem, 3.8vw, 3rem)",
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "2rem",
          }}>
            A single letter.<br />
            <span style={{ color: "#f87171" }}>Revenue stops overnight.</span><br />
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400, fontSize: "0.72em" }}>Fixed costs don't.</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.85,
            maxWidth: 680,
            marginBottom: "2.5rem",
          }}>
            When FMCSA revokes or suspends your operating authority, your MC number goes inactive in SAFER within hours. Brokers stop tendering loads. Drivers can't legally run under your authority. Shippers reassign your freight. Your insurance carrier is notified.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.15rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.85,
            maxWidth: 680,
            marginBottom: "3rem",
          }}>
            The truck payment doesn't stop. The facility doesn't stop. The insurance premium doesn't stop. Every fixed cost you built your operation around keeps running — against zero revenue.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(248,113,113,0.15)",
            marginBottom: "3rem",
          }} className="consequence-grid">
            {[
              { stat: "$0", label: "Revenue — Day 1 of revocation" },
              { stat: "30 days", label: "Window to cure a conditional rating before shutdown" },
              { stat: "100%", label: "Of fixed costs that continue regardless" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#080f1e",
                padding: "2rem 1.75rem",
                borderTop: "2px solid rgba(248,113,113,0.35)",
              }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#f87171",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}>{item.stat}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.5,
                }}>{item.label}</p>
              </div>
            ))}
          </div>

          <div style={{
            borderLeft: "3px solid var(--gold-primary)",
            paddingLeft: "1.75rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.8,
              marginBottom: "0.75rem",
            }}>
              I've seen operators survive ugly fines. I've seen operators survive conditional ratings with the right documentation in place. I have not seen many small carriers come back from a full revocation — because by the time it happens, the financial damage is already done.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.75)",
            }}>
              — Vince Lawrence, Station Custodian
            </p>
          </div>

        </div>
      </FadeIn>

      <style>{`
        @media (max-width: 680px) {
          .consequence-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
