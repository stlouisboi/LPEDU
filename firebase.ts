import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { initializeFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * Robust environment variable accessor.
 * Prioritizes import.meta.env (Vite standard) then process.env (mapped via define).
 */
const getEnv = (key: string): string => {
  try {
    // Check import.meta.env (standard Vite environment)
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
    // Fallback to process.env (useful when using Vite 'define' for global mapping)
    if (typeof process !== 'undefined' && (process as any).env && (process as any).env[key]) {
      return (process as any).env[key];
    }
  } catch (e) {
    // Silently handle context where env objects are missing
  }
  return "";
};

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID')
};

// Strict configuration check
export const isFirebaseConfigured = 
  !!firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "undefined" && 
  firebaseConfig.apiKey.length > 5;

let auth: Auth = null as any;
let db: Firestore = null as any;
let storage: FirebaseStorage = null as any;
let app: FirebaseApp | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    if (app) {
      auth = getAuth(app);
      db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
      });
      storage = getStorage(app);
      console.log("LaunchPath: Firebase Infrastructure Online");
    }
  } catch (err) {
    console.error("LaunchPath: Firebase initialization critical failure:", err);
  }
} else {
  console.warn("LaunchPath: Firebase configuration missing or invalid. Auth and Database services are offline.");
}

export { auth, db, storage };