import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Anchor, 
  Clock, 
  Users, 
  History,
  Scale,
  Briefcase,
  Shield,
  Gavel,
  XCircle,
  CheckCircle2
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
  }, []);

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 transition-colors selection:bg-authority-blue/10">
      
      {/* 1. HERO: ESTABLISHED WITH UNDERSTANDING */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-40 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_0.5px,transparent_0.5px)] [background-size:32px:32px] opacity-[0.03]"></div>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-reveal-up legibility-container">
            <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.85]">
              BUILT ON WISDOM. <br/>
              <span className="text-signal-gold italic">ESTABLISHED</span> <br/>
              WITH UNDERSTANDING.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold max-w-xl leading-relaxed">
              Compliance-first guidance for owner-operators who want to build something that lasts.
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              <Link to="/readiness" className="inline-flex items-center space-x-4 bg-authority-blue text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group border-b-8 border-slate-900">
                <span>Begin Diagnosis Sequence</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="bg-slate-50 dark:bg-surface-dark border-8 border-white dark:border-border-dark rounded-[4rem] shadow-2xl overflow-hidden aspect-[4/5] relative group">
               <img 
                 src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                 alt="LaunchPath Founder" 
                 className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-1000 object-top"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-authority-blue via-transparent to-transparent opacity-60"></div>
               <div className="absolute bottom-10 left-10">
                  <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.5em] mb-2">Founder & Lead Advisor</p>
                  <p className="text-2xl font-black text-white uppercase tracking-tight">Vince Lawrence</p>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-signal-gold p-8 rounded-3xl shadow-2xl border-4 border-white dark:border-surface-dark transform hover:rotate-12 transition-transform cursor-default">
               <ShieldCheck size={48} className="text-authority-blue" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE STORY: WHY LAUNCHPATH EXISTS */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-[700px] mx-auto px-6 space-y-16">
          <div className="text-center space-y-6">
            <p className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-400">THE GENESIS</p>
            <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Why LaunchPath <span className="text-signal-gold italic">Exists.</span></h2>
          </div>
          
          <div className="space-y-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            <p>
              LaunchPath didn’t begin as a business idea. It began as a <span className="text-authority-blue dark:text-white font-black">pause.</span>
            </p>
            <p>
              I had the technical knowledge. I understood systems, compliance, responsibility, and risk. From the outside, starting a trucking operation made sense. But what stopped me wasn’t fear or lack of information—it was alignment.
            </p>
            
            <div className="p-10 bg-slate-50 dark:bg-white/5 rounded-[3rem] border-l-8 border-signal-gold my-12 shadow-inner">
              <p className="text-2xl md:text-3xl font-black italic font-serif text-authority-blue dark:text-white leading-tight mb-0">
                "What a business produces is a reflection of what’s been formed inside the person building it."
              </p>
            </div>

            <p>
              In trucking, I watched capable, motivated people produce chaos, stress, and short-lived success—not because they were careless, but because they were trained with the wrong deposits early on: urgency over understanding, shortcuts over structure, and noise over wisdom.
            </p>
            <p>
              I didn’t stop because I couldn’t build. I stopped because I refused to build something that wasn’t <span className="text-authority-blue dark:text-white font-black italic">established.</span> Instead of asking “How fast can I start?” I asked a different question: <strong>What must be true before I do?</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUILT ON FACTUAL EXPERIENCE */}
      <section className="py-24 md:py-48 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 legibility-container mx-0">
              <div className="space-y-6">
                <p className="text-[12px] font-black uppercase tracking-[0.5em] text-signal-gold">THE ANCHOR</p>
                <h2 className="text-5xl md:text-7xl font-black font-serif uppercase leading-[0.9] tracking-tighter">
                  BUILT ON <br/><span className="text-signal-gold italic">FACTUAL</span> <br/>EXPERIENCE.
                </h2>
              </div>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-xl">
                LaunchPath is the distillation of over two decades of high-stakes operational governance. We treat your authority with the same clinical precision I used for major institutional manufacturing fleets.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { label: "20+ YEARS", sub: "FEDERAL COMPLIANCE MANAGEMENT", icon: <Clock size={20} /> },
                  { label: "U.S. NAVY", sub: "VETERAN (HONORABLE)", icon: <Anchor size={20} /> },
                  { label: "OSHA-CERTIFIED", sub: "SAFETY COORDINATION", icon: <ShieldCheck size={20} /> },
                  { label: "1,200+ STAFF", sub: "RISK MITIGATION OVERSIGHT", icon: <Users size={20} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-signal-gold group-hover:bg-white/10 transition-all shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">{item.label}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 leading-relaxed mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="bg-[#020617] p-12 md:p-16 rounded-[4rem] border-b-[12px] border-signal-gold shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                   <Briefcase size={200} />
                </div>
                <div className="relative z-10 space-y-12">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold">MASTER CUSTODIAN ID: LP-VLAW-01</h3>
                   <div className="space-y-6">
                      <p className="text-2xl font-black font-serif uppercase tracking-tight text-white italic">"You do not rise to the level of ambition. You fall to the level of preparation."</p>
                      <div className="h-1 w-20 bg-signal-gold"></div>
                   </div>
                   <p className="text-white/60 font-medium leading-relaxed italic mb-0">
                     "That is why LaunchPath is deliberate, structured, and sometimes uncomfortable. It asks people to slow down, count the cost, and confront reality early—because reality always collects its debt."
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. A KINGDOM STEWARDSHIP PHILOSOPHY */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12 legibility-container mx-0">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold">
                  <Anchor size={20} />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">STEWARDSHIP ETHIC</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase leading-[0.9] tracking-tighter">
                  A KINGDOM <br/><span className="text-signal-gold italic">STEWARDSHIP</span> <br/>PHILOSOPHY.
                </h2>
              </div>
              <div className="space-y-8">
                <p className="text-2xl font-black font-serif text-authority-blue dark:text-white italic leading-tight">
                  “A good person produces good things from the treasury of a good heart…” <br/>— Luke 6:45
                </p>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-0">
                  What a business produces over time reflects what was deposited at the beginning—its training, systems, discipline, and standards. LaunchPath exists to help operators make the right deposits early.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { title: "ENTRUSTED ASSETS", desc: "We view operating authority as an entrusted function to be managed with integrity." },
                { title: "SYSTEMIC ORDER", desc: "Stability is an absolute prerequisite to commercial fleet growth." },
                { title: "RADICAL TRUTH", desc: "We prioritize technical accuracy over speculative revenue promises." },
                { title: "DISCIPLINED RESTRAINT", desc: "Clarity before commitment. Compliance before acceleration." }
              ].map((item, i) => (
                <div key={i} className="space-y-6 p-10 bg-slate-50 dark:bg-surface-dark rounded-[3rem] border border-slate-100 dark:border-border-dark group hover:shadow-xl transition-all">
                  <h4 className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">{item.title}</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed uppercase tracking-tighter mb-0">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYSTEMATIC PROTECTION: THE STANDARDS */}
      <section className="py-24 md:py-48 bg-slate-50 dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <p className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-400">THE STANDARD</p>
            <h2 className="text-6xl md:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
              SYSTEMATIC <br/><span className="text-signal-gold italic">PROTECTION.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 max-w-[1000px] mx-auto">
            {/* The Reactive Trap */}
            <div className="bg-white dark:bg-primary-dark p-12 md:p-16 rounded-[4rem] border-t-[12px] border-red-500 shadow-xl relative flex flex-col group">
              <div className="absolute top-10 right-10 opacity-10">
                <XCircle size={64} className="text-red-500" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-8">THE "WINGING IT" TRAP</p>
              <h3 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-12">THE <br/><span className="text-red-600">REACTIVE</span> <br/>TRAP.</h3>
              <ul className="space-y-8 flex-grow">
                {[
                  { l: "Reactive Filing", r: "Violations" },
                  { l: "Audit Scrambling", r: "Deactivation" },
                  { l: "Messy Records", r: "Volatility" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-slate-400">
                    <div className="flex items-center">
                      <XCircle size={18} className="text-red-500 mr-4" />
                      <span>{item.l}</span>
                    </div>
                    <ArrowRight size={14} className="mx-4 opacity-30" />
                    <span className="text-slate-800 dark:text-slate-200">{item.r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Proactive Standard */}
            <div className="bg-authority-blue p-12 md:p-16 rounded-[4rem] border-t-[12px] border-signal-gold shadow-2xl relative flex flex-col group overflow-hidden text-white">
              <div className="absolute top-10 right-10 opacity-20">
                <CheckCircle2 size={64} className="text-signal-gold" />
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold mb-8">THE SYSTEM OF ORDER</p>
              <h3 className="text-4xl font-black font-serif uppercase tracking-tight mb-12">THE <br/><span className="text-signal-gold">PROACTIVE</span> <br/>STANDARD.</h3>
              <ul className="space-y-8 flex-grow">
                {[
                  { l: "Pre-Launch Installation", r: "System Control" },
                  { l: "Audit-Ready Posture", r: "Operational Certainty" },
                  { l: "Clinical Transparency", r: "Insurance Continuity" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm font-black uppercase tracking-widest text-white/40">
                    <div className="flex items-center">
                      <CheckCircle2 size={18} className="text-signal-gold mr-4" />
                      <span>{item.l}</span>
                    </div>
                    <ArrowRight size={14} className="mx-4 opacity-30" />
                    <span className="text-white">{item.r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-24 text-center legibility-container">
             <p className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase leading-tight italic">
               “By wisdom a house is built, and through understanding it is established.” <br/>— Proverbs 24:3–4
             </p>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER VERIFICATION BIO */}
      <section className="py-24 md:py-48 bg-[#020617] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 space-y-12">
               <div className="relative group">
                 <div className="bg-white/5 border-4 border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                   <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                   />
                 </div>
                 <div className="absolute -bottom-6 -right-6 bg-signal-gold p-6 rounded-3xl shadow-xl border-4 border-[#020617] group-hover:rotate-12 transition-transform">
                   <Award size={40} className="text-authority-blue" />
                 </div>
               </div>
               <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">CORE CREDENTIALS</h4>
                 {[
                   { icon: <Clock size={16} />, text: "20+ YEAR TENURE" },
                   { icon: <ShieldCheck size={16} />, text: "OSHA CERTIFIED" },
                   { icon: <Gavel size={16} />, text: "FED COMPLIANCE EXPERT" },
                   { icon: <Users size={16} />, text: "U.S. NAVY VETERAN" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 p-5 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                       <div className="text-signal-gold">{item.icon}</div>
                       <span className="text-[11px] font-black uppercase tracking-[0.25em]">{item.text}</span>
                    </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16 legibility-container mx-0">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-6 py-2.5 rounded-full">
                  <ShieldCheck size={14} className="text-signal-gold" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">INSTITUTIONAL BIOGRAPHY // VL-20Y-CERT</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-serif uppercase tracking-tighter leading-none">
                  FOUNDER <br/><span className="text-signal-gold italic">VERIFICATION.</span>
                </h2>
              </div>

              <div className="space-y-10 text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-[700px]">
                <p>
                  Vince Lawrence is the Founder of LaunchPath and a recognized authority in industrial safety and operational governance. His background in managing large-scale federal safety standards ensures that the LaunchPath system provides carriers with the same precision required by industrial manufacturing auditors.
                </p>
                <p>
                  As an OSHA-certified safety coordinator, Lawrence applies a rigorous, veteran-led stewardship to the logistics industry. Driven by a philosophy of Kingdom Stewardship and his status as a U.S. Navy veteran, Lawrence is dedicated to establishing an institutional standard for the next generation of owner-operators—prioritizing technical accuracy over administrative speculation.
                </p>
              </div>

              <div className="p-12 border-2 border-dashed border-white/10 rounded-[3rem] text-center max-w-[700px]">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-0">MASTER STANDARD AUTHENTICATED</p>
              </div>
              
              <div className="pt-12">
                 <Link to="/readiness" className="bg-white text-authority-blue px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl hover:bg-signal-gold transition-all active:scale-95 inline-flex items-center group border-b-8 border-slate-300">
                    Request Admission Interview <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </Link>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-10">LaunchPath is selective by design. Admission begins with alignment, not payment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ANCHOR */}
      <section className="py-24 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-white/5">
         <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-300 italic">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
      </section>
    </div>
  );
};

export default AboutPage;