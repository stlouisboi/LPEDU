# LaunchPath Admission Flow - Comprehensive Testing Plan

## Table of Contents
1. [Testing Environment Setup](#testing-environment-setup)
2. [Happy Path Testing](#happy-path-testing)
3. [Ground 0 Determination Edge Cases](#ground-0-determination-edge-cases)
4. [Route Protection Testing](#route-protection-testing)
5. [Payment Flow Testing](#payment-flow-testing)
6. [Error Handling Testing](#error-handling-testing)
7. [Security Testing](#security-testing)
8. [User Experience Testing](#user-experience-testing)
9. [Database State Testing](#database-state-testing)
10. [Email & Notifications Testing](#email--notifications-testing)

---

## Testing Environment Setup

### Prerequisites
- [ ] Firebase Emulator Suite installed and running
- [ ] Stripe test mode enabled
- [ ] Test user accounts created
- [ ] Browser DevTools open (Network, Console, Application tabs)
- [ ] Firestore viewer open
- [ ] Email testing tool (Mailtrap, Ethereal, etc.)

### Test User Accounts

Create these test accounts in Firebase Auth:

```javascript
// Test User 1: Fresh user (no Ground 0)
{
  email: "test-fresh@example.com",
  password: "TestPass123!",
  displayName: "Fresh User"
}

// Test User 2: Ground 0 completed - GO
{
  email: "test-go@example.com",
  password: "TestPass123!",
  displayName: "GO User",
  firestore: {
    ground0Completed: true,
    ground0Determination: "GO",
    ground0Score: 85
  }
}

// Test User 3: Ground 0 completed - WAIT
{
  email: "test-wait@example.com",
  password: "TestPass123!",
  displayName: "WAIT User",
  firestore: {
    ground0Completed: true,
    ground0Determination: "WAIT",
    ground0Score: 55
  }
}

// Test User 4: Ground 0 completed - NO-GO
{
  email: "test-nogo@example.com",
  password: "TestPass123!",
  displayName: "NO-GO User",
  firestore: {
    ground0Completed: true,
    ground0Determination: "NO-GO",
    ground0Score: 25
  }
}

// Test User 5: Already paid
{
  email: "test-paid@example.com",
  password: "TestPass123!",
  displayName: "Paid User",
  firestore: {
    ground0Completed: true,
    ground0Determination: "GO",
    admissionConfirmed: true,
    role: "paid"
  }
}
```

---

## Happy Path Testing

### Test Case 1: Complete Admission Flow (New User)

**Objective:** Verify a new user can complete the entire flow from pricing to portal access.

**Steps:**

1. **Start at Pricing Page**
   - [ ] Navigate to `/pricing`
   - [ ] Verify page loads correctly
   - [ ] Verify "Cohort Allocation Protocol" badge is visible
   - [ ] Verify title reads "REQUEST ADMISSION"
   - [ ] Verify price shows "$2,500"
   - [ ] Verify text includes "Limited to 10 Carriers Per Cohort"
   - [ ] Verify CTA button is signal-gold color
   - [ ] Verify CTA text: "COMPLETE GROUND 0 → PROCEED TO CHECKOUT"

2. **Click CTA Button**
   - [ ] Click "COMPLETE GROUND 0 → PROCEED TO CHECKOUT"
   - [ ] Verify redirect to `/ground-0`
   - [ ] Verify Ground 0 briefing page loads

3. **Complete Ground 0 Briefing**
   - [ ] Read through briefing content
   - [ ] Verify "16 Deadly Sins" section displays
   - [ ] Click "BEGIN GROUND 0 ASSESSMENT"
   - [ ] Verify redirect to `/ground-0/module`

4. **Complete Ground 0 Module**
   - [ ] Answer all assessment questions
   - [ ] Provide responses that will result in GO determination:
     - Authority Protection: High scores
     - Insurance Continuity: High scores
     - Compliance Backbone: High scores
     - Cash-Flow Oxygen: High scores
   - [ ] Click "SUBMIT ASSESSMENT"
   - [ ] Verify redirect to `/ground-0/result`

5. **View GO Determination Result**
   - [ ] Verify green success box appears
   - [ ] Verify text: "✓ GO DETERMINATION CONFIRMED"
   - [ ] Verify message: "You qualify for LaunchPath system access"
   - [ ] Verify overall score displays (should be 70%+)
   - [ ] Verify pillar scores display correctly
   - [ ] Verify "Next Steps" section appears
   - [ ] Verify "Recommendations" section appears
   - [ ] Verify CTA button is signal-gold
   - [ ] Verify CTA text: "PROCEED TO ADMISSION CHECKOUT"

6. **Click Checkout CTA**
   - [ ] Click "PROCEED TO ADMISSION CHECKOUT"
   - [ ] Verify redirect to `/admission-checkout`
   - [ ] Verify page loads (may show loading spinner briefly)

7. **Complete Admission Checkout**
   - [ ] Verify green confirmation banner: "✓ SYSTEM ADMISSION CONFIRMED"
   - [ ] Verify investment amount: "$2,500"
   - [ ] Verify access text: "Immediate upon payment"
   - [ ] Fill in contact information:
     - Full Name: "Test User"
     - Email: "test@example.com"
     - Phone: "(555) 123-4567"
   - [ ] Check the agreement checkbox
   - [ ] Verify payment section displays
   - [ ] Verify button text: "PROCESS PAYMENT – $2,500"
   - [ ] Verify security badge: "256-BIT ENCRYPTION // PCI COMPLIANT"

8. **Process Test Payment**
   - [ ] Enter Stripe test card: 4242 4242 4242 4242
   - [ ] Enter expiry: 12/34
   - [ ] Enter CVC: 123
   - [ ] Enter ZIP: 12345
   - [ ] Click "PROCESS PAYMENT – $2,500"
   - [ ] Verify button shows "PROCESSING..." state
   - [ ] Wait for payment to complete

9. **View Success Page**
   - [ ] Verify redirect to `/admission-success`
   - [ ] Verify green banner: "✓ ADMISSION COMPLETE"
   - [ ] Verify message: "Your access to the Operating Standard is now active"
   - [ ] Verify confirmation details show:
     - Payment Processed ($2,500)
     - Account Activated
     - Confirmation Email Sent
   - [ ] Verify "What's Next" section displays
   - [ ] Verify CTA button: "ACCESS YOUR SYSTEM"

10. **Access Operator Portal**
    - [ ] Click "ACCESS YOUR SYSTEM"
    - [ ] Verify redirect to `/operator-portal`
    - [ ] Verify portal loads correctly
    - [ ] Verify user has access to Module 1
    - [ ] Verify other modules are locked (sequential unlock)

**Expected Database State After Completion:**

```javascript
// users/{userId}
{
  email: "test@example.com",
  displayName: "Test User",
  ground0Completed: true,
  ground0Determination: "GO",
  ground0Score: 85,
  admissionConfirmed: true,
  role: "paid",
  paymentDate: Timestamp,
  stripeSessionId: "cs_test_...",
  stripePaymentIntent: "pi_test_...",
  phone: "(555) 123-4567"
}

// operators/{userId}
{
  userId: "...",
  fullName: "Test User",
  email: "test@example.com",
  phone: "(555) 123-4567",
  admissionDate: Timestamp,
  paymentAmount: 2500,
  status: "active",
  currentModule: 1,
  completedModules: []
}
```

---

## Ground 0 Determination Edge Cases

### Test Case 2: GO Determination (Boundary Score)

**Objective:** Test GO determination at the minimum threshold (70%).

**Setup:**
- Answer questions to achieve exactly 70% overall score
- Each pillar should score 70% or higher

**Expected Result:**
- [ ] Determination: GO
- [ ] Green success box displays
- [ ] Checkout CTA appears
- [ ] Can proceed to `/admission-checkout`

---

### Test Case 3: WAIT Determination (Mid-Range Score)

**Objective:** Test WAIT determination (50-69% score range).

**Setup:**
- Answer questions to achieve 55% overall score
- Mix of medium and low pillar scores

**Expected Result:**
- [ ] Determination: WAIT
- [ ] Yellow warning box displays
- [ ] Message: "⚠ ADVANCEMENT PAUSED"
- [ ] Text: "Your readiness briefing identified structural gaps"
- [ ] CTA: "RETURN HOME" (slate-500 color)
- [ ] NO checkout link visible
- [ ] Clicking "RETURN HOME" redirects to `/`

**Verify Recommendations:**
- [ ] Recommendations section provides specific action items
- [ ] Next steps are clear and actionable
- [ ] Resources or timeline for re-assessment mentioned

---

### Test Case 4: WAIT Determination (Boundary Score - High)

**Objective:** Test WAIT at upper boundary (69%).

**Setup:**
- Answer questions to achieve exactly 69% overall score

**Expected Result:**
- [ ] Determination: WAIT (not GO)
- [ ] Yellow warning box displays
- [ ] NO checkout access

---

### Test Case 5: WAIT Determination (Boundary Score - Low)

**Objective:** Test WAIT at lower boundary (50%).

**Setup:**
- Answer questions to achieve exactly 50% overall score

**Expected Result:**
- [ ] Determination: WAIT (not NO-GO)
- [ ] Yellow warning box displays
- [ ] Specific recommendations provided

---

### Test Case 6: NO-GO Determination (Low Score)

**Objective:** Test NO-GO determination (below 50%).

**Setup:**
- Answer questions to achieve 25% overall score
- All pillars score below 50%

**Expected Result:**
- [ ] Determination: NO-GO
- [ ] Red warning box displays
- [ ] Message: "⚠ ADVANCEMENT PAUSED"
- [ ] Text: "Your readiness briefing identified structural gaps"
- [ ] CTA: "RETURN HOME" (slate-500 color)
- [ ] NO checkout link visible
- [ ] Clicking "RETURN HOME" redirects to `/`

**Verify Recommendations:**
- [ ] Recommendations emphasize capital preservation
- [ ] Timeline for re-assessment is longer (12-24 months)
- [ ] Resources for building readiness provided

---

### Test Case 7: NO-GO Determination (Boundary Score)

**Objective:** Test NO-GO at upper boundary (49%).

**Setup:**
- Answer questions to achieve exactly 49% overall score

**Expected Result:**
- [ ] Determination: NO-GO (not WAIT)
- [ ] Red warning box displays
- [ ] NO checkout access

---

### Test Case 8: Single Pillar Failure (GO Overall)

**Objective:** Test if high overall score but one pillar fails affects determination.

**Setup:**
- Authority Protection: 90%
- Insurance Continuity: 90%
- Compliance Backbone: 90%
- Cash-Flow Oxygen: 20% (FAIL)
- Overall: ~72%

**Expected Result:**
- [ ] Verify determination logic
- [ ] If GO: Ensure recommendations highlight weak pillar
- [ ] If WAIT: Verify pillar-specific guidance provided

---

### Test Case 9: All Pillars Balanced (GO)

**Objective:** Test GO with all pillars evenly scored.

**Setup:**
- All pillars: 75%
- Overall: 75%

**Expected Result:**
- [ ] Determination: GO
- [ ] Balanced recommendations
- [ ] No critical warnings

---

### Test Case 10: All Pillars Balanced (WAIT)

**Objective:** Test WAIT with all pillars evenly scored.

**Setup:**
- All pillars: 55%
- Overall: 55%

**Expected Result:**
- [ ] Determination: WAIT
- [ ] Recommendations address all pillars
- [ ] Clear improvement path provided

---

## Route Protection Testing

### Test Case 11: Direct URL Access (No Auth)

**Objective:** Verify unauthenticated users cannot access protected routes.

**Steps:**
1. [ ] Log out of all accounts
2. [ ] Navigate directly to `/admission-checkout`
3. [ ] Verify redirect to `/ground-0` or login page
4. [ ] Verify error message or notification (optional)

---

### Test Case 12: Direct URL Access (No Ground 0)

**Objective:** Verify users without Ground 0 completion cannot access checkout.

**Steps:**
1. [ ] Log in as fresh user (no Ground 0 data)
2. [ ] Navigate directly to `/admission-checkout`
3. [ ] Verify redirect to `/ground-0`
4. [ ] Verify cannot bypass protection

---

### Test Case 13: Direct URL Access (WAIT Determination)

**Objective:** Verify WAIT users cannot access checkout.

**Steps:**
1. [ ] Log in as WAIT user
2. [ ] Navigate directly to `/admission-checkout`
3. [ ] Verify redirect to `/ground-0`
4. [ ] Verify cannot bypass protection

---

### Test Case 14: Direct URL Access (NO-GO Determination)

**Objective:** Verify NO-GO users cannot access checkout.

**Steps:**
1. [ ] Log in as NO-GO user
2. [ ] Navigate directly to `/admission-checkout`
3. [ ] Verify redirect to `/ground-0`
4. [ ] Verify cannot bypass protection

---

### Test Case 15: Direct URL Access (Already Paid)

**Objective:** Verify paid users are redirected to portal, not checkout.

**Steps:**
1. [ ] Log in as paid user
2. [ ] Navigate directly to `/admission-checkout`
3. [ ] Verify redirect to `/operator-portal`
4. [ ] Verify cannot re-purchase

---

### Test Case 16: Browser Back Button (After GO)

**Objective:** Test back button behavior after reaching checkout.

**Steps:**
1. [ ] Complete Ground 0 with GO determination
2. [ ] Navigate to `/admission-checkout`
3. [ ] Click browser back button
4. [ ] Verify returns to `/ground-0/result`
5. [ ] Verify can navigate forward to checkout again

---

### Test Case 17: Browser Back Button (After Payment)

**Objective:** Test back button behavior after payment.

**Steps:**
1. [ ] Complete payment successfully
2. [ ] Land on `/admission-success`
3. [ ] Click browser back button
4. [ ] Verify redirect to `/operator-portal` or `/admission-success`
5. [ ] Verify cannot re-access checkout page

---

## Payment Flow Testing

### Test Case 18: Successful Payment (Test Card)

**Objective:** Verify successful payment with Stripe test card.

**Steps:**
1. [ ] Reach `/admission-checkout`
2. [ ] Fill in all required fields
3. [ ] Check agreement checkbox
4. [ ] Enter test card: 4242 4242 4242 4242
5. [ ] Click "PROCESS PAYMENT – $2,500"
6. [ ] Verify Stripe processes payment
7. [ ] Verify webhook fires
8. [ ] Verify database updates
9. [ ] Verify redirect to `/admission-success`
10. [ ] Verify confirmation email sent

**Verify Database Updates:**
```javascript
// Check Firestore
users/{userId}.admissionConfirmed === true
users/{userId}.role === "paid"
users/{userId}.stripeSessionId exists
operators/{userId} document created
```

---

### Test Case 19: Declined Payment

**Objective:** Test payment decline handling.

**Steps:**
1. [ ] Reach `/admission-checkout`
2. [ ] Fill in all required fields
3. [ ] Check agreement checkbox
4. [ ] Enter decline test card: 4000 0000 0000 0002
5. [ ] Click "PROCESS PAYMENT – $2,500"
6. [ ] Verify payment fails
7. [ ] Verify error message displays
8. [ ] Verify user remains on checkout page
9. [ ] Verify can retry payment
10. [ ] Verify database NOT updated

---

### Test Case 20: Insufficient Funds

**Objective:** Test insufficient funds handling.

**Steps:**
1. [ ] Use test card: 4000 0000 0000 9995
2. [ ] Attempt payment
3. [ ] Verify appropriate error message
4. [ ] Verify can retry with different card

---

### Test Case 21: Payment Requires Authentication (3D Secure)

**Objective:** Test 3D Secure authentication flow.

**Steps:**
1. [ ] Use test card: 4000 0025 0000 3155
2. [ ] Attempt payment
3. [ ] Verify 3D Secure modal appears
4. [ ] Complete authentication
5. [ ] Verify payment succeeds
6. [ ] Verify redirect to success page

---

### Test Case 22: Missing Agreement Checkbox

**Objective:** Verify payment cannot proceed without agreement.

**Steps:**
1. [ ] Reach `/admission-checkout`
2. [ ] Fill in all fields
3. [ ] Do NOT check agreement checkbox
4. [ ] Click "PROCESS PAYMENT – $2,500"
5. [ ] Verify button is disabled OR alert appears
6. [ ] Verify payment does not process

---

### Test Case 23: Missing Required Fields

**Objective:** Verify form validation.

**Steps:**
1. [ ] Reach `/admission-checkout`
2. [ ] Leave Full Name empty
3. [ ] Attempt to submit
4. [ ] Verify validation error
5. [ ] Repeat for Email field
6. [ ] Repeat for Phone field
7. [ ] Verify cannot proceed without all fields

---

### Test Case 24: Invalid Email Format

**Objective:** Test email validation.

**Steps:**
1. [ ] Enter invalid email: "notanemail"
2. [ ] Attempt to submit
3. [ ] Verify validation error
4. [ ] Enter valid email
5. [ ] Verify validation passes

---

### Test Case 25: Webhook Failure Recovery

**Objective:** Test system behavior if webhook fails.

**Setup:**
- Temporarily disable webhook endpoint

**Steps:**
1. [ ] Complete payment
2. [ ] Verify Stripe payment succeeds
3. [ ] Verify webhook fails (check Stripe dashboard)
4. [ ] Re-enable webhook
5. [ ] Trigger webhook retry from Stripe dashboard
6. [ ] Verify database updates on retry
7. [ ] Verify user gains access

---

### Test Case 26: Duplicate Payment Prevention

**Objective:** Verify users cannot pay twice.

**Steps:**
1. [ ] Complete payment successfully
2. [ ] Manually navigate to `/admission-checkout`
3. [ ] Verify redirect to `/operator-portal`
4. [ ] Verify cannot access checkout page
5. [ ] Check Stripe for duplicate charges (should be none)

---

## Error Handling Testing

### Test Case 27: Network Failure During Payment

**Objective:** Test behavior when network fails during payment.

**Steps:**
1. [ ] Open DevTools Network tab
2. [ ] Reach checkout page
3. [ ] Fill in all fields
4. [ ] Set network to "Offline" in DevTools
5. [ ] Attempt payment
6. [ ] Verify error message displays
7. [ ] Set network back to "Online"
8. [ ] Verify can retry payment

---

### Test Case 28: Session Timeout

**Objective:** Test behavior if session expires during checkout.

**Steps:**
1. [ ] Reach checkout page
2. [ ] Wait for session to expire (or manually clear auth token)
3. [ ] Attempt to submit payment
4. [ ] Verify redirect to login
5. [ ] Log back in
6. [ ] Verify can resume checkout

---

### Test Case 29: Firebase Connection Loss

**Objective:** Test behavior when Firebase connection is lost.

**Steps:**
1. [ ] Disable Firebase in DevTools (block firestore.googleapis.com)
2. [ ] Attempt to access checkout
3. [ ] Verify error handling
4. [ ] Re-enable Firebase
5. [ ] Verify recovery

---

### Test Case 30: Stripe API Error

**Objective:** Test handling of Stripe API errors.

**Setup:**
- Use Stripe test mode to trigger specific errors

**Steps:**
1. [ ] Trigger rate limit error
2. [ ] Verify error message
3. [ ] Trigger API key error
4. [ ] Verify error message
5. [ ] Verify user-friendly messages (not raw API errors)

---

## Security Testing

### Test Case 31: SQL Injection Attempt

**Objective:** Verify input sanitization.

**Steps:**
1. [ ] Enter SQL injection string in name field: `'; DROP TABLE users; --`
2. [ ] Submit form
3. [ ] Verify no database corruption
4. [ ] Verify input is sanitized

---

### Test Case 32: XSS Attempt

**Objective:** Verify XSS protection.

**Steps:**
1. [ ] Enter script tag in name field: `<script>alert('XSS')</script>`
2. [ ] Submit form
3. [ ] Verify script does not execute
4. [ ] Verify input is escaped

---

### Test Case 33: CSRF Protection

**Objective:** Verify CSRF token validation.

**Steps:**
1. [ ] Inspect checkout form
2. [ ] Verify CSRF token present
3. [ ] Attempt to submit form from external site
4. [ ] Verify request is rejected

---

### Test Case 34: Direct Firestore Manipulation

**Objective:** Verify server-side validation.

**Steps:**
1. [ ] Use Firestore console
2. [ ] Attempt to set `admissionConfirmed: true` manually
3. [ ] Verify security rules prevent unauthorized writes
4. [ ] Verify only webhook can set this field

---

### Test Case 35: Stripe Webhook Signature Verification

**Objective:** Verify webhook signature validation.

**Steps:**
1. [ ] Send fake webhook request without signature
2. [ ] Verify request is rejected
3. [ ] Send webhook with invalid signature
4. [ ] Verify request is rejected
5. [ ] Send valid webhook
6. [ ] Verify request is accepted

---

## User Experience Testing

### Test Case 36: Mobile Responsiveness (Pricing Page)

**Objective:** Test pricing page on mobile devices.

**Devices to Test:**
- iPhone SE (375px)
- iPhone 12 Pro (390px)
- Samsung Galaxy S21 (360px)
- iPad (768px)

**Verify:**
- [ ] Cohort badge displays correctly
- [ ] Title is readable
- [ ] Price is prominent
- [ ] CTA button is easily tappable (min 44px height)
- [ ] No horizontal scrolling
- [ ] All text is legible

---

### Test Case 37: Mobile Responsiveness (Checkout Page)

**Objective:** Test checkout page on mobile devices.

**Verify:**
- [ ] Form fields are full width
- [ ] Stripe payment element renders correctly
- [ ] Checkbox is easily tappable
- [ ] Submit button is accessible
- [ ] No layout breaks
- [ ] Keyboard doesn't obscure fields

---

### Test Case 38: Loading States

**Objective:** Verify loading indicators appear appropriately.

**Test Points:**
- [ ] Checkout page initial load (verifying access)
- [ ] Payment processing
- [ ] Webhook processing
- [ ] Redirect to success page

**Verify:**
- [ ] Loading spinner appears
- [ ] Loading text is descriptive
- [ ] UI is disabled during loading
- [ ] No double-submission possible

---

### Test Case 39: Accessibility (Keyboard Navigation)

**Objective:** Test keyboard-only navigation.

**Steps:**
1. [ ] Navigate to pricing page
2. [ ] Use Tab key to navigate
3. [ ] Verify focus indicators are visible
4. [ ] Press Enter on CTA button
5. [ ] Continue through entire flow using only keyboard
6. [ ] Verify all interactive elements are accessible

---

### Test Case 40: Accessibility (Screen Reader)

**Objective:** Test screen reader compatibility.

**Tools:** NVDA, JAWS, or VoiceOver

**Verify:**
- [ ] All headings are announced
- [ ] Form labels are associated with inputs
- [ ] Button purposes are clear
- [ ] Error messages are announced
- [ ] Success messages are announced
- [ ] ARIA labels are present where needed

---

### Test Case 41: Browser Compatibility

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Verify:**
- [ ] All pages render correctly
- [ ] Stripe Elements work
- [ ] Redirects function
- [ ] No console errors

---

### Test Case 42: Performance Testing

**Objective:** Verify page load performance.

**Tools:** Lighthouse, WebPageTest

**Metrics to Check:**
- [ ] Pricing page loads in < 3 seconds
- [ ] Checkout page loads in < 3 seconds
- [ ] Success page loads in < 2 seconds
- [ ] Lighthouse score > 90
- [ ] No render-blocking resources

---

## Database State Testing

### Test Case 43: Concurrent User Handling

**Objective:** Test multiple users checking out simultaneously.

**Steps:**
1. [ ] Open 3 browser windows (different users)
2. [ ] Have all 3 complete Ground 0 with GO
3. [ ] Have all 3 reach checkout simultaneously
4. [ ] Have all 3 submit payment at same time
5. [ ] Verify all 3 payments process correctly
6. [ ] Verify no database conflicts
7. [ ] Verify all 3 users get access

---

### Test Case 44: Database Rollback on Payment Failure

**Objective:** Verify database doesn't update if payment fails.

**Steps:**
1. [ ] Reach checkout
2. [ ] Use declining test card
3. [ ] Submit payment
4. [ ] Verify payment fails
5. [ ] Check Firestore
6. [ ] Verify `admissionConfirmed` is still false
7. [ ] Verify `role` is still 'free'
8. [ ] Verify no operator record created

---

### Test Case 45: Idempotency Testing

**Objective:** Verify webhook handles duplicate events gracefully.

**Steps:**
1. [ ] Complete payment
2. [ ] Trigger webhook manually (same event ID)
3. [ ] Verify database updates only once
4. [ ] Verify no duplicate operator records
5. [ ] Verify no duplicate emails sent

---

### Test Case 46: Data Consistency Check

**Objective:** Verify data consistency across collections.

**After Successful Payment, Verify:**
```javascript
// users/{userId}
admissionConfirmed === true
role === "paid"
ground0Determination === "GO"

// operators/{userId}
userId matches users collection
email matches users collection
status === "active"

// Both collections updated atomically
```

---

## Email & Notifications Testing

### Test Case 47: Confirmation Email (Successful Payment)

**Objective:** Verify confirmation email is sent.

**Verify:**
- [ ] Email sent to correct address
- [ ] Subject line is appropriate
- [ ] Email contains:
  - User's name
  - Payment amount ($2,500)
  - Portal access link
  - Next steps
  - Support contact
- [ ] Links in email work
- [ ] Email renders correctly in major clients

---

### Test Case 48: Email Delivery Failure

**Objective:** Test behavior if email fails to send.

**Steps:**
1. [ ] Use invalid email address
2. [ ] Complete payment
3. [ ] Verify payment succeeds
4. [ ] Verify user still gets access (email failure doesn't block access)
5. [ ] Verify error logged
6. [ ] Verify admin notification sent

---

### Test Case 49: Email Timing

**Objective:** Verify email is sent promptly.

**Steps:**
1. [ ] Complete payment
2. [ ] Note timestamp
3. [ ] Check email inbox
4. [ ] Verify email arrives within 2 minutes
5. [ ] Verify email timestamp matches payment time

---

## Test Execution Checklist

### Pre-Testing
- [ ] All test accounts created
- [ ] Firebase emulator running
- [ ] Stripe test mode enabled
- [ ] Email testing tool configured
- [ ] Test data backed up

### During Testing
- [ ] Record all test results
- [ ] Screenshot any errors
- [ ] Note console errors
- [ ] Document unexpected behavior
- [ ] Track test execution time

### Post-Testing
- [ ] Clean up test data
- [ ] Document bugs found
- [ ] Prioritize fixes
- [ ] Update test cases if needed
- [ ] Archive test results

---

## Bug Reporting Template

```markdown
### Bug Report

**Test Case:** [Test Case Number and Name]
**Severity:** [Critical / High / Medium / Low]
**Browser:** [Browser and Version]
**Device:** [Desktop / Mobile / Tablet]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**


**Actual Result:**


**Screenshots:**
[Attach screenshots]

**Console Errors:**
```
[Paste console errors]
```

**Additional Notes:**

```

---

## Success Criteria

### All Tests Must Pass:
- [ ] 100% of happy path tests pass
- [ ] 100% of route protection tests pass
- [ ] 100% of payment flow tests pass
- [ ] 95%+ of edge case tests pass
- [ ] Zero critical bugs
- [ ] Zero high-severity bugs

### Performance Criteria:
- [ ] Page load times < 3 seconds
- [ ] Payment processing < 5 seconds
- [ ] Lighthouse score > 90
- [ ] Zero console errors in production

### Security Criteria:
- [ ] All security tests pass
- [ ] No XSS vulnerabilities
- [ ] No SQL injection vulnerabilities
- [ ] Webhook signatures verified
- [ ] Firestore security rules enforced

---

## Testing Schedule

### Phase 1: Core Functionality (Day 1-2)
- Happy path testing
- Ground 0 determination testing
- Route protection testing

### Phase 2: Payment Integration (Day 3-4)
- Payment flow testing
- Stripe integration testing
- Webhook testing

### Phase 3: Error Handling (Day 5)
- Error handling testing
- Edge case testing
- Recovery testing

### Phase 4: Security & UX (Day 6-7)
- Security testing
- Accessibility testing
- Mobile responsiveness testing
- Browser compatibility testing

### Phase 5: Final Validation (Day 8)
- End-to-end regression testing
- Performance testing
- Database consistency checks
- Email testing

---

## Sign-Off

**Tester Name:** ___________________________
**Date:** ___________________________
**Test Environment:** ___________________________
**Test Results:** PASS / FAIL
**Notes:** ___________________________

---

## Appendix: Test Data Generator

Use this script to generate test users with various Ground 0 scores:

```javascript
// generateTestUsers.js
const admin = require('firebase-admin');

async function createTestUser(email, determination, score) {
  const userRecord = await admin.auth().createUser({
    email,
    password: 'TestPass123!',
    displayName: `${determination} User`
  });

  await admin.firestore().collection('users').doc(userRecord.uid).set({
    email,
    displayName: `${determination} User`,
    ground0Completed: true,
    ground0Determination: determination,
    ground0Score: score,
    ground0Date: admin.firestore.FieldValue.serverTimestamp(),
    role: 'free',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log(`Created ${determination} user: ${email}`);
}

// Generate test users
createTestUser('test-go-high@example.com', 'GO', 95);
createTestUser('test-go-boundary@example.com', 'GO', 70);
createTestUser('test-wait-high@example.com', 'WAIT', 69);
createTestUser('test-wait-mid@example.com', 'WAIT', 55);
createTestUser('test-wait-low@example.com', 'WAIT', 50);
createTestUser('test-nogo-boundary@example.com', 'NO-GO', 49);
createTestUser('test-nogo-low@example.com', 'NO-GO', 25);
```

---

**End of Testing Plan**
