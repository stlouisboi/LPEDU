import FadeIn from "./FadeIn";

const PATHS = [
  {
    id: "self-study",
    label: "Path 01",
    name: "Trial-and-Error Self-Study",
    cost: "$10,000–$25,000+",
    costColor: "var(--red)",
    desc: "Experience you paid too much for. The compliance gaps surface during enforcement, not before.",
  },
  {
    id: "consultant",
    label: "Path 02",
    name: "Private Consultant or Compliance Firm",
    cost: "$5,000–$12,000",
    costColor: "var(--text)",
    desc: "Their knowledge, not your system. When the engagement ends, the infrastructure doesn't transfer.",
  },
  {
    id: "launchpath",
    label: "Path 03",
    name: "LaunchPath Standard",
    cost: "$5,000",
    costColor: "var(--orange)",
    desc: "A documented operational standard you own and operate — verified before your audit window closes.",
    highlight: true,
  },
];

export default function ThreePathsSection() {
  return (
    <section data-testid="three-paths-section" style={{
      background: "var(--bg)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        <FadeIn>
          <p className="overline" style={{ marginBottom: "1.25rem" }}>The Decision</p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "var(--text-subtle)",
            letterSpacing: "0.04em",
            marginBottom: "0.875rem",
          }}>
            Every authority reaches the same decision.
          </p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            letterSpacing: "-0.02em", marginBottom: "4rem",
          }}>
            Three paths. One decision.
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {PATHS.map((p, i) => (
            <div key={p.id} data-testid={`path-row-${p.id}`} style={{
              display: "grid",
              gridTemplateColumns: "5rem 1fr auto",
              gap: "2rem",
              alignItems: "start",
              padding: "2rem 0",
              borderTop: "1px solid var(--border)",
              borderLeft: p.highlight ? "2px solid var(--orange)" : "2px solid transparent",
              paddingLeft: p.highlight ? "1.5rem" : 0,
              background: p.highlight ? "rgba(232,89,15,0.03)" : "transparent",
            }}>
              {/* Label */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem", color: "var(--text-subtle)",
                paddingTop: "0.25rem",
              }}>{p.label}</div>

              {/* Name + desc */}
              <div>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                  fontSize: "1.05rem", color: p.highlight ? "var(--orange)" : "var(--text)",
                  marginBottom: "0.5rem",
                }}>{p.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>

              {/* Cost */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.2rem", fontWeight: 500,
                color: p.costColor,
                whiteSpace: "nowrap",
                paddingTop: "0.15rem",
              }}>{p.cost}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
            color: "var(--text-subtle)", marginTop: "2.5rem", lineHeight: 1.7,
          }}>
            The wise decision is the one that preserves the household.
          </p>
      </div>
    </section>
  );
}
