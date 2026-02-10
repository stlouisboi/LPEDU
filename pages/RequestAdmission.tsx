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
  BarChart3,
  TrendingDown,
  AlertTriangle,
  Scale
} from 'lucide-react';
import AdmissionTerminalV42 from '../components/AdmissionTerminalV42';

/**
 * RequestAdmission: Institutional Entry Gate
 * Blueprint: image_797f31.jpg
 * Now utilizing the extracted AdmissionTerminalV42 component.
 */
const RequestAdmission: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans selection:bg-[#002244]/10">
      
      {/* SECTION: HEADER (Blueprint: image_797f31.jpg) */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-authority-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center space-y-10 animate-reveal-up relative z-10">
          <div className="inline-flex items-center space-x-3 bg-[#002244]/5 dark:bg-white/5 px-6 py-2.5 rounded-full border border-[#002244]/10 dark:border-white/10 shadow-sm">
             <Lock size={14} className="text-[#C5A059]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#002244] dark:text-white">Admission Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-serif text-[#002244] dark:text-white tracking-tighter uppercase leading-[0.85]">
            REQUEST <br/><span className="text-[#C5A059] italic">ADMISSION.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
            LaunchPath is selective by design. We build infrastructure for carriers who prioritize stewardship over short-term revenue.
          </p>
        </div>
      </section>

      {/* SECTION: STEWARDSHIP CARDS (3-Column Grid) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card: Wisdom */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <Award size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">WISDOM STANDARD</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Order precedes revenue. Admission requires a formal recognition that systems are the floor, not the ceiling of your business.
               </p>
            </div>
          </article>

          {/* Card: Fiscal */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <DollarSign size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">FISCAL DISCIPLINE</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Capital is oxygen. We require a commitment to maintaining 90 days of operational reserves before initiating fleet expansion.
               </p>
            </div>
          </article>

          {/* Card: Documentary */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <FileText size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">DOCUMENTARY ORDER</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Clinical record-keeping is non-negotiable. Evidence of refuge must be established before the first load is booked.
               </p>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION: THE OPERATING REALITY (New Targeted Addition) */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3 flex items-center gap-2">
            <BarChart3 size={14} /> THE OPERATING REALITY
          </p>
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase text-[#002244] dark:text-white leading-tight">
            THE COST OF BUILDING <br/>
            <span className="text-[#C5A059] italic">WITHOUT INFRASTRUCTURE.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mt-8 max-w-3xl leading-relaxed uppercase tracking-tight">
            The decision to invest in LaunchPath is not emotional. It is mathematical. Federal data confirms what 25 years of operations experience has shown: the carriers who fail are not the ones who lacked ambition. They are the ones who lacked systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Data Block 1: The Failure Rate */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#002244] p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <TrendingDown size={140} />
              </div>
              <div className="relative z-10 space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold/60">Statistical Analysis</p>
                <h3 className="text-6xl md:text-7xl font-black font-serif tracking-tighter leading-none">33%–45%</h3>
                <p className="text-lg font-bold uppercase leading-tight opacity-90">
                  of new motor carriers registered between 2018 and 2021 are now inactive.
                </p>
              </div>
            </div>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-8">
              Over 159,000 new DOT numbers were issued in 2023 alone. The market does not lack entrants. It lacks survivors.
              <br/><span className="text-[9px] mt-2 block opacity-50 italic">Source: FMCSA Motor Carrier Industry Statistics</span>
            </p>
          </div>

          {/* Data Block 2: Why They Fail */}
          <div className="lg:col-span-7 bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-sm space-y-12">
            {[
              { 
                label: "Undercapitalization & Poor Cash Flow", 
                detail: "Monthly operating costs per truck range from $10,300 to $18,800. Carriers without 60–90 days of reserves are overwhelmed before their first invoice clears.",
                icon: <DollarSign size={18} className="text-[#C5A059]" />
              },
              { 
                label: "Regulatory Non-Compliance", 
                detail: "The average FMCSA fine is nearly $6,000. Serious violations can exceed $79,000. A single insurance lapse can revoke your operating authority entirely.",
                icon: <ShieldCheck size={18} className="text-[#C5A059]" />
              },
              { 
                label: "Poor Management & Missing Systems", 
                detail: "Most new carriers lack systems for expense tracking, load profitability analysis, and compliance documentation. The audit finds what they never built.",
                icon: <Activity size={18} className="text-[#C5A059]" />
              }
            ].map((row, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#002244] group-hover:text-white transition-all">
                  {row.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black uppercase tracking-tight text-[#002244] dark:text-white leading-none">{row.label}</h4>
                  <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Block 3: The Math Comparison */}
        <div className="bg-slate-50 dark:bg-[#0c1a2d] rounded-[4rem] p-12 md:p-20 border border-slate-100 dark:border-white/5 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            
            <div className="text-center md:text-left space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">Operational Exposure</p>
              <h4 className="text-xl font-black text-slate-500 uppercase tracking-tight">Cost of One Serious Violation</h4>
              <p className="text-5xl lg:text-6xl font-black font-serif text-slate-400 tracking-tighter leading-none">$5,000 – $25,000</p>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                Fines, increased insurance premiums, <br/>potential authority revocation
              </p>
            </div>

            <div className="text-center md:text-right space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059] mb-2">Institutional Guard</p>
              <h4 className="text-xl font-black text-[#002244] dark:text-white uppercase tracking-tight">LaunchPath Implementation Investment</h4>
              <p className="text-5xl lg:text-6xl font-black font-serif text-[#002244] dark:text-white tracking-tighter leading-none">$2,500</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Complete 90-day infrastructure system. <br/>One-time. Lifetime access.
              </p>
            </div>
          </div>
          <div className="mt-20 text-center">
            <p className="text-xl md:text-2xl font-bold text-slate-400 italic leading-relaxed uppercase tracking-tight">
              "The investment is not the risk. The absence of infrastructure is the risk."
            </p>
            <p className="text-[9px] font-black text-slate-300 mt-6 uppercase tracking-[0.6em]">Source: FMCSA, 2023</p>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT YOUR INVESTMENT INCLUDES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">SCOPE OF ADMISSION</p>
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase text-[#002244] dark:text-white leading-tight">WHAT YOU'RE <span className="text-[#C5A059] italic">BUILDING.</span></h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mt-6 max-w-3xl leading-relaxed">
            Your $2,500 implementation investment covers the complete 90-Day Survival System — not a course library, but an operational infrastructure designed to keep your authority intact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold border-b border-slate-100 dark:border-white/5 pb-4">Curriculum & Training</h3>
            <div className="space-y-6">
              {[
                "Full 90-Day Implementation Curriculum (46 lessons across 6 modules)",
                "Ground 0 Orientation + Four Pillar Framework",
                "16 Deadly Sins Exposure Map with Guard Protocols",
                "FMCSA New Entrant Safety Audit Preparation",
                "Drug & Alcohol Program Compliance Training",
                "Driver Qualification File System Build"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-500/10 text-emerald-500 p-1 rounded-lg shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-tight uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold border-b border-slate-100 dark:border-white/5 pb-4">Tools & Infrastructure</h3>
            <div className="space-y-6">
              {[
                "TCO Calculator (Margin Master)",
                "DQ File Templates & Documentation Systems",
                "Maintenance Governance Templates",
                "Implementation Calendar & Task Registry",
                "REACH Readiness Assessment",
                "Compliance Resource Library",
                "Lifetime Access — All Future Updates Included"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-emerald-500/10 text-emerald-500 p-1 rounded-lg shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-tight uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT THIS IS NOT */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50 dark:bg-surface-dark rounded-[4rem] border border-slate-100 dark:border-white/5">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-red-600 mb-3">INSTITUTIONAL BOUNDARIES</p>
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase text-[#002244] dark:text-white leading-tight">WHAT WE <span className="text-red-600 italic">DON'T DO.</span></h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mt-6 max-w-3xl leading-relaxed">
            LaunchPath is an education and implementation system. We build infrastructure. We do not operate your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Legal advice or legal representation",
            "Dispatch services or load booking",
            "Insurance brokerage or policy placement",
            "Guaranteed FMCSA audit outcomes",
            "Tax preparation or financial advisory",
            "Ongoing consulting or coaching retainers"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-white dark:bg-primary-dark rounded-2xl border border-slate-100 dark:border-border-dark group hover:border-red-500/30 transition-all duration-300">
              <div className="bg-red-500/10 text-red-500 p-1 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                <XCircle size={18} />
              </div>
              <span className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PHILOSOPHY LINE */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-2xl font-bold text-slate-400 italic leading-relaxed uppercase tracking-tight">
          "This is a one-time investment in infrastructure — not a subscription to content. You're building systems that protect your authority for years, not renting access to videos."
        </p>
      </section>

      {/* SECTION: CALL TO ACTION (Access the standard) */}
      <section className="pb-40 px-6 bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-border-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-16 animate-reveal-up relative z-10">
           <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black font-serif uppercase text-[#002244] dark:text-white leading-tight">ACCESS THE <br/><span className="text-[#C5A059] italic">OPERATING STANDARD.</span></h2>
              <div className="h-2 w-40 bg-[#C5A059] mx-auto rounded-full"></div>
              <p className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
                One-time implementation investment of <span className="text-[#002244] dark:text-white">$2,500</span>. Includes lifetime access to the 90-Day Survival System.
              </p>
           </div>
           
           <div className="flex flex-col items-center space-y-12">
             <div className="flex flex-col items-center gap-4">
               <button 
                 onClick={() => setIsTerminalOpen(true)}
                 className="bg-[#002244] text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_-10px_rgba(0,34,68,0.4)] hover:bg-[#0c1a2d] hover:scale-105 transition-all active:scale-95 border-b-[12px] border-slate-900 group"
               >
                 OPEN ADMISSION TERMINAL <ChevronRight className="inline ml-4 group-hover:translate-x-2 transition-transform" size={24} />
               </button>
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                 <Mail size={14} className="mr-2 opacity-50" />
                 Questions before enrolling? Contact us at <a href="mailto:contact@launchpathedu.com" className="ml-1 text-authority-blue dark:text-signal-gold hover:underline">contact@launchpathedu.com</a>
               </p>
             </div>

             <div className="flex items-center space-x-6 opacity-30">
               <ShieldCheck size={24} className="text-[#C5A059]" />
               <div className="h-px w-20 bg-[#002244] dark:bg-white"></div>
               <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#002244] dark:text-white">INTEGRITY STANDARD CERTIFIED</p>
               <div className="h-px w-20 bg-[#002244] dark:bg-white"></div>
               <Activity size={24} className="text-[#C5A059]" />
             </div>
           </div>
        </div>
      </section>

      {/* ADMISSION TERMINAL COMPONENT */}
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
      </section>
    </div>
  );
};

export default RequestAdmission;