import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Shield, 
  Download, 
  ArrowRight, 
  ClipboardList, 
  Files, 
  Target, 
  X, 
  Mail, 
  Loader2, 
  CheckCircle, 
  ShieldCheck, 
  BarChart3,
  Star,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Calendar,
  AlertTriangle,
  FileText,
  Scale,
  Lock
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
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
    icon: <Shield className="w-8 h-8" />,
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
  const [modalOpen, setModalOpen] = useState(false);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<PhaseData | null>(null);
  
  // Mock check for paid tier enrollment
  // In a real app, this would check user.customClaims or a Firestore profile
  const isEnrolled = !!(currentUser && currentUser.email?.includes('enrolled')); 

  const handleDownloadClick = (phase: PhaseData) => {
    setActivePhase(phase);
    
    if (isEnrolled) {
      // User is enrolled, trigger immediate download
      if (phase.downloadUrl && phase.downloadUrl !== '#') {
        window.open(phase.downloadUrl, '_blank');
      } else {
        alert("This phase pack is being finalized. You will receive an email notification when it is ready for download.");
      }
    } else {
      // Access gate: User needs to enroll
      setEnrollmentModalOpen(true);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 bg-authority-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-reveal-up">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-white/20">
            <Calendar size={14} className="text-signal-gold" />
            <span>Implementation Timeline</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif leading-tight tracking-tighter">
            The LaunchPath Roadmap: <br/><span className="text-signal-gold italic">Your First 90 Days</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
            This isn't just course modules. This is your implementation timeline from authority application to audit readiness.
          </p>
        </div>
      </section>

      {/* 2. ROADMAP TIMELINE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-48 bottom-48 w-1 bg-gradient-to-b from-authority-blue via-steel-blue to-signal-gold -translate-x-1/2 hidden md:block opacity-20"></div>

        <div className="space-y-32">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Progress Indicator Node */}
              <div 
                className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl z-20 shadow-2xl border-4 bg-white dark:bg-surface-dark transition-all transform hover:scale-110"
                style={{ borderColor: phase.color, color: phase.color }}
              >
                {phase.number} <span className="text-[10px] ml-1 opacity-40">/ 4</span>
              </div>

              {/* Spacer for md+ screens */}
              <div className="hidden md:block md:w-[45%]"></div>

              {/* Content Card */}
              <div className="w-full md:w-[48%] pl-20 md:pl-0">
                <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${phase.gradient}`}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 group-hover:scale-110 transition-transform duration-500" style={{ color: phase.color }}>
                      {phase.icon}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] block text-text-muted mb-1.5">{phase.duration}</span>
                      <span 
                        className="inline-block text-[9px] font-black tracking-widest px-4 py-2 rounded-full text-white uppercase shadow-sm"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black font-serif mb-6 leading-tight tracking-tight uppercase">
                    {phase.title}
                  </h3>
                  
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

                  <button 
                    onClick={() => handleDownloadClick(phase)}
                    className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center space-x-3 text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 group"
                    style={{ backgroundColor: phase.color }}
                  >
                    {!isEnrolled && <Lock className="w-4 h-4 mr-1 opacity-60" />}
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Phase {phase.number} Pack</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: TRUST PILLARS */}
      <section className="py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col items-center text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-authority-blue text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Scale size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Regulatory Accuracy</h3>
              <p className="text-text-muted dark:text-text-dark-muted font-medium leading-relaxed">
                Our curriculum is derived directly from the Federal Motor Carrier Safety Regulations (FMCSRs), ensuring you build your business on a foundation of actual law, not industry rumors or shortcuts.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col items-center text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-signal-gold text-authority-blue rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <FileText size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Audit-Ready Templates</h3>
              <p className="text-text-muted dark:text-text-dark-muted font-medium leading-relaxed">
                We provide the exact forms FMCSA auditors look for, from Driver Qualification Files to Maintenance Logs. No more guessing what paperwork you need to keep your authority active.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark flex flex-col items-center text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-authority-blue text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <Target size={36} />
              </div>
              <h3 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4 tracking-tight">Survival-Focused</h3>
              <p className="text-text-muted dark:text-text-dark-muted font-medium leading-relaxed">
                We don't focus on the "get rich quick" side of trucking. We focus on the high-risk first 18 months, helping you implement systems that protect your MC number from federal scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY THIS TIMELINE MATTERS */}
      <section className="py-32 bg-slate-50 dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-6xl font-black font-serif tracking-tighter uppercase leading-none text-authority-blue dark:text-white">
              Why This Timeline <span className="text-signal-gold italic">Matters</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-primary-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-authority-blue/5 rounded-2xl flex items-center justify-center mb-8 text-authority-blue group-hover:rotate-6 transition-transform">
                <Clock size={32} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">You Can't Rush Authority</h4>
              <p className="text-text-muted font-medium leading-relaxed">
                The 21-day MC protest period is federally mandated. Use this time to build your compliance foundation—don't waste it waiting.
              </p>
            </div>

            <div className="bg-white dark:bg-primary-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-steel-blue/5 rounded-2xl flex items-center justify-center mb-8 text-steel-blue group-hover:rotate-6 transition-transform">
                <Shield size={32} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">Insurance Takes Time</h4>
              <p className="text-text-muted font-medium leading-relaxed">
                New authority insurance quotes can take 7-14 days. Start Phase 2 early or you'll delay your launch.
              </p>
            </div>

            <div className="bg-white dark:bg-primary-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-signal-gold/5 rounded-2xl flex items-center justify-center mb-8 text-signal-gold group-hover:rotate-6 transition-transform">
                <AlertTriangle size={32} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">Audits Happen Fast</h4>
              <p className="text-text-muted font-medium leading-relaxed">
                FMCSA gives 48-72 hours notice for New Entrant Audits. If your files aren't ready by Phase 3, you're gambling with your authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENROLLMENT ACCESS GATE MODAL */}
      {enrollmentModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={() => setEnrollmentModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-surface-dark p-8 md:p-16 rounded-[4rem] shadow-2xl border border-border-light dark:border-border-dark max-w-xl w-full relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setEnrollmentModalOpen(false)}
              className="absolute top-10 right-10 p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-authority-blue/10 text-authority-blue rounded-3xl flex items-center justify-center mb-8">
                <Lock className="w-10 h-10" />
              </div>
              
              <h3 className="text-3xl font-black font-serif leading-tight tracking-tight uppercase mb-4 text-authority-blue dark:text-white">
                Phase Packs Included <br/>With Enrollment
              </h3>
              
              <p className="text-lg text-text-muted font-bold uppercase tracking-widest mb-10 text-signal-gold">
                Complete template libraries and implementation toolkits
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-100 dark:border-border-dark w-full text-left mb-10">
                <p className="text-sm font-medium leading-relaxed text-text-primary dark:text-white mb-6 italic">
                  "All Phase Pack downloads are included when you enroll in Self-Paced Fundamentals or higher."
                </p>
                
                <p className="text-[11px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-4">What you get:</p>
                <ul className="space-y-3">
                  {[
                    "Complete DQ file templates",
                    "HOS/ELD policy documents",
                    "Maintenance tracking systems",
                    "Compliance checklists",
                    "Audit preparation tools"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm font-bold text-text-muted">
                      <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col w-full space-y-4">
                <Link 
                  to="/enroll" 
                  className="bg-authority-blue text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center shadow-xl hover:bg-steel-blue transition-all active:scale-95"
                >
                  View Enrollment Options
                </Link>
                <Link 
                  to="/about" 
                  className="text-authority-blue dark:text-white font-black uppercase tracking-[0.2em] text-[10px] hover:underline underline-offset-4"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;