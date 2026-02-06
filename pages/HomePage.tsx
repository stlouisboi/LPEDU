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
  Scan
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
          className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isOpen ? 'bg-authority-blue text-signal-gold shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'
            }`}>
              {icon}
            </div>
            <span className={`text-lg font-black tracking-tight uppercase transition-colors duration-300 ${
              isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'
            }`}>
              {question}
            </span>
          </div>
          <div className={`p-2 rounded-full transition-all duration-500 ${
            isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'
          }`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </h3>
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-8 pt-0 text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 pt-6">
            <p className="text-base whitespace-pre-wrap">
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
  const [selectedSinId, setSelectedSinId] = useState<string | null>(null);
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
      description: "Evaluation of chemical dependency protocols and federal clearinghouse alignment.",
      items: [
        { id: "01", text: "Absence of random pool enrollment", impact: "Audit Default", severity: "TERMINAL", guard: "Random Testing Enrollment", violation: "Failing to enroll in a DOT-compliant random drug and alcohol testing consortium.", consequence: "Automatic audit failure. Operating without random testing is an immediate violation of 49 CFR Part 382.", detailedGuard: "We guide you through consortium selection and enrollment verification.", module: "Module 2 — Drug & Alcohol Compliance", moduleId: 2 },
        { id: "02", text: "Positive driver results (Unmanaged)", impact: "Immediate Revocation", severity: "TERMINAL", guard: "Results Management System", violation: "No documented protocol for handling positive drug/alcohol test results.", consequence: "Immediate revocation risk. Improper handling of positive results creates federal liability.", detailedGuard: "Step-by-step protocol for managing positive results and return-to-duty process.", module: "Module 2 — Drug & Alcohol Compliance", moduleId: 2 },
        { id: "03", text: "Clearinghouse query failure", impact: "Operating Ban", severity: "CRITICAL", guard: "Clearinghouse Query Process", violation: "Not conducting required FMCSA Drug & Alcohol Clearinghouse queries on drivers.", consequence: "Operating ban. Pre-employment and annual queries are mandatory for all CDL drivers.", detailedGuard: "Automated reminders and documentation workflow.", module: "Module 2 — Drug & Alcohol Compliance", moduleId: 2 },
        { id: "04", text: "Omission of pre-employment test", impact: "Strict Liability", severity: "HIGH RISK", guard: "Pre-Employment Screening", violation: "Allowing a driver to operate without a documented pre-employment drug test.", consequence: "Strict liability. You are liable for any incident involving an untested driver.", detailedGuard: "Checklist and verification system before any driver operates.", module: "Module 2 — Drug & Alcohol Compliance", moduleId: 2 }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      description: "Integrity verification of driver qualification files and licensing credentials.",
      items: [
        { id: "05", text: "Revoked/Expired license usage", impact: "OOS Event", severity: "TERMINAL", guard: "License Verification Workflow", violation: "Allowing a driver to operate with an expired, suspended, or revoked CDL.", consequence: "Out-of-service event. Vehicle and driver placed OOS, potential authority suspension.", detailedGuard: "Periodic license checks with documentation.", module: "Module 3 — Driver Qualification Files", moduleId: 3 },
        { id: "06", text: "Missing Med-Cert verification", impact: "Driver Downgrade", severity: "CRITICAL", guard: "Medical Certificate Tracking", violation: "No valid medical certificate on file or failure to verify medical status.", consequence: "Driver downgrade. FMCSA automatically downgrades CDL without valid med cert.", detailedGuard: "Expiration alerts and verification documentation.", module: "Module 3 — Driver Qualification Files", moduleId: 3 },
        { id: "07", text: "Fragmented DQ File framework", impact: "Audit Red Flag", severity: "HIGH RISK", guard: "DQ File Builder", violation: "Incomplete or disorganized Driver Qualification files missing required documents.", consequence: "Audit red flag. Incomplete DQ files are the #1 finding in new entrant audits.", detailedGuard: "Complete file structure with all required elements.", module: "Module 3 — Driver Qualification Files", moduleId: 3 },
        { id: "08", text: "Omitted background inquiries", impact: "Negligent Entrustment", severity: "CRITICAL", guard: "Background Check Protocol", violation: "Failing to conduct and document required background checks and employment verification.", consequence: "Negligent entrustment liability. You're liable if you didn't verify driver history.", detailedGuard: "Required inquiries checklist and documentation templates.", module: "Module 3 — Driver Qualification Files", moduleId: 3 }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      description: "Direct management of hours-of-service and equipment maintenance standards.",
      items: [
        { id: "09", text: "Falsification of HOS records", impact: "Criminal Default", severity: "TERMINAL", guard: "Hours of Service Compliance", violation: "Inaccurate or falsified Hours of Service records.", consequence: "Criminal liability. Falsification is a federal offense with personal liability.", detailedGuard: "ELD best practices and accurate record-keeping.", module: "Module 4 — Operational Compliance", moduleId: 4 },
        { id: "10", text: "Dispatching OOS vehicles", impact: "Authority Seizure", severity: "TERMINAL", guard: "Vehicle Inspection System", violation: "Operating a vehicle that has been placed out-of-service.", consequence: "Authority seizure. Immediate suspension of operating authority.", detailedGuard: "Pre/post-trip inspection protocols and OOS tracking.", module: "Module 4 — Operational Compliance", moduleId: 4 },
        { id: "11", text: "Deficient roadside history (CSA)", impact: "Premium Spike", severity: "HIGH RISK", guard: "Safety Score Monitoring", violation: "Pattern of roadside inspection violations affecting CSA scores.", consequence: "Insurance premium spikes. High CSA scores trigger non-renewal or rate increases.", detailedGuard: "CSA tracking and violation response protocols.", module: "Module 4 — Operational Compliance", moduleId: 4 },
        { id: "12", text: "No systematic maintenance log", impact: "Liability Default", severity: "CRITICAL", guard: "Maintenance Documentation", violation: "Missing or incomplete vehicle maintenance documentation.", consequence: "Liability default. No maintenance records = automatic liability in any incident.", detailedGuard: "Systematic logging and record retention.", module: "Module 4 — Operational Compliance", moduleId: 4 }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      description: "Governance of federal filings, insurance continuity, and corporate entity integrity.",
      items: [
        { id: "13", text: "Insurance coverage lapse", impact: "Authority Termination", severity: "TERMINAL", guard: "Insurance Monitoring System", violation: "Operating without continuous, valid insurance coverage.", consequence: "Authority termination. FMCSA revokes authority immediately upon coverage lapse.", detailedGuard: "Coverage tracking and renewal alerts.", module: "Module 1 — Authority & Insurance Setup", moduleId: 1 },
        { id: "14", text: "Failure to update MCS-150", impact: "Administrative Revocation", severity: "CRITICAL", guard: "MCS-150 Update Protocol", violation: "Not filing biennial MCS-150 update with FMCSA.", consequence: "Administrative revocation. Authority deactivated for failure to update.", detailedGuard: "Biennial reminder system and filing verification.", module: "Module 1 — Authority & Insurance Setup", moduleId: 1 },
        { id: "15", text: "BOC-3 Process Agent omission", impact: "Filing Suspension", severity: "HIGH RISK", guard: "BOC-3 Process Agent Filing", violation: "No designated process agent on file with FMCSA.", consequence: "Filing suspension. Cannot maintain active authority without BOC-3.", detailedGuard: "Setup verification and maintenance.", module: "Module 1 — Authority & Insurance Setup", moduleId: 1 },
        { id: "16", text: "Late incident/accident reporting", impact: "Legal Default", severity: "CRITICAL", guard: "Accident Reporting Protocol", violation: "Failing to report recordable accidents within required timeframes.", consequence: "Legal default. Late reporting creates liability exposure and audit findings.", detailedGuard: "Step-by-step incident response and documentation.", module: "Module 4 — Operational Compliance", moduleId: 4 }
      ]
    }
  ];

  const selectedSin = riskDomains.flatMap(d => d.items).find(i => i.id === selectedSinId);

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans text-authority-blue leading-relaxed selection:bg-signal-gold/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-10 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-xs md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA Standard</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.95] md:leading-[0.85] tracking-tighter uppercase font-serif text-authority-blue dark:text-white">
              PROTECT YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> WITH <br/>ORDER AND CERTAINTY.
            </h1>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                Most new carriers satisfactorily establish their compliance infrastructure within the first 90 days — or inherit the consequences for 18 months. LaunchPath installs the infrastructure that closes those gaps.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 lg:p-14 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(30,58,95,0.12)] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
              {/* Glow decoration */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-signal-gold/5 blur-[80px] rounded-full"></div>
              
              <div className="relative z-10">
                {scanState === 'idle' ? (
                  <>
                    <header className="mb-10 md:mb-12">
                         {/* Standalone FREE text */}
                         <div className="inline-block bg-signal-gold text-authority-blue px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-4 shadow-lg">
                           FREE
                         </div>
                         {/* Massive 90 DAY RISK MAP together */}
                         <h3 className="text-4xl md:text-5xl lg:text-[4.2rem] font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white leading-[0.85] drop-shadow-sm">
                           90 DAY <br/>
                           <span className="text-signal-gold italic">RISK MAP</span>
                         </h3>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-4">Diagnostic Orientation Terminal</p>
                    </header>
                    
                    <form onSubmit={handleRiskMapSubmit} className="space-y-6 md:space-y-8">
                      <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">LEGAL ENTITY NAME</label>
                        <input 
                          required 
                          value={formData.firstName}
                          onChange={e => setFormData({...formData, firstName: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold outline-none px-6 py-4 md:py-5 rounded-2xl font-black text-base transition-all text-authority-blue dark:text-white placeholder:text-slate-300" 
                          placeholder="JANE DOE" 
                        />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">REGISTRY EMAIL</label>
                        <input 
                          required 
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold outline-none px-6 py-4 md:py-5 rounded-2xl font-black text-base transition-all text-authority-blue dark:text-white placeholder:text-slate-300" 
                          placeholder="JANE@CARRIER.COM" 
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-authority-blue text-white py-6 md:py-7 rounded-[2rem] font-black uppercase tracking-[0.35em] text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-[0.98] flex items-center justify-center group border-b-8 border-slate-900"
                      >
                        <ChevronRight className="mr-3 group-hover:translate-x-1 transition-transform" size={18} />
                        VIEW MY RISK MAP
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="py-12 md:py-20 text-center space-y-10 animate-in fade-in zoom-in-95 duration-500">
                    <div className="relative inline-block">
                       <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-authority-blue/10 border-t-authority-blue animate-spin"></div>
                       <Terminal className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-authority-blue dark:text-signal-gold" size={28} />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-widest font-serif italic">
                         {scanState === 'scanning' ? 'Synthesizing Exposure...' : 'Finalizing Registry...'}
                       </h3>
                       <div className="max-w-[260px] mx-auto bg-slate-50 dark:bg-black/40 rounded-2xl p-4 border border-slate-100 dark:border-white/10 font-mono text-[9px] text-authority-blue dark:text-emerald-500 text-left h-32 overflow-hidden relative shadow-inner">
                         <div className="space-y-1">
                           {scanLog.map((log, i) => (
                             <div key={i} className="animate-in slide-in-from-left-2 duration-300">
                               <span className="opacity-40">[{new Date().toLocaleTimeString([], {hour12:false})}]</span> {log}
                             </div>
                           ))}
                         </div>
                         <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-50 dark:from-black/80 to-transparent"></div>
                       </div>
                    </div>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
                   <div className="flex items-center justify-between">
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-emerald-500 flex items-center">
                       <ShieldCheck size={14} className="mr-2" /> UPLINK ACTIVE
                     </p>
                     <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">LP-SYS-V4.2</p>
                   </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. FOUNDER SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative group max-w-[480px] mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-authority-blue/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="bg-authority-blue dark:bg-primary-dark rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-white dark:border-border-dark">
                  <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-auto grayscale opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-authority-blue/90 backdrop-blur-md py-4 text-center border-t border-white/10">
                    <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.4em]">SYSTEM CUSTODIAN</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-signal-gold p-4 rounded-2xl shadow-xl border-4 border-white dark:border-surface-dark hidden sm:block z-20 group-hover:rotate-12 transition-transform">
                  <Award className="text-authority-blue" size={32} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-4">FOUNDER & LEAD ADVISOR</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white leading-tight uppercase tracking-tight">
                  Vince Lawrence.
                </h1>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                  20+ years of federal compliance management supporting organizations with 1,200+ employees. OSHA-certified safety coordination. U.S. Navy veteran.
                </p>
              </div>

              <div className="space-y-6">
                <div className="max-w-[600px] p-8 bg-white dark:bg-gray-800/50 rounded-[2.5rem] border border-slate-100 dark:border-border-dark relative shadow-sm">
                   <p className="text-xl font-medium text-slate-700 dark:text-slate-200 italic leading-relaxed">
                    "LaunchPath was built from direct experience watching new motor carriers fail — not from lack of effort, but from lack of systems."
                   </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: <ShieldCheck size={18} className="text-signal-gold" />, text: "U.S. NAVY VETERAN" },
                    { icon: <Shield size={18} className="text-signal-gold" />, text: "OSHA-CERTIFIED" },
                    { icon: <Briefcase size={18} className="text-signal-gold" />, text: "20+ YRS COMPLIANCE" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-slate-100 dark:border-border-dark shadow-sm">
                      {item.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest text-authority-blue dark:text-white">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link to="/about" className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:underline group">
                  <span>READ FULL BACKGROUND</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PATTERN */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <header className="mb-16 space-y-8">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE PATTERN</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              I'VE WATCHED THIS <br/><span className="text-red-600 italic">FAIL</span> 200 TIMES.
            </h2>
          </header>

          <div className="space-y-12">
            <div className="space-y-8 text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed text-left border-l-4 border-slate-200 dark:border-border-dark pl-8">
              <p>
                New carriers don't fail because they can't drive or can't find freight. They fail because no one taught them what happens when their Driver Qualification file is incomplete during an insurance audit. Or when their drug and alcohol program doesn't meet federal specifications. Or when their maintenance records can't survive a Level I inspection.
              </p>
              <p>
                By the time they call us, the insurance is cancelled. The authority is revoked. And the dream costs $40,000 to try again.
              </p>
            </div>
            
            <nav className="pt-12">
              <a href="#exposure-matrix" className="inline-flex items-center space-x-4 bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group">
                <span>OPEN EXPOSURE MATRIX</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* 4. THE STANDARD */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark border-y border-slate-100 dark:border-border-dark overflow-hidden transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <article className="space-y-12">
              <header className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE STANDARD</p>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
                  ORDER BEFORE <br/><span className="text-signal-gold italic">REVENUE.</span>
                </h2>
              </header>
              <div className="space-y-8 text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                <p>LaunchPath is a 90-day compliance infrastructure system for new interstate motor carriers.</p>
                <p>We don't teach you how to book loads. We install the documentation systems, verification workflows, and audit-ready file structures that keep your authority protected when federal oversight arrives.</p>
                <p className="text-authority-blue dark:text-white font-black italic">This is what separates a carrier executive from a driver with a dream.</p>
              </div>
            </article>

            <aside className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-primary-dark p-10 rounded-[3rem] border-t-8 border-red-500/30 space-y-8 shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">REACTIVE APPROACH</h4>
                  <ul className="space-y-4 text-sm font-bold text-slate-500 leading-relaxed">
                     <li className="flex items-start"><XCircle size={16} className="text-red-400 mr-3 mt-0.5 shrink-0" /> Fixing files after incidents</li>
                     <li className="flex items-start"><XCircle size={16} className="text-red-400 mr-3 mt-0.5 shrink-0" /> Skipping DOT maintenance logs</li>
                     <li className="flex items-start"><XCircle size={16} className="text-red-400 mr-3 mt-0.5 shrink-0" /> Waiting for federal audit alerts</li>
                     <li className="flex items-start"><XCircle size={16} className="text-red-400 mr-3 mt-0.5 shrink-0" /> Segmented, messy documentation</li>
                  </ul>
               </div>
               <div className="bg-authority-blue p-10 rounded-[3rem] border-t-8 border-signal-gold space-y-8 shadow-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">SYSTEMATIC APPROACH</h4>
                  <ul className="space-y-4 text-sm font-bold text-white leading-relaxed">
                     <li className="flex items-start"><CheckCircle2 size={16} className="text-signal-gold mr-3 mt-0.5 shrink-0" /> Pre-launch safety installation</li>
                     <li className="flex items-start"><CheckCircle2 size={16} className="text-signal-gold mr-3 mt-0.5 shrink-0" /> Daily-executed DQ workflows</li>
                     <li className="flex items-start"><CheckCircle2 size={16} className="text-signal-gold mr-3 mt-0.5 shrink-0" /> Permanent audit-ready posture</li>
                     <li className="flex items-start"><CheckCircle2 size={16} className="text-signal-gold mr-3 mt-0.5 shrink-0" /> Integrated, defensible record systems</li>
                  </ul>
               </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. THIS IS NOT FOR EVERYONE */}
      <section className="py-24 md:py-40 bg-[#0c1a2d] text-white overflow-hidden transition-colors duration-300 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-4">
             <ShieldAlert size={14} className="text-red-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">BOUNDARIES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tight leading-none">
            THIS IS NOT FOR <br/><span className="text-red-600 italic">EVERYONE.</span>
          </h2>
          <div className="h-px w-24 bg-red-600/30 mx-auto"></div>
          <div className="space-y-8 text-xl md:text-2xl font-bold text-slate-400 leading-relaxed text-left max-w-3xl mx-auto border-l-4 border-red-600/20 pl-8">
            <p>If you're looking for a course on how to make money in trucking — this isn't it.</p>
            <p>If you want dispatch training or load board strategies — we don't offer that.</p>
            <p className="text-white italic">LaunchPath is for owner-operators who understand that their authority is a federal license to be audited — and they want to be ready when it happens.</p>
          </div>
        </div>
      </section>

      {/* 6. THE FOUR PILLARS */}
      <section className="py-24 md:py-32 bg-[#020617] border-b border-white/5 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="text-center mb-16 md:mb-24 space-y-6">
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE FRAMEWORK</p>
             <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif text-white uppercase tracking-tighter leading-tight">
               THE FOUR <span className="text-signal-gold italic">PILLARS.</span>
             </h2>
             <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed">
               The systems that keep you operating.
             </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
             {[
               { icon: <Briefcase />, title: "AUTHORITY PROTECTION", tagline: "STRUCTURAL STEWARDSHIP", desc: "Managing federal authority as an entrusted asset. Build a foundation that survives scrutiny.", link: "/modules/1" },
               { icon: <Shield />, title: "INSURANCE CONTINUITY", tagline: "RISK RESPONSIBILITY", desc: "Protecting your right to operate. Maintain permanent coverage via documented safety.", link: "/modules/2" },
               { icon: <Layers />, title: "COMPLIANCE BACKBONE", tagline: "SYSTEMIC INTEGRITY", desc: "Executing federal standards with precision. Replace human memory with verifiable systems.", link: "/modules/3" },
               { icon: <Calculator />, title: "CASH-FLOW OXYGEN", tagline: "FISCAL STEWARDSHIP", desc: "Securing the mission through economic truth. Use TCO math to ensure solvency.", link: "/tools/tco-preview" }
             ].map((pillar, i) => (
               <article key={i} className="bg-white/[0.03] p-10 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-white/10 flex flex-col text-center group hover:shadow-[0_40px_100px_-20px_rgba(198,146,42,0.1)] transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 text-signal-gold rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500">
                    {React.cloneElement(pillar.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase leading-tight mb-2 font-serif tracking-tight group-hover:text-signal-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold mb-8 opacity-70">{pillar.tagline}</p>
                  <p className="text-base font-bold text-slate-400 leading-relaxed mb-10 flex-grow">
                    {pillar.desc}
                  </p>
                  <Link to={pillar.link} className="inline-flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold hover:text-white transition-all group/btn">
                    <span>EXPLORE MODULE</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* 7. THE 16 DEADLY SINS */}
      <section id="exposure-matrix" className="bg-[#020617] py-24 lg:py-48 border-y border-white/5 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <header className="text-center mb-24 md:mb-32 space-y-8 animate-reveal-up">
             <div className="w-24 h-24 bg-red-600/10 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border-2 border-red-500/20">
               <ShieldX size={48} />
             </div>
             <p className="text-[11px] font-black uppercase tracking-[0.8em] text-red-500">THE EXPOSURE TAXONOMY</p>
             <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif text-white uppercase tracking-tighter leading-[0.9]">
               THE 16 DEADLY SINS OF <br/><span className="text-red-600 italic">CARRIER FAILURE.</span>
             </h2>
             <div className="h-1.5 w-32 bg-red-600/20 mx-auto rounded-full mt-12"></div>
             <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-3xl mx-auto leading-relaxed">
               Most new carriers fail because they ignore these 16 specific patterns used by FMCSA investigators to identify high-risk operations.
             </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {riskDomains.map((domain, domainIdx) => (
              <div key={domainIdx} className="space-y-10 animate-reveal-up" style={{ animationDelay: `${domainIdx * 0.1}s` }}>
                <header className="flex items-center justify-between border-b border-white/10 pb-6">
                   <div className="flex items-center space-x-5">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        {domain.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight font-serif">{domain.domain}</h3>
                        <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mt-1">{domain.id} // SECURE_ARCHIVE</p>
                      </div>
                   </div>
                   <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Vectors</p>
                      <p className="text-lg font-black text-white">0{domain.items.length}</p>
                   </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {domain.items.map((item) => (
                    <article 
                      key={item.id} 
                      onClick={() => setSelectedSinId(selectedSinId === item.id ? null : item.id)}
                      className={`bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] group hover:bg-white/[0.05] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden cursor-pointer ${selectedSinId === item.id ? 'ring-2 ring-red-500/50 bg-white/[0.05]' : ''}`}
                    >
                       <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 text-red-600 group-hover:scale-150 transition-all duration-700">
                          <ShieldAlert size={64} />
                       </div>
                       <header className="flex items-center space-x-3 mb-6">
                          <span className="text-xs font-black text-slate-700 font-mono tracking-tighter group-hover:text-red-500 transition-colors">{item.id}</span>
                          <h4 className="text-base font-black text-white uppercase leading-tight tracking-tight group-hover:text-red-500 transition-colors">{item.text}</h4>
                       </header>
                       <div className="space-y-6 pt-6 border-t border-white/5">
                          <div className="flex justify-between items-center">
                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest">RESULT</p>
                             <p className="text-[11px] font-black text-slate-300 uppercase tracking-tight">{item.impact}</p>
                          </div>
                          <div className="flex justify-between items-center">
                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest">GUARD</p>
                             <div className="flex items-center space-x-1.5 text-emerald-400">
                                <ShieldCheck size={10} />
                                <span className="text-[11px] font-black uppercase tracking-tight">{item.guard}</span>
                             </div>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                             <p className="text-[11px] font-black uppercase text-slate-500 tracking-widest">SEVERITY</p>
                             <div className={`px-2.5 py-1 rounded-lg flex items-center space-x-2 border ${
                               item.severity === 'TERMINAL' ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : item.severity === 'CRITICAL' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                             }`}>
                                <Zap size={10} className="fill-current" />
                                <span className="text-[11px] font-black uppercase tracking-widest">{item.severity}</span>
                             </div>
                          </div>
                       </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIN DETAIL MODAL */}
      {selectedSinId && selectedSin && (
        <div className="hidden sm:flex fixed inset-0 z-[200] items-center justify-center p-8 md:p-12 animate-in fade-in duration-300" onClick={() => setSelectedSinId(null)}>
          <div className="absolute inset-0 bg-[#0c1a2d]/90 backdrop-blur-xl"></div>
          <div className="relative bg-white dark:bg-[#020617] border border-white/10 w-full max-w-[90%] lg:max-w-[60%] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedSinId(null)} className="absolute top-10 right-10 p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 rounded-2xl transition-all z-20 group">
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
            <header className="p-12 md:p-16 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-transparent">
               <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-black text-red-600 font-mono tracking-tighter">{selectedSin.id}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
                    <span className="text-sm font-black text-slate-500 uppercase tracking-[0.4em]">Sin Specification</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.95] font-serif">{selectedSin.text}</h3>
               </div>
            </header>
            <div className="flex-grow overflow-y-auto p-12 md:p-16 scroll-smooth custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12">
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold flex items-center"><ShieldX size={16} className="mr-3" /> The Violation</h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-red-600/30 pl-8 py-2">{selectedSin.violation}</p>
                     </section>
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold flex items-center"><AlertCircle size={16} className="mr-3" /> The Consequence</h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-red-600/30 pl-8 py-2">{selectedSin.consequence}</p>
                     </section>
                  </div>
                  <div className="space-y-12">
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-600 flex items-center"><ShieldCheck size={16} className="mr-3" /> The Remediation Guard</h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-emerald-500/30 pl-8 py-2">{selectedSin.detailedGuard}</p>
                     </section>
                     <section className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold"><Layers size={20} /> <h4 className="text-[11px] font-black uppercase tracking-widest">Curriculum Alignment</h4></div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">This exposure vector is systematically neutralized within <span className="text-authority-blue dark:text-white">{selectedSin.module}</span>.</p>
                        <Link to={`/modules/${selectedSin.moduleId}`} className="inline-flex items-center space-x-3 bg-authority-blue text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-steel-blue transition-all group/btn"><span>VIEW MODULE</span> <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></Link>
                     </section>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. THE REACH TEST */}
      <section className="py-24 md:py-48 bg-authority-blue text-white overflow-hidden transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 animate-reveal-up">
              <header className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-signal-gold">FREE DIAGNOSTIC</p>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tight leading-none">THE <span className="text-signal-gold italic">REACH TEST™</span></h2>
                <p className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed max-w-xl">Find out where you're exposed.</p>
              </header>
              <Link to="/readiness" className="inline-flex items-center space-x-4 bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-white transition-all active:scale-95 group"><span>INITIATE REACH TEST™</span> <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
            </div>
            <div className="relative group">
               <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 border border-white/20"><Target className="text-signal-gold" size={48} /></div>
                  <h3 className="text-2xl font-black font-serif uppercase tracking-tight mb-4 text-signal-gold">Diagnostic Logic</h3>
                  <p className="text-lg font-medium text-white/60 leading-relaxed italic max-w-xs">Analysis includes: Household Runway, Admin Capacity, and Capital Stewardship Mapping.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. COMMON QUESTIONS */}
      <section className="py-24 md:py-32 bg-white dark:bg-primary-dark overflow-hidden transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-20 space-y-4">
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">FAQS</p>
             <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">COMMON <span className="text-signal-gold italic">QUESTIONS.</span></h2>
          </header>
          <div className="space-y-4">
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
      <section className="py-24 md:py-48 bg-[#0c1a2d] text-white overflow-hidden relative transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10 space-y-12">
           <header className="space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tight leading-none">BUILD YOUR CARRIER LIKE A <br/><span className="text-signal-gold italic">CARRIER EXECUTIVE.</span></h2>
              <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">You didn't get your authority to hope you don't get audited. You got it to build something that lasts. LaunchPath gives you the infrastructure to operate with discipline.</p>
           </header>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link to="/readiness" className="w-full sm:w-auto bg-signal-gold text-authority-blue px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center group">TAKE THE REACH TEST™ <ArrowRight size={20} className="ml-4 group-hover:translate-x-1 transition-transform" /></Link>
              <Link to="/pricing" className="w-full sm:w-auto border-2 border-white/20 px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white/5 transition-all flex items-center justify-center">VIEW ADMISSION PROTOCOL</Link>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 pt-16">VETERAN OWNED & OPERATED • ACCURACY OVER HYPE.™</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;