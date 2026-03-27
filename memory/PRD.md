# LaunchPath Transportation EDU — PRD

## Product Mission
Compliance infrastructure, educational content, and paid digital resources for new motor carriers. Full-stack application: React frontend + FastAPI backend + MongoDB.

## User Personas
- **New Motor Carriers**: First-time operators needing compliance infrastructure
- **Owner-Operators**: Self-employed drivers setting up a carrier operation
- **Coach/Admin (Vince Lawrence)**: Content manager and cohort instructor

---

## Core Requirements

### Authentication
- JWT-based custom auth with session cookies
- Admin gate: vince@launchpathedu.com
- Free account gating for Load Profitability Analyzer

### Financial Tools (Public)
- Total Cost of Ownership (TCO) Calculator
- Load Profitability Analyzer (free account required)

### Portal
- Multi-module user portal
- Subscription access gated by Stripe ($2,500 cohort)
- Ground 0 module as entry point (free)
- Signal Monitor with HUD theme

### E-commerce (Native)
- 12 SKUs: LP-RES-001 through LP-RES-006, LP-PKT-001 through LP-PKT-005, LP-BDL-001
- Stripe checkout for one-time product purchases
- Token-based time-limited download links (60-min expiry)
- Post-purchase confirmed page (3 states: pending/confirmed/failed)
- Product-aware upsell on confirmed page
- Admin file upload interface for all 12 SKUs

---

## What's Been Implemented (Last Updated: Feb 2026)

### Phase 1: Core Platform (Previous Sessions)
- React frontend + FastAPI backend + MongoDB setup
- User authentication (JWT + session cookies)
- TCO Calculator (public)
- Load Profitability Analyzer (free account gated)
- Stripe subscription webhook for portal access
- MailerLite email integration
- Admin dashboard for module content

### Phase 2: Content & Visual Identity (Previous Sessions)
- Case Studies page, Conditional Rating page
- Compliance Gap Quiz (lead magnet)
- "Institutional OS" visual theme: blueprint grids, HUD elements, count-up stats
- Signal Monitor HUD overhaul
- REACH Assessment and Admission page enhancements
- Navigation cleanup and orphaned pages fixed

### Phase 3: Backend Refactor (Previous Sessions)
- Decomposed monolithic server.py into modular APIRouter structure:
  - routes/auth.py, routes/admin.py, routes/portal.py
  - routes/tools.py, routes/payments.py, routes/public.py, routes/products.py

### Phase 4: Native E-commerce System (Feb 2026)
**Date: February 2026**

#### Backend
- `routes/products.py`: Full product catalog, checkout, verify (3-state), token-based download, admin file management, webhook helper
- `routes/payments.py`: Product type routing in Stripe webhook (product_type=resource → handle_product_purchase_webhook)
- `server.py`: Products router registered

#### Frontend
- `ProductConfirmedPage.jsx`: 3-state post-purchase page (pending/confirmed/failed) with product-aware upsell and Ground 0 CTA
- `AdminProductFilesPage.jsx`: Admin product file manager with 12-SKU table, upload interface, progress bar, test download
- `ComplianceLibraryPage.jsx`: Full rewrite with:
  - Native checkout buttons (3 states: idle/loading/error) replacing all Gumroad links
  - LP-RES-001 featured section with animated stats block (18/90/7 counters, fire on load)
  - Interactive self-audit preview (3 yes/no questions, dynamic result with CFR citations)
- `App.js`: Routes for /products/confirmed and /admin/products

#### Key Architecture
- Checkout: POST /api/products/checkout → Stripe → /products/confirmed?session_id=...
- Verify: GET /api/products/verify?session_id=... → {confirmed|pending|failed}
- Download: GET /api/products/download?token=... (60-min expiry token)
- Admin upload: POST /api/admin/products/{sku}/upload
- Admin test DL: GET /api/admin/products/{sku}/test-download

---

## DB Collections
- `users`: credentials, payment_status, financial tool data
- `user_access`: portal access management
- `module_content`: dynamic URLs for portal lessons
- `product_purchases`: one-time product purchase records
- `product_download_tokens`: time-limited download tokens (60-min expiry)
- `product_files`: file metadata and storage paths for each SKU
- `payment_transactions`: Stripe session tracking for cohort payments
- `admission_requests`: admission application records

---

## Phase 5: Live Stripe + Bundle Sales Page (Feb 2026)

### Stripe Live Mode
- Switched from test keys to live Stripe keys (`sk_live_...`)
- Backend `/api/products/checkout` now generates live Stripe sessions (`cs_live_...`)

### $497 Bundle Sales Page
- New dedicated long-form sales page: `/new-carrier-document-system`
- Route added to App.js; old `/standards/new-carrier-document-system` redirects here
- Sections: Hero with sticky right panel, What this is, What's included (5 packets + 3 bonuses), 0–30–90 guide, Risk register (5 failure patterns), Bundle vs Standard comparison, Who it's for qualifier, Final CTA
- Native Stripe checkout (LP-BDL-001) — live payments
- "View full system details →" link added to bundle card in ComplianceLibraryPage

---

## Phase 6: Funnel Enforcement + Knowledge Center Brief Redesign (March 2026)

### Ground 0 CTA Removal (Site-wide Funnel Enforcement)
- All `/ground-0-briefing` CTAs replaced with `/reach-diagnostic` across 25+ files
- Ground 0 is now ONLY accessible from the REACH Assessment GO result screen
- Navbar: Desktop "Ground 0" → "REACH Check" (gold). Mobile Ground 0 section removed.
- Footer: "Ground 0" link → "REACH Diagnostic"
- REACH Assessment: GO result keeps `/ground-0-briefing` link; WAIT/NO-GO results have no Ground 0 CTA

