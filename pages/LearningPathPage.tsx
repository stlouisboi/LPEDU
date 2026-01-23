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
  Lock
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
    title: "Phase 1: Legal Setup & Authority",
    duration: "Weeks 1-4",
    label: "LAUNCH BLOCKER",
    priority: "CRITICAL",
    icon: <ClipboardList className="w-8 h-8" />,
    actions: ["Business Framework Assessment", "USDOT & MC Registration", "BOC-3 Filing", "Clearinghouse Enrollment"],
    moduleIds: [0, 1],
    color: "#1e3a5f",
    gradient: "from-[#1e3a5f] to-[#2d527c]"
  },
  {
    number: 2,
    title: "Phase 2: Insurance & Fiscal",
    duration: "Weeks 4-6",
    label: "REQUIRED",
    priority: "CRITICAL",
    icon: <ShieldCheck className="w-8 h-8" />,
    actions: ["Primary Liability Protocol", "Cargo Coverage Standards", "Fiscal Solvency Loop"],
    moduleIds: [3],
    color: "#334155",
    gradient: "from-[#334155] to-[#475569]"
  },
  {
    number: 3,
    title: "Phase 3: Operational System",
    duration: "Week 6-Launch",
    label: "READY",
    priority: "MODERATE",
    icon: <Files className="w-8 h-8" />,
    actions: ["DQ File Implementation", "Maintenance Workflow", "HOS & ELD Policies"],
    moduleIds: [2],
    color: "#0891b2",
    gradient: "from-[#0891b2] to-[#0e7490]"
  },
  {
    number: 4,
    title: "Phase 4: Ongoing Monitoring",
    duration: "Months 1-12",
    label: "ONGOING",
    priority: "ADVANCED",
    icon: <Target className="w-8 h-8" />,
    actions: ["Mock Audit Prep", "Annual Filing Cycle", "CSA Score Management"],
    moduleIds: [4, 5],
    color: "#d4af37",
    gradient: "from-[#d4af37] to-[#e5c158]"
  }
];

const LearningPathPage = () => {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      <section className="relative pt-24 pb-32 bg-authority-blue text-white overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-white/20">
            <Calendar size={14} className="text-signal-gold" />
            <span>Implementation Timeline</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif uppercase tracking-tighter">
            Operating Roadmap
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            A federally-aligned implementation timeline designed to protect your authority through the highest-risk window.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="bg-signal-gold text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl active:scale-95">
              Enter the System
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-32">
        {PHASES.map((phase, idx) => (
          <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl z-20 shadow-2xl border-4 bg-white" style={{ borderColor: phase.color, color: phase.color }}>
              {phase.number}
            </div>
            <div className="hidden md:block md:w-[45%]"></div>
            <div className="w-full md:w-[48%] pl-20 md:pl-0">
              <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-border-light shadow-xl relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${phase.gradient}`}></div>
                <div className="flex justify-between mb-8">
                  <div style={{ color: phase.color }}>{phase.icon}</div>
                  <span className="text-[9px] font-black tracking-widest px-4 py-2 rounded-full text-white uppercase" style={{ backgroundColor: phase.color }}>{phase.label}</span>
                </div>
                <h3 className="text-2xl font-black font-serif mb-6 uppercase">{phase.title}</h3>
                <ul className="space-y-3 mb-10">
                  {phase.actions.map((action, i) => (
                    <li key={i} className="flex items-start text-sm text-text-muted font-bold">
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                      {action}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setEnrollmentModalOpen(true)} className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center space-x-3 text-white shadow-xl" style={{ backgroundColor: phase.color }}>
                  <Lock className="w-4 h-4 mr-1" />
                  <span>Download Assets</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl max-w-xl w-full relative text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-10 right-10"><X /></button>
            <Lock size={40} className="mx-auto mb-8 text-authority-blue" />
            <h3 className="text-3xl font-black font-serif uppercase mb-4 text-authority-blue">Access Required</h3>
            <p className="text-lg text-text-muted font-bold mb-10">Complete implementation assets are locked behind admission.</p>
            <Link to="/pricing" className="w-full block bg-authority-blue text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs">View Admission Details</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;