import { Link } from "react-router-dom";

const LABEL_STYLE = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.60rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  marginBottom: "0.625rem",
};

const BODY_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.938rem",
  color: "rgba(255,255,255,0.72)",
  lineHeight: 1.82,
  margin: "0 0 1.5rem",
};

export default function FailureAnalysisSection() {
  return (
    <>
      <style>{`
        .fa-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 880px) {
          .fa-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>

      <section
        data-testid="failure-analysis-section"
        style={{
          background: "#070c14",
          borderTop: "1px solid rgba(212,144,10,0.18)",
          borderBottom: "1px solid rgba(212,144,10,0.18)",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Section code */}
          <p style={{ ...LABEL_STYLE, color: "rgba(212,144,10,0.50)", marginBottom: "2.5rem" }}>
            LP-CASE-001 | FAILURE ANALYSIS
          </p>

          <div className="fa-grid">

            {/* ── LEFT: Case narrative ── */}
            <div>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: "#d4900a",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "1.25rem",
              }}>
                The $19,246 Oversight
              </h2>

              {/* Carrier meta bar */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                paddingBottom: "1.25rem",
                marginBottom: "1.75rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                2-Truck Independent (Dry Van)&nbsp;&nbsp;·&nbsp;&nbsp;7 Months Active&nbsp;&nbsp;·&nbsp;&nbsp;
                <span style={{ color: "#8b2f2f" }}>Authority Revoked</span>
              </div>

              {/* The Incident */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(255,255,255,0.30)" }}>The Incident</p>
                <p style={BODY_STYLE}>
                  A clean roadside inspection triggered a New Entrant Safety Audit. Insurance filings were current. DOT numbers were in order. The carrier expected a routine review.
                </p>
              </div>

              {/* The Failure */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.70)" }}>The Failure</p>
                <p style={BODY_STYLE}>
                  During the audit, the investigator requested the Medical Examiner's Certificate for a driver hired in Month 2. The carrier had it. It was dated two days <em>after</em> the driver's first dispatch.
                </p>
              </div>

              {/* The Result */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.70)" }}>The Result</p>
                <p style={{ ...BODY_STYLE, marginBottom: 0 }}>
                  Under <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85em", color: "rgba(255,255,255,0.55)" }}>49 CFR § 385.321</span>, dispatching an unqualified driver is an automatic failure. The authority was revoked 15 days later.
                </p>
              </div>

              {/* Total exposure block */}
              <div style={{
                background: "rgba(139,47,47,0.10)",
                border: "1px solid rgba(139,47,47,0.30)",
                borderLeft: "3px solid #8b2f2f",
                padding: "1.25rem 1.5rem",
              }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(200,60,60,0.65)", marginBottom: "0.5rem" }}>
                  Total Exposure
                </p>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#c0392b",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.625rem",
                }}>
                  $19,246
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  Loss of revenue, insurance policy cancellation, reapplication fees, and six weeks of downtime.
                </p>
              </div>
            </div>

            {/* ── RIGHT: Analysis ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* AUTO Failure Vector */}
              <div style={{
                background: "#0c1420",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "1.75rem",
              }}>
                <p style={{ ...LABEL_STYLE, color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
                  AUTO Failure Vector
                </p>

                {/* Around — intact */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  paddingBottom: "1rem",
                  marginBottom: "1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#3d9970",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}>→</span>
                  <div>
                    <p style={{ ...LABEL_STYLE, color: "#3d9970", marginBottom: "0.25rem" }}>
                      Around — Intact
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>
                      Insurance was current. All external filings in order.
                    </p>
                  </div>
                </div>

                {/* Through — failure */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#c0392b",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}>✗</span>
                  <div>
                    <p style={{ ...LABEL_STYLE, color: "#c0392b", marginBottom: "0.25rem" }}>
                      Through — Failed
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>
                      Compliance backbone not installed. Driver Qualification File incomplete.
                    </p>
                  </div>
                </div>

                <div style={{
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.80rem",
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}>
                  One missing document. One unqualified driver. Automatic failure.
                </div>
              </div>

              {/* What the Standard Installs */}
              <div style={{
                background: "rgba(212,144,10,0.05)",
                borderLeft: "3px solid rgba(212,144,10,0.55)",
                padding: "1.75rem",
              }}>
                <p style={{ ...LABEL_STYLE, color: "#d4900a", marginBottom: "1rem" }}>
                  What the Standard Installs
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.90rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.78,
                  margin: 0,
                }}>
                  The Driver Qualification File system in Module 3 requires Medical Examiner's Certificate verification <em>before</em> dispatch authorization. The DQ File Checklist blocks this failure at the source.
                </p>
              </div>

              {/* Footer link */}
              <Link
                to="/standards/16-deadly-sins"
                data-testid="failure-patterns-link"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(212,144,10,0.55)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  display: "inline-block",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#d4900a"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(212,144,10,0.55)"; }}
              >
                View more failure patterns →
              </Link>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
