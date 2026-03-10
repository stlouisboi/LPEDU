const BUCKETS = [
  {
    id: "records",
    label: "Records Failures",
    sins: [
      "No Driver Qualification file — or a DQ file that fails on first inspection.",
      "No maintenance documentation system. Violations exist. Records don't.",
      "No accident register on file. Required. Not optional.",
      "HOS logs missing or unverifiable. ELD not configured to the operating authority.",
      "No DVIR on file. Basic requirement. Commonly absent.",
    ],
  },
  {
    id: "insurance",
    label: "Insurance Failures",
    sins: [
      "Coverage lapses — even 24 hours triggers automatic authority suspension.",
      "MCS-90 endorsement absent or improperly filed at FMCSA.",
      "Wrong cargo coverage limits for the freight type being hauled.",
      "First CSA score event arrives. Insurance renewal comes with a rate increase the carrier wasn't budgeting for.",
    ],
  },
  {
    id: "driver",
    label: "Driver Qualification Failures",
    sins: [
      "Operating under your authority without a verified, current CDL on file.",
      "No annual motor vehicle record (MVR) pull in the DQ file.",
      "No road test documentation before first dispatch.",
      "Medical certificate expires. Driver continues operating.",
    ],
  },
  {
    id: "financial",
    label: "Financial Failures",
    sins: [
      "No established cost-per-mile. Dispatching loads at a loss without knowing it.",
      "No freight rate floor. Accepting loads below operating cost to stay busy.",
      "No cash reserve protocol. The 30–90 day gap between invoice and payment causes a fuel crisis.",
    ],
  },
];

export default function DeadlySinsSection() {
  return (
    <section data-testid="deadly-sins-section" style={{
      background: "var(--bg)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ maxWidth: 680, marginBottom: "5rem" }}>
          <p className="overline" style={{ marginBottom: "1.25rem" }}>Failure Documentation</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}>
            How new authorities actually fail in their first 90 days.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
          }}>
            Authority failure is rarely caused by a single mistake.
            It is usually the result of missing systems.
            Most carriers will recognize at least one pattern below before the first 90 days close.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          marginBottom: "3.5rem",
        }}>
          {BUCKETS.map((bucket) => (
            <div key={bucket.id} data-testid={`sin-bucket-${bucket.id}`}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold)",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--border)",
                marginBottom: "1.5rem",
              }}>
                {bucket.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {bucket.sins.map((sin, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: "var(--text-subtle)",
                      marginTop: "0.3rem",
                      flexShrink: 0,
                    }}>—</span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}>{sin}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            color: "var(--text-subtle)",
            lineHeight: 1.7,
          }}>
            The 90-Day Standard is built to remove these from the operation before enforcement identifies them.
          </p>
        </div>

      </div>
    </section>
  );
}
