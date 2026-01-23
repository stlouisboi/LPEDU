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
    priority: "CRITICAL - Foundation",
    icon: <ClipboardList className="w-8 h-8" />,
    actions: [
      "Go/No-Go Business Framework Assessment",
      "USDOT & MC Number registration (21-day protest period)",
      "Process Agents (BOC-3) Filing",
      "Drug & Alcohol Clearinghouse Enrollment"
    ],
    moduleIds: [0, 1],
    color: "#1e3a5f",
    gradient: "from-[#1e3a5f] to-[#2d527c]",
    downloadUrl: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003"
  },
  {
    number: 2,
    title: "Phase 2: Insurance & Fiscal Compliance",
    duration: "Weeks 4-6",
    label: "AUTHORITY REQUIRED",
    priority: "CRITICAL - Launch Blocker",
    icon: <ShieldCheck className="w-8 h-8" />,
    actions: [
      "Primary Auto Liability ($750k Federal min / $1M industry std)",
      "Cargo Insurance ($100k standard)",
      "Understanding monitoring and claim exposure",
      "Heavy Vehicle Use Tax (Form 2290)"
    ],
    moduleIds: [3],
    color: "#334155",
    gradient: "from-[#334155] to-[#475569]",
    downloadUrl: "#"
  },
  {
    number: 3,
    title: "Phase 3: The Compliance System",
    duration: "Week 6-Launch",
    label: "OPERATIONS READY",
    priority: "MODERATE - Audit Protection",
    icon: <Files className="w-8 h-8" />,
    actions: [
      "Comprehensive Driver Qualification Files (DQ Files)",
      "Maintenance Management & Periodic Inspections",
      "Hours of Service (HOS) & ELD Policy Implementation",
      "Accident Register Setup"
    ],
    moduleIds: [2],
    color: "#0891b2",
    gradient: "from-[#0891b2] to-[#0e7490]",
    downloadUrl: "#"
  },
  {
    number: 4,
    title: "Phase 4: Audit Readiness & Operations",
    duration: "Months 1-12",
    label: "ONGOING",
    priority: "ADVANCED - Long-term Survival",
    icon: <Target className="w-8 h-8" />,
    actions: [
      "Prepare for New Entrant Safety Audit",
      "Annual UCR & MCS-150 Updates",
      "CSA Score Monitoring",
      "Investigation Red Flag Awareness"
    ],
    moduleIds: [4, 5],
    color: "#d4af37",
    gradient: "from-[#d4af37] to-[#e5c158]",
    downloadUrl: "#"
  }
];

