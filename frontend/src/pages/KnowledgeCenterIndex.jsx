import { useState } from "react";
import AnnouncementBar from "../components/home/AnnouncementBar";
import SiteHeader from "../components/home/SiteHeader";
import SiteFooter from "../components/home/SiteFooter";
import LibraryHeroSection from "../components/knowledge-center/LibraryHeroSection";
import LibraryEntryBanner from "../components/knowledge-center/LibraryEntryBanner";
import ChecklistDownloadBanner from "../components/knowledge-center/ChecklistDownloadBanner";
import ArticleFilterBar from "../components/knowledge-center/ArticleFilterBar";
import ArticleGrid from "../components/knowledge-center/ArticleGrid";
import LibraryCTASection from "../components/knowledge-center/LibraryCTASection";
import { Link } from "../compat/Link";

const mono = { fontFamily: 'JetBrains Mono, monospace' };
const serif = { fontFamily: 'Playfair Display, serif' };
const sans = { fontFamily: 'Instrument Sans, sans-serif' };

// ── Article data ────────────────────────────────────────────────────
const POSTS = [
  { slug: "/knowledge-center/how-to-start-a-trucking-company", code: "LP-WEB-001 P4", category: "New Entrant Program", title: "How to Start a Trucking Company Without Getting Shut Down in Year One", teaser: "Most new trucking companies that fail their first FMCSA compliance audit do not fail because they were reckless. They fail because they did not know what the system requires. This guide covers the full startup sequence — from business formation to first dispatch — organized around what FMCSA actually requires, not what the freight industry assumes.", readTime: "~12 min", cfr: "49 CFR Parts 387·391·382·385", badge: "Pillar Guide", isPillar: true },
  { slug: "/knowledge-center/driver-qualification-file-requirements-fmcsa", code: "LP-WEB-001 P1", category: "New Entrant Program", title: "What FMCSA Requires in Every Driver Qualification File", teaser: "A Driver Qualification File is the legally mandated documentation package required for every CDL driver you operate. 49 CFR Part 391 specifies what belongs in the file, when each document must be collected, and how long it must be retained. An incomplete file is treated the same as no file at an FMCSA new entrant audit.", readTime: "~9 min", cfr: "49 CFR Part 391" },
  { slug: "/knowledge-center/new-trucking-authority-first-steps", code: "LP-WEB-001 P2", category: "Authority Registration", title: "You Have Your MC Number. Here Is What Happens Next.", teaser: "Your MC number is active — that means authority is granted, not that you can move a load. Before the first dispatch, federal law requires insurance to be filed and active in SAFER, a drug and alcohol testing program to be in place, and a complete Driver Qualification File for every driver. Here is the pre-operation compliance sequence most carriers skip.", readTime: "~9 min", cfr: "49 CFR Parts 387, 391, 382" },
  { slug: "/knowledge-center/fmcsa-safety-rating-explained", code: "LP-WEB-001 P3", category: "New Entrant Program", title: "What Your FMCSA Safety Rating Means and How It Gets Assigned", teaser: "FMCSA assigns one of three safety ratings: Satisfactory, Conditional, or Unsatisfactory. Each reflects what auditors found — not your driving record or accident count. A Conditional rating is visible in SAFER immediately and can affect broker relationships, insurance premiums, and your ability to continue hauling freight within 45 days.", readTime: "~8 min", cfr: "49 CFR Part 385" },
  { slug: "/knowledge-center/corrective-action-plan-fmcsa", code: "LP-WEB-001 P5", category: "New Entrant Program", title: "What a Corrective Action Plan Is and How to Build One After an FMCSA Audit", teaser: "When FMCSA finds deficiencies in a new entrant safety audit, the carrier has 45 calendar days to submit a Corrective Action Plan documenting what was missing, why, and what corrective action has been taken. Miss the window and the outcome escalates automatically to Unsatisfactory — initiating authority revocation proceedings within 60 days.", readTime: "~9 min", cfr: "49 CFR Part 385" },
  { slug: "/knowledge-center/new-entrant-safety-audit-checklist", code: "LP-WEB-001 P6", category: "New Entrant Program", title: "What FMCSA Checks in a New Entrant Safety Audit", teaser: "Every new interstate motor carrier receives a mandatory safety audit within 12 months of receiving operating authority. FMCSA reviews six compliance areas. In each area, auditors look for specific documents — a missing document is a documented deficiency. This page covers exactly what FMCSA reviews and what you must have ready before the auditor arrives.", readTime: "~10 min", cfr: "49 CFR Parts 391·382·395·396·387·385" },
  { slug: "/knowledge-center/dot-drug-alcohol-program-requirements", code: "LP-WEB-001 P7", category: "Drug & Alcohol Program", title: "What FMCSA Requires for Your DOT Drug and Alcohol Program", teaser: "49 CFR Part 382 requires every motor carrier employing CDL drivers to have a drug and alcohol testing program in place before the first driver operates. Not within 30 days — before dispatch. This page covers the six types of required testing, consortium enrollment, FMCSA Clearinghouse registration, and the documentation that survives an audit.", readTime: "~9 min", cfr: "49 CFR Part 382" },
  { slug: "/knowledge-center/failed-fmcsa-new-entrant-audit", code: "LP-BRF-POST-01", category: "New Entrant Program", title: "What Actually Happens When You Fail an FMCSA New Entrant Audit", teaser: "The FMCSA New Entrant Audit doesn't result in a pass or fail — it results in a rating. A Conditional rating triggers an insurance cascade, broker relationship damage, and a 45-day correction window most carriers aren't ready for.", readTime: "~9 min", cfr: "49 CFR Part 385" },
  { slug: "/knowledge-center/boc-3-filing-explained", code: "LP-BRF-POST-02", category: "Authority Registration", title: "The BOC-3 Filing: What It Is, What Happens If It Lapses, and How to Verify Yours", teaser: "The BOC-3 is one of three foundational filings required before FMCSA grants operating authority. A lapsed filing can suspend your authority without notification to the carrier. Here's what it is and how to verify yours in under five minutes.", readTime: "~7 min", cfr: "49 CFR Part 366" },
  { slug: "/knowledge-center/box-truck-fmcsa-requirements", code: "LP-BRF-POST-03", category: "Vehicle & Operations", title: "Box Truck FMCSA Requirements: The 26,001 lb Line and What It Changes", teaser: "The 26,001 lb GVWR threshold changes your CDL requirements, ELD applicability, medical certification obligations, and driver qualification file structure. Understanding where you fall determines your full regulatory profile before the first dispatch.", readTime: "~9 min", cfr: "49 CFR Part 390" },
  { slug: "/knowledge-center/fmcsa-clearinghouse-setup-guide", code: "LP-BRF-POST-04", category: "Drug & Alcohol Program", title: "How to Register in the FMCSA Drug and Alcohol Clearinghouse: A Step-by-Step Guide for New Carriers", teaser: "Clearinghouse registration, pre-employment query requirements, and annual query obligations under 49 CFR Part 382. Every step a new carrier must complete before a CDL driver turns a key — including what happens when the query is skipped.", readTime: "~10 min", cfr: "49 CFR Part 382" },
  { slug: "/knowledge-center/ucr-registration-new-carrier", code: "LP-BRF-POST-05", category: "Authority Registration", title: "UCR Registration for New Motor Carriers: Who Owes It, When It's Due, and What Happens If You Skip It", teaser: "The Unified Carrier Registration is a separate annual filing from your MC authority — not part of the FMCSA application process. Operating without it creates roadside enforcement exposure that far exceeds the cost of the registration itself.", readTime: "~7 min", cfr: "49 USC 14504a" },
  { slug: "/knowledge-center/new-carrier-insurance-authority-sync", code: "LP-BRF-POST-06", category: "Insurance Continuity", title: "The Insurance Sync Problem: Why New Carriers Lose Authority Before They Ever Run a Load", teaser: "Insurance isn't a one-time purchase — it's a continuous filing that can lapse at any point, and when it lapses, authority suspension follows automatically. This article explains the BMC-91 filing mechanics, the lapse trigger, and the operational decisions that put coverage at risk.", readTime: "~8 min", cfr: "49 CFR Part 387" },
  { slug: "/knowledge-center/eld-exemption-box-truck", code: "LP-BRF-POST-07", category: "Hours of Service", title: "ELD Exemptions for Box Truck Operators: What's Covered and What Isn't", teaser: "The short-haul exemption eliminates the ELD requirement for qualifying box truck operators — but it doesn't eliminate HOS rules or recordkeeping obligations. Here's exactly what the exemption covers and when a single shift can eliminate it.", readTime: "~8 min", cfr: "49 CFR Part 395" },
  { slug: "/knowledge-center/fmcsa-new-entrant-program-guide", code: "LP-BRF-POST-08", category: "New Entrant Program", title: "The FMCSA New Entrant Program: A Plain-Language Guide to Your First 12 Months", teaser: "Every new motor carrier enters the New Entrant Program the day authority activates. This guide covers the SMS monitoring period, the mandatory audit timeline, all three possible outcomes, and what the Four Pillars look like inside the 12-month window.", readTime: "~11 min", cfr: "49 CFR Part 385" },
  { slug: "/knowledge-center/dot-drug-alcohol-program-setup", code: "LP-BRF-POST-09", category: "Drug & Alcohol Program", title: "How to Set Up Your DOT Drug and Alcohol Testing Program Before Day 1", teaser: "The program must exist before the first driver operates — not within 30 days, not once dispatch begins. This step-by-step guide walks through consortium enrollment, FMCSA Clearinghouse registration, pre-employment testing, DER designation, supervisor training, and post-accident protocol in the order they must be completed.", readTime: "~11 min", cfr: "49 CFR Part 382 · Part 40" },
  { slug: "/knowledge-center/fmcsa-roadside-inspection-checklist", code: "LP-BRF-POST-10", category: "Vehicle & Operations", title: "FMCSA Roadside Inspection: What Inspectors Check and What to Have Ready", teaser: "Roadside inspections are the enforcement mechanism that operates between formal audits. A single violation generates CSA severity points that accumulate in your BASIC scores — and high BASIC scores can trigger a compliance review faster than your scheduled new entrant audit. This page covers every document required in the cab and every vehicle system inspectors examine.", readTime: "~10 min", cfr: "49 CFR Parts 391 · 393 · 395 · 396" },
  { slug: "/knowledge-center/hours-of-service-violations-fmcsa-audit", code: "LP-BRF-POST-11", category: "Hours of Service", title: "Hours of Service Violations That Generate CSA Points and Trigger FMCSA Intervention", teaser: "HOS violations are the most frequently cited violation type in FMCSA roadside inspections. This page covers the specific violation types, their CSA severity weights (1–10), how the HOS Compliance BASIC score triggers intervention, and the dispatch and documentation practices that prevent violations.", readTime: "~9 min", cfr: "49 CFR Part 395" },
  { slug: "/knowledge-center/conditional-safety-rating-fmcsa", code: "LP-BRF-POST-12", category: "New Entrant Program", title: "What a Conditional Safety Rating Means for Your Motor Carrier Authority", teaser: "A Conditional safety rating is not a failed audit — it is FMCSA's determination that your safety management controls are inadequate in at least one area. The rating does not revoke your authority, but it is publicly visible, affects insurance, and starts a correction clock. This page covers the three-rating system, the 45-day window, CAP structure, insurance consequences, and the upgrade process.", readTime: "~10 min", cfr: "49 CFR Part 385" },
];

