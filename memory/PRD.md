# LaunchPath Transportation EDU — Site Rebuild

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU on the Emergent platform. The site must reflect the "Onyx Standard" design system — dark, minimalist, premium, "Vanta for new trucking authorities" aesthetic. The homepage is the first deliverable, with inner pages and an Operator Portal to follow.

## Architecture
- **Frontend**: React.js (SPA)
- **Backend**: FastAPI (not used — pure frontend currently)
- **Database**: MongoDB (not used — static content)
- **Design System**: "Refined Dark" (evolved from "Onyx Standard") — higher contrast, brighter text, defined card borders

## Design System Rules (Refined Dark)
- `--bg: #020408` (primary background)
- `--bg-2: #0B1120` (section alternate)
- `--bg-3: #1e293b` (hover states)
- `--orange: #E8590F` — ONLY action/CTA color (NO gold on CTAs)
- `--text: #f4f7fb`, `--text-muted: #dce6f0`, `--text-subtle: #a0b0bf`
- `--border: rgba(255,255,255,0.10)` — higher contrast than original
- `--gold: #8A96A3` — used ONLY for overline labels and data callouts
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

## Homepage Section Order (Complete High-Ticket Sales Architecture)
1. **Navbar** — Logo, nav links, orange "Portal" CTA
2. **Hero** — H1, Knowledge Center tie-in sentence, CTA with sublabel, FMCSA brief card
3. **Four Pillars** — New tighter copy with brief deep-links, "View all 5 briefs" CTA
4. **System Diagram** — "Authority Protection System" animated SVG with 4 nodes
5. **Deadly Sins** — 2×2 failure buckets with scroll-triggered reveal
6. **Penalty Table** — Infrastructure + violation exposure tables
7. **TCO Calculator** — Interactive exposure calculator with orange CTA
8. **Three Paths** — LaunchPath vs alternatives (orange highlight on LaunchPath row)
9. **About / Proof + Founder** — Animated metric counters + Vince photo + video CTA hook
10. **Next Step** — 4-step enrollment sequence + "Apply for the 90-Day Standard" CTA
11. **Footer**

## Animation System
- `FadeIn.jsx` — IntersectionObserver scroll-triggered fade+translateY reveal (all sections)
- `AnimatedCounter.jsx` — Count-up animation for metric band stats (200+, 94%, 20+, 0)
- **Hero background**: Animated dot grid + scan beam (orange dashed horizontal line scanning down)
- **Hero elements**: Staggered entrance animations (overline → H1 → paragraphs → CTA)
- **FMCSA brief card rows**: Staggered `fadeInRow` keyframes
- **TCO output**: `tcoCountIn` stagger on each row reveal
- **System Diagram**: Animated SVG dashes (already built-in)

## Video Hook
- "Watch: The 3-Minute System Overview" CTA block in the About section
- Orange play button + subtitle + "WATCH →" link
- URL currently points to launchpathedu.com/overview — swap when video is ready

## Knowledge Center (Complete)
- Index page with all 5 brief cards + "Download All Checklists" hero
- 5 article pages with full brief content
- Print-optimized all-checklists bundle page

## Prioritized Backlog

### P0 — Next Up
- [ ] Build `/about` page (founder story, firm positioning)
- [ ] Build `/contact` page with form
- [ ] Add actual video URL to "Watch" CTA in About section (user to provide)

### P1 — Static Pages
- [ ] `/resources` page
- [ ] Connect navbar links to actual pages (Method, Diagnostic, Ground 0)

### P2 — Tool Pages
- [ ] `/auto-diagnostic` — 4-pillar readiness assessment tool
- [ ] `/ground-0-briefing` — structured 6-lesson onboarding
- [ ] `/auto-method` — AUTO method explainer

### P3 — Future
- [ ] Operator Portal (Firebase Auth or JWT — decision pending)
- [ ] Members-only content gating on `/resources`
- [ ] Anchor nav links to page sections
- [ ] Embed actual founder video in About section

## File Reference
- `/app/frontend/src/App.js` — Router configuration
- `/app/frontend/src/index.css` — CSS variables + animation keyframes (Refined Dark)
- `/app/frontend/src/pages/HomePage.jsx` — Full homepage assembly
- `/app/frontend/src/components/FadeIn.jsx` — Scroll-reveal wrapper
- `/app/frontend/src/components/AnimatedCounter.jsx` — Count-up animation
- `/app/frontend/src/components/HeroSection.jsx`
- `/app/frontend/src/components/FourPillarsSection.jsx`
- `/app/frontend/src/components/SystemDiagramSection.jsx`
- `/app/frontend/src/components/DeadlySinsSection.jsx`
- `/app/frontend/src/components/PenaltyTableSection.jsx`
- `/app/frontend/src/components/TCOSection.jsx`
- `/app/frontend/src/components/ThreePathsSection.jsx`
- `/app/frontend/src/components/AboutSection.jsx`
- `/app/frontend/src/components/NextStepSection.jsx`
- `/app/frontend/src/components/FooterSection.jsx`
