import { useEffect, useRef, useState } from "react";

const THREATS = [
  { label: "Audit Failure" },
  { label: "HOS Violations" },
  { label: "Insurance Lapse" },
];

const GUARDS = [
  { code: "LP-GRD-01", name: "DRIVER GUARD" },
  { code: "LP-GRD-02", name: "DRUG GUARD" },
  { code: "LP-GRD-03", name: "LOG GUARD" },
  { code: "LP-GRD-04", name: "SHOP GUARD" },
];

const PILLARS = ["Authority Protection", "Insurance Continuity", "Compliance Backbone", "Cash-Flow Oxygen"];

const SIDES = [
  { dir: "AROUND", side: "left", top: true },
  { dir: "THROUGH", side: "right", top: true },
  { dir: "UNDER", side: "left", top: false },
  { dir: "OVER", side: "right", top: false },
];

export default function ProtectionDiagramSection() {
  const ref = useRef(null);
  const [phase, setPhase] = useState(0); // 0=idle, 1=threats, 2=sides, 3=box, 4=output

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 0) {
          setPhase(1);
          setTimeout(() => setPhase(2), 400);
          setTimeout(() => setPhase(3), 800);
          setTimeout(() => setPhase(4), 1200);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [phase]);

  const visible = (minPhase) => ({
    opacity: phase >= minPhase ? 1 : 0,
    transform: phase >= minPhase ? "none" : "translateY(-12px)",
    transition: "opacity 0.45s ease, transform 0.45s ease",
  });

  const sideVisible = (minPhase) => ({
    opacity: phase >= minPhase ? 1 : 0,
    transition: "opacity 0.45s ease",
  });

  const outputVisible = {
    opacity: phase >= 4 ? 1 : 0,
    transform: phase >= 4 ? "none" : "translateY(-10px)",
    transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
  };

  return (
    <section
      data-testid="protection-diagram-section"
      ref={ref}
      style={{
        background: "#000F1F",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Figure label */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.616rem",
          color: "rgba(148,163,184,0.85)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "2.5rem",
        }}>
          LAUNCHPATH OPERATIONAL ARCHITECTURE | FIGURE LP-01
        </p>

        {/* ── Diagram ─────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>

          {/* Top: Regulatory Enforcement */}
          <div style={{ ...visible(1), textAlign: "center", marginBottom: "0.5rem" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.672rem",
              color: "#fca5a5",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              REGULATORY ENFORCEMENT
            </p>
          </div>

          {/* Threat arrows down */}
          <div style={{ ...visible(1), display: "flex", gap: "3rem", marginBottom: "0.5rem" }}>
            {THREATS.map((t) => (
              <div key={t.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "#e2e8f0" }}>{t.label}</span>
                <span style={{ fontSize: "1.2rem", color: "#fca5a5", lineHeight: 1 }}>↓</span>
              </div>
            ))}
          </div>

          {/* Main row: side arrows + central box */}
          <div style={{
            display: "flex",
            alignItems: "stretch",
            width: "100%",
            gap: 0,
          }}>

            {/* Left side arrows */}
            <div style={{
              ...sideVisible(2),
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: "1rem",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              minWidth: 80,
              textAlign: "right",
            }}>
              {["AROUND", "UNDER"].map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "#94a3b8", letterSpacing: "0.1em" }}>{d}</p>
                  <span style={{ color: "#94a3b8", fontSize: "1rem" }}>→</span>
                </div>
              ))}
            </div>

            {/* Central box */}
            <div style={{
              ...sideVisible(3),
              flex: 1,
              border: "1px solid rgba(245,158,11,0.55)",
              background: "#0f172a",
              padding: "1.5rem",
            }}>
              {/* System title */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.98rem",
                color: "#f1f5f9",
                textAlign: "center",
                marginBottom: "1.5rem",
                letterSpacing: "0.03em",
              }}>
                LAUNCHPATH OPERATING STANDARD
              </p>

              {/* Guards row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
                marginBottom: "1rem",
              }} className="guards-inner">
                {GUARDS.map((g) => (
                  <div key={g.code} style={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    padding: "0.6rem 0.4rem",
                    textAlign: "center",
                  }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.56rem", color: "#fbbf24", marginBottom: "0.25rem", letterSpacing: "0.06em" }}>
                      {g.code}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", color: "#FFFFFF", fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.2 }}>
                      {g.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pillars box */}
              <div style={{
                background: "rgba(30,41,59,0.5)",
                border: "1px solid #1e293b",
                padding: "0.875rem 1rem",
              }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.616rem", color: "#e2e8f0", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  FOUR PILLARS
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem" }}>
                  {PILLARS.map((p) => (
                    <p key={p} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.672rem", color: "#cbd5e1", lineHeight: 1.4 }}>— {p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side arrows */}
            <div style={{
              ...sideVisible(2),
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingLeft: "1rem",
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              minWidth: 80,
            }}>
              {["THROUGH", "OVER"].map((d) => (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "1rem" }}>←</span>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.672rem", color: "#94a3b8", letterSpacing: "0.1em" }}>{d}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Output arrow */}
          <div style={{ ...outputVisible, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", marginTop: "0.5rem" }}>
            <span style={{ color: "#22c55e", fontSize: "1.2rem", lineHeight: 1 }}>↓</span>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.784rem",
              color: "#22c55e",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              PROTECTED AUTHORITY
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.784rem", color: "rgba(74,222,128,0.9)" }}>
              Stable Operation · Growth
            </p>
          </div>

        </div>
        {/* End diagram */}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .guards-inner { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
