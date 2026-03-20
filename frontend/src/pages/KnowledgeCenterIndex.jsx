import { useState } from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const POSTS = [
  {
    slug: "/knowledge-center/failed-fmcsa-new-entrant-audit",
    code: "LP-BRF-POST-01",
    category: "New Entrant Program",
    title: "What Actually Happens When You Fail an FMCSA New Entrant Audit",
    teaser: "The FMCSA New Entrant Audit doesn't result in a pass or fail — it results in a rating. A Conditional rating triggers an insurance cascade, broker relationship damage, and a 45-day correction window most carriers aren't ready for.",
    readTime: "~9 min",
    cfr: "49 CFR Part 385",
  },
  {
    slug: "/knowledge-center/boc-3-filing-explained",
    code: "LP-BRF-POST-02",
    category: "Authority Registration",
    title: "The BOC-3 Filing: What It Is, What Happens If It Lapses, and How to Verify Yours",
    teaser: "The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notification to the carrier. Here's what it is and how to verify yours in under five minutes.",
    readTime: "~7 min",
    cfr: "49 CFR Part 366",
  },
  {
    slug: "/knowledge-center/box-truck-fmcsa-requirements",
    code: "LP-BRF-POST-03",
    category: "Vehicle & Operations",
    title: "Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes",
    teaser: "The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, medical certification obligations, and driver qualification file structure. Understanding where you fall determines your full regulatory profile before the first dispatch.",
    readTime: "~9 min",
    cfr: "49 CFR Part 390",
  },
  {
    slug: "/knowledge-center/fmcsa-clearinghouse-setup-guide",
    code: "LP-BRF-POST-04",
    category: "Drug & Alcohol Program",
    title: "How to Register in the FMCSA Drug and Alcohol Clearinghouse: A Step-by-Step Guide for New Carriers",
    teaser: "Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. Every step a new carrier must complete before a CDL driver turns a key — including what happens when the query is skipped.",
    readTime: "~10 min",
    cfr: "49 CFR Part 382",
  },
  {
    slug: "/knowledge-center/ucr-registration-new-carrier",
    code: "LP-BRF-POST-05",
    category: "Authority Registration",
    title: "UCR Registration for New Motor Carriers: Who Owes It, When It's Due, and What Happens If You Skip It",
    teaser: "The Unified Carrier Registration is a separate annual filing from your MC authority — not part of the FMCSA application process. Operating without it creates roadside enforcement exposure that far exceeds the cost of the registration itself.",
    readTime: "~7 min",
    cfr: "49 USC 14504a",
  },
  {
    slug: "/knowledge-center/new-carrier-insurance-authority-sync",
    code: "LP-BRF-POST-06",
    category: "Insurance Continuity",
    title: "The Insurance Sync Problem: Why New Carriers Lose Authority Before They Ever Run a Load",
    teaser: "Insurance isn't a one-time purchase — it's a continuous filing that can lapse at any point, and when it lapses, authority suspension follows automatically. This article explains the BMC-91 filing mechanics, the lapse trigger, and the operational decisions that put coverage at risk.",
    readTime: "~8 min",
    cfr: "49 CFR Part 387",
  },
  {
    slug: "/knowledge-center/eld-exemption-box-truck",
    code: "LP-BRF-POST-07",
    category: "Hours of Service",
    title: "ELD Exemptions for Box Truck Operators: What's Covered and What Isn't",
    teaser: "The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping obligations. Here's exactly what the exemption covers and when a single shift can eliminate it.",
    readTime: "~8 min",
    cfr: "49 CFR Part 395",
  },
  {
    slug: "/knowledge-center/fmcsa-new-entrant-program-guide",
    code: "LP-BRF-POST-08",
    category: "New Entrant Program",
    title: "The FMCSA New Entrant Program: A Plain-Language Guide to Your First 12 Months",
    teaser: "Every new motor carrier enters the New Entrant Program the day authority activates. This guide covers the SMS monitoring period, the mandatory audit timeline, all three possible outcomes, and what the Four Pillars look like inside the 12-month window.",
    readTime: "~11 min",
    cfr: "49 CFR Part 385",
  },
];

