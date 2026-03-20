# LaunchPath Operating System (LPOS) v1.0 — PRD

## Original Problem Statement
Build "LaunchPath Operating System (LPOS) v1.0," a premium full-stack application for new motor carriers. A comprehensive educational and operational platform including compliance content, diagnostic tools, a guided cohort program, and an operator portal.

## Product Vision
Authoritative compliance operating system for new motor carriers. Brand voice: calm, credentialed, no urgency or manufactured scarcity. The Funnel is Sacred: REACH Test → Ground 0 → Admission Form → LaunchPath Standard.

## Architecture
- **Frontend**: React SPA with react-router-dom, CSS-in-JS inline styling
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Email**: MailerLite (subscriber management) + MailerSend (transactional/notifications)
- **Auth**: JWT-based custom auth
- **CI/CD**: GitHub Actions → Vercel
- **Key Routes**:
  - `/` → HomePage
  - `/reach-diagnostic` → REACHAssessmentPage (REACH Test — primary funnel entry)
  - `/auto-diagnostic` → Redirects to `/reach-diagnostic`
  - `/ground-0-briefing` → Ground0BriefingPage
  - `/ground-0-complete` → Ground0CompletePage
  - `/launchpath-standard` → LaunchPathStandardPage (cohort decision page — NEW)
  - `/admission` → AdmissionPage (cohort admission form — UPDATED)
  - `/operating-standard` → OperatingStandardPage (framework explainer)
  - `/auto-method` → AutoMethodPage
  - `/16-deadly-sins` → SixteenSinsPage
  - `/compliance-library` → ComplianceLibraryPage
  - `/about` → AboutPage
  - `/knowledge-center` → KnowledgeCenterPage + articles

## User Personas
- **Primary**: New motor carrier operators — authority activated within 90 days
- **Secondary**: Pre-authority carriers evaluating readiness
- **Buyer**: Operator who has completed Ground 0 and received "GO" on REACH test

## Critical Brand Rules
- Price: $2,500 (cohort). Document System: $497
- Cohort size: 10 carriers maximum
- NO urgency language, countdown timers, or manufactured scarcity
- Funnel entry for cold traffic: `/auto-diagnostic` (→ redirects to REACH test)
- Tool name: "REACH Test" (not "AUTO Diagnostic")

---

## What's Been Implemented

### Session 1 (Foundation)
- Full backend API with FastAPI + MongoDB
- JWT authentication
- Operator portal with implementation sequence
- Ground 0 briefing and completion pages
- REACH Assessment diagnostic tool (5 categories, GO/WAIT/NO-GO scoring)

### Session 2 (Content & Marketing Pages)
- HomePage — full rewrite with PlatformSurface, FailureAnalysis, OperatorQualifier sections
- AutoMethodPage — origin story, expanded guard descriptions, CFR citations, sequential nav
- SixteenSinsPage — "What Happens" sections, AUTHORITY ENDING badges, email gate
- AboutPage — full rewrite per user brief
- ComplianceLibraryPage — price moved from About page

### Session 3 (Funnel Fixes & CTA Updates) — Mar 2026
- **REACH Assessment result screen** — "GO" CTA now points to `/launchpath-standard`
- **LaunchPathStandardPage.jsx** — New cohort decision page (7 sections)
- **AdmissionPage.jsx** — Updated with 6 new fields (carrier_name, email, dot_mc_number, authority_activation_date, compliance_status, lane)
- **Backend `/api/admission-request`** — New endpoint: 6-field model, MongoDB save to `admission_requests`, MailerLite subscriber add, MailerSend notification to vince@launchpathedu.com
- **Routing** — `/auto-diagnostic` redirects to `/reach-diagnostic`
- **Navbar + Footer** — "LaunchPath Standard" now links to `/launchpath-standard`
- **CTA Sweep (8 articles)** — "BEGIN GROUND 0 →" updated to "RUN THE REACH ASSESSMENT →" pointing to `/auto-diagnostic`:
  - FailedAuditPost, UCRRegistrationPost, ClearinghouseSetupPost, BOC3FilingPost, BoxTruckFMCSAPost, ELDExemptionPost, InsuranceSyncPost, NewEntrantProgramPost
- **CTA Sweep (5 briefs)** — "Run the Ground 0 Readiness Test" → "Run the REACH Assessment":
  - MaintenanceRecordsBrief, DrugAlcoholBrief, InsuranceContinuityBrief, HOSComplianceBrief, NewEntrantAuditBrief
- **BriefBundleCTA.jsx** — Secondary link updated to `/auto-diagnostic`

### Previous Session Fixes
- CredibilityStrip.jsx invisible text — CSS variable conflict fixed
- FinalCTASection.jsx sections blending — background and border added
- AboutPage.jsx responsive grid blank space — fixed

---

## DB Schema

### admission_requests (collection)
- carrier_name: string
- email: string
- dot_mc_number: string (optional)
- authority_activation_date: string (optional)
- compliance_status: string (enum: 6 options)
- lane: string ("box_truck" | "semi")
- message: string (optional)
- source: string (always "admission_form")
- submission_date: ISO datetime string
- status: string ("pending_review" | "approved" | "rejected")

### users, user_sessions, ground0_submissions, sins_checklist_leads, portal_progress, portal_notes — existing collections

---

## Key API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/admission-request | Cohort admission (6-field, MongoDB + MailerLite + MailerSend) |
| POST | /api/admission | Legacy admission (MailerLite only) |
| POST | /api/sins-checklist | 16 Sins PDF email gate |
| POST | /api/ground-0-submit | Ground 0 completion capture |
| POST | /api/reach-assessment | REACH test result storage |
| GET  | /api/portal | Operator portal data |
| POST | /api/auth/register | Auth |
| POST | /api/auth/login | Auth |

---

## P0/P1/P2 Backlog

### P0 (Critical, affects revenue/conversion)
- None currently blocking

### P1 (High Value, Near Term)
- Populate Gumroad product URLs in ComplianceLibraryPage.jsx (5 product URLs + 1 bundle)
- Add YouTube URL for "Watch the Overview" CTA on homepage
- Populate Knowledge Center briefs LP-BRF-07 through LP-BRF-11
- Verify GitHub Actions → Vercel deployment pipeline (push a commit and confirm CI passes)

### P2 (Admin & Operational Tools)
- Admin Module: View admission requests (list, status, basic filtering)
- Admin Module: Configure cohort settings (start date, cohort capacity, notification phone)
- Admin Module Editor for coach
- Twilio SMS notifications to Vince on new admission (credentials needed)

### Future / Backlog
- LP-TOOL-002: Load Profitability Analyzer
- Scaffold Portal Modules 2–9
- Dedicated `/case-studies` page
- Dedicated `/conditional-rating` page ("Already got the letter" section)
- Downloadable PDF summary for 16 Deadly Sins page (beyond email gate)
- Refactor monolithic server.py into APIRouter modules
- Admin dashboard for cohort management
