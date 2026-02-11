import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, ShieldCheck, Scale, Info, Anchor, ShieldAlert } from 'lucide-react';

interface BriefContent {
  title: string;
  purpose: string;
  core: string;
  failures: string[];
  lesson: string;
}

const BRIEFS: Record<string, BriefContent> = {
  'new-entrant-audit-failures': {
    title: "Why Carriers Fail New Entrant Audits",
    purpose: "This brief explains the structural reasons new carriers fail New Entrant Safety Audits. It provides risk awareness only.",
    core: "Audits fail when systems do not exist before operations begin. Effort is not evaluated. Documentation, consistency, and sequencing are.",
    failures: [
      "Incomplete Driver Qualification files",
      "Drug & Alcohol programs enrolled but inactive",
      "Maintenance records created after incidents",
      "No evidence of ongoing compliance activity"
    ],
    lesson: "Compliance is proven by what already exists — not by what is promised."
  },
  'recordkeeping-errors-investigations': {
    title: "Recordkeeping Errors That Trigger Investigations",
    purpose: "This brief outlines how documentation failures escalate into enforcement actions.",
    core: "Investigations are often triggered by inconsistency, not absence. Records that conflict across systems signal loss of control.",
    failures: [
      "Logs not aligned with dispatch data",
      "Maintenance records not time-sequenced",
      "Files updated only after inspections"
    ],
    lesson: "Documentation is an operational control, not an administrative task."
  },
  'load-selection-risk-factors': {
    title: "Load Selection Risk Factors",
    purpose: "This brief explains how early load decisions introduce unnecessary risk.",
    core: "Load selection is a risk decision before it is a revenue decision. Early misalignment exposes equipment, drivers, and authority.",
    failures: [
      "Loads accepted outside declared authority",
      "Operating before maintenance systems are stable",
      "Distance exceeding documentation capacity"
    ],
    lesson: "Revenue does not stabilize an operation. Systems do."
  },
  'cash-flow-vs-revenue-illusions': {
    title: "Cash Flow vs Revenue Illusions",
    purpose: "This brief clarifies the difference between earned revenue and usable cash flow.",
    core: "Revenue without reserves creates false stability. Fixed obligations operate regardless of receivables.",
    failures: [
      "Fuel and insurance gaps",
      "Maintenance deferred due to cash timing",
      "Dependency on factoring without buffers"
    ],
    lesson: "Liquidity is control. Revenue is not."
  },
  'order-before-expansion': {
    title: "Order Before Expansion",
    purpose: "This brief explains why expansion before stabilization increases failure risk.",
    core: "Growth amplifies weaknesses. Expansion multiplies exposure when order is absent.",
    failures: [
      "Adding equipment before documentation maturity",
      "Hiring before compliance systems scale",
      "Expanding lanes before audit readiness"
    ],
    lesson: "Expansion does not create strength. It reveals it."
  },
  'decision-making-under-pressure': {
    title: "Decision-Making Under Pressure",
    purpose: "This brief explains how pressure degrades compliance decisions.",
    core: "Pressure compresses judgment. Structured systems slow decision-making and preserve control.",
    failures: [
      "Acting on artificial urgency",
      "Delegating compliance decisions externally",
      "Skipping verification steps"
    ],
    lesson: "Pressure does not require speed. It requires discipline."
  },
  'patience-competitive-advantage': {
    title: "Patience as a Competitive Advantage",
    purpose: "This brief explains patience as a risk-control mechanism.",
    core: "Mandatory timelines exist to allow system formation. Attempts to bypass them increase exposure.",
    failures: [
      "Shortcut services",
      "Early operational launch",
      "Reactive decisions driven by comparison"
    ],
    lesson: "Patience is not delay. It is control."
  }
};

const ReferenceBriefPage = () => {
  const { briefId } = useParams();
  const brief = briefId ? BRIEFS[briefId] : null;

  if (!brief) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Resource Mapping Error</p>
          <h1 className="text-3xl font-black uppercase mb-12">Brief Not Found</h1>
          <Link to="/resources" className="bg-authority-blue text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]">Return to Repository</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        
        <Link to="/resources" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-authority-blue transition-colors mb-16 group">
          <ChevronLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Resources
        </Link>

        <div className="bg-white dark:bg-surface-dark rounded-[4rem] border border-slate-100 dark:border-border-dark overflow-hidden shadow-sm">
          {/* Brief Header */}
          <div className="p-12 md:p-20 border-b border-slate-50 dark:border-white/5">
            <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10">
              <Scale size={16} className="text-authority-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">Reference Brief — Orientation Level</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9] font-serif mb-12">
              {brief.title}
            </h1>

            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 border-b border-slate-100 dark:border-white/5 pb-4">Purpose</h3>
              <p className="text-xl text-slate-600 dark:text-text-dark-primary font-bold italic leading-relaxed">
                "{brief.purpose}"
              </p>
            </div>
          </div>

          {/* Core Content */}
          <div className="p-12 md:p-20 space-y-20">
            <section className="space-y-6">
              <div className="flex items-center space-x-3 text-authority-blue">
                <Info size={18} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Core Explanation</h4>
              </div>
              <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed max-w-2xl">
                {brief.core}
              </p>
            </section>

            <section className="space-y-10">
              <div className="flex items-center space-x-3 text-red-600">
                <ShieldAlert size={18} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Common Failure Patterns</h4>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {brief.failures.map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-red-600 mr-6 transition-transform group-hover:scale-150 shrink-0"></div>
                    <span className="text-base font-black uppercase tracking-tight text-slate-700 dark:text-text-dark-primary">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-50 dark:bg-gray-900/50 p-10 md:p-14 rounded-[3rem] border border-slate-100 dark:border-white/5 relative overflow-hidden">
               <Anchor className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12" size={120} />
               <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold mb-6">
                <ShieldCheck size={20} />
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">Institutional Lesson</h4>
              </div>
              <p className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight relative z-10 leading-tight">
                {brief.lesson}
              </p>
            </section>
          </div>

          {/* Mandatory Footer */}
          <div className="bg-authority-blue p-12 md:p-16 text-center">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-white/40 leading-relaxed max-w-2xl mx-auto">
              This reference provides orientation and risk awareness only. Execution occurs through structured implementation.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/readiness"
            className="inline-flex items-center space-x-3 bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group"
          >
            <span>Verify Compliance Posture</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ReferenceBriefPage;