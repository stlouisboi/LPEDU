# LaunchPath Transportation EDU — LPOS v1.0

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU. Homepage = primary sales/conversion asset. Inner pages = resource hub (Operational Library). Operator Portal = future gated section. Primary product: LaunchPath Operating System (LPOS) v1.0 — a premium compliance OS sold to new motor carriers.

## Architecture
- **Frontend**: React.js (SPA, react-router-dom) → Deploy to **Vercel**
- **Backend**: FastAPI (secure proxy) → Deploy to **Railway**
- **Database**: MongoDB → **MongoDB Atlas**
- **Styling**: CSS Variables, inline styles, fluid typography scale
- **Fonts**: Barlow Condensed (headings), Inter (body), JetBrains Mono (data/labels)
- **Color palette**: Deep navy `#0b1628` + Amber gold `#d4900a`

## Deployment Files (Created Feb 2026)
- `frontend/vercel.json` — Vercel build config + SPA rewrites
- `frontend/.nvmrc` — Pins Node.js to v20.20.0
- `frontend/.npmrc` — Disables engine-strict mode
- `backend/Dockerfile` — Railway Docker container
- `backend/.env.example` — Environment variable reference
- `railway.toml` — Railway project config (root level)

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
- [x] Homepage: "How the 90-Day Engagement Works" 3-phase section (DIAGNOSE/BUILD/VERIFY) inserted after ConsequenceNumberBlock (Mar 2026)
- [x] Homepage: Transition sentence between LP-DOCTRINE quote and cost section (Mar 2026)
- [x] REACH per-category gap summary (Mar 2026) — CategoryBreakdown component with 5 scored cards (R/E/A/C/H), pass/warning/critical color coding, feedback templates; result-specific CTAs (GO: Begin G0; WAIT: Begin G0 + Retake + Contact; NO-GO: Review G0 + Contact); "What This Means" section for WAIT/NO-GO showing flagged category names
- [x] REACH Results: Redesigned with colored status banner, score display, and system labels (Mar 2026)
- [x] Portal "Ground 0 Complete" banner (Mar 2026) — persistent banner for authenticated non-paid users, Request Admission + Run REACH CTAs, × dismiss persists via localStorage
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

## Compliance Library Page (Mar 2026)
- [x] `/compliance-library` — 5 entry-level product cards ($17–$97), bundle banner ($197), contextual section, footer disclaimer
- [x] Added "Compliance Library" to main nav between Standards and LaunchPath Standard
- [ ] Wire in 5 Gumroad product slugs when listings go live (all CTAs currently `#`)
- [ ] Wire in bundle Gumroad link ($197)

## Gumroad Product Line URLs (Wired Mar 2026)
- LP-PKT-001 New Entrant: https://launchpathedu.gumroad.com/l/NewEntrantCompliancePacket
- LP-PKT-002 Drug & Alcohol: https://launchpathedu.gumroad.com/l/DrugAlcoholCompliancePacket
- LP-PKT-003 HOS & Dispatch: https://launchpathedu.gumroad.com/l/HOSDispatchCompliancePacket
- LP-PKT-004 Maintenance: https://launchpathedu.gumroad.com/l/Maintenance_UnitFilePacket
- LP-PKT-005 Insurance: https://launchpathedu.gumroad.com/l/Insurance_Authority
- LP-SPEC-001 Bundle: https://launchpathedu.gumroad.com/l/NewCarrierDocumentSystem

## Gumroad Product Line (Feb 2026)
- [x] Standards Library page positioning overhaul (Feb 2026):
  - Headline → "The LaunchPath Operating Standards Library"
  - Label → "LP-SYS-LIBRARY | OPERATING STANDARDS"
  - Guidance sentence above Commercial Ladder
  - Bundle badge: "THE COMPLETE DIY SYSTEM" tier signal in ladder
  - Bundle desc rewrite: "Install the full LaunchPath document architecture in one step..."
  - Quiet line under packets header: "Each packet installs one domain..."
  - Operating standard subtitles on all 5 packets (Part 382, Part 395, Part 396, etc.)
  - Navbar + Footer: "Products" → "Standards Library"
