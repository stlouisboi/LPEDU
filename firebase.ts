
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Using the configuration provided in the latest request
const firebaseConfig = {
  apiKey: "AIzaSyAwyNphud5bBuijVMTBJFByebsv_bnRS5Q",
  authDomain: "lpedu-d9bb2.firebaseapp.com",
  projectId: "lpedu-d9bb2",
  storageBucket: "lpedu-d9bb2.firebasestorage.app",
  messagingSenderId: "689793698366",
  appId: "1:689793698366:web:fe4637f707bfa997205f6f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const isFirebaseConfigured = true;
