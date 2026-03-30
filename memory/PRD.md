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

### Phase 33: Ground 0 Content Additions (Mar 2026)
- Lesson 0.7 "What Happens After GO" — GO-path only view after decision
- Copy patches for Lessons 0.2, 0.3, 0.6 (standardBridge, goBridge, waitBridge)
- Testing: 100% (12/12) — iteration_88

### Phase 34: Monthly Audit Readiness Dashboard + Email (Mar 2026)
Backend: `/app/backend/routes/audit_readiness.py`
- `GET /api/audit-readiness` — carrier's readiness record (auto-creates on first call)
- `POST /api/audit-readiness/answers` — submit answers, compute colors server-side
- `GET /api/admin/audit-readiness` — admin list of all carriers
- `GET /api/admin/audit-readiness/{user_id}` — per-carrier detail
- `PUT /api/admin/audit-readiness/{user_id}/domain/{domain}` — SC verify/note/override
- `POST /api/admin/audit-readiness/{user_id}/send-email` — "Send Now" button trigger
- Scoring logic for all 6 domains (DQ, DA, HOS, VM, IA, AR) with critical domain override rules
- Dynamic email builder via MailerSend — subject, domain blocks, 7-day micro-plan, NOT SURE actions

Frontend components:
- `AuditReadinessDashboard.jsx` — portal section, enrolled vs teaser states
- `AuditCheckInFlow.jsx` — 11-question modal wizard, one domain at a time, prior answers carried forward
- `AuditDomainCard.jsx` — self-reported LEFT + SC-verified RIGHT, expandable detail
- `AdminAuditReadinessPage.jsx` + `/admin/audit-readiness` route
- `AdminNavBar.jsx` — "Audit Readiness" link added
- `App.js` — admin route registered

MongoDB collection: `audit_readiness`
- `domainAnswers`, `domainColors`, `domainUpdated`, `overallStatus`, `lastCompleted`
- `scVerified` per domain: verified/date/note/override
- `emailHistory` array
- Stale flag: domain not updated in 45+ days

Testing: 100% (18/18) — iteration_89

### Phase 33b: Lighthouse Performance Fixes (Mar 2026)
- LCP preload link in `_document.jsx` (fetchPriority="high")
- Browserslist updated to last 2 versions of modern browsers (drops Array.at, flat etc. polyfills)
- Cache-Control headers for `/_next/static/*` (1 year immutable) in `next.config.js`
- Firebase logo and Vincent.png: explicit width/height attributes (Navbar, Footer, CredibilityStrip, About, VinceCTA)
- Hamburger button: `aria-label` + `aria-expanded`
- CORS_ORIGINS set to `*` in backend/.env
- Auth redirect in Ground0LessonPlayer.jsx uses `process.env.REACT_APP_AUTH_URL`

### Phase 32: Ground 0 Content Additions (Mar 2026)
(see Phase 33 above — same sprint)

### Phase 31: Deployment Health Checks (Mar 2026)
- Auth redirect now uses REACT_APP_AUTH_URL env var
- CORS opened to *

### Previous Phases (pre-March 2026)
- MailerLite Groups integration (not Tags — user's tier limitation)
- Custom /thank-you page with Stripe success_url routing
- /compliance-library, /16-deadly-sins, /safety-audit-prep-pack pages with updated copy
- Homepage hero, stat blocks, Ground 0 CTA in Navbar
- PasswordInput.jsx crash fix (EyeSlash for Phosphor Icons v2)
- Product PDF upload + download pipeline
- Ground0LessonPlayer 6-lesson diagnostic with GO/WAIT/NO-GO flow

---

## PRIORITIZED BACKLOG

### P0 — Blockers (none currently)

### P1 — High Priority
- Live E2E Stripe purchase test ($1 real charge to verify full pipeline: Stripe → Railway → MailerSend → MailerLite)
- Replace Vimeo placeholder URLs in portal modules via /admin/modules
- Automated monthly email cron job (spec: 30-day cadence for enrolled, 90-day post-cohort) — manual trigger built, cron deferred

### P2 — Medium Priority
- Custom branded og:image for /bundle, /program, /compliance-library (blocked on AI image quota)
- Email capture / interest form inline in Lesson 0.7 (GO-path lead capture)

### P3 — Future / Refactor
- Refactor PortalPage.jsx + Ground0LessonPlayer.jsx (>1500 lines) using next/dynamic modular approach
- Scan-line and blueprint grid visual upgrades to homepage
- REACHAssessmentPage.jsx modular refactor
- Add audit readiness cron job to replace manual "Send Now" trigger

---

## KEY DB SCHEMA
- `product_files`: Maps SKUs to uploaded PDFs
- `product_purchases`: Records checkouts (has_access, access_level: "cohort")
- `audit_readiness`: Monthly self-assessment (domainAnswers, domainColors, scVerified, emailHistory)
- `ground0_progress`: Ground 0 lesson completion (userId, completedLessons, finalDecision, view)

## KEY API ENDPOINTS
- `POST /api/webhook/stripe` — Stripe webhook (MailerSend + MailerLite trigger)
- `GET/POST /api/audit-readiness` — carrier readiness
- `GET/PUT /api/admin/audit-readiness/*` — SC admin
- `POST /api/admin/audit-readiness/{userId}/send-email` — manual email trigger

## DEPLOYMENT
- Frontend: Vercel (auto-deploys from GitHub main)
- Backend: Railway (auto-deploys from GitHub main)
- Push via "Save to Github" in Emergent platform
- MailerLite: Groups API only (Tags API not available on user's plan)
