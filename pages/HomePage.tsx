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

      {/* SECTION 2 – HOW THE STANDARD WORKS (3 STEPS) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">How The Standard Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase text-signal-gold">1. Find Your Risk</h3>
              <p className="text-slate-300 leading-relaxed">Take the REACH Test to see where your new authority can get in trouble with audits, insurance, or cash-flow.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase text-signal-gold">2. Review Your Setup</h3>
              <p className="text-slate-300 leading-relaxed">In Ground 0, we walk through your paperwork and systems to see if you are actually ready to operate.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase text-signal-gold">3. Move Forward or Fix First</h3>
              <p className="text-slate-300 leading-relaxed">If you meet the standard, you enter LaunchPath to install the full system. If you do not, you get a clear fix-first list.</p>
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

      {/* SECTION 6 – FOUNDER / CUSTODIAN STRIP (HIGH-PROFILE) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-authority-blue/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <img src="/img/vince-lawrence.jpg" alt="Vince Lawrence" className="w-48 h-48 rounded-full border-4 border-signal-gold object-cover shadow-2xl shadow-signal-gold/20" />
          </div>
          <div className="md:col-span-2 text-center md:text-left space-y-8">
            <div>
              <h3 className="text-3xl font-black uppercase text-signal-gold tracking-widest">Station Custodian – Vince Lawrence</h3>
              <p className="text-xl text-slate-300 mt-2 leading-relaxed">
                My job is to keep the standard clear and to refuse admission when a carrier is not structurally ready to operate.
              </p>
            </div>
            <div className="flex justify-center md:justify-start space-x-8">
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full">
                <Award size={20} className="text-signal-gold" />
                <span className="font-bold uppercase tracking-widest text-sm">Veteran-Operated</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full">
                <Shield size={20} className="text-signal-gold" />
                <span className="font-bold uppercase tracking-widest text-sm">OSHA Safety Coordinator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-primary-dark">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-black uppercase">LaunchPath</h3>
            <p className="text-slate-400">The 90-Day Compliance System for New Motor Carriers.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-signal-gold">Doctrine</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-300 hover:text-white">The Standard</Link></li>
              <li><Link to="/ground-0" className="text-slate-300 hover:text-white">Ground 0</Link></li>
              <li><Link to="/pricing" className="text-slate-300 hover:text-white">Admission Protocol</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-signal-gold">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-slate-300 hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white">Contact</Link></li>
              <li><Link to="/legal" className="text-slate-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LaunchPath. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
