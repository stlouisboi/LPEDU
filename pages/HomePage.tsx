
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
      title: "Chemical Dependency",
      sins: [
        { id: "01", text: "Lack of random drug program", impact: "Audit Failure" },
        { id: "02", text: "Positive driver results", impact: "Revocation" },
        { id: "03", text: "Federal Clearinghouse error", impact: "Violation" },
        { id: "04", text: "Omission of screening", impact: "Exposure" }
      ]
    },
    {
      title: "Driver Eligibility",
      sins: [
        { id: "05", text: "Revoked license use", impact: "OOS Event" },
        { id: "06", text: "Invalid medical certs", impact: "Downgrade" },
        { id: "07", text: "No DQ file framework", impact: "Audit Red Flag" },
        { id: "08", text: "Missing background inquiries", impact: "Default" }
      ]
    },
    {
      title: "Operational Safety",
      sins: [
        { id: "09", text: "Exceeding HOS limits", impact: "Negligence" },
        { id: "10", text: "Dispatching OOS vehicles", impact: "Termination" },
        { id: "11", text: "Poor duty status records", impact: "Multiplier" },
        { id: "12", text: "No vehicle inspections", impact: "Liability" }
      ]
    },
    {
      title: "Admin Integrity",
      sins: [
        { id: "13", text: "Unverified insurance levels", impact: "Blacklist" },
        { id: "14", text: "Missing filings (BOC-3)", impact: "Suspension" },
        { id: "15", text: "No maintenance program", impact: "Exposure" },
        { id: "16", text: "Late accident reporting", impact: "Legal Default" }
      ]
    }
  ];

  const pillars = [
    { 
      t: "Authority Protection", 
      focus: "Structural Fortress",
      d: "Establish a legal foundation designed to withstand federal scrutiny and separate personal assets from liability.", 
      icon: <Briefcase size={40} />,
      link: "/learning-path"
    },
    { 
      t: "Insurance Continuity", 
      focus: "Premium Stability",
      d: "Eliminate the “30-Day Trap.” Install the documentation processes underwriters require to maintain coverage.", 
      icon: <Shield size={40} />,
      link: "/clarification"
    },
    { 
      t: "Compliance Backbone", 
      focus: "16-Exposure Defense",
      d: "Replace guesswork with documented compliance. Install the Exposure-vs-Refuge framework for DQ files.", 
      icon: <Layers size={40} />,
      link: "/readiness"
    },
    { 
      t: "Cash-Flow Oxygen", 
      focus: "TCO Survival Math",
      d: "Eliminate revenue blindness. Use the TCO framework to identify real break-even thresholds and profit.", 
      icon: <Calculator size={40} />,
      link: "/tools/tco-calculator",
      isTool: true
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-center w-full bg-authority-blue overflow-hidden py-16 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 text-center lg:text-left space-y-8 lg:space-y-12">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white shadow-xl animate-reveal-up mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
                <span>Institutional FMCSA Standard LP-2026</span>
              </div>
              
              <h1 id="hero-heading" className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight sm:tracking-tighter text-white leading-[1] sm:leading-[0.95] font-serif uppercase drop-shadow-sm animate-reveal-up">
                Protect Your <br className="hidden sm:block"/><span className="text-signal-gold italic">Authority</span> <br className="hidden sm:block"/>Before Mistakes <br className="hidden sm:block"/>Cost You.
              </h1>
              
              <div className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-bold space-y-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
                <p>Establishing the systems required so paperwork, insurance, and federal audits do not shut your carrier down.</p>
                <div className="flex flex-col space-y-2">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-signal-gold">Target Environment:</p>
                    <p className="text-xs sm:text-sm font-bold text-white/70 italic uppercase tracking-widest leading-snug">First-time interstate motor carriers • Initial 90-Day Authority Window</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start pt-4 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-8 py-5 rounded-2xl font-black text-xs hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-xl border-b-4 border-slate-200">
                  Admission Protocol
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white hover:border-white px-8 py-5 rounded-2xl font-black text-xs transition-all flex items-center justify-center uppercase tracking-[0.2em] backdrop-blur-sm">
                  Reference Roadmap
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative animate-reveal-up w-full max-w-lg mx-auto" style={{ animationDelay: '0.3s' }}>
              <div className="relative bg-white dark:bg-surface-dark p-8 sm:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-t-4 border-signal-gold shadow-2xl">
                <div className="absolute top-8 right-8 text-authority-blue dark:text-signal-gold opacity-10" aria-hidden="true">
                  <ShieldAlert size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-2 leading-none font-serif">
                  Analyze <br/><span className="text-signal-gold italic">Risk Profile™</span>
                </h2>
                <p className="text-[10px] text-text-muted dark:text-text-dark-muted mb-8 font-black uppercase tracking-[0.3em] leading-relaxed">
                  Identification & Diagnostic
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="hero-name" className="block text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Legal Name</label>
                    <input id="hero-name" type="text" required placeholder="Jane Doe" className="w-full px-5 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl outline-none font-black text-base text-text-primary dark:text-white focus:border-authority-blue" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hero-email" className="block text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Registry Email</label>
                    <input id="hero-email" type="email" required placeholder="jane@carrier.com" className="w-full px-5 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl outline-none font-black text-base text-text-primary dark:text-white focus:border-authority-blue" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-steel-blue transition-all active:scale-[0.98] border-b-4 border-slate-900">
                    Generate Diagnostic Results
                  </button>
                  <p className="text-[9px] text-center text-slate-300 uppercase tracking-widest font-bold">Registry Uplink Active</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT LAUNCHPATH IS */}
      <section className="py-20 lg:py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-signal-gold mb-10 sm:mb-16">The Operating Definition</h2>
            <div className="space-y-10 sm:space-y-16">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white leading-tight uppercase tracking-tight">
                    LaunchPath is a <span className="text-signal-gold italic">90-Day Compliance System</span> for new trucking businesses.
                </p>
                <div className="h-px w-16 sm:w-20 bg-slate-100 dark:bg-slate-800 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left pt-6 sm:pt-10">
                    {[
                        { t: "No Shortcuts.", d: "We do not sell 'fast-tracks' that bypass federal requirements. We follow the law." },
                        { t: "No Rushed Filings.", d: "Authority is filed when the structural prerequisites are satisfied—not before." },
                        { t: "No Guesswork.", d: "We replace the 'figure it out later' mindset with documented, verified systems." }
                    ].map((item, i) => (
                        <div key={i} className="space-y-2 sm:space-y-3">
                            <h3 className="text-lg sm:text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight">{item.t}</h3>
                            <p className="text-sm sm:text-base text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed">{item.d}</p>
                        </div>
                    ))}
                </div>
                <div className="pt-8 sm:pt-12">
                    <p className="text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-white font-bold leading-relaxed max-w-2xl mx-auto italic">
                        "We help you build the paperwork, systems, and habits that keep your authority alive."
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. STRUCTURE BEATS MEMORY */}
      <section className="py-20 lg:py-40 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-[0.01] pointer-events-none" aria-hidden="true">
           <Server size={1000} className="text-authority-blue absolute -left-1/4 top-0" />
        </div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
            <div className="text-center mb-16 sm:mb-24 space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold bg-white dark:bg-white/5 px-4 sm:px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm mx-auto">
                    <Scale size={16} />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em]">The Core Philosophy</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-[6.5rem] font-black text-authority-blue dark:text-white uppercase tracking-tight sm:tracking-tighter leading-[1.1] sm:leading-[0.85] font-serif">
                    STRUCTURE BEATS <br className="hidden sm:block"/><span className="text-signal-gold italic underline decoration-signal-gold/20 decoration-[6px] sm:decoration-[12px] underline-offset-[8px] sm:underline-offset-[14px]">MEMORY.</span>
                </h2>
                <div className="space-y-4">
                    <p className="text-lg sm:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                        You shouldn’t have to remember everything to stay compliant. 
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        DOT, insurance companies, and auditors don’t care how busy you are—they care whether the paperwork is complete. When the system is solid, audits stop being emergencies.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 relative">
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-700 -z-10" aria-hidden="true"></div>
                {[
                    { t: "Right Sequence.", d: "Setting things up in the correct order to prevent administrative fallout.", icon: <Settings />, code: "SEQ-01" },
                    { t: "Complete Records.", d: "Keeping required records consistent and fully documented as events happen.", icon: <ClipboardList />, code: "ARCH-02" },
                    { t: "Risk Elimination.", d: "Ensuring nothing critical is missing before federal monitoring triggers.", icon: <Target />, code: "CTRL-03" }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-xl border border-slate-100 dark:border-white/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-700 relative overflow-hidden">
                        <div className="absolute top-4 right-6 text-[8px] font-black text-slate-200 dark:text-slate-700 uppercase tracking-widest">{item.code}</div>
                        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-slate-50 dark:bg-gray-700 text-authority-blue dark:text-signal-gold rounded-xl sm:rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mb-6 sm:mb-10">
                            {React.cloneElement(item.icon as React.ReactElement, { size: 36 })}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 sm:mb-3 font-serif">{item.t}</h3>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                        <div className="mt-6 sm:mt-10 pt-5 sm:pt-8 border-t border-slate-50 dark:border-white/5 w-full flex justify-center">
                            <div className="flex items-center space-x-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-signal-gold transition-colors">
                                <CheckCircle size={12} />
                                <span>Verified Implementation</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 sm:mt-24 text-center">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-600 italic">
                    Institutional Standard: Order Before Momentum
                </p>
            </div>
        </div>
      </section>

      {/* 4. RISKS UNDERESTIMATED */}
      <section className="py-20 lg:py-40 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 lg:p-24 opacity-[0.03] pointer-events-none" aria-hidden="true">
           <Fingerprint size={600} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            
            <div className="space-y-8 lg:space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center space-x-4 bg-logo-red/10 border border-logo-red/30 px-4 py-2 rounded-xl shadow-sm mx-auto lg:mx-0">
                <ShieldAlert className="text-logo-red animate-pulse" size={18} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-logo-red">Exposure Alert</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight sm:tracking-tighter leading-[1] sm:leading-[0.9] font-serif">
                  THE RISKS <br/>MANY <br/>
                  <span className="text-logo-red italic underline decoration-logo-red/20 decoration-[6px] sm:decoration-[8px] underline-offset-4">NEW <br className="sm:hidden"/>ENTRANTS</span> <br/>
                  UNDERESTIMATE
                </h2>
              </div>
              
              <div className="space-y-6 sm:space-y-10 max-w-xl mx-auto lg:mx-0">
                <div className="flex space-x-5 sm:space-x-8 items-start text-left">
                   <div className="w-1.5 h-16 sm:h-24 bg-logo-red rounded-full shrink-0" aria-hidden="true"></div>
                   <p className="text-lg sm:text-2xl lg:text-3xl font-black leading-tight text-white/90">
                     The first 90 days are the most dangerous. Not because of driving—but because of paperwork gaps.
                   </p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-slate-400 font-medium leading-relaxed border-l border-white/10 pl-5 sm:pl-8 ml-1 text-left">
                  Regulators analyze carrier data for specific administrative gaps. Gaps trigger audits, insurance cancellations, and shutdowns. LaunchPath helps you see those risks before they turn into violations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 text-left">
                {[
                    "Driver qualification files",
                    "Drug & alcohol compliance",
                    "Insurance continuity",
                    "Maintenance & logbook records"
                ].map((risk, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-logo-red"></div>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/70">{risk}</span>
                    </div>
                ))}
              </div>
            </div>

            <div className="relative group w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
               <div className="absolute -inset-10 lg:-inset-20 bg-authority-blue/10 rounded-[4rem] lg:rounded-[8rem] blur-[80px] lg:blur-[120px] opacity-30"></div>
               
               <div className="relative w-full max-w-[500px] bg-white dark:bg-surface-dark border-[1px] border-slate-100 dark:border-border-dark p-8 sm:p-10 lg:p-14 rounded-[2.5rem] lg:rounded-[4.5rem] shadow-2xl space-y-8 lg:space-y-12 transition-all group-hover:shadow-[0_80px_160px_-50px_rgba(0,0,0,0.6)] overflow-hidden text-center sm:text-left">
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-authority-blue dark:text-white font-serif leading-tight">
                      IDENTIFICATION <br className="hidden sm:block"/> & ALIGNMENT
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Registry Standard LP-01</p>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    {[
                      "DRUG & ALCOHOL COMPLIANCE",
                      "DRIVER QUALIFICATION STANDARDS",
                      "INSURANCE & FISCAL SOLVENCY",
                      "MAINTENANCE & HOS GOVERNANCE"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center space-x-5 sm:space-x-8 p-5 sm:p-7 bg-slate-50/50 dark:bg-gray-800/40 rounded-xl sm:rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-500">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 border border-slate-100 dark:border-slate-600 rounded-lg sm:rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-inner shrink-0">
                           <ShieldCheck size={20} />
                         </div>
                         <span className="text-xs sm:text-sm lg:text-base font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-authority-blue dark:text-white leading-tight text-left">
                           {text}
                         </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 sm:pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-4 sm:items-end opacity-60">
                     <div className="flex items-center justify-center sm:justify-start space-x-3">
                        <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                           <Lock size={14} className="text-slate-500 dark:text-text-dark-muted" />
                        </div>
                        <span className="block text-[8px] font-black uppercase tracking-[0.5em] text-slate-500 dark:text-text-dark-muted leading-none">Protocol Active</span>
                     </div>
                     <div className="text-center sm:text-right">
                        <span className="block text-[8px] font-black text-slate-500 dark:text-text-dark-muted tracking-[0.2em]">ADMIN_V_LAWRENCE</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE 16 DEADLY SINS */}
      <section className="py-20 lg:py-40 bg-slate-100 dark:bg-primary-dark border-y border-slate-200 dark:border-border-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative">
          
          <div className="flex flex-col items-center text-center mb-12 sm:mb-24 space-y-6 lg:space-y-8">
            <div className="inline-flex items-center space-x-3 sm:space-x-4 bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] shadow-xl animate-reveal-up">
              <Skull size={14} className="animate-pulse" />
              <span>Audit Failure Vectors</span>
            </div>
            <h2 id="sins-heading" className="text-4xl sm:text-6xl lg:text-[7rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight sm:tracking-tighter leading-[1] sm:leading-[0.85] animate-reveal-up">
              The 16 <br/><span className="text-red-600 italic underline decoration-red-600/20 decoration-[6px] sm:decoration-[10px] underline-offset-[10px] sm:underline-offset-[16px]">Deadly Sins.</span>
            </h2>
            <div className="max-w-3xl space-y-4 animate-reveal-up">
                <p className="text-lg sm:text-2xl text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed">
                These gaps trigger 85% of audit failures. Most shutdowns happen because small mistakes pile up.
                </p>
                <p className="text-[9px] text-red-600 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] italic leading-relaxed px-4">
                “The wise are cautious and avoid danger.” — Proverbs 14:16
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
            {deadlySinsCategories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-8 animate-reveal-up" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                <div className="flex items-center space-x-4 sm:space-x-5 border-b-2 border-slate-200 dark:border-border-dark pb-4 sm:pb-5">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-authority-blue dark:bg-gray-800 text-signal-gold rounded-lg sm:rounded-2xl flex items-center justify-center text-base sm:text-xl font-black shadow-md">
                    0{catIdx + 1}
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {category.sins.map((sin, sinIdx) => (
                    <div key={sinIdx} className="group relative bg-white dark:bg-surface-dark p-6 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-700 flex flex-col justify-between overflow-hidden min-h-[140px] sm:min-h-[160px]">
                      <span className="absolute -top-4 -right-4 text-5xl sm:text-7xl font-black text-slate-50 dark:text-slate-800/10 pointer-events-none transition-colors duration-700">
                        {sin.id}
                      </span>

                      <div className="relative z-10 space-y-3 sm:space-y-4">
                        <p className="text-base sm:text-lg lg:text-xl font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tight">
                          {sin.text}
                        </p>
                        <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-red-50 dark:bg-red-950/40 rounded-lg border border-red-100 dark:border-red-900/30">
                           <Zap size={12} className="text-red-600 dark:text-red-400" />
                           <span className="text-[8px] font-black uppercase tracking-[0.1em] text-red-700 dark:text-red-300">
                             Impact: {sin.impact}
                           </span>
                        </div>
                      </div>

                      <div className="absolute left-0 top-0 h-full w-1 bg-slate-100 dark:bg-gray-800 group-hover:bg-red-600 transition-colors duration-700"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 sm:mt-24 p-8 sm:p-12 bg-authority-blue rounded-[2.5rem] sm:rounded-[3.5rem] text-center relative overflow-hidden shadow-2xl animate-reveal-up mx-auto">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
             <p className="relative z-10 text-white text-base sm:text-lg font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 leading-none">Institutional Guideline</p>
             <p className="relative z-10 text-white/80 max-w-4xl mx-auto text-sm sm:text-lg lg:text-xl font-medium leading-relaxed italic border-l-4 border-signal-gold pl-5 sm:pl-10 text-left sm:text-center">
               "The FMCSA does not grade on a curve. Each of these 16 items represents a critical system component. Fixes happen inside the system — identification is the first step toward stewardship."
             </p>
          </div>
        </div>
      </section>

      {/* 6. THE REACH TEST */}
      <section className="py-20 lg:py-40 bg-[#F8FAFC] dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="text-center mb-16 lg:mb-24 space-y-6 sm:space-y-8 animate-reveal-up">
            <div className="flex items-center justify-center space-x-4 sm:space-x-8">
              <div className="h-[1px] w-12 sm:w-24 bg-authority-blue/20 dark:bg-white/10"></div>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-authority-blue dark:text-slate-400 leading-none">Readiness Check Protocol</span>
              <div className="h-[1px] w-12 sm:w-24 bg-authority-blue/20 dark:bg-white/10"></div>
            </div>
            
            <h2 className="text-4xl sm:text-6xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white tracking-tight sm:tracking-tighter uppercase leading-[1.1] sm:leading-[0.85]">
              THE <span className="text-signal-gold italic border-b-[6px] sm:border-b-[16px] border-signal-gold/30 rounded-full px-2 sm:px-4 pb-1">REACH</span> TEST™
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
                <p className="text-xl sm:text-3xl text-slate-800 dark:text-text-dark-primary font-black italic tracking-tight leading-relaxed px-4">
                "A readiness check to see if your business can survive audits, insurance reviews, and real-world pressure."
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-slate-500 font-medium leading-relaxed px-4">Before you file authority or start running loads, we help you answer one question: <br className="hidden sm:block"/><span className="text-authority-blue dark:text-white font-bold">Is the system ready — or am I guessing?</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
            {[
                { l: "OVER", t: "Regulatory Scrutiny", d: "Identifying paperwork gaps that lead to automatic audit failure.", i: <MoveDown /> },
                { l: "AROUND", t: "Insurance Lapses", d: "Spotting administrative shortcuts that trigger non-renewals.", i: <MoveRight /> },
                { l: "THROUGH", t: "System Inconsistency", d: "Finding data conflicts that signal a loss of safety control.", i: <MoveLeft /> },
                { l: "UNDER", t: "Financial Collapse", d: "Calculating break-even points to ensure fiscal survival.", i: <MoveUp /> }
            ].map((test, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-slate-100 dark:border-border-dark hover:shadow-xl hover:translate-y-[-8px] transition-all duration-700 group flex items-start space-x-6 sm:space-x-12 animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-slate-50 dark:bg-gray-800 p-5 sm:p-8 rounded-xl sm:rounded-[2rem] group-hover:bg-authority-blue group-hover:text-white transition-all duration-500 shrink-0 shadow-inner">
                  {React.cloneElement(test.i as React.ReactElement, { size: 28, className: 'text-signal-gold group-hover:text-white transition-colors' })}
                </div>
                <div className="space-y-2 sm:space-y-3 text-left">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-slate-400 group-hover:text-signal-gold transition-colors leading-none">{test.l}</p>
                  <h3 className="text-xl sm:text-3xl font-black font-serif text-authority-blue dark:text-white tracking-tight uppercase leading-none">{test.t}</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{test.d}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 sm:mt-24 text-center animate-reveal-up">
            <Link to="/readiness" className="group inline-flex items-center space-x-4 sm:space-x-5 bg-authority-blue text-white px-10 py-5 sm:px-16 sm:py-8 rounded-2xl sm:rounded-[2.5rem] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-[11px] hover:bg-steel-blue transition-all shadow-xl active:scale-95 border-b-4 border-slate-900">
              <MousePointer2 className="group-hover:rotate-12 transition-transform" size={18} />
              <span>Analyze Risk Profile</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. THE FOUR PILLARS */}
      <section className="py-20 lg:py-40 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="text-center mb-16 lg:mb-24 space-y-6 lg:space-y-8 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold mb-2 mx-auto">
              <Scale size={24} />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.6em] sm:tracking-[0.7em] leading-none">System Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-[7.5rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight sm:tracking-tighter leading-[1] sm:leading-[0.85]">The Four <span className="text-signal-gold italic underline decoration-signal-gold/20 lg:decoration-[12px] underline-offset-[10px] lg:underline-offset-[12px]">Pillars</span></h2>
            <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6 px-4">
                <p className="text-lg sm:text-2xl text-text-muted dark:text-text-dark-muted font-bold leading-relaxed">
                "The Four Pillars determine whether a new carrier keeps its authority active."
                </p>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 italic mt-4 uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black leading-snug">
                “Work brings profit, but mere talk leads to poverty.” — Proverbs 14:23
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 sm:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[4rem] border-2 border-slate-50 dark:border-border-dark shadow-xl hover:shadow-2xl transition-all duration-700 flex flex-col h-full group animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-slate-50 dark:bg-gray-800 rounded-xl sm:rounded-[2.5rem] flex items-center justify-center mb-8 lg:mb-12 text-authority-blue dark:text-signal-gold group-hover:scale-110 transition-all shadow-inner">
                  {React.cloneElement(pillar.icon as React.ReactElement, { size: 36 })}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase font-serif text-authority-blue dark:text-white mb-2 leading-tight tracking-tight">{pillar.t}</h3>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-signal-gold mb-6 sm:mb-8 leading-none">{pillar.focus}</p>
                <p className="text-sm sm:text-base lg:text-lg font-bold leading-relaxed mb-8 flex-grow text-slate-500 dark:text-slate-400">{pillar.d}</p>
                <Link to={pillar.link} className={`flex items-center justify-between w-full p-5 lg:p-6 rounded-xl sm:rounded-[2rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all active:scale-95 ${pillar.isTool ? 'bg-signal-gold text-authority-blue shadow-lg border-b-4 border-amber-600' : 'bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold hover:bg-authority-blue hover:text-white border border-slate-100 dark:border-slate-700'}`}>
                  <span>{pillar.isTool ? 'Launch Tool' : 'View Module'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section className="py-20 lg:py-40 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
                <div className="space-y-10 lg:space-y-12 animate-reveal-up text-center lg:text-left">
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif uppercase tracking-tight sm:tracking-tighter leading-none">Who This <br className="hidden sm:block"/><span className="text-signal-gold italic">Is For.</span></h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/80 font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0">LaunchPath is for operators who want to run legally from the start and take audits seriously.</p>
                    <div className="space-y-4 sm:space-y-6 text-left max-w-lg mx-auto lg:mx-0">
                        {[
                            "Operators who prioritize stability",
                            "Carriers who refuse shortcuts",
                            "Stewards who value order"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center space-x-5 sm:space-x-6 group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-signal-gold group-hover:text-authority-blue transition-all shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <span className="text-base sm:text-lg lg:text-xl font-black uppercase tracking-tight leading-tight">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white/5 border border-white/20 p-8 sm:p-10 lg:p-14 rounded-[2.5rem] lg:rounded-[4.5rem] backdrop-blur-xl animate-reveal-up mt-8 lg:mt-0" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center space-y-6 sm:space-y-10">
                        <div className="inline-block p-6 bg-red-600 rounded-2xl lg:rounded-[2.5rem] shadow-2xl animate-pulse">
                            <ShieldAlert size={40} className="sm:size-[48px]" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-signal-gold leading-none">Not for Seekers of Shortcuts</h3>
                        <p className="text-base sm:text-lg font-medium text-white/60 leading-relaxed italic px-4">"This is NOT for people looking to rush loads or bypass federal sequencing. We build on systems, not gambles."</p>
                        <div className="h-px w-12 sm:w-16 bg-white/20 mx-auto"></div>
                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Exclusion Policy V4.0</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 sm:py-32 lg:py-48 bg-[#020617] relative overflow-hidden text-center text-white border-t-[8px] sm:border-t-[16px] border-signal-gold/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-authority-blue/10 rounded-full blur-[100px] sm:blur-[200px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-10 sm:space-y-16">
          <div className="space-y-4 animate-reveal-up">
            <h2 className="text-4xl sm:text-6xl lg:text-[7.5rem] font-black font-serif mb-4 leading-[1] sm:leading-[0.85] tracking-tight sm:tracking-tighter uppercase">
                Build Your <br className="sm:hidden"/><span className="text-signal-gold italic">Carrier</span> <br className="hidden sm:block"/>on Systems.
            </h2>
            <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.8em] text-signal-gold/60 leading-none">Transition From Volatility</p>
          </div>

          <p className="text-lg sm:text-2xl lg:text-3xl text-white/80 font-black mb-12 sm:mb-20 max-w-4xl mx-auto leading-tight italic px-4">
            "You don’t need another checklist. <br className="hidden sm:block"/>You need to know whether you’re ready."
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/pricing" className="w-full lg:w-auto bg-white text-authority-blue px-16 py-9 md:px-24 md:py-10 lg:px-36 lg:py-14 rounded-[2.5rem] md:rounded-[4rem] font-black uppercase tracking-[0.4em] text-xs sm:text-base lg:text-xl hover:bg-signal-gold hover:text-white transition-all shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] active:scale-95 border border-slate-100 border-b-[10px] sm:border-b-[16px] border-b-slate-200 leading-none">
              Initiate Admission Protocol
            </Link>
            <Link to="/contact" className="w-full lg:w-auto bg-transparent border-2 border-white/20 text-white px-10 py-6 sm:px-16 sm:py-8 rounded-2xl sm:rounded-[3rem] font-black uppercase tracking-[0.3em] text-[11px] sm:text-base hover:border-white hover:bg-white/5 transition-all active:scale-95 backdrop-blur-md leading-none">
              Technical Support
            </Link>
          </div>

          <div className="pt-12 sm:pt-24 opacity-30 px-6">
            <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] sm:tracking-[1em] mb-4">Protocol LP-FINAL-2026</p>
            <p className="text-[9px] sm:text-[11px] font-medium italic max-w-2xl mx-auto leading-relaxed">
              LaunchPath is an educational platform. Materials are for training purposes only and do not constitute legal or financial advice.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes reveal-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-up {
            animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;
