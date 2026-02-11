import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth, isFirebaseConfigured } from '../firebase';
import { createUserProfile } from '../utils/userRoles';
import { useEnhancedAuth } from '../EnhancedAuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Loader2, 
  ChevronRight,
  ShieldAlert,
  Terminal,
  Activity,
  Fingerprint,
  UserPlus,
  LogIn
} from 'lucide-react';
import Logo from '../components/Logo';

const EnhancedPortalLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, userProfile } = useEnhancedAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || "/operator-portal";

  // Redirect if already authenticated and profile loaded
  useEffect(() => {
    if (currentUser && userProfile) {
      if (userProfile.role === 'paid' || userProfile.role === 'admin') {
        navigate('/operator-portal');
      } else {
        navigate('/enrollment-pending');
      }
    }
  }, [currentUser, userProfile, navigate]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserProfile(user.uid, user.email, user.displayName);
      // Navigation is handled by the useEffect
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      setError("AUTHENTICATION_FAILED: GOOGLE UPLINK REJECTED");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(result.user.uid, result.user.email, null);
      }
      // Profile fetching and navigation handled by Context + useEffect
    } catch (err: any) {
      console.error("Auth terminal error:", err);
      // Provide specific error messages based on Firebase error codes
      switch (err.code) {
        case 'auth/user-not-found':
          setError("ENTITY NOT FOUND");
          break;
        case 'auth/wrong-password':
          setError("INVALID AUTHORITY KEY");
          break;
        case 'auth/invalid-email':
          setError("INVALID EMAIL FORMAT");
          break;
        case 'auth/email-already-in-use':
          setError("EMAIL ALREADY REGISTERED - USE LOGIN");
          break;
        case 'auth/weak-password':
          setError("PASSWORD TOO WEAK - MIN 6 CHARACTERS");
          break;
        case 'auth/invalid-credential':
          setError("INVALID CREDENTIALS");
          break;
        default:
          setError("AUTHENTICATION FAILED: " + (err.message || "UNKNOWN ERROR"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#002244] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans selection:bg-[#C5A059]/30">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
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

        <div className="bg-[#0c1a2d]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="bg-white/5 border-b border-white/5 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Terminal size={14} className="text-[#C5A059]" />
              <h1 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">
                {isLogin ? 'AUTHORITY ACCESS' : 'REGISTRY ENROLLMENT'}
              </h1>
            </div>
            <div className="flex bg-black/40 p-1 rounded-lg">
               <button 
                 onClick={() => setIsLogin(true)}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${isLogin ? 'bg-[#C5A059] text-authority-blue' : 'text-white/40'}`}
               >
                 Login
               </button>
               <button 
                 onClick={() => setIsLogin(false)}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${!isLogin ? 'bg-[#C5A059] text-authority-blue' : 'text-white/40'}`}
               >
                 Register
               </button>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-serif leading-none">
                {isLogin ? 'ENTER TERMINAL' : 'INITIALIZE PROFILE'}
              </h2>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">ENHANCED_SECURITY_V4.2</p>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={loading || !isFirebaseConfigured}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center space-x-4 hover:bg-white/10 transition-all active:scale-95 group/google disabled:opacity-30"
            >
              <Fingerprint className="text-[#C5A059] group-hover/google:animate-pulse" size={20} />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Quick Auth Link</span>
            </button>

            <div className="flex items-center space-x-4 opacity-10">
               <div className="h-px flex-grow bg-white"></div>
               <span className="text-[8px] font-black text-white uppercase">OR</span>
               <div className="h-px flex-grow bg-white"></div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Registry Email</label>
                <div className="relative group/input">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-[#C5A059] transition-colors" size={16} />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="OPERATOR@CARRIER.GOV" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 uppercase tracking-widest shadow-inner" />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 ml-4">Security Key</label>
                <div className="relative group/input">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-[#C5A059] transition-colors" size={16} />
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 tracking-widest shadow-inner" />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 animate-in shake duration-300">
                  <ShieldAlert size={14} className="text-red-500 shrink-0" />
                  <p className="text-[10px] font-bold text-red-500/80 uppercase font-mono leading-none">{error}</p>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full h-16 bg-[#C5A059] text-[#002244] rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-white transition-all active:scale-[0.98] disabled:opacity-30 border-b-4 border-[#8e7340] flex items-center justify-center group">
                {loading ? <Loader2 className="animate-spin" size={18} /> : (
                  <div className="flex items-center">
                    {isLogin ? <LogIn size={18} className="mr-2" /> : <UserPlus size={18} className="mr-2" />}
                    <span>{isLogin ? 'CONNECT TERMINAL' : 'INITIALIZE REGISTRY'}</span>
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="bg-black/30 px-8 py-5 border-t border-white/5 flex items-center justify-between opacity-30">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={12} className="text-[#C5A059]" />
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white">ENCRYPTED_UPLINK</p>
            </div>
            <Activity size={12} className="text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPortalLogin;