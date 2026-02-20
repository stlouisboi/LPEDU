// AboutPage.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Gavel,
  Briefcase,
  Shield,
  CheckCircle2,
  XCircle,
  Lock,
  BookOpen,
  FileText,
  Scale,
  Users,
  Clock,
  ShieldX,
  Award
} from 'lucide-react';

/**
 * AboutPage: The institutional doctrine and operating standard of LaunchPath.
 * Version: 3.0 (Complete Spec Implementation)
 */
const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "Doctrine | LaunchPath Transportation Education";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'The operating doctrine of LaunchPath. An institutional standard for new motor carriers who build their authority on the principle of governance before growth.');
  }, []);

  const doctrinePrinciples = [
    "Structure precedes survival.",
    "Authority without governance collapses.",
    "Compliance, insurance, and cash flow are interdependent systems.",
    "Standards exist to prevent collapse, not to accommodate comfort.",
    "Systems must be built before scale is pursued.",
    "Diagnostics precede instruction.",
    "Teaching without enforcement is negligence.",
    "Stewardship requires saying no.",
    "Responsibility outweighs enrollment.",
    "Survival before scale. Discipline before ambition. Governance before freedom."
  ];

  const doctrineMap = [
    { principle: "Structure precedes survival", mechanism: "Four Pillars Framework", icon: <Scale/> },
    { principle: "Authority without governance collapses", mechanism: "Complete Dossier", icon: <FileText/> },
    { principle: "Interdependent systems", mechanism: "Interdependence Logic Protocol", icon: <Users/> },
    { principle: "Diagnostics precede instruction", mechanism: "REACH Test™", icon: <Clock/> },
    { principle: "Teaching without enforcement is negligence", mechanism: "Admission Gates + Verification", icon: <ShieldCheck/> },
    { principle: "Stewardship requires saying no", mechanism: "Ground 0 GO / WAIT / NO-GO", icon: <Gavel/> },
    { principle: "Responsibility outweighs enrollment", mechanism: "No Hype, No Guarantees, No Rush", icon: <ShieldX/> },
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans border-t border-white/5">
      
      {/* HERO SECTION - The Premise */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] via-[#C5A059]/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-10 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059]"></span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Institutional Registry</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
              
              {/* PRIORITY 1: MISSION STATEMENT (AFTER HEADING) */}
              <div className="bg-signal-gold/10 border-l-4 border-signal-gold p-6 rounded-r-2xl mt-8">
                <p className="text-lg md:text-xl text-white font-bold leading-relaxed">
                  Our mission is to prevent early carrier failure by installing institutional governance for new FMCSA authorities before they scale.
                </p>
              </div>
            </div>

            <div className="space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <p className="font-bold text-white">
                This is an institutional operating standard for new motor carriers, not a course or coaching program.
              </p>
              <p>
                LaunchPath applies to new authorities (1-3 units) inside the 18-month New Entrant window. The standard exists to prevent terminal failure from authority revocation, insurance lapse, and cash-flow asphyxiation.
              </p>
              <p>
                The standard requires compliance infrastructure before operational dispatch. This environment is a clinical system, not a motivational framework.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] bg-slate-200 relative min-h-[450px] sm:min-h-[550px] lg:min-h-0 shrink-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
            alt="Founder Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2 drop-shadow-lg">Station Custodian</p>
            <p className="text-3xl font-black text-white uppercase tracking-tight font-serif drop-shadow-2xl">Vince Lawrence</p>
            {/* PRIORITY 1: FOUNDER'S RESPONSIBILITY (ALREADY CORRECT) */}
            <p className="text-base font-bold text-white/80 mt-4 leading-relaxed drop-shadow-lg">
              My responsibility is to keep the standard clear and to refuse enrollment to carriers who are not structurally ready.
            </p>
          </div>
        </div>
      </section>

      {/* PRIORITY 2: WHY A COMPLIANCE SPECIALIST, NOT AN OPERATOR? */}
      <section className="bg-slate-100 dark:bg-black/30 py-16 md:py-24 px-6 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-3 bg-signal-gold/10 border border-signal-gold/30 px-5 py-2 rounded-full">
              <Award size={16} className="text-signal-gold" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">Credibility Statement</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#002244] dark:text-white font-serif">
              WHY A COMPLIANCE SPECIALIST, <span className="text-signal-gold italic">NOT AN OPERATOR?</span>
            </h2>
          </div>

          <div className="bg-[#002244] text-white p-8 md:p-12 rounded-3xl space-y-6 text-lg leading-relaxed">
            <p className="font-bold">
              LaunchPath is not taught by a former trucker turned coach—it's taught by a federal compliance specialist who spent 20+ years identifying the exact documentation failures that trigger authority revocation.
            </p>
            <p>
              I don't teach you how to run loads. I teach you how to survive FMCSA compliance reviews, prevent insurance cancellations, and build the documentary evidence that protects your authority.
            </p>
            <p className="text-signal-gold font-bold">
              That requires regulatory expertise, not operational experience. My lack of CDL experience is not a weakness—it's proof this is institutional compliance education, not operator coaching.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border-2 border-signal-gold/20 p-8 rounded-2xl">
            <p className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-4">Credentials</p>
            <ul className="space-y-3 text-base text-slate-700 dark:text-slate-300">
              <li className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-signal-gold flex-shrink-0 mt-1" />
                <span><strong>U.S. Navy veteran</strong> with operational leadership experience</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-signal-gold flex-shrink-0 mt-1" />
                <span><strong>OSHA-certified safety coordinator</strong> with 20+ years enforcing federal compliance standards</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-signal-gold flex-shrink-0 mt-1" />
                <span><strong>Manufacturing and safety system management</strong> in federally regulated environments</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 size={20} className="text-signal-gold flex-shrink-0 mt-1" />
                <span><strong>Systems architect</strong> who builds infrastructure that protects businesses from enforcement actions</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* THE DOCTRINE SECTION */}
      <section className="bg-[#002244] py-24 md:py-32 lg:py-40 px-6 border-b-4 border-signal-gold">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">OPERATIONAL_DOCTRINE</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-serif leading-none">
              THE LAUNCHPATH <br/><span className="text-signal-gold italic">DOCTRINE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-12">
            {doctrinePrinciples.map((principle, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>

          {/* PRIORITY 3: DOCTRINE → PRACTICE CONNECTION */}
          <div className="bg-signal-gold/10 border-2 border-signal-gold/50 p-8 rounded-3xl text-center">
            <p className="text-lg md:text-xl font-bold text-white leading-relaxed">
              These principles manifest in the LaunchPath system through <span className="text-signal-gold">Ground 0</span> (readiness verification), the <span className="text-signal-gold">Four Pillars</span> (structural framework), and the <span className="text-signal-gold">Unified File</span> (documentation architecture).
            </p>
          </div>
        </div>
      </section>

      {/* PRIORITY 2: SCRIPTURE ANCHOR (PROVERBS 21:5) */}
      <section className="bg-slate-900 py-20 md:py-32 px-6 border-b border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block bg-signal-gold/10 border border-signal-gold/30 px-5 py-2 rounded-full">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">Foundation</p>
          </div>
          
          <blockquote className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
            "The plans of the diligent lead surely to abundance, but everyone who is hasty comes only to poverty."
          </blockquote>
          
          <p className="text-lg font-black uppercase tracking-widest text-signal-gold">
            — PROVERBS 21:5
          </p>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
            <p className="text-lg text-white/80 leading-relaxed">
              LaunchPath is built on this principle: <span className="text-signal-gold font-bold">systematic preparation prevents terminal failure</span>. Haste without structure leads to loss.
            </p>
          </div>
        </div>
      </section>

      {/* DOCTRINE ENFORCEMENT SECTION */}
      <section className="py-24 md:py-32 lg:py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] text-slate-400">DOCTRINE ENFORCEMENT</p>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
              PRINCIPLE <span className="text-[#C5A059] italic">INTO PRACTICE.</span>
            </h2>
            
            {/* PRIORITY 3: PHASE ORGANIZATION CONTEXT */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              These systems are installed across <span className="font-bold text-signal-gold">Ground 0</span> (diagnostic phase) and <span className="font-bold text-signal-gold">Modules 1-6</span> (implementation phase):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctrineMap.map((item, i) => (
              <div key={i} className="bg-[#002244] rounded-3xl border border-white/5 shadow-2xl p-8 space-y-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  {React.cloneElement(item.icon, { size: 32, className: "text-[#C5A059]" })}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-serif h-12 flex items-center">{item.principle}</h3>
                <div className="h-px w-16 bg-signal-gold/30"></div>
                <p className="text-base font-bold text-[#C5A059] uppercase tracking-widest flex-grow">{item.mechanism}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIORITY 1: GROUND 0 MECHANISM SECTION */}
      <section className="bg-gradient-to-br from-signal-gold/10 to-slate-100 dark:from-signal-gold/5 dark:to-black/20 py-24 md:py-32 px-6 border-y border-signal-gold/20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <div className="inline-block bg-signal-gold/20 border-2 border-signal-gold/50 px-5 py-2 rounded-full">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">Operationalization</p>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#002244] dark:text-white font-serif">
              THE GROUND 0 <span className="text-signal-gold italic">MECHANISM.</span>
            </h2>
          </div>

          <div className="bg-[#002244] text-white p-10 md:p-16 rounded-3xl space-y-8 shadow-2xl border-l-8 border-signal-gold">
            <p className="text-xl md:text-2xl font-bold leading-relaxed">
              LaunchPath operationalizes this mission through <span className="text-signal-gold">Ground 0</span>—a 90-minute readiness briefing that may conclude with <span className="text-signal-gold">GO</span>, <span className="text-red-500">WAIT</span>, or <span className="text-red-500">NO-GO</span>.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Only <span className="text-signal-gold font-bold">GO outcomes</span> are invited into the full operating standard.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-green-900/20 border-2 border-green-500/30 p-6 rounded-2xl text-center">
                <CheckCircle2 size={32} className="text-green-500 mx-auto mb-4" />
                <p className="text-lg font-black uppercase text-green-500 mb-2">GO</p>
                <p className="text-sm text-white/70">Enter full system</p>
              </div>
              <div className="bg-yellow-900/20 border-2 border-yellow-500/30 p-6 rounded-2xl text-center">
                <Clock size={32} className="text-yellow-500 mx-auto mb-4" />
                <p className="text-lg font-black uppercase text-yellow-500 mb-2">WAIT</p>
                <p className="text-sm text-white/70">Strengthen reserves</p>
              </div>
              <div className="bg-red-900/20 border-2 border-red-500/30 p-6 rounded-2xl text-center">
                <XCircle size={32} className="text-red-500 mx-auto mb-4" />
                <p className="text-lg font-black uppercase text-red-500 mb-2">NO-GO</p>
                <p className="text-sm text-white/70">Structural deficiency</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/ground-0" 
              className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
            >
              <span>Begin Ground 0 Briefing</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CLARITY OF PURPOSE SECTION */}
      <section className="py-16 md:py-32 lg:py-40 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] text-slate-400">OPERATIONAL PARAMETERS</p>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
              CLARITY OF <span className="text-[#C5A059] italic">BOUNDARIES.</span>
            </h2>
            <div className="bg-[#002244] text-white p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl border-l-[12px] border-signal-gold">
              <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-left">
                This environment is built exclusively for executives willing to submit their operation to documented legal, operational, and insurance standards. Shortcut seekers are excluded.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 xl:gap-16">
            {[
              { 
                icon: <Gavel size={32} className="text-[#C5A059]" />, 
                title: "LEGAL BOUNDARIES",
                body: "The standard provides safety file architecture and federal regulation interpretation to prevent unauthorized practice through strict technical separation.",
                provide: ["Technical safety file architecture", "Federal regulation interpretation", "Audit-readiness verification"],
                exclude: ["Legal representation/counsel", "Courtroom defense services"]
              },
              { 
                icon: <Briefcase size={32} className="text-[#C5A059]" />, 
                title: "OPERATIONAL BOUNDARIES", 
                body: "The standard engineers governance systems that protect authority while maintaining administrative distance to preserve carrier independence.",
                provide: ["Authority protection protocols", "Preferred carrier positioning", "Systemic record governance"],
                exclude: ["Daily dispatch operations", "Direct shipper recruitment"]
              },
              { 
                icon: <Shield size={32} className="text-[#C5A059]" />, 
                title: "INSURANCE BOUNDARIES", 
                body: "The standard builds risk profiles underwriters value. It does not include policy sales, eliminating conflicts of interest in coverage procurement.",
                provide: ["Insurance continuity systems", "Underwriter evidence packages", "Risk profile optimization"],
                exclude: ["Policy binding or issuance", "Brokerage services"]
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#002244] rounded-3xl md:rounded-[4rem] border border-white/5 shadow-2xl flex flex-col group">
                <div className="p-10 md:p-12 space-y-8 flex-grow">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#C5A059] uppercase tracking-tight font-serif">{card.title}</h3>
                  </div>
                  <p className="text-base text-white/70 font-medium leading-relaxed">{card.body}</p>
                  
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Service Scope:</p>
                      <ul className="space-y-3 mt-4">
                        {card.provide.map((item, idx) => (
                          <li key={idx} className="flex items-center text-xs font-bold text-white/80 uppercase tracking-tight">
                            <CheckCircle2 size={14} className="text-emerald-500 mr-3 shrink-0" /> <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Exclusions:</p>
                      <ul className="space-y-3 mt-4">
                        {card.exclude.map((item, idx) => (
                          <li key={idx} className="flex items-center text-xs font-bold text-white/40 uppercase tracking-tight">
                            <XCircle size={14} className="text-red-500/40 mr-3 shrink-0" /> <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-24 md:py-32 lg:py-40 bg-[#FAF9F6] dark:bg-[#020617] border-t border-slate-100 dark:border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="w-20 h-20 bg-authority-blue rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <Lock size={32} className="text-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
            SUBMIT TO THE <span className="text-[#C5A059] italic">STANDARD.</span>
          </h2>
          <p className="text-lg sm:text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-2xl mx-auto">
            Structure precedes survival. Diagnostics precede instruction.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/ground-0" className="w-full sm:w-auto bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group border-b-4 border-slate-900">
              BEGIN READINESS BRIEFING <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/reach-test" className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-authority-blue/10 dark:border-white/10 text-authority-blue dark:text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center shadow-sm">
              START DIAGNOSTIC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