const BRIEFS = [
  {
    slug: "/knowledge-center/new-entrant-safety-audit-brief",
    phase: "Ground 0 — New Entrant Program (18-month period)",
    title: "New Entrant Safety Audit: Ground 0 Brief",
    teaser: "Most new carriers think the audit is a paperwork check — FMCSA is really asking whether your safety systems exist at all. This brief shows you what investigators actually request, how they read your records, and the minimum operating rhythm you need to pass without scrambling.",
    outcome: "Walk away with a one-binder audit prep checklist and a map of every automatic-failure condition.",
    readTime: "12-minute brief",
    status: "published",
    packetHref: "/standards/new-entrant-packet",
    packetCode: "LP-PKT-001",
  },
  {
    slug: "/knowledge-center/hos-compliance-brief",
    phase: "Ground 0 — Hours-of-Service Compliance",
    title: "HOS Compliance Brief: What ELD Records Actually Prove",
    teaser: "Your ELD data is not just hours and locations — it is evidence of how you dispatch, rest, and correct violations. This brief walks through how FMCSA reads your logs, which patterns trigger risk, and the weekly HOS habits that make your logs defensible even when they are not perfect.",
    outcome: "Build a retrievable HOS record system that holds up to audit review.",
    readTime: "12-minute brief",
    status: "published",
    packetHref: "/standards/hos-packet",
    packetCode: "LP-PKT-003",
  },
  {
    slug: "/knowledge-center/maintenance-records-brief",
    phase: "Compliance Systems — Vehicle & Maintenance",
    title: "Maintenance Records Brief: What Your Unit Files Actually Have to Prove",
    teaser: "Random invoices are not a maintenance system. This brief explains how regulators follow a single truck's history through DVIRs, annual inspections, roadside reports, and repairs — and gives you a unit-file system and a 90-day checklist that tells a believable story to every auditor who asks.",
    outcome: "Build unit files that survive roadside, audits, and post-crash investigations.",
    readTime: "14-minute brief",
    status: "published",
    packetHref: "/standards/maintenance-packet",
    packetCode: "LP-PKT-004",
  },
  {
    slug: "/knowledge-center/drug-alcohol-program-brief",
    phase: "Ground 0 — Drug & Alcohol Program",
    title: "Drug & Alcohol Program Installation Brief",
    teaser: "A D&A program is more than a consortium contract and a policy in a binder. This brief shows how auditors and insurers connect your roster, tests, and Clearinghouse activity — and gives you a 90-day plan to close the gap between 'we test' and 'we can prove we kept unsafe drivers out of service.'",
    outcome: "Install a compliant testing program before the first driver dispatch.",
    readTime: "9-minute brief",
    status: "published",
    packetHref: "/standards/drug-alcohol-packet",
    packetCode: "LP-PKT-002",
  },
  {
    slug: "/knowledge-center/insurance-continuity-brief",
    phase: "Compliance Systems — Insurance & Authority",
    title: "Insurance Continuity Brief: Staying Active When Rates Move",
    teaser: "New authorities navigating their first renewal cycle or managing post-CSA event premium increases face risks most carriers only discover too late. This brief covers the filing requirements and rate-management controls that keep authority active through the first 24 months.",
    outcome: "Keep authority active and rates manageable through the first renewal cycle.",
    readTime: "14-minute brief",
    status: "published",
    packetHref: "/standards/insurance-packet",
    packetCode: "LP-PKT-005",
  },
  {
    slug: "/knowledge-center/authority-registrations-brief",
    phase: "Ground 0 — Federal Authority Registration (UCR · BOC-3 · MCS-150)",
    title: "Authority Registrations Brief: UCR, BOC-3, and MCS-150 Before Your First Dispatch",
    teaser: "Three separate federal filings. One combined requirement. All of them must be active before the truck moves. This brief walks through what UCR, BOC-3, and MCS-150 actually are, what brokers and enforcement check in SAFER in real time, and the installation checklist to get all three current before dispatch.",
    outcome: "Get all three federal registrations active, verified in SAFER, and documented in your compliance binder before your first load.",
    readTime: "8-minute brief",
    status: "published",
    packetHref: "/standards/new-entrant-packet",
    packetCode: "LP-PKT-001",
  },
];

const CATEGORIES = ["All", "New Entrant Program", "Authority Registration", "Insurance Continuity", "Drug & Alcohol Program", "Vehicle & Operations", "Hours of Service"];

