# LaunchPath Operating System (LPOS) v1.0 — PRD

## Original Problem Statement
Build "LaunchPath Operating System (LPOS) v1.0," a premium full-stack application for new motor carriers. A comprehensive educational and operational platform including compliance content, diagnostic tools, a guided cohort program, and an operator portal.

## Product Vision
Authoritative compliance operating system for new motor carriers. Brand voice: calm, credentialed, no urgency or manufactured scarcity. The Funnel is Sacred: REACH Test → Ground 0 → Admission Form → LaunchPath Standard.

## Architecture
- **Frontend**: React SPA with react-router-dom, CSS-in-JS inline styling + global CSS variables
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Email**: MailerLite (subscriber management) + MailerSend (transactional/notifications)
- **Payments**: Stripe (via emergentintegrations) — $2,500 cohort enrollment
- **Auth**: Custom session-based auth (email/password + Google OAuth via Emergent)
- **CI/CD**: GitHub Actions → Vercel (frontend) / Railway (backend)

## Typography Standard
- **Heading**: Playfair Display 700 — all page headlines, section titles, module headers
- **Body / UI / Nav / Buttons / Labels / Forms**: Inter 400/500/600/700
- **System codes only**: IBM Plex Mono 500 — retained for `.mono` CSS class only
- **Base**: `html { font-size: 21px }` (1rem = 21px desktop)
- **Type Scale**: `--text-hero` through `--text-xs` with clamp for responsive H1/H2

## Knowledge Center Theme
- **Content pages** (`.content-page`): warm ivory `#F6F3EE` background, deep navy `#0D1B30` text
- **Hero/header bands**: dark navy `#0D1B30` via CSS rule
- **Marketing pages**: dark navy, white text

## Key Routes
- `/` → HomePage
- `/portal` → PortalPage (unauthenticated = Ground 0 lesson player; authenticated = full portal)
- `/reach-diagnostic` → REACHAssessmentPage (REACH Test — primary funnel entry)
- `/ground-0-briefing` → Ground0BriefingPage (static briefing, legacy)
- `/ground-0-complete` → Ground0CompletePage (legacy static completion page)
- `/launchpath-standard` → LaunchPathStandardPage (cohort decision page)
- `/admission` → AdmissionPage (cohort admission form — 6-field + Stripe payment)
- `/admission/confirmed` → AdmissionConfirmedPage (post-payment enrollment confirmation)
- `/admin/admissions` → AdminAdmissionsPage (login-gated, coach-only)
- `/operating-standard` → OperatingStandardPage (framework explainer)
- `/auto-method` → AutoMethodPage
- `/16-deadly-sins` → SixteenSinsPage
- `/compliance-library` → ComplianceLibraryPage
- `/about` → AboutPage
- `/knowledge-center` → KnowledgeCenterPage + articles

## Cohort Enrollment Flow (Funnel)
1. Cold traffic → `/portal` → Ground 0 lesson player (free, 6 lessons, ~95 min)
2. Lesson gate at G0-4 → account creation (email/password or Google)
3. Complete G0-6 → self-declare GO/WAIT/NO-GO
4. GO path → "Request Admission →" `/admission`
5. Operator fills 6-field form → submits → "Proceed to Payment" shown
6. Pays $2,500 via Stripe checkout → `/admission/confirmed?session_id=...`
7. Backend polls/webhook → updates `admission_requests.status = "approved"`
8. Vince notified via MailerSend on submission + payment

## DB Schema

### users
- user_id, email, name, picture, password_hash (optional — Google OAuth users won't have this), created_at

### user_sessions
- user_id, session_token, expires_at, updated_at

### ground0_progress
- user_id, completed_lessons (array of indices 0–5), decision (GO/WAIT/NO-GO or null), updated_at

### admission_requests
- carrier_name, email, dot_mc_number, authority_activation_date, compliance_status
- lane: "box_truck" | "semi"
- message, source, submission_date, status ("pending_review" | "approved" | "rejected")

### payment_transactions
- session_id, admission_id, email, carrier_name, amount, currency
- payment_status, status, created_at, completed_at

---

## Completed Work

### Session 1–5 (Foundation + Content + Funnel + Typography + Stripe)
- Full backend API, operator portal, Ground 0 pages, REACH Assessment
- HomePage, AutoMethodPage, SixteenSinsPage, AboutPage, ComplianceLibraryPage
- Cohort funnel: LaunchPath Standard page, Admission form, Stripe $2,500 checkout
- Admin dashboard at `/admin/admissions`
- Typography system: Inter + Playfair Display, `html { font-size: 21px }`

### Session 6 (Homepage 12-Section Build) — Mar 2026
- All 12 homepage sections per verification checklist (passed 12/12)
- Ground0ExplainerSection, AfterInstallationSection, FAQSection, SocialProofPlaceholder added
- FAQ accordion with smooth CSS transitions

### Session 7 (KC Light Theme + 5 New Briefs) — Mar 2026
- Knowledge Center theme: warm ivory (#F6F3EE) + deep navy (#0D1B30)
- 5 new briefs: LP-BRF-07 (Day1AuthorityBrief), LP-BRF-08 (InstallationWindowBrief),
  LP-BRF-09 (OperatingPatternsBrief), LP-BRF-10 (PreparationReconstructionBrief),
  LP-BRF-11 (NewEntrantReviewBrief)
- 90-Day Clock progress tracker section in KnowledgeCenterIndex
- Cohort price fixed to $2,500 across 7 files

### Session 8 — Ground 0: The Wisdom Module — Mar 2026
- **Backend**: `POST /api/auth/register` — email/password operator registration with bcrypt hashing
- **Backend**: Updated `POST /api/auth/login` — supports both coach (hardcoded) and regular operator (bcrypt verify)
- **Backend**: `POST /api/ground0/progress` and `GET /api/ground0/progress` — persist lesson progress per user
- **Frontend**: `Ground0LessonPlayer.jsx` — interactive 6-lesson qualification module:
  - G0-1/G0-2/G0-3 accessible without login (localStorage-based progress)
  - Auth gate before G0-4: registration form + "Continue with Google" option
  - Each lesson: video placeholder, key points list, PDF download placeholder, self-assessment (radio)
  - After G0-6: GO/WAIT/NO-GO self-declaration screen
  - Three completion screens: GO → "Request Admission" / WAIT → "Run REACH Diagnostic" / NO-GO → "Contact LaunchPath"
  - After auth success: auto-advances to G0-4 (not stuck on G0-3)
- **Frontend**: `PortalPage.jsx` updated:
  - Unauthenticated `/portal` → shows Ground0LessonPlayer full-page (replaces old Google login screen)
  - Authenticated `ground-0` section → embeds Ground0LessonPlayer within portal layout
  - Removed GROUND0_MODULES static list and "Go to Ground 0 Briefing" button

---

### Session 11 — KC Brief Series Rebuild + Bug Fixes — Mar 2026
- **LP-BRF-07–11 rewritten** with user's exact three-voice spec (System/Operator/Wisdom) for each of the 5 90-Day Clock timeline phases
- **Series navigation bar** linking all 5 briefs with active-state indicator; prev/next cross-links between briefs
- **CTAs updated**: BRF-07 + BRF-10 → "INITIATE GROUND 0"; BRF-08 + BRF-09 + BRF-11 → "VIEW THE STANDARD"
- **Bug fix**: Standards dropdown "Audit Domains" anchor (`#audit-domains`) was missing from `StandardsPage.jsx` — added `id="audit-domains"` div so the nav item scrolls to FMCSA Audit Domain Coverage table instead of top of page

### Session 10 — Gap Tracker + Hybrid Copy — Mar 2026
- **Gap Tracker component** (`GapTracker` in `Ground0LessonPlayer.jsx`): maps G0-1–G0-5 assessment answers to 5 REACH pillar pass/fail states; shown on WAIT screen above email capture; action links for each failing pillar
- **Assessment answer tracking**: `assessmentAnswers` state tracks per-lesson selections, persisted to localStorage, passed to completion screens for Gap Tracker computation
- **Hybrid copy**: WAIT uses "YOU ARE NOT READY — YET" (selective) + "That's a timing issue — not a permanent one" (path forward) + "SAVE MY SPOT →" button + "✓ YOUR SPOT IS SAVED" success; NO-GO uses "THIS PROGRAM ISN'T THE RIGHT FIT — YET" + "NOTIFY ME →" + "✓ YOU'RE ON THE LIST" success
- **MailerLite enrichment**: WAIT/NO-GO submissions now include all 5 REACH pillar results + gaps_remaining count as custom fields — enables gap-specific nurture sequences
- **Backend**: `POST /api/ground0/waitlist` — captures WAIT/NO-GO completions, saves to `ground0_waitlist` MongoDB collection, subscribes to MailerLite with `lead_source` tags (`ground0_wait` / `ground0_nogo`); group IDs configurable via env vars `MAILERLITE_COHORT_WAITLIST_GROUP_ID` / `MAILERLITE_FUTURE_ELIGIBILITY_GROUP_ID`
- **Frontend (WAIT screen)**: Added "YOU ARE NOT READY — YET" section with institutional copy, "RESERVE ADMISSION PRIORITY →" email form, success state "✓ ADMISSION PRIORITY RESERVED", "BEGIN CLOSING GAPS NOW" secondary section with Document System CTA → `/compliance-library`
- **Frontend (NO-GO screen)**: Added "THIS STANDARD DOES NOT APPLY TO YOUR CURRENT POSITION" section with eligibility copy, "REGISTER FOR FUTURE ELIGIBILITY →" form, success state "✓ ELIGIBILITY REGISTRATION CONFIRMED"
- **GO screen unchanged** per spec. No marketing language, no "waitlist" or "newsletter" references. Tone is institutional/compliance-first throughout.
- Populate placeholder URLs:
  - 6 Vimeo video embed URLs (one per G0 lesson)
  - 6 PDF download URLs via Gumroad (one per G0 lesson)
  - YouTube URL for homepage "Watch the Overview" CTA
  - 5 Gumroad product URLs for ComplianceLibraryPage

### Session 12 — LP-TOOL-001 + LP-TOOL-002 Financial Tools — Mar 2026
- **LP-TOOL-001 TCO Calculator** (`/tools/tco-calculator`): Routed in App.js; paid-member gate (AccessGate component); 3 cost blocks (Fixed/Variable/Operator); owner-operator vs. employed driver toggle; real-time CPM + margin calculation; save/load via `/api/cpm/save` + `/api/cpm/saved`
- **LP-TOOL-002 Load Profitability Analyzer** (`/tools/load-analyzer`): New page + backend endpoints; auto-pulls saved CPM from TCO Calculator; GO / NEGOTIATE / DECLINE verdict with color-coded cards; NEGOTIATE shows counter-offer rate; save/load via `/api/tools/load-save` + `/api/tools/load-saved`; **Analysis History** (last 10 runs, newest first, click-to-restore) via `/api/tools/load-history` + `db.load_analysis_history`
- **Coach access fix**: `_require_paid` and `/api/tools/access` now grant automatic access to `vince@launchpathedu.com`
- **ToolsIndexPage updated**: Dynamic access check (`/api/tools/access`), shows ACCESS GRANTED / PORTAL / ENROLLED MEMBERS ONLY based on login state; FREE CPM tool kept as secondary section
- **Tested**: 14/14 scenarios passed (backend + frontend)

### Session 14 — Stripe Webhook Fix — Feb 2026
- **Root cause fixed**: Removed incomplete/truncated webhook handler at line 694 that caused a Python `SyntaxError`, taking the entire backend down
- **Webhook routes**: Both `POST /api/webhook/stripe` AND `POST /api/stripe-webhook` now handled by a single complete handler with full business logic (updates `payment_transactions`, `user_access`, MailerLite, and sends confirmation email)
- **`COACH_EMAIL` variable**: Added missing module-level `COACH_EMAIL` variable to `server.py` — it was referenced ~10 times but never defined, causing 500 errors on coach login
- **Tested**: 6/6 backend tests passed including valid Stripe HMAC signature end-to-end test

### Session 13 — Admin Module Editor — Mar 2026
- **`/admin/modules`**: Full admin editor for all 10 modules (Ground 0 + Modules 1-9); login-gated (coach only); sidebar module selector; per-lesson Vimeo URL + PDF URL fields; description editor; save/load via MongoDB `module_content` collection
- **Backend**: `GET/PUT /api/admin/module-content/{id}` (admin); `GET /api/portal/module-urls/{id}` (public)
- **Ground0LessonPlayer**: Now auto-fetches URL overrides on mount — Vimeo URLs render as iframes, PDF URLs become active download links
- **VideoLessonWorkbench**: Same URL fetch pattern; admin-set Vimeo URL takes priority over static `videoUrl: null`
- Scaffold Portal Modules 2–9 (stub remaining modules with lesson structure, locked state)
- Twilio SMS notifications to Vince on new admission (credentials needed)
- Stripe webhook secret for production signature verification

## P2 (Future / Backlog)
- `/case-studies` page
- `/conditional-rating` page
- Downloadable PDF for 16 Deadly Sins page
- Refactor monolithic server.py into APIRouter modules
- Admin Module Editor for content management
