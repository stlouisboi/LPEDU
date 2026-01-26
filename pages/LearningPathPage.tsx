
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
  Clock
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
  gradient: string;
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
    shadow: "shadow-authority-blue/20",
    bg: "bg-authority-blue/5",
    gradient: "from-authority-blue/10 to-transparent"
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
    shadow: "shadow-signal-gold/20",
    bg: "bg-signal-gold/5",
    gradient: "from-signal-gold/10 to-transparent"
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
    shadow: "shadow-emerald-600/20",
    bg: "bg-emerald-600/5",
    gradient: "from-emerald-600/10 to-transparent"
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
    shadow: "shadow-indigo-600/20",
    bg: "bg-indigo-600/5",
    gradient: "from-indigo-600/10 to-transparent"
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
    shadow: "shadow-rose-600/20",
    bg: "bg-rose-600/5",
    gradient: "from-rose-600/10 to-transparent"
  }
];

const CheckpointGate = ({ label, sub }: { label: string, sub: string }) => (
  <div className="relative flex flex-col items-center justify-center py-20 z-30">
    <div className="bg-authority-blue border-4 border-signal-gold/40 text-white px-10 py-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-signal-gold"></div>
      <Lock className="w-6 h-6 mx-auto mb-4 text-signal-gold" />
      <h4 className="text-[16px] font-black uppercase tracking-widest leading-tight mb-1">{label}</h4>
      <p className="text-[12px] font-bold text-signal-gold/80 mb-4">{sub}</p>
      <div className="h-px bg-white/10 mb-4 w-full"></div>
      <p className="text-[13px] font-medium leading-relaxed opacity-80 italic">
        “Progress to the next phase is unlocked after LaunchPath review against the operating standard.”
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
      <section className="relative pt-32 pb-40 bg-authority-blue text-white overflow-hidden text-center border-b-[12px] border-signal-gold/30">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(212,175,55,0.2),transparent_70%)]"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-white/10 shadow-2xl animate-reveal-up">
            <Zap size={14} className="text-signal-gold animate-pulse" />
            <span className="text-white/90">The Standard Implementation Sequence</span>
          </div>
          <h1 className="text-6xl md:text-[110px] font-black mb-8 font-serif uppercase tracking-tighter leading-[0.8] animate-reveal-up">
            The <span className="text-signal-gold">Roadmap</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-medium mb-12 italic border-l-4 border-signal-gold/40 pl-8 text-left md:text-center animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            A precision-engineered pathway designed to transition new motor carriers from regulatory exposure to absolute administrative refuge.
          </p>
        </div>
      </section>

      {/* Roadmap Explainer Gating Logic */}
      <section className="bg-white dark:bg-primary-dark pt-20 pb-10 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold mb-6">
             <Shield size={20} />
             <span className="text-[14px] font-black uppercase tracking-[0.4em]">Governance Protocol</span>
           </div>
           <p className="text-lg md:text-xl text-slate-700 dark:text-text-dark-primary font-bold leading-relaxed max-w-3xl mx-auto">
             Movement between phases is gated by LaunchPath Checkpoints. Each checkpoint requires submission and review of your documentation against the LaunchPath Standard before the next phase opens.
           </p>
        </div>
      </section>

      {/* Schematic Roadmap Section */}
      <section ref={roadmapRef} className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Implementation Path Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0 rounded-full">
          {/* Progress Overlay Line */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-authority-blue via-signal-gold to-rose-600 transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]"
            style={{ height: `${truckProgress}%` }}
          />
          
          {/* Animated Driving Truck */}
          <div 
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-20 z-40 flex-col items-center transition-all duration-300 ease-out"
            style={{ top: `${truckProgress}%` }}
          >
            <div className="relative group">
              <div className="absolute -inset-8 bg-signal-gold/30 rounded-full blur-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-authority-blue dark:bg-signal-gold text-white dark:text-authority-blue p-3.5 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] border-2 border-white/30 transform transition-transform duration-500 group-hover:scale-110">
                <TruckIcon size={32} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-40 relative z-10">
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.number}>
              <div className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Checkpoint Node (Dot on Line) */}
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-surface-dark border-4 ${phase.color.replace('text-', 'border-')} rounded-[1.25rem] z-20 shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12`}>
                  <div className={`w-3 h-3 ${phase.accent} rounded-full animate-pulse`}></div>
                </div>
                
                {/* Connecting Arm */}
                <div className={`hidden md:block absolute top-1/2 h-0.5 bg-gradient-to-r ${idx % 2 !== 0 ? 'from-transparent to-slate-200' : 'from-slate-200 to-transparent'} dark:from-slate-800 dark:to-transparent z-10 ${idx % 2 !== 0 ? 'right-1/2 w-24' : 'left-1/2 w-24'}`}></div>

                <div className="hidden md:block md:w-[42%]"></div>
                
                {/* Implementation Card */}
                <div className="w-full md:w-[52%] pl-24 md:pl-0 animate-reveal-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className={`bg-white dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] border-l-[16px] ${phase.color.replace('text-', 'border-')} shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:-translate-y-2`}>
                    
                    {/* Phase Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    
                    {/* Decorative Icon */}
                    <div className={`absolute -top-12 -right-12 p-10 ${phase.color} opacity-[0.03] dark:opacity-[0.07] transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-150`}>
                      {React.cloneElement(phase.icon as React.ReactElement, { size: 240 })}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start mb-12 relative z-10 gap-6">
                      <div className={`w-20 h-20 ${phase.bg} rounded-[2rem] flex items-center justify-center ${phase.color} shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        {React.cloneElement(phase.icon as React.ReactElement, { size: 36 })}
                      </div>
                      <div className="flex flex-col items-start md:items-end text-left md:text-right">
                        <span className={`text-[14px] font-black tracking-[0.3em] px-6 py-2.5 rounded-full ${phase.bg} border border-slate-100 dark:border-slate-800 ${phase.color} uppercase mb-3 shadow-sm`}>
                          {phase.label}
                        </span>
                        <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500">
                          <Clock size={16} />
                          <span className="text-[13px] font-black tracking-widest uppercase">{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-10 relative z-10">
                      <h3 className="text-3xl md:text-5xl font-black font-serif mb-4 uppercase text-authority-blue dark:text-white tracking-tighter leading-[0.9] group-hover:text-authority-blue transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-[14px] font-black uppercase tracking-[0.4em] text-signal-gold mb-8 flex items-center">
                        <Shield size={18} className="mr-2" />
                        Protocol Priority: {phase.priority}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-12 relative z-10">
                      {phase.actions.map((action, i) => (
                        <div key={i} className="flex items-center text-[16px] text-slate-800 dark:text-text-dark-primary font-bold tracking-tight uppercase group/item">
                          <div className={`w-10 h-[4px] bg-slate-200 dark:bg-slate-700 mr-4 transition-all group-hover/item:w-14 ${phase.accent} group-hover/item:shadow-[0_0_8px_rgba(0,0,0,0.2)] rounded-full`}></div>
                          <span className="transition-colors group-hover/item:text-authority-blue leading-tight">{action}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setEnrollmentModalOpen(true)} 
                      className={`w-full py-7 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center space-x-4 text-slate-600 dark:text-slate-300 border-2 border-slate-100 dark:border-slate-800 hover:border-authority-blue hover:bg-authority-blue hover:text-white transition-all relative z-10 shadow-sm active:scale-95 group/btn`}
                    >
                      <Lock className="w-5 h-5 transition-transform group-hover/btn:scale-125" />
                      <span>Access Implementation Protocols</span>
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkpoint Injection: Between Phase 2 and 3 */}
              {idx === 1 && (
                <CheckpointGate 
                  label="Checkpoint 1 – Documentation Verification"
                  sub="(Authority + Insurance)"
                />
              )}

              {/* Checkpoint Injection: Between Phase 4 and 5 */}
              {idx === 3 && (
                <CheckpointGate 
                  label="Checkpoint 2 – Compliance File Verification"
                  sub="(DQF, D&A, HOS, Maintenance)"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Institutional Completion Seal */}
      <section className="py-60 px-4 text-center relative overflow-hidden bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col items-center stagger-parent">
            <div className="w-32 h-32 bg-authority-blue/5 dark:bg-white/5 rounded-[4rem] border-2 border-authority-blue/10 dark:border-white/10 flex items-center justify-center mb-12 shadow-inner relative stagger-item group">
              <div className="absolute inset-0 rounded-[4rem] bg-signal-gold/10 scale-0 group-hover:scale-110 transition-transform duration-700"></div>
              <ShieldCheck size={60} className="text-authority-blue dark:text-signal-gold relative z-10 transform transition-transform duration-700 group-hover:rotate-[360deg]" />
            </div>

            <div className="inline-flex items-center space-x-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 px-8 py-3 rounded-full mb-10 stagger-item shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[14px] font-black uppercase tracking-[0.5em] text-green-600 dark:text-green-400">STATUS: SYSTEM STABLE</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-8 stagger-item">
              Operational Mastery
            </h2>

            <div className="relative py-14 px-12 border-y-4 border-slate-50 dark:border-slate-800/50 stagger-item mb-12">
              <p className="text-[18px] md:text-[22px] font-black uppercase tracking-[0.7em] text-authority-blue dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                End of Schematic Path <br className="md:hidden" />
                <span className="hidden md:inline mx-6 text-slate-200 dark:text-slate-800 opacity-50">//</span> 
                Protocol Complete
              </p>
            </div>

            <p className="text-[14px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em] stagger-item mb-16">
              LaunchPath Standard Operating Registry • Document Ref ID: LP-OP-90-V4
            </p>

            <Link to="/pricing" className="bg-authority-blue text-white px-16 py-7 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center group">
              Initiate Admission
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal - Preservation of Admission Protocol */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-authority-blue/40 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white dark:bg-surface-dark p-12 md:p-24 rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] max-w-3xl w-full relative text-center border-t-[16px] border-authority-blue animate-in zoom-in-95 duration-500" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-12 right-12 p-4 text-slate-300 hover:text-authority-blue dark:hover:text-white transition-all transform hover:rotate-90"><X size={32} /></button>
            <div className="w-32 h-32 bg-authority-blue/5 rounded-[3.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner">
              <Lock size={56} className="text-authority-blue opacity-20" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black font-serif uppercase mb-8 text-authority-blue dark:text-white tracking-tighter leading-none">Admission Required</h3>
            <p className="text-xl text-text-muted dark:text-text-dark-muted font-medium mb-16 leading-relaxed max-w-xl mx-auto">
              System classification and structural verification are mandatory prerequisites for referencing technical implementation safety files.
            </p>
            <Link to="/pricing" className="w-full block bg-authority-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95 hover:shadow-authority-blue/30">
              Initiate Admission Protocol
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
