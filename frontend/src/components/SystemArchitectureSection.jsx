const SYSTEMS = [
  { code: "LP-SYS-01", system: "Authority Protection", reg: "49 CFR Part 391", fn: "Driver qualification and operational legitimacy" },
  { code: "LP-SYS-02", system: "Insurance Continuity", reg: "49 CFR Part 387", fn: "Financial responsibility and insurance filings" },
  { code: "LP-SYS-03", system: "Compliance Backbone", reg: "49 CFR Parts 382, 395, 396", fn: "Drug & alcohol, hours of service, maintenance" },
  { code: "LP-SYS-04", system: "Cash-Flow Oxygen", reg: "Operational", fn: "Revenue stability and cost management" },
];

const GUARDS = [
  { code: "LP-GRD-01", guard: "Driver Guard", protects: "DQ file violations", reg: "49 CFR Part 391" },
  { code: "LP-GRD-02", guard: "Drug Guard", protects: "Clearinghouse violations", reg: "49 CFR Part 382" },
  { code: "LP-GRD-03", guard: "Log Guard", protects: "HOS violations", reg: "49 CFR Part 395" },
  { code: "LP-GRD-04", guard: "Shop Guard", protects: "Maintenance failures", reg: "49 CFR Part 396" },
];

const AUTO_MODEL = [
  { code: "LP-MOD-AUTO-A", dir: "A — Around", threat: "Insurance exposure", defense: "Insurance Continuity" },
  { code: "LP-MOD-AUTO-U", dir: "U — Under", threat: "Financial collapse", defense: "Cash-Flow Oxygen" },
  { code: "LP-MOD-AUTO-T", dir: "T — Through", threat: "Compliance failure", defense: "Compliance Backbone" },
  { code: "LP-MOD-AUTO-O", dir: "O — Over", threat: "Regulatory enforcement", defense: "Authority Protection" },
];

const TABLE_HEADER = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.714rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.65)",
  padding: "0.75rem 1.25rem",
  background: "rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.10)",
};

const CELL = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "var(--text-sm)",
  color: "rgba(255,255,255,0.80)",
  padding: "0.875rem 1.25rem",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  verticalAlign: "top",
  lineHeight: 1.5,
};

const CODE_CELL = {
  ...CELL,
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.762rem",
  color: "#d4900a",
  whiteSpace: "nowrap",
};

export default function SystemArchitectureSection() {
  return (
    <section
      data-testid="system-architecture-section"
      style={{
        background: "#000F1F",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#d4900a", marginBottom: "0.75rem",
            }}>
              LaunchPath Operational Architecture
            </p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: "1rem",
              maxWidth: 560,
            }}>
              The LaunchPath Operating Standard installs four operational systems and four industrial guards.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.8,
              maxWidth: 520,
            }}>
              Designed to prevent risk from reaching the carrier authority through any attack vector.
            </p>
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            color: "rgba(212,144,10,0.85)",
            border: "1px solid rgba(212,144,10,0.35)",
            padding: "0.6rem 1rem",
            whiteSpace: "nowrap",
            alignSelf: "flex-start",
          }}>
            LP-STD-001 | LaunchPath Operating Standard
          </div>
        </div>

        {/* ── Table 1: Systems ───────────────────────────── */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem",
          }}>
            Operational Systems
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.08)" }}>
              <thead>
                <tr>
                  {["Code", "System", "Regulation Domain", "Function"].map((h) => (
                    <th key={h} style={TABLE_HEADER}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SYSTEMS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={CODE_CELL}>{row.code}</td>
                    <td style={{ ...CELL, fontWeight: 600, color: "rgba(255,255,255,0.90)" }}>{row.system}</td>
                    <td style={{ ...CELL, fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.75)" }}>{row.reg}</td>
                    <td style={CELL}>{row.fn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Table 2: Guards ────────────────────────────── */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem",
          }}>
            Guard Installation
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.08)" }}>
              <thead>
                <tr>
                  {["Code", "Guard", "Protects Against", "Regulation"].map((h) => (
                    <th key={h} style={TABLE_HEADER}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GUARDS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={CODE_CELL}>{row.code}</td>
                    <td style={{ ...CELL, fontWeight: 600, color: "rgba(255,255,255,0.90)" }}>{row.guard}</td>
                    <td style={CELL}>{row.protects}</td>
                    <td style={{ ...CELL, fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.75)" }}>{row.reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Table 3: AUTO Protection Model ────────────── */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem",
          }}>
            AUTO Protection Model
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.08)" }}>
              <thead>
                <tr>
                  {["Code", "Direction", "Threat Vector", "Defense"].map((h) => (
                    <th key={h} style={TABLE_HEADER}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUTO_MODEL.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={CODE_CELL}>{row.code}</td>
                    <td style={{ ...CELL, fontWeight: 700, color: "#d4900a" }}>{row.dir}</td>
                    <td style={CELL}>{row.threat}</td>
                    <td style={{ ...CELL, color: "rgba(255,255,255,0.85)" }}>{row.defense}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
