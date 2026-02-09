import React, { useState } from 'react';
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
  ChevronRight,
  ShieldAlert,
  Terminal,
  Activity,
  Cpu
} from 'lucide-react';
import Logo from '../components/Logo';

/**
 * AuthorityAccess: Industrial Logistics Terminal
 * Replicates the high-security design for carrier portal authentication.
 */
const AuthorityAccess: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTerminalConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Trigger Firebase Auth Sequence
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Navigation Guard: Verify Firestore Enrollment Status
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        // Prompt specific requirement: enrolled === true -> /dashboard, else /enrollment-pending
        if (userData.enrolled === true) {
          navigate('/dashboard');
        } else {
          navigate('/enrollment-pending');
        }
      } else {
        // Fallback for missing registry document
        navigate('/enrollment-pending');
      }
    } catch (err: any) {
      console.error("Terminal Auth Error:", err);
      setError("SYSTEM ERROR: INVALID AUTHORITY CREDENTIALS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#002244] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans selection:bg-[#C5A059]/30">
      {/* Visual Layer: Background Grid & Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        {/* Branding Area */}
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

        {/* Central Terminal Container (Dark Tinted Glass) */}
        <div className="bg-[#0c1a2d]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative group">
          
          {/* Internal Header Bar */}
          <div className="bg-white/5 border-b border-white/5 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Terminal size={14} className="text-[#C5A059]" />
              <h1 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">AUTHORITY ACCESS</h1>
            </div>
            <div className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
               <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest font-mono">UPLINK_STABLE</span>
            </div>
          </div>

          <form onSubmit={handleTerminalConnection} className="p-8 md:p-10 space-y-8">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">CREDENTIALS REQUIRED</h2>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">GATEWAY_VERSION_V4.2.0</p>
            </div>

            <div className="space-y-6">
              {/* Registry Email Input */}
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
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 uppercase tracking-widest shadow-inner"
                  />
                </div>
              </div>

              {/* Authority Key Input */}
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
                    className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white font-bold text-sm focus:border-[#C5A059]/40 outline-none transition-all placeholder:text-white/5 tracking-widest shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Error Message: Industrial Mono Style */}
            {error && (
              <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 animate-in shake duration-300">
                <ShieldAlert size={14} className="text-red-500 shrink-0" />
                <p className="text-[10px] font-bold text-red-500/80 uppercase font-mono tracking-tighter leading-none">
                  {error}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 bg-[#C5A059] text-[#002244] rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_15px_30px_rgba(197,160,89,0.2)] hover:bg-white hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(197,160,89,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center group border-b-4 border-[#8e7340]"
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
            </div>
          </form>

          {/* Container Footer */}
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

        {/* Outer Footer Text */}
        <div className="mt-12 text-center space-y-6">
           <div className="space-y-2">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">SYSTEM INFRASTRUCTURE ENCRYPTED // AES-256</p>
              <div className="flex items-center justify-center space-x-3 opacity-20">
                <div className="h-px w-8 bg-white"></div>
                <Cpu size={12} className="text-white" />
                <div className="h-px w-8 bg-white"></div>
              </div>
           </div>
           
           <Link to="/readiness" className="inline-block text-[10px] font-black text-[#C5A059]/40 hover:text-[#C5A059] transition-colors uppercase tracking-[0.4em] border-b border-transparent hover:border-[#C5A059]/20 pb-1">
             INITIALIZE READINESS DIAGNOSTIC
           </Link>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="fixed top-8 left-8 hidden lg:block opacity-10">
         <div className="flex flex-col space-y-1 font-mono text-[9px] text-white uppercase tracking-widest">
            <p>LOC: 35.2271° N, 80.8431° W</p>
            <p>ID: TERMINAL_ALPHA_4</p>
         </div>
      </div>
      <div className="fixed bottom-8 right-8 hidden lg:block opacity-10">
         <div className="flex flex-col items-end space-y-1 font-mono text-[9px] text-white uppercase tracking-widest">
            <p>REGISTRY_ACTIVE: TRUE</p>
            <p>PROTOCOL_READY: 1.0.4</p>
         </div>
      </div>
    </div>
  );
};

export default AuthorityAccess;