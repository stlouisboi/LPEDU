import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Shield, TrendingUp, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

const Ground0BriefingPage = () => {
  const [expandedSin, setExpandedSin] = useState<number | null>(null);

  const deadlySins = [
    { num: 1, title: "Undercapitalization", desc: "Operating without 90-day cash reserves" },
    { num: 2, title: "The Money Loop", desc: "Using revenue from Load B to pay for Load A" },
    { num: 3, title: "Documentary Disorder", desc: "Fragmented driver qualification files" },
    { num: 4, title: "Substance Abuse Gaps", desc: "Missing pre-employment drug test results" },
    { num: 5, title: "HOS Falsification", desc: "Unreconciled driving time in ELD" },
    { num: 6, title: "Insurance Lapse", desc: "Lapsed or non-renewed coverage" },
    { num: 7, title: "Maintenance Deferral", desc: "Skipped vehicle inspections and repairs" },
    { num: 8, title: "Brake System Failure", desc: "Out-of-service brake violations" },
    { num: 9, title: "Tire Defects", desc: "Bald or mismatched tire sets" },
    { num: 10, title: "Cargo Securement", desc: "Improperly secured or overweight loads" },
    { num: 11, title: "Hazmat Violations", desc: "Improper hazmat documentation or handling" },
    { num: 12, title: "Driver Fatigue", desc: "Excessive hours without proper rest" },
    { num: 13, title: "Vehicle Condition", desc: "Structural damage or missing safety equipment" },
    { num: 14, title: "Inspection Avoidance", desc: "Refusing roadside safety inspections" },
    { num: 15, title: "Record Falsification", desc: "Altered maintenance or inspection records" },
    { num: 16, title: "Regulatory Non-Compliance", desc: "Failure to maintain FMCSA filing status" },
  ];

  const fourPillars = [
    {
      title: "Authority Protection",
      desc: "The legal right to operate and the asset at the center of the structure.",
      icon: <Shield size={32} className="text-signal-gold" />
    },
    {
      title: "Insurance Continuity",
      desc: "The financial shield required to move freight and protect that asset.",
      icon: <DollarSign size={32} className="text-signal-gold" />
    },
    {
      title: "Compliance Backbone",
      desc: "The documentary evidence of safety required to satisfy federal investigators.",
      icon: <CheckCircle size={32} className="text-signal-gold" />
    },
    {
      title: "Cash-Flow Oxygen",
      desc: "The capital required to keep the other three pillars alive.",
      icon: <TrendingUp size={32} className="text-signal-gold" />
    }
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-signal-gold/10 border border-signal-gold/30 px-6 py-2.5 rounded-full">
              <AlertTriangle size={16} className="text-signal-gold" />
              <p className="text-xs font-black uppercase tracking-[0.5em] text-signal-gold">INSTITUTIONAL DECISION ENGINE</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tight leading-[0.9]">
              GROUND 0: <span className="text-signal-gold italic">THE READINESS BRIEFING.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
              A 90-minute decision engine that determines if launching a motor carrier authority now is institutionally sound, or if you should WAIT or decline entirely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">FAILURE RATE</p>
              <p className="text-4xl font-black text-signal-gold">40%</p>
              <p className="text-sm text-slate-400 mt-2">of new carriers fail within 18 months</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">DECISION TIME</p>
              <p className="text-4xl font-black text-signal-gold">90 MIN</p>
              <p className="text-sm text-slate-400 mt-2">to evaluate your institutional readiness</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">SURVIVAL ARCHITECTURE</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Four Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fourPillars.map((pillar, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">{pillar.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="flex-shrink-0">{pillar.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-signal-gold/10 border border-signal-gold/30 p-8 rounded-3xl">
            <p className="text-lg font-bold text-slate-200">
              <span className="text-signal-gold font-black">The Interdependence:</span> These four pillars are not separate tasks. They form a single, interlocking system. A failure in one cascades to the others. Ground 0 evaluates your readiness across all four.
            </p>
          </div>
        </div>
      </section>

      {/* THE 16 DEADLY SINS */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">FEDERAL AUDIT FAILURES</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The 16 Deadly Sins</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              High-priority violations that trigger automatic federal audit failure. These are not minor infractions—they are terminal events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deadlySins.map((sin) => (
              <div
                key={sin.num}
                onClick={() => setExpandedSin(expandedSin === sin.num ? null : sin.num)}
                className="bg-white/5 border border-white/10 hover:border-signal-gold/50 p-6 rounded-2xl cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-black text-signal-gold uppercase tracking-widest mb-2">SIN #{sin.num}</p>
                    <h4 className="font-black text-lg uppercase tracking-tight">{sin.title}</h4>
                    <p className="text-sm text-slate-400 mt-2">{sin.desc}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <XCircle size={24} className="text-red-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DECISION FRAMEWORK */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.8em] text-slate-400">OUTCOME LOGIC</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Three Decision Paths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GO */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-3">
                <CheckCircle size={32} className="text-emerald-500" />
                <h3 className="text-2xl font-black uppercase">GO</h3>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-slate-200">You meet the institutional thresholds for launch.</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✓ Adequate capital reserves</li>
                  <li>✓ Clear operational model</li>
                  <li>✓ Compliance readiness</li>
                  <li>✓ Risk tolerance defined</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400">Invitation to the full Operating System (Modules 1–7)</p>
            </div>

            {/* WAIT */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30 p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-3">
                <Clock size={32} className="text-yellow-500" />
                <h3 className="text-2xl font-black uppercase">WAIT</h3>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-slate-200">You are close, but several thresholds are not yet stable.</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✗ Insufficient capital</li>
                  <li>✗ Unclear operational model</li>
                  <li>✗ Compliance gaps</li>
                  <li>✓ Potential with preparation</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400">Actionable checklist to return when ready</p>
            </div>

            {/* NO-GO */}
            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-3">
                <XCircle size={32} className="text-red-500" />
                <h3 className="text-2xl font-black uppercase">NO-GO</h3>
              </div>
              <div className="space-y-4">
                <p className="font-bold text-slate-200">Starting now would put your household at unacceptable risk.</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>✗ Inadequate capital</li>
                  <li>✗ High personal exposure</li>
                  <li>✗ Critical gaps</li>
                  <li>→ Preserve capital, revisit later</li>
                </ul>
              </div>
              <p className="text-xs text-slate-400">Guidance on alternative paths</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 bg-signal-gold text-[#002244]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Ready to Run Ground 0?
            </h2>
            <p className="text-lg md:text-xl font-bold max-w-2xl mx-auto">
              Enter the 90-minute decision engine. No payment required. No sales pitch. Just institutional clarity.
            </p>
          </div>

          <Link
            to="/ground-0/module"
            className="inline-flex items-center space-x-4 bg-[#002244] text-white px-12 py-6 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_rgba(0,34,68,0.4)] hover:bg-slate-800 transition-all active:scale-95 border-b-[8px] border-black group"
          >
            <span>Enter Ground 0 (Free)</span>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>

          <p className="text-xs font-bold text-[#002244]/70 uppercase tracking-widest">
            Estimated time: 90 minutes • No credit card required
          </p>
        </div>
      </section>
    </div>
  );
};

export default Ground0BriefingPage;
