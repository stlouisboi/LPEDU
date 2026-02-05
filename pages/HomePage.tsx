
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
  RefreshCw
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
  const [syncing, setSyncing] = useState(false);
  const [selectedSinId, setSelectedSinId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Parallax tracking state
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [systemsParallaxOffset, setSystemsParallaxOffset] = useState(0);
  const whoThisIsForRef = useRef<HTMLElement>(null);
  const systemsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      if (whoThisIsForRef.current) {
        const rect = whoThisIsForRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = ((rect.top + rect.height / 2) - windowHeight / 2) * 0.05;
          setParallaxOffset(offset);
        }
      }

      if (systemsRef.current) {
        const rect = systemsRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const offset = ((rect.top + rect.height / 2) - windowHeight / 2) * 0.05;
          setSystemsParallaxOffset(offset);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRiskMapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      // 1. Save to Firestore Knowledge Base
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-hero-risk-map"
        });
      }

      // 2. Synchronize with MailerLite Automation
      setSyncing(true);
      const syncResult = await syncToMailerLite({
        email: formData.email,
        fields: { name: formData.firstName }
      });
      
      console.log("MailerLite Capture Status:", syncResult ? "Initiated" : "Bypassed");

      // Give a tiny moment for the request to flush before navigating
      await new Promise(r => setTimeout(r, 500));

      navigate(destination);
    } catch (err) {
      console.error("Submission Sequence Error:", err);
      navigate(destination);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  const riskDomains = [
    {
      domain: "Substance Governance",
      id: "DOMAIN_01",
      icon: <FileWarning className="text-red-500" />,
      description: "Evaluation of chemical dependency protocols and federal clearinghouse alignment.",
      items: [
        { 
          id: "01", 
          text: "Absence of random pool enrollment", 
          impact: "Audit Default", 
          severity: "TERMINAL", 
          guard: "Random Testing Enrollment",
          violation: "Failing to enroll in a DOT-compliant random drug and alcohol testing consortium.",
          consequence: "Automatic audit failure. Operating without random testing is an immediate violation of 49 CFR Part 382.",
          detailedGuard: "We guide you through consortium selection and enrollment verification.",
          module: "Module 2 — Drug & Alcohol Compliance",
          moduleId: 2
        },
        { 
          id: "02", 
          text: "Positive driver results (Unmanaged)", 
          impact: "Immediate Revocation", 
          severity: "TERMINAL", 
          guard: "Results Management System",
          violation: "No documented protocol for handling positive drug/alcohol test results.",
          consequence: "Immediate revocation risk. Improper handling of positive results creates federal liability.",
          detailedGuard: "Step-by-step protocol for managing positive results and return-to-duty process.",
          module: "Module 2 — Drug & Alcohol Compliance",
          moduleId: 2
        },
        { 
          id: "03", 
          text: "Clearinghouse query failure", 
          impact: "Operating Ban", 
          severity: "CRITICAL", 
          guard: "Clearinghouse Query Process",
          violation: "Not conducting required FMCSA Drug & Alcohol Clearinghouse queries on drivers.",
          consequence: "Operating ban. Pre-employment and annual queries are mandatory for all CDL drivers.",
          detailedGuard: "Automated reminders and documentation workflow.",
          module: "Module 2 — Drug & Alcohol Compliance",
          moduleId: 2
        },
        { 
          id: "04", 
          text: "Omission of pre-employment test", 
          impact: "Strict Liability", 
          severity: "HIGH RISK", 
          guard: "Pre-Employment Screening",
          violation: "Allowing a driver to operate without a documented pre-employment drug test.",
          consequence: "Strict liability. You are liable for any incident involving an untested driver.",
          detailedGuard: "Checklist and verification system before any driver operates.",
          module: "Module 2 — Drug & Alcohol Compliance",
          moduleId: 2
        }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      description: "Integrity verification of driver qualification files and licensing credentials.",
      items: [
        { 
          id: "05", 
          text: "Revoked/Expired license usage", 
          impact: "OOS Event", 
          severity: "TERMINAL", 
          guard: "License Verification Workflow",
          violation: "Allowing a driver to operate with an expired, suspended, or revoked CDL.",
          consequence: "Out-of-service event. Vehicle and driver placed OOS, potential authority suspension.",
          detailedGuard: "Periodic license checks with documentation.",
          module: "Module 3 — Driver Qualification Files",
          moduleId: 3
        },
        { 
          id: "06", 
          text: "Missing Med-Cert verification", 
          impact: "Driver Downgrade", 
          severity: "CRITICAL", 
          guard: "Medical Certificate Tracking",
          violation: "No valid medical certificate on file or failure to verify medical status.",
          consequence: "Driver downgrade. FMCSA automatically downgrades CDL without valid med cert.",
          detailedGuard: "Expiration alerts and verification documentation.",
          module: "Module 3 — Driver Qualification Files",
          moduleId: 3
        },
        { 
          id: "07", 
          text: "Fragmented DQ File framework", 
          impact: "Audit Red Flag", 
          severity: "HIGH RISK", 
          guard: "DQ File Builder",
          violation: "Incomplete or disorganized Driver Qualification files missing required documents.",
          consequence: "Audit red flag. Incomplete DQ files are the #1 finding in new entrant audits.",
          detailedGuard: "Complete file structure with all required elements.",
          module: "Module 3 — Driver Qualification Files",
          moduleId: 3
        },
        { 
          id: "08", 
          text: "Omitted background inquiries", 
          impact: "Negligent Entrustment", 
          severity: "CRITICAL", 
          guard: "Background Check Protocol",
          violation: "Failing to conduct and document required background checks and employment verification.",
          consequence: "Negligent entrustment liability. You're liable if you didn't verify driver history.",
          detailedGuard: "Required inquiries checklist and documentation templates.",
          module: "Module 3 — Driver Qualification Files",
          moduleId: 3
        }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      description: "Direct management of hours-of-service and equipment maintenance standards.",
      items: [
        { 
          id: "09", 
          text: "Falsification of HOS records", 
          impact: "Criminal Default", 
          severity: "TERMINAL", 
          guard: "Hours of Service Compliance",
          violation: "Inaccurate or falsified Hours of Service records.",
          consequence: "Criminal liability. Falsification is a federal offense with personal liability.",
          detailedGuard: "ELD best practices and accurate record-keeping.",
          module: "Module 4 — Operational Compliance",
          moduleId: 4
        },
        { 
          id: "10", 
          text: "Dispatching OOS vehicles", 
          impact: "Authority Seizure", 
          severity: "TERMINAL", 
          guard: "Vehicle Inspection System",
          violation: "Operating a vehicle that has been placed out-of-service.",
          consequence: "Authority seizure. Immediate suspension of operating authority.",
          detailedGuard: "Pre/post-trip inspection protocols and OOS tracking.",
          module: "Module 4 — Operational Compliance",
          moduleId: 4
        },
        { 
          id: "11", 
          text: "Deficient roadside history (CSA)", 
          impact: "Premium Spike", 
          severity: "HIGH RISK", 
          guard: "Safety Score Monitoring",
          violation: "Pattern of roadside inspection violations affecting CSA scores.",
          consequence: "Insurance premium spikes. High CSA scores trigger non-renewal or rate increases.",
          detailedGuard: "CSA tracking and violation response protocols.",
          module: "Module 4 — Operational Compliance",
          moduleId: 4
        },
        { 
          id: "12", 
          text: "No systematic maintenance log", 
          impact: "Liability Default", 
          severity: "CRITICAL", 
          guard: "Maintenance Documentation",
          violation: "Missing or incomplete vehicle maintenance documentation.",
          consequence: "Liability default. No maintenance records = automatic liability in any incident.",
          detailedGuard: "Systematic logging and record retention.",
          module: "Module 4 — Operational Compliance",
          moduleId: 4
        }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      description: "Governance of federal filings, insurance continuity, and corporate entity integrity.",
      items: [
        { 
          id: "13", 
          text: "Insurance coverage lapse", 
          impact: "Authority Termination", 
          severity: "TERMINAL", 
          guard: "Insurance Monitoring System",
          violation: "Operating without continuous, valid insurance coverage.",
          consequence: "Authority termination. FMCSA revokes authority immediately upon coverage lapse.",
          detailedGuard: "Coverage tracking and renewal alerts.",
          module: "Module 1 — Authority & Insurance Setup",
          moduleId: 1
        },
        { 
          id: "14", 
          text: "Failure to update MCS-150", 
          impact: "Administrative Revocation", 
          severity: "CRITICAL", 
          guard: "MCS-150 Update Protocol",
          violation: "Not filing biennial MCS-150 update with FMCSA.",
          consequence: "Administrative revocation. Authority deactivated for failure to update.",
          detailedGuard: "Biennial reminder system and filing verification.",
          module: "Module 1 — Authority & Insurance Setup",
          moduleId: 1
        },
        { 
          id: "15", 
          text: "BOC-3 Process Agent omission", 
          impact: "Filing Suspension", 
          severity: "HIGH RISK", 
          guard: "BOC-3 Process Agent Filing",
          violation: "No designated process agent on file with FMCSA.",
          consequence: "Filing suspension. Cannot maintain active authority without BOC-3.",
          detailedGuard: "Setup verification and maintenance.",
          module: "Module 1 — Authority & Insurance Setup",
          moduleId: 1
        },
        { 
          id: "16", 
          text: "Late incident/accident reporting", 
          impact: "Legal Default", 
          severity: "CRITICAL", 
          guard: "Accident Reporting Protocol",
          violation: "Failing to report recordable accidents within required timeframes.",
          consequence: "Legal default. Late reporting creates liability exposure and audit findings.",
          detailedGuard: "Step-by-step incident response and documentation.",
          module: "Module 4 — Operational Compliance",
          moduleId: 4
        }
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
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="hidden md:block text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                Your authority is active. Your insurance is bound. And right now, your documentation has gaps that federal auditors and insurance underwriters will find before you do. LaunchPath installs the infrastructure that closes those gaps — within your first 90 days, before exposure becomes violation.
              </p>
              <p className="md:hidden text-lg font-bold text-slate-700 dark:text-slate-300 leading-tight">
                Most new carriers satisfactorily establish their compliance infrastructure within the first 90 days — or inherit the consequences for 18 months.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(30,58,95,0.15)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <FileWarning size={180} />
              </div>
              
              <div className="relative z-10">
                <header className="flex justify-between items-start mb-8 md:mb-12">
                   <div>
                     <h3 className="text-xs md:sm font-black uppercase text-authority-blue dark:text-signal-gold tracking-widest md:tracking-[0.4em] mb-1 md:mb-2">FREE 90-DAY</h3>
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">RISK MAP™ <br/>DIAGNOSTIC</h3>
                   </div>
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-300">
                     <Lock size={14} />
                   </div>
                </header>
                
                <form onSubmit={handleRiskMapSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">LEGAL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm dark:text-white" 
                      placeholder="Jane Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">REGISTRY EMAIL</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm dark:text-white" 
                      placeholder="jane@carrier.com" 
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-authority-blue text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group border-b-4 border-slate-900"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        {syncing ? <RefreshCw className="animate-spin mr-3" size={18} /> : <Loader2 className="animate-spin mr-3" size={18} />}
                        {syncing ? 'SYNCHRONIZING...' : 'AUTHORIZING...'}
                      </span>
                    ) : (
                      <>
                        <ChevronRight className="mr-3" size={18} />
                        VIEW MY RISK MAP
                      </>
                    )}
                  </button>
                </form>
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold flex items-center">
                     <ShieldCheck size={12} className="mr-2" /> REGISTRY UPLINK ACTIVE
                   </p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                     Orientation only. No corrective actions provided.
                   </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. FOUNDER SECTION: VINCE LAWRENCE */}
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
                  20+ years of federal compliance management supporting organizations with 1,200+ employees. OSHA-certified safety coordination across regulated operations. U.S. Navy veteran.
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

      {/* 3. THE PATTERN (The Wound) */}
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
                These aren't edge cases. They're patterns. The same 16 compliance failures — exposed over and over — that end careers in month 14, month 9, month 6.
              </p>
              <p>
                By then, the insurance is cancelled. The authority is revoked. And the dream costs $40,000 to try again.
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
                <p>We don't teach you how to book loads. We don't promise revenue outcomes. We don't sell dispatch services or insurance policies.</p>
                <p>We install the documentation systems, verification workflows, and audit-ready file structures that keep your authority protected, your insurance stable, and your operation defensible when federal oversight arrives.</p>
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

      {/* 5. THIS IS NOT FOR EVERYONE (Restored Boundaries) */}
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
            <p>If you're hoping for a motivational speaker to tell you it's going to be easy — wrong room.</p>
            <p className="text-white italic">LaunchPath is for owner-operators who understand that their authority is a federal license to be audited — and they want to be ready when it happens.</p>
            <p className="text-slate-500">If that's not you, no hard feelings. If it is — keep reading.</p>
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
               {
                 icon: <Briefcase />,
                 title: "AUTHORITY PROTECTION",
                 tagline: "STRUCTURAL STEWARDSHIP",
                 desc: "Managing federal authority as an entrusted asset. Build a foundation that survives scrutiny through absolute administrative order.",
                 link: "/modules/1"
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "RISK RESPONSIBILITY",
                 desc: "Protecting your right to operate. Maintain permanent coverage by documenting safety as a non-negotiable operational discipline.",
                 link: "/modules/2"
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "SYSTEMIC INTEGRITY",
                 desc: "Executing federal standards with precision. Replace human memory with verifiable systems that prove your compliance daily.",
                 link: "/modules/3"
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "FISCAL STEWARDSHIP",
                 desc: "Securing the mission through economic truth. Use TCO math to ensure your business remains solvent, stable, and viable.",
                 link: "/tools/tco-preview"
               }
             ].map((pillar, i) => (
               <article key={i} className="bg-white/[0.03] p-10 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-white/10 flex flex-col text-center group hover:shadow-[0_40px_100px_-20px_rgba(198,146,42,0.1)] transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 text-signal-gold rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500">
                    {/* Fixed type error in React.cloneElement by casting icon to React.ReactElement<any> to allow passing 'size' prop. */}
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
                               item.severity === 'TERMINAL' 
                               ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                               : item.severity === 'CRITICAL' 
                               ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                               : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
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

      {/* DESKTOP/TABLET MODAL OVERLAY (SIN DETAIL) */}
      {selectedSinId && selectedSin && (
        <div 
          className="hidden sm:flex fixed inset-0 z-[200] items-center justify-center p-8 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedSinId(null)}
        >
          <div className="absolute inset-0 bg-[#0c1a2d]/90 backdrop-blur-xl"></div>
          <div 
            className="relative bg-white dark:bg-[#020617] border border-white/10 w-full max-w-[90%] lg:max-w-[60%] rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedSinId(null)} className="absolute top-10 right-10 p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-authority-blue dark:text-white rounded-2xl transition-all z-20 group">
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
            <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
            <header className="p-12 md:p-16 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-slate-50 dark:bg-transparent">
               <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-black text-red-600 font-mono tracking-tighter">{selectedSin.id}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20"></div>
                    <span className="text-sm font-black text-slate-500 uppercase tracking-[0.4em]">Sin Specification</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.95] font-serif">
                    {selectedSin.text}
                  </h3>
               </div>
               <div className={`px-5 py-2.5 rounded-xl flex items-center space-x-3 border ${
                  selectedSin.severity === 'TERMINAL' 
                  ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                  : selectedSin.severity === 'CRITICAL' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                  : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
               }`}>
                  <Zap size={18} className="fill-current" />
                  <span className="text-xs font-black uppercase tracking-widest">{selectedSin.severity}</span>
               </div>
            </header>
            <div className="flex-grow overflow-y-auto p-12 md:p-16 scroll-smooth custom-scrollbar bg-white dark:bg-transparent">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-12">
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold flex items-center">
                           <ShieldX size={16} className="mr-3" /> The Violation
                        </h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-red-600/30 pl-8 py-2">
                           {selectedSin.violation}
                        </p>
                     </section>
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold flex items-center">
                           <AlertCircle size={16} className="mr-3" /> The Consequence
                        </h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-red-600/30 pl-8 py-2">
                           {selectedSin.consequence}
                        </p>
                     </section>
                  </div>
                  <div className="space-y-12">
                     <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-600 dark:text-emerald-400 flex items-center">
                           <ShieldCheck size={16} className="mr-3" /> The Remediation Guard
                        </h4>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-emerald-500/30 pl-8 py-2">
                           {selectedSin.detailedGuard}
                        </p>
                     </section>
                     <section className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold">
                           <Layers size={20} />
                           <h4 className="text-[11px] font-black uppercase tracking-widest">Curriculum Alignment</h4>
                        </div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                           This exposure vector is systematically neutralized within <span className="text-authority-blue dark:text-white">{selectedSin.module}</span>.
                        </p>
                        <Link to={`/modules/${selectedSin.moduleId}`} className="inline-flex items-center space-x-3 bg-authority-blue text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-steel-blue transition-all group/btn">
                           <span>VIEW MODULE INSTRUCTIONS</span>
                           <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
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
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tight leading-none">
                  THE <span className="text-signal-gold italic">REACH TEST™</span>
                </h2>
                <p className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed max-w-xl">
                  Find out where you're exposed.
                </p>
              </header>
              <Link to="/readiness" className="inline-flex items-center space-x-4 bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-white transition-all active:scale-95 group">
                <span>INITIATE REACH TEST™</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative group">
               <div className="absolute -inset-10 bg-signal-gold/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
               <div className="relative bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 border border-white/20">
                     <Target className="text-signal-gold" size={48} />
                  </div>
                  <h3 className="text-2xl font-black font-serif uppercase tracking-tight mb-4 text-signal-gold">Diagnostic Logic</h3>
                  <p className="text-lg font-medium text-white/60 leading-relaxed italic max-w-xs">
                    Analysis includes: Household Runway, Admin Capacity, and Capital Stewardship Mapping.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHO THIS IS FOR (Qualification / Identity Focus) */}
      <section ref={whoThisIsForRef} className="py-24 md:py-32 bg-slate-100 dark:bg-[#020617] transition-colors duration-300 overflow-hidden border-y border-slate-200 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-12">
            <header className="space-y-6">
               <div className="inline-flex items-center px-4 py-1.5 bg-authority-blue text-white rounded-lg text-[10px] font-black uppercase tracking-widest">QUALIFICATION PARAMETERS</div>
               <h2 className="text-4xl sm:text-6xl md:text-[5rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
                 WHO THIS <span className="text-signal-gold italic">IS FOR.</span>
               </h2>
            </header>
            <div className="lg:max-w-md border-l-4 border-signal-gold pl-8">
              <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                LaunchPath is engineered for specific operator profiles who prioritize structural safety over speculative growth.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "BOX TRUCK OPERATORS", 
                icon: <Truck size={36} />, 
                tag: "Local & Interstate",
                desc: "Carriers operating CMVs between 10,001–26,000 lbs GVWR. CDL and Non-CDL lanes included. Focusing on high-integrity last-mile and middle-mile logistics." 
              },
              { 
                title: "SEMI-TRUCK STARTUPS", 
                icon: <Building size={36} />, 
                tag: "Class 8 Equipment",
                desc: "New motor carriers running 1–3 units who prioritize long-term operating authority protection. Ideal for former company drivers transitioning to stewardship." 
              },
              { 
                title: "SAFETY MANAGERS", 
                icon: <UserCheck size={36} />, 
                tag: "Administrative Control",
                desc: "Personnel responsible for maintaining carrier documentation integrity and federal compliance files. Systematizing the back-office standard." 
              },
              { 
                title: "INSURANCE PARTNERS", 
                icon: <ShieldCheck size={36} />, 
                tag: "Risk Mitigation",
                desc: "Agencies and underwriters seeking pre-qualified, compliance-educated new entrants with documented safety posture and permanent audit-ready status." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-authority-blue transition-all duration-700 flex flex-col sm:flex-row gap-10 group">
                <div 
                  className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 group-hover:bg-authority-blue group-hover:text-signal-gold transition-all duration-500 shrink-0"
                  style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                  {card.icon}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-signal-gold bg-signal-gold/10 px-3 py-1 rounded-md">{card.tag}</span>
                  </div>
                  <h4 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight leading-tight">{card.title}</h4>
                  <p className="text-base font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BUILT-IN SYSTEMS (Technical / Modular Focus) */}
      <section ref={systemsRef} className="py-24 md:py-40 bg-white dark:bg-primary-dark transition-colors duration-300 border-y border-slate-100 dark:border-border-dark overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <header className="text-center mb-16 md:mb-28 space-y-6">
             <div className="inline-flex items-center space-x-2 text-authority-blue dark:text-signal-gold opacity-50">
               <Cpu size={14} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Integrated Compliance Infrastructure</span>
             </div>
             <h2 className="text-4xl sm:text-6xl md:text-[5.5rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
               BUILT-IN <span className="text-signal-gold italic">SYSTEMS.</span>
             </h2>
             <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed mt-8">
               More than curriculum. LaunchPath includes high-fidelity tools designed for real-world carrier orchestration.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                title: "TCO CALCULATOR", 
                icon: <Calculator size={32} />, 
                tagline: "FISCAL_ANALYSIS_V4",
                desc: "Break-even analysis and cost-per-mile modeling for operational survival math. Remove revenue speculation.", 
                link: "/tools/tco-preview", 
                badge: "ENROLLED" 
              },
              { 
                title: "READINESS ASSESSMENT", 
                icon: <ClipboardCheck size={32} />, 
                tagline: "DIAGNOSTIC_UPLINK",
                desc: "Scored evaluation of your compliance posture before you begin operations. Identify terminal gaps early.", 
                link: "/readiness", 
                badge: "FREE" 
              },
              { 
                title: "COMPLIANCE ASSISTANT", 
                icon: <MessageSquare size={32} />, 
                tagline: "NEURAL_ADVISOR",
                desc: "AI-powered regulatory reference assistant for FMCSA terminology, 49 CFR logic, and system navigation.", 
                link: "/ai-advisor", 
                badge: "FREE" 
              },
              { 
                title: "RESOURCE LIBRARY", 
                icon: <BookOpen size={32} />, 
                tagline: "TECHNICAL_ARCHIVE",
                desc: "Implementation templates, regulatory references, and vetted service provider directory for immediate usage.", 
                link: "/resources", 
                badge: "FREE" 
              }
            ].map((sys, i) => (
              <div key={i} className="bg-slate-50/50 dark:bg-surface-dark/50 p-10 rounded-[3rem] border-2 border-slate-100 dark:border-border-dark flex flex-col relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(30,58,95,0.15)] hover:-translate-y-2 hover:border-authority-blue/20 transition-all duration-500 backdrop-blur-sm">
                {/* System ID Tag */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-2">
                    <Workflow size={12} className="text-slate-400 group-hover:text-authority-blue transition-colors" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{sys.tagline}</span>
                  </div>
                  <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-sm z-10 ${
                    sys.badge === 'ENROLLED' 
                      ? 'bg-authority-blue text-white' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {sys.badge}
                  </div>
                </div>

                <div 
                  className="w-16 h-16 bg-white dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-10 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-authority-blue group-hover:text-signal-gold relative z-10"
                  style={{ transform: `translateY(${systemsParallaxOffset}px)` }}
                >
                  {sys.icon}
                </div>
                
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-tight min-h-[3rem] flex items-center relative z-10 transition-colors group-hover:text-authority-blue dark:group-hover:text-signal-gold">{sys.title}</h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-12 flex-grow leading-relaxed relative z-10">{sys.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-border-dark relative z-10">
                  <Link to={sys.link} className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:opacity-70 transition-all group/link">
                    <span>EXECUTE SYSTEM ACCESS</span> 
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>

                {/* Technical Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-200 dark:border-border-dark rounded-tr-[3rem] transition-colors group-hover:border-authority-blue/30"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-slate-200 dark:border-border-dark rounded-bl-[3rem] transition-colors group-hover:border-authority-blue/30"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center opacity-30">
            <div className="flex items-center space-x-4">
              <div className="h-px w-24 bg-slate-300"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Modular Integrated Environment Active</span>
              <div className="h-px w-24 bg-slate-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. COMMON QUESTIONS (Restored FAQ) */}
      <section className="py-24 md:py-32 bg-white dark:bg-primary-dark overflow-hidden transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-20 space-y-4">
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">FAQS</p>
             <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">
               COMMON <span className="text-signal-gold italic">QUESTIONS.</span>
             </h2>
          </header>

          <div className="space-y-4">
            {[
              {
                q: "Does LaunchPath guarantee I will pass a new entrant safety audit?",
                a: "No. LaunchPath does not guarantee audit outcomes. Final determination is made solely by the FMCSA based on their independent investigation. We provide the institutional framework and documentation systems. The carrier provides the operational discipline. We don't sell a 'pass' — we sell the infrastructure for carriers who refuse to operate in a state of exposure.",
                icon: <ShieldAlert size={18} />
              },
              {
                q: "What if my insurance quote is higher than expected?",
                a: "Insurance pricing is based on factors outside our control — your location, commodity, driving history, and market conditions. LaunchPath teaches you how to present your operation professionally to underwriters, but we cannot influence premium rates.",
                icon: <CreditCard size={18} />
              },
              {
                q: "Is LaunchPath for non-CDL box truck carriers?",
                a: "Yes. LaunchPath covers all interstate motor carriers operating CMVs over 10,001 lbs GVWR, including non-CDL operations between 10,001–26,000 lbs.",
                icon: <Truck size={18} />
              },
              {
                q: "Can I skip sections or move ahead before completing required steps?",
                a: "No. The curriculum follows a sequential implementation calendar. Each phase builds on the previous. Skipping creates gaps in your compliance infrastructure.",
                icon: <Lock size={18} />
              },
              {
                q: "Is there a recurring monthly subscription fee?",
                a: "No. Enrollment is a one-time fee with lifetime access to the curriculum and tools.",
                icon: <DollarSign size={18} />
              }
            ].map((faq, idx) => (
              <FAQItem 
                key={idx} 
                question={faq.q} 
                answer={faq.a} 
                icon={faq.icon} 
                isOpen={openFaqIndex === idx} 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} 
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/faq" className="inline-flex items-center text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:underline group">
               <span>VIEW FULL INSTITUTIONAL FAQ</span>
               <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-24 md:py-48 bg-[#0c1a2d] text-white overflow-hidden relative transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10 space-y-12">
           <header className="space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tight leading-none">
                BUILD YOUR CARRIER LIKE A <br/><span className="text-signal-gold italic">CARRIER EXECUTIVE.</span>
              </h2>
              <div className="h-1.5 w-24 bg-signal-gold mx-auto rounded-full mb-10"></div>
              <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
                You didn't get your authority to hope you don't get audited. You got it to build something that lasts. LaunchPath gives you the infrastructure to operate with the same documentation discipline as carriers 10x your size.
              </p>
              <p className="text-lg md:text-xl font-black text-signal-gold uppercase tracking-[0.2em] mt-8">
                The first 90 days determine the next 18 months. Start with order.
              </p>
           </header>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link to="/readiness" className="w-full sm:w-auto bg-signal-gold text-authority-blue px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center group">
                 TAKE THE REACH TEST™
                 <ArrowRight size={20} className="ml-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto border-2 border-white/20 px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white/5 transition-all flex items-center justify-center">
                 VIEW ADMISSION PROTOCOL
              </Link>
           </div>
           
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 pt-16">
              VETERAN OWNED & OPERATED • ACCURACY OVER HYPE.™
           </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
