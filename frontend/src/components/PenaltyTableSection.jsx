const INFRA = [
  { item: "Drug & Alcohol Consortium Enrollment", cost: "$150–$300 / yr" },
  { item: "Driver Qualification File Setup", cost: "$200–$500" },
  { item: "Maintenance Documentation System", cost: "$100–$300" },
  { item: "Safety Management Records", cost: "$150–$400" },
  { item: "ELD Device & Compliance Setup", cost: "$300–$600" },
  { item: "UCR Registration", cost: "$76–$332 / yr" },
];

const VIOLATIONS = [
  { item: "New Entrant Audit failure — authority revocation", cost: "$5,000–$15,000+", red: true },
  { item: "Out-of-service violation per vehicle", cost: "$1,000–$16,000", red: true },
  { item: "Operating without required insurance on file", cost: "Suspension + Liability", red: true },
  { item: "Improper DQ file — driver disqualified at audit", cost: "Lost Revenue + Re-qualifying", red: false },
  { item: "Hours of Service violation — driver fatigue citation", cost: "$1,000–$11,000", red: true },
  { item: "Insurance premium increase after CSA score", cost: "$3,000–$8,000+ / yr", red: true },
];

const tableHead = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-subtle)",
  padding: "0.75rem 1.25rem",
  borderBottom: "1px solid var(--border)",
  textAlign: "left",
  background: "transparent",
};

export default function PenaltyTableSection() {
  return (
    <section data-testid="penalty-table-section" style={{
      background: "var(--bg-onyx)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--divider-dark)",
    }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        <p className="overline" style={{ marginBottom: "1.25rem" }}>Documented Exposure</p>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}>
          Cost exposure during the first 90 days of authority.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 580, marginBottom: "3.5rem" }}>
          Most new authorities encounter $1,000–$2,000 in required compliance infrastructure costs within the first 90 days. These are not optional.
        </p>

        {/* Infrastructure table */}
        <div style={{ marginBottom: "2.5rem", border: "1px solid var(--divider-dark)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableHead}>Required Compliance Infrastructure</th>
                <th style={{ ...tableHead, textAlign: "right" }}>Typical Cost</th>
              </tr>
            </thead>
            <tbody>
              {INFRA.map((r, i) => (
                <tr key={i} data-testid={`infra-row-${i}`} style={{
                  borderBottom: i < INFRA.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-muted)" }}>{r.item}</td>
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.875rem", color: "var(--text)", textAlign: "right", whiteSpace: "nowrap" }}>{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Violation table */}
        <div style={{ border: "1px solid var(--divider-dark)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableHead}>Documented Violation Exposure</th>
                <th style={{ ...tableHead, textAlign: "right" }}>Documented Cost Range</th>
              </tr>
            </thead>
            <tbody>
              {VIOLATIONS.map((r, i) => (
                <tr key={i} data-testid={`violation-row-${i}`} style={{
                  borderBottom: i < VIOLATIONS.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "var(--text-muted)" }}>{r.item}</td>
                  <td style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.875rem",
                    color: r.red ? "var(--red)" : "var(--text-subtle)",
                    fontWeight: r.red ? 500 : 400,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}>{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
