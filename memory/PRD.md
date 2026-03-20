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
- **Auth**: JWT-based custom auth
- **CI/CD**: GitHub Actions → Vercel (frontend) / Railway (backend)

## Typography Standard (Station Custodian Approved)
- **Heading**: Playfair Display 700 — all page headlines, section titles, module headers
- **Body**: Atkinson Hyperlegible 400/500 — all paragraph text, `html { font-size: 19px }` base (1rem = 19px desktop), 1.65 line height
- **Label/Code**: IBM Plex Mono 500 — all LP system codes (LP-BRF-01, LP-SYS-03), labels
- **Sources**: @fontsource npm packages installed
- Content pages (Knowledge Center articles + briefs): light cream background (#f7f4ee), navy text (#001A33)
- Marketing pages: dark navy background, white text (unchanged)

## Key Routes
- `/` → HomePage
- `/reach-diagnostic` → REACHAssessmentPage (REACH Test — primary funnel entry)
- `/auto-diagnostic` → Redirects to `/reach-diagnostic`
- `/ground-0-briefing` → Ground0BriefingPage
- `/ground-0-complete` → Ground0CompletePage
- `/launchpath-standard` → LaunchPathStandardPage (cohort decision page)
- `/admission` → AdmissionPage (cohort admission form — 6-field + Stripe payment)
- `/admission/confirmed` → AdmissionConfirmedPage (post-payment enrollment confirmation)
- `/admin/admissions` → AdminAdmissionsPage (login-gated, coach-only)
- `/operating-standard` → OperatingStandardPage (framework explainer — educational)
- `/auto-method` → AutoMethodPage
- `/16-deadly-sins` → SixteenSinsPage
- `/compliance-library` → ComplianceLibraryPage
- `/about` → AboutPage
- `/knowledge-center` → KnowledgeCenterPage + articles

## Cohort Enrollment Flow (Funnel)
1. Cold traffic → `/auto-diagnostic` (redirects to REACH test)
2. REACH test completion → GO result → `/launchpath-standard` (decision page)
3. Operator reviews Standard → clicks "Request Admission →" → `/admission`
4. Fills 6-field form → submits → receives `admission_id` → "Proceed to Payment" shown
5. Pays $2,500 via Stripe checkout → `/admission/confirmed?session_id=...`
6. Backend polls/webhook → updates `admission_requests.status = "approved"`
7. Vince notified via MailerSend on submission + payment

## DB Schema

### admission_requests
- carrier_name, email, dot_mc_number, authority_activation_date, compliance_status
- lane: "box_truck" | "semi"
- message, source, submission_date, status ("pending_review" | "approved" | "rejected")
- approved_at (optional)

### payment_transactions
- session_id, admission_id, email, carrier_name, amount, currency
- payment_status, status, created_at, completed_at

---

## Completed Work

### Session 1 (Foundation)
- Full backend API, JWT auth, operator portal, Ground 0 pages, REACH Assessment

### Session 2 (Content Pages)
- HomePage, AutoMethodPage, SixteenSinsPage, AboutPage, ComplianceLibraryPage rewrites

### Session 3 (Cohort Funnel Build) — Mar 2026
- `/launchpath-standard` decision page (7 sections)
- `/admission` updated with 6-field model
- `/api/admission-request` endpoint with MongoDB + MailerLite + MailerSend to Vince
- `/auto-diagnostic` redirects to `/reach-diagnostic`
- All 14 knowledge center CTAs updated to "RUN THE REACH ASSESSMENT"
- REACH "GO" result CTAs point to `/launchpath-standard`
- Navbar + Footer "LaunchPath Standard" → `/launchpath-standard`

### Session 4 (Typography + Stripe + Admin) — Mar 2026
- **Typography Standard** applied globally: Playfair Display, Atkinson Hyperlegible, IBM Plex Mono
- **Light backgrounds**: Knowledge Center briefs + article posts → cream/navy theme
- **Stripe payment**: POST `/api/create-admission-checkout`, GET `/api/admission-payment-status/{id}`, POST `/api/webhook/stripe` → auto-approval on paid
- **AdmissionPage**: "Proceed to Payment — $2,500 →" button shown after form submit
- **AdmissionConfirmedPage**: payment confirmation with status polling
- **AdminAdmissionsPage** at `/admin/admissions`: stats, filter tabs, approval/decline buttons

### Session 5 (Production Deployment Fix) — Mar 2026
- **P0 fix**: Added `--extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/` and `emergentintegrations` to `backend/requirements.txt`
- Root cause: Railway's pip install couldn't find `emergentintegrations` (private package registry) causing server crash on every startup

---

## P0/P1/P2 Backlog

### P1 (High Value, Near Term)
- Populate Gumroad product URLs in ComplianceLibraryPage.jsx (5 products + 1 bundle)
- Add YouTube URL for homepage "Watch the Overview" CTA
- Populate Knowledge Center briefs LP-BRF-07 through LP-BRF-11
- Verify Railway deployment works after requirements.txt fix (user must push to GitHub)

### P2 (Admin & Operational Tools)
- Standardize IBM Plex Mono label sizes across the app (~11.7px is too small in some places)
- Twilio SMS notifications to Vince on new admission (credentials needed)
- Stripe webhook secret (STRIPE_WEBHOOK_SECRET) for production signature verification
- Set production environment variables on Railway (MONGO_URL, STRIPE_API_KEY, MAILERSEND_API_KEY, etc.)

### Future / Backlog
- LP-TOOL-002: Load Profitability Analyzer
- Scaffold Portal Modules 2–9
- `/case-studies` and `/conditional-rating` pages
- Downloadable PDF for 16 Deadly Sins page
- Refactor monolithic server.py into APIRouter modules
