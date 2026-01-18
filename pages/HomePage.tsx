import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  Shield,
  ClipboardList,
  Wallet,
  Files,
  AlertTriangle,
  MoveDown,
  MoveUp,
  MoveRight,
  MoveLeft,
  Building2,
  Check,
  X,
  Zap,
  Calculator,
  Award,
  Users,
  Quote,
  Clock,
  Layout,
  Target,
  // Added missing Anchor icon import
  Anchor
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const VeteranBadgeSmall = () => (
  <svg width="120" height="44" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Veteran Owned & Operated Badge" className="opacity-80">
    <rect width="160" height="64" rx="8" fill="rgba(255,255,255,0.05)" />
    <rect x="1" y="1" width="158" height="62" rx="7" stroke="white" strokeOpacity="0.1" />
    <path d="M28 16L30.5 22.5H37.5L32 26.5L34 33L28 29L22 33L24 26.5L18.5 22.5H25.5L28 16Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.05em">VETERAN OWNED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.05em">& OPERATED</text>
  </svg>
);

const OSHABadgeSmall = () => (
  <svg width="120" height="44" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OSHA Trained Professional Badge" className="opacity-80">
    <rect width="160" height="64" rx="8" fill="rgba(255,255,255,0.05)" />
    <rect x="1" y="1" width="158" height="62" rx="7" stroke="white" strokeOpacity="0.1" />
    <path d="M22 18C22 16.5 28 15 28 15C28 15 34 16.5 34 18V28C34 32 28 36 28 36C28 36 22 32 22 28V18Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.05em">OSHA TRAINED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.05em">PROFESSIONAL</text>
  </svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "risk-assessment-hero"
        });
      }
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } catch (error) {
      console.error("Lead capture failed:", error);
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION - LIGHT BACKGROUND */}
      <section className="relative min-h-[85vh] flex items-center w-full bg-[#F8FAFC] overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide text-authority-blue mb-8 shadow-sm">
                <span>⚖️ INTEGRITY FIRST • SYSTEMS DRIVEN</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-authority-blue leading-[1.15] mb-6">
                Protect Your Authority <br/><span className="text-signal-gold">With Order and Certainty.</span>
              </h1>
              
              <div className="text-xl lg:text-[20px] text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                <p>Most new carriers don't fail from lack of skill. They fail when early business decisions quietly destabilize their authority.</p>
              </div>

              <p className="text-lg lg:text-[18px] text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                LaunchPath provides a 90-day operating pathway designed to prepare new carriers for audit readiness and operational continuity.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-lg font-semibold text-base hover:bg-steel-blue transition-all flex items-center shadow-2xl active:scale-95 uppercase tracking-wide">
                  Get Started →
                </Link>
                <button 
                  onClick={() => document.getElementById('risk-assessment')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-authority-blue text-authority-blue px-10 py-5 rounded-lg font-semibold text-base hover:bg-authority-blue/5 transition-all flex items-center active:scale-95 uppercase tracking-wide"
                >
                  Download Free Assessment
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white p-10 md:p-12 rounded-[24px] border-[1px] border-slate-200 shadow-[0_32px_64px_-16px_rgba(30,58,95,0.15)] animate-in zoom-in duration-700">
                <div className="absolute -top-4 -right-4 bg-authority-blue text-white p-3 rounded-2xl shadow-xl">
                  <Files size={24} className="text-signal-gold" />
                </div>
                <h2 className="text-2xl md:text-[28px] font-bold text-authority-blue uppercase tracking-tight mb-4 leading-none">
                  First 90 Days <br/><span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-sm text-text-muted mb-8 font-medium italic">Identify compliance gaps across the Four Pillars before they trigger an inspection or audit.</p>
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 ml-2">Carrier Contact Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-authority-blue/5 transition-all font-bold text-text-primary"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2 ml-2">Professional Email</label>
                    <input 
                      type="email"
                      required
                      placeholder="jane@carrier.com"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-authority-blue/5 transition-all font-bold text-text-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <CheckCircle2 className="mr-2" size={18} />}
                    Generate My Risk Map
                  </button>
                  <p className="text-[9px] text-center text-text-muted uppercase tracking-[0.2em] font-bold mt-4">
                    Strict Privacy Protocol • Educational Resources Only
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY SECTION */}
      <section className="py-24 bg-authority-blue text-white relative border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            
            <div className="w-full max-w-[420px] lg:max-w-[480px] shrink-0">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-white/5 ring-1 ring-white/10 group">
                <img 
                   src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                   alt="Vince Lawrence, Safety Professional" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" 
                />
              </div>
            </div>

            <div className="flex-grow text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[11px] mb-4">Institutional Oversight</p>
                
                <h2 className="mb-8">
                  <span className="block text-3xl md:text-4xl font-bold font-serif uppercase tracking-tight mb-2">Built by Vince Lawrence</span>
                  <span className="block text-lg md:text-xl text-white/70 font-medium leading-tight">OSHA-Certified Safety Professional with 20+ years of federal compliance oversight.</span>
                </h2>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                  <VeteranBadgeSmall />
                  <OSHABadgeSmall />
                </div>

                <p className="text-base text-white/80 leading-relaxed font-normal mb-10">
                  LaunchPath is a Veteran-Owned and Kingdom-Operated institution dedicated to operational integrity. We provide the technical education required to survive the critical 18-month new entrant phase.
                </p>

                <Link to="/about" className="inline-flex items-center text-signal-gold font-black uppercase tracking-[0.2em] text-[11px] hover:text-white transition-colors group">
                  <span>Learn more about our background and values</span>
                  <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROBLEM REALITY */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              What most new carriers realize after the reality sets in
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium leading-relaxed italic">
              Most carriers don’t fail from lack of hustle. They fail from lack of structure. We have observed consistent patterns where enthusiasm for "launching" overlooks the systems required for "sustaining."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "I watched the videos and listened to drivers with years in the game. Still wasn't prepared for the paperwork, the insurance costs, or the audit. That's where it gets real.",
                author: "Marcus T., First-Year Owner-Operator"
              },
              {
                quote: "I did my homework—YouTube, groups, talking to drivers. Nobody explained that one missed insurance payment could shut the whole operation down.",
                author: "Keisha M., New Authority"
              },
              {
                quote: "I came home, got my CDL, and thought I was ready. The compliance side almost sent me right back to where I started.",
                author: "Chris P., New Authority"
              }
            ].map((card, i) => (
              <div key={i} className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col">
                <Quote className="text-signal-gold mb-6 opacity-30" size={32} />
                <p className="text-base text-text-muted italic leading-relaxed mb-8 flex-grow">"{card.quote}"</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">— {card.author}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-center text-text-muted uppercase tracking-[0.2em] font-bold mb-12">
            * These represent common challenges new carriers face based on industry patterns, not guarantees or predictions of individual outcomes.
          </p>

          <div className="text-center">
            <p className="text-xl font-bold text-authority-blue dark:text-white italic">"Most carriers don't fail from lack of hustle. They fail from lack of structure."</p>
          </div>
        </div>
      </section>

      {/* 4. THE FOUR PILLARS FRAMEWORK */}
      <section id="pillars" className="py-24 bg-slate-50 dark:bg-primary-dark border-y border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              The Four Pillars Foundation
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">
              New carrier failure usually occurs when one of these four operational systems collapses. LaunchPath is built to reinforce all four.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                icon: <Building2 />, 
                title: "Authority Protection", 
                desc: "Managing DOT/MC violations, failed audits, and SMS scores. One collapsed pillar can suspend your authority overnight." 
              },
              { 
                icon: <Shield />, 
                title: "Insurance Continuity", 
                desc: "One missed payment cancels your policy and suspends your authority. Most carriers underestimate insurance as their biggest threat." 
              },
              { 
                icon: <ClipboardList />, 
                title: "Compliance Backbone", 
                desc: "Missing DQ files, incomplete logs, and undocumented maintenance. Auditors find gaps that trigger conditional ratings." 
              },
              { 
                icon: <Wallet />, 
                title: "Cash-Flow Oxygen", 
                desc: "Over-leverage, bad rates, and 30–90 day payment cycles. Operational solvency is required to keep the other three pillars standing." 
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light shadow-sm group hover:shadow-xl transition-all">
                <div className="text-signal-gold mb-8 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-4">{pillar.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-authority-blue dark:text-white mb-8 italic">The Four Pillars protect your authority from every direction. LaunchPath prepares you for all four.</p>
          </div>
        </div>
      </section>

      {/* 5. THE REACH TEST */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6">Strategic Defense</p>
              <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white mb-8 leading-[1.1] tracking-tighter uppercase">The Reach Test</h2>
              <p className="text-xl text-text-muted leading-relaxed font-medium mb-10">
                Threats attack your authority from four directions. LaunchPath systems are built to pass "The Reach Test"—ensuring your business remains structurally sound when regulatory pressure is applied.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: <MoveDown className="text-signal-gold" />, label: "OVER", sub: "FMCSA Regulatory Violations" },
                  { icon: <MoveRight className="text-signal-gold" />, label: "AROUND", sub: "Insurance Cancellations" },
                  { icon: <MoveLeft className="text-signal-gold" />, label: "THROUGH", sub: "Internal System Auditors" },
                  { icon: <MoveUp className="text-signal-gold" />, label: "UNDER", sub: "Financial Foundation Collapse" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-slate-50 dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 shadow-sm">
                    {item.icon}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                      <p className="text-xs font-bold text-text-muted">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-authority-blue p-12 rounded-[4rem] text-white shadow-2xl relative z-10">
                <ShieldCheck size={48} className="text-signal-gold mb-8" />
                <h3 className="text-3xl font-black font-serif uppercase tracking-tight mb-6">Built to Pass.</h3>
                <p className="text-white/80 leading-relaxed mb-10 font-medium italic">
                  "The Four Pillars exist to protect against threats that pass The Reach Test—the ones that can reach your authority and shut you down."
                </p>
                <div className="h-px w-full bg-white/10 mb-8"></div>
                <p className="text-xs font-black uppercase tracking-widest text-signal-gold">Designed for survival in the first 18 months.</p>
              </div>
              <div className="absolute -inset-4 border-4 border-signal-gold/20 rounded-[4.5rem] -rotate-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY LAUNCHPATH IS DIFFERENT */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              What Makes LaunchPath Different
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
              We provide a professional alternative to "hustle culture" trucking advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Layout />, title: "Systematic Structure", desc: "We teach a 90-day sequence, not a collection of random tips." },
              { icon: <ShieldCheck />, title: "Compliance-First", desc: "We prioritize protecting your authority before you attempt to scale." },
              { icon: <Award />, title: "Institutional Experience", desc: "Our curriculum is built on 20+ years of federal safety oversight." },
              { icon: <Calculator />, title: "Interactive Decision Tools", desc: "We replace static PDFs with professional-grade financial calculators." },
              { icon: <Anchor />, title: "Radical Integrity", desc: "As a Kingdom business, we value stewardship and truth over sales hype." },
              { icon: <Target />, title: "Audit Ready", desc: "We focus on testing readiness, not just hoping for the best." }
            ].map((diff, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light shadow-sm">
                <div className="text-authority-blue dark:text-signal-gold mb-6">{diff.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-4">{diff.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CURRICULUM PREVIEW */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              The LaunchPath 90-Day Survival System
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">
              A structured program built on The Four Pillars—designed to stabilize your authority in the first 90 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { id: "Ground 0", title: "Go/No-Go Readiness", outcome: "Verify operational discipline before filing" },
              { id: "Module 1", title: "Authority Protection", outcome: "Secure your DOT/MC credentials" },
              { id: "Module 2", title: "Insurance Continuity", outcome: "Manage the carrier-insurer relationship" },
              { id: "Module 3", title: "Compliance Backbone", outcome: "Build audit-ready DQ and maintenance files" },
              { id: "Module 4", title: "Cash-Flow Oxygen", outcome: "Master the 30-day solvency loop" },
              { id: "Module 5", title: "Audit Readiness", outcome: "Pass the New Entrant Safety Audit" },
              { id: "Module 6", title: "Stabilization & Scale", outcome: "Prepare for long-term fleet growth" }
            ].map((mod, i) => (
              <div key={i} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-3xl border border-slate-200">
                <p className="text-[10px] font-black uppercase text-signal-gold mb-2 tracking-widest">{mod.id}</p>
                <h3 className="text-lg font-black text-authority-blue dark:text-white uppercase mb-4 leading-tight">{mod.title}</h3>
                <p className="text-xs text-text-muted font-bold">OUTCOME: {mod.outcome}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/learning-path" className="inline-flex items-center space-x-2 bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl">
              <span>Explore Full Curriculum</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE TOOLS */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              Interactive Student Tools
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">
              Other courses give you PDFs. LaunchPath gives you professional financial software calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Calculator />, title: "Cost-Per-Mile Calculator", desc: "Know your 'break-even' before you book a load." },
              { icon: <Shield />, title: "True Cost of Ownership Tool", desc: "Forecast maintenance and depreciation accurately." },
              { icon: <Clock />, title: "Premium Payment Tracker", desc: "Maintain Pillar 2 (Insurance) with automated reminders." }
            ].map((tool, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light shadow-sm text-center flex flex-col items-center">
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue dark:text-signal-gold mb-6">{tool.icon}</div>
                <h3 className="text-xl font-black uppercase text-authority-blue dark:text-white mb-4">{tool.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/advisor" className="inline-flex items-center space-x-2 text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-xs hover:underline underline-offset-8">
              <span>Explore All Tools</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. WHO IT'S FOR / WHO IT'S NOT */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-slate-50 dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100">
               <h3 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Who This Is For</h3>
               <ul className="space-y-6">
                 {[
                   "CDL holders planning to obtain their own authority",
                   "New authorities in their first 90 days of operation",
                   "Lease-purchase drivers transitioning to independence",
                   "Carriers who refuse to compromise integrity for shortcuts"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                     <Check className="text-green-500 shrink-0 mt-1" size={20} />
                     <span className="text-base font-bold text-text-primary dark:text-text-dark-muted">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Who This Is NOT For</h3>
               <ul className="space-y-6">
                 {[
                   "Experienced carriers (3+ years) looking for advanced logistics",
                   "Anyone seeking dispatching or load-finding services",
                   "Anyone looking for \"get rich quick\" promises",
                   "Anyone looking for legal, tax, or financial advice"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                     <X className="text-red-400 shrink-0 mt-1" size={20} />
                     <span className="text-base font-medium text-text-muted italic">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ENROLLMENT OPTIONS */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Choose Your Path</h2>
          <p className="text-xl text-text-muted font-medium leading-relaxed mb-12">
            Every path starts with the same goal: protecting your legal right to operate. Choose the level of implementation support that fits your current needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { tier: "Foundation", price: "$397", desc: "Full curriculum access for independent learners." },
              { tier: "Professional", price: "$997", desc: "Curriculum + Tools + Community Support." },
              { tier: "Premium", price: "$1,997", desc: "High-touch 1-on-1 implementation and mock audits." }
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                 <h4 className="font-black uppercase tracking-tight text-authority-blue dark:text-white text-lg mb-2">{p.tier}</h4>
                 <p className="text-2xl font-black text-signal-gold mb-4">{p.price}</p>
                 <p className="text-xs text-text-muted font-bold">{p.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="inline-flex items-center space-x-2 bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl">
            <span>View Full Pricing Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 11. HOW IT WORKS */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">
              LaunchPath follows a specific sequence to move you from uncertainty to an audit-ready operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Start with Ground 0", desc: "Complete the Go/No-Go assessment to verify your business framework." },
              { step: "02", title: "Build the Pillars", desc: "Implement Modules 1–4 to secure authority, insurance, and files." },
              { step: "03", title: "Test Readiness", desc: "Use Module 5 to prepare for the federal New Entrant Safety Audit." },
              { step: "04", title: "Stabilize", desc: "Transition into Module 6 to prepare for long-term operational sustainability." }
            ].map((step, i) => (
              <div key={i} className="relative p-10 bg-slate-50 dark:bg-surface-dark rounded-[2.5rem] border border-slate-100">
                <span className="text-6xl font-black text-authority-blue/5 absolute top-4 right-8">{step.step}</span>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase mb-4 relative z-10 leading-none">{step.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed font-medium relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. SCOPE CLARITY */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark border-y border-border-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">What LaunchPath Does NOT Provide</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">Accuracy over hype requires clear boundaries.</p>
          </div>
          
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-8">
            <ul className="space-y-6">
              {[
                { label: "No Dispatching", desc: "We do not find loads or provide dispatch services." },
                { label: "No Guarantees", desc: "We do not guarantee income, profits, or specific audit outcomes." },
                { label: "No Professional Advice", desc: "LaunchPath is an educational platform. We do not provide legal, tax, financial, or insurance advice." }
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-6">
                  <AlertTriangle className="text-signal-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-black uppercase text-authority-blue dark:text-white leading-none mb-2">{item.label}</h4>
                    <p className="text-base text-text-muted font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="h-px w-full bg-slate-100 dark:bg-gray-800"></div>
            <p className="text-sm text-text-muted font-bold leading-relaxed italic text-center">
              "This clarity protects both you and our institution. We teach the systems; you are responsible for implementing them with the support of licensed professionals when needed."
            </p>
          </div>
        </div>
      </section>

      {/* 13. FINAL CALM CLOSE */}
      <section className="py-32 bg-authority-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black font-serif mb-8 leading-tight tracking-tight uppercase">
            Ready to Build Your Foundation?
          </h2>
          <p className="text-xl opacity-80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            LaunchPath is built on integrity, stewardship, and systematic thinking. We help serious carriers prepare for the reality of federal compliance—not the fantasy of easy money. Build your carrier on a foundation that lasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-2xl active:scale-95">
              <span>Choose Your Path</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              <span>Talk to Vince First</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;