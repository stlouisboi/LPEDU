# LaunchPath Transportation EDU — Site Rebuild

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU. Homepage = primary sales/conversion asset. Inner pages = resource hub. Operator Portal = future gated section.

## Architecture
- **Frontend**: React.js (SPA, react-router-dom)
- **Backend**: FastAPI (secure proxy to MailerLite)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Manrope (headings), Inter (body), JetBrains Mono (data/code)

## Visual Enhancement Layer (Option B+C — Mar 2026)
- **Hero**: Animated gold dot-grid background, 5rem+ headline, gold CTA button
- **Philosophical Lines**: Near-black `#060D18` bg + large faded gold quotation mark + gold bordered lines — clearly distinct from all surrounding sections
- **Section bg variety**: 4 distinct dark tones (`#002244`, `#001530`, `#001A33`, `#060D18`) + 3 light sections with `3px gold top border`
- **FourPillars cards**: Hover lift (`translateY(-6px)`) + gold glow box-shadow
- **FailureReality stats**: Count-up animation via IntersectionObserver
- **Navbar**: Gold scroll progress bar at bottom of header
- **ThreePaths**: LaunchPath row has gold left bar accent + deeper bg


| Token | Value | Role |
|---|---|---|
| `--bg-onyx` | `#002244` | Dark section background |
| `--bg-paper` | `#F5F6F7` | Light section background |
| `--gold-primary` / `--gold-brand` | `#C5A059` | Brand gold (CTAs, labels, accents) |
| `--gold-light` | `#D4B87A` | Gold hover state |
| `--navy-deep` | `#001A33` | Footer background |
| `--card-dark` | `#0F1E35` | Card bg in dark sections |
| `--incident-dark-1` | `#0D1929` | Incident report row even |
| `--incident-dark-2` | `#111E30` | Incident report row odd |
| `--pattern-note-bg` | `#1A2A3A` | Pattern note strip |
| `--divider-dark` | `#1E3355` | Borders on dark sections |
| `--divider-light` | `#DDDDDD` | Borders on light sections |
| `--text-paper` | `#1A1A1A` | Body on light bg |
| `--text-paper-heading` | `#002244` | Headings on light bg |
| `--text-paper-muted` | `#666666` | Muted on light bg |
| `--text-muted-dark` | `#CCCCCC` | Muted on dark bg |

**CTA Button Rule:** Gold background (`--gold-primary`) + Navy text (`--bg-onyx`)
**Operator Portal Button:** Navy bg + Gold border + Gold text

## Homepage Section Order (Consolidated — Mar 2026)
1. **Hero** — DARK. "You just got your authority. Now the clock is running." plain-language bridge, gold CTA → "Begin Ground 0"
2. **AuthorityClock** — DARK. 90-day compliance window urgency section
3. **PhilosophyQuoteBlock** — Quote from Vince Lawrence
4. **ConsequenceNumberBlock** — DARK. Consequence stats ($15K–$30K)
5. **AutoMethodTeaser** — DARK. A/U/T/O 4-card risk vector grid
6. **ProtectionDiagram** — DARK. FIGURE LP-01 animated diagram
7. **FourPillars** — DARK. 4 gold-bordered system pillars
8. **EngagementSection** — DARK (#001023). LP-STD-001 | What Working Together Looks Like — 13-week timeline, deliverables, "Begin Ground 0" CTA
9. **AuthorityReadinessTestSection** — DARK. REACH Diagnostic teaser
10. **RecoveryPathBlock** — DARK. Recovery path for Post-Failure Frank
11. **ComplianceMapTeaser** — DARK. Banner strip → /operating-standard
12. **VinceCTA** — LIGHT. Vince Lawrence bio + "Begin Ground 0 Briefing" CTA
13. **Footer**

## Key Copy Rules
- LaunchPath price: **$2,500** (NOT $5,000)
- Vince credentials: "20+ YRS MANUFACTURING MANAGEMENT & LEADERSHIP" — NOT DOT/trucking experience
- "The Standard" is always a proper noun — capitalize everywhere
- Gold = brand color, Orange = removed

## Routing
- `/` → `pages/HomePage.jsx`
- `/knowledge-center` → KC index + 5 articles
- `/about` → `pages/AboutPage.jsx`
- `/contact` → `pages/ContactPage.jsx`
- `/readiness` → `pages/ReadinessPage.jsx` (multi-step diagnostic)
- `/auto-diagnostic` → `pages/AutoDiagnosticPage.jsx`

## Backend API Endpoints
- `POST /api/contact` → MailerLite (lead_source: "contact_form")
- `POST /api/diagnostic` → MailerLite (lead_source: "diagnostic_tool")

## Prioritized Backlog

### P0 — Completed
- [x] Full homepage rebuild (15 sections per Master Brief v2 + Color Correction Brief)
- [x] LaunchPath color system (#002244 navy + #C5A059 gold)
- [x] Price change $5,000 → $2,500 everywhere
- [x] FourPillars restored with gold-bordered cards
- [x] FailureReality section (incident report format)
- [x] PhilosophicalLine components (3 instances)
- [x] WhoNotFor section
- [x] FinalCTA section
- [x] New Navbar (gold Operator Portal button)
- [x] New Footer
- [x] Knowledge Center (5 briefs)
- [x] About + Contact pages
- [x] MailerLite integration (contact + diagnostic)
- [x] Auto-Diagnostic Tool (/readiness + /auto-diagnostic)
- [x] Text brightness pass — `--text-subtle` #a0b0bf → #dde5ec, rgba opacities raised site-wide, Footer greys #999/#666 → #BBB/#AAA, ternary color values fixed in Ground0+Portal (Mar 2026)

### P1 — Next Up
- [x] Build `/ground-0-briefing` page — 6-lesson accordion, email capture, inline confirmation (Mar 2026)
- [x] Build `/portal` page — cohort curriculum sidebar, locked modules, Stripe payment gate (Mar 2026)
- [x] Build `/reach-assessment` — 15-question REACH diagnostic with GO/WAIT/NO-GO scoring and risk map (Mar 2026)
- [x] Build `/auto-method` — AUTO Risk Doctrine page with 4 directions, pillars, guards, philosophy (Mar 2026)
- [x] Build `/operating-standard` — The LaunchPath Operating Standard page (8 sections, institutional framework positioning) + two-zone navbar redesign (Mar 2026)
- [x] Google Auth + server-issued session JWT for Operator Portal access (Mar 2026)
- [x] Homepage refinement polish: 8 copy changes (subhead, stats, labels, microcopy) + Protection Diagram FIGURE LP-01 with IntersectionObserver animation (Mar 2026)
- [x] Knowledge Center cross-linking — "Part of the LaunchPath Operating Standard Library" footer strip on all 5 articles (Mar 2026)

### P2 — Tool Pages
- [x] `/auto-method` — AUTO method explainer page (COMPLETE)

### P3 — Future
- [x] Members-only content gating — Modules 1-7 locked to Stripe-paid users; user_access collection, /api/portal/access + /api/portal/checkout updated to link user_id, green/gold sidebar state (Mar 2026)
- [x] Homepage consolidation — reduced from 10+ sections to 6 (Hero, AuthorityClock, AutoMethodTeaser, FourPillars, ComplianceMapTeaser, VinceCTA) (Feb 2026)
- [x] Post-Failure Frank recovery signals — Hero secondary link, RecoveryPathBlock (after FourPillars), Vince recovery line (Feb 2026)
- [x] Homepage Final Refinements — ConsequenceNumberBlock ($15K-$30K vs $5K), FourPillar heading + "Without it:" lines, bolder Recovery Path two-column layout (Feb 2026)
- [x] /partners B2B landing page — Hero, 3-persona section, How It Works, Trust Band, contact form + POST /api/partners backend endpoint (Feb 2026)
- [x] Mobile UX overhaul (Mar 2026) — Hero padding reduced on ≤640px; REACH pillar grid 2-col on ≤480px; Vince photo max-width 220px + face-centered objectPosition; ProtectionDiagram side arrows hidden on ≤480px; global html/body overflow-x hidden + 44px min tap targets
- [ ] Post-payment confirmation email via MailerLite
- [x] Homepage copy fixes (Mar 2026) — Option B plain-language hero bridge; "The Engagement" section (LP-STD-001) with 13-week timeline; all primary CTAs consolidated to "Begin Ground 0" → /ground-0-briefing
- [x] 6th Knowledge Center article — Authority Registrations Brief (UCR/BOC-3/MCS-150) integrated at /knowledge-center/authority-registrations-brief (Mar 2026)
- [ ] Knowledge Center → Portal contextual cross-links
- [x] Homepage Final Polish — ProtectionDiagramSection (FIGURE LP-01) added to homepage, $5,000 → $2,500 price fix in ConsequenceNumberBlock (Feb 2026)
- [x] REACH Assessment inline widget embedded in Ground 0 G0-6 module panel — full 15-question flow, GO/WAIT/NO-GO result, Risk Map, email capture, and result CTA all inline without page navigation (Feb 2026)
- [x] LPOS v1.0 portal redesign — SYSTEM_STATUS_MONITOR header, IMPLEMENTATION SEQUENCE sidebar, SignalMonitor (circular gauge + 3 indicator bars: Doc Integrity/System Pulse/Regulatory Alignment) injected into Ground 0 dashboard (Feb 2026)
- [x] Live Data Engine for SignalMonitor — GET /api/signal/{carrierId} endpoint with Documentary Integrity/System Pulse/Regulatory Alignment calculation from MongoDB; POST /api/signal/seed/{carrierId} for mock data; SignalMonitor.jsx fetches live data (Feb 2026)
- [x] REACH Diagnostic link unification — all /reach-assessment CTAs updated to /reach-diagnostic (AutoMethodPage, OperatingStandardPage, REACHTeaserSection, HeroSection, Navbar) (Feb 2026)
- [x] Post-payment confirmation email — MailerLite subscriber update triggered in Stripe webhook on payment_status=paid; sets cohort_access, cohort_tier, payment_date fields to drive welcome automation (Feb 2026)
- [x] Submission & Verification Workflow — Standard 10 tasks auto-seeded on carrier first login; PATCH /api/tasks/{taskId}/submit (carrier), /verify (coach), /remediate (coach); TaskItem.jsx with clinical status indicators; task list in portal with optimistic UI + signal refresh; coach-only endpoints return 403 for unauthorized users (Feb 2026)
- [x] Coach Registry — /coach-registry protected page for vince@launchpathedu.com showing cohort signal overview + submission queue with VERIFY/REMEDIATE actions (Feb 2026)
- [x] Price anchoring — all references updated from $2,500 to $5,000 (Stripe checkout, portal CTA, TCOSection, ThreePathsSection) (Feb 2026)
- [x] REACH Diagnostic funnel restructure — Removed full diagnostic UI from homepage; added AuthorityReadinessTestSection; created /reach-diagnostic route; updated headline copy; all internal links unified to /reach-diagnostic (Feb 2026)
- [x] Post-payment confirmation email — MailerLite subscriber update triggered in Stripe webhook on payment_status=paid (Feb 2026)
- [x] Knowledge Center portal cross-links — ArticlePortalBanner added to all 5 briefs; each maps to its Standard Task (DA-001, HOS-001, PM-001, INS-001, DQ-001) with OPEN OPERATOR PORTAL + BEGIN GROUND 0 CTAs (Feb 2026)

- `/app/frontend/src/App.js` — Router (6 KC article routes)
- `/app/frontend/src/index.css` — CSS color token system
- `/app/frontend/src/pages/HomePage.jsx` — Full section assembly (13 sections incl. EngagementSection)
- `/app/frontend/src/components/HeroSection.jsx` — Option B plain-language hero copy + "Begin Ground 0" CTA
- `/app/frontend/src/components/EngagementSection.jsx` — LP-STD-001 | The Engagement (NEW Mar 2026)
- `/app/frontend/src/components/` — All section components
- `/app/frontend/src/pages/KnowledgeCenterIndex.jsx` — 6 briefs listed
- `/app/frontend/src/pages/knowledge-center/UCRRegistrationBrief.jsx` — 6th article (NEW Mar 2026)
- `/app/backend/server.py` — All API endpoints
- `/app/backend/.env` — API keys
