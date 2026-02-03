
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
  Gavel
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
          source: "homepage-hero-form"
        });
      }
      navigate(destination);
    } catch (err) {
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
        { id: "01", text: "Absence of random pool enrollment", impact: "Audit Default", severity: "TERMINAL", guard: "Pool Guard Protocol" },
        { id: "02", text: "Positive driver results (Unmanaged)", impact: "Immediate Revocation", severity: "TERMINAL", guard: "Refuge Transition" },
        { id: "03", text: "Clearinghouse query failure", impact: "Operating Ban", severity: "CRITICAL", guard: "Registry Sync" },
        { id: "04", text: "Omission of pre-employment test", impact: "Strict Liability", severity: "HIGH RISK", guard: "Gatekeeper Flow" }
      ]
    },
    {
      domain: "Human Capital Compliance",
      id: "DOMAIN_02",
      icon: <Fingerprint className="text-amber-500" />,
      description: "Integrity verification of driver qualification files and licensing credentials.",
      items: [
        { id: "05", text: "Revoked/Expired license usage", impact: "OOS Event", severity: "TERMINAL", guard: "License Monitor" },
        { id: "06", text: "Missing Med-Cert verification", impact: "Driver Downgrade", severity: "CRITICAL", guard: "Med-Check standard" },
        { id: "07", text: "Fragmented DQ File framework", impact: "Audit Red Flag", severity: "HIGH RISK", guard: "File Factory v4" },
        { id: "08", text: "Omitted background inquiries", impact: "Negligent Entrustment", severity: "CRITICAL", guard: "History Vault" }
      ]
    },
    {
      domain: "Operational Control",
      id: "DOMAIN_03",
      icon: <Gavel className="text-slate-500" />,
      description: "Direct management of hours-of-service and equipment maintenance standards.",
      items: [
        { id: "09", text: "Falsification of HOS records", impact: "Criminal Default", severity: "TERMINAL", guard: "ELD Integrity" },
        { id: "10", text: "Dispatching OOS vehicles", impact: "Authority Seizure", severity: "TERMINAL", guard: "Asset Shield" },
        { id: "11", text: "Deficient roadside history (CSA)", impact: "Premium Spike", severity: "HIGH RISK", guard: "CSA Watcher" },
        { id: "12", text: "No systematic maintenance log", impact: "Liability Default", severity: "CRITICAL", guard: "Log Master" }
      ]
    },
    {
      domain: "Administrative Stewardship",
      id: "DOMAIN_04",
      icon: <HardDrive className="text-blue-500" />,
      description: "Governance of federal filings, insurance continuity, and corporate entity integrity.",
      items: [
        { id: "13", text: "Insurance coverage lapse", impact: "Authority Termination", severity: "TERMINAL", guard: "Continuity Lock" },
        { id: "14", text: "Failure to update MCS-150", impact: "Administrative Revocation", severity: "CRITICAL", guard: "Biannual Sync" },
        { id: "15", text: "BOC-3 Process Agent omission", impact: "Filing Suspension", severity: "HIGH RISK", guard: "Legal Link" },
        { id: "16", text: "Late incident/accident reporting", impact: "Legal Default", severity: "CRITICAL", guard: "Post-Crash Flow" }
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
                    className="w-full bg-authority-blue text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group border-b-4 border-slate-900"
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

      {/* 2. FOUNDER SECTION: VINCE LAWRENCE */}
      <section className="py-24 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark overflow-hidden transition-colors">
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

      {/* 4. THE 16 DEADLY SINS - REORGANIZED MATRIX */}
      <section id="exposure-matrix" className="bg-[#020617] py-24 lg:py-48 border-y border-white/5 transition-colors relative overflow-hidden">
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
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{domain.id} // SECURE_ARCHIVE</p>
                      </div>
                   </div>
                   <div className="hidden sm:block text-right">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Vectors</p>
                      <p className="text-lg font-black text-white">0{domain.items.length}</p>
                   </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {domain.items.map((item) => (
                    <article key={item.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] group hover:bg-white/[0.05] hover:border-red-500/30 transition-all duration-500 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 text-red-600 group-hover:scale-150 transition-all duration-700">
                          <ShieldAlert size={64} />
                       </div>
                       
                       <header className="flex items-center space-x-3 mb-6">
                          <span className="text-xs font-black text-slate-700 font-mono tracking-tighter group-hover:text-red-500 transition-colors">{item.id}</span>
                          <h4 className="text-base font-black text-white uppercase leading-tight tracking-tight group-hover:text-red-500 transition-colors">{item.text}</h4>
                       </header>

                       <div className="space-y-6 pt-6 border-t border-white/5">
                          <div className="flex justify-between items-center">
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">RESULT</p>
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-tight">{item.impact}</p>
                          </div>
                          
                          <div className="flex justify-between items-center">
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">GUARD</p>
                             <div className="flex items-center space-x-1.5 text-emerald-400">
                                <ShieldCheck size={10} />
                                <span className="text-[10px] font-black uppercase tracking-tight">{item.guard}</span>
                             </div>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                             <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">SEVERITY</p>
                             <div className={`px-2.5 py-1 rounded-lg flex items-center space-x-2 border ${
                               item.severity === 'TERMINAL' 
                               ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                               : item.severity === 'CRITICAL' 
                               ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                               : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                             }`}>
                                <Zap size={10} className="fill-current" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{item.severity}</span>
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
             <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] shadow-2xl inline-flex flex-col items-center max-w-xl mx-auto backdrop-blur-md">
                <p className="text-lg font-bold text-slate-400 mb-8 italic">"Investigators aren't looking for excuses. They are looking for documented evidence of systemic control."</p>
                <Link to="/readiness" className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all shadow-xl active:scale-95 flex items-center group border-b-4 border-red-900">
                  INITIATE DIAGNOSTIC PROTOCOL
                  <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 5. THE STANDARD */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark border-y border-slate-100 dark:border-border-dark overflow-hidden transition-colors">
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
               <article key={i} className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-[0_40px_100px_-20px_rgba(30,58,95,0.12)] transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-signal-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-2 font-serif tracking-tight group-hover:text-signal-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold mb-8 opacity-70">{pillar.tagline}</p>
                  <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                  {pillar.hookLine && (
                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-border-dark">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 italic">
                        {pillar.hookLine}
                      </p>
                    </div>
                  )}
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* 8. THE REACH TEST */}
      <section className="py-24 md:py-48 bg-authority-blue text-white overflow-hidden transition-colors">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 animate-reveal-up">
              <header className="space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.6em] text-signal-gold">DIAGNOSTIC</p>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif uppercase tracking-tight leading-none">
                  FIND OUT WHERE <br/><span className="text-signal-gold italic">YOU'RE EXPOSED.</span>
                </h2>
                <p className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed max-w-xl">
                  The REACH Test™ is a free diagnostic that identifies your current compliance gaps across all four pillars. Takes 5 minutes. Shows you exactly where your risk lives.
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

      {/* 12. FINAL CTA */}
      <section className="py-24 md:py-48 bg-[#0c1a2d] text-white overflow-hidden relative transition-colors">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-12">
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
