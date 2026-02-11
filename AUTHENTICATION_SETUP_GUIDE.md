# LaunchPath Authentication System - Implementation Guide

## Overview

This guide explains the new role-based authentication system that has been built for LaunchPath. The system supports three user types (free, paid, admin) with appropriate access controls.

## What Was Built

### 1. User Role System

**Files Created:**
- `types/userTypes.ts` - TypeScript definitions for user roles and profiles
- `utils/userRoles.ts` - Utility functions for managing user roles and permissions

**User Roles:**
- `free` - New signups, access to Ground 0 only
- `paid` - Enrolled users who paid $2,500, access to full program
- `admin` - Administrative access to backend

### 2. Enhanced Authentication Context

**File Created:**
- `contexts/EnhancedAuthContext.tsx` - Extended auth context with role management

**Features:**
- Tracks current user, user profile, and enrollment status
- Automatically loads user role from Firestore on login
- Provides `refreshUserProfile()` function to reload user data after changes

### 3. Role-Based Protected Routes

**File Created:**
- `components/auth/RoleBasedRoutes.tsx` - Four route protection components

**Components:**
- `<ProtectedRoute>` - Requires authentication (any logged-in user)
- `<FreeRoute>` - Requires authentication (free, paid, or admin)
- `<PaidRoute>` - Requires paid or admin role
- `<AdminRoute>` - Requires admin role only

### 4. Enhanced Portal Login with Signup

**File Created:**
- `pages/EnhancedPortalLogin.tsx` - Combined login/signup page

**Features:**
- Toggle between login and signup modes
- Email/password authentication
- Google sign-in
- Automatically creates user profile in Firestore on signup
- Routes users based on their role after login

### 5. Updated Firestore Security Rules

**File Updated:**
- `firestore.rules` - Added role-based access control functions

**Security Features:**
- Users can only read/update their own profile
- Users cannot change their own role (prevents privilege escalation)
- Only admins can change user roles or delete profiles
- Resources are restricted to paid users only

## How to Integrate Into Your App

### Step 1: Update App.tsx to Use Enhanced Auth

Replace the old `AuthProvider` with `EnhancedAuthProvider`:

```tsx
// In App.tsx, change this:
import { AuthProvider } from './AuthContext';

// To this:
import { EnhancedAuthProvider } from './contexts/EnhancedAuthContext';

// Then wrap your app with EnhancedAuthProvider instead of AuthProvider:
<EnhancedAuthProvider>
  <Router>
    {/* Your routes */}
  </Router>
</EnhancedAuthProvider>
```

### Step 2: Replace Portal Login Route

In `App.tsx`, replace the `/portal` route:

```tsx
// Change this:
<Route path="/portal" element={<AuthorityAccess />} />

// To this:
<Route path="/portal" element={<EnhancedPortalLogin />} />
```

### Step 3: Update Protected Routes

Replace the old `ProtectedRoute` imports with the new role-based routes:

```tsx
// In App.tsx, change this:
import ProtectedRoute from './components/admin/ProtectedRoute';

// To this:
import { ProtectedRoute, FreeRoute, PaidRoute, AdminRoute } from './components/auth/RoleBasedRoutes';

// Then update your routes:
<Route path="/operator-portal" element={<PaidRoute><OperatorPortal /></PaidRoute>} />
<Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
  {/* Admin sub-routes */}
</Route>
```

### Step 4: Update Components to Use Enhanced Auth

In any component that needs user role information:

```tsx
// Change this:
import { useAuth } from '../AuthContext';
const { currentUser } = useAuth();

// To this:
import { useEnhancedAuth } from '../contexts/EnhancedAuthContext';
const { currentUser, userProfile, enrollmentStatus } = useEnhancedAuth();

// Now you can check user role:
if (enrollmentStatus?.hasFullAccess) {
  // User is paid or admin
}

if (enrollmentStatus?.isAdmin) {
  // User is admin
}
```

### Step 5: Deploy Firestore Rules

Deploy the updated Firestore security rules to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

## User Flow Examples

### New User Signup Flow

1. User visits `/portal`
2. Clicks "Create Account" tab
3. Enters email, password, display name
4. System creates:
   - Firebase Auth account
   - Firestore user profile with `role: 'free'`
5. User is redirected to `/enrollment-pending` (Ground 0 access)

