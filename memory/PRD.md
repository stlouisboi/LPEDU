# LaunchPath Transportation EDU — Site Rebuild

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU on the Emergent platform. The site must reflect the "Onyx Standard" design system — dark, minimalist, premium, "Vanta for new trucking authorities" aesthetic. The homepage is the first deliverable, with inner pages and an Operator Portal to follow.

## Architecture
- **Frontend**: React.js (SPA)
- **Backend**: FastAPI (secure proxy to MailerLite)
- **Database**: MongoDB (not used — static content + MailerLite for leads)
- **Design System**: "Onyx/Paper" alternating theme (evolved from "Refined Dark")

## Design System Rules (Onyx/Paper)
### Dark Sections (--bg-onyx: #1B2A4A)
- Background: `#1B2A4A` (deep navy)
- Text: `#f4f7fb` (var --text), muted: `#dce6f0` (var --text-muted)
- Borders: `#2A3A5A` (var --divider-dark)
- Gold label: `#C9A84C` (var --gold-brand)

### Light Sections (--bg-paper: #F5F5F5)
- Background: `#F5F5F5` (near white)
- Heading text: `#1B2A4A` (var --text-paper-heading)
- Body text: `#1A1A1A` (var --text-paper)
- Muted text: `#666666` (var --text-paper-muted)
- Borders: `#DDDDDD` (var --divider-light)

### Accent Colors (unchanged)
- `--orange: #E8590F` — ONLY action/CTA color
- `--red: #ef4444` — penalty/violation amounts
- "Standard" is always a proper noun — capitalize everywhere.

## Routing
- `/` → `pages/HomePage.jsx`
- `/knowledge-center` → `pages/KnowledgeCenterIndex.jsx`
- `/knowledge-center/all-checklists` → `pages/knowledge-center/AllChecklists.jsx`
- `/knowledge-center/new-entrant-safety-audit-brief` → `pages/knowledge-center/NewEntrantAuditBrief.jsx`
- `/knowledge-center/hos-compliance-brief` → `pages/knowledge-center/HOSComplianceBrief.jsx`
- `/knowledge-center/maintenance-records-brief` → `pages/knowledge-center/MaintenanceRecordsBrief.jsx`
- `/knowledge-center/insurance-continuity-brief` → `pages/knowledge-center/InsuranceContinuityBrief.jsx`
- `/knowledge-center/drug-alcohol-program-brief` → `pages/knowledge-center/DrugAlcoholBrief.jsx`
- `/about` → `pages/AboutPage.jsx`
- `/contact` → `pages/ContactPage.jsx`
- `/readiness` → `pages/ReadinessPage.jsx` (multi-step diagnostic)
- `/auto-diagnostic` → `pages/AutoDiagnosticPage.jsx`

## Homepage Section Order (Final — post Design Consolidation Brief)
1. **Navbar** — Logo, nav links, orange "Portal" CTA
2. **Hero** — DARK. H1, FMCSA brief card, CTA
3. **System Diagram** — DARK. "Authority Protection System" animated SVG
4. **Deadly Sins** — LIGHT. 2×2 failure buckets, scroll-triggered reveal
5. **Penalty Table** — DARK. Infrastructure + violation exposure tables
6. **TCO Calculator** — LIGHT. Interactive exposure calculator
7. **Three Paths** — DARK. LaunchPath vs alternatives
8. **About / Metric Band** — DARK. 49 | 96.4% | 10+ stats + philosophical line
9. **About / Founder** — LIGHT. Vince Lawrence section + video CTA hook
10. **Next Step** — DARK. 4-step enrollment sequence + "Apply" CTA
11. **Footer**

*(FourPillarsSection removed per Design Consolidation Brief)*

## Key Stats (AboutSection — Static, no animation)
- **49** — Authorities audited in the LaunchPath development framework
- **96.4%** — Carriers who avoid first-year authority loss with documented systems
- **10+** — Years building operational compliance systems before LaunchPath was founded
- Philosophical line: *"This is not a compliance lecture. This is loss prevention."*

## Backend API Endpoints
- `POST /api/contact` → Submits contact form to MailerLite (field: `lead_source: "contact_form"`)
- `POST /api/diagnostic` → Submits diagnostic results to MailerLite (field: `lead_source: "diagnostic_tool"`)

## MailerLite Integration
- Live and functional. API key stored in `/app/backend/.env`
- Custom fields: `first_name`, `lead_source`, `readiness_score`, `readiness_level`, `diagnostic_pillar_*`, etc.
- Segments configured for contact vs. diagnostic leads

## Prioritized Backlog

### P0 — Completed
- [x] Full homepage (8 sections wired + Onyx/Paper alternating theme)
- [x] Knowledge Center (5 briefs + print bundle)
- [x] About page (`/about`)
- [x] Contact page (`/contact`) — MailerLite integrated, live
- [x] MailerLite contact form integration (`POST /api/contact`)
- [x] MailerLite diagnostic integration (`POST /api/diagnostic`)
- [x] Auto-Diagnostic Tool (`/readiness` and `/auto-diagnostic`)
- [x] Design Consolidation Brief — new stats, removed FourPillars, Onyx/Paper backgrounds

### P1 — Next Up
- [ ] Build `/ground-0-briefing` page — 6-lesson structured onboarding flow
- [ ] Add actual video URL to "Watch" CTA when YouTube video is ready

### P2 — Tool Pages
- [ ] `/auto-method` — AUTO method explainer page

### P3 — Future
- [ ] Operator Portal (JWT or Firebase Auth — decision pending)
- [ ] Members-only content gating
- [ ] `/resources` page

## File Reference
- `/app/frontend/src/App.js` — Router configuration
- `/app/frontend/src/index.css` — CSS variables (Onyx/Paper theme)
- `/app/frontend/src/pages/HomePage.jsx` — Full homepage assembly
- `/app/frontend/src/components/FadeIn.jsx` — Scroll-reveal wrapper
- `/app/frontend/src/components/HeroSection.jsx` — DARK
- `/app/frontend/src/components/SystemDiagramSection.jsx` — DARK
- `/app/frontend/src/components/DeadlySinsSection.jsx` — LIGHT
- `/app/frontend/src/components/PenaltyTableSection.jsx` — DARK
- `/app/frontend/src/components/TCOSection.jsx` — LIGHT
- `/app/frontend/src/components/ThreePathsSection.jsx` — DARK
- `/app/frontend/src/components/AboutSection.jsx` — DARK (metric band) + LIGHT (founder)
- `/app/frontend/src/components/NextStepSection.jsx` — DARK
- `/app/frontend/src/components/FooterSection.jsx`
- `/app/backend/server.py` — MailerLite proxy
- `/app/backend/.env` — API key storage
