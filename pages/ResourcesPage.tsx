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
  User
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

const ResourcesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Lead Capture State
  const [selectedGuide, setSelectedGuide] = useState<QuickGuide | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const quickGuides: QuickGuide[] = [
    {
      title: "Pre-Authority Launch Checklist",
      description: "Everything you need before activating your MC number.",
      phase: "Phase 0: Orientation",
      icon: <ClipboardList className="w-6 h-6" />,
      buttonText: "Download PDF",
      isPublic: true,
      requiresEmail: true, // Now gated by email
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003"
    },
    {
      title: "DQ File Required Documents",
      description: "The 9 documents every driver file must contain.",
      phase: "Phase 2: Safety & Compliance",
      icon: <FileText className="w-6 h-6" />,
      buttonText: "See What's Included",
      isPublic: false
    },
    {
      title: "Annual Filing Calendar 2025",
      description: "UCR, MCS-150, 2290 — never miss a deadline.",
      phase: "Phase 2–3: Compliance Operations",
      icon: <Calendar className="w-6 h-6" />,
      buttonText: "View Overview",
      isPublic: false
    },
    {
      title: "Roadside Inspection Prep",
      description: "What inspectors check and how to be ready.",
      phase: "Phase 2: Inspection Readiness",
      icon: <ShieldCheck className="w-6 h-6" />,
      buttonText: "View Overview",
      isPublic: false
    },
    {
      title: "CSA Score Quick Guide",
      description: "Understand your SMS/CSA safety measurement scores.",
      phase: "Phase 3: Risk & Reputation",
      icon: <Search className="w-6 h-6" />,
      buttonText: "See What's Included",
      isPublic: false
    },
    {
      title: "Audit Trigger Events",
      description: "What makes FMCSA schedule an investigation.",
      phase: "Phase 2–3: Audit Survival",
      icon: <AlertCircle className="w-6 h-6" />,
      buttonText: "View Overview",
      isPublic: false
    }
  ];

  const advancedPacks = [
    "Complete DQ File Template Pack",
    "New Entrant Audit Response Kit",
    "Violation Severity Matrix",
    "7-Day Authority Prep Email Course"
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!leadName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!validateEmail(leadEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

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

      // Success behavior
      setShowSuccess(true);
      setTimeout(() => {
        if (selectedGuide?.link) {
          window.open(selectedGuide.link, '_blank');
        }
        closeModal();
      }, 1500);
    } catch (err) {
      console.error("Lead capture error:", err);
      setFormError('System error. Please try again or contact support.');
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
    <div className="bg-[#fafaf9] min-h-screen font-sans text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-authority-blue tracking-tight mb-6">Resources</h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Orientation tools and guided references. Full implementation systems are taught inside LaunchPath.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/learning-path" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-lg active:scale-95">
              View Course Curriculum
            </Link>
            <Link to="/enroll" className="bg-white text-authority-blue border-2 border-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95">
              See Enrollment Options
            </Link>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Education only. No legal advice. No income guarantees.
          </p>
        </div>
      </section>

      {/* 2. QUICK REFERENCE GUIDES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-authority-blue uppercase tracking-tight mb-4 leading-none">Quick Reference Guides</h2>
          <p className="text-lg text-slate-500 font-medium italic">Preview-level guides for orientation and research. Full templates and step-by-step implementation are inside LaunchPath.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickGuides.map((guide, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="w-14 h-14 bg-authority-blue/5 text-authority-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {guide.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black text-authority-blue uppercase tracking-tight mb-3 leading-tight">{guide.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-4 leading-relaxed">{guide.description}</p>
                <div className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full mb-8">
                  <Shield size={10} className="mr-1.5" /> {guide.phase}
                </div>
              </div>
              
              {guide.isPublic ? (
                guide.requiresEmail ? (
                  <button 
                    onClick={() => setSelectedGuide(guide)}
                    className="w-full py-4 rounded-xl bg-authority-blue text-white font-black uppercase text-[10px] tracking-widest hover:bg-steel-blue transition-all flex items-center justify-center shadow-md active:scale-95"
                  >
                    <Mail size={14} className="mr-2" /> {guide.buttonText}
                  </button>
                ) : (
                  <a 
                    href={guide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-authority-blue text-white font-black uppercase text-[10px] tracking-widest hover:bg-steel-blue transition-all flex items-center justify-center shadow-md active:scale-95"
                  >
                    <Download size={14} className="mr-2" /> {guide.buttonText}
                  </a>
                )
              ) : (
                <Link 
                  to="/enroll"
                  className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-authority-blue hover:text-authority-blue transition-all flex items-center justify-center"
                >
                  <Lock size={12} className="mr-2 opacity-50" /> {guide.buttonText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-200 max-w-lg w-full relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={closeModal}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-authority-blue/5 text-authority-blue rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-black text-authority-blue uppercase tracking-tight mb-3">Download Your Guide</h3>
              <p className="text-slate-500 font-medium">Enter your details below to receive the <strong>{selectedGuide.title}</strong> and join our safety bulletins list.</p>
            </div>

            {showSuccess ? (
              <div className="text-center py-10 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-lg font-black text-authority-blue uppercase tracking-widest">Resource Ready!</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">Starting your download now...</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-6">
                {formError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center animate-in shake duration-300">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    {formError}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="jane@carrier.com"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-[1.5rem] bg-authority-blue text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95 flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <Download className="mr-2" size={18} />
                  )}
                  Secure Your Access
                </button>
                
                <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest font-bold">
                  By downloading, you agree to receive education updates. <br/>We never sell your data to brokers or insurers.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. ESSENTIAL COMPLIANCE CHECKLISTS (Locked) */}
      <section className="bg-authority-blue py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 scale-150 pointer-events-none">
              <ShieldCheck size={300} className="text-authority-blue" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-authority-blue uppercase tracking-tight mb-8 leading-none">Essential <br/><span className="text-signal-gold">Compliance Checklists</span></h2>
                <ul className="space-y-4">
                  {[
                    "New Entrant Application Process (step-by-step)",
                    "Insurance Shopping Checklist (coverage requirements)",
                    "Clearinghouse Enrollment Steps",
                    "First Day of Operations Checklist",
                    "Mock Audit Self-Assessment"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-4 text-slate-600 font-bold">
                      <CheckCircle2 size={18} className="text-signal-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right space-y-6">
                <Link to="/enroll" className="inline-flex items-center space-x-4 bg-authority-blue text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-2xl active:scale-95 group">
                  <span>Included With LaunchPath Enrollment</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  These tools are designed to be used in sequence with training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE CONCEPTS EXPLAINED SIMPLY */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue mb-4">Educational Previews</p>
          <h2 className="text-3xl font-black text-authority-blue uppercase tracking-tight mb-4 leading-none">Concepts Explained Simply</h2>
          <p className="text-lg text-slate-500 font-medium italic">Short videos that break down complex regulations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "DOT Number vs MC Authority", dur: "2:30", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" },
            { title: "The Drug & Alcohol Clearinghouse", dur: "3:15", img: "https://images.unsplash.com/photo-1579165466511-70e21ad10418?auto=format&fit=crop&q=80&w=600" },
            { title: "Why 1 in 5 New Carriers Fail Their Audit", dur: "5:00", img: "https://images.unsplash.com/photo-1454165833767-0270a3599603?auto=format&fit=crop&q=80&w=600" },
          ].map((video, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 group shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                <img src={video.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="relative w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                  {video.dur}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-black uppercase text-authority-blue mb-4 leading-tight">{video.title}</h3>
                <button className="text-authority-blue font-black uppercase tracking-widest text-[10px] flex items-center group/btn">
                  Watch Now <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Videos explain concepts. LaunchPath provides the complete system and templates.
          </p>
        </div>
      </section>

      {/* 5. ADVANCED IMPLEMENTATION PACKS (Locked) */}
      <section className="py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-authority-blue uppercase tracking-tight mb-4 leading-none">Advanced Implementation Packs</h2>
            <p className="text-lg text-slate-500 font-medium italic">Professional-grade templates and guides designed for active carrier operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {advancedPacks.map((pack, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 flex flex-col items-center justify-center text-center group relative overflow-hidden shadow-sm">
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl text-slate-300">
                  <Lock size={32} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-400 leading-tight">{pack}</h4>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="bg-authority-blue text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Course Access Required</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-dashed border-slate-300 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <p className="text-xl font-black text-authority-blue uppercase tracking-tight mb-2 leading-none">Premium Implementation Systems</p>
              <p className="text-slate-500 font-medium">Enroll in LaunchPath to unlock these professional assets and pass your audit with confidence.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link to="/enroll" className="bg-signal-gold text-authority-blue px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-authority-blue hover:text-white transition-all">
                See Enrollment Options
              </Link>
              <Link to="/learning-path" className="text-authority-blue font-bold text-[11px] uppercase tracking-widest hover:underline">
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. FEDERAL LINKS AND PROVIDERS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Direct Links */}
          <div>
            <h2 className="text-2xl font-black text-authority-blue uppercase tracking-tight mb-4 leading-none">Direct Links to <br/><span className="text-signal-gold">Federal Systems</span></h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">Official FMCSA portals you'll need for registration, monitoring, and compliance maintenance.</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "FMCSA Portal (login/registration)", url: "https://portal.fmcsa.dot.gov/" },
                { name: "Drug & Alcohol Clearinghouse Login", url: "https://clearinghouse.fmcsa.dot.gov/" },
                { name: "Check Your SMS/CSA Scores", url: "https://ai.fmcsa.dot.gov/sms/" },
                { name: "DataQs (challenge violations)", url: "https://dataqs.fmcsa.dot.gov/" },
                { name: "SAFER System (carrier lookup)", url: "https://safer.fmcsa.dot.gov/" },
                { name: "National Registry of Medical Examiners", url: "https://nationalregistry.fmcsa.dot.gov/" }
              ].map((link, i) => (
                <a 
                  key={i}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-authority-blue hover:shadow-lg transition-all group"
                >
                  <span className="font-bold text-slate-700 group-hover:text-authority-blue transition-colors">{link.name}</span>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-authority-blue transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Providers */}
          <div>
            <h2 className="text-2xl font-black text-authority-blue uppercase tracking-tight mb-4 leading-none">Vetted Industry <br/><span className="text-signal-gold">Service Providers</span></h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed uppercase text-[10px] font-black tracking-widest opacity-60">LaunchPath doesn't receive commissions. These are recommended for reliability.</p>
            
            <div className="space-y-10">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-3 mb-6 flex items-center">
                  <Globe size={14} className="mr-2" /> BOC-3 Process Agents
                </h4>
                <ul className="space-y-4">
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">Process Agent Inc. <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">Truckers Report BOC-3 <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-3 mb-6 flex items-center">
                  <Activity size={14} className="mr-2" /> Drug Testing Consortiums
                </h4>
                <ul className="space-y-4">
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">National Drug Screening <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">DISA Global Solutions <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-3 mb-6 flex items-center">
                  <Smartphone size={14} className="mr-2" /> ELD Providers
                </h4>
                <ul className="space-y-4">
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">Motive (Formerly KeepTruckin) <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                  <li><a href="#" className="font-bold text-slate-700 hover:text-authority-blue transition-colors flex items-center justify-between group">Samsara <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-authority-blue uppercase tracking-tight leading-none">Resource FAQ</h2>
        </div>
        <div className="space-y-4">
          {[
            { 
              q: "Why aren't all templates downloadable?", 
              a: "Compliance tools work best in sequence. Many templates require technical background provided in the course to be used correctly. LaunchPath teaches the system behind the documents." 
            },
            { 
              q: "Do I need LaunchPath to stay compliant?", 
              a: "No. Federal regulations are public information. These orientation resources help you research. LaunchPath helps you implement a complete system faster and with less risk." 
            }
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-700">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-6 pt-0 text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-50 animate-in fade-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-none">Ready to build your <br/><span className="text-signal-gold italic text-white/90">compliance system?</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Orientation resources help you start. LaunchPath systems keep your authority alive through federal scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/learning-path" className="bg-white text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold hover:text-authority-blue transition-all shadow-2xl active:scale-95 flex items-center">
              View Course Curriculum
            </Link>
            <Link to="/enroll" className="bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl active:scale-95">
              See Enrollment Options
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ResourcesPage;