export default function KnowledgeCenterIndex() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPosts = activeCategory === "All" ? POSTS : POSTS.filter(p => p.category === activeCategory);
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
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-subtle)",
            marginBottom: "1.5rem",
          }}>LaunchPath / Operational Library</p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "1.5rem",
          }}>Operational Library</h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.2rem",
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
              ["8", "Published articles"],
              ["49 CFR", "Primary regulation source"],
            ].map(([val, label]) => (
              <div key={val}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.3rem",
                }}>{val}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.857rem",
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
              fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "0.625rem",
            }}>The Complete Audit Binder Series</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem",
              letterSpacing: "-0.015em", color: "var(--text)", marginBottom: "0.5rem",
            }}>All 6 compliance checklists in one printable PDF</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--text-subtle)",
              lineHeight: 1.65,
            }}>New Entrant — HOS — Drug & Alcohol — Maintenance — Insurance — Authority Registrations</p>
          </div>
          <a
            href="/knowledge-center/all-checklists"
            target="_blank" rel="noopener noreferrer"
            data-testid="kc-download-all-btn"
            style={{
              display: "inline-block", background: "var(--orange)", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "var(--text-sm)",
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
            fontSize: "0.857rem",
            color: "var(--text-subtle)",
            marginTop: "0.75rem",
            textAlign: "right",
          }}>
            Found this useful? Forward it to your compliance contact.
          </p>
        </div>
      </section>

      {/* ── PUBLISHED ARTICLES ── */}
      <section style={{ padding: "0 1.5rem 4rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Section header + filter bar */}
          <div style={{ paddingTop: "3rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(212,144,10,0.15)", paddingBottom: "1.25rem" }}>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4900a",
              marginBottom: "1.25rem",
            }}>Published Articles</p>

            {/* Category filter */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.762rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.45rem 0.85rem",
                      background: isActive ? "#d4900a" : "transparent",
                      color: isActive ? "#0b1628" : "rgba(255,255,255,0.45)",
                      border: isActive ? "1px solid #d4900a" : "1px solid rgba(255,255,255,0.14)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      lineHeight: 1,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = "rgba(212,144,10,0.85)";
                        e.currentTarget.style.borderColor = "rgba(212,144,10,0.40)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                      }
                    }}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span style={{ marginLeft: "0.4rem", opacity: 0.60 }}>
                        {POSTS.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result count */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.714rem", letterSpacing: "0.10em", color: "rgba(255,255,255,0.25)", marginTop: "0.75rem", textTransform: "uppercase" }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}{activeCategory !== "All" ? ` — ${activeCategory}` : ""}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {filteredPosts.map((post, i) => (
              <a key={i} href={post.slug} style={{ display: "block", textDecoration: "none",
                background: "#080f1e", padding: "1.5rem 2rem",
                borderLeft: "3px solid #d4900a", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#0d1a2f"}
                onMouseLeave={e => e.currentTarget.style.background = "#080f1e"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d4900a" }}>{post.code}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)" }}>{post.category}</span>
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", color: "#FFFFFF", lineHeight: 1.25, marginBottom: "0.5rem" }}>{post.title}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.857rem", color: "rgba(255,255,255,0.50)", lineHeight: 1.65 }}>{post.teaser}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: "0.3rem" }}>{post.readTime}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.762rem", letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(212,144,10,0.50)" }}>{post.cfr}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIEF LIST ── */}
      <section data-testid="kc-brief-list" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.762rem",
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
              fontSize: "0.762rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              marginBottom: "0.75rem",
            }}>Not sure where to start?</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              letterSpacing: "-0.015em",
              color: "var(--text)",
              marginBottom: "0.75rem",
            }}>Run the FREE readiness diagnostic first.</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
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
              fontSize: "var(--text-sm)",
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
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.762rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.625rem",
        }}>{brief.phase}</p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.2rem",
          letterSpacing: "-0.01em",
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "0.625rem",
        }}>{brief.title}</h3>

        {/* Teaser */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: "0.875rem",
        }}>{brief.teaser}</p>

        {/* Read time + status */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
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

        {/* Packet cross-link */}
        {isPublished && brief.packetHref && (
          <div style={{ marginTop: "0.875rem" }}>
            <a
              href={brief.packetHref}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.762rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#d4900a",
                textDecoration: "none",
                borderBottom: "1px solid rgba(212,144,10,0.3)",
                paddingBottom: "1px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.8)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(212,144,10,0.3)"}
            >
              {brief.packetCode} — Install this system →
            </a>
          </div>
        )}
      </div>

      {/* Arrow (published only) */}
      {isPublished && (
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
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
