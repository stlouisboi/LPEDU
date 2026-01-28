import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Using process.env instead of import.meta.env as it is defined in vite.config.ts
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyAwyNphud5bBuijVMTBJFByebsv_bnRS5Q",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "lpedu-d9bb2.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "lpedu-d9bb2",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "lpedu-d9bb2.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "689793698366",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:689793698366:web:fe4637f707bfa997205f6f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/**
 * Initializing Firestore with Long Polling enabled.
 * This resolves the "unavailable" error often seen when WebSockets are restricted 
 * or when the client has trouble maintaining a persistent connection to the backend.
 */
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false 
});

export const storage = getStorage(app);
export const isFirebaseConfigured = true;