import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { UserProfile, UserRole } from "../types/userTypes";

export const createUserProfile = async (uid: string, email: string | null, displayName: string | null, role: UserRole = 'free'): Promise<UserProfile> => {
  if (!db) throw new Error("Database offline");
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }

  const newUserProfile: UserProfile = {
    uid,
    email,
    displayName,
    role,
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
