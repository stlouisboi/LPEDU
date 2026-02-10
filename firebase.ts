
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { initializeFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

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

let auth: Auth = null as any;
let db: Firestore = null as any;
let storage: FirebaseStorage = null as any;

if (isFirebaseConfigured) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
    storage = getStorage(app);
    console.log("LaunchPath: Firebase Infrastructure Online");
  } catch (err) {
    console.error("LaunchPath: Firebase initialization critical failure:", err);
  }
} else {
  console.warn("LaunchPath: Firebase configuration missing. Auth and Database services are offline.");
}

export { auth, db, storage };
