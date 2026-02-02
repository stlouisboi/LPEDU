
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
  Anchor
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
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA Standard LP-2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif">
              PROTECT <br/>YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> <br/>WITH ORDER <br/>AND CERTAINTY.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                LaunchPath is a structured implementation standard and oversight process for new interstate motor carriers. We provide the technical architecture required for federal audit survival.
              </p>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                This is not a DIY video course or a motivational program. It is a systematic framework for documentation integrity and safety management systems.
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
              FAILURE IS <br/>A <span className="text-signal-gold italic">STRUCTURAL</span> <br/>MISALIGNMENT.
            </h2>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight">
                Most carrier failures aren't personal; they are systemic. Early compliance decisions compound risk over the first 12–18 months of authority registration.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-10">
                A single documentation gap or misaligned filing today creates a failure vector that underwriters and federal auditors will eventually identify. LaunchPath eliminates these vectors before they become terminal.
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

      {/* SECTION 3: THE GREAT FILTER (IS / IS NOT) */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-32 space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">FILTRATION PROTOCOL</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase">
              THE GREAT <span className="text-signal-gold italic">FILTER.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
            {/* IS SECTION */}
            <div className="space-y-12">
              <div className="flex items-center space-x-6 border-b-8 border-authority-blue dark:border-signal-gold/20 pb-8">
                <div className="w-12 h-12 bg-authority-blue text-white rounded-2xl flex items-center justify-center font-black">IS</div>
                <h3 className="text-2xl font-black uppercase tracking-widest">LaunchPath Standard</h3>
              </div>
              <ul className="space-y-8">
                {[
                  { t: "Compliance-First Implementation", d: "Documentation and safety systems established before commercial momentum." },
                  { t: "Systems-Driven Oversight", d: "Engineering controls that replace human memory with verifiable records." },
                  { t: "Decision-Support Architecture", d: "Technical logic for load selection, insurance renewal, and scaling." }
                ].map((item, i) => (
                  <li key={i} className="flex space-x-6">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} />
                    <div className="space-y-1">
                      <h4 className="font-black uppercase tracking-tight text-lg">{item.t}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOT SECTION */}
            <div className="space-y-12">
              <div className="flex items-center space-x-6 border-b-8 border-logo-red pb-8">
                <div className="w-12 h-12 bg-logo-red text-white rounded-2xl flex items-center justify-center font-black">NOT</div>
                <h3 className="text-2xl font-black uppercase tracking-widest">General Market Hype</h3>
              </div>
              <ul className="space-y-8 opacity-60">
                {[
                  { t: "Get-Rich-Quick Claims", d: "We do not discuss 'six-figure' income or passive revenue fantasies." },
                  { t: "Dispatch & Lane Shortcuts", d: "We focus on administrative refuge, not load board manipulation." },
                  { t: "Motivational Content", d: "LaunchPath is a technical implementation, not a support group." }
                ].map((item, i) => (
                  <li key={i} className="flex space-x-6">
                    <XCircle className="text-logo-red shrink-0 mt-1" size={24} />
                    <div className="space-y-1">
                      <h4 className="font-black uppercase tracking-tight text-lg">{item.t}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE FOUR PILLARS (STRUCTURAL LOGIC) */}
      <section className="py-24 md:py-32 lg:py-56 bg-slate-50 dark:bg-primary-dark transition-colors">
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
                 desc: "Move beyond basic filings. Establish a legal and administrative foundation designed to withstand federal scrutiny."
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "PREMIUM STABILITY",
                 desc: "Eliminate the renewal trap. Install the documentation and safety processes underwriters require to maintain coverage."
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "16-EXPOSURE DEFENSE",
                 desc: "Replace guesswork with documented compliance. Implementation of DQ files and logs that meet 49 CFR standards."
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "TCO SURVIVAL MATH",
                 desc: "Eliminate revenue blindness. Use the TCO framework to identify real break-even thresholds and profit margins."
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
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8 md:mb-12">TECHNICAL ORIENTATION PROTOCOL</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white mb-8 md:mb-12 uppercase tracking-tighter">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h2>
          <div className="max-w-2xl mx-auto mb-20">
            <p className="text-lg md:text-xl font-bold text-slate-500 leading-relaxed mb-10">
              The REACH Test™ is a structured diagnostic tool used to identify compliance exposure across authority, insurance, systems, and fiscal stability.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl mb-12">
               <ShieldAlert size={16} className="text-amber-600 mr-3" />
               <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-widest">ORIENTATION TOOL — NOT AN IMPLEMENTATION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {[
              { l: "OVER", t: "AUTHORITY VECTORS", d: "Identifying paperwork gaps that lead to automatic audit failure.", i: <MoveDown /> },
              { l: "AROUND", t: "INSURANCE LAPSES", d: "Spotting administrative shortcuts that trigger non-renewals.", i: <MoveRight /> },
              { l: "THROUGH", t: "SYSTEM GAPS", d: "Finding data conflicts that signal a loss of safety control.", i: <MoveLeft /> },
              { l: "UNDER", t: "FISCAL STABILITY", d: "Calculating break-even points to ensure authority survival.", i: <MoveUp /> }
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
              Initiate REACH Diagnostic <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
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
              “Work brings profit, but mere talk leads only to poverty.”
            </p>
            <p className="text-xs font-black uppercase tracking-[0.6em] text-signal-gold opacity-80">— PROVERBS 14:23</p>
          </div>
          <p className="text-lg md:text-xl font-bold text-white/60 leading-relaxed max-w-2xl mx-auto">
            Operational authority is a responsibility to your family, your capital, and your legacy. We build systems that protect all three through disciplined execution.
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
               "Admission to the LaunchPath Standard is limited to disciplined operators. Enrollment is finalized only after a formal review of operational readiness and fit."
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
             <Link to="/readiness" className="bg-authority-blue text-white px-10 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center border-b-8 border-slate-900 group">
               Request Admission Interview
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
