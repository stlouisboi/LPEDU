import { ArrowRight } from "@phosphor-icons/react";

export default function AdmissionSection() {
  return (
    <section data-testid="admission-section" style={{
      background: "var(--bg)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <p className="overline" style={{ marginBottom: "1.5rem" }}>Request Admission</p>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif", fontWeight: 700,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.02em", marginBottom: "1.25rem",
        }}>
          Admission is limited to carriers willing to operate under the standard.
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "1rem",
          color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem",
        }}>
          Begin with the Ground 0 Briefing. It is free, takes approximately 90 minutes, and determines whether your operation is structured to survive before a dollar is committed.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://www.launchpathedu.com/ground-0-briefing"
            target="_blank" rel="noopener noreferrer"
            data-testid="admission-primary-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--gold)", color: "#000",
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "0.9rem 2rem", textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--gold-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
          >
            Begin Ground 0 Briefing <ArrowRight size={16} weight="bold" />
          </a>
          <a href="https://www.launchpathedu.com/contact"
            target="_blank" rel="noopener noreferrer"
            data-testid="admission-secondary-cta"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              border: "1px solid var(--border)", color: "var(--text-muted)",
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "0.9rem 2rem", textDecoration: "none", background: "transparent",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Request Cohort Placement
          </a>
        </div>
      </div>
    </section>
  );
}
