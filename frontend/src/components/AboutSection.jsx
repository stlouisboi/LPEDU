import FadeIn from "./FadeIn";
import { Play } from "@phosphor-icons/react";

const METRICS = [
  { value: "49", label: "Authorities audited in the LaunchPath development framework" },
  { value: "96.4%", label: "Carriers who avoid first-year authority loss with documented systems" },
  { value: "10+", label: "Years building operational compliance systems before LaunchPath was founded" },
];

export default function AboutSection() {
  return (
    <>
      {/* Metric Band — DARK */}
      <section data-testid="metric-band" style={{
        background: "var(--bg-onyx)",
        borderBottom: "1px solid var(--divider-dark)",
        borderTop: "1px solid var(--divider-dark)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}>
            {METRICS.map((m, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{
                  padding: "1.25rem 2rem",
                  borderRight: i < METRICS.length - 1 ? "1px solid var(--divider-dark)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "2.25rem",
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}>
                    {m.value}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "var(--text-subtle)",
                    lineHeight: 1.5,
                  }}>{m.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={280}>
            <div style={{
              borderTop: "1px solid var(--divider-dark)",
              paddingTop: "1.5rem",
              marginTop: "0.75rem",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "var(--text-muted)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}>
                This is not a compliance lecture. This is loss prevention.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Founder Section — LIGHT */}
      <section data-testid="about-section" style={{
        background: "var(--bg-paper)",
        padding: "7rem 1.5rem",
        borderBottom: "1px solid var(--divider-light)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "5rem", alignItems: "start" }} className="about-grid">

          <FadeIn>
            <div>
              <p className="overline" style={{ marginBottom: "1.25rem", color: "var(--text-paper-heading)" }}>The Standard Custodian</p>
              <h2 style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.02em",
                marginBottom: "2rem",
                color: "var(--text-paper-heading)",
              }}>
                Vince Lawrence
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-paper)", lineHeight: 1.85 }}>
                  LaunchPath was not built from inside the trucking industry. It was built from 20 years of
                  manufacturing management, safety systems, and operational discipline — applied to the documented
                  failure patterns of new motor carrier authorities.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-paper)", lineHeight: 1.85 }}>
                  The systems that keep a compliance-heavy operation alive — documentation standards, inspection
                  readiness, insurance protocol, financial discipline — are the same whether the operation is
                  on a factory floor or behind a steering wheel. The Standard transfers that framework to
                  new carriers before their first audit window opens.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-paper)", lineHeight: 1.85 }}>
                  This is not a course. Admission is limited to carriers willing to operate under the Standard.
                  The custodian's role is to verify that the Standard is installed — not to sell it.
                </p>
              </div>

              {/* Video CTA hook */}
              <div style={{
                marginBottom: "2.5rem",
                padding: "1.25rem 1.5rem",
                border: "1px solid var(--divider-light)",
                background: "rgba(201,168,76,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--orange)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Play size={14} weight="fill" color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-paper-heading)", marginBottom: "0.15rem" }}>
                    Watch: The 3-Minute System Overview
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "var(--text-paper-muted)" }}>
                    Vince explains the Standard, the audit window, and who this is built for.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@LaunchPath-s1p"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="watch-overview-cta"
                  style={{
                    marginLeft: "auto",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-paper-muted)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-paper-heading)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-paper-muted)"}
                >
                  Watch →
                </a>
              </div>

              <div style={{
                borderTop: "1px solid var(--divider-light)",
                paddingTop: "2rem",
                display: "flex", gap: "2.5rem", flexWrap: "wrap",
              }}>
                {[
                  ["U.S. Navy", "Veteran"],
                  ["OSHA", "Certified"],
                  ["20+ years", "Manufacturing management & safety systems"],
                ].map(([val, label]) => (
                  <div key={val}>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-paper-heading)", marginBottom: "0.2rem" }}>{val}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--text-paper-muted)", lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
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
                background: "linear-gradient(transparent, rgba(245,245,245,0.92))",
                padding: "3rem 1.25rem 1.25rem",
              }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-paper-heading)",
                  letterSpacing: "0.1em",
                }}>
                  STATION CUSTODIAN — LP-SYS-V4.2
                </p>
              </div>
            </div>
          </FadeIn>

        </div>

        <style>{`
          @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}
