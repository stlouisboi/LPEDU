import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Anchor, 
  Clock, 
  Users, 
  Scale,
  Briefcase,
  Shield,
  Gavel,
  XCircle,
  CheckCircle2,
  Lock,
  Terminal,
  Zap,
  Activity,
  Maximize2,
  Eye,
  ShieldX,
  Target
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
  }, []);

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 transition-colors selection:bg-authority-blue/10">
      
      {/* 1. HERO SECTION: 60/40 SPLIT-SCREEN */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-12">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Safety Architect Origin</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#C5A059]/60">Built on wisdom. Established with understanding. Designed for endurance.</p>
            </div>

            <div className="space-y-8 text-lg md:text-xl text-white/80 font-medium leading-relaxed">
              <p>
                I spent 25 years in manufacturing leadership—serving as a supervisor, team leader, and business unit manager—and 5 years as a certified OSHA safety coordinator. Before that, I served 7 years in the U.S. Navy.
              </p>
              <p>
                In those environments, <span className="text-white font-black">systems weren't just paperwork; they were the difference between a productive shift and a catastrophic failure.</span>
              </p>
              <p>
                When I transitioned into the motor carrier space, I saw my own company drivers trying to make the leap to owner-operator. These were good men who lost their authority in 90 days. Not because they couldn't drive, but because the industry sold them "hustle" while the FMCSA demanded <span className="text-[#C5A059] font-black">compliance infrastructure.</span>
              </p>
            </div>

            <div className="pt-8">
              <Link to="/readiness" className="inline-flex items-center space-x-4 bg-[#C5A059] text-[#002244] px-10 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-8 border-[#8e7340]">
                <span>Initialize Diagnosis Sequence</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-100 dark:bg-slate-900 relative">
          <img 
            src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
            alt="Vince Lawrence" 
            className="w-full h-full object-cover grayscale opacity-95 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2">System Custodian</p>
            <p className="text-2xl font-black text-white uppercase tracking-tight font-serif">Vince Lawrence</p>
          </div>
        </div>
      </section>

      {/* 2. INSERTION: WHAT WE ARE NOT (3 CARDS DARK NAVY) */}
      <section className="py-24 md:py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE BOUNDARIES</p>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">WHAT WE ARE <span className="text-red-600 italic">NOT.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="text-red-500" />, 
                title: "NOT A LOAD BOARD", 
                desc: "We do not find freight or book loads. We install the infrastructure required to stay compliant so you can keep hauling the freight you find." 
              },
              { 
                icon: <Users className="text-red-500" />, 
                title: "NOT A GURU HUSTLE", 
                desc: "We don't sell '10 trucks in 10 months' fantasies. We provide technical instruction for carriers who value clinical accuracy over administrative hype." 
              },
              { 
                icon: <ShieldX className="text-red-500" />, 
                title: "NOT A DISPATCH SERVICE", 
                desc: "We are educators and architects. We provide the blueprint for autonomous carrier operation, not the temporary crutch of outsourced management." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#0c1a2d] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-8 group hover:border-[#C5A059]/30 transition-all duration-500">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black font-serif text-white uppercase tracking-wide leading-tight">{card.title}</h3>
                <p className="text-white/60 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE REACH TEST: HIGH-CONTRAST PRINCIPLE BLOCK */}
      <section className="py-24 md:py-40 bg-[#fafaf9] dark:bg-surface-dark border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 text-[#002244] dark:text-[#C5A059]">
                  <Scale size={20} />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">The Safety Architect Principle</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase leading-[0.9] tracking-tighter">
                  THE <span className="text-[#C5A059] italic">REACH</span> TEST.
                </h2>
              </div>
              
              <div className="space-y-8 text-xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                <p>
                  In my years as an OSHA safety coordinator, we used a principle called the <span className="text-[#002244] dark:text-white underline decoration-[#C5A059] underline-offset-4">"Reach Test."</span> It was a clinical assessment: Could a hazard be reached during normal operations? If a hand could reach a blade, the system was a failure.
                </p>
                <p>
                  I apply that same industrial rigor to motor carrier authority. Most operators drive carefully, but they fail the Reach Test of compliance. They leave hazards within reach of federal auditors.
                </p>
                
                <div className="p-10 bg-[#002244] text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <p className="text-2xl md:text-3xl font-black italic font-serif leading-tight relative z-10 group-hover:scale-[1.02] transition-transform duration-500">
                    "You will not fail because I hid the exposure from you to make the marketing easier."
                  </p>
                </div>
              </div>
            </div>

            {/* Industrial Safety Guard Diagram Block */}
            <div className="bg-[#0c1a2d] p-12 rounded-[4rem] border-4 border-[#C5A059] shadow-[0_40px_100px_-20px_rgba(198,146,42,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Shield size={200} className="text-[#C5A059]" />
              </div>
              <div className="relative z-10 space-y-12">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C5A059]">Hazard Isolation Map</h4>
                  <p className="text-[9px] font-black text-white/40 uppercase font-mono">ID: LP-GUARD-V4</p>
                </div>
                
                <div className="space-y-10">
                  {[
                    { label: "EXTERNAL AUDITOR", icon: <Eye size={18} />, color: "text-red-500" },
                    { label: "EXPOSURE VECTOR", icon: <Zap size={18} />, color: "text-red-500" },
                    { label: "INSTITUTIONAL GUARD", icon: <ShieldCheck size={18} />, color: "text-[#C5A059]" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-6 group">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-all`}>
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Entity Protocol</p>
                        <h5 className="text-sm font-black text-white uppercase tracking-widest">{item.label}</h5>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-4 mb-4">
                    <Activity size={16} className="text-[#C5A059]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">System Integrity Log</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-[#C5A059] shadow-[0_0_10px_#C5A059]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURAL INSTRUCTION: PROVERBS 24 */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 space-y-16 text-center">
          <div className="space-y-8">
            <p className="text-slate-500 font-bold text-lg uppercase tracking-widest">Architectural Instruction</p>
            <h2 className="text-3xl md:text-5xl font-black font-serif italic text-authority-blue dark:text-white leading-tight">
              “By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.”
            </h2>
            <p className="text-sm font-black text-[#C5A059] uppercase tracking-[0.4em]">Proverbs 24:3–4</p>
          </div>
          
          <div className="space-y-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            <p>
              LaunchPath exists because I refuse to reverse this order. This is not motivational copy. This is <span className="text-authority-blue dark:text-white font-black underline decoration-[#C5A059] underline-offset-4 decoration-4">architectural instruction</span>: Wisdom and understanding before the rooms are filled with riches.
            </p>
            <p>
              You'll understand what FMCSA considers a "serious violation" before your first load. You'll build the compliance backbone that survives the 16 failure points.
            </p>
            <p className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight pt-10">
              Not as an alternative approach. <br/>
              <span className="text-[#C5A059]">As the institutional standard.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. A KINGDOM STEWARDSHIP PHILOSOPHY */}
      <section className="py-24 md:py-40 bg-slate-50 dark:bg-surface-dark transition-colors border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-[#C5A059]">
                  <Anchor size={20} />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">Stewardship Ethic</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase leading-[0.9] tracking-tighter">
                  KINGDOM <br/><span className="text-[#C5A059] italic">STEWARDSHIP</span> <br/>PHILOSOPHY.
                </h2>
              </div>
              <div className="space-y-8">
                <p className="text-2xl font-black font-serif text-authority-blue dark:text-white italic leading-tight">
                  “A good person produces good things from the treasury of a good heart…” <br/>— Luke 6:45
                </p>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-0">
                  What a business produces over time reflects what was deposited at the beginning. LaunchPath exists to help operators make the right deposits early.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { title: "ENTRUSTED ASSETS", desc: "We view operating authority as an entrusted function to be managed with integrity." },
                { title: "SYSTEMIC ORDER", desc: "Stability is an absolute prerequisite to commercial fleet growth." },
                { title: "RADICAL TRUTH", desc: "We prioritize technical accuracy over speculative revenue promises." },
                { title: "DISCIPLINED RESTRAINT", desc: "Clarity before commitment. Compliance before acceleration." }
              ].map((item, i) => (
                <div key={i} className="space-y-6 p-10 bg-white dark:bg-primary-dark rounded-[3rem] border border-slate-100 dark:border-border-dark group hover:shadow-xl transition-all">
                  <h4 className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-[#C5A059]">{item.title}</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed uppercase tracking-tighter mb-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER VERIFICATION BIO */}
      <section className="py-24 md:py-48 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 space-y-12">
               <div className="relative group">
                 <div className="bg-white/5 border-4 border-white/10 rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5]">
                   <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 object-top" 
                   />
                 </div>
                 <div className="absolute -bottom-6 -right-6 bg-[#C5A059] p-6 rounded-3xl shadow-xl border-4 border-[#020617] group-hover:rotate-12 transition-transform">
                   <Award size={40} className="text-[#002244]" />
                 </div>
               </div>
               <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Core Credentials</h4>
                 {[
                   { icon: <Clock size={16} />, text: "25+ YEAR TENURE" },
                   { icon: <ShieldCheck size={16} />, text: "OSHA CERTIFIED" },
                   { icon: <Gavel size={16} />, text: "FED COMPLIANCE EXPERT" },
                   { icon: <Users size={16} />, text: "U.S. NAVY VETERAN" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 p-5 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                       <div className="text-[#C5A059]">{item.icon}</div>
                       <span className="text-[11px] font-black uppercase tracking-[0.25em]">{item.text}</span>
                    </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-6 py-2.5 rounded-full">
                  <ShieldCheck size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Biography // VL-25Y-CERT</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-serif uppercase tracking-tighter leading-none">
                  FOUNDER <br/><span className="text-[#C5A059] italic">VERIFICATION.</span>
                </h2>
              </div>

              <div className="space-y-10 text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-[700px]">
                <p>
                  Vince Lawrence is the Founder of LaunchPath and a recognized authority in industrial safety and operational governance. His background in managing large-scale federal safety standards ensures that the LaunchPath system provides carriers with the same precision required by industrial manufacturing auditors.
                </p>
                <p>
                  As an OSHA-certified safety coordinator, Lawrence applies a rigorous, veteran-led stewardship to the logistics industry. Lawrence is dedicated to establishing an institutional standard for the next generation of owner-operators—prioritizing technical accuracy over administrative speculation.
                </p>
              </div>

              <div className="pt-12">
                 <Link to="/readiness" className="bg-white text-authority-blue px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl hover:bg-[#C5A059] transition-all active:scale-95 inline-flex items-center group border-b-8 border-slate-300">
                    Request Admission Interview <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SYSTEMATIC PROTECTION: THE STANDARDS (FINAL PROOF) */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <p className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-400">THE STANDARD</p>
            <h2 className="text-6xl md:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
              SYSTEMATIC <br/><span className="text-[#C5A059] italic">PROTECTION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-[1000px] mx-auto">
            {/* The Reactive Trap */}
            <div className="bg-slate-50 dark:bg-surface-dark p-12 md:p-16 rounded-[4rem] border-t-[12px] border-red-500 shadow-xl relative flex flex-col group">
              <div className="absolute top-10 right-10 opacity-10">
                <XCircle size={64} className="text-red-500" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-8">THE "WINGING IT" TRAP</p>
              <h3 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-12">THE <br/><span className="text-red-600">REACTIVE</span> <br/>TRAP.</h3>
              <ul className="space-y-8 flex-grow">
                {[
                  { l: "Reactive Filing", r: "Violations" },
                  { l: "Audit Scrambling", r: "Deactivation" },
                  { l: "Messy Records", r: "Volatility" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center">
                      <XCircle size={18} className="text-red-500 mr-4" />
                      <span>{item.l}</span>
                    </div>
                    <ArrowRight size={14} className="mx-4 opacity-30" />
                    <span className="text-slate-800 dark:text-slate-200">{item.r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Proactive Standard */}
            <div className="bg-[#002244] p-12 md:p-16 rounded-[4rem] border-t-[12px] border-[#C5A059] shadow-2xl relative flex flex-col group overflow-hidden text-white">
              <div className="absolute top-10 right-10 opacity-20">
                <CheckCircle2 size={64} className="text-[#C5A059]" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#C5A059] mb-8">THE SYSTEM OF ORDER</p>
              <h3 className="text-4xl font-black font-serif uppercase tracking-tight mb-12">THE <br/><span className="text-[#C5A059]">PROACTIVE</span> <br/>STANDARD.</h3>
              <ul className="space-y-8 flex-grow">
                {[
                  { l: "Pre-Launch Installation", r: "System Control" },
                  { l: "Audit-Ready Posture", r: "Operational Certainty" },
                  { l: "Clinical Transparency", r: "Insurance Continuity" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-white/40">
                    <div className="flex items-center">
                      <CheckCircle2 size={18} className="text-[#C5A059] mr-4" />
                      <span>{item.l}</span>
                    </div>
                    <ArrowRight size={14} className="mx-4 opacity-30" />
                    <span className="text-white">{item.r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ANCHOR */}
      <section className="py-24 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-white/5">
         <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-300 italic">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
      </section>
    </div>
  );
};

export default AboutPage;