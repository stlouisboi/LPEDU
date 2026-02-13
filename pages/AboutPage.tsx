import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Clock, 
  Users, 
  Scale,
  Shield,
  Gavel,
  Zap,
  ShieldX,
  Target,
  FileText,
  ShieldAlert,
  ChevronRight,
  Anchor,
  BookOpen,
  CheckCircle2,
  XCircle,
  Briefcase,
  Lock
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
    
    // Set Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Institutional structure for new FMCSA authorities. Learn why LaunchPath exists to prevent early carrier failure through governed systems and documented standards.');
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans border-t border-white/5">
      
      {/* HERO SECTION - 60/40 EXECUTIVE ENTRANCE */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] via-[#C5A059]/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-10 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Institutional Registry</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
              <p className="text-lg md:text-xl text-signal-gold font-bold uppercase tracking-widest border-l-2 border-signal-gold pl-6">
                Institutional structure for new FMCSA authorities who want to prevent early failure.
              </p>
            </div>

            <div className="space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <p>
                LaunchPath is built for carrier executives operating 1–3 units under new FMCSA authority. We exist to prevent failure driven by authority revocation, insurance cancellation, and compliance collapse.
              </p>
              
              <p>
                We install institutional governance before revenue is prioritized. This environment is a clinical operating standard, not a motivational platform. Our purpose is systematic order to ensure survival through the 18-month new entrant window.
              </p>
            </div>

            <div className="pt-6 sm:pt-8">
              <Link to="/reach-test" className="inline-flex items-center space-x-4 sm:space-x-6 bg-[#C5A059] text-[#002244] px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[12px] shadow-[0_20px_50px_-15px_rgba(197,160,89,0.4)] hover:bg-white hover:text-[#002244] transition-all active:scale-95 group border-b-4 sm:border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-200 relative min-h-[450px] sm:min-h-[550px] lg:min-h-0 shrink-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
            alt="Founder Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2 drop-shadow-lg">System Custodian</p>
            <p className="text-3xl font-black text-white uppercase tracking-tight font-serif drop-shadow-2xl">Vince Lawrence</p>
          </div>
        </div>
      </section>

      {/* ORIENTATION PAUSE */}
      <div className="bg-slate-50 dark:bg-black/20 py-16 text-center border-b border-slate-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          Operating within the standard requires strict adherence to defined boundaries.
        </p>
      </div>

      {/* CLARITY OF PURPOSE SECTION */}
      <section className="py-16 md:py-32 lg:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8 animate-reveal-up">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] text-slate-400">OPERATIONAL PARAMETERS</p>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
              CLARITY OF <span className="text-[#C5A059] italic">PURPOSE.</span>
            </h2>
            <div className="bg-[#002244] text-white p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl border-l-[12px] border-signal-gold mb-16">
              <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-left">
                This environment is built exclusively for executives willing to submit their operation to documented legal, operational, and insurance standards. Shortcut seekers are excluded.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 xl:gap-16">
            {[
              { 
                icon: <Gavel size={32} className="text-[#C5A059]" />, 
                title: "LEGAL BOUNDARIES", 
                body: "We provide safety file architecture and federal regulation interpretation to prevent unauthorized practice through strict technical separation.",
                provide: ["Technical safety file architecture", "Federal regulation interpretation", "Audit-readiness verification"],
                exclude: ["Legal representation/counsel", "Courtroom defense services"]
              },
              { 
                icon: <Briefcase size={32} className="text-[#C5A059]" />, 
                title: "OPERATIONAL BOUNDARIES", 
                body: "We engineer governance systems that protect your authority while maintaining administrative distance to preserve carrier independence.",
                provide: ["Authority protection protocols", "Preferred carrier positioning", "Systemic record governance"],
                exclude: ["Daily dispatch operations", "Direct shipper recruitment"]
              },
              { 
                icon: <Shield size={32} className="text-[#C5A059]" />, 
                title: "INSURANCE BOUNDARIES", 
                body: "We build risk profiles underwriters value. We do not sell policies, eliminating conflicts of interest in coverage procurement.",
                provide: ["Insurance continuity systems", "Underwriter evidence packages", "Risk profile optimization"],
                exclude: ["Policy binding or issuance", "Brokerage services"]
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#002244] rounded-3xl md:rounded-[4rem] border border-white/5 shadow-2xl flex flex-col group hover:-translate-y-2 transition-all duration-700 animate-reveal-up overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
                <div className="p-8 md:p-12 xl:p-16 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-8 sm:mb-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-[#C5A059] group-hover:text-[#002244] transition-all duration-500 shadow-inner shrink-0">
                      {card.icon}
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors">
                      <Lock size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">Institutional Guard</span>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    <h3 className="text-2xl sm:text-3xl font-black font-serif text-white uppercase tracking-tight leading-tight">{card.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg md:text-[19px] font-bold text-white/90 leading-relaxed mb-8 sm:mb-10 flex-grow uppercase tracking-tight">
                    {card.body}
                  </p>
                  <div className="space-y-10 sm:space-y-12 pt-8 sm:pt-10 border-t border-white/5">
                    <div className="space-y-5 sm:space-y-6">
                      <p className="text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] flex items-center gap-3">
                        <CheckCircle2 size={16} /> Institutional Scope
                      </p>
                      <ul className="space-y-3 sm:space-y-4">
                        {card.provide.map((item, idx) => (
                          <li key={idx} className="text-[13px] sm:text-[15px] font-black text-white/90 uppercase tracking-tighter flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-5 sm:space-y-6">
                      <p className="text-[10px] sm:text-[11px] font-black text-red-400 uppercase tracking-[0.4em] flex items-center gap-3">
                        <XCircle size={16} /> Formal Exclusions
                      </p>
                      <ul className="space-y-3 sm:space-y-4">
                        {card.exclude.map((item, idx) => (
                          <li key={idx} className="text-[13px] sm:text-[15px] font-bold text-white/40 uppercase tracking-tighter flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-white/10 rounded-full shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIENTATION PAUSE */}
      <div className="bg-slate-50 dark:bg-black/20 py-16 text-center border-y border-slate-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          Our diagnostic framework is rooted in industrial safety protocols.
        </p>
      </div>

      {/* THE REACH TEST SECTION */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#fafaf9] dark:bg-surface-dark border-y border-[#002244]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 xl:gap-32 items-center mb-16 sm:mb-24">
            <div className="space-y-10 sm:space-y-12 animate-reveal-up">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center space-x-3 sm:space-x-4 text-[#002244] dark:text-[#C5A059]">
                  <Scale size={20} sm:size={24} />
                  <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.3em]">Diagnostic Principle</span>
                </div>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase leading-[0.85] tracking-tighter">
                  THE <span className="text-[#C5A059] italic">REACH</span> TEST.
                </h2>
              </div>
              <div className="space-y-8 sm:space-y-10 text-lg sm:text-xl md:text-[22px] text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                <p>In industrial safety, we use the <span className="text-[#002244] dark:text-white underline decoration-[#C5A059] underline-offset-8 decoration-4 font-black">"Reach Test."</span></p>
                <p>It is a binary assessment: If a hazard can be reached during normal operations, the system has failed.</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002244] dark:text-white font-serif tracking-tight leading-tight">
                  "If an auditor can reach a defect in your paperwork, the system has failed."
                </p>
              </div>
            </div>
            <div className="bg-[#002244] p-10 sm:p-16 md:p-20 rounded-[3rem] sm:rounded-[5rem] border-[6px] sm:border-[12px] border-[#C5A059] shadow-2xl relative overflow-hidden animate-reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 space-y-10 md:space-y-12">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 sm:pb-8">
                  <h4 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.3em] text-[#C5A059]">Architecture ID: LP-REACH-V4</h4>
                </div>
                <div className="space-y-8 sm:space-y-10">
                  <div className="flex items-start space-x-6 sm:space-x-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-2xl">
                      <Shield size={28} sm:size={32} />
                    </div>
                    <div>
                      <h5 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3 font-serif">Isolation of Hazards</h5>
                      <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed italic">We build engineering controls around your authority that prevent regulatory reach into operations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 sm:space-x-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-2xl">
                      <FileText size={28} sm:size={32} />
                    </div>
                    <div>
                      <h5 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 sm:mb-3 font-serif">Systematic Guarding</h5>
                      <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed italic">Paperwork is a guard. If the guard is missing, the business is exposed to terminal failure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCRIPTURE SECTION */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark relative">
        <div className="max-w-4xl mx-auto px-6 space-y-12 sm:space-y-20 text-center animate-reveal-up">
          <div className="space-y-6 md:space-y-10">
            <div className="inline-flex items-center space-x-3 sm:space-x-4 bg-[#002244]/5 dark:bg-white/5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full mb-2">
               <Anchor size={18} className="text-[#002244] dark:text-[#C5A059]" />
               <p className="text-[#002244] dark:text-slate-400 font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.5em]">Architectural Instruction</p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 max-w-sm mx-auto">
              This principle governs the design and operation of the LaunchPath standard.
            </p>
            <h2 className="text-3xl sm:text-6xl lg:text-8xl font-black font-serif italic text-[#002244] dark:text-white leading-[1.1] tracking-tighter">
              “By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.”
            </h2>
            <p className="text-base sm:text-lg font-black text-[#C5A059] uppercase tracking-[0.6em]">Proverbs 24:3–4</p>
          </div>
        </div>
      </section>

      {/* ORIENTATION PAUSE */}
      <div className="bg-slate-50 dark:bg-black/20 py-16 text-center border-y border-slate-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          Systemic stability relies on the continuity of established standards.
        </p>
      </div>

      {/* INSTITUTIONAL LEGACY SECTION */}
      <section className="py-16 md:py-32 lg:py-48 bg-[#002244] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-4 space-y-12 sm:space-y-16 animate-reveal-up">
              <div className="relative group mx-auto max-w-sm sm:max-w-none">
                <div className="bg-white/5 border-2 sm:border-4 border-[#C5A059]/30 rounded-3xl md:rounded-[5rem] overflow-hidden shadow-2xl aspect-[4/5] relative">
                  <img 
                    src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
                    alt="Institutional Portrait: Vince Lawrence" 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 object-top" 
                  />
                </div>
                <div className="absolute -bottom-4 sm:-bottom-10 -right-4 sm:-right-10 bg-[#C5A059] p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-[3rem] shadow-2xl border-4 sm:border-8 border-[#002244] group-hover:rotate-12 transition-all duration-500">
                  <Award size={32} className="text-[#002244] w-8 h-8 sm:w-16 md:h-16" />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <h4 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Credential Verification</h4>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    { icon: <Clock size={20} />, text: "25+ YEAR LEADERSHIP" },
                    { icon: <ShieldCheck size={20} />, text: "OSHA CERTIFIED SAFETY" },
                    { icon: <Gavel size={20} />, text: "FEDERAL COMPLIANCE" },
                    { icon: <Users size={20} />, text: "U.S. NAVY VETERAN" }
                  ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4 sm:space-x-6 p-5 sm:p-6 border border-white/10 rounded-2xl sm:rounded-[2rem] bg-white/5 transition-all">
                        <div className="text-[#C5A059] shrink-0">{item.icon}</div>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em]">{item.text}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-12 sm:space-y-16 animate-reveal-up text-center lg:text-left" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center space-x-3 md:space-x-4 bg-white/10 border border-white/20 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full backdrop-blur-xl">
                  <ShieldCheck size={18} className="text-[#C5A059]" />
                  <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em]">Founder Biography // REGISTRY: VL-25Y-CERT</span>
                </div>
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                  INSTITUTIONAL <br/><span className="text-[#C5A059] italic">LEGACY.</span>
                </h2>
              </div>

              <div className="space-y-10 sm:space-y-12 text-base sm:text-xl lg:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl">
                <div className="space-y-8">
                  <p>
                    I have seen hundreds of carriers fail for predictable reasons. These collapses are rarely caused by a lack of effort; they are caused by fragmented documentation and mismanaged risk.
                  </p>
                  <p>
                    My responsibility is to maintain the standard of what regulators expect and what insurers tolerate. I serve as a custodian of these institutional structures. LaunchPath is an engineered system designed to outlast any individual presence.
                  </p>
                  <p>
                    Sustainable operation requires the discipline to face your actual numbers and accept the constraints of governance. We install the systems before you chase revenue, ensuring authority rests on a foundation auditors cannot reach.
                  </p>
                </div>
              </div>

              <div className="pt-10 sm:pt-16">
                <Link to="/reach-test" className="bg-white text-[#002244] px-10 sm:px-16 py-5 sm:py-8 lg:py-10 rounded-2xl sm:rounded-[3rem] font-black uppercase tracking-[0.3em] text-[11px] sm:text-[14px] shadow-2xl hover:bg-[#C5A059] hover:text-[#002244] transition-all active:scale-95 inline-flex items-center group border-b-6 sm:border-b-[12px] border-slate-300">
                    Initiate Admission Protocol <ArrowRight size={24} className="ml-4 sm:ml-6 group-hover:translate-x-3 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#FAF9F6] dark:bg-[#020617] text-center border-t border-slate-200 dark:border-white/5">
         <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.6em] text-slate-400 italic px-6 leading-relaxed">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
      </section>
    </div>
  );
};

export default AboutPage;