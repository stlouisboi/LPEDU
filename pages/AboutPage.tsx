import React from 'react';
import { Shield, Target, Award, Star, Anchor, BookOpen, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-[#fafaf9] min-h-screen text-slate-800 font-sans">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-authority-blue/10">
            <Anchor size={12} className="text-signal-gold" />
            <span>Integrity First • Systems Driven</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-authority-blue tracking-tighter mb-6 leading-none">
            Accuracy Over <span className="text-signal-gold italic">Hype.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            I built LaunchPath to provide the honest, technical education required to survive the trucking industry—not a "get rich quick" fantasy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-20">
          
          {/* Who I Am */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 text-signal-gold bg-signal-gold rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue">Who I Am</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">
              <div className="prose prose-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  Hey y'all, I’m <strong>Vince</strong>. At 53 years old, I’ve seen enough of the world to know that shortcuts usually lead to a dead end. I’m a Veteran and spent the bulk of my career as an OSHA safety professional, applying rigorous compliance standards across heavy industries like manufacturing and logistics.
                </p>
                <p>
                  I’ll tell you right now: <strong>I HAVE NEVER DRIVEN A TRUCK.</strong> I don't have a CDL, and I don't pretend to know how to back a 53-foot trailer into a tight dock in a rainstorm. My credibility isn't behind the wheel—it’s in the <strong>business systems and regulatory frameworks</strong> that keep those wheels turning legally.
                </p>
                <p>
                  I walk with the Lord, and that's changed how I view my work. It’s no longer about just "making it"; it’s about stewardship, honest dealing, and building something on a foundation of truth.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
                <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Vince - Founder" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-authority-blue uppercase tracking-tight">Vince</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder & Safety Strategist</p>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-3">
                   <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                      <Award size={14} className="text-signal-gold" />
                      <span>Veteran Owned</span>
                   </div>
                   <div className="flex items-center space-x-3 text-xs font-bold text-slate-500">
                      <Shield size={14} className="text-signal-gold" />
                      <span>OSHA Safety Expert</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why I Built It */}
          <div className="bg-authority-blue rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
              <Target size={300} />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Why I Built LaunchPath</h2>
              <div className="space-y-6 text-white/80 text-lg font-medium leading-relaxed">
                <p>
                  For years, I watched a heartbreaking pattern: good, hardworking people entering the trucking industry with high hopes, only to fail within the first 18 months. They didn't fail because they couldn't haul a load—they failed because they were <strong>missing the systems</strong> to manage authority, insurance, and federal compliance.
                </p>
                <p>
                  I got frustrated watching "gurus" sell $5,000 courses promising $10k a week without ever mentioning a Driver Qualification File or the New Entrant Safety Audit. I left my OSHA career because I wanted to create the antidote to that hype. 
                </p>
                <p className="text-white text-xl italic font-serif border-l-4 border-signal-gold pl-6">
                  "LaunchPath is the honest conversation the industry won't have with you."
                </p>
              </div>
            </div>
          </div>

          {/* Positioning & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 text-signal-gold bg-signal-gold rounded-full"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue">The Framework</h2>
              </div>
              <h3 className="text-3xl font-black text-authority-blue uppercase tracking-tight leading-none">The Four Pillars <br/>of Survival</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { t: "Authority Protection", d: "Securing and maintaining your legal right to operate." },
                  { t: "Insurance Continuity", d: "Navigating the complexities of high-risk carrier coverage." },
                  { t: "Compliance Backbone", d: "Building the files and habits that pass federal audits." },
                  { t: "Cash-Flow Oxygen", d: "Focusing on sustainable margins over vanity revenue." }
                ].map((p, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-black text-authority-blue text-sm uppercase mb-1">{p.t}</h4>
                    <p className="text-xs text-slate-500 font-bold">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 text-signal-gold bg-signal-gold rounded-full"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue">Kingdom Values</h2>
              </div>
              <h3 className="text-3xl font-black text-authority-blue uppercase tracking-tight leading-none">Integrity Over <br/>Income</h3>
              <div className="prose prose-sm text-slate-600 leading-relaxed font-medium">
                <p>
                  I run this as a <strong>Kingdom Business</strong>. That means I value integrity, stewardship, and honest dealing above my own profit. I’m not here to coddle you; I’m here to prepare you. 
                </p>
                <p>
                  The Bible tells us that "unless the Lord builds the house, those who build it labor in vain" (Psalm 127:1). I apply that wisdom to business. If you build your carrier on a foundation of "cutting corners" and "hustle hype," it will eventually crumble under the weight of federal scrutiny. 
                </p>
                <p>
                  LaunchPath is about building on the rock—implementing systems that are stable, scalable, and audit-proof.
                </p>
              </div>
            </div>
          </div>

          {/* How I Can Help */}
          <div className="pt-24 border-t border-slate-200 text-center space-y-10">
            <h2 className="text-4xl font-black text-authority-blue uppercase tracking-tight">How I Can Help You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-authority-blue/5 rounded-2xl flex items-center justify-center mx-auto text-authority-blue">
                    <BookOpen size={32} />
                  </div>
                  <h4 className="font-black uppercase text-sm">Structured Curriculum</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">No more piecing together YouTube videos. One sequence, from start to finish.</p>
               </div>
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-authority-blue/5 rounded-2xl flex items-center justify-center mx-auto text-authority-blue">
                    <Shield size={32} />
                  </div>
                  <h4 className="font-black uppercase text-sm">Audit-Ready Templates</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">The exact forms and policies FMCSA auditors look for, ready for your brand.</p>
               </div>
               <div className="space-y-4">
                  <div className="w-16 h-16 bg-authority-blue/5 rounded-2xl flex items-center justify-center mx-auto text-authority-blue">
                    <Clock size={32} />
                  </div>
                  <h4 className="font-black uppercase text-sm">Lifetime Support</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">Regulations change. When they do, I update the material. You stay compliant for life.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">Ready to Build Your <br/><span className="text-signal-gold italic">Compliance Backbone?</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            I’m ready to show you the systems behind the success. Let's get to work on building a sustainable carrier.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/learning-path" className="bg-white text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-authority-blue transition-all shadow-2xl active:scale-95 flex items-center">
              View My Roadmap
            </Link>
            <Link to="/pricing" className="bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl active:scale-95">
              See Enrollment Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;