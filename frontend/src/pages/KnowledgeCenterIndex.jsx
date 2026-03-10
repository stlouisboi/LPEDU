import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const BRIEFS = [
  {
    slug: "/knowledge-center/new-entrant-safety-audit-brief",
    phase: "Ground 0 — New Entrant Program (18-month period)",
    title: "New Entrant Safety Audit: Ground 0 Brief",
    whoFor: "New authorities in their first 12 months, preparing for FMCSA New Entrant Safety Audit.",
    outcome: "Walk away with a one-binder audit prep checklist and a map of every automatic-failure condition.",
    readTime: "12-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/hos-compliance-brief",
    phase: "Ground 0 — Hours-of-Service Compliance",
    title: "HOS Compliance Brief: What ELD Records Actually Prove",
    whoFor: "Carriers operating any CMV requiring HOS tracking — drivers, owner-operators, and small fleets.",
    outcome: "Build a retrievable HOS record system that holds up to audit review.",
    readTime: "12-minute brief",
    status: "published",
  },
  {
    slug: null,
    phase: "Ground 0 — Drug & Alcohol Program",
    title: "Drug & Alcohol Program Installation Brief",
    whoFor: "Any motor carrier required to maintain a D&A testing program under 49 CFR Part 382.",
    outcome: "Install a compliant testing program — consortium, random, and Clearinghouse — before the first driver dispatch.",
    readTime: "9-minute brief",
    status: "coming",
  },
  {
    slug: null,
    phase: "Compliance Systems — Vehicle & Maintenance",
    title: "Maintenance Records Brief: DVIRs, Periodic Inspections, and OOS Protocol",
    whoFor: "Carriers managing their own maintenance records or working with third-party shops.",
    outcome: "Create a maintenance file for each unit that passes an audit review on the first request.",
    readTime: "8-minute brief",
    status: "coming",
  },
  {
    slug: null,
    phase: "Compliance Systems — Insurance & Authority",
    title: "Insurance Continuity Brief: Staying Active When Rates Move",
    whoFor: "New authorities navigating their first renewal cycle or managing post-CSA event premium increases.",
    outcome: "Understand the filing requirements and rate-management controls that keep authority active through the first 24 months.",
    readTime: "11-minute brief",
    status: "coming",
  },
];

export default function KnowledgeCenterIndex() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section data-testid="kc-hero" style={{
        background: "var(--bg)",
        padding: "6rem 1.5rem 5rem",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
          }}>LaunchPath / Knowledge Center</p>

          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.5rem",
          }}>Knowledge Center</h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            maxWidth: 620,
            marginBottom: "3rem",
          }}>
            Documented briefings on FMCSA compliance, authority operations, and
            the systems that keep new motor carriers alive through the New Entrant period.
            Each brief is a working document — not a summary.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {[
              ["5", "Briefs in this series"],
              ["8–12 min", "Average read time"],
              ["49 CFR", "Primary regulation source"],
            ].map(([val, label]) => (
              <div key={val}>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}>{val}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-subtle)",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIEF LIST ── */}
      <section data-testid="kc-brief-list" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border)",
          }}>FMCSA Compliance Briefs — New Entrant Series</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {BRIEFS.map((brief, i) => (
              <BriefCard key={i} brief={brief} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM ORIENTATION ── */}
      <section style={{
        background: "var(--bg-2)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 1.5rem",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "2.5rem", alignItems: "center" }} className="kc-bottom-grid">
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              marginBottom: "0.75rem",
            }}>Not sure where to start?</p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: "-0.015em",
              color: "var(--text)",
              marginBottom: "0.75rem",
            }}>Run the FREE readiness diagnostic first.</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: 460,
            }}>
              The AUTO Diagnostic maps your current operation against the five audit systems and tells you which briefs are most urgent for your situation.
            </p>
          </div>
          <a
            href="https://www.launchpathedu.com/auto-diagnostic"
            target="_blank" rel="noopener noreferrer"
            data-testid="kc-diagnostic-cta"
            style={{
              display: "inline-block",
              background: "var(--orange)",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "1rem 1.75rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
          >
            Run Diagnostic
          </a>
        </div>
      </section>

      <FooterSection />

      <style>{`
        @media (max-width: 640px) { .kc-bottom-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function BriefCard({ brief, index }) {
  const isPublished = brief.status === "published";

  const cardContent = (
    <div
      data-testid={`brief-card-${index}`}
      style={{
        padding: "2rem 0",
        borderTop: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "2rem",
        alignItems: "start",
        opacity: isPublished ? 1 : 0.55,
        cursor: isPublished ? "pointer" : "default",
        transition: "opacity 0.15s",
      }}
      onMouseEnter={e => { if (isPublished) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={e => { if (isPublished) e.currentTarget.style.opacity = "1"; }}
    >
      <div style={{ minWidth: 0 }}>
        {/* Phase tag */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.63rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.625rem",
        }}>{brief.phase}</p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: "-0.01em",
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "0.625rem",
        }}>{brief.title}</h3>

        {/* Who it's for */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: "var(--text-subtle)",
          lineHeight: 1.65,
          marginBottom: "0.5rem",
        }}>{brief.whoFor}</p>

        {/* Outcome line */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          fontStyle: "italic",
          color: "var(--text-muted)",
          lineHeight: 1.65,
          marginBottom: "1rem",
        }}>"{brief.outcome}"</p>

        {/* Read time + status */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "var(--text-subtle)",
            letterSpacing: "0.05em",
          }}>{brief.readTime}</span>
          {!isPublished && (
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              border: "1px solid var(--border)",
              padding: "0.2rem 0.6rem",
            }}>Coming Soon</span>
          )}
        </div>
      </div>

      {/* Arrow (published only) */}
      {isPublished && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.9rem",
          color: "var(--orange)",
          paddingTop: "0.25rem",
          flexShrink: 0,
        }}>→</div>
      )}
    </div>
  );

  if (isPublished) {
    return (
      <a href={brief.slug} style={{ textDecoration: "none", color: "inherit" }}>
        {cardContent}
      </a>
    );
  }
  return cardContent;
}