- [x] `/products/new-entrant-packet` — New Entrant Packet ($97) — placeholder copy, awaiting user content
- [x] `/products/drug-alcohol-packet` — Drug & Alcohol Packet ($127) — placeholder copy
- [x] `/products/hos-packet` — HOS & Dispatch Packet ($127) — placeholder copy
- [x] `/products/maintenance-packet` — Maintenance & Unit File Packet ($127) — placeholder copy
- [x] `/products/insurance-packet` — Insurance & Authority Packet ($127) — placeholder copy
- [x] `/products/new-carrier-document-system` — Bundle Page ($497) — full copy + jsPDF implementation guide download
- [x] Navbar + Footer updated with Products link
- [x] jspdf ^4.2.0 installed for client-side PDF generation
- All routes registered in App.js

## Standards Architecture Build (March 2026)
- [x] /products → /standards migration (301 redirects for all 7 URLs)
- [x] FMCSADomainTable.jsx — 7-row audit mapping table, packet badges, showPricing prop
- [x] DoctrineStack.jsx — 5-layer clickable stack (coral/amber/teal/navy/purple)
- [x] StandardsPage.jsx — full upgraded page: FMCSA table + Good Cop/Bad Cop + Doctrine Stack + 3-tier ladder + packet grid + 2-col Bundle vs Standard matrix
- [x] SixteenSinsPage.jsx — /standards/16-deadly-sins — 16 sin cards, coral treatment, all FMCSA citations
- [x] SixteenSinsPage.jsx visual refinement (March 2026) — "At a Glance" 3-col domain-grouped summary, "VIOLATION RECORDS" section label, file-card sin cards ([SIN XX] record IDs, lighter navy surface #0B1927, coral left border, faint archival bg numeral), increased spacing, "CONCLUSION" CTA block
- [x] Navbar: Standards dropdown (Compliance System / Audit Domains / 16 Deadly Sins), Ground 0 dropdown (Enter Ground 0 / REACH Assessment), REACH Assessment + Partners removed from main nav
- [x] Footer: Standards → /standards
- [x] Populate 5 individual packet pages with final copy (New Entrant, Drug & Alcohol, HOS, Maintenance, Insurance — all complete)
- [x] Copy Link button on /standards/16-deadly-sins (data-testid=copy-link-btn) — copies page URL, institutional style, no platform branding
- [x] Copy Link button on /standards Audit Domains section (data-testid=copy-audit-link-btn) — copies /standards#audit-domains URL
- [x] Production backend outage resolved (Mar 16 2026) — MONGO_URL credentials fixed, Railway networking port set to 8080 to match uvicorn startup port, Dockerfile reverted to ${PORT:-8001} for dynamic port binding
- [x] 3D Book Mockup System built (Mar 17 2026) — Three.js 0.183.2, BookMockup3D component with RoomEnvironment reflections, ACES filmic tone mapping, MeshPhysicalMaterial clearcoat, gold metallic bands, canvas textures at 2048px; /product-preview export tool (all 7 products, drag-to-rotate, cover 1280×720 + thumbnail 600×600 export); embedded in all 5 packet pages + bundle page hero
- [x] Knowledge Center → Packet cross-links added ("LP-PKT-00X — Install this system →" on each brief card)
- [x] Packet descriptions updated to "document system" language on /standards page
- [x] Video-Led Lesson Workbench built (Mar 2026):
  - VideoLessonWorkbench.jsx component with react-player, video placeholder, lesson track, supporting resources
  - MODULE_1_DATA: 7 real lessons (1.1–1.7) with titles, descriptions, subtitles, resources for Business & Authority Setup
  - ModuleOverviewCard for modules 2-9: topic list + cohort delivery note + type badges (Recovery/Extension)
  - CURRICULUM updated to 10 modules (Ground 0 + Modules 1-9) with type field (core/recovery/extension)
  - Module 7 = Recovery (optional), Modules 8-9 = Standard Extensions — type-specific sidebar color badges
  - No content gating — all paid users see all modules immediately
  - Sidebar type labels: UNLOCKED / COHORT ACCESS / RECOVERY / EXTENSION

### P0 — Production Portal Fixes (March 2026)
- [x] Moved `EMERGENT_AUTH_URL` to env var (`os.environ.get('EMERGENT_AUTH_URL', ...)`) in server.py
- [x] Added `FRONTEND_URL` env var — replaced hardcoded `https://lpedu.vercel.app/portal` in 2 email templates (verify_task + remediate_task)
- [x] Capped unbounded `.to_list(1000)` queries to `.to_list(100)` in status_checks and signal endpoint
- [x] Updated `.env.example` with `FRONTEND_URL`, `EMERGENT_AUTH_URL`, `MAILERSEND_*` docs
- [x] Welcome email on first login — triggered in `/api/auth/session` when `existing_tasks == 0`; subject "Your authority is active. Now the clock is running."; 3-step onboarding block + Begin Ground 0 CTA; fire-and-forget via MailerSend
- [x] Post-REACH result emails — `_build_reach_email()` helper builds 3 distinct emails (GO/WAIT/NO-GO) with score breakdown table, flagged category list, and tailored CTAs; triggered in `/api/reach` after MailerLite update
- [x] Post-payment onboarding email sequence (3 emails):
  - Email 1 (immediate): Stripe webhook fires "Payment confirmed. You have cohort access." with what's unlocked + Module 1 CTA
  - Email 2 (Day 3): Daily worker checks `granted_at` 3 days ago → "Have you opened Module 1 yet?" with live task progress block
  - Email 3 (Day 14): Daily worker checks `granted_at` 14 days ago → "Two weeks in. Where does your compliance stand?" with Documentary Integrity % + pace status (on-pace green / behind red)
  - Deduplication: `onboarding_day3_sent_at` / `onboarding_day14_sent_at` flags on `user_access` record

- [x] Footer updated: 3-column layout (brand | navigation | contact), Contact section with hello@/support@/payment@launchpathedu.com as mailto links with gold hover
- [x] send_mailersend_email: optional reply_to param added; payment confirmation email uses reply_to=payment@launchpathedu.com
- [x] SUPPORT_EMAIL + PAYMENT_EMAIL env vars added to server.py (default to @launchpathedu.com addresses)
- [x] Split HeroSection.jsx breakpoints: mid-tablet (681–980px) + iPad (981–1100px, separate breakpoint)
- [x] iPad breakpoint: 288px right column preserved, font sizes boosted (label→12px/0.92, sub→13px/0.80, title→15px, domain→14px/0.92)
- [x] Proof strip labels opacity raised: 0.65 → 0.78
- [x] MidPageStatement: [SIN XX] opacity 0.75→0.88, sin desc opacity 0.62→0.76, bottom para 0.55→0.70
- [x] ComplianceMapTeaser: SELF-DIRECTED OPTION opacity 0.72→0.88, body text 0.58→0.72


- [ ] MailerSend sender swap: switch from temp Gmail to noreply@launchpathedu.com (one-line Railway env var change, awaiting domain verification)
- [ ] Add YouTube URL to "Watch the Overview" homepage CTA
- [ ] Stripe live key switch (test → production)
- [ ] Stripe webhook secret on Railway

- `/app/frontend/src/App.js` — Router (6 KC article routes + 7 product routes)
- `/app/frontend/src/index.css` — CSS color token system
- `/app/frontend/src/pages/HomePage.jsx` — Full section assembly (13 sections incl. EngagementSection)
- `/app/frontend/src/components/HeroSection.jsx` — Hero hierarchy refinement (Mar 2026): H1 split two-block, gold bridge line, body line-height 2.0
- `/app/frontend/src/components/EngagementSection.jsx` — LP-STD-001 | The Engagement (NEW Mar 2026)
- `/app/frontend/src/components/` — All section components
- `/app/frontend/src/pages/KnowledgeCenterIndex.jsx` — 6 briefs listed
- `/app/frontend/src/pages/knowledge-center/UCRRegistrationBrief.jsx` — 6th article (NEW Mar 2026)
- `/app/backend/server.py` — All API endpoints
- `/app/backend/.env` — API keys

### PDF Deliverables System (March 2026)
- [x] Storage: Emergent Object Storage via storage_put() / storage_get() helpers in server.py
- [x] Admin endpoints: POST /api/admin/pdfs/upload, GET /api/admin/pdfs, PATCH /api/admin/pdfs/{id}, DELETE /api/admin/pdfs/{id} — coach-only
- [x] Portal endpoints: GET /api/portal/pdfs, GET /api/portal/pdfs/{id}/download — paid users only, streams PDF
- [x] CoachRegistryPage: REGISTRY | DELIVERABLES tab system; upload form + library table with download count + remove button
- [x] PortalPage: DeliverablesPortal renders below curriculum for paid users — gold cards with DOWNLOAD button

### CPM Calculator (March 2026)
- [x] Public: /tools/cpm-calculator — 3 steps, email gate before results, MailerLite tag `lead_source: cpm_calculator`
- [x] Portal: sidebar "Tools" section, 4 steps (+ Step 4 Load Profitability), no gate, saves to MongoDB
- [x] Formulas: fixed_cpm=costs/miles, variable_cpm=fuel+maint+tires, load badges GO/NEGOTIATE/DECLINE
- [x] Backend: POST /api/cpm/email-capture, POST /api/cpm/save, GET /api/cpm/saved
- [x] 17/17 tests passed, math verified


### Ground-0 User Flow Refactor (March 2026)
- [x] REACH Assessment widget moved to TOP of /ground-0-briefing (dark section before accordion)
- [x] Widget auto-navigates to /ground-0-complete?result=GO/WAIT/NO-GO after email submission (1.8s delay)
- [x] Removed redundant email capture form from bottom of /ground-0-briefing
- [x] Removed REACH widget from G0-6 accordion (replaced with directional note)
- [x] /ground-0-complete reads ?result param via useSearchParams — color-coded dynamic header
- [x] /readiness and /reach-assessment both redirect to /reach-diagnostic

### Homepage Hero Refinement (March 2026)
- [x] Fixed architecture inconsistency: DOMAINS array reduced from 6 to 5 (combined "Vehicle Maintenance & Insurance")
- [x] Updated headline: "Your authority is active." + "The first 90 days / determine what survives." (intentional <br/>)
- [x] Removed headline maxWidth constraint — full column width controls line breaks
- [x] Two-paragraph body structure: primary intro paragraph (what LaunchPath is) + secondary context paragraph
- [x] Stats sublabel updated: "Audit coverage" → "Operational coverage"
- [x] Risk card copy: updated description + added "Costs can exceed one preventable build." line
- [x] Standard card copy: updated description + "Costs less than one preventable failure"
- [x] Paragraph maxWidths widened (520/540 → 600/620px) to reduce horizontal dead space
- [x] Mobile headline font size updated in media queries (40px → 36px at <680px)

- [x] Internal links to /readiness updated across NextStepSection, AutoDiagnosticPage, AboutPage


### Image Placements (Feb 2026)
- [x] `hero-letter-dashboard.png` → HeroSection hero background with directional gradient overlay (dark left, reveals image right)
- [x] `hero-boots-asphalt.png` → TruckDividerSection (replaced prior truck image)
- [x] `hero-empty-dock.png` → New dock divider section (HomePage between DoctrineStack and MidPageStatement), overlay text: "Every form. Every policy. Every log. Built to survive a roadside inspection on Day 1."
- [x] `16deadly-sins-panel.png` → MidPageStatement section background (87% dark overlay)
- [x] `lp-std-002-emergency.png` → RecoveryPathBlock section background (93% dark overlay)
- [x] Hero left column tightened: single subheadline sentence, clarifier box (border-left, italic)
- [x] Primary CTA: "INITIATE GROUND 0 →" (amber, all caps, arrow)
- [x] Secondary CTA: "SEE WHAT GETS INSTALLED" (ghost/outline)
- [x] Stats row: 90/Days to Install It, 30+/Forms & Templates, $0/Revenue Day 1 of Revocation, 16/Documented Failure Patterns
- [x] Right column: increased text contrast, LPOS-RISK-ANALYSIS document label
- [x] Operational Library: category filter bar (7 buttons with article counts, live filtering, active state, result count label)
**Phase 1 — SEO Wiring (DONE):**
- [x] `useSEO.js` hook created — sets document title + meta description dynamically
- [x] All 6 existing Operational Library briefs wired with SEO metadata
- [x] `BriefBundleCTA` component added to all 6 briefs

**Phase 2 — New Long-Form Articles (DONE):**
All 8 articles published at `/knowledge-center/*` with full 1,200–1,500 word content, SEO metadata, internal links, Ground 0 CTA, and Related Resources sections:
- [x] Post #1: `FailedAuditPost.jsx` → `/knowledge-center/failed-fmcsa-new-entrant-audit`
- [x] Post #2: `BOC3FilingPost.jsx` → `/knowledge-center/boc-3-filing-explained`
- [x] Post #3: `BoxTruckFMCSAPost.jsx` → `/knowledge-center/box-truck-fmcsa-requirements`
- [x] Post #4: `ClearinghouseSetupPost.jsx` → `/knowledge-center/fmcsa-clearinghouse-setup-guide`
- [x] Post #5: `UCRRegistrationPost.jsx` → `/knowledge-center/ucr-registration-new-carrier`
- [x] Post #6: `InsuranceSyncPost.jsx` → `/knowledge-center/new-carrier-insurance-authority-sync`
- [x] Post #7: `ELDExemptionPost.jsx` → `/knowledge-center/eld-exemption-box-truck`
- [x] Post #8: `NewEntrantProgramPost.jsx` → `/knowledge-center/fmcsa-new-entrant-program-guide`
- [x] `KnowledgeCenterIndex.jsx` updated — 8 published articles listed with cards
- [x] Stats row updated: "8 Published articles"
- [x] All routes registered in `App.js`

### Completed (Mar 2026 — Session continuation)
- [x] Bundle mockup fix — `/mockups` page: `isBundle` products now render as fanned stack of 4 thin Three.js packets (depth 0.07 each, rotated + offset at 4 different Y-rotation angles); single books unchanged
- [x] OperatorQualifierSection — `LP-QFY-001 | OPERATOR QUALIFICATION FILTER`: two-column card block (FOR YOU amber border + 4 arrow items, NOT FOR YOU rust border + 4 ✗ items), reach-diagnostic link, placed immediately after HeroSection on homepage (100% test pass)

### Pending Items (P1)
- [ ] Gumroad product URLs for `/compliance-library` page (5 products + 1 bundle)
- [ ] YouTube URL for homepage "Watch the Overview" CTA
- [ ] Private cohort Gumroad link for portal payment button

### Future / Backlog
- [ ] Build LP-TOOL-002 Load Profitability Analyzer
- [ ] Scaffold Portal Modules 2–9
- [ ] Refactor server.py monolith into APIRouter modules
- [ ] Build Admin Module Editor for the coach
- [x] Homepage restructured to 7-section architecture: Hero → Qualifier → CostOfInaction → WhatGetsInstalled → HowItWorks → CredibilityStrip → FinalCTA (Mar 2026)
- [x] Copy corrections: "You install..." subheadline, stats strip (removed $0 Revenue, added 6 Domains), Phase 2 "You build", Vince "I don't do your compliance", disclaimer in FinalCTA
- [x] 4 new lean homepage sections: CostOfInactionSection, WhatGetsInstalledSimple, HowItWorksSimple, CredibilityStrip
- [x] AuthorityClockSection (with clickable phase links) relocated to /operating-standard page
- [x] /standard → /operating-standard redirect added
- [x] 5 placeholder brief pages created (LP-BRF-07 through LP-BRF-11) — on-brand, "Brief in Preparation" status badge, back link to Operational Library
- [x] FailureAnalysisSection (LP-CASE-001) — added to homepage before REACH Diagnostic; two-column layout: case narrative left, AUTO failure vector + What Standard Installs right (Mar 2026)
