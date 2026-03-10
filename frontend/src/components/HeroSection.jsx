import { ArrowRight, Shield, FileText, ChartLine } from "@phosphor-icons/react";

const STATS = [
  { value: "90", unit: "days", label: "New entrant audit window" },
  { value: "49", unit: "+", label: "Documented audit failure points" },
  { value: "$5,000", unit: "", label: "LaunchPath Standard" },
];

export default function HeroSection() {
  return (
    <section data-testid="hero-section" style={{
      background: "var(--bg)",
      padding: "7rem 1.5rem 6rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Overline */}
        <p className="overline" style={{ marginBottom: "2rem" }}>
          FMCSA New Entrant Compliance Standard
        </p>

        {/* Main headline */}
        <div style={{ maxWidth: 820, marginBottom: "2rem" }}>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: "1.5rem",
          }}>
            A documented operational standard designed to protect first-year motor carriers from preventable authority failure.
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            maxWidth: 640,
          }}>
            LaunchPath is not a course. It installs the compliance infrastructure, financial controls, and governance systems required to survive the FMCSA New Entrant period — and the audits that follow.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "5rem", alignItems: "center" }}>
          <a href="https://www.launchpathedu.com/ground-0-briefing"
            target="_blank" rel="noopener noreferrer"
            data-testid="hero-primary-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--gold)",
              color: "#000",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: "0.875rem",
              letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "0.875rem 1.75rem",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gold-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
          >
            Begin Ground 0 Briefing <ArrowRight size={16} weight="bold" />
          </a>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--text-subtle)" }}>
            Free. No commitment required.
          </span>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 0,
          borderTop: "1px solid var(--border)",
          paddingTop: "2.5rem",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              paddingRight: "2.5rem",
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              paddingLeft: i > 0 ? "2.5rem" : 0,
            }}>
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "2rem",
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: "0.4rem",
              }}>
                {s.value}<span style={{ color: "var(--gold)", fontSize: "1.25rem" }}>{s.unit}</span>
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: "var(--text-subtle)",
                lineHeight: 1.4,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
