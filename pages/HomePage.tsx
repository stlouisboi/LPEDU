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
  Award
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-b border-slate-200 dark:border-border-dark last:border-0 transition-all duration-500 overflow-hidden`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 text-left focus:outline-none group"
      >
        <span className={`text-lg font-black tracking-tight uppercase transition-colors duration-300 ${isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const faqs = [
    {
      q: "Who is this program for?",
      a: "LaunchPath is designed for new motor carriers within their first 90 days of operating authority — box truck operators (10,001–26,000 lbs GVWR) and semi-truck operators (26,001+ lbs GVWR) running 1 to 3 trucks. If you are preparing to file for your DOT and MC numbers or have recently received them, this program is built for you."
    },
    {
      q: "Do I need a CDL to take this program?",
      a: "No. LaunchPath covers compliance requirements for both CDL and non-CDL operations. Box truck operators under 26,000 lbs GVWR typically do not need a CDL. The program teaches the regulatory framework for both lanes."
    },
    {
      q: "Is this legal or tax advice?",
      a: "No. LaunchPath is an educational program. All content provides compliance frameworks and operational systems. You should verify all regulatory, legal, tax, and insurance decisions with licensed professionals — attorneys, CPAs, and insurance agents — who can advise on your specific situation."
    },
    {
      q: "What if I take Ground 0 and decide I am not ready?",
      a: "That is exactly what Ground 0 is designed to do. If your decision is WAIT, you receive an improvement plan template and a scheduled reassessment date. If your decision is NO-GO, the program helps you close the loop with clarity. Choosing not to proceed is not failure — it is stewardship."
    },
    {
      q: "How long do I have access to the course materials?",
      a: "You will have access for 12 months from your enrollment date, including all updates made during that period."
    },
    {
      q: "Is there a payment plan?",
      a: "Payment plan options are available and will be discussed during the admission review process."
    },
    {
      q: "What makes this different from other trucking courses?",
      a: "Most programs tell you how to get started. LaunchPath builds the compliance systems that keep you operating. The curriculum is built on 20+ years of federal compliance management experience, organized around four structural pillars — Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen — with every lesson verified against current FMCSA regulations (49 CFR)."
    },
    {
      q: "Can I get a refund?",
      a: "Refund terms are provided during the admission review process before enrollment is finalized."
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
      
      {/* SECTION 1: INSTITUTIONAL HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional FMCSA (Federal Safety) Standard</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.95] md:leading-[0.9] tracking-tighter uppercase font-serif">
              PROTECT <br/>YOUR <br/><span className="italic text-signal-gold">AUTHORITY</span> <br/>WITH ORDER <br/>AND CERTAINTY.
            </h1>
            
            <div className="max-w-2xl border-l-4 md:border-l-8 border-authority-blue dark:border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl font-black uppercase text-authority-blue dark:text-white leading-tight mb-6 tracking-tight">
                LaunchPath is a structured setup standard for new motor carriers. We verify your business readiness (stewardship) before you begin hauling.
              </p>
              <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] leading-relaxed max-w-xl">
                IT IS A STRUCTURED SYSTEM FOR DOCUMENTATION INTEGRITY AND SAFETY MANAGEMENT.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4">
              <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em] shadow-2xl border-b-4 border-slate-900">
                Take the REACH Test™
              </Link>
              <Link to="/about" className="w-full sm:w-auto bg-transparent border-2 border-authority-blue/20 dark:border-white/20 text-authority-blue dark:text-white px-8 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.3em]">
                Review Program Standard
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-reveal-up w-full" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(30,58,95,0.15)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <ShieldAlert size={180} />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                   <div>
                     <h3 className="text-xs md:text-sm font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.4em] mb-1 md:mb-2">FORMAL</h3>
                     <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">ADMISSION <br/>INQUIRY</h3>
                   </div>
                   <div className="w-8 h-8 md:w-10 md:h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-300">
                     <Lock size={14} />
                   </div>
                </div>
                
                <form onSubmit={handleLeadSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">FULL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm" 
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
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-6 md:px-7 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold transition-all shadow-inner text-sm" 
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
          </div>
        </div>
      </section>

      {/* SECTION 2: THE REALITY OF RISK */}
      <section className="py-24 md:py-32 lg:py-64 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <ShieldAlert size={16} className="text-signal-gold" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">STRUCTURAL RISK EXPOSURE</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif leading-[0.95] md:leading-[0.85] tracking-tighter uppercase">
              FAILURE IS <br/>A <span className="text-signal-gold italic">SETUP</span> <br/>PROBLEM.
            </h2>
            
            <div className="max-w-xl border-l-4 md:border-l-8 border-signal-gold pl-6 md:pl-10 py-2">
              <p className="text-lg md:text-xl lg:text-2xl font-black uppercase leading-tight mb-6 md:mb-8 tracking-tight">
                Most carrier failures happen because systems are not set up correctly. Small mistakes in your paperwork today create major risks during your first 18 months.
              </p>
              <p className="text-sm md:text-base opacity-80 leading-relaxed mb-10">
                A single documentation gap today creates a risk that insurance companies and federal auditors will eventually find. LaunchPath provides the safety of verified systems.
              </p>
              <Link to="/reach-test" className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-signal-gold hover:text-white transition-all shadow-xl inline-flex items-center">
                FIND YOUR COMPLIANCE GAPS
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full">
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-20 scale-150 pointer-events-none">
               <Fingerprint size={400} strokeWidth={0.5} />
            </div>
            <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative z-10 text-authority-blue w-full">
               <h3 className="text-xl md:text-2xl font-black font-serif uppercase tracking-tight mb-1 md:mb-2">IDENTIFICATION & ALIGNMENT</h3>
               <div className="space-y-4 md:space-y-5">
                  {[
                    "DQ (DRIVER QUALIFICATION) FILE INTEGRITY",
                    "ENFORCEMENT RESPONSE",
                    "INSURANCE CONTINUITY",
                    "MAINTENANCE GOVERNANCE"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 group">
                       <div className="flex items-center space-x-4 md:space-x-5">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-slate-200 flex items-center justify-center group-hover:border-signal-gold transition-colors">
                            <CheckCircle2 size={10} className="text-signal-gold" />
                          </div>
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{item}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY LAUNCHPATH EXISTS */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-32 space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">FOUNDATIONAL PURPOSE LP-PURPOSE-01</p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase">
              WHY <span className="text-signal-gold italic">LAUNCHPATH</span> EXISTS.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="space-y-12">
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
            </div>

            <div className="bg-authority-blue dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden border-b-[12px] border-slate-900">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
                <Target size={200} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-10">
                   <ShieldCheck size={28} className="text-signal-gold" />
                   <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">THE OPERATING STANDARD</h4>
                </div>
                
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
                
                <div className="pt-10 border-t border-white/10 space-y-5">
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">OPERATOR VALUE ALIGNMENT:</p>
                   <div className="flex flex-col space-y-3">
                      {["Long-term operation over fast entry", "Structure over hustle", "Clarity over noise", "Stewardship over shortcuts"].map((v, i) => (
                        <div key={i} className="flex items-center space-x-3">
                           <CheckCircle2 size={12} className="text-signal-gold opacity-50" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">{v}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 md:mt-40 text-center pt-20 border-t-8 border-authority-blue/5 dark:border-white/5">
             <p className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white max-w-4xl mx-auto leading-tight">
               LaunchPath is designed to help you <span className="text-signal-gold italic underline decoration-authority-blue/5 underline-offset-8">stay operating</span> — not just get started.
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 3.5: YOUR FIRST 90 DAYS, MAPPED */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 space-y-10 animate-reveal-up">
              <div className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full shadow-sm">
                <MapIcon size={16} className="text-authority-blue dark:text-signal-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">YOUR FIRST 90 DAYS</span>
              </div>
              
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

              <div className="pt-8">
                <Link to="/reach-test" className="inline-flex items-center justify-center bg-authority-blue text-white px-14 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-8 border-slate-900 group">
                  <span>Generate Risk Map Diagnostic</span>
                  <ArrowRight size={20} className="ml-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-authority-blue dark:bg-surface-dark p-12 rounded-[5rem] border-4 border-white/10 shadow-[0_60px_120px_-40px_rgba(30,58,95,0.4)] relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] group">
                {/* Tactical Radar Visual */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px:24px]"></div>
                
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                   {/* Radar Sweeps */}
                   <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                   <div className="absolute inset-16 border border-white/5 rounded-full"></div>
                   <div className="absolute inset-32 border border-white/10 rounded-full"></div>
                   
                   {/* Spinning Sweep */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-signal-gold/20 to-transparent rounded-full animate-[spin_4s_linear_infinite] origin-center opacity-40"></div>
                   
                   {/* Tactical Nodes */}
                   <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                   <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-signal-gold rounded-full animate-pulse [animation-delay:1s] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                   <div className="absolute top-1/2 left-1/12 w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:2s]"></div>
                   
                   <div className="relative z-10 text-center space-y-6">
                      <div className="w-28 h-28 bg-white/5 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border-2 border-white/10 group-hover:scale-110 transition-transform duration-700">
                        <Radar size={48} className="text-signal-gold" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 group-hover:text-white transition-colors">DIAGNOSTIC SCAN ACTIVE</p>
                        <p className="text-xs font-bold text-signal-gold uppercase tracking-widest">Identifying Structural Gaps</p>
                      </div>
                   </div>
                   
                   {/* Axis Labels */}
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/20 uppercase tracking-widest">Authority Vector</div>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/20 uppercase tracking-widest">Fiscal Stability</div>
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-black text-white/20 uppercase tracking-widest">Insurance Logic</div>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-black text-white/20 uppercase tracking-widest">Compliance Integrity</div>
                </div>
                
                <div className="absolute bottom-10 left-0 w-full text-center px-12">
                   <div className="h-px w-full bg-white/10 mb-6"></div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">System Linkage: NC-MAP-STABLE-2025</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: THE FOUR PILLARS (STRUCTURAL LOGIC) */}
      <section className="py-24 md:py-32 lg:py-56 bg-white dark:bg-primary-dark transition-colors">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6">
             <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
               THE FOUR <span className="text-signal-gold italic">PILLARS.</span>
             </h2>
             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">THE OPERATIONAL FRAMEWORK</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
             {[
               {
                 icon: <Briefcase />,
                 title: "AUTHORITY PROTECTION",
                 tagline: "STRUCTURAL FORTRESS",
                 desc: "Move beyond basic filings. Build a business foundation that can withstand federal audits."
               },
               {
                 icon: <Shield />,
                 title: "INSURANCE CONTINUITY",
                 tagline: "PREMIUM STABILITY",
                 desc: "Avoid the renewal trap. Set up the safety files that insurance companies need to keep you covered."
               },
               {
                 icon: <Layers />,
                 title: "COMPLIANCE BACKBONE",
                 tagline: "SAFETY DEFENSE",
                 desc: "Replace guesswork with documented proof. Manage DQ files and logs to federal (49 CFR) standards."
               },
               {
                 icon: <Calculator />,
                 title: "CASH-FLOW OXYGEN",
                 tagline: "TCO SURVIVAL MATH",
                 desc: "Stop guessing your profit. Use the TCO (Total Cost of Operating) system to find your real break-even point."
               }
             ].map((pillar, i) => (
               <div key={i} className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
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
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: WHAT'S INSIDE THE PROGRAM */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-primary-dark transition-colors overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-tight">
                  WHAT'S <span className="text-signal-gold italic">INSIDE</span> THE PROGRAM.
                </h2>
                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">
                  6 MODULES | 46 LESSONS | 50+ DOWNLOADS
                </p>
              </div>
              
              <div className="space-y-8">
                {modules.map((mod, i) => (
                  <div key={i} className="flex space-x-6">
                    <div className="flex flex-col items-center">
                       <div className="w-10 h-10 rounded-full bg-authority-blue dark:bg-white/10 flex items-center justify-center text-white dark:text-signal-gold text-xs font-black shrink-0 shadow-lg">
                          {i}
                       </div>
                       {i < 6 && <div className="w-0.5 h-full bg-slate-200 dark:bg-white/5 my-2"></div>}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-signal-gold uppercase tracking-widest">{mod.n}</h4>
                      <h3 className="text-xl font-bold text-authority-blue dark:text-white uppercase tracking-tight font-serif">{mod.t}</h3>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">{mod.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-authority-blue dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden border-b-[12px] border-slate-900 group">
              <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
                <CheckCircle2 size={200} />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="flex items-center space-x-4">
                   <ShieldCheck size={28} className="text-signal-gold" />
                   <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">WHAT YOU WALK AWAY WITH</h4>
                </div>
                
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

                <div className="pt-10">
                   <Link to="/readiness" className="inline-flex items-center justify-center w-full bg-white text-authority-blue px-10 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-signal-gold hover:text-white transition-all active:scale-95 group/walk">
                     <span>Validate My Readiness</span>
                     <ArrowRight size={16} className="ml-4 group-hover/walk:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE REACH TEST™ (TECHNICAL DIAGNOSTIC) */}
      <section className="py-20 md:py-32 lg:py-56 bg-white dark:bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none">
          <Activity size={400} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-8 md:mb-12">TECHNICAL READINESS ASSESSMENT</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white mb-8 md:mb-12 uppercase tracking-tighter">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h2>
          <div className="max-w-2xl mx-auto mb-20">
            <p className="text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
              The REACH Test™ is a diagnostic tool used to find where your business is at risk. It is the first step of our Education phase.
            </p>
            <div className="inline-flex items-center px-8 py-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl mb-12">
               <ShieldAlert size={18} className="text-amber-600 mr-4" />
               <span className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-widest leading-none">DIAGNOSTIC ASSESSMENT ONLY — NOT AN IMPLEMENTATION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
            {[
              { l: "OVER", t: "AUTHORITY VECTORS", d: "Spotting the missing paperwork that causes carriers to fail audits instantly.", i: <MoveDown /> },
              { l: "AROUND", t: "INSURANCE LAPSES", d: "Finding the small mistakes that cause insurance companies to drop you.", i: <MoveRight /> },
              { l: "THROUGH", t: "SYSTEM GAPS", d: "Finding data errors that show a lack of control over your safety.", i: <MoveLeft /> },
              { l: "UNDER", t: "FISCAL STABILITY", d: "Calculating your break-even point to make sure your business survives.", i: <MoveUp /> }
            ].map((vector, i) => (
              <div key={i} className="flex flex-col items-center p-10 md:p-12 bg-white dark:bg-surface-dark rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-border-dark text-center group hover:shadow-2xl transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-sm shrink-0 mb-8 group-hover:scale-110 transition-transform">
                  {React.cloneElement(vector.i as React.ReactElement, { size: 24 })}
                </div>
                <div className="space-y-3">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-[0.5em]">{vector.l}</p>
                  <h4 className="text-xl font-black uppercase tracking-tight text-authority-blue dark:text-white">{vector.t}</h4>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">{vector.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <Link to="/reach-test" className="bg-authority-blue text-white px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-8 border-slate-900 inline-flex items-center group">
              TAKE THE REACH TEST™ <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: STEWARDSHIP & ALIGNMENT */}
      <section className="py-24 md:py-48 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <div className="w-24 h-24 bg-white/10 rounded-[3rem] flex items-center justify-center mx-auto backdrop-blur-xl border border-white/20 shadow-2xl">
            <Anchor className="text-signal-gold" size={44} />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif uppercase tracking-tight leading-none">
            PURPOSE-DRIVEN <br/><span className="text-signal-gold italic">STEWARDSHIP.</span>
          </h2>
          <div className="p-10 md:p-16 bg-white/5 border border-white/10 rounded-[4rem] md:rounded-[5rem] backdrop-blur-md relative overflow-hidden group">
            <Quote className="text-signal-gold opacity-40 mb-8 mx-auto" size={56} />
            <p className="text-2xl md:text-4xl font-black font-serif italic text-white leading-tight mb-10 max-w-2xl mx-auto uppercase tracking-tight">
              True profit is the result of hard work and the responsible management of what you have been given.
            </p>
            <div className="h-2 w-16 bg-signal-gold mx-auto opacity-30"></div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-white/60 leading-relaxed max-w-2xl mx-auto">
            Your business is a responsibility to your family and your future. We build the systems that protect both.
          </p>
        </div>
      </section>

      {/* NEW SECTION 2: MEET THE INSTRUCTOR */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark transition-colors">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold">PROGRAM DIRECTOR</p>
            <h2 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter">VINCE</h2>
            <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">Founder, LaunchPath Transportation EDU</p>
          </div>

          <div className="relative inline-block mb-8">
             <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-slate-100 dark:bg-surface-dark border-[8px] border-authority-blue/5 dark:border-white/5 flex items-center justify-center shadow-2xl relative overflow-hidden group mx-auto">
                <UserIcon size={120} className="text-authority-blue/10 dark:text-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-authority-blue/20 to-transparent"></div>
             </div>
             <div className="absolute -bottom-4 -right-4 bg-signal-gold p-4 rounded-2xl shadow-xl border-4 border-white dark:border-primary-dark group-hover:rotate-12 transition-transform">
                <ShieldCheck className="text-authority-blue" size={32} />
             </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            <p className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              20+ years of federal compliance management supporting organizations with 1,200+ employees. OSHA-certified safety coordination across regulated operations. Veteran-owned business operator.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              LaunchPath was built from direct experience watching new motor carriers fail — not from lack of effort, but from lack of systems. This program exists to close that gap with institutional-grade compliance education designed specifically for owner-operators running 1 to 3 trucks.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {[
                "20+ Years Federal Compliance",
                "OSHA Safety Certified",
                "Veteran-Owned & Operated",
                "1,200+ Employee Compliance Management"
              ].map((cred, i) => (
                <div key={i} className="flex items-center space-x-3 px-6 py-3 bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-signal-gold shrink-0"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-white">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: FAQ */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-surface-dark transition-colors border-y border-slate-100 dark:border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">CLARIFICATION TERMINAL</p>
             <h2 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter">COMMON <span className="text-signal-gold italic">QUESTIONS.</span></h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === idx}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              />
            ))}
          </div>

          <div className="mt-16 text-center pt-16 border-t border-slate-200 dark:border-white/10">
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 italic">STILL HAVE TECHNICAL INQUIRIES?</p>
             <Link to="/contact" className="inline-flex items-center text-authority-blue dark:text-signal-gold font-black uppercase tracking-[0.2em] text-xs hover:underline group">
                MESSAGE VINCE DIRECTLY <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: ADMISSION PROTOCOL (THE CLOSE) */}
      <section className="py-24 md:py-48 lg:py-64 bg-white dark:bg-primary-dark text-center border-t border-slate-50 dark:border-border-dark">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16 md:space-y-24">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              BUILD YOUR <br/><span className="text-signal-gold italic underline decoration-authority-blue/5 dark:decoration-white/5 underline-offset-[24px]">CARRIER</span> <br/>ON SYSTEMS.
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto p-12 bg-slate-50 dark:bg-gray-800/50 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-700 shadow-inner">
             <p className="text-xl font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic uppercase tracking-tight text-center">
               "YOU ARE ADMITTED ONLY AFTER WE VERIFY THAT YOUR BUSINESS IS POSITIONED FOR SUCCESS WITHIN OUR STANDARDS."
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
             <Link to="/readiness" className="w-full sm:w-auto bg-authority-blue text-white px-12 md:px-20 py-7 md:py-10 rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-[0.4em] text-[11px] md:text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center justify-center border-b-[12px] border-slate-900 group">
               APPLY FOR ADMISSION
               <ArrowRight size={20} className="ml-5 group-hover:translate-x-2 transition-transform" />
             </Link>
             <Link to="/about" className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px] hover:text-authority-blue transition-colors">
                Review Program Standard
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER METADATA */}
      <footer className="bg-slate-50 dark:bg-surface-dark py-12 border-t border-slate-100 dark:border-border-dark text-center">
         <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-300 dark:text-slate-600 italic">SYSTEM REGISTRY IDENTIFIER: NC-LP-V4.2 — END OF REPOSITORY BRIEF</p>
      </footer>

    </div>
  );
};

export default HomePage;