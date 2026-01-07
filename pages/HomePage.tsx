
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  MousePointer2
} from 'lucide-react';
import { useApp } from '../App';

const HomePage: React.FC = () => {
  const { addFormSubmission } = useApp();
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    setLoading(true);
    
    // Integrity-based delay for "Processing Risk Map"
    await new Promise(r => setTimeout(r, 1500));
    
    addFormSubmission({
      type: 'Lead Magnet',
      name: 'Hero Lead (First 90 Days Risk Map)',
      email: leadEmail,
      date: new Date().toISOString()
    });
    
    setLoading(false);
    setLeadSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden">
      {/* Visual Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02] z-0">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e3a5f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* 1. HERO SECTION - ULTRA HIGH CONVERSION LEAD MAGNET */}
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
                <Link to="/learning-path" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all flex items-center shadow-2xl active:scale-95">
                  Start Learning <ArrowRight className="ml-3" size={16} />
                </Link>
                <Link to="/about" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark flex items-center shadow-sm active:scale-95">
                  Our Methodology
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center space-x-2">
                  <Award size={20} className="text-authority-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Veteran Owned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldAlert size={20} className="text-authority-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Compliance First</span>
                </div>
              </div>
            </div>
            
            {/* AGGRESSIVE & COMPELLING LEAD CAPTURE FORM */}
            <div className="lg:col-span-6 relative">
              {/* Ultra aggressive Glowing Outer Layer */}
              <div className="absolute -inset-6 bg-gradient-to-br from-signal-gold via-yellow-400 to-signal-gold rounded-[4.5rem] blur-3xl opacity-25 animate-pulse"></div>
              
              <div className="relative bg-white dark:bg-surface-dark p-8 md:p-14 rounded-[3.5rem] border-[10px] border-signal-gold shadow-[0_50px_100px_-20px_rgba(212,175,55,0.5)] overflow-hidden group">
                {/* Visual Flair */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-signal-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute top-0 right-0 p-4 transform translate-x-1/3 -translate-y-1/3 rotate-12 bg-signal-gold text-authority-blue px-12 py-2 font-black uppercase tracking-widest text-[10px] shadow-xl z-20">Limited Release</div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-authority-blue text-white inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      <Zap size={12} className="text-signal-gold" />
                      <span>Immediate Cloud Access</span>
                    </div>
                    <div className="flex -space-x-2.5">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-surface-dark bg-slate-200 overflow-hidden shadow-sm">
                          <img src={`https://picsum.photos/seed/trucker${i}/60/60`} alt="user" />
                        </div>
                      ))}
                      <div className="w-9 h-9 rounded-full bg-signal-gold border-2 border-white dark:border-surface-dark flex items-center justify-center text-[10px] font-black text-authority-blue shadow-lg">+4.2k</div>
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

                  {leadSubmitted ? (
                    <div className="bg-green-50 dark:bg-green-900/20 p-12 rounded-[2.5rem] text-center animate-scale-in border-4 border-green-100">
                      <div className="w-24 h-24 bg-green-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
                        <CheckCircle2 size={56} />
                      </div>
                      <h3 className="text-3xl font-black text-green-800 dark:text-green-400 uppercase tracking-widest mb-2">Access Granted</h3>
                      <p className="text-base font-bold text-green-700 leading-relaxed">Your custom Risk Map is being generated and sent to your professional inbox right now.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted ml-4 flex items-center">
                          <Fingerprint size={16} className="mr-2 text-authority-blue" /> 
                          Secure Link Destination
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-authority-blue" size={26} />
                          <input 
                            required
                            type="email"
                            placeholder="professional@carrier.com"
                            className="w-full pl-18 pr-6 py-8 rounded-[2.2rem] bg-slate-50 dark:bg-gray-800 border-4 border-slate-100 dark:border-border-dark outline-none focus:ring-[12px] focus:ring-signal-gold/15 focus:border-signal-gold transition-all font-black text-2xl placeholder:opacity-30"
                            style={{ paddingLeft: '4.5rem' }}
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-30 transition-opacity">
                             <MousePointer2 size={24} className="text-authority-blue" />
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        disabled={loading}
                        className="w-full bg-signal-gold text-authority-blue py-9 rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-2xl hover:bg-authority-blue hover:text-white transition-all active:scale-[0.98] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(212,175,55,0.75)] disabled:opacity-50 group/btn relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                        {loading ? <Loader2 className="animate-spin" size={36} /> : (
                          <>
                            <span>GET IT NOW</span>
                            <div className="ml-5 p-2.5 bg-white/20 rounded-full group-hover/btn:translate-x-2 transition-transform shadow-inner">
                              <ArrowRight size={28} />
                            </div>
                          </>
                        )}
                      </button>

                      <div className="flex flex-col space-y-5 pt-8">
                        <div className="flex items-center justify-center space-x-8">
                           <div className="flex items-center space-x-2.5">
                             <ShieldCheck size={20} className="text-green-600" />
                             <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">100% Secure</span>
                           </div>
                           <div className="w-1.5 h-1.5 bg-border-light rounded-full"></div>
                           <div className="flex items-center space-x-2.5">
                             <TrendingUp size={20} className="text-authority-blue" />
                             <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Carrier Std.</span>
                           </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-[10px] text-text-muted font-bold uppercase tracking-tight bg-slate-50 dark:bg-slate-900 py-3 rounded-2xl border border-slate-100 dark:border-gray-800">
                          <Sparkles size={14} className="text-signal-gold" />
                          <span>Join 4,200+ Smart Owner-Operators building correctly.</span>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION - AUTHENTICITY */}
      <section className="py-24 bg-slate-50 dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black font-serif tracking-tighter">Why LaunchPath <br/><span className="text-authority-blue italic">Exists</span></h2>
              <p className="text-xl text-text-muted leading-relaxed font-medium">
                1 in 5 new carriers fail their first audit. We built LaunchPath because the industry needs <span className="text-authority-blue font-black underline decoration-signal-gold decoration-4 underline-offset-8">accuracy over hype</span>. 
              </p>
              <div className="bg-white dark:bg-primary-dark p-8 rounded-[3rem] border border-border-light shadow-sm">
                <p className="text-lg text-text-muted leading-relaxed italic">
                  "No get-rich-quick schemes. No shortcuts. Just verified FMCSA methodology that keeps your authority active."
                </p>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-signal-gold shadow-lg flex items-center space-x-3">
                  <Award size={28} className="text-authority-blue" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Veteran Owned</span>
                    <span className="text-[8px] font-bold text-text-muted uppercase">Certified Enterprise</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-border-light"></div>
                <p className="text-xs font-black uppercase tracking-widest text-text-muted">Built by operators, for operators</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-authority-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                 <BadgeCheck size={48} className="text-signal-gold mb-6" />
                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight">Regulatory Authority</h3>
                 <p className="opacity-70 font-medium leading-relaxed">
                   Our curriculum isn't based on YouTube opinions. It's derived directly from Part 390-399 of the FMCSRs. We teach you to master the law, so you don't fear it.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM SECTION - REAL FMCSA DATA */}
      <section className="py-32 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 text-red-600 bg-red-50 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
               <AlertTriangle size={16} />
               <span>Critical Industry Risk</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter">The Real Cost of <br/><span className="text-red-600 italic">Getting It Wrong</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                stat: "12 Months", 
                title: "Mandatory Audit", 
                desc: "Every new entrant carrier faces a mandatory safety audit within their first 12 months. There is no 'flying under the radar'.",
                source: "FMCSA Safety Data"
              },
              { 
                stat: "Instant Fail", 
                title: "Authority Revocation", 
                desc: "Specific critical violations (missing DQ files, lack of drug testing enrollment) trigger automatic failure and immediate deactivation.",
                source: "FMCSR Part 385 App. B"
              },
              { 
                stat: "20%", 
                title: "Survival Rate", 
                desc: "One in five new motor carrier authorities shut down permanently in their first year due to preventable compliance failures.",
                source: "FMCSA Safety Data"
              }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-slate-50 dark:bg-surface-dark rounded-[3.5rem] border border-border-light dark:border-border-dark group hover:border-red-200 transition-all flex flex-col">
                <div className="text-5xl font-black text-authority-blue dark:text-white mb-6 group-hover:text-red-600 transition-colors">{item.stat}</div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-4">{item.title}</h4>
                <p className="text-text-muted font-medium leading-relaxed mb-10 flex-grow">{item.desc}</p>
                <div className="pt-8 border-t border-border-light text-[9px] font-black uppercase tracking-widest text-text-muted/60 flex items-center">
                  <Info size={12} className="mr-1.5" /> (Source: {item.source})
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE SOLUTION - WHAT YOU GET */}
      <section className="py-32 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-7xl font-black font-serif tracking-tighter mb-4 leading-none">What You Get</h2>
              <p className="text-xl text-white/70 font-medium">A complete operational toolkit. No fluff, just technical deliverables.</p>
            </div>
            <Link to="/learning-path" className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all flex items-center shadow-2xl active:scale-95">
              View Path <ArrowRight className="ml-3" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BookOpen />, title: "8-Module Framework", desc: "Step-by-step video training on the technical compliance pillars of a US Motor Carrier." },
              { icon: <FileText />, title: "DQ File Templates", desc: "Ready-to-use Driver Qualification files that meet 100% of Part 391 requirements." },
              { icon: <Wrench />, title: "Maintenance Tracking", desc: "Systematic maintenance log templates and mandatory periodic inspection trackers." },
              { icon: <CheckCircle2 />, title: "Audit Preparation", desc: "The exact checklist auditors use, allowing you to perform a pre-audit on your own files." },
              { icon: <Zap />, title: "Lifetime Access", desc: "Regulations change. We update our materials constantly. You keep access to new data forever." },
              { icon: <Shield />, title: "Authority Protection", desc: "Proven strategies to protect your MC number from predatory violations and phishing scams." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                <div className="text-signal-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENCY SECTION - OUR COMMITMENT */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 dark:bg-surface-dark p-16 md:p-24 rounded-[4rem] border-2 border-dashed border-border-light text-center relative shadow-inner">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-primary-dark p-5 rounded-full border border-border-light shadow-xl">
               <Zap className="text-signal-gold" size={36} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black font-serif mb-10 text-authority-blue">Our Commitment</h2>
            <div className="space-y-8 text-xl text-text-muted leading-relaxed font-medium">
              <p>
                We're a new educational platform built on <span className="text-authority-blue font-black underline decoration-signal-gold decoration-2 underline-offset-4">15+ years of combined industry experience.</span>
              </p>
              <p>
                We don't have 500 students yet. What we do have is accurate, audit-tested methodology. If you're looking for hype, this isn't it. If you want to build correctly from day one, you're in the right place.
              </p>
              <div className="pt-10 flex flex-wrap justify-center gap-6">
                 <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl border border-border-light shadow-sm">
                    <BarChart3 className="text-authority-blue" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-authority-blue">Data-First</span>
                 </div>
                 <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl border border-border-light shadow-sm">
                    <ShieldCheck className="text-green-600" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-authority-blue">Audit-Tested</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INVESTMENT SECTION - 3 TIERS WITH SALE PRICING */}
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
                  "Complete 8-module compliance framework",
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
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[10px] px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
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

          {/* Guarantee Banner */}
          <div className="bg-white dark:bg-primary-dark p-12 lg:p-20 rounded-[4rem] border-4 border-signal-gold/30 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-signal-gold/5 rounded-full -translate-y-24 translate-x-24"></div>
             <ShieldCheck size={64} className="text-signal-gold mx-auto mb-10 animate-float" />
             <h3 className="text-3xl lg:text-5xl font-black font-serif mb-6 leading-tight">30-Day Money-Back Guarantee</h3>
             <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium">
               "If our system doesn't help you build audit-ready files, we refund 100%. We stand behind our methodology because it's based on the law, not opinion."
             </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-40 bg-authority-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal-gold opacity-5 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <h2 className="text-5xl lg:text-8xl font-black font-serif tracking-tighter mb-12">Launch Securely. <br/>From <span className="text-signal-gold italic">Day One.</span></h2>
           <Link to="/pricing" className="inline-flex items-center space-x-5 bg-white text-authority-blue px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:bg-signal-gold transition-all shadow-2xl group active:scale-95">
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
