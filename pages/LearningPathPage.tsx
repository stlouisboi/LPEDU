
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  ClipboardList, 
  Files, 
  Target, 
  X, 
  ShieldCheck, 
  Calendar,
  FileText,
  Scale,
  Lock,
  Activity,
  Layers
} from 'lucide-react';
import { COURSE_MODULES } from '../constants';
import { useAuth } from '../AuthContext';

interface PhaseData {
  number: number;
  title: string;
  duration: string;
  label: string;
  priority: string;
  icon: React.ReactNode;
  actions: string[];
  moduleIds: number[];
  color: string;
  gradient: string;
  downloadUrl?: string;
}

const PHASES: PhaseData[] = [
  {
    number: 1,
    title: "The Enrollment Shield",
    duration: "Weeks 1-4",
    label: "PHASE: INITIAL",
    priority: "CRITICAL",
    icon: <ClipboardList className="w-5 h-5" />,
    actions: ["Business Framework Assessment", "USDOT & MC Registration", "BOC-3 Filing", "Clearinghouse Enrollment"],
    moduleIds: [0, 1],
    color: "#1e3a5f",
    gradient: "from-slate-200 to-slate-200"
  },
  {
    number: 2,
    title: "Authority Hardening",
    duration: "Weeks 4-6",
    label: "PHASE: STRUCTURAL",
    priority: "CRITICAL",
    icon: <ShieldCheck className="w-5 h-5" />,
    actions: ["Primary Liability Protocol", "Cargo Coverage Standards", "Fiscal Solvency Loop"],
    moduleIds: [3],
    color: "#334155",
    gradient: "from-slate-200 to-slate-200"
  },
  {
    number: 3,
    title: "The DQ File Factory",
    duration: "Week 6-Launch",
    label: "PHASE: OPERATIONAL",
    priority: "MODERATE",
    icon: <Files className="w-5 h-5" />,
    actions: ["DQ File Implementation", "Maintenance Workflow", "HOS & ELD Policies"],
    moduleIds: [2],
    color: "#1e3a5f",
    gradient: "from-slate-200 to-slate-200"
  },
  {
    number: 4,
    title: "Systematic Maintenance",
    duration: "Months 1-12",
    label: "PHASE: MONITORING",
    priority: "ADVANCED",
    icon: <Layers className="w-5 h-5" />,
    actions: ["Mock Audit Prep", "Annual Filing Cycle", "CSA Score Management"],
    moduleIds: [4, 5],
    color: "#334155",
    gradient: "from-slate-200 to-slate-200"
  },
  {
    number: 5,
    title: "Log Integrity Logic",
    duration: "Continuous",
    label: "PHASE: GOVERNANCE",
    priority: "CRITICAL",
    icon: <Activity className="w-5 h-5" />,
    actions: ["ELD Data Verification", "HOS Violation Audits", "Falsification Prevention Systems"],
    moduleIds: [6],
    color: "#1e3a5f",
    gradient: "from-slate-200 to-slate-200"
  }
];

const LearningPathPage = () => {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      {/* Institutional Header */}
      <section className="relative pt-24 pb-32 bg-authority-blue text-white overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-white/10">
            <Calendar size={14} className="text-white/40" />
            <span>Implementation Sequence</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif uppercase tracking-tighter">
            Implementation Path
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            This roadmap outlines the standardized implementation sequence for carriers operating under the LaunchPath Standard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all active:scale-95">
              Enter the System
            </Link>
          </div>
        </div>
      </section>

      {/* Schematic Roadmap Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Implementation Path Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-300 dark:bg-slate-800 -translate-x-1/2 z-0"></div>

        <div className="space-y-40 relative z-10">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Checkpoint Node (Neutral, Non-Gamified) */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-400 dark:bg-slate-600 z-20"></div>
              
              {/* Horizontal Anchor Connector */}
              <div className={`hidden md:block absolute top-1/2 h-px bg-slate-300 dark:bg-slate-800 z-10 ${idx % 2 !== 0 ? 'right-1/2 w-12' : 'left-1/2 w-12'}`}></div>

              {/* Schematic Phase Label */}
              <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 -translate-y-20 flex flex-col items-center ${idx % 2 !== 0 ? 'md:ml-0' : 'md:ml-0'}`}>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase bg-primary-light dark:bg-primary-dark px-2">
                  PROTO-ID: {phase.number}
                </span>
              </div>

              <div className="hidden md:block md:w-[45%]"></div>
              
              {/* Implementation Card (Briefing Standard) */}
              <div className="w-full md:w-[48%] pl-20 md:pl-0">
                <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all hover:border-slate-400">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-slate-400 dark:text-slate-500">
                      {phase.icon}
                    </div>
                    <span className="text-[9px] font-black tracking-widest px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                      {phase.label}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold font-serif mb-6 uppercase text-authority-blue dark:text-white tracking-tight leading-none">
                    {phase.title}
                  </h3>

                  <ul className="space-y-4 mb-10">
                    {phase.actions.map((action, i) => (
                      <li key={i} className="flex items-start text-xs text-text-muted font-bold tracking-tight uppercase">
                        <div className="w-1.5 h-[1.5px] bg-slate-300 dark:bg-slate-700 mr-3 mt-1.5 flex-shrink-0"></div>
                        {action}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setEnrollmentModalOpen(true)} 
                    className="w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center space-x-3 text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                  >
                    <Lock className="w-3 h-3 mr-1 opacity-50" />
                    <span>View Procedural Protocol</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal - Preservation of Admission Protocol */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white dark:bg-surface-dark p-8 md:p-16 rounded-[2.5rem] shadow-2xl max-w-xl w-full relative text-center border border-slate-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-600"><X /></button>
            <Lock size={32} className="mx-auto mb-8 text-authority-blue opacity-10" />
            <h3 className="text-2xl font-bold font-serif uppercase mb-4 text-authority-blue dark:text-white">Admission Required</h3>
            <p className="text-base text-text-muted font-medium mb-10">Verification of admission is required to access structural assets and procedural walkthroughs.</p>
            <Link to="/pricing" className="w-full block bg-authority-blue text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px]">Review Admission Protocol</Link>
          </div>
        </div>
      )}

      {/* Schematic Footer Note */}
      <section className="py-24 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-800">
           End of Schematic Path // Implementation Sequence Complete
         </p>
      </section>
    </div>
  );
};

export default LearningPathPage;
