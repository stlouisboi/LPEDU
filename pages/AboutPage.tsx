
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Clock, 
  Users, 
  Scale,
  Shield,
  Gavel,
  Zap,
  ShieldX,
  Target,
  FileText,
  ShieldAlert,
  ChevronRight,
  Anchor,
  BookOpen,
  CheckCircle2,
  XCircle,
  Briefcase,
  Lock
} from 'lucide-react';

/**
 * AboutPage: Institutional narrative and operational boundaries.
 */
const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
    
    // Set Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Institutional structure for new FMCSA authorities. Learn why LaunchPath exists to prevent early carrier failure through governed systems and documented standards.');
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans border-t border-white/5">
      
      {/* HERO SECTION - 60/40 EXECUTIVE ENTRANCE */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 sm:p-12 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] via-[#C5A059]/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-10 md:space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Institutional Registry</span>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
              <p className="text-lg md:text-xl text-signal-gold font-bold uppercase tracking-widest border-l-2 border-signal-gold pl-6">
                Our mission is to prevent early carrier failure by installing institutional governance for new FMCSA authorities before they scale.
              </p>
            </div>

            <div className="space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <p className="font-bold text-white">
                INSTITUTIONAL STRUCTURE FOR NEW FMCSA AUTHORITIES WHO WANT TO PREVENT EARLY FAILURE
              </p>
              
              <p>
                LaunchPath serves new motor carrier authorities (1-3 units) facing the First 90 Days. We exist to prevent terminal failure from authority revocation, insurance lapse, and cash-flow asphyxiation.
              </p>
              
              <p>
                We install compliance infrastructure before operational dispatch. This environment is a clinical operating standard, not a motivational framework.
              </p>
              
              <p>
                We engineer systematic order to ensure survival through the 18-month New Entrant window.
              </p>
            </div>

            <div className="relative z-10 max-w-2xl space-y-10 md:space-y-12 animate-reveal-up">
              <p className="text-xl font-serif italic text-white/80">
                "By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures."
                <br/>
                <span className="text-signal-gold">— Proverbs 24:3-4 (NIV)</span>
              </p>
            </div>

            <div className="space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <h2 className="text-2xl font-black font-serif text-white uppercase tracking-tighter">The Custodian's Vesting: Our Authority to Guide</h2>
              <p>
                LaunchPath Education is founded upon decades of direct, front-line experience within the complex ecosystem of commercial transportation. Our leadership has navigated the intricate regulatory landscapes, witnessed the common pitfalls that lead to carrier failure, and meticulously engineered the operational blueprints for sustained success. We are not merely educators; we are **Stationed Custodians**—vested by hard-won expertise to safeguard the integrity of new entrants into this vital industry.
              </p>
              <p>
                Our credentials are not merely academic; they are forged in the crucible of real-world operations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>**Over 20 years** of dedicated service across various facets of the trucking and logistics sector, including fleet management, compliance auditing, and safety management.</li>
                <li>Deep expertise in FMCSA, DOT, OSHA, and state-specific regulations, translating complex legal frameworks into actionable, audit-ready operational procedures.</li>
                <li>Proven track record in developing and implementing robust safety protocols, efficiency models, and risk mitigation strategies for both small and large-scale carrier operations.</li>
                <li>Experience in guiding carriers through compliance audits, post-accident investigations, and operational restructuring, transforming vulnerabilities into strengths.</li>
              </ul>
              <p>
                This comprehensive background empowers us to provide not just advice, but a **proven system**—a decision engine designed to filter out uncertainty and establish a clear path to institutional longevity.
              </p>
            </div>

            <div className="space-y-8 text-base sm:text-lg md:text-[20px] text-white/80 font-medium leading-relaxed max-w-xl">
              <h2 className="text-2xl font-black font-serif text-white uppercase tracking-tighter">The Institutional Manifesto: Forging the Next Generation of Compliant Carriers</h2>
              <p>
                The commercial transportation sector is rife with opportunity, yet equally fraught with peril for the unprepared. Many new owner-operators enter the "lane" with enthusiasm but without the **institutional governance** required to survive beyond their first year. This critical gap—the absence of a robust, compliance-first foundation—is the **unsaturated lane** that LaunchPath Education is engineered to fill.
              </p>
              <p>
                We exist to cultivate a new breed of motor carrier: the **Stationed Custodian**. These are operators who understand that their authority is a privilege, their compliance a duty, and their operational integrity the bedrock of their enterprise. Our mission is to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>**Demystify Complexity**: Translate arcane regulations into clear, actionable steps.</li>
                <li>**Instill Proactive Governance**: Shift the mindset from reactive problem-solving to proactive system building.</li>
                <li>**Provide Insurance Against Ruin**: Offer a decision engine (Ground 0) that evaluates readiness *before* significant capital investment, thereby protecting livelihoods and fostering sustainable growth.</li>
                <li>**Elevate Industry Standards**: By empowering individual carriers with institutional-grade compliance, we collectively raise the bar for safety, efficiency, and professionalism across the entire sector.</li>
              </ul>
              <p>
                LaunchPath Education is more than a training platform; it is a **commitment to the future of compliant, resilient, and profitable motor carrier operations**. We are building the foundation for those who aspire not just to drive, but to **govern** their enterprise with unwavering authority and uncompromising authority.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-col space-y-6">
              <Link to="/ground-0" className="inline-flex items-center space-x-4 sm:space-x-6 bg-[#C5A059] text-[#002244] px-8 sm:px-12 py-5 sm:py-7 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[12px] shadow-[0_20px_50px_-15px_rgba(197,160,89,0.4)] hover:bg-white hover:text-[#002244] transition-all active:scale-95 group border-b-4 sm:border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-sm text-white/50 font-bold uppercase tracking-wider">
                Complete the free Ground 0 Readiness Briefing before requesting entry.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-200 relative min-h-[450px] sm:min-h-[550px] lg:min-h-0 shrink-0">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vince_founder.png?alt=media&token=b5ea75d9-5252-4ac3-af5c-282eec053e7d" 
            alt="Founder Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2 drop-shadow-lg">Stationed Custodian</p>
            <p className="text-3xl font-black text-white uppercase tracking-tight font-serif drop-shadow-2xl">Vince Lawrence</p>
            <p className="text-base font-bold text-white/80 mt-4 leading-relaxed drop-shadow-lg">
              My responsibility is to keep the standard clear and to refuse enrollment to carriers who are not structurally ready.
            </p>
          </div>
        </div>
      </section>

      {/* ORIENTATION PAUSE */}
      <div className="bg-slate-50 dark:bg-black/20 py-16 text-center border-b border-slate-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          Operating within the standard requires strict adherence to defined boundaries.
        </p>
      </div>

      {/* CLARITY OF PURPOSE SECTION */}
      <section className="py-16 md:py-32 lg:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8 animate-reveal-up">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.8em] sm:tracking-[1em] text-slate-400">OPERATIONAL PARAMETERS</p>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
              CLARITY OF <span className="text-[#C5A059] italic">PURPOSE.</span>
            </h2>
            <div className="bg-[#002244] text-white p-8 rounded-3xl max-w-4xl mx-auto shadow-2xl border-l-[12px] border-signal-gold mb-16">
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
                body: "We provide safety file architecture and federal regulation interpretation to prevent unauthorized practice through strict technical separation.",
                provide: ["Technical safety file architecture", "Federal regulation interpretation", "Audit-readiness verification"],
                exclude: ["Legal representation/counsel", "Courtroom defense services"]
              },
              { 
                icon: <Briefcase size={32} className="text-[#C5A059]" />, 
                title: "OPERATIONAL BOUNDARIES", 
                body: "We engineer governance systems that protect your authority while maintaining administrative distance to preserve carrier independence.",
                provide: ["Authority protection protocols", "Preferred carrier positioning", "Systemic record governance"],
                exclude: ["Daily dispatch operations", "Direct shipper recruitment"]
              },
              { 
                icon: <Shield size={32} className="text-[#C5A059]" />, 
                title: "INSURANCE BOUNDARIES", 
                body: "We build risk profiles underwriters value. We do not sell policies, eliminating conflicts of interest in coverage procurement.",
                provide: ["Insurance continuity systems", "Underwriter evidence packages", "Risk profile optimization"],
                exclude: ["Policy binding or issuance", "Brokerage services"]
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#002244] rounded-3xl md:rounded-[4rem] border border-white/5 shadow-2xl flex flex-col group hover:-translate-y-2 transition-all duration-700 animate-reveal-up overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="p-10 md:p-12 space-y-8 flex-grow">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#C5A059] uppercase tracking-tight font-serif">{card.title}</h3>
                  </div>
                  <p className="text-base text-white/70 font-medium leading-relaxed">{card.body}</p>
                  
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Service Scope:</p>
                      <ul className="space-y-3">
                        {card.provide.map((item, idx) => (
                          <li key={idx} className="flex items-center text-xs font-bold text-white/80 uppercase tracking-tight">
                            <CheckCircle2 size={14} className="text-emerald-500 mr-3" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Exclusions:</p>
                      <ul className="space-y-3">
                        {card.exclude.map((item, idx) => (
                          <li key={idx} className="flex items-center text-xs font-bold text-white/40 uppercase tracking-tight">
                            <XCircle size={14} className="text-red-500/40 mr-3" /> {item}
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
      <section className="py-24 md:py-32 lg:py-48 bg-[#FAF9F6] dark:bg-[#020617] border-t border-slate-100 dark:border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="w-20 h-20 bg-authority-blue rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <Lock size={32} className="text-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-tight">
            JOIN THE <span className="text-[#C5A059] italic">OPERATING STANDARD.</span>
          </h2>
          <p className="text-lg sm:text-xl font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-2xl mx-auto">
            Establishing order before revenue is the only way to survive the first 18 months.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group border-b-4 border-slate-900">
              TAKE THE REACH TEST™ <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-authority-blue/10 dark:border-white/10 text-authority-blue dark:text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center shadow-sm">
              VIEW ADMISSION PROTOCOL
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
