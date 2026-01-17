
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Loader2,
  Shield,
  Award,
  Zap,
  ChevronDown,
  Anchor,
  Target,
  FileSearch,
  Layers,
  Scale,
  Wallet,
  HelpCircle,
  FileText,
  Clock,
  Heart,
  UserCheck,
  CreditCard
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
      icon: <Award size={18} />
    },
    {
      q: "Is this course faith-based?",
      a: "Yes. LaunchPath is faith-based and principle-driven, built on stewardship, accountability, discipline, and integrity. Biblical principles are applied to real business decisions.",
      icon: <Heart size={18} />
    },
    {
      q: "Do I need a CDL?",
      a: "No. LaunchPath does not teach driving skills. It teaches how to operate and protect a trucking business under your own authority, whether you drive or manage drivers.",
      icon: <Scale size={18} />
    },
    {
      q: "How long do I have access?",
      a: "You receive 12 months of access to the full curriculum, including updates to tools and resources as best practices evolve.",
      icon: <Clock size={18} />
    },
    {
      q: "Can I upgrade tiers later?",
      a: "Yes! You can upgrade from Self-Paced to Implementation Mastery at any time by simply paying the difference. We want you to have the support you need when you're ready for it.",
      icon: <Layers size={18} />
    },
    {
      q: "What if I already filed my authority?",
      a: "Perfect. LaunchPath isn't only for startups. If you've already filed, we help you audit your setup and close gaps before the federal audit arrives.",
      icon: <CheckCircle2 size={18} />
    },
    {
      q: "Is there a 7-day guarantee?",
      a: "LaunchPath does not offer a free trial, but we do offer a 7-day decision window. If within 7 days you determine the course is not aligned with where you are, you may request a refund. After that, sales are final due to immediate tool access.",
      icon: <CreditCard size={18} />
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden">
      
      {/* 1. HERO — ORIENTATION & SAFETY */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white dark:bg-primary-dark overflow-hidden z-10 border-b border-border-light dark:border-border-dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-authority-blue mb-8">
                <Anchor size={14} className="text-signal-gold" />
                <span>Integrity First • Systems Driven</span>
              </div>
              
              <h1 className="text-5xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter text-authority-blue dark:text-white mb-8 font-serif leading-[0.95]">
                Protect Your Foundation With <span className="text-signal-gold">Order and Certainty.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-muted dark:text-text-dark-muted mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                The road ahead requires more than just a truck; it requires a disciplined system. <span className="text-authority-blue dark:text-white font-black">Most carriers don't fail from lack of skill, but from lack of system.</span> You're about to get the system.
              </p>

              <p className="text-sm text-authority-blue dark:text-signal-gold/80 mb-12 font-bold italic border-l-4 border-signal-gold pl-6">
                Success is the fruit of faithful stewardship and operational wisdom.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/learning-path" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all flex items-center shadow-2xl active:scale-95">
                  Begin With Clarity <ArrowRight className="ml-3" size={16} />
                </Link>
                <Link to="/about" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all border border-border-light dark:border-border-dark flex items-center shadow-sm">
                  View the Path
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] border-[8px] border-signal-gold shadow-2xl animate-in zoom-in duration-700">
                <h2 className="text-2xl md:text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">
                  First 90 Days <span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-sm text-text-muted mb-8 font-medium">Get the free orientation tool to identify your technical gaps before they become violations.</p>
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
                    className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#152945] transition-all active:scale-95 shadow-lg"
                  >
                    {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Get Clarity Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SYSTEM (WHAT LAUNCHPATH IS) */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white uppercase text-center">The System Behind <span className="text-signal-gold italic">The Success</span></h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium text-center">
              We replace operational chaos with a disciplined, 3-step framework for carrier stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", t: "Analyze & Assess", d: "We identify the specific regulatory profile of your operation to map your exact requirements.", i: <FileSearch className="w-8 h-8" /> },
              { step: "02", t: "Install the Backbone", d: "We provide the master templates and instruction to build your compliance files in real-time.", i: <Layers className="w-8 h-8" /> },
              { step: "03", t: "Verify Compliance", d: "We verify your systems are federal-grade before you face your first official audit.", i: <ShieldCheck className="w-8 h-8" /> }
            ].map((s, i) => (
              <div key={i} className="relative bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-border-light group hover:shadow-2xl transition-all flex flex-col h-full">
                <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-xl">
                  {s.i}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-authority-blue dark:text-white mb-6">{s.t}</h3>
                <p className="text-base text-text-muted font-medium leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY LAUNCHPATH EXISTS (CREDIBILITY & STORY) */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <div className="relative h-[500px] w-full max-w-[400px] bg-white/5 rounded-[3rem] border border-white/10 p-5 shadow-2xl overflow-hidden group">
                 <img 
                   src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                   alt="Vince Lawrence - LaunchPath Founder" 
                   className="w-full h-full object-cover object-top rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700" 
                 />
                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-xl">
                    <p className="text-[10px] font-black text-authority-blue uppercase tracking-widest">[Vince Lawrence | Founder]</p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter leading-none uppercase">
                  The Kingdom Business <span className="text-signal-gold">Standard</span>
                </h2>
                <p className="text-xl text-white/70 font-medium italic">Accuracy over hype. Systems over shortcuts.</p>
              </div>
              
              <div className="space-y-6 text-lg text-white/80 leading-relaxed font-medium">
                <p>
                  LaunchPath™ was built by Vince Lawrence, an OSHA-Certified Safety Coordinator with over 20 years of experience overseeing compliance systems for organizations supporting approximately 1,200 employees.
                </p>
                <div className="p-8 bg-white/5 rounded-[2rem] border-l-4 border-signal-gold italic">
                  "Most new owner-operators don’t fail because they lack driving skill. They fail because early business decisions quietly destabilize their authority. I built this to provide the system I wish I had."
                </div>
                <p>
                  Operated with biblical integrity, LaunchPath is a compliance-first program designed with deep experience preparing organizations for federal audits.
                </p>
                <div className="flex items-center space-x-6 pt-4">
                    <VeteranBadgeSmall />
                    <OSHABadgeSmall />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. PREMIUM RECOGNITION & FOUR PILLARS BRIDGE — STAGED RIGHT ABOVE ENROLLMENT */}
      <section className="bg-[#FAFAFA] dark:bg-[#020617] pt-[88px] pb-[96px] border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20">
          
          {/* Header Section */}
          <div className="text-center max-w-[900px] mx-auto mb-[48px]">
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-bold text-[#1A1A1A] dark:text-white leading-[1.1] tracking-[-1px] mb-2 font-sans text-center">
              What most new carriers realize
            </h2>
            <p className="text-[18px] md:text-[20px] lg:text-[24px] font-normal text-[#64748B] dark:text-[#94A3B8] leading-[1.3] font-sans text-center">
              after the reality sets in
            </p>
          </div>

          {/* Quotes Grid with Desktop Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I watched the videos and listened to drivers with years in the game. Still 
                wasn't prepared for the paperwork, the insurance costs, or the audit. That's 
                where it gets real."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Marcus T., First-Year Owner-Operator
              </cite>
            </article>

            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full lg:mt-[12px]">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I did my homework — YouTube, groups, talking to drivers. Nobody explained 
                that one missed insurance payment could shut the whole operation down."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Keisha M., Independent Carrier
              </cite>
            </article>

            <article className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-full">
              <blockquote className="text-[15px] lg:text-[16px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-normal mb-3 font-sans">
                "I came home, got my CDL, and thought I was ready. The compliance side almost 
                sent me right back to where I started."
              </blockquote>
              <cite className="not-italic text-[13px] text-[#666] dark:text-[#94A3B8] tracking-[0.01em] font-sans">
                — Chris P., New Authority
              </cite>
            </article>
          </div>

          {/* Bridge Text */}
          <div className="max-w-[720px] mx-auto text-center mt-[64px] mb-[72px] px-6">
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-medium font-sans mb-4">
              Most carriers don't fail from lack of hustle. They fail from lack of structure.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#333] dark:text-[#E2E8F0] font-medium font-sans text-center">
              The Four Pillars Foundation exists for the second group.
            </p>
          </div>

          {/* Section Label (Whisper style) */}
          <p className="text-[12px] tracking-[0.125em] text-[#999] dark:text-[#64748B] font-medium uppercase text-center mb-8 font-sans opacity-90">
            Four Pillars Foundation
          </p>

          {/* Pillars Cards Grid with Updated Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="text-[32px] mb-4">🏛️</div>
              <h3 className="text-[18px] md:text-[17px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Authority Protection</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans text-left">
                Your DOT/MC authority is your legal right to operate. This pillar shows you how to maintain good standing and protect it through audits, reviews, and ongoing oversight.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
              <div className="text-[32px] mb-4">🛡️</div>
              <h3 className="text-[18px] md:text-[17px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans text-left">Insurance Continuity</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans text-left">
                Insurance isn’t just coverage — it’s operational access. We teach you how to structure payment systems and safeguards that keep your policy active and uninterrupted.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all text-left">
              <div className="text-[32px] mb-4">📋</div>
              <h3 className="text-[18px] md:text-[17px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Compliance Backbone</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Audits don’t fail businesses — missing systems do. This pillar establishes the files, logs, and procedures required to withstand FMCSA review with confidence.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0F172A] border border-[#EAEAEA] dark:border-[#1E293B] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all text-left">
              <div className="text-[32px] mb-4">💰</div>
              <h3 className="text-[18px] md:text-[17px] font-semibold text-[#1A1A1A] dark:text-white mb-3 leading-[1.3] font-sans">Cash-Flow Oxygen</h3>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#555] dark:text-[#94A3B8] font-normal font-sans">
                Early operations are won or lost on liquidity discipline. We help you calculate true operating costs and preserve working capital before major commitments are made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ENROLLMENT OPTIONS */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-6 text-authority-blue dark:text-white uppercase text-center">Enrollment Options</h2>
             <p className="text-lg text-text-muted font-black uppercase tracking-widest text-authority-blue mb-2 text-center">A calm, unpressured path forward.</p>
             <p className="text-sm text-text-muted font-medium italic max-w-2xl mx-auto leading-relaxed text-center px-4">
               Each option is built on the same Four Pillars Foundation. <br className="hidden sm:block" />
               The difference is the level of guidance and oversight.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* TIER 1 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full shadow-sm">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-8">Self-Paced <br/>Foundations</h3>
              <p className="text-5xl font-black tracking-tighter text-signal-gold mb-10">$397</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-text-muted">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Full Curriculum Access</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Compliance Library</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Lifetime Updates</li>
              </ul>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-[#152945] transition-all shadow-xl active:scale-95">Select Foundations</Link>
            </div>

            {/* TIER 2 */}
            <div className="bg-authority-blue text-white p-12 rounded-[3.5rem] flex flex-col relative scale-105 shadow-2xl z-10 border-4 border-signal-gold/20 h-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-widest">MOST RECOMMENDED</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Guided <br/>Implementation</h3>
              <p className="text-5xl font-black tracking-tighter text-white mb-10">$797</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold opacity-90">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Everything in Foundations</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Weekly Group Coaching</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> Q&A Support</li>
              </ul>
              <Link to="/pricing" className="w-full bg-signal-gold text-authority-blue py-6 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-white transition-all shadow-2xl active:scale-95">Start Implementation</Link>
            </div>

            {/* TIER 3 */}
            <div className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border border-border-light flex flex-col h-full shadow-sm">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-8">Elite <br/>Oversight</h3>
              <p className="text-5xl font-black tracking-tighter text-authority-blue dark:text-white mb-10">$1,497</p>
              <ul className="space-y-4 mb-12 flex-grow text-sm font-bold text-text-muted">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Full Implementation Access</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> 1-on-1 Mock Audit</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> Private Review Calls</li>
              </ul>
              <Link to="/pricing" className="w-full border-4 border-authority-blue text-authority-blue dark:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center hover:bg-authority-blue hover:text-white transition-all active:scale-95">Inquire for Oversight</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL INVITATION (PERMISSION, NOT PRESSURE) */}
      <section className="py-40 bg-white dark:bg-primary-dark text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <div className="w-24 h-24 bg-authority-blue/5 border border-authority-blue/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 transition-all duration-300">
              <ShieldCheck size={48} className="text-authority-blue" />
           </div>
           <h2 className="text-5xl lg:text-8xl font-black font-serif tracking-tighter mb-8 leading-[0.95] text-authority-blue dark:text-white text-center">
              <span className="font-normal block mb-2 opacity-80 lowercase tracking-tight normal-case text-[40px] lg:text-[56px]">Stop Guessing.</span>
              <span className="text-signal-gold italic block">Start Operating.</span>
           </h2>
           <p className="text-xl lg:text-2xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed font-medium text-center">
              You've been entrusted with this business. Build it with wisdom, order, and integrity. The path is clear.
           </p>
           
           <div className="flex flex-col items-center justify-center mb-16 pt-20">
              <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-12 sm:px-16 py-7 sm:py-8 rounded-[2rem] sm:rounded-[2.5rem] text-xl sm:text-2xl font-black uppercase tracking-widest hover:bg-[#152945] transition-all shadow-xl active:scale-95 group">
                 <span>ENTER THE PATH</span>
                 <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mt-6 opacity-70 text-center whitespace-nowrap px-4">
                You’ll choose your implementation level next.
              </p>
           </div>

           <p className="text-sm text-authority-blue dark:text-signal-gold font-bold tracking-[0.15em] text-center px-4">
             Building with stewardship and wisdom yields a lasting legacy.
           </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark border-t border-border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <div className="inline-flex items-center space-x-2 text-authority-blue dark:text-signal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-6">
                <HelpCircle size={16} />
                <span>Common Questions</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter mb-4 text-authority-blue dark:text-white uppercase">The Compliance <span className="text-signal-gold italic">Answers</span></h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl transition-colors ${activeFaq === idx ? 'bg-authority-blue text-signal-gold' : 'bg-slate-50 text-text-muted'}`}>
                      {faq.icon}
                    </div>
                    <span className={`text-lg font-black uppercase tracking-tight ${activeFaq === idx ? 'text-authority-blue dark:text-signal-gold' : 'text-text-primary dark:text-white'}`}>{faq.q}</span>
                  </div>
                  <div className={`p-2 rounded-full transition-all ${activeFaq === idx ? 'bg-authority-blue text-white rotate-180' : 'bg-white text-slate-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === idx ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <p className="px-8 pb-8 text-text-muted text-base leading-relaxed font-medium whitespace-pre-wrap">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER DISCLAIMER */}
      <footer className="bg-white dark:bg-primary-dark py-16 border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-loose max-w-3xl mx-auto">
            © {new Date().getFullYear()} LaunchPath Transportation EDU. <br/>
            LaunchPath is an educational platform. Information provided does not constitute legal, tax, financial, insurance, or regulatory advice. <br/>
            Veteran Owned & Operated. Dedicated to Operational Integrity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
