import React, { useState, useEffect, useRef } from 'react';
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
  Lock,
  Zap,
  Activity,
  ShieldAlert,
  XCircle,
  ShieldCheck,
  Target,
  ChevronDown,
  Award,
  Truck,
  HelpCircle,
  AlertCircle,
  ClipboardCheck,
  FileText,
  DollarSign,
  CreditCard,
  Users,
  UserCheck,
  Scale,
  Anchor,
  User,
  ExternalLink,
  ShieldX,
  FileWarning,
  HardDrive,
  Fingerprint,
  Gavel,
  X,
  MessageSquare,
  BookOpen,
  Building,
  Cpu,
  Workflow,
  RefreshCw,
  Terminal,
  Search,
  FileSearch,
  Scan,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';

const FAQItem: React.FC<{ 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  icon: React.ReactNode;
  onClick: () => void 
}> = ({ question, answer, isOpen, icon, onClick }) => {
  return (
    <article className={`border transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
      isOpen 
      ? 'border-authority-blue bg-white dark:bg-surface-dark shadow-2xl ring-1 ring-authority-blue/5' 
      : 'border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm hover:border-authority-blue/30'
    }`}>
      <h3>
        <button 
          onClick={onClick}
          className="w-full flex items-center justify-between p-6 sm:p-10 text-left focus:outline-none group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isOpen ? 'bg-[#002244] text-[#C5A059] shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'
            }`}>
              {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${
              isOpen ? 'text-[#002244] dark:text-[#C5A059]' : 'text-slate-700 dark:text-text-dark-primary'
            }`}>
              {question}
            </span>
          </div>
          <div className={`p-3 rounded-full transition-all duration-500 ${
            isOpen ? 'bg-[#002244] text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'
          }`}>
            <ChevronDown className="w-6 h-6" />
          </div>
        </button>
      </h3>
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-10' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 sm:px-12 pt-0 text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 pt-8">
            <p className="text-lg sm:text-xl whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'syncing' | 'complete'>('idle');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const scanSteps = [
    "INITIALIZING_NEURAL_UPLINK...",
    "MAPPING_EXPOSURE_VECTORS...",
    "CROSS_REFERENCING_49_CFR_PART_382...",
    "IDENTIFYING_AUTHORITY_GAP_PATTERNS...",
    "SEQUENCING_90_DAY_REMEDIATION...",
    "AUTHORIZATION_GRANTED."
  ];

  const handleRiskMapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setScanState('scanning');
    
    for (let i = 0; i < scanSteps.length; i++) {
      setScanLog(prev => [...prev, scanSteps[i]]);
      await new Promise(r => setTimeout(r, 600));
    }

    setScanState('syncing');
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-hero-risk-map"
        });
      }

      await syncToMailerLite({
        email: formData.email,
        fields: { name: formData.firstName }
      });
      
      setScanState('complete');
      await new Promise(r => setTimeout(r, 500));
      navigate(destination);
    } catch (err) {
      console.error("Submission Sequence Error:", err);
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  const riskDomains = [
    {
      domain: "Substance Governance",
      id: "DOMAIN_01",
      icon: <FileWarning className="text-red-500" />,
      items: [
        { id: "01", text: "Absence of random pool enrollment", result: "AUDIT DEFAULT", guard: "RANDOM TESTING ENROLLMENT", severity: "TERMINAL" },
        { id: "02", text: "Positive driver results (Unmanaged)", result: "IMMEDIATE REVOCATION", guard: "RESULTS MANAGEMENT SYSTEM", severity: "TERMINAL" },
        { id: "03", text: "Clearinghouse query failure", result: "OPERATING BAN", guard: "CLEARINGHOUSE QUERY PROCESS", severity: "CRITICAL" },
        { id: "04", text: "Omission of pre-employment test", result: "STRICT LIABILITY", guard: "PRE-EMPLOYMENT SCREENING", severity: "HIGH RISK" }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      items: [
        { id: "05", text: "Revoked/Expired license usage", result: "OOS EVENT", guard: "LICENSE VERIFICATION WORKFLOW", severity: "TERMINAL" },
        { id: "06", text: "Missing Med-Cert verification", result: "DRIVER DOWN GRADE", guard: "MEDICAL CERTIFICATE TRACKING", severity: "CRITICAL" },
        { id: "07", text: "Fragmented DQ File framework", result: "AUDIT RED FLAG", guard: "DQ FILE BUILDER", severity: "HIGH RISK" },
        { id: "08", text: "Omitted background inquiries", result: "NEGLIGENT ENTRUSTMENT", guard: "BACKGROUND CHECK PROTOCOL", severity: "CRITICAL" }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      items: [
        { id: "09", text: "Falsification of HOS records", result: "CRIMINAL DEFAULT", guard: "HOURS OF SERVICE COMPLIANCE", severity: "TERMINAL" },
        { id: "10", text: "Dispatching OOS vehicles", result: "AUTHORITY SEIZURE", guard: "VEHICLE INSPECTION SYSTEM", severity: "TERMINAL" },
        { id: "11", text: "Deficient roadside history (CSA)", result: "PREMIUM SPIKE", guard: "SAFETY SCORE MONITORING", severity: "HIGH RISK" },
        { id: "12", text: "No systematic maintenance log", result: "LIABILITY DEFAULT", guard: "MAINTENANCE DOCUMENTATION", severity: "CRITICAL" }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      items: [
        { id: "13", text: "Insurance coverage lapse", result: "AUTHORITY TERMINATION", guard: "INSURANCE MONITORING SYSTEM", severity: "TERMINAL" },
        { id: "14", text: "Failure to update MCS-150", result: "ADMINISTRATIVE REVOCATION", guard: "MCS-150 UPDATE PROTOCOL", severity: "CRITICAL" },
        { id: "15", text: "BOC-3 Process agent omission", result: "FILING SUSPENSION", guard: "BOC-3 PROCESS AGENT FILING", severity: "HIGH RISK" },
        { id: "16", text: "Late Incident/Accident reporting", result: "LEGAL DEFAULT", guard: "ACCIDENT REPORTING PROTOCOL", severity: "CRITICAL" }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-[#FAF9F6] dark:bg-primary-dark font-sans leading-relaxed selection:bg-[#C5A059]/20">
      
      {/* TASK 1: HERO RESTRUCTURE - 60/40 SPLIT-SCREEN "RISK MAP™" */}
      <section className="relative min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        {/* LEFT COLUMN: THE UPLINK (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-12 animate-reveal-up">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full w-fit">
                <ShieldCheck size={14} className="text-[#C5A059]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">VETERAN OWNED & OPERATED</span>
              </div>
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full w-fit">
                <Award size={14} className="text-[#C5A059]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">OSHA-CERTIFIED SAFETY COORDINATOR</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                PROTECT <br/>YOUR <br/><span className="text-[#C5A059]">AUTHORITY</span><br/>WITH <br/>ORDER.
              </h1>
            </div>
            
            <div className="max-w-xl border-l-[12px] border-[#C5A059] pl-10 py-4">
              <p className="text-2xl font-bold text-white/90 leading-[1.6]">
                Most new carriers satisfactorily establish their compliance infrastructure within the first 90 days — or inherit the consequences for 18 months.
              </p>
            </div>

            <div className="pt-8">
              <Link to="/readiness" className="inline-flex items-center space-x-6 bg-[#C5A059] text-[#002244] px-12 py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE DIAGNOSTIC TERMINAL (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-100 dark:bg-slate-900 relative p-8 md:p-16 flex items-center">
          <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] shadow-[0_60px_120px_-30px_rgba(0,34,68,0.2)] border border-slate-100 dark:border-white/5 relative overflow-hidden group w-full flex flex-col">
            <div className="absolute top-6 left-6">
              <div className="bg-[#C5A059] text-[#002244] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg">FREE ACCESS</div>
            </div>
            
            <div className="relative z-10 flex flex-col flex-grow">
              {scanState === 'idle' ? (
                <>
                  <header className="mb-10 mt-12">
                       <h3 className="text-[3.5rem] font-black font-serif uppercase tracking-tighter text-[#002244] dark:text-white leading-[0.8]">
                         90 DAY <br/>
                         <span className="text-[#C5A059] italic">RISK MAP™</span>
                       </h3>
                       <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-6 border-t border-slate-100 pt-6">Diagnostic Orientation Terminal</p>
                  </header>
                  
                  <form onSubmit={handleRiskMapSubmit} className="space-y-6 flex-grow">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 ml-4">LEGAL ENTITY NAME</label>
                      <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-[#002244] dark:focus:border-[#C5A059] outline-none px-6 py-5 rounded-3xl font-black text-lg transition-all text-[#002244] dark:text-white" placeholder="JANE DOE" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 ml-4">REGISTRY EMAIL</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-[#002244] dark:focus:border-[#C5A059] outline-none px-6 py-5 rounded-3xl font-black text-lg transition-all text-[#002244] dark:text-white" placeholder="JANE@CARRIER.COM" />
                    </div>
                    <button type="submit" className="w-full bg-[#002244] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-xl hover:bg-[#003366] transition-all flex items-center justify-center group border-b-8 border-slate-900">
                      VIEW MY RISK MAP <ChevronRight className="ml-3 group-hover:translate-x-1" size={20} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-20 text-center space-y-8 animate-in fade-in">
                  <div className="w-20 h-20 rounded-full border-8 border-[#002244]/10 border-t-[#002244] animate-spin mx-auto"></div>
                  <div className="bg-slate-50 dark:bg-black/40 rounded-3xl p-6 border font-mono text-[10px] text-[#002244] dark:text-emerald-500 text-left h-48 overflow-hidden relative shadow-inner">
                    <div className="space-y-2">
                      {scanLog.map((log, i) => <div key={i}>[{new Date().toLocaleTimeString([], {hour12:false})}] {log}</div>)}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#002244] dark:text-emerald-500 flex items-center">
                  <ShieldCheck size={14} className="mr-2" /> UPLINK ACTIVE
                </p>
                <p className="text-[9px] font-black text-slate-300 uppercase">LP-SYS-V4.5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 1: THE "WHY" - FOUNDER NARRATIVE */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-12">
              <div className="relative group max-w-[480px]">
                <div className="bg-[#002244] rounded-[4rem] shadow-2xl overflow-hidden relative border-[12px] border-[#FAF9F6]">
                  <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince Lawrence" className="w-full h-auto grayscale opacity-95 group-hover:grayscale-0 transition-all duration-1000 object-top" />
                  <div className="absolute bottom-0 left-0 w-full bg-[#002244]/90 backdrop-blur-md py-6 text-center border-t border-white/10">
                    <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em]">SYSTEM CUSTODIAN</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 bg-[#C5A059] p-8 rounded-[2.5rem] shadow-2xl border-8 border-white hidden sm:block z-20 group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="text-[#002244]" size={48} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              <header className="space-y-6">
                <p className="text-[13px] font-black uppercase tracking-[0.6em] text-slate-400">THE PATTERN</p>
                <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-[0.9]">
                  I'VE WATCHED THIS <br/><span className="text-red-600 italic">FAIL</span> 200 TIMES.
                </h2>
              </header>

              <div className="space-y-10 text-2xl font-bold text-slate-600 dark:text-slate-300 leading-[1.6] border-l-[12px] border-slate-100 dark:border-border-dark pl-12">
                <p>
                  I spent 25 years in manufacturing leadership and 7 years in the U.S. Navy. In those environments, <span className="text-[#002244] dark:text-white font-black">systems weren't elective; they were survival.</span>
                </p>
                <p>
                  When I moved into motor carrier operations, I saw good men—hard workers with clean records—lose their authority in 90 days. Not because they couldn't drive, but because the industry sold them <span className="text-[#C5A059] font-black italic">"hustle"</span> while the FMCSA demanded <span className="text-[#C5A059] font-black">"infrastructure."</span>
                </p>
                <p className="text-3xl font-black text-[#002244] dark:text-white font-serif tracking-tight leading-tight">
                  I refuse to reverse the order of wisdom. <br/><span className="text-[#C5A059] italic">Order precedes revenue.</span>
                </p>
              </div>

              <div className="pt-10">
                <Link to="/about" className="inline-flex items-center space-x-3 text-xs font-black uppercase tracking-[0.4em] text-[#002244] dark:text-[#C5A059] hover:underline group">
                  <span>READ THE FULL TECHNICAL BRIEF</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 1: THE FILTER - SYSTEM ACCESS WARNING */}
      <section className="py-24 md:py-48 bg-[#002244] text-white relative overflow-hidden border-y-[15px] border-[#C5A059]/10">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-6 space-y-12">
              <div className="inline-flex items-center space-x-4 bg-red-600/10 border border-red-600/30 px-8 py-3 rounded-full">
                 <ShieldAlert size={18} className="text-red-500" />
                 <span className="text-[12px] font-black uppercase tracking-[0.5em] text-red-400">ENTRY CRITERIA REQUIRED</span>
              </div>
              <h2 className="text-5xl md:text-[6.5rem] font-black font-serif uppercase tracking-tighter leading-[0.85]">
                SYSTEM ACCESS <br/><span className="text-red-600 italic">WARNING.</span>
              </h2>
              <div className="h-4 w-48 bg-red-600"></div>
              <p className="text-3xl font-bold text-slate-300 leading-relaxed max-w-xl">
                The LaunchPath Operating Standard™ is an engineered 90-day implementation system—not a "side-hustle" course.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-10">
              {[
                { 
                  title: "CAPITAL FILTER", 
                  desc: "Admission requires a $2,500 one-time investment. This ensures every carrier is capitalized for the regulatory rigor required to survive." 
                },
                { 
                  title: "DOCUMENTATION COMMITMENT", 
                  desc: "You will execute clinical record-keeping protocols. If you are not prepared for OSHA-level documentation standards, do not apply." 
                },
                { 
                  title: "SYSTEMS OVER HUSTLE", 
                  desc: "We prioritize administrative order over 'load board hustle.' LaunchPath is built for carrier executives, not freight-chasers." 
                }
              ].map((filter, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 p-12 rounded-[3.5rem] hover:bg-white/[0.06] transition-all group">
                  <h4 className="text-2xl font-black uppercase tracking-widest text-[#C5A059] mb-4 font-serif">{filter.title}</h4>
                  <p className="text-xl text-slate-400 font-bold leading-relaxed">{filter.desc}</p>
                </div>
              ))}
              <div className="pt-12">
                <Link to="/readiness" className="w-full bg-red-600 text-white py-10 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center group border-b-[12px] border-slate-900">
                  VALIDATE MY ELIGIBILITY <ChevronRight className="ml-4 group-hover:translate-x-2" size={28} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 1: THE ANATOMY OF FAILURE - 16 DEADLY SINS */}
      <section id="exposure-matrix" className="bg-[#020617] py-24 lg:py-48 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          
          <header className="mb-32 flex flex-col items-center text-center space-y-8">
             <div className="w-24 h-24 bg-red-600/10 text-red-500 rounded-[2.5rem] flex items-center justify-center mb-10 border-2 border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
               <ShieldX size={40} />
             </div>
             <div className="space-y-4">
                <p className="text-[13px] font-black uppercase tracking-[0.8em] text-red-500">The Exposure Taxonomy</p>
                <h2 className="text-6xl md:text-[6.5rem] font-black font-serif text-white uppercase tracking-tighter leading-[0.85]">
                  THE 16 DEADLY SINS OF <br/><span className="text-red-600 italic">CARRIER FAILURE.</span>
                </h2>
             </div>
             <p className="text-2xl font-bold text-slate-500 max-w-4xl leading-relaxed uppercase tracking-tight">
               IDENTIFICATION OF THE FAILURE PATTERNS USED BY FMCSA INVESTIGATORS TO INITIATE ENFORCEMENT.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20">
            {riskDomains.map((domain, dIdx) => (
              <div key={dIdx} className="space-y-12 animate-reveal-up" style={{ animationDelay: `${dIdx * 0.1}s` }}>
                <header className="flex items-center justify-between border-b border-white/10 pb-8">
                   <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-inner">
                        {React.cloneElement(domain.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tight font-serif">{domain.domain}</h3>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-1">{domain.id} // SECURE_ARCHIVE</p>
                      </div>
                   </div>
                   <div className="hidden sm:flex flex-col items-end">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Vectors</p>
                      <p className="text-5xl font-black text-white font-mono">04</p>
                   </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {domain.items.map((item) => (
                    <article key={item.id} className="bg-[#0c1a2d] border border-white/5 p-10 rounded-[3rem] flex flex-col space-y-10 group hover:border-[#C5A059]/40 transition-all duration-500 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                          <Terminal size={100} />
                       </div>
                       <header className="space-y-4">
                          <span className="text-[10px] font-black text-slate-600 font-mono tracking-tighter block">{item.id}</span>
                          <h4 className="text-xl font-black text-white uppercase leading-tight tracking-tight group-hover:text-[#C5A059] transition-colors min-h-[60px]">{item.text}</h4>
                       </header>
                       
                       <div className="space-y-6 flex-grow">
                          <div className="flex justify-between items-end border-b border-white/[0.03] pb-4">
                             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Result</p>
                             <p className="text-sm font-black text-slate-200 uppercase tracking-tight">{item.result}</p>
                          </div>
                          <div className="flex justify-between items-end border-b border-white/[0.03] pb-4">
                             <div className="flex items-center space-x-2">
                                <ShieldCheck size={14} className="text-emerald-500" />
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Guard</p>
                             </div>
                             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter text-right leading-none max-w-[150px]">{item.guard}</p>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Severity</p>
                             <div className={`px-5 py-2 rounded-xl flex items-center space-x-3 border ${item.severity === 'TERMINAL' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                                <Zap size={14} className="fill-current" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.severity}</span>
                             </div>
                          </div>
                       </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-32 text-center">
             <Link to="/reach-test" className="inline-flex items-center space-x-6 bg-red-600 text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_100px_-20px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all active:scale-95 group border-b-[12px] border-slate-900">
               <span>INITIATE REACH TEST™ DIAGNOSIS</span>
               <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* TASK 2: THE TRANSFORMATION - CARRIER EXECUTIVE STANDARD */}
      <section className="py-24 md:py-48 bg-[#FAF9F6] dark:bg-surface-dark transition-colors">
        <div className="max-w-[1600px] mx-auto px-6">
          <header className="text-center mb-32 space-y-8 animate-reveal-up">
             <p className="text-[14px] font-black uppercase tracking-[1em] text-slate-400">THE OUTCOME</p>
             <h2 className="text-6xl md:text-[6.5rem] font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-[0.85]">
               THE <span className="text-[#C5A059] italic">EXECUTIVE</span> STANDARD.
             </h2>
             <p className="text-2xl md:text-3xl font-bold text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase">
               The transformation from a driver with a dream to a carrier with infrastructure.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { 
                icon: <ClipboardCheck size={48} />, 
                title: "Audit-Ready Infrastructure", 
                desc: "Establish a documentation standard where federal auditors find zero \"Reach Test\" hazards. Your refuge is built before the knock arrives." 
              },
              { 
                icon: <UserCheck size={48} />, 
                title: "Preferred Risk Profile", 
                desc: "Maintain a safety record that forces insurance underwriters to offer your business the lowest possible market premiums. Control your insurability." 
              },
              { 
                icon: <BarChart3 size={48} />, 
                title: "Financial Sovereignty", 
                desc: "Use industrial-grade cost tracking to ensure every mile driven contributes to net wealth, not just gross revenue. Drive for profit, not just volume." 
              }
            ].map((pillar, i) => (
              <article key={i} className="bg-white dark:bg-primary-dark p-12 lg:p-20 rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:shadow-[0_60px_120px_-30px_rgba(0,34,68,0.15)] transition-all duration-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#FAF9F6] dark:bg-gray-800 text-[#C5A059] rounded-[2.5rem] flex items-center justify-center mb-12 shadow-inner group-hover:scale-110 group-hover:bg-[#002244] group-hover:text-white transition-all duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-[#002244] dark:text-white uppercase leading-tight mb-8 font-serif tracking-tight group-hover:text-[#C5A059] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-12 flex-grow uppercase tracking-tight">
                  {pillar.desc}
                </p>
                <div className="h-2 w-12 bg-slate-100 dark:bg-gray-800 rounded-full group-hover:bg-[#C5A059] transition-all group-hover:w-24"></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TASK 3: THE "MATH OF SURVIVAL" - TCO ANCHOR */}
      <section className="py-24 md:py-48 bg-[#C5A059] text-[#002244] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
               <div className="inline-flex items-center space-x-4 bg-[#002244]/10 border border-[#002244]/20 px-8 py-3 rounded-full">
                  <Calculator size={24} />
                  <span className="text-sm font-black uppercase tracking-[0.5em]">Pillar 04: Cash-Flow Oxygen</span>
               </div>
               <h2 className="text-6xl md:text-[6.5rem] font-black font-serif uppercase tracking-tighter leading-[0.85]">
                 THE MATH OF <br/><span className="text-white italic">SURVIVAL.</span>
               </h2>
               <div className="h-4 w-48 bg-[#002244]"></div>
               <p className="text-3xl font-black uppercase tracking-tight leading-none italic">"Your TCO is the Foundation."</p>
            </div>
            
            <div className="bg-[#002244] p-12 md:p-20 rounded-[5rem] text-white shadow-2xl relative overflow-hidden border-[15px] border-white/5">
               <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                  <Target size={200} />
               </div>
               <div className="relative z-10 space-y-12">
                  <div className="space-y-8 text-2xl md:text-3xl font-bold leading-relaxed border-l-[12px] border-[#C5A059] pl-12">
                    <p>
                      In 25 years of manufacturing leadership, I learned that margins don't move because of effort—they move because of systems.
                    </p>
                    <p className="text-white/80">
                      If you don't know your <span className="text-[#C5A059]">True Cost of Ownership</span>, you are driving toward a cliff.
                    </p>
                  </div>
                  <div className="pt-8">
                     <Link to="/tools/tco-calculator" className="w-full bg-[#C5A059] text-[#002244] py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-sm shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] hover:bg-white transition-all active:scale-95 flex items-center justify-center group border-b-[12px] border-[#8e7340]">
                        ACCESS THE EXECUTIVE TCO CALCULATOR <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={28} />
                     </Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQS */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden transition-colors duration-300">
        <div className="max-w-[90%] md:max-w-5xl mx-auto px-6">
          <header className="text-center mb-32 space-y-10">
             <p className="text-[14px] font-black uppercase tracking-[0.6em] text-slate-400">FAQS</p>
             <h2 className="text-6xl md:text-[6.5rem] font-black font-serif text-[#002244] dark:text-white uppercase tracking-tight leading-none">COMMON <span className="text-[#C5A059] italic">QUESTIONS.</span></h2>
          </header>
          <div className="space-y-6">
            {[
              { q: "Does LaunchPath guarantee I will pass a new entrant safety audit?", a: "No. LaunchPath does not guarantee audit outcomes. Final determination is made solely by the FMCSA based on their independent investigation. We provide the institutional framework and documentation systems.", icon: <ShieldAlert size={18} /> },
              { q: "What if my insurance quote is higher than expected?", a: "Insurance pricing is based on factors outside our control — your location, commodity, driving history, and market conditions. LaunchPath teaches you how to present your operation professionally to underwriters.", icon: <CreditCard size={18} /> },
              { q: "Is LaunchPath for non-CDL box truck carriers?", a: "Yes. LaunchPath covers all interstate motor carriers operating CMVs over 10,001 lbs GVWR, including non-CDL operations.", icon: <Truck size={18} /> },
              { q: "Can I skip sections or move ahead?", a: "No. The curriculum follows a sequential implementation calendar. Each phase builds on the previous. Skipping creates gaps in your compliance infrastructure.", icon: <Lock size={18} /> },
              { q: "Is there a recurring monthly subscription fee?", a: "No. Enrollment is a one-time fee with lifetime access to the curriculum and tools.", icon: <DollarSign size={18} /> }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} icon={faq.icon} isOpen={openFaqIndex === idx} onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} />
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-24 md:py-48 bg-[#002244] text-white overflow-hidden relative transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10 space-y-16">
           <header className="space-y-10">
              <h2 className="text-6xl md:text-[6.5rem] font-black font-serif uppercase tracking-tight leading-none">BUILD YOUR CARRIER LIKE A <br/><span className="text-[#C5A059] italic">CARRIER EXECUTIVE.</span></h2>
              <p className="text-2xl md:text-3xl text-slate-300 font-medium max-w-4xl mx-auto leading-[1.6]">You didn't get your authority to hope you don't get audited. You got it to build something that lasts. LaunchPath gives you the infrastructure to operate with discipline.</p>
           </header>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-10">
              <Link to="/readiness" className="w-full sm:w-auto bg-[#C5A059] text-[#002244] px-14 sm:px-24 py-10 sm:py-12 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[18px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)] hover:bg-white transition-all active:scale-95 flex items-center justify-center group border-b-[12px] border-[#8e7340]">TAKE THE REACH TEST™ <ArrowRight size={32} className="ml-5 group-hover:translate-x-2 transition-transform" /></Link>
              <Link to="/pricing" className="w-full sm:w-auto border-4 border-white/20 px-14 sm:px-24 py-10 sm:py-12 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[18px] hover:bg-white/5 transition-all flex items-center justify-center">VIEW ADMISSION PROTOCOL</Link>
           </div>
           
           <div className="pt-24 flex flex-col md:flex-row items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center space-x-4 border border-white/20 px-8 py-4 rounded-2xl">
                 <ShieldCheck size={28} className="text-[#C5A059]" />
                 <span className="text-sm font-black uppercase tracking-[0.3em]">VETERAN OWNED & OPERATED</span>
              </div>
              <div className="flex items-center space-x-4 border border-white/20 px-8 py-4 rounded-2xl">
                 <Award size={28} className="text-[#C5A059]" />
                 <span className="text-sm font-black uppercase tracking-[0.3em]">OSHA-CERTIFIED SAFETY COORDINATOR</span>
              </div>
           </div>
           <p className="text-[13px] font-black uppercase tracking-[0.5em] text-white/20 pt-12">BUILT ON WISDOM • ESTABLISHED WITH UNDERSTANDING • DESIGNED FOR ENDURANCE.™</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;