
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: (process.env as any).VITE_FIREBASE_API_KEY,
  authDomain: (process.env as any).VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (process.env as any).VITE_FIREBASE_PROJECT_ID,
  storageBucket: (process.env as any).VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (process.env as any).VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: (process.env as any).VITE_FIREBASE_APP_ID
};

// Defensive check to ensure we don't initialize Firebase with missing or placeholder keys
export const isFirebaseConfigured = 
  !!firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "undefined" && 
  firebaseConfig.apiKey !== "";

let app;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false 
    });
    storage = getStorage(app);
  } catch (err) {
    console.warn("Firebase initialization skipped or failed:", err);
  }
}

export { auth, db, storage };
