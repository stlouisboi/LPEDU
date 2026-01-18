
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Anchor,
  Shield,
  ClipboardList,
  Wallet,
  Target,
  Files,
  Activity
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const VeteranBadgeSmall = () => (
  <svg width="120" height="48" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Veteran Owned & Operated Badge" className="drop-shadow-md">
    <rect width="160" height="64" rx="12" fill="#1E3A5F" />
    <rect x="1.5" y="1.5" width="157" height="61" rx="10.5" stroke="#D4AF37" strokeWidth="2" />
    <path d="M28 16L30.5 22.5H37.5L32 26.5L34 33L28 29L22 33L24 26.5L18.5 22.5H25.5L28 16Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">VETERAN OWNED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">& OPERATED</text>
    <text x="44" y="52" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>U.S. Veteran Owned</text>
  </svg>
);

const OSHABadgeSmall = () => (
  <svg width="120" height="48" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OSHA Trained Professional Badge" className="drop-shadow-md">
    <rect width="160" height="64" rx="12" fill="#1E3A5F" />
    <rect x="1.5" y="1.5" width="157" height="61" rx="10.5" stroke="#D4AF37" strokeWidth="2" />
    <path d="M22 18C22 16.5 28 15 28 15C28 15 34 16.5 34 18V28C34 32 28 36 28 36C28 36 22 32 22 28V18Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">OSHA TRAINED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">PROFESSIONAL</text>
    <text x="44" y="52" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>Safety Standards</text>
  </svg>
);

