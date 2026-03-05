# Round 3: Coach Review Workflow - Implementation Spec

## Overview
**Focus:** Verification Is the Product. The Coach Is the Verifier.

The coach review workflow is what separates LaunchPath from every self-paced compliance course on the market. A carrier does not just complete tasks — he submits them for review by someone qualified to verify them. That verification is the deliverable.

## Build 3A: Coach Dashboard

### Requirements
The coach dashboard is a task management and carrier monitoring environment. It must display:

| Feature | Description |
|---------|-------------|
| Cohort List | All cohorts the coach is assigned to |
| Carrier Table | Name, cohort week, tasks submitted, tasks pending review, risk level, last activity date |
| Submission Queue | Unreviewed submissions sorted by date (oldest first) |
| At-Risk Carriers | Surface carriers in amber or red at the top of the view |
| Private Notes | Coach notes visible only to coaches and admin |
| Carrier Timeline | Log of submission dates, status changes, and coach actions |

### Design Requirements
- Professional document review tool feel, not a grading system.
- Institutional, clean interface.

## Build 3B: Review Workflow — Submission to Verification

### Workflow Steps
1. **Submission:** Task status changes to `SUBMITTED`.
2. **Review:** Coach opens submission, reviews document/checklist.
3. **Action:** Coach selects one of three actions:
    - **VERIFIED:** Submission meets standard. Task closes. Milestone triggered.
    - **NEEDS CHANGES:** Coach adds written note. Task returns to carrier.
    - **FLAGGED:** Submission reveals compliance risk. Risk level updates to **RED**. Admin notified.
4. **Notification:** Carrier is notified of coach decision (Round 5).
5. **Persistence:** Coach notes are permanent records and cannot be deleted.

## Build 3C: Risk Dashboard

### Automatic Risk Signals
| Signal | Risk Level |
|--------|------------|
| No task submission in 7 days (active week) | **YELLOW** |
| NEEDS CHANGES unaddressed for > 5 days | **YELLOW** |
| < 50% of current week tasks started | **YELLOW** |
| No activity in 14 days | **RED** |
| FLAGGED submission by coach | **RED** |
| MC / DOT number inactive | **RED** |
| 3+ consecutive NEEDS CHANGES on same task | **RED** |

### Manual Override
- Coaches can manually set risk level to any status.
- Required note explaining the reason for override.

## Technical Implementation

### Service Layer
Extend `taskService.ts` and `carrierService.ts` with:
- `getCoachAssignedCohorts(coachId)`
- `getUnreviewedSubmissions(cohortId)`
- `updateCarrierRiskLevel(carrierId, riskLevel, reason)`
- `calculateAutomaticRisk(carrierId)`

### UI Components
1. **CoachDashboardPage** - Main coach entry point.
2. **SubmissionReviewModal** - Interface for reviewing artifacts and taking actions.
3. **RiskIndicator** - Persistent risk level display on carrier-facing screens.
4. **CoachNoteFeed** - Display and entry for private/public coach notes.

## Voice Standard Compliance
- "Review submission" — not "Grade assignment"
- "Verified" — not "Passed"
- "Needs Changes" — not "Failed"
- "Flagged" — not "Warning"
