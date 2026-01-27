
import React, { useEffect } from 'react';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';

const PortalInterstitial = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatic redirection to Circle LMS/Community Environment
      window.location.href = "https://community.launchpath.edu/login";
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark flex items-center justify-center px-6 animate-in fade-in duration-700">
      <div className="max-w-md w-full text-center space-y-10">
        {/* Institutional Icon - Lock Focus */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-authority-blue rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 border border-white/10">
            <Lock className="text-signal-gold" size={40} />
          </div>
          <div className="absolute inset-0 bg-signal-gold/20 rounded-[2.5rem] animate-ping opacity-20"></div>
        </div>

        {/* Restricted Access Messaging */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">
            Authorized Personnel Only
          </h1>
          <div className="h-px w-20 bg-signal-gold/40 mx-auto"></div>
          <p className="text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed uppercase text-[10px] tracking-[0.25em]">
            Restricted system access detected. <br/>Redirecting to the secure authorized environment.
          </p>
        </div>

        {/* Redirecting Progress Indicator */}
        <div className="flex flex-col items-center space-y-4 pt-6">
          <Loader2 className="animate-spin text-authority-blue dark:text-signal-gold opacity-50" size={24} />
          <div className="flex items-center space-x-2 text-slate-300 dark:text-slate-700">
            <ShieldCheck size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Administrative Protocol Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalInterstitial;
