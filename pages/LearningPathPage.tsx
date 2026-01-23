
import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  ChevronRight,
  Truck as TruckIcon,
  Shield,
  Award
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
  accent: string;
  shadow: string;
  bg: string;
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
    color: "text-authority-blue",
    accent: "bg-authority-blue",
    shadow: "shadow-authority-blue/10",
    bg: "bg-authority-blue/5"
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
    color: "text-signal-gold",
    accent: "bg-signal-gold",
    shadow: "shadow-signal-gold/10",
    bg: "bg-signal-gold/5"
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
    color: "text-emerald-600",
    accent: "bg-emerald-600",
    shadow: "shadow-emerald-600/10",
    bg: "bg-emerald-600/5"
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
    color: "text-indigo-600",
    accent: "bg-indigo-600",
    shadow: "shadow-indigo-600/10",
    bg: "bg-indigo-600/5"
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
    color: "text-rose-600",
    accent: "bg-rose-600",
    shadow: "shadow-rose-600/10",
    bg: "bg-rose-600/5"
  }
];

const LearningPathPage = () => {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [truckProgress, setTruckProgress] = useState(0);
  const roadmapRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!roadmapRef.current) return;
      const element = roadmapRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const triggerPoint = windowHeight / 2;
      const totalDist = rect.height;
      const currentDist = triggerPoint - rect.top;
      
      let progress = (currentDist / totalDist) * 100;
      progress = Math.max(0, Math.min(100, progress));
      setTruckProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      {/* Institutional Header */}
      <section className="relative pt-32 pb-48 bg-authority-blue text-white overflow-hidden text-center border-b-[8px] border-signal-gold/20">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.15),transparent_70%)]"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-white/10 shadow-2xl">
            <Calendar size={14} className="text-signal-gold" />
            <span className="text-white/90">Implementation Sequence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 font-serif uppercase tracking-tighter leading-[0.9]">
            Implementation Path
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-medium mb-12 italic border-l-2 border-white/10 pl-6">
            This roadmap outlines the standardized implementation sequence for carriers operating under the LaunchPath Standard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="group bg-white text-authority-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-white transition-all shadow-2xl active:scale-95 flex items-center">
              Enter the System
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schematic Roadmap Section */}
      <section ref={roadmapRef} className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Implementation Path Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-authority-blue/20 via-authority-blue/40 to-authority-blue/10 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800 -translate-x-1/2 z-0">
          
          {/* Animated Driving Truck (Tablet & Desktop Only) */}
          <div 
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-16 z-40 flex-col items-center transition-all duration-300 ease-out"
            style={{ top: `${truckProgress}%` }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-signal-gold/20 rounded-full blur-xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-authority-blue dark:bg-signal-gold text-white dark:text-authority-blue p-2.5 rounded-xl shadow-2xl rotate-180 border-2 border-white/20">
                <TruckIcon size={24} fill="currentColor" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center space-y-1 opacity-40">
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-ping [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-48 relative z-10">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Checkpoint Node */}
              <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-white dark:bg-surface-dark border-4 ${phase.color.replace('text-', 'border-')} rounded-full z-20 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-125`}>
                <div className={`w-2 h-2 ${phase.accent} rounded-full`}></div>
              </div>
              
              {/* Horizontal Anchor Connector */}
              <div className={`hidden md:block absolute top-1/2 h-0.5 bg-authority-blue/10 dark:bg-slate-800 z-10 ${idx % 2 !== 0 ? 'right-1/2 w-16' : 'left-1/2 w-16'}`}></div>

              {/* Schematic Phase Label - Only Number Displayed */}
              <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 -translate-y-24 flex flex-col items-center z-30`}>
                <span className={`text-[12px] font-black tracking-[0.2em] ${phase.color} opacity-80 uppercase bg-primary-light dark:bg-primary-dark px-5 py-2 border border-slate-100 dark:border-slate-800 rounded-full shadow-sm`}>
                  {phase.number}
                </span>
              </div>

              <div className="hidden md:block md:w-[45%]"></div>
              
              {/* Implementation Card */}
              <div className="w-full md:w-[48%] pl-20 md:pl-0 animate-reveal-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3rem] border-t-8 ${phase.color.replace('text-', 'border-')} border-x border-b border-slate-200 dark:border-border-dark shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:${phase.shadow} transition-all duration-700`}>
                  <div className={`absolute -top-10 -right-10 p-10 ${phase.color} opacity-[0.03] dark:opacity-[0.05] rotate-12 transition-transform duration-700 group-hover:rotate-0`}>
                    {React.cloneElement(phase.icon as React.ReactElement, { size: 180 })}
                  </div>

                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className={`w-16 h-16 ${phase.bg} rounded-[1.5rem] flex items-center justify-center ${phase.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {phase.icon}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full ${phase.bg} border border-slate-100 dark:border-slate-800 ${phase.color} uppercase mb-2`}>
                        {phase.label}
                      </span>
                      <span className="text-[9px] font-black tracking-[0.2em] text-authority-blue/30 dark:text-slate-600 uppercase">{phase.duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black font-serif mb-8 uppercase text-authority-blue dark:text-white tracking-tight leading-none relative z-10 group-hover:text-authority-blue transition-colors">
                    {phase.title}
                  </h3>

                  <div className="space-y-5 mb-12 relative z-10">
                    {phase.actions.map((action, i) => (
                      <div key={i} className="flex items-center text-[11px] text-text-muted dark:text-text-dark-muted font-bold tracking-tight uppercase group/item">
                        <div className={`w-6 h-[2px] bg-slate-200 dark:bg-slate-700 mr-4 transition-all group-hover/item:w-8 ${phase.accent}`}></div>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setEnrollmentModalOpen(true)} 
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 hover:${phase.accent} hover:text-white hover:${phase.color.replace('text-', 'border-')} transition-all relative z-10 shadow-sm active:scale-[0.98]`}
                  >
                    <Lock className="w-3.5 h-3.5 mr-2 opacity-50" />
                    <span>View Procedural Protocol</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Schematic Completion Seal */}
      <section className="py-48 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(30,58,95,0.03),transparent_70%)]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex flex-col items-center stagger-parent">
            {/* Verified Badge Icon */}
            <div className="w-24 h-24 bg-white dark:bg-surface-dark rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center mb-10 shadow-2xl relative stagger-item">
              <div className="absolute inset-0 bg-authority-blue/5 rounded-[2.5rem] animate-pulse"></div>
              <ShieldCheck size={44} className="text-authority-blue dark:text-signal-gold relative z-10" />
            </div>

            {/* Verification Status */}
            <div className="inline-flex items-center space-x-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 px-5 py-2 rounded-full mb-8 stagger-item">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 dark:text-green-400">STATUS: SYSTEM STABLE</span>
            </div>

            {/* The Specific Requested Text - Enhanced Wrapper */}
            <div className="relative py-12 px-8 border-y-2 border-slate-100 dark:border-slate-800 stagger-item">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-light dark:bg-primary-dark px-6">
                <Scale size={18} className="text-slate-300 dark:text-slate-700" />
              </div>
              <p className="text-[13px] md:text-[15px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                End of Schematic Path <br className="md:hidden" />
                <span className="hidden md:inline mx-2 text-slate-200 dark:text-slate-800 opacity-50">//</span> 
                Implementation Sequence Complete
              </p>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary-light dark:bg-primary-dark px-6">
                <Scale size={18} className="text-slate-300 dark:text-slate-700" />
              </div>
            </div>

            <p className="mt-12 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.25em] stagger-item">
              LaunchPath Standard Operating Registry • Document Ref ID: LP-OP-90-V4
            </p>
          </div>
        </div>
      </section>

      {/* Modal - Preservation of Admission Protocol */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] shadow-2xl max-w-2xl w-full relative text-center border-t-[12px] border-authority-blue animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-10 right-10 p-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"><X /></button>
            <div className="w-24 h-24 bg-authority-blue/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
              <Lock size={40} className="text-authority-blue opacity-20" />
            </div>
            <h3 className="text-3xl font-black font-serif uppercase mb-6 text-authority-blue dark:text-white tracking-tight">Admission Required</h3>
            <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium mb-12 leading-relaxed">Verification of admission is required to access structural assets and procedural walkthroughs.</p>
            <Link to="/pricing" className="w-full block bg-authority-blue text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95">Review Admission Protocol</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
