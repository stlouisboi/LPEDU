# LaunchPath Transportation EDU LLC — PRD
Station Custodian: Vince Lawrence (LP-VNL) | vince@launchpathedu.com

---

## ORIGINAL PROBLEM STATEMENT
Premium learning and implementation platform for LaunchPath. Priorities: performance, mobile UX, deployment (Vercel frontend / Railway backend), and "infrastructure" brand feel.

Core requirements:
- Robust E2E checkout routing to Stripe + post-purchase handling
- MailerLite marketing automation integration
- Exact adherence to provided copywriting and structural UI layouts
- Deployment via GitHub pushes to Vercel + Railway

---

## DOCTRINAL ARCHITECTURE (LOCKED — April 2026)

**Master sequence:** `REACH → Ground 0 → Four Pillars → AUTO → 16 Deadly Sins → Modules`

1. **REACH** — Exposure-Awareness & Readiness Diagnostic. Reveals how exposed the operation is, whether danger can already reach the authority, and whether the operator should proceed, wait, or stop (GO / WAIT / NO-GO). Not just qualification — it is exposure-awareness.
2. **Ground 0** — Wisdom & Orientation Layer. Forms posture before the build begins. First briefing on order, consequence, stewardship, and the real cost of building without structure. Free module — not a gate, not a test, not contingent on REACH GO.
3. **Four Pillars** — The Guard Around the Authority. Protective structure: Authority Protection, Insurance Continuity, Compliance Backbone, Cash-Flow Oxygen. The Four Pillars are the guard. Not AUTO.
4. **AUTO** — Breach-Path Model. Maps the four ways failure tries to get past the guard: Around, Under, Through, Over. The breach map — not the guard itself.
5. **16 Deadly Sins** — Threat Taxonomy. Recurring, preventable failures that weaken, expose, or damage new carriers during the New Entrant period. The threats the guard is built to resist.
6. **Modules** — Installation Sequence. Installs the protection in practice: files, records, controls, procedures, rhythms, operating discipline.

**Doctrinal Voice:** Calm, serious, restrained, consequence-aware, plain-English, non-hype. Not a course funnel. Not a guru brand. A governed standard.

---

## TECH STACK
- Frontend: Next.js 14 (Pages Router), React 18.2.0
- Backend: FastAPI, MongoDB (Railway plugin)
- Auth: Emergent Google Auth (`REACT_APP_AUTH_URL`)
- Payments: Stripe
- Email: MailerSend (transactional) + MailerLite (marketing/groups)
- Storage: Emergent CDN (emergentintegrations)
- Icons: Phosphor Icons, Lucide React

---

## WHAT'S BEEN IMPLEMENTED

### Phase 127: P1 Urgency Signals + Audit Window Widget (June 2026)
- **Dynamic AnnouncementBar**: Fetches `/api/cohort-seats` on mount. When `near_capacity=true`: amber dot, 1s pulse, "COHORT NEARLY FULL — X SEATS REMAIN" text. When `at_capacity=true`: red dot, "AT CAPACITY — Join Waitlist". Default: green dot, seat count suffix. data-testid=announcement-bar verified live.
- **Ground 0 Urgency Signal**: Seat progress bar turns amber when `near_capacity`. Conditional `data-testid=ground0-urgency-banner` banner with AlertTriangle appears above admission form when `near_capacity=true`. Sidebar pill shows "COHORT NEARLY FULL" treatment.
- **Portal Audit Window Countdown Widget** (`data-testid=audit-window-widget`): New `GET /api/portal/audit-window` endpoint. Sources `authority_grant_date` from `icp_assessments`. Returns `days_remaining`, `urgency` tier, `pct_elapsed` of 18-month window. Widget renders at top of portal main content with color-coded urgency bar (low=green → moderate=yellow → high=amber → critical=red). Currently showing 91 days remaining (83% elapsed) for test user — amber urgency. Only visible when `has_data=true` (carrier has submitted REACH with `authority_grant_date`).
- Testing: 10/10 backend + 6/6 frontend (iteration_127.json)

### Phase 126: LP-WRK-001 Items 5–10 — Complete (June 2026)
- **Item 5 — Nurture Sequences (Track A & B)**: Track A (NURTURE-NEAR, ICP 40–59): 5 emails at Days 0, 3, 7, 14, 21. Day 21 email has dynamic audit window countdown from `authority_grant_date`. Track B (NURTURE-FAR, ICP 20–39): 11 emails at weeks 1–11 (Month 1 Foundation → Month 2 Consequence → Month 3 Positioning). Auto-enrolled from `/api/reach` based on `icp_classification`. Both wired into `process_pending_sequences()` worker.
- **Item 6 — Admin Checkpoint UI**: New `carrier_checkpoints` MongoDB collection. 5 LP-WRK-001 spec checkpoints per enrolled carrier (CP-01 Day 14 through CP-05 Day 90). `/api/admin/checkpoints` auto-initializes checkpoints for all enrolled carriers. `/admin/checkpoints` admin panel with accordion per carrier, 5-dot progress indicator, PASSED/FAILED/UNDER_REVIEW marking with notes. Wired into AdminNavBar between Admissions and Gate Reviews.
- **Item 7 — Dropout Recovery**: Three-tier MailerSend email flow (Day+3 reminder, Day+7 final notice, Day+44 deferred enrollment offer). Worker detects missed checkpoint deadlines from enrolled carrier grant dates.
- **Item 8 — Alumni Sequence (Flow 9)**: 4 emails post-VRF issuance (Week 1, Month 1, Month 3, Month 6). Enrolled automatically in `_issue_vrf_id_if_eligible()` in portal.py. Covers credential use, 6-month maintenance calendar, referral ask, Year 2 changes.
- **Item 9 — CRM State Machine**: `_update_crm_state(email, state)` helper for 16-state LP-WRK-001 taxonomy. Updates MailerLite subscriber `crm_state` field + local `crm_states` collection audit trail. Fires at: REACH submission (→ NURTURE-NEAR/FAR), ICP≥60 (→ GROUND-0-PENDING), checkpoint PASSED (→ COHORT-ACTIVE), checkpoint FAILED (→ COHORT-AT-RISK), VRF issued (→ LP-VRF-ISSUED).
- **Item 10 — 180-day Re-evaluation**: `_reevaluation_180d_worker()` in workers.py scans `icp_assessments` for NURTURE_NEAR/FAR leads 180+ days old and sends a REACH retake prompt. Deduplicated by `reevaluation_180d_sent` flag.
- **AdminSequencesPage updated**: 9-stat strip, 6-flow legend with Track A/B/Alumni. Flow descriptions per LP-WRK-001 spec.
- Testing: 100% pass (iteration_126.json — 8 backend, all frontend spec items verified).

### Phase 117: LP-WEB Spec Package v2 — Complete Implementation (May 2026)
- **LP-WEB-[E] Bug Fix 2**: Globally standardized "REACH Assessment" / "REACH Test" → "REACH Diagnostic" across ALL 15+ public-facing files (78 instances now correctly say "REACH Diagnostic"). Scope: Ground0Page, AdmissionPage, KC posts, WhoIsItForSection, FAQSection, SocialProofSection, HowItWorksSection, BriefBundleCTA, ReachRedirectView, CompleteView, REACHTeaserSection, KCClusterCtaBlocks, PreOpChecklistThankYou, reach-diagnostic.jsx SEO title, and more.
- **LP-WEB-[F] Program Page Gaps**: Added 3 conversion improvements to PricingSection.jsx: (1) Payment plan callout (`data-testid="payment-plan-callout"`) — "$1,500 at enrollment · $1,500 at Day 30"; (2) Cohort date block (`data-testid="cohort-date-block"`) — "LP-COH-001 — NEXT COHORT / Coming Soon — Date TBD"; (3) Post-admission path (`data-testid="post-admission-path"`) — "WHAT HAPPENS AFTER ADMISSION" with IF ADMITTED / IF FULL sections.
- **LP-WEB-[G] Ground 0 Preview Section**: Added dark-navy preview section at the very top of `/ground-0-briefing` (before REACH gate) with H1 "What Ground 0 covers.", 4 outcome bullet points, and "Complete REACH to Begin Ground 0 →" CTA. Existing H1 → H2 for SEO hygiene.
- **LP-WEB-[H] SEO Meta Updates**: Homepage meta → FMCSA-keyword-focused with "Free REACH Diagnostic". KC articles updated (DQ File, New Trucking Authority, New Entrant Safety Audit). Product pages updated (DQ Kit, Drug & Alcohol, Bundle). REACH Diagnostic page title fixed.
- Testing: 91% pass (iteration_115.json); remaining REACH terminology issues fully resolved post-test.

### Phase 118: Hero Energy Fixes — Motion & Contrast Only (May 2026)
- Overlay opacity: reduced left-side gradient from `rgba(11,22,40,0.97)` to `0.70`, right to `0.32` — truck cab/documents now visible at ~35%
- H1 desktop scale: 60px/56px → 74px/70px; tablet: 44px → 52px/48px — more dramatic headline-to-subhead contrast ratio
- Subhead split: one `<p>` → two distinct `<p>` blocks with 14px gap between sentences
- SYSTEM INITIALIZATION typewriter: replaced `hero-init-flicker` with `hero-typewriter` steps animation (2.4s, steps(36)) + cursor blink (6 cycles) + cursor fade — deliberate terminal "system coming online" feel
- REACH button entrance pulse: `hero-btn-pulse` keyframe — single glow beat at 1.4s delay, 1 iteration, not looping

**PREVIOUS PHASES:**
- Regenerated all 8 product mockup images using OpenAI GPT-Image-1 (via emergentintegrations) with text-free prompts
- Converted all images from PNG (~1.7MB each) to WebP (~9-58KB each) — 99% size reduction
- Updated in-place: `domain1-6.webp`, `bundle-document-system.webp`, `complete-diy-library.webp`
- All JSX refs already pointed to `.webp` filenames — zero code changes required
- Removed all intermediate PNG files from `/public/images/products/` to prevent repo bloat
- Added `mockup-zoom` / `mockup-zoom-wrap` CSS classes to `index.css` — `scale(1.06)` on hover, 0.45s cubic-bezier ease
- Applied zoom to: bundle hero in `ComplianceLibraryPage.jsx`, domain grid cards in same file, and product page hero in `ProductPageTemplate.jsx`

### Phase 82: sitemap.xml Updated (Apr 2026)
- Added `/products/library` (priority 0.8, lastmod 2026-04-16) and `/products/bundle` (priority 0.8)
- Updated lastmod to 2026-04-16 for `/compliance-library` + all 6 domain detail pages (reflecting CRO overhaul and image updates)
- Domain packet priorities bumped from 0.6 → 0.7 (reflecting new content depth)
- Total URLs: 68. Valid XML confirmed, returns 200.

### Phase 81: Comparison Table + Mobile Card — Library CTAs Wired (Apr 2026)
- Mobile comparison card for "COMPLETE DIY LIBRARY": `cta: null` → `cta: { label: "VIEW THE LIBRARY →", href: "/products/library" }`
- Desktop comparison table: added `<tfoot>` CTA row with 4 actions: "Browse domains →" (individual), "VIEW THE LIBRARY →" link (library), "INSTALL THE BUNDLE →" buy button (bundle, gold highlighted), "BEGIN GROUND 0 →" outlined link (standard)
- All entry points for LP-LIB-001 now route through `/products/library` detail page before checkout — full funnel consistency
- Page returns 200, lint clean

### Phase 80: /products/library — Complete DIY Library Detail Page (Apr 2026)
- Created `/app/frontend/src/pages/products/LibraryPage.jsx` — uses ProductPageTemplate with complete-diy-library.webp hero (960×640 WebP, 28KB), 8-asset contents breakdown with retail ($972) vs library price ($699) savings callout, "SAVE $273" label, bundle cross-sell advisory box
- Created `/app/frontend/pages/products/library.jsx` — Next.js route with full SEO (canonical non-www, og:image, JSON-LD Product schema with LP-LIB-001 SKU)
- nextStep: "Explore the LaunchPath Standard →" → /ground-0-briefing
- Page returns 200, lint clean

### Phase 79: BundlePage Hero — Brand Mockup Image Added (Apr 2026)
- Added bundle-document-system.webp image above "SYSTEM CONTENTS" panel in BundlePage.jsx hero right column — full visual consistency: same mockup on /compliance-library hero card, on /products/bundle hero panel
- No LibraryPage ($699) exists as a standalone detail page — LP-LIB-001 checkout routes directly from compliance-library; complete-diy-library.webp is available for future use
- Page returns 200, lint clean

### Phase 78: Domain Detail Pages — Branded Mockup Images in Hero (Apr 2026)
- Replaced 6 external Emergent-hosted PNG images on domain detail pages with new locally-hosted LaunchPath-branded WebP mockups (/images/products/domain1–6.webp)
- Consistent visual identity: same folder mockup image appears on the /compliance-library domain card AND on the individual product detail page hero — full-funnel brand consistency
- All 6 pages return 200, next/image handles local /public paths natively

### Phase 77: Product Image Mockups — Generated & Wired (Apr 2026)
- Generated 8 branded product mockup images via OpenAI GPT Image 1: 6 domain packet folders + Document System Bundle + Complete DIY Library (dark navy folders, gold accents, domain text on cover)
- Optimized PNG → WebP (640×640, quality 82) reducing from ~1.7MB each to 7–19KB each
- Stored in /app/frontend/public/images/products/ (Next.js public directory, served as static assets)
- Wired into /compliance-library page: bundle-document-system.webp in Bundle Hero Card header; 6 domain images at top of each domain card with gradient overlay fading to card background
- Testing: 100% (10/10 checks) — iteration_113

