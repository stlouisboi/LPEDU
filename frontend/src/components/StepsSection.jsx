const STEPS = [
  { num: "01", badge: "Free", badgeGold: false, name: "Ground 0 Briefing", desc: "Six structured lessons. Approximately 90 minutes. Establishes whether your operation is structured to survive before a single dollar is committed." },
  { num: "02", badge: "Free", badgeGold: false, name: "AUTO Diagnostic", desc: "A four-pillar readiness assessment and total cost-of-authority calculation. Survival is a math problem, not a commitment level." },
  { num: "03", badge: "Gated", badgeGold: false, name: "Admission Decision", desc: "Admission is granted only when the operational structure supports survival. Readiness determines entry." },
  { num: "04", badge: "$2,500", badgeGold: true, name: "90-Day Operating System", desc: "Structured implementation: compliance infrastructure, insurance stability, audit readiness, and financial controls — verified by the Station Custodian." },
];

export default function StepsSection() {
  return (
    <section data-testid="steps-section" style={{
      background: "var(--bg)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p className="overline" style={{ marginBottom: "1.25rem" }}>The System</p>
        <h2 style={{
          fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700,
          fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
          letterSpacing: "-0.02em", marginBottom: "4rem",
        }}>
          Four steps. Sequential. No shortcuts.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--border)" }}>
          {STEPS.map((s) => (
            <div key={s.num} data-testid={`step-${s.num}`} style={{
              background: "var(--bg)", padding: "2.5rem",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.762rem",
                  color: "var(--text-subtle)", border: "1px solid var(--border)",
                  padding: "0.2rem 0.5rem",
                }}>{s.num}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", fontWeight: 600,
                  letterSpacing: "0.06em",
                  border: `1px solid ${s.badgeGold ? "var(--border-gold)" : "var(--border)"}`,
                  color: s.badgeGold ? "var(--gold)" : "var(--text-subtle)",
                  padding: "0.2rem 0.5rem",
                }}>{s.badge}</span>
              </div>
              <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--text)" }}>{s.name}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
