
import React, { useState } from 'react';
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
  Star
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';

interface PhaseData {
  number: number;
  title: string;
  duration: string;
  priority: string;
  icon: React.ReactNode;
  requirements: string[];
  color: string;
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
    color: "#1e3a5f" // Navy Blue
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
    color: "#475569" // Slate Gray
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
    color: "#0891b2" // Teal/Cyan
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
    color: "#ca8a04" // Gold
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8 border border-white/20">
            <span className="text-signal-gold"><Star size={12} fill="currentColor" /></span>
            <span>STRUCTURED 90-DAY AUTHORITY JOURNEY</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight">
            The First 90 Days Compliance Roadmap
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
            A proven 4-phase system that takes new owner-operators from authority registration through new entrant audit readiness. Built on verified FMCSA regulations—not YouTube shortcuts that get you shut down. Works for box trucks, step vans, and semis.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <Clock className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">Week-by-Week Timeline</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <Shield className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">FMCSA Verified Guidance</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">Audit-Ready Templates</span>
            </div>
          </div>
          
          <p className="text-[11px] text-white/50 font-bold uppercase tracking-[0.2em]">
            Verified against 8 FMCSA compliance areas · Updated for 2025 regulations
          </p>
        </div>
      </section>

      {/* PART 2: 4-Phase Visual Roadmap */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute left-8 md:left-1/2 top-24 bottom-24 w-1 bg-gradient-to-b from-[#1e3a5f] via-[#475569] to-[#ca8a04] -translate-x-1/2 hidden md:block opacity-20"></div>

        <div className="space-y-16">
          {PHASES.map((phase, idx) => (
            <div key={phase.number} className={`relative flex flex-col md:flex-row items-start md:items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div 
                className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-3xl flex items-center justify-center font-bold text-2xl z-20 shadow-xl border-4 bg-white dark:bg-surface-dark transition-transform hover:scale-110"
                style={{ borderColor: phase.color, color: phase.color }}
              >
                {phase.number}
              </div>

              <div className="hidden md:block md:w-[45%]"></div>

              <div className="w-full md:w-[48%] pl-20 md:pl-0">
                <div className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: phase.color }}></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800" style={{ color: phase.color }}>
                      {phase.icon}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest block text-text-muted mb-1">{phase.duration}</span>
                      <span className="inline-block text-[10px] font-bold px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark text-text-muted">
                        {phase.priority}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold font-serif mb-6 leading-tight">
                    {phase.title}
                  </h3>
                  
                  <ul className="space-y-4 mb-10">
                    {phase.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-text-muted font-medium">
                        <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: phase.color }} />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleDownloadClick(phase)}
                    className="w-full h-[52px] rounded-2xl font-bold flex items-center justify-center space-x-2 text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: phase.color }}
                  >
                    <Download className="w-4 h-4" />
                    <span>📥 Download Phase {phase.number} Pack</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-white dark:bg-surface-dark/20 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-serif">Why Carriers Choose LaunchPath</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-primary-dark p-10 rounded-3xl border border-border-light dark:border-border-dark text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center mx-auto mb-8">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Regulatory Accuracy</h3>
              <p className="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                Every lesson verified against current FMCSA regulations. Works for CDL and Non-CDL authorities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-primary-dark p-10 rounded-3xl border border-border-light dark:border-border-dark text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Audit-Ready Templates</h3>
              <p className="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                Download the exact files FMCSA asks for during new entrant safety audits, including DQ files and log policies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-primary-dark p-10 rounded-3xl border border-border-light dark:border-border-dark text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center mx-auto mb-8">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">New Entrant Survival</h3>
              <p className="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                Focus on the 8 compliance areas that cause 30-40% of new authorities to shut down in the first 18 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark max-w-lg w-full relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            {success ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold font-serif mb-4">Success!</h3>
                <p className="text-text-muted">Your Phase {activePhase?.number} Pack is downloading now. Check your email for your copy.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif leading-none">Get Your Pack</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">Member Resource Integration</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-2 font-serif text-authority-blue dark:text-white">Get Your Phase {activePhase?.number} Compliance Pack</h4>
                <p className="text-sm text-text-muted mb-10 leading-relaxed">
                  Enter your email to download your free {activePhase?.title} checklist, templates, and fatal mistakes guide.
                </p>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-xs font-bold flex items-center border border-red-100">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Your Name (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full h-14 px-6 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="w-full h-14 px-6 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-3 p-2">
                    <input 
                      type="checkbox" 
                      id="newsletter-check" 
                      checked={formData.newsletter}
                      onChange={e => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="w-5 h-5 accent-authority-blue cursor-pointer"
                    />
                    <label htmlFor="newsletter-check" className="text-xs font-bold text-text-muted cursor-pointer">
                      Also send me the LaunchPath First 90 Days newsletter (recommended)
                    </label>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full h-[60px] bg-authority-blue text-white font-bold rounded-2xl flex items-center justify-center group shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Download className="mr-2 w-5 h-5" />
                        <span>📥 Download Now</span>
                      </>
                    )}
                  </button>
                  
                  <div className="text-center pt-2">
                    <button 
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="text-xs font-bold text-text-muted hover:text-authority-blue hover:underline"
                    >
                      No thanks, I'll figure it out myself
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
