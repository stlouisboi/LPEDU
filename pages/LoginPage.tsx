import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuth } from '../AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Loader2, 
  AlertCircle, 
  ChevronRight,
  ShieldAlert,
  Terminal,
  Activity
} from 'lucide-react';
import Logo from '../components/Logo';

/**
 * LoginPage: Institutional Standard Terminal
 * Handles secure access to the LaunchPath Operating System.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate('/operator-portal');
    }
  }, [currentUser, navigate]);

  const handleTerminalAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate via Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Verify Enrollment Status in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.enrolled === true) {
          navigate('/operator-portal');
        } else {
          navigate('/enrollment-pending');
        }
      } else {
        // If user document doesn't exist, assume pending or first-time setup
        navigate('/enrollment-pending');
      }
    } catch (err: any) {
      console.error("Auth terminal error:", err);
      // Clinical error mapping
      switch (err.code) {
        case 'auth/invalid-credential':
          setError("INVALID AUTHORITY KEY: CREDENTIALS REJECTED");
          break;
        case 'auth/user-not-found':
          setError("ENTITY NOT FOUND: REGISTRY MISMATCH");
          break;
        case 'auth/wrong-password':
          setError("INVALID AUTHORITY KEY: ACCESS DENIED");
          break;
        case 'auth/too-many-requests':
          setError("TERMINAL LOCKOUT: TEMPORARY SUSPENSION DUE TO ATTEMPTS");
          break;
        default:
          setError("SYSTEM LOGIC FAULT: VERIFICATION FAILED");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#002244] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Background Decor: Carbon Fibre & Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none [background-size:40px_40px] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]"></div>
      
      {/* Central Terminal Card */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Branding */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
            <Logo light={true} className="h-16 w-auto drop-shadow-2xl" />
          </Link>
          <div className="mt-8 flex items-center justify-center space-x-4">
             <div className="h-px w-8 bg-[#C5A059]/30"></div>
             <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.6em]">OPERATOR PORTAL</p>
             <div className="h-px w-8 bg-[#C5A059]/30"></div>
          </div>
        </div>

        <div className="bg-[#0c1a2d] border-[3px] border-[#C5A059]/20 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative group hover:border-[#C5A059]/40 transition-colors duration-500">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0c1a2d] to-[#1e3a5f] border-b border-[#C5A059]/20 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal size={14} className="text-[#C5A059]" />
              <h1 className="text-sm font-black text-white uppercase tracking-[0.25em]">AUTHORITY ACCESS</h1>
            </div>
            <div className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
               <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Uplink: Live</span>
            </div>
          </div>

          <form onSubmit={handleTerminalAccess} className="p-8 md:p-10 space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-serif leading-none">CREDENTIALS REQUIRED</h2>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">SECURE GATEWAY v4.2</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start space-x-3 animate-in shake duration-300">
                <ShieldAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[11px] font-black text-red-500 uppercase tracking-widest leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email Terminal Input */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Registry Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C5A059] transition-colors" size={18} />
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="OPERATOR@CARRIER.GOV"
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059] outline-none transition-all placeholder:text-white/10 uppercase tracking-widest"
                  />
                </div>
              </div>

              {/* Password Terminal Input */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Authority Key</label>
                  <Link to="/contact" className="text-[9px] font-black text-[#C5A059]/60 hover:text-[#C5A059] transition-colors uppercase tracking-widest">Lost Key?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C5A059] transition-colors" size={18} />
                  <input 
                    required 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border-2 border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059] outline-none transition-all placeholder:text-white/10 tracking-widest"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-20 bg-[#C5A059] text-[#002244] rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-white transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center group border-b-8 border-[#8e7340]"
              >
                {loading ? (
                  <div className="flex items-center space-x-4">
                    <Loader2 className="animate-spin" size={24} />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>CONNECT TO TERMINAL</span>
                    <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Footer Signature */}
          <div className="bg-black/30 px-8 py-5 border-t border-white/5 text-center">
            <div className="flex items-center justify-center space-x-3 opacity-40">
              <ShieldCheck size={12} className="text-[#C5A059]" />
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white">System Infrastructure Encrypted // AES-256</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center space-y-6">
           <Link to="/readiness" className="text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-[0.4em]">Initialize Readiness Diagnostic</Link>
           <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-white/10"></div>
              <Activity size={16} className="text-white/10" />
              <div className="h-px w-12 bg-white/10"></div>
           </div>
        </div>
      </div>

      {/* Institutional Decoration Tags */}
      <div className="fixed top-12 left-12 hidden lg:block opacity-20 rotate-[-90deg] origin-left">
         <p className="text-[11px] font-black text-white uppercase tracking-[1em]">REGULATORY_INTEGRITY_V4</p>
      </div>
      <div className="fixed bottom-12 right-12 hidden lg:block opacity-20 rotate-[90deg] origin-right">
         <p className="text-[11px] font-black text-white uppercase tracking-[1em]">LP_AUTH_LOCK_STABLE</p>
      </div>
    </div>
  );
};

export default LoginPage;