
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
  Anchor,
  ShieldCheck,
  Map as MapIcon,
  Compass,
  Target,
  Radar,
  User as UserIcon,
  Plus,
  Minus,
  ChevronDown,
  Award,
  Users,
  Truck,
  HelpCircle,
  MessageCircle,
  Skull,
  AlertOctagon,
  AlertCircle,
  ClipboardCheck,
  Cpu,
  FileText,
  DollarSign,
  CreditCard
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

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

  const toolsData = [
    { 
      title: "TCO Calculator", 
      desc: "Break-even analysis and cost-per-mile modeling for operational survival math.", 
      icon: <Calculator size={24} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      link: "/tools/tco-calculator"
    },
    { 
      title: "Readiness Assessment", 
      desc: "Scored evaluation of your compliance posture before you begin operations.", 
      icon: <ClipboardCheck size={24} className="text-authority-blue" />,
      bg: "bg-blue-50",
      link: "/readiness"
    },
    { 
      title: "Compliance Reference", 
      desc: "AI-powered regulatory reference assistant for FMCSA terminology and system logic.", 
      icon: <Cpu size={24} className="text-signal-gold" />,
      bg: "bg-amber-50",
      link: "/ai-advisor"
    },
    { 
      title: "Resource Library", 
      desc: "Implementation templates, regulatory references, and vetted service provider directory.", 
      icon: <FileText size={24} className="text-slate-600" />,
      bg: "bg-slate-100",
      link: "/resources"
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

  const modules = [
    { n: "GROUND 0", t: "THE MINDSET MODULE", d: "Readiness assessment, risk tolerance, and your Go/No-Go decision." },
    { n: "MODULE 1", t: "BUSINESS & AUTHORITY SETUP", d: "Entity formation, DOT and MC number filing, Driver Qualification File construction." },
    { n: "MODULE 2", t: "INSURANCE & RISK MANAGEMENT", d: "Required coverages, policy shopping, cancellation prevention." },
    { n: "MODULE 3", t: "THE 16 DEADLY SINS", d: "The most common compliance exposures that cause audit failure and enforcement action." },
    { n: "MODULE 4", t: "AUDIT VERIFICATION", d: "New Entrant Safety Audit preparation, documentation review, and readiness verification." },
    { n: "MODULE 5", t: "LOAD DISCIPLINE & CASH FLOW", d: "True cost per mile calculation and financial sustainability systems." },
    { n: "MODULE 6", t: "STABILIZATION & GROWTH", d: "Transitioning from survival mode to sustainable, repeatable operations." }
  ];

  return (
    <div id="main-content" className="animate-in fade-in duration-700 relative overflow-x-hidden bg-[#FAF9F6] dark:bg-primary-dark font-sans text-authority-blue leading-relaxed selection:bg-signal-gold/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA (Federal Safety) Standard</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif text-authority-blue dark:text-white">
              PROTECT YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> WITH <br/>ABSOLUTE ORDER.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                LaunchPath is a structured setup standard for new motor carriers. We verify your business readiness (stewardship) before you begin hauling.
              </p>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                IT IS A STRUCTURED SYSTEM FOR DOCUMENTATION INTEGRITY AND SAFETY MANAGEMENT.
              </p>
            </div>

            <nav className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4">
              <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-2xl border-b-4 border-slate-900">
                Take the REACH Test™
              </Link>
              <Link to="/about" className="w-full sm:w-auto bg-transparent border-2 border-authority-blue/20 dark:border-white/20 text-authority-blue dark:text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em]">
                Review Program Standard
              </Link>
            </nav>
          </div>

          <aside className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(30,58,95,0.15)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <ShieldAlert size={180} />
              </div>
              <div className="relative z-10">
                <header className="flex justify-between items-start mb-8 md:mb-12">
                   <div>
                     <h3 className="text-xs md:text-sm font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.4em] mb-1 md:mb-2">FORMAL</h3>
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">ADMISSION <br/>INQUIRY</h3>
                   </div>
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-300">
                     <Lock size={14} />
                   </div>
                </header>
                
                <form onSubmit={handleLeadSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">FULL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm dark:text-white" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">EMAIL</label>
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
                    className="w-full bg-authority-blue text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] md:text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group"
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

      {/* 2. FAILURE IS A SETUP PROBLEM */}
      <section className="py-24 md:py-32 lg:py-64 bg-authority-blue dark:bg-surface-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          
          <article className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <ShieldAlert size={16} className="text-signal-gold" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">STRUCTURAL RISK EXPOSURE</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              FAILURE IS <br/>A <span className="text-signal-gold italic">SETUP</span> <br/>PROBLEM.
            </h2>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight text-white/90">
                Most carrier failures happen because systems are not set up correctly. Small mistakes in your paperwork today create major risks during your first 18 months.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-10">
                A single documentation gap today creates a risk that insurance companies and federal auditors will eventually find. LaunchPath provides the safety of verified systems.
              </p>
              <nav>
                <Link to="/reach-test" className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-signal-gold hover:text-white transition-all shadow-xl inline-flex items-center">
                  FIND YOUR COMPLIANCE GAPS
                </Link>
              </nav>
            </div>
          </article>

          <aside className="lg:col-span-5 relative w-full group/card-wrapper">
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-10 scale-[1.7] pointer-events-none group-hover/card-wrapper:scale-[1.8] group-hover/card-wrapper:opacity-20 transition-all duration-1000">
               <Fingerprint size={400} strokeWidth={0.5} className="text-white" />
            </div>

            <div className="bg-white rounded-[3.5rem] md:rounded-[4.5rem] p-10 md:p-14 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 relative z-10 text-authority-blue w-full hover:-translate-y-2 transition-all duration-500 ring-1 ring-black/5">
               
               <header className="mb-10 md:mb-12">
                 <h3 className="text-2xl md:text-3xl font-black font-serif uppercase tracking-tight leading-[1.1] text-[#1E3A5F]">
                   IDENTIFICATION & <br/>ALIGNMENT
                 </h3>
                 <div className="h-1.5 w-16 bg-signal-gold mt-6 rounded-full"></div>
               </header>

               <div className="space-y-4 md:space-y-5">
                  {[
                    "DQ (DRIVER QUALIFICATION) FILE INTEGRITY",
                    "ENFORCEMENT RESPONSE",
                    "INSURANCE CONTINUITY",
                    "MAINTENANCE GOVERNANCE"
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-5 md:p-7 bg-[#F8FAFC] rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 group/item hover:bg-white hover:shadow-xl hover:border-authority-blue/10 transition-all duration-300"
                    >
                       <div className="flex items-center space-x-5 md:space-x-7">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center group-hover/item:border-signal-gold group-hover/item:bg-signal-gold/5 transition-all duration-300 shadow-sm">
                            <div className="relative">
                              <ShieldCheck size={20} className="text-slate-300 group-hover/item:text-signal-gold group-hover/item:scale-110 transition-all duration-300" />
                              <div className="absolute inset-0 bg-signal-gold rounded-full opacity-0 group-hover/item:animate-ping group-hover/item:opacity-20"></div>
                            </div>
                          </div>
                          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] text-slate-700 leading-tight group-hover/item:text-authority-blue transition-colors">
                            {item}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 z-20">
                  <div className="bg-[#1E3A5F] p-1 rounded-[2.5rem] shadow-2xl ring-8 ring-authority-blue group-hover/card-wrapper:scale-110 transition-transform duration-500">
                    <div className="bg-[#1E3A5F] flex items-center space-x-4 pr-10 py-5 pl-5 rounded-[2rem] border border-white/10">
                       <div className="w-12 h-12 bg-signal-gold rounded-2xl flex items-center justify-center text-authority-blue shadow-lg">
                          <MessageCircle size={24} fill="currentColor" className="opacity-80" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
                         COMPLIANCE REFERENCE
                       </span>
                    </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. WHY LAUNCHPATH EXISTS */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="text-center mb-16 md:mb-32 space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">FOUNDATIONAL PURPOSE</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase">
              WHY <span className="text-signal-gold italic">LAUNCHPATH</span> EXISTS.
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <article className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-[0.95]">
                  Most new motor carriers don’t fail because they lack effort. <br/>
                  <span className="text-signal-gold italic block mt-4">They fail because they enter the industry structurally exposed.</span>
                </h3>
                <div className="h-2 w-24 bg-signal-gold"></div>
                <p className="text-xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                  LaunchPath exists to identify and correct those exposures before they lead to authority shutdowns, insurance lapses, audit failures, or financial strain.
                </p>
              </div>
              
              <div className="space-y-6 pt-10 border-t-4 border-slate-100 dark:border-white/5">
                <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  New carriers are often encouraged to move fast without full system readiness. They receive fragmented advice and incomplete guidance, and are told to address compliance after they begin operating.
                </p>
                <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  This leads to preventable shutdowns — not because operators are careless, but because they were never given a clear, disciplined pathway.
                </p>
              </div>
            </article>

            <aside className="bg-authority-blue dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden border-b-[12px] border-slate-900">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
                <Target size={200} />
              </div>
              <div className="relative z-10">
                <header className="flex items-center space-x-4 mb-10">
                   <ShieldCheck size={28} className="text-signal-gold" />
                   <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">THE OPERATING STANDARD</h4>
                </header>
                
                <p className="text-lg font-bold text-slate-300 mb-12 leading-relaxed">
                  LaunchPath is not a course and not a shortcut. It is a compliance-first operating standard designed to:
                </p>

                <ul className="space-y-10 mb-16">
                  {[
                    { t: "Surface Hidden Risk", d: "Identifying gaps before they become federal violations." },
                    { t: "Authority-Safe Systems", d: "Establishing a compliance-first foundation from the beginning." },
                    { t: "Structured Implementation", d: "Guiding operators through verified federal requirements." },
                    { t: "Reduced Reactive Stress", d: "Replacing panic with systematic operational order." }
                  ].map((item, i) => (
                    <li key={i} className="flex space-x-6">
                      <div className="w-2 h-2 rounded-full bg-signal-gold shrink-0 mt-3" />
                      <div className="space-y-2">
                        <h5 className="font-black uppercase tracking-tight text-lg text-white">{item.t}</h5>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm mb-12">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold mb-4">// MISSION PARADIGM</p>
                   <p className="text-xl font-black font-serif italic text-white uppercase tracking-tight">The goal is not speed. <br/>The goal is continuity.</p>
                </div>
                
                <footer className="pt-10 border-t border-white/10 space-y-5">
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">OPERATOR VALUE ALIGNMENT:</p>
                   <div className="flex flex-col space-y-3">
                      {["Long-term operation over fast entry", "Structure over hustle", "Clarity over noise", "Stewardship over shortcuts"].map((v, i) => (
                        <div key={i} className="flex items-center space-x-3">
                           <CheckCircle2 size={12} className="text-signal-gold opacity-50" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">{v}</span>
                        </div>
                      ))}
                   </div>
                </footer>
              </div>
            </aside>
          </div>

          <div className="mt-24 md:mt-40 text-center pt-20 border-t-8 border-authority-blue/5 dark:border-white/5">
             <p className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white max-w-4xl mx-auto leading-tight">
               LaunchPath is designed to help you <span className="text-signal-gold italic underline decoration-authority-blue/5 underline-offset-8">stay operating</span> — not just get started.
             </p>
          </div>
        </div>
      </section>

      {/* 4. YOUR FIRST 90 DAYS, MAPPED */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <article className="lg:col-span-6 space-y-10 animate-reveal-up">
              <header className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full shadow-sm">
                <MapIcon size={16} className="text-authority-blue dark:text-signal-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">YOUR FIRST 90 DAYS</span>
              </header>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
                YOUR FIRST <br/><span className="text-signal-gold italic">90 DAYS,</span> <br/>MAPPED.
              </h2>
              
              <div className="space-y-6">
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                  The first 90 days under authority are where most preventable shutdowns occur. 
                </p>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl italic">
                  The 90-Day Risk Map helps you identify where risk concentrates early, so you are not learning through enforcement actions, insurance lapses, or financial surprises.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-surface-dark border-l-[12px] border-signal-gold rounded-r-[3rem] shadow-sm">
                 <p className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-4">SYSTEMIC BOUNDARY</p>
                 <p className="text-base text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                   This map is not a plan. It is a diagnostic orientation. Results identify exposure areas only — not corrective actions. Implementation begins after Admission & Verification.
                 </p>
              </div>

              <nav className="pt-8">
                <Link to="/reach-test" className="inline-flex items-center justify-center bg-authority-blue text-white px-14 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-8 border-slate-900 group">
                  <span>Generate Risk Map Diagnostic</span>
                  <ArrowRight size={20} className="ml-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </nav>
            </article>

            <aside className="lg:col-span-6">
              <div className="bg-authority-blue dark:bg-surface-dark p-12 rounded-[5rem] border-4 border-white/10 shadow-[0_60px_120px_-40px_rgba(30,58,95,0.4)] relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] group">
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px:24px]"></div>
                
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                   <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                   <div className="absolute inset-16 border border-white/5 rounded-full"></div>
                   <div className="absolute inset-32 border border-white/10 rounded-full"></div>
                   
                   <div className="absolute inset-0 bg-gradient-to-tr from-signal-gold/20 to-transparent rounded-full animate-[spin_4s_linear_infinite] origin-center opacity-40"></div>
                   
                   <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                   <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-signal-gold rounded-full animate-pulse [animation-delay:1s] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                   
                   <div className="relative z-10 text-center space-y-6">
                      <div className="w-28 h-28 bg-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border-2 border-white/10 group-hover:scale-110 transition-transform duration-700">
                        <Radar size={48} className="text-signal-gold" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-white transition-colors">DIAGNOSTIC SCAN ACTIVE</p>
                        <p className="text-xs font-bold text-signal-gold uppercase tracking-widest">Identifying Structural Gaps</p>
                      </div>
                   </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS */}
      <section className="py-24 md:py-32 lg:py-56 bg-white dark:bg-primary-dark transition-colors">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="text-center mb-16 md:mb-24 space-y-6">
             <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
               THE FOUR <span className="text-signal-gold italic">PILLARS.</span>
             </h2>
             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">THE OPERATIONAL FRAMEWORK</p>
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
                 desc: "Securing the mission through economic truth. Use TCO math to ensure your business remains solvent, stable, and viable."
               }
             ].map((pillar, i) => (
               <article key={i} className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-2 font-serif tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-signal-gold mb-6">{pillar.tagline}</p>
                  <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* 6. THE 16 DEADLY SINS */}
      <section className="bg-slate-100 dark:bg-primary-dark py-24 lg:py-40 border-t border-b border-slate-200 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 animate-reveal-up">
          <header className="text-center mb-16 md:mb-24 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-red-600 text-white px-8 py-3 rounded-full shadow-xl">
              <Skull size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Registry Warning: Audit Failure Vectors</span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-[8rem] font-black font-serif tracking-tight leading-[0.85] text-authority-blue dark:text-white uppercase">
              THE 16 <br/><span className="text-red-600 italic underline decoration-red-600/20 decoration-[8px] underline-offset-[16px]">DEADLY SINS.</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 font-extrabold max-w-3xl mx-auto leading-relaxed">
              Over 30 audit-level violations mapped to their regulatory consequence — categorized by exposure severity.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {sinsData.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-8" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                <div className="flex items-center space-x-5 border-b-2 border-slate-200 dark:border-border-dark pb-6">
                  <div className="bg-authority-blue text-signal-gold rounded-xl w-12 h-12 flex items-center justify-center font-black">
                    0{catIdx + 1}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">
                    {cat.category}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.items.map((sin, sinIdx) => (
                    <div key={sinIdx} className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative">
                      <div className={`absolute left-0 top-0 h-full w-2 bg-slate-100 transition-all ${
                        sin.severity === 'TERMINAL' ? 'group-hover:bg-red-600 group-hover:w-3' : 
                        sin.severity === 'CRITICAL' ? 'group-hover:bg-orange-500 group-hover:w-3' : 
                        'group-hover:bg-amber-500 group-hover:w-3'
                      }`}></div>
                      <span className="absolute -top-4 -right-4 text-6xl font-black opacity-5 text-slate-900 dark:text-white">{sin.id}</span>
                      
                      <h4 className="text-lg font-black text-slate-800 dark:text-text-dark-primary uppercase tracking-tight leading-tight mb-8">
                        {sin.text}
                      </h4>
                      
                      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        sin.severity === 'TERMINAL' ? 'bg-red-50 text-red-600 border-red-100' : 
                        sin.severity === 'CRITICAL' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {sin.severity === 'TERMINAL' ? <Skull size={10} className="animate-pulse" /> : 
                         sin.severity === 'CRITICAL' ? <AlertOctagon size={10} /> : 
                         <AlertCircle size={10} />}
                        <span>{sin.severity}</span>
                        <span className="opacity-30">|</span>
                        <span>{sin.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT'S INSIDE THE PROGRAM */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-primary-dark transition-colors overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="space-y-12">
              <header className="space-y-6">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
                  WHAT'S <span className="text-signal-gold italic">INSIDE</span> THE PROGRAM.
                </h2>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                  6 MODULES | 46 LESSONS | 50+ DOWNLOADS
                </p>
              </header>
              
              <div className="space-y-8">
                {modules.map((mod, i) => (
                  <div key={i} className="flex space-x-6">
                    <div className="flex flex-col items-center">
                       <div className="w-10 h-10 rounded-full bg-authority-blue dark:bg-white/10 flex items-center justify-center text-white dark:text-signal-gold text-xs font-black shrink-0 shadow-lg">
                          {i}
                       </div>
                       {i < 6 && <div className="w-0.5 h-full bg-slate-200 dark:bg-white/5 my-2"></div>}
                    </div>
                    <article className="space-y-1">
                      <h4 className="text-[10px] font-black text-signal-gold uppercase tracking-widest">{mod.n}</h4>
                      <h3 className="text-xl font-bold text-authority-blue dark:text-white uppercase tracking-tight font-serif">{mod.t}</h3>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">{mod.d}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-authority-blue dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden border-b-[12px] border-slate-900 group">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
                <CheckCircle2 size={200} />
              </div>
              <div className="relative z-10 space-y-10">
                <header className="flex items-center space-x-4">
                   <ShieldCheck size={28} className="text-signal-gold" />
                   <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">WHAT YOU WALK AWAY WITH</h4>
                </header>
                
                <ul className="space-y-8">
                  {[
                    "A complete, audit-ready compliance system",
                    "A finished Driver Qualification File",
                    "Drug and alcohol testing program documentation",
                    "Systematic maintenance record templates",
                    "A financial model calculating your real cost per mile",
                    "Lane selection strategy matched to your capital and risk tolerance",
                    "Inspection-ready document library organized for federal review"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-signal-gold shrink-0 mt-2.5" />
                      <span className="text-lg font-bold text-slate-200 leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 8. THE REACH TEST™ */}
      <section className="py-20 md:py-32 lg:py-56 bg-white dark:bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none">
          <Activity size={400} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8 md:mb-12">TECHNICAL READINESS ASSESSMENT</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white mb-8 md:mb-12 uppercase tracking-tighter">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h2>
          <article className="max-w-2xl mx-auto mb-20">
            <p className="text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
              The REACH Test™ is a diagnostic tool used to find where your business is at risk. It is the first step of our Education phase.
            </p>
            <div className="inline-flex items-center px-8 py-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl mb-12">
               <ShieldAlert size={18} className="text-amber-600 mr-4" />
               <span className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-widest leading-none">DIAGNOSTIC ASSESSMENT ONLY — NOT AN IMPLEMENTATION</span>
            </div>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
            {[
              { l: "OVER", t: "AUTHORITY VECTORS", d: "Spotting the missing paperwork that causes carriers to fail audits instantly.", i: <MoveDown /> },
              { l: "AROUND", t: "INSURANCE LAPSES", d: "Finding the small mistakes that cause insurance companies to drop you.", i: <MoveRight /> },
              { l: "THROUGH", t: "SYSTEM GAPS", d: "Finding data errors that show a lack of control over your safety.", i: <MoveLeft /> },
              { l: "UNDER", t: "FISCAL STABILITY", d: "Calculating your break-even point to make sure your business survives.", i: <MoveUp /> }
            ].map((vector, i) => (
              <article key={i} className="flex flex-col items-center p-10 md:p-12 bg-white dark:bg-surface-dark rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark text-center group hover:shadow-2xl transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-sm shrink-0 mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(vector.i as React.ReactElement, { size: 24 })}
                </div>
                <div className="space-y-3">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-[0.5em]">{vector.l}</p>
                  <h4 className="text-xl font-black uppercase tracking-tight text-authority-blue dark:text-white">{vector.t}</h4>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">{vector.d}</p>
                </div>
              </article>
            ))}
          </div>

          <nav className="mt-24">
            <Link to="/reach-test" className="bg-authority-blue text-white px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-8 border-slate-900 inline-flex items-center group">
              TAKE THE REACH TEST™ <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </nav>
        </div>
      </section>

      {/* 9. INTERACTIVE TOOLS STRIP */}
      <section className="py-20 lg:py-28 bg-white dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark transition-colors">
        <div className="max-w-6xl mx-auto px-5 sm:px-10 animate-reveal-up">
          <header className="text-center mb-16 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-signal-gold">Integrated Compliance Tools</p>
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">
              Built-In <span className="text-signal-gold italic">Systems.</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-extrabold max-w-2xl mx-auto leading-relaxed">
              More than curriculum. LaunchPath includes working tools designed for real carrier operations.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsData.map((tool, idx) => (
              <Link 
                key={idx} 
                to={tool.link}
                className="bg-slate-50 dark:bg-surface-dark p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-border-dark hover:shadow-lg hover:-translate-y-2 transition-all duration-500 group text-center flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-inner ${tool.bg}`}>
                  {tool.icon}
                </div>
                <h4 className="text-sm font-black uppercase tracking-[0.15em] text-authority-blue dark:text-white">
                  {tool.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed mt-2">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOUNDER CREDIBILITY */}
      <section className="bg-[#0c1a2d] py-24 lg:py-40 relative overflow-hidden animate-reveal-up">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" aria-hidden="true"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative group max-w-[320px] w-full">
                <div className="absolute -inset-4 bg-authority-blue/30 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="bg-authority-blue dark:bg-surface-dark rounded-[3.5rem] shadow-2xl overflow-hidden relative border-[12px] border-[#162a44] group-hover:border-authority-blue transition-all duration-700 aspect-square sm:aspect-auto">
                  <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-auto grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-signal-gold p-4 rounded-2xl shadow-xl border-4 border-[#0c1a2d] z-20 group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="text-authority-blue" size={28} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mx-auto lg:mx-0 shadow-sm">
                  <Zap size={14} className="text-signal-gold" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">SYSTEM CUSTODIAN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif uppercase tracking-tight text-white leading-none">
                  Vince Lawrence
                </h2>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-signal-gold">
                  Founder, LaunchPath Transportation EDU
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-slate-300 font-extrabold leading-relaxed">
                  20+ years of federal compliance management supporting organizations with 1,200+ employees. OSHA-certified safety coordination across regulated operations. U.S. Navy veteran.
                </p>
                <div className="border-l-4 border-signal-gold pl-6 py-2">
                  <p className="text-base sm:text-lg text-slate-400 font-bold leading-relaxed italic">
                    "LaunchPath was built from direct experience watching new motor carriers fail — not from lack of effort, but from lack of systems."
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                {[
                  { icon: <Award size={14} />, label: "U.S. Navy Veteran" },
                  { icon: <ShieldCheck size={14} />, label: "OSHA-Certified" },
                  { icon: <Target size={14} />, label: "20+ Years Federal Compliance" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:bg-white/10 transition-colors">
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link to="/about" className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-signal-gold transition-colors group">
                  <span>Read Full Background</span>
                  <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WHO THIS IS FOR */}
      <section className="py-24 md:py-32 lg:py-48 bg-slate-50 dark:bg-primary-dark transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-16 lg:mb-24 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">QUALIFICATION PARAMETERS</p>
            <h2 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter">
              WHO THIS <br/><span className="text-signal-gold italic">IS FOR.</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Truck size={32} />, 
                title: "Box Truck Operators", 
                desc: "Carriers operating CMVs between 10,001–26,000 lbs GVWR. CDL and Non-CDL lanes included." 
              },
              { 
                icon: <Briefcase size={32} />, 
                title: "Semi-Truck Startups", 
                desc: "New motor carriers running 1–3 units who prioritize long-term operating authority protection." 
              },
              { 
                icon: <Users size={32} />, 
                title: "Safety Managers", 
                desc: "Personnel responsible for maintaining carrier documentation integrity and federal compliance files." 
              }
            ].map((item, idx) => (
              <article key={idx} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm flex flex-col group hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-authority-blue dark:text-white mb-4 font-serif">{item.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="py-24 lg:py-40 bg-[#F8FAFC] dark:bg-surface-dark transition-colors border-t border-slate-200 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-5 sm:px-10">
          <header className="text-center mb-16 space-y-6">
            <div className="bg-authority-blue text-signal-gold rounded-2xl p-4 shadow-xl mx-auto w-16 h-16 flex items-center justify-center">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">
              Common <br/><span className="text-signal-gold italic">Questions.</span>
            </h2>
          </header>

          <div className="space-y-6 animate-reveal-up">
            {homepageFaqs.map((faq, idx) => (
              <FAQItem 
                key={idx}
                question={faq.q}
                answer={faq.a}
                icon={faq.icon}
                isOpen={faqOpen === idx}
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/faq" className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:text-signal-gold dark:hover:text-white transition-colors inline-flex items-center space-x-2 group">
              <span>View Full Institutional FAQ</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA (ADMISSION PROTOCOL) */}
      <section className="py-24 md:py-48 lg:py-64 bg-[#F8F9FA] dark:bg-primary-dark text-center border-t border-slate-50 dark:border-border-dark">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16 md:space-y-24">
          <header className="space-y-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              BUILD YOUR <br/><span className="text-signal-gold italic underline decoration-authority-blue/5 dark:decoration-white/5 underline-offset-[24px]">CARRIER</span> <br/>ON SYSTEMS.
            </h2>
          </header>
          
          <article className="max-w-3xl mx-auto p-12 bg-white dark:bg-gray-800/50 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-700 shadow-inner">
             <p className="text-xl font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic uppercase tracking-tight text-center">
               "YOU ARE ADMITTED ONLY AFTER WE VERIFY THAT YOUR BUSINESS IS POSITIONED FOR SUCCESS WITHIN OUR STANDARDS."
             </p>
          </article>

          <nav className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
             <Link to="/readiness" className="w-full sm:w-auto bg-authority-blue text-white px-12 md:px-20 py-7 md:py-10 rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-[0.4em] text-[11px] md:text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center justify-center border-b-[12px] border-slate-900 group">
               APPLY FOR ADMISSION
               <ArrowRight size={20} className="ml-5 group-hover:translate-x-2 transition-transform" />
             </Link>
             <Link to="/about" className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px] hover:text-authority-blue transition-colors">
                Review Program Standard
             </Link>
          </nav>
        </div>
      </section>

      {/* FOOTER METADATA */}
      <footer className="bg-slate-50 dark:bg-surface-dark py-12 border-t border-slate-100 dark:border-border-dark text-center">
         <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-300 dark:text-slate-600 italic">SYSTEM REGISTRY IDENTIFIER: NC-LP-V4.5 — END OF REPOSITORY BRIEF</p>
      </footer>

    </div>
  );
};

export default HomePage;
