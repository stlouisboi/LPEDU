
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
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { COURSE_MODULES } from '../constants';

interface PhaseData {
  number: number;
  title: string;
  duration: string;
  priority: string;
  icon: React.ReactNode;
  requirements: string[];
  color: string;
  moduleIds: number[];
}

const PHASES: PhaseData[] = [
  {
    number: 1,
    title: "Legal Setup & Authority",
    duration: "Weeks 1-4",
    priority: "CRITICAL - Foundation",
    icon: <ClipboardList className="w-8 h-8" />,
    requirements: [
      "USDOT & MC Number (21-day protest period)",
      "Process Agents (BOC-3) Filing",
      "Drug & Alcohol Clearinghouse Enrollment"
    ],
    color: "#1e3a5f",
    moduleIds: [0, 1]
  },
  {
    number: 2,
    title: "Insurance & Fiscal Compliance",
    duration: "Weeks 4-6",
    priority: "CRITICAL - Launch Blocker",
    icon: <Shield className="w-8 h-8" />,
    requirements: [
      "Primary Auto Liability ($750k Federal min)",
      "Cargo Insurance ($100k standard)",
      "Heavy Vehicle Use Tax (Form 2290)"
    ],
    color: "#475569",
    moduleIds: [2]
  },
  {
    number: 3,
    title: "The Compliance System",
    duration: "Week 6-Launch",
    priority: "MODERATE - Audit Protection",
    icon: <Files className="w-8 h-8" />,
    requirements: [
      "Comprehensive Driver Qualification Files",
      "Maintenance Management & Inspections",
      "Hours of Service (HOS) & ELD Policy"
    ],
    color: "#0891b2",
    moduleIds: [3, 4, 5, 6]
  },
  {
    number: 4,
    title: "Audit Readiness & Operations",
    duration: "Months 1-12",
    priority: "ADVANCED - Long-term Survival",
    icon: <Target className="w-8 h-8" />,
    requirements: [
      "Internal 'Mock Audit' Performance",
      "Quarterly Safety Self-Evaluations",
      "Safety-First Hiring Practices"
    ],
    color: "#ca8a04",
    moduleIds: [7]
  }
];

const LearningPathPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhase, setActivePhase] = useState<PhaseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newsletter: true
  });

  const handleDownloadClick = (phase: PhaseData) => {
    setActivePhase(phase);
    setModalOpen(true);
    setSuccess(false);
    setError(null);
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const triggerDownload = (phaseNum: number) => {
    const link = document.createElement('a');
    link.href = `./downloads/phase-${phaseNum}-pack.pdf`;
    link.download = `LaunchPath-Phase-${phaseNum}-Pack.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (db) {
        await addDoc(collection(db, "leads"), {
          email: formData.email,
          name: formData.name,
          phase: activePhase?.number,
          phaseName: activePhase?.title,
          newsletter: formData.newsletter,
          timestamp: serverTimestamp(),
          source: "website-phase-download",
          userAgent: navigator.userAgent
        });
      }

      setSuccess(true);
      triggerDownload(activePhase?.number || 1);

      setTimeout(() => {
        setModalOpen(false);
        setFormData({ name: '', email: '', newsletter: true });
      }, 2500);

    } catch (err: any) {
      console.error("Lead Capture Error:", err);
      triggerDownload(activePhase?.number || 1);
      setError("⚠️ Download started, but we couldn't save your email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen animate-in fade-in duration-700">
      
      {/* PART 1: Hero Section */}
      <section className="relative pt-24 pb-32 bg-authority-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-reveal-up">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-white/20">
            <span className="text-signal-gold"><Star size={14} fill="currentColor" /></span>
            <span>Structured Authority Roadmap</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 font-serif leading-tight tracking-tighter">
            The 90-Day Carrier <br/><span className="text-signal-gold italic">Success Pathway</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-16 font-medium">
            Building a motor carrier is a technical process. Follow our FMCSA-verified milestones to move from registration to audit-ready status without the expensive guesswork.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {[
              { icon: <Clock />, label: "Week-by-Week" },
              { icon: <Shield />, label: "Audit-Verified" },
              { icon: <CheckCircle2 />, label: "Ready-to-Use Files" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-[1.5rem] hover:bg-white/10 transition-colors">
                <span className="text-signal-gold">{item.icon}</span>
                <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>

          <a href="#path-start" className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all animate-bounce">
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* PART 2: 4-Phase Visual Roadmap */}
      <section id="path-start" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative stagger-parent">
        <div className="absolute left-8 md:left-1/2 top-48 bottom-48 w-1 bg-gradient-to-b from-authority-blue via-steel-blue to-signal-gold -translate-x-1/2 hidden md:block opacity-10"></div>

        <div className="space-y-24">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center stagger-item ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div 
                className="absolute left-0 md:left-1/2 -translate-x-1/2 w-20 h-20 rounded-[2rem] flex items-center justify-center font-black text-3xl z-20 shadow-2xl border-4 bg-white dark:bg-surface-dark transition-all transform hover:rotate-12 hover:scale-110"
                style={{ borderColor: phase.color, color: phase.color }}
              >
                {phase.number}
              </div>

              <div className="hidden md:block md:w-[45%]"></div>

              <div className="w-full md:w-[48%] pl-24 md:pl-0">
                <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: phase.color }}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                    <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 group-hover:scale-110 transition-transform duration-500" style={{ color: phase.color }}>
                      {phase.icon}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] block text-text-muted mb-1.5">{phase.duration}</span>
                      <span className="inline-block text-[9px] font-black tracking-widest px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-text-muted uppercase">
                        {phase.priority}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black font-serif mb-8 leading-none tracking-tight">
                    {phase.title}
                  </h3>
                  
                  <ul className="space-y-5 mb-12 border-b border-gray-100 dark:border-gray-800 pb-10">
                    {phase.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-base text-text-muted font-bold">
                        <CheckCircle2 className="w-6 h-6 mr-4 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                        {req}
                      </li>
                    ))}
                  </ul>

                  {/* Modules for this phase */}
                  <div className="mb-12 space-y-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/60">Module Roadmap</p>
                    <div className="grid grid-cols-1 gap-4">
                       {phase.moduleIds.map(mid => {
                         const mod = COURSE_MODULES.find(m => m.id === mid);
                         return mod ? (
                           <Link 
                            key={mid} 
                            to={`/modules/${mid}`}
                            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl group/mod hover:bg-authority-blue transition-all transform active:scale-[0.98]"
                           >
                             <div className="flex items-center space-x-4">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl group-hover/mod:scale-110 transition-transform shadow-sm">
                                  <BookOpen size={18} className="text-authority-blue" />
                                </div>
                                <span className="text-sm font-black group-hover/mod:text-white uppercase tracking-tight">{mod.title}</span>
                             </div>
                             <ChevronRight size={18} className="text-text-muted group-hover/mod:text-white group-hover/mod:translate-x-1 transition-all" />
                           </Link>
                         ) : null;
                       })}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDownloadClick(phase)}
                    className="w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 group"
                    style={{ backgroundColor: phase.color }}
                  >
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Phase {phase.number} Pack</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-32 bg-white dark:bg-surface-dark/40 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-7xl font-black mb-6 font-serif tracking-tighter">Launch Ready</h2>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted">The industry gold standard for new carriers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-parent">
            {[
              { icon: <ClipboardList />, title: "Precision Docs", desc: "Every lesson cross-verified with current HOS and Part 390 rules." },
              { icon: <ShieldCheck />, title: "Audit Shields", desc: "Pass your New Entrant Audit with zero-defect maintenance and log systems." },
              { icon: <BarChart3 />, title: "Growth Mindset", desc: "Scale your fleet from 1 truck to 20 with systems that work at any size." }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-primary-dark p-12 rounded-[3.5rem] border border-border-light dark:border-border-dark text-center shadow-sm hover:shadow-2xl transition-all group stagger-item">
                <div className="w-20 h-20 bg-authority-blue/10 text-authority-blue rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-transform">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black mb-5 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-text-muted dark:text-text-dark-muted text-lg leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] shadow-2xl border border-border-light dark:border-border-dark max-w-xl w-full relative max-h-[95vh] overflow-y-auto animate-scale-in">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-10 right-10 p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            >
              <X className="w-8 h-8" />
            </button>
            
            {success ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black font-serif mb-6 leading-none">Access Granted</h3>
                <p className="text-lg text-text-muted font-bold">Your Phase {activePhase?.number} Compliance Pack is syncing now.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-5 mb-10">
                  <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-[1.5rem] flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black font-serif leading-none tracking-tight">Phase {activePhase?.number} Asset</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mt-2">Member Resource Access</p>
                  </div>
                </div>

                <h4 className="text-2xl font-black mb-4 font-serif text-authority-blue dark:text-white leading-tight">Get Your {activePhase?.title} Pack</h4>
                <p className="text-lg text-text-muted mb-12 leading-relaxed font-medium">
                  Includes regulatory checklists, fatal mistakes guide, and audit-ready templates for this stage of your authority.
                </p>

                {error && (
                  <div className="mb-10 p-5 bg-red-50 text-red-700 rounded-2xl text-sm font-black flex items-center border border-red-100 uppercase tracking-tight">
                    <AlertCircle className="w-6 h-6 mr-3" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted/70 ml-2">Member Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      className="w-full h-16 px-8 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-3xl outline-none focus:ring-4 focus:ring-authority-blue/10 transition-all font-bold text-lg"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted/70 ml-2">Work Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@carrier.com" 
                      className="w-full h-16 px-8 bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-3xl outline-none focus:ring-4 focus:ring-authority-blue/10 transition-all font-bold text-lg"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-4 p-2">
                    <input 
                      type="checkbox" 
                      id="newsletter-check" 
                      checked={formData.newsletter}
                      onChange={e => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="w-6 h-6 accent-authority-blue cursor-pointer rounded-lg"
                    />
                    <label htmlFor="newsletter-check" className="text-sm font-black text-text-muted uppercase tracking-tight cursor-pointer">
                      Get Weekly Safety Bulletins (Free)
                    </label>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full h-20 bg-authority-blue text-white font-black uppercase tracking-[0.3em] rounded-3xl flex items-center justify-center group shadow-2xl hover:bg-steel-blue active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <>
                        <Download className="mr-3 w-6 h-6" />
                        <span>Secure Download</span>
                      </>
                    )}
                  </button>
                  
                  <div className="text-center pt-4">
                    <button 
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="text-xs font-black uppercase tracking-widest text-text-muted hover:text-authority-blue transition-colors"
                    >
                      Cancel Request
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPathPage;
