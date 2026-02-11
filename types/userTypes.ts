export type UserRole = 'free' | 'paid' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  enrolledAt: any;
}
