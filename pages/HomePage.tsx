import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield,
  ChevronRight,
  Briefcase,
  Calculator,
  CheckCircle2,
  Lock,
  Zap,
  Activity,
  ShieldAlert,
  ChevronDown,
  Award,
  Truck,
  ShieldX,
  FileWarning,
  HardDrive,
  Fingerprint,
  Gavel,
  Terminal,
  FileSearch,
  ClipboardCheck,
  UserCheck,
  BarChart3,
  Target,
  ShieldCheck,
  DollarSign,
  FileText
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
    <article className={`border transition-all duration-500 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden ${
      isOpen 
      ? 'border-[#002244] bg-white dark:bg-surface-dark shadow-2xl ring-1 ring-[#002244]/5' 
      : 'border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm hover:border-[#002244]/30'
    }`}>
      <h3>
        <button 
          onClick={onClick}
          className="w-full flex items-center justify-between p-5 sm:p-10 text-left focus:outline-none group"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isOpen ? 'bg-[#002244] text-[#C5A059] shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'
            }`}>
              {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
            </div>
            <span className={`text-lg sm:text-2xl font-black tracking-tight uppercase transition-colors duration-300 ${
              isOpen ? 'text-[#002244] dark:text-[#C5A059]' : 'text-slate-700 dark:text-text-dark-primary'
            }`}>
              {question}
            </span>
          </div>
          <div className={`p-2 rounded-full transition-all duration-500 ${
            isOpen ? 'bg-[#002244] text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'
          }`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
      </h3>
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-8 sm:pb-10' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-12 pt-0 text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 pt-6 sm:pt-8">
            <p className="text-base sm:text-xl whitespace-pre-wrap">
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

  useEffect(() => {
    document.title = "LaunchPath | 90-Day Owner-Operator Survival System";
  }, []);

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
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-6 sm:p-12 md:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-8 sm:space-y-12 animate-reveal-up">
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/5 border border-white/10 px-3 sm:px-5 py-2 rounded-full">
                <ShieldCheck size={12} className="text-[#C5A059]" />
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white">VETERAN OPERATED</span>
              </div>
              <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-white/5 border border-white/10 px-3 sm:px-5 py-2 rounded-full">
                <Award size={12} className="text-[#C5A059]" />
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white">SAFETY CERTIFIED</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.9]">
                PROTECT <br className="hidden sm:block"/>YOUR <br/><span className="text-[#C5A059]">AUTHORITY</span><br className="hidden sm:block"/>WITH <br className="hidden sm:block"/>ORDER.
              </h1>
            </div>
            
            <div className="max-w-xl border-l-[8px] sm:border-l-[12px] border-[#C5A059] pl-6 sm:pl-10 py-2 sm:py-4">
              <p className="text-lg sm:text-2xl font-bold text-white/90 leading-[1.4] sm:leading-[1.6]">
                Most new carriers establish compliance within the first 90 days — or inherit consequences for 18 months.
              </p>
            </div>

            <div className="pt-4 sm:pt-8">
              <Link to="/readiness" className="inline-flex items-center space-x-4 sm:space-x-6 bg-[#C5A059] text-[#002244] px-8 sm:px-12 py-5 sm:py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] sm:text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-4 sm:border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] bg-slate-100 dark:bg-slate-900 relative p-6 sm:p-12 md:p-16 flex items-center">
          <div className="bg-white dark:bg-surface-dark p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden group w-full">
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <div className="bg-[#C5A059] text-[#002244] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] shadow-lg">FREE ACCESS</div>
            </div>
            
            <div className="relative z-10 mt-10 sm:mt-12 flex flex-col">
              {scanState === 'idle' ? (
                <>
                  <header className="mb-6 sm:mb-10">
                       <h3 className="text-3xl sm:text-[3.5rem] font-black font-serif uppercase tracking-tighter text-[#002244] dark:text-white leading-[0.85]">
                         90 DAY <br/>
                         <span className="text-[#C5A059] italic">RISK MAP™</span>
                       </h3>
                       <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-4 sm:mt-6 border-t border-slate-100 pt-4 sm:pt-6">Diagnostic Terminal</p>
                  </header>
                  
                  <form onSubmit={handleRiskMapSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 sm:ml-4">LEGAL ENTITY NAME</label>
                      <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-[#002244] outline-none px-5 sm:px-6 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all" placeholder="JANE DOE" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 sm:ml-4">REGISTRY EMAIL</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-[#002244] outline-none px-5 sm:px-6 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all" placeholder="JANE@CARRIER.COM" />
                    </div>
                    <button type="submit" className="w-full bg-[#002244] text-white py-6 sm:py-8 rounded-2xl sm:rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs shadow-xl hover:bg-[#003366] transition-all flex items-center justify-center group border-b-4 sm:border-b-8 border-slate-900">
                      VIEW MY RISK MAP <ChevronRight className="ml-2 sm:ml-3 group-hover:translate-x-1" size={18} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 sm:py-20 text-center space-y-6 sm:space-y-8 animate-in fade-in">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 sm:border-8 border-[#002244]/10 border-t-[#002244] animate-spin mx-auto"></div>
                  <div className="bg-slate-50 dark:bg-black/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border font-mono text-[8px] sm:text-[10px] text-[#002244] dark:text-emerald-500 text-left h-40 sm:h-48 overflow-hidden relative shadow-inner">
                    <div className="space-y-1 sm:space-y-2">
                      {scanLog.map((log, i) => <div key={i}>[{new Date().toLocaleTimeString([], {hour12:false})}] {log}</div>)}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#002244] dark:text-emerald-500 flex items-center">
                  <ShieldCheck size={12} className="mr-1.5" /> UPLINK ACTIVE
                </p>
                <p className="text-[8px] font-black text-slate-300 uppercase">LP-SYS-V4.5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PATTERN SECTION */}
      <section className="py-16 sm:py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group mx-auto lg:mx-0 max-w-[400px] lg:max-w-none">
                <div className="bg-[#002244] rounded-[3rem] sm:rounded-[4rem] shadow-2xl overflow-hidden relative border-[8px] sm:border-[12px] border-[#FAF9F6]">
                  <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince Lawrence" className="w-full h-auto grayscale opacity-95 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute bottom-0 left-0 w-full bg-[#002244]/90 backdrop-blur-md py-4 sm:py-6 text-center border-t border-white/10">
                    <p className="text-[8px] sm:text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em]">SYSTEM CUSTODIAN</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#C5A059] p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border-4 sm:border-8 border-white hidden sm:block z-20 group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="text-[#002244]" size={32} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 sm:space-y-10 order-1 lg:order-2">
              <header className="space-y-4 sm:space-y-6">
                <p className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.5em] text-slate-400">THE PATTERN</p>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-[0.95]">
                  I'VE WATCHED THIS <br/><span className="text-red-600 italic">FAIL</span> 200 TIMES.
                </h2>
              </header>

              <div className="space-y-6 sm:space-y-10 text-lg sm:text-2xl font-bold text-slate-600 dark:text-slate-300 leading-[1.5] sm:leading-[1.6] border-l-[8px] sm:border-l-[12px] border-slate-100 dark:border-border-dark pl-6 sm:pl-12">
                <p>
                  I spent 25 years in manufacturing leadership and 7 years in the US Navy. In those environments, <span className="text-[#002244] dark:text-white font-black">systems weren't elective; they were survival.</span>
                </p>
                <p className="text-2xl sm:text-3xl font-black text-[#002244] dark:text-white font-serif tracking-tight leading-tight">
                  I refuse to reverse the order of wisdom. <br/><span className="text-[#C5A059] italic">Order precedes revenue.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 16 DEADLY SINS MATRIX */}
      <section id="exposure-matrix" className="bg-[#020617] py-16 sm:py-24 lg:py-48 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
          
          <header className="mb-16 sm:mb-24 lg:mb-40 flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-reveal-up">
             <div className="w-16 h-16 sm:w-24 sm:h-24 bg-red-600/10 text-red-500 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center mb-6 sm:mb-10 border-2 border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
               <ShieldX size={32} />
             </div>
             <div className="space-y-3 sm:space-y-4">
                <p className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.5em] text-red-500">The Exposure Taxonomy</p>
                <h2 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black font-serif text-white uppercase tracking-tighter leading-[0.9]">
                  THE 16 DEADLY SINS OF <br/><span className="text-red-600 italic">CARRIER FAILURE.</span>
                </h2>
             </div>
             <p className="text-lg sm:text-2xl font-bold text-slate-500 max-w-4xl leading-relaxed uppercase tracking-tight">
               IDENTIFICATION OF HIGH-PROBABILITY FAILURE PATTERNS USED BY INVESTIGATORS.
             </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {riskDomains.map((domain, dIdx) => (
              <div key={dIdx} className="space-y-8 sm:space-y-12 animate-reveal-up">
                <header className="flex items-center justify-between border-b border-white/10 pb-6 sm:pb-10">
                   <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center">
                        {React.cloneElement(domain.icon as React.ReactElement<any>, { size: 24 })}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight font-serif">{domain.domain}</h3>
                        <p className="text-[8px] sm:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-1">{domain.id}</p>
                      </div>
                   </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  {domain.items.map((item) => (
                    <article key={item.id} className="bg-[#0c1a2d] border border-white/5 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] flex flex-col space-y-6 sm:space-y-10 group hover:border-red-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                       <header className="space-y-2 sm:space-y-4 relative z-10">
                          <span className="text-[10px] font-black text-slate-600 font-mono tracking-tighter block">{item.id}</span>
                          <h4 className="text-[17px] sm:text-[19px] font-black text-white uppercase leading-tight tracking-tight h-auto sm:h-[50px]">{item.text}</h4>
                       </header>
                       
                       <div className="space-y-4 sm:space-y-8 flex-grow relative z-10">
                          <div className="flex justify-between items-end border-b border-white/[0.03] pb-3">
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Result</p>
                             <p className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-tight">{item.result}</p>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Severity</p>
                             <div className={`px-4 py-1.5 rounded-lg flex items-center space-x-2 border ${item.severity === 'TERMINAL' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                                <Zap size={12} className="fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">{item.severity}</span>
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

      {/* 4. THE OUTCOME SECTION */}
      <section className="py-16 sm:py-24 md:py-48 bg-[#FAF9F6] dark:bg-surface-dark transition-colors">
        <div className="max-w-[1600px] mx-auto px-6">
          <header className="text-center mb-16 sm:mb-32 space-y-6 sm:space-y-8 animate-reveal-up">
             <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.5em] text-slate-400">THE OUTCOME</p>
             <h2 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-[0.9]">
               THE <span className="text-[#C5A059] italic">EXECUTIVE</span> STANDARD.
             </h2>
             <p className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase">
               The transformation from a driver with a dream to a carrier with infrastructure.
             </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {[
              { 
                icon: <ClipboardCheck size={40} />, 
                title: "Audit-Ready Infrastructure", 
                desc: "Establish a documentation standard where federal auditors find zero \"Reach Test\" hazards." 
              },
              { 
                icon: <UserCheck size={40} />, 
                title: "Preferred Risk Profile", 
                desc: "Maintain a safety record that forces insurance underwriters to offer your business the lowest possible rates." 
              },
              { 
                icon: <BarChart3 size={40} />, 
                title: "Financial Sovereignty", 
                desc: "Use industrial-grade tracking to ensure every mile driven contributes to net wealth, not just revenue." 
              }
            ].map((pillar, i) => (
              <article key={i} className="bg-white dark:bg-primary-dark p-8 sm:p-12 lg:p-20 rounded-[3rem] sm:rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:shadow-xl transition-all duration-700">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[#FAF9F6] dark:bg-gray-800 text-[#C5A059] rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center mb-8 sm:mb-12 shadow-inner group-hover:scale-110 transition-all duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002244] dark:text-white uppercase leading-tight mb-6 sm:mb-8 font-serif tracking-tight group-hover:text-[#C5A059] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-base sm:text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tight">
                  {pillar.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-16 sm:py-24 md:py-48 bg-[#002244] text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10 space-y-12 sm:space-y-16">
           <header className="space-y-6 sm:space-y-10">
              <h2 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black font-serif uppercase tracking-tight leading-none">BUILD YOUR CARRIER LIKE A <br/><span className="text-[#C5A059] italic">CARRIER EXECUTIVE.</span></h2>
              <p className="text-lg sm:text-2xl md:text-3xl text-slate-300 font-medium max-w-4xl mx-auto leading-[1.4] sm:leading-[1.6]">LaunchPath gives you the infrastructure to operate with discipline and pass the federal REACH Test™.</p>
           </header>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-6">
              <Link to="/readiness" className="w-full sm:w-auto bg-[#C5A059] text-[#002244] px-10 sm:px-24 py-6 sm:py-12 rounded-[2rem] sm:rounded-[3rem] font-black uppercase tracking-[0.3em] text-[16px] sm:text-[18px] shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center justify-center group border-b-4 sm:border-b-8 border-[#8e7340]">TAKE THE REACH TEST™ <ArrowRight size={24} className="ml-3 sm:ml-5 group-hover:translate-x-2 transition-transform" /></Link>
              <Link to="/pricing" className="w-full sm:w-auto border-2 sm:border-4 border-white/20 px-10 sm:px-24 py-6 sm:py-12 rounded-[2rem] sm:rounded-[3rem] font-black uppercase tracking-[0.3em] text-[16px] sm:text-[18px] hover:bg-white/5 transition-all flex items-center justify-center">ADMISSION PROTOCOL</Link>
           </div>
           
           <p className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.5em] text-white/20 pt-8 sm:pt-12">BUILT ON WISDOM • ESTABLISHED WITH UNDERSTANDING.™</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;