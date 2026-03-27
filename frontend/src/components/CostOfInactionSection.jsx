const STATS = [
  { value: "$0", label: "Revenue —\nDay 1 of revocation" },
  { value: "30", suffix: " DAYS", label: "Window to cure a\nconditional rating before shutdown" },
  { value: "100%", label: "Of fixed costs continue\nregardless" },
];

export default function CostOfInactionSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .coi-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        @media (max-width: 640px) { .coi-stats { grid-template-columns: 1fr; } }
      `}} />

      <section
        data-testid="cost-of-inaction-section"
        style={{
          position: "relative",
          background: `linear-gradient(to right, rgba(8,13,20,0.95) 40%, rgba(8,13,20,0.78) 100%), url("https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/ft9osegn_hero-empty-dock.png") center 60%/cover no-repeat`,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.714rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(212,144,10,0.50)",
            marginBottom: "2.5rem",
          }}>
            LP-DOC-001 | WHAT AUTHORITY REVOCATION ACTUALLY MEANS
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Newsreader', 'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            marginBottom: "2rem",
          }}>
            A single letter.<br />
            Revenue stops overnight.<br />
            <span style={{ color: "#d4900a" }}>Fixed costs don't.</span>
          </h2>

          {/* Body */}
          <div style={{ maxWidth: 680, marginBottom: "3.5rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.85,
              marginBottom: "1.25rem",
            }}>
              When FMCSA revokes or suspends your operating authority, your MC number goes inactive in SAFER within hours. Brokers stop tendering loads. Drivers can't legally run under your authority. Shippers reassign your freight. Your insurance carrier is notified.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.85,
              margin: 0,
            }}>
              The truck payment doesn't stop. The facility doesn't stop. The insurance premium doesn't stop. Every fixed cost you built your operation around keeps running — against zero revenue.
            </p>
          </div>

          {/* Stats strip */}
          <div className="coi-stats" style={{ marginBottom: "3rem", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                padding: "2rem 1.75rem",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <p style={{
                  fontFamily: "'Newsreader', 'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  color: "#d4900a",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}>
                  {s.value}{s.suffix || ""}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.55,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quote block */}
          <div style={{
            borderLeft: "3px solid rgba(212,144,10,0.35)",
            paddingLeft: "1.75rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.8,
              marginBottom: "1rem",
            }}>
              "I've seen operators survive ugly fines. I've seen operators survive conditional ratings with the right documentation in place. I have not seen many small carriers come back from a full revocation — because by the time it happens, the financial damage is already done."
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.714rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,144,10,0.65)",
              margin: 0,
            }}>
              — Vince Lawrence, Station Custodian
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
