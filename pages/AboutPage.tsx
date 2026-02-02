import React from 'react';
import { 
  Shield,
  ShieldCheck, 
  Award, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Scale, 
  BarChart3, 
  Globe, 
  Mail, 
  Calendar, 
  Download,
  BookOpen,
  Anchor,
  User,
  Star,
  Zap,
  TrendingDown,
  Quote,
  Briefcase,
  FileText,
  Activity,
  UserCheck,
  ClipboardCheck,
  Search,
  Lock,
  Compass,
  AlertTriangle,
  XCircle,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InstitutionalBadge = ({ icon: Icon, label, variant = 'gold' }: { icon: any, label: string, variant?: 'gold' | 'blue' }) => (
  <div className={`inline-flex items-center space-x-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-sm border ${
    variant === 'gold' 
      ? 'bg-white/5 border-white/20' 
      : 'bg-authority-blue/10 border-authority-blue/20'
  }`} role="img" aria-label={label}>
    <Icon size={16} className={variant === 'gold' ? 'text-[#D4AF37]' : 'text-authority-blue'} fill={Icon === Award ? "currentColor" : "none"} aria-hidden="true" />
    <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap ${
      variant === 'gold' ? 'text-white' : 'text-authority-blue'
    }`}>{label}</span>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 overflow-x-hidden transition-colors">
      
      {/* SECTION 1: PURPOSE */}
      <section className="relative bg-[#F8F9FA] dark:bg-surface-dark py-20 lg:py-40 border-b border-slate-200 dark:border-border-dark overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" aria-hidden="true"></div>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10 shadow-sm">
            <Scale size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Institutional Statement LP-ST-01</span>
          </div>
          <h1 id="about-intro" className="text-4xl sm:text-6xl lg:text-[8rem] font-black text-[#1A1A1A] dark:text-white leading-[0.85] mb-10 font-sans uppercase tracking-tighter">
            The Standard <br/><span className="text-signal-gold italic">LaunchPath</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-slate-700 dark:text-text-dark-muted max-w-[850px] mx-auto mb-12 font-extrabold">
            LaunchPath is a systematic framework for documentation integrity and safety management systems. We bridge the administrative gap between authority registration and federal oversight.
          </p>
          
          <div className="p-10 sm:p-14 bg-white dark:bg-primary-dark border-2 border-slate-100 dark:border-border-dark rounded-[3rem] shadow-xl max-w-3xl mx-auto relative group">
             <div className="absolute -top-6 -left-6 bg-signal-gold p-4 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
               <ShieldCheck className="text-white" size={32} />
             </div>
             <p className="text-[#1E3A5F] dark:text-signal-gold text-xl sm:text-2xl lg:text-3xl font-black leading-relaxed italic">
               "Operating authority is a stewardship function. Compliance is the documented proof that you are managing it with integrity."
             </p>
          </div>
        </div>
      </section>

      {/* REACTIVE VS ALIGNMENT */}
      <section className="bg-white dark:bg-primary-dark py-24 lg:py-40 border-b border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center lg:text-left">
            <p className="text-[13px] sm:text-sm font-black uppercase tracking-[0.5em] text-[#1E3A5F] dark:text-signal-gold mb-6">IMPLEMENTATION WINDOW</p>
            <p className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-400 dark:text-text-dark-muted uppercase leading-[1.1] max-w-5xl tracking-tight">
              THE STANDARD IS ENGINEERED TO BE INSTALLED WITHIN THE FIRST 90 DAYS OF AUTHORITY. DESIGNED FOR EARLY IMPLEMENTATION, NOT LATER CORRECTION.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* REACTIVE */}
            <div className="space-y-10 lg:space-y-12">
              <div className="space-y-3 border-l-8 border-red-100 dark:border-red-900/20 pl-8 py-2">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-400">REACTIVE CONDITIONS</p>
                <h3 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] dark:text-white uppercase tracking-tight font-serif">Disjointed Operations</h3>
              </div>
              <ul className="space-y-8 text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 font-extrabold leading-relaxed">
                <li className="flex items-start"><XCircle className="mr-5 text-red-300 shrink-0 mt-1" size={24} />Fixes safety files only after incidents occur.</li>
                <li className="flex items-start"><XCircle className="mr-5 text-red-300 shrink-0 mt-1" size={24} />Skips DOT documentation for physical maintenance.</li>
                <li className="flex items-start"><XCircle className="mr-5 text-red-300 shrink-0 mt-1" size={24} />Delays audit preparation until federal notification.</li>
                <li className="flex items-start"><XCircle className="mr-5 text-red-300 shrink-0 mt-1" size={24} />Triggers insurance volatility via fragmented records.</li>
              </ul>
            </div>

            {/* ALIGNMENT */}
            <div className="space-y-10 lg:space-y-12">
              <div className="space-y-3 border-l-8 border-[#D4AF37] pl-8 py-2">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">STANDARD ALIGNMENT</p>
                <h3 className="text-3xl sm:text-4xl font-black text-[#1E3A5F] dark:text-white uppercase tracking-tight font-serif">Systematic Protection</h3>
              </div>
              <ul className="space-y-8 text-lg sm:text-xl lg:text-2xl text-[#1E3A5F] dark:text-text-dark-primary font-black leading-relaxed">
                <li className="flex items-start"><CheckCircle2 className="mr-5 text-[#D4AF37] shrink-0 mt-1" size={24} />Installs integrated safety systems before launch.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-5 text-[#D4AF37] shrink-0 mt-1" size={24} />Executes federally-aligned DQ workflows daily.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-5 text-[#D4AF37] shrink-0 mt-1" size={24} />Maintains audit-ready posture via consistent discipline.</li>
                <li className="flex items-start"><CheckCircle2 className="mr-5 text-[#D4AF37] shrink-0 mt-1" size={24} />Establishes insurer trust through transparent records.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GOVERNANCE & STEWARDSHIP */}
      <section className="bg-slate-50 dark:bg-surface-dark py-24 lg:py-40 border-b border-slate-100 dark:border-border-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 lg:gap-32 items-start">
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 text-[#1E3A5F] dark:text-signal-gold mb-2 mx-auto lg:mx-0 bg-white dark:bg-white/5 px-6 py-2.5 rounded-full border dark:border-white/10 shadow-sm">
                <Anchor size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Stewardship Ethic</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#1A1A1A] dark:text-white leading-[0.95] uppercase tracking-tighter font-serif">
                A Kingdom <br/><span className="text-[#D4AF37] italic">Stewardship</span> <br/>Philosophy.
              </h2>
              <p className="text-xl sm:text-2xl text-slate-700 dark:text-text-dark-muted font-extrabold leading-relaxed">
                We view operating authority as an entrusted function. We move carriers from a state of Exposure to a state of Refuge through documented evidence of discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
              {[
                { i: <Anchor />, t: "Entrusted Authority", d: "Prioritizes stewardship over ownership mindsets. Federal authority is a responsibility to be managed, not a right to be abused." },
                { i: <ClipboardCheck />, t: "Integrity as Currency", d: "Treats precise record-keeping as absolute truth. We treat documentation with precision because auditors value accuracy above all." },
                { i: <ShieldCheck />, t: "Radical Accountability", d: "Rejects shortcuts in favor of invisible discipline. We execute the right work even when no one is inspecting." },
                { i: <TrendingDown className="rotate-180" />, t: "Disciplined Restraint", d: "Builds administrative maturity before commercial expansion. Stability is an absolute prerequisite to fleet growth." }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white dark:bg-primary-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl w-fit text-[#1E3A5F] dark:text-signal-gold mb-8 group-hover:bg-authority-blue group-hover:text-white transition-colors">
                    {React.cloneElement(item.i as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#1E3A5F] dark:text-white mb-4">{item.t}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-extrabold">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE ARE NOT */}
      <section className="bg-authority-blue py-24 lg:py-44 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
             <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-8 py-3 rounded-full mb-8 backdrop-blur-md">
                <ShieldAlert size={20} className="text-signal-gold animate-pulse" />
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white">Systemic Boundaries</span>
             </div>
             <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-none mb-10">
                What We Are <br/><span className="text-signal-gold italic underline decoration-white/20 underline-offset-8">NOT.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
             {[
               { t: "Legal Advice", d: "Provides educational structure; does not represent carriers legally or provide regulatory representation." },
               { t: "Shortcut Services", d: "Enforces federal sequencing; rejects administrative workarounds or easy passes for safety audits." },
               { t: "Insurance Brokerage", d: "Develops documentation systems; does not negotiate rates, guarantee premiums, or sell policies." }
             ].map((box, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-10 lg:p-14 rounded-[4rem] backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <XCircle size={100} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-signal-gold mb-6 border-b border-white/10 pb-4">{box.t}</h3>
                  <p className="text-xl leading-relaxed text-white/80 font-extrabold">{box.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CUSTODIANSHIP (FOUNDER - LAYOUT REFINED) */}
      <section className="bg-[#0c1a2d] dark:bg-primary-dark py-24 lg:py-60 transition-all relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-authority-blue to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-20 lg:gap-24 items-start">
            
            {/* COLUMN 1: Visual Anchor & Quote Box */}
            <div className="w-full space-y-12">
              <div className="max-w-[520px] mx-auto lg:mx-0 w-full relative group">
                <div className="absolute -inset-10 bg-authority-blue/30 rounded-[5rem] blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
                <div className="bg-authority-blue dark:bg-surface-dark rounded-[4rem] shadow-2xl overflow-hidden relative border-[12px] border-[#162a44] group-hover:border-authority-blue transition-all duration-700">
                  <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince Lawrence" className="w-full h-auto grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100" />
                  <div className="absolute bottom-0 left-0 w-full bg-[#0c1a2d]/95 backdrop-blur-xl py-6 text-center border-t border-white/5">
                    <p className="text-[11px] font-black text-signal-gold uppercase tracking-[0.5em] drop-shadow-md">V. LAWRENCE | SYSTEM CUSTODIAN</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 bg-signal-gold p-6 rounded-3xl shadow-2xl group-hover:rotate-12 transition-transform hidden sm:flex z-20">
                   <ShieldCheck className="text-authority-blue" size={40} />
                </div>
              </div>

              {/* QUOTE BOX - NOW UNDER PICTURE */}
              <div className="border-l-8 border-signal-gold pl-12 space-y-6 bg-white/5 p-12 rounded-[3.5rem] shadow-inner max-w-[520px] mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4">
                <Quote className="text-signal-gold/40 mb-2" size={56} />
                <p className="italic text-white font-black leading-relaxed text-left text-2xl sm:text-3xl font-serif">
                  "We don't aim for a passing score. We aim for an operating standard that makes the federal audit an effortless reflection of your daily work."
                </p>
              </div>
            </div>

            {/* COLUMN 2: Narrative & Trust Credentials */}
            <div className="flex flex-col space-y-12 text-center lg:text-left pt-12">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-2 mx-auto lg:mx-0">
                  <Zap size={14} className="text-signal-gold" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">Registry Command: ARCHITECT</span>
                </div>
                <h2 className="text-5xl sm:text-6xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] text-white font-serif">
                  The <br/><span className="text-signal-gold italic">Architect</span> <br/>of Order.
                </h2>
              </div>
              
              <div className="space-y-12 text-xl sm:text-2xl lg:text-3xl leading-relaxed text-slate-300 font-extrabold">
                <p className="drop-shadow-sm">
                  The LaunchPath Standard is maintained by Vince Lawrence, combining high-stakes operational leadership with the technical rigor required for federal audit survival. 
                </p>
                <p className="text-slate-400 font-bold text-lg sm:text-xl leading-relaxed">
                  As an OSHA-Certified Safety Professional, he advocates for "Engineering Controls"—systematic barriers that prevent failure rather than relying on human memory. His stewardship approach treats every Motor Carrier authority as a high-value legacy asset requiring active defense through documentation.
                </p>
              </div>

              {/* TRUST BADGES - NOW UNDER LAST PARAGRAPH */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8 border-t border-white/5">
                <InstitutionalBadge icon={Award} label="U.S. Navy Veteran" variant="gold" />
                <InstitutionalBadge icon={ShieldCheck} label="OSHA-Certified" variant="gold" />
                <InstitutionalBadge icon={Target} label="Governance Expert" variant="gold" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SCOPE SECTION */}
      <section className="bg-white dark:bg-primary-dark py-24 lg:py-60 transition-colors border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center space-y-16">
          <h2 className="text-5xl sm:text-7xl lg:text-[9rem] font-black text-authority-blue dark:text-white uppercase tracking-tighter leading-none font-serif">Scope of <br/><span className="text-signal-gold italic">Education.</span></h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-slate-500 dark:text-text-dark-muted font-extrabold max-w-5xl mx-auto leading-relaxed">
            LaunchPath is an educational entity. We provide the technical structure for carriers who refuse to operate in a state of administrative exposure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pt-12">
            {[
              { i: <Shield />, t: "TRUTH", d: "Prioritizes technical regulatory accuracy over speculative revenue promises." },
              { i: <Scale />, t: "BOUNDARIES", d: "Enforces a clear separation between educational guidance and legal advice." },
              { i: <Target />, t: "STEWARDSHIP", d: "Treats carrier operations as legacy assets entrusted to the operator's care." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-primary-dark border-2 border-slate-100 dark:border-border-dark rounded-[3.5rem] p-12 shadow-sm text-left space-y-6 hover:shadow-xl transition-all">
                <div className="text-authority-blue dark:text-signal-gold p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl w-fit">{React.cloneElement(item.i as React.ReactElement, { size: 28 })}</div>
                <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight">{item.t}</h3>
                <p className="text-lg text-slate-600 text-slate-400 leading-relaxed font-extrabold">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="pt-24 sm:pt-40">
             <Link to="/readiness" className="group inline-flex items-center justify-center bg-authority-blue text-white px-16 py-8 sm:px-24 sm:py-10 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[12px] sm:text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-[12px] border-slate-900">
               <span>INITIATE ADMISSION PROTOCOL</span>
               <ArrowRight size={20} className="ml-6 group-hover:translate-x-2 transition-transform" />
             </Link>
             <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-600 mt-20 max-w-2xl mx-auto italic">
               END OF INSTITUTIONAL STATEMENT — SUBJECT TO PERIODIC REVIEW.
             </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#020617] py-16 border-t border-white/5 text-center text-white/30 text-[11px] sm:text-[13px] font-black uppercase tracking-widest">
        <p>© {new Date().getFullYear()} LaunchPath EDU • Operational Stewardship Standard</p>
      </footer>
    </div>
  );
};

export default AboutPage;