### Knowledge Center Brief Redesign (LP-BRF-01 through LP-BRF-06)
- New shared `KnowledgeCenterBriefTemplate` component (per LP-BRF-01 v2 spec)
- All 6 briefs fully redesigned: Hero, Executive Summary, Leverage/Owner Decisions, Risk Grid, Cost Comparison, Interactive Maturity Assessment, Audit Binder Architecture, CTA Band
- CTA: "REQUEST AN OPERATOR READINESS CALL" → /admission (never "enroll now", never pricing)
- Maturity: Interactive 3-column Ad-hoc/Emerging/Installed checkboxes (local state, no data collected)
- Brief codes: LP-BRF-01 (New Entrant), LP-BRF-02 (HOS), LP-BRF-03 (D&A), LP-BRF-04 (Maintenance), LP-BRF-05 (Insurance), LP-BRF-06 (Authority Reinstatement)

---

## Phase 7: Typography Authority System (March 2026)

### Three-Layer Font Strategy
- **Playfair Display** (900, 800 weight): All main headlines and section headers — `letter-spacing: -0.03em`, "carved in stone" institutional gravity
  - Hero headline, all h1/h2/h3, ThePatternSection, NotForSection, FinalCTASection, TheStandardSection, FailureAnalysisSection headings
- **Inter**: Body text at 21px (1rem), `line-height: 1.7`, "luxury whitespace" readability
  - Functional labels: Bold, All-Caps, `letter-spacing: 0.15em` (`.overline` class)
- **JetBrains Mono**: All technical IDs (LP-SYS-001 codes), system status labels, monospace UI
  - Added `@fontsource/jetbrains-mono` (400, 500, 700 weights)
  - Replaces IBM Plex Mono as primary monospace; `.mono` class updated
  - Applied to: CredibilityStrip, FailureAnalysisSection, FinalCTASection, ThePatternSection, NotForSection, FAQSection, TheStandardSection, OperatorQualifierSection, HeroSection

### CSS Updates (index.css)
- `@import '@fontsource/playfair-display/800.css'` and `/900.css` added
- `@import '@fontsource/jetbrains-mono/400.css'` (500, 700) added
- `h1–h6`: `letter-spacing: -0.03em`, `font-weight: 800`
- `body`, `p`, `li`: `line-height: 1.7`
- `.mono`: `font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace`
- `.overline`: `font-weight: 700`, `letter-spacing: 0.15em`

### Phase 8: FinalCTASection Redesign (March 2026)
- Replaced "START WITH GROUND 0" dark flat section with cinematic full-bleed photo section
- Background: boots-on-asphalt photo (`pexels-1655998`) with 82–90% dark overlay + grain texture
- Headline: Playfair Display 900, `clamp(2.4rem, 6vw, 4rem)`: "If your authority is active, the window is already open."
- Body copy: REACH Diagnostic description (Ground 0 CTA removed per user spec)
- CTA: "RUN THE REACH DIAGNOSTIC →" — JetBrains Mono, gold outlined button, hover shimmer animation
- Disclaimer: "This is not done-for-you compliance..." muted text
- `data-testid="final-cta-reach-btn"` on CTA button

---

### Phase 13: Institutional Asset Vault + System Architecture Diagram (Feb 2026)

#### Asset Vault — ComplianceLibraryPage.jsx
- Fixed critical syntax error: removed ~40 lines of orphaned code from failed previous edit that caused a JS build failure
- Added `vault-scan` keyframe to `<style>` tag (referenced by hover animation but previously missing)
- Rebuilt `PacketCard` component to match "Machined Asset Vault Panel" aesthetic: blueprint SVG schematic, domain badge overlay, gold metal ID plate, LED status dot, hover scan line
- Changed Resources section background from light beige `#F6F3EE` to dark `BG2` to match Asset Vault theme

### Phase 15: Navbar Fixes + System Architecture Diagram v2 + Cross-Sell (Mar 2026)

#### Navbar (Navbar.jsx)
- Renamed "Library" → "Product Library" with direct link to /compliance-library (no dropdown)
- Reduced font size to 13px (was 1rem ≈ 21px due to large root font)
- Reduced inner nav gap from 2rem → 1.5rem, height from 64px → 56px
- Removed duplicate "REACH Diagnostic" text link; kept only the gold "REACH CHECK" button
- Changed navbar border to `rgba(212,144,10,0.18)` (gold-tinted) for visibility on dark pages

#### System Architecture Diagram v2 (SystemArchitectureDiagram.jsx)
- Complete rewrite with cleaner 3-column layout: threat vectors in side columns, pillars in center
- Added plain-English threat examples for each vector (OVER/AROUND/THROUGH/UNDER)
- MC Authority "Protected" core at visual center with pulsing glow + corner bracket accents
- Four outcome-oriented pillar nodes (Authority Protection, Insurance Continuity, Compliance Backbone, Cash-Flow Oxygen)
- Four industrial guard nodes (Driver, Drug, Hours, Equipment) in bottom row
- Hover on any threat vector activates: pillar highlights + animated threat detail callout below diagram
- Intro copy above diagram and legend below
- Scroll-triggered entrance animation via IntersectionObserver

