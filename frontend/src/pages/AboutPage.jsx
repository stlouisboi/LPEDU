import { Link } from '../compat/Link';
import Image from 'next/image';
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import FadeIn from "../components/FadeIn";

const DOCTRINE = [
  {
    ref: "§ 1.6",
    title: "Diagnostic Precedence Rule",
    body: "Teaching before diagnosing builds systems that don't fit the actual operation. The assessment comes first. Always.",
  },
  {
    ref: "§ 1.8",
    title: "Stewardship Refusal Authority",
    body: "Carriers who enroll before they are ready don't just waste money. They build on a broken foundation. This Standard refuses admission when readiness is absent.",
  },
  {
    ref: "§ 1.9",
    title: "Responsibility Prioritization",
    body: "Admission based on willingness to pay rather than readiness to build weakens the Standard for every carrier in the cohort. Readiness determines admission. Not urgency.",
  },
  {
    ref: "§ 2.1",
    title: "Governance Before Growth",
    body: "Growing too fast without the right systems in place creates liability that can end the operation. Governance must be installed before capacity is expanded.",
  },
];

const EXCLUSIONS = [
  "Legal advice or legal representation",
  "Dispatch services or load booking",
  "Insurance brokerage or policy placement",
  "Guaranteed FMCSA audit outcomes",
  "Tax preparation or financial advisory",
  "Ongoing consulting retainers or managed services",
  "Revenue generation coaching or freight strategies",
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* System status bar */}
      <div style={{
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--border)",
        padding: "0.6rem 1.5rem",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: "2.5rem", flexWrap: "nowrap",
            overflowX: "auto", scrollbarWidth: "none",
          }}>
            {[
              ["AUTHORITY", "ACTIVE"],
              ["REGISTRY", "SYNCED"],
              ["INTEGRITY", "100%"],
              ["UPLINK", "STABLE"],
              ["CFR_SYNC", "2026_V4.2"],
            ].map(([key, val]) => (
              <div key={key} style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>{key}:</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--orange)", letterSpacing: "0.1em" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{
        padding: "7rem 1.5rem 5rem",
        borderBottom: "1px solid var(--border)",
        background: `linear-gradient(to right, rgba(8,15,28,0.96) 55%, rgba(8,15,28,0.70) 100%), url("https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/5anp3im9_hero-owner-wheel.png") center 30%/cover no-repeat`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: "6rem", alignItems: "center" }} className="about-hero-grid">

          <div>
            <p className="overline" style={{ marginBottom: "1.5rem", animation: "heroEnter 0.65s ease both" }}>
              Station Custodian — LP-SYS-V4.2
            </p>
            <h1 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: "2rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.1s",
            }}>
              Vince Lawrence<br />
              <span style={{ fontSize: "0.55em", fontWeight: 600, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.65)" }}>Station Custodian</span>
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              lineHeight: 1.85,
              maxWidth: 520,
              marginBottom: "1.25rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.2s",
            }}>
              LaunchPath is an institutional operating standard for new motor carriers,
              not a course or coaching program.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-subtle)",
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: "1.25rem",
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.25s",
            }}>
              That means a defined set of documents, checkpoints, and behaviors every accepted
              carrier installs — not videos to watch when there's time.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              color: "var(--text-subtle)",
              lineHeight: 1.8,
              maxWidth: 520,
              animation: "heroEnter 0.65s ease both",
              animationDelay: "0.3s",
            }}>
              LaunchPath exists to get new motor carriers through the New Entrant period with
              authority, insurance, and cash flow intact. It requires the right paperwork and
              programs in place before you put a truck on the road.
            </p>
          </div>

          <div style={{ animation: "heroEnter 0.65s ease both", animationDelay: "0.15s" }}>
            <div style={{ position: "relative", overflow: "hidden", height: 480 }}>
              <Image
                src="https://customer-assets.emergentagent.com/job_your-numbers-calc/artifacts/apm4exp9_Vince.png"
                alt="Vince Lawrence — Station Custodian, LaunchPath Transportation EDU, FMCSA compliance specialist"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(2,4,8,0.9))",
                padding: "2.5rem 1.25rem 1.25rem",
              }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--orange)", letterSpacing: "0.1em" }}>
                  STATION CUSTODIAN — LP-SYS-V4.2
                </p>
              </div>
            </div>

            {/* Credential band — 2×2 grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px", background: "var(--border)", marginTop: "1px",
            }}>
              {[
                ["U.S. Navy", "Veteran"],
                ["OSHA 30-Hour", "Certified"],
                ["20+ Yrs", "Manufacturing & Safety Systems"],
                ["Safety Systems", "Manufacturing Operations at Scale"],
              ].map(([val, label]) => (
                <div key={val} style={{ background: "var(--bg-2)", padding: "0.875rem 1rem" }}>
                  <div style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "0.2rem" }}>{val}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Credential context line */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.65,
              marginTop: "0.875rem",
              paddingLeft: "2px",
            }}>
              "OSHA and FMCSA operate from the same foundation — industries that won't self-regulate require documented systems and audit consequence. That is the credential."
            </p>
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 900px) { .about-hero-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 640px) { .doctrine-grid { grid-template-columns: 1fr !important; } }
        `}} />
      </section>

      {/* Vince's Statement */}
      <section style={{ padding: "7rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p className="overline" style={{ marginBottom: "1.5rem" }}>In Vince's Words</p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
            }}>
              Vince Lawrence
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                I did not come from trucking. I came from 20 years of building and leading operational systems
                in manufacturing environments — where documented processes were the difference between a compliant
                operation and a costly one, and where leadership meant being accountable for systems other people ran.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                When I looked at what new motor carriers were operating without in their first 90 days, I recognized
                the same failure pattern I had watched surface on the plant floor. Not ignorance. Not laziness.
                The absence of a system. LaunchPath is built from that pattern recognition. The names are different.
                The failure modes are not.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                In trucking, those same missing systems show up as failed New Entrant Safety Audits, revoked authority,
                and small carriers running out of cash while fixed costs keep burning.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.12rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                The Navy runs on documented procedure. Manufacturing operations at the leadership level run on system
                accountability. OSHA certification is not a trucking credential — it is a regulatory philosophy credential.
                FMCSA and OSHA operate from the same foundation: industries that will not self-regulate require documented
                systems, audit mechanisms, and consequence structures. That is the environment I built systems in for
                two decades. That is the background LaunchPath is built from.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <blockquote style={{
              borderLeft: "2px solid var(--orange)",
              paddingLeft: "1.5rem",
              margin: "0 0 1rem",
            }}>
              <p style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "1.288rem",
                color: "var(--text)",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}>
                "My responsibility is not to motivate carriers — it is to prevent preventable failure."
              </p>
              <footer style={{ fontFamily: "'Inter', sans-serif", fontSize: "var(--text-sm)", color: "var(--text-subtle)", marginTop: "0.75rem" }}>
                — Vince Lawrence, Station Custodian
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Operational Doctrine */}
      <section style={{ padding: "7rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ maxWidth: 600, marginBottom: "4.5rem" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                49 CFR — Operational Doctrine
              </p>
              <h2 style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}>Operational Doctrine</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-subtle)" }}>
                Version 4.2 · Authority: Station Custodian
              </p>
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "var(--border)",
          }} className="doctrine-grid">
            {DOCTRINE.map((d, i) => (
              <FadeIn key={d.ref} delay={i * 80}>
                <div style={{
                  background: "var(--bg)",
                  padding: "2.25rem 2rem",
                  height: "100%",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
                >
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--orange)", letterSpacing: "0.12em", marginBottom: "1rem" }}>{d.ref}</p>
                  <h3 style={{ fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 700, fontSize: "1.092rem", color: "var(--text)", marginBottom: "0.875rem", lineHeight: 1.3 }}>{d.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>{d.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What LaunchPath Does Not Provide */}
      <section style={{ padding: "7rem 1.5rem", borderBottom: "1px solid var(--border)", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p className="overline" style={{ marginBottom: "1.25rem" }}>Institutional Boundaries</p>
            <h2 style={{
              fontFamily: "'Newsreader', 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}>
              What LaunchPath Does Not Provide
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Knowing what we don't do is as important as knowing what we do. LaunchPath is a compliance
              education and implementation system. We build infrastructure. We do not operate your business.
            </p>
          </FadeIn>

          <FadeIn delay={80}>
            <div style={{ border: "1px solid var(--border)" }}>
              {EXCLUSIONS.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  padding: "1rem 1.5rem",
                  borderBottom: i < EXCLUSIONS.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "var(--text-subtle)", marginTop: "0.25rem", flexShrink: 0 }}>—</span>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{item}</p>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-subtle)", marginTop: "1.5rem", lineHeight: 1.7 }}>
              These boundaries are not limitations — they are the reason the LaunchPath Standard maintains its integrity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Operator proof block */}
      <section style={{ padding: "5rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-subtle)",
              marginBottom: "1.75rem",
            }}>Operator Account</p>
            <blockquote style={{
              borderLeft: "2px solid var(--orange)",
              paddingLeft: "1.75rem",
              margin: 0,
            }}>
              <p style={{
                fontFamily: "'Newsreader', 'Playfair Display', serif", fontWeight: 600,
                fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
                color: "var(--text)", lineHeight: 1.65, fontStyle: "italic",
                marginBottom: "1rem",
              }}>
                "I had been running 60 days before I realized I had no written D&A policy and my driver files were missing three required documents. Ground 0 caught it before the audit did."
              </p>
              <footer style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", color: "var(--text-subtle)", letterSpacing: "0.08em" }}>
                — New Entrant Carrier · Owner-Operator · Southeast Region
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.064rem", color: "var(--text-muted)", lineHeight: 1.82, marginBottom: "2.75rem", maxWidth: 560, margin: "0 auto 2.75rem" }}>
              Not all applicants are accepted. Admission is based on operational readiness — not urgency, not ability to pay. If you are in your first 90 days and you are serious about building the system before FMCSA arrives, this is where it starts.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/reach-diagnostic"
                data-testid="about-ground0-cta"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#d4900a", color: "#060d19",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700,
                  fontSize: "var(--text-sm)", letterSpacing: "0.09em", textTransform: "uppercase",
                  padding: "1rem 2.25rem", textDecoration: "none", transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e8a520"}
                onMouseLeave={e => e.currentTarget.style.background = "#d4900a"}
              >
                TAKE REACH DIAGNOSTIC →
              </Link>
              <a
                href="https://www.launchpathedu.com/reach-diagnostic"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="about-reach-cta"
                style={{
                  display: "inline-flex", alignItems: "center",
                  background: "transparent", color: "var(--text-muted)",
                  fontFamily: "'Inter', sans-serif", fontWeight: 700,
                  fontSize: "var(--text-sm)", letterSpacing: "0.09em", textTransform: "uppercase",
                  padding: "1rem 2.25rem", textDecoration: "none",
                  border: "1px solid var(--border)", transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                RUN THE REACH DIAGNOSTIC →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
