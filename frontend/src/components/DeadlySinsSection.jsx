import FadeIn from "./FadeIn";

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
      "Operating under authority without a verified, current CDL on file.",
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
      background: "var(--bg-paper)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--divider-light)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <FadeIn>
          <div style={{ maxWidth: 680, marginBottom: "5rem" }}>
            <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--text-paper-heading)" }}>Failure Documentation</p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
              color: "var(--text-paper-heading)",
            }}>
              How new authorities fail in the first 90 days.
            </h2>
            <p style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "1.12rem",
              color: "var(--text-paper)",
              lineHeight: 1.7,
              marginBottom: "0.5rem",
            }}>
              Failure rarely begins with a single decision.<br />
              It begins with systems that were never installed.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "var(--text-paper-muted)",
              lineHeight: 1.75,
              marginTop: "1rem",
            }}>
              The 16 Deadly Sins are the recurring failures that destroy or destabilize new motor carrier authorities.{" "}
              <strong>AUTO</strong> — the authority-protection framework — shows how each one reaches the authority: Around, Under, Through, and Over. LaunchPath installs the systems that block them.
            </p>
          </div>
        </FadeIn>

        {/* 2×2 Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "3rem 4rem",
          marginBottom: "3.5rem",
        }} className="sins-grid">
          {BUCKETS.map((bucket) => (
            <div key={bucket.id} data-testid={`sin-bucket-${bucket.id}`}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-paper-muted)",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--divider-light)",
                marginBottom: "1.5rem",
              }}>
                {bucket.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {bucket.sins.map((sin, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.857rem",
                      color: "var(--text-paper-muted)",
                      marginTop: "0.25rem",
                      flexShrink: 0,
                      lineHeight: 1.7,
                    }}>—</span>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      color: "var(--text-paper)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}>{sin}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--divider-light)", paddingTop: "2rem" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.064rem",
            color: "var(--text-paper-muted)",
            lineHeight: 1.7,
          }}>
            The 90-Day Standard is built to remove these from the operation before enforcement identifies them.
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) { .sins-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}} />
    </section>
  );
}
