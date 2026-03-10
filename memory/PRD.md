# LaunchPath Transportation EDU — Site Rebuild

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU on the Emergent platform. The site must reflect the "Onyx Standard" design system — dark, minimalist, premium, "Vanta for new trucking authorities" aesthetic. The homepage is the first deliverable, with inner pages and an Operator Portal to follow.

## Architecture
- **Frontend**: React.js (single-page app)
- **Backend**: FastAPI (not used — pure frontend currently)
- **Database**: MongoDB (not used — static content)
- **Design System**: "Onyx Standard" — Manrope + Inter + JetBrains Mono fonts, LaunchPath Orange (#E8590F) as sole action color, deep dark backgrounds

## Design System Rules (Onyx Standard)
- `--bg: #020408` (primary background)
- `--bg-2: #0B1120` (section alternate)
- `--bg-3: #1e293b` (hover states)
- `--orange: #E8590F` — ONLY action/CTA color
- `--text: #f0f4f8`, `--text-muted: #c8d4de`, `--text-subtle: #8a99aa`
- `--gold: #8A96A3` — used only for overline labels and data callouts (NOT gold-colored)
- NO gold/yellow on CTAs. Orange only.
- "Standard" is always a proper noun — capitalize everywhere.

## Homepage Sections (5 + Footer)
1. **Navbar** — Logo, nav links, orange "Portal" CTA button
2. **Hero** — H1, orientation copy, FMCSA New Entrant Brief data card, "Begin Readiness Test" CTA
3. **Four Pillars** — 4-card grid with hover states
4. **Deadly Sins** — 2×2 grid of 4 failure buckets (Records, Insurance, Driver, Financial)
5. **About / Proof + Founder** — Metric band (4 stats) + Vince Lawrence founder section
6. **Next Step** — 4-step sequence, "Apply for the 90-Day Standard" CTA
7. **Footer** — Logo + tagline, 4 link columns, legal line

## What's Been Implemented (as of 2026-02-XX)

### Homepage v3 — "The Onyx Standard" (Complete)
- 5-section homepage per LaunchPath_Emergent_Brief.docx
- Manrope / Inter / JetBrains Mono type system
- LaunchPath Orange (#E8590F) CTAs only
- Vince Lawrence real photo + correct credentials (OSHA, Navy, manufacturing mgmt)
- 4-metric band: 200+, 94%, 20+, 0
- Voice: plain English, no hype, no income claims

### Refactor Polish (completed this session)
- Navbar CTA: was `var(--gold)` gray → now `var(--orange)` correctly
- Navbar CTA label: "Enter" → "Portal"
- "Standard" capitalized as proper noun throughout all components
- FourPillars cards: hover state added (`--bg-2` → `--bg-3`)
- Footer tagline: "standard" → "Standard"

## Routing
- `/` → `pages/HomePage.jsx`
- `/knowledge-center` → `pages/KnowledgeCenterIndex.jsx`
- `/knowledge-center/new-entrant-safety-audit-brief` → `pages/knowledge-center/NewEntrantAuditBrief.jsx`

## Article Template Structure (Onyx Standard)
- Hero: overline tag (JetBrains Mono), H1 (Manrope 700), subhead, meta row (read time | date | critical pill)
- Executive summary band: bullets + download CTA
- Prose body: max-width 760px, sections with SectionHeader / Body / Callout / CheckList components
- Auto-fail table: full-width bg-2 band, horizontally scrollable on mobile
- Audit binder: tabbed checklist with print/PDF support (`window.print()` + `@media print` CSS)
- Bottom CTA: orange primary + ghost secondary

## Prioritized Backlog

- `/knowledge-center/maintenance-records-brief` → `pages/knowledge-center/MaintenanceRecordsBrief.jsx`

### P0 — Next Up
- [ ] Drug & Alcohol Program Installation Brief (last in series)
- [ ] Readability/contrast refinement (Option C — refined dark with higher contrast) across all pages
- [ ] Static pages: About, Contact (with form), Resources

### P1 — Static Pages
- [ ] `/about` page
- [ ] `/contact` page (with form)
- [ ] `/resources` page
- [ ] `/knowledge-center` index page

### P2 — Tool Pages
- [ ] `/auto-diagnostic`
- [ ] `/ground-0-briefing`
- [ ] `/auto-method`

### P3 — Future
- [ ] Operator Portal (Firebase Auth or JWT — decision pending)
- [ ] Members-only content gating on `/resources`
- [ ] Scroll-triggered entrance animations
- [ ] Anchor nav links to page sections

## File Reference
- `/app/frontend/src/App.js` — section assembly
- `/app/frontend/src/index.css` — CSS variables + global styles
- `/app/frontend/src/components/Navbar.jsx`
- `/app/frontend/src/components/HeroSection.jsx`
- `/app/frontend/src/components/FourPillarsSection.jsx`
- `/app/frontend/src/components/DeadlySinsSection.jsx`
- `/app/frontend/src/components/AboutSection.jsx`
- `/app/frontend/src/components/NextStepSection.jsx`
- `/app/frontend/src/components/FooterSection.jsx`
- `/app/design_guidelines.json` — foundational Onyx Standard spec
