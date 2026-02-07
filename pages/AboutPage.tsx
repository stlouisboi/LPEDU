import React from 'react';
import { 
  Shield,
  ShieldCheck, 
  Award, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Anchor, 
  Zap, 
  XCircle, 
  ShieldAlert,
  FileText,
  Briefcase,
  Activity,
  UserCheck,
  ChevronRight,
  Fingerprint,
  Gavel,
  History,
  Lock,
  Bookmark,
  Scale as ScaleIcon,
  Ban,
  Gavel as GavelIcon,
  AlertOctagon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-1000 overflow-x-hidden transition-colors selection:bg-authority-blue/10">
      
      {/* SECTION 1: FOUNDER HERO (Built on Factual Experience) */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-[#0c1a2d] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          <div className="lg:col-span-5 relative group">
            <div className="bg-[#1e3a5f] rounded-[3rem] p-1.5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2">
              <img 
                src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                alt="Vince Lawrence" 
                className="w-full h-auto grayscale opacity-90 rounded-[2.8rem] transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
              />
              <div className="absolute bottom-6 left-0 w-full flex justify-center">
                 <div className="bg-authority-blue/90 backdrop-blur-md px-6 py-2.5 rounded-xl border border-white/10 shadow-2xl">
                    <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.4em]">VINCE LAWRENCE | FOUNDER</p>
                 </div>
              </div>
              <div className="absolute -bottom-4 right-8 bg-signal-gold p-4 rounded-xl shadow-2xl z-20 group-hover:rotate-12 transition-transform duration-500">
                <Bookmark className="text-authority-blue fill-current" size={28} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">WHO'S BEHIND LAUNCHPATH</p>
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black font-serif leading-[0.85] uppercase tracking-tighter">
                BUILT ON <br/>FACTUAL <br/><span className="text-signal-gold">EXPERIENCE.</span>
              </h1>
            </div>

            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl shadow-inner backdrop-blur-md">
              <ShieldCheck size={18} className="text-signal-gold" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">Veteran-Owned Business</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: <Briefcase size={20} />, text: "25+ Years Manufacturing & Operations Leadership" },
                { icon: <Shield size={20} />, text: "OSHA-Certified Safety Coordinator" },
                { icon: <Activity size={20} />, text: "Federal Compliance Background" },
                { icon: <UserCheck size={20} />, text: "Stewardship-First Approach" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl transition-all duration-300 hover:bg-white/[0.07] hover:border-white/10 group/item">
                  <div className="shrink-0 text-signal-gold group-hover/item:scale-110 transition-transform duration-300">{item.icon}</div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-white/70 leading-tight group-hover/item:text-white transition-colors">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 max-w-2xl">
              <p className="text-lg text-white/60 font-medium leading-relaxed italic">
                LaunchPath was developed from direct experience watching motor carriers fail due to a lack of systems rather than a lack of effort. Our mission is to standardize administrative order for the modern owner-operator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT LAUNCHPATH IS */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">WHAT LAUNCHPATH IS</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-authority-blue dark:text-white leading-relaxed tracking-tight">
            LaunchPath is a 90-day compliance education system for new interstate motor carriers. We teach owner-operators how to build documentation systems that satisfy federal auditors and insurance underwriters — before mistakes become violations.
          </h2>
          <div className="h-1.5 w-24 bg-signal-gold mx-auto rounded-full"></div>
        </div>
      </section>

      {/* SECTION 3: THE STANDARD (Systematic Protection) */}
      <section className="py-24 lg:py-40 bg-[#0c1a2d] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-authority-blue/20 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="text-center mb-24 space-y-4 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">THE STANDARD</p>
            <h2 className="text-4xl sm:text-7xl font-black font-serif uppercase tracking-tighter leading-none">
              SYSTEMATIC PROTECTION.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            <div className="bg-[#1e3a5f]/20 border border-red-500/10 rounded-[3.5rem] p-10 md:p-16 space-y-12 relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(239,68,68,0.15)] transition-all duration-700">
               <div className="absolute top-0 left-0 w-full h-2 bg-red-500 shadow-[0_2px_10px_rgba(239,68,68,0.5)]"></div>
               <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">DISJOINTED OPERATIONS</h4>
                    <p className="text-sm font-bold text-white/40">The reactive approach to compliance.</p>
                  </div>
                  <XCircle size={32} className="text-red-500/30 group-hover:text-red-500 transition-colors duration-500" />
               </div>
               <ul className="space-y-6">
                  {[
                    "Fixing safety files only after incidents occur",
                    "Skipping mandatory DOT documentation for equipment maintenance",
                    "Delaying audit preparation until federal notification",
                    "Triggering insurance volatility through fragmented records"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start group/li transition-all duration-300">
                      <XCircle className="text-red-500/50 mr-5 mt-1 shrink-0 group-hover/li:scale-110 transition-transform" size={20} />
                      <span className="text-base font-medium text-white/70 group-hover/li:text-white transition-colors">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="bg-authority-blue border border-signal-gold/10 rounded-[3.5rem] p-10 md:p-16 space-y-12 relative overflow-hidden group shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] hover:shadow-[0_80px_150px_-30px_rgba(198,146,42,0.15)] transition-all duration-700 hover:-translate-y-2">
               <div className="absolute top-0 left-0 w-full h-2 bg-signal-gold shadow-[0_2px_10px_rgba(198,146,42,0.5)]"></div>
               <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold mb-2">THE LAUNCHPATH STANDARD</h4>
                    <p className="text-sm font-bold text-white/40">The proactive system of order.</p>
                  </div>
                  <CheckCircle2 size={32} className="text-signal-gold/30 group-hover:text-signal-gold transition-colors duration-500" />
               </div>
               <ul className="space-y-6">
                  {[
                    "Installing integrated safety systems before launch",
                    "Executing federally-aligned DQ workflows daily",
                    "Maintaining an audit-ready posture through continuous discipline",
                    "Establishing insurer trust through transparent record keeping"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start group/li transition-all duration-300">
                      <CheckCircle2 className="text-signal-gold mr-5 mt-1 shrink-0 group-hover/li:scale-110 transition-transform" size={20} />
                      <span className="text-base font-bold text-white group-hover/li:text-signal-gold transition-colors">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: KINGDOM STEWARDSHIP PHILOSOPHY */}
      <section className="py-24 lg:py-40 bg-[#0c1a2d] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full shadow-lg">
                <Anchor size={16} className="text-signal-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">STEWARDSHIP ETHIC</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tighter leading-[0.95]">
                A KINGDOM <br/><span className="text-signal-gold">STEWARDSHIP</span> <br/>PHILOSOPHY.
              </h2>
              <p className="text-lg text-white/50 font-medium leading-relaxed max-w-md">
                We view operating authority as an entrusted function. We move carriers from a state of exposure to a state of refuge through documented evidence of discipline. LaunchPath is built on timeless principles of wisdom, order, and stewardship — not trends, hype, or shortcuts.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "ENTRUSTED AUTHORITY", desc: "Federal authority is a responsibility to be managed, not a right to be abused." },
                { title: "INTEGRITY AS CURRENCY", desc: "We treat documentation with precision because auditors value accuracy above all." },
                { title: "RADICAL ACCOUNTABILITY", desc: "We execute the right work even when no one is inspecting our files." },
                { title: "DISCIPLINED RESTRAINT", desc: "Stability is an absolute prerequisite to commercial fleet growth." }
              ].map((card, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6 hover:bg-white/[0.08] transition-all group shadow-xl">
                   <h4 className="text-lg font-black uppercase tracking-tight text-signal-gold group-hover:scale-105 transition-transform origin-left">{card.title}</h4>
                   <p className="text-base text-white/60 font-medium leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT WE ARE NOT (Boundaries) */}
      <section className="py-24 lg:py-48 bg-authority-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-20 relative z-10">
          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">BOUNDARIES</p>
             <h2 className="text-4xl sm:text-8xl font-black font-serif uppercase tracking-tight leading-none">WHAT WE <br/><span className="text-white/20">ARE NOT.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "LEGAL ADVICE", icon: <Ban size={24} />, desc: "LaunchPath is an educational entity. We do not provide legal representation or regulatory defense." },
              { title: "DISPATCH SERVICES", icon: <ArrowRight size={24} />, desc: "We teach you how to choose loads based on risk factors, but we do not broker or dispatch freight." },
              { title: "INSURANCE BROKERAGE", icon: <Ban size={24} />, desc: "We build safety files that insurers love, but we do not sell policies or negotiate individual rates." }
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[4rem] text-left space-y-10 group hover:bg-white/[0.08] transition-all duration-700 shadow-2xl backdrop-blur-xl hover:-translate-y-2">
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-signal-gold shadow-inner group-hover:bg-signal-gold group-hover:text-authority-blue transition-all duration-500">
                    {card.icon}
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-2xl font-black uppercase tracking-tight text-signal-gold border-b border-white/10 pb-6 group-hover:border-signal-gold/40 transition-colors">{card.title}</h4>
                    <p className="text-lg text-white/70 font-medium leading-relaxed group-hover:text-white transition-colors">{card.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FOUNDER VERIFICATION (Institutional Biography) */}
      <section className="py-24 lg:py-48 bg-[#0c1a2d] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#020617] rounded-[4rem] p-12 lg:p-24 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] relative overflow-hidden border border-white/5 group/bio">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-authority-blue pointer-events-none group-hover/bio:scale-110 transition-transform duration-1000">
              <ScaleIcon size={320} />
            </div>
            
            <div className="relative z-10 space-y-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-3 bg-authority-blue text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/5">
                    <ShieldCheck size={16} className="text-signal-gold" />
                    <span>INSTITUTIONAL BIOGRAPHY // VL-20Y-CERT</span>
                  </div>
                  <h3 className="text-5xl lg:text-[5.5rem] font-black font-serif uppercase tracking-tighter leading-none">FOUNDER <br/><span className="text-signal-gold italic">VERIFICATION.</span></h3>
                </div>
                <div className="text-left md:text-right space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/20">ISSUE REGISTRY</p>
                   <p className="text-sm font-mono font-bold text-white/40">NC-2025-LP-STND</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 space-y-10">
                  <div className="prose prose-xl prose-invert max-w-none space-y-10">
                    <p className="text-white/80 font-bold leading-relaxed text-lg sm:text-2xl">
                      Vince Lawrence is the Founder of LaunchPath and a recognized authority in industrial safety and operational governance. His professional tenure encompasses over two decades of manufacturing leadership, including roles as Supervisor and Business Unit Manager. 
                    </p>
                    <p className="text-white/50 font-medium leading-relaxed text-base sm:text-lg">
                      As an OSHA-certified safety coordinator, Lawrence developed high-stakes safety protocols that now serve as the structural foundation for LaunchPath’s "Compliance Backbone" and "Insurance Continuity" pillars. Bridging the gap between industrial safety and motor carrier compliance, he applies a rigorous, veteran-led stewardship to the logistics industry. 
                    </p>
                    <p className="text-white/50 font-medium leading-relaxed text-base sm:text-lg">
                      His background in managing large-scale federal safety standards ensures that the LaunchPath system provides carriers with the same precision required by industrial manufacturing auditors. Driven by a philosophy of Kingdom Stewardship and his status as a U.S. Navy veteran, Lawrence is dedicated to establishing an institutional standard for the next generation of owner-operators—prioritizing technical accuracy over administrative speculation.
                    </p>
                  </div>
                  
                  <div className="pt-12 border-t border-white/5 flex flex-wrap gap-10 items-center opacity-30">
                    {["VETERAN-LED STEWARDSHIP", "OSHA SAFETY STANDARD", "AUDIT-VERIFIED LOGIC"].map((label, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-signal-gold"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-12">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">CORE CREDENTIALS</h4>
                      <div className="space-y-3">
                         {[
                           { icon: <History size={16} />, t: "20+ YEAR TENURE" },
                           { icon: <Shield size={16} />, t: "OSHA CERTIFIED" },
                           { icon: <Gavel size={16} />, t: "FED COMPLIANCE EXPERT" },
                           { icon: <Fingerprint size={16} />, t: "U.S. NAVY VETERAN" }
                         ].map((cred, i) => (
                           <div key={i} className="flex items-center space-x-4 p-5 bg-white/[0.03] rounded-2xl border border-white/10 group/item hover:bg-white/[0.07] transition-all">
                              <div className="text-signal-gold group-hover/item:scale-110 transition-transform">{cred.icon}</div>
                              <span className="text-xs font-black uppercase tracking-widest">{cred.t}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="p-10 bg-white/[0.03] rounded-[2.5rem] border border-dashed border-white/10 text-center space-y-6">
                      <div className="flex justify-center">
                        <Logo light={true} className="h-10 grayscale opacity-40" />
                      </div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">MASTER STANDARD <br/>AUTHENTICATED</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INSTITUTIONAL SCOPE (Foundation of Truth) */}
      <section className="py-24 lg:py-48 bg-[#fafaf9] dark:bg-primary-dark transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">INSTITUTIONAL SCOPE</p>
            <h2 className="text-5xl sm:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
              THE FOUNDATION OF <span className="text-signal-gold">TRUTH.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Shield size={28} className="text-authority-blue dark:text-signal-gold" />, 
                title: "TRUTH", 
                desc: "We prioritize technical regulatory accuracy over speculative revenue promises and marketing hype." 
              },
              { 
                icon: <Scale size={28} className="text-authority-blue dark:text-signal-gold" />, 
                title: "BOUNDARIES", 
                desc: "We enforce a clear separation between systematic educational guidance and specific legal advice." 
              },
              { 
                icon: <Target size={28} className="text-authority-blue dark:text-signal-gold" />, 
                title: "STEWARDSHIP", 
                desc: "We treat carrier operations as high-value legacy assets entrusted to the care of the owner-operator." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-16 rounded-[4rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 flex flex-col h-full group">
                <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-12 shadow-inner group-hover:scale-110 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-8 font-serif leading-none">{card.title}</h3>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: READY TO BEGIN? (CTA) */}
      <section className="py-32 lg:py-56 bg-white dark:bg-primary-dark border-t border-slate-100 dark:border-white/5 overflow-hidden transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">READY TO <span className="text-signal-gold italic">BEGIN?</span></h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
              Choose your next step in the LaunchPath verification sequence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link 
              to="/readiness" 
              className="w-full sm:w-auto bg-authority-blue text-white px-14 py-8 rounded-[2.8rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center justify-center border-b-8 border-slate-900 group"
            >
              TAKE THE REACH TEST™
              <ArrowRight size={22} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/learning-path" 
              className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-authority-blue/20 dark:border-white/10 text-authority-blue dark:text-white px-14 py-8 rounded-[2.8rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center shadow-lg"
            >
              VIEW THE PROGRAM
            </Link>
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 mt-20 italic">
            END OF INSTITUTIONAL STATEMENT — REVISION V4.2
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;