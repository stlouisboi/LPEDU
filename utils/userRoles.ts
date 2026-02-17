import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { UserProfile, UserRole } from "../types";

export const createUserProfile = async (uid: string, email: string | null, displayName: string | null, role: UserRole = 'free'): Promise<UserProfile> => {
  if (!db) throw new Error("Database offline");
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }

  // Authorize specific admin emails
  const adminEmails = ['vincelaw336@gmail.com'];
  const assignedRole = email && adminEmails.includes(email) ? 'admin' : role;

  const newUserProfile: UserProfile = {
    uid,
    email,
    displayName,
    role: assignedRole,
    enrolledAt: serverTimestamp(),
  };
  
  await setDoc(userRef, newUserProfile);
  return newUserProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
  return null;
};

export const updateUserRole = async (uid: string, role: UserRole) => {
  if (!db) return;
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { role });
};