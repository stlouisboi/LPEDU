
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
  Monitor,
  ArrowDown,
  ArrowUp,
  ArrowLeft
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

  const enforcementRisks = [
    "Lack of random drug program implementation",
    "Deployment of drivers with positive drug test results",
    "Operating with drivers lacking medical certification",
    "Operation without verified insurance levels",
    "Utilization of drivers with revoked or suspended licenses",
    "Failure to conduct mandated pre-employment drug screening",
    "Absence of maintained Driver Qualification (DQ) records",
    "Failure to maintain Records of Duty Status (HOS)",
    "Directing drivers to exceed federal hours of service limits",
    "Dispatching vehicles in 'Out-of-Service' (OOS) conditions",
    "Lack of verified daily vehicle inspection reports",
    "Failure to register in the federal Drug & Alcohol Clearinghouse",
    "Inaccurate or missing BOC-3 / UCR administrative filings",
    "Neglecting mandatory previous employer background inquiries",
    "Absence of a systematic equipment maintenance program",
    "Failure to document and report accidents within federal windows"
  ];

  const pillars = [
    { 
      t: "Authority Protection", 
      focus: "Structural Fortress",
      d: "Move beyond basic filings. Establish a legal and operational foundation designed to withstand federal scrutiny and separate personal assets from business liability through proper authority setup, entity structure, and documentation discipline.", 
      icon: <Anchor size={40} /> 
    },
    { 
      t: "Insurance Continuity", 
      focus: "Premium Stability",
      d: "Eliminate the “30-Day Trap.” Install the documentation, safety processes, and renewal discipline insurance underwriters require to maintain continuous coverage and stabilize premiums during the highest-risk phase of a new authority.", 
      icon: <Shield size={40} /> 
    },
    { 
      t: "Compliance Backbone", 
      focus: "The 16-Exposure Defense",
      d: "Replace guesswork with documented compliance. LaunchPath installs the Exposure-vs-Refuge framework so driver qualification files, drug & alcohol programs, hours-of-service records, and maintenance documentation meet FMCSA audit expectations before enforcement begins.", 
      icon: <Layers size={40} /> 
    },
    { 
      t: "Cash-Flow Oxygen", 
      focus: "True Cost Survival Math",
      d: "Eliminate revenue blindness. Use the LaunchPath True Cost of Ownership (TCO) framework to identify real break-even thresholds, evaluate freight correctly, and avoid cash-flow decisions that force compliance shortcuts.", 
      icon: <Activity size={40} /> 
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION: AUTHORITY / DISCIPLINE */}
      <section className="relative min-h-[90vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/20 border-2 border-white/30 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] text-white shadow-lg uppercase">
                <span>⚖️ Stewardship • Operational Integrity</span>
              </div>
              
              <h1 className="text-5xl lg:text-[80px] font-black tracking-tighter text-white leading-[0.9] font-serif uppercase drop-shadow-sm">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> With <br/>Order and Certainty.
              </h1>
              
              <div className="text-2xl text-white leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold space-y-4">
                <p>Clarity is the primary asset of a resilient motor carrier. Establish systems that prioritize stewardship from operational day one.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <Link 
                  to="/readiness"
                  className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-2xl font-black text-sm hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-4 border-slate-200"
                >
                  Initiate Admission Protocol
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
                <button 
                  onClick={() => document.getElementById('logic')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-authority-blue border-2 border-white/20 text-white hover:border-white px-10 py-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center uppercase tracking-widest"
                >
                  Reference System Logic
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border-4 border-authority-blue dark:border-border-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
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
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-text-dark-muted ml-4">Full Legal Name</label>
                    <input 
                      type="text" required placeholder="Jane Doe"
                      className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-border-dark focus:border-authority-blue rounded-2xl outline-none transition-all font-black text-lg text-text-primary dark:text-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-text-dark-muted ml-4">Professional Email</label>
                    <input 
                      type="email" required placeholder="jane@carrier.com"
                      className="w-full px-7 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-border-dark focus:border-authority-blue rounded-2xl outline-none transition-all font-black text-lg text-text-primary dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98] border-b-4 border-black/20"
                  >
                    <MousePointer2 className="mr-3" size={20} />
                    Analyze Risk Profile
                  </button>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-black">
                    Secure Protocol • Educational Data Mapping Only
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPOSURE SECTION */}
      <section id="logic" className="py-32 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center space-x-3 text-red-700">
                <ShieldAlert size={28} />
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">Administrative Exposure Risk</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.95]">
                The Risks Many <br/><span className="text-red-700 underline underline-offset-[12px] decoration-slate-200 decoration-4">New Entrants</span> <br/>Underestimate.
              </h2>
              <div className="space-y-8 text-xl text-text-primary dark:text-text-dark-primary font-black leading-relaxed max-w-xl">
                <p>The initial 90-day window represents a statistically significant risk period. Regulators analyze carrier data for specific administrative gaps classified as enforcement risks.</p>
                <p className="text-text-muted dark:text-text-dark-muted font-bold">Standard operation requires technical infrastructure to mitigate identified regulatory exposure.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-10 lg:p-16 rounded-[4rem] border-4 border-slate-100 dark:border-border-dark shadow-xl space-y-12">
              <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">Identification & Alignment</h3>
              <p className="text-lg text-text-primary dark:text-text-dark-primary font-black leading-relaxed">The <strong>Four Pillars</strong> represent the structured documentation protocols expected by federal auditors and insurance underwriters:</p>
              
              <div className="space-y-4">
                {[
                  { t: "Drug & Alcohol Compliance", icon: <Briefcase size={24} /> },
                  { t: "Driver Qualification Standards", icon: <UserCheck size={24} /> },
                  { t: "Insurance & Fiscal Solvency", icon: <ShieldCheck size={24} /> },
                  { t: "Maintenance & HOS Governance", icon: <Clock size={24} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 p-6 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border-2 border-slate-100 dark:border-border-dark shadow-md">
                    <div className="text-authority-blue dark:text-signal-gold">{item.icon}</div>
                    <span className="text-base font-black uppercase tracking-widest text-authority-blue dark:text-white">{item.t}</span>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-authority-blue text-white rounded-[3rem] text-xl italic font-black leading-relaxed border-l-[12px] border-signal-gold shadow-2xl">
                "Exposure identification precedes system installation. The Four Pillars are the Standard."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FMCSA ENFORCEMENT RISKS SECTION */}
      <section id="deadly-sins" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-white dark:bg-gray-800 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border-2 border-slate-200 dark:border-border-dark">
              <FileWarning size={40} />
            </div>
            <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">
              FMCSA <br/>
              <span className="text-signal-gold italic">ENFORCEMENT RISKS.</span>
            </h2>
            <p className="text-2xl text-text-primary dark:text-text-dark-primary max-w-4xl mx-auto font-black leading-relaxed">
              Identify technical documentation gaps before they impact your safety record.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-8 text-center lg:text-left uppercase">Regulatory Risk Classification</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-20 list-disc pl-5">
              {enforcementRisks.map((risk, i) => (
                <li key={i} className="text-lg font-bold text-authority-blue dark:text-text-dark-primary marker:text-red-600">
                  <span className="leading-tight">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-6xl mx-auto bg-authority-blue text-white p-14 lg:p-20 rounded-[5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 border-4 border-signal-gold/30">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] rotate-12 scale-150 pointer-events-none">
              <ShieldAlert size={300} className="text-white" />
            </div>
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-4xl font-black font-serif mb-4 leading-tight uppercase tracking-tight">Systematic Mitigation <br/>of Identified Risks.</h3>
              <p className="text-xl text-white/80 font-bold leading-relaxed italic">
                "The LaunchPath Operating Standard establishes the documentation infrastructure required to satisfy institutional inspection criteria."
              </p>
            </div>
            <Link to="/readiness" className="relative z-10 bg-white text-authority-blue px-16 py-7 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap border-b-4 border-slate-200">
              ANALYZE RISK PROFILE
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS FOUNDATION */}
      <section id="pillars" className="py-32 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none">The Four Pillars Foundation</h2>
            <p className="text-2xl text-text-primary dark:text-text-dark-primary max-w-3xl mx-auto font-black leading-relaxed">Structured Operating Standards for New Entrant Survival</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border-4 border-slate-100 dark:border-border-dark shadow-xl hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform shadow-inner text-authority-blue dark:text-signal-gold">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-2 leading-tight font-serif">{pillar.t}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-signal-gold mb-6">{pillar.focus}</p>
                <p className="text-base text-text-primary dark:text-text-dark-muted font-bold leading-relaxed mb-8">{pillar.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto bg-slate-50 dark:bg-surface-dark p-12 md:p-16 rounded-[4rem] border-4 border-slate-200 dark:border-border-dark shadow-lg text-center">
            <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">REACH Test™ Admission Framing</h3>
            <p className="text-xl text-text-muted dark:text-text-dark-muted font-bold leading-relaxed mb-12 italic">
              “Admission into LaunchPath is determined by REACH Test™ results. This ensures carriers entering the standard have the financial readiness and risk tolerance required to implement it correctly.”
            </p>
            <div className="space-y-6">
              <Link to="/readiness" className="bg-authority-blue text-white px-16 py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center">
                Request Admission
                <ArrowRight className="ml-3" />
              </Link>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Admission is based on REACH Test™ results and alignment with the LaunchPath standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE REACH TEST™ */}
      <section id="reach-test" className="py-32 bg-primary-light dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center space-x-6 text-authority-blue dark:text-signal-gold mb-10">
             <div className="h-1.5 w-16 bg-current rounded-full"></div>
             <span className="text-[14px] font-black uppercase tracking-[0.5em]">Risk Classification Protocol</span>
             <div className="h-1.5 w-16 bg-current rounded-full"></div>
          </div>
          <h2 className="text-6xl lg:text-[100px] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none mb-14">
             The <span className="text-signal-gold underline underline-offset-[20px] decoration-8">Reach</span> Test™
          </h2>
          <p className="text-3xl text-text-primary dark:text-text-dark-primary font-black max-w-5xl mx-auto leading-relaxed mb-24">
            "Assessment of structural integrity under institutional pressure."
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto text-left">
             {[
               { 
                 label: "OVER", 
                 title: "FMCSA Regulatory Violations", 
                 description: "Technical violations bypassing baseline administrative filters.",
                 icon: <ArrowDown size={32} /> 
               },
               { 
                 label: "AROUND", 
                 title: "Insurance Cancellations", 
                 description: "Administrative lapses triggering automatic loss of coverage.",
                 icon: <ArrowRight size={32} /> 
               },
               { 
                 label: "THROUGH", 
                 title: "Internal System Auditors", 
                 description: "Data inconsistencies identified during federal investigations.",
                 icon: <ArrowLeft size={32} /> 
               },
               { 
                 label: "UNDER", 
                 title: "Financial Foundation Collapse", 
                 description: "Fiscal deficits compromising mandated safety operations.",
                 icon: <ArrowUp size={32} /> 
               }
             ].map((item, i) => (
               <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-slate-100 dark:border-border-dark flex items-start gap-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 shrink-0 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-signal-gold group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue/60 dark:text-slate-400 mb-2 block">{item.label}</span>
                    <h4 className="font-black text-xl lg:text-2xl uppercase text-authority-blue dark:text-white mb-3 leading-tight font-serif tracking-tight">{item.title}</h4>
                    <p className="text-sm lg:text-base text-text-muted dark:text-text-dark-muted font-bold leading-relaxed">{item.description}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-52 bg-authority-blue relative overflow-hidden text-center text-white border-t-[12px] border-signal-gold/40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-6xl lg:text-[100px] font-black font-serif mb-14 leading-[0.85] tracking-tighter uppercase">
            Build Your <br/><span className="text-signal-gold italic">Carrier</span> <br/>on Systems.
          </h2>
          <p className="text-3xl text-white font-black mb-20 max-w-4xl mx-auto leading-relaxed">
            Transition from administrative volatility to a standardized operating posture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <Link to="/readiness" className="w-full sm:w-auto bg-white text-authority-blue px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 border-b-8 border-slate-200">
              Request Admission
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-transparent border-4 border-white/40 text-white px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:border-white transition-all active:scale-95">
              Contact Technical Support
            </Link>
          </div>
          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
            Admission is based on REACH Test™ results and alignment with the LaunchPath standard.
          </p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
