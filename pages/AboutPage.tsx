import React from 'react';
import { Shield, Target, Award, Star, Anchor, BookOpen, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OSHABadge = () => (
  <svg width="160" height="64" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OSHA Trained Professional Badge" className="drop-shadow-lg transition-transform hover:scale-105">
    <rect width="160" height="64" rx="12" fill="#1E3A5F" />
    <rect x="1.5" y="1.5" width="157" height="61" rx="10.5" stroke="#D4AF37" strokeWidth="2" />
    <path d="M22 18C22 16.5 28 15 28 15C28 15 34 16.5 34 18V28C34 32 28 36 28 36C28 36 22 32 22 28V18Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">OSHA TRAINED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">PROFESSIONAL</text>
    <text x="44" y="52" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>Safety Standards</text>
  </svg>
);

const VeteranBadge = () => (
  <svg width="160" height="64" viewBox="0 0 160 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Veteran Owned & Operated Badge" className="drop-shadow-lg transition-transform hover:scale-105">
    <rect width="160" height="64" rx="12" fill="#1E3A5F" />
    <rect x="1.5" y="1.5" width="157" height="61" rx="10.5" stroke="#D4AF37" strokeWidth="2" />
    <path d="M28 16L30.5 22.5H37.5L32 26.5L34 33L28 29L22 33L24 26.5L18.5 22.5H25.5L28 16Z" fill="#D4AF37" />
    <text x="44" y="28" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">VETERAN OWNED</text>
    <text x="44" y="42" fill="white" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="11" letterSpacing="0.05em">& OPERATED</text>
    <text x="44" y="52" fill="#94A3B8" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>U.S. Veteran Owned</text>
  </svg>
);

const AboutPage = () => {
  return (
    <div className="bg-[#fafaf9] min-h-screen text-slate-800 font-sans animate-in fade-in duration-700">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-authority-blue/10">
            <Anchor size={12} className="text-signal-gold" />
            <span>Integrity First • Systems Driven</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-authority-blue tracking-tighter mb-6 leading-tight">
            Built by a Safety Professional <br/>Who <span className="text-signal-gold italic uppercase">Understands Systems</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Accuracy Over Hype. LaunchPath provides the technical education required to build a compliant motor carrier from day one.
          </p>
        </div>
      </section>

      {/* Main Founder Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left/Main Bio Column */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 text-signal-gold bg-signal-gold rounded-full"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue">The LaunchPath Story</h2>
              </div>
              
              <div className="prose prose-lg text-slate-700 leading-relaxed font-medium max-w-none">
                {/* Founder Photo - Floating Left */}
                <div className="float-left mr-8 mb-6 md:mb-4">
                  <img 
                    src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" 
                    alt="Vince Lawrence - LaunchPath Founder" 
                    className="w-[250px] rounded-[8px] shadow-2xl border-4 border-white object-cover"
                  />
                  <p className="text-[10px] font-black uppercase tracking-widest text-center mt-3 text-slate-400">Vince Lawrence | Founder</p>
                </div>

                <p className="mb-6">
                  LaunchPath™ was built by Vince Lawrence, founder and operations-focused safety professional with experience overseeing compliance and safety systems supporting approximately 1,200 employees. His background includes supervisory leadership, business unit management, and work within regulated environments where procedural discipline and audit readiness matter.
                </p>

                {/* NEW METHODOLOGY SECTION */}
                <div className="mt-16 space-y-10 not-prose">
                  <div>
                    <h2 className="text-3xl font-black text-authority-blue uppercase tracking-tight mb-8">OUR METHODOLOGY</h2>
                    
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-xl font-bold text-authority-blue mb-4">The Pattern I Recognized</h3>
                        <p className="text-slate-600 leading-relaxed">
                          In manufacturing safety, I saw a consistent pattern: operators didn't fail because they lacked skill or effort. They failed because of missing systems. The equipment was expensive. The training was thorough. But if the underlying safety systems had gaps, people got hurt.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          When I started researching the trucking industry, I recognized the exact same pattern. New carriers were filing for authority, getting insurance, and hitting the road—but they weren't building the underlying systems needed to survive federal scrutiny, insurance audits, or cash flow gaps. They were confident. But confidence without structure leads to preventable failure.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-bold text-authority-blue mb-4">The Safety Foundation</h3>
                        <p className="text-slate-600 leading-relaxed">
                          In safety-critical industries, protection isn't assumed—it's tested. When evaluating machine guards, we used a four-direction methodology: if risk could reach a hazard over, under, through, or around the controls, the guard failed. It didn't matter how expensive the equipment was or how confident the operator felt. If the hazard could be reached, someone was going to get hurt.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4 italic">
                          The test was simple: Can risk penetrate the protection? If yes, the system isn't adequate.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-bold text-authority-blue mb-4">Applied to Owner-Operator Survival</h3>
                        <p className="text-slate-600 leading-relaxed">
                          LaunchPath applies this same testing principle to trucking business survival.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          <strong>The Four Pillars—Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen—are the foundation your business must stand on.</strong> These aren't optional. They're structural requirements.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          But having the Four Pillars in place isn't the same as having them properly protected. Most new carriers build what they think are adequate systems, but they never test whether those systems can withstand real-world pressure—until FMCSA shows up for the New Entrant Audit, or their insurance company drops them after one accident, or they run out of cash waiting on broker payments.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4 font-bold text-authority-blue">
                          By then, it's too late.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-bold text-authority-blue mb-4">The <span className="text-signal-gold">Reach Test™</span> Methodology</h3>
                        <p className="text-slate-600 leading-relaxed">
                          That's why LaunchPath teaches a methodology called <strong>The Reach Test™</strong>—a framework for evaluating whether your Four Pillars are actually protecting your business or just creating the appearance of protection.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          It's not a cure-all. It's a diagnostic tool. It helps you identify where risk can penetrate your systems before that risk causes authority revocation, insurance cancellation, compliance violations, or cash flow collapse.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          <strong>The Four Pillars are what keep your business standing. <span className="text-signal-gold">The Reach Test™</span> is how we verify they're solid.</strong>
                        </p>
                      </section>

                      <section>
                        <h3 className="text-xl font-bold text-authority-blue mb-4">Our Approach</h3>
                        <p className="text-slate-600 leading-relaxed">
                          LaunchPath doesn't teach fast. We teach thorough.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          We don't promise revenue. We teach systems that protect authority and maintain insurance continuity so you can operate long enough to generate revenue.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          We don't rely on hype. We teach federal regulations, audit-ready compliance practices, and cash flow discipline—the technical backbone required to survive the first 90 days and beyond.
                        </p>
                        <p className="text-slate-600 leading-relaxed mt-4">
                          The result: You build a business that can withstand scrutiny, not just one that looks good on paper.
                        </p>
                      </section>

                      <section className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-authority-blue uppercase tracking-widest mb-2 italic">Proprietary Methodology Notice</h3>
                        <p className="text-[14px] text-slate-500 italic leading-relaxed">
                          The Reach Test™ is a proprietary framework developed by LaunchPath Transportation EDU. The complete methodology, assessment tools, and application process are available exclusively to enrolled students. All rights reserved.
                        </p>
                      </section>
                    </div>
                  </div>
                </div>

                <p className="mt-12 mb-6">
                  LaunchPath is designed to address the regulatory and financial risks new carriers face during their critical early months of operation. As a Kingdom business, it is built on stewardship and integrity, prioritizing administrative accuracy and decision discipline over industry hype. The curriculum emphasizes the development of audit-ready compliance systems rather than driving instruction or dispatching services.
                </p>
                <p className="mb-6 italic text-slate-500">
                  Information provided by LaunchPath is for educational purposes only and does not constitute legal, tax, financial, or insurance advice.
                </p>
                <div className="clear-both"></div>
              </div>
            </div>

            {/* Credential Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <OSHABadge />
              <VeteranBadge />
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <div className="bg-authority-blue p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
              <ShieldCheck className="mb-6 text-signal-gold" size={32} />
              <h3 className="text-2xl font-bold font-serif mb-4 leading-tight italic">"Systems-first approach to carrier success."</h3>
              <div className="flex items-center space-x-3">
                 <div className="h-px w-8 bg-signal-gold"></div>
                 <p className="text-[11px] font-black uppercase tracking-widest text-signal-gold">
                   Official Creed
                 </p>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
               <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue mb-6">Expertise Focus</h4>
               <ul className="space-y-4">
                 {[
                   { t: "OSHA Standards", d: "Technical safety protocols" },
                   { t: "Kingdom Values", d: "Integrity and stewardship" },
                   { t: "FMCSA Compliance", d: "Administrative backbone systems" }
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start space-x-3">
                     <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal-gold shrink-0"></div>
                     <div>
                       <p className="text-sm font-black uppercase text-authority-blue">{item.t}</p>
                       <p className="text-xs text-slate-500 font-medium">{item.d}</p>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kingdom Values & Stewardship */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
              <div className="md:col-span-2 space-y-8">
                <h3 className="text-3xl font-black text-authority-blue uppercase tracking-tight leading-none">The Foundation of Stewardship</h3>
                <p className="text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-signal-gold pl-8">
                  "Unless the Lord builds the house, those who build it labor in vain." — Psalm 127:1
                </p>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Building a motor carrier on a foundation of integrity means prioritizing accuracy and regulatory discipline. We teach you how to implement systems that stand up to federal scrutiny, fostering a business culture centered on stewardship and long-term sustainability.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[3rem] border border-slate-200 text-center">
                 <ShieldCheck className="w-16 h-16 text-authority-blue mb-6" />
                 <h4 className="font-black uppercase tracking-widest text-xs mb-2">Systems Proven</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Audited & Verified</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-tight">Ready to Build Your <br/><span className="text-signal-gold italic">Compliance Backbone?</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            I’m ready to show you the systems behind the success. Let's get to work on building a sustainable carrier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/learning-path" className="bg-white text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-authority-blue transition-all shadow-2xl active:scale-95 flex items-center">
              View My Roadmap
            </Link>
            <Link to="/enroll" className="bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl active:scale-95">
              See Enrollment Options
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer Disclaimer */}
      <footer className="bg-slate-50 py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            LaunchPath Transportation EDU is an educational platform. Information provided does not constitute legal, tax, or financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;