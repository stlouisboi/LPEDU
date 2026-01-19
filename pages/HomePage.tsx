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
  Anchor,
  Star,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

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
      
      {/* 1. HERO SECTION - ORIENTATION */}
      <section className="relative min-h-[85vh] flex items-center w-full bg-authority-blue overflow-hidden border-none">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-[13px] font-bold tracking-wide text-white dark:text-signal-gold mb-8 shadow-sm">
                <span>⚖️ INTEGRITY FIRST • SYSTEMS DRIVEN</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black tracking-tight text-white leading-[1.0] mb-8">
                Protect Your <br/><span className="text-signal-gold">Authority</span> <br className="lg:hidden" /> With Order <br className="hidden lg:block" /> and Certainty.
              </h1>
              
              <div className="text-xl lg:text-[22px] text-white/80 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                <p>Clarity is the primary asset of a resilient motor carrier. We help you establish the systems required to lead your business with stewardship and maintain the integrity of your authority from day one.</p>
              </div>

              <p className="text-lg text-white/50 mb-10 font-medium italic leading-relaxed max-w-2xl mx-auto lg:mx-0">
                LaunchPath is the grown-up version of “How do I start this business correctly?” — with order, foresight, and stewardship.
              </p>

              <p className="text-lg text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                LaunchPath provides a structured 90-day implementation sequence. We help you establish a resilient operating foundation on your own timeline, ensuring every system is aligned with professional standards.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link 
                  to="/learning-path"
                  className="group bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-sm hover:bg-white/5 hover:border-white transition-all flex items-center active:scale-95 uppercase tracking-[0.2em]"
                >
                  Explore the Roadmap
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent text-white/50 hover:text-white px-10 py-5 rounded-2xl font-black text-sm transition-all flex items-center active:scale-95 uppercase tracking-widest"
                >
                  How the System Works
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[4rem] border border-slate-200 dark:border-border-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] animate-in zoom-in duration-700">
                <div className="absolute -top-4 -right-4 bg-authority-blue text-white p-4 rounded-[2rem] shadow-xl">
                  <Files size={32} className="text-signal-gold" />
                </div>
                <h2 className="text-2xl md:text-[28px] font-bold text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">
                  First 90 Days <br/><span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-sm text-text-muted dark:text-text-dark-muted mb-10 font-medium italic leading-relaxed">
                  Identify and align your business with the Four Pillars. Gain the visibility required for disciplined stewardship of your operating authority.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted mb-2 ml-4">Full Legal Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jane Doe"
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 rounded-2xl outline-none transition-all font-bold text-text-primary dark:text-white shadow-sm focus:shadow-2xl"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted mb-2 ml-4">Professional Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@carrier.com"
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 rounded-2xl outline-none transition-all font-bold text-text-primary dark:text-white shadow-sm focus:shadow-2xl"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.35em] text-[10px] shadow-[0_20px_40px_-10px_rgba(30,58,95,0.3)] hover:bg-steel-blue hover:shadow-2xl transition-all flex items-center justify-center active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" size={20} /> : <CheckCircle2 className="mr-3" size={18} />}
                    Create My 90-Day Risk Map
                  </button>
                  <p className="text-[9px] text-center text-text-muted uppercase tracking-[0.3em] font-black mt-4">
                    Secure Protocol • Educational Resources Only
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM REALITY */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-tight">
              Most motor carriers do not fail from lack of effort. <br/>They fail from lack of structure.
            </h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium leading-relaxed italic">
              The following accounts reflect common patterns observed in the first year of operation, illustrating the systemic nature of these challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <p className="text-base text-text-muted dark:text-text-dark-muted italic leading-relaxed mb-8 flex-grow">"{card.quote}"</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">— {card.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE FOUR PILLARS FRAMEWORK - THE SYSTEM */}
      <section id="pillars" className="py-24 bg-slate-50 dark:bg-primary-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              The Four Pillars Foundation
            </h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium">
              New motor carrier failure usually occurs when one of these four operational systems collapses. LaunchPath is built to reinforce all four.
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
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm group hover:shadow-xl transition-all">
                <div className="text-signal-gold mb-8 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-4">{pillar.title}</h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-authority-blue dark:text-white mb-8 italic">The Four Pillars protect your operating authority from every direction. LaunchPath prepares you for all four.</p>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER SECTION - CREDIBILITY */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="bg-authority-blue dark:bg-surface-dark rounded-[2.5rem] p-10 lg:p-20 border border-authority-blue dark:border-border-dark flex flex-col lg:flex-row items-center gap-16 shadow-[0_40px_100px_-30px_rgba(30,58,95,0.4)] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 -translate-y-48 blur-3xl"></div>
            
            {/* Founder Image container - Scaled up by 30% per request (from 186px to 242px) */}
            <div className="w-full max-w-[242px] shrink-0 animate-in fade-in duration-1000">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-slate-900 border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 flex items-center justify-center">
                <img 
                  src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                  alt="Vince Lawrence" 
                  className="w-full h-auto object-contain block" 
                />
              </div>
            </div>

            <div className="flex-grow space-y-10 text-left text-white relative z-10">
              <div className="space-y-6">
                {/* Updated Title - Reflecting Desert Storm Navy Service */}
                <h2 className="text-3xl lg:text-[44px] font-black font-serif uppercase tracking-tight leading-[1.1]">Founder & Desert Storm Navy Veteran — <br/>Vince Lawrence</h2>
                
                <p className="text-xl lg:text-2xl text-signal-gold font-medium leading-relaxed italic opacity-90">
                  "OSHA-Certified Safety Professional with 20+ years of system compliance oversight."
                </p>
              </div>

              <div className="h-px bg-white/10 w-full lg:w-32"></div>

              <p className="text-lg text-white/80 leading-relaxed font-medium max-w-xl">
                Vince Lawrence has overseen compliance systems for organizations supporting 1,200+ employees. LaunchPath translates this institutional experience into a systematic protective framework for small motor carriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE REACH TEST - THREATS */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-12 bg-signal-gold"></div>
                <p className="text-signal-gold font-black uppercase tracking-[0.5em] text-[12px]">Strategic Defense Protocol</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white mb-10 leading-[1.1] tracking-tighter uppercase">
                The <span className="text-signal-gold italic">Reach</span> Test
              </h2>
              
              <p className="text-base lg:text-lg text-text-muted dark:text-text-dark-muted leading-relaxed font-medium mb-12 max-w-3xl">
                Regulatory and operational threats attack your operating authority by reaching from four directions. LaunchPath systems are built to pass "The Reach Test"—ensuring your business remains structurally sound when federal pressure is applied.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <MoveDown size={32} className="text-signal-gold" />, label: "OVER", sub: "FMCSA Regulatory Violations", desc: "Critical violations that bypass standard safety filters." },
                  { icon: <MoveRight size={32} className="text-signal-gold" />, label: "AROUND", sub: "Insurance Cancellations", desc: "Administrative lapses that trigger sudden loss of coverage." },
                  { icon: <MoveLeft size={32} className="text-signal-gold" />, label: "THROUGH", sub: "Internal System Auditors", desc: "Data inconsistencies found during roadside inspections." },
                  { icon: <MoveUp size={32} className="text-signal-gold" />, label: "UNDER", sub: "Financial Foundation Collapse", desc: "Cash-flow deficits that compromise operational safety." }
                ].map((item, i) => (
                  <div key={i} className="group flex items-start space-x-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-2">{item.label}</p>
                      <p className="text-lg font-black text-text-primary dark:text-white leading-tight mb-3">{item.sub}</p>
                      <p className="text-xs text-text-muted leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative group w-full max-w-lg">
                <div className="bg-authority-blue p-10 md:p-14 rounded-[3.5rem] text-white shadow-[0_40px_80px_-20px_rgba(30,58,95,0.3)] relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                  
                  <div className="relative z-20">
                    <ShieldCheck size={56} className="text-signal-gold mb-8 group-hover:rotate-12 transition-transform duration-700" />
                    <h3 className="text-3xl md:text-4xl font-black font-serif uppercase tracking-tight mb-6 leading-none">Built to <br/>Pass.</h3>
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 font-medium italic">
                      "The Four Pillars exist to protect against threats that pass The Reach Test—the specific vectors that reach your operating authority and shut you down."
                    </p>
                    <div className="h-px w-full bg-white/20 mb-8"></div>
                    <div className="flex items-center space-x-4">
                      <Zap size={18} className="text-signal-gold" fill="currentColor" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">Designed for survival in the first 18 months.</p>
                    </div>
                  </div>
                </div>
                {/* Decorative background rings - scaled down and opacity reduced */}
                <div className="absolute -inset-4 border-[4px] border-signal-gold/5 rounded-[4rem] -rotate-3 z-0"></div>
                <div className="absolute -inset-8 border border-authority-blue/5 rounded-[5rem] rotate-2 z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DIFFERENTIATION */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark border-y border-slate-200 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              What Makes LaunchPath Different
            </h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium leading-relaxed">
              We provide a professional alternative to speculative trucking advice.
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
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm">
                <div className="text-authority-blue dark:text-signal-gold mb-6">{diff.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-4">{diff.title}</h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CURRICULUM PREVIEW - PROGRAM */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              The LaunchPath 90-Day Survival System
            </h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium">
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
              <div key={i} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-border-dark">
                <p className="text-[10px] font-black uppercase text-signal-gold mb-2 tracking-widest">{mod.id}</p>
                <h3 className="text-lg font-black text-authority-blue dark:text-white uppercase mb-4 leading-tight">{mod.title}</h3>
                <p className="text-xs text-text-muted dark:text-text-dark-muted font-bold">OUTCOME: {mod.outcome}</p>
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
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium">
              Other courses give you static documents. LaunchPath gives you professional financial software calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Calculator />, title: "Cost-Per-Mile Calculator", desc: "Know your 'break-even' before you book a load." },
              { icon: <Shield />, title: "True Cost of Ownership Tool", desc: "Forecast maintenance and depreciation accurately." },
              { icon: <Clock />, title: "Premium Payment Tracker", desc: "Maintain Pillar 2 (Insurance) with automated reminders." }
            ].map((tool, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm text-center flex flex-col items-center">
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue dark:text-signal-gold mb-6">{tool.icon}</div>
                <h3 className="text-xl font-black uppercase text-authority-blue dark:text-white mb-4">{tool.title}</h3>
                <p className="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">{tool.desc}</p>
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

      {/* 9. WHO IT'S FOR / FIT */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-slate-50 dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100 dark:border-border-dark">
               <h3 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Who This Is For</h3>
               <ul className="space-y-6">
                 {[
                   "CDL holders planning to obtain their own authority",
                   "New authorities in their first 90 days of operation",
                   "Lease-purchase drivers transitioning to independence",
                   "Motor carriers who refuse to compromise integrity for shortcuts"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                     <Check className="text-green-500 shrink-0 mt-1" size={20} />
                     <span className="text-base font-bold text-text-primary dark:text-text-dark-muted">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100 dark:border-border-dark shadow-sm">
               <h3 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Who This Is NOT For</h3>
               <ul className="space-y-6">
                 {[
                   "Experienced operators (3+ years) looking for advanced logistics",
                   "Anyone seeking dispatching or load-finding services",
                   "Anyone looking for rapid financial promises",
                   "Anyone looking for legal, tax, or financial advice"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start space-x-4">
                     <X className="text-red-400 shrink-0 mt-1" size={20} />
                     <span className="text-base font-medium text-text-muted dark:text-text-dark-muted italic">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. ENROLLMENT OPTIONS - PRICING */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8">Choose Your Path</h2>
          <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium leading-relaxed mb-6">
            Every path starts with the same goal: protecting your legal right to operate. 
          </p>
          <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed mb-12">
            Pricing structures reflect the selected level of implementation support required to integrate the LaunchPath system into your operation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { tier: "Foundation", price: "$397", desc: "Full curriculum access for independent learners." },
              { tier: "Professional", price: "$797", desc: "Curriculum + Tools + Community Support." },
              { tier: "Premium", price: "$1,497", desc: "High-touch 1-on-1 implementation and mock audits." }
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-slate-100 dark:border-border-dark shadow-sm">
                 <h4 className="font-black uppercase tracking-tight text-authority-blue dark:text-white text-lg mb-2">{p.tier}</h4>
                 <p className="text-2xl font-black text-signal-gold mb-4">{p.price}</p>
                 <p className="text-xs text-text-muted dark:text-text-dark-muted font-bold">{p.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="inline-flex items-center space-x-2 bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl">
            <span>View Full Pricing Details</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 11. HOW IT WORKS - PROCESS */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium">
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
              <div key={i} className="relative p-10 bg-slate-50 dark:bg-surface-dark rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-sm">
                <span className="text-6xl font-black text-authority-blue/5 absolute top-4 right-8">{step.step}</span>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase mb-4 relative z-10 leading-none">{step.title}</h4>
                <p className="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed font-medium relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. SCOPE CLARITY - BOUNDARIES */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">What LaunchPath Does NOT Provide</h2>
            <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto font-medium">Accuracy over hype requires clear boundaries.</p>
          </div>
          
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-border-dark space-y-8">
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
                    <p className="text-base text-text-muted dark:text-text-dark-muted font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="h-px w-full bg-slate-100 dark:bg-gray-800"></div>
            <p className="text-sm text-text-muted dark:text-text-dark-muted font-bold font-serif leading-relaxed italic text-center">
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
            LaunchPath is built on integrity, stewardship, and systematic thinking. We help serious motor carriers prepare for the reality of federal compliance—not the speculation of easy money. Build your carrier on a foundation that lasts.
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