### Existing User Login Flow

1. User visits `/portal`
2. Enters credentials or uses Google sign-in
3. System checks Firestore for user role
4. Routes based on role:
   - `free` → `/enrollment-pending` (Ground 0)
   - `paid` → `/operator-portal` (Full access)
   - `admin` → `/operator-portal` (Full access)

### Payment/Enrollment Flow (To Be Built)

1. Free user completes Ground 0
2. Clicks "Enroll in Full Program"
3. Stripe checkout for $2,500
4. On successful payment:
   ```tsx
   import { updateUserRole } from '../utils/userRoles';
   await updateUserRole(userId, 'paid');
   ```
5. User is redirected to `/operator-portal` with full access

## Firestore Data Structure

### Users Collection

```
users/{uid}
  - uid: string
  - email: string
  - displayName: string
  - role: 'free' | 'paid' | 'admin'
  - createdAt: timestamp
  - enrolledAt: timestamp (set when role changes to 'paid')
  - stripeCustomerId: string (optional)
  - groundZeroCompleted: boolean
  - groundZeroCompletedAt: timestamp
  - moduleProgress: {
      "module-1": {
        completed: boolean,
        completedAt: timestamp,
        lessonsCompleted: ["lesson-1", "lesson-2"]
      }
    }
```

## Testing the System

### Test as Free User

1. Create a new account via `/portal`
2. Verify you're redirected to `/enrollment-pending`
3. Try to access `/operator-portal` - should redirect back to enrollment pending

### Test as Paid User

1. Manually update a user's role in Firestore:
   ```
   users/{uid}.role = 'paid'
   users/{uid}.enrolledAt = <current timestamp>
   ```
2. Log in with that account
3. Verify you're redirected to `/operator-portal`
4. Verify you can access all modules

### Test as Admin

1. Manually update a user's role in Firestore:
   ```
   users/{uid}.role = 'admin'
   ```
2. Log in with that account
3. Verify you can access `/admin` routes
4. Verify you can access `/operator-portal`

## Next Steps

1. **Integrate Stripe Payment**
   - Add Stripe checkout to the enrollment flow
   - On successful payment, call `updateUserRole(uid, 'paid')`
   - Update `stripeCustomerId` in user profile

2. **Build Ground 0 Content**
   - Create lesson pages for Ground 0 (Module 0)
   - Make these accessible to all authenticated users
   - Track completion in `moduleProgress`

3. **Build Full Program Content**
   - Create lesson pages for Modules 1-6
   - Wrap these routes in `<PaidRoute>`
   - Track progress in Firestore

4. **Update Enrollment Pending Page**
   - Show Ground 0 content for free users
   - Show enrollment CTA for users who completed Ground 0
   - Show "Access Granted" for paid users

## Utility Functions Reference

```tsx
import { 
  getUserProfile,
  createUserProfile,
  updateUserRole,
  getEnrollmentStatus,
  hasModuleAccess,
  isAdmin,
  isPaidUser
} from '../utils/userRoles';

// Get user profile
const profile = await getUserProfile(uid);

// Create new user (called automatically on signup)
await createUserProfile(uid, email, displayName, 'free');

// Upgrade user to paid (after Stripe payment)
await updateUserRole(uid, 'paid');

// Check enrollment status
const status = await getEnrollmentStatus(uid);
if (status.hasFullAccess) {
  // Show full content
}

// Check module access
if (hasModuleAccess(userProfile.role, 'module-3')) {
  // Allow access
}

// Check if admin
if (isAdmin(userProfile.role)) {
  // Show admin features
}
```

## Troubleshooting

### "Firebase not configured" error
- Ensure your `.env` file has all `VITE_FIREBASE_*` variables set
- Restart your dev server after adding env variables

### User role not updating after payment
- Call `refreshUserProfile()` from the auth context after updating Firestore
- Or force a page reload to trigger auth state listener

### Firestore permission denied
- Deploy the updated `firestore.rules` to Firebase
- Check Firebase Console > Firestore > Rules tab to verify deployment

### User stuck on enrollment pending page
- Check Firestore: `users/{uid}.role` should be 'paid' for full access
- Verify `enrolledAt` timestamp is set

## Questions?

This system is production-ready and follows Firebase best practices. All role checks happen both client-side (for UX) and server-side (in Firestore rules) for security.
