
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
  Award,
  Zap,
  Clock,
  Navigation
} from 'lucide-react';
import { COURSE_MODULES } from '../constants';

interface PhaseData {
  number: number;
  title: string;
  duration: string;
  label: string;
  priority: string;
  icon: React.ReactNode;
  actions: string[];
  moduleIds: number[];
  color: string; // Tailwind text class
  accent: string; // Tailwind bg class
  glow: string; // Tailwind shadow class
  bg: string; // Tailwind background opacity class
  border: string; // Tailwind border class
  gradient: string;
}

const PHASES: PhaseData[] = [
  {
    number: 1,
    title: "The Enrollment Shield",
    duration: "Weeks 1-4",
    label: "PHASE: INITIAL",
    priority: "CRITICAL",
    icon: <ClipboardList />,
    actions: ["Business Framework Assessment", "USDOT & MC Registration", "BOC-3 Filing", "Clearinghouse Enrollment"],
    moduleIds: [0, 1],
    color: "text-blue-600",
    accent: "bg-blue-600",
    glow: "group-hover:shadow-blue-500/20",
    bg: "bg-blue-50/50",
    border: "border-blue-600",
    gradient: "from-blue-600/10 to-transparent"
  },
  {
    number: 2,
    title: "Authority Hardening",
    duration: "Weeks 4-6",
    label: "PHASE: STRUCTURAL",
    priority: "CRITICAL",
    icon: <ShieldCheck />,
    actions: ["Primary Liability Protocol", "Cargo Coverage Standards", "Fiscal Solvency Loop"],
    moduleIds: [3],
    color: "text-amber-500",
    accent: "bg-amber-500",
    glow: "group-hover:shadow-amber-500/20",
    bg: "bg-amber-50/50",
    border: "border-amber-500",
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    number: 3,
    title: "The DQ File Factory",
    duration: "Week 6-Launch",
    label: "PHASE: OPERATIONAL",
    priority: "MODERATE",
    icon: <Files />,
    actions: ["DQ File Implementation", "Maintenance Workflow", "HOS & ELD Policies"],
    moduleIds: [2],
    color: "text-emerald-600",
    accent: "bg-emerald-600",
    glow: "group-hover:shadow-emerald-500/20",
    bg: "bg-emerald-50/50",
    border: "border-emerald-600",
    gradient: "from-emerald-600/10 to-transparent"
  },
  {
    number: 4,
    title: "Systematic Maintenance",
    duration: "Months 1-12",
    label: "PHASE: MONITORING",
    priority: "ADVANCED",
    icon: <Layers />,
    actions: ["Mock Audit Prep", "Annual Filing Cycle", "CSA Score Management"],
    moduleIds: [4, 5],
    color: "text-indigo-600",
    accent: "bg-indigo-600",
    glow: "group-hover:shadow-indigo-500/20",
    bg: "bg-indigo-50/50",
    border: "border-indigo-600",
    gradient: "from-indigo-600/10 to-transparent"
  },
  {
    number: 5,
    title: "Log Integrity Logic",
    duration: "Continuous",
    label: "PHASE: GOVERNANCE",
    priority: "CRITICAL",
    icon: <Activity />,
    actions: ["ELD Data Verification", "HOS Violation Audits", "Falsification Prevention Systems"],
    moduleIds: [6],
    color: "text-rose-600",
    accent: "bg-rose-600",
    glow: "group-hover:shadow-rose-500/20",
    bg: "bg-rose-50/50",
    border: "border-rose-600",
    gradient: "from-rose-600/10 to-transparent"
  }
];

