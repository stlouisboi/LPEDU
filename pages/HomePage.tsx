
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield,
  Activity,
  UserCheck,
  ShieldAlert,
  FileWarning,
  Layers,
  ChevronDown,
  ChevronRight,
  Lock,
  MousePointer2,
  Briefcase,
  Award,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  AlertCircle,
  Clock,
  Calendar,
  CreditCard,
  Scale,
  HelpCircle,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Skull,
  Zap
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

  const deadlySinsCategories = [
    {
      title: "Chemical Dependency Protocols",
      sins: [
        { id: "01", text: "Lack of random drug program implementation", impact: "Automatic Audit Failure" },
        { id: "02", text: "Deployment of drivers with positive results", impact: "Authority Revocation" },
        { id: "03", text: "Failure to register in Federal Clearinghouse", impact: "Regulatory Violation" },
        { id: "04", text: "Omission of pre-employment screening", impact: "Critical Exposure" }
      ]
    },
    {
      title: "Driver Eligibility Standards",
      sins: [
        { id: "05", text: "Utilization of revoked or suspended licenses", impact: "Immediate Out-of-Service" },
        { id: "06", text: "Drivers lacking valid medical certification", impact: "Safety Rating Downgrade" },
        { id: "07", text: "Absence of maintained DQ file infrastructure", impact: "Audit Red Flag" },
        { id: "08", text: "Neglecting previous employer background inquiries", impact: "Administrative Default" }
      ]
    },
    {
      title: "Operational Safety Controls",
      sins: [
        { id: "09", text: "Directing drivers to exceed HOS limits", impact: "Criminal Negligence Risk" },
        { id: "10", text: "Dispatching vehicles in OOS conditions", impact: "Operational Termination" },
        { id: "11", text: "Failure to maintain Records of Duty Status", impact: "Federal Fine Multiplier" },
        { id: "12", text: "Lack of verified daily vehicle inspections", impact: "Structural Liability" }
      ]
    },
    {
      title: "Administrative Integrity",
      sins: [
        { id: "13", text: "Operation without verified insurance levels", impact: "Permanent Blacklist" },
        { id: "14", text: "Inaccurate or missing BOC-3 / UCR filings", impact: "Administrative Suspension" },
        { id: "15", text: "Absence of systematic maintenance program", impact: "Inspection Exposure" },
        { id: "16", text: "Failure to report accidents within windows", impact: "Legal Default" }
      ]
    }
  ];

  const pillars = [
    { 
      t: "Authority Protection", 
      focus: "Structural Fortress",
      d: "Move beyond basic filings. Establish a legal and operational foundation designed to withstand federal scrutiny and separate personal assets from business liability through proper authority setup, entity structure, and documentation discipline.", 
      icon: <Briefcase size={40} /> 
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

  const reachTests = [
    {
      label: "OVER",
      title: "FMCSA REGULATORY VIOLATIONS",
      desc: "Technical violations bypassing baseline administrative filters.",
      icon: <MoveDown className="text-signal-gold" size={20} />
    },
    {
      label: "AROUND",
      title: "INSURANCE CANCELLATIONS",
      desc: "Administrative lapses triggering automatic loss of coverage.",
      icon: <MoveRight className="text-signal-gold" size={20} />
    },
    {
      label: "THROUGH",
      title: "INTERNAL SYSTEM AUDITORS",
      desc: "Data inconsistencies identified during federal investigations.",
      icon: <MoveLeft className="text-signal-gold" size={20} />
    },
    {
      label: "UNDER",
      title: "FINANCIAL FOUNDATION COLLAPSE",
      desc: "Fiscal deficits compromising mandated safety operations.",
      icon: <MoveUp className="text-signal-gold" size={20} />
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/20 border-2 border-white/30 px-5 py-2.5 rounded-full text-[12px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                <span>⚖️ Stewardship • Operational Integrity</span>
              </div>
              
              <h1 className="text-5xl lg:text-[80px] font-black tracking-tighter text-white leading-[0.9] font-serif uppercase drop-shadow-sm">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> With <br/>Order and Certainty.
              </h1>
              
              <div className="text-2xl text-white leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold space-y-6">
                <p>Clarity is the primary asset of a resilient motor carrier. Establish systems that prioritize stewardship from operational day one.</p>
                <p className="text-base font-black uppercase tracking-widest text-signal-gold opacity-90">Designed for first-time interstate motor carrier owner-operators in their first 90 days of authority.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-2xl font-black text-sm hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-4 border-slate-200">
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
            
            <div className="lg:col-span-5 relative">
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
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3">
                      <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] font-bold text-red-700">{error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue ml-4">Full Legal Name</label>
                    <input 
                      type="text" required placeholder="Jane Doe"
                      className="w-full px-7 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none font-black text-lg"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue ml-4">Professional Email</label>
                    <input 
                      type="email" required placeholder="jane@carrier.com"
                      className="w-full px-7 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none font-black text-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98]">
                    <MousePointer2 className="mr-3" size={20} />
                    Analyze Risk Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPOSURE LOGIC SECTION */}
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
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-10 lg:p-16 rounded-[4rem] border-4 border-slate-100 dark:border-border-dark shadow-xl space-y-12">
              <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">Identification & Alignment</h3>
              <div className="space-y-4">
                {["Drug & Alcohol Compliance", "Driver Qualification Standards", "Insurance & Fiscal Solvency", "Maintenance & HOS Governance"].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 p-6 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border-2 border-slate-100 shadow-md">
                    <ShieldCheck className="text-authority-blue dark:text-signal-gold" size={24} />
                    <span className="text-base font-black uppercase tracking-widest text-authority-blue dark:text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 16 DEADLY SINS - ENHANCED RISK MATRIX */}
      <section className="py-32 bg-slate-100 dark:bg-primary-dark border-y border-slate-200 dark:border-border-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          
          <div className="flex flex-col items-center text-center mb-24 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
              <Skull size={14} className="animate-pulse" />
              <span>Enforcement Registry Landmines</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9]">
              The 16 <br/><span className="text-red-600 italic">Deadly Sins.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-text-dark-muted font-bold max-w-2xl leading-relaxed">
              These specific administrative gaps trigger 85% of New Entrant Audit failures. Identification and resolution are mandatory prerequisites for operational stability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {deadlySinsCategories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-8">
                <div className="flex items-center space-x-4 border-b-2 border-slate-200 dark:border-border-dark pb-4">
                  <div className="w-10 h-10 bg-authority-blue text-signal-gold rounded-xl flex items-center justify-center font-black">
                    {catIdx + 1}
                  </div>
                  <h3 className="text-xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.sins.map((sin, sinIdx) => (
                    <div key={sinIdx} className="group relative bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-2xl hover:border-red-500/50 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                      {/* Sin Index BG */}
                      <span className="absolute -top-4 -right-4 text-6xl font-black text-slate-50 dark:text-slate-800 pointer-events-none group-hover:text-red-50 transition-colors duration-500">
                        {sin.id}
                      </span>

                      <div className="relative z-10 space-y-4">
                        <p className="text-base font-bold text-slate-700 dark:text-text-dark-primary leading-tight uppercase tracking-tight">
                          {sin.text}
                        </p>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 dark:bg-red-950/20 rounded-lg">
                           <Zap size={10} className="text-red-600" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-red-700 dark:text-red-400">
                             Impact: {sin.impact}
                           </span>
                        </div>
                      </div>

                      {/* Hazard Line */}
                      <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-100 dark:bg-gray-800 group-hover:bg-red-600 transition-colors duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Note */}
          <div className="mt-24 p-10 bg-authority-blue rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
             <p className="relative z-10 text-white text-lg font-black uppercase tracking-[0.2em] mb-4">Registry Warning</p>
             <p className="relative z-10 text-white/70 max-w-3xl mx-auto font-medium leading-relaxed italic">
               "The FMCSA does not grade on a curve. Each of these 16 items represents a critical system component. A failure in one often indicates a systemic collapse of safety management controls."
             </p>
          </div>
        </div>
      </section>

      {/* 4. THE FOUR PILLARS */}
      <section id="pillars" className="py-32 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">The Four Pillars Foundation</h2>
            <p className="text-2xl text-text-primary font-black">Structured Operating Standards for New Entrant Survival</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border-4 border-slate-100 dark:border-border-dark shadow-xl hover:shadow-2xl transition-all flex flex-col h-full">
                <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-12 text-authority-blue dark:text-signal-gold">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black uppercase font-serif text-authority-blue dark:text-white mb-2 leading-tight">{pillar.t}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-signal-gold mb-6">{pillar.focus}</p>
                <p className="text-base font-bold leading-relaxed">{pillar.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE REACH TEST SECTION */}
      <section className="py-32 bg-[#F8FAFC] dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 space-y-6">
            <div className="flex items-center justify-center space-x-6">
              <div className="h-[2px] w-16 bg-authority-blue/30"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-slate-400">Risk Classification Protocol</span>
              <div className="h-[2px] w-16 bg-authority-blue/30"></div>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase leading-[0.85]">
              THE <span className="text-signal-gold border-b-8 border-signal-gold">REACH</span> TEST™
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-800 dark:text-text-dark-primary font-black italic tracking-tight">
              "Assessment of structural integrity under institutional pressure."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reachTests.map((test, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-border-dark hover:shadow-xl transition-all duration-500 group flex items-start space-x-8">
                <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl group-hover:bg-authority-blue group-hover:text-white transition-colors">
                  {test.icon}
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{test.label}</p>
                  <h3 className="text-xl font-black font-serif text-authority-blue dark:text-white tracking-tight uppercase leading-tight">{test.title}</h3>
                  <p className="text-base text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/reach-test" className="inline-flex items-center space-x-3 bg-white border-2 border-authority-blue text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95 group">
              <span>Technical Deep-Dive</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TRUTH & CLARIFICATION BRIDGE */}
      <section className="py-32 bg-white dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">
            Institutional <span className="text-signal-gold italic">Clarifications</span>
          </h2>
          <p className="text-lg text-slate-500 font-bold mt-4 uppercase tracking-widest max-w-2xl mx-auto">Truth over Marketing. Reality over Persuasion. Explore the technical requirements of authority.</p>
          <div className="mt-12">
            <Link to="/clarification" className="inline-flex items-center space-x-3 bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-white transition-all shadow-xl active:scale-95 group">
              <span>View System Realities</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
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
            <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 border-b-8 border-slate-200">
              Initiate Admission Protocol
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-transparent border-4 border-white/40 text-white px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-lg hover:border-white transition-all active:scale-95">
              Contact Technical Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
