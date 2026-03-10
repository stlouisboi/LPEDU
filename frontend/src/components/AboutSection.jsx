const METRICS = [
  { value: "200+", label: "Authorities through the standard" },
  { value: "94%", label: "Audit pass rate" },
  { value: "20+", label: "Years in safety & compliance systems" },
  { value: "0", label: "Income claims on this page" },
];

export default function AboutSection() {
  return (
    <>
      {/* Metric Band */}
      <section data-testid="metric-band" style={{
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--border)",
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0",
          }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{
                padding: "1.25rem 2rem",
                borderRight: i < METRICS.length - 1 ? "1px solid var(--border)" : "none",
                borderLeft: i === 0 ? "none" : "none",
              }}>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}>{m.value}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--text-subtle)",
                  lineHeight: 1.4,
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section data-testid="about-section" style={{
        background: "var(--bg-2)",
        padding: "7rem 1.5rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "5rem", alignItems: "start" }} className="about-grid">

          <div>
            <p className="overline" style={{ marginBottom: "1.25rem" }}>The Standard Custodian</p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}>
              Vince Lawrence
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
                LaunchPath was not built from inside the trucking industry. It was built from 20 years of
                manufacturing management, safety systems, and operational discipline — applied to the documented
                failure patterns of new motor carrier authorities.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
                The systems that keep a compliance-heavy operation alive — documentation standards, inspection
                readiness, insurance protocol, financial discipline — are the same whether the operation is
                on a factory floor or behind a steering wheel. The Standard transfers that framework to
                new carriers before their first audit window opens.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
                This is not a course. Admission is limited to carriers willing to operate under the Standard.
                The custodian's role is to verify that the Standard is installed — not to sell it.
              </p>
            </div>

            <div style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "2rem",
              display: "flex", gap: "2.5rem", flexWrap: "wrap",
            }}>
              {[
                ["U.S. Navy", "Veteran"],
                ["OSHA", "Certified"],
                ["20+ years", "Manufacturing management & safety systems"],
              ].map(([val, label]) => (
                <div key={val}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "0.2rem" }}>{val}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-subtle)", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden", height: 520 }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
                alt="Vince Lawrence"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(11,17,32,0.9))",
              padding: "3rem 1.25rem 1.25rem",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--gold)",
                letterSpacing: "0.1em",
              }}>
                STATION CUSTODIAN — LP-SYS-V4.2
              </p>
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