### Phase 76: LP-WEB-CLPAGE-001 Section 4B — 6 Additional CRO Changes (Apr 2026)
- **P1 Standard callout**: Replaced equal-weight Standard card (which showed $2,500 price) with a dimmed directional callout box — no price shown, text "Not ready to self-install? The LaunchPath Standard is a guided 90-day implementation — but it requires Ground 0 completion first." Outlined "BEGIN GROUND 0 →" button + "View full engagement details →" text link only. Section header changed: "TWO PATHS. ONE STANDARD." → "CHOOSE HOW YOU WANT TO BUILD".
- **P1 Button hierarchy**: Bundle card is now the dominant filled-gold primary. BEGIN GROUND 0 in callout is outlined (secondary). "View full engagement details" is text link (tertiary). Applied consistently across two-path section.
- **P2 Micro-copy under key buttons**: Added "Instant access. 30-day implementation roadmap included." under INSTALL THE SYSTEM and INSTALL THE BUNDLE; "Free. No purchase required. Takes 20 minutes." under BEGIN GROUND 0; "Instant access. One-time payment." under all 6 domain packet buy buttons.
- **P2 Section labels → outcome language**: "INSTALL BY DOMAIN" → "Just Need One Area Fixed?"; "COMMON QUESTIONS" → "BEFORE YOU BUY — READ THIS".
- **P2 Domain cards "Best For" line**: Italic "Best for..." qualifier added to each of the 6 domain cards (self-identification line between description and price).
- **P3 Comparison table highlight**: Bundle column now has prominent "RECOMMENDED" gold badge above header, gold top border (3px), and all 4 column headers at fontWeight 800.
- Testing: 100% (17/17 checks) — iteration_112

### Phase 75: Sequential Domain Installation Chain (Apr 2026)
- Added `domainStep` prop to `ProductPageTemplate.jsx` — renders a "INSTALLATION SEQUENCE — DOMAIN X OF 6" progress strip (data-testid='domain-sequence-strip') showing all 6 domains with current highlighted in gold and prev domains in muted gold
- Updated all 6 domain packet pages with chained nextStep links:
  - Domain 1 (New Entrant) → Domain 2 (DQ File Builder, $129)
  - Domain 2 (DQ Files) → Domain 3 (Drug & Alcohol, $129)  
  - Domain 3 (Drug & Alcohol) → Domain 4 (HOS & Dispatch, $119)
  - Domain 4 (HOS) → Domain 5 (Vehicle Maintenance, $119)
  - Domain 5 (Maintenance) → Domain 6 (Insurance Continuity, $109)
  - Domain 6 (Insurance) → Document System Bundle ($499, /compliance-library)
- Non-domain pages (e.g. Starter Stack) have no strip — zero regression
- Testing: 100% (14/14 checks) — iteration_111

### Phase 74: DQ File Builder page — link wired + canonical fixed (Apr 2026)
- Updated LP-PKT-DQ "VIEW DOMAIN →" link in ComplianceLibraryPage.jsx from `/compliance-library` → `/standards/dq-file-builder` (page + component were already fully built)
- Fixed canonical URL in `dq-file-builder.jsx` from `www.launchpathedu.com` → `launchpathedu.com` (non-www, consistent with GSC canonical rules)
- Page live at /standards/dq-file-builder with full SEO metadata, JSON-LD Product schema, and 6-document content breakdown

### Phase 73: LP-WEB-CLPAGE-001 Compliance Library Full CRO Spec (Apr 2026)
- **P1 Copy corrections**: Hero subhead → "DIY document system or guided 90-day installation"; Secondary link → "Already know what you need? Skip to the DIY Bundle →"; Bundle badge → "RECOMMENDED FOR MOST CARRIERS"; Bundle card expanded to 4 checkmarks (all five packets / folder architecture / 0–30–60–90 calendar / master checklist); added bundle subline "The complete document system. You install it yourself."; Path Chooser Card 4 updated to "Want it built, verified, and confirmed audit-ready" / "LAUNCHPATH STANDARD — $2,500 →"; all card CTAs now have "→" arrows.
- **P2 New sections**: ROI Snapshot embedded inside Bundle Hero Card (removed as standalone section); Audit Window Calculator moved to Section 5 (immediately after Path Chooser) with "HOW MUCH TIME DO YOU HAVE?" label + FMCSA 18-month audit window intro text; Social Proof Placeholder added at Section 6 (between Audit Window and Standard section).
- **P3 Rebuild**: Individual domain accordion replaced with 2×3 card grid (6 domain products: LP-PKT-001/002/003/004/005/DQ). Each card: domain label, name, one-line description, price, "ADD TO SYSTEM — $X" buy button, "VIEW DOMAIN →" link. Diagnostics/tools accordion retained for supplemental products. Full section reorder per spec (Hero → Bundle+ROI → Path Chooser → Audit Window → Social Proof → Standard → Domain Grid → Comparison → FAQ → Footer). micro-CTA updated: "Buying more than one domain? ...for $499 — $176 below individual acquisition cost."
- Testing: 100% (all P1/P2/P3 items) — iteration_110

