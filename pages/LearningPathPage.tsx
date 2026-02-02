
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
  Navigation,
  ShieldAlert,
  Anchor
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
  color: string; 
  accent: string; 
  glow: string; 
  bg: string; 
  border: string; 
  gradient: string;
}

const PHASES: PhaseData[] = [
  {
    number: 1,
    title: "Ground 0: The Stewardship Standard",
    duration: "Week 0-1",
    label: "PHASE: EDUCATION",
    priority: "FOUNDATIONAL",
    icon: <Anchor />,
    actions: ["Stewardship Alignment Verification", "Household Capacity Assessment", "Systemic Risk Literacy", "Economic Analysis Logic"],
    moduleIds: [0],
    color: "text-blue-600",
    accent: "bg-blue-600",
    glow: "group-hover:shadow-blue-500/20",
    bg: "bg-blue-50/50",
    border: "border-blue-600",
    gradient: "from-blue-600/10 to-transparent"
  },
  {
    number: 2,
    title: "The Enrollment Shield",
    duration: "Weeks 1-4",
    label: "PHASE: ADMISSION & INTAKE",
    priority: "CRITICAL",
    icon: <ClipboardList />,
    actions: ["Formal Admission Protocol", "USDOT & MC Implementation", "BOC-3 Filing Safeguards", "Clearinghouse Enrollment"],
    moduleIds: [1],
    color: "text-amber-500",
    accent: "bg-amber-500",
    glow: "group-hover:shadow-amber-500/20",
    bg: "bg-amber-50/50",
    border: "border-amber-500",
    gradient: "from-amber-500/10 to-transparent"
  },
  {
    number: 3,
    title: "Authority Hardening",
    duration: "Weeks 4-6",
    label: "PHASE: IMPLEMENTATION",
    priority: "CRITICAL",
    icon: <ShieldCheck />,
    actions: ["Primary Liability Protocol", "Cargo Coverage Standards", "Fiscal Solvency Loop"],
    moduleIds: [3],
    color: "text-emerald-600",
    accent: "bg-emerald-600",
    glow: "group-hover:shadow-emerald-500/20",
    bg: "bg-emerald-50/50",
    border: "border-emerald-600",
    gradient: "from-emerald-600/10 to-transparent"
  },
  {
    number: 4,
    title: "The DQ File Factory",
    duration: "Week 6-Launch",
    label: "PHASE: OPERATIONAL",
    priority: "MANDATORY",
    icon: <Files />,
    actions: ["DQ File Implementation", "Maintenance Workflow", "HOS & ELD Policies"],
    moduleIds: [2],
    color: "text-indigo-600",
    accent: "bg-indigo-600",
    glow: "group-hover:shadow-indigo-500/20",
    bg: "bg-indigo-50/50",
    border: "border-indigo-600",
    gradient: "from-indigo-600/10 to-transparent"
  },
  {
    number: 5,
    title: "Stabilization Loop",
    duration: "Months 1-12",
    label: "PHASE: GOVERNANCE",
    priority: "ADVANCED",
    icon: <Activity />,
    actions: ["Mock Audit Verification", "CSA Score Management", "ELD Data Auditing"],
    moduleIds: [4, 5, 6],
    color: "text-rose-600",
    accent: "bg-rose-600",
    glow: "group-hover:shadow-rose-500/20",
    bg: "bg-rose-50/50",
    border: "border-rose-600",
    gradient: "from-rose-600/10 to-transparent"
  }
];

