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
  Map,
  XCircle,
  AlertCircle,
  Ban,
  CheckCircle2
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
            to="/auto-diagnostic" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <Activity size={20} />
            <span>Run AUTO Diagnostic Assessment</span>
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
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">Run AUTO Diagnostic to see where your new authority can get in trouble with audits, insurance, or cash-flow.</p>
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
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">AUTO DIAGNOSTIC — REQUIRED FIRST STEP</h3>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            AUTO Diagnostic is required before Ground 0 or admission is considered.
          </p>
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
                <h3 className="text-2xl font-black uppercase text-signal-gold">STEP 1: AUTO DIAGNOSTIC</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-center">
                Run the AUTO Diagnostic to identify which industrial guards (Around, Under, Through, Over) are protecting your authority.
              </p>
              <Link 
                to="/auto-diagnostic" 
                className="block text-center bg-signal-gold text-primary-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors"
              >
                Run AUTO Diagnostic
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

      {/* PRIORITY 4: THE MATH OF AUTHORITY LOSS - PREMIUM REDESIGN */}
      <section className="relative py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          {/* Header - Premium Typography */}
          <div className="text-center space-y-8">
            <div className="inline-block bg-red-500/10 border border-red-500/30 px-6 py-2 rounded-full">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">CONSEQUENCE ANALYSIS</p>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              THE MATH OF <span className="text-red-400">AUTHORITY LOSS</span>
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-base md:text-lg">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Regulatory violations commonly reach five figures</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Insurance cancellation can suspend authority immediately</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Failed audits often lead to 45–90 day shutdowns</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Authority revocation can take months to rebuild, if at all</p>
              </div>
            </div>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Failure Cards - Premium Glass-morphism */}
            <div className="group relative bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm border border-red-500/30 p-6 md:p-8 lg:p-10 rounded-3xl space-y-4 md:space-y-6 text-center hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-500/10 border border-red-500/30 rounded-2xl mb-3 md:mb-4">
                  <AlertTriangle size={24} className="text-red-400 md:w-7 md:h-7" />
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400 mb-3 md:mb-4 break-words">Regulator<wbr/>y Violation<wbr/>s</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">$5,000<br className="md:hidden" /><span className="hidden md:inline"> - </span><br className="md:hidden" />$25,000</p>
                <p className="text-xs text-slate-400 leading-relaxed">Average penalty range for documentation failures</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm border border-red-500/30 p-6 md:p-8 lg:p-10 rounded-3xl space-y-4 md:space-y-6 text-center hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-500/10 border border-red-500/30 rounded-2xl mb-3 md:mb-4">
                  <XCircle size={24} className="text-red-400 md:w-7 md:h-7" />
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400 mb-3 md:mb-4 break-words">Insurance Cancella<wbr/>tion</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">Automatic<br className="md:hidden" /> Suspension</p>
                <p className="text-xs text-slate-400 leading-relaxed">Authority suspended within 24-48 hours</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm border border-red-500/30 p-6 md:p-8 lg:p-10 rounded-3xl space-y-4 md:space-y-6 text-center hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-500/10 border border-red-500/30 rounded-2xl mb-3 md:mb-4">
                  <AlertCircle size={24} className="text-red-400 md:w-7 md:h-7" />
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400 mb-3 md:mb-4">Audit Failure</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">45-90 Day<br className="md:hidden" /> Shutdown</p>
                <p className="text-xs text-slate-400 leading-relaxed">Operational suspension during remediation</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm border border-red-500/30 p-6 md:p-8 lg:p-10 rounded-3xl space-y-4 md:space-y-6 text-center hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-500/10 border border-red-500/30 rounded-2xl mb-3 md:mb-4">
                  <Ban size={24} className="text-red-400 md:w-7 md:h-7" />
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-red-400 mb-3 md:mb-4 break-words">Authority Revoca<wbr/>tion</h3>
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">6-12 Months<br className="md:hidden" /> to Rebuild</p>
                <p className="text-xs text-slate-400 leading-relaxed">If reinstatement is granted at all</p>
              </div>
            </div>

            {/* LaunchPath Outcome - Premium Gold Card */}
            <div className="group relative bg-gradient-to-br from-signal-gold/20 via-signal-gold/10 to-signal-gold/5 backdrop-blur-sm border-2 border-signal-gold/50 p-6 md:p-8 lg:p-10 rounded-3xl space-y-4 md:space-y-6 text-center hover:border-signal-gold transition-all duration-300 hover:shadow-2xl hover:shadow-signal-gold/30">
              <div className="absolute inset-0 bg-gradient-to-br from-signal-gold/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-signal-gold/20 border-2 border-signal-gold/50 rounded-2xl mb-3 md:mb-4">
                  <ShieldCheck size={24} className="text-signal-gold md:w-7 md:h-7" />
                </div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-signal-gold mb-4 md:mb-6 break-words">LAUNCHPATH OUTCOME</h3>
                <div className="space-y-2 md:space-y-3 text-left">
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <CheckCircle2 size={16} className="text-signal-gold flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                    <p className="text-xs md:text-sm font-bold text-white leading-snug">Zero violations (audit-ready from day one)</p>
                  </div>
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <CheckCircle2 size={16} className="text-signal-gold flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                    <p className="text-xs md:text-sm font-bold text-white leading-snug">Continuous insurance (no lapses)</p>
                  </div>
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <CheckCircle2 size={16} className="text-signal-gold flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                    <p className="text-xs md:text-sm font-bold text-white leading-snug">Audit passage (documentation complete)</p>
                  </div>
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <CheckCircle2 size={16} className="text-signal-gold flex-shrink-0 mt-0.5 md:w-[18px] md:h-[18px]" />
                    <p className="text-xs md:text-sm font-bold text-white leading-snug">Authority protected (structural compliance)</p>
                  </div>
                </div>
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

      {/* AUTO GUARDING STANDARD SECTION */}
      <section className="relative py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-signal-gold/5 via-transparent to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-signal-gold/10 border border-signal-gold/30 px-6 py-2 rounded-full">
              <Shield size={20} className="text-signal-gold" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">INDUSTRIAL COMPLIANCE STANDARD</p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
              DOES YOUR AUTHORITY PASS THE <span className="text-signal-gold">AUTO TEST?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We don't just teach compliance; we install industrial guarding. Based on OSHA machine-guarding standards, the AUTO system ensures no risk can reach your point of operation.
            </p>
          </div>

          {/* Central Authority Protection Graphic */}
          <div className="flex justify-center items-center py-12">
            <div className="relative w-full max-w-md aspect-square">
              {/* Center - MC Authority */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-authority-blue to-authority-blue/60 rounded-full border-4 border-signal-gold/30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-wider text-signal-gold">MC</p>
                  <p className="text-2xl font-black text-white">AUTHORITY</p>
                </div>
              </div>

              {/* Shield A - AROUND (Left) */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 text-center">
                <div className="bg-signal-gold/10 border-2 border-signal-gold p-4 rounded-2xl backdrop-blur-sm">
                  <Shield size={40} className="text-signal-gold mx-auto mb-2" />
                  <p className="text-2xl font-black text-signal-gold">A</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold mt-1">AROUND</p>
                </div>
                {/* Connection line */}
                <div className="absolute top-1/2 left-full w-16 h-0.5 bg-signal-gold/30 -translate-y-1/2"></div>
              </div>

              {/* Shield U - UNDER (Top) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
                <div className="bg-signal-gold/10 border-2 border-signal-gold p-4 rounded-2xl backdrop-blur-sm">
                  <Shield size={40} className="text-signal-gold mx-auto mb-2" />
                  <p className="text-2xl font-black text-signal-gold">U</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold mt-1">UNDER</p>
                </div>
                {/* Connection line */}
                <div className="absolute top-full left-1/2 w-0.5 h-16 bg-signal-gold/30 -translate-x-1/2"></div>
              </div>

              {/* Shield T - THROUGH (Bottom) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <div className="bg-signal-gold/10 border-2 border-signal-gold p-4 rounded-2xl backdrop-blur-sm">
                  <Shield size={40} className="text-signal-gold mx-auto mb-2" />
                  <p className="text-2xl font-black text-signal-gold">T</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold mt-1">THROUGH</p>
                </div>
                {/* Connection line */}
                <div className="absolute bottom-full left-1/2 w-0.5 h-16 bg-signal-gold/30 -translate-x-1/2"></div>
              </div>

              {/* Shield O - OVER (Right) */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 text-center">
                <div className="bg-signal-gold/10 border-2 border-signal-gold p-4 rounded-2xl backdrop-blur-sm">
                  <Shield size={40} className="text-signal-gold mx-auto mb-2" />
                  <p className="text-2xl font-black text-signal-gold">O</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold mt-1">OVER</p>
                </div>
                {/* Connection line */}
                <div className="absolute top-1/2 right-full w-16 h-0.5 bg-signal-gold/30 -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Four Vectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vector A - AROUND */}
            <div className="bg-white/5 border-2 border-white/20 p-8 rounded-3xl space-y-4 hover:border-signal-gold/50 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Shield size={48} className="text-signal-gold" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-primary-dark">A</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider text-signal-gold">VECTOR A - AROUND</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE RISK</p>
                  <p className="text-sm text-slate-300">Market volatility or payment gaps reaching Around your cash flow.</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE GUARD (WHAT WE INSTALL)</p>
                  <p className="text-base font-black uppercase text-signal-gold">THE 35-DAY STANDARD</p>
                  <p className="text-sm text-slate-300">Mathematical barriers for revenue cycles and concentration.</p>
                </div>
              </div>
            </div>

            {/* Vector U - UNDER */}
            <div className="bg-white/5 border-2 border-white/20 p-8 rounded-3xl space-y-4 hover:border-signal-gold/50 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Shield size={48} className="text-signal-gold" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-primary-dark">U</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider text-signal-gold">VECTOR U - UNDER</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE RISK</p>
                  <p className="text-sm text-slate-300">Hidden regulatory lapses sliding Under your administrative radar.</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE GUARD (WHAT WE INSTALL)</p>
                  <p className="text-base font-black uppercase text-signal-gold">THE INTEGRITY GUARD</p>
                  <p className="text-sm text-slate-300">A 12-month automated compliance calendar and filing system.</p>
                </div>
              </div>
            </div>

            {/* Vector T - THROUGH */}
            <div className="bg-white/5 border-2 border-white/20 p-8 rounded-3xl space-y-4 hover:border-signal-gold/50 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Shield size={48} className="text-signal-gold" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-primary-dark">T</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider text-signal-gold">VECTOR T - THROUGH</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE RISK</p>
                  <p className="text-sm text-slate-300">Operational chaos punching Through a lack of defined structure.</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE GUARD (WHAT WE INSTALL)</p>
                  <p className="text-base font-black uppercase text-signal-gold">LANE DISCIPLINE FRAMEWORK</p>
                  <p className="text-sm text-slate-300">Structural limits on dispatch and equipment utilization.</p>
                </div>
              </div>
            </div>

            {/* Vector O - OVER */}
            <div className="bg-white/5 border-2 border-white/20 p-8 rounded-3xl space-y-4 hover:border-signal-gold/50 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Shield size={48} className="text-signal-gold" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-primary-dark">O</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider text-signal-gold">VECTOR O - OVER</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE RISK</p>
                  <p className="text-sm text-slate-300">Uncalculated overhead climbing Over your net profit margins.</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">THE GUARD (WHAT WE INSTALL)</p>
                  <p className="text-base font-black uppercase text-signal-gold">THE 24-HOUR GUARD</p>
                  <p className="text-sm text-slate-300">Real-time TCO monitoring and invoicing speed requirements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <Link 
              to="/auto-diagnostic" 
              className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
            >
              <Activity size={20} />
              <span>Run AUTO Diagnostic Assessment</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
            <p className="text-sm text-slate-400">See which guards are missing from your authority protection system.</p>
          </div>
        </div>
      </section>

      {/* PRIORITY 8: ADMISSION GATEKEEPING (WITH SCARCITY STAT) */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-authority-blue/10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <ShieldAlert size={48} className="mx-auto text-signal-gold" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Admission Is Not Open Enrollment</h2>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            You do not buy your way into LaunchPath. <span className="text-signal-gold font-bold">You qualify.</span> Every applicant completes the AUTO Diagnostic and Ground 0 review before admission is considered. If your operation is not structurally ready, you receive corrective priorities and advancement is paused. That protects your authority and it protects the standard.
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

      {/* PRIORITY 7: CUSTODIAN SECTION - SPLIT-SCREEN INSTITUTIONAL AUTHORITY */}
      <section className="relative flex flex-col lg:flex-row overflow-hidden border-t border-white/5">
        {/* LEFT SIDE: PHOTO (40% width) */}
        <div className="w-full lg:w-[40%] relative min-h-[500px] lg:min-h-[700px] shrink-0">
          <img 
            src="/img/vince-lawrence.jpg" 
            alt="Vince Lawrence" 
            className="w-full h-full object-cover grayscale brightness-90" 
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
          {/* Gold border on right edge */}
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-signal-gold via-signal-gold/50 to-signal-gold"></div>
        </div>

        {/* RIGHT SIDE: CONTENT (60% width) */}
        <div className="w-full lg:w-[60%] bg-gradient-to-br from-authority-blue via-slate-900 to-authority-blue relative">
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 space-y-10">
            
            {/* Top Label - Centered */}
            <div className="flex items-center justify-center space-x-2">
              <Shield size={16} className="text-signal-gold" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">STATION CUSTODIAN</p>
            </div>

            {/* Name - Large, Authoritative */}
            <div className="space-y-2">
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                VINCE LAWRENCE
              </h3>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-signal-gold">
                FOUNDER & CUSTODIAN
              </p>
            </div>

            {/* Credentials Grid - 2 Columns */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                <Award size={28} className="text-signal-gold mb-3" />
                <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">U.S. NAVY</p>
                <p className="text-lg font-black uppercase text-white">Veteran</p>
              </div>
              <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
                <Shield size={28} className="text-signal-gold mb-3" />
                <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">OSHA</p>
                <p className="text-lg font-black uppercase text-white">Safety Certified</p>
              </div>
            </div>

            {/* Separator Line */}
            <div className="h-px bg-signal-gold/20 max-w-2xl"></div>

            {/* Primary Statement */}
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-2xl">
              U.S. Navy veteran. OSHA-certified safety coordinator. 20+ years enforcing federal compliance standards and identifying the documentation failures that kill new carriers.
            </p>

            {/* Responsibility Statement - Gold Box */}
            <div className="border-l-4 border-signal-gold bg-signal-gold/5 p-6 rounded-r-xl max-w-2xl space-y-4">
              <p className="text-xl font-bold text-signal-gold leading-tight">
                My job is to keep the standard clear and to refuse admission when a carrier is not structurally ready to operate.
              </p>
              <p className="text-base font-bold text-signal-gold/80 leading-tight">
                Final admission authority retained. Standard enforcement is non-negotiable.
              </p>
            </div>

            {/* Philosophy Quote */}
            <div className="border-l-4 border-signal-gold pl-8 max-w-2xl">
              <p className="text-2xl font-serif italic text-white leading-relaxed">
                "Accuracy Over Hype. Systems Over Shortcuts. Execution Over Everything."
              </p>
            </div>

            {/* Certification Strip (Optional) */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 max-w-2xl pt-6">
              <div className="flex items-center space-x-2">
                <Shield size={14} className="text-signal-gold/40" />
                <span>20+ Years Federal Compliance</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center space-x-2">
                <Award size={14} className="text-signal-gold/40" />
                <span>OSHA Certified</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center space-x-2">
                <Shield size={14} className="text-signal-gold/40" />
                <span>Veteran-Operated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - BOTTOM OF PAGE */}
      <section className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Ready to See Where You Stand?</h3>
          <Link 
            to="/auto-diagnostic" 
            className="inline-flex items-center space-x-3 bg-signal-gold hover:bg-yellow-400 text-primary-dark px-12 py-6 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-signal-gold/30 hover:shadow-signal-gold/50 active:scale-95 group"
          >
            <Activity size={20} />
            <span>Run AUTO Diagnostic Assessment</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