const ROADMAP_PREVIEW_PHASES = [
  {
    number: 1,
    title: "Phase 1: Legal Setup & Authority",
    duration: "Weeks 1-4",
    icon: <ClipboardList className="w-8 h-8" />,
    color: "#1e3a5f"
  },
  {
    number: 2,
    title: "Phase 2: Insurance & Fiscal Compliance",
    duration: "Weeks 4-6",
    icon: <Shield className="w-8 h-8" />,
    color: "#334155"
  },
  {
    number: 3,
    title: "Phase 3: The Compliance System",
    duration: "Week 6-Launch",
    icon: <Files className="w-8 h-8" />,
    color: "#0891b2"
  },
  {
    number: 4,
    title: "Phase 4: Audit Readiness & Operations",
    duration: "Months 1-12",
    icon: <Target className="w-8 h-8" />,
    color: "#d4af37"
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "risk-map-hero"
        });
      }
      setLoading(false);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } catch (error) {
      console.error("Lead capture failed:", error);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden">
      
      {/* 1. HERO — ORIENTATION & SAFETY */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white dark:bg-primary-dark overflow-hidden z-10 border-b border-border-light dark:border-border-dark">
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-[0.03]"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1586191582151-f7058778848e?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-[1]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-8">
                <Anchor size={14} className="text-signal-gold" />
                <span>Integrity First • Systems Driven</span>
              </div>
              
              <div className="mb-8">
                <h1 className="text-5xl lg:text-[4rem] xl:text-[4.5rem] font-black tracking-tighter text-authority-blue dark:text-white font-serif leading-[0.95] mb-4">
                  Protect Your Authority <span className="text-signal-gold">With Order and Certainty.</span>
                </h1>
              </div>
              
              <div className="text-xl lg:text-2xl text-text-muted dark:text-text-dark-muted mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                <p>Most new carriers don’t fail from lack of skill. They fail when early decisions quietly destabilize their authority.</p>
                <p className="mt-4 text-authority-blue dark:text-signal-gold font-bold">LaunchPath gives you a 90-day operating roadmap that takes you from authority setup to audit readiness — step by step.</p>
              </div>

              <p className="mb-8 text-xs font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold opacity-80">
                Built by a veteran safety professional with real-world compliance oversight experience.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all flex items-center shadow-2xl group border-2 border-authority-blue">
                  <span>Secure Your Authority →</span>
                </Link>
                <Link to="/learning-path" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all border-2 border-authority-blue dark:border-border-dark flex items-center shadow-sm">
                  <span>Explore the 90-Day Path →</span>
                </Link>
              </div>
            </div>
            
            {/* 2. RISK MAP LEAD MAGNET (UNDER HERO) */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] border-[4px] border-signal-gold/80 shadow-lg animate-in zoom-in duration-700">
                <h2 className="text-2xl md:text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">
                  First 90 Days <span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-sm text-text-muted mb-8 font-medium">Get the free Risk Map to identify your gaps across the Four Pillars — before they become violations.</p>
                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div className="relative">
                    <input 
                      required
                      type="email"
                      placeholder="Professional Email"
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 outline-none focus:border-signal-gold transition-all font-bold"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all shadow-lg"
                  >
                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Get Clarity Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREDIBILITY MINI (FOUNDER) */}
      <section className="py-24 bg-authority-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative h-[400px] w-full max-w-[350px] bg-white/5 rounded-[3rem] border border-white/10 p-5 shadow-xl overflow-hidden group">
                 <img 
                   src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                   alt="Vince Lawrence - LaunchPath Founder" 
                   className="w-full h-full object-cover object-top rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700" 
                 />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-signal-gold font-black uppercase tracking-[0.3em] text-[10px]">Built by experience, not theory</p>
              <h2 className="text-3xl lg:text-5xl font-black font-serif tracking-tighter leading-none uppercase">
                The <span className="font-bold tracking-tight">Kingdom</span> Business <span className="text-signal-gold">Standard</span>
              </h2>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-medium">
                LaunchPath was built by Vince Lawrence, an OSHA-Certified Safety Coordinator with 20+ years overseeing compliance systems for organizations supporting approximately 1,200 employees. Veteran-owned. Integrity-first.
              </p>
              <Link to="/about" className="inline-flex items-center text-signal-gold font-black uppercase tracking-widest text-sm hover:underline underline-offset-8 group">
                Read the full story →
              </Link>
              <div className="flex items-center space-x-10 pt-4">
                  <VeteranBadgeSmall />
                  <OSHABadgeSmall />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OBSERVED PATTERNS — REFRAMED FOR COMPLIANCE AND PREMIUM AESTHETIC */}
      <section className="bg-gradient-to-b from-[#FAFBFC] to-[#F5F7FA] dark:from-[#020617] dark:to-[#0F172A] pt-24 pb-32 border-y border-border-light dark:border-border-dark overflow-hidden relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.01] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24 stagger-parent">
            <p className="text-[11px] font-bold text-signal-gold uppercase tracking-[0.3em] mb-4 stagger-item">
              Real Operators. Observed Patterns.
            </p>
            <h2 className="text-[36px] md:text-[48px] font-black text-[#1A1A1A] dark:text-white leading-[1.2] tracking-tight font-sans text-center mb-6 stagger-item">
              What most new carriers realize <br/>
              <span className="text-[#555] dark:text-text-dark-muted font-medium">after the reality sets in</span>
            </h2>
            <p className="text-sm text-text-muted dark:text-text-dark-muted font-medium max-w-2xl mx-auto italic stagger-item">
              The insights below reflect common administrative and operational challenges observed within the industry and are shared for educational awareness rather than as specific student testimonials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Card 1 */}
            <article className="bg-white dark:bg-surface-dark rounded-[20px] p-12 shadow-[0_8px_32px_rgba(30,58,95,0.08)] hover:shadow-[0_16px_48px_rgba(30,58,95,0.15)] hover:-translate-y-2 hover:border-l-4 hover:border-signal-gold border-l-0 transition-all duration-400 relative group animate-reveal-up overflow-hidden">
              <span className="absolute -top-4 left-6 text-[72px] font-bold text-signal-gold opacity-20 pointer-events-none select-none">"</span>
              <div className="relative pt-6">
                <p className="text-[18px] leading-[1.8] text-[#333] dark:text-text-dark-primary font-normal mb-8 font-sans">
                  I watched the videos and listened to drivers with years in the game. Still wasn't prepared for the <span className="font-semibold text-authority-blue dark:text-signal-gold/90">paperwork, the insurance costs, or the audit</span>. That's where it gets real.
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-signal-gold/20 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-signal-gold"></div>
                    </div>
                    <span className="text-[16px] font-semibold text-authority-blue dark:text-white">Reported Experience</span>
                  </div>
                  <span className="text-[14px] text-[#888] font-normal tracking-wide">First-Year Owner-Operator Perspective</span>
                </div>
              </div>
            </article>

            {/* Card 2 - Desktop Stagger */}
            <article className="bg-white dark:bg-surface-dark rounded-[20px] p-12 shadow-[0_8px_32px_rgba(30,58,95,0.08)] hover:shadow-[0_16px_48px_rgba(30,58,95,0.15)] hover:-translate-y-2 hover:border-l-4 hover:border-signal-gold border-l-0 transition-all duration-400 relative group animate-reveal-up md:mt-8 overflow-hidden">
              <span className="absolute -top-4 left-6 text-[72px] font-bold text-signal-gold opacity-20 pointer-events-none select-none">"</span>
              <div className="relative pt-6">
                <p className="text-[18px] leading-[1.8] text-[#333] dark:text-text-dark-primary font-normal mb-8 font-sans">
                  I did my homework—YouTube, groups, talking to drivers. Nobody explained that <span className="font-semibold text-authority-blue dark:text-signal-gold/90">one missed insurance payment</span> could shut the whole operation down.
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-signal-gold/20 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-signal-gold"></div>
                    </div>
                    <span className="text-[16px] font-semibold text-authority-blue dark:text-white">Observed Industry Pattern</span>
                  </div>
                  <span className="text-[14px] text-[#888] font-normal tracking-wide">New Authority Holder Challenge</span>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="bg-white dark:bg-surface-dark rounded-[20px] p-12 shadow-[0_8px_32px_rgba(30,58,95,0.08)] hover:shadow-[0_16px_48px_rgba(30,58,95,0.15)] hover:-translate-y-2 hover:border-l-4 hover:border-signal-gold border-l-0 transition-all duration-400 relative group animate-reveal-up overflow-hidden">
              <span className="absolute -top-4 left-6 text-[72px] font-bold text-signal-gold opacity-20 pointer-events-none select-none">"</span>
              <div className="relative pt-6">
                <p className="text-[18px] leading-[1.8] text-[#333] dark:text-text-dark-primary font-normal mb-8 font-sans">
                  I came home, got my CDL, and thought I was ready. The <span className="font-semibold text-authority-blue dark:text-signal-gold/90">compliance side</span> almost sent me right back to where I started.
                </p>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-signal-gold/20 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-signal-gold"></div>
                    </div>
                    <span className="text-[16px] font-semibold text-authority-blue dark:text-white">Common Hurdle</span>
                  </div>
                  <span className="text-[14px] text-[#888] font-normal tracking-wide">Safety Audit Candidate Profile</span>
                </div>
              </div>
            </article>
          </div>

          {/* Bridge Section - Premium Treatment */}
          <div className="max-w-[900px] mx-auto text-center mt-32 px-12 py-16 bg-authority-blue/[0.03] dark:bg-authority-blue/10 rounded-[16px]">
            <h3 className="text-[24px] md:text-[28px] leading-[1.5] text-[#1A1A1A] dark:text-white font-semibold font-sans mb-6">
              Most carriers don't fail from lack of hustle. <br className="hidden md:block" />
              They fail from lack of structure.
            </h3>
            <p className="text-[18px] font-semibold text-authority-blue dark:text-signal-gold uppercase tracking-[0.01em]">
              The Four Pillars Foundation exists to address these structural gaps.
            </p>
          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS OPERATIONAL SYSTEM */}
      <section id="pillars" className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-authority-blue dark:text-white mb-4 tracking-tight leading-tight uppercase">
              The Four Pillars Operational System
            </h2>
            <p className="text-lg font-medium text-text-muted max-w-3xl mx-auto leading-relaxed">
              The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="w-12 h-12 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} strokeWidth={2} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Authority Protection</h3>
              <p className="text-[14px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Your DOT/MC authority is your license to operate. Once it’s suspended, revenue stops immediately. We help you keep it in good standing through audits, reviews, and ongoing oversight.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="w-12 h-12 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6">
                <Shield size={28} strokeWidth={2} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Insurance Continuity</h3>
              <p className="text-[14px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Insurance isn’t just coverage — it’s operational access. One missed payment can shut you down overnight. We show you how to structure payment systems that keep policies active and uninterrupted.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="w-12 h-12 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6">
                <ClipboardList size={28} strokeWidth={2} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Compliance Backbone</h3>
              <p className="text-[14px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Audits don’t fail businesses — missing systems do. If FMCSA asks for records and you can’t produce them, the outcome is already decided. We help you build the files and procedures auditors expect.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="w-12 h-12 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6">
                <Wallet size={28} strokeWidth={2} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Cash-Flow Oxygen</h3>
              <p className="text-[14px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Early operations are won or lost on liquidity discipline. Most carriers fail in months 2–3, not year one. We help you calculate true operating costs before major commitments are made.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/learning-path" className="inline-flex items-center text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-sm hover:underline underline-offset-8 group">
              <span>See how this system protects your authority →</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. 90-DAY OPERATING ROADMAP (PREVIEW) */}
      <section id="roadmap-preview" className="py-32 bg-slate-50 dark:bg-primary-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white uppercase">The LaunchPath 90-Day Operating Roadmap</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium">
              A federally-aligned implementation timeline — not a video library.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ROADMAP_PREVIEW_PHASES.map((phase) => (
              <div key={phase.number} className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900" style={{ color: phase.color }}>
                    {phase.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{phase.duration}</span>
                </div>
                <div className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full text-white uppercase self-start mb-4" style={{ backgroundColor: phase.color }}>
                  Phase {phase.number}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-authority-blue dark:text-white mb-4 leading-tight">{phase.title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/learning-path" className="inline-flex items-center text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-sm hover:underline underline-offset-8 group">
              <span>View the Full 90-Day Roadmap →</span>
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PRICING PREVIEW (LIGHT) */}
      <section id="pricing" className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white uppercase text-center">Enrollment Options</h2>
             <p className="text-lg text-text-muted font-black uppercase tracking-widest text-authority-blue mb-4 text-center">A calm, unpressured path forward.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* TIER 1 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full shadow-sm">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-4">Self-Paced Foundations</h3>
              <p className="text-5xl font-black tracking-tighter text-signal-gold mb-10">$397</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-text-muted">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Full Curriculum Access</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Compliance Template Library</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Lifetime Updates</li>
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-[#152945] transition-all">Select Foundations</Link>
            </div>

            {/* TIER 2 */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] flex flex-col relative scale-105 shadow-2xl z-10 border-4 border-signal-gold/20 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[11px] px-8 py-2 rounded-full uppercase tracking-widest">MOST RECOMMENDED</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Guided Implementation</h3>
              <p className="text-5xl font-black tracking-tighter text-white mb-10">$797</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold opacity-90">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Everything in Tier 1</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> 12 Weekly Group Coaching Calls</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Interactive Decision & Planning Tools</li>
              </ul>
              <Link to="/pricing" className="w-full bg-signal-gold text-authority-blue py-6 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-white transition-all shadow-2xl">Start Implementation</Link>
            </div>

            {/* TIER 3 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full shadow-sm">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-4">Elite Oversight</h3>
              <p className="text-5xl font-black tracking-tighter text-authority-blue dark:text-white mb-10">$1,497</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-text-muted">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Everything in Tier 2</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> 1-on-1 Mock New Entrant Audit</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Private Review Calls</li>
              </ul>
              <Link to="/pricing" className="w-full border-4 border-authority-blue text-authority-blue dark:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-authority-blue hover:text-white transition-all">Request Review</Link>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="/pricing" className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-authority-blue transition-colors">
              Compare all features →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
