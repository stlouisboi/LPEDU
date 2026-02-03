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
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 overflow-x-hidden transition-colors">
      
      {/* SECTION 1: WHO (Credentials & Founder) */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-32 bg-slate-50 dark:bg-surface-dark border-b border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative group max-w-[480px] mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-authority-blue/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="bg-authority-blue dark:bg-primary-dark rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-white dark:border-border-dark">
                  <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-auto grayscale opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-authority-blue/90 backdrop-blur-md py-4 text-center border-t border-white/10">
                    <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.4em]">Vince Lawrence | Founder</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-signal-gold p-4 rounded-2xl shadow-xl border-4 border-white dark:border-surface-dark hidden sm:block z-20 group-hover:rotate-12 transition-transform">
                  <Award className="text-authority-blue" size={32} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-4">Who's Behind LaunchPath</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-authority-blue dark:text-white leading-tight uppercase tracking-tight">
                  Built on Factual <br/><span className="text-signal-gold italic">Experience.</span>
                </h1>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-authority-blue text-white px-5 py-2.5 rounded-xl shadow-lg border border-white/10">
                  <ShieldCheck size={18} className="text-signal-gold" />
                  <span className="text-xs font-black uppercase tracking-widest">Veteran-Owned Business</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Briefcase size={20} />, text: "25+ Years Manufacturing & Operations Leadership" },
                    { icon: <Shield size={20} />, text: "OSHA-Certified Safety Coordinator" },
                    { icon: <Activity size={20} />, text: "Federal Compliance Background" },
                    { icon: <UserCheck size={20} />, text: "Stewardship-First Approach" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="text-signal-gold mt-1">{item.icon}</div>
                      <p className="text-base font-bold text-slate-600 dark:text-slate-300 leading-tight">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-border-dark">
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                  LaunchPath was developed from direct experience watching motor carriers fail due to a lack of systems rather than a lack of effort. Our mission is to standardize administrative order for the modern owner-operator.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT (Definition) */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">What LaunchPath Is</h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-authority-blue dark:text-white leading-relaxed tracking-tight">
            LaunchPath is a 90-day compliance education system for new interstate motor carriers. We teach owner-operators how to build documentation systems that satisfy federal auditors and insurance underwriters — before mistakes become violations.
          </p>
          <div className="h-1.5 w-24 bg-signal-gold mx-auto rounded-full"></div>
        </div>
      </section>

      {/* SECTION 3: WHY (The Standard Comparison) */}
      <section className="py-24 lg:py-32 bg-[#F8F9FA] dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">The Standard</h2>
            <h3 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Systematic Protection.</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-white dark:bg-primary-dark p-10 md:p-12 rounded-[3rem] border-t-8 border-red-500 shadow-sm space-y-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Disjointed Operations</h4>
                <p className="text-sm font-bold text-slate-400">The reactive approach to compliance.</p>
              </div>
              <ul className="space-y-6">
                {[
                  "Fixing safety files only after incidents occur",
                  "Skipping mandatory DOT documentation for equipment maintenance",
                  "Delaying audit preparation until federal notification",
                  "Triggering insurance volatility through fragmented records"
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <XCircle className="text-red-300 mr-4 mt-1 shrink-0" size={20} />
                    <span className="text-base font-medium text-slate-600 dark:text-slate-400">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-primary-dark p-10 md:p-12 rounded-[3rem] border-t-8 border-signal-gold shadow-xl space-y-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold mb-2">The LaunchPath Standard</h4>
                <p className="text-sm font-bold text-authority-blue dark:text-white">The proactive system of order.</p>
              </div>
              <ul className="space-y-6">
                {[
                  "Installing integrated safety systems before launch",
                  "Executing federally-aligned DQ workflows daily",
                  "Maintaining an audit-ready posture through continuous discipline",
                  "Establishing insurer trust through transparent record keeping"
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-signal-gold mr-4 mt-1 shrink-0" size={20} />
                    <span className="text-base font-bold text-authority-blue dark:text-white">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PHILOSOPHY (Stewardship) */}
      <section className="py-24 lg:py-40 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold bg-slate-50 dark:bg-white/5 px-6 py-2.5 rounded-full border dark:border-white/10 shadow-sm">
                <Anchor size={18} />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Stewardship Ethic</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-authority-blue dark:text-white uppercase leading-none tracking-tighter font-serif">
                A Kingdom <br/><span className="text-signal-gold italic">Stewardship</span> <br/>Philosophy.
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We view operating authority as an entrusted function. We move carriers from a state of exposure to a state of refuge through documented evidence of discipline.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Entrusted Authority", desc: "Federal authority is a responsibility to be managed, not a right to be abused." },
                { title: "Integrity as Currency", desc: "We treat documentation with precision because auditors value accuracy above all." },
                { title: "Radical Accountability", desc: "We execute the right work even when no one is inspecting our files." },
                { title: "Disciplined Restraint", desc: "Stability is an absolute prerequisite to commercial fleet growth." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-surface-dark p-8 rounded-3xl border border-slate-100 dark:border-border-dark">
                  <h4 className="text-base font-black uppercase tracking-tight text-authority-blue dark:text-signal-gold mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT WE ARE NOT */}
      <section className="bg-authority-blue py-24 lg:py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold mb-4">Boundaries</h2>
            <h3 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight">What We Are Not.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Legal Advice", d: "LaunchPath is an educational entity. We do not provide legal representation or regulatory defense." },
              { t: "Dispatch Services", d: "We teach you how to choose loads based on risk factors, but we do not broker or dispatch freight." },
              { t: "Insurance Brokerage", d: "We build safety files that insurers love, but we do not sell policies or negotiate individual rates." }
            ].map((box, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
                <h4 className="text-xl font-black uppercase tracking-tight text-signal-gold mb-6 border-b border-white/10 pb-4">{box.t}</h4>
                <p className="text-base leading-relaxed text-white/80 font-medium">{box.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: SCOPE OF EDUCATION */}
      <section className="bg-white dark:bg-primary-dark py-24 lg:py-32 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Institutional Scope</h2>
            <h3 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">The Foundation of Truth.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { i: <Shield size={28} />, t: "Truth", d: "We prioritize technical regulatory accuracy over speculative revenue promises and marketing hype." },
              { i: <Scale size={28} />, t: "Boundaries", d: "We enforce a clear separation between systematic educational guidance and specific legal advice." },
              { i: <Target size={28} />, t: "Stewardship", d: "We treat carrier operations as high-value legacy assets entrusted to the care of the owner-operator." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-border-dark rounded-[3.5rem] p-10 shadow-sm hover:shadow-xl transition-all space-y-6">
                <div className="text-authority-blue dark:text-signal-gold p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl w-fit">{item.i}</div>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight">{item.t}</h4>
                <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Ready to Begin?</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Choose your next step in the LaunchPath verification sequence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/readiness" 
              className="w-full sm:w-auto bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95 flex items-center justify-center border-b-4 border-slate-900 group"
            >
              Take the REACH Test™
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/learning-path" 
              className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-authority-blue/20 dark:border-white/10 text-authority-blue dark:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center shadow-sm"
            >
              View the Program
            </Link>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 dark:text-slate-600 mt-12 italic">
            END OF INSTITUTIONAL STATEMENT — REVISION V4.2
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;