const TransitionProtocol = () => (
  <div className="max-w-4xl mx-auto my-32 px-6">
    <div className="bg-authority-blue border-l-[12px] border-signal-gold p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Lock size={120} />
      </div>
      <div className="relative z-10 space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">TRANSITION PROTOCOL LP-TP-01</p>
          <h3 className="text-3xl font-black font-serif uppercase tracking-tight">Education → Admission → Implementation</h3>
        </div>
        <p className="text-lg font-medium text-slate-300 leading-relaxed max-w-2xl">
          Successful navigation of the Ground 0 roadmap marks the end of the <span className="text-white underline decoration-signal-gold/40">Education phase</span>. Active remediation tools and systematic implementation are restricted to the Admission phase.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
          <div className="space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-signal-gold">Education Phase</h4>
            <p className="text-sm text-slate-400 font-medium">Diagnostic awareness, risk literacy, and stewardship alignment assessment.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-signal-gold">Admission & Implementation</h4>
            <p className="text-sm text-slate-400 font-medium">Permission-based access to corrective actions, templates, and execution tools.</p>
          </div>
        </div>
        <Link to="/pricing" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-signal-gold hover:text-white transition-all active:scale-95 group">
          <span>Authorize Phase Transition</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

const CheckpointGate = ({ label, sub }: { label: string, sub: string }) => (
  <div className="relative flex flex-col items-center justify-center py-24 z-30">
    <div className="bg-authority-blue border-2 border-signal-gold/40 text-white px-10 py-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(212,175,55,0.2)] text-center max-w-sm w-full relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-signal-gold/50 via-signal-gold to-signal-gold/50"></div>
      <div className="absolute inset-0 bg-signal-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Lock className="w-8 h-8 mx-auto mb-6 text-signal-gold animate-bounce" />
      <h4 className="text-[15px] font-black uppercase tracking-widest leading-tight mb-2">{label}</h4>
      <p className="text-[12px] font-black text-signal-gold mb-6 uppercase tracking-wider">{sub}</p>
      <div className="h-[1px] bg-white/10 mb-6 w-full"></div>
      <p className="text-[14px] font-extrabold leading-relaxed text-white/90 italic px-4">
        “Stewardship requires verified alignment before the authorizing of operational movement.”
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
      <section className="relative pt-32 pb-44 bg-authority-blue text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl animate-reveal-up">
            <Navigation size={14} className="text-signal-gold mr-2" />
            <span className="text-white">Carrier Implementation Sequence</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black mb-8 font-serif uppercase tracking-tighter leading-tight animate-reveal-up">
            The <span className="text-signal-gold italic">Roadmap.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white font-extrabold max-w-4xl mx-auto leading-relaxed mb-12 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            A disciplined multi-phase framework engineered for administrative stabilization and stewardship.
          </p>
        </div>
      </section>

      <section ref={roadmapRef} className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2 z-0 rounded-full">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 via-amber-500 via-emerald-500 via-indigo-600 to-rose-600 transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" style={{ height: `${truckProgress}%` }} />
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-20 z-40 flex-col items-center transition-all duration-300 ease-out" style={{ top: `${truckProgress}%` }}>
            <div className="bg-authority-blue dark:bg-surface-dark text-signal-gold p-4 rounded-2xl shadow-2xl border-2 border-signal-gold/30">
              <TruckIcon size={28} fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="space-y-48 relative z-10">
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.number}>
              <div className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-surface-dark border-4 ${phase.border} rounded-2xl z-20 shadow-xl flex items-center justify-center`}>
                  <div className={`w-2.5 h-2.5 ${phase.accent} rounded-full`}></div>
                </div>
                <div className="hidden md:block md:w-[42%]"></div>
                <div className="w-full md:w-[54%] pl-24 md:pl-0 animate-reveal-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`group bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3.5rem] border-l-[12px] ${phase.border} shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    <div className={`absolute -bottom-16 -right-16 p-10 ${phase.color} opacity-[0.03] group-hover:scale-125 transition-transform`}>
                      {React.cloneElement(phase.icon as React.ReactElement<any>, { size: 300 })}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-10 relative z-10 gap-6">
                      <div className={`w-16 h-16 ${phase.accent} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        {React.cloneElement(phase.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <div className="flex flex-col items-start md:items-end">
                        <span className={`text-[12px] font-black tracking-[0.25em] px-5 py-2 rounded-lg ${phase.accent} text-white uppercase mb-3`}>{phase.label}</span>
                        <div className="flex items-center space-x-2 text-slate-400 font-black uppercase text-[11px] tracking-widest">
                          <Clock size={12} /><span>{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-10 relative z-10">
                      <h3 className="text-3xl md:text-4xl font-black font-serif mb-3 uppercase text-authority-blue dark:text-white tracking-tighter">{phase.title}</h3>
                      <div className="inline-flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
                        <Zap size={14} className={phase.color} /><span>Standard Priority: {phase.priority}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-12 relative z-10">
                      {phase.actions.map((action, i) => (
                        <div key={i} className="flex items-center space-x-4 group/action">
                          <div className={`w-2.5 h-2.5 rounded-full ${phase.accent} opacity-50 group-hover/action:opacity-100 group-hover/action:scale-125 transition-all`} />
                          <span className="text-lg sm:text-xl text-slate-700 dark:text-text-dark-primary font-extrabold tracking-tight uppercase group-hover/action:text-authority-blue">{action}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={phase.number === 1 ? "/readiness" : "/pricing"} className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center space-x-3 bg-slate-50 dark:bg-gray-800 text-slate-500 hover:bg-authority-blue hover:text-white transition-all active:scale-95 group/btn border dark:border-border-dark shadow-sm">
                      <Lock size={16} /><span>{phase.number === 1 ? "Begin Diagnostic Phase" : "Access Implementation Logic"}</span>
                    </Link>
                  </div>
                </div>
              </div>
              {idx === 0 && <TransitionProtocol />}
              {idx === 1 && <CheckpointGate label="Admission Review" sub="Authority & Alignment Verification" />}
              {idx === 3 && <CheckpointGate label="System Validation" sub="Safety Protocol Verification" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="py-60 text-center bg-white dark:bg-primary-dark border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <div className="w-36 h-36 bg-authority-blue/5 rounded-[4rem] border-2 border-authority-blue/10 flex items-center justify-center mb-16 shadow-inner">
              <ShieldCheck size={70} className="text-authority-blue dark:text-signal-gold" />
            </div>
            <h2 className="text-6xl lg:text-7xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-12">Operational <span className="text-signal-gold italic">Mastery.</span></h2>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-16 max-w-3xl leading-relaxed">
              Transitioning from administrative exposure to systematic operating posture.
            </p>
            <Link to="/readiness" className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center group">
              Initiate Admission Protocol<ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>
      </section>
    </div>
  );
};

export default LearningPathPage;
