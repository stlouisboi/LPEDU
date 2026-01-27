
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Lock, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Play, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  Globe,
  ClipboardList,
  Calendar,
  Search,
  Activity,
  Smartphone,
  Shield,
  X,
  Loader2,
  Mail,
  User,
  Monitor,
  Volume2,
  // Add Clock to fix "Cannot find name 'Clock'" error
  Clock
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

interface QuickGuide {
  title: string;
  description: string;
  phase: string;
  icon: React.ReactNode;
  buttonText: string;
  isPublic: boolean;
  requiresEmail?: boolean;
  link?: string;
}

interface VideoBriefing {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

const ResourcesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Lead Capture State
  const [selectedGuide, setSelectedGuide] = useState<QuickGuide | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Video State
  const [activeVideo, setActiveVideo] = useState<VideoBriefing | null>(null);

  const videoBriefings: VideoBriefing[] = [
    { 
      id: '1', 
      title: "DOT Status vs MC Authority Logic", 
      duration: "2:30", 
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder for institutional asset
      description: "A technical breakdown of the administrative distinction between safety registration and commercial operating authority."
    },
    { 
      id: '2', 
      title: "Clearinghouse Governance Logic", 
      duration: "3:15", 
      thumbnail: "https://images.unsplash.com/photo-1579165466511-70e21ad10418?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Understanding the mandatory federal registry for drug and alcohol violations and its impact on new entrant carrier survival."
    },
    { 
      id: '3', 
      title: "New Entrant Risk Analysis", 
      duration: "5:00", 
      thumbnail: "https://images.unsplash.com/photo-1454165833767-0270a3599603?auto=format&fit=crop&q=80&w=600",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Data-driven analysis of the common failure points identified during the first 18 months of motor carrier operation."
    },
  ];

