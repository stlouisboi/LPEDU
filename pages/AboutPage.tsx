
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
  ShieldX
} from 'lucide-react';

/**
 * AboutPage: The institutional doctrine and operating standard of LaunchPath.
 * Version: 2.0 (Doctrine-First Refactor)
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
    { principle: "Authority without governance collapses", mechanism: "Unified Dossier", icon: <FileText/> },
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
              <p className="text-lg md:text-xl text-signal-gold font-bold uppercase tracking-widest border-l-2 border-signal-gold pl-6">
                To prevent early carrier failure by installing institutional governance within new FMCSA authorities before they scale.
              </p>
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

            <div className="relative z-10 max-w-2xl space-y-10 md:space-y-12 animate-reveal-up">
              <p className="text-xl font-serif italic text-white/80">
                "By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures."
                <br/>
                <span className="text-signal-gold">— Proverbs 24:3-4 (NIV)</span>
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
            <p className="text-base font-bold text-white/80 mt-4 leading-relaxed drop-shadow-lg">
              My responsibility is to keep the standard clear and to refuse enrollment to carriers who are not structurally ready.
            </p>
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

          <div className="grid grid-cols-1 gap-4">
            {doctrinePrinciples.map((principle, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">{principle}</p>
              </div>
            ))}
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
