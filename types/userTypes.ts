/**
 * User Role Types for LaunchPath
 * Defines the three-tier access system
 */

export type UserRole = 'free' | 'paid' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  enrolledAt?: Date;
  createdAt: Date;
  stripeCustomerId?: string;
  // Ground 0 completion tracking
  groundZeroCompleted?: boolean;
  groundZeroCompletedAt?: Date;
  // Module progress tracking
  moduleProgress?: {
    [moduleId: string]: {
      completed: boolean;
      completedAt?: Date;
      lessonsCompleted: string[];
    };
  };
}

export interface EnrollmentStatus {
  isEnrolled: boolean;
  role: UserRole;
  hasGroundZeroAccess: boolean;
  hasFullAccess: boolean;
  isAdmin: boolean;
}
