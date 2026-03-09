export default function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      style={{
        background: "linear-gradient(180deg, #091525 0%, #0d1d35 100%)",
        padding: "5rem 1.5rem 4rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        data-grid-responsive
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}
        className="hero-grid"
      >

        {/* Left side */}
        <div>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            FMCSA // NEW ENTRANT STANDARD
          </div>

          <h1
            className="font-headline"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 0.95,
              margin: "0 0 1.5rem",
              color: "#ffffff",
            }}
          >
            90-DAY<br />
            COMPLIANCE<br />
            <span style={{ color: "var(--muted)" }}>OPERATING</span><br />
            <span style={{ color: "var(--muted)" }}>STANDARD</span>
          </h1>

          <p style={{ color: "#c8d8e8", lineHeight: 1.6, marginBottom: "1rem", maxWidth: 520 }}>
            A structured system for installing audit-ready compliance, insurance continuity,
            and financial discipline during the first 90 days of authority.
          </p>
          <p style={{ color: "#8899aa", lineHeight: 1.6, marginBottom: "2rem", maxWidth: 520 }}>
            New authorities do not fail because they lack effort. They fail because the
            required systems were never installed.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a
              href="https://www.launchpathedu.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-btn"
              style={{
                background: "var(--gold)",
                color: "#000000",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
                fontWeight: 600,
                transition: "opacity 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              BEGIN GROUND 0 BRIEFING &rarr;
            </a>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#8899aa", letterSpacing: "0.08em" }}>
              FREE. NO COMMITMENT.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {["U.S. NAVY VETERAN OPERATED", "20+ YEARS COMPLIANCE & SAFETY", "SAFETY-CERTIFIED OPERATIONS"].map(badge => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--gold)", fontSize: "0.65rem" }}>&#9632;</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#8899aa", letterSpacing: "0.08em" }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — Entry Protocol card */}
        <div>
          <div style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(13,29,53,0.8)",
          }}>
            {/* Card header */}
            <div style={{
              padding: "0.85rem 1.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#8899aa" }}>
                SYSTEM // ENTRY PROTOCOL
              </span>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", display: "inline-block" }} />
            </div>

            {/* Steps */}
            {[
              { num: "01", label: "Ground 0 Briefing", status: "OPEN", statusColor: "#4ade80" },
              { num: "02", label: "AUTO Diagnostic", status: "SEQUENTIAL", statusColor: "var(--gold)" },
              { num: "03", label: "Admission Decision", status: "GATED", statusColor: "var(--red)" },
              { num: "04", label: "90-Day System", status: "$5,000", statusColor: "var(--gold)" },
            ].map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#8899aa" }}>{step.num}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", color: "#c8d8e8", letterSpacing: "0.05em" }}>{step.label}</span>
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: step.statusColor, letterSpacing: "0.08em" }}>
                  {step.status}
                </span>
              </div>
            ))}

            {/* CTA */}
            <div style={{ padding: "1.25rem" }}>
              <a
                href="https://www.launchpathedu.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "0.75rem",
                  textAlign: "center",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "#ffffff",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.target.style.background = "transparent"}
              >
                BEGIN GROUND 0 BRIEFING &rarr;
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { val: "49", label: "AUDIT\nFAILURE\nPOINTS" },
                { val: "96%", label: "AVG.\nINSURANCE\nINCREASE", border: true },
                { val: "10+", label: "REQUIRED\nFILINGS", border: true },
              ].map((stat) => (
                <div
                  key={stat.val}
                  style={{
                    padding: "1rem 0.75rem",
                    borderLeft: stat.border ? "1px solid rgba(255,255,255,0.08)" : "none",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--gold)" }}>
                    {stat.val}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "#8899aa", letterSpacing: "0.08em", whiteSpace: "pre-line", marginTop: "0.3rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
