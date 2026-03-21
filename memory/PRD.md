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

## What's Been Implemented

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

## P0/P1/P2 Backlog

### P1: Content
- Populate real Vimeo and PDF URLs for portal modules via /admin/modules
- Upload actual PDF files for all 12 product SKUs via /admin/products

### P2: Features
- Module visibility toggle in admin module editor
- "16 Deadly Sins" PDF upload to activate $17 product (user uploads the file via /admin/products)

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
