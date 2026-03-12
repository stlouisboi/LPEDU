import FadeIn from "./FadeIn";

const PILLARS = [
  {
    code: "LP-SYS-01",
    name: "Authority Protection",
    desc: "Operating authority, MC filing continuity, and audit readiness.",
  },
  {
    code: "LP-SYS-02",
    name: "Insurance Continuity",
    desc: "BMC-91 filings, coverage gap prevention, and policy alignment.",
  },
  {
    code: "LP-SYS-03",
    name: "Compliance Backbone",
    desc: "HOS, D&A, driver qualification, and vehicle maintenance records.",
  },
  {
    code: "LP-SYS-04",
    name: "Cash-Flow Oxygen",
    desc: "Freight rate floor, cost-per-mile controls, and financial runway.",
  },
];

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "#001530",
      padding: "72px 24px",
      borderBottom: "1px solid rgba(197,160,89,0.15)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.672rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C5A059",
            marginBottom: "0.875rem",
          }}>
            SYSTEM ARCHITECTURE
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.008rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}>
            The LaunchPath Standard installs four operational systems.
          </p>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(197,160,89,0.12)",
        }} className="pillars-grid">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.code} delay={i * 60}>
              <div
                data-testid={`pillar-${i + 1}`}
                style={{
                  background: "#001530",
                  padding: "2rem",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#002244")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#001530")}
              >
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.672rem",
                  color: "#C5A059",
                  letterSpacing: "0.1em",
                  marginBottom: "0.6rem",
                }}>
                  {pillar.code}
                </p>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.064rem",
                  color: "#FFFFFF",
                  marginBottom: "0.5rem",
                }}>
                  {pillar.name}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.896rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                }}>
                  {pillar.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) { .pillars-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
