import React, { useState } from 'react';
import { 
  Award, 
  DollarSign, 
  FileText, 
  Lock, 
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Mail,
  Scale,
  Layers,
  X,
  Zap,
  BookOpen,
  Calculator,
  Bot,
  ShieldAlert,
  TrendingDown,
  Target
} from 'lucide-react';
import AdmissionTerminalV42 from '../components/AdmissionTerminalV42';

const RequestAdmission: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans selection:bg-[#002244]/10">
      
      {/* SECTION: HERO HEADER */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100 dark:border-white/5 relative overflow-hidden bg-[#002244]">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto text-center space-y-10 animate-reveal-up relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-sm">
             <Lock size={14} className="text-signal-gold" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Admission Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-serif text-white tracking-tighter uppercase leading-[0.85]">
            THE COST OF BUILDING <br/><span className="text-signal-gold italic">WITHOUT INFRASTRUCTURE.</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/70 font-bold max-w-4xl mx-auto leading-relaxed uppercase tracking-tight">
            The decision to invest in LaunchPath is not emotional. It is mathematical. Federal data confirms that carriers who fail are not the ones who lacked ambition—they are the ones who lacked systems.
          </p>
          <p className="text-sm text-white/50 max-w-3xl mx-auto mt-8 leading-relaxed">
            Designed for new and early-stage motor carriers operating under their own FMCSA authority. This is an implementation environment, not a general trucking course.
          </p>
        </div>
      </section>

      {/* SECTION: THE OPERATING REALITY (STATS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <div className="lg:col-span-5 bg-[#002244] p-12 rounded-[4rem] text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <TrendingDown size={180} />
            </div>
            <div className="relative z-10 space-y-8">
              <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">Statistical Analysis</p>
              <h2 className="text-8xl md:text-9xl font-black font-serif leading-none tracking-tighter">33%–<br/>45%</h2>
              <p className="text-2xl font-bold uppercase tracking-tight leading-tight">Of new motor carriers registered between 2018 and 2021 are now inactive.</p>
            </div>
            <div className="pt-12 border-t border-white/10 mt-12 relative z-10">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                Nearly half of all entrants cease operations within 36 months. The market lacks survivors with institutional infrastructure.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-surface-dark p-12 rounded-[4rem] border border-slate-100 dark:border-border-dark shadow-sm space-y-12">
            {[
              { 
                icon: <DollarSign size={24} />, 
                title: "Undercapitalization & Poor Cash Flow", 
                desc: "Monthly operating costs per truck range from $10,300 to $18,800. Carriers without 60–90 days of reserves are overwhelmed before their first invoice clears." 
              },
              { 
                icon: <ShieldAlert size={24} />, 
                title: "Regulatory Non-Compliance", 
                desc: "The average FMCSA fine is nearly $6,000. Serious violations can exceed $79,000. A single insurance lapse can revoke your operating authority entirely." 
              },
              { 
                icon: <Activity size={24} />, 
                title: "Poor Management & Missing Systems", 
                desc: "Most new carriers lack systems for expense tracking, load profitability analysis, and compliance documentation. The audit finds what they never built." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0 text-authority-blue dark:text-signal-gold shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-black text-[#002244] dark:text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INVESTMENT COMPARISON */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-[#002244] rounded-[5rem] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 items-stretch relative z-10">
            <div className="p-16 space-y-10">
               <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Operational Exposure</p>
               <h3 className="text-2xl font-bold text-white/50 uppercase tracking-tight font-serif">Cost of One Serious Violation</h3>
               <div className="space-y-2">
                 <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">$5,000 –<br/>$25,000</p>
                 <p className="text-red-500 font-bold uppercase tracking-widest text-xs">Fines, Increased Premiums, Revocation Risk</p>
               </div>
            </div>

            <div className="p-16 space-y-10 bg-white/[0.02]">
               <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">Institutional Guard</p>
               <h3 className="text-2xl font-bold text-white uppercase tracking-tight font-serif">LaunchPath Implementation Investment</h3>
               <div className="space-y-2">
                 <p className="text-6xl md:text-8xl font-black text-white tracking-tighter">$2,500</p>
                 <p className="text-signal-gold font-bold uppercase tracking-widest text-xs italic">Complete 90-Day Infrastructure System. One-Time. Lifetime Access.</p>
               </div>
            </div>
          </div>
          
          <div className="bg-black/40 py-12 px-8 text-center border-t border-white/5">
             <p className="text-2xl md:text-4xl font-black font-serif italic text-white/60 tracking-tight max-w-4xl mx-auto leading-tight uppercase">
               "The investment is not the risk. The absence of infrastructure is the risk."
             </p>
          </div>
        </div>
      </section>

      {/* SECTION: SYSTEM COMPONENTS (THE GAP FIX) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">
            These are operational controls installed to survive audits, insurance reviews, and the first 90 days of authority.
          </p>
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">SYSTEM <span className="text-signal-gold italic">COMPONENTS.</span></h2>
          <p className="text-lg text-slate-500 font-bold mt-4">Verification of Inclusion and Institutional Boundaries.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* INCLUSIONS */}
          <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-12 rounded-[4rem] shadow-sm space-y-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold border-b pb-4">Standard Inclusions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "6 Core Modules", icon: <Layers />, desc: "Structured implementation sequence." },
                { title: "46 Functional Lessons", icon: <BookOpen />, desc: "High-fidelity procedural training." },
                { title: "TCO Economic Engine", icon: <Calculator />, desc: "Clinical margin analysis terminal." },
                { title: "DQ File Factory", icon: <FileText />, desc: "Audit-ready document templates." },
                { title: "Neural Advisor", icon: <Bot />, desc: "24/7 technical regulatory access." },
                { title: "Lifetime Updates", icon: <Zap />, desc: "Regulatory sync as CFRs evolve." }
              ].map((item, i) => (
                <div key={i} className="space-y-2 group">
                  <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                    <span className="text-sm font-black uppercase tracking-tight">{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EXCLUSIONS */}
          <div className="bg-slate-50 dark:bg-[#0c1a2d] border border-slate-100 dark:border-white/5 p-12 rounded-[4rem] shadow-sm space-y-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-red-500 border-b pb-4">Institutional Boundaries</h3>
            <div className="space-y-6">
              {[
                "Legal Representation or Attorney Counsel",
                "Tax Preparation or Direct Financial Advisory",
                "Insurance Brokerage or Policy Issuance",
                "Dispatch Services or Load Board Access",
                "Guaranteed FMCSA Audit Pass Result",
                "Ongoing Coaching or One-on-One Consulting"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 bg-red-50 dark:bg-red-950/20 rounded-lg flex items-center justify-center text-red-500">
                    <XCircle size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-200 dark:border-white/10 italic text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              "LaunchPath provides the infrastructure. The carrier provides the operational execution."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FINAL CALL TO ACTION */}
      <section className="pb-40 pt-20 px-6 bg-white dark:bg-primary-dark relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16 animate-reveal-up relative z-10">
           <div className="space-y-12">
              <h2 className="text-6xl md:text-[7.5rem] font-black font-serif uppercase text-[#002244] dark:text-white leading-[0.85] tracking-tighter">ACCESS THE <br/><span className="text-signal-gold italic">OPERATING STANDARD.</span></h2>
              <div className="h-2 w-48 bg-signal-gold mx-auto rounded-full"></div>
              <p className="text-2xl md:text-4xl font-black text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-tight tracking-tight uppercase">
                One-time implementation investment of <span className="text-[#002244] dark:text-white">$2,500</span>. Includes lifetime access to the 90-Day Survival System.
              </p>
           </div>
           
           <div className="flex flex-col items-center space-y-16">
             <div className="flex flex-col items-center space-y-4">
               <button 
                 onClick={() => setIsTerminalOpen(true)}
                 className="bg-[#002244] text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_-10px_rgba(0,34,68,0.4)] hover:bg-[#0c1a2d] hover:scale-105 transition-all active:scale-0.98 border-b-[12px] border-slate-900 group"
               >
                 OPEN ADMISSION TERMINAL <ChevronRight className="inline ml-4 group-hover:translate-x-2 transition-transform" size={24} />
               </button>
               <p className="text-xs text-slate-400 dark:text-slate-500">
                 Completion of Ground 0 is required. Admission is not guaranteed.
               </p>
             </div>
             
             <div className="space-y-10 w-full">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span>Questions before enrolling? Contact us at</span>
                  <span className="text-signal-gold font-black border-b border-signal-gold/30 pb-0.5">SUPPORT@LAUNCHPATHEDU.COM</span>
                </p>
                
                <div className="flex items-center justify-center space-x-8 opacity-30">
                  <ShieldCheck size={28} className="text-signal-gold" />
                  <div className="h-px w-32 bg-[#002244] dark:bg-white"></div>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#002244] dark:text-white">INTEGRITY STANDARD CERTIFIED</p>
                  <div className="h-px w-32 bg-[#002244] dark:bg-white"></div>
                  <Activity size={28} className="text-signal-gold" />
                </div>
             </div>
           </div>
        </div>
      </section>

      <AdmissionTerminalV42 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      <footer className="py-32 bg-[#FAF9F6] dark:bg-[#020617] text-center border-t border-slate-200 dark:border-white/5">
         <p className="text-[12px] font-black uppercase tracking-[1em] text-slate-400 italic mb-8">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
         <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-12">
            CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
         </p>
      </footer>
    </div>
  );
};

export default RequestAdmission;