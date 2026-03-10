# LaunchPath Transportation EDU — TCO Calculator Homepage

## Original Problem Statement
LaunchPath Transportation EDU TCO Calculator Homepage Embed Brief.
Reposition the TCO Calculator from a gated lead magnet to a live decision tool embedded on the homepage.
Placement: Between the Cost Exposure / Penalty Table section and the Three Paths comparison table.

## Architecture
- **Frontend**: React.js (single-page app)
- **Backend**: FastAPI (not used for this project — pure frontend)
- **Database**: MongoDB (not used — static content + client-side calculator)
- **Design System**: Dark navy, gold accents (#c8963e), IBM Plex Mono labels, Barlow Condensed headlines

## Pages / Sections Built
1. **Status Bar** — FMCSA system status indicators
2. **Navbar** — LaunchPath branding, desktop/mobile navigation
3. **Hero Section** — "90-Day Compliance Operating Standard" + Entry Protocol card
4. **Four Pillars Section** — Insurance Continuity, Cash-Flow Oxygen, Authority Protection, Compliance Backbone
5. **4-Step Operating Sequence** — Ground 0 → AUTO Diagnostic → Admission → 90-Day System
6. **Cost Exposure / Penalty Table** (COMPLIANCE DATA) — Required infrastructure costs + Documented violation exposure
7. **TCO Calculator — RUN YOUR OWN NUMBERS** ← KEY SECTION
8. **Three Paths Comparison** — Trial-and-error vs. Consultant vs. LaunchPath Standard
9. **Footer**

## Critical Design Rules Implemented
- Penalty Table → Calculator → Three Paths (sequence is load-bearing — NOT inverted)
- No email gate on calculator
- No CTA between calculator section and Three Paths section
- Output displays plain dollar figures only (no color-coded meters)
- Static line: "The LaunchPath 90-Day Standard is priced at $5,000."
- Mobile: full-width inputs, stacked layout

## Calculator Outputs (5 required by brief)
1. Estimated Annual Compliance Infrastructure Exposure
2. Estimated Cost — Single Out-of-Service Violation (fleet-scaled)
3. Estimated Insurance Premium Increase — 2 Years Post-CSA Event
4. Total Estimated Exposure — Authority Revocation & Recovery Cycle
5. LaunchPath 90-Day Standard: $5,000 (static line, gold text)

## What's Been Implemented (as of 2026-03-10)

### Homepage v3 — "The Onyx Standard" (Current)
Complete redesign per LaunchPath_Emergent_Brief.docx directives:
- **5 sections only**: Hero → Four Pillars → 16 Deadly Sins → Proof+Founder → Next Step
- **Design system**: Manrope (headlines) + Inter (body) + JetBrains Mono (data only)
- **CTA color**: LaunchPath Orange (#E8590F) — procedural, attention-signaling
- **One CTA above fold**: "Begin Readiness Test" (diagnostic entry, not enrollment)
- **One CTA at bottom**: "Apply for the 90-Day Standard"
- **TCO Calculator + Three Paths moved OFF homepage** (reserved for subpages)
- **Vince Lawrence real photo** + corrected credentials (OSHA, manufacturing mgmt, NOT "trucking industry")
- **Metric band**: 200+, 94% audit pass, 20+ years, 0 income claims
- **Voice**: Plain English, no hype, no urgency, no income claims

### Design Changes from v2 → v3
- Removed: SYSTEM_STATUS_MONITOR status bar
- Removed: IBM Plex Mono overuse
- Removed: All-caps screaming
- Removed: Red everywhere (only on FMCSA penalty data)
- Added: Manrope 700 headlines, generous breathing room
- Added: LaunchPath Orange (#E8590F) for CTAs only
- Added: JetBrains Mono reserved for data/codes only
- Full LaunchPath homepage replica matching launchpathedu.com design system
- Native compliance exposure calculator (5 outputs per brief spec)
- Framing copy: exact text from brief ("The penalty table shows documented ranges...")
- Italic closing framing: "This is not a projection. It is arithmetic based on documented FMCSA enforcement data."
- Mobile responsive layout
- All section data matches existing launchpathedu.com content

## Test Results
- Testing agent: 97% pass rate
- Section sequence confirmed: Penalty(Y=2065) → TCO(Y=3350) → ThreePaths(Y=3999)
- Calculator: 1-truck $46,850 total exposure vs $5,000 LaunchPath (ROI self-evident)
- No CTA between calculator and Three Paths confirmed

## Prioritized Backlog
### P0 (Complete)
- [x] Full homepage with penalty table
- [x] TCO Calculator with 5 required outputs
- [x] Three Paths comparison table
- [x] Correct section sequence
- [x] No email gate
- [x] Mobile responsive

### P1 (Future)
- [ ] Swap native calculator for iframe of tco.base44.app once Pre-Embed Fix is deployed
- [ ] Integrate with launchpathedu.com codebase directly
- [ ] Add scroll-triggered animations for section reveals
- [ ] Add anchor links in navbar to jump to specific sections

### P2 (Backlog)
- [ ] Add "download/print" PDF of results
- [ ] Track calculator completions with analytics
- [ ] A/B test with different calculator input layouts
