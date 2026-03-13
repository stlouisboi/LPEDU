import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const BRIEFS = [
  {
    slug: "/knowledge-center/new-entrant-safety-audit-brief",
    phase: "Ground 0 — New Entrant Program (18-month period)",
    title: "New Entrant Safety Audit: Ground 0 Brief",
    teaser: "Most new carriers think the audit is a paperwork check — FMCSA is really asking whether your safety systems exist at all. This brief shows you what investigators actually request, how they read your records, and the minimum operating rhythm you need to pass without scrambling.",
    outcome: "Walk away with a one-binder audit prep checklist and a map of every automatic-failure condition.",
    readTime: "12-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/hos-compliance-brief",
    phase: "Ground 0 — Hours-of-Service Compliance",
    title: "HOS Compliance Brief: What ELD Records Actually Prove",
    teaser: "Your ELD data is not just hours and locations — it is evidence of how you dispatch, rest, and correct violations. This brief walks through how FMCSA reads your logs, which patterns trigger risk, and the weekly HOS habits that make your logs defensible even when they are not perfect.",
    outcome: "Build a retrievable HOS record system that holds up to audit review.",
    readTime: "12-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/maintenance-records-brief",
    phase: "Compliance Systems — Vehicle & Maintenance",
    title: "Maintenance Records Brief: What Your Unit Files Actually Have to Prove",
    teaser: "Random invoices are not a maintenance system. This brief explains how regulators follow a single truck's history through DVIRs, annual inspections, roadside reports, and repairs — and gives you a unit-file system and a 90-day checklist that tells a believable story to every auditor who asks.",
    outcome: "Build unit files that survive roadside, audits, and post-crash investigations.",
    readTime: "14-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/drug-alcohol-program-brief",
    phase: "Ground 0 — Drug & Alcohol Program",
    title: "Drug & Alcohol Program Installation Brief",
    teaser: "A D&A program is more than a consortium contract and a policy in a binder. This brief shows how auditors and insurers connect your roster, tests, and Clearinghouse activity — and gives you a 90-day plan to close the gap between 'we test' and 'we can prove we kept unsafe drivers out of service.'",
    outcome: "Install a compliant testing program before the first driver dispatch.",
    readTime: "9-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/insurance-continuity-brief",
    phase: "Compliance Systems — Insurance & Authority",
    title: "Insurance Continuity Brief: Staying Active When Rates Move",
    teaser: "New authorities navigating their first renewal cycle or managing post-CSA event premium increases face risks most carriers only discover too late. This brief covers the filing requirements and rate-management controls that keep authority active through the first 24 months.",
    outcome: "Keep authority active and rates manageable through the first renewal cycle.",
    readTime: "14-minute brief",
    status: "published",
  },
  {
    slug: "/knowledge-center/authority-registrations-brief",
    phase: "Ground 0 — Federal Authority Registration (UCR · BOC-3 · MCS-150)",
    title: "Authority Registrations Brief: UCR, BOC-3, and MCS-150 Before Your First Dispatch",
    teaser: "Three separate federal filings. One combined requirement. All of them must be active before the truck moves. This brief walks through what UCR, BOC-3, and MCS-150 actually are, what brokers and enforcement check in SAFER in real time, and the installation checklist to get all three current before dispatch.",
    outcome: "Get all three federal registrations active, verified in SAFER, and documented in your compliance binder before your first load.",
    readTime: "8-minute brief",
    status: "published",
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
            fontSize: "0.728rem",
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
            fontSize: "1.176rem",
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
              ["6", "Briefs in this series"],
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
                  fontSize: "0.84rem",
                  color: "var(--text-subtle)",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUNDLE DOWNLOAD BLOCK ── */}
      <section data-testid="kc-bundle-download" style={{
        background: "var(--bg-2)",
        borderBottom: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{
          maxWidth: 860, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center",
        }} className="bundle-grid">
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.706rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.625rem",
            }}>The Complete Audit Binder Series</p>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "1.2rem",
              letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem",
            }}>All 6 compliance checklists in one printable PDF</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", color: "var(--text-subtle)",
              lineHeight: 1.65,
            }}>New Entrant — HOS — Drug & Alcohol — Maintenance — Insurance — Authority Registrations</p>
          </div>
          <a
            href="/knowledge-center/all-checklists"
            target="_blank" rel="noopener noreferrer"
            data-testid="kc-download-all-btn"
            style={{
              display: "inline-block", background: "var(--orange)", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.896rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 1.75rem", textDecoration: "none", whiteSpace: "nowrap",
              flexShrink: 0, transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--orange-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--orange)"}
          >
            Download All Checklists
          </a>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.84rem",
            color: "var(--text-subtle)",
            marginTop: "0.75rem",
            textAlign: "right",
          }}>
            Found this useful? Forward it to your compliance contact.
          </p>
        </div>
      </section>

      {/* ── BRIEF LIST ── */}
      <section data-testid="kc-brief-list" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.728rem",
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
              fontSize: "0.728rem",
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
              fontSize: "1.008rem",
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
              fontSize: "0.896rem",
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
        @media (max-width: 640px) { .kc-bottom-grid { grid-template-columns: 1fr !important; } .bundle-grid { grid-template-columns: 1fr !important; } }
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
          fontSize: "0.706rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.625rem",
        }}>{brief.phase}</p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "1.232rem",
          letterSpacing: "-0.01em",
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "0.625rem",
        }}>{brief.title}</h3>

        {/* Teaser */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.952rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: "0.875rem",
        }}>{brief.teaser}</p>

        {/* Read time + status */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.762rem",
            color: "var(--text-subtle)",
            letterSpacing: "0.05em",
          }}>{brief.readTime}</span>
          {!isPublished && (
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.762rem",
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
          fontSize: "1.008rem",
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
