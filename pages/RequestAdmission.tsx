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
        </div>
      </section>

      {/* SECTION: THE OPERATING REALITY (STATS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* STAT CARD */}
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
                Over 159,000 new DOT numbers were issued in 2023 alone. The market does not lack entrants. It lacks survivors.
                <br/><span className="text-signal-gold/40 italic">Source: FMCSA Motor Carrier Industry Statistics</span>
              </p>
            </div>
          </div>

          {/* FAILURE VECTORS */}
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
            {/* EXPOSURE SIDE */}
            <div className="p-16 space-y-10">
               <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">Operational Exposure</p>
               <h3 className="text-2xl font-bold text-white/50 uppercase tracking-tight font-serif">Cost of One Serious Violation</h3>
               <div className="space-y-2">
                 <p className="text-6xl md:text-7xl font-black text-white tracking-tighter">$5,000 –<br/>$25,000</p>
                 <p className="text-red-500 font-bold uppercase tracking-widest text-xs">Fines, Increased Premiums, Revocation Risk</p>
               </div>
            </div>

            {/* GUARD SIDE */}
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
             <p className="text-2xl md:text-4xl font-black font-serif italic text-white/60 tracking-tight max-w-4xl mx-auto leading-tight">
               "THE INVESTMENT IS NOT THE RISK. THE ABSENCE OF INFRASTRUCTURE IS THE RISK."
             </p>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-8">Source: FMCSA 2024</p>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT YOU'RE BUILDING */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-12 mb-24">
           <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">SCOPE OF ADMISSION</p>
              <h2 className="text-5xl md:text-8xl font-black font-serif uppercase text-[#002244] dark:text-white leading-[0.85] tracking-tighter">
                WHAT YOU'RE <br/><span className="text-signal-gold italic">BUILDING.</span>
              </h2>
           </div>
           <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-4xl leading-relaxed">
             Your $2,500 implementation investment covers the complete 90-Day Survival System — not a course library, but an operational infrastructure designed to keep your authority intact.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-surface-dark rounded-[4rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-2xl items-stretch">
           <div className="p-12 md:p-20 space-y-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue border-b border-slate-100 pb-4">Curriculum & Training</h3>
              <div className="space-y-8">
                 {[
                   { icon: <Layers size={18} />, title: "6 Sequential Modules", desc: "Technical deployment of the Operating Standard across the 90-day window." },
                   { icon: <BookOpen size={18} />, title: "46 Functional Lessons", desc: "Procedural walkthroughs of 49 CFR federal requirements." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 text-authority-blue border border-slate-100 transition-transform group-hover:scale-110">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-[#002244] dark:text-white uppercase tracking-tight text-lg">{item.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-12 md:p-20 space-y-12 bg-slate-50 dark:bg-[#0c1a2d]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold border-b border-white/5 pb-4">Tools & Infrastructure</h3>
              <div className="space-y-8">
                 {[
                   { icon: <Calculator size={18} />, title: "TCO Economic Engine", desc: "Proprietary margin analysis and break-even RPM logic terminal." },
                   { icon: <FileText size={18} />, title: "DQ File Templates", desc: "Audit-ready document factory for clinical driver records." },
                   { icon: <Bot size={18} />, title: "Compliance Assistant", desc: "24/7 high-fidelity regulatory advisor terminal access." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 text-signal-gold border border-slate-100 dark:border-white/5 transition-transform group-hover:scale-110">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-[#002244] dark:text-white uppercase tracking-tight text-lg">{item.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* SECTION: WHAT WE DON'T DO (GRID) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-8 mb-20">
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500">Institutional Boundaries</p>
           <h2 className="text-5xl md:text-[5.5rem] font-black font-serif uppercase text-[#002244] dark:text-white leading-[0.85] tracking-tighter">
             WHAT WE <span className="text-red-500 italic">DON'T DO.</span>
           </h2>
           <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold max-w-3xl leading-relaxed">
             LaunchPath is an education and implementation system. We build infrastructure. We do not operate your business.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {[
             "Legal Advice or Legal Representation",
             "Dispatch Services or Load Booking",
             "Insurance Brokerage or Policy Placement",
             "Guaranteed FMCSA Audit Outcomes",
             "Tax Preparation or Financial Advisory",
             "Ongoing Consulting or Coaching Retainers"
           ].map((item, i) => (
             <div key={i} className="bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-border-dark p-10 rounded-[3rem] flex flex-col items-start space-y-6 group hover:border-red-500/20 transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-2xl flex items-center justify-center text-red-500 border border-red-100 dark:border-red-900/30">
                  <XCircle size={20} />
                </div>
                <span className="text-base font-black uppercase tracking-tight text-[#002244] dark:text-white leading-tight">{item}</span>
             </div>
           ))}
        </div>

        <div className="mt-24 text-center">
           <p className="text-2xl md:text-4xl font-black font-serif italic text-slate-400 dark:text-slate-600 max-w-5xl mx-auto leading-tight uppercase tracking-tighter">
             "THIS IS A ONE-TIME INVESTMENT IN INFRASTRUCTURE — NOT A SUBSCRIPTION TO CONTENT. YOU'RE BUILDING SYSTEMS THAT PROTECT YOUR AUTHORITY FOR YEARS, NOT RENTING ACCESS TO VIDEOS."
           </p>
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
             <button 
               onClick={() => setIsTerminalOpen(true)}
               className="bg-[#002244] text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_-10px_rgba(0,34,68,0.4)] hover:bg-[#0c1a2d] hover:scale-105 transition-all active:scale-95 border-b-[12px] border-slate-900 group"
             >
               OPEN ADMISSION TERMINAL <ChevronRight className="inline ml-4 group-hover:translate-x-2 transition-transform" size={24} />
             </button>
             
             <div className="space-y-10 w-full">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span>Questions before enrolling? Contact us at</span>
                  <span className="text-signal-gold font-black border-b border-signal-gold/30 pb-0.5">CONTACT@LAUNCHPATHEDU.COM</span>
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

      {/* FOOTER ANCHOR */}
      <section className="py-32 bg-[#FAF9F6] dark:bg-[#020617] text-center border-t border-slate-200 dark:border-white/5">
         <p className="text-[12px] font-black uppercase tracking-[1em] text-slate-400 italic mb-8">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
         <div className="flex items-center justify-center space-x-6 opacity-10">
            <Lock size={20} />
            <Activity size={20} />
            <ShieldCheck size={20} />
         </div>
         <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-12">
            CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
         </p>
      </section>
    </div>
  );
};

export default RequestAdmission;