
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield,
  Activity,
  UserCheck,
  ShieldAlert,
  FileWarning,
  Layers,
  ChevronDown,
  ChevronRight,
  Lock,
  MousePointer2,
  Briefcase,
  Award,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  AlertCircle,
  Clock,
  Calendar,
  CreditCard,
  Scale,
  HelpCircle,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Skull,
  Zap,
  Calculator,
  Sparkles,
  Server,
  Fingerprint,
  CheckCircle,
  Verified,
  Anchor,
  Settings,
  ClipboardList,
  Target,
  FileSearch,
  Cpu
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import TrustArchitecture from '../components/TrustArchitecture';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!db) {
        throw new Error("Synchronization service is temporarily unavailable. Please check your connection.");
      }

      await addDoc(collection(db, "leadMagnets"), {
        firstName: formData.firstName || 'Carrier',
        email: formData.email,
        downloadedAt: serverTimestamp(),
        source: "risk-assessment-hero"
      });
      
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(err.message || "We encountered a technical issue transmitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deadlySinsCategories = [
    {
      title: "Chemical Dependency Protocols",
      sins: [
        { id: "01", text: "Lack of random drug program implementation", impact: "Automatic Audit Failure" },
        { id: "02", text: "Deployment of drivers with positive results", impact: "Authority Revocation" },
        { id: "03", text: "Failure to register in Federal Clearinghouse", impact: "Regulatory Violation" },
        { id: "04", text: "Omission of pre-employment screening", impact: "Critical Exposure" }
      ]
    },
    {
      title: "Driver Eligibility Standards",
      sins: [
        { id: "05", text: "Utilization of revoked or suspended licenses", impact: "Immediate Out-of-Service" },
        { id: "06", text: "Drivers lacking valid medical certification", impact: "Safety Rating Downgrade" },
        { id: "07", text: "Absence of maintained DQ file infrastructure", impact: "Audit Red Flag" },
        { id: "08", text: "Neglecting previous employer background inquiries", impact: "Administrative Default" }
      ]
    },
    {
      title: "Operational Safety Controls",
      sins: [
        { id: "09", text: "Directing drivers to exceed HOS limits", impact: "Criminal Negligence Risk" },
        { id: "10", text: "Dispatching vehicles in OOS conditions", impact: "Operational Termination" },
        { id: "11", text: "Failure to maintain Records of Duty Status", impact: "Federal Fine Multiplier" },
        { id: "12", text: "Lack of verified daily vehicle inspections", impact: "Structural Liability" }
      ]
    },
    {
      title: "Administrative Integrity",
      sins: [
        { id: "13", text: "Operation without verified insurance levels", impact: "Permanent Blacklist" },
        { id: "14", text: "Inaccurate or missing BOC-3 / UCR filings", impact: "Administrative Suspension" },
        { id: "15", text: "Absence of systematic maintenance program", impact: "Inspection Exposure" },
        { id: "16", text: "Failure to report accidents within windows", impact: "Legal Default" }
      ]
    }
  ];

  const pillars = [
    { 
      t: "Authority Protection", 
      focus: "Structural Fortress",
      d: "Move beyond basic filings. Establish a legal and operational foundation designed to withstand federal scrutiny and separate personal assets from business liability.", 
      icon: <Briefcase size={40} aria-hidden="true" />,
      link: "/learning-path"
    },
    { 
      t: "Insurance Continuity", 
      focus: "Premium Stability",
      d: "Eliminate the “30-Day Trap.” Install the documentation, safety processes, and renewal discipline insurance underwriters require to maintain coverage.", 
      icon: <Shield size={40} aria-hidden="true" />,
      link: "/clarification"
    },
    { 
      t: "Compliance Backbone", 
      focus: "The 16-Exposure Defense",
      d: "Replace guesswork with documented compliance. LaunchPath installs the Exposure-vs-Refuge framework so DQ files and logs meet FMCSA expectations.", 
      icon: <Layers size={40} aria-hidden="true" />,
      link: "/readiness"
    },
    { 
      t: "Cash-Flow Oxygen", 
      focus: "TCO Survival Math",
      d: "Eliminate revenue blindness. Use the LaunchPath True Cost of Ownership (TCO) framework to identify real break-even thresholds and profit margins.", 
      icon: <Calculator size={40} aria-hidden="true" />,
      link: "/tools/tco-calculator",
      isTool: true
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-20 lg:py-48" aria-labelledby="hero-heading">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true"></div>
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
            <div className="lg:col-span-7 text-center lg:text-left space-y-12">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-xl animate-reveal-up">
                <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse mr-2"></span>
                Institutional FMCSA Standard LP-2026
              </div>
              
              <h1 id="hero-heading" className="text-6xl lg:text-[6.5rem] font-black tracking-tighter text-white leading-[0.95] font-serif uppercase drop-shadow-sm animate-reveal-up">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> <br/>Before Mistakes <br/>Cost You.
              </h1>
              
              <div className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-bold space-y-8 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
                <p>Establishing the systems required so paperwork, insurance, and federal audits do not shut your carrier down.</p>
                <div className="flex flex-col space-y-3">
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-signal-gold">Target Environment:</p>
                    <p className="text-base font-bold text-white/70 italic uppercase tracking-widest">First-time interstate motor carriers • Initial 90-Day Authority Window</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start pt-8 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-16 py-8 rounded-[2.5rem] font-black text-sm hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-b-8 border-slate-200">
                  Initiate Admission Protocol
                  <ArrowRight className="ml-4 w-6 h-6" aria-hidden="true" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white hover:border-white px-12 py-8 rounded-[2.5rem] font-black text-sm transition-all flex items-center justify-center uppercase tracking-[0.3em] backdrop-blur-sm">
                  View Reference Roadmap
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative animate-reveal-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative bg-white dark:bg-surface-dark p-12 lg:p-16 rounded-[4.5rem] border-t-8 border-signal-gold shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)]">
                <div className="absolute top-12 right-12 text-authority-blue dark:text-signal-gold opacity-10" aria-hidden="true">
                  <ShieldAlert size={60} />
                </div>
                <h2 className="text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-4 leading-none font-serif">
                  Analyze <br/><span className="text-signal-gold italic">Risk Profile™</span>
                </h2>
                <p className="text-[12px] text-text-muted dark:text-text-dark-muted mb-10 font-black uppercase tracking-[0.3em] leading-relaxed">
                  Sequence: Identification & Diagnostic
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  {error && (
                    <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3" role="alert">
                      <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
                      <p className="text-[12px] font-bold text-red-700 leading-relaxed">{error}</p>
                    </div>
                  )}
                  <div className="space-y-3">
                    <label htmlFor="hero-name" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Full Legal Name</label>
                    <input 
                      id="hero-name"
                      type="text" required placeholder="Jane Doe"
                      className="w-full px-8 py-6 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-3xl outline-none font-black text-xl text-text-primary dark:text-white transition-all focus:border-authority-blue focus:bg-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="hero-email" className="block text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 ml-6">Registry Email</label>
                    <input 
                      id="hero-email"
                      type="email" required placeholder="jane@carrier.com"
                      className="w-full px-8 py-6 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-3xl outline-none font-black text-xl text-text-primary dark:text-white transition-all focus:border-authority-blue focus:bg-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-authority-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[13px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98] border-b-8 border-slate-900">
                    <MousePointer2 className="mr-4" size={22} aria-hidden="true" />
                    Generate Diagnostic Results
                  </button>
                  <p className="text-[10px] text-center text-slate-300 uppercase tracking-widest font-bold">End-to-End Encryption Protocol Active</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT LAUNCHPATH IS (PLAIN & DIRECT) */}
      <section className="py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-signal-gold mb-16">The Operating Definition</h2>
            <div className="space-y-12">
                <p className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white leading-[1.1] uppercase tracking-tight">
                    LaunchPath is a <span className="text-signal-gold italic">90-Day Compliance System</span> for new trucking businesses.
                </p>
                <div className="h-px w-24 bg-slate-100 dark:bg-slate-800 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-12">
                    {[
                        { t: "No Shortcuts.", d: "We do not sell 'fast-tracks' that bypass federal requirements. We follow the law." },
                        { t: "No Rushed Filings.", d: "Authority is filed when the structural prerequisites are satisfied—not before." },
                        { t: "No Guesswork.", d: "We replace the 'figure it out later' mindset with documented, verified systems." }
                    ].map((item, i) => (
                        <div key={i} className="space-y-4">
                            <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight">{item.t}</h3>
                            <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed">{item.d}</p>
                        </div>
                    ))}
                </div>
                <div className="pt-20">
                    <p className="text-2xl text-slate-800 dark:text-white font-bold leading-relaxed max-w-3xl mx-auto italic">
                        "We help you build the paperwork, systems, and habits that keep your authority alive."
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. STRUCTURE BEATS MEMORY SECTION - REFINED LAYOUT */}
      <section className="py-40 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
           <Server size={1000} className="text-authority-blue absolute -left-1/4 top-0" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="text-center mb-24 space-y-8 max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold bg-white dark:bg-white/5 px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                    <Scale size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Core Philosophy</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-black text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.85] font-serif">
                    STRUCTURE BEATS <span className="text-signal-gold italic underline decoration-signal-gold/20 decoration-[12px] underline-offset-[14px]">MEMORY.</span>
                </h2>
                <div className="space-y-6">
                    <p className="text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                        You shouldn’t have to remember everything to stay compliant. 
                    </p>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        DOT, insurance companies, and auditors don’t care how busy you are—they care whether the paperwork is complete. When the system is solid, audits stop being emergencies.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                {/* Schematic Line Connector for Desktop */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-700 -z-10" aria-hidden="true"></div>
                
                {[
                    { t: "Right Sequence.", d: "Setting things up in the correct order to prevent administrative fallout.", icon: <Settings />, code: "PROC-SEQ-01" },
                    { t: "Complete Records.", d: "Keeping required records consistent and fully documented as events happen.", icon: <ClipboardList />, code: "DOC-ARCH-02" },
                    { t: "Risk Elimination.", d: "Ensuring nothing critical is missing before federal monitoring triggers.", icon: <Target />, code: "RISK-CTRL-03" }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-12 rounded-[4rem] shadow-xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center group hover:-translate-y-4 transition-all duration-700 relative overflow-hidden">
                        <div className="absolute top-6 right-8 text-[9px] font-black text-slate-200 dark:text-slate-700 uppercase tracking-widest">{item.code}</div>
                        
                        <div className="w-20 h-20 bg-slate-50 dark:bg-gray-700 text-authority-blue dark:text-signal-gold rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-10">
                            {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
                        </div>
                        
                        <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4 font-serif">{item.t}</h3>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                        
                        <div className="mt-10 pt-8 border-t border-slate-50 dark:border-white/5 w-full flex justify-center">
                            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-signal-gold transition-colors">
                                <CheckCircle size={14} />
                                <span>Verified Implementation</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 text-center">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-600 italic">
                    Institutional Standard: Order Before Momentum
                </p>
            </div>
        </div>
      </section>

      {/* 4. RISKS UNDERESTIMATED SECTION */}
      <section className="py-48 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none" aria-hidden="true">
           <Fingerprint size={600} className="text-white" />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-40 items-center">
            
            {/* Left Content: High-Alert Narrative */}
            <div className="space-y-12">
              <div className="inline-flex items-center space-x-4 bg-logo-red/10 border border-logo-red/30 px-6 py-4 rounded-2xl shadow-sm">
                <ShieldAlert className="text-logo-red animate-pulse" size={22} />
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-logo-red">Administrative Exposure Alert</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] font-serif">
                  THE RISKS <br/>MANY <br/>
                  <span className="text-logo-red italic underline decoration-logo-red/20 decoration-[12px] underline-offset-8">NEW <br/>ENTRANTS</span> <br/>
                  UNDERESTIMATE
                </h2>
              </div>
              
              <div className="space-y-10 max-w-xl">
                <div className="flex space-x-8 items-start">
                   <div className="w-2 h-24 bg-logo-red rounded-full shrink-0" aria-hidden="true"></div>
                   <p className="text-3xl font-black leading-tight text-white/90">
                     The first 90 days are the most dangerous. Not because of driving—but because of paperwork gaps.
                   </p>
                </div>
                <p className="text-xl text-slate-400 font-medium leading-relaxed border-l border-white/10 pl-8 ml-1">
                  Regulators analyze carrier data for specific administrative gaps. Gaps trigger audits, insurance cancellations, and shutdowns. LaunchPath helps you see those risks before they turn into violations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                    "Driver qualification files",
                    "Drug & alcohol compliance",
                    "Insurance continuity",
                    "Maintenance & logbook records"
                ].map((risk, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-logo-red"></div>
                        <span className="text-sm font-black uppercase tracking-widest text-white/70">{risk}</span>
                    </div>
                ))}
              </div>
            </div>

            {/* Right: Institutional Diagnostic Terminal */}
            <div className="relative group w-full flex justify-center lg:justify-end">
               <div className="absolute -inset-20 bg-authority-blue/10 rounded-[8rem] blur-[120px] opacity-30"></div>
               
               <div className="relative w-full max-w-[620px] bg-white dark:bg-surface-dark border-[1px] border-slate-100 dark:border-border-dark p-12 lg:p-20 rounded-[5rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.5)] space-y-12 transition-all group-hover:shadow-[0_100px_200px_-50px_rgba(0,0,0,0.6)] overflow-hidden">
                  
                  <div className="space-y-4">
                    <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-authority-blue dark:text-white font-serif leading-[1.05]">
                      IDENTIFICATION <br/> & ALIGNMENT
                    </h3>
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">System Registry Standard LP-01</p>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      "DRUG & ALCOHOL COMPLIANCE",
                      "DRIVER QUALIFICATION STANDARDS",
                      "INSURANCE & FISCAL SOLVENCY",
                      "MAINTENANCE & HOS GOVERNANCE"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center space-x-8 p-8 bg-slate-50/50 dark:bg-gray-800/40 rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-500">
                         <div className="w-12 h-12 bg-white dark:bg-gray-700 border border-slate-100 dark:border-slate-600 rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-inner shrink-0" aria-hidden="true">
                           <ShieldCheck size={24} />
                         </div>
                         <span className="text-base lg:text-lg font-black uppercase tracking-[0.15em] text-authority-blue dark:text-white leading-tight">
                           {text}
                         </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-6 sm:items-end opacity-60">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl">
                           <Lock size={18} className="text-slate-500 dark:text-text-dark-muted" />
                        </div>
                        <div className="space-y-1">
                           <span className="block text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 dark:text-text-dark-muted">Secure Protocol Active</span>
                        </div>
                     </div>
                     <div className="text-left sm:text-right">
                        <span className="block text-[10px] font-black text-slate-500 dark:text-text-dark-muted tracking-[0.3em]">ADMIN_V_LAWRENCE // 2026</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE 16 DEADLY SINS - RISK MATRIX */}
      <section className="py-48 bg-slate-100 dark:bg-primary-dark border-y border-slate-200 dark:border-border-dark overflow-hidden" aria-labelledby="sins-heading">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative">
          
          <div className="flex flex-col items-center text-center mb-32 space-y-8">
            <div className="inline-flex items-center space-x-4 bg-red-600 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl animate-reveal-up">
              <Skull size={18} className="animate-pulse" aria-hidden="true" />
              <span>Registry Warning: Audit Failure Vectors</span>
            </div>
            <h2 id="sins-heading" className="text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.85] animate-reveal-up">
              The 16 <br/><span className="text-red-600 italic underline decoration-red-600/20 decoration-[12px] underline-offset-[16px]">Deadly Sins.</span>
            </h2>
            <div className="max-w-3xl space-y-6 animate-reveal-up">
                <p className="text-2xl text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed">
                These specific administrative gaps trigger 85% of New Entrant Audit failures. Most shutdowns happen because small mistakes pile up.
                </p>
                <p className="text-[11px] text-red-600 font-black uppercase tracking-[0.4em] italic">
                “Only simpletons believe everything they’re told… The wise are cautious and avoid danger.” — Proverbs 14:15–16
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {deadlySinsCategories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-12 animate-reveal-up" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                <div className="flex items-center space-x-6 border-b-4 border-slate-200 dark:border-border-dark pb-6">
                  <div className="w-14 h-14 bg-authority-blue dark:bg-gray-800 text-signal-gold rounded-2xl flex items-center justify-center text-xl font-black shadow-lg" aria-hidden="true">
                    0{catIdx + 1}
                  </div>
                  <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.sins.map((sin, sinIdx) => (
                    <div key={sinIdx} className="group relative bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.2)] hover:border-red-500/50 transition-all duration-700 flex flex-col justify-between overflow-hidden">
                      <span className="absolute -top-6 -right-6 text-8xl font-black text-slate-50 dark:text-slate-800/20 pointer-events-none group-hover:text-red-500/10 transition-colors duration-700" aria-hidden="true">
                        {sin.id}
                      </span>

                      <div className="relative z-10 space-y-6">
                        <p className="text-xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">
                          {sin.text}
                        </p>
                        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-100 dark:border-red-900/30">
                           <Zap size={14} className="text-red-600 dark:text-red-400" aria-hidden="true" />
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 dark:text-red-300">
                             Impact: {sin.impact}
                           </span>
                        </div>
                      </div>

                      <div className="absolute left-0 top-0 h-full w-2 bg-slate-100 dark:bg-gray-800 group-hover:bg-red-600 transition-colors duration-700" aria-hidden="true"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-16 bg-authority-blue rounded-[4rem] text-center relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] animate-reveal-up">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
             <p className="relative z-10 text-white text-xl font-black uppercase tracking-[0.4em] mb-6">Registry Analysis Guideline</p>
             <p className="relative z-10 text-white/80 max-w-4xl mx-auto text-xl font-medium leading-relaxed italic border-l-4 border-signal-gold pl-12">
               "The FMCSA does not grade on a curve. Each of these 16 items represents a critical system component. Fixes happen inside the system — identification is the first step toward stewardship."
             </p>
          </div>
        </div>
      </section>

      {/* 6. THE REACH TEST SECTION */}
      <section className="py-48 bg-[#F8FAFC] dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark" aria-labelledby="reach-heading">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-32 space-y-10 animate-reveal-up">
            <div className="flex items-center justify-center space-x-8">
              <div className="h-[2px] w-24 bg-authority-blue/20 dark:bg-white/10" aria-hidden="true"></div>
              <span className="text-[12px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-slate-400">Readiness Check Protocol</span>
              <div className="h-[2px] w-24 bg-authority-blue/20 dark:bg-white/10" aria-hidden="true"></div>
            </div>
            
            <h2 id="reach-heading" className="text-7xl lg:text-9xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase leading-[0.85]">
              THE <span className="text-signal-gold italic border-b-[20px] border-signal-gold/30 rounded-full px-4 pb-2">REACH</span> TEST™
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-2xl md:text-3xl text-slate-800 dark:text-text-dark-primary font-black italic tracking-tight leading-relaxed">
                "A readiness check to see if your business can survive audits, insurance reviews, and real-world pressure."
                </p>
                <p className="text-lg text-slate-500 font-medium">Before you file authority or start running loads, we help you answer one question: <span className="text-authority-blue font-bold">Is the system ready — or am I guessing?</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[
                { l: "OVER", t: "Regulatory Scrutiny", d: "Identifying paperwork gaps that lead to automatic audit failure.", i: <MoveDown /> },
                { l: "AROUND", t: "Insurance Lapses", d: "Spotting administrative shortcuts that trigger non-renewals.", i: <MoveRight /> },
                { l: "THROUGH", t: "System Inconsistency", d: "Finding data conflicts that signal a loss of safety control.", i: <MoveLeft /> },
                { l: "UNDER", t: "Financial Collapse", d: "Calculating break-even points to ensure fiscal survival.", i: <MoveUp /> }
            ].map((test, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-14 rounded-[4rem] shadow-sm border border-slate-100 dark:border-border-dark hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-700 group flex items-start space-x-12 animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-3xl group-hover:bg-authority-blue group-hover:text-white transition-all duration-500 shrink-0 shadow-inner" aria-hidden="true">
                  {React.cloneElement(test.i as React.ReactElement, { size: 36, className: 'text-signal-gold group-hover:text-white transition-colors' })}
                </div>
                <div className="space-y-4">
                  <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-signal-gold transition-colors">{test.l}</p>
                  <h3 className="text-3xl font-black font-serif text-authority-blue dark:text-white tracking-tight uppercase leading-none">{test.t}</h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{test.d}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center animate-reveal-up">
            <Link to="/readiness" className="group inline-flex items-center space-x-6 bg-authority-blue text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-steel-blue transition-all shadow-[0_40px_80px_-20px_rgba(30,58,95,0.4)] active:scale-95 border-b-8 border-slate-900">
              <MousePointer2 className="group-hover:rotate-12 transition-transform" size={24} />
              <span>Analyze Risk Profile</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. THE FOUR PILLARS */}
      <section id="pillars" className="py-48 bg-white dark:bg-primary-dark overflow-hidden" aria-labelledby="pillars-heading">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-32 space-y-8 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold mb-4">
              <Scale size={32} />
              <span className="text-[12px] font-black uppercase tracking-[0.7em]">System Architecture</span>
            </div>
            <h2 id="pillars-heading" className="text-7xl lg:text-[9rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.85]">The Four <span className="text-signal-gold italic underline decoration-signal-gold/20 decoration-[12px] underline-offset-[16px]">Pillars</span></h2>
            <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-2xl text-text-muted dark:text-text-dark-muted font-bold leading-relaxed">
                "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active."
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 italic mt-4 uppercase tracking-[0.4em] font-black">
                “Work brings profit, but mere talk leads to poverty.” — Proverbs 14:23
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-14 rounded-[4.5rem] border-4 border-slate-50 dark:border-border-dark shadow-xl hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] hover:translate-y-[-10px] transition-all duration-700 flex flex-col h-full group animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center mb-16 text-authority-blue dark:text-signal-gold group-hover:scale-110 group-hover:rotate-6 transition-all shadow-inner" aria-hidden="true">
                  {React.cloneElement(pillar.icon as React.ReactElement, { size: 48 })}
                </div>
                <h3 className="text-3xl font-black uppercase font-serif text-authority-blue dark:text-white mb-3 leading-tight">{pillar.t}</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-signal-gold mb-10">{pillar.focus}</p>
                <p className="text-lg font-bold leading-relaxed mb-12 flex-grow text-slate-500 dark:text-slate-400">{pillar.d}</p>
                <Link to={pillar.link} className={`flex items-center justify-between w-full p-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 ${pillar.isTool ? 'bg-signal-gold text-authority-blue shadow-2xl border-b-4 border-amber-600' : 'bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold hover:bg-authority-blue hover:text-white border border-slate-100 dark:border-slate-700'}`}>
                  <span>{pillar.isTool ? 'Launch Tool' : 'View Module'}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR SECTION */}
      <section className="py-48 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" aria-hidden="true"></div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12 animate-reveal-up">
                    <h2 className="text-6xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-none">Who This <br/><span className="text-signal-gold italic">Is For.</span></h2>
                    <p className="text-2xl text-white/80 font-bold leading-relaxed">LaunchPath is for operators who want to run legally from the start and take audits seriously.</p>
                    <div className="space-y-6">
                        {[
                            "Operators who prioritize long-term stability",
                            "Carriers who refuse to skip compliance steps",
                            "Stewards who value order over early speed"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center space-x-6 group">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-signal-gold group-hover:text-authority-blue transition-all">
                                    <CheckCircle size={24} />
                                </div>
                                <span className="text-xl font-black uppercase tracking-tight">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white/5 border-2 border-white/20 p-12 lg:p-20 rounded-[5rem] backdrop-blur-xl animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center space-y-10">
                        <div className="inline-block p-6 bg-red-600 rounded-3xl shadow-2xl animate-pulse">
                            <ShieldAlert size={60} />
                        </div>
                        <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-signal-gold leading-none">Not for Seekers of Shortcuts</h3>
                        <p className="text-xl font-medium text-white/60 leading-relaxed italic">"This is NOT for people looking to rush loads or bypass federal sequencing. We build on systems, not gambles."</p>
                        <div className="h-px w-24 bg-white/20 mx-auto"></div>
                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-white/40">LaunchPath Exclusion Policy V4.0</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 9. INSTITUTIONAL CLARIFICATIONS BLOCK */}
      <section className="py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 text-center animate-reveal-up">
          <div className="mb-12 inline-block">
            <div className="w-24 h-24 bg-authority-blue rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(30,58,95,0.5)] border-4 border-white/10 group">
              <HelpCircle className="text-signal-gold group-hover:rotate-12 transition-transform" size={48} />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-[7rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter mb-10 leading-[0.85]">
            INSTITUTIONAL <br/><span className="text-signal-gold italic underline decoration-signal-gold/20 decoration-[12px] underline-offset-[16px]">CLARIFICATIONS</span>
          </h2>
          
          <p className="text-xl font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 mb-20 leading-relaxed">
            TRUTH OVER MARKETING. REALITY OVER PERSUASION. <br/>
            EXPLORE THE TECHNICAL REQUIREMENTS OF AUTHORITY.
          </p>

          <Link 
            to="/clarification" 
            className="group inline-flex items-center space-x-6 bg-authority-blue text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_-20px_rgba(30,58,95,0.4)] hover:bg-steel-blue hover:shadow-2xl transition-all active:scale-95 border-b-8 border-slate-900"
          >
            <span>VIEW SYSTEM REALITIES</span>
            <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-60 bg-[#020617] relative overflow-hidden text-center text-white border-t-[20px] border-signal-gold/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" aria-hidden="true"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-authority-blue/10 rounded-full blur-[200px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
          <div className="space-y-6 animate-reveal-up">
            <h2 className="text-7xl lg:text-[10rem] font-black font-serif mb-6 leading-[0.85] tracking-tighter uppercase">
                Build Your <br/><span className="text-signal-gold italic">Carrier</span> <br/>on Systems.
            </h2>
            <p className="text-[12px] font-black uppercase tracking-[0.8em] text-signal-gold/60">Transition From Administrative Volatility</p>
          </div>

          <p className="text-3xl text-white/80 font-black mb-24 max-w-4xl mx-auto leading-tight italic">
            "You don’t need another checklist. You need to know whether you’re ready."
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/pricing" className="w-full lg:w-auto bg-white text-authority-blue px-24 py-12 rounded-[4rem] font-black uppercase tracking-[0.4em] text-xl hover:bg-signal-gold hover:text-white transition-all shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] active:scale-95 border-b-[12px] border-slate-200">
              Initiate Admission Protocol
            </Link>
            <Link to="/contact" className="w-full lg:w-auto bg-transparent border-4 border-white/20 text-white px-16 py-12 rounded-[4rem] font-black uppercase tracking-[0.4em] text-lg hover:border-white hover:bg-white/5 transition-all active:scale-95 backdrop-blur-md">
              Contact Technical Support
            </Link>
          </div>

          <div className="pt-24 opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[1em] mb-4">Institutional Protocol LP-FINAL-2026</p>
            <p className="text-[11px] font-medium italic max-w-2xl mx-auto leading-relaxed">
              LaunchPath is an educational platform. Materials are for training purposes only and do not constitute legal, financial, or regulatory advice.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes reveal-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-up {
            animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .stagger-parent > * { opacity: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;
