const infraData = [
  { item: "Drug & Alcohol Consortium Enrollment", cost: "$150–$300 / year" },
  { item: "Driver Qualification File Setup", cost: "$200–$500" },
  { item: "Maintenance Documentation System", cost: "$100–$300" },
  { item: "Safety Management Records", cost: "$150–$400" },
  { item: "ELD Device & Compliance Setup", cost: "$300–$600" },
  { item: "UCR Registration", cost: "$76–$332 / year" },
];

const violationData = [
  { item: "New Entrant Audit failure — authority revocation", cost: "$5,000–$15,000+", highlight: true },
  { item: "Out-of-service violation per vehicle", cost: "$1,000–$16,000", highlight: true },
  { item: "Operating without required insurance on file", cost: "Suspension + Liability", highlight: true },
  { item: "Improper DQ file — driver disqualified at audit", cost: "Lost Revenue + Re-qualifying", highlight: false },
  { item: "Hours of Service violation — driver fatigue citation", cost: "$1,000–$11,000", highlight: true },
  { item: "Insurance premium increase after CSA score", cost: "$3,000–$8,000+ Annually", highlight: true },
];

export default function PenaltyTableSection() {
  return (
    <section
      data-testid="penalty-table-section"
      style={{
        background: "var(--bg-primary)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          COMPLIANCE DATA
        </div>

        <h2
          className="font-headline"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.95,
            margin: "0 0 1.5rem",
            color: "#ffffff",
          }}
        >
          COST EXPOSURE DURING<br />
          THE FIRST 90 DAYS<br />
          OF AUTHORITY
        </h2>

        <p style={{ color: "#8899aa", lineHeight: 1.7, maxWidth: 600, marginBottom: "3rem" }}>
          Most new authorities encounter $1,000–$2,000 in required compliance
          infrastructure costs within the first 90 days of operation. These are
          not optional expenses.
        </p>

        {/* Infrastructure table */}
        <div style={{ marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <th style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#8899aa", fontWeight: 400 }}>
                  REQUIRED COMPLIANCE INFRASTRUCTURE
                </th>
                <th style={{ padding: "0.75rem 1.25rem", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#8899aa", fontWeight: 400 }}>
                  TYPICAL COST RANGE
                </th>
              </tr>
            </thead>
            <tbody>
              {infraData.map((row, i) => (
                <tr
                  key={i}
                  data-testid={`infra-row-${i}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <td style={{ padding: "1rem 1.25rem", color: "#c8d8e8", fontSize: "0.9rem" }}>{row.item}</td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right", color: "#ffffff", fontSize: "0.9rem" }}>{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Violation table */}
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <th style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#8899aa", fontWeight: 400 }}>
                  DOCUMENTED VIOLATION EXPOSURE
                </th>
                <th style={{ padding: "0.75rem 1.25rem", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#8899aa", fontWeight: 400 }}>
                  DOCUMENTED COST RANGE
                </th>
              </tr>
            </thead>
            <tbody>
              {violationData.map((row, i) => (
                <tr
                  key={i}
                  data-testid={`violation-row-${i}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <td style={{ padding: "1rem 1.25rem", color: "#c8d8e8", fontSize: "0.9rem" }}>{row.item}</td>
                  <td style={{
                    padding: "1rem 1.25rem",
                    textAlign: "right",
                    fontSize: "0.9rem",
                    color: row.highlight ? "var(--red)" : "#8899aa",
                    fontWeight: row.highlight ? 600 : 400,
                  }}>
                    {row.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
