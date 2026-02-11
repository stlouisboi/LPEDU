import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { UserProfile } from "../types/userTypes";

export const createUserProfile = async (uid: string, email: string | null, displayName: string | null): Promise<UserProfile> => {
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }

  const newUserProfile: UserProfile = {
    uid,
    email,
    displayName,
    role: 'free',
    enrolledAt: serverTimestamp(),
  };
  
  await setDoc(userRef, newUserProfile);
  return newUserProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) return null;
  const userRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};
