import FadeIn from "./FadeIn";
import { ArrowRight } from "@phosphor-icons/react";

const PILLARS = [
  {
    num: "01",
    name: "Authority Protection",
    principle: "The authority survives only when its obligations are maintained.",
    body: "New authorities don't get shut down because of one bad day; they get shut down because nobody installed a system for the New Entrant window. This pillar hard-wires the filings, records, and 90-day habits that keep your MC number active when FMCSA runs its first audit.",
    brief: "/knowledge-center/new-entrant-safety-audit-brief",
    briefLabel: "New Entrant Audit Brief",
  },
  {
    num: "02",
    name: "Insurance Continuity",
    principle: "Coverage that lapses ends an authority.",
    body: "Coverage that looks fine on a quote can still let your authority die on paper. This pillar keeps your policy, filings, and real operation in sync so one missed payment, unreported truck, or bad MCS-90 assumption doesn't quietly pull your BMC-91 and sideline your business.",
    brief: "/knowledge-center/insurance-continuity-brief",
    briefLabel: "Insurance Continuity Brief",
  },
  {
    num: "03",
    name: "Compliance Backbone",
    principle: "Documentation is the spine of the operation.",
    body: "Most carriers stack loose paperwork and call it \"compliance.\" This pillar turns HOS, Drug & Alcohol, and Maintenance into a simple operating backbone — clear policies, weekly reviews, and unit files that can survive roadside checks, audits, and crash investigations.",
    brief: "/knowledge-center/hos-compliance-brief",
    briefLabel: "HOS Compliance Brief",
  },
  {
    num: "04",
    name: "Cash-Flow Oxygen",
    principle: "Operations fail when cash suffocates.",
    body: "You can pass every audit and still bleed out on cash. This pillar uses your real cost per mile, payment terms, and startup spend to make sure you can afford to run the Standard for 12–24 months instead of starving it the first time freight gets slow.",
    brief: null,
    briefLabel: null,
  },
];

export default function FourPillarsSection() {
  return (
    <section data-testid="four-pillars-section" style={{
      background: "var(--bg-2)",
      padding: "7rem 1.5rem",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <FadeIn>
          <div style={{ maxWidth: 680, marginBottom: "4rem" }}>
            <p className="overline" style={{ marginBottom: "1.25rem" }}>The Standard</p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}>
              The Four Pillars of the Standard.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.8,
            }}>
              These are not modules. They are the four operating pillars of the LaunchPath Standard.
              Each one addresses a documented failure pattern that ends new carrier authorities
              in their first 12 months of operation. All four are installed simultaneously.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1px",
          background: "var(--border)",
          marginBottom: "2rem",
        }}>
          {PILLARS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 80}>
              <div data-testid={`pillar-${p.num}`}
                style={{
                  background: "var(--bg-2)",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "100%",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-3)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg-2)"}
              >
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "var(--gold)",
                  letterSpacing: "0.12em",
                }}>{p.num}</div>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--text)",
                  lineHeight: 1.3,
                }}>{p.name}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.825rem",
                  color: "var(--orange)",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}>{p.principle}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  flex: 1,
                }}>{p.body}</p>
                {p.brief && (
                  <a href={p.brief} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-subtle)",
                    textDecoration: "none",
                    marginTop: "0.5rem",
                    transition: "color 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text-subtle)"}
                  >
                    {p.briefLabel} <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "var(--text-subtle)",
              lineHeight: 1.7,
              maxWidth: 580,
            }}>
              Each pillar is backed by a LaunchPath brief that answers a simple question:
              what do your records actually have to prove?
            </p>
            <a href="/knowledge-center" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              padding: "0.6rem 1.25rem",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-subtle)"; }}
            >
              View all 5 briefs <ArrowRight size={13} />
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
