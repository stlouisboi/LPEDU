import FadeIn from "./FadeIn";

const ROWS = [
  {
    penalty: "Driver qualification violations — $1,000–$16,000 per driver",
    drain: "Disqualified driver creates lost revenue window and re-hiring cost during audit window.",
  },
  {
    penalty: "Drug testing program violations — $5,000–$25,000 per violation",
    drain: "Consortium non-compliance triggers full new entrant audit review sequence.",
  },
  {
    penalty: "Hours of service violations — $1,000–$11,000 per citation",
    drain: "HOS flags elevate CSA score and compress the timeline to a compliance review.",
  },
  {
    penalty: "Maintenance documentation failure — $1,000–$10,000",
    drain: "Vehicle placed out of service. Load responsibility exposure. No revenue during correction.",
  },
  {
    penalty: "Insurance cancellation — authority suspension immediate upon lapse",
    drain: "Broker relationships severed. Freight network reset required after reinstatement.",
  },
  {
    penalty: "Audit preparation failure — $5,000–$15,000 + revocation risk",
    drain: "No corrective action plan results in permanent authority record flag with FMCSA.",
  },
  {
    penalty: "Broker compliance rejection — load refusal on active freight",
    drain: "Lost spot market access during full CSA remediation window. 60–90 day exposure.",
  },
  {
    penalty: "Safety rating deterioration — Conditional or Unsatisfactory classification",
    drain: "Insurance premium increases $3,000–$8,000+ annually. Carrier flagged for every broker audit.",
  },
];

export default function PenaltyTableSection() {
  return (
    <section data-testid="penalty-table-section" style={{
      background: "#0b1628",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid rgba(212,144,10,0.2)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--gold-primary)" }}>
            The Real Cost of Non-Compliance
          </p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1rem",
            maxWidth: 640,
          }}>
            Cost exposure during the first 90 days of authority
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.232rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            maxWidth: 600,
            marginBottom: "3rem",
          }}>
            Many authorities begin operations without calculating these costs. The ranges below are documented FMCSA enforcement data verified against ecfr.gov.
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <div style={{ border: "1px solid var(--divider-dark)", overflow: "hidden", marginBottom: "2.5rem" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--card-dark)",
            }}>
              <div style={{ padding: "1rem 1.5rem", borderRight: "1px solid var(--divider-dark)" }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.952rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--gold-primary)",
                  textTransform: "uppercase",
                }}>Direct Penalties</p>
              </div>
              <div style={{ padding: "1rem 1.5rem", background: "var(--incident-dark-1)" }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.952rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--text-muted-dark)",
                  textTransform: "uppercase",
                }}>Hidden Operational Drain</p>
              </div>
            </div>

            {ROWS.map((row, i) => (
              <div key={i} data-testid={`penalty-row-${i}`} style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                borderTop: "1px solid var(--divider-dark)",
              }}>
                <div style={{ padding: "1.25rem 1.5rem", borderRight: "1px solid var(--divider-dark)" }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.12rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>{row.penalty}</p>
                </div>
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.12rem",
                    fontStyle: "italic",
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>{row.drain}</p>
                </div>
              </div>
            ))}

            {/* Summary row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              borderTop: "1px solid var(--gold-primary)",
              background: "var(--card-dark)",
              padding: "1.25rem 1.5rem",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.12rem",
                fontWeight: 600,
                color: "var(--text)",
                lineHeight: 1.6,
                margin: 0,
              }}>
                Combined exposure if two or more violations occur simultaneously: <span style={{ color: "var(--red)" }}>$15,000–$60,000+</span>
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.952rem",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
          }}>
            Current as of March 2026. Verified against ecfr.gov.
          </p>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontStyle: "italic",
            fontSize: "1.232rem",
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: 1.7,
          }}>
            The LaunchPath 90-Day Standard is priced at a fraction of a single compliance failure. That is not a sales tactic. That is arithmetic.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
