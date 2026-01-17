
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Anchor,
  ChevronDown,
  HelpCircle,
  Clock,
  UserCheck,
  Shield,
  ClipboardList,
  Wallet,
  Target,
  Files
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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

  const faqData = [
    {
      q: "Who is this course for?",
      a: "LaunchPath is for new and aspiring owner-operators who want to build a trucking business with structure, discipline, and integrity. It’s designed for people preparing to file authority or operating in their first 12–18 months who want to avoid costly mistakes and survive the critical early phase.",
      icon: <UserCheck size={18} />
    },
    {
      q: "How is LaunchPath different?",
      a: "Most courses teach tasks. LaunchPath teaches order and survival systems. Instead of hype or shortcuts, we focus on why carriers actually fail in the first year and how to keep authority, insurance, and revenue continuously active. This is a business survival system.",
      icon: <CheckCircle2 size={18} />
    }
  ];

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

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all flex items-center shadow-2xl">
                  Begin With Clarity →
                </Link>
                <Link to="/learning-path" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all border border-border-light dark:border-border-dark flex items-center shadow-sm">
                  View the 90-Day Roadmap →
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

      {/* 4. SOCIAL PROOF — WHAT MOST NEW CARRIERS REALIZE */}
      <section className="bg-[#FAFAFA] dark:bg-[#020617] pt-[88px] pb-[96px] border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20">
          <div className="text-center max-w-[900px] mx-auto mb-[48px]">
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-[#1A1A1A] dark:text-white leading-[1.1] tracking-[-1px] mb-2 font-sans uppercase">
              What most new carriers realize
            </h2>
            <p className="text-[18px] md:text-[20px] lg:text-[24px] font-normal text-[#64748B] dark:text-[#94A3B8] leading-[1.3] font-sans">
              after the reality sets in
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I watched the videos and took advice from people in the game. Still wasn’t ready for the paperwork, the insurance, or the audit pressure. That’s when it got real."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Marcus T., First-Year Owner-Operator
              </cite>
            </article>

            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full lg:mt-[12px]">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I did my homework — YouTube, groups, talking to drivers. Nobody told me one missed insurance payment can freeze the whole operation."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Keisha M., New Authority
              </cite>
            </article>

            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I came home, got my CDL, and thought I was ready. The compliance side almost sent me right back to where I started."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Chris P., New Authority
              </cite>
            </article>
          </div>

          <div className="max-w-[720px] mx-auto text-center mt-[64px] px-6">
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-medium font-sans mb-4">
              Most carriers don't fail from lack of hustle. They fail from lack of structure.
            </p>
            <p className="text-authority-blue dark:text-signal-gold font-bold uppercase tracking-widest text-sm">
              The Four Pillars Foundation exists for the second group.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS FOUNDATION */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-authority-blue dark:text-white mb-4 tracking-tight leading-tight">
              Four ways your authority can fail —<br/>and one system designed to prevent all four.
            </h2>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              Miss any one of these, and your operation is exposed.
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
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Interactive Compliance Tools</li>
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

      {/* 8. FINAL CTA */}
      <section className="py-40 md:py-56 bg-white dark:bg-primary-dark text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <h2 className="text-4xl lg:text-[4rem] xl:text-[6rem] font-black font-serif tracking-tighter mb-8 leading-[0.95] text-authority-blue dark:text-white text-center">
              You’re 90 days away from <span className="text-signal-gold italic">either succeeding or failing.</span>
           </h2>
           <p className="text-xl lg:text-2xl text-text-muted mb-16 max-w-3xl mx-auto leading-relaxed font-medium text-center uppercase tracking-widest">
              Which side of that statistic will you be on?
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-12 py-7 rounded-[2rem] text-xl font-black uppercase tracking-widest hover:bg-[#152945] transition-all shadow-xl active:scale-95 group">
                 <span>Get Started Now →</span>
              </Link>
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-12 py-7 rounded-[2rem] text-xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all border border-border-light shadow-sm"
              >
                Download Free Assessment
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
