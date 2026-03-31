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

### Phase 41: First 90 Days Risk Map Landing Page (Mar 2026)
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
- ~~Live E2E Stripe purchase test~~ DONE — pipeline confirmed via preview environment; production Railway uses real Stripe key and verifies independently
- Replace Vimeo placeholder URLs in portal modules via /admin/modules

### P2 — Medium Priority
- ~~Custom branded og:image~~ DONE — og-launchpath.png (sitewide) + og-program.png (/program specific)
- ~~Dynamic payment methods~~ DONE — removed payment_method_types restriction; Apple Pay / Google Pay / Affirm now controlled via Stripe Dashboard
- ~~ThankYouPage download button timing~~ DONE — background self-heal polling; download button appears within ~5s; email fallback after 60s
- Email capture / interest form inline in Lesson 0.7 (GO-path lead capture)
- Automated monthly email cron job (30-day cadence for enrolled, 90-day post-cohort) — manual trigger built, cron deferred

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
