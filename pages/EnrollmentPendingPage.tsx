import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Lock, Clock, Anchor } from 'lucide-react';
import Logo from '../components/Logo';

const EnrollmentPendingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#002244] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="w-full max-w-2xl text-center space-y-12 animate-in fade-in duration-700 relative z-10">
        <Logo light={true} className="h-16 mx-auto mb-8" />
        
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-white/5 border-2 border-[#C5A059]/40 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl relative">
            <Lock className="text-[#C5A059]" size={56} />
          </div>
          <div className="absolute inset-0 bg-[#C5A059]/10 rounded-[3rem] animate-ping opacity-20"></div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white uppercase tracking-tighter leading-tight">
            ADMISSION <br/><span className="text-[#C5A059] italic">PENDING.</span>
          </h1>
          <div className="h-1.5 w-32 bg-[#C5A059] mx-auto rounded-full"></div>
          <p className="text-xl md:text-2xl text-white/60 font-bold max-w-xl mx-auto leading-relaxed">
            Your account is authenticated, but the LaunchPath Implementation Phase has not been authorized for your entity.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-14 text-left space-y-8 shadow-2xl">
           <div className="flex items-center space-x-4 text-[#C5A059]">
              <ShieldAlert size={24} />
              <h3 className="text-xs font-black uppercase tracking-[0.4em]">Required Action Sequence</h3>
           </div>
           
           <div className="space-y-8">
              {[
                { icon: <Clock size={20}/>, title: "Registry Verification", desc: "Our specialists are reviewing your admission request against institutional standards." },
                { icon: <Anchor size={20}/>, title: "Implementation Investment", desc: "Access to the 90-Day Survival System requires a one-time authorization of $2,500." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C5A059] shrink-0 border border-white/10 shadow-inner">
                      {item.icon}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none">{item.title}</h4>
                      <p className="text-sm font-medium text-white/40 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="pt-8 border-t border-white/10">
              <Link 
                to="/pricing" 
                className="w-full bg-[#C5A059] text-[#002244] py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-white transition-all active:scale-[0.98] flex items-center justify-center group"
              >
                Complete Admission Sequence <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
           </div>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 pt-10">
          Wisdom before movement • Discipline before expansion
        </p>
      </div>
    </div>
  );
};

export default EnrollmentPendingPage;