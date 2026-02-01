
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Shield,
  Layers,
  ChevronRight,
  // Added missing ArrowRight icon import
  ArrowRight,
  Briefcase,
  Calculator,
  Loader2,
  Lock,
  Zap,
  Activity,
  ShieldAlert,
  Fingerprint,
  Anchor,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Cpu,
  Terminal,
  Database
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
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-risk-map-hero"
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
      
      {/* SECTION 1: HERO - THE 90-DAY WINDOW */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        {/* Prestige Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm shadow-sm">
              <Terminal size={14} className="text-authority-blue dark:text-signal-gold" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA Operating Standard LP-2026</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase font-serif">
              PROTECT <br/>YOUR <br/><span className="italic text-signal-gold underline decoration-authority-blue/5 underline-offset-8">AUTHORITY</span> <br/>BEFORE <br/>MISTAKES <br/>COST YOU.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-[12px] border-authority-blue dark:border-signal-gold pl-6 md:pl-12 py-4">
              <p className="text-xl md:text-2xl lg:text-3xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                First-time owner-operators are in a 90-day window of vulnerability. LaunchPath installs the systematic infrastructure required for absolute audit survival.
              </p>
              <div className="flex items-center space-x-6">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] leading-relaxed">
                  ESTABLISHMENT OF ORDER PRECEDES MOMENTUM.
                </p>
                <div className="h-px flex-grow bg-slate-100 dark:bg-white/5"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-6">
              <Link to="/pricing" className="w-full sm:w-auto bg-authority-blue text-white px-12 md:px-16 py-6 md:py-8 rounded-2xl font-black text-xs hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(30,58,95,0.3)] border-b-8 border-slate-900 group">
                INITIATE ADMISSION
                <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-authority-blue/10 dark:border-white/10 text-authority-blue dark:text-white px-10 md:px-14 py-6 md:py-8 rounded-2xl font-black text-xs hover:bg-white dark:hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em]">
                REFERENCE THE ROADMAP
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-14 lg:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_100px_-30px_rgba(30,58,95,0.18)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              {/* Scanline Animation */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-signal-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.5)] animate-[scan_4s_linear_infinite] z-20 pointer-events-none"></div>
              
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                <Fingerprint size={240} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <div className="space-y-2">
                     <h3 className="text-xs font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.4em]">REGISTRY ACCESS</h3>
                     <h3 className="text-2xl md:text-3xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white leading-none">FREE 90-DAY <br/>RISK MAP™</h3>
                   </div>
                   <div className="w-12 h-12 md:w-16 md:h-16 border border-slate-100 dark:border-white/10 rounded-[1.5rem] flex items-center justify-center text-slate-200 dark:text-slate-700 shadow-inner">
                     <Lock size={24} />
                   </div>
                </div>
                
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 pb-6 border-b border-slate-50 dark:border-white/5">DIAGNOSTIC IDENTIFICATION</p>
                
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">LEGAL REGISTRY NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none px-8 py-5 rounded-2xl font-bold transition-all shadow-inner text-sm" 
                      placeholder="Jane Doe" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">PROFESSIONAL EMAIL</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50/50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none px-8 py-5 rounded-2xl font-bold transition-all shadow-inner text-sm" 
                      placeholder="jane@carrier.com" 
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-authority-blue text-white py-6 md:py-8 rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] md:text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group border-b-8 border-slate-900"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" /> : <ShieldAlert className="mr-3" size={18} />}
                    VALIDATE MY RISK PROFILE
                  </button>
                  <p className="text-[9px] text-center text-slate-300 dark:text-slate-700 uppercase tracking-widest font-black opacity-60">SECURE UPLINK ACTIVE // LP-ST-04</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FOUR PILLARS AS INSTITUTIONAL ASSETS */}
      <section className="py-32 lg:py-56 bg-slate-50/50 dark:bg-primary-dark border-y border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-4 mb-12">
            <div className="h-px w-12 bg-slate-200 dark:bg-white/10"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">— SYSTEM ASSETS —</p>
            <div className="h-px w-12 bg-slate-200 dark:bg-white/10"></div>
          </div>
          
          <h2 className="text-4xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white leading-[0.95] md:leading-[0.85] uppercase tracking-tighter mb-24 md:mb-32">
            SYSTEMS OVER <br/><span className="text-signal-gold italic">SURVIVAL.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "01", t: "AUTHORITY DEFENSE", s: "STRUCTURAL AUDIT Posture", d: "A legal foundation engineered to survive federal New Entrant investigations.", i: <ShieldCheck />, color: "border-slate-300" },
              { n: "02", t: "INSURANCE CONTINUITY", s: "PREMIUM STABILIZATION", d: "Technical documentation protocols required to keep underwriters on your side.", i: <Activity />, color: "border-signal-gold" },
              { n: "03", t: "COMPLIANCE BACKBONE", s: "16-EXPOSURE TAXONOMY", d: "Installation of mandatory DQ files and Clearinghouse governance systems.", i: <Database />, color: "border-authority-blue" },
              { n: "04", t: "CASH-FLOW OXYGEN", s: "TCO SURVIVAL MATH", d: "Pillar 4: Identifying actual operational sustainability and margin preservation.", i: <Calculator />, color: "border-signal-gold" }
            ].map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 dark:border-border-dark flex flex-col items-center text-center space-y-6 group hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-5xl md:text-7xl font-black text-slate-50 dark:text-white/5 transition-colors group-hover:text-slate-100 dark:group-hover:text-white/10">{pillar.n}</span>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-authority-blue dark:text-signal-gold mb-4 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 dark:border-white/5">
                  {React.cloneElement(pillar.i as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-authority-blue dark:text-white">{pillar.t}</h3>
                <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.3em] mb-4">{pillar.s}</p>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed flex-grow">
                  {pillar.d}
                </p>
                <div className="w-full pt-10">
                   <div className="h-[2px] w-full bg-slate-50 dark:bg-white/5 mb-8"></div>
                   <button className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-sm hover:bg-authority-blue hover:text-white transition-all active:scale-95 border border-slate-100 dark:border-border-dark">
                     ASSET SPECIFICATION
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 16 DEADLY SINS */}
      <section className="py-32 lg:py-60 bg-[#FAF9F6] dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24 md:mb-40 space-y-10">
            <div className="inline-flex items-center space-x-4 bg-logo-red px-10 py-4 rounded-full text-white shadow-2xl shadow-red-600/20 border-b-4 border-red-900 animate-pulse">
              <ShieldAlert size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">SYSTEM WARNING: AUDIT TERMINATION VECTORS</span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[11rem] font-black font-serif text-authority-blue dark:text-white leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              THE 16 <br/><span className="text-logo-red italic underline decoration-authority-blue/10 underline-offset-[20px] md:underline-offset-[30px]">DEADLY SINS.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-40">
            {[
              { id: "01", cat: "CHEMICAL DEPENDENCY", sins: [
                { n: "01", t: "LACK OF RANDOM DRUG PROGRAM", s: "TERMINAL", b: "INSTANT REVOCATION" },
                { n: "02", t: "POSITIVE DRIVER RESULTS", s: "TERMINAL", b: "SAFETY DOWNGRADE" },
                { n: "03", t: "CLEARINGHOUSE MISMANAGEMENT", s: "CRITICAL", b: "REGISTRY VIOLATION" },
                { n: "04", t: "OMISSION OF PRE-EMPLOYMENT", s: "CRITICAL", b: "AUDIT FAILURE" }
              ]},
              { id: "02", cat: "DRIVER INTEGRITY", sins: [
                { n: "05", t: "REVOKED LICENSE OPERATING", s: "TERMINAL", b: "OUT OF SERVICE" },
                { n: "06", t: "EXPIRED MEDICAL CERTS", s: "CRITICAL", b: "LEGAL EXPOSURE" },
                { n: "07", t: "DISJOINTED DQ FILES", s: "HIGH RISK", b: "AUDIT RED FLAG" },
                { n: "08", t: "MISSING BACKGROUND INQUIRIES", s: "HIGH RISK", b: "REGULATORY GAP" }
              ]}
            ].map((category, idx) => (
              <div key={idx} className="space-y-12 md:space-y-16">
                <div className="flex items-center space-x-6 border-b-[10px] border-authority-blue dark:border-white/10 pb-8 md:pb-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-authority-blue text-signal-gold rounded-[2rem] flex items-center justify-center font-black text-xl md:text-2xl shrink-0 shadow-2xl border-2 border-white/10">
                    {category.id}
                  </div>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-authority-blue dark:text-white">
                    {category.cat}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                  {category.sins.map((sin, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="bg-white dark:bg-surface-dark p-10 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-slate-100 dark:border-border-dark flex flex-col justify-between h-64 md:h-80 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                    >
                      <div className="absolute -top-6 -right-2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <span className="text-[10rem] md:text-[14rem] font-black text-authority-blue dark:text-white">
                          {sin.n}
                        </span>
                      </div>

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <h4 className="text-lg md:text-xl font-black uppercase leading-[1.1] max-w-[200px] text-authority-blue dark:text-white">
                          {sin.t}
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-logo-red shadow-[0_0_10px_rgba(185,28,28,0.5)]"></div>
                             <p className="text-[10px] md:text-[11px] font-black text-logo-red uppercase tracking-[0.4em]">
                                {sin.s}
                             </p>
                          </div>
                          <p className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                             {sin.b}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-32 text-center">
            <Link to="/readiness" className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 hover:text-authority-blue transition-colors cursor-pointer">VIEW COMPLETE 16-POINT TAXONOMY</Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA - THE $3500 JUSTIFICATION */}
      <section className="py-40 md:py-60 lg:py-80 bg-authority-blue text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]"></div>
        
        <div className="max-w-6xl mx-auto px-6 space-y-16 md:space-y-24 relative z-10">
          <div className="space-y-6">
            <p className="text-signal-gold text-[12px] font-black uppercase tracking-[1em] mb-4">MANDATORY PROTOCOL</p>
            <h2 className="text-5xl md:text-8xl lg:text-[11rem] font-black font-serif leading-[1] md:leading-[0.8] tracking-tighter uppercase">
              TRANSITION TO <br/><span className="text-signal-gold italic underline decoration-white/10 underline-offset-[20px] md:underline-offset-[40px]">CERTAINTY.</span>
            </h2>
          </div>

          <p className="text-xl md:text-3xl lg:text-4xl font-black text-white/50 uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-4xl mx-auto leading-relaxed">
            BUILD YOUR CARRIER ON <br className="hidden md:block"/>INSTITUTIONAL SYSTEMS, NOT REVENUE GAMBLES.
          </p>
          
          <div className="pt-12 flex flex-col items-center space-y-12">
             <Link to="/pricing" className="bg-white text-authority-blue px-12 md:px-24 py-8 md:py-12 rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-[0.5em] text-xs md:text-sm hover:bg-signal-gold hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] active:scale-95 inline-flex items-center group border-b-[12px] border-slate-200">
               INITIATE SYSTEM ADMISSION
               <ArrowRight className="ml-6 group-hover:translate-x-3 transition-transform" />
             </Link>
             
             <div className="flex items-center space-x-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <ShieldCheck size={40} />
               <div className="h-10 w-px bg-white/20"></div>
               <Anchor size={40} />
               <div className="h-10 w-px bg-white/20"></div>
               <Cpu size={40} />
             </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
