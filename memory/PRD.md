# LaunchPath Transportation EDU — PRD
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
- ~~Live E2E Stripe purchase test~~ DONE
- ~~Google Search Console verification~~ DONE
- ~~LP-WEB-001 7-Page SEO Cluster~~ DONE (April 2026) — all 7 pages live at /knowledge-center/ with Article + FAQPage schemas, canonical URLs, full internal linking, and CTA architecture per spec
- Submit updated sitemap.xml to Google Search Console (next step after push to Vercel)
- Replace Vimeo placeholder URLs in portal modules via /admin/modules
- ~~Build Verified Registry ID generation logic (auto-generate VRF ID at 90-day program completion)~~ DONE (Feb 2026) — VRF auto-issues when core modules 1-6 complete; module-7 required if module-6 conditional

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
