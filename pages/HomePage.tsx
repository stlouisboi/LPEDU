
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield,
  Layers,
  ChevronRight,
  Briefcase,
  Calculator,
  Loader2,
  CheckCircle2,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Lock,
  Zap,
  Activity,
  ShieldAlert,
  Fingerprint,
  XCircle,
  Quote,
  Scale,
  Anchor,
  ShieldCheck,
  Map as MapIcon
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const destination = `/readiness?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      if (db) {
        await addDoc(collection(db, "admissionInquiries"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-admission-hero"
        });
      }
      navigate(destination);
    } catch (err) {
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-[#FAF9F6] dark:bg-primary-dark font-sans text-authority-blue leading-relaxed selection:bg-signal-gold/20">
      
      {/* SECTION 1: INSTITUTIONAL HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA (Federal Safety) Standard</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif">
              PROTECT <br/>YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> <br/>WITH ORDER <br/>AND CERTAINTY.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                LaunchPath is a structured setup standard for new motor carriers. We verify your business readiness (stewardship) before you begin hauling.
              </p>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                This is not a general coaching program. It is a systematic system for documentation integrity and safety management.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4">
              <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-2xl border-b-4 border-slate-900">
                Take the REACH Test™
              </Link>
              <Link to="/about" className="w-full sm:w-auto bg-transparent border-2 border-authority-blue/20 dark:border-white/20 text-authority-blue dark:text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em]">
                Review Program Standard
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(30,58,95,0.15)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <ShieldAlert size={180} />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                   <div>
                     <h3 className="text-xs md:text-sm font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.4em] mb-1 md:mb-2">FORMAL</h3>
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">ADMISSION <br/>INQUIRY</h3>
                   </div>
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-300">
                     <Lock size={14} />
                   </div>
                </div>
                
                <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 md:mb-10 pb-4 border-b border-slate-50">REGISTRY INTAKE TERMINAL</p>
                
                <form onSubmit={handleLeadSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">LEGAL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm" 
                      placeholder="Operator Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">REGISTRY EMAIL</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm" 
                      placeholder="registry@carrier.com" 
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-authority-blue text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] md:text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" /> : <ChevronRight className="mr-3" size={18} />}
                    Request Admission Protocol
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-300 uppercase tracking-widest font-bold opacity-60">REGISTRY UPLINK ACTIVE</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE REALITY OF RISK */}
      <section className="py-24 md:py-32 lg:py-64 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <ShieldAlert size={16} className="text-signal-gold" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">STRUCTURAL RISK EXPOSURE</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              FAILURE IS <br/>A <span className="text-signal-gold italic">SETUP</span> <br/>PROBLEM.
            </h2>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight">
                Most carrier failures happen because systems are not set up correctly. Small mistakes in your paperwork today create major risks during your first 18 months.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-10">
                A single documentation gap today creates a risk that insurance companies and federal auditors will eventually find. LaunchPath provides the safety of verified systems.
              </p>
              <Link to="/reach-test" className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-signal-gold hover:text-white transition-all shadow-xl inline-flex items-center">
                Identify Your Exposure Vectors
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full">
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-20 scale-150 pointer-events-none">
               <Fingerprint size={400} strokeWidth={0.5} />
            </div>
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative z-10 text-authority-blue w-full">
               <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight mb-1 md:mb-2">IDENTIFICATION & ALIGNMENT</h3>
               <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-10">REGISTRY STANDARD LP-01</p>
               <div className="space-y-4 md:space-y-5">
                  {[
                    "DQ (DRIVER QUALIFICATION) FILE INTEGRITY",
                    "ENFORCEMENT RESPONSE",
                    "INSURANCE CONTINUITY",
                    "MAINTENANCE GOVERNANCE"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 group">
                       <div className="flex items-center space-x-4 md:space-x-5">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-slate-200 flex items-center justify-center group-hover:border-signal-gold transition-colors">
                            <CheckCircle2 size={10} className="text-signal-gold" />
                          </div>
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{item}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY LAUNCHPATH EXISTS */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-32 space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">FOUNDATIONAL PURPOSE</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase">
              WHY <span className="text-signal-gold italic">LAUNCHPATH</span> EXISTS.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-tight">
                  Most new motor carriers don’t fail because they lack effort. <br/>
                  <span className="text-signal-gold italic">They fail because they enter the industry structurally exposed.</span>
                </h3>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  LaunchPath exists to identify and correct those exposures before they lead to authority shutdowns, insurance lapses, audit failures, or financial strain.
                </p>
              </div>
              
              <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  New carriers are often encouraged to move fast without full system readiness. They receive fragmented advice and incomplete guidance, and are told to address compliance after they begin operating.
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  This leads to preventable shutdowns — not because operators are careless, but because they were never given a clear, disciplined pathway.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border border-slate-100 dark:border-border-dark shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                 <ShieldCheck size={20} className="text-signal-gold" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">THE OPERATING STANDARD</h4>
              </div>
              
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
                LaunchPath is not a course and not a shortcut. It is a compliance-first operating standard designed to:
              </p>

              <ul className="space-y-8 mb-12">
                {[
                  { t: "Surface Hidden Risk", d: "Identifying gaps before they become federal violations." },
                  { t: "Authority-Safe Systems", d: "Establishing a compliance-first foundation from the beginning." },
                  { t: "Structured Implementation", d: "Guiding operators through verified federal requirements." },
                  { t: "Reduced Reactive Stress", d: "Replacing panic with systematic operational order." }
                ].map((item, i) => (
                  <li key={i} className="flex space-x-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-signal-gold shrink-0 mt-2" />
                    <div className="space-y-1">
                      <h5 className="font-black uppercase tracking-tight text-sm text-authority-blue dark:text-white">{item.t}</h5>
                      <p className="text-xs font-bold text-slate-400 leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-white/5 mb-10">
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">The goal is not speed. The goal is continuity.</p>
              </div>
              
              <div className="pt-10 border-t border-slate-200 dark:border-white/10 space-y-4">
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">BUILT FOR OPERATORS WHO VALUE:</p>
                 <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {["Long-term operation over fast entry", "Structure over hustle", "Clarity over noise", "Stewardship over shortcuts"].map((v, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-tight text-authority-blue dark:text-white">// {v}</span>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-32 text-center pt-16 border-t border-slate-50 dark:border-white/5">
             <p className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white max-w-3xl mx-auto leading-tight">
               LaunchPath is designed to help you <span className="text-signal-gold italic">stay operating</span> — not just get started.
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 3.5: YOUR FIRST 90 DAYS, MAPPED */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-8 animate-reveal-up">
              <div className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full shadow-sm">
                <MapIcon size={16} className="text-authority-blue dark:text-signal-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">ORIENTATION INSTRUMENT LP-MAP-01</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
                YOUR FIRST <br/><span className="text-signal-gold italic">90 DAYS,</span> <br/>MAPPED.
              </h2>
              
              <div className="space-y-6">
                <p className="text-xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                  The first 90 days under authority are where most preventable shutdowns occur. 
                </p>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl italic">
                  The 90-Day Risk Map helps you identify where risk concentrates early, so you are not learning through enforcement actions, insurance lapses, or financial surprises.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-surface-dark border-l-8 border-signal-gold rounded-r-[2.5rem] shadow-sm">
                 <p className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-3">Operating Boundary</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                   This map is not a plan. It is a diagnostic orientation. Results identify exposure areas only — not corrective actions. Implementation begins after Admission & Verification.
                 </p>
              </div>

              <div className="pt-6">
                <Link to="/reach-test" className="inline-flex items-center justify-center bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 border-b-4 border-slate-900 group">
                  <span>Generate Risk Map Diagnostic</span>
                  <ArrowRight size={16} className="ml-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border border-slate-200 dark:border-border-dark shadow-[0_50px_100px_-30px_rgba(30,58,95,0.1)] relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:24px:24px]"></div>
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                   {/* Abstract Diagnostic Visualization */}
                   <div className="absolute inset-0 border-2 border-slate-100 dark:border-white/5 rounded-full animate-pulse"></div>
                   <div className="absolute inset-8 border-2 border-slate-50 dark:border-white/5 rounded-full animate-pulse [animation-delay:0.5s]"></div>
                   <div className="absolute inset-16 border-2 border-slate-50 dark:border-white/5 rounded-full animate-pulse [animation-delay:1s]"></div>
                   
                   <div className="relative z-10 text-center space-y-4">
                      <div className="w-24 h-24 bg-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border border-signal-gold/30 mb-6">
                        <Activity size={40} className="text-signal-gold" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-600">Terminal Pulse: ACTIVE</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold">Mapping Structural Fail-Points</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: THE FOUR PILLARS (STRUCTURAL LOGIC) */}
      <section className="py-24 md:py-32 lg:py-56 bg-white dark:bg-primary-dark transition-colors">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6">
             <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
               THE FOUR <span className="text-signal-gold italic">PILLARS.</span>
             </h2>
             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Institutional Structural Logic</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
             {[
               {
                 icon: <Briefcase />,
                 title: "AUTHORITY PROTECTION",
                 tagline: "STRUCTURAL FORTRESS",
                 desc: "Move beyond basic filings. Build a business foundation that can withstand federal audits."
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "PREMIUM STABILITY",
                 desc: "Avoid the renewal trap. Set up the safety files that insurance companies need to keep you covered."
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "SAFETY DEFENSE",
                 desc: "Replace guesswork with documented proof. Manage DQ files and logs to federal (49 CFR) standards."
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "TCO SURVIVAL MATH",
                 desc: "Stop guessing your profit. Use the TCO (Total Cost of Operating) system to find your real break-even point."
               }
             ].map((pillar, i) => (
               <div key={i} className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-2 font-serif tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-signal-gold mb-6">{pillar.tagline}</p>
                  <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE REACH TEST™ (TECHNICAL DIAGNOSTIC) */}
      <section className="py-20 md:py-32 lg:py-56 bg-white dark:bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none">
          <Activity size={400} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8 md:mb-12">TECHNICAL READINESS ASSESSMENT</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white mb-8 md:mb-12 uppercase tracking-tighter">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h2>
          <div className="max-w-2xl mx-auto mb-20">
            <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed mb-10">
              The REACH Test™ is a diagnostic tool used to find where your business is at risk. It is the first step of our Education phase.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl mb-12">
               <ShieldAlert size={16} className="text-amber-600 mr-3" />
               <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-widest">DIAGNOSTIC ASSESSMENT ONLY — NOT AN IMPLEMENTATION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {[
              { l: "OVER", t: "AUTHORITY VECTORS", d: "Spotting the missing paperwork that causes carriers to fail audits instantly.", i: <MoveDown /> },
              { l: "AROUND", t: "INSURANCE LAPSES", d: "Finding the small mistakes that cause insurance companies to drop you.", i: <MoveRight /> },
              { l: "THROUGH", t: "SYSTEM GAPS", d: "Finding data errors that show a lack of control over your safety.", i: <MoveLeft /> },
              { l: "UNDER", t: "FISCAL STABILITY", d: "Calculating your break-even point to make sure your business survives.", i: <MoveUp /> }
            ].map((vector, i) => (
              <div key={i} className="flex flex-col items-center p-10 md:p-12 bg-slate-50 dark:bg-gray-800 rounded-[3.5rem] border border-slate-100 dark:border-border-dark text-center group hover:shadow-2xl transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-sm shrink-0 mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(vector.i as React.ReactElement, { size: 24 })}
                </div>
                <div className="space-y-3">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-[0.5em]">{vector.l}</p>
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight">{vector.t}</h4>
                  <p className="text-xs md:text-sm font-bold text-slate-500 leading-relaxed">{vector.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Link to="/reach-test" className="bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-8 border-slate-900 inline-flex items-center group">
              Initiate REACH Assessment <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: STEWARDSHIP & ALIGNMENT */}
      <section className="py-24 md:py-48 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-xl border border-white/20">
            <Anchor className="text-signal-gold" size={40} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight leading-none">
            PURPOSE-DRIVEN <br/><span className="text-signal-gold italic">STEWARDSHIP.</span>
          </h2>
          <div className="p-10 md:p-14 bg-white/5 border border-white/10 rounded-[3.5rem] backdrop-blur-md">
            <Quote className="text-signal-gold opacity-40 mb-6 mx-auto" size={40} />
            <p className="text-2xl md:text-3xl font-black font-serif italic text-white leading-relaxed mb-8">
              True profit is the result of hard work and the responsible management of what you have been given.
            </p>
          </div>
          <p className="text-lg md:text-xl font-bold text-white/60 leading-relaxed max-w-2xl mx-auto">
            Your business is a responsibility to your family and your future. We build the systems that protect both.
          </p>
        </div>
      </section>

      {/* SECTION 7: ADMISSION PROTOCOL (THE CLOSE) */}
      <section className="py-24 md:py-48 lg:py-64 bg-white dark:bg-primary-dark text-center border-t border-slate-50 dark:border-border-dark">
        <div className="max-w-[1400px] mx-auto px-6 space-y-12 md:space-y-16">
          <div className="space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">REGISTRY FINALIZATION</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              BUILD YOUR <br/><span className="text-signal-gold italic underline decoration-authority-blue/5 dark:decoration-white/5 underline-offset-[24px]">CARRIER</span> <br/>ON SYSTEMS.
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto p-10 bg-slate-50 dark:bg-gray-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
             <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">
               "Admission to LaunchPath is a separate phase. You are admitted only after we review if your business is ready and aligned with our standards."
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
             <Link to="/readiness" className="bg-authority-blue text-white px-10 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center border-b-8 border-slate-900 group">
               Request Admission Protocol
               <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link to="/about" className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-authority-blue transition-colors">
                Review Program Standard
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
