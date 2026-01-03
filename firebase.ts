
import { initializeApp, FirebaseApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, Auth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, Firestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, FirebaseStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

/**
 * Robustly retrieves environment variables from common injection points.
 * Filters out literal placeholder strings that cause Firebase SDK errors.
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

// Use provided credentials as hardcoded fallbacks if environment variables are missing
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', "AIzaSyBqxF30YWDkqt91BLazfAf__NQsuPM13nI"),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', "launchpathedu-426fb.firebaseapp.com"),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', "launchpathedu-426fb"),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', "launchpathedu-426fb.firebasestorage.app"),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', "296687537162"),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', "1:296687537162:web:18fcbf64f9eb984ce0a3f3")
};

// Strict validation to prevent SDK from attempting connections to invalid resources
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey.length > 10 &&
  !firebaseConfig.projectId.includes('YOUR_VITE') &&
  !firebaseConfig.projectId.includes('placeholder')
);

export let auth: Auth;
export let db: Firestore;
export let storage: FirebaseStorage;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("LaunchPath: Firebase services initialized successfully.");
  } catch (error) {
    console.error("LaunchPath: Firebase initialization failed:", error);
    initializeProxies();
  }
} else {
  console.warn("LaunchPath: Firebase environment variables are missing. Using No-Op mode.");
  initializeProxies();
}

function initializeProxies() {
  const serviceProxyHandler = {
    get: (target: any, prop: string) => {
      // Return null/undefined for properties that SDK modular functions check to detect a valid instance
      if (prop === 'app' || prop === '_delegate' || prop === 'INTERNAL') return undefined;
      if (prop === 'currentUser') return null;
      
      return (...args: any[]) => {
        console.warn(`LaunchPath: Action '${prop}' ignored (Firebase not configured).`);
        return new Promise(() => {});
      };
    }
  };

  auth = new Proxy({}, serviceProxyHandler) as Auth;
  db = new Proxy({}, serviceProxyHandler) as Firestore;
  storage = new Proxy({}, serviceProxyHandler) as FirebaseStorage;
}
