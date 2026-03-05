# Round 2 Testing Checklist

## Portal Brief Quality Check
After Round 2, verify the following (per Portal Brief page 14):

### Carrier-Facing Tests
1. ✅ **Does task submission feel like building infrastructure, not completing homework?**
   - Task titles use "Submit [document]" not "Turn in"
   - Descriptions explain what to build and why it matters
   - No "assignment" or "homework" language anywhere

2. ✅ **Are all status labels using portal voice standard?**
   - NOT STARTED (not "Todo")
   - IN PROGRESS (not "Working on it")
   - SUBMITTED (not "Turned in")
   - NEEDS CHANGES (not "Needs work")
   - VERIFIED (not "Completed" or "Done")

3. ✅ **Is there any motivational, gamification, or course-platform language?**
   - NO "Congratulations!" on verification
   - NO "You're doing great!" messages
   - NO celebration animations (sparkles removed)
   - NO points, XP, or scoring system
   - NO leaderboards

4. ✅ **Do milestone badges feel institutional, not playful?**
   - Dark background with gold border
   - Milestone name and verified date only
   - NO comparison between carriers
   - NO "achievement unlocked" language

5. ✅ **Does file upload feel professional and secure?**
   - Upload interface is clean and institutional
   - File types are restricted to compliance documents
   - Storage path is organized by carrier and task

### Technical Tests

#### Task Service (`taskService.ts`)
- [ ] `getWeekTasks()` returns tasks for specific cohort week
- [ ] `getCarrierTaskStatus()` returns correct status for carrier+task
- [ ] `startTask()` creates or updates status to 'in_progress'
- [ ] `uploadTaskFile()` uploads to Firebase Storage and returns URL
- [ ] `submitTask()` changes status to 'submitted' with submission data
- [ ] `verifyTask()` (coach action) changes status to 'verified'
- [ ] `requestChanges()` (coach action) changes status to 'needs_changes' with note
- [ ] `flagTask()` (coach action) updates carrier risk level to RED
- [ ] `checkMilestoneVerification()` creates milestone when task is verified and `requiredForMilestone` is true
- [ ] `getCarrierMilestones()` returns all verified milestones for carrier

#### TaskSubmission Component
- [ ] Displays task title, description, and current status
- [ ] Shows "Begin Task" button when status is 'not_started'
- [ ] Shows file upload interface when status is 'in_progress' and taskType is 'upload'
- [ ] Shows checklist interface when status is 'in_progress' and taskType is 'checklist'
- [ ] Shows "Pending Coach Review" message when status is 'submitted'
- [ ] Shows coach note when status is 'needs_changes'
- [ ] Shows "Resubmit Task" button when status is 'needs_changes'
- [ ] Shows verified date when status is 'verified'
- [ ] No celebration animations on any status change

#### TaskList Component
- [ ] Loads all tasks for a cohort week
- [ ] Displays task count by status in filter tabs
- [ ] Filters tasks correctly when filter is changed
- [ ] Shows task status badge with correct color and label
- [ ] Indicates milestone tasks with ★ symbol
- [ ] Clicking task triggers onTaskSelect callback

#### MilestoneBadge Component
- [ ] Displays milestone name in uppercase
- [ ] Shows verified date in readable format
- [ ] Uses dark background with gold border
- [ ] Shield icon displays correctly
- [ ] No gamification elements (points, levels, etc.)

#### MilestoneGrid Component
- [ ] Shows count of verified milestones vs total (X / 5)
- [ ] Displays all verified milestones in grid
- [ ] Shows empty state when no milestones verified
- [ ] Includes institutional note about measuring against standard, not other carriers

### Voice Standard Compliance

#### OperatorPortal.tsx Fixes
- [x] Removed `sparkle-burst` keyframe animation
- [x] Removed `animate-pulse` from active steps
- [x] Removed `zoom-in` and `fade-in` animations from completed tasks
- [x] Reduced all transition durations to 300ms

### Integration Tests
- [ ] Create test cohort with test carrier
- [ ] Create test implementation tasks for Week 1
- [ ] Carrier can start a task
- [ ] Carrier can upload a file
- [ ] Carrier can submit task for review
- [ ] Task status changes to 'submitted'
- [ ] Coach can verify task (Round 3 - not yet implemented)
- [ ] Milestone is created when milestone task is verified
- [ ] Milestone displays on carrier profile

### Firebase Tests
- [ ] Files upload to correct Storage path: `submissions/{carrierId}/{taskId}/{timestamp}_{filename}`
- [ ] Task statuses write to `carrierTaskStatus` collection
- [ ] Milestone verifications write to `milestoneVerifications` collection
- [ ] All timestamps are ISO strings
- [ ] All required fields are present in Firestore documents

## Portal Brief One-Line Test
> "A carrier who logs into the LaunchPath portal should feel the same thing a carrier who reads the homepage feels: 'I am inside a system that has rules, assumptions, and consequences.'"

**Does Round 2 pass this test?**
- [ ] Task submission feels procedural, not educational
- [ ] Status changes feel consequential, not playful
- [ ] Milestone verifications feel institutional, not gamified
- [ ] The entire experience reinforces: "This is an operating environment, not a course platform"

## Next Steps After Testing
If all checks pass:
1. Mark Round 2 as complete
2. Create quality gate confirmation
3. Proceed to Round 3: Coach Review Workflow

If any checks fail:
1. Document failures
2. Fix issues before proceeding
3. Re-test until all checks pass
