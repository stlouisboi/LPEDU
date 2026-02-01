
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield,
  Layers,
  ChevronRight,
  Lock,
  Briefcase,
  Calculator,
  Loader2,
  Send,
  Fingerprint,
  AlertTriangle,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Scale,
  ShieldAlert,
  Target
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
          source: "home-risk-map-2026"
        });
      }
      navigate(destination);
    } catch (err: any) {
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  const deadlySinsCategories = [
    { id: 1, title: "Chemical Dependency Protocols", sins: [
      { id: "01", t: "Lack of Random Drug Program Implementation", impact: "Automatic Audit Failure" },
      { id: "02", t: "Deployment of Drivers With Positive Results", impact: "Authority Revocation" },
      { id: "03", t: "Failure to Register in Federal Clearinghouse", impact: "Regulatory Violation" },
      { id: "04", t: "Omission of Pre-Employment Screening", impact: "Critical Exposure" }
    ]},
    { id: 2, title: "Driver Eligibility Standards", sins: [
      { id: "05", t: "Utilization of Revoked or Suspended Licenses", impact: "Immediate Out-of-Service" },
      { id: "06", t: "Drivers Lacking Valid Medical Certification", impact: "Safety Rating Downgrade" },
      { id: "07", t: "Absence of Maintained DQ File Infrastructure", impact: "Audit Red Flag" },
      { id: "08", t: "Neglecting Previous Employer Inquiries", impact: "Administrative Default" }
    ]},
    { id: 3, title: "Operational Governance (HOS)", sins: [
      { id: "09", t: "Falsification of Hours of Service Records", impact: "Civil Penalties & OOS" },
      { id: "10", t: "Failure to Install/Use Mandatory ELD Device", impact: "Statutory Violation" },
      { id: "11", t: "Absence of Supporting Log Documentation", impact: "Systemic Audit Failure" },
      { id: "12", t: "Operating Beyond 14-Hour Driving Window", impact: "Immediate Safety Risk" }
    ]},
    { id: 4, title: "Equipment & Asset Integrity", sins: [
      { id: "13", t: "Operating Vehicles in Out-of-Service Condition", impact: "Authority Suspension" },
      { id: "14", t: "Failure to Perform Periodic Annual Inspections", impact: "Regulatory Default" },
      { id: "15", t: "Absence of Vehicle Maintenance Records", impact: "Audit Failure Point" },
      { id: "16", t: "Operating Without Active Public Liability Filing", impact: "Authority Revocation" }
    ]}
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-text-primary dark:text-text-dark-primary leading-relaxed">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center w-full bg-[#0c1a2d] overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                <Scale size={14} className="text-signal-gold" />
                <span>Stewardship • Operational Integrity</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-black tracking-tight text-white font-serif uppercase leading-[0.9]">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> <br/>With Order And <br/>Certainty.
              </h1>
              
              <div className="max-w-2xl space-y-8">
                <p className="text-xl sm:text-2xl font-bold text-white/90 leading-relaxed">
                  Clarity is the primary asset of a resilient motor carrier. Establish systems that prioritize stewardship from operational day one.
                </p>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-signal-gold">
                  Designed for first-time interstate motor carrier owner-operators in their first 90 days of authority.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-10 py-8 rounded-2xl font-black text-xs hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl">
                  Initiate Admission Protocol
                  <ArrowRight className="ml-4 w-4 h-4" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-white/20 text-white px-10 py-8 rounded-2xl font-black text-xs hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em]">
                  Reference Roadmap
                </Link>
              </div>
            </div>

            {/* HERO FORM CARD */}
            <div className="lg:col-span-5">
              <div className="bg-[#0f172a] p-10 sm:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                  <ShieldAlert size={140} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black font-serif text-white mb-2 uppercase tracking-tight">First 90 Days <br/><span className="text-signal-gold">Risk Map™</span></h3>
                  <p className="text-[10px] text-white/40 mb-12 font-black uppercase tracking-[0.3em] leading-relaxed max-w-[240px]">
                    Gain the visibility required for disciplined stewardship of your operating authority.
                  </p>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-signal-gold ml-4">Full Legal Name</label>
                      <input 
                        required 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-slate-900/50 border-2 border-white/10 focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 outline-none px-8 py-6 rounded-3xl font-bold transition-all text-white placeholder:text-white/20" 
                        placeholder="Jane Doe" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-signal-gold ml-4">Professional Email</label>
                      <input 
                        required 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-900/50 border-2 border-white/10 focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 outline-none px-8 py-6 rounded-3xl font-bold transition-all text-white placeholder:text-white/20" 
                        placeholder="jane@carrier.com" 
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full bg-authority-blue text-white py-7 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-4 border-slate-900 group"
                    >
                      {loading ? <Loader2 className="animate-spin mr-3" /> : <Send className="mr-4 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />}
                      Analyze Risk Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/5 text-center">
             <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium max-w-2xl mx-auto italic">
               "A hard worker has plenty of food, but a person who chases fantasies has no sense." — Proverbs 12:11
             </p>
          </div>
        </div>
      </section>

      {/* 2. IDENTIFICATION & ALIGNMENT */}
      <section className="py-32 lg:py-56 bg-primary-light dark:bg-primary-dark relative overflow-hidden border-t border-slate-100 dark:border-white/5">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] scale-150 pointer-events-none">
          <Fingerprint size={800} className="text-authority-blue dark:text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 space-y-12">
              <h2 className="text-6xl sm:text-8xl lg:text-[9rem] font-black font-serif uppercase leading-[0.85] tracking-tighter text-authority-blue dark:text-white">
                The <br/>Risks <br/>Many <br/><span className="text-logo-red italic underline decoration-authority-blue/10 dark:decoration-white/10">New</span> <br/><span className="text-logo-red italic">Entrants</span> <br/>Underestimate.
              </h2>
              <div className="border-l-4 border-logo-red pl-8 space-y-6">
                <p className="text-2xl font-black uppercase leading-tight text-authority-blue dark:text-white">The initial 90-day window represents a statistically significant risk period.</p>
                <p className="text-lg text-slate-500 dark:text-white/50 font-bold leading-relaxed">
                  Regulators analyze carrier data for specific administrative gaps classified as enforcement risks. Failure to address these at Ground 0 creates systemic fragility.
                </p>
              </div>
              <button className="bg-authority-blue/5 dark:bg-white/5 border border-authority-blue/10 dark:border-white/10 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-authority-blue/10 dark:hover:bg-white/10 transition-all flex items-center group">
                Verify Compliance Posture <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={14} />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-surface-dark p-12 lg:p-20 rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-white/5 space-y-12 transition-all hover:shadow-2xl">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Identification & Alignment</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30">System Registry Standard LP-01</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Drug & Alcohol Compliance",
                    "Driver Qualification Standards",
                    "Insurance & Fiscal Solvency",
                    "Maintenance & HOS Governance"
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center space-x-5">
                        <div className="p-3 bg-white dark:bg-white/5 rounded-xl group-hover:text-signal-gold transition-colors text-authority-blue dark:text-white shadow-sm">
                          <ShieldCheck size={18} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-white">{item}</span>
                      </div>
                      <ChevronRight size={14} className="opacity-20 text-authority-blue dark:text-white group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between opacity-30">
                  <div className="flex items-center space-x-3 text-authority-blue dark:text-white">
                    <Lock size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Secure Protocol Active</span>
                  </div>
                  <span className="text-[9px] font-mono text-authority-blue dark:text-white">ADMIN_V_LAWRENCE // 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 16 DEADLY SINS - ENHANCED CARDS */}
      <section className="py-32 bg-slate-50 dark:bg-[#0c1a2d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-logo-red text-white px-8 py-2 rounded-full shadow-2xl">
              <AlertTriangle size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Enforcement Registry Landmines</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black font-serif uppercase tracking-tighter leading-none text-authority-blue dark:text-white">
              The 16 <br/><span className="text-logo-red italic underline decoration-authority-blue/10 dark:decoration-white/10">Deadly Sins.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-white/60 font-bold max-w-4xl mx-auto leading-relaxed">
              These 16 specific gaps trigger 85% of New Entrant Audit failures. Identification and resolution are mandatory prerequisites for operational stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
            {deadlySinsCategories.map((cat) => (
              <div key={cat.id} className="space-y-10">
                <div className="flex items-center space-x-6 border-b border-slate-200 dark:border-white/10 pb-6">
                  <div className="w-10 h-10 bg-authority-blue dark:bg-white/10 rounded-xl flex items-center justify-center font-black text-xs text-signal-gold shadow-md">{cat.id}</div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-authority-blue dark:text-white">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {cat.sins.map((sin) => (
                    <div key={sin.id} className="bg-gradient-to-br from-white to-slate-50 dark:from-[#111827] dark:to-[#0f172a] p-8 rounded-[2.5rem] border-l-4 border-logo-red shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 min-h-[220px] flex flex-col border border-slate-100 dark:border-white/5">
                      <div className="absolute top-0 right-0 p-4 text-4xl font-black text-slate-100 dark:text-white/5 group-hover:text-logo-red/10 transition-colors duration-500">{sin.id}</div>
                      <h4 className="text-sm font-black uppercase tracking-tight leading-relaxed mb-8 relative z-10 flex-grow text-authority-blue dark:text-white">{sin.t}</h4>
                      <div className="bg-logo-red/5 dark:bg-logo-red/10 border border-logo-red/10 dark:border-logo-red/20 px-4 py-2 rounded-lg inline-block self-start transition-colors group-hover:border-logo-red/30">
                        <p className="text-[8px] font-black text-logo-red uppercase tracking-widest mb-0.5">Impact:</p>
                        <p className="text-[9px] font-black uppercase text-authority-blue dark:text-white tracking-widest">{sin.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <p className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-medium italic">
              "Only simpletons believe everything they're told... The wise are cautious and avoid danger." — Proverbs 14:15-16
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE FOUR PILLARS - ENHANCED CARDS */}
      <section className="py-32 lg:py-56 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-[0.6em] font-medium italic mb-16">
            "Work brings profit, but mere talk leads to poverty." — Proverbs 14:23
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: <Briefcase />, t: "Authority Protection", s: "Structural Fortress", d: "Move beyond basic filings. Establish a legal foundation designed to withstand federal scrutiny and separate personal assets from business liability." },
              { i: <Shield />, t: "Insurance Continuity", s: "Premium Stability", d: "Eliminate the “30-Day Trap.” Install the documentation and safety processes underwriters require to maintain coverage." },
              { i: <Layers />, t: "Compliance Backbone", s: "16-Exposure Defense", d: "Replace guesswork with documented compliance. LaunchPath installs the framework so DQ files and logs meet FMCSA expectations." },
              { i: <Calculator />, t: "Cash-Flow Oxygen", s: "TCO Survival Math", d: "Eliminate revenue blindness. Use the TCO framework to identify real break-even thresholds and profit margins." }
            ].map((p, i) => (
              <div key={i} className="bg-gradient-to-b from-white to-slate-50/50 dark:from-white/5 dark:to-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[4rem] p-10 flex flex-col items-center text-center group hover:-translate-y-4 transition-all duration-700 shadow-sm hover:shadow-2xl">
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-12 text-authority-blue dark:text-signal-gold shadow-inner group-hover:scale-110 group-hover:bg-authority-blue/5 transition-all duration-500">
                  {React.cloneElement(p.i, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black font-serif uppercase tracking-tight mb-2 leading-none text-authority-blue dark:text-white">{p.t}</h3>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-signal-gold mb-10">{p.s}</p>
                <p className="text-sm text-slate-500 dark:text-white/50 font-bold leading-[1.8] mb-12 flex-grow">{p.d}</p>
                <Link to={p.t.includes('Cash') ? "/tools/tco-calculator" : "/learning-path"} className="bg-authority-blue/5 dark:bg-white/5 hover:bg-signal-gold dark:hover:bg-signal-gold text-authority-blue dark:text-white hover:text-white dark:hover:text-authority-blue px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center shadow-sm">
                  {p.t.includes('Cash') ? 'Launch Tool' : 'View Module'} <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE REACH TEST™ - ENHANCED VECTOR CARDS */}
      <section className="py-32 lg:py-56 bg-slate-50 dark:bg-[#0c1a2d] text-center px-6 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto space-y-12 mb-24">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-white/30">— Risk Classification Protocol —</p>
          <h2 className="text-6xl sm:text-8xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white">The <span className="text-signal-gold italic">REACH</span> Test™</h2>
          <p className="text-2xl font-black font-serif italic text-slate-600 dark:text-white/80">"Assessment of structural integrity under institutional pressure."</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { l: "OVER", t: "FMCSA Regulatory Violations", d: "Technical violations bypassing baseline administrative filters.", i: <MoveDown /> },
             { l: "AROUND", t: "Insurance Cancellations", d: "Administrative lapses triggering automatic loss of coverage.", i: <MoveRight /> },
             { l: "THROUGH", t: "Internal System Auditors", d: "Data inconsistencies identified during federal investigations.", i: <MoveLeft /> },
             { l: "UNDER", t: "Financial Foundation Collapse", d: "Fiscal deficits compromising mandated safety operations.", i: <MoveUp /> }
           ].map((r, i) => (
             <div key={i} className="bg-gradient-to-br from-white to-slate-50 dark:from-[#111827] dark:to-[#0b121e] p-12 rounded-[3.5rem] text-left flex items-start gap-10 hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-white/5 group shadow-xl hover:-translate-x-1">
               <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl text-authority-blue dark:text-signal-gold shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                 {React.cloneElement(r.i as React.ReactElement, { size: 28 })}
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-300 dark:text-white/20 mb-2 group-hover:text-signal-gold/40 transition-colors">{r.l}</p>
                  <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-4 leading-tight">{r.t}</h3>
                  <p className="text-lg text-slate-500 dark:text-white/50 font-bold leading-relaxed">{r.d}</p>
               </div>
             </div>
           ))}
        </div>

        <div className="mt-20">
          <Link to="/reach-test" className="border-2 border-authority-blue dark:border-signal-gold px-12 py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-white hover:bg-authority-blue dark:hover:bg-signal-gold hover:text-white dark:hover:text-authority-blue transition-all group inline-flex items-center shadow-xl hover:shadow-2xl">
            Technical Deep-Dive <ArrowRight className="inline ml-3 group-hover:translate-x-1 transition-transform" size={14} />
          </Link>
        </div>
      </section>

      {/* 6. INSTITUTIONAL CLARIFICATIONS */}
      <section className="py-32 lg:py-56 bg-primary-light dark:bg-primary-dark text-center px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-6xl sm:text-8xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white">Institutional <br/><span className="text-signal-gold italic">Clarifications</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/40 max-w-lg mx-auto leading-relaxed">
            Truth over marketing. Reality over persuasion. <br/>Explore the technical requirements of authority.
          </p>
          <Link to="/clarification" className="bg-authority-blue dark:bg-[#1e3a5f] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all group inline-flex items-center">
             View System Realities <ArrowRight className="inline ml-3 group-hover:translate-x-1 transition-transform" size={14} />
          </Link>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-48 lg:py-72 bg-authority-blue dark:bg-[#1e3a5f] relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-5xl mx-auto relative z-10 space-y-16">
          <h2 className="text-6xl sm:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85] text-white">
            Build Your <br/><span className="text-signal-gold italic">Carrier</span> <br/>On Systems.
          </h2>
          <p className="text-2xl sm:text-4xl font-black text-white/90 max-w-4xl mx-auto leading-tight">
            Transition from administrative volatility to a standardized operating posture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
            <Link to="/pricing" className="bg-white text-authority-blue px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-signal-gold hover:text-white transition-all hover:scale-105 active:scale-95">
              Initiate Admission
            </Link>
            <Link to="/contact" className="border-4 border-white/20 px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] text-white hover:bg-white/5 transition-all">
              Contact Technical
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER METADATA */}
      <footer className="bg-slate-900 dark:bg-[#020617] py-16 border-t border-white/5 text-center text-white/30 text-[11px] font-black uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <p>© {new Date().getFullYear()} LaunchPath EDU • Operational Stewardship Standard</p>
           <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2">
                <Lock size={12} />
                <span className="text-[9px] tracking-[0.1em]">SSL: ENCRYPTED</span>
             </div>
             <div className="flex items-center space-x-2">
                <Target size={12} />
                <span className="text-[9px] tracking-[0.1em]">NC-2026-LP-SYS</span>
             </div>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
