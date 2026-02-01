import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield,
  Layers,
  ChevronRight,
  Briefcase,
  Calculator,
  Loader2,
  Mail,
  Send,
  CheckCircle2,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Lock,
  Zap,
  Activity,
  UserCheck,
  AlertCircle,
  ShieldAlert,
  Fingerprint,
  Anchor,
  XCircle,
  Quote,
  TrendingUp,
  FileText,
  Scale
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
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA Standard LP-2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif">
              PROTECT <br/>YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> <br/>WITH ORDER <br/>AND CERTAINTY.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                LaunchPath is a structured implementation standard and oversight process for new interstate motor carriers. It is not a DIY video course or a motivational program.
              </p>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                Carriers are admitted through a short application and interview to confirm operational fit, timing, and readiness for disciplined compliance execution during the New Entrant phase.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4">
              <Link to="/readiness" className="w-full sm:w-auto bg-authority-blue text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-2xl border-b-4 border-slate-900">
                Request Admission Interview
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
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">ADMISSION <br/>APPLICATION</h3>
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
                    Request Admission Interview
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-300 uppercase tracking-widest font-bold opacity-60">REGISTRY UPLINK ACTIVE</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE RISKS MANY NEW ENTRANTS UNDERESTIMATE */}
      <section className="py-24 md:py-32 lg:py-64 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <ShieldAlert size={16} className="text-logo-red" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">EXPOSURE ALERT</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              THE RISKS <br/>MANY <br/><span className="text-signal-gold italic">NEW <br/>ENTRANTS</span> <br/>UNDERESTIMATE.
            </h2>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-logo-red pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight">
                Most new carriers underestimate how early compliance decisions compound risk during the first 12–18 months of authority. Small documentation gaps, misaligned filings, or unverified assumptions often surface during audits—when correction windows are limited.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-10">
                LaunchPath exists to identify and address these exposure points before they become enforcement issues, insurance disruptions, or authority instability.
              </p>
              <Link to="/readiness" className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-signal-gold hover:text-white transition-all shadow-xl inline-flex items-center">
                Request Admission Interview
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
                    "DQ FILE INTEGRITY",
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

      {/* SECTION: THE 16 DEADLY SINS */}
      <section className="py-20 md:py-32 lg:py-56 bg-[#FAF9F6] dark:bg-primary-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-32 space-y-6 md:space-y-10">
            <div className="inline-flex items-center space-x-3 bg-logo-red px-6 py-2 md:px-8 md:py-3 rounded-full text-white shadow-xl">
              <ShieldAlert size={18} />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">REGISTRY WARNING: AUDIT FAILURE VECTORS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white leading-[1] md:leading-[0.95] tracking-tighter uppercase">
              THE 16 <br/><span className="text-logo-red italic underline decoration-authority-blue/5 underline-offset-[12px] md:underline-offset-[16px]">DEADLY SINS.</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-lg md:text-xl font-bold text-slate-500 uppercase leading-relaxed">
                The “16 Deadly Sins” represent the most common structural and documentation failures observed during FMCSA reviews, audits, and insurance evaluations. LaunchPath does not merely list these risks. The implementation standard is designed to help carriers systematically eliminate them through ordered setup, verified records, and disciplined operating controls.
              </p>
              <Link to="/about" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue hover:text-signal-gold transition-colors">
                Review Program Standard <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {/* Category Cards Logic */}
            {[
              { id: "01", name: "CHEMICAL DEPENDENCY", sins: ["LACK OF RANDOM DRUG PROGRAM", "POSITIVE DRIVER RESULTS", "CLEARINGHOUSE ERROR", "OMISSION OF SCREENING"] },
              { id: "02", name: "DRIVER ELIGIBILITY", sins: ["REVOKED LICENSE USE", "INVALID MEDICAL CERTS", "NO DQ FILE FRAMEWORK", "MISSING BACKGROUND INQUIRIES"] },
              { id: "03", name: "OPERATIONAL SAFETY", sins: ["EXCEEDING HOS LIMITS", "DISPATCHING OOS VEHICLES", "POOR DUTY STATUS RECORDS", "NO VEHICLE INSPECTIONS"] },
              { id: "04", name: "ADMIN INTEGRITY", sins: ["UNVERIFIED INSURANCE LEVELS", "MISSING FILINGS (BOC-3)", "NO MAINTENANCE PROGRAM", "LATE ACCIDENT REPORTING"] }
            ].map((cat) => (
              <div key={cat.id} className="space-y-8 md:space-y-12">
                <div className="flex items-center space-x-4 md:space-x-5 border-b-4 md:border-b-8 border-authority-blue dark:border-white/5 pb-4 md:pb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-authority-blue text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm">{cat.id}</div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-[0.25em]">{cat.name}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {cat.sins.map((sin, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-border-dark flex flex-col justify-between min-h-[160px] md:h-56 shadow-sm group hover:shadow-xl transition-all">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs md:text-sm font-black uppercase leading-tight max-w-[140px]">{sin}</h4>
                        <span className="text-3xl md:text-4xl font-black text-slate-50 dark:text-white/5">{i+1}</span>
                      </div>
                      <div className="space-y-1 mt-4">
                        <p className="text-[7px] md:text-[8px] font-black text-logo-red uppercase tracking-widest">CRITICAL</p>
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-40">VECTOR IDENTIFIED</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: PROOF */}
      <section className="py-24 md:py-48 bg-white border-t border-slate-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-10">
              <div className="p-10 md:p-14 bg-slate-50 rounded-[3.5rem] relative overflow-hidden">
                <Quote className="absolute top-10 right-10 text-authority-blue/5" size={100} />
                <div className="relative z-10 space-y-8">
                  <p className="text-xl md:text-2xl lg:text-3xl font-black font-serif italic text-authority-blue leading-relaxed">
                    “What stands out about this program is the structure. It mirrors how regulators and insurers actually evaluate risk—not how carriers hope they will.”
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="h-px w-10 bg-signal-gold"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Independent Safety & Compliance Advisor</p>
                  </div>
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-authority-blue/5 px-6 py-2.5 rounded-full border border-authority-blue/10">
                <Activity size={16} className="text-authority-blue" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">Institutional Case Snippet</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-authority-blue">Systemic <span className="text-signal-gold italic">Validation.</span></h3>
              <p className="text-lg text-slate-500 font-bold leading-relaxed">
                A small new-entrant fleet operating under new authority used the LaunchPath framework to organize records, filings, and operating procedures during its first year. 
              </p>
              <p className="text-base text-slate-400 font-medium leading-relaxed">
                When reviewed during the New Entrant Audit process, the carrier completed the review without critical violations and with documentation presented in an orderly, verifiable manner.
              </p>
           </div>
        </div>
      </section>

      {/* SECTION: THE FOUR PILLARS */}
      <section className="py-24 md:py-32 lg:py-56 bg-white dark:bg-primary-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 mb-4">
               “WORK BRINGS PROFIT, BUT MERE TALK LEADS TO POVERTY.” — PROVERBS 14:23
             </p>
             <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
               THE FOUR <span className="text-signal-gold italic">PILLARS.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
             {[
               {
                 icon: <Briefcase />,
                 title: "AUTHORITY PROTECTION",
                 tagline: "STRUCTURAL FORTRESS",
                 desc: "Move beyond basic filings. Establish a legal foundation designed to withstand federal scrutiny and separate personal assets from business liability.",
                 btn: "VIEW MODULE",
                 link: "/learning-path"
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "PREMIUM STABILITY",
                 desc: "Eliminate the “30-Day Trap.” Install the documentation and safety processes underwriters require to maintain coverage.",
                 btn: "VIEW MODULE",
                 link: "/learning-path"
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "16-EXPOSURE DEFENSE",
                 desc: "Replace guesswork with documented compliance. LaunchPath installs the framework so DQ files and logs meet FMCSA expectations.",
                 btn: "VIEW MODULE",
                 link: "/learning-path"
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "TCO SURVIVAL MATH",
                 desc: "Eliminate revenue blindness. Use the TCO framework to identify real break-even thresholds and profit margins.",
                 btn: "LAUNCH TOOL",
                 link: "/tools/tco-calculator"
               }
             ].map((pillar, i) => (
               <div key={i} className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[4rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-2 font-serif tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-signal-gold mb-6">{pillar.tagline}</p>
                  <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                  <Link to={pillar.link} className="bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-white py-4 px-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center hover:bg-authority-blue hover:text-white transition-all shadow-sm group/btn">
                    {pillar.btn} <ChevronRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION: REACH TEST */}
      <section className="py-20 md:py-32 lg:py-56 bg-[#FAF9F6] dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8 md:mb-12">READINESS CHECK PROTOCOL</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white mb-8 md:mb-12 uppercase tracking-tighter">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h2>
          <div className="max-w-2xl mx-auto mb-20">
            <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed mb-10">
              The REACH Test™ is a structured diagnostic used to identify compliance exposure across authority protection, insurance continuity, documentation readiness, and operational alignment. It is an orientation tool—not an implementation.
            </p>
            <Link to="/about" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue hover:text-signal-gold transition-colors">
                Review Program Standard <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { l: "OVER", t: "AUTHORITY VECTORS", d: "Identifying paperwork gaps that lead to automatic audit failure.", i: <MoveDown /> },
              { l: "AROUND", t: "INSURANCE LAPSES", d: "Spotting administrative shortcuts that trigger non-renewals.", i: <MoveRight /> },
              { l: "THROUGH", t: "SYSTEM GAPS", d: "Finding data conflicts that signal a loss of safety control.", i: <MoveLeft /> },
              { l: "UNDER", t: "FISCAL STABILITY", d: "Calculating break-even points to ensure authority survival.", i: <MoveUp /> }
            ].map((vector, i) => (
              <div key={i} className="flex items-center space-x-6 md:space-x-10 p-8 md:p-12 bg-white dark:bg-gray-800 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 dark:border-border-dark text-left group hover:shadow-2xl transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-700 rounded-xl md:rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-sm shrink-0">
                  {React.cloneElement(vector.i as React.ReactElement, { size: 24 })}
                </div>
                <div className="space-y-1 md:space-y-3">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-[0.5em]">{vector.l}</p>
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight">{vector.t}</h4>
                  <p className="text-xs md:text-sm font-bold text-slate-500 leading-relaxed">{vector.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: WHO THIS IS FOR / NOT FOR */}
      <section className="py-20 md:py-32 lg:py-56 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue uppercase leading-[1] tracking-tighter">
                WHO THIS <br/><span className="text-signal-gold italic">IS FOR.</span>
              </h2>
              <p className="text-xl md:text-2xl font-black text-slate-400 uppercase tracking-tight leading-tight max-w-xl">
                LaunchPath serves serious operators within the New Entrant window.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
               {[
                 { t: "Active Entrants", d: "New interstate motor carriers within 0–12 months of authority registration." },
                 { t: "Risk Conscious", d: "Owners concerned about FMCSA exposure and New Entrant Safety Audit readiness." },
                 { t: "Systems Focused", d: "Carriers willing to follow a defined operating standard rather than improvising compliance." }
               ].map((item, i) => (
                 <div key={i} className="flex space-x-6">
                   <div className="w-10 h-10 rounded-xl bg-authority-blue/5 text-authority-blue flex items-center justify-center shrink-0 border border-authority-blue/10"><CheckCircle2 size={20} /></div>
                   <div>
                     <h4 className="font-black uppercase tracking-widest text-sm mb-2">{item.t}</h4>
                     <p className="text-lg font-bold text-slate-500 leading-relaxed">{item.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-logo-red p-8 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 md:p-10 opacity-10 group-hover:scale-110 transition-transform">
               <ShieldAlert size={180} />
             </div>
             <div className="relative z-10 space-y-12">
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 mb-8"><XCircle size={32} /></div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight">WHO THIS IS <br/>NOT FOR.</h3>
               </div>
               
               <div className="space-y-10">
                  {[
                    { t: "The Hype Seekers", d: "Anyone chasing income claims, overnight success stories, or business hype." },
                    { t: "Shortcut Operators", d: "Carriers looking for 'shortcuts' instead of building durable systems." },
                    { t: "The Unstructured", d: "Operators unwilling to maintain basic records and consistent documentation discipline." }
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 shrink-0"></div>
                      <div>
                        <h4 className="font-black uppercase tracking-widest text-xs mb-2">{item.t}</h4>
                        <p className="text-base font-black italic opacity-80 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="h-px bg-white/20 w-full"></div>
               <p className="text-[9px] text-center font-black uppercase tracking-[0.4em] opacity-50">LAUNCHPATH EXCLUSION POLICY V4.5</p>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION: ADMISSION & IMPLEMENTATION */}
      <section className="py-24 md:py-48 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-6">
             <h2 className="text-3xl sm:text-5xl font-black font-serif text-authority-blue uppercase tracking-tight">System <br/><span className="text-signal-gold italic">Admission</span></h2>
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400">Readiness & Implementation Sequencing</p>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4.5rem] shadow-sm border border-slate-100 text-left relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5"><Activity size={100} className="text-authority-blue" /></div>
             <div className="space-y-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-black font-serif uppercase text-authority-blue">Admission Protocol</h3>
                <p className="text-lg font-bold text-slate-500 leading-relaxed max-w-2xl">
                  Admission is based on readiness and fit. Entrance into the LaunchPath implementation environment is determined through a formal review of operational readiness and disciplined compliance potential.
                </p>
                <div className="h-px w-full bg-slate-100"></div>
                <p className="text-sm font-medium text-slate-400 italic">
                  Implementation details and structural requirements are reviewed during the admission process. Accepted carriers receive full program details following the initial verification sequence.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-6">
                  <Link to="/readiness" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center hover:bg-steel-blue transition-all shadow-xl">Request Admission Interview</Link>
                  <Link to="/about" className="bg-white border-2 border-slate-100 text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center hover:bg-slate-50 transition-all">Review Program Standard</Link>
                </div>
             </div>
          </div>

          <div className="p-10 border-2 border-dashed border-slate-200 rounded-[3rem] max-w-2xl mx-auto">
             <p className="text-sm font-bold text-slate-400 leading-relaxed italic">
               "LaunchPath is not ongoing coaching, financial advising, or a promise of specific outcomes—it is a disciplined implementation standard for serious operators."
             </p>
          </div>
        </div>
      </section>

      {/* SECTION: INSTITUTIONAL CLARIFICATIONS */}
      <section className="py-24 md:py-48 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full">
            <Scale size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Stewardship Boundaries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-authority-blue uppercase tracking-tight">Institutional <br/><span className="text-signal-gold italic">Clarifications.</span></h2>
          <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed max-w-2xl mx-auto">
            LaunchPath is designed to provide clarity, structure, and disciplined execution—not legal representation or regulatory guarantees.
          </p>
          <div className="bg-slate-50 p-10 md:p-14 rounded-[4rem] text-left space-y-8">
            <p className="text-base text-slate-500 font-medium leading-relaxed italic">
              "Participation does not replace carrier responsibility for ongoing compliance, record maintenance, or operational decision-making. Admission is based on readiness and fit, not urgency or sales pressure."
            </p>
            <div className="h-px bg-slate-200 w-full"></div>
            <Link to="/about" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue hover:text-signal-gold transition-colors">
                Review Program Standard <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 md:py-48 lg:py-64 bg-authority-blue text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 space-y-12 md:space-y-16 relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif leading-[1] md:leading-[0.85] tracking-tighter uppercase">
            BUILD YOUR <br/><span className="text-signal-gold italic underline decoration-white/10 underline-offset-[16px] md:underline-offset-[24px]">CARRIER</span> <br/>ON SYSTEMS.
          </h2>
          <p className="text-lg md:text-2xl font-black text-white/50 uppercase tracking-[0.4em] md:tracking-[0.5em]">
            ADMISSION IS LIMITED TO DISCIPLINED OPERATORS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
             <Link to="/readiness" className="bg-white text-authority-blue px-10 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 inline-flex items-center border-b-8 border-slate-200 group">
               Request Admission Interview
               <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link to="/about" className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors">
                Review Program Standard
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;