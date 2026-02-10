
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from '../firebase';
import { useAuth } from '../AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Loader2, 
  ChevronRight,
  ShieldAlert,
  Terminal,
  Activity,
  Cpu,
  Fingerprint
} from 'lucide-react';
import Logo from '../components/Logo';

/**
 * AuthorityAccess: Industrial Logistics Terminal
 */
const AuthorityAccess: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkEnrollmentAndNavigate = async (uid: string) => {
    if (!db) {
      setError("DATABASE_OFFLINE: UNABLE TO VERIFY ENROLLMENT");
      return;
    }
    const userRef = doc(db, "operators", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.enrolled === true) {
        navigate('/operator-portal');
      } else {
        navigate('/enrollment-pending');
      }
    } else {
      navigate('/enrollment-pending');
    }
  };

  const handleGoogleConnection = async () => {
    if (!auth) {
      setError("CONFIG_ERROR: FIREBASE AUTH NOT INITIALIZED");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await checkEnrollmentAndNavigate(result.user.uid);
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      setError("AUTHENTICATION_FAILED: GOOGLE UPLINK REJECTED");
    } finally {
      setLoading(false);
    }
  };

  const handleTerminalConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("CONFIG_ERROR: FIREBASE AUTH NOT INITIALIZED");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await checkEnrollmentAndNavigate(userCredential.user.uid);
    } catch (err: any) {
      console.error("Terminal Auth Error:", err);
      setError("SYSTEM ERROR: INVALID AUTHORITY CREDENTIALS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#002244] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans selection:bg-[#C5A059]/30">
      {/* Visual Layer */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        {/* Branding */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
            <Logo light={true} className="h-14 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </Link>
          <div className="mt-8 flex items-center justify-center space-x-3">
             <div className="h-px w-6 bg-[#C5A059]/20"></div>
             <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.6em]">OPERATOR PORTAL</p>
             <div className="h-px w-6 bg-[#C5A059]/20"></div>
          </div>
        </div>

        <div className="bg-[#0c1a2d]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative group">
          
          <div className="bg-white/5 border-b border-white/5 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Terminal size={14} className="text-[#C5A059]" />
              <h1 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">AUTHORITY ACCESS</h1>
            </div>
            <div className="flex items-center space-x-2">
               <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
               <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest font-mono">
                 {isFirebaseConfigured ? 'UPLINK_STABLE' : 'UPLINK_OFFLINE'}
               </span>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">CREDENTIALS REQUIRED</h2>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">GATEWAY_VERSION_V4.2.1</p>
            </div>

            {!isFirebaseConfigured && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start space-x-3">
                <ShieldAlert size={18} className="text-amber-500 shrink-0" />
                <p className="text-[10px] font-bold text-amber-500/80 uppercase leading-relaxed">
                  SYSTEM WARNING: MISSION-CRITICAL KEYS ARE MISSING. VERIFY VITE_FIREBASE_API_KEY IN ENVIRONMENT SETTINGS.
                </p>
              </div>
            )}

            <button 
              onClick={handleGoogleConnection}
              disabled={loading || !isFirebaseConfigured}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center space-x-4 hover:bg-white/10 transition-all active:scale-95 group/google disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Fingerprint className="text-[#C5A059] group-hover/google:animate-pulse" size={20} />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Google Authority Link</span>
            </button>

            <div className="flex items-center space-x-4 opacity-20">
               <div className="h-px flex-grow bg-white"></div>
               <span className="text-[8px] font-black text-white uppercase">OR</span>
               <div className="h-px flex-grow bg-white"></div>
            </div>

            <form onSubmit={handleTerminalConnection} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Registry Email</label>
                <div className="relative group/input">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-[#C5A059] transition-colors" size={16} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="OPERATOR@CARRIER.GOV"
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 uppercase tracking-widest shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Authority Key</label>
                </div>
                <div className="relative group/input">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-[#C5A059] transition-colors" size={16} />
                  <input 
                    required 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 tracking-widest shadow-inner"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 animate-in shake duration-300">
                  <ShieldAlert size={14} className="text-red-500 shrink-0" />
                  <p className="text-[10px] font-bold text-red-500/80 uppercase font-mono tracking-tighter leading-none">
                    {error}
                  </p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading || !isFirebaseConfigured}
                className="w-full h-16 bg-[#C5A059] text-[#002244] rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_15px_30px_rgba(197,160,89,0.2)] hover:bg-white hover:scale-[1.04] hover:-translate-y-1 hover:shadow-[0_30px_60px_-12px_rgba(197,160,89,0.5)] transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group border-b-4 border-[#8e7340]"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="animate-spin" size={18} />
                    <span>VERIFYING...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>CONNECT TO TERMINAL</span>
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="bg-black/30 px-8 py-5 border-t border-white/5">
             <div className="flex items-center justify-between opacity-30">
               <div className="flex items-center space-x-2">
                  <ShieldCheck size={12} className="text-[#C5A059]" />
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white">ACCESS CONTROL PROTECTED</p>
               </div>
               <Activity size={12} className="text-white animate-pulse" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityAccess;
