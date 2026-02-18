# MailerLite Integration Audit Report

## Executive Summary

**Date**: February 17, 2026  
**Project**: LaunchPath Education Platform  
**Objective**: Ensure all login/signup forms capture leads to MailerLite

## Current MailerLite Integration

### ✅ MailerLite Utility Exists
- **File**: `mailerlite.ts`
- **Function**: `syncToMailerLite(data: MailerLiteData)`
- **Account ID**: 1989508
- **Form ID**: Configured via `VITE_MAILERLITE_FORM_ID` environment variable

### Integration Method
```typescript
await syncToMailerLite({
  email: string,
  fields?: {
    name?: string,
    last_name?: string,
    company?: string,
    phone?: string
  }
});
```

## Forms Inventory & Integration Status

### 🔴 MISSING MailerLite Integration

#### 1. EnhancedPortalLogin (`/pages/EnhancedPortalLogin.tsx`)
- **Path**: `/portal`
- **Type**: Login + Registration Form
- **Current Behavior**: 
  - Login: Uses Firebase `signInWithEmailAndPassword`
  - Register: Uses Firebase `createUserWithEmailAndPassword`
  - Creates user profile in Firestore
- **MailerLite Status**: ❌ **NOT INTEGRATED**
- **Impact**: HIGH - Main user registration point
- **Recommendation**: Add MailerLite sync on registration

#### 2. AdminLogin (`/pages/admin/AdminLogin.tsx`)
- **Path**: `/admin/login`
- **Type**: Admin Login Form
- **Current Behavior**: 
  - Email/password login for admins
  - Google OAuth option
- **MailerLite Status**: ❌ **NOT INTEGRATED**
- **Impact**: LOW - Admin only, not for lead capture
- **Recommendation**: Skip (admin accounts shouldn't go to marketing list)

#### 3. AdmissionTerminalV42 (`/components/AdmissionTerminalV42.tsx`)
- **Path**: Modal component (triggered from various pages)
- **Type**: Registration Form
- **Current Behavior**:
  - Collects: fullName, email, carrierName, dotNumber
  - Creates Firebase auth account
  - Creates user profile with 'free' role
  - Stores carrier data in 'operators' collection
- **MailerLite Status**: ❌ **NOT INTEGRATED**
- **Impact**: CRITICAL - Primary enrollment funnel
- **Recommendation**: Add MailerLite sync immediately

#### 4. LoginPage (`/pages/LoginPage.tsx`)
- **Path**: Unknown (may be deprecated)
- **Type**: Login Form
- **Current Behavior**: Basic Firebase login
- **MailerLite Status**: ❌ **NOT INTEGRATED**
- **Impact**: UNKNOWN - Need to verify if still in use
- **Recommendation**: Check if deprecated; if active, add sync

#### 5. AuthorityAccess (`/pages/AuthorityAccess.tsx`)
- **Path**: Unknown route
- **Type**: Login Form
- **Current Behavior**: Firebase email/password + Google OAuth
- **MailerLite Status**: ❌ **NOT INTEGRATED**
- **Impact**: UNKNOWN - Need to verify usage
- **Recommendation**: Check if deprecated; if active, add sync

### ✅ HAS MailerLite Integration

#### 6. ContactPage (`/pages/ContactPage.tsx`)
- **Path**: `/contact`
- **Type**: Contact Form
- **MailerLite Status**: ✅ **INTEGRATED**
- **Syncs**: email, name, company, phone

#### 7. HomePage (`/pages/HomePage.tsx`)
- **Path**: `/`
- **Type**: Email Capture Form
- **MailerLite Status**: ✅ **INTEGRATED**
- **Syncs**: email, name, company

#### 8. ReadinessPage (`/pages/ReadinessPage.tsx`)
- **Path**: `/readiness` or similar
- **Type**: Assessment + Email Capture
- **MailerLite Status**: ✅ **INTEGRATED**
- **Syncs**: email, name, company, phone

#### 9. ResourcesPage (`/pages/ResourcesPage.tsx`)
- **Path**: `/resources`
- **Type**: Resource Download Form
- **MailerLite Status**: ✅ **INTEGRATED**
- **Syncs**: email, name, company

## Critical Gaps

### 🚨 Priority 1: AdmissionTerminalV42
**Why Critical**: This is the main enrollment/registration modal used across the site.

**Current Data Collected**:
- Full Name
- Email
- Carrier Name
- DOT Number

**Recommended Integration**:
```typescript
await syncToMailerLite({
  email: formData.email,
  fields: {
    name: formData.fullName,
    company: formData.carrierName,
    // Could add custom field for DOT number if configured in MailerLite
  }
});
```

### 🚨 Priority 2: EnhancedPortalLogin (Registration Mode)
**Why Critical**: Secondary registration point for users who go directly to portal.

**Current Data Collected**:
- Email
- Password (don't send to MailerLite)

**Recommended Integration**:
```typescript
// Only on registration (!isLogin mode)
await syncToMailerLite({
  email: email,
  fields: {
    // Could extract name from email or add name field
  }
});
```

## Recommendations

### Immediate Actions

1. **Add MailerLite to AdmissionTerminalV42**
   - Location: After successful user creation (line ~55)
   - Before: `setIsSuccess(true)`
   - Data: email, fullName, carrierName

2. **Add MailerLite to EnhancedPortalLogin**
   - Location: After successful registration (line ~78)
   - Only when `!isLogin` (registration mode)
   - Data: email (minimum)

3. **Verify Active Routes**
   - Check if `LoginPage.tsx` is still in use
   - Check if `AuthorityAccess.tsx` is still in use
   - Remove deprecated components or add integration

### Optional Enhancements

1. **Add Name Field to EnhancedPortalLogin**
   - Currently only collects email + password
   - Adding name field would improve lead quality

2. **Tag Leads by Source**
   - Add source tags to identify which form captured the lead
   - Example: `source: 'admission_terminal'`, `source: 'portal_registration'`

3. **Error Handling**
   - MailerLite sync failures shouldn't block user registration
   - Already handled by `syncToMailerLite` returning boolean

## Environment Configuration

### Required Environment Variable
```
VITE_MAILERLITE_FORM_ID=your_form_id_here
```

**Current Status**: Need to verify if set in:
- Local `.env` file
- Vercel environment variables
- Production deployment

## Testing Checklist

After implementing integrations:

- [ ] Test AdmissionTerminalV42 registration → Check MailerLite
- [ ] Test EnhancedPortalLogin registration → Check MailerLite
- [ ] Verify no duplicate submissions
- [ ] Verify error handling (MailerLite down shouldn't break registration)
- [ ] Check MailerLite dashboard for new subscribers
- [ ] Verify custom fields are populated correctly

## Summary Statistics

- **Total Forms Found**: 9
- **With MailerLite**: 4 (44%)
- **Without MailerLite**: 5 (56%)
- **Critical Missing**: 2 (AdmissionTerminalV42, EnhancedPortalLogin)
- **Admin Only**: 1 (AdminLogin - skip)
- **Unknown Status**: 2 (LoginPage, AuthorityAccess - verify)