### Phase 20: LP-BRF-12 + TCO Calculator Email Gate (Mar 2026)

- Created `FinancialRunwayBrief.jsx` (LP-BRF-12) with full brief structure and TCO Calculator CTA (QUALIFY→ENROLL dual)
- Added `/knowledge-center/lp-brf-12` route in `App.js`
- Added email gate to TCO Calculator: results panel (breakdown + margin target) now requires email before display
- Backend: `POST /api/tools/tco-subscribe` in `tools.py` — records email to `tco_leads` MongoDB collection and subscribes to MailerLite with `source: tco_calculator` field
- Save/Reset controls also hidden until email gate is passed

### Phase 19: Knowledge Center Contextual CTA Framework (Mar 2026, LP-SYS-CTA-001)

- Implemented full LP-SYS-CTA-001 CTA framework across all 11 Knowledge Center briefs
- Updated `KnowledgeCenterBriefTemplate.jsx`: replaced generic "Request Readiness Call" band with data-driven `data.cta` prop (context sentence + primary button + optional secondary link)
- Added `cta` field to all 6 template-based briefs (LP-BRF-01 through LP-BRF-06)
- Updated all 5 custom-layout briefs (LP-BRF-07 through LP-BRF-11) with matching CTA blocks
- CTA type mapping: QUALIFY→/reach-diagnostic, ACQUIRE→/compliance-library, ENROLL→/reach-diagnostic(Ground0 entry), dual CTAs as primary+secondary in same card

### Phase 18: Multi-File Bundle Delivery (Mar 2026)

#### Backend (products.py)
- Added `BUNDLE_CONTENTS` mapping:
  - LP-RES-006 → [LP-RES-001, LP-RES-002, LP-RES-004]
  - LP-BDL-001 → [LP-PKT-001 through LP-PKT-005]
  - LP-LIB-001 → all 3 resources + all 5 packets (8 files)
- Updated `verify_product_purchase`: generates one download token per component SKU for bundles, returns `download_tokens[]` array + `is_bundle` flag
- Updated `_build_download_email`: lists included components + links to confirmed page
- Updated `admin_test_download`: generates test tokens for all bundle components

#### Frontend (ProductConfirmedPage.jsx)
- `ConfirmedState` now checks `is_bundle` flag
- For bundles: renders individual download row per component (SKU label + product name + Download button)
- For single products: existing single "Download Now" button unchanged
- Token expiry note updated: "Return to this page any time to generate fresh links"

### Phase 17: Full Pricing Overhaul + LP-LIB-001 New Product (Mar 2026)
- LP-PKT-001: $97 → $139 | LP-PKT-002: $127 → $129 | LP-PKT-003/004: $127 → $149 | LP-PKT-005: $127 → $109
- LP-BDL-001: $497 → $399 → **$499**, renamed "Domain Systems Bundle", savings callout "Save $176" (vs $675 retail)
- LP-RES-006: renamed "Starter Stack" (price unchanged at $219)
- NEW LP-LIB-001: "Complete LaunchPath Library" at **$699** — all 3 PDFs + all 5 packets ($1,002 retail), savings "Save $303"
- All backend PRODUCTS prices now match frontend display prices (previously mismatched on LP-PKT-001-005)
- Comparison matrix, tier cards, bridge copy, CTA buttons all updated to reflect new pricing
- UPSELL dictionary entries updated from "$497" to "$499"

### Phase 32: Upsell Card on Confirmation Page (Mar 2026)

- Replaced weak "View →" text link upsell with a full product card: 3px gold top border, product image (72×96), product name in Playfair Display serif, price in gold JetBrains Mono, pitch copy, full-width gold "Add [Product] — $XXX →" buy button
- UpsellCard triggers direct Stripe checkout (POST /api/products/checkout) for non-cohort upsells; "Request Admission — No payment at this step →" outlined button for cohort ($2,500) upsell
- Backend: verify endpoint now enriches upsell object with `image` and `description` from PRODUCTS dict
- Fixed `useSearchParams` → `useRouter` (next/router) in ProductConfirmedPage — pages router requires `router.isReady` to avoid null sessionId on first render (was causing permanent "failed" state)
- showGround0 now conditionally hidden when non-cohort upsell is shown (only shows REACH diagnostic when cohort upsell or no upsell)
- Tested with simulated sessions for LP-PKT-001 (→ Document System Bundle upsell), LP-PKT-SINS (→ Starter Stack upsell)



#### E2E Purchase Pipeline Confirmed
- Added `LP-TEST-001` ($1.00) test SKU to backend PRODUCTS dict (NOT in storefront)
- Added `POST /api/admin/products/{sku}/simulate-purchase` endpoint: creates mock purchase record, calls full webhook handler, sends real MailerSend emails, returns confirmed page URL
- Tested: MailerSend delivers buyer confirmation + admin notification at HTTP 202 on every simulated purchase
- Verify endpoint confirms `confirmed` state with correct upsell chain for all tested SKUs
- **To test full Stripe E2E**: Use the Emergent preview URL → buy LP-TEST-001 ($1) via normal checkout, or simulate any SKU via the admin endpoint above

#### Knowledge Center — Briefs Tab Search + Filter
- Added `domain` field to all 8 items in BRIEFS array (New Entrant Program/Hours of Service/Vehicle & Operations/Drug & Alcohol Program/Insurance Continuity/Authority Registration)
- Added BRIEF_CATEGORIES constant matching Articles tab categories
- Added `briefSearch` and `briefDomain` state with `filteredBriefs` computed value
- Briefs tab now has: search text input (filters by title/teaser/phase), domain filter pills with counts, live results count ("X BRIEFS MATCHING 'query'"), clear-search (×) button, "Clear Filters" empty-state button
- All 8 briefs filterable; search "hos" → 1 result confirmed working



