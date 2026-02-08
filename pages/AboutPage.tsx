import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Anchor, 
  Clock, 
  Users, 
  Scale,
  Briefcase,
  Shield,
  Gavel,
  CheckCircle2,
  Lock,
  Zap,
  ShieldX,
  Target,
  FileText,
  Activity,
  UserCheck,
  // Fix: Add missing ShieldAlert import from lucide-react
  ShieldAlert
} from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | LaunchPath Transportation Education";
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 transition-colors selection:bg-authority-blue/10">
      
      {/* 1. HERO SECTION: 60/40 EXECUTIVE ENTRANCE */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: THE NARRATIVE (60%) */}
        <div className="w-full lg:w-[60%] bg-[#002244] text-white p-8 md:p-16 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-12 animate-reveal-up">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">The Executive Entrance</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85]">
                WHY <br/>
                <span className="text-[#C5A059] italic">LAUNCHPATH</span> <br/>
                EXISTS.
              </h1>
            </div>

            <div className="space-y-8 text-lg md:text-xl text-white/80 font-medium leading-relaxed">
              <p>
                I’ve spent 25 years in manufacturing leadership—serving as a supervisor and business unit manager—and 5 years as a certified OSHA safety coordinator. Before that, I served 7 years in the U.S. Navy. In those high-stakes environments, <span className="text-white font-black">systems weren't just paperwork; they were the difference between a productive shift and a catastrophic failure.</span>
              </p>
              <p>
                When I transitioned into the motor carrier space, I saw my own company drivers trying to make the leap to owner-operator. These were good men—hard workers with clean records—who lost their authority in 90 days. 
              </p>
              <p>
                Not because they couldn't drive, but because the industry sold them <span className="text-[#C5A059] font-black">"hustle"</span> while the FMCSA demanded <span className="text-[#C5A059] font-black">"compliance infrastructure."</span> LaunchPath exists because I refuse to reverse the order of wisdom.
              </p>
            </div>

            <div className="pt-8">
              <Link to="/readiness" className="inline-flex items-center space-x-4 bg-[#C5A059] text-[#002244] px-10 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 group border-b-8 border-[#8e7340]">
                <span>Verify My Readiness</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE PORTRAIT (40%) */}
        <div className="w-full lg:w-[40%] bg-slate-100 dark:bg-slate-900 relative">
          <img 
            src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
            alt="Vince Lawrence" 
            className="w-full h-full object-cover grayscale opacity-95 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002244]/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12">
            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] mb-2">System Custodian</p>
            <p className="text-2xl font-black text-white uppercase tracking-tight font-serif">Vince Lawrence</p>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE ARE NOT (DARK NAVY CARDS) */}
      <section className="py-24 md:py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4 animate-reveal-up">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">THE OPERATING BOUNDARIES</p>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tight">CLARITY OF <span className="text-[#C5A059] italic">PURPOSE.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                // Fix: Added missing ShieldAlert icon
                icon: <ShieldAlert className="text-[#C5A059]" />, 
                title: "NOT Legal Advice", 
                desc: "We provide clinical systems for implementation and regulatory compliance infrastructure. We are educators, not legal counsel." 
              },
              { 
                icon: <Zap className="text-[#C5A059]" />, 
                title: "NOT a Dispatch Service", 
                desc: "We are the architects of your authority. We do not find freight or book loads; we ensure you remain compliant while you do." 
              },
              { 
                icon: <ShieldX className="text-[#C5A059]" />, 
                title: "NOT an Insurance Brokerage", 
                desc: "We are risk management experts, not policy sellers. We teach you how to maintain continuity to satisfy the underwriters." 
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#002244] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-8 group hover:scale-[1.02] transition-all duration-500 animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-[#C5A059]/20 group-hover:border-[#C5A059]/50 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black font-serif text-[#C5A059] uppercase tracking-wide leading-tight">{card.title}</h3>
                <p className="text-white/60 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE REACH TEST (HIGH-CONTRAST BOX) */}
      <section className="py-24 md:py-40 bg-[#fafaf9] dark:bg-surface-dark border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 animate-reveal-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 text-[#002244] dark:text-[#C5A059]">
                  <Scale size={20} />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em]">The Safety Architect Principle</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-serif text-[#002244] dark:text-white uppercase leading-[0.9] tracking-tighter">
                  THE <span className="text-[#C5A059] italic">REACH</span> TEST.
                </h2>
              </div>
              
              <div className="space-y-8 text-xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                <p>
                  In my years as an OSHA safety coordinator, we used a principle called the <span className="text-[#002244] dark:text-white underline decoration-[#C5A059] underline-offset-4 decoration-4">"Reach Test."</span> 
                </p>
                <p>
                  It was a binary assessment: Could a hazard be reached during normal operations? If a hand could reach a blade, the system was a failure.
                </p>
                <p>
                  I apply that same rigor to motor carrier authority. Most operators drive carefully, but they fail the Reach Test of compliance. <span className="text-[#002244] dark:text-white font-black">"If an auditor can reach a defect in your paperwork, the system has failed."</span>
                </p>
              </div>
            </div>

            {/* High-Contrast Framework Box */}
            <div className="bg-[#002244] p-12 md:p-16 rounded-[4rem] border-[10px] border-[#C5A059] shadow-[0_40px_100px_-20px_rgba(198,146,42,0.3)] relative overflow-hidden animate-reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={200} className="text-[#C5A059]" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.4em] text-[#C5A059]">Proprietary Framework</h4>
                  <p className="text-[9px] font-black text-white/40 uppercase font-mono">ID: LP-REACH-V1</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-lg">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h5 className="text-lg font-black text-white uppercase tracking-tight mb-2">Isolation of Hazards</h5>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">We build engineering controls around your authority that prevent regulatory reach into your operations.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-[#002244] flex items-center justify-center shrink-0 shadow-lg">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h5 className="text-lg font-black text-white uppercase tracking-tight mb-2">Systematic Guarding</h5>
                      <p className="text-white/60 text-sm font-medium leading-relaxed">Paperwork is not a task; it is a guard. If the guard is missing, the business is exposed to terminal failure.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <p className="text-[#C5A059] text-2xl font-black font-serif italic leading-tight">
                    "Compliance is an engineered outcome, not an administrative hope."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURAL INSTRUCTION (CENTERED SCRIPTURE) */}
      <section className="py-24 md:py-48 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-6 space-y-16 text-center animate-reveal-up">
          <div className="space-y-8">
            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.6em]">Architectural Instruction</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif italic text-[#002244] dark:text-white leading-[1.1] tracking-tight">
              “By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches.”
            </h2>
            <p className="text-sm font-black text-[#C5A059] uppercase tracking-[0.5em]">Proverbs 24:3–4</p>
          </div>
          
          <div className="space-y-10 text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-16">
            <p>
              I refuse to reverse this order. LaunchPath is built on the principle that <span className="text-[#002244] dark:text-white font-black underline decoration-[#C5A059] underline-offset-8 decoration-4">wisdom and understanding must precede the riches.</span>
            </p>
            <p className="text-2xl font-black text-[#002244] dark:text-white uppercase tracking-tight pt-10">
              Establish the structure. <br/>
              <span className="text-[#C5A059]">Then fill the rooms.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER VERIFICATION (FINAL LEGACY BLOCK) */}
      <section className="py-24 md:py-48 bg-[#002244] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 space-y-12 animate-reveal-up">
               <div className="relative group">
                 <div className="bg-white/5 border-4 border-[#C5A059]/30 rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5]">
                   <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 object-top" 
                   />
                 </div>
                 <div className="absolute -bottom-6 -right-6 bg-[#C5A059] p-6 rounded-3xl shadow-xl border-4 border-[#002244] group-hover:rotate-12 transition-transform">
                   <Award size={40} className="text-[#002244]" />
                 </div>
               </div>
               <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Institutional Credentials</h4>
                 {[
                   { icon: <Clock size={16} />, text: "25+ YEAR LEADERSHIP" },
                   { icon: <ShieldCheck size={16} />, text: "OSHA CERTIFIED SAFETY" },
                   { icon: <Gavel size={16} />, text: "FEDERAL COMPLIANCE" },
                   { icon: <Users size={16} />, text: "U.S. NAVY VETERAN" }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 p-5 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                       <div className="text-[#C5A059]">{item.icon}</div>
                       <span className="text-[11px] font-black uppercase tracking-[0.25em]">{item.text}</span>
                    </div>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-8 space-y-16 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-6 py-2.5 rounded-full">
                  <ShieldCheck size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Founder Biography // REGISTRY: VL-25Y-CERT</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-serif uppercase tracking-tighter leading-none">
                  INSTITUTIONAL <br/><span className="text-[#C5A059] italic">LEGACY.</span>
                </h2>
              </div>

              <div className="space-y-10 text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-[750px]">
                <p>
                  Vince Lawrence is the Founder of LaunchPath and a recognized authority in industrial safety and operational governance. His 25-year tenure in manufacturing leadership and 7 years in the U.S. Navy provide the foundational discipline for the LaunchPath Operating Standard.
                </p>
                <p>
                  As an OSHA-certified safety coordinator, Lawrence watched clean-record owner-operators lose their authority in 90 days due to a lack of infrastructure. He dedicated LaunchPath to ensuring that <span className="text-white font-black italic">insurance lapses and regulatory traps never again kill the dream of a disciplined operator.</span>
                </p>
              </div>

              <div className="pt-12">
                 <Link to="/readiness" className="bg-white text-[#002244] px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl hover:bg-[#C5A059] hover:text-[#002244] transition-all active:scale-95 inline-flex items-center group border-b-8 border-slate-300">
                    Validate Admission Readiness <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </Link>
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