const BRIEFS_90DAY = [
  { slug: "/knowledge-center/first-dispatch-requirements", phase: "Day 1 — Authority Activation", title: "LP-BRF-07: What Must Be Operational Before Your First Dispatch", teaser: "An MC number is not a go signal. Before the first truck moves, three federal filings must be confirmed active, a D&A program must be in place, and driver qualification files must be complete.", readTime: "11-minute brief", status: "published" },
  { slug: "/knowledge-center/new-carrier-90-day-build", phase: "Days 1–30 — Installation Window", title: "LP-BRF-08: The Documentation Architecture of the Installation Window", teaser: "The first 30 days are not a warm-up period. They are the architectural window in which your compliance systems either get built or fail to exist.", readTime: "11-minute brief", status: "published" },
  { slug: "/knowledge-center/operating-patterns-compliance-risks", phase: "Days 30–60 — Pattern Formation", title: "LP-BRF-09: How Operating Patterns Become Audit Evidence", teaser: "By Day 60, your logs, DVIRs, dispatch records, and D&A testing activity have formed a pattern. Investigators don't read individual documents — they read patterns.", readTime: "12-minute brief", status: "published" },
  { slug: "/knowledge-center/fmcsa-audit-preparation-records", phase: "Days 60–90 — Audit Exposure Window", title: "LP-BRF-10: Preparation vs. Reconstruction: What Investigators See", teaser: "There is a difference between a carrier that built its systems and one attempting to reconstruct them under scrutiny.", readTime: "12-minute brief", status: "published" },
  { slug: "/knowledge-center/fmcsa-new-entrant-review", phase: "Months 9–18 — New Entrant Review Period", title: "LP-BRF-11: The New Entrant Review Period and What Triggers Scrutiny", teaser: "The FMCSA New Entrant Safety Assurance Program examines every new carrier in the 12-month window after authority activates.", readTime: "13-minute brief", status: "published" },
];

