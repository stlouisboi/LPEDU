import React from 'react';
import { Award, Shield, Anchor, ShieldCheck, Lock, CheckCircle } from 'lucide-react';

const TrustArchitecture: React.FC = () => {
  const badges = [
    {
      icon: <Award size={18} className="text-signal-gold" fill="currentColor" />,
      title: "VETERAN OWNED",
      sub: "U.S. VETERAN OWNED",
      type: "gold"
    },
    {
      icon: <Shield size={18} className="text-signal-gold" />,
      title: "SDVOSB",
      sub: "SERVICE-DISABLED VET",
      type: "gold"
    },
    {
      icon: <Anchor size={18} className="text-signal-gold" />,
      title: "KINGDOM BUSINESS",
      sub: "STEWARDSHIP FOCUSED",
      type: "gold"
    },
    {
      icon: <ShieldCheck size={18} className="text-signal-gold" />,
      title: "OSHA-TRAINED",
      sub: "SAFETY SYSTEMS",
      type: "gold"
    },
    {
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      title: "AUDIT READY",
      sub: "FMCSA COMPLIANT",
      type: "active"
    },
    {
      icon: <Lock size={18} className="text-slate-400" />,
      title: "SECURE SSL",
      sub: "256-BIT ENCRYPTED",
      type: "muted"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto px-6">
      {badges.map((badge, i) => (
        <div 
          key={i} 
          className={`relative p-5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 ${
            badge.type === 'gold' ? 'border-signal-gold/40 bg-authority-blue/20' : 
            badge.type === 'active' ? 'border-emerald-500 bg-white shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 
            'border-slate-500/30 bg-slate-500/5'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            {badge.icon}
            <span className={`text-[11px] font-black uppercase tracking-widest ${badge.type === 'active' ? 'text-authority-blue' : 'text-white'}`}>
              {badge.title}
            </span>
          </div>
          
          <div className={`w-full h-px mb-3 ${badge.type === 'active' ? 'bg-emerald-100' : 'bg-white/10'}`}></div>
          
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${badge.type === 'active' ? 'text-emerald-600' : 'text-white/50'}`}>
            {badge.sub}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustArchitecture;