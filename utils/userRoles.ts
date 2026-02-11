import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, UserRole, EnrollmentStatus } from '../types/userTypes';

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }

  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        uid,
        email: data.email,
        displayName: data.displayName,
        role: data.role || 'free',
        enrolledAt: data.enrolledAt?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        stripeCustomerId: data.stripeCustomerId,
        groundZeroCompleted: data.groundZeroCompleted || false,
        groundZeroCompletedAt: data.groundZeroCompletedAt?.toDate(),
        moduleProgress: data.moduleProgress || {},
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Create a new user profile in Firestore
 */
export const createUserProfile = async (
  uid: string,
  email: string,
  displayName?: string,
  role: UserRole = 'free'
): Promise<boolean> => {
  if (!db) {
    console.error('Firestore not initialized');
    return false;
  }

  try {
    const userRef = doc(db, 'users', uid);
    const newProfile: Partial<UserProfile> = {
      uid,
      email,
      displayName: displayName || email.split('@')[0],
      role,
      createdAt: new Date(),
      groundZeroCompleted: false,
      moduleProgress: {},
    };

    await setDoc(userRef, newProfile);
    console.log('User profile created successfully');
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

/**
 * Update user role (e.g., after payment)
 */
export const updateUserRole = async (uid: string, newRole: UserRole): Promise<boolean> => {
  if (!db) {
    console.error('Firestore not initialized');
    return false;
  }

  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      role: newRole,
      enrolledAt: newRole === 'paid' ? new Date() : null,
    });
    console.log(`User role updated to: ${newRole}`);
    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    return false;
  }
};

/**
 * Get enrollment status for a user
 */
export const getEnrollmentStatus = async (uid: string): Promise<EnrollmentStatus> => {
  const profile = await getUserProfile(uid);

  if (!profile) {
    return {
      isEnrolled: false,
      role: 'free',
      hasGroundZeroAccess: false,
      hasFullAccess: false,
      isAdmin: false,
    };
  }

  return {
    isEnrolled: profile.role === 'paid' || profile.role === 'admin',
    role: profile.role,
    hasGroundZeroAccess: true, // All users have Ground 0 access
    hasFullAccess: profile.role === 'paid' || profile.role === 'admin',
    isAdmin: profile.role === 'admin',
  };
};

/**
 * Check if user has access to a specific module
 */
export const hasModuleAccess = (role: UserRole, moduleId: string): boolean => {
  // Ground 0 (module 0) is accessible to all authenticated users
  if (moduleId === '0' || moduleId === 'ground-0') {
    return true;
  }

  // Modules 1-6 require paid or admin role
  return role === 'paid' || role === 'admin';
};

/**
 * Check if user is admin
 */
export const isAdmin = (role: UserRole): boolean => {
  return role === 'admin';
};

/**
 * Check if user is paid subscriber
 */
export const isPaidUser = (role: UserRole): boolean => {
  return role === 'paid' || role === 'admin';
};