const BRIEFS = [
  { slug: "/case-studies", domain: "New Entrant Program", phase: "Pattern Library — LP-DOC-005", title: "Case Studies: How New Authorities End", teaser: "Five anonymized FMCSA enforcement outcomes. Each case shows the carrier type, day of authority, what happened, what was missing, and the final outcome.", readTime: "5-minute reference", status: "published", packetHref: null, packetCode: null },
  { slug: "/conditional-rating", domain: "New Entrant Program", phase: "Compliance Response — LP-DOC-006", title: "Conditional Safety Rating: What It Means and How to Upgrade", teaser: "A Conditional rating is not a death sentence — it is a 45-day compliance clock. This guide covers what Conditional means in the FMCSA framework, how it differs from Satisfactory and Unsatisfactory, the five-step corrective action sequence, and when to handle it yourself versus when to bring in outside help.", readTime: "9-minute guide", status: "published", packetHref: null, packetCode: null },
  { slug: "/knowledge-center/new-entrant-safety-audit-brief", domain: "New Entrant Program", phase: "Ground 0 — New Entrant Program (18-month period)", title: "New Entrant Safety Audit: Ground 0 Brief", teaser: "Most new carriers think the audit is a paperwork check — FMCSA is really asking whether your safety systems exist at all.", readTime: "12-minute brief", status: "published", packetHref: "/standards/new-entrant-packet", packetCode: "LP-PKT-001" },
  { slug: "/knowledge-center/hos-compliance-brief", domain: "Hours of Service", phase: "Ground 0 — Hours-of-Service Compliance", title: "HOS Compliance Brief: What ELD Records Actually Prove", teaser: "Your ELD data is not just hours and locations — it is evidence of how you dispatch, rest, and correct violations.", readTime: "12-minute brief", status: "published", packetHref: "/standards/hos-packet", packetCode: "LP-PKT-003" },
  { slug: "/knowledge-center/maintenance-records-brief", domain: "Vehicle & Operations", phase: "Compliance Systems — Vehicle & Maintenance", title: "Maintenance Records Brief: What Your Unit Files Actually Have to Prove", teaser: "Random invoices are not a maintenance system. This brief explains how regulators follow a single truck's history through DVIRs, annual inspections, roadside reports, and repairs.", readTime: "14-minute brief", status: "published", packetHref: "/standards/maintenance-packet", packetCode: "LP-PKT-004" },
  { slug: "/knowledge-center/drug-alcohol-program-brief", domain: "Drug & Alcohol Program", phase: "Ground 0 — Drug & Alcohol Program", title: "Drug & Alcohol Program Installation Brief", teaser: "A D&A program is more than a consortium contract and a policy in a binder. This brief shows how auditors and insurers connect your roster, tests, and Clearinghouse activity.", readTime: "9-minute brief", status: "published", packetHref: "/standards/drug-alcohol-packet", packetCode: "LP-PKT-002" },
  { slug: "/knowledge-center/insurance-continuity-brief", domain: "Insurance Continuity", phase: "Compliance Systems — Insurance & Authority", title: "Insurance Continuity Brief: Staying Active When Rates Move", teaser: "New authorities navigating their first renewal cycle or managing post-CSA event premium increases face risks most carriers only discover too late.", readTime: "14-minute brief", status: "published", packetHref: "/standards/insurance-packet", packetCode: "LP-PKT-005" },
  { slug: "/knowledge-center/authority-registrations-brief", domain: "Authority Registration", phase: "Ground 0 — Federal Authority Registration (UCR · BOC-3 · MCS-150)", title: "Authority Registrations Brief: UCR, BOC-3, and MCS-150 Before Your First Dispatch", teaser: "Three separate federal filings. One combined requirement. All of them must be active before the truck moves.", readTime: "8-minute brief", status: "published", packetHref: "/standards/new-entrant-packet", packetCode: "LP-PKT-001" },
];

