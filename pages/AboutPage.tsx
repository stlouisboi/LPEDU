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
  BookOpen
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 transition-colors selection:bg-[#C5A059]/30">
      
      {/* TASK 1: HERO RESTRUCTURE - 60/40 EXECUTIVE ENTRANCE */}
      <section className="relative min-h-[95vh] flex flex-col lg:flex-row overflow-hidden border-b border-[#002244]/10">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A059] via-[#C5A059]/40 to-transparent"></div>
          
          <div className="relative z-10 max-w-2xl space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Institutional Heritage</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
            </div>

            <div className="space-y-8 text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-xl">
              <p>
                I spent 25 years in manufacturing leadership—serving as a supervisor and business unit manager—and 5 years as a certified OSHA safety coordinator. Before that, I served 7 years in the U.S. Navy. In those high-stakes environments, <span className="text-white font-black">systems weren't just paperwork; they were the difference between a productive shift and a catastrophic failure.</span>
              </p>
              <p>
                When I transitioned into the motor carrier space, I saw company drivers trying to make the leap to owner-operator. These were good men—hard workers with clean records—who lost their authority in 90 days. 
              </p>
              <p>
                Not because they couldn't drive, but because the industry sold them <span className="text-[#C5A059] font-black italic">"hustle"</span> while the FMCSA demanded <span className="text-[#C5A059] font-black">"compliance infrastructure."</span> LaunchPath exists because I refuse to reverse the order of wisdom.
              </p>
            </div>

            <div className="pt-8">
              <Link to="/readiness" className="inline-flex items-center space-x-6 bg-[#C5A059] text-[#002244] px-12 py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_20px_50px_-15px_rgba(197,160,89,0.4)] hover:bg-white hover:text-[#002244] transition-all active:scale-95 group border-b-8 border-[#8e7340]">
                <span>Verify Admission Readiness</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-200 relative min-h-[500px] lg:min-h-0">
          <img 
            src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
            alt="Founder Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12 text-center lg:text-left">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2 drop-shadow-lg">System Custodian</p>
            <p className="text-3xl font-black text-white uppercase tracking-tight font-serif drop-shadow-2xl">Vince Lawrence</p>
          </div>
        </div>
      </section>

      {/* TASK 2: "CLARITY OF PURPOSE" (AFFIRMATIVE REFINEMENT) */}
      <section className="py-24 md:py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-24 space-y-6 animate-reveal-up">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE OPERATING BOUNDARIES</p>
            <h2 className="text-4xl md:text-6xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter">CLARITY OF <span className="text-[#C5A059] italic">PURPOSE.</span></h2>
            <div className="h-1.5 w-24 bg-[#C5A059] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            {[
              { 
                icon: <ShieldAlert size={32} className="text-[#C5A059]" />, 
                title: "LEGAL CLARITY", 
                body: "LaunchPath provides regulatory education and compliance architecture—not legal representation or counsel.",
                role: "We build the compliance backbone that prevents the audit. Legal counsel represents you after the system has failed.",
                provide: ["49 CFR regulatory interpretation", "Audit preparation frameworks", "Compliance infrastructure design"],
                exclude: ["Legal representation", "Courtroom defense", "Legal opinions or counsel"]
              },
              { 
                icon: <Zap size={32} className="text-[#C5A059]" />, 
                title: "OPERATIONAL CLARITY", 
                body: "LaunchPath designs authority infrastructure and carrier governance systems—not daily dispatch operations or load procurement.",
                role: "We build the foundation that makes you a \"Preferred Carrier\" for high-paying contracts. Dispatchers handle the daily load execution.",
                provide: ["Authority protection systems", "Preferred carrier positioning", "Compliance readiness frameworks"],
                exclude: ["Daily dispatch services", "Load board access", "Freight brokerage or shipper negotiations"]
              },
              { 
                icon: <ShieldX size={32} className="text-[#C5A059]" />, 
                title: "INSURANCE CLARITY", 
                body: "LaunchPath teaches insurance risk management and continuity protection—not policy sales or underwriting.",
                role: "We show you how to build an \"un-cancelable\" safety profile. Insurance brokers provide the actual policies at the lowest premiums your profile commands.",
                provide: ["Insurance continuity protocols", "Risk management education", "Safety profile optimization"],
                exclude: ["Insurance policy sales", "Underwriting services", "Binding or issuing coverage"]
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#002244] p-10 md:p-12 lg:p-14 rounded-[4rem] border border-white/5 shadow-2xl space-y-8 flex flex-col group hover:scale-[1.02] transition-all duration-500 animate-reveal-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-[#C5A059]/20 group-hover:border-[#C5A059]/60 transition-all shadow-inner group-hover:rotate-6">
                  {card.icon}
                </div>
                <div className="space-y-6 flex-grow">
                  <h3 className="text-2xl font-black font-serif text-[#C5A059] uppercase tracking-tight leading-tight">{card.title}</h3>
                  <div className="space-y-4">
                    <p className="text-white text-base font-bold leading-relaxed">{card.body}</p>
                    <p className="text-white/60 text-sm italic font-medium leading-relaxed border-l-2 border-[#C5A059]/40 pl-4">{card.role}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 pt-4 border-t border-white/5">
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">What We Provide</p>
                      <ul className="space-y-1.5">
                        {card.provide.map((item, idx) => (
                          <li key={idx} className="text-[11px] text-white/70 font-bold uppercase tracking-tighter flex items-center gap-2">
                            <span className="w-1 h-1 bg-emerald-400 rounded-full"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-red-400 uppercase tracking-widest">What We Don't Provide</p>
                      <ul className="space-y-1.5">
                        {card.exclude.map((item, idx) => (
                          <li key={idx} className="text-[11px] text-white/40 font-bold uppercase tracking-tighter flex items-center gap-2">
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span> {item}
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

      {/* TASK 3: THE REACH TEST (PAYOFF ADDITION) */}
      <section className="py-24 md:py-48 bg-[#fafaf9] dark:bg-surface-dark border-y border-[#002244]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center mb-24">
            <div className="space-y-12 animate-reveal-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-4 text-[#002244] dark:text-[#C5A059]">
                  <Scale size={24} />
                  <span className="text-[13px] font-black uppercase tracking-[0.4em]">The Safety Architect Principle</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase leading-[0.85] tracking-tighter">
                  THE <span className="text-[#C5A059] italic">REACH</span> TEST.
                </h2>
              </div>
              
              <div className="space-y-10 text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                <p>
                  In my years as an OSHA safety coordinator, we used a principle called the <span className="text-[#002244] dark:text-white underline decoration-[#C5A059] underline-offset-8 decoration-4">"Reach Test."</span> 
                </p>
                <p>
                  It was a binary assessment: Could a hazard be reached during normal operations? If a hand could reach a blade, the system was a failure.
                </p>
                <p className="text-3xl font-black text-[#002244] dark:text-white font-serif tracking-tight leading-tight">
                  "If an auditor can reach a defect in your paperwork, the system has failed."
                </p>
              </div>
            </div>

            {/* High-Contrast Safety Architect Box */}
            <div className="bg-[#002244] p-12 md:p-20 rounded-[5rem] border-[12px] border-[#C5A059] shadow-[0_50px_120px_-30px_rgba(197,160,89,0.3)] relative overflow-hidden animate-reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
                <Target size={200} className="text-[#C5A059]" />
              </div>
              <div className="relative z-10 space-y-12">
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                  <h4 className="text-sm font-black uppercase tracking-[0.4em] text-[#C5A059]">Architecture ID: LP-REACH-V4</h4>
                  <p className="text-[10px] font-black text-white/30 uppercase font-mono">STATUS: MASTER PROTOCOL</p>
                </div>
                
                <div className="space-y-10">
                  <div className="flex items-start space-x-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                      <Shield size={32} />
                    </div>
                    <div>
                      <h5 className="text-2xl font-black text-white uppercase tracking-tight mb-3 font-serif">Isolation of Hazards</h5>
                      <p className="text-white/60 text-lg font-medium leading-relaxed italic">We build engineering controls around your authority that prevent regulatory reach into your operations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h5 className="text-2xl font-black text-white uppercase tracking-tight mb-3 font-serif">Systematic Guarding</h5>
                      <p className="text-white/60 text-lg font-medium leading-relaxed italic">Paperwork is not a task; it is a guard. If the guard is missing, the business is exposed to terminal failure.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 mt-10 border-t border-white/10">
                  <p className="text-[#C5A059] text-3xl font-black font-serif italic leading-[1.1] tracking-tight">
                    "Compliance is an engineered outcome, not an administrative hope."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THE REACH TEST PAYOFF (NEW SECTION) */}
          <div className="max-w-4xl mx-auto space-y-8 animate-reveal-up border-t border-slate-100 dark:border-white/5 pt-16">
            <div className="space-y-8 text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
              <p>
                LaunchPath eliminates these reachable hazards by building Driver Qualification File systems, Clearinghouse enrollment protocols, and insurance continuity frameworks that <span className="text-[#002244] dark:text-white font-black underline decoration-[#C5A059] underline-offset-4">pass the federal Reach Test</span> before your first audit.
              </p>
              <p className="text-[#002244] dark:text-white uppercase tracking-tight">
                This is not theoretical compliance education—this is industrial-grade hazard elimination applied to regulatory infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Instruction Callout (Scripture) */}
      <section className="py-32 md:py-56 bg-white dark:bg-primary-dark relative">
        <div className="max-w-4xl mx-auto px-6 space-y-20 text-center animate-reveal-up">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-4 bg-[#002244]/5 dark:bg-white/5 px-8 py-3 rounded-full mb-4">
               <Anchor size={18} className="text-[#002244] dark:text-[#C5A059]" />
               <p className="text-[#002244] dark:text-slate-400 font-bold text-[13px] uppercase tracking-[0.6em]">Architectural Instruction</p>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif italic text-[#002244] dark:text-white leading-[1.1] tracking-tighter">
              “By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.”
            </h2>
            <div className="h-1.5 w-32 bg-[#C5A059] mx-auto rounded-full"></div>
            <p className="text-lg font-black text-[#C5A059] uppercase tracking-[0.8em]">Proverbs 24:3–4</p>
          </div>
          
          <div className="space-y-12 text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-20">
            <p>
              I refuse to reverse this order. LaunchPath is built on the principle that <span className="text-[#002244] dark:text-white font-black underline decoration-[#C5A059] underline-offset-8 decoration-[10px]">wisdom and understanding must precede the riches.</span>
            </p>
            <p className="text-3xl font-black text-[#002244] dark:text-white uppercase tracking-tight pt-10 font-serif">
              ESTABLISH THE STRUCTURE. <br/>
              <span className="text-[#C5A059] italic">THEN FILL THE ROOMS.</span>
            </p>
          </div>
        </div>
      </section>

      {/* TASK 4: INSTITUTIONAL LEGACY (OPENING SENTENCE REFINEMENT) */}
      <section className="py-24 md:py-48 bg-[#002244] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 space-y-16 animate-reveal-up">
               <div className="relative group">
                 <div className="bg-white/5 border-4 border-[#C5A059]/30 rounded-[5rem] overflow-hidden shadow-2xl aspect-[4/5] relative">
                   <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Institutional Portrait: Vince Lawrence" 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 object-top" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#002244] via-transparent to-transparent opacity-40"></div>
                 </div>
                 <div className="absolute -bottom-10 -right-10 bg-[#C5A059] p-10 rounded-[3rem] shadow-2xl border-[10px] border-[#002244] group-hover:rotate-12 transition-all duration-500">
                   <Award size={64} className="text-[#002244]" />
                 </div>
               </div>
               
               <div className="space-y-6">
                 <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C5A059] ml-4">Credential Verification</h4>
                 <div className="grid grid-cols-1 gap-4">
                   {[
                     { icon: <Clock size={20} />, text: "25+ YEAR LEADERSHIP" },
                     { icon: <ShieldCheck size={20} />, text: "OSHA CERTIFIED SAFETY" },
                     { icon: <Gavel size={20} />, text: "FEDERAL COMPLIANCE" },
                     { icon: <Users size={20} />, text: "U.S. NAVY VETERAN" }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-6 p-6 border border-white/10 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all hover:translate-x-2">
                         <div className="text-[#C5A059]">{item.icon}</div>
                         <span className="text-[11px] font-black uppercase tracking-[0.3em]">{item.text}</span>
                      </div>
                   ))}
                 </div>
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-4 bg-white/10 border border-white/20 px-8 py-3 rounded-full backdrop-blur-xl shadow-2xl">
                  <ShieldCheck size={18} className="text-[#C5A059]" />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">Founder Biography // REGISTRY: VL-25Y-CERT</span>
                </div>
                <h2 className="text-7xl md:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                  INSTITUTIONAL <br/><span className="text-[#C5A059] italic">LEGACY.</span>
                </h2>
                <div className="h-2 w-48 bg-[#C5A059]"></div>
              </div>

              <div className="space-y-12 text-2xl md:text-3xl text-white/80 font-medium leading-relaxed max-w-3xl">
                <p>
                  LaunchPath is built on three decades of real-world systems experience in manufacturing leadership, federal compliance oversight, and military operational discipline. This is not theory from a classroom—it's regulatory rigor forged in environments where compliance failures had immediate, visible consequences.
                </p>
                <p className="border-l-8 border-[#C5A059] pl-10 py-4 font-serif italic text-white">
                  "As an OSHA-certified safety coordinator, I watched clean-record owner-operators lose their authority in 90 days due to a lack of infrastructure. I dedicated LaunchPath to ensuring that insurance lapses and regulatory traps never again kill the dream of a disciplined operator."
                </p>
              </div>

              <div className="pt-16">
                 <Link to="/readiness" className="bg-white text-[#002244] px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[14px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)] hover:bg-[#C5A059] hover:text-[#002244] transition-all active:scale-95 inline-flex items-center group border-b-[12px] border-slate-300">
                    Initiate Admission Diagnostic <ArrowRight size={24} className="ml-6 group-hover:translate-x-3 transition-transform" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ANCHOR SIGNATURE */}
      <section className="py-24 bg-[#FAF9F6] dark:bg-[#020617] text-center border-t border-slate-200 dark:border-white/5">
         <p className="text-[11px] font-black uppercase tracking-[1em] text-slate-400 italic">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
         <div className="mt-8 opacity-20 hover:opacity-50 transition-opacity">
            <BookOpen className="mx-auto text-[#002244] dark:text-white" size={24} />
         </div>
      </section>
    </div>
  );
};

export default AboutPage;