- `SocialProofSection.jsx`: 4 rotating operator outcome cards between OperatorQualifier and FAQ on homepage. Auto-advances every 6s with progress bar, nav dots + prev/next arrows. Fade-in animation per card.
- `useSEO.js` upgraded: now sets og:title, og:description, og:image, og:url, og:type, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image. Applied to: /, /program, /standard, /compliance-library.
- `libraryData.js` created at `/src/data/`: extracted PRODUCTS (11 items), THUMBS, BUNDLE_CONFIGS, CFR_REF, ACCORDION_GROUPS from ComplianceLibraryPage. File reduced from 1148 → 826 lines.
- Testing: 100% (iteration_85)

---

### Phase 29: LaunchPath Sales Page — /program Route (March 2026)

- Created `/program` public route — standalone long-form sales page with its own sticky nav (no global Navbar)
- `LaunchPathSalesPage.jsx`: Hero, Problem (16 exposure patterns), How It Works (5 checkpoints timeline), What's Included (6 deliverable blocks), Who It's For, Pricing, Authorization Paths, FAQ, Final CTA
- Backend: `POST /api/create-program-checkout` — direct $2,500 Stripe session (no admission_id required), stores to `payment_transactions` with `source: program_page`
- CTA wiring: "AUTHORIZE FULL SYSTEM" → Stripe ($2,500), "REQUEST PHASED AUTHORIZATION" → /admission, "$499 Document System" → /bundle, "RUN THE REACH ASSESSMENT" → /reach-diagnostic
- Testing: 100% (8/8 frontend, 4/4 backend) — iteration_84

---

### Phase 28: Cohort Platform Phase 2 — Gate Logic + Station Custodian (Mar 2026)
- Sequential module unlock logic: MOD-1 always accessible, MOD-2 locked until MOD-1 approved, MOD-3–6 sequential, MOD-7 conditional only, MOD-8/9 after MOD-6 done
- `gateStatuses` state in PortalPage, fetched from `/api/portal/gate-status`; sidebar shows per-module status badges (PENDING / APPROVED / COMPLETE / CONDITIONAL)
- MOD-1 lesson 1.7 "Driver Qualification File (GATE)" shows DQF hard gate submission block with checklist and "SUBMIT DQF FOR CUSTODIAN REVIEW" button
- Station Custodian notified by email on gate submission (when MailerSend is live)
- `POST /api/portal/gate/{gate_type}/submit` creates custodian_reviews document + sets module_progress to pending_review
- `POST /api/portal/module/{module_id}/complete` operator self-certifies non-gate modules (MOD-2 through MOD-5)
- New `AdminGateReviewsPage` at `/admin/gate-reviews`: Approve / Decline / Conditional decisions with note field + email notification to operator
- "CONFIRM — MODULE INSTALLED" button on non-gate modules; module complete banner on completion
- "You've advanced the system" unlock notice when status changes from pending_review to approved
- Gate-locked-view shown for sequentially locked modules with clear prerequisite message
- Testing: 100% frontend, 88% backend (only semantic 403 vs 401 difference, no functional failures) — iteration_80

### Phase 30: LP-PORTAL-QA-001 P0 Items (Mar 2026)
- **P0-1 Journey Map Sidebar**: Renamed "IMPLEMENTATION SEQUENCE" → "YOUR IMPLEMENTATION JOURNEY". Added status icons (✓ green=approved/complete, 🔒 gold=locked, ⟳ amber=pending, ⚠ red=revisions, ○ gray=unlocked-not-started, ┄ conditional). Added module type labels: FREE FOUNDATION / CORE IMPLEMENTATION / AUDIT GATE / POST-AUDIT RECOVERY / STANDARD EXTENSION. Module 6 clearly labeled "AUDIT GATE". Active module shows "← HERE". Journey progress summary: "X of 10 modules · Verified Registry ID: Pending/Issued" at bottom.
- **P0-2 Revisions Needed State**: Backend `decide_gate_review` now accepts `decision="revisions_needed"`. Frontend shows dedicated revisions screen with custodian notes panel, "WHAT TO DO" instructions, VideoLessonWorkbench (to fix content), and "RE-SUBMIT FOR CUSTODIAN REVIEW" button via ModuleChecklist.
- **P0-3 Per-Module Completion Checklists**: New `ModuleChecklist.jsx` component — renders interactive checkboxes per module, persists state to server (`GET/POST /api/portal/module/{id}/checklist`, new `module_checklists` DB collection). Submit/Complete button disabled until all items checked. Specific checklist items defined for all 10 modules (6 items for MOD-1, 6–7 items for MOD-2–9). Replaces the single "CONFIRM — MODULE INSTALLED" button with a real verification gate.
- Testing: 100% (21/21 backend + frontend) — iteration_82
- **Verified Registry ID**: Auto-generated LP-VRF-XXXXXXXX credential when admin approves MOD-6 integrity audit. Stored in `registry_ids` collection. `GET /api/portal/registry-id` fetches it. `VerifiedRegistryID.jsx` shows formal credential card with operator name, registry code, four-pillar confirmation, issuance date, and print button. Shown in portal when module-6 is approved.
- **Per-Lesson Q&A**: `GET/POST /api/portal/lesson/{id}/qa` for user Q&A per lesson. `POST /api/admin/lesson-qa/{id}/reply` for admin responses. `LessonQA.jsx` component embedded in `VideoLessonWorkbench.jsx` below each lesson's content — shows questions from all cohort members with "Station Custodian" label on admin replies.
- **Announcements Broadcast**: `GET/POST /api/portal/announcements` (user-facing). `GET/POST/PATCH/DELETE /api/admin/announcements` (admin). `AnnouncementsFeed.jsx` shows dismissable announcement banners (normal/important/critical priorities) at top of portal main area for paid users. `AdminCommunityPage.jsx` at `/admin/community` has two tabs: Announcements (create/toggle/delete) and Lesson Q&A (view all, reply).
- **Lesson View Tracking**: Added missing `POST /api/portal/module/{id}/lesson/{id}/viewed` and `GET /api/portal/lesson-progress` backend endpoints (were referenced in Phase 3 frontend but never implemented). Portal now loads saved lesson progress from server on mount.
- **Registry Seal PDF Export**: `VerifiedRegistryID.jsx` updated with "Download Registry Seal" button that uses dynamic `html2canvas` + `jspdf` imports to capture the credential card and generate a branded A4 PDF. PDF includes header, gold bar, credential card image, four-pillar confirmation block, verification statement, and footer. Filename: `{registry_id}_Registry_Seal.pdf`.
- **New DB Collections**: `lesson_qa`, `announcements`, `registry_ids`, `lesson_progress`
- Testing: 100% backend (21/21), 100% frontend — iteration_81