// ── Brief Card ──────────────────────────────────────────────────────
function BriefCard({ brief, index }) {
  const isPublished = brief.status === "published";
  const inner = (
    <div
      data-testid={`brief-card-${index}`}
      style={{ padding: '1.75rem 0', borderTop: '1px solid rgba(28,43,58,0.1)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start', opacity: isPublished ? 1 : 0.45, cursor: isPublished ? 'pointer' : 'default', transition: 'opacity 0.15s' }}
      onMouseEnter={e => { if (isPublished) e.currentTarget.style.opacity = '0.8'; }}
      onMouseLeave={e => { if (isPublished) e.currentTarget.style.opacity = '1'; }}
    >
      <div>
        <p style={{ ...mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>
          {brief.phase || brief.domain}
        </p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: '1.1rem', color: '#1C2B3A', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '0.625rem' }}>
          {brief.title}
        </h2>
        <p style={{ ...sans, fontSize: '0.9rem', color: 'rgba(45,55,72,0.65)', lineHeight: 1.75, marginBottom: '0.75rem' }}>{brief.teaser}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {isPublished && (
            <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.2)', padding: '0.2rem 0.5rem' }}>
              {brief.readTime}
            </span>
          )}
          {!isPublished && (
            <span style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', border: '1px solid rgba(28,43,58,0.15)', padding: '0.2rem 0.5rem' }}>Coming Soon</span>
          )}
          {isPublished && brief.packetHref && (
            <a href={brief.packetHref} onClick={e => e.stopPropagation()} style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8A96E', textDecoration: 'none', borderBottom: '1px solid rgba(139,115,85,0.3)', paddingBottom: 1 }}>
              {brief.packetCode} — Install this system →
            </a>
          )}
        </div>
      </div>
      {isPublished && (
        <span style={{ ...mono, fontSize: '1rem', color: '#C8A96E', paddingTop: 4, flexShrink: 0 }}>→</span>
      )}
    </div>
  );

  return isPublished ? (
    <a href={brief.slug} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
  ) : inner;
}

