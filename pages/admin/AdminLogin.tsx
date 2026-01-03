
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError('Invalid admin credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-primary-dark p-4">
      <div className="max-w-md w-full bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden">
        <div className="bg-authority-blue p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <ShieldCheck className="w-8 h-8 text-signal-gold" />
          </div>
          <h1 className="text-2xl font-bold font-serif">LaunchPath Admin</h1>
          <p className="text-white/60 text-sm mt-1 uppercase tracking-widest font-bold">Secure Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-in shake duration-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@launchpath.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-authority-blue text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-steel-blue transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Authorize Entry</span>}
          </button>
        </form>

        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 text-center">
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
            Authorized Personnel Only • IP Logged
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
