import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  Shield,
  Clock,
  Target,
  CheckCircle2,
  Activity,
  UserCheck,
  ShieldAlert,
  FileText,
  AlertCircle,
  FileWarning,
  Scale,
  Files,
  Zap,
  Layout,
  Calculator,
  Anchor,
  Star,
  Quote,
  Layers,
  ChevronRight,
  TrendingDown,
  Lock,
  BarChart3,
  Calendar,
  MousePointer2,
  Wrench,
  DollarSign,
  Briefcase,
  XCircle,
  X,
  Plus,
  Award,
  Search,
  AlertTriangle,
  GraduationCap,
  Bookmark,
  Monitor
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

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

  const deadlySins = [
    "Failing to implement a random drug program",
    "Using a driver who tested positive for drugs",
    "Using a driver not medically examined",
    "Operating without required insurance levels",
    "Using a driver with a revoked or suspended license",
    "Failing to conduct pre-employment drug tests",
    "Failing to maintain driver qualification files",
    "Failing to maintain records of duty status (HOS)",
    "Requiring drivers to exceed maximum hours",
    "Operating a vehicle in an out-of-service condition",
    "Failing to keep vehicle inspection reports",
    "Failing to register in the Drug & Alcohol Clearinghouse",
    "Missing or inaccurate BOC-3 / UCR filings",
    "Failing to conduct previous employer inquiries",
    "Missing a systematic maintenance program",
    "Failing to report accidents within required windows"
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION: AUTHORITY / DISCIPLINE */}
      <section className="relative min-h-[90vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/20 border-2 border-white/30 px-5 py-2.5 rounded-full text-[12px] font-black tracking-[0.2em] text-white shadow-lg uppercase">
                <span>⚖️ Integrity First • Systems Driven</span>
              </div>
              
              <h1 className="text-5xl lg:text-[80px] font-black tracking-tighter text-white leading-[0.9] font-serif uppercase drop-shadow-sm">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> With <br/>Order and Certainty.
              </h1>
              
              <div className="text-2xl text-white leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold space-y-4">
                <p>Clarity is the primary asset of a resilient motor carrier. Establish systems that lead with stewardship from day one.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <Link 
                  to="/readiness"
                  className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-2xl font-black text-sm hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-4 border-slate-200"
                >
                  Request Admission
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
                <button 
                  onClick={() => document.getElementById('logic')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-authority-blue border-2 border-white/20 text-white hover:border-white px-10 py-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center uppercase tracking-widest"
                >
                  How the standard works
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border-4 border-authority-blue dark:border-border-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]">
                <div className="absolute top-10 right-10 text-authority-blue opacity-20">
                  <ShieldAlert size={40} />
                </div>
                <h2 className="text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 leading-none font-serif">
                  First 90 Days <br/><span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-[13px] text-text-primary dark:text-text-dark-muted mb-8 font-black uppercase tracking-widest leading-relaxed">
                  Gain the visibility required for disciplined stewardship of your operating authority.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
                      <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] font-bold text-red-700 leading-tight">{error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue ml-4">Full Legal Name</label>
                    <input 
                      type="text" required placeholder="Jane Doe"
                      className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 focus:border-authority-blue rounded-2xl outline-none transition-all font-black text-lg text-text-primary dark:text-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue ml-4">Professional Email</label>
                    <input 
                      type="email" required placeholder="jane@carrier.com"
                      className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 focus:border-authority-blue rounded-2xl outline-none transition-all font-black text-lg text-text-primary dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <Link 
                    to={`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`}
                    className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98] border-b-4 border-black/20"
                  >
                    <MousePointer2 className="mr-3" size={20} />
                    Create My Risk Map
                  </Link>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-black">
                    Secure Protocol • Educational Resources Only
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPOSURE SECTION: THE RISK MOST NEW CARRIERS NEVER SEE */}
      <section id="logic" className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center space-x-3 text-red-700">
                <ShieldAlert size={28} />
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">Immediate Operational Threat</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.95]">
                The Risk Most <br/><span className="text-red-700 underline underline-offset-[12px] decoration-slate-200 decoration-4">New Carriers</span> <br/>Never See.
              </h2>
              <div className="space-y-8 text-xl text-text-primary dark:text-text-dark-primary font-black leading-relaxed max-w-xl">
                <p>The first 90 days are statistically the highest-risk period. Regulators are monitoring your data for documentation gaps called <strong>"The 16 Deadly Sins."</strong></p>
                <p className="text-text-muted font-bold">Most operators are focused on finding loads while their foundation is actively eroding. We build the refuge.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-surface-dark p-10 lg:p-16 rounded-[4rem] border-4 border-slate-200 shadow-xl space-y-12">
              <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">From Exposure to Protection</h3>
              <p className="text-lg text-text-primary dark:text-text-dark-primary font-black leading-relaxed">The <strong>Four Pillars</strong> are the structured documentation standards that auditors and insurers expect to see:</p>
              
              <div className="space-y-4">
                {[
                  { t: "Drug & Alcohol", icon: <Briefcase size={24} /> },
                  { t: "Driver Qualification", icon: <UserCheck size={24} /> },
                  { t: "Insurance & Finance", icon: <ShieldCheck size={24} /> },
                  { t: "Maintenance & HOS", icon: <Clock size={24} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-slate-100 shadow-md">
                    <div className="text-authority-blue dark:text-signal-gold">{item.icon}</div>
                    <span className="text-base font-black uppercase tracking-widest text-authority-blue dark:text-white">{item.t}</span>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-authority-blue text-white rounded-[3rem] text-xl italic font-black leading-relaxed border-l-[12px] border-signal-gold shadow-2xl">
                "The 16 Deadly Sins reveal exposure. The Four Pillars are the refuge."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 16 DEADLY SINS SECTION */}
      <section id="deadly-sins" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-gray-800 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border-2 border-slate-200">
              <FileWarning size={40} />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">
              THE 16 DEADLY SINS:<br/>
              <span className="text-signal-gold italic">YOUR AUDIT RISK EXPOSURE.</span>
            </h2>
            <p className="text-2xl text-text-primary dark:text-text-dark-primary max-w-4xl mx-auto font-black leading-relaxed">
              Understand the risks before they impact your operation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-8 text-center lg:text-left">FMCSA Enforcement Risks</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-20">
              {deadlySins.map((sin, i) => (
                <li key={i} className="flex items-start space-x-3 text-lg font-bold text-authority-blue dark:text-text-dark-primary group">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2.5 shrink-0 group-hover:scale-125 transition-transform"></div>
                  <span className="leading-tight">{sin}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-6xl mx-auto bg-authority-blue text-white p-14 lg:p-20 rounded-[5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 border-4 border-signal-gold/30">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] rotate-12 scale-150 pointer-events-none">
              <ShieldAlert size={300} className="text-white" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-4xl font-black font-serif mb-4 leading-tight uppercase tracking-tight">Systems Presence <br/>Prevents These Sins.</h3>
              <p className="text-xl text-white/80 font-bold leading-relaxed italic">
                "The LaunchPath standard builds the documentation backbone that ensures these 16 sins never appear in your record."
              </p>
            </div>
            <Link to="/readiness" className="relative z-10 bg-white text-authority-blue px-16 py-7 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap border-b-4 border-slate-200">
              GET PROTECTED
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS / QUOTES */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">
              Failure From <span className="text-signal-gold italic">Lack of Structure.</span>
            </h2>
            <p className="text-2xl text-text-primary dark:text-text-dark-primary font-black">Patterns observed in the first year of operation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { q: "I watched the videos and listened to drivers with years in the game. Still wasn't prepared for the paperwork, the insurance costs, or the audit. That's where it gets real.", a: "Marcus T., First-Year Owner-Operator" },
              { q: "I did my homework—YouTube, groups, talking to drivers. Nobody explained that one missed insurance payment could shut the whole operation down.", a: "Keisha M., New Authority" },
              { q: "I came home, got my CDL, and thought I was ready. The compliance side almost sent me right back to where I started.", a: "Chris P., New Authority" }
            ].map((quote, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] shadow-2xl relative group hover:scale-[1.03] transition-all duration-500 border-4 border-authority-blue/10 flex flex-col h-full">
                <Quote className="text-authority-blue opacity-10 mb-10 shrink-0" size={56} />
                <p className="text-2xl font-black leading-relaxed italic mb-12 text-authority-blue dark:text-white flex-grow">"{quote.q}"</p>
                <div className="h-2 w-20 bg-signal-gold mb-10 rounded-full"></div>
                <p className="text-[13px] font-black uppercase tracking-[0.25em] text-authority-blue dark:text-signal-gold leading-tight">{quote.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS FOUNDATION */}
      <section id="pillars" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none">The Four Pillars Foundation</h2>
            <p className="text-2xl text-text-primary dark:text-text-dark-primary max-w-3xl mx-auto font-black leading-relaxed">The operational standards that determine survival.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Authority Protection", d: "Managing DOT/MC violations, audit expectations, and SMS scores. One collapsed pillar can suspend your authority overnight.", icon: <Anchor size={40} /> },
              { t: "Insurance Continuity", d: "One missed payment cancels your policy and suspends your authority. Most carriers underestimate insurance as their biggest threat.", icon: <Shield size={40} /> },
              { t: "Compliance Backbone", d: "Missing DQ files, logs, and undocumented maintenance. Auditors find gaps that trigger conditional ratings.", icon: <Layers size={40} /> },
              { t: "Cash-Flow Oxygen", d: "Over-leverage, bad rates, and 30-60 day cycles. Operational solvency is required to keep the other three pillars standing.", icon: <Activity size={40} /> }
            ].map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border-4 border-slate-100 dark:border-border-dark shadow-xl hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="w-20 h-20 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-3xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-6 leading-tight font-serif">{pillar.t}</h3>
                <p className="text-base text-text-primary dark:text-text-dark-muted font-bold leading-relaxed mb-8">{pillar.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SECTION (HIGH FIDELITY - MATCHING PROVIDED IMAGE) */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-authority-blue rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent)] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-center relative z-10">
              {/* Founder Image Frame */}
              <div className="relative mx-auto lg:mx-0 w-full max-w-[450px]">
                <div className="rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/5] bg-slate-900">
                  <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000 ease-out"
                  />
                </div>
                {/* Signature Bookmark Badge */}
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-24 h-24 md:w-32 md:h-32 bg-signal-gold rounded-full flex items-center justify-center shadow-2xl border-4 border-authority-blue transform hover:scale-110 transition-transform cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Bookmark size={40} className="text-authority-blue" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Founder Content */}
              <div className="text-white space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-[44px] font-black font-serif leading-[1.1] uppercase tracking-tighter text-white">
                    FOUNDER & DESERT STORM <br/>NAVY VETERAN — <br/>
                    <span className="text-signal-gold underline underline-offset-8 decoration-white/20">VINCE LAWRENCE</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl font-black italic text-signal-gold uppercase tracking-[0.1em] font-bold leading-tight">
                    "OSHA-CERTIFIED SAFETY PROFESSIONAL WITH 20+ YEARS OF COMPLIANCE OPERATING STANDARDS."
                  </p>
                  
                  <div className="h-1 w-24 bg-white/20 rounded-full"></div>

                  <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-xl">
                    Vince Lawrence has overseen compliance systems for organizations supporting 1,200+ employees. LaunchPath translates this institutional experience into a systematic protective standard for small motor carriers.
                  </p>
                </div>

                {/* Kingdom Operated Badge */}
                <div className="pt-6">
                  <div className="inline-flex items-center space-x-3 bg-white/5 border-2 border-white/10 px-8 py-4 rounded-full shadow-lg hover:border-signal-gold/50 transition-colors">
                    <Star size={20} className="text-signal-gold" fill="currentColor" />
                    <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/90">Kingdom Operated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE REACH TEST™ */}
      <section id="reach-test" className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center space-x-6 text-authority-blue dark:text-signal-gold mb-10">
             <div className="h-1.5 w-16 bg-current rounded-full"></div>
             <span className="text-[14px] font-black uppercase tracking-[0.5em]">Strategic Defense Protocol</span>
             <div className="h-1.5 w-16 bg-current rounded-full"></div>
          </div>
          <h2 className="text-6xl lg:text-[100px] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none mb-14">
             The <span className="text-signal-gold underline underline-offset-[20px] decoration-8">Reach</span> Test™
          </h2>
          <p className="text-3xl text-text-primary dark:text-text-dark-primary font-black max-w-5xl mx-auto leading-relaxed mb-24">
            "Your business remains structurally sound under federal pressure."
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
             {[
               { l: "Over", t: "FMCSA Regulatory Violations", i: <TrendingDown className="rotate-180" size={48} /> },
               { l: "Around", t: "Insurance Cancellations", i: <Zap size={48} /> },
               { l: "Through", t: "Internal System Auditors", i: <Search size={48} /> },
               { l: "Under", t: "Financial Foundation Collapse", i: <DollarSign size={48} /> }
             ].map((item, i) => (
               <div key={i} className="bg-slate-50 dark:bg-surface-dark p-14 rounded-[4rem] border-4 border-slate-100 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-authority-blue transition-all shadow-lg">
                  <div className="text-authority-blue dark:text-signal-gold mb-10 transition-transform group-hover:scale-125 duration-500">{item.i}</div>
                  <h4 className="font-black text-2xl uppercase text-authority-blue dark:text-white mb-3">{item.t}</h4>
                  <span className="text-[14px] font-black uppercase tracking-[0.6em] text-slate-400">{item.l}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. WHAT MAKES LAUNCHPATH DIFFERENT */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">What Makes LaunchPath Different</h2>
           <p className="text-2xl text-text-muted font-bold italic mb-20 max-w-3xl mx-auto">We provide a professional alternative to speculative trucking advice.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { t: "Systematic Structure", d: "We teach a 90-day sequence, not a collection of random tips.", i: <Layers size={32} /> },
                { t: "Compliance-First", d: "We prioritize protecting your authority before you attempt to scale.", i: <Shield size={32} /> },
                { t: "Institutional Experience", d: "Our curriculum is built on 20+ years of federal safety oversight.", i: <GraduationCap size={32} /> },
                { t: "Interactive Decision Tools", d: "We replace static PDFs with professional-grade financial calculators.", i: <Calculator size={32} /> },
                { t: "Radical Integrity", d: "As a Kingdom business, we value stewardship and truth over sales hype.", i: <Anchor size={32} /> },
                { t: "Audit Ready", d: "We focus on meeting audit expectations, not just hoping for the best.", i: <BarChart3 size={32} /> }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[2.5rem] border border-border-light shadow-sm text-left group hover:shadow-xl transition-all">
                   <div className="w-16 h-16 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">{item.i}</div>
                   <h3 className="text-xl font-black uppercase tracking-tight text-authority-blue dark:text-white mb-4">{item.t}</h3>
                   <p className="text-sm text-text-muted font-bold leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 9. THE LAUNCHPATH 90-DAY OPERATING STANDARD */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <h2 className="text-4xl md:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">The LaunchPath 90-Day Operating Standard</h2>
           <p className="text-2xl text-text-muted font-bold max-w-3xl mx-auto mb-24 leading-relaxed">A structured sequence built on The Four Pillars—designed to stabilize your authority in the first 90 days.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 text-left relative">
              <div className="hidden lg:block absolute top-0 left-0 w-full h-[2px] bg-slate-100 dark:bg-border-dark -translate-y-10"></div>
              {[
                { m: "Module 0", t: "Go-No-Go Readiness", d: "Outcome: Verify operational discipline before filing." },
                { m: "Module 1", t: "Authority Protection", d: "Outcome: Secure your DOT/MC credentials." },
                { m: "Module 2", t: "Insurance Continuity", d: "Outcome: Manage the carrier-insurer relationship." },
                { m: "Module 3", t: "Compliance Backbone", d: "Outcome: Meet audit expectations for DQ and maintenance files." },
                { m: "Module 4", t: "Cash-Flow Oxygen", d: "Outcome: Master the 30-day solvency loop." },
                { m: "Module 5", t: "Audit Readiness", d: "Outcome: Meet expectations for the new entrant safety audit." },
                { m: "Module 6", t: "Stabilization & Scale", d: "Outcome: Prepare for long-term fleet growth." }
              ].map((mod, i) => (
                <div key={i} className="relative pt-10">
                   <div className="absolute top-0 left-0 w-8 h-[2px] bg-signal-gold -translate-y-10"></div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">{mod.m}</p>
                   <h3 className="text-lg font-black uppercase tracking-tight text-authority-blue dark:text-white mb-3 leading-tight">{mod.t}</h3>
                   <p className="text-[11px] text-text-muted font-bold uppercase tracking-widest leading-relaxed">{mod.d}</p>
                </div>
              ))}
           </div>

           <div className="mt-24">
              <Link to="/learning-path" className="inline-flex items-center space-x-4 bg-authority-blue text-white px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue shadow-2xl active:scale-95 transition-all">
                <span>Explore Full Curriculum</span>
                <ArrowRight size={20} />
              </Link>
           </div>
        </div>
      </section>

      {/* 9.5 INTERACTIVE STUDENT TOOLS (ENHANCED SOFTWARE SUITE DESIGN) */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center space-x-3 mb-8">
            <div className="h-px w-8 bg-authority-blue opacity-20"></div>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Interactive <span className="text-signal-gold italic">Software Suite</span></h2>
            <div className="h-px w-8 bg-authority-blue opacity-20"></div>
          </div>
          <p className="text-lg text-text-muted font-bold max-w-2xl mx-auto mb-20 leading-relaxed italic">
            Static documents create gaps. Professional software creates certainty. LaunchPath students implementation using proprietary cloud tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {[
              { 
                t: "Cost-Per-Mile Calculator", 
                d: "Verify your break-even floor across all variable and fixed operational costs.", 
                i: <Calculator size={32} />,
                out: "Break-Even CPM",
                tag: "FISCAL STABILITY"
              },
              { 
                t: "True Cost of Ownership Tool", 
                d: "Dynamic maintenance and asset depreciation forecasting for multi-unit fleets.", 
                i: <BarChart3 size={32} />,
                out: "Asset Net Yield",
                tag: "CAPITAL PROTECTION"
              },
              { 
                t: "Pillar 2 Continuity Tracker", 
                d: "Automated alert system for insurance premium cycles and MCS-150 biennial updates.", 
                i: <Calendar size={32} />,
                out: "Authority Health Score",
                tag: "CONTINUITY"
              }
            ].map((tool, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border-4 border-white dark:border-border-dark shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] group hover:shadow-[0_50px_100px_-20px_rgba(30,58,95,0.15)] transition-all duration-500 flex flex-col h-full relative overflow-hidden text-left">
                {/* Software Branding Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Monitor size={120} />
                </div>
                
                <div className="flex justify-between items-start mb-10">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-authority-blue dark:text-signal-gold shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {tool.i}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-500 bg-green-50 px-2.5 py-1 rounded-md mb-2 flex items-center">
                      <Zap size={10} className="mr-1" /> CLOUD SYNCED
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">LP-S0{i+1}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue/40 mb-3">{tool.tag}</h3>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-authority-blue dark:text-white leading-tight font-serif group-hover:text-signal-gold transition-colors">{tool.t}</h4>
                </div>

                <p className="text-sm text-text-muted font-bold leading-relaxed mb-10">{tool.d}</p>

                <div className="mt-auto pt-8 border-t border-slate-50 dark:border-border-dark flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Output</span>
                    <span className="text-sm font-black text-authority-blue dark:text-white uppercase">{tool.out}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-authority-blue/5 flex items-center justify-center text-authority-blue dark:text-signal-gold opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <Link to="/resources" className="inline-flex items-center space-x-4 bg-white border-4 border-authority-blue text-authority-blue px-14 py-6 rounded-3xl font-black uppercase tracking-[0.25em] text-xs hover:bg-authority-blue hover:text-white transition-all shadow-xl active:scale-95 group">
              <span>Access Master Suite</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <p className="text-[10px] mt-8 font-black uppercase tracking-[0.4em] text-slate-400">Restricted to Admitted Members & Approved Authorities</p>
          </div>
        </div>
      </section>

      {/* 9.6 SELECTION PROTOCOL (WHO THIS IS FOR) */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white dark:bg-surface-dark rounded-[5rem] border-[12px] border-slate-50 dark:border-border-dark p-16 md:p-24 shadow-2xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
              {/* WHO THIS IS FOR */}
              <div className="space-y-12">
                <h2 className="text-3xl md:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Who This Is For</h2>
                <div className="space-y-6">
                  {[
                    "CDL holders planning to obtain their own authority",
                    "New authorities in their first 90 days of operation",
                    "Lease-purchase drivers transitioning to independence"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 opacity-70">
                      <CheckCircle2 className="text-slate-300 mt-1 shrink-0" size={20} />
                      <p className="text-lg font-bold text-text-muted">{item}</p>
                    </div>
                  ))}
                  <div className="flex items-start space-x-4 p-6 bg-green-50/50 dark:bg-green-900/10 border-2 border-green-500/20 rounded-3xl">
                    <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
                    <p className="text-lg font-black text-authority-blue dark:text-white">Motor carriers who refuse to compromise integrity for shortcuts</p>
                  </div>
                </div>
              </div>

              {/* WHO THIS IS NOT FOR */}
              <div className="space-y-12">
                <h2 className="text-3xl md:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Who This Is Not For</h2>
                <div className="space-y-8">
                  {[
                    "Experienced operators (2+ years) looking for advanced logistics",
                    "Anyone seeking dispatching or load-finding services",
                    "Anyone looking for rapid financial promises",
                    "Anyone looking for legal, tax, or financial advice"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 opacity-60">
                      <XCircle className="text-red-300 mt-1 shrink-0" size={20} />
                      <p className="text-lg font-bold text-text-muted">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REQUEST ADMISSION / PRICING */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Request Admission</h2>
          <p className="text-2xl text-text-primary dark:text-text-dark-primary font-black mb-20 max-w-4xl mx-auto">Enrollment is admission-based to ensure operational alignment.</p>
          
          <div className="bg-white dark:bg-surface-dark p-16 lg:p-28 rounded-[6rem] border-[10px] border-slate-100 dark:border-border-dark shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-signal-gold/5 rounded-full -translate-y-40 translate-x-40"></div>
            <div className="space-y-14 relative z-10">
               <p className="text-[16px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-signal-gold">One System. One Standard.</p>
               <div className="flex flex-col items-center">
                  <div className="flex items-baseline text-authority-blue dark:text-white">
                     <span className="text-5xl font-black mr-6">$</span>
                     <span className="text-[10rem] font-black leading-none tracking-tighter drop-shadow-xl">1,500</span>
                  </div>
                  <p className="text-[14px] font-black uppercase tracking-[0.5em] text-slate-400 mt-10">One-Time Implementation Investment</p>
               </div>
               
               <div className="pt-10 flex flex-col items-center space-y-10">
                  <Link to="/readiness" className="bg-authority-blue text-white px-24 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-xl hover:bg-steel-blue shadow-[0_30px_60px_-15px_rgba(30,58,95,0.5)] transition-all active:scale-95 flex items-center border-b-8 border-black/20">
                    Request Admission <ArrowRight className="ml-6" size={32} />
                  </Link>
                  <p className="text-xl text-text-muted font-black max-w-xl italic leading-relaxed">
                    "Pricing reflects the seriousness of the implementation and the standard required to operate compliantly."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10.5 HOW IT WORKS (MATCHING SCREENSHOT) */}
      <section id="how-it-works" className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">How It Works</h2>
          <p className="text-2xl text-text-muted font-bold max-w-3xl mx-auto mb-24 leading-relaxed">
            LaunchPath follows a specific sequence to move you from uncertainty to an audit-ready operation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            {[
              { id: "01", t: "Start with Ground 0", d: "Complete the Discipline Standard to verify your business framework." },
              { id: "02", t: "Build the Pillars", d: "Implement Modules 1-4 to secure authority, insurance, and files." },
              { id: "03", t: "Meet Expectations", d: "Use Module 5 to prepare for the federal New Entrant Safety Audit." },
              { id: "04", t: "Stabilize", d: "Transition into Module 6 to prepare for long-term operational sustainability." }
            ].map((step, i) => (
              <div key={i} className="space-y-6">
                <span className="text-[100px] font-black leading-none tracking-tighter opacity-10 text-authority-blue dark:text-signal-gold block -mb-10">{step.id}</span>
                <div className="space-y-4">
                  <h4 className="text-xl font-black uppercase tracking-tight text-authority-blue dark:text-white leading-tight">{step.t}</h4>
                  <p className="text-sm text-text-muted font-bold leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.6 WHAT LAUNCHPATH DOES NOT PROVIDE (MATCHING SCREENSHOT) */}
      <section id="not-provided" className="py-32 bg-slate-50 dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">What LaunchPath Does Not Provide</h2>
          <p className="text-xl text-text-muted font-bold max-w-2xl mx-auto mb-20 leading-relaxed italic">Accuracy over hype requires clear boundaries.</p>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light shadow-sm flex flex-col md:flex-row items-center text-center md:text-left gap-8">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldAlert size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">No Dispatching</h4>
                <p className="text-lg font-bold text-text-muted">We do not find loads or provide dispatch services.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light shadow-sm flex flex-col md:flex-row items-center text-center md:text-left gap-8">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                <Scale size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">No Professional Advice</h4>
                <p className="text-lg font-bold text-text-muted">LaunchPath is an educational platform. We do not provide legal, tax, financial, or insurance advice.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light shadow-sm flex flex-col md:flex-row items-center text-center md:text-left gap-8">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">No Guarantees</h4>
                <p className="text-lg font-bold text-text-muted">We do not guarantee income, profits, or specific audit outcomes.</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-text-muted max-w-3xl mx-auto leading-loose opacity-60">
              "This clarity protects both you and our institution. We teach the standards; you are responsible for implementing them with the support of licensed professionals when needed."
            </p>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-52 bg-authority-blue relative overflow-hidden text-center text-white border-t-[12px] border-signal-gold/40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-6xl lg:text-[100px] font-black font-serif mb-14 leading-[0.85] tracking-tighter uppercase">
            Build Your <br/><span className="text-signal-gold italic">Legacy</span> <br/>on Systems.
          </h2>
          <p className="text-3xl text-white font-black mb-20 max-w-4xl mx-auto leading-relaxed">
            Stop chasing shortcuts and start building a carrier that survives federal scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <Link to="/readiness" className="w-full sm:w-auto bg-white text-authority-blue px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 border-b-8 border-slate-200">
              Request Admission
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-transparent border-4 border-white/40 text-white px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:border-white transition-all active:scale-95">
              Speak with Vince
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

// Fixed the default export to match component name
export default HomePage;