  const quickGuides: QuickGuide[] = [
    {
      title: "Pre-Authority Orientation Checklist",
      description: "Baseline requirements identified prior to motor carrier credential activation.",
      phase: "Ground 0: orientation",
      icon: <ClipboardList className="w-6 h-6" />,
      buttonText: "Access Reference PDF",
      isPublic: true,
      requiresEmail: true,
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003"
    },
    {
      title: "DQ File Reference Standards",
      description: "Identification of the nine mandatory documents for driver qualification records.",
      phase: "Phase 2: Safety & Compliance",
      icon: <FileText className="w-6 h-6" />,
      buttonText: "Review Standards",
      isPublic: false
    },
    {
      title: "2025 Regulatory Filing Calendar",
      description: "Standardized cycle for UCR, MCS-150, and 2290 administrative deadlines.",
      phase: "Phase 2–3: Compliance Operations",
      icon: <Calendar className="w-6 h-6" />,
      buttonText: "Reference Calendar",
      isPublic: false
    },
    {
      title: "Roadside Inspection Orientation",
      description: "Audit-aware guide detailing inspector criteria and vehicle condition standards.",
      phase: "Phase 2: Inspection Readiness",
      icon: <ShieldCheck className="w-6 h-6" />,
      buttonText: "Review Guide",
      isPublic: false
    },
    {
      title: "SMS/CSA Metric Analysis",
      description: "Reference material for interpreting safety performance and measurement scores.",
      phase: "Phase 3: Risk & Reputation",
      icon: <Search className="w-6 h-6" />,
      buttonText: "Analyze Metrics",
      isPublic: false
    },
    {
      title: "Investigation Trigger Analysis",
      description: "Identification of events that precipitate formal FMCSA safety investigations.",
      phase: "Phase 2–3: Audit Survival",
      icon: <AlertCircle className="w-6 h-6" />,
      buttonText: "Review Analysis",
      isPublic: false
    }
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!leadName.trim()) { setFormError('Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) { setFormError('Please enter a valid email.'); return; }

    setIsSubmitting(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: leadName,
          email: leadEmail,
          resourceTitle: selectedGuide?.title,
          downloadedAt: serverTimestamp(),
          source: "resources-page-gate"
        });
      }
      setShowSuccess(true);
      setTimeout(() => {
        if (selectedGuide?.link) window.open(selectedGuide.link, '_blank');
        closeModal();
      }, 1500);
    } catch (err) {
      setFormError('System error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setLeadName('');
    setLeadEmail('');
    setFormError('');
    setShowSuccess(false);
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans text-slate-800">
      
      {/* 1. INSTITUTIONAL HERO */}
      <section className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark pt-24 pb-20 text-center transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-authority-blue dark:text-white tracking-tight mb-6 uppercase">Institutional Resources</h1>
          <p className="text-xl text-slate-600 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Orientation tools and reference documentation for motor carrier operations. Full system implementation and technical safety file installation are performed exclusively within the LaunchPath Standard environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/learning-path" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-lg active:scale-95">
              Reference Implementation Sequence
            </Link>
            <Link to="/readiness" className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white border-2 border-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-gray-700 transition-all active:scale-95">
              Admission Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FOUNDATIONAL REGULATORY CONTEXT (The Section from screenshot) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">Institutional Briefings</p>
          <h2 className="text-4xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight leading-none">Foundational Regulatory Context</h2>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium italic">Orientation briefings provided for initial conceptual alignment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {videoBriefings.map((video) => (
            <div 
              key={video.id} 
              onClick={() => setActiveVideo(video)}
              className="bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-border-dark group shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img src={video.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000" alt={video.title} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-4 ring-white/10 group-hover:scale-125 group-hover:bg-authority-blue transition-all duration-500">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-black/80 px-4 py-1.5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{video.duration}</span>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-xl font-black uppercase text-authority-blue dark:text-white mb-8 leading-tight tracking-tight min-h-[3rem]">
                  {video.title}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-[11px] flex items-center group/btn">
                    VIEW BRIEFING <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-border-dark text-center">
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em]">
            ORIENTATION MATERIALS PROVIDED FOR CONCEPTUAL CLARITY ONLY.
          </p>
        </div>
      </section>

      {/* 3. VIDEO MODAL TERMINAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 bg-authority-blue/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-primary-dark w-full max-w-6xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden relative animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 z-50 p-4 bg-black/10 hover:bg-black/20 text-authority-blue rounded-2xl transition-all"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
              {/* Sidebar Info */}
              <div className="lg:col-span-1 p-10 bg-slate-50 dark:bg-gray-900 border-r border-slate-100 dark:border-border-dark space-y-8">
                 <div className="w-16 h-16 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg">
                    <Monitor size={32} />
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Briefing Unit</span>
                    <h4 className="text-xl font-black uppercase text-authority-blue dark:text-white mt-2 leading-tight">
                      {activeVideo.title}
                    </h4>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <Volume2 size={14} className="mr-2" /> High-Fidelity Audio Enabled
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       <Clock size={14} className="mr-2" /> Length: {activeVideo.duration}
                    </div>
                 </div>
                 <p className="text-sm font-medium text-slate-500 dark:text-text-dark-muted leading-relaxed italic">
                    {activeVideo.description}
                 </p>
                 <div className="pt-8 border-t border-slate-200">
                    <div className="flex items-center space-x-3 text-authority-blue/30 dark:text-signal-gold/20">
                       <Activity size={18} className="animate-pulse" />
                       <span className="text-[9px] font-black uppercase tracking-[0.4em]">ADMIN LINK ACTIVE</span>
                    </div>
                 </div>
              </div>

              {/* Main Player */}
              <div className="lg:col-span-3 aspect-video lg:aspect-auto bg-black flex items-center justify-center">
                 <iframe 
                   src={activeVideo.videoUrl} 
                   className="w-full h-full border-none"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. REFERENCE GUIDES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">Diagnostic Reference Tools</h2>
          <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium italic">Standard orientation documentation for administrative review.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickGuides.map((guide, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {guide.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-tight">{guide.title}</h3>
                <p className="text-sm text-slate-500 dark:text-text-dark-muted font-medium mb-6 leading-relaxed">{guide.description}</p>
                <div className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-gray-800 px-4 py-1.5 rounded-full mb-8">
                  <Shield size={10} className="mr-2" /> {guide.phase}
                </div>
              </div>
              
              {guide.isPublic ? (
                <button 
                  onClick={() => setSelectedGuide(guide)}
                  className="w-full py-5 rounded-2xl bg-authority-blue text-white font-black uppercase text-[10px] tracking-widest hover:bg-steel-blue transition-all flex items-center justify-center shadow-lg active:scale-95"
                >
                  <Download size={14} className="mr-3" /> {guide.buttonText}
                </button>
              ) : (
                <Link 
                  to="/readiness"
                  className="w-full py-5 rounded-2xl border-2 border-slate-100 dark:border-border-dark text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-authority-blue hover:text-authority-blue transition-all flex items-center justify-center"
                >
                  <Lock size={12} className="mr-3 opacity-50" /> Access Protocol Required
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-authority-blue/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/10 max-w-lg w-full relative animate-in zoom-in-95 duration-300">
            <button onClick={closeModal} className="absolute top-10 right-10 p-2 text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-authority-blue/5 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><FileText size={32} /></div>
              <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">Authorization</h3>
              <p className="text-slate-500 font-medium">Provisioning the <strong>{selectedGuide.title}</strong> requires registry verification.</p>
            </div>
            {showSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                <p className="text-lg font-black text-authority-blue uppercase tracking-widest">Access Granted</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-6">
                {formError && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center"><AlertCircle size={16} className="mr-2" />{formError}</div>}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Representative Name</label>
                  <input required placeholder="Jane Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all text-authority-blue dark:text-white" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Registry Email</label>
                  <input required type="email" placeholder="jane@carrier.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all text-authority-blue dark:text-white" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-[2rem] bg-authority-blue text-white font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center">
                  {isSubmitting ? <Loader2 className="animate-spin mr-3" /> : <Download className="mr-3" />} Authorize Transfer
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. ESSENTIAL COMPLIANCE CHECKLISTS */}
      <section className="bg-authority-blue py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white dark:bg-surface-dark rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden transition-all duration-500 border border-white/5">
            <div className="absolute top-0 right-0 p-16 opacity-[0.03] rotate-12 scale-150 pointer-events-none">
              <ShieldCheck size={400} className="text-authority-blue" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-8 leading-[0.9]">Essential <br/><span className="text-signal-gold italic">Compliance</span> Checklists</h2>
                <ul className="space-y-6">
                  {[
                    "New Entrant Application Sequence",
                    "Underwriting Prerequisite Checklist",
                    "Clearinghouse Governance Protocols",
                    "Operational Launch Controls",
                    "Internal System Assessment"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-4 text-slate-600 dark:text-text-dark-primary font-bold">
                      <CheckCircle2 size={20} className="text-signal-gold flex-shrink-0" />
                      <span className="uppercase tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right space-y-8">
                <Link to="/pricing" className="inline-flex items-center space-x-6 bg-authority-blue text-white px-12 py-7 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95 group">
                  <span>Authorized Access</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                  LP REGISTRY AUTH REQUIRED
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="bg-white dark:bg-primary-dark py-32 text-center relative overflow-hidden border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-10 leading-none">Formalize <br/><span className="text-signal-gold italic">Your Operation</span></h2>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Adoption of the Standard formalizes the long-term governance and structural resilience of your operating authority.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/readiness" className="bg-authority-blue text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-steel-blue transition-all shadow-xl active:scale-95">
              Validate Readiness
            </Link>
            <Link to="/pricing" className="bg-signal-gold text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-authority-blue transition-all shadow-xl active:scale-95">
              Initiate Admission
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ResourcesPage;