const LearningPathPage = () => {
  const { currentUser } = useAuth();
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  
  const isEnrolled = !!(currentUser && currentUser.email?.includes('enrolled')); 

  const handleDownloadClick = (phase: PhaseData) => {
    if (isEnrolled) {
      if (phase.downloadUrl && phase.downloadUrl !== '#') {
        window.open(phase.downloadUrl, '_blank');
      } else {
        alert("This phase pack is being finalized. You will receive an email notification when it is ready for download.");
      }
    } else {
      setEnrollmentModalOpen(true);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      
      {/* 1. ROADMAP PAGE HERO */}
      <section className="relative pt-24 pb-32 bg-authority-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-white/20">
            <Calendar size={14} className="text-signal-gold" />
            <span>Implementation Timeline</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif leading-tight tracking-tighter">
            The LaunchPath 90-Day Operating Roadmap
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            A federally-aligned implementation timeline designed to protect your authority through your highest-risk window.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => window.scrollTo({top: 1200, behavior: 'smooth'})}
              className="bg-signal-gold text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl active:scale-95"
            >
              Begin With the Risk Map →
            </button>
            <Link to="/pricing" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
              View Enrollment Details →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ROADMAP TIMELINE (FULL DETAIL) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-48 w-1 bg-gradient-to-b from-authority-blue via-steel-blue to-signal-gold -translate-x-1/2 hidden md:block opacity-20"></div>

        <div className="space-y-32">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl z-20 shadow-2xl border-4 bg-white dark:bg-surface-dark transition-all transform hover:scale-110" style={{ borderColor: phase.color, color: phase.color }}>
                {phase.number}
              </div>
              <div className="hidden md:block md:w-[45%]"></div>
              <div className="w-full md:w-[48%] pl-20 md:pl-0">
                <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[3rem] border border-border-light shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${phase.gradient}`}></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900" style={{ color: phase.color }}>
                      {phase.icon}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] block text-text-muted mb-1.5">{phase.duration}</span>
                      <span className="inline-block text-[9px] font-black tracking-widest px-4 py-2 rounded-full text-white uppercase shadow-sm" style={{ backgroundColor: phase.color }}>
                        {phase.label}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black font-serif mb-6 leading-tight tracking-tight uppercase">{phase.title}</h3>
                  <div className="space-y-6 mb-10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">Key Actions</p>
                      <ul className="space-y-3">
                        {phase.actions.map((action, i) => (
                          <li key={i} className="flex items-start text-sm text-text-muted font-bold">
                            <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">Modules to Complete</p>
                      <div className="grid grid-cols-1 gap-2">
                        {phase.moduleIds.map(mid => {
                          const mod = COURSE_MODULES.find(m => m.id === mid);
                          return mod ? (
                            <Link key={mid} to={`/modules/${mid}`} className="flex items-center text-xs font-black uppercase tracking-tight hover:text-authority-blue transition-colors p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                              <ArrowRight size={14} className="mr-2" style={{ color: phase.color }} />
                              {mod.title}
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDownloadClick(phase)} className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center space-x-3 text-white shadow-xl" style={{ backgroundColor: phase.color }}>
                    {!isEnrolled && <Lock className="w-4 h-4 mr-1 opacity-60" />}
                    <Download className="w-5 h-5" />
                    <span>Download Phase {phase.number} Pack</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY THIS TIMELINE MATTERS (TRUST PILLARS) */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-authority-blue text-white rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <Scale size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Regulatory Accuracy</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                Curriculum derived directly from the Federal Motor Carrier Safety Regulations (FMCSRs).
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-signal-gold text-authority-blue rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <FileText size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Audit-Ready Templates</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                We provide the exact forms FMCSA auditors look for, from DQ Files to Maintenance Logs.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-authority-blue text-white rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <Target size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Survival-Focused</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                We focus on the high-risk first 18 months to protect your MC number from revocation.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-12 py-7 rounded-[2rem] text-xl font-black uppercase tracking-widest hover:bg-[#152945] transition-all shadow-xl active:scale-95">
              <span>Secure Full System Access →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FINAL INVITATION */}
      <section className="py-40 bg-slate-50 dark:bg-surface-dark text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
           <h2 className="text-5xl lg:text-[6rem] font-black font-serif tracking-tighter mb-8 text-authority-blue dark:text-white">
              Stop Guessing. <br/><span className="text-signal-gold italic">Start Operating.</span>
           </h2>
           <div className="flex items-center justify-center pt-8">
              <Link to="/pricing" className="inline-flex items-center space-x-5 bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] text-2xl font-black uppercase tracking-widest hover:bg-[#152945] transition-all shadow-xl active:scale-95 group">
                 <span>ENTER THE PATH →</span>
              </Link>
           </div>
        </div>
      </section>

      {/* ENROLLMENT ACCESS GATE MODAL */}
      {enrollmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setEnrollmentModalOpen(false)}>
          <div className="bg-white dark:bg-surface-dark p-8 md:p-16 rounded-[4rem] shadow-2xl border border-border-light max-w-xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setEnrollmentModalOpen(false)} className="absolute top-10 right-10 p-3 rounded-full hover:bg-slate-100 transition-all"><X className="w-8 h-8" /></button>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-authority-blue/10 text-authority-blue rounded-3xl flex items-center justify-center mb-8"><Lock className="w-10 h-10" /></div>
              <h3 className="text-3xl font-black font-serif uppercase mb-4 text-authority-blue dark:text-white">Full System Access Required</h3>
              <p className="text-lg text-text-muted font-bold uppercase tracking-widest mb-10 text-signal-gold">Complete template libraries and implementation toolkits</p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl w-full text-left mb-10">
                <p className="text-sm font-medium leading-relaxed mb-6 italic">"All Phase Pack downloads are included in the single Master Implementation enrollment."</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-4">What you get:</p>
                <ul className="space-y-3">
                  {["Complete DQ file templates", "HOS/ELD policy documents", "Maintenance tracking systems", "Compliance checklists", "Audit preparation tools"].map((item, i) => (
                    <li key={i} className="flex items-center text-sm font-bold text-text-muted"><CheckCircle2 className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <Link to="/pricing" className="w-full bg-authority-blue text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs text-center shadow-xl">View Enrollment Details</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;