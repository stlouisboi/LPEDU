import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  Award, 
  AlertTriangle, 
  FileText, 
  Scale, 
  Zap, 
  Activity,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Search,
  Clipboard,
  Calculator,
  Map
} from 'lucide-react';

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
            Keep your authority. Pass audits. Stay insurable. LaunchPath installs the compliance infrastructure most carriers never receive.
          </p>
          <Link 
            to="/reach-test" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <Activity size={20} />
            <span>Run Diagnostic Assessment (REACH)</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          
          {/* TRUST STRIP */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Award size={16} className="text-signal-gold" />
              <span className="text-sm font-bold text-slate-300">Veteran-operated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={16} className="text-signal-gold" />
              <span className="text-sm font-bold text-slate-300">20+ years compliance & safety</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-signal-gold" />
              <span className="text-sm font-bold text-slate-300">Safety-certified operations</span>
            </div>
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

      {/* PRIORITY 6: GATEKEEPING CALLOUT (MOVED HIGHER) */}
      <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-authority-blue/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <Lock size={32} className="mx-auto text-signal-gold" />
          <p className="text-xl md:text-2xl font-bold text-white">
            LaunchPath is not open enrollment. Access is granted only after diagnostic review.
          </p>
        </div>
      </section>

      {/* PRIMARY CTA REPEAT (AFTER SECTION 2) */}
      <section className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Start With The REACH Test</h3>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Identify your compliance exposure before moving forward.
          </p>
          <Link 
            to="/reach-test" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <Activity size={20} />
            <span>Run Diagnostic Assessment (REACH)</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      {/* PRIORITY 3: 3-STEP ADMISSION PROCESS (REVISED) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">3-Step Admission Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* STEP 1 */}
            <div className="bg-white/5 border-2 border-signal-gold/30 p-10 rounded-3xl space-y-6">
              <Search size={40} className="text-signal-gold mx-auto" />
              <div className="text-center space-y-2">
                <div className="inline-block bg-signal-gold/20 border border-signal-gold/40 px-4 py-1 rounded-full">
                  <span className="text-xs font-black uppercase tracking-widest text-signal-gold">5–7 Minutes</span>
                </div>
                <h3 className="text-2xl font-black uppercase text-signal-gold">STEP 1: REACH TEST</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-center">
                Take the REACH Test to map your regulatory risk exposure across authority, insurance, and operational compliance.
              </p>
              <Link 
                to="/reach-test" 
                className="block text-center bg-signal-gold text-primary-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors"
              >
                Take the REACH Test
              </Link>
            </div>

            {/* STEP 2 */}
            <div className="bg-white/5 border-2 border-white/20 p-10 rounded-3xl space-y-6">
              <Clipboard size={40} className="text-white mx-auto" />
              <div className="text-center space-y-2">
                <div className="inline-block bg-white/10 border border-white/20 px-4 py-1 rounded-full">
                  <span className="text-xs font-black uppercase tracking-widest text-white">30–90 Minutes</span>
                </div>
                <h3 className="text-2xl font-black uppercase text-white">STEP 2: GROUND 0 BRIEFING</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-center">
                Complete Ground 0 to evaluate your financial reserves, documentation readiness, and structural discipline.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="bg-white/5 border-2 border-white/20 p-10 rounded-3xl space-y-6">
              <CheckCircle size={40} className="text-white mx-auto" />
              <h3 className="text-2xl font-black uppercase text-white text-center">STEP 3: ADMISSION DECISION</h3>
              <p className="text-slate-300 leading-relaxed text-center">
                Receive GO (enter system), WAIT (strengthen reserves), or NO-GO (structural deficiency). Only GO outcomes receive admission protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY TOOLS (SUBORDINATE TO PRIMARY CTA) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Evaluation Tools Used Before Admission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              to="/ground-0" 
              className="bg-white/5 border border-white/20 p-8 rounded-2xl space-y-4 text-center hover:border-white/40 transition-colors"
            >
              <FileText size={32} className="text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold uppercase text-slate-300">Access Ground 0 Readiness Diagnostic</h3>
            </Link>
            <Link 
              to="/tools/tco-calculator" 
              className="bg-white/5 border border-white/20 p-8 rounded-2xl space-y-4 text-center hover:border-white/40 transition-colors"
            >
              <Calculator size={32} className="text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold uppercase text-slate-300">Run TCO Framework</h3>
            </Link>
            <Link 
              to="/download/risk-map" 
              className="bg-white/5 border border-white/20 p-8 rounded-2xl space-y-4 text-center hover:border-white/40 transition-colors"
            >
              <Map size={32} className="text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold uppercase text-slate-300">View 90-Day Risk Map</h3>
            </Link>
          </div>
          <div className="text-center">
            <div className="inline-block bg-signal-gold/10 border-2 border-signal-gold/50 px-8 py-6 rounded-2xl">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <AlertTriangle size={20} className="text-signal-gold" />
                <p className="text-sm font-black uppercase tracking-widest text-signal-gold">
                  Important Distinction
                </p>
              </div>
              <p className="text-base font-bold text-white">
                These tools reveal your starting position. They do not install the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITY 4: THE MATH OF AUTHORITY LOSS (WITH SYSTEM PROTECTION COLUMN) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-red-950/20">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Math of Authority Loss</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-slate-300 text-lg">
              <p>Regulatory violations commonly reach five figures</p>
              <p>Insurance cancellation can suspend authority immediately</p>
              <p>Failed audits often lead to 45–90 day shutdowns</p>
              <p>Authority revocation can take months to rebuild, if at all</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4 text-center">
              <h3 className="text-lg font-black uppercase text-red-500">Regulatory Violations</h3>
              <p className="text-2xl font-bold text-white">$5,000 - $25,000</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4 text-center">
              <h3 className="text-lg font-black uppercase text-red-500">Insurance Cancellation</h3>
              <p className="text-2xl font-bold text-white">Automatic Suspension</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4 text-center">
              <h3 className="text-lg font-black uppercase text-red-500">Audit Failure</h3>
              <p className="text-2xl font-bold text-white">45-90 Day Shutdown</p>
            </div>
            <div className="bg-red-600/10 border border-red-600/30 p-8 rounded-3xl space-y-4 text-center">
              <h3 className="text-lg font-black uppercase text-red-500">Authority Revocation</h3>
              <p className="text-2xl font-bold text-white">6-12 Months to Rebuild</p>
            </div>
            {/* PRIORITY 4: SYSTEM PROTECTION COLUMN */}
            <div className="bg-gradient-to-br from-signal-gold/10 to-signal-gold/5 border-2 border-signal-gold/50 p-8 rounded-3xl space-y-4 text-center">
              <ShieldCheck size={32} className="text-signal-gold mx-auto" />
              <h3 className="text-lg font-black uppercase text-signal-gold">LAUNCHPATH OUTCOME</h3>
              <div className="text-sm font-bold text-white leading-relaxed space-y-2">
                <p>Zero violations (audit-ready from day one)</p>
                <p>Continuous insurance (no lapses)</p>
                <p>Audit passage (documentation complete)</p>
                <p>Authority protected (structural compliance)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITY 5: WHAT THE SYSTEM INSTALLS (WITH CHECKMARKS) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">6 Complete Compliance Systems Installed</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Each system includes templates, protocols, and implementation guides—not generic advice.
            </p>
          </div>
          <div className="space-y-8">
            {/* DRIVER QUALIFICATION SYSTEM */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">DRIVER QUALIFICATION SYSTEM</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Build and maintain complete driver files that pass federal audit review.
                </p>
              </div>
            </div>

            {/* DRUG & ALCOHOL TESTING PROGRAM */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">DRUG & ALCOHOL TESTING PROGRAM</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Install clearinghouse enrollment, random pool setup, and testing protocols.
                </p>
              </div>
            </div>

            {/* HOURS OF SERVICE COMPLIANCE */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">HOURS OF SERVICE COMPLIANCE</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Implement ELD reconciliation and supporting document protocols.
                </p>
              </div>
            </div>

            {/* INSURANCE CONTINUITY ARCHITECTURE */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">INSURANCE CONTINUITY ARCHITECTURE</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Maintain unbroken BMC-91 filing and prevent lapse-triggered shutdowns.
                </p>
              </div>
            </div>

            {/* MAINTENANCE DOCUMENTATION SYSTEM */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">MAINTENANCE DOCUMENTATION SYSTEM</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Create closed-loop inspection and repair records that satisfy 49 CFR Part 396.
                </p>
              </div>
            </div>

            {/* 90-DAY CASH-FLOW SURVIVAL MODEL */}
            <div className="flex items-start space-x-6">
              <CheckCircle size={32} className="text-signal-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">90-DAY CASH-FLOW SURVIVAL MODEL</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Engineer operating reserves independent of revenue generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIMARY CTA REPEAT (BEFORE ADMISSION SECTION) */}
      <section className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Ready to See Where You Stand?</h3>
          <Link 
            to="/reach-test" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <Activity size={20} />
            <span>Run Diagnostic Assessment (REACH)</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </section>

      {/* PRIORITY 8: ADMISSION GATEKEEPING (WITH SCARCITY STAT) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-authority-blue/10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ShieldAlert size={48} className="mx-auto text-signal-gold" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Admission Is Not Open Enrollment</h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            You do not buy your way into LaunchPath. <span className="text-signal-gold font-bold">You qualify.</span> Every applicant completes the REACH Test and Ground 0 review before admission is considered. If your operation is not structurally ready, you receive corrective priorities and advancement is paused. That protects your authority and it protects the standard.
          </p>
          <p className="text-2xl font-bold text-signal-gold">
            Only 1 in 3 applicants receive GO determination on first review.
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

      {/* PRIORITY 7: CUSTODIAN SECTION (UPDATED CREDENTIALS) */}
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
                  U.S. Navy veteran. OSHA-certified safety coordinator. 20+ years enforcing federal compliance standards and identifying the documentation failures that kill new carriers.
                </p>
                <p>
                  My job is to keep the standard clear and to refuse admission when a carrier is not structurally ready to operate.
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
