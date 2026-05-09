const GOLD   = "#C8933F";
const NAVY   = "#000F1F";
const DEEP   = "#060f1e";
const MONO   = "'JetBrains Mono', 'Courier New', monospace";
const SANS   = "'Inter', sans-serif";
const COND   = "'Barlow Condensed', 'Arial Narrow', sans-serif";
const BODY   = "rgba(244,241,235,0.80)";
const MUTED  = "rgba(138,150,168,0.75)";

const PRIVACY_ROWS = [
  { field: "Names",          standard: "No carrier names, driver names, or owner names published." },
  { field: "DOT numbers",    standard: "Never included." },
  { field: "Location",       standard: "Region only — e.g., 'Southeast,' 'Midwest.' No city or state." },
  { field: "Operation type", standard: "Published — e.g., 'Owner-operator, dry van, 1 power unit.'" },
  { field: "Outcome data",   standard: "Published in full: audit result, violations cited, authority status." },
];

const TEMPLATE_SECTIONS = [
  { label: "CARRIER PROFILE",            fields: ["Operation type", "Authority granted", "Entered LaunchPath", "Audit window", "Region"] },
  { label: "SITUATION AT ENTRY",         fields: ["What was missing or exposed at enrollment — factual, structural, no emotional language"] },
  { label: "WHAT WAS INSTALLED",         fields: ["Specific systems with 49 CFR citation references"] },
  { label: "AUDIT OUTCOME",              fields: ["New Entrant Safety Audit result", "Critical violations cited", "Acute violations cited", "Authority retained"] },
  { label: "WHERE THEY WOULD HAVE BEEN", fields: ["Consequence-stated outcome without the system — 1–2 sentences"] },
  { label: "CARRIER NOTE",               fields: ["Direct quote — verbatim only, or section omitted"] },
];

export default function CarrierFilesPage() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: SANS }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(200,147,63,0.15)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "1.25rem" }}>
            LP-MKT-001 — CARRIER FILES
          </p>
          <h1 style={{ fontFamily: COND, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Carrier Files
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: BODY, lineHeight: 1.85, maxWidth: 640 }}>
            LaunchPath's conversion architecture includes peer case studies alongside credentials. These files document real carrier outcomes — what was missing at entry, what was installed, and what the audit found. No names. No DOT numbers. Outcome data published in full.
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <div
            data-testid="carrier-files-empty-state"
            style={{
              background: DEEP,
              border: "1px solid rgba(200,147,63,0.18)",
              borderTop: `3px solid rgba(200,147,63,0.45)`,
              padding: "3rem 2.5rem",
              marginBottom: "4rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(200,147,63,0.35)", boxShadow: "0 0 6px rgba(200,147,63,0.25)", flexShrink: 0 }} />
              <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)", margin: 0 }}>
                STATUS — PENDING FIRST CARRIER REVIEW
              </p>
            </div>
            <p style={{ fontFamily: COND, fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", color: "rgba(255,255,255,0.65)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: "1rem" }}>
              No carrier files are published yet.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.952rem", color: MUTED, lineHeight: 1.75, maxWidth: 560 }}>
              Carrier files are published only after completion and direct approval. Each file is reviewed against the privacy standard and voice standard before it appears here. When the first file is approved, it publishes in the format below.
            </p>
          </div>

          {/* Privacy Standard */}
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "1.25rem" }}>
              PRIVACY STANDARD
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid rgba(255,255,255,0.07)" }}>
                <thead>
                  <tr>
                    {["Field", "Standard"].map(h => (
                      <th key={h} style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRIVACY_ROWS.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                      <td style={{ fontFamily: MONO, fontSize: "0.75rem", color: GOLD, padding: "0.875rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap", verticalAlign: "top" }}>{row.field}</td>
                      <td style={{ fontFamily: SANS, fontSize: "0.875rem", color: BODY, padding: "0.875rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", lineHeight: 1.6 }}>{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* File format preview */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(200,147,63,0.55)", marginBottom: "1.25rem" }}>
              FILE FORMAT — CARRIER FILE 001
            </p>
            <div style={{ border: "1px solid rgba(200,147,63,0.15)", background: DEEP, opacity: 0.55 }}>
              {/* File header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(200,147,63,0.30)" }} />
                  <p style={{ fontFamily: MONO, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,147,63,0.45)", margin: 0 }}>
                    CARRIER FILE 001
                  </p>
                </div>
                <p style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.20)", margin: 0, letterSpacing: "0.10em" }}>
                  PENDING PUBLICATION
                </p>
              </div>
              {/* Section previews */}
              {TEMPLATE_SECTIONS.map((sec, i) => (
                <div key={i} style={{ padding: "1rem 1.75rem", borderBottom: i < TEMPLATE_SECTIONS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: MONO, fontSize: "0.567rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,147,63,0.35)", margin: 0, flexShrink: 0, minWidth: 160, paddingTop: "0.1rem" }}>
                    {sec.label}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem" }}>
                    {sec.fields.map((f, j) => (
                      <p key={j} style={{ fontFamily: SANS, fontSize: "0.762rem", color: "rgba(255,255,255,0.22)", margin: 0, lineHeight: 1.6 }}>{f}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: MONO, fontSize: "0.567rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.10em", textTransform: "uppercase", marginTop: "0.875rem" }}>
              Format shown above. Actual content pending carrier completion and review.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
