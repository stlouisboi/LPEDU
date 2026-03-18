import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import FadeIn from "./FadeIn";
import { BookMockup3D } from "./BookMockup3D";

export default function ProductPageTemplate({
  label,
  title,
  subtitle,
  price,
  tagline,
  positioning,
  whatsInside,
  whoItsFor,
  whatItReplaces,
  nextStepText,
  nextStepHref,
  nextStepLabel,
  gumroadUrl = "#",
  standardInclusion = true,
  mockupId = null,
  children,
}) {
  const gold = "#d4900a";
  const goldFaint = "rgba(212,144,10,0.15)";

  return (
    <div style={{ background: "#060d19", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <section style={{ background: "#0b1628", borderBottom: `3px solid ${gold}`, padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: mockupId ? 1100 : 820, margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              display: "grid",
              gridTemplateColumns: mockupId ? "1fr 420px" : "1fr",
              gap: "3rem",
              alignItems: "center",
            }} className="packet-hero-grid">
              {/* Left: text */}
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase", color: gold, marginBottom: "1.25rem",
                }}>{label}</p>

                <h1 style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FFFFFF",
                  lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem",
                }}>{title}</h1>

                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.55)", marginBottom: "2rem", fontStyle: "italic",
                }}>{subtitle}</p>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem",
                    fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em",
                  }}>{price}</span>

                  <a
                    href={gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="buy-on-gumroad-btn"
                    style={{
                      display: "inline-block", background: gold, color: "#0b1628",
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "0.875rem 2rem", textDecoration: "none", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                    onMouseLeave={e => e.currentTarget.style.background = gold}
                  >
                    Get on Gumroad →
                  </a>
                </div>
              </div>

              {/* Right: 3D book mockup */}
              {mockupId && (
                <div style={{ borderRadius: "6px", overflow: "hidden" }}>
                  <BookMockup3D productId={mockupId} mode="embed" />
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em",
                    textAlign: "center", marginTop: "0.5rem",
                  }}>DRAG TO ROTATE</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tagline strip */}
      <div style={{
        background: "#080f1e", borderBottom: "1px solid rgba(212,144,10,0.15)",
        padding: "1.5rem 24px",
      }}>
        <p style={{
          maxWidth: 820, margin: "0 auto",
          fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
          color: "rgba(255,255,255,0.82)", lineHeight: 1.7, fontStyle: "italic",
        }}>{tagline}</p>

        {/* Operational system line */}
        <p style={{
          maxWidth: 820, margin: "0.75rem auto 0",
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
          fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(212,144,10,0.60)",
        }}>
          This is not a standalone file. This document becomes part of your operational system.
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "64px 24px" }}>

        {/* Positioning */}
        <FadeIn>
          <section style={{ marginBottom: "3.5rem" }}>
            <SectionLabel>What This Is — And What It Is Not</SectionLabel>
            {positioning.map((p, i) => (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.15rem",
                color: "rgba(255,255,255,0.9)", lineHeight: 1.85, marginBottom: "1.25rem",
              }}>{p}</p>
            ))}
          </section>
        </FadeIn>

        <Divider />

        {/* What's Inside */}
        <FadeIn delay={80}>
          <section style={{ marginBottom: "3.5rem" }}>
            <SectionLabel>What's Inside</SectionLabel>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {whatsInside.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
                    color: gold, marginTop: "0.25rem", flexShrink: 0,
                    border: `1px solid ${goldFaint}`, padding: "0.15rem 0.4rem",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                    color: "rgba(255,255,255,0.9)", lineHeight: 1.7,
                  }}>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <Divider />

        {/* Who It's For */}
        <FadeIn delay={120}>
          <section style={{ marginBottom: "3.5rem" }}>
            <SectionLabel>Who It's For</SectionLabel>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {whoItsFor.map((item, i) => (
                <li key={i} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.88)", lineHeight: 1.7,
                  paddingLeft: "1.25rem", position: "relative",
                }}>
                  <span style={{ position: "absolute", left: 0, color: gold }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <Divider />

        {/* What It Replaces */}
        <FadeIn delay={160}>
          <section style={{ marginBottom: "3.5rem" }}>
            <SectionLabel>What It Replaces</SectionLabel>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {whatItReplaces.map((item, i) => (
                <li key={i} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.88)", lineHeight: 1.7,
                  paddingLeft: "1.25rem", position: "relative",
                }}>
                  <span style={{ position: "absolute", left: 0, color: "rgba(248,113,113,0.7)" }}>×</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {children}

        <Divider />

        {/* Next Step */}
        <FadeIn delay={200}>
          <section style={{
            background: "#0b1628", border: `1px solid ${goldFaint}`,
            borderLeft: `3px solid ${gold}`, padding: "2rem 2.5rem", marginBottom: "3rem",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
              color: gold, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem",
            }}>Next Step</p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.1rem",
              color: "rgba(255,255,255,0.9)", lineHeight: 1.8, marginBottom: "1.25rem",
            }}>{nextStepText}</p>
            <Link to={nextStepHref} style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase", color: gold, textDecoration: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{nextStepLabel}</Link>
          </section>
        </FadeIn>

        {/* Standard Inclusion Footnote */}
        {standardInclusion && (
          <FadeIn delay={220}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
              borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem",
              fontStyle: "italic",
            }}>
              The complete New Carrier Document System — including this packet — is included at no additional cost for carriers enrolled in the LaunchPath Standard.
            </p>
          </FadeIn>
        )}
      </div>

      <FooterSection />
      <style>{`
        @media (max-width: 760px) {
          .packet-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700,
      letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,144,10,0.75)",
      marginBottom: "1.5rem",
    }}>{children}</p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(212,144,10,0.1)", marginBottom: "3.5rem" }} />;
}
