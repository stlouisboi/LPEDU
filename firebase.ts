
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { initializeFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

/**
 * Robustly retrieves environment variables from common injection points.
 */
const getEnvVar = (key: string, fallback: string = ""): string => {
  const meta = (import.meta as any);
  const proc = (typeof process !== 'undefined' ? process : { env: {} }) as any;
  
  const keysToTry = [
    key,
    key.replace('VITE_', ''),
    key.replace('VITE_FIREBASE_', ''),
    key.replace('VITE_FIREBASE_', 'FIREBASE_')
  ];
  
  let value = "";
  for (const k of keysToTry) {
    if (meta.env && meta.env[k]) { value = meta.env[k]; break; }
    if (proc.env && proc.env[k]) { value = proc.env[k]; break; }
    if (typeof window !== 'undefined' && (window as any).env && (window as any).env[k]) {
      value = (window as any).env[k];
      break;
    }
  }

  const isPlaceholder = (val: string) => {
    const v = val.toUpperCase();
    return v.includes('YOUR_VITE') || v.includes('PLACEHOLDER') || v === 'UNDEFINED' || v === '';
  };

  if (value && !isPlaceholder(value)) return value;
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', "AIzaSyBqxF30YWDkqt91BLazfAf__NQsuPM13nI"),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', "launchpathedu-426fb.firebaseapp.com"),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', "launchpathedu-426fb"),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', "launchpathedu-426fb.firebasestorage.app"),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', "296687537162"),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', "1:296687537162:web:18fcbf64f9eb984ce0a3f3")
};

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey.length > 10 &&
  !firebaseConfig.projectId.includes('YOUR_VITE')
);

export let auth: Auth;
export let db: Firestore;
export let storage: FirebaseStorage;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true
    });
    
    storage = getStorage(app);
    console.log("LaunchPath: Firebase initialized successfully.");
  } catch (error) {
    console.error("LaunchPath: Firebase initialization failed:", error);
  }
} else {
  console.warn("LaunchPath: Firebase unconfigured. Firestore features disabled.");
}
