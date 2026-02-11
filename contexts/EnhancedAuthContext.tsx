import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import { getUserProfile, getEnrollmentStatus } from '../utils/userRoles';
import { UserProfile, EnrollmentStatus } from '../types/userTypes';

interface EnhancedAuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  enrollmentStatus: EnrollmentStatus | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext);
  if (!context) throw new Error('useEnhancedAuth must be used within EnhancedAuthProvider');
  return context;
};

export const EnhancedAuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async (user: User) => {
    try {
      const profile = await getUserProfile(user.uid);
      const status = await getEnrollmentStatus(user.uid);
      setUserProfile(profile);
      setEnrollmentStatus(status);
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserProfile(null);
      setEnrollmentStatus(null);
    }
  };

  const refreshUserProfile = async () => {
    if (currentUser) {
      await loadUserData(currentUser);
    }
  };

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);
          if (user) {
            await loadUserData(user);
          } else {
            setUserProfile(null);
            setEnrollmentStatus(null);
          }
          setLoading(false);
        });
        return unsubscribe;
      } catch (err) {
        console.error('Auth Listener Error:', err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    if (auth) {
      await signOut(auth);
      setUserProfile(null);
      setEnrollmentStatus(null);
    }
  };

  const value = {
    currentUser,
    userProfile,
    enrollmentStatus,
    loading,
    logout,
    refreshUserProfile,
  };

  return (
    <EnhancedAuthContext.Provider value={value}>
      {!loading && children}
    </EnhancedAuthContext.Provider>
  );
};
