# LaunchPath Transportation EDU — Site Rebuild

## Original Problem Statement
Full-site rebuild for LaunchPath Transportation EDU. Homepage = primary sales/conversion asset. Inner pages = resource hub. Operator Portal = future gated section.

## Architecture
- **Frontend**: React.js (SPA, react-router-dom)
- **Backend**: FastAPI (secure proxy to MailerLite)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Manrope (headings), Inter (body), JetBrains Mono (data/code)

## Visual Enhancement Layer (Option B+C — Mar 2026)
- **Hero**: Animated gold dot-grid background, 5rem+ headline, gold CTA button
- **Philosophical Lines**: Near-black `#060D18` bg + large faded gold quotation mark + gold bordered lines — clearly distinct from all surrounding sections
- **Section bg variety**: 4 distinct dark tones (`#002244`, `#001530`, `#001A33`, `#060D18`) + 3 light sections with `3px gold top border`
- **FourPillars cards**: Hover lift (`translateY(-6px)`) + gold glow box-shadow
- **FailureReality stats**: Count-up animation via IntersectionObserver
- **Navbar**: Gold scroll progress bar at bottom of header
- **ThreePaths**: LaunchPath row has gold left bar accent + deeper bg


| Token | Value | Role |
|---|---|---|
| `--bg-onyx` | `#002244` | Dark section background |
| `--bg-paper` | `#F5F6F7` | Light section background |
| `--gold-primary` / `--gold-brand` | `#C5A059` | Brand gold (CTAs, labels, accents) |
| `--gold-light` | `#D4B87A` | Gold hover state |
| `--navy-deep` | `#001A33` | Footer background |
| `--card-dark` | `#0F1E35` | Card bg in dark sections |
| `--incident-dark-1` | `#0D1929` | Incident report row even |
| `--incident-dark-2` | `#111E30` | Incident report row odd |
| `--pattern-note-bg` | `#1A2A3A` | Pattern note strip |
| `--divider-dark` | `#1E3355` | Borders on dark sections |
| `--divider-light` | `#DDDDDD` | Borders on light sections |
| `--text-paper` | `#1A1A1A` | Body on light bg |
| `--text-paper-heading` | `#002244` | Headings on light bg |
| `--text-paper-muted` | `#666666` | Muted on light bg |
| `--text-muted-dark` | `#CCCCCC` | Muted on dark bg |

**CTA Button Rule:** Gold background (`--gold-primary`) + Navy text (`--bg-onyx`)
**Operator Portal Button:** Navy bg + Gold border + Gold text

## Homepage Section Order (Final — Master Brief v2)
1. **Navbar** — logo, nav links, OPERATOR PORTAL (gold border, gold text)
2. **Hero** — DARK. New body copy, gold CTA
3. **FourPillars** — DARK. 4 gold-bordered cards on #0F1E35 bg
4. **SystemDiagram** — DARK. AUTO diagram
5. **PhilosophicalLine 1** — DARK. "The wise carrier builds the system before the audit..."
6. **FailureReality** — DARK. Incident report + 16-point checklist + stats strip + closing line
7. **PenaltyTable** — DARK. 2-col: Direct Penalties | Hidden Operational Drain (8 rows)
8. **PhilosophicalLine 3** — DARK. "This program does not make you compliant..."
9. **TCO** — LIGHT. Interactive calculator, $2,500 price line
10. **ThreePaths** — DARK. GO/WAIT/STOP — $2,500 for LaunchPath
11. **PhilosophicalLine 2** — DARK. "Most carriers wait until something goes wrong..."
12. **Founder (About)** — LIGHT. Vince Lawrence, manufacturing bg, pull quote, credential bar
13. **WhoNotFor** — LIGHT. 4 disqualifiers
14. **NextStep** — DARK. 4-stage sequence (01-04) + gold CTA
15. **FinalCTA** — DARK. Admission gate + gold CTA
16. **Footer** — #001A33. Wordmark + nav + legal

## Key Copy Rules
- LaunchPath price: **$2,500** (NOT $5,000)
- Vince credentials: "20+ YRS MANUFACTURING MANAGEMENT & LEADERSHIP" — NOT DOT/trucking experience
- "The Standard" is always a proper noun — capitalize everywhere
- Gold = brand color, Orange = removed

## Routing
- `/` → `pages/HomePage.jsx`
- `/knowledge-center` → KC index + 5 articles
- `/about` → `pages/AboutPage.jsx`
- `/contact` → `pages/ContactPage.jsx`
- `/readiness` → `pages/ReadinessPage.jsx` (multi-step diagnostic)
- `/auto-diagnostic` → `pages/AutoDiagnosticPage.jsx`

## Backend API Endpoints
- `POST /api/contact` → MailerLite (lead_source: "contact_form")
- `POST /api/diagnostic` → MailerLite (lead_source: "diagnostic_tool")

## Prioritized Backlog

### P0 — Completed
- [x] Full homepage rebuild (15 sections per Master Brief v2 + Color Correction Brief)
- [x] LaunchPath color system (#002244 navy + #C5A059 gold)
- [x] Price change $5,000 → $2,500 everywhere
- [x] FourPillars restored with gold-bordered cards
- [x] FailureReality section (incident report format)
- [x] PhilosophicalLine components (3 instances)
- [x] WhoNotFor section
- [x] FinalCTA section
- [x] New Navbar (gold Operator Portal button)
- [x] New Footer
- [x] Knowledge Center (5 briefs)
- [x] About + Contact pages
- [x] MailerLite integration (contact + diagnostic)
- [x] Auto-Diagnostic Tool (/readiness + /auto-diagnostic)
- [x] Text brightness pass — `--text-subtle` #a0b0bf → #dde5ec, rgba opacities raised site-wide, Footer greys #999/#666 → #BBB/#AAA, ternary color values fixed in Ground0+Portal (Mar 2026)

### P1 — Next Up
- [x] Build `/ground-0-briefing` page — 6-lesson accordion, email capture, inline confirmation (Mar 2026)
- [x] Build `/portal` page — cohort curriculum sidebar, locked modules, Stripe payment gate (Mar 2026)
- [x] Build `/reach-assessment` — 15-question REACH diagnostic with GO/WAIT/NO-GO scoring and risk map (Mar 2026)
- [x] Build `/auto-method` — AUTO Risk Doctrine page with 4 directions, pillars, guards, philosophy (Mar 2026)
- [x] Build `/operating-standard` — The LaunchPath Operating Standard page (8 sections, institutional framework positioning) + two-zone navbar redesign (Mar 2026)
- [x] Google Auth + server-issued session JWT for Operator Portal access (Mar 2026)
- [x] Homepage Admission Gate section — 3 qualification conditions, "Begin Ground 0 Briefing" CTA to /ground-0-briefing (Mar 2026)
- [x] Knowledge Center cross-linking — "Part of the LaunchPath Operating Standard Library" footer strip on all 5 articles (Mar 2026)

### P2 — Tool Pages
- [x] `/auto-method` — AUTO method explainer page (COMPLETE)

### P3 — Future
- [ ] Members-only content gating (post-auth, lock modules 1-7 to paying users)
- [ ] B2B landing page for insurers/fleet operators
- [ ] Video integration for homepage "Watch the Overview" CTA

## File Reference
- `/app/frontend/src/App.js` — Router
- `/app/frontend/src/index.css` — CSS color token system
- `/app/frontend/src/pages/HomePage.jsx` — Full section assembly
- `/app/frontend/src/components/` — All section components
- `/app/backend/server.py` — MailerLite proxy
- `/app/backend/.env` — MailerLite API key