const CheckpointGate = ({ label, sub }: { label: string, sub: string }) => (
  <div className="relative flex flex-col items-center justify-center py-24 z-30">
    <div className="bg-authority-blue border-2 border-signal-gold/40 text-white px-10 py-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.2)] text-center max-w-sm w-full relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-signal-gold/50 via-signal-gold to-signal-gold/50"></div>
      <div className="absolute inset-0 bg-signal-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Lock className="w-8 h-8 mx-auto mb-6 text-signal-gold animate-bounce" />
      <h4 className="text-[14px] font-black uppercase tracking-widest leading-tight mb-2">{label}</h4>
      <p className="text-[11px] font-bold text-signal-gold/80 mb-6 uppercase tracking-wider">{sub}</p>
      <div className="h-[1px] bg-white/10 mb-6 w-full"></div>
      <p className="text-[12px] font-medium leading-relaxed text-white/70 italic px-4">
        “Access to operational implementation is restricted until documentation verification is logged.”
      </p>
    </div>
  </div>
);

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
    <div className="bg-[#fafafa] dark:bg-primary-dark min-h-screen animate-in fade-in duration-700 font-sans">
      {/* Institutional Header */}
      <section className="relative pt-32 pb-44 bg-authority-blue text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.15),transparent_60%)]"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl animate-reveal-up">
            <Navigation size={14} className="text-signal-gold mr-2" />
            <span className="text-white">Carrier Implementation Protocol</span>
          </div>
          <h1 className="text-6xl md:text-[120px] font-black mb-8 font-serif uppercase tracking-tighter leading-[0.8] animate-reveal-up">
            The <span className="text-signal-gold italic">Roadmap.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium mb-12 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            A disciplined, multi-phase sequence engineered for absolute administrative stability.
          </p>
          <div className="h-2 w-24 bg-signal-gold/40 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Schematic Roadmap Section */}
      <section ref={roadmapRef} className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Progress Infrastructure (The Line) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2 z-0 rounded-full">
          {/* Glowing Active Path */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 via-amber-500 via-emerald-500 via-indigo-600 to-rose-600 transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            style={{ height: `${truckProgress}%` }}
          />
          
          {/* Animated Driving Truck */}
          <div 
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-20 z-40 flex-col items-center transition-all duration-300 ease-out"
            style={{ top: `${truckProgress}%` }}
          >
            <div className="relative group">
              <div className="absolute -inset-10 bg-signal-gold/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="bg-authority-blue dark:bg-surface-dark text-signal-gold p-4 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] border-2 border-signal-gold/30 transform transition-transform duration-500 group-hover:scale-125">
                <TruckIcon size={28} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-48 relative z-10">
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.number}>
              <div className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Checkpoint Node */}
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-surface-dark border-4 ${phase.border} rounded-2xl z-20 shadow-xl flex items-center justify-center transition-all duration-500 hover:scale-110`}>
                  <div className={`w-2.5 h-2.5 ${phase.accent} rounded-full`}></div>
                </div>
                
                <div className="hidden md:block md:w-[42%]"></div>
                
                {/* Implementation Card */}
                <div className="w-full md:w-[54%] pl-24 md:pl-0 animate-reveal-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`group bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border-l-[12px] ${phase.border} shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] ${phase.glow} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden`}>
                    
                    {/* Background Color Tints */}
                    <div className={`absolute inset-0 ${phase.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Decorative Vector */}
                    <div className={`absolute -bottom-16 -right-16 p-10 ${phase.color} opacity-[0.03] transition-transform duration-1000 group-hover:-rotate-12 group-hover:scale-125`}>
                      {React.cloneElement(phase.icon as React.ReactElement<any>, { size: 300 })}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start mb-10 relative z-10 gap-6">
                      <div className={`w-16 h-16 ${phase.accent} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20 transition-all duration-500 group-hover:rotate-6`}>
                        {React.cloneElement(phase.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <span className={`text-[11px] font-black tracking-[0.2em] px-5 py-2 rounded-lg ${phase.accent} text-white uppercase mb-3 shadow-md`}>
                          {phase.label}
                        </span>
                        <div className="flex items-center space-x-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                          <Clock size={12} />
                          <span>{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative z-10">
                      <h3 className="text-3xl md:text-4xl font-black font-serif mb-3 uppercase text-authority-blue dark:text-white tracking-tighter leading-none">
                        {phase.title}
                      </h3>
                      <div className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Zap size={14} className={phase.color} />
                        <span>Protocol Priority: {phase.priority}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-12 relative z-10">
                      {phase.actions.map((action, i) => (
                        <div key={i} className="flex items-center space-x-4 group/action">
                          <div className={`w-2 h-2 rounded-full ${phase.accent} opacity-30 group-hover/action:opacity-100 transition-all duration-300 scale-100 group-hover/action:scale-150`}></div>
                          <span className="text-[15px] text-slate-700 dark:text-text-dark-primary font-bold tracking-tight uppercase transition-colors group-hover/action:text-authority-blue leading-tight">{action}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setEnrollmentModalOpen(true)} 
                      className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center space-x-3 bg-slate-50 dark:bg-gray-800 text-slate-500 hover:bg-authority-blue hover:text-white transition-all relative z-10 active:scale-95 group/btn border border-slate-100 dark:border-border-dark shadow-sm`}
                    >
                      <Lock size={14} className="group-hover/btn:rotate-12 transition-transform" />
                      <span>Access Implementation Protocols</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkpoint Injection */}
              {idx === 1 && (
                <CheckpointGate 
                  label="Gate 1 – Institutional Setup"
                  sub="Authority & Insurance Verification"
                />
              )}

              {idx === 3 && (
                <CheckpointGate 
                  label="Gate 2 – Operational Launch"
                  sub="Safety System Validation"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Completion Seal */}
      <section className="py-60 px-4 text-center relative overflow-hidden bg-white dark:bg-primary-dark border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 bg-authority-blue/5 rounded-[4rem] border-2 border-authority-blue/10 flex items-center justify-center mb-16 shadow-inner group">
              <ShieldCheck size={70} className="text-authority-blue dark:text-signal-gold transform transition-transform duration-1000 group-hover:rotate-[360deg]" />
            </div>

            <div className="inline-flex items-center space-x-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 px-10 py-4 rounded-full mb-10 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[13px] font-black uppercase tracking-[0.5em] text-green-600 dark:text-green-400">SYSTEM STATUS: ARCHITECTED</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-12">
              Operational <span className="text-signal-gold italic">Mastery.</span>
            </h2>

            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-16 max-w-2xl leading-relaxed">
              Successful transition from administrative exposure to systematic operating posture verified.
            </p>

            <Link to="/pricing" className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center group">
              Initiate Admission Protocol
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-authority-blue/40 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] shadow-2xl max-w-2xl w-full relative text-center border-t-[12px] border-authority-blue animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-10 right-10 p-4 text-slate-300 hover:text-authority-blue transition-all transform hover:rotate-90"><X size={28} /></button>
            <div className="w-24 h-24 bg-authority-blue/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
              <Lock size={40} className="text-authority-blue opacity-30" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black font-serif uppercase mb-6 text-authority-blue dark:text-white">Admission Required</h3>
            <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium mb-12 leading-relaxed max-w-lg mx-auto">
              Access to Phase-specific technical implementation safety files requires institutional admission and structural verification.
            </p>
            <Link to="/pricing" className="w-full block bg-authority-blue text-white py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95">
              Initiate Admission
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
