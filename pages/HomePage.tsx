import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  BookOpen,
  Loader2,
  Star,
  Shield,
  Award,
  BadgeCheck,
  FileText,
  Wrench,
  Mail,
  Zap,
  ShieldAlert,
  BarChart3,
  FileWarning,
  TrendingUp,
  XCircle,
  Calendar,
  AlertCircle,
  Clock,
  User,
  Scale,
  Wallet,
  Activity,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Gavel,
  History,
  Ban,
  Percent,
  Users
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import Logo from '../components/Logo';

const OSHABadgeSmall = () => (
  <svg width="140" height="56" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <rect width="160" height="64" rx="12" fill="white" fillOpacity="0.05" />
    <rect x="1" y="1" width="158" height="62" rx="11" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    <path d="M22 18C22 16.5 28 15 28 15C28 15 34 16.5 34 18V28C34 32 28 36 28 36C28 36 22 32 22 28V18Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">OSHA TRAINED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">PROFESSIONAL</text>
  </svg>
);

const VeteranBadgeSmall = () => (
  <svg width="140" height="56" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <rect width="160" height="64" rx="12" fill="white" fillOpacity="0.05" />
    <rect x="1" y="1" width="158" height="62" rx="11" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    <path d="M28 16L30.5 22.5H37.5L32 26.5L34 33L28 29L22 33L24 26.5L18.5 22.5H25.5L28 16Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">VETERAN OWNED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">& OPERATED</text>
  </svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [errors, setErrors] = useState<{firstName?: string, email?: string}>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: {firstName?: string, email?: string} = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName,
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "risk-map-hero"
        });
      }
      setLoading(false);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName)}`);
    } catch (error) {
      console.error("Lead capture failed:", error);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName)}`);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-40 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Branding Logo integrated into Hero as requested */}
              <div className="mb-10 inline-block">
                <Logo className="mb-4" />
              </div>
              
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-8">
                <ShieldCheck size={14} className="text-signal-gold" />
                <span>The Four Pillars Methodology</span>
              </div>
              
              <h1 className="text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tighter text-authority-blue dark:text-white mb-8 font-serif leading-[0.9]">
                Protect Your Authority Against <span className="text-signal-gold">New Entrant Gaps</span> — Build an Audit-Ready Framework.
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                The 90-Day Window determines if your carrier navigates the technical requirements of the FMCSA. I provide the educational systems and frameworks required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Link to="/enroll" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all flex items-center shadow-2xl active:scale-95">
                  Start Learning <ArrowRight className="ml-3" size={16} />
                </Link>
                <Link to="/learning-path" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark flex items-center shadow-sm active:scale-95">
                  View My Roadmap
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-4 grayscale opacity-60">
                <div className="flex items-center space-x-3">
                  <Award size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Veteran Owned</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">OSHA Standards</span>
                </div>
              </div>
            </div>
            
            {/* HERO LEAD CAPTURE FORM */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-signal-gold via-yellow-400 to-signal-gold rounded-[4.5rem] blur-3xl opacity-20"></div>
              <div className="relative bg-white dark:bg-surface-dark p-8 md:p-14 rounded-[3.5rem] border-[10px] border-signal-gold shadow-[0_50px_100px_-20px_rgba(212,175,55,0.4)]">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-4 leading-[0.85]">
                    GET FREE DOWNLOAD: <br/>
                    <span className="text-signal-gold underline decoration-authority-blue/10 decoration-8 underline-offset-8">FIRST 90 DAYS RISK MAP™</span>
                  </h2>
                  
                  <div className="flex items-start space-x-4 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                    <div className="p-3.5 bg-red-100 text-red-600 rounded-2xl shrink-0">
                      <FileWarning size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-text-primary leading-tight mb-1.5 uppercase">Identify Operational Gaps</p>
                      <p className="text-xs text-text-muted font-bold leading-relaxed italic">Learn the technical requirements that determine authority status during the 18-month New Entrant phase.</p>
                    </div>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">First Name</label>
                        <input 
                          required
                          type="text"
                          placeholder="First Name"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-4 border-slate-100 outline-none focus:border-signal-gold transition-all font-bold"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4">Email Address</label>
                        <input 
                          required
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-4 border-slate-100 outline-none focus:border-signal-gold transition-all font-bold"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full bg-signal-gold text-authority-blue py-8 rounded-[2.2rem] font-black uppercase tracking-[0.2em] text-xl hover:bg-authority-blue hover:text-white transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={32} /> : <span>GET THE RISK MAP™</span>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION STRIP / FOUNDER CREDIBILITY */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Image Column - Made Picture A Little Bigger */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center lg:items-start group">
              <div className="relative h-[480px] w-full max-w-[400px] bg-white/5 rounded-[3rem] border border-white/10 p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <img 
                   src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                   alt="Vince Lawrence - LaunchPath Founder" 
                   className="w-full h-full object-cover object-top rounded-[2rem] grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" 
                 />
              </div>
              <div className="mt-12 w-full max-w-[400px] p-6 bg-white/5 backdrop-blur-xl rounded-[1.5rem] border border-white/10 shadow-2xl">
                <p className="text-base font-bold font-serif italic mb-1.5 text-white leading-tight">"Accuracy Over Hype."</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">Vince Lawrence | Founder</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-8 xl:space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold mb-4">
                  <Star size={14} fill="currentColor" />
                  <span>The Kingdom Business Standard</span>
                </div>
                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black font-serif tracking-tighter leading-[0.95] uppercase">
                  Why LaunchPath <span className="text-signal-gold italic">Exists</span>
                </h2>
              </div>
              
              <div className="space-y-8 text-lg xl:text-xl text-white/70 leading-relaxed font-medium">
                <p>
                  LaunchPath™ was built by Vince Lawrence, founder and operations-focused safety professional with experience overseeing compliance and safety systems supporting approximately 1,200 employees. His background includes supervisory leadership, business unit management, and work within regulated environments where procedural discipline and audit readiness matter.
                </p>

                <div className="space-y-6 py-6 border-y border-white/10">
                  <p>
                    Most new owner-operators don’t fail because they lack driving skill. They fail because <span className="text-white font-black">early business decisions quietly destabilize their authority, insurance, compliance standing, or cash flow</span> before they have time to recover.
                  </p>
                  <p>
                    The trucking industry offers plenty of speed-focused solutions—fast authority setup, dispatching services, and revenue promises—but <span className="text-signal-gold font-black italic">very little education focused on risk containment</span> during the most dangerous first 90 days of ownership.
                  </p>
                  <p>
                    <span className="text-white font-black underline decoration-signal-gold decoration-4 underline-offset-8">LaunchPath exists to fill that gap.</span> It is a 90-day owner-operator survival system designed to help new carriers slow down, establish audit-ready compliance practices, protect insurance continuity, and maintain cash-flow stability during their earliest months of operation.
                  </p>
                </div>

                <p>
                  Built as a Kingdom business, LaunchPath is established on the values of stewardship and integrity. We prioritize administrative accuracy and federal law to provide a technical foundation for new motor carriers. <span className="text-white font-black">Compliance methodology matters more than industry experience.</span>
                </p>
                <p className="text-sm font-bold opacity-60">
                  LaunchPath is an educational and coaching program only. This information is not legal, tax, financial, insurance, or regulatory advice.
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/10">
                 <div className="flex flex-wrap items-center gap-6">
                    <div className="transition-transform hover:scale-105 duration-300">
                      <VeteranBadgeSmall />
                    </div>
                    <div className="transition-transform hover:scale-105 duration-300">
                      <OSHABadgeSmall />
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/10">
                       <ShieldCheck className="text-signal-gold" size={24} />
                       <span className="text-[11px] font-black uppercase tracking-[0.2em]">Systems-First Education</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FOUR PILLARS SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-8 text-authority-blue dark:text-white">The Four Pillars of Survival</h2>
            <p className="text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium">
              LaunchPath integrates all four operational areas that determine whether your business makes it past 18 months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Authority Protection", i: <ShieldCheck />, d: "Keep your DOT/MC active. Learn to prepare for the New Entrant Safety Audit. Understand legal operational status." },
              { t: "Insurance Continuity", i: <Shield />, d: "Learn standard coverage requirements. Avoid common cancellation triggers that ground fleets." },
              { t: "Compliance Backbone", i: <FileText />, d: "Build technical DQ files, drug testing, and HOS systems. Learn how to maintain low SMS scores." },
              { t: "Cash-Flow Oxygen", i: <Wallet />, d: "Manage 'The Money Loop.' Navigate the 30-60 day payment gap while making disciplined load decisions." }
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {p.i}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-authority-blue dark:text-white mb-4 leading-tight">{p.t}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed flex-grow">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE REAL COST OF GETTING IT WRONG */}
      <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-reveal-up">
            <div className="inline-flex items-center space-x-2 text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              <ShieldAlert size={16} />
              <span>Federal Risk Assessment</span>
            </div>
            <h2 className="text-4xl lg:text-8xl font-black font-serif tracking-tighter mb-8 uppercase leading-[0.85]">
              The Real Cost of <br/><span className="text-red-600 italic">Getting It Wrong</span>
            </h2>
            <p className="text-xl lg:text-2xl text-text-dark-muted max-w-3xl mx-auto leading-relaxed font-medium">
              Ignorance of technical requirements is a primary liability that results in significant carrier failure rates before the first renewal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                n: "1 in 5",
                t: "Audit Failure Rate",
                d: "20% of new carriers fail their initial Safety Audit due to basic paperwork gaps, leading to potential authority suspension.",
                i: <Ban className="text-red-500" />,
                impact: "Immediate Shutdown"
              },
              {
                n: "$15,445",
                t: "Avg. Fine Per Violation",
                d: "Maximum fines for single Drug & Alcohol clearinghouse violations can exceed $15,000 per instance.",
                i: <DollarSign className="text-signal-gold" />,
                impact: "Financial Ruin"
              },
              {
                n: "400%",
                t: "Insurance Premium Spike",
                d: "An 'Unsatisfactory' safety rating can increase insurance premiums by 400%, impacting operational solvency.",
                i: <TrendingDown className="text-red-400" />,
                impact: "Profit Evaporation"
              },
              {
                n: "Permanent",
                t: "Safety Ban",
                d: "FMCSA 'Chameleon Carrier' laws prevent carriers from re-opening under a new name once shut down for safety.",
                i: <Gavel className="text-white" />,
                impact: "Career Ending"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 flex flex-col hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.i}
                </div>
                <div className="text-4xl font-black text-white mb-2 font-serif">{item.n}</div>
                <h4 className="text-sm font-black uppercase tracking-widest text-signal-gold mb-6">{item.t}</h4>
                <p className="text-sm text-text-dark-muted font-medium leading-relaxed mb-8 flex-grow">{item.d}</p>
                <div className="pt-6 border-t border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Risk: {item.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-red-950/20 border-2 border-dashed border-red-500/30 rounded-[3.5rem] text-center shadow-inner">
             <div className="flex items-center justify-center space-x-3 mb-6">
                <Percent className="text-red-500" size={24} />
                <h4 className="text-lg font-black uppercase tracking-widest text-red-100">Carrier Survival Statistics</h4>
             </div>
             <p className="text-xl font-bold text-red-200 mb-10 max-w-4xl mx-auto leading-relaxed italic">
               "The DOT does not prioritize operational 'hustle'. They prioritize technical compliance. Build your backbone before you build your load volume."
             </p>
             <Link to="/enroll" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-2xl active:scale-95 group">
                <span>INSTALL YOUR BACKBONE NOW</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 5. COURSE MODULES SECTION */}
      <section className="py-32 bg-white dark:bg-primary-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-6">
                <BookOpen size={14} className="text-signal-gold" />
                <span>Structured 7-Module Roadmap</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-8 text-authority-blue dark:text-white">Safety & Compliance Essentials</h2>
            <p className="text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium italic">
              LaunchPath focuses on the technical discipline that keeps your authority active.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { m: 0, t: "The Mindset Module", b: ["Business Go/No-Go Decision", "Authority Risk Assessment", "Operational Reality Check"], o: "Identify if you should start" },
              { m: 1, t: "Business & Authority Setup", b: ["DOT vs MC Strategy", "Interstate Registration", "Identity & Authority Filing"], o: "Open the appropriate authority" },
              { m: 2, t: "Insurance Survival", b: ["Secure Standard Coverage", "Avoid Cancellation Triggers", "Claim Strategy Basics"], o: "Protect your biggest expense" },
              { m: 3, t: "Compliance Backbone", b: ["DQ File Implementation", "Clearinghouse Enrollment", "HOS & ELD Requirements"], o: "Build technical file libraries" },
              { m: 4, t: "New Entrant Audit Preparation", b: ["Audit Document Checklist", "Investigation Conduct Guide", "Common Failure Strategies"], o: "Understand the audit process" },
              { m: 5, t: "Load Discipline & Cash Flow", b: ["The Money Loop Management", "Payment Gap Solvency", "Profitable Load Decisioning"], o: "Stay liquid while you wait for payments" },
              { m: 6, t: "Stabilization & Growth", b: ["Ongoing Compliance Habits", "CSA Score Monitoring", "Scaling with Integrity"], o: "Keep authority active long-term" }
            ].map((mod, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light flex flex-col group hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><BookOpen size={28} /></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module {mod.m}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{mod.t}</h3>
                <ul className="space-y-3 mb-10 flex-grow text-sm font-medium text-text-muted">
                  {mod.b.map((bullet, bi) => <li key={bi}>→ {bullet}</li>)}
                </ul>
                <div className="pt-6 border-t border-border-light">
                  <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: {mod.o}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPARISON TABLE */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter leading-none mb-6">How LaunchPath <br/><span className="text-authority-blue italic">Is Different</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* YOUTUBE */}
              <div className="bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border border-border-light shadow-sm flex flex-col opacity-60 hover:opacity-100 transition-opacity">
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-8 text-text-muted">YouTube Videos</h4>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center text-green-600 font-bold"><CheckCircle2 className="mr-3 shrink-0" /> Free</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> Revenue-focused</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> No compliance systems</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> No audit preparation</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> Casual advice</li>
                 </ul>
                 <div className="pt-6 border-t border-border-light text-red-600 font-black uppercase tracking-widest text-[10px]">Result: Low technical depth</div>
              </div>

              {/* DISPATCHER COURSES */}
              <div className="bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border border-border-light shadow-sm flex flex-col opacity-60 hover:opacity-100 transition-opacity">
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-8 text-text-muted">Dispatcher Courses</h4>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center text-green-600 font-bold"><CheckCircle2 className="mr-3 shrink-0" /> Teach load booking</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> Skip compliance</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> Assume you know law</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> No DQ file training</li>
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> Focus on brokers</li>
                 </ul>
                 <div className="pt-6 border-t border-border-light text-red-600 font-black uppercase tracking-widest text-[10px]">Result: High audit risk</div>
              </div>

              {/* LAUNCHPATH */}
              <div className="bg-authority-blue text-white p-10 rounded-[3.5rem] border-4 border-signal-gold shadow-2xl flex flex-col scale-105 relative z-10">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-widest whitespace-nowrap shadow-xl">THE INDUSTRY STANDARD</div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-8 text-signal-gold">LaunchPath</h4>
                 <ul className="space-y-6 mb-12 flex-grow">
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> Compliance-first</li>
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> Complete file-building</li>
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> New Entrant Audit prep</li>
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> 7-Module implementation</li>
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> Survival-focused</li>
                 </ul>
                 <div className="pt-6 border-t border-white/10 text-signal-gold font-black uppercase tracking-widest text-[10px]">Result: Built for federal scrutiny</div>
              </div>
           </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-6 leading-none text-authority-blue dark:text-white uppercase tracking-tight">Enrollment Options</h2>
             <p className="text-lg text-text-muted font-black uppercase tracking-widest text-authority-blue">Structured educational support for your carrier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* TIER 1 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col group h-full">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white">Self-Paced <br/>Fundamentals</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                  <BookOpen size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-signal-gold">397</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">Curriculum Access Only</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow font-bold text-text-muted">
                {["Educational Implementation Modules", "Compliance Template Library", "Regulatory Filing Walkthroughs", "Ongoing Curriculum Updates"].map((f, j) => (
                  <li key={j} className="flex items-start text-sm"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link to="/enroll" className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-steel-blue transition-all shadow-xl active:scale-95">SELECT FUNDAMENTALS</Link>
            </div>

            {/* TIER 2 */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] flex flex-col relative scale-105 shadow-2xl z-10 border-4 border-signal-gold/20 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">CAPACITY BASED ACCESS</div>
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Implementation <br/>Mastery</h3>
                <div className="p-3 bg-white/10 rounded-2xl text-signal-gold">
                  <Users size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-white">797</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">Curriculum + Group Education</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow text-sm opacity-90 font-bold">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Everything in Self-Paced Tier</li>
                {["Weekly Group Implementation Calls", "Peer Document Review Sessions", "Program Completion Certificate"].map((f, j) => (
                  <li key={j} className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link to="/enroll" className="w-full bg-signal-gold text-authority-blue py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-white transition-all shadow-2xl active:scale-95">START IMPLEMENTATION</Link>
            </div>

            {/* TIER 3 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full group">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white">Individualized <br/>Guided Review</h3>
                <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                  <Scale size={24} />
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-authority-blue">1,497</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">High-Touch Individual Education</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow text-sm text-text-muted font-bold">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Everything in Mastery Tier</li>
                {["Individual Process Review Sessions", "Student Document Educational Assessment", "Custom Implementation Milestones"].map((f, j) => (
                  <li key={j} className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link to="/enroll" className="w-full border-4 border-authority-blue text-authority-blue dark:text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-authority-blue hover:text-white transition-all shadow-xl active:scale-95">INQUIRE FOR REVIEW</Link>
            </div>
          </div>
          
          {/* CAPACITY BANNER */}
          <div className="max-w-5xl mx-auto mt-20 p-10 bg-white dark:bg-surface-dark border-4 border-dashed border-border-light rounded-[3rem] text-center shadow-2xl animate-reveal-up relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center justify-center space-x-4 mb-6">
                  <Scale className="text-authority-blue" size={32} />
                  <h4 className="text-lg font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Capacity & Onboarding Notice</h4>
                  <Scale className="text-authority-blue" size={32} />
               </div>
               <p className="text-xl md:text-2xl font-black text-text-primary dark:text-white leading-tight mb-4">
                 Enrollment capacity is limited to ensure educational support quality. <br/>
                 <span className="text-authority-blue dark:text-signal-gold underline decoration-authority-blue/10 decoration-8 underline-offset-8">Educational pricing is based on program validation phase.</span>
               </p>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mt-6 bg-slate-50 dark:bg-gray-800 inline-block px-8 py-3 rounded-full border border-border-light shadow-sm">
                 LaunchPath is an educational program. Information provided does not constitute legal, tax, financial, insurance, or regulatory advice. No outcomes are guaranteed.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. WHAT YOU GET IMMEDIATELY */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter leading-none mb-6">What You Get <span className="text-signal-gold italic">Immediately</span></h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-white/10"></div>
              {[
                { n: "1", t: "Instant Course Access", d: "Access educational modules and download the student workbook.", c: "(0-5 Minutes)" },
                { n: "2", t: "Identify Risk", d: "Complete the Business Assessment and identify operational gaps.", c: "(First 24 Hours)" },
                { n: "3", t: "Technical Strategy", d: "Identify the appropriate DOT vs MC strategy for your operation.", c: "(First Week)" },
                { n: "4", t: "Foundation Installed", d: "Compliance Framework mapped. DQ file structures initiated.", c: "(First 30 Days)" }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 text-center md:text-left space-y-6">
                   <div className="w-20 h-20 bg-signal-gold text-authority-blue rounded-full flex items-center justify-center font-black text-2xl border-8 border-authority-blue mx-auto md:mx-0 shadow-2xl">{step.n}</div>
                   <h4 className="text-xl font-black uppercase tracking-tight">{step.t}</h4>
                   <p className="text-sm font-medium text-white/60 leading-relaxed">{step.d}</p>
                   <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.2em]">{step.c}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-40 bg-white dark:bg-primary-dark text-center relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <h2 className="text-5xl lg:text-8xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white leading-[0.9]">Implement Your <span className="text-signal-gold">Compliance Backbone.</span></h2>
           <p className="text-2xl lg:text-3xl text-text-muted dark:text-text-dark-muted mb-12 font-medium">Start the curriculum tonight. Build your technical framework tomorrow.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/enroll" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:bg-signal-gold transition-all shadow-2xl active:scale-95 group">
                <span>GET STARTED</span>
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
             </Link>
             <Link to="/learning-path" className="inline-flex items-center space-x-3 text-authority-blue dark:text-white font-black uppercase tracking-[0.2em] text-sm hover:underline underline-offset-8 transition-all">
                <span>DOWNLOAD FREE RISK MAP</span>
                <ArrowRight size={18} />
             </Link>
           </div>
        </div>
      </section>

      {/* FOOTER DISCLAIMER */}
      <footer className="bg-slate-50 dark:bg-primary-dark py-12 border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-loose">
            © {new Date().getFullYear()} LaunchPath Transportation EDU. <br/>
            LaunchPath is an educational platform. Information provided does not constitute legal, tax, financial, insurance, or regulatory advice. <br/>
            Veteran Owned & Operated. 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;