### Phase 72: LP-WEB-007 Standards Page CRO Spec (Apr 2026)
- **Task 01 (P1)**: Hero section restructured — new subhead "Choose your path: DIY compliance system or guided installation for new motor carriers.", 3-bullet benefit list (Pass audit first attempt / Install in 90 days / Know what FMCSA looks for), primary CTA "TAKE THE REACH DIAGNOSTIC — FREE" (→ /reach-diagnostic), secondary link "Skip to Document System Bundle — $499" (→ #bundle). Old long-form copy removed.
- **Task 02 (P1)**: Bundle Hero Card inserted directly after hero — "RECOMMENDED" badge, `Document System Bundle $499` heading, 3 feature checkmarks (architecture / calendar / master checklist), prominent `INSTALL THE SYSTEM — $499` button (LP-BDL-001 checkout), escape link below.
- **Task 03 (P1)**: ROI Snapshot Strip added after Bundle Hero Card — `THE COST DECISION` label, two-column visual comparison: `$10,000–$25,000` (remediation) vs `$499` (system). Framed as cost decision, not a discount.
- **Task 04 (P2)**: Path Chooser Card Grid — 2×2 card grid replaces old routing band table. Four cards: Reach Diagnostic (→ /reach-diagnostic), Bundle (→ LP-BDL-001 checkout), Complete Library (→ LP-LIB-001 checkout), Standard (→ /ground-0-briefing, admission-gated, no checkout). Old routing band section removed.
- **Task 05 (P2)**: Micro-CTA above individual packet accordion updated to exact spec copy: "Buying more than one domain? The Document System Bundle includes all five for $499." with "See the Bundle →" link. data-testid="domain-bundle-crosssell".
- Testing: 100% (28/28 checks) — iteration_109

### Phase 71: Entrance Animations + Premium Chart Tooltip (Apr 2026)
- **Staggered scroll entrance**: `reveal-on-scroll` CSS class (opacity 0→1, translateY 16px→0, 0.70s cubic-bezier ease-out) added to `index.css` with `.d-80/.d-160/.d-240/.d-320` delay modifiers. `HomePage.jsx` IntersectionObserver now observes both `.data-stream` and `.reveal-on-scroll`. Applied to labels, body copy, gold rules, and headlines across ExposureBand, NotForSection, WhatGetsBuiltSection, FinalCTASection, ThePatternSection — 16 elements total
- **Custom ScoreTooltip**: Replaced recharts default tooltip with a bespoke `ScoreTooltip` component — dark navy bg, gold border, large overall score in gold, domain rows with color swatch + label, box-shadow depth. Wired via `content={<ScoreTooltip />}` prop

### Phase 70: Blueprint Grid + Score Chart Improvements (Apr 2026)
- **Blueprint grid uniformity**: Applied matching 52px linear-gradient line grid + CRT scan-line overlay to all 8 homepage sections (HeroSection replaced dot-grid, ExposureBand/NotForSection added position:relative + overlays, TheStandardSection/WhatGetsBuiltSection converted to 52px uniform spacing, FinalCTASection added CRT scan-line, ThePatternSection/FailureAnalysisSection already complete — skipped)
- **Score trend chart height**: Increased from 160px → 240px (ResponsiveContainer)
- **Score delta badges**: Month-over-month +/-% badge rendered next to each check's score in audit history list; green for gain, red for loss, bordered pill style matching app aesthetic
- **Streak indicator (history list)**: Gold "↑ N-CHECK STREAK" badge appears on any history entry that is the peak of 2+ consecutive score improvements
- **Streak annotation (chart)**: `ReferenceDot` from recharts placed at peak of each qualifying run on the overall score trend line — gold filled dot (r=5) with "↑N" label above in monospace gold
- Testing: 100% (9/9 checks) — iteration_108

### Phase 69: LP-WEB-006 Standards Page CRO Spec — 6 Tasks (Apr 2026)
- **Task 1**: Standard card framing copy changed to "Available by admission only. Revealed after Ground 0 completion and an approved Admission Request." (removes old "free module" messaging)
- **Task 2**: Consequence Callout box added above Bundle buy button — dark navy (#071422) bg, 3px gold (#C9A84C) left border, dollar amounts in gold-lite (#EDD99A), copy: "Typical cost of remediation after a failed New Entrant audit: $10,000–$25,000. Cost of installing the complete document system before the audit: $499."
- **Task 3**: REACH micro-CTAs added at 3 locations (end of Standard section, end of Bundle section, end of Install by Domain section) — 8pt inline link, gold underline, "Not ready to purchase? Run the free REACH Diagnostic to see your compliance exposure first."
- **Task 4**: Comparison table checkmarks (✓) changed from green (#4ade80) to gold (#C9A84C); dashes (—) from near-white to mid-gray (#7A8590) — on both desktop table and mobile cards
- **Task 5**: "Install this if..." qualifying lines added to 5 domain packets (DQ, Drug & Alcohol, HOS, Maintenance, Insurance) via `installIf` field in libraryData.js — italic, 7.5pt, gray (#7A8590) in accordion rows
- **Task 6**: Starter Stack repositioned directly below Document System Bundle with "New to LaunchPath? Start here." label in gold (#C9A84C); "ALSO AVAILABLE" section removed
- Testing: 100% (8/8 checks) — iteration_107

### Phase 68: LP-WEB-005 SEO On-Page Optimization (Apr 2026)
- **Task 1 — Title Tags**: All 4 pages updated to Custodian-approved titles under 60 chars:
  - `/` → "LaunchPath | FMCSA Compliance for New Motor Carriers" (52 chars)
  - `/program` → "LaunchPath Standard | 90-Day FMCSA Installation" (47 chars)
  - `/ground-0-briefing` → "Ground 0 | Free FMCSA Diagnostic | LaunchPath" (45 chars)
  - `/reach-diagnostic` → "REACH Test | FMCSA Compliance Gap Check | LaunchPath" (52 chars)
- **Task 2 — H2/H3 Text Updates**:
  - `WhatGetsBuiltSection.jsx` H2: "What You Build in 90 Days: An Audit-Ready Compliance System"
  - `TheStandardSection.jsx` H3: "What "Protected Authority" Means for Your FMCSA Compliance"
  - `HowItWorksSection.jsx` H2 (on /program): "This Is How the FMCSA Compliance System Gets Installed."
- **Task 3 — Alt Text + aria-labels**:
  - Headshot alt updated across CredibilityStrip, VinceCTASection, AboutPage, AboutSection
  - aria-label added to Four Pillars, AUTO Method, REACH, and 16 Sins DOM visual containers
- **Task 4 — Schema**: EducationalOrganization JSON-LD added to homepage `@graph` (prior session)
- **Task 5 — Internal Links**: HOLD — pending LP-WEB-001 sprint completion
- **Logo Fix**: Firebase Storage token URLs replaced with local `/white_logo.png` in Navbar + FooterSection; AboutPage Vince photo moved to Emergent CDN URL


- Added rich hover dropdown to the "Tools" navbar link showing all 4 operator tools with name, description, and FREE badge
- Desktop: gold-accented dropdown panel (320px wide) with "OPERATOR TOOLS" header + "View all tools →" footer
- Mobile: sub-items with badge chips
- CaretDown icon added (rotates on open)
- **Ground0LessonPlayer.jsx**: 1609 → 288 lines. Extracted 7 sub-components into `src/components/ground0/` (OverviewView, LessonView, ReachRedirectView, GapTracker, CompleteView, Lesson07View, AuthGateModal) and data into `src/data/ground0Data.js` (LESSONS, COMPLETION_DATA, REACH_PILLARS, computeReachStatus, L07_MODULES)
- **PortalPage.jsx**: 1482 → 946 lines. Extracted 5 portal UI components into `src/components/portal/` (PortalHeader, PortalSidebar, LockedModuleView+EnrollCTA, ModuleOverviewCard, DeliverablesPortal) and data into `src/data/portalData.js` (CURRICULUM, MODULE_OVERVIEWS)
- **REACHAssessmentPage.jsx**: 1301 → 888 lines. Extracted 3 sub-components into `src/components/reach/` (CategoryBreakdown, ResultCTAs, RiskMap) and all data/config into `src/data/reachData.js`
- Confirmed: Operator tools `/tools/tco-calculator` and `/tools/load-analyzer` are fully built and backend-verified. All tool API endpoints functional.

### Phase 65: Homepage Blueprint Grid + Scan-Line Upgrade + Task A Verified (Feb 2026)
- **Blueprint line grid** (48–52px, gold 4–4.5% opacity) applied to TheStandardSection, ThePatternSection, FailureAnalysisSection, FinalCTASection — replaces old 24px dot grid on TheStandardSection
- **CRT scan-line overlay** (4px repeat, black 6–7% opacity) added to ThePatternSection + FailureAnalysisSection; FailureAnalysisSection uses red-tinted grid lines matching threat aesthetic
- All 4 sections use `position:absolute` overlay divs at `zIndex:0` with inner content at `zIndex:1` — no layout breakage
- SSR verified: 48px 48px, 52px 52px ×3, repeating-linear ×2 all confirmed
- **Task A (Lesson 0.7 GO-path email capture)**: Already complete from prior session — `POST /api/go-email-capture` returns `{"ok":true}` confirmed live
- Nav links: tap height extended from 25px → 56px (`height: 56px`, `display: flex`, `align-items: center`)
- Hamburger breakpoint: lowered from 1100px → 767px (tablet 768px now gets full desktop nav)
- KC category filter chips: `minHeight: 44px` added (both Articles + Briefs tabs)
- KC Start Here link: `minHeight: 44px` added
- Inline homepage CTAs (Read the full story, Review LaunchPath Standard, See AUTO breach map): `minHeight: 44px` via `display: inline-flex`
- Article cluster pages: prose max-width reduced 780px → 720px
- ThePatternSection body copy: 760px → 720px
- Article pages (LP-WEB-001 cluster): `className="content-page"` applied to all 7 root divs — fixes dark text invisible on dark navy background
- Added `.section-prose-text { max-width: 720px }` CSS utility class to index.css
- All SSR-verified. No horizontal overflow on any page at any breakpoint.
- All 7 LP-WEB-001 cluster pages added to KC index Articles tab (previously direct-URL-only): P1 DQ File Requirements, P2 New Trucking Authority, P3 FMCSA Safety Rating, P4 Pillar Guide (How to Start), P5 Corrective Action Plan, P6 New Entrant Audit Checklist, P7 DOT Drug & Alcohol
- Article stats counter updated: 8 → 15 Published articles
- Pillar page gets a "Pillar Guide" badge in the article list
- Added institutional "If you are new to this library" dark navy strip between hero and bundle block — links to pillar page; mobile-responsive grid
- All 15 article codes + start-here strip confirmed via SSR output
- **LP-WEB-001 v2.0 complete**: Added missing `/knowledge-center/how-to-start-a-trucking-company` internal link to `DQFileRequirementsPost.jsx` opening section (all other CTAs, secondary CTAs, product placements, and disclaimers were already in place across all 7 KC pages)
- **LP-WEB-004 Issue 1** — LP-DEL-01 module list replaced with LP-SYS-CUR-001 sequence (Ground 0 → Module 9), body updated, secondary note added below list
- **LP-WEB-004 Issue 2** — Weeks 8–13 block corrected: label → `CORE INSTALLATION — MODULES 4–5`, body updated, week range extended
- **LP-WEB-004 Issue 3** — All 5 packet names updated to confirmed product names (incl. "HOS & Dispatch Compliance Packet")
- **LP-WEB-004 Issue 4** — Deliverable bullets rewritten for LP-DEL-02, 03, 05, 06 (physically tangible, CFR-cited, audit-specific)
- **LP-WEB-004 Issue 5** — Closing consequence line added to FinalCTASection; 90/5/5 counter + explainer added to HowItWorksSection above timeline
- **Decoupled VRF issuance from module-6 alone**: Created `_issue_vrf_id_if_eligible(user_id)` helper in `portal.py` — checks that all core modules (1–6) are complete; if module-6 was conditional, module-7 must also be complete
- **Dual-trigger wiring**: helper is `await`-ed in both `mark_module_complete` (portal.py) and `decide_gate_review` (admin.py), so any completion event that tips the operator over the threshold issues the credential immediately
- **Frontend updated**: `isAllCoreDone()` mirrors backend logic in `PortalPage.jsx`; sidebar `registryIssued` check uses it; module-7 conditional completion path now renders the `VerifiedRegistryID` ceremony; module-8/9 descriptions updated in both `PortalPage.jsx` and `moduleData.js` to remove "outside the Verified Registry ID framework" text
- **Pending message corrected** in `VerifiedRegistryID.jsx`: now accurately describes the core module completion requirement instead of referencing the old module-6-only trigger
- Testing: 100% (17/17) — iteration_104
- **Element 1 — "What You Build in 90 Days"**: WhatGetsBuiltSection.jsx rewritten to spec — headline, lead paragraph, 7 deliverables (exact spec copy including new items 06 cash-flow protection and 07 Verified Registry ID), gold rule, closing line "This is what 'protected authority' looks like in practice..."
- **Element 2 — "90 / 5 / 5" Counter**: Added stat counter (90/5/5 with gold serif numerals) and explainer ("What '90 / 5 / 5' Means") with definitions for 90 days / 5 compliance domains / 5 custodian checkpoints — all spec copy exact
- **Element 3 — Protected Authority Definition**: Added ProtectedAuthorityBlock after FourPillarsSubsection in TheStandardSection — gold-left-border callout with title, intro, and 3-item definition per spec
- **Element 4 — Strengthened Closing CTA**: Two new consequence lines appended after existing h2 in FinalCTASection — same font/weight/size, no visual separator, per spec copy
- All 4 elements tested and verified at 95% (5% minor was testing agent error — quotes present in spec are present in implementation)

### Phase 59: PreOpChecklistThankYou replaced with Audit Binder (April 2026)
- `PreOpChecklistThankYou.jsx` (/resources/pre-op-checklist/thank-you) fully rewritten: old 4-phase Pre-Op Checklist removed, replaced with Complete Audit Binder Series — coral accent, 6 binder cards (New Entrant, HOS, Drug & Alcohol, Maintenance, Insurance, Authority Registrations), PDF download CTA, REACH test next step
- PDF link: /downloads/LaunchPath_Complete_Audit_Binder_Series.pdf

### Phase 58: AllChecklists Download Block + Product Preview Modal (April 2026)
- Added AuditBinder download block (screen-only, hidden in print) to `/knowledge-center/all-checklists` — completes the "Complete Audit Binder Series" PDF availability across all relevant pages
- Added lightweight "Preview Contents" modal to all product pages using `ProductPageTemplate`: ghost button next to buy CTA → fixed overlay modal showing numbered TOC from `whatsInside`, product title, price, and direct "Get Instant Access" CTA — Escape key and overlay click close the modal
- Both features tested at 100%

### Phase 57: Audit Binder Download Block (April 2026)
- Replaced the old email-gated Pre-Op Checklist (`PreOpChecklistGate.jsx`) with a new direct-download block for "The Complete Audit Binder Series"
- PDF stored at `/public/downloads/LaunchPath_Complete_Audit_Binder_Series.pdf` (297KB, 6 compliance checklists)
- Component shows: beige (#e9e3d9) contrast block, "THE COMPLETE AUDIT BINDER SERIES" label, "All 6 compliance checklists in one printable PDF" heading, 6 domains listed, gold "DOWNLOAD ALL CHECKLISTS" button — no email gate
- Live on `/knowledge-center/how-to-start-a-trucking-company` (HowToStartTruckingPost.jsx)
- PDF accessible at /downloads/LaunchPath_Complete_Audit_Binder_Series.pdf — HTTP 200 confirmed

### Phase 56: Doctrinal Visual Standard — All Sales/Product Pages (April 2026)
- **Design token split enforced**: Coral (#D85A30) for all document/content labels, LP-xxx codes, section header labels, and the 2px bar under H1. Gold (#d4900a) reserved exclusively for purchase CTAs, price text, and buy buttons.
- **ProductPageTemplate.jsx** updated: coral pre-header label, coral 2px bar after H1, coral header section bottom-border, coral left-border on positioning section, coral SectionLabel component, coral list dashes, white (not gold) dividers between sections.
- **ComplianceLibraryPage.jsx** (/compliance-library) updated: coral hero label, coral hero border, coral 2px bar after H1, coral accordion group header labels, coral LP-STD-001/LP-BDL-001 section labels.
- **BundleSalesPage.jsx** (/bundle) updated: removed pulsing green LIVE dot → static coral square indicator, coral hero border and label.
- **BundlePage.jsx** (/products/bundle) updated: same as BundleSalesPage.
- **Child product pages** (DQFilePacketPage, DrugAlcoholPacketPage, StarterStackPage, NewEntrantPacketPage, SafetyAuditPrepPage): inline gold section labels updated to coral, callout card borders updated to coral.
- **Missing Next.js page wrappers** created for: /products/dq-file-builder, /products/bundle, /products/safety-audit-prep, /standards/safety-audit-prep.
- All 9 product/sales pages tested and passing at 100%.

### Phase 55: Pre-Op Checklist Email Gate + 3-Email Welcome Sequence (April 2026)
- **Email gate** on pillar page (/knowledge-center/how-to-start-a-trucking-company) — first name + email, POST /api/checklist/email-capture, redirects to /resources/pre-op-checklist/thank-you
- **MongoDB leads** captured with `source: pre_op_checklist_download` + `page: pillar_pre_operation_checklist`
- **MailerLite** — enrolls in "Pre-Op-Checklist-Download" group
- **Flow 6 (pre_op_checklist)** — 3-email sequence enrolled on capture:
  - Step 1 (Day 1): "Your startup checklist — one phase makes or breaks the rest" → /knowledge-center/how-to-start-a-trucking-company
  - Step 2 (Day 3): "The Phase 3 item FMCSA finds missing most often" → /knowledge-center/dot-drug-alcohol-program-requirements
  - Step 3 (Day 7): "The checklist tells you what to build. REACH tells you what is already exposed." → /auto-diagnostic
- Sequence verified in MongoDB with correct send_at timestamps (Day 1, 3, 7 from capture)

### Phase 54: LP-WEB-001 — 7-Page SEO Content Cluster Complete (April 2026)
- **7 new knowledge center articles** live at /knowledge-center/ slugs per spec: driver-qualification-file-requirements-fmcsa, new-trucking-authority-first-steps, fmcsa-safety-rating-explained, how-to-start-a-trucking-company (pillar), corrective-action-plan-fmcsa, new-entrant-safety-audit-checklist, dot-drug-alcohol-program-requirements
- **Each page**: Article + FAQPage JSON-LD schemas in @graph, self-referencing canonical tag, full OG tags (H1 as og:title), Newsreader/Inter font stack, gold bottom-border hero layout
- **CTA architecture per spec**: Primary-only on Pages 1 & 7; Primary + Secondary on Pages 2 & 3; Mid-article + 2x Primary + Secondary on Pages 4, 5, 6
- **Product placements**: All products linked inline per Section 6 of spec (DQ Kit, Starter Stack, 16 Sins, Document Bundle, Audit Prep Pack, D&A Packet, TCO Calculator, New Entrant Packet)
- **CTA button color fix**: Primary button corrected to navy background / gold text per LP-STD-VOICE-001
- **Sitemap updated**: 7 new cluster URLs added at priority 0.8–0.9; pillar page at 0.9
- All 7 pages confirmed HTTP 200 with correct SSR output
- Canonical deduplication fixed: `key="canonical"` added to both `_app.jsx` and all 7 cluster page wrappers — verified 1 canonical per page

### Phase 53: System Architecture Diagram on Homepage (April 2026)
- Added `SystemArchitectureDiagram` component (`TheStandardSection.jsx`) — horizontal 6-step sequence block placed directly above "THE LAUNCHPATH PROTECTION SYSTEM" label
- Shows: REACH (gold) → Ground 0 (gold) → Four Pillars (green) → AUTO (red) → 16 Sins (red) → Modules (gold)
- Each step: numbered (01–06), name, role label, sub-descriptor; arrows connecting steps; footer motto "The order is not optional"
- LP-SYS-001 classification code; dark #0B1525 background with gold top border; mobile-responsive (stacks vertically on ≤768px)
- Testing: screenshot verified — all 6 steps visible with correct color coding

### Phase 52: /standards/auto-method Standalone Page (April 2026)
- Built full `/standards/auto-method` page — doctrinal breach-path model for the AUTO Method
- **Four breach path cards** (A/U/T/O): each has letter header + classification badge + 1-sentence definition + HOW IT MOVES body + IN THE FIELD field example + CFR reference + Pillar That Resists indicator
- **T (THROUGH)** card references LP-CASE-001 ($19,246 MEC oversight) as the field example
- **Protection Matrix**: clean 3-column table mapping each breach path (Around/Under/Through/Over) to the Pillar that resists it and the specific control
- **REACH CTA** + cross-links to /standards/16-deadly-sins, /doctrine, /founder
- **OG image** generated + wired (summary_large_image, 1536×1024)
- Testing: 100% (iteration_97) — 16/16 checks passed

### Phase 51: OG Images for /doctrine and /16-deadly-sins (April 2026)
- Generated two new institutional OG images (1536×1024 each via Gemini Nano Banana):
  - `/doctrine`: dark dossier with 6-step sequence flow (REACH → Modules) — replaced old generic doctrine image
  - `/16-deadly-sins` and `/standards/16-deadly-sins`: dark red threat taxonomy document with 16-item list
- Updated meta tags on all three routes: new OG image URLs, updated doctrinal descriptions, `og:image:width/height`, `og:url`, `og:type: article`, `twitter:card: summary_large_image`
- Removed generic `/og-launchpath.png` placeholder from 16-sins pages
- SSR verified via curl — all three routes confirmed with correct image URLs and tags

### Phase 50: Share This Doctrine — Copy Button + OG Image (April 2026)
- **Copy-link button** added below the Doctrine Sequence Map on `/founder`: shows "COPY DOCTRINE LINK →" → copies `window.location.href` to clipboard → flips to "LINK COPIED ✓" for 2.5s → reverts; styled institutionally in gold mono, no external library
- **OG image** generated (1536×1024 dark navy dossier cover showing Vince Lawrence name, title, 6-step sequence, corner brackets) and wired to `/founder` page via `og:image`, `og:image:width/height`, `og:url`, `twitter:card: summary_large_image`, `twitter:image`
- Testing: HTTP 200 confirmed, `copy-doctrine-link` testid, `COPY DOCTRINE LINK` text, and OG image URL all verified in SSR output

### Phase 49: Doctrine Sequence Map on /founder (April 2026)
- Added visual `doctrine-sequence-map` section to `/founder` page between Pattern Observations and Protection Standard
- **Diagram design**: dark CARD background + gold border → header bar (LP-DOCTRINE — OFFICIAL SEQUENCE MAP) → 6-node vertical spine with color-coded dots (gold for awareness/installation, #3d9970 green for guard, #b12a1e red for breach/threats) → connecting lines between nodes → compressed Master Logic Line footer
- Each node shows: step code (01–06) · label · one-line mapLine descriptor — telegraphic, not the full definition
- No external dependencies, pure CSS/JSX diagram
- Testing: HTTP 200 confirmed, SSR content verified via curl

### Phase 48: /founder Page — Military Dossier Aesthetic (April 2026)
- Built `/founder` page as a military-record / authority dossier — no photo, credential structure does the trust work
- Sections: File classification band → Identity Dossier (name, title, 4-credential file-card) → Origin Statement (Long Version copy) → Observed Failure Behaviors (5 coded field observations) → Protection Standard (6-part REACH→Ground 0→Pillars→AUTO→16 Sins→Modules with locked definitions + Master Logic Line) → Founder Signature (italic gold) → REACH Diagnostic CTA
- Added `credibility-founder-link` to `CredibilityStrip` on homepage → `/founder`
- Saved `/app/memory/launchpath_doctrine.md` as the locked doctrinal source of truth for all future work
- Testing: 100% (iteration_96) — 14/14 checks passed, no console errors, no portrait found

### Phase 47: Founder + 90-Day Copy Blocks + 16-Sins Page (April 2026)
- **CredibilityStrip.jsx** — New heading "BUILT BY SOMEONE WHO HAS WATCHED THIS BREAK IN THE REAL WORLD"; Mid Version founder copy (Navy veteran, OSHA, 25+ years); 4-item credential strip (Navy Veteran, OSHA-Certified, 25+ Yrs Leadership, Founder LaunchPath EDU); Proverbs scripture block removed
- **WhatGetsBuiltSection.jsx** — Mid Version body copy; 7 new specific bullets (driver qual, D&A, HOS, maintenance, authority/insurance, responsibilities, gaps); Day 1 vs Day 90 mini-band; FMCSA bridge line about New Entrant safety audit
- **SixteenSinsPage.jsx** — New H1 "The 16 Exposure Patterns That Reach the Authority"; intro body updated to doctrinal voice; WHY THIS GUIDE bullets updated; conclusion: "Ground 0" replaced with "REACH Diagnostic"
- **Route fix**: `/standards/16-deadly-sins` was redirecting to `/compliance-library`; now renders SixteenSinsPage directly (matches homepage link from FailureAnalysisSection)
- Testing: 100% (iteration_95) — all 14 content/route checks passed

### Phase 46: LaunchPath Homepage Rewrite — Complete (April 2026)
- Fully rewrote and orchestrated the homepage with a strict 12-section doctrinal flow
- **New section order**: Hero → ExposureBand → CredibilityStrip → ThePattern → NotFor → TheStandard (Four Pillars+AUTO+REACH) → FailureAnalysis (compressed proof block) → WhatGetsBuilt → FAQ → FinalCTA
- **3 new components added**: `ExposureBand.jsx`, `CostOfFailureSection.jsx`, `WhatGetsBuiltSection.jsx`
- **Removed old sections**: SystemArchitectureDiagram, OperatorQualifierSection, SocialProofSection
- **FailureAnalysisSection compressed**: Shortened from full 2-column deep-dive to a compact proof block ($19,246 stat strip + short narrative + AUTO vector + link to standalone 16-sins page). Moved to position 9 (after REACH diagnostic) so it lands as "here is what it costs when the guard is missing"
- **Fixed HeroSection**: Added missing `const GOLD = "#C8933F"` constant that caused SSR ReferenceError
- Testing: 100% (10/10 sections verified) — iteration_94

### Phase 45b: Doctrine Map Page (April 2026)
- Created `/doctrine` — a shareable, standalone visual architecture page for the LaunchPath 5-layer system
- Vertical flow diagram with numbered nodes (01–05), gold accent colors, connector badges between layers
- Shows: REACH → Ground 0 → AUTO → 16 Deadly Sins → The Standard with full descriptions, outputs, and CTAs per layer
- Locked doctrine statement block at the bottom with the combined doctrine in 5 sentences
- Primary CTA: "Begin with REACH →" | Secondary CTA: "Enter Ground 0 →"

### Phase 45: Doctrinal Architecture Correction (April 2026)
- **REACH owns GO/WAIT/NO-GO**: Moved email capture forms for WAIT/NO-GO from Ground0LessonPlayer into REACHAssessmentPage. After WAIT submit: routes to /resources/reach-wait. After NO-GO submit: routes to /resources/reach-nogo.
- **New REACH holding pages**: Created /resources/reach-wait.jsx (WAIT holding page, calm amber tone) and /resources/reach-nogo.jsx (NO-GO holding page, muted firm tone). REACH-branded with correct source tags (reach_wait_capture, reach_nogo_capture).
- **Ground0Page corrected**: Removed embedded REACHAssessmentWidget. Removed "You passed the REACH check." tagline. Added REACH prerequisite banner at top. Dark section now shows LP-DOCTRINE — SYSTEM ORDER (5-layer architecture).
- **Ground0LessonPlayer corrected**: Replaced DecisionView (user-selected GO/WAIT/NO-GO) with ReachRedirectView ("Ground 0 complete — your outcome is determined by REACH"). Removed WAIT/NO-GO email capture from CompleteView. Updated G0-6 title to "The REACH Qualification". Updated G0-5 AUTO to "authority-protection framework that guards against the 16 Deadly Sins".
- **DeadlySinsSection updated**: Added explicit AUTO–Sins connection: "AUTO — the authority-protection framework — shows how each one reaches the authority: Around, Under, Through, and Over."
- **REACHAssessmentPage updated**: Added firstName field. For WAIT/NO-GO, calls /api/ground0/waitlist with reach source tags after main /api/reach call. Redirects to reach-wait/reach-nogo after 1.4s.
- **Backend unchanged**: /api/ground0/waitlist endpoint already accepted source_tag, reach_resources, reach_experience etc. from Phase 44.

### Phase 44: Ground 0 Email Sequences — Email 2 (Mar 2026)
- Built 3 x Email 2 HTML templates for GO / WAIT / NO-GO in Ground 0 tone
  - GO Email 2: "A GO result is not permission to relax." → CTA "Proceed to Next Step →" → /admission; 24h delay; tag ground0_go_email_02
  - WAIT Email 2: "A WAIT result is not meant to discourage you." → CTA "Revisit Ground 0 →"; 72h delay; tag ground0_wait_email_02
  - NO-GO Email 2: "A NO-GO result exists for a reason." → CTA "Remain on the List →"; 120h delay; tag ground0_nogo_email_02
- Added `_schedule_ground0_email2()` helper: upserts `db.ground0_sequences` record with `email2_send_at` timestamp
- Added `_send_ground0_sequence_emails()` to `workers.py` daily worker: queries due records, sends via MailerSend, marks `email2_sent: true`
- Email 1 (immediate) already in place from Phase 43; all 6 emails in sequence now complete
- Verified: MongoDB schedules correct, all 3 endpoints return {ok:true}


- Built 3 HTML email templates (GO, WAIT, NO-GO) matching Ground 0 tone: calm, structured, non-hype, consequence-aware
- GO email: triggered by /api/go-email-capture → subject "Your Ground 0 result has been recorded as GO." → CTA "Continue Forward →" → /admission; internal tag ground0_go_email_01
- WAIT email: triggered by /api/ground0/waitlist when status=WAIT → subject "Your Ground 0 result has been recorded as WAIT." → CTA "Return Later →"; internal tag ground0_wait_email_01
- NO-GO email: triggered by /api/ground0/waitlist when status=NO-GO → subject "Your Ground 0 result has been recorded as NO-GO." → CTA "Stay Notified →"; internal tag ground0_nogo_email_01
- All sent via existing MailerSend/send_mailersend_email() as asyncio background tasks with first_name personalization
- All three queued and logged correctly in backend (verified)


- Added First Name field to WAIT and NO-GO capture forms (previously email-only)
- Updated all copy to match spec: WAIT "You're Not Ready Yet — But You Don't Have To Start Over", NO-GO "You're Not Cleared to Proceed Right Now"
- Updated GO (Lesson 0.7) copy: "YOU'RE CLEARED TO MOVE FORWARD", button "CONTINUE →", added First Name field
- Source tags: ground0_go_capture, ground0_wait_capture, ground0_nogo_capture — stored in MongoDB ground0_waitlist
- Backend Ground0WaitlistRequest now accepts first_name + source_tag; go_email_capture lead_source updated to ground0_go_capture
- Testing: 100% (12/12) — iteration_92


- Built `/resources/first-90-days-risk-map` — 10-section lead-magnet landing page (paper/ink design, Playfair+Inter+JetBrains Mono)
- Built `AuthorityClock.jsx` — horizontal segmented 3-zone SVG/CSS component (Foundation/Ops/Audit)
- Built `/resources/first-90-days-risk-map/thank-you` — distraction-free page (no nav, no footer); "Download Now" PDF button + REACH CTA
- Added `POST /api/risk-map/email-capture` — MailerLite "First-90-Days-Risk-Map" group + MongoDB `leads` upsert
- PDF CDN: `customer-assets.emergentagent.com/...c738vw2e_LaunchPath_First_90_Days_Risk_Overview_v2.pdf`
- Testing: 100% (15/15 frontend+backend) — iteration_91

### Phase 40: Score Chart + Dynamic Imports + og:image Attempt (Mar 2026)
- Added `ScoreTrendChart` to `AuditHistoryScreen.jsx`: recharts LineChart showing overall score (gold, 2.5px) + 6 domain lines (colored, 0.55 opacity) over time; appears when history.length ≥ 2
- Refactored `PortalPage.jsx` with `next/dynamic` for all 7 heavy components (Ground0LessonPlayer 1744 lines, VideoLessonWorkbench 626 lines, AuditReadinessDashboard, SignalMonitor, AnnouncementsFeed, VerifiedRegistryID, ModuleChecklist, TaskItem) — all with `ssr: false` and PortalLoading fallback
- Moved MODULE_1_DATA from VideoLessonWorkbench.jsx into moduleData.js to enable true code splitting of VideoLessonWorkbench
- og:image: quota still exhausted (imagen-4 daily limit) — remains blocked

### Phase 39: LaunchPath Standard Sales Page Readability Overhaul (Mar 2026)
- Switched `display`+`serif` tokens from Playfair Display/Source Serif 4 → Inter 800-900/400-500 for all headings and body (more readable for 28-54 age range on laptops)
- Increased body font size to 16-20px, line-height to 1.8-1.9, section padding from 80px → 96px across all section components
- Added "WHAT YOU WALK AWAY WITH — 90 DAYS" summary benefit block after hero (bold callouts for DQ files, D&A program, PM system, Verified Registry ID)
- Added "OPERATOR PROFILE — IS THIS YOU?" 5-item grid block (authority active, 1-20 trucks, first 18 months, NESA concern, systems not videos)
- Improved `CheckItem`, `ArrowItem`, `CrossItem`, `FAQItem` shared components (larger font, more spacing)
- Improved `WhatIsIncludedSection` card padding 28→32px, body text 17→17-18px, section sub-headline 17→18px
- Hero H1 uses Inter 900 with `lineHeight: 1.1` — bold, scannable, clear for older screens
- Also made same improvements to `LaunchPathStandardPage.jsx` (/standard route): font, spacing, sections, module note bullet parsing

### Phase 38: Seats Counter + E2E Test + Monthly Cron (Mar 2026)
- Added live "X of 12 seats remaining" counter on AdmissionPage (fetches /api/cohort-seats, gold/red urgency indicator)
- E2E pipeline verified: checkout URL → simulate-cohort-payment → DB record (taken=4) → MailerSend + MailerLite pipeline confirmed ✅
- Added `_send_monthly_audit_reminders()` to workers.py: runs daily, finds enrolled carriers with no check in 30 days, sends branded reminder email, tracks `monthly_audit_reminder_sent_at`

### Phase 37: Stripe Fix + Hero Restore + Cohort Count (Mar 2026)
- Fixed Stripe 502 Bad Gateway on all 3 checkout endpoints (`products.py`, `payments.py`, `portal.py`): reverted `automatic_payment_methods` → `payment_method_types=["card"]`, added proper `StripeCheckout(...)` proxy initialization in `payments.py` and `portal.py`
- Restored HeroSection.jsx: original background image (`gt9pdg9a_hero-letter-dashboard.png`), original layout order (body copy + checklist → stats box), full two-paragraph sub-headline
- Updated cohort max from 10 → 12 carriers in `AdmissionPage.jsx`, `StandardPage.jsx`, `LaunchPathStandardPage.jsx` (backend `MAX_SEATS` was already 12)

### Phase 36: Stripe Pipeline Fix + og:image Update (Mar 2026)
- Fixed `_process_cohort_payment` in payments.py — was using MailerLite Tags API (broken), now uses Groups API (`_get_or_create_ml_group`) matching products.py pattern
- Added `POST /api/admin/simulate-cohort-payment` — admin endpoint to test full cohort pipeline (DB record, MailerSend buyer + admin emails, MailerLite group enrollment) without a real Stripe charge
- Simulated pipeline confirmed: MailerSend 202 on both emails, MailerLite groups enrolled correctly
- Fixed Vercel build errors: missing `useSEO` import in BundleSalesPage.jsx + BookMockup3D named export
- Updated og:image: replaced old CDN placeholder with dark truck highway image across all 33 pages. useSEO.js DEFAULT_IMAGE updated. Image quota exhausted — using Unsplash stock image as intermediate og:image.

 — Config-Driven Refactor (Mar 2026)
Backend: `/app/backend/routes/audit_readiness.py` (complete rewrite)
- New `monthly_checks` MongoDB collection (one doc per check per month per user)
- `QUESTION_BANK`: 11 questions with IDs dq_01/dq_02/da_01/da_02/hos_01/hos_02/vm_01/vm_02/ia_01/ia_02/ar_01
- `DOMAIN_CONFIG`: greenMin/yellowMin/criticalFailureForcesRed per domain
- `OVERALL_CONFIG`: 85% green, 60% yellow, criticalOverrideDomains=[insurance_authority, audit_response]
- Critical override: ia_01 NO/NOT_SURE or ar_01 NO → overall RED with criticalOverride=true (fires before numeric scoring)
- NOT_SURE handling: notSureVerifyLines computed per domain, stored in DB, returned in API
- Weighted scoring: domain score = sum(weights) / max_weight * 100
- Endpoints: GET/POST /api/audit-readiness, GET /api/audit-readiness/history, GET /api/audit-readiness/{check_id}
- Admin: GET /api/admin/audit-readiness (aggregation), GET/PUT /api/admin/audit-readiness/check/{check_id}/domain/{domain}, POST send-email

Frontend: 4-screen inline flow (no modals)
- Screen 1 Dashboard: overall status, 6 domain cards (REPORTED/VERIFIED separated), critical override banner, stale flag
- Screen 2 Run Check: multi-step form, domain helper text, radio-style YES/NO/NOT_SURE buttons, notes field on final step
- Screen 3 Results: domain result cards with scorePercent/counts/notSureVerifyLines, summaryJson panel (copyable), back button
- Screen 4 History: chronological list, domain mini-dots, link to results for each entry
- Admin page updated for new schema (latestCheckId, domain keys, SC verify/note/override)
- Shared `auditConfig.js` config file (QUESTION_BANK, DOMAIN_CONFIG, DOMAIN_LABELS, helper text)

Testing: 100% (13/13 backend + all frontend flows) — iteration_90

### Phase 34: Monthly Audit Readiness Dashboard v1 (Mar 2026) [SUPERSEDED by v2]
### Phase 33: Ground 0 Content Additions (Mar 2026)
- Lesson 0.7 "What Happens After GO" — GO-path only
- Copy patches for Lessons 0.2, 0.3, 0.6
- Testing: 100% (12/12) — iteration_88

### Phase 33b: Lighthouse Performance Fixes (Mar 2026)
- LCP preload, browserslist update, cache headers, explicit image dimensions, hamburger aria-label

### Phase 32–31: Deployment Health Checks (Mar 2026)
- Auth redirect uses REACT_APP_AUTH_URL env var, CORS opened to *

### Previous Phases (pre-March 2026)
- MailerLite Groups integration
- Custom /thank-you page, Stripe success_url routing
- /compliance-library, /16-deadly-sins, /safety-audit-prep-pack pages
- Homepage hero, stat blocks, Ground 0 CTA in Navbar
- Ground0LessonPlayer 6-lesson diagnostic with GO/WAIT/NO-GO flow

---

## PRIORITIZED BACKLOG

### P0 — Blockers (none currently)

### P1 — High Priority
- Replace Vimeo placeholder URLs in portal modules via /admin/modules (BLOCKED — waiting on user)
- Production push to Vercel/Railway — blocked until Vimeo URLs populated

### P2 — Medium Priority
- ~~LP-WEB-001 7-page cluster added to KC index~~ DONE — All 7 pages (P1–P7) now appear in the Articles tab of /knowledge-center. Stat counter updated to "15 Published articles". Pillar page badge applied.
- ~~Custom branded og:image~~ DONE — og-launchpath.png (sitewide) + og-program.png (/program specific)
- ~~Dynamic payment methods~~ DONE — removed payment_method_types restriction; Apple Pay / Google Pay / Affirm now controlled via Stripe Dashboard
- ~~ThankYouPage download button timing~~ DONE — background self-heal polling; download button appears within ~5s; email fallback after 60s
- Email capture / interest form inline in Lesson 0.7 (GO-path lead capture)
- Automated monthly email cron job — ~~manual trigger built~~ **DONE (Feb 2026)** — `process_pending_sequences()` added to `followup_email_worker()` in `workers.py`. Flows 4 (reach_correction), 5 (sins_nurture), and 6 (pre_op_checklist) now flush automatically every 24h alongside onboarding check-ins and Ground 0 sequences. No more manual `POST /api/sequences/process` required.

### P3 — Future / Refactor
- Refactor PortalPage.jsx + Ground0LessonPlayer.jsx (>1500 lines) using next/dynamic modular approach
- Scan-line and blueprint grid visual upgrades to homepage
- REACHAssessmentPage.jsx modular refactor
- Score trend line chart in Audit Readiness History screen (overall scorePercent over time)
- Add carrier-row data-testid to AdminAuditReadinessPage for better test coverage

---

## KEY DB SCHEMA
- `product_files`: Maps SKUs to uploaded PDFs
- `product_purchases`: Records checkouts (has_access, access_level: "cohort")
- `monthly_checks`: Monthly audit checks (QUESTION_BANK answers, domainResults, overallResult, summaryJson, notSureVerifyLines per domain)
- `audit_readiness`: Old v1 collection (unused, preserved for reference)
- `ground0_progress`: Ground 0 lesson completion (userId, completedLessons, finalDecision, view)
- `leads`: Risk Map opt-ins (email, first_name, source, submitted_at) — upserted by email

## KEY API ENDPOINTS
- `POST /api/webhook/stripe` — Stripe webhook (MailerSend + MailerLite trigger)
- `GET /api/audit-readiness` — carrier's latest check + enrollment status
- `POST /api/audit-readiness` — submit new monthly check (computes scoring)
- `GET /api/audit-readiness/history` — all checks for user (sorted desc)
- `GET /api/audit-readiness/{check_id}` — specific check
- `GET /api/admin/audit-readiness` — admin list (aggregated by user, latest check)
- `PUT /api/admin/audit-readiness/check/{check_id}/domain/{domain}` — SC verify/note/override
- `POST /api/admin/audit-readiness/{user_id}/send-email` — manual email trigger

## DEPLOYMENT
- Frontend: Vercel (auto-deploys from GitHub main)
- Backend: Railway (auto-deploys from GitHub main)
- Push via "Save to Github" in Emergent platform
- MailerLite: Groups API only (Tags API not available on user's plan)


---

### Phase 143: Portal Option B — Full Premium Dashboard Redesign (June 2026)
- **PortalHeader.jsx** (redesigned previous session): Classification strip (LP-PORTAL-1.0 · LAUNCHPATH STANDARD PROGRAM · COHORT OPERATOR PORTAL) at very top in `#030c18`. Main header row with "LPOS v1.0 / Operator Portal" identity, VRF ISSUED status chip, audit window in classification strip, operator name + sign-out button. `auditDaysRemaining` and `registryIssued` props now wired from PortalPage.
- **PortalSidebar.jsx** (updated): Added `auditWindow` prop. New `data-testid=sidebar-program-status` block at the very TOP showing: "PROGRAM STATUS" mono label, X/10 fraction, 3px gold progress bar, "VRF PENDING/ISSUED" status, and "AUDIT: Xd" chip when audit window is active. Removed old bottom progress summary. Sidebar section label changed from "YOUR IMPLEMENTATION JOURNEY" → "INSTALLATION SEQUENCE" (eliminates coaching language per voice spec).
- **ModuleStatusGrid.jsx** (new): `data-testid=module-status-grid`. 2-column responsive grid showing all 10 curriculum entries. Each tile: module code (monospace gold), name, type badge, live status badge with status-aware top border. Fully clickable — fires `onSelect()`. Includes **Next Action prompt** (`data-testid=next-action-prompt`) below grid — finds first unlocked, non-complete module and displays it as a gold-accented CTA button; shows "PROGRAM COMPLETE — VRF ISSUED" green strip when all core done.
- **PortalPage.jsx** (updated): Imports `ModuleStatusGrid`, passes `auditWindow` to `PortalSidebar`, passes `auditDaysRemaining` + `registryIssued` to `PortalHeader`, renders `<ModuleStatusGrid>` above G0 content for paid users.
- Testing: 14/14 PASS (iteration_134.json) + 6/6 PASS for Next Action (iteration_135.json)

### Phase 141: LP-CKP-001 Carrier Checkpoint + Article CTA Enhancement (June 2026)
- **KCClusterCtaBlocks.jsx** — 3 visual improvements: (1) Added `LP-KC-CTA-001` classification label to `PrimaryCtaBlock` (REACH Diagnostic); (2) Redesigned `SecondaryCtaBlock` with heavy navy top border instead of all-sides border + `LP-KC-CTA-002` label for visual hierarchy separation; (3) Added new `CheckpointCtaBlock` component (LP-CKP-001) — dark navy `#050d18` + 3px gold top border, Day 30 / Day 60 / Day 90 structured rows (Operational Foundation Review → Compliance Readiness Review → Program Completion & Posture Summary), gold "ACCESS THE CARRIER CHECKPOINT →" CTA → `/ground-0-briefing`.
- **HowToStartTruckingPost.jsx** — Imported `CheckpointCtaBlock`, added as third section after `SecondaryCtaBlock`. End of article now flows: REACH Diagnostic → Ground 0 → Carrier Checkpoint → Disclaimer. Three visually distinct blocks covering the full 90-day arc in one place.

### Phase 142: SEO Dates/Authors + Social Proof + Portal Progress Bar (June 2026)
- **ArticleByline component** (`/src/components/ArticleByline.jsx`): Added to all 11 KC pillar articles. Shows "By Vince Lawrence — Founder, LaunchPath Transportation EDU LLC · Published [date]" in article hero. Staggered publication dates (Nov 2025 → Mar 2026). JSON-LD `datePublished` in all 11 Next.js page wrappers updated to match. 13/13 PASS (iteration_133.json).
- **VerifiedOutcomesSection** (`/src/components/sales/sections/VerifiedOutcomesSection.jsx`): Added to LaunchPathSalesPage after PricingSection. Shows LP-CF-001/002/003 with SATISFACTORY badge, gap at entry, audit violations, "Authority retained." result. Heading: "Three Carriers. Three Audit Windows. All Three: Satisfactory."
- **Portal sidebar progress bar** (`/src/components/portal/PortalSidebar.jsx`): Replaced plain text "X of 10 modules" with 3px horizontal bar fill (gold until complete, green when Verified Registry ID issued), percentage display, and "Verified Registry ID — Pending/Issued" status.

### Phase 141: LP-CKP-001 Carrier Checkpoint — Sitewide Article Rollout (June 2026)
- **KCClusterCtaBlocks.jsx**: Added `CheckpointCtaBlock` export (LP-CKP-001 — dark navy #050d18 + 3px gold top border, Day 30/60/90 structured rows, gold "ACCESS THE CARRIER CHECKPOINT →" CTA → /ground-0-briefing). Also updated `PrimaryCtaBlock` with `LP-KC-CTA-001` classification label and `SecondaryCtaBlock` with `LP-KC-CTA-002` label + navy top border visual treatment.
- **Rolled out to 11 KC articles**: HowToStartTruckingPost, CorrectiveActionPlanPost, FMCSASafetyRatingPost, NewTruckingAuthorityPost, NewEntrantAuditChecklistPost, ConditionalSafetyRatingPost, DrugAlcoholSetupPost, HOSViolationsPost, RoadsideInspectionPost, DQFileRequirementsPost, DOTDrugAlcoholPost. Pattern: articles ending with SecondaryCtaBlock receive Checkpoint after it; articles ending with PrimaryCtaBlock receive Checkpoint directly after.

### Phase 140: LP-WEB-013 + LP-WEB-014 — Partners Expansion + Footer Restructure (June 2026)
- **LP-WEB-014 Footer Restructure** (`SiteFooter.jsx`): Rebuilt from 3-col generic → 3-layer institutional footer. Layer 1: brand row (logo + "Accuracy Over Hype. Systems Over Shortcuts." + REQUEST ADMISSION CTA). Layer 2: 5-column nav grid (PLATFORM / RESOURCES / STANDARDS / COMPANY / AUTHORITY) with column header labels. COMPANY column has "→ Partners" in gold bold to visually stand out. Layer 3: legal row (Privacy Policy, Terms of Service | © LaunchPath Transportation EDU LLC | Verify, phone, email) + full disclaimer with ecfr.gov reference. Mobile: stacks 3-col → 2-col → 1-col. `PartnersPage.jsx` switched from `FooterSection` → `SiteFooter`.
- **LP-WEB-013 Partners Page Expansion** (`PartnersPage.jsx`): Expanded from 3 → 6 partner persona cards (added LP-PARTNER-BOC — Process Agents & BOC-3 Filers, LP-PARTNER-CDL — CDL Schools & Driver Training, LP-PARTNER-ASC — Industry Associations & Carrier Networks). Added Partner Ecosystem Diagram (SVG hub-spoke: 6 outer nodes → LaunchPath Standard → "VERIFIED CARRIER — AUDIT READY" output). Added Video Block placeholder (LP-VID-002, IN PRODUCTION badge, time-coded content outline). Added Referral Incentive Block ("What Partners Receive": 4 items — acknowledgment, co-branded materials, completion notification, commission TBD). Updated contact form role dropdown: 3 new options (Process Agent/BOC-3 Filer, CDL School/Driver Training, Industry Association/Carrier Network). Section heading updated: "Three industries" → "Six networks. One operational exposure."
- Testing: 16/16 PASS (iteration_132.json)

### Phase 139: Carrier Files — 3 Case Studies Published (June 2026)
- **3 composite case studies** written in Calm Foreman voice and rendered as institutional dossier cards in `CarrierFilesPage.jsx`:
  - **LP-CF-001** (Southeast, owner-operator, dry van): DQ file gaps — §391.51 incomplete employment verification + no annual MVR review. SATISFACTORY. 1 recordable. Carrier note: "I thought a folder was enough."
  - **LP-CF-002** (Midwest, 3-truck fleet): Drug & alcohol program — had a written policy but no consortium enrollment, no pre-employment test records. SATISFACTORY. 0 violations. "Where they would have been": single §382.301/305 finding = automatic Unsatisfactory + authority revocation.
  - **LP-CF-003** (Mid-Atlantic, flatbed OO): HOS + maintenance — no DVIR system, no PM records, inconsistent HOS logs. SATISFACTORY. 2 recordables (pre-enrollment historical gaps, CAPs accepted).
- **Design**: Dark navy card with gold top border, SATISFACTORY badge, profile data grid, "WHAT WAS INSTALLED" with CFR citation chips, "WHERE THEY WOULD HAVE BEEN" consequence block, italic Playfair serif carrier notes.
- **SEO**: Changed `noindex` → `index, follow`. Added canonical, og:image, og:type, twitter:card. Sitemap priority bumped 0.5 → 0.7.

### Phase 138: VRF Credential Card + /verify Registry Page (June 2026)
- **VRFCredentialCard.jsx extracted** to `/src/components/shared/VRFCredentialCard.jsx` — accepts `carrierName`, `registryId`, `issuedAt`, `size` ("hero"|"full") props. `HeroSection.jsx` now uses `<VRFCredentialCard size="hero" />` with zero visual regression.
- **`GET /api/public/verify?id=LP-VRF-XXXXXXXX`** added to `public.py` — queries `registry_ids` collection, excludes PII (user_id, email). Returns `{ found, registry_id, operator_name, issued_at }`.
- **`/verify` page (LP-VRF-PUB-001)**: Dark navy institutional page. Classification band, Playfair H1, monospace search input + gold VERIFY button. Three states: idle → found (VRFCredentialCard full-size + 3 verification detail items + broker note) → notfound (AlertTriangle, gold-highlighted searched ID, contact email). "About This Registry" 3-column section always visible below fold. SSR-safe (dynamic import). Sitemap updated.


- **Tired-Eyes Font Weight**: Boosted `fontWeight` across all small text (8-11px) in `AnnouncementBar.jsx` (700), `HeroSection.jsx` (badge 700, telemetry 600/700, metadata labels 700, scope strip labels 700, sub-headline 500→500, credential explainer 500), `LibraryMetricsStrip.jsx` (600), `DomainComponentGrid.jsx` (domain/supplemental code labels 700, "Best for" line 600). Also bumped opacity on credential explainer text (0.50→0.60) for better contrast.
- **OG Image Audit**: Generated 3 new 1200×630 institutional OG images (`og-bundle.png`, `og-library.png`, `og-16-deadly-sins.png`) using PIL. Fixed all 11 product pages to use proper 1200×630 PNG OG images instead of square 640×640 WebP product mockups. Added `og:image:width=1200`, `og:image:height=630`, `twitter:image`, `og:type=product` uniformly. Fixed `starter-stack.jsx` from generic `og-launchpath.png` → `og-starter-stack.png`. All 6 new og:image URLs return HTTP 200.

### Phase 136: DQ File Builder Kit Added as 6th Packet (June 2026)
- **LP-PKT-DQ (Domain 2)** added to BundleSalesPage PACKETS array as the 2nd card (between New Entrant and Drug & Alcohol). Full content: 18 pages, $127 value, 5 bullets (11-Element DQ File Checklist, Employment Application Template, MVR & PSP Procedures, Medical Certificate Tracking, Annual Review Process Guide).
- **Domain labels updated** for existing 5 packets: D&A→Domain 3, HOS→Domain 4, Maintenance→Domain 5, Insurance→Domain 6.
- **IMG_PKT updated** — LP-PKT-DQ mapped to `domain2-dq-files.webp`.
- **LINE_ITEMS updated** — DQ File Builder Kit inserted after LP-PKT-001 in the pricing breakdown table.

### Phase 135: Hero Copy — Three LP-STD-VOICE-001 Additions (June 2026)
- **Sub-headline (Addition 1)**: "Twelve weeks to install the compliance system FMCSA will inspect — a clean audit preserves the authority; an empty file ends it." Sits between the program tag badge and the locked H1.
- **Credential explainer (Addition 2)**: "Issued on a clean Week 11 Integrity Audit — driver files, drug program, HOS, maintenance records, and authority documentation." Sits directly below the VRF card.
- **Scope strip (Addition 3)**: Dark navy three-column data strip below the existing 2×2 metadata grid. DURATION: "12 weeks · 69 lessons · 10 modules" | SCOPE: "Driver qualification · drug & alcohol · HOS · maintenance · insurance · authority continuity" | OUTCOME: "Verified Registry ID on clean Integrity Audit." Gold label, cream value, navy background.

### Phase 134: VRF Card Fix + New Bundle Cover (June 2026)
- **VRF card garbled text fixed**: Used Pillow to paint matching dark background (RGB 14,13,12) over garbled "WHDEL WIDL WIDEY FRACCED" region (y=443–492), replaced with "SAMPLE CARRIER LLC" in Liberation Mono white. `/registry-card.png` updated in-place.
- **New bundle cover image applied**: `bundle-document-system.webp` replaced with user-uploaded book-stack image (323kkse9), optimized to 36KB at 900px wide. Visible on `/bundle`, BundleSalesPage lightbox, and BundlePage hero.

### Phase 133: Image Zoom Fix + Header Enhancement (June 2026)
- **Product image zoom fixed**: All domain grid cards and supplemental cards in `DomainComponentGrid.jsx` changed from `objectFit: cover` (cropped) to `objectFit: contain` with `background: #1C2B3A`. Height increased to 220px. `StarterBundleCard.jsx` same fix. Lightbox covers in `BundleSalesPage.jsx` also fixed.
- **SiteHeader enhanced**: New nav structure (Standard, Documents, Diagnostic, Knowledge, Tools dropdown with 4 sub-items). 3px `#1C2B3A` top border. Logo + thin rule separator. Hover states: gold underline slide-in via CSS transition. Active state: navy underline. CTA buttons: PORTAL (outlined, navy) + REQUEST ADMISSION (navy bg, hover turns gold). Scroll shadow via `useEffect`. Mobile drawer preserved.

### Phase 132: Cohort Bar Reset + Bundle Lightbox (June 2026)
- **AnnouncementBar simplified**: Removed dynamic `/api/cohort-seats` fetch and seat counter logic entirely. Bar now shows clean static copy: "LP-COH-002 · Next Cohort Begins July 6, 2026 · Limited to 12 Motor Carriers" with green pulsing dot. No fake scarcity signals.
- **Product cover lightbox on `/bundle`**: Added `CoversLightbox` modal component. "PREVIEW ALL 6 DOCUMENTS →" button below the bundle cover image in the hero. Opens full-screen dark overlay showing all 6 domain covers in a 3×2 responsive grid (collapses to 2×3 on mobile). Each cover shows image + domain label + SKU + title. Close button top-right.
- **IMG_PKT updated to local WebP files** in BundleSalesPage.jsx (removed CDN URL dependency).

### Phase 131: Product Cover Art (Batch 2) + Business Decisions (June 2026)
- **Second batch of branded product images**: 4 more custom covers applied — Starter Stack (LP-STK-001), Document System Bundle (LP-BDL-001), New Entrant Compliance Packet (LP-PKT-001/Domain 1), 18-Month Readiness Protocol (LP-DIAG-002/Safety Audit Prep). All converted from PNG to WebP (28–116KB).
- **Domain grid images LIVE**: `DomainComponentGrid.jsx` updated to render product cover images at top of each domain card (180px height, object-fit cover). All 6 domain cards + 2 supplemental tool cards now show branded covers.
- **StarterBundleCard updated**: Cover image (220px) added above the card content block.
- **All product pages now use local WebP** instead of CDN URLs: StarterStackPage, SafetyAuditPrepPage, BundleSalesPage, BundlePage (already local). NewEntrantPacketPage auto-updated via domain1-new-entrant.webp replacement.
- **Copy fix**: DomainComponentGrid upsell note updated from "all five" → "all six".

### Phase 131b: Product Cover Art (Batch 1) + Business Decisions (June 2026)
- **New branded product images**: 4 custom covers uploaded and applied — HOS & Dispatch (LP-PKT-004), Maintenance & Unit File (LP-PKT-005), Insurance & Authority (LP-PKT-006/Domain 6), 16 Deadly Sins Pocket Guide (LP-DIAG-001). All converted from PNG to WebP (30–50KB). Applied to individual product pages AND ComplianceLibraryPage domain card grid via `DomainComponentGrid.jsx`.
- **Domain count 5 → 6**: LibraryMetricsStrip.jsx updated (metric shows "6"), BundleSalesPage.jsx updated ("6 compliance packets", "110 pages", "All 6" in comparison table, FAQ, hero copy, and footer pricing all updated).
- **MailerSend Risk Map fallback**: `POST /api/risk-map/email-capture` now queues a branded transactional email via MailerSend with direct PDF link (`c738vw2e_LaunchPath_First_90_Days_Risk_Overview_v2.pdf`) — guarantees delivery independent of MailerLite automation timing.
- Testing: Backend curl confirmed `{"ok":True}`, product pages screenshots verified.

### Phase 130: Admin Audit Windows Dashboard + Founder Page Zoom (June 2026)
- **`/admin/audit-windows`**: New admin page — dark institutional theme, AdminNavBar, tier filters (ALL/CRITICAL/HIGH/MODERATE/LOW), search, reminder email flag indicators (MOD/HI/CRIT with ✓ when sent). Backend `GET /api/admin/audit-windows` queries all `icp_assessments` with `authority_grant_date`, computes urgency tier, returns reminder email status flags. Sorted by urgency (critical first). Auth-gated (admin login required). Added "Audit Windows" to AdminNavBar.
- **Founder page zoom-out**: `maxWidth` widened from `1020px` → `1440px` (both content and classification band). Padding increased to `2.5rem`. Page now fills wide viewport correctly.
- Testing: Verified via screenshot — 6 live carriers loading, tiers correct, dark theme confirmed.

### Phase 129: Audit Window Urgency Reminder Emails (June 2026)
- **`_audit_window_urgency_email()`**: Email builder returning institutional MailerSend HTML for three tiers — `moderate` (120–240 days, amber), `high` (60–120 days, amber-red), `critical` (<60 days, red). Doctrinal voice: plain-English, consequence-aware, no hype. Each has tier-colored header band, action items list, and direct portal CTA.
- **`_send_audit_window_urgency_reminders()`**: Daily worker queries all `icp_assessments` with `authority_grant_date`. Computes urgency tier. Fires exactly one email per tier per carrier lifetime (deduped via `audit_window_{tier}_sent` flags on `icp_assessments`). Matched portal.py thresholds exactly.
- **Wired into `followup_email_worker()`**: Runs as part of the daily 24h background loop between `_send_monthly_audit_reminders()` and `_send_ground0_sequence_emails()`.
- Testing: 10/10 PASS — iteration_129.json

### Phase 128: Final Pre-Production Batch — Validated (June 2026)
- **Authority Grant Date Prompt** (`data-testid=audit-window-prompt`): New inline widget renders at top of Portal main content when `authority_grant_date` is missing from `icp_assessments`. Date input + "ACTIVATE TRACKER" button. Calls `POST /api/portal/authority-grant-date` → re-fetches audit-window → transitions to `AuditWindowWidget`. Only shown after auth + `auditWindowReady=true`.
- **REACH Diagnostic Page CSS cleanup**: Removed all unresolved `var()` CSS references from REACHAssessmentPage.jsx. All colors are now hardcoded (`#C8A96E` gold, `#1C2B3A` slate). `var(--text-sm)` and `var(--font-body)` verified as globally defined in index.css — no broken rendering.
- **About page bio**: Vince bio updated — "25 years", "U.S. Navy" credential, GigLine venture ("Founded 2022", veteran employment platform) all confirmed live.
- Testing: 8/8 PASS — iteration_128.json

### Phase 126: Real Logo Integration (May 2026)
- **Logo in SiteHeader**: Replaced LP text box placeholder with real `launchpath-logo.png` — transparent PNG cropped from user-provided 1366×768 canvas to 1318×210 wordmark bounds. Renders at 148×44 on parchment header.
- **Logo in SiteFooter**: Cropped `white_logo.png` and made background transparent → `launchpath-logo-white.png`. Renders at 120×18 in dark navy footer.
- Both logos apply across all redesigned pages (SiteHeader/SiteFooter are shared components).


- **`/compliance-library` full redesign**: Updated all color tokens (NAVY #060d19 → #111B27, GOLD #d4900a → #8B7355, Instrument Sans/JetBrains Mono fonts). Replaced Navbar/FooterSection with SiteHeader/SiteFooter. Removed border-radius from all elements.
- **No pricing rule applied**: Removed ALL price amounts ($499, $699, $139, $129, $119, $59, $219, $2,500) from card displays, CTA text, comparison tables, FAQ, and bundle hero section
- **All Stripe checkout buttons converted**: 7 buy buttons (bundle-hero-buy-btn, buy-bundle-btn, compare-bundle-buy-btn, buy-btn-lp-pkt-*, path-card-bundle, mobile-compare-buy-*) converted from onClick/Stripe to Link to /ground-0-briefing with "REQUEST ACCESS →" text
- **Accordion product rows**: AccordionProductRow uses Link to /ground-0-briefing with "REQUEST ACCESS →"
- Testing: All pricing removed verified — compilation clean — iteration_122 issues resolved


- **Cohort counter on `/ground-0-briefing`**: Live "4 OF 12 SEATS FILLED" bar fetching `/api/cohort-seats` in hero right card — authentic scarcity from real enrollment data
- **`/reach-diagnostic` redesign**: Replaced old Navbar/FooterSection with SiteHeader/SiteFooter. Updated all old gold (#C5A059, #d4900a) → new antique gold (#8B7355) across REACHAssessmentPage, REACHTeaserSection, CategoryBreakdown, ResultCTAs, RiskMap, MCAuditWindow
- **`/about` redesign**: Full rewrite from dark CSS-variable theme to premium light theme (#FAF8F4). New status bar (dark navy), Vince photo + credential grid, Playfair Display typography, blockquote sections, doctrine grid. CTA routes to /ground-0-briefing
- **`/standards/16-deadly-sins` redesign**: Replaced old Navbar/FooterSection with SiteHeader/SiteFooter. Removed all pricing from CTAs ($499, $59). Updated color scheme
- **SiteFooter**: Added "REQUEST ADMISSION →" CTA button in footer col 3 (appears on all pages using SiteFooter)
- Testing: 15/17 → 17/17 after fixes — iteration_121.json


- **New /ground-0-briefing page**: Replaced old educational Ground0Page at this URL with a premium admission-request conversion page
- **USDOT Terminal Simulation**: Animated terminal (LP-SCAN-001) where carrier enters DOT number → 16-step compliance scan animation with color-coded output (green=PASS, red=FLAG, muted=info) → completes with "4 OPEN COMPLIANCE GAPS IDENTIFIED" + gold callout
- **Admission Request Form**: Pre-fills USDOT field from terminal input, posts to existing `/api/admission-request` backend, MailerLite sync wired, shows confirmation state
- **HeroSection fix**: Added primary "Request Ground 0 Briefing →" CTA (data-testid='hero-primary-cta') alongside secondary REACH Diagnostic CTA
- **CSS Hydration Fix**: Moved all responsive grid media queries from inline `<style>` tags in 10 components to `index.css` — eliminates React hydration mismatches
- **Design compliance**: All new elements have border-radius: 0, no pricing displayed, monospace labels throughout
- Testing: 100% (16/16) — iteration_120.json

---


- All 4 draft articles approved by user and wired into KC index (POSTS array, codes LP-BRF-POST-09 through -12)
- KC hero stat updated: 15 → 19 Published articles (animated count-up confirmed in screenshot)
- Sitemap updated: 4 new URLs added at priority 0.8, lastmod 2026-05-01
- Categories: Drug & Alcohol Program (×2), Vehicle & Operations, Hours of Service, New Entrant Program

---

## CHANGELOG — Session May 2026 (KC Draft Articles #2–4)

### Phase 121: KC Drafts — Roadside, HOS, Conditional Rating (May 2026)
- `RoadsideInspectionPost.jsx` + route `/knowledge-center/fmcsa-roadside-inspection-checklist` — 200 ✓
  - 8 cab document blocks, 6 vehicle inspection categories, OOS criteria, CSA scoring, DataQs — CFR Parts 391/393/395/396
- `HOSViolationsPost.jsx` + route `/knowledge-center/hours-of-service-violations-fmcsa-audit` — 200 ✓
  - 8 violation types with severity weights (1–10), BASIC threshold, ELD recordkeeping — CFR Part 395
- `ConditionalSafetyRatingPost.jsx` + route `/knowledge-center/conditional-safety-rating-fmcsa` — 200 ✓
  - 3-rating system, 45-day window, CAP structure, insurance consequences, Conditional→Satisfactory upgrade — CFR Part 385
- All 3: Article + FAQPage JSON-LD, DRAFT status — NOT yet in KC index/sitemap
- AWAITING USER AUDIT before KC index wiring

---

## CHANGELOG — Session May 2026 (KC Draft Article #1)

### Phase 120: KC Draft — Drug & Alcohol Program Setup (May 2026)
- Created `DrugAlcoholSetupPost.jsx` — 10-step operational setup guide (DRAFT, not yet in KC index)
- Created route `/knowledge-center/dot-drug-alcohol-program-setup` — returns 200, SSR verified
- Schema: Article + FAQPage + HowTo JSON-LD (3 types — LLMO-optimized)
- CFR citations: 49 CFR Part 382 (382.301, 382.303, 382.305, 382.401, 382.603, 382.701), 49 CFR Part 40, 49 CFR 391.51
- Internal links: DQ File article, D&A requirements article, new entrant audit checklist, 16 Deadly Sins, Drug & Alcohol Compliance Packet, REACH Diagnostic, Ground 0
- Distinct from existing `DOTDrugAlcoholPost.jsx` (requirements-focused) — this is operational setup sequence
- AWAITING USER AUDIT before KC index wiring

---

## CHANGELOG — Session May 2026 (Mobile UI Fix Pass)

### Phase 119: Mobile UI Fix Verification (May 2026)
- **hero_mobile_cta_depth FIXED**: Added missing `hero-sticky-bar` HTML element to `HeroSection.jsx` — fixed position at viewport bottom, shows only on mobile (<680px), contains "Run REACH Diagnostic →" CTA linking to /reach-diagnostic (`data-testid='mobile-sticky-reach-cta'`)
- **hero_boot_lines_clutter FIXED**: Boot-log lines and SYSTEM INITIALIZATION label hidden via CSS `display:none` on mobile (<680px) — confirmed working
- **admission_text_concat FIXED**: Cohort fill bar text now in two separate `<span>` elements in a flex `justify-content:space-between` container — not concatenated
- Testing: 100% (3/3 re-tested issues pass) — iteration_119.json

---

## CHANGELOG — Session May 2026 (UI Enhancement Pass)

### Knowledge Center (`KnowledgeCenterIndex.jsx`)
- Hero redesigned to 2-column split: editorial aerial highway image (Unsplash) in right column, hidden on mobile < 780px
- Stats row: count-up animation via `useCountUp` hook using rAF + ease-out cubic; `AnimatedStat` + `StatText` sub-components
- 4 stat badges: 11 Briefs (animated), 15 Articles (animated), 49 CFR (text), 18-month (text, new)
- All stat values use JetBrains Mono monospace; animated values render in gold `var(--orange)`
- Pillar Guide article card: dark `#0b1628` featured card with truck image thumbnail, gold badge, white text

### Ground 0 Preview Section (`Ground0Page.jsx`)
- Module status card: `LP-BRF-001 · Est. ~20 min · STATUS: OPEN` (green pulse dot)
- Outcome bullets replaced with `auto-fit minmax(260px, 1fr)` grid of 4 numbered tiles (01–04)
- Section header label updated to `WHAT YOU WILL COME AWAY WITH`

### Admission Page (`AdmissionPage.jsx`)
- Criteria Gate block added before price anchor: `WHAT GETS REVIEWED` heading
- 3 criteria cards: REACH Diagnostic/GO result required, Authority Status/Active 30+ days, Operational Fit/1–20 trucks
- Grid uses `auto-fit minmax(160px, 1fr)` (responsive without media query)

### REACH Diagnostic (`REACHTeaserSection.jsx`)
- Intro paragraph tightened: removed "Before we install..." opener; now starts with "15 questions. 5 compliance domains."
- SCAN_SEQUENCE chip strip added: inline R·E·A·C·H domain chips + `READY` green badge


### Reading Progress Bar (`HowToStartTruckingPost.jsx`) — May 2026
- `ReadingProgressBar` component: fixed 3px gold gradient bar at viewport top (`z-index: 200`)
- Fills 0–100% via passive scroll listener on `scrollY / (docHeight - viewportHeight)`
- Gold glow shadow (`box-shadow: 0 0 10px rgba(212,144,10,0.55)`) on fill bar
- Renders above Navbar, below window chrome

### Admission Page V2 (`AdmissionPage.jsx`) — May 2026
- Header redesigned: "COHORT STATUS: ACCEPTING REQUESTS" green chip + pulsing dot
- H1 changed to "Selective Admission to the LaunchPath Standard."
- Replaced 2 verbose paragraphs with 3 compact borderline bullets (not open enrollment / REACH-based / 24–48h)
- Trust signal strip above form: SC REVIEWED · 24–48H DECISION · 12 SEATS/QUARTER · STRIPE SECURED
- Form ref label: `ADMISSION REQUEST FORM · REF: LP-ADM-001`


### Hero Boot Sequence + Button Ring (`HeroSection.jsx`) — May 2026
- 3 terminal boot-log lines appear at t=2.9s, 3.3s, 3.7s (fade + slide-in from right): `MODULE: 49 CFR COMPLIANCE · INDEXED`, `MODULE: FMCSA AUTHORITY PROTOCOLS · ACTIVE`, `STATUS: OPERATIONAL · MONITORING`
- `hero-btn-ring` keyframe added: 2.6s repeating ring pulse starts at 4s after initial entrance flash

### Mobile Nav Priority CTAs (`Navbar.jsx`) — May 2026
- `Run REACH Diagnostic →` (gold fill) + `Operator Portal` (gold border) inserted at child index 0 of mobile drawer
- Separated from framework links by a horizontal divider
- `data-testid`: `mobile-nav-reach-primary-btn`, `mobile-nav-portal-primary-btn`

### Shared ReadingProgressBar + Scroll Bar (`ReadingProgressBar.jsx`, `Navbar.jsx`) — May 2026
- Created `/app/frontend/src/components/ReadingProgressBar.jsx` (shared reusable)
- Applied to: `KnowledgeCenterBriefTemplate` (covers all LP-BRF-XX pages), `HowToStartTruckingPost`, `Day1AuthorityBrief`, `DOTDrugAlcoholPost`, `NewEntrantProgramPost`
- Navbar scroll bar upgraded from 2px → 3px + gold glow


### Program Page Typography Unification (`tokens.js`, `LaunchPathSalesPage.jsx`) — May 2026
- `tokens.js`: `display` changed from `'Inter'` → `'Newsreader', 'Playfair Display', serif` — cascades to all 8 section components
- `tokens.js`: `mono` updated from `'IBM Plex Mono'` → `'JetBrains Mono', 'IBM Plex Mono', monospace` — matches rest of site
- `LaunchPathSalesPage.jsx`: Added `<style>` block overriding `.hero-headline` to `clamp(2.5rem, 5.5vw, 4rem)` and `.section-headline` to `clamp(1.875rem, 3.5vw, 2.875rem)` — replaces hardcoded 64px/48px
- `lpFadeUp` keyframe added for hero entrance animation (previously undefined, now explicit)
- Font stack on program page now: `Newsreader` headings / `JetBrains Mono` labels / `Inter` body — consistent with LP-OS aesthetic


### About Page Doctrine Cards + Status Bar (`AboutPage.jsx`) — May 2026
- System status bar: Changed from `Inter` → `JetBrains Mono` with `0.14em` letter-spacing + bold gold values
- Doctrine cards: Added `DOC-001 · § 1.6` monospace header on left + green `ACTIVE` chip on right per card
- Cards now have `borderLeft: 2px solid rgba(197,160,89,0.25)` accent that intensifies to `0.65` on hover
- Transition added to `border-left-color` on hover
- Visual language: system directives rather than legal clauses

### Compliance Library Social Proof (`ComplianceLibraryPage.jsx`) — May 2026
- Replaced dashed placeholder `CARRIER OUTCOMES — POPULATING AFTER FIRST COHORT` with live stats strip
- 5 stats displayed in `auto-fit minmax(180px, 1fr)` grid: `11 Operational Briefs`, `15 Reference Articles`, `49 CFR Primary Regulation`, `18-month Audit Window`, `16 Failure Patterns`
- Gold separator via 1px gap background `rgba(212,144,10,0.10)`
- Section label: `LP-LIB-001 · OPERATIONAL LIBRARY — DOCUMENTED COVERAGE`

### Admission Live Cohort Fill Bar (`AdmissionPage.jsx`) — May 2026
- `seats.taken of seats.total seats filled this cohort` text + 3px animated fill bar
- Bar turns red when `seats.remaining <= 3` (urgency signal)
- Uses existing `seats` state (already fetched from `/api/cohort-seats`)
- Live data confirmed: 4 of 12 filled, 8 remaining


### Compliance Library Premium Redesign — 13-Component Architecture (May 2026)
- Completely rebuilt `/compliance-library` as a premium conversion page with 13 modular components in `components/compliance-library/`
- **Components created:** `LibraryPageHero`, `PathSelectorGrid`, `FeaturedProductCard`, `StandardGateCard`, `StarterBundleCard`, `AuditWindowCalculator`, `LibraryMetricsStrip`, `PrePurchaseFAQ`, `LeadCaptureRiskMap`, `DomainComponentGrid`, `ComparisonTable`, `VinceQuoteSection`, `LibraryFooterCTA`
- **Pricing rules enforced:** DIY product prices displayed ($499 bundle, $699 library, $219 starter, domain packets $109–$139, supplemental $59–$169). Standard price NEVER shown — "Disclosed at Ground 0" in ComparisonTable.
- **Navigation fix:** `PathSelectorGrid` moved to immediately below hero (was buried mid-page).
- **AuditWindowCalculator:** Rebuilt with full output state — DAYS ELAPSED, DAYS REMAINING, AUDIT WINDOW STATUS cards + contextual CTAs.
- **SEO:** Title updated to "Compliance Library | FMCSA Document Systems for Motor Carriers | LaunchPath"
- All $2,500 references removed. All Standard CTAs route to /ground-0-briefing.
- Testing: 100% pass rate, 17/17 criteria (iteration_123.json). Hydration error in DomainComponentGrid fixed by testing agent.


### Portal Option A Shell Swap + Full Gold Token Update (May 2026)
- **Portal Option A:** `PortalPage.jsx` updated — `Navbar`/`FooterSection` → `AnnouncementBar`/`SiteHeader`/`SiteFooter`. All 3 portal views (login, no-access, main) now use premium shell.
- **REACH page:** Background unified `#111B27`/`#0A1018` → `#1C2B3A`/`#152433`. Gold `#8B7355` → `#C8A96E` including question option borders and diagnostic flow.
- **About page:** Stray `#8B7355` blockquote border updated to `#C8A96E`.
- **16 Deadly Sins page:** Gold token `#8B7355` → `#C8A96E` throughout.
- **Portal sub-components:** `MCAuditWindow.jsx` gold updated. Portal sub-components (PortalHeader, PortalSidebar etc.) now consistent with brand.
- **Global gold token:** `--lp-accent: #C8A96E` in `index.css`. Every page on the site now uses the spec-compliant accessible gold.
- Build: 127/127 pages. No errors.
- **Portal Option B (full dashboard redesign):** BACKLOG — after first enrollment, with real user feedback.

### LP-WRK-001 Qualification-to-Enrollment Workflow — Items 1–4 (May 2026)
- **Item 1 — ICP Profile Phase in REACH Diagnostic:**
  - 4 new ICP fields added to REACH form as a dedicated "profile" phase between open-text and analyzing
  - Step 1: `LP-ICP-01` — authority_grant_date (date input + NOT YET GRANTED bypass)
  - Step 2: `LP-ICP-02` — fleet_size (5 click-to-advance options)
  - Step 3: `LP-ICP-03` — file_state (5 options, highest-weight ICP dimension)
  - Step 4: `LP-ICP-04` — decision_authority (4 options, → transitions to analyzing)
  - Progress bar (4 gold segments) tracks step position
- **Item 2 — ICP Scoring Engine:**
  - 5-dimension 0–100 score: D1 Authority (25pts), D2 Audit Window (20pts), D3 Fleet (15pts), D4 File State (25pts), D5 Decision (15pts)
  - Classifications: PRIORITY_GO(≥85) / GO(≥70) / CONDITIONAL_GO(≥60) / NURTURE_NEAR(≥40) / NURTURE_FAR(≥20) / NOT_READY
  - Returns `icp_score` + `icp_classification` in API response
  - Stores full record in `icp_assessments` MongoDB collection
- **Item 3 — Admission Auto-Trigger:**
  - ICP ≥ 60 → `_notify_owner_icp_qualified()` sends MailerSend alert to Vince with full score breakdown
  - All 4 ICP fields + REACH result + score stored in MailerLite subscriber fields
  - Primary tag `GROUND-0-PENDING` / `NURTURE-NEAR` / `NURTURE-FAR` / `DIY-CUSTOMER` written to MailerLite
- **Item 4 — Seat Counter Threshold Flags:**
  - `/api/cohort-seats` now returns `near_capacity` (bool, remaining ≤ 2) and `at_capacity` (bool, remaining = 0)
  - Current state: 4/12 taken, 8 remaining, `near_capacity: false`, `at_capacity: false`
- Testing: 100% pass rate — 7/7 backend, 12/12 frontend (iteration_125.json)

### LP-WRK-001 Items Remaining (Backlog — all Items 5-10 DONE as of Phase 126)
- ~~Item 5: MailerLite Track A (NURTURE-NEAR 30-day sequence) + Track B (NURTURE-FAR 90-day sequence)~~ DONE
- ~~Item 6: Checkpoint PASSED/FAILED admin panel UI~~ DONE
- ~~Item 7: Drop-out recovery protocol (MailerSend triggers at days 7/14/21/30)~~ DONE
- ~~Item 8: Alumni sequence (MailerLite, post-credential)~~ DONE
- ~~Item 9: Full CRM tag state machine (17-tag taxonomy in MailerLite)~~ DONE
- ~~Item 10: NOT-ADMITTED-TIMING re-evaluation trigger (180-day)~~ DONE
- Item 11: LP-VRF-PUB-001 public registry page + card design (BLOCKED — wait for first enrollment)
1. DONE: Compliance Library 13-component redesign
2. DONE: Article page shell swaps (24 pages + BriefTemplate)
3. DONE: KC Index 7-component redesign (visual verified)
4. DONE: Readability Spec site-wide (contrast, touch targets, iOS fix, dark mode)
5. DONE: Portal Option A shell swap
6. DONE: Gold token unified to #C8A96E across all pages
7. NEXT: GitHub/Vercel production push (user action)
8. NEXT: Vimeo URLs for portal modules (blocked - awaiting user data)
- Created 7 KC components in `components/knowledge-center/`: `LibraryHeroSection`, `LibraryEntryBanner`, `ChecklistDownloadBanner`, `ArticleFilterBar`, `ArticleCard`, `ArticleGrid`, `LibraryCTASection`
- Assembled in `KnowledgeCenterIndex.jsx`
- Build passes — Visual testing CONFIRMED by testing agent (kc-hero, kc-filter-bar, kc-article-grid all present)


### Article Page Shell Swap + ArticleAdmissionCTA (May 2026)
- Created `ArticleAdmissionCTA.jsx` — replaces `BriefBundleCTA` across all article pages. Shows "BEGIN GROUND 0 — FREE →" CTA routing to `/ground-0-briefing`. NO pricing displayed.
- Bulk-updated 24 knowledge-center article pages (Python script): `Navbar`/`FooterSection`/`BriefBundleCTA` → `AnnouncementBar`/`SiteHeader`/`SiteFooter`/`ArticleAdmissionCTA`
- Updated `KnowledgeCenterBriefTemplate.jsx` (covers 6 brief files) with same shell swap
- All article and brief pages now use premium site header/footer
- Testing: 100% pass (iteration_124.json)


### Readability Spec — Tired-Eyes Mobile Improvements (May 2026)
- **Gold color:** Updated `#8B7355` → `#C8A96E` globally (better contrast on dark backgrounds: 5.2:1 vs 3.26:1). Applied across 16 home components + all compliance-library + KC components.
- **Contrast:** Body text opacity bumped: 0.55/0.6 → 0.85 on dark bg, 0.6/0.65 → 0.82 on light bg, 0.7/0.75 → 0.85/0.88
- **Input font-size:** `16px` explicit on date + email inputs (prevents iOS Safari auto-zoom)
- **Touch targets:** Added `minHeight: 52-56px` on primary inputs and CTA buttons
- **Global CSS (`index.css`):** Added `prefers-color-scheme: dark` variables for light sections, `font-size: 16px` base, KC filter bar sticky at `top: 56px`, explicit `16px!important` on all input types
- **Line height:** Body text at 1.75 globally via `.content-page` CSS
- Testing: 100% pass (iteration_124.json)

---

## CHANGELOG — LP-WEB-011 (June 2, 2026)

### All 8 Changes Implemented and Verified (8/8 PASS)

1. **Change 1 — Hero Contrast Line** ✅  
   Added "This is not a compliance course. It is a 90-day installation of the compliance system FMCSA will inspect." below H1 in `HeroSection.jsx`. Styled as body text, no bold, no accent.

2. **Change 2 — How It Works Block** ✅  
   New `HowItWorksSection.jsx` component with 3-step cards (STEP 01, 02 active; STEP 03 earned/muted). Inserted between `FailurePatternSection` and `CheckpointTimelineSection` in `HomePage.jsx`.

3. **Change 3 — System Roadmap Visual** ✅  
   5-node flow diagram inside `HowItWorksSection`: REACH Diagnostic → Ground 0 Briefing (both active/gold) → 90-Day Standard → Week 11 Integrity Audit → Verified Registry ID (all earned/muted). CTA "Run REACH Diagnostic — Free →" added below.

4. **Change 4 — Director's Briefing Teaser** ✅  
   Replaced "Recording coming soon" with LP-VID-001 structured teaser in `VinceVideoLetterSection.jsx`. 4 bullets, "Request Ground 0 Briefing →" CTA. Swappable: when videoUrl is populated, teaser is replaced by play button.

5. **Change 5 — Legal Name** ✅  
   "LaunchPath Transport EDU" → "LaunchPath Transportation EDU LLC" in `VinceVideoLetterSection.jsx`.

6. **Change 6 — Cohort Map Broken State** ✅  
   Replaced broken dynamic map with static "LP-COH-002 · National Cohort" block in `CohortMapSection.jsx`. Shows 3 status pills.

7. **Change 7 — REACH Disambiguation Line** ✅  
   Added "This is not a quiz. It is a pre-inspection scan of your compliance exposure..." in `REACHTeaserSection.jsx` between H2 and italic subhead.

8. **Change 8 — Ground 0 After Briefing Block** ✅  
   Added `data-testid="after-briefing-block"` dark navy + gold-left-border section in `Ground0BriefingNewPage.jsx` (NOT Ground0Page.jsx). Appears between "What the briefing covers" and the TerminalSection/AdmissionForm.

---

## PENDING/BACKLOG (post LP-WEB-011)

- **P0 BLOCKED**: Vimeo URLs for 69 portal modules — user must input via /admin/modules. Director's Briefing teaser will auto-swap to player once LP-VID-001 URL is populated.
- **P1**: Production push to Vercel/GitHub (awaiting Vimeo URL population)
- **P2**: Portal Option B — Full Premium Dashboard Redesign (blocked on Vimeo URLs)
- **P2**: Backlink Outreach per /app/memory/BACKLINK_TARGETS.md
- **DEFERRED**: HowToStartTruckingPost.jsx article CTA separation enhancements (from prior session)

---

## CHANGELOG — Visual Readability Pass (June 2, 2026)

### Changes
- **Global opacity sweep** (all `.jsx` except `HowItWorksSection.jsx`): raised all `color: rgba(255,255,255,X)` text values where X < 0.40 to minimum 0.48–0.65. Targeted `color:` property only, left border/background values unchanged.
- **Gold label opacity** (`rgba(197,160,89,0.45)` and `rgba(212,144,10,0.45)`) raised to 0.65 for visibility on dark backgrounds.
- **Roadmap node mobile fix** in `HowItWorksSection.jsx`: nodes now use `flex: '0 0 auto'`, fixed 108px width, connector lines have fixed 48px width. Container uses `overflowX: 'auto'` with `minWidth: 720px` — prevents overlap on 390px mobile.
- **HowItWorksSection earned states** — boosted from 0.28/0.38 to 0.50/0.55 (still visually distinct from active states but readable).
- **Credentials flex fix** — `alignItems: 'flex-start'` so "Founder, LaunchPath Transportation EDU LLC" wraps correctly on mobile without clipping.

---

## CHANGELOG — Roadmap Redesign (June 3, 2026)

- Completely rewrote `HowItWorksSection.jsx` roadmap section
- Old design: floating text above tiny dots, misaligned at different heights (amateur look)
- New design: 5-column CSS grid with consistent node structure, gold top-border for active, dim border for earned
- Each node: step number → serif label → mono sub-label → status badge ("Open Access" / "Program Required")
- Header bar with legend, bottom caption bar, horizontal scroll on mobile
- Scrap of `RoadmapNode` component — replaced with inline grid map
