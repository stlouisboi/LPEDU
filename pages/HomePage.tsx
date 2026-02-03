
import React, { useState, useEffect } from 'react';
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
  Skull,
  AlertOctagon,
  AlertCircle,
  ClipboardCheck,
  Cpu,
  FileText,
  DollarSign,
  CreditCard,
  Users,
  UserCheck,
  Scale
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../firebase';
import { HomepageContent } from '../types';

const FAQItem: React.FC<{ 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  icon: React.ReactNode;
  onClick: () => void 
}> = ({ question, answer, isOpen, icon, onClick }) => {
  return (
    <article className={`border transition-all duration-500 rounded-[2rem] overflow-hidden ${
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
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  
  const [dynamicContent, setDynamicContent] = useState<HomepageContent | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const homeRef = doc(db, "pages", "home_live");
    const unsubscribe = onSnapshot(homeRef, (docSnap) => {
      if (docSnap.exists()) {
        setDynamicContent(docSnap.data() as HomepageContent);
      }
    }, (err) => {
      console.warn("HomePage: Live sync restricted or offline.", err.message);
    });
    return () => unsubscribe();
  }, []);

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

  const sinsData = [
    {
      category: "CHEMICAL DEPENDENCY",
      items: [
        { id: "01", text: "Lack of random drug program", impact: "Audit Failure", severity: "TERMINAL" },
        { id: "02", text: "Positive driver results", impact: "Revocation", severity: "TERMINAL" },
        { id: "03", text: "Federal Clearinghouse error", impact: "Violation", severity: "HIGH RISK" },
        { id: "04", text: "Omission of screening", impact: "Exposure", severity: "HIGH RISK" }
      ]
    },
    {
      category: "DRIVER ELIGIBILITY",
      items: [
        { id: "05", text: "Revoked license use", impact: "OOS Event", severity: "CRITICAL" },
        { id: "06", text: "Invalid medical certs", impact: "Downgrade", severity: "CRITICAL" },
        { id: "07", text: "No DQ file framework", impact: "Audit Red Flag", severity: "HIGH RISK" },
        { id: "08", text: "Missing background inquiries", impact: "Default", severity: "HIGH RISK" }
      ]
    },
    {
      category: "OPERATIONAL SAFETY",
      items: [
        { id: "09", text: "Exceeding HOS limits", impact: "Negligence", severity: "CRITICAL" },
        { id: "10", text: "Dispatching OOS vehicles", impact: "Termination", severity: "TERMINAL" },
        { id: "11", text: "Poor duty status records", impact: "Multiplier", severity: "HIGH RISK" },
        { id: "12", text: "No vehicle inspections", impact: "Liability", severity: "HIGH RISK" }
      ]
    },
    {
      category: "ADMIN INTEGRITY",
      items: [
        { id: "13", text: "Unverified insurance levels", impact: "Blacklist", severity: "CRITICAL" },
        { id: "14", text: "Missing filings (BOC-3)", impact: "Suspension", severity: "TERMINAL" },
        { id: "15", text: "No maintenance program", impact: "Exposure", severity: "HIGH RISK" },
        { id: "16", text: "Late accident reporting", impact: "Legal Default", severity: "CRITICAL" }
      ]
    }
  ];

  const homepageFaqs = [
    {
      q: "Does LaunchPath guarantee I will pass a New Entrant Safety Audit?",
      a: "No. LaunchPath does not guarantee audit outcomes. Final determination is made solely by the FMCSA based on their independent investigation. We provide the institutional framework and documentation systems. The carrier provides the operational discipline. We don't sell a 'pass' — we sell the infrastructure for carriers who refuse to operate in a state of exposure.",
      icon: <ShieldAlert size={20} />
    },
    {
      q: "What if my insurance quote is higher than expected?",
      a: "Insurance pricing for new authorities is risk-based and market-driven. LaunchPath does not set, negotiate, or guarantee rates. The Insurance Continuity pillar moves you from exposure to refuge through systematic documentation, safety posture implementation, and renewal discipline. If TCO analysis indicates the business model is non-viable, the Standard dictates a delay in operations rather than a compromise in compliance.",
      icon: <CreditCard size={20} />
    },
    {
      q: "Is LaunchPath for non-CDL box truck carriers?",
      a: "Yes. The operating standard applies to all motor carriers operating commercial motor vehicles in interstate commerce, regardless of driver licensing class. Regulatory requirements for DQ files, HOS, and maintenance are consistent across CDL and non-CDL categories.",
      icon: <Truck size={20} />
    },
    {
      q: "Can I skip sections or move ahead before completing required steps?",
      a: "No. LaunchPath progression is gated by verification checkpoints. Advancement requires submission and review against the LaunchPath Standard. This structure exists to protect authority, insurance continuity, and compliance integrity.",
      icon: <Lock size={20} />
    },
    {
      q: "Is there a recurring monthly subscription fee?",
      a: "LaunchPath operates on a single-access admission model. Once admitted, you receive access to the full implementation system and technical files required for the 90-day stabilization window. One standard. One path. One price.",
      icon: <DollarSign size={20} />
    }
  ];

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
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif text-authority-blue dark:text-white">
              PROTECT YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> WITH <br/>ORDER AND CERTAINTY.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="hidden md:block text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
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
                <ShieldAlert size={180} />
              </div>
              
              <div className="relative z-10">
                <header className="flex justify-between items-start mb-8 md:mb-12">
                   <div>
                     <h3 className="text-xs md:text-sm font-black uppercase text-authority-blue dark:text-signal-gold tracking-widest md:tracking-[0.4em] mb-1 md:mb-2">FORMAL</h3>
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">ADMISSION <br/>INQUIRY</h3>
                   </div>
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-300">
                     <Lock size={14} />
                   </div>
                </header>
                
                <form onSubmit={handleLeadSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">FULL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm dark:text-white" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">EMAIL</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm dark:text-white" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-authority-blue text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" /> : <ChevronRight className="mr-3" size={18} />}
                    REQUEST PROGRAM INFORMATION
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. AUTHORITY BAR */}
      <section className="bg-white dark:bg-primary-dark border-y border-slate-100 dark:border-border-dark py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 opacity-80">
            {[
              { icon: <ShieldCheck className="text-authority-blue dark:text-signal-gold" size={20} />, text: "VETERAN-OWNED" },
              { icon: <UserCheck className="text-authority-blue dark:text-signal-gold" size={20} />, text: "25+ YEARS OPERATIONS LEADERSHIP" },
              { icon: <Briefcase className="text-authority-blue dark:text-signal-gold" size={20} />, text: "OSHA-CERTIFIED SAFETY COORDINATOR" },
              { icon: <Activity className="text-authority-blue dark:text-signal-gold" size={20} />, text: "200+ CARRIER COMPLIANCE PATTERNS EXPOSED" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                {item.icon}
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE WOUND */}
      <section className="py-24 md:py-48 bg-[#F8FAFC] dark:bg-surface-dark overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <header className="mb-16 space-y-8">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE PATTERN</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              I'VE WATCHED THIS SATISFACTORILY <br/><span className="text-red-600 italic">FAIL</span> 200 TIMES.
            </h2>
          </header>

          <div className="space-y-12">
            <div className="space-y-8 text-lg md:text-xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed text-left border-l-4 border-slate-200 dark:border-border-dark pl-8">
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
              <a href="#exposure-patterns" className="inline-flex items-center space-x-4 bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group">
                <span>SEE THE 16 EXPOSURE PATTERNS</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* 4. THE STANDARD */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark border-t border-slate-50 dark:border-border-dark overflow-hidden">
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
               <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border-t-8 border-red-500/30 space-y-8 shadow-sm">
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

      {/* 5. BOUNDARIES */}
      <section className="py-24 md:py-48 bg-[#0c1a2d] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <header className="space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-signal-gold">BOUNDARIES</p>
            <h2 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tight leading-none">
              THIS IS NOT <br/><span className="italic">FOR EVERYONE.</span>
            </h2>
          </header>
          
          <div className="space-y-10 text-xl font-medium text-slate-300 leading-relaxed max-w-2xl mx-auto">
            <p>If you're looking for a course on how to make money in trucking — <span className="text-white font-black">this isn't it.</span></p>
            <p>If you want dispatch training or load board strategies — <span className="text-white font-black">we don't offer that.</span></p>
            <p>If you're hoping for a motivational speaker to tell you it's going to be easy — <span className="text-white font-black text-red-400">wrong room.</span></p>
            
            <div className="h-px w-20 bg-white/10 mx-auto my-12"></div>
            
            <p className="text-2xl font-black uppercase tracking-tight text-white">
              LaunchPath is for owner-operators who understand that their authority is a federal license to be audited — and they want to be ready when it happens.
            </p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest pt-8">
              If that's not you, no hard feelings. If it is — keep reading.
            </p>
          </div>
        </div>
      </section>

      {/* 6. THE FOUR PILLARS */}
      <section className="py-24 md:py-32 lg:py-48 bg-white dark:bg-primary-dark transition-colors">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="text-center mb-16 md:mb-24 space-y-6">
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE INFRASTRUCTURE</p>
             <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
               THE FOUR SYSTEMS THAT <span className="text-signal-gold italic">KEEP YOU OPERATING.</span>
             </h2>
             <p className="text-xl font-bold text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
               Every carrier failure traces back to a breakdown in one of these four areas. LaunchPath installs verified infrastructure in each.
             </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
             {[
               {
                 icon: <Briefcase />,
                 title: "AUTHORITY PROTECTION",
                 tagline: "STRUCTURAL STEWARDSHIP",
                 desc: "Managing federal authority as an entrusted asset. Build a foundation that survives scrutiny through absolute administrative order."
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "RISK RESPONSIBILITY",
                 desc: "Protecting your right to operate. Maintain permanent coverage by documenting safety as a non-negotiable operational discipline."
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "SYSTEMIC INTEGRITY",
                 desc: "Executing federal standards with precision. Replace human memory with verifiable systems that prove your compliance daily."
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "FISCAL STEWARDSHIP",
                 desc: "Securing the mission through economic truth. Use TCO math to ensure your business remains solvent, stable, and viable.",
                 hookLine: "Run your numbers before you commit."
               }
             ].map((pillar, i) => (
               <article key={i} className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-2 font-serif tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest text-signal-gold mb-6">{pillar.tagline}</p>
                  <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                  {pillar.hookLine && (
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600/70 dark:text-emerald-400/70 italic mt-4">
                      {pillar.hookLine}
                    </p>
                  )}
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* 7. THE 16 DEADLY SINS */}
      <section id="exposure-patterns" className="bg-slate-100 dark:bg-primary-dark py-24 lg:py-40 border-t border-b border-slate-200 dark:border-border-dark">
        <div className="max-w-7xl mx-auto