### Phase 27: Curriculum Alignment — Phase 1 (Mar 2026)
- Aligned all module names and lesson titles to LP-SYS-CUR-001 across Ground0LessonPlayer, PortalPage, AdminModulesPage, VideoLessonWorkbench
- Ground 0: 6 lessons now match spec (Welcome to LaunchPath, Four Pillars, Lane Selection, Personal Readiness Check, Risk Tolerance Assessment, Go/No-Go Decision)
- Paid module names corrected: MOD-1=Driver Qualification File, MOD-2=Authority & Insurance, MOD-3=The 16 Deadly Sins, MOD-4=Drug & Alcohol Program, MOD-5=Hours of Service & Dispatch, MOD-6=Integrity Audit, MOD-7=Post-Audit Recovery, MOD-8=ELD Compliance, MOD-9=Hazmat Decisions
- VideoLessonWorkbench MOD-1: 8 lessons updated (was 7), all titles corrected per spec, lesson 1.7 marked as HARD GATE trigger
- Ground 0 GO completion screen redesigned: shows full 9-module roadmap preview with gate/status tags, achievement recap, single "Continue to Install the LaunchPath Operating System" CTA → /admission
- REACH logic updated to map new lesson indices (0.2 weakest pillar, 0.4 authority age, 0.5 AUTO risk vector)
- Tested: 100% module/lesson names correct, GO roadmap renders correctly (iteration_79)
- Phase 2 (gate logic + Station Custodian review) still to be built

### Phase 26: Smarter CTA for MC Audit Window Calculator (Feb 2026)
- Implemented conditional CTA in `MCAuditWindow.jsx`
- Phase 0 (INSTALLATION, 0–182d) + Phase 1 (CRITICAL WINDOW, 183–365d): gold CTA → `/compliance-library` ("INSTALL YOUR COMPLIANCE SYSTEM...")
- Phase 2 (PRE-AUDIT, 366–548d) + Phase 3 (AUDIT ELIGIBLE, 549d+): red CTA → `/admission` ("YOUR AUDIT WINDOW IS CLOSING — REQUEST ADMISSION →") + sub-note "No payment at this step · Reviewed within 24 hrs"
- All 4 phase paths tested and verified (testing agent iteration_78, 100% pass rate)

### Phase 25: MC Audit Window Calculator + Library Email Capture (Mar 2026)
- Built MCAuditWindow.jsx shared component: date input, 18-cell month grid, phase classification (INSTALLATION/CRITICAL WINDOW/PRE-AUDIT/AUDIT ELIGIBLE), days elapsed/remaining counter, phase recommendation, gold CTA → /compliance-library
- Added calculator to /reach-diagnostic (intro phase, below REACH teaser) and /compliance-library
- Added LibraryEmailCapture block to /compliance-library: "NOT READY TO BUY?" + email input → POST /api/library/email-capture → MailerLite
- Backend: POST /api/public/library/email-capture added to public.py
- Phase 1 Global: body background #002244, 1px gold technical grid pattern (3% opacity), `.inward-bevel` utility CSS, `.lp-init-scan` single 1px gold sweep on page load, mechanical press (translateY + inset shadow) on all button:active
- Phase 2 REACH Diagnostic: 15-cell gold data grid replaces LP-REACH-SCAN bar, labels now LOG_ENTRY_01_OF_15 format, response buttons square (borderRadius:0) industrial toggles, sweep animation removed
- Phase 3 AUTO Method: schematic grid background on A/U/T/O strip, VEC-A-01/VEC-U-01/VEC-T-01/VEC-O-01 machined asset tags, REF: 49 CFR § citations at bottom of each box
- Phase 4 Components: inward bevel on all product cards (Standard module grid, Compliance Library accordion), LP-MOD-XX · REV. 2026.03 asset tags, AUTHORITY: 49 CFR § lines on expanded cards
- REACH teaser LEDs changed to static (no pulse) per Zero-G rule; /standard checkpoint dots remain pulsing per user request
- Completely rebuilt StandardPage.jsx to spec LP-PAGE-STANDARD-001
- Section 1: Hero — "THE LAUNCHPATH STANDARD" in Playfair Display, gold REQUEST ADMISSION CTA, "NO PAYMENT AT THIS STEP"
- Section 2: Two-column comparison — red ✗ problem bullets vs gold ✓ Standard bullets
- Section 3: 10-module installation sequence with stat bar (10 modules, 72 lessons, 17+ hrs, 84 docs), module cards with asset tag badges; LP-MOD-08/09 shown at 70% opacity as "COMING COHORT 2"
- Section 4: 5-checkpoint Station Custodian timeline with pulsing gold LEDs, vertical line, LP-VRF Registry note
- Section 5: Two financing cards — Single Auth ($2,500, gold border, RECOMMENDED) + Phased Auth ($1,500+$1,500, outlined). Both CTAs → /admission
- Section 6: Final CTA block
- Navbar "LaunchPath Standard" updated to point to /standard (was /launchpath-standard)
- Playfair Display + JetBrains Mono fonts added to index.html
- 1.1: Question count standardized to 15 across all /reach-diagnostic copy
- 1.2: Duplicate "FIRST COHORT · 10 CARRIERS MAX" line removed from LaunchPath Standard investment card
- 1.3: Accordion section header replaced: "INSTALL BY DOMAIN" with contextual copy + "$499 BUNDLE COVERS ALL FIVE" gold CTA link
- 2.1: Comparison matrix now has dual layout — 4-column table (desktop ≥769px) + 4 stacked cards (mobile ≤768px). Bundle card gold-bordered with RECOMMENDED badge and buy button. Standard card has REQUEST ADMISSION link
- 3.1: Accordion product cards get inward bevel (inset box-shadow + #080E18 bg)
- 3.2: REACH pillar LEDs pulse only for PENDING_SCAN status (not for complete items)
- 3.3: REACH Diagnostic progress dots replaced with LP-REACH-SCAN technical bar showing X OF 15 · N% COMPLETE
- 3.6: Bundle boxes CSS enforced full-width on mobile ≤768px
- Global price update: LP-BDL-001 $399 → $499, LP-LIB-001 $599 → $699 across all 13 frontend files + backend
- Updated savings calculations: LP-BDL-001 "Save $176" (was $276), LP-LIB-001 "Save $303" (was $403)
- Added "Tools" link to header navbar after "LaunchPath Standard" (desktop + mobile)
- Updated ToolsIndexPage: added Compliance Gap Audit (LP-TOOL-003, /compliance-gap-quiz) and Compliance Health Check (LP-TOOL-004, /control-room) to the 4-tool index
- ⚠️ User must update Stripe dashboard: create new $499 price for LP-BDL-001 and $699 price for LP-LIB-001

### Phase 16: Cinematic Product Images + Nav Tooltip (Mar 2026)
- Generated 10 cinematic AI product mockup images for all 12 SKUs (dark navy, warm gold lighting, photorealistic booklet/binder aesthetic) via Gemini Imagen 4
- Updated all THUMBS URLs in ComplianceLibraryPage.jsx — LP-RES-001 through LP-PKT-005 + LP-BDL-001 + LP-RES-006 collection cover
- Simplified LP-RES-006 rendering: removed CSS stacking code, now uses its own collection image (shows 3 books spread)
- Added "Product Library" hover tooltip in Navbar: "12 compliance products. Start at $59." — gold JetBrains Mono, dark panel, gold top border, caret accent
- FIX 1: Hero tier cards now have "See Details →" anchor buttons (#standalone-resources, #bundle, #standard); Tier 1 price corrected to "$59–$169 per resource / $97–$127 per packet"
- FIX 2: Self-audit NO answers trigger inline per-question product recommendation cards (DQ→LP-RES-002, Insurance→LP-PKT-005, Clearinghouse→LP-PKT-002); all-YES shows "VIEW THE FULL LIBRARY" link
- FIX 3: All product cards (LP-RES-001 to LP-RES-006, all LP-PKT-00X) now show actual product thumbnail images; LP-RES-006 shows stacked 3-image collection mockup
- FIX 4: LP-RES-006 has gold left border, "COMPLETE SET" badge, 2.75rem price, "Save $108" callout; LP-BDL-001 has "Save $138 vs. buying packets individually"; LP-STD-001 has "GUIDED SYSTEM" pill badge
- FIX 5: Standard section has "GET STARTED — $2,500" button (links to /admission) + muted disclaimer + REACH Diagnostic secondary link
- FIX 6: Urgency line added after stats block: "Most carriers are reading this inside the window where violations are already forming. The self-audit below takes 30 seconds."
- FIX 7: Final CTA headline updated to "Every operator starts here. The REACH Diagnostic identifies your exposure in 4–6 minutes — before FMCSA does."


- Block 1: Hero bullets reframed to consequence-first language (prevents failure → what it is)
- Block 2: NEW Consequence Band section added (LP-EXP-001) in HeroSection between bullets and proof strip — $10K-$25K cost stat, 87 days stat, 18 months stat with dark panel visual
- Block 3: ThePatternSection body copy replaced — "system was never installed" diagnosis, structural/personal framing added
- Block 4: WITHOUT block — title → "What happens to an unstructured operation", bullets expanded to 4 specific consequence items
- Block 5: FourPillarsSection intro — replaced with cascade language (financial→HOS→inspection→audit→DQ gap→authority revocation chain)
- Block 6: OperatorQualifierSection FOR_YOU array — 4 bullets updated (MC number → not certain files current, Month 9 → not formally verified, 1-3→1-5 trucks)
- Block 7: FinalCTASection — "LP-WIN-STATUS" code label, "audit window" upgrade, "What you get:" paragraph added, disclaimer preserved
- Block 8: LaunchPathStandard hero subhead — "not your intent, not your plan. Your documents." rhythm + "Verified Registry ID issued when all six domains pass final review"
- Block 9: Bundle vs Standard paragraph — added "An investigator who finds the gap charges you $10,000–$25,000..." closing sentence
- Block 10: AdmissionPage — price anchor panel added above form (LP-STD-001, $2,500 · 10 carriers · not every applicant admitted)
- Block 11: LP-RES-001 price $37→$59, copy → "Know your exposure before FMCSA documents it for you"
- Block 12: LP-RES-002 price $67→$99, copy → "Build a DQ file that survives the first document request"
- Block 13: LP-RES-004 price $97→$169, copy → "48 hours before the questions start" framing
- Block 14: LP-RES-006 bundle $201 retail→$327 retail, $147→$219 + "Diagnose. Build. Survive. In that order." tagline
- Block 15: Stats already correct (18 months, 87 days) — no changes needed
- Block 16: AutoMethodPage three-layer section — "maps how risk enters / defines what must be protected / document what actually fails" + "each layer exists because the other two are not enough without it"
- Block 17: BundleSalesPage comparison table — "$97–$127 each" → "$59–$169 each"

⚠️ IMPORTANT: Display prices updated but Stripe product prices NOT updated. User must update Stripe prices for LP-RES-001, LP-RES-002, LP-RES-004, LP-RES-006.

### Phase 11: "Institutional OS" Visual Polish Run (Feb 2026)
- Typography: All section h2 headlines → fontWeight 800 + letterSpacing -0.03em (FourPillars, AutoMethod, WhatGetsInstalled, CredibilityStrip)
- Typography: All code labels (pillar.code, auto.code, LP-IDs) → JetBrains Mono + fontWeight 700
- Typography: Fixed REACHTeaserSection `mono` constant (was set to Inter — bug) → now JetBrains Mono
- Material Depth: Applied inset box-shadow to Hero Risk Analysis panels (WITHOUT/WITH), FourPillar cards, AutoMethod cards, REACH pillar cards + sidebar, all with multi-directional inset shadows creating recessed metal plate effect
- Scan Line: Added new `.hero-vscan-line` element — 1px gold vertical scan line (rgba 5% opacity) that sweeps left→right across Hero section on page load
- LED Pulse: Added `.cred-auth-led` pulse (3s) to Authorized Personnel dot in CredibilityStrip; `.reach-led-pulse` (3s) to all 5 REACH pillar status dots; WhatGetsInstalled + TheStandardSection LED pulse updated from 2s to 3s

### Phase 10: Gauge Fix + Personalized Gap Summary Email (Feb 2026)
- Fixed broken GaugeSVG in ControlRoomPage.jsx — rewrote using strokeDasharray/strokeDashoffset on a single shared path (SVG chained arcs were misaligning)
- Rewrote _build_reach_email() in public.py: correct max scores (R:9,E:9,A:9,C:9,H:6 total=42 vs wrong 30), personalized per-category gap sections with specific copy, actions, and resource links for each flagged domain
- Added _build_gap_sections() helper with guidance content for all 5 REACH categories

### Phase 9: Mobile Audit + Auth Testing (Feb 2026)
- Full mobile (390px) responsiveness audit across all key pages — passed
- Fixed: ComplianceLibraryPage product grids overflow on mobile (minmax(540px) → CSS override at 780px breakpoint)
- Fixed: BundleSalesPage slight horizontal overflow (removed whiteSpace:nowrap from SectionRail, added overflowX:hidden to container)
- Fixed: ArticlePortalBanner button text updated from "BEGIN GROUND 0 BRIEFING" to "TAKE REACH DIAGNOSTIC"
- Fixed: "INITIATE GROUND 0 →" button text in 9 pages updated to "TAKE REACH DIAGNOSTIC →"
- Fixed (by testing agent): Ground0LessonPlayer.jsx urlMap not passed as prop to LessonView — caused crash on lesson load
- Auth testing: All 9 email auth tests passed (login, register, duplicate register, wrong password, session check, logout)

### Phase: Typography Spec + UI Ceremonies (LP-PORTAL-TYPE-001 + LP-PORTAL-QA-001) — March 2026

#### VideoLessonWorkbench.jsx — Lesson Header
- Added "LESSON X OF Y" position indicator in JetBrains Mono (gold) as primary lesson header
- Secondary line shows module code, lesson number, duration in muted mono
- Lesson subtitle appears as a gold left-bordered callout box with Source Sans 3 italic
- Description text switched from Inter to Source Sans 3 at `font-size: 1rem, line-height: 1.82`

#### Ground0LessonPlayer.jsx — CompleteView Ceremony
- Added full ceremony header strip: "LP-MOD-G0 · GROUND 0 · SEQUENCE COMPLETE" in JetBrains Mono + colored pill badge with pulsing dot
- Decision block upgraded: h1 at `clamp(1.75rem, 3.5vw, 2.5rem)` Newsreader serif, Source Sans 3 body copy
- GO completion items: circled green checkmarks with Source Sans 3 text (vs bare ✓ characters before)
- Roadmap labels: JetBrains Mono for section headers, Source Sans 3 for module descriptions
- CTA button: wider/taller (minHeight: 56px), disclaimer in JetBrains Mono uppercase
- WAIT/NO-GO body copy: switched from Inter to Source Sans 3, status labels use JetBrains Mono

#### VerifiedRegistryID.jsx — Credential Ceremony
- Added full ceremony intro at top: 3px green top border, dark overlay, LP code, 'Your compliance system is verified.' h1 headline, Source Sans 3 body
- Added "WHAT THIS CREDENTIAL MEANS FOR YOUR OPERATION" section: 4 numbered gold-circle items covering defensibility, broker trust, audit position, and permanent record

### Phase 6: Next.js Migration (Feb 2026)
- Migrated frontend from Create React App to Next.js 14 (Pages Router) for SSR/SSG
- Added proper `<Head>` meta tags (title, og:title, og:description, og:image, twitter:card) to all priority pages
- Fixed `useSearchParams` imports in AdmissionConfirmedPage, ProductConfirmedPage, Ground0CompletePage (→ next/navigation)
- Removed duplicate `pages/tools.jsx` (kept `pages/tools/index.jsx`)
- Added global `<Toaster />` to `pages/_app.jsx` for toast notifications
- Cleaned up `package.json`: removed `react-scripts`, `@craco/craco`, `cra-template`
- Fixed import paths in nested pages (tools/index.jsx relative path)
- All 7 major routes validated: /, /program, /compliance-library, /tools, /admission/confirmed, /products/confirmed, /ground-0-complete
- Added `/sitemap.xml` (48 URLs, priority-ranked) and `/robots.txt` (blocks admin/portal, references sitemap)
- Added global auto-canonical `<link rel="canonical">` via `_app.jsx` (every page gets the correct canonical URL)
- Converted 5 duplicate `/products/*` pages to proper 301 redirects → `/standards/*`
- Added Google Site Verification support via `GOOGLE_SITE_VERIFICATION` env variable in `_document.jsx`
- Knowledge Center tabs: replaced scrolling sections with Articles | Briefs | 90-Day Series tab bar
- Admin module visibility toggle: ●/○ icon per module in sidebar, PATCH /admin/module-content/{id}/visibility endpoint
- Products: 10/12 SKUs uploaded (LP-BDL-001 bundle and LP-LIB-001 library missing)
- /program mobile UX: 7 text-size + button tap-target + padding fixes applied
- /privacy-policy and /terms-of-service pages created (LP-LEGAL-001, LP-LEGAL-002); footer links wired in /program
- Refactored AdminProductFilesPage: removed hardcoded PRODUCTS/BUNDLE_CONTENTS; now fetches from /api/admin/products/files at runtime
- All product/portal CTAs verified: 3 Stripe checkout endpoints confirmed live (/api/products/checkout, /api/create-program-checkout, /api/portal/checkout)

### P0: Deployment Fix (Mar 2026)
- Added `output: 'export'` to `next.config.js` — required for Emergent deployment platform static export
- Build confirmed passing: 82 static pages, exit 0, with `output: 'export'`
- `frontend/yarn.lock` tracked as untracked — add via "Save to Github" before next deploy

### P0: Premium Product Images v2 (Mar 2026)
- Generated 15 ultra-premium studio-photography-style product images (dark navy/gold brand palette)
- IMG_GUIDE, IMG_PACKET, IMG_BUNDLE, IMG_LIBRARY base cover images replaced
- All 11 THUMBS entries updated (LP-PKT-SINS through LP-LIB-001) with product-specific imagery
- Updated: `frontend/src/data/libraryData.js`, `backend/routes/products.py`, and 5 product detail pages

### P1: Post-Deploy Verification
- Live E2E Stripe purchase test on deployed URL (real $1 test charge)
- Confirm MailerSend PDF delivery fires via Stripe webhook
- Populate real Vimeo URLs for portal modules via /admin/modules
- Upload actual PDF files for all 12 product SKUs via /admin/products
- Verify live Stripe webhook endpoint configured for `checkout.session.completed`
- DNS update: point launchpathedu.com to Emergent host once deployment is stable

### P2: Features
- Apply Phase 2 Visual Control Panel upgrades to homepage components (inset bevels, scan lines, LED indicators, structural rails)
- Apply Phase 4 Global Upgrades (data-stream text reveal, blueprint grid overlays on TheStandardSection)
- Module visibility toggle in admin module editor
- "16 Deadly Sins" PDF upload to activate $17 product (user uploads the file via /admin/products)
- Knowledge Center: Add top-level section navigation tabs (Articles / Briefs / 90-Day Series)

### P3: Refactoring
- Break down large components: PortalPage.jsx (~1150 lines), REACHAssessmentPage.jsx (~1200 lines), Ground0LessonPlayer.jsx (~1200 lines)

---

## 3rd Party Integrations
- **Stripe**: Subscriptions (cohort $2,500) + one-time products (sk_test_emergent via emergentintegrations)
- **MailerLite**: Email sequences, post-purchase delivery emails
- **MailerSend**: Transactional emails (download delivery, sale notifications)
- **Vimeo**: Video content (placeholder URLs in portal modules)

## Key Credentials
- Admin: vince@launchpathedu.com / safestart2024!
- App: https://your-numbers-calc.preview.emergentagent.com
