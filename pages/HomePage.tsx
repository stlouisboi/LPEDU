import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle, Award, AlertTriangle, TrendingDown, FileText, Scale, Zap, Activity } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-primary-dark text-white animate-in fade-in duration-700">

      {/* SECTION 1 – HERO (WITH STAKES) */}
      <section className="relative py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-red-600/30 px-6 py-2.5 rounded-full mb-4">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-xs font-black uppercase tracking-[0.5em] text-red-500">THE COST OF FAILURE IS NOT A METAPHOR</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            90% of New Carriers Fail Within 18 Months.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The average cost: <span className="text-signal-gold font-bold">$5,000-$25,000</span> in violations and lost authority. LaunchPath installs the compliance infrastructure most carriers never receive—and survival depends on it.
          </p>
          <Link 
            to="/reach-test" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <span>Run Diagnostic Assessment</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      {/* SECTION 1.5 – FAILURE RISK CALCULATOR (INTERACTIVE LEAD CAPTURE) */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-gradient-to-br from-red-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-red-600/30 px-6 py-2.5 rounded-full mb-4">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Are You Part of the 90%?</p>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Find Out If Your Authority Is At Risk
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Most new carriers don't know they're failing until the FMCSA audit letter arrives. Take the REACH Test to identify your compliance gaps before they become violations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/reach-test" 
              className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 group"
            >
              <AlertTriangle size={20} />
              <span>Calculate Your Failure Risk</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
            <p className="text-sm text-slate-400 italic">Takes 3 minutes • No email required</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 – HOW THE STANDARD WORKS (3 STEPS) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">How The Standard Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black uppercase text-signal-gold">1. Find Your Risk</h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">Take the REACH Test to see where your new authority can get in trouble with audits, insurance, or cash-flow.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black uppercase text-signal-gold">2. Review Your Setup</h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">In Ground 0, we walk through your paperwork and systems to see if you are actually ready to operate.</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black uppercase text-signal-gold">3. Move Forward or Fix First</h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">If you meet the standard, you enter LaunchPath to install the full system. If you do not, you get a clear fix-first list.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: EVALUATION TOOLS */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Evaluation Tools Used Before Admission</h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Before any carrier is admitted into LaunchPath, we evaluate starting position, cost structure, and compliance exposure. The tools below are the same frameworks used during early review. They are provided to serious operators who want clarity before proceeding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border-2 border-signal-gold/30 p-10 rounded-3xl space-y-6 text-center">
              <h3 className="text-2xl font-black uppercase text-signal-gold">Ground 0 Readiness Diagnostic</h3>
              <p className="text-slate-300 leading-relaxed">Expose gaps in paperwork, insurance, compliance, and operational setup before they trigger audits or shutdowns.</p>
              <Link to="/ground-0" className="inline-block bg-signal-gold text-primary-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors">Initiate Ground 0 Diagnostic</Link>
            </div>
            <div className="bg-white/5 border-2 border-red-600/30 p-10 rounded-3xl space-y-6 text-center">
              <h3 className="text-2xl font-black uppercase text-red-500">90-Day Risk Map™</h3>
              <p className="text-slate-300 leading-relaxed">Identify compliance gaps before they become violations. See exactly what FMCSA auditors look for in new carriers.</p>
              <Link to="/download/risk-map" className="inline-block bg-red-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors">Download Risk Map™</Link>
            </div>
            <div className="bg-white/5 border-2 border-authority-blue/30 p-10 rounded-3xl space-y-6 text-center">
              <h3 className="text-2xl font-black uppercase text-authority-blue">True Cost of Operation (TCO) Framework</h3>
              <p className="text-slate-300 leading-relaxed">Calculate what it actually costs to run your operation and where early-stage carriers usually misjudge survival math.</p>
              <Link to="/tools/tco-calculator" className="inline-block bg-authority-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-steel-blue transition-colors">Run TCO Framework</Link>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">These tools reveal your starting position. They do not install the system.</p>
            <p className="text-xs text-slate-500">Access to these tools does not imply admission.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3 – ADMISSION GATEKEEPING */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-authority-blue/10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Admission Is Not Open Enrollment</h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            You do not buy your way into LaunchPath. <span className="text-signal-gold font-bold">You qualify.</span> Every applicant completes the REACH Test and Ground 0 review before admission is considered. If your operation is not structurally ready, you receive corrective priorities and advancement is paused. That protects your authority and it protects the standard.
          </p>
          <Link 
            to="/pricing" 
            className="inline-flex items-center space-x-3 bg-authority-blue hover:bg-steel-blue text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-authority-blue/30 hover:shadow-authority-blue/50 active:scale-95 group"
          >
            <span>Request LaunchPath Admission</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      {/* SECTION 4 – COST OF FAILURE */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-red-950/20">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Math of Authority Loss</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-black uppercase text-red-500">Regulatory Violations</h3>
              <p className="text-3xl font-bold text-white">$5,000 - $25,000</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-black uppercase text-red-500">Insurance Cancellation</h3>
              <p className="text-3xl font-bold text-white">Automatic Suspension</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-black uppercase text-red-500">Audit Failure</h3>
              <p className="text-3xl font-bold text-white">45-90 Day Shutdown</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-black uppercase text-red-500">Authority Revocation</h3>
              <p className="text-3xl font-bold text-white">6-12 Months to Rebuild</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 – DELIVERABLES */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">What The System Installs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <FileText size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">Driver Qualification File System</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <Scale size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">Drug & Alcohol Testing Program</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <Activity size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">Hours of Service Compliance</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <Zap size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">Maintenance Documentation System</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <Shield size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">Insurance Continuity Verification</h3>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4">
              <TrendingDown size={32} className="text-signal-gold" />
              <h3 className="text-xl font-black uppercase">90-Day Cash-Flow Survival Model</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 – CUSTODIAN SECTION (PREMIUM REDESIGN) */}
      <section className="relative py-40 md:py-56 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
        {/* Premium background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Label */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-signal-gold/10 border border-signal-gold/30 px-6 py-2 rounded-full mb-6">
              <Shield size={16} className="text-signal-gold" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-signal-gold">System Custodian</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Image + Credentials */}
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-signal-gold/30 to-blue-600/30 rounded-full blur-2xl"></div>
                <img 
                  src="/img/vince-lawrence.jpg" 
                  alt="Vince Lawrence" 
                  className="relative w-64 h-64 rounded-2xl object-cover shadow-2xl border-2 border-signal-gold/50" 
                />
              </div>
              
              {/* Credentials Badges */}
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <div className="flex items-center space-x-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 shadow-lg">
                  <Award size={24} className="text-signal-gold" />
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">U.S. Navy</p>
                    <p className="font-bold text-white">Veteran</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 shadow-lg">
                  <Shield size={24} className="text-signal-gold" />
                  <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">OSHA</p>
                    <p className="font-bold text-white">Safety Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio + Philosophy */}
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Vince Lawrence
                </h3>
                <p className="text-xl text-signal-gold font-bold uppercase tracking-widest mb-6">Founder & Custodian</p>
              </div>

              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  Twenty years in federal compliance, manufacturing leadership, and safety system management. Not a former truck driver. Not an influencer. A systems architect who builds the infrastructure that protects federally regulated businesses from enforcement actions.
                </p>
                <p>
                  LaunchPath exists because most new carriers never receive the compliance backbone required to survive their first audit. My role is to maintain the standard and refuse admission to operators who are not structurally ready—because stewardship requires saying no.
                </p>
              </div>

              {/* Philosophy Statement */}
              <div className="bg-gradient-to-br from-signal-gold/10 to-blue-600/10 border-l-4 border-signal-gold p-6 rounded-r-xl">
                <p className="text-white font-bold text-lg italic">
                  "Accuracy Over Hype. Systems Over Shortcuts. Execution Over Everything."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default HomePage;
