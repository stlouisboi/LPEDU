import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwyNphud5bBuijVMTBJFByebsv_bnRS5",
  authDomain: "lpedu-d9bb2.firebaseapp.com",
  projectId: "lpedu-d9bb2",
  storageBucket: "lpedu-d9bb2.firebasestorage.app",
  messagingSenderId: "680979369836",
  appId: "1:680979369836:web:fe4637f707bfa997205f6f"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: 'launchpathtransportationedu.com',
});

export default app;
