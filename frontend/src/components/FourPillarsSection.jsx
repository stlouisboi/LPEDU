import { ShieldCheck, CurrencyDollar, FileText, Certificate } from "@phosphor-icons/react";

const PILLARS = [
  {
    icon: <ShieldCheck size={22} weight="regular" />,
    label: "01",
    name: "Insurance Continuity",
    desc: "A single coverage lapse suspends authority automatically. LaunchPath installs the protocols that prevent it from happening."
  },
  {
    icon: <CurrencyDollar size={22} weight="regular" />,
    label: "02",
    name: "Cash-Flow Oxygen",
    desc: "Capital reserves, payment gap protocols, and tax discipline installed before the first load is dispatched."
  },
  {
    icon: <FileText size={22} weight="regular" />,
    label: "03",
    name: "Compliance Backbone",
    desc: "Driver qualification files, HOS records, maintenance logs, and drug program documentation built to audit standard."
  },
  {
    icon: <Certificate size={22} weight="regular" />,
    label: "04",
    name: "Authority Protection",
    desc: "Operational decisions that trigger CSA score damage are identified and prevented before they reach the enforcement threshold."
  },
];

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "var(--bg-2)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ maxWidth: 600, marginBottom: "4rem" }}>
          <p className="overline" style={{ marginBottom: "1.25rem" }}>The Operating Standard</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}>
            Four systems. Installed before the first audit window opens.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75 }}>
            New authorities do not fail because of bad intentions. They fail because the required systems were never installed.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          background: "var(--border)",
        }}>
          {PILLARS.map((p) => (
            <div key={p.label} data-testid={`pillar-${p.label}`} style={{
              background: "var(--bg-2)",
              padding: "2.5rem",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-3)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--bg-2)"}
            >
              <div style={{ color: "var(--gold)", marginBottom: "1.25rem" }}>{p.icon}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--text-subtle)",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}>{p.label}</div>
              <h3 style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--text)",
                marginBottom: "0.875rem",
              }}>{p.name}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
              }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
