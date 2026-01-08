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
  Info,
  ShieldAlert,
  BarChart3,
  FileWarning,
  TrendingUp,
  Fingerprint,
  Sparkles,
  MousePointer2,
  XCircle,
  Play,
  Calendar,
  AlertCircle,
  Clock,
  ChevronRight,
  User
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';

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
      
      // Briefly show success state then redirect
      setLoading(false);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName)}`);
    } catch (error) {
      console.error("Lead capture failed:", error);
      // Still redirect even if firestore fails to ensure user gets their PDF
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName)}`);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden">
      {/* Visual Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e3a5f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-40 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-8">
                <ShieldCheck size={14} className="text-signal-gold" />
                <span>Verified FMCSA Methodology</span>
              </div>
              
              <h1 className="text-5xl lg:text-[5.5rem] font-black tracking-tighter text-authority-blue dark:text-white mb-8 font-serif leading-[0.9]">
                Build Your Trucking Business the <span className="text-signal-gold">Right Way</span> — From Day One.
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Identify your compliance gaps before they become violations. We provide the technical education required to survive the critical 18-month new entrant phase.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all flex items-center shadow-2xl active:scale-95">
                  Start Learning <ArrowRight className="ml-3" size={16} />
                </Link>
                <Link to="/learning-path" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark flex items-center shadow-sm active:scale-95">
                  View Roadmap
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-12 pt-4">
                <div className="flex items-center space-x-3">
                  <Award size={32} className="text-slate-400" />
                  <span className="text-xl font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Veteran Owned</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldAlert size={32} className="text-slate-400" />
                  <span className="text-xl font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Compliance First</span>
                </div>
              </div>
            </div>
            
            {/* HERO LEAD CAPTURE FORM */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-signal-gold via-yellow-400 to-signal-gold rounded-[4.5rem] blur-3xl opacity-20"></div>
              <div className="relative bg-white dark:bg-surface-dark p-8 md:p-14 rounded-[3.5rem] border-[10px] border-signal-gold shadow-[0_50px_100px_-20px_rgba(212,175,55,0.4)] overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-authority-blue text-white inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      <Zap size={12} className="text-signal-gold" />
                      <span>Immediate Cloud Access</span>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-4 leading-[0.85]">
                    GET FREE DOWNLOAD: <br/>
                    <span className="text-signal-gold underline decoration-authority-blue/10 decoration-8 underline-offset-8">FIRST 90 DAYS RISK MAP™</span>
                  </h2>
                  
                  <div className="flex items-start space-x-4 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-gray-800 shadow-inner">
                    <div className="p-3.5 bg-red-100 text-red-600 rounded-2xl shrink-0 shadow-sm">
                      <FileWarning size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-text-primary dark:text-white leading-tight mb-1.5 uppercase tracking-tight">Stop Authority Revocation</p>
                      <p className="text-xs text-text-muted font-bold leading-relaxed">This diagnostic map reveals the <span className="text-red-600">exact technical gaps</span> FMCSA auditors look for in New Entrant carriers.</p>
                    </div>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4 flex items-center">
                          <User size={12} className="mr-2" /> First Name
                        </label>
                        <input 
                          required
                          type="text"
                          placeholder="First Name"
                          className={`w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border-4 outline-none transition-all font-bold text-lg ${errors.firstName ? 'border-red-500' : 'border-slate-100 dark:border-border-dark focus:border-signal-gold'}`}
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        {errors.firstName && <p className="text-[9px] text-red-500 font-bold ml-4">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-4 flex items-center">
                          <Mail size={12} className="mr-2" /> Email Address
                        </label>
                        <input 
                          required
                          type="email"
                          placeholder="your.email@address.com"
                          className={`w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border-4 outline-none transition-all font-bold text-lg ${errors.email ? 'border-red-500' : 'border-slate-100 dark:border-border-dark focus:border-signal-gold'}`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-[9px] text-red-500 font-bold ml-4">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full bg-signal-gold text-authority-blue py-8 rounded-[2.2rem] font-black uppercase tracking-[0.2em] text-xl hover:bg-authority-blue hover:text-white transition-all active:scale-[0.98] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(212,175,55,0.75)] disabled:opacity-50 group/btn relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                      {loading ? <Loader2 className="animate-spin" size={32} /> : (
                        <>
                          <span>GET FREE DOWNLOAD</span>
                          <ArrowRight size={24} className="ml-4 group-hover/btn:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: WHO BUILT LAUNCHPATH */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-signal-gold/20 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-slate-800 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Vince - Founder" className="w-full h-full object-cover grayscale contrast-125" />
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
                  LaunchPath was founded by Vince, an OSHA safety professional who recognized the same pattern in trucking that exists across industries: operators failing not because of skill, but because of missing systems.
                </p>
                <p>
                  After studying FMCSA regulations and analyzing why new carriers fail audits, LaunchPath was built on one principle: <span className="text-white font-black underline decoration-signal-gold decoration-4 underline-offset-8">compliance methodology matters more than industry experience</span>.
                </p>
                <p>
                  This course teaches you how to choose the right authority, build FMCSA-compliant systems, and pass the New Entrant Safety Audit — so your business survives long enough to succeed.
                </p>
              </div>
              <p className="text-2xl font-black font-serif italic text-signal-gold pt-4">
                "Not hustle. Not hype. Just verified compliance methodology."
              </p>
              <div className="pt-8 border-t border-white/10">
                 <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                       <ShieldCheck className="text-signal-gold" size={24} />
                       <span className="text-[11px] font-black uppercase tracking-[0.2em]">SDVOSB CERTIFIED</span>
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

      {/* CURRICULUM SECTION (NOSCE) - UPDATED TO 6 MODULES */}
      <section className="py-32 bg-white dark:bg-primary-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-6">
                <BookOpen size={14} className="text-signal-gold" />
                <span>The NOSCE Framework</span>
            </div>
            <h2 className="text-4xl lg:text-[5rem] font-black font-serif tracking-tighter mb-8 leading-none text-authority-blue dark:text-white">New Owner-Operator Safety & Compliance Essentials</h2>
            <p className="text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium italic">
              LaunchPath doesn't teach trucking hustle — it teaches compliance that keeps your authority alive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* MODULE 0 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><BookOpen size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 0</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Foundation & Business Decision</h3>
              <ul className="space-y-3 mb-10 flex-grow text-sm font-medium text-text-muted">
                <li>→ Is this business right for you?</li>
                <li>→ For-hire vs private carrier decision</li>
                <li>→ Authority risk & reality assessment</li>
                <li>→ Go/No-Go decision framework</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Know if you should even start</p>
              </div>
            </div>

            {/* MODULE 1 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><ShieldCheck size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 1</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Authority Types & Regulatory Identity</h3>
              <ul className="space-y-3 mb-10 flex-grow text-sm font-medium text-text-muted">
                <li>→ DOT vs MC authority</li>
                <li>→ Interstate vs intrastate operations</li>
                <li>→ Carrier vs broker distinction</li>
                <li>→ Why box trucks aren't exempt</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Open the RIGHT authority</p>
              </div>
            </div>

            {/* MODULE 2 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><FileText size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 2</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">FMCSA Compliance Systems</h3>
              <ul className="space-y-2 mb-10 flex-grow text-xs font-medium text-text-muted">
                <li>→ Driver Qualification Files (DQ)</li>
                <li>→ Drug & Alcohol Clearinghouse enrollment</li>
                <li>→ Random testing consortium</li>
                <li>→ Hours of Service & ELD requirements</li>
                <li>→ Vehicle maintenance documentation</li>
                <li>→ Required policies & procedures</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Build audit-ready files</p>
              </div>
            </div>

            {/* MODULE 3 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><ShieldAlert size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 3</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Insurance, Risk & Exposure</h3>
              <ul className="space-y-3 mb-10 flex-grow text-sm font-medium text-text-muted">
                <li>→ Auto, cargo, and liability insurance</li>
                <li>→ Why new authority insurance is expensive</li>
                <li>→ How insurance ties to FMCSA monitoring</li>
                <li>→ Accident and claim consequences</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Understand insurance protection</p>
              </div>
            </div>

            {/* MODULE 4 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><AlertCircle size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 4</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">New Entrant Safety Audit Prep</h3>
              <ul className="space-y-2 mb-10 flex-grow text-sm font-medium text-text-muted">
                <li>→ What the audit is and when it happens</li>
                <li>→ How audits are conducted (email/Zoom)</li>
                <li>→ What documents are requested</li>
                <li>→ Common failure points</li>
                <li>→ Response strategies</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Pass the audit without panic</p>
              </div>
            </div>

            {/* MODULE 5 */}
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-authority-blue text-white rounded-2xl group-hover:scale-110 transition-transform"><TrendingUp size={28} /></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Module 5</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Operating Clean After Approval</h3>
              <ul className="space-y-3 mb-10 flex-grow text-sm font-medium text-text-muted">
                <li>→ Ongoing compliance habits</li>
                <li>→ Annual filings (UCR, MCS-150)</li>
                <li>→ CSA score monitoring</li>
                <li>→ Red flags that trigger investigations</li>
              </ul>
              <div className="pt-6 border-t border-border-light">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">OUTCOME: Keep authority active long-term</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
             <p className="text-lg font-black uppercase tracking-[0.2em] text-text-muted mb-12">
                All modules include templates, checklists, and implementation guides. <span className="text-authority-blue underline">Lifetime access.</span>
             </p>
             
             {/* WHAT THIS COURSE IS NOT */}
             <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-red-200 dark:border-red-900/50 p-12 rounded-[4rem] text-left relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 scale-150">
                   <ShieldAlert size={200} className="text-red-600" />
                </div>
                <h3 className="text-3xl font-black font-serif text-red-600 uppercase tracking-tighter mb-8 flex items-center">
                   <XCircle className="mr-3" /> WHAT THIS COURSE IS NOT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl font-black uppercase tracking-tighter opacity-80">
                   <div className="flex items-center text-text-primary dark:text-white">❌ Not dispatch training</div>
                   <div className="flex items-center text-text-primary dark:text-white">❌ Not load-board hustle</div>
                   <div className="flex items-center text-text-primary dark:text-white">❌ Not "$10k/week" promises</div>
                   <div className="flex items-center text-text-primary dark:text-white">❌ Not truck-buying advice</div>
                </div>
                <div className="mt-12 pt-10 border-t border-red-100 dark:border-red-900/20 text-center">
                   <p className="text-3xl font-black font-serif italic text-authority-blue dark:text-white leading-none">
                     "LaunchPath teaches survival first. Revenue follows compliance."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION: COMPARISON TABLE */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-border-light dark:border-border-dark overflow-hidden">
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
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> Implementation guides</li>
                    <li className="flex items-center text-white font-bold"><CheckCircle2 className="mr-3 shrink-0 text-signal-gold" /> Survival-focused</li>
                 </ul>
                 <div className="pt-6 border-t border-white/10 text-signal-gold font-black uppercase tracking-widest text-[10px]">Result: Built for federal scrutiny</div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION: AUDIT TIMELINE */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter leading-none mb-6 text-authority-blue dark:text-white">Why Building Systems <br/><span className="text-signal-gold italic">NOW Matters</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group">
                 <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <Calendar size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6">DAY 1 OF AUTHORITY</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   The moment your MC authority activates, the 12-month new entrant clock starts. FMCSA can schedule your safety audit any time during this window—often with just 48-72 hours notice.
                 </p>
              </div>

              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group">
                 <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <AlertCircle size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6">MOST CARRIERS WAIT</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   Average carriers build compliance systems AFTER they start hauling. They focus on loads first, files later. Then the audit notice arrives and they scramble to create documentation they should have had from day one.
                 </p>
              </div>

              <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light relative group">
                 <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                    <ShieldCheck size={32} />
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight mb-6">PROACTIVE SURVIVAL</h4>
                 <p className="text-text-muted font-medium leading-relaxed">
                   Carriers who build their compliance backbone BEFORE operations start pass audits at significantly higher rates. File building takes weeks to do correctly. Starting now means operating with confidence, not fear.
                 </p>
              </div>
           </div>
           
           <div className="mt-16 text-center">
              <div className="inline-block p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl">
                <p className="text-xl font-bold text-red-700 dark:text-red-400">
                  The New Entrant Safety Audit determines whether you keep your authority. One in five new carriers fail. Don't build your compliance system under audit pressure.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* INVESTMENT/PRICING SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-6 leading-none">Your Compliance <br/>Investment</h2>
             <p className="text-lg text-text-muted font-medium">Professional insurance against authority revocation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
            {/* TIER 1: SELF-PACED */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark flex flex-col transition-all duration-500 hover:shadow-2xl group">
              <div className="flex flex-col mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Self-Paced Fundamentals</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-text-muted line-through opacity-50">$597</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                    <span className="text-5xl font-black tracking-tighter text-signal-gold">397</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Complete 6-module compliance framework",
                  "DQ file templates (driver qualification)",
                  "DVIR forms and maintenance logs",
                  "HOS policy templates",
                  "Drug & Alcohol testing checklist",
                  "New Entrant Audit preparation guide",
                  "Lifetime access to all materials",
                  "Email support"
                ].map((f, j) => (
                  <li key={j} className="flex items-start text-sm font-medium leading-tight">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center transition-all hover:bg-steel-blue active:scale-95 shadow-xl">
                ENROLL NOW
              </Link>
            </div>

            {/* TIER 2: MASTERY BUNDLE (MOST POPULAR) */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] flex flex-col transition-all duration-500 hover:shadow-2xl relative scale-105 shadow-2xl z-10 border-4 border-signal-gold">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap shadow-xl whitespace-nowrap shadow-xl">
                MOST POPULAR
              </div>
              
              <div className="flex flex-col mb-10 pt-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Compliance Mastery</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-white/40 line-through">$1,497</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                    <span className="text-5xl font-black tracking-tighter text-signal-gold">797</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Everything in Self-Paced, PLUS:",
                  "Live Q&A sessions (monthly)",
                  "Personalized file review (one-time)",
                  "State-specific registration guidance",
                  "Authority application walkthrough",
                  "Insurance shopping guidance",
                  "Roadmap implementation support",
                  "Priority email support",
                  "Access to private community"
                ].map((f, j) => (
                  <li key={j} className="flex items-start text-sm font-medium leading-tight">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold flex-shrink-0 mt-0.5" />
                    <span className={j === 0 ? "font-black uppercase tracking-widest text-[10px] text-signal-gold" : "opacity-90"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-signal-gold text-authority-blue py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center transition-all hover:bg-white hover:text-authority-blue active:scale-95 shadow-2xl">
                ENROLL NOW
              </Link>
            </div>

            {/* TIER 3: CONCIERGE ELITE */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark flex flex-col transition-all duration-500 hover:shadow-2xl">
              <div className="flex flex-col mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">White-Glove Elite</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-text-muted line-through opacity-50">$2,197</span>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                    <span className="text-5xl font-black tracking-tighter text-signal-gold">1,497</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Everything in Compliance Mastery, PLUS:",
                  "1-on-1 audit preparation coaching (2 sessions)",
                  "Mock audit performance review",
                  "Custom compliance calendar",
                  "Direct phone/text support line",
                  "SMS compliance reminders",
                  "Certificate of completion",
                  "Ongoing regulatory update alerts",
                  "Lifetime priority access"
                ].map((f, j) => (
                  <li key={j} className="flex items-start text-sm font-medium leading-tight">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue flex-shrink-0 mt-0.5" />
                    <span className={j === 0 ? "font-black uppercase tracking-widest text-[10px] text-authority-blue" : "text-text-muted"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-center transition-all hover:bg-steel-blue active:scale-95 shadow-xl">
                ENROLL NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: IMMEDIATE ACCESS TIMELINE */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter leading-none mb-6">What You Get <br/><span className="text-signal-gold italic">Immediately</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-[4.5rem] left-20 right-20 h-1 bg-white/10 z-0"></div>
              
              <div className="relative z-10 space-y-6">
                 <div className="w-20 h-20 bg-signal-gold text-authority-blue rounded-full flex items-center justify-center font-black text-2xl border-[6px] border-authority-blue mx-auto md:mx-0">1</div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Instant Course Access</h4>
                 <ul className="text-sm font-medium text-white/60 space-y-2">
                    <li>→ Credentials delivered instantly</li>
                    <li>→ Access all 6 modules</li>
                    <li>→ Download student workbook</li>
                 </ul>
                 <p className="text-[10px] font-black text-signal-gold uppercase tracking-widest">(0-5 Minutes)</p>
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="w-20 h-20 bg-white text-authority-blue rounded-full flex items-center justify-center font-black text-2xl border-[6px] border-authority-blue mx-auto md:mx-0">2</div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Start Module 0</h4>
                 <ul className="text-sm font-medium text-white/60 space-y-2">
                    <li>→ Complete Business Assessment</li>
                    <li>→ Determine operating model</li>
                    <li>→ Authority decision checklist</li>
                 </ul>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">(First 24 Hours)</p>
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="w-20 h-20 bg-white text-authority-blue rounded-full flex items-center justify-center font-black text-2xl border-[6px] border-authority-blue mx-auto md:mx-0">3</div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Authority Plan</h4>
                 <ul className="text-sm font-medium text-white/60 space-y-2">
                    <li>→ Module 1 Complete</li>
                    <li>→ DOT vs MC Strategy</li>
                    <li>→ Begin DQ file setup</li>
                 </ul>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">(First Week)</p>
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="w-20 h-20 bg-white text-authority-blue rounded-full flex items-center justify-center font-black text-2xl border-[6px] border-authority-blue mx-auto md:mx-0">4</div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Systems Operational</h4>
                 <ul className="text-sm font-medium text-white/60 space-y-2">
                    <li>→ Complete Framework</li>
                    <li>→ Files audit-ready</li>
                    <li>→ Confident foundation</li>
                 </ul>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">(First 30 Days)</p>
              </div>
           </div>
           
           <div className="mt-20 pt-10 border-t border-white/10 text-center">
              <p className="text-2xl font-black font-serif italic text-white leading-none">
                "Start tonight. Operate confidently tomorrow."
              </p>
           </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-40 bg-white dark:bg-primary-dark text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <h2 className="text-5xl lg:text-8xl font-black font-serif tracking-tighter mb-12 text-authority-blue dark:text-white">Launch Securely. <br/>From <span className="text-signal-gold italic">Day One.</span></h2>
           <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:bg-signal-gold transition-all shadow-2xl group active:scale-95">
              <span>GET STARTED</span>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default HomePage;