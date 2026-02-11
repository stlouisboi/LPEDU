import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase';
import { createUserProfile, getUserProfile } from '../utils/userRoles';
import {
  ShieldCheck,
  Lock,
  Mail,
  Loader2,
  ChevronRight,
  Terminal,
  Activity,
  User,
} from 'lucide-react';
import Logo from '../components/Logo';

const EnhancedPortalLogin: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigateBasedOnRole = async (uid: string) => {
    const profile = await getUserProfile(uid);
    
    if (!profile) {
      // New user without profile - redirect to enrollment pending
      navigate('/enrollment-pending');
      return;
    }

    if (profile.role === 'paid' || profile.role === 'admin') {
      navigate('/operator-portal');
    } else {
      // Free user - redirect to Ground 0 or enrollment page
      navigate('/enrollment-pending');
    }
  };

  const handleGoogleAuth = async () => {
    if (!auth) {
      setError('CONFIG_ERROR: FIREBASE AUTH NOT INITIALIZED');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, create if not
      const existingProfile = await getUserProfile(result.user.uid);
      if (!existingProfile) {
        await createUserProfile(
          result.user.uid,
          result.user.email!,
          result.user.displayName || undefined,
          'free'
        );
      }

      await navigateBasedOnRole(result.user.uid);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError('AUTHENTICATION_FAILED: GOOGLE UPLINK REJECTED');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('CONFIG_ERROR: FIREBASE AUTH NOT INITIALIZED');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await navigateBasedOnRole(userCredential.user.uid);
    } catch (err: any) {
      console.error('Login Error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('ACCOUNT NOT FOUND: NO AUTHORITY RECORD EXISTS');
      } else if (err.code === 'auth/wrong-password') {
        setError('INVALID CREDENTIALS: SECURITY KEY REJECTED');
      } else {
        setError('SYSTEM ERROR: AUTHENTICATION FAILED');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('CONFIG_ERROR: FIREBASE AUTH NOT INITIALIZED');
      return;
    }

    if (password !== confirmPassword) {
      setError('VALIDATION ERROR: SECURITY KEYS DO NOT MATCH');
      return;
    }

    if (password.length < 6) {
      setError('VALIDATION ERROR: SECURITY KEY MUST BE 6+ CHARACTERS');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore with 'free' role
      await createUserProfile(
        userCredential.user.uid,
        email,
        displayName || email.split('@')[0],
        'free'
      );

      // Navigate to enrollment pending (Ground 0 access)
      navigate('/enrollment-pending');
    } catch (err: any) {
      console.error('Signup Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('ACCOUNT EXISTS: USE LOGIN TERMINAL');
      } else if (err.code === 'auth/invalid-email') {
        setError('VALIDATION ERROR: INVALID EMAIL FORMAT');
      } else {
        setError('SYSTEM ERROR: ACCOUNT CREATION FAILED');
      }
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
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <Logo light={true} className="h-12 w-auto mx-auto" />
          </Link>
          <div className="flex items-center justify-center space-x-2 text-[#C5A059] mb-2">
            <Terminal size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Operator Access Terminal
            </span>
            <Activity size={14} className="animate-pulse" />
          </div>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold">
            Secure Authority Gateway
          </p>
        </div>

        {/* Main Terminal */}
        <div className="bg-[#001122] border-2 border-[#C5A059]/20 rounded-3xl overflow-hidden shadow-2xl">
          {/* Mode Toggle */}
          <div className="flex border-b border-[#C5A059]/10">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                mode === 'login'
                  ? 'bg-[#C5A059] text-[#002244]'
                  : 'text-[#C5A059]/40 hover:text-[#C5A059]/70'
              }`}
            >
              <Lock size={14} className="inline mr-2" />
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                mode === 'signup'
                  ? 'bg-[#C5A059] text-[#002244]'
                  : 'text-[#C5A059]/40 hover:text-[#C5A059]/70'
              }`}
            >
              <User size={14} className="inline mr-2" />
              Create Account
            </button>
          </div>

          <div className="p-8 space-y-6">
            {!isFirebaseConfigured && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold">
                ⚠ CRITICAL: Firebase configuration missing
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold animate-in shake">
                {error}
              </div>
            )}

            {/* Google Sign-In */}
            <button
              onClick={handleGoogleAuth}
              disabled={loading || !isFirebaseConfigured}
              className="w-full bg-white/5 border-2 border-white/10 py-4 rounded-2xl font-bold text-white flex items-center justify-center space-x-3 hover:bg-white/10 transition-all disabled:opacity-30"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm">Continue with Google</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-4 opacity-20">
              <div className="h-px flex-grow bg-white"></div>
              <span className="text-[9px] font-black uppercase text-white">OR</span>
              <div className="h-px flex-grow bg-white"></div>
            </div>

            {/* Login Form */}
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@carrier.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Security Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFirebaseConfigured}
                  className="w-full bg-[#C5A059] text-[#002244] font-black py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#D4AF69] transition-all shadow-xl disabled:opacity-30 uppercase tracking-wider text-sm"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Authorize Entry</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@carrier.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Security Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
                    Confirm Security Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#C5A059] transition-all text-white placeholder:text-white/20"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isFirebaseConfigured}
                  className="w-full bg-[#C5A059] text-[#002244] font-black py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#D4AF69] transition-all shadow-xl disabled:opacity-30 uppercase tracking-wider text-sm"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Create Authority Account</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="p-4 bg-white/5 text-center border-t border-white/5">
            <p className="text-[9px] text-white/40 uppercase tracking-[0.25em] font-bold">
              Authorized Personnel Only • Secure Uplink Active
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-[#C5A059]/60 hover:text-[#C5A059] text-xs uppercase tracking-[0.2em] font-bold transition-colors"
          >
            ← Return to LaunchPath Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPortalLogin;
