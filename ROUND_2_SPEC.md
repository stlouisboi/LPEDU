# Round 2: Task and Artifact System - Implementation Spec

## Overview
**Focus:** Carriers Build Infrastructure. The Portal Verifies It.

Tasks are not assignments. They are compliance infrastructure construction events. A carrier who submits a completed DQ file checklist is not turning in homework — he is building a document that will protect his authority during a federal audit.

## Build 2A: Implementation Task Object

### Requirements
Each implementation task requires:

| Field | Type | Notes |
|-------|------|-------|
| Title | Text | Plain, direct. e.g., 'Submit DQ File — Driver 1' |
| Description | Rich text | What to build, why it matters, what the auditor looks for |
| Cohort week | Integer | Which week this task is due |
| Task type | Enum | Upload / Checklist / Form completion |
| Required | Boolean | All Phase 1 tasks are required |
| Status | Enum | Not started / In progress / Submitted / Needs changes / Verified |
| Submission | File/text | Carrier's uploaded document or completed checklist |
| Coach notes | Rich text | Private coach feedback visible to carrier after review |
| Verified date | Timestamp | Date coach marked Verified |

### Task Status Display
- **NOT STARTED** — shown in muted gray
- **IN PROGRESS** — shown in standard text
- **SUBMITTED** — shown in gold, pending coach review
- **NEEDS CHANGES** — shown in amber with coach note visible
- **VERIFIED** — shown in institutional green with verified date

### Design Requirements
- Status labels use the portal voice standard
- No celebration on Verified status
- A simple timestamp and status change is sufficient
- The carrier built something real. The portal acknowledges it plainly.

### EXISTING CODE FIX REQUIRED
**OperatorPortal.tsx** contains animated checkmarks with sparkle effects on task completion. This directly violates the portal voice standard.

**Action Required:**
- Remove all sparkle animations, confetti effects, and celebration micro-animations from task completion events
- Replace with a plain status change and timestamp
- No sound effects
- No motion effects beyond a simple state transition

## Build 2B: Milestone Verification Badges

### Purpose
Milestone verifications are the only recognition system in this portal. They are not achievements or rewards. They are documented compliance milestones — verifications that a specific infrastructure component has been built and reviewed.

### Five Milestone Verifications for Phase 1

| Milestone Verification | Triggered By |
|------------------------|--------------|
| REACH Assessment Complete | REACH Test result received and logged to carrier profile |
| Ground 0 Orientation Verified | All Ground 0 implementation sessions marked complete |
| DQ File Architecture Verified | DQ file submission reviewed and marked Verified by coach |
| Drug & Alcohol Program Verified | D&A compliance template submitted and marked Verified |
| Audit Readiness Verified | Final audit readiness checklist submitted and marked Verified by coach |

### Display Requirements
- Clean institutional badges on the carrier profile
- Dark background, gold border
- Milestone name
- Verified date
- **NO leaderboards**
- **NO points system**
- **NO XP**
- **NO comparison between carriers**

Each carrier is measured against the LaunchPath Standard — not against other carriers. That is the institutional posture.

## Technical Implementation

### New Firestore Collections (from Round 1 spec)
Already defined in `types/cohort.ts`:
- `implementationTasks` - Task objects
- `carrierTaskStatus` - Per-carrier task status tracking
- `milestoneVerifications` - Verified milestone records

### Service Layer
Create `taskService.ts` with:
- Task submission logic
- Status management
- File upload handling (Firebase Storage)
- Milestone verification triggers

### UI Components
1. **Task List Component** - Display tasks by status
2. **Task Detail Component** - Submit/view task details
3. **Milestone Badge Component** - Display verified milestones
4. **File Upload Component** - Handle document uploads

## Voice Standard Compliance
All language must follow institutional voice:
- "Submit for review" — not "Turn in"
- "Pending coach review" — not "Waiting"
- "Implementation task" — not "Assignment" or "Homework"
- "Verified" — not "Completed" or "Done"
- "Authority file" — not "Profile"

## Quality Check
After Round 2, verify:
1. Task submission feels like building infrastructure, not completing homework
2. All status labels use portal voice standard
3. No gamification or celebration language
4. Milestone badges are institutional, not playful
5. File uploads are professional and secure
