export default function AboutSection() {
  return (
    <section data-testid="about-section" style={{
      background: "var(--bg-2)",
      padding: "6rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">

        <div>
          <p className="overline" style={{ marginBottom: "1.25rem" }}>The Standard Custodian</p>
          <h2 style={{
            fontFamily: "'Manrope', sans-serif", fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.02em", marginBottom: "1.5rem",
          }}>
            Vince Lawrence
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              "LaunchPath was built by a U.S. Navy veteran with over 20 years in commercial vehicle compliance and safety.",
              "The Standard exists because the failure pattern for new motor carrier authorities is documented, predictable, and preventable — if the correct systems are installed before the first 90-day audit window opens.",
              "This is not a course. Admission is limited to carriers who are willing to operate under the standard.",
            ].map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{text}</p>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", paddingTop: "2.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "3rem" }}>
            {[["20+", "Years compliance & safety"], ["U.S. Navy", "Veteran operated"], ["FMCSA", "Safety certified"]].map(([val, label]) => (
              <div key={val}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.25rem" }}>{val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-subtle)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ background: "var(--bg-3)", height: 480, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Vince Lawrence"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: 0.85, filter: "grayscale(20%)" }}
            />
          </div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(11,17,32,0.95))",
            padding: "2rem 1.5rem 1.5rem",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em" }}>
              STATION CUSTODIAN — LP-SYS-V4.2
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
