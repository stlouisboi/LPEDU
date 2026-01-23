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
  // Added missing icons to fix "Cannot find name" errors
  Award,
  Search,
  AlertTriangle
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
      navigate(`/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans text-authority-blue">
      
      {/* 1. HERO SECTION: AUTHORITY / DISCIPLINE */}
      <section className="relative min-h-[90vh] flex items-center w-full bg-authority-blue overflow-hidden border-none py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-[11px] font-black tracking-[0.2em] text-white dark:text-signal-gold shadow-sm uppercase">
                <span>⚖️ Integrity First • Systems Driven</span>
              </div>
              
              <h1 className="text-5xl lg:text-[72px] font-black tracking-tighter text-white leading-[0.95] font-serif uppercase">
                Protect Your <br/><span className="text-signal-gold italic">Authority</span> With Order <br/>and Certainty.
              </h1>
              
              <div className="text-xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium space-y-4">
                <p>Clarity is the primary asset of a resilient motor carrier. We help you establish the systems required to lead your business with stewardship and maintain the integrity of your authority from day one.</p>
                <p className="text-base italic text-white/60">LaunchPath is the grown-up version of "How do I start this business correctly?" — with order, foresight, and stewardship.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
                <Link 
                  to="/readiness"
                  className="w-full sm:w-auto bg-white text-authority-blue px-12 py-5 rounded-2xl font-black text-sm hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl"
                >
                  Request Admission
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
                <button 
                  onClick={() => document.getElementById('logic')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-transparent text-white/70 hover:text-white px-8 py-5 rounded-2xl font-black text-sm transition-all flex items-center justify-center uppercase tracking-widest"
                >
                  How the standard works
                </button>
              </div>
            </div>
            
            <div id="risk-assessment" className="lg:col-span-5 relative">
              <div className="relative bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <div className="absolute top-8 right-8 text-authority-blue opacity-40">
                  <ShieldAlert size={28} />
                </div>
                <h2 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 leading-none font-serif">
                  First 90 Days <br/><span className="text-signal-gold">Risk Map™</span>
                </h2>
                <p className="text-[11px] text-text-muted dark:text-text-dark-muted mb-8 font-bold uppercase tracking-widest leading-relaxed">
                  Identify and align your business with the Four Pillars. Gain the visibility required for disciplined stewardship of your operating authority.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Legal Name</label>
                    <input 
                      type="text" required placeholder="e.g. Jane Doe"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue rounded-xl outline-none transition-all font-bold text-sm text-text-primary dark:text-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Professional Email</label>
                    <input 
                      type="email" required placeholder="jane@carrier.com"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue rounded-xl outline-none transition-all font-bold text-sm text-text-primary dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={loading} type="submit"
                    className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-steel-blue transition-all flex items-center justify-center active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" size={18} /> : <MousePointer2 className="mr-3" size={16} />}
                    Create My 90-Day Risk Map
                  </button>
                  <p className="text-[8px] text-center text-slate-400 uppercase tracking-widest font-black">
                    Secure Protocol • Educational Resources Only
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPOSURE SECTION: THE RISK MOST NEW CARRIERS NEVER SEE */}
      <section id="logic" className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 text-red-600">
                <ShieldAlert size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Immediate Operational Threat</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
                The Risk Most <br/><span className="text-red-600">New Carriers</span> <br/>Never See.
              </h2>
              <div className="space-y-6 text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed max-w-xl">
                <p>The first 90 days of a new operating authority are statistically the highest-risk period for permanent failure. During this window, regulators and insurers are monitoring your data for documentation gaps that the industry calls <strong>"The 16 Deadly Sins."</strong></p>
                <p>These exposure points are the most common triggers behind unscheduled federal audits, sudden insurance cancellations, and immediate authority shutdowns. Most operators are focused on finding loads while their foundation is actively eroding.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-surface-dark p-10 lg:p-16 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
              <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">From Exposure to Protection</h3>
              <p className="text-base text-text-muted font-medium leading-relaxed">To meet federal expectations and maintain insurance continuity, you must move from accidental exposure to active protection. The <strong>Four Pillars</strong> are the structured documentation standards that auditors and insurers expect to see in a professional operation:</p>
              
              <div className="space-y-4">
                {[
                  { t: "Drug & Alcohol", icon: <Briefcase size={16} /> },
                  { t: "Driver Qualification", icon: <UserCheck size={16} /> },
                  { t: "Insurance & Finance", icon: <ShieldCheck size={16} /> },
                  { t: "Maintenance & Hours of Service", icon: <Clock size={16} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-authority-blue dark:text-signal-gold">{item.icon}</div>
                    <span className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-white">{item.t}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-authority-blue text-white rounded-3xl text-sm italic font-medium leading-relaxed">
                "The 16 Deadly Sins reveal exposure. The Four Pillars are the refuge."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AUDIT BANNER */}
      <section className="bg-authority-blue py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black font-serif text-white uppercase tracking-tight mb-8">
            See Your Exposure Before The <br/><span className="text-signal-gold italic">Audit Letter Arrives.</span>
          </h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            The <strong>First 90 Days Risk Map™</strong> is a diagnostic tool, not a training course. It provides immediate visibility into your current regulatory footprint, allowing you to identify the gaps that trigger a federal intervention before it happens.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-signal-gold text-authority-blue px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl active:scale-95 flex items-center mx-auto"
          >
            <span>View The First 90 Days Risk Map</span>
            <ArrowRight className="ml-3 w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. TESTIMONIALS / QUOTES */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-3xl lg:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">
              Most Motor Carriers Do Not Fail From Lack of Effort. <br/>They Fail From Lack of Structure.
            </h2>
            <p className="text-lg text-text-muted font-medium italic">The following accounts reflect common patterns observed in the first year of operation, illustrating the systemic nature of these challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: "I watched the videos and listened to drivers with years in the game. Still wasn't prepared for the paperwork, the insurance costs, or the audit. That's where it gets real.", a: "Marcus T., First-Year Owner-Operator" },
              { q: "I did my homework—YouTube, groups, talking to drivers. Nobody explained that one missed insurance payment could shut the whole operation down.", a: "Keisha M., New Authority" },
              { q: "I came home, got my CDL, and thought I was ready. The compliance side almost sent me right back to where I started.", a: "Chris P., New Authority" }
            ].map((quote, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm relative group">
                <Quote className="text-signal-gold opacity-20 mb-8" size={32} />
                <p className="text-lg font-medium leading-relaxed italic mb-10 text-text-primary dark:text-text-dark-primary">"{quote.q}"</p>
                <div className="h-px w-10 bg-slate-200 mb-6"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">{quote.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE FOUR PILLARS FOUNDATION */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">The Four Pillars Foundation</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">New motor carrier failure usually occurs when one of these four operational standards collapses. LaunchPath is built to reinforce all four.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Authority Protection", d: "Managing DOT/MC violations, audit expectations, and SMS scores. One collapsed pillar can suspend your authority overnight.", icon: <Anchor /> },
              { t: "Insurance Continuity", d: "One missed payment cancels your policy and suspends your authority. Most carriers underestimate insurance as their biggest threat.", icon: <Shield /> },
              { t: "Compliance Backbone", d: "Missing DQ files, incomplete logs, and undocumented maintenance. Auditors find gaps that trigger conditional ratings.", icon: <Layers /> },
              { t: "Cash-Flow Oxygen", d: "Over-leverage, bad rates, and 30-60 day payment cycles. Operational solvency is required to keep the other three pillars standing.", icon: <Activity /> }
            ].map((pillar, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="w-14 h-14 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-authority-blue dark:text-white mb-6 leading-tight font-serif">{pillar.t}</h3>
                <p className="text-sm text-text-muted font-bold leading-relaxed mb-8">{pillar.d}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-8 bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-3xl text-center">
             <p className="text-base text-authority-blue dark:text-signal-gold font-bold italic">The Four Pillars protect your operating authority from every direction. LaunchPath prepares you for all four.</p>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SECTION */}
      <section className="py-32 bg-authority-blue">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
           <div className="bg-white/5 backdrop-blur-md rounded-[4rem] border border-white/10 p-12 lg:p-20 overflow-hidden relative shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-16 items-center">
                 <div className="relative">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                       <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" className="w-full h-full object-cover" alt="Vince Lawrence" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-signal-gold p-6 rounded-[2.5rem] shadow-2xl animate-float">
                       {/* Fix: Award icon found */}
                       <Award size={32} className="text-authority-blue" />
                    </div>
                 </div>
                 <div className="text-white space-y-8">
                    <h2 className="text-3xl lg:text-[40px] font-black font-serif uppercase tracking-tight leading-[1.1]">
                       Founder & Desert Storm Navy Veteran — <br/><span className="text-signal-gold">Vince Lawrence</span>
                    </h2>
                    <p className="text-lg text-signal-gold font-black uppercase tracking-[0.3em] italic">"OSHA-Certified Safety Professional with 20+ years of compliance operating standards."</p>
                    <div className="h-px w-20 bg-white/20"></div>
                    <p className="text-xl text-white/70 font-medium leading-relaxed">
                       Vince Lawrence has overseen compliance systems for organizations supporting 1,200+ employees. LaunchPath translates this institutional experience into a systematic protective standard for small motor carriers.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                       <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3">
                          <Star size={14} className="text-signal-gold" />
                          <span>Kingdom Operated</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. THE REACH TEST™ */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20">
             <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold mb-4">
                <div className="h-px w-10 bg-current"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Strategic Defense Protocol</span>
             </div>
             <h2 className="text-4xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none mb-10">
                The <span className="text-signal-gold">Reach</span> Test™
             </h2>
             <p className="text-xl text-text-muted font-medium max-w-2xl leading-relaxed">
               Regulatory and operational threats attack your operating authority by reaching from four directions. LaunchPath standards are built to meet the requirements of "The Reach Test™"—ensuring your business remains structurally sound when federal pressure is applied.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { l: "Over", t: "FMCSA Regulatory Violations", d: "Critical violations that bypass standard safety filters.", i: <TrendingDown className="rotate-180" /> },
                 { l: "Around", t: "Insurance Cancellations", d: "Administrative lapses that trigger sudden loss of coverage.", i: <Zap /> },
                 /* Fix: Search icon found */
                 { l: "Through", t: "Internal System Auditors", d: "Data inconsistencies found during roadside inspections.", i: <Search /> },
                 { l: "Under", t: "Financial Foundation Collapse", d: "Cash-flow deficits that compromise operational safety.", i: <DollarSign /> }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-10">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-authority-blue transition-colors">{item.l}</span>
                       <div className="text-slate-200 group-hover:text-signal-gold transition-colors">{item.i}</div>
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-black text-sm uppercase text-authority-blue dark:text-white">{item.t}</h4>
                       <p className="text-[11px] font-bold text-text-muted leading-relaxed">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="lg:col-span-4 bg-authority-blue text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-between">
               <ShieldCheck className="absolute -top-10 -right-10 text-white/5" size={240} />
               <div className="relative z-10">
                  <div className="p-3 bg-white/10 rounded-2xl inline-block mb-8">
                     <ShieldCheck className="text-signal-gold" size={32} />
                  </div>
                  <h3 className="text-3xl font-black font-serif uppercase tracking-tight mb-6">Built To <br/><span className="text-signal-gold italic">Pass.</span></h3>
                  <p className="text-lg text-white/70 font-medium leading-relaxed italic">
                    "The Four Pillars exist to protect against threats that pass The Reach Test—the specific vectors that reach your operating authority and shut you down."
                  </p>
               </div>
               <div className="relative z-10 pt-10 border-t border-white/10 flex items-center space-x-3">
                  <Zap size={16} className="text-signal-gold" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Designed for survival in the first 18 months</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHAT MAKES LAUNCHPATH DIFFERENT */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">What Makes LaunchPath Different</h2>
          <p className="text-lg text-text-muted font-medium mb-20 italic">We provide a professional alternative to speculative trucking advice.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Systematic Structure", d: "We teach a 90-day sequence, not a collection of random tips.", i: <Layout /> },
              { t: "Compliance-First", d: "We prioritize protecting your authority before you attempt to scale.", i: <Shield /> },
              /* Fix: Award icon found */
              { t: "Institutional Experience", d: "Our curriculum is built on 20+ years of federal safety oversight.", i: <Award /> },
              { t: "Interactive Decision Tools", d: "We replace static PDFs with professional-grade financial calculators.", i: <Calculator /> },
              { t: "Radical Integrity", d: "As a Kingdom business, we value stewardship and truth over sales hype.", i: <Anchor /> },
              { t: "Audit Ready", d: "We focus on meeting audit expectations, not just hoping for the best.", i: <BarChart3 /> }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left group">
                <div className="p-3 bg-authority-blue/5 rounded-2xl inline-block mb-8 group-hover:bg-authority-blue group-hover:text-white transition-all">
                   <div className="w-6 h-6">{item.i}</div>
                </div>
                <h4 className="font-black text-sm uppercase text-authority-blue dark:text-white mb-4 tracking-widest">{item.t}</h4>
                <p className="text-xs text-text-muted font-bold leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. THE LAUNCHPATH 90-DAY OPERATING STANDARD */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
             <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">The LaunchPath 90-Day Operating Standard</h2>
             <p className="text-lg text-text-muted font-medium max-w-2xl mx-auto">A structured sequence built on The Four Pillars—designed to stabilize your authority in the first 90 days.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
            {[
              { id: "00", t: "Go/No-Go Readiness", o: "Verify operational discipline before filing.", l: "Ground 0" },
              { id: "01", t: "Authority Protection", o: "Secure your DOT/MC credentials.", l: "Module 1" },
              { id: "02", t: "Insurance Continuity", o: "Manage the carrier-insurer relationship.", l: "Module 2" },
              { id: "03", t: "Compliance Backbone", o: "Meet audit expectations for DQ and maintenance files.", l: "Module 3" },
              { id: "04", t: "Cash-Flow Oxygen", o: "Master the 30-day solvency loop.", l: "Module 4" },
              { id: "05", t: "Audit Readiness", o: "Meet expectations for the New Entrant Safety Audit.", l: "Module 5" },
              { id: "06", t: "Stabilization & Scale", o: "Prepare for long-term fleet growth.", l: "Module 6" }
            ].map((mod, i) => (
              <div key={i} className="relative pt-10 border-t-2 border-slate-100 group">
                <div className="absolute -top-3 left-0 bg-white dark:bg-primary-dark pr-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-signal-gold transition-colors">{mod.l}</span>
                </div>
                <h4 className="font-black text-sm uppercase text-authority-blue dark:text-white mb-3 tracking-tighter">{mod.t}</h4>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest"><span className="text-authority-blue/30 mr-1 font-black">Outcome:</span> {mod.o}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <Link to="/learning-path" className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95">Explore Full Curriculum</Link>
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE STUDENT TOOLS */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">Interactive Student Tools</h2>
          <p className="text-lg text-text-muted font-medium mb-20 italic">Other courses give you static documents. LaunchPath gives you professional financial software calculators.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Cost-Per-Mile Calculator", d: "Know your 'break-even' before you book a load.", icon: <Briefcase /> },
              { t: "True Cost of Ownership Tool", d: "Forecast maintenance and depreciation accurately.", icon: <Target /> },
              { t: "Premium Payment Tracker", d: "Maintain Pillar 2 (Insurance) with automated reminders.", icon: <Clock /> }
            ].map((tool, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center group hover:shadow-2xl transition-all">
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-3xl mb-10 text-slate-300 group-hover:text-authority-blue group-hover:bg-authority-blue/5 transition-all">
                   <div className="w-8 h-8">{tool.icon}</div>
                </div>
                <h4 className="font-black text-sm uppercase text-authority-blue dark:text-white mb-4 tracking-tighter">{tool.t}</h4>
                <p className="text-xs text-text-muted font-bold text-center leading-relaxed">{tool.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
             <Link to="/resources" className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center justify-center group">
               <span>Explore All Tools</span>
               <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 11. WHO THIS IS FOR / NOT FOR */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-[4rem] p-12 lg:p-24 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Who This Is For</h2>
                 <ul className="space-y-6">
                   {[
                     "CDL holders planning to obtain their own authority",
                     "New authorities in their first 90 days of operation",
                     "Lease-purchase drivers transitioning to independence",
                     "Motor carriers who refuse to compromise integrity for shortcuts"
                   ].map((item, i) => (
                     <li key={i} className="flex items-start space-x-4">
                       <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-1" />
                       <span className="text-base font-bold text-text-primary dark:text-text-dark-muted">{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>
              <div className="space-y-12">
                 <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Who This Is Not For</h2>
                 <ul className="space-y-6">
                   {[
                     "Experienced operators (2+ years) looking for advanced logistics",
                     "Anyone seeking dispatching or load-finding services",
                     "Anyone looking for rapid financial promises",
                     "Anyone looking for legal, tax, or financial advice"
                   ].map((item, i) => (
                     <li key={i} className="flex items-start space-x-4 opacity-60">
                       <XCircle size={20} className="text-red-400 shrink-0 mt-1" />
                       <span className="text-base font-bold text-text-muted">{item}</span>
                     </li>
                   ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 12. REQUEST ADMISSION / PRICING */}
      <section id="pricing" className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">Request Admission</h2>
          <p className="text-lg text-text-muted font-medium mb-16 max-w-2xl mx-auto">LaunchPath operates under one standard. Enrollment is admission-based to ensure operational alignment.</p>
          
          <div className="bg-white dark:bg-surface-dark p-12 lg:p-20 rounded-[4rem] border-4 border-slate-100 dark:border-border-dark shadow-2xl relative">
            <div className="space-y-10">
               <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold">The Compliance Operating Standard</p>
               <div className="flex flex-col items-center">
                  <div className="flex items-baseline text-authority-blue dark:text-white">
                     <span className="text-3xl font-black mr-2">$</span>
                     <span className="text-[120px] font-black leading-none tracking-tighter">1,500</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mt-4">Founding Investment • Standard Investment $2,500</p>
               </div>
               
               <div className="pt-10">
                  <Link to="/readiness" className="bg-authority-blue text-white px-16 py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-steel-blue shadow-xl transition-all active:scale-95">Request Admission</Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. HOW IT WORKS */}
      <section className="py-32 bg-white dark:bg-primary-dark">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
               <h2 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">How It Works</h2>
               <p className="text-lg text-text-muted font-medium max-w-xl mx-auto">LaunchPath follows a specific sequence to move you from uncertainty to an audit-ready operation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               {[
                 { id: "01", t: "Start With Ground 0", d: "Complete the Discipline Standard to verify your business framework." },
                 { id: "02", t: "Build The Pillars", d: "Implement Modules 1-4 to secure authority, insurance, and files." },
                 { id: "03", t: "Meet Expectations", d: "Use Module 5 to prepare for the federal New Entrant Safety Audit." },
                 { id: "04", t: "Stabilize", d: "Transition into Module 6 to prepare for long-term operational sustainability." }
               ].map((step, i) => (
                 <div key={i} className="space-y-6">
                    <div className="text-5xl font-black text-slate-100 dark:text-gray-800 leading-none">{step.id}</div>
                    <h4 className="font-black text-sm uppercase text-authority-blue dark:text-white tracking-tighter">{step.t}</h4>
                    <p className="text-xs text-text-muted font-bold leading-relaxed">{step.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 14. WHAT WE DON'T PROVIDE */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark border-t border-slate-100 dark:border-border-dark">
         <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">What LaunchPath Does Not Provide</h2>
               <p className="text-base text-text-muted font-medium italic">Accuracy over hype requires clear boundaries.</p>
            </div>

            <div className="space-y-12">
               {[
                 { t: "No Dispatching", d: "We do not find loads or provide dispatch services.", i: <ShieldAlert /> },
                 /* Fix: AlertTriangle icon found */
                 { t: "No Guarantees", d: "We do not guarantee income, profits, or specific audit outcomes.", i: <AlertTriangle /> },
                 { t: "No Professional Advice", d: "LaunchPath is an educational platform. We do not provide legal, tax, financial, or insurance advice.", i: <Scale /> }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-6 p-8 bg-white dark:bg-surface-dark rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="text-red-500 shrink-0 mt-1">{item.i}</div>
                    <div className="space-y-2">
                       <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-white">{item.t}</h4>
                       <p className="text-sm text-text-muted font-bold">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-16 text-center">
               <p className="text-[10px] text-text-muted font-black uppercase tracking-widest italic max-w-2xl mx-auto leading-loose">
                  "This clarity protects both you and our institution. We teach the standards; you are responsible for implementing them with the support of licensed professionals when needed."
               </p>
            </div>
         </div>
      </section>

      {/* 15. FINAL CTA SECTION */}
      <section className="py-40 bg-authority-blue relative overflow-hidden text-center text-white border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl lg:text-[72px] font-black font-serif mb-10 leading-[0.9] tracking-tighter uppercase">
            Ready to Build Your <br/><span className="text-signal-gold italic">Foundation?</span>
          </h2>
          <p className="text-xl text-white/70 font-medium mb-16 max-w-3xl mx-auto leading-relaxed">
            LaunchPath is built on integrity, stewardship, and systematic thinking. We help serious motor carriers prepare for the reality of federal compliance—not the speculation of easy money. Build your carrier on a foundation that lasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/readiness" className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95">
              Request Admission
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:border-white transition-all active:scale-95">
              Talk to Vince First
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;