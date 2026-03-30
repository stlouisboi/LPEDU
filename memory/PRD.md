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
- Live E2E Stripe purchase test ($1 real charge to verify full pipeline: Stripe → Railway → MailerSend → MailerLite)
- Replace Vimeo placeholder URLs in portal modules via /admin/modules

### P2 — Medium Priority
- Custom branded og:image for /bundle, /program, /compliance-library (blocked on AI image quota)
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
