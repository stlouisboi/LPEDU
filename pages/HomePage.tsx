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
  ChevronRight
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-8">
                <ShieldCheck size={14} className="text-signal-gold" />
                <span>The Four Pillars Methodology</span>
              </div>
              
              <h1 className="text-5xl lg:text-[5.5rem] font-black tracking-tighter text-authority-blue dark:text-white mb-8 font-serif leading-[0.9]">
                Build Your Carrier on The <span className="text-signal-gold">Four Pillars</span> of Survival.
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                The 90-Day Containment Window determines if your carrier survives the critical 18-month New Entrant phase. I provide the systems to ensure you do.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all flex items-center shadow-2xl active:scale-95">
                  View Enrollment Options <ArrowRight className="ml-3" size={16} />
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
                      <p className="text-sm font-black text-text-primary leading-tight mb-1.5 uppercase">Stop Authority Revocation</p>
                      <p className="text-xs text-text-muted font-bold leading-relaxed italic">Identify your compliance gaps before they become federal violations.</p>
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

      {/* 2. FOUNDER CREDIBILITY SECTION */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="relative aspect-[3/4] md:h-[600px] bg-slate-800 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" alt="Vince - Founder" className="w-full h-full object-cover grayscale contrast-125" />
                 <div className="absolute bottom-10 left-10 right-10 p-8 bg-authority-blue/90 backdrop-blur-md rounded-3xl border border-white/10">
                    <p className="text-xl font-bold font-serif italic mb-2">"Systems-first approach to carrier success."</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold">Vince | LaunchPath Founder</p>
                 </div>
              </div>
            </div>
            <div className="space-y-10">
              <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter leading-[0.95]">
                Built by a Safety Professional Who <span className="text-signal-gold italic">Understands Systems</span>
              </h2>
              <div className="space-y-6 text-xl text-white/70 leading-relaxed font-medium">
                <p>
                  Hey y'all, I’m Vince. I’m a 53-year-old Veteran and an OSHA safety professional who recognized a pattern in the trucking industry that I’ve seen in heavy manufacturing for decades: <strong>operators fail not because of skill, but because of missing systems.</strong>
                </p>
                <p>
                  I built LaunchPath because I got tired of seeing hardworking folks lose their authority because they followed "hustle hype" instead of federal law. My principle is simple: <span className="text-white font-black underline decoration-signal-gold decoration-4 underline-offset-8">compliance methodology matters more than industry experience.</span>
                </p>
                <p>
                  I run this as a Kingdom business focused on stewardship and integrity. I walk with the Lord, and that means I ain't gonna sell you a get-rich-quick dream. I’m here to help you build something that lasts.
                </p>
              </div>
              <div className="pt-8 border-t border-white/10">
                 <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                       <ShieldCheck className="text-signal-gold" size={24} />
                       <span className="text-[11px] font-black uppercase tracking-[0.2em]">OSHA CERTIFIED</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                       <Star className="text-signal-gold" size={20} fill="currentColor" />
                       <span className="text-[11px] font-black uppercase tracking-[0.2em]">VETERAN OWNED</span>
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
              { t: "Authority Protection", i: <ShieldCheck />, d: "Keep your DOT/MC active. Pass your New Entrant Safety Audit. Maintain legal operational status." },
              { t: "Insurance Continuity", i: <Shield />, d: "Secure affordable coverage. Avoid the cancellation triggers that ground fleets instantly." },
              { t: "Compliance Backbone", i: <FileText />, d: "Build audit-ready DQ files, drug testing, and HOS systems. Keep your SMS scores low from day one." },
              { t: "Cash-Flow Oxygen", i: <Wallet />, d: "Manage 'The Money Loop.' Survive the 30-60 day payment gap while making profitable load decisions." }
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
          <div className="mt-20 text-center">
             <p className="text-2xl font-black font-serif italic text-authority-blue dark:text-signal-gold leading-none">
               "All four pillars must stay strong. Let one fall, and the others collapse with it."
             </p>
          </div>
        </div>
      </section>

      {/* 4. COURSE MODULES SECTION (7 MODULES) */}
      <section className="py-32 bg-white dark:bg-primary-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-6">
                <BookOpen size={14} className="text-signal-gold" />
                <span>Structured 7-Module Roadmap</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-8 text-authority-blue dark:text-white">Safety & Compliance Essentials</h2>
            <p className="text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium italic">
              LaunchPath doesn't teach trucking hustle — it teaches compliance that keeps your authority alive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { m: 0, t: "The Mindset Module", b: ["Business Go/No-Go Decision", "Authority Risk Assessment", "Operational Reality Check"], o: "Know if you should even start" },
              { m: 1, t: "Business & Authority Setup", b: ["DOT vs MC Strategy", "Interstate Registration", "Identity & Authority Filing"], o: "Open the RIGHT authority" },
              { m: 2, t: "Insurance Survival", b: ["Secure Affordable Coverage", "Avoid Cancellation Triggers", "Claim Strategy Basics"], o: "Protect your biggest expense" },
              { m: 3, t: "Compliance Backbone", b: ["DQ File Implementation", "Clearinghouse Enrollment", "HOS & ELD Requirements"], o: "Build audit-ready technical files" },
              { m: 4, t: "New Entrant Audit Preparation", b: ["Audit Document Checklist", "Investigation Conduct Guide", "Common Failure Strategies"], o: "Pass the audit without panic" },
              { m: 5, t: "Load Discipline & Cash Flow", b: ["The Money Loop Management", "Payment Gap Solvency", "Profitable Load Decisioning"], o: "Stay liquid while you wait to get paid" },
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
          <div className="mt-16 text-center">
             <p className="text-lg font-black uppercase tracking-[0.2em] text-text-muted mb-12">
                All modules include templates, checklists, and implementation guides. <span className="text-authority-blue underline font-black">LIFETIME ACCESS.</span>
             </p>
          </div>
        </div>
      </section>

      {/* 5. "WHAT THIS COURSE IS NOT" SECTION */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
           <div className="bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-red-200 p-12 rounded-[4rem] text-left relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 scale-150">
                 <ShieldAlert size={200} className="text-red-600" />
              </div>
              <h3 className="text-3xl font-black font-serif text-red-600 uppercase tracking-tighter mb-8 flex items-center">
                 <XCircle className="mr-3" /> WHAT THIS COURSE IS NOT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl font-black uppercase tracking-tighter opacity-80">
                 <div className="flex items-center text-text-primary dark:text-white">❌ Not dispatch training</div>
                 <div className="flex items-center text-text-primary dark:text-white">❌ Not "$10k/week" promises</div>
                 <div className="flex items-center text-text-primary dark:text-white">❌ Not load-board hustle</div>
                 <div className="flex items-center text-text-primary dark:text-white">❌ Not truck-buying advice</div>
              </div>
              <div className="mt-12 pt-10 border-t border-red-100 text-center">
                 <p className="text-3xl font-black font-serif italic text-authority-blue dark:text-white leading-none">
                   "LaunchPath teaches survival first. Revenue follows compliance."
                 </p>
              </div>
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
                    <li className="flex items-center text-red-500 font-bold"><XCircle className="mr-3 shrink-0" /> "Just start" advice</li>
                 </ul>
                 <div className="pt-6 border-t border-border-light text-red-600 font-black uppercase tracking-widest text-[10px]">Result: High failure rate</div>
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
                 <div className="pt-6 border-t border-border-light text-red-600 font-black uppercase tracking-widest text-[10px]">Result: Can't pass audit</div>
              </div>

              {/* LAUNCHPATH */}
              <div className="bg-authority-blue text-white p-10 rounded-[3.5rem] border-4 border-signal-gold shadow-2xl flex flex-col scale-105 relative z-10">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-widest whitespace-nowrap shadow-xl">THE INDUSTRY GOLD STANDARD</div>
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

      {/* 7. WHY BUILDING SYSTEMS NOW MATTERS */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter leading-none mb-6 text-authority-blue dark:text-white">Accuracy Over <span className="text-signal-gold italic">Hype</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group h-full">
                 <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <Calendar size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6 leading-tight">DAY 1 OF AUTHORITY</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   The moment your MC authority activates, the 12-month New Entrant clock starts. FMCSA can schedule your safety audit any time during this window—often with just 48-72 hours notice.
                 </p>
              </div>

              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group h-full">
                 <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <AlertCircle size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6 leading-tight">MOST CARRIERS WAIT</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   Most carriers build compliance systems AFTER they start hauling. They focus on loads first, files later. When the audit notice arrives, they scramble to create documentation they should have had from day one.
                 </p>
              </div>

              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group h-full">
                 <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <ShieldCheck size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6 leading-tight">PROACTIVE SURVIVAL</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   Carriers who build their compliance backbone BEFORE operations start pass audits at significantly higher rates. Starting now means operating with confidence, not fear of revocation.
                 </p>
              </div>
           </div>
           
           <div className="mt-16 text-center">
              <div className="inline-block p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl">
                <p className="text-xl font-bold text-red-700 dark:text-red-400 max-w-4xl">
                  The New Entrant Safety Audit determines whether you keep your authority. Industry research suggests many new carriers face audit challenges. Don't build your compliance system under audit pressure.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-6 leading-none">Your Compliance Investment</h2>
             <p className="text-lg text-text-muted font-black uppercase tracking-widest text-authority-blue">Founding Cohort Pricing — Limited to First 20 Students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* TIER 1 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col group h-full">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Self-Paced Fundamentals</h3>
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-signal-gold">397</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">3-Month Plan: $139/mo</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {["All 7 Modules", "All Templates & Checklists", "Email Support", "Lifetime Access"].map((f, j) => (
                  <li key={j} className="flex items-center text-sm font-bold text-text-muted"><CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue" /> {f}</li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-steel-blue transition-all shadow-xl">ENROLL NOW</Link>
            </div>

            {/* TIER 2 */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] flex flex-col relative scale-105 shadow-2xl z-10 border-4 border-signal-gold h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">MOST POPULAR</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Compliance Mastery</h3>
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-signal-gold">797</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mt-2">3-Month Plan: $279/mo</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow text-sm opacity-90 font-bold">
                <li>Everything in Tier 1, PLUS:</li>
                {["Monthly Live Q&A Sessions", "Personalized File Review", "State-Specific Guidance", "Authority Walkthrough", "Insurance Shopping Support", "Private Community Access"].map((f, j) => (
                  <li key={j} className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold" /> {f}</li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-signal-gold text-authority-blue py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-white transition-all shadow-2xl">ENROLL NOW</Link>
            </div>

            {/* TIER 3 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">White-Glove Elite</h3>
              <div className="mb-10">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                  <span className="text-5xl font-black tracking-tighter text-signal-gold">1,497</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">3-Month Plan: $525/mo</p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow text-sm text-text-muted font-bold">
                <li>Everything in Tier 2, PLUS:</li>
                {["1-on-1 Audit Prep Coaching", "Mock Audit Performance Review", "Custom Compliance Calendar", "Direct Phone/Text Support", "Certificate of Completion", "Ongoing Regulatory Alerts"].map((f, j) => (
                  <li key={j} className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue" /> {f}</li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center hover:bg-steel-blue transition-all shadow-xl">ENROLL NOW</Link>
            </div>
          </div>
          
          <div className="text-center">
             <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
               After Founding Cohort validation, regular pricing will be $497 / $1,297 / $1,997.
             </p>
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
                { n: "1", t: "Instant Course Access", d: "Access all 7 modules and download the complete student workbook.", c: "(0-5 Minutes)" },
                { n: "2", t: "Start Module 0", d: "Complete your Business Assessment and make the Go/No-Go decision.", c: "(First 24 Hours)" },
                { n: "3", t: "Authority Plan", d: "Determine your DOT vs MC strategy and begin DQ file setup.", c: "(First Week)" },
                { n: "4", t: "Systems Operational", d: "Compliance Backbone installed. Your files are now audit-ready.", c: "(First 30 Days)" }
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
           <h2 className="text-5xl lg:text-8xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white leading-[0.9]">Build Your <span className="text-signal-gold">Backbone.</span></h2>
           <p className="text-2xl lg:text-3xl text-text-muted dark:text-text-dark-muted mb-12 font-medium">Start tonight. Operate confidently tomorrow.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:bg-signal-gold transition-all shadow-2xl active:scale-95 group">
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
            LaunchPath is an educational platform. Information provided does not constitute legal, tax, or financial advice. <br/>
            Veteran Owned & Operated. 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;