// ── 90-Day Timeline ─────────────────────────────────────────────────
function TimelineCard({ brief, index }) {
  const isPublished = brief.status === "published";
  return (
    <a href={isPublished ? brief.slug : '#'} style={{ textDecoration: 'none', display: 'block', opacity: isPublished ? 1 : 0.45 }}>
      <div data-testid={`series-card-${index}`} style={{ border: '1px solid rgba(28,43,58,0.1)', padding: '1.75rem', background: '#FAF8F4', transition: 'background 0.2s, border-color 0.2s' }}
        onMouseEnter={e => { if (isPublished) { e.currentTarget.style.background = '#F5F2EC'; e.currentTarget.style.borderColor = 'rgba(139,115,85,0.35)'; } }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FAF8F4'; e.currentTarget.style.borderColor = 'rgba(28,43,58,0.1)'; }}
      >
        <p style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.625rem', fontWeight: 700 }}>{brief.phase}</p>
        <h2 style={{ ...serif, fontWeight: 700, fontSize: '1.05rem', color: '#1C2B3A', lineHeight: 1.3, marginBottom: '0.625rem' }}>{brief.title}</h2>
        <p style={{ ...sans, fontSize: '0.875rem', color: 'rgba(28,43,58,0.72)', lineHeight: 1.75, marginBottom: '0.75rem' }}>{brief.teaser}</p>
        <span style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', background: 'rgba(139,115,85,0.08)', color: '#C8A96E', border: '1px solid rgba(139,115,85,0.2)', padding: '0.2rem 0.5rem', fontWeight: 600 }}>{brief.readTime}</span>
      </div>
    </a>
  );
}

// ── Main component ──────────────────────────────────────────────────
export default function KnowledgeCenterIndex() {
  const [activeTab, setActiveTab] = useState("articles");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="lp-home" style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <AnnouncementBar />
      <SiteHeader activePath="/knowledge-center" />

      <LibraryHeroSection />
      <LibraryEntryBanner />
      <ChecklistDownloadBanner />

      <ArticleFilterBar
        activeTab={activeTab}
        activeCategory={activeCategory}
        articleCount={filteredPosts.length}
        onTabChange={(tab) => { setActiveTab(tab); setActiveCategory("All"); }}
        onCategoryChange={setActiveCategory}
      />

      {/* ── Articles tab ── */}
      {activeTab === "articles" && (
        <ArticleGrid articles={filteredPosts} activeCategory={activeCategory} />
      )}

      {/* ── Briefs tab ── */}
      {activeTab === "briefs" && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ ...mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>8 BRIEFS PUBLISHED</p>
          </div>
          {BRIEFS.map((brief, i) => (
            <BriefCard key={brief.slug} brief={brief} index={i} />
          ))}
        </div>
      )}

      {/* ── 90-Day Series tab ── */}
      {activeTab === "series" && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ ...mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A96E', marginBottom: '0.5rem' }}>LP-BRF-07 through LP-BRF-11</p>
            <h2 style={{ ...serif, fontWeight: 700, fontSize: '1.5rem', color: '#1C2B3A', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>The 90-Day Compliance Series</h2>
            <p style={{ ...sans, fontSize: '0.95rem', color: 'rgba(45,55,72,0.6)', maxWidth: 560, lineHeight: 1.75 }}>
              Five briefs that follow the operational lifecycle of a new motor carrier from Day 1 authority activation through the 18-month New Entrant review period.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(28,43,58,0.1)', border: '1px solid rgba(28,43,58,0.1)' }} className="lp-two-col">
            {BRIEFS_90DAY.map((brief, i) => (
              <TimelineCard key={brief.slug} brief={brief} index={i} />
            ))}
          </div>
        </div>
      )}

      <LibraryCTASection />
      <SiteFooter />
    </div>
  );
}
