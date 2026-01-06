
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../firebase';
import { 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Download, 
  ChevronDown, 
  AlertTriangle,
  BookOpen,
  Loader2,
  Info,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../App';
import { COURSE_MODULES } from '../constants';
import { HomepageContent } from '../types';

interface HomePageProps {
  previewData?: HomepageContent;
}

const HomePage: React.FC<HomePageProps> = ({ previewData }) => {
  const { settings, addFormSubmission } = useApp();
  const [liveContent, setLiveContent] = useState<HomepageContent | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  const fallbackContent: HomepageContent = {
    hero: {
      headline: settings.heroTitle,
      subheadline: settings.heroSubtitle,
      imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
      primaryCTA: { text: "Start Learning", link: "/enroll" },
      secondaryCTA: { text: "View Path", link: "/learning-path" }
    },
    mission: {
      headline: "Accuracy Over Hype",
      content: "<p>The trucking industry is built on systems. Without them, even the hardest working owner-operator will eventually fail an FMCSA audit. LaunchPath provides the compliance-first education required to survive the new-entrant phase and build a foundation you can scale from—regardless of vehicle type.</p>",
      imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
    },
    stats: [
      { value: "20%", label: "Failure rate for new carriers" },
      { value: "90 Days", label: "To build a compliant system" }
    ],
    faqs: [
      { 
        q: "Is this for CDL only?", 
        a: "No. LaunchPath works whether you need a CDL or not. The course teaches compliance systems that apply to all motor carriers—we just call out where CDL vs non-CDL regulations differ. Module 0 helps you decide which path makes sense for your situation." 
      },
      { 
        q: "How long does the course take?", 
        a: "Most students complete the core modules in 2-4 weeks working part-time. You get lifetime access, so you can move at your own pace and return as regulations change. The goal isn't speed—it's audit readiness before you file for authority." 
      },
      {
        q: "What type of vehicle do I need?",
        a: "None yet. This course works whether you're considering a box truck, step van, or semi. LaunchPath teaches you how to evaluate your options and understand the compliance differences before you invest in equipment."
      },
      {
        q: "Will this help me find loads?",
        a: "No. LaunchPath focuses on compliance, audit readiness, and new-entrant survival. We teach you how to operate legally and sustainably. Load finding and dispatch are separate skills you'll need, but they don't matter if you can't pass an audit."
      }
    ]
  };

  useEffect(() => {
    if (previewData) return;
    
    if (isFirebaseConfigured && db && (db as any).app) {
      const unsub = onSnapshot(
        doc(db, "pages", "home_live"), 
        (snap) => {
          if (snap.exists()) {
            setLiveContent(snap.data() as HomepageContent);
            setFirestoreError(null);
          } else {
            setLiveContent(fallbackContent);
          }
        },
        (error: any) => {
          console.warn("LaunchPath Firestore Sync Error:", error);
          setFirestoreError(error.message);
          setLiveContent(fallbackContent);
        }
      );
      return unsub;
    } else {
      setLiveContent(fallbackContent);
    }
  }, [previewData, settings]);

  const content = previewData || liveContent;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    addFormSubmission({
      type: 'Lead Magnet',
      name: 'Hero Lead (Risk Map)',
      email: leadEmail,
      date: new Date().toISOString()
    });
    setLeadSubmitted(true);
  };

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* System Alert for Admins */}
      {firestoreError && (
        <div className="bg-red-50 border-b border-red-100 p-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between text-red-800 text-[10px] font-bold uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {firestoreError.includes("database (default) does not exist") 
                  ? "CRITICAL: Cloud Firestore Database has not been created." 
                  : "NOTE: Cloud Firestore API may be disabled."} 
                App is running in Local Fallback mode.
              </span>
            </div>
            <div className="mt-2 sm:mt-0 flex gap-4">
              <a href="https://console.cloud.google.com/datastore/setup?project=launchpathedu-426fb" target="_blank" rel="noreferrer" className="underline hover:text-red-600 text-[9px]">Configure Cloud Firestore</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-authority-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-signal-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left animate-reveal-up stagger-parent">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue dark:text-signal-gold px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-authority-blue/10 dark:border-signal-gold/10 stagger-item">
                <ShieldCheck className="w-4 h-4" />
                <span>Accuracy Over Hype — Verified FMCSA Methodology</span>
              </div>
              <h1 className="text-4xl lg:text-7xl font-black tracking-tighter text-authority-blue dark:text-white mb-8 font-serif leading-[1.05] stagger-item">
                {content.hero.headline || settings.heroTitle}
              </h1>
              <p className="text-lg lg:text-2xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 stagger-item">
                {content.hero.subheadline || settings.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center lg:justify-start mb-12 stagger-item">
                <Link to="/enroll" className="w-full sm:w-auto bg-authority-blue text-white px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-steel-blue transition-all shadow-2xl hover:shadow-authority-blue/20 flex items-center justify-center group active:scale-95">
                  Start Learning
                  <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto border-2 border-border-light dark:border-border-dark text-text-primary dark:text-white px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center group active:scale-95">
                  View Path
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Lead Magnet CTA */}
              <div className="max-w-md mx-auto lg:mx-0 p-8 bg-slate-50 dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-[2.5rem] shadow-xl stagger-item">
                {leadSubmitted ? (
                  <div className="text-center py-6 flex flex-col items-center animate-scale-in">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-black text-2xl mb-2">Check your inbox!</h4>
                    <p className="text-sm text-text-muted font-bold uppercase tracking-widest">The Risk Map™ is on its way.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-5">
                    <div className="flex items-center space-x-2 text-authority-blue dark:text-signal-gold mb-2">
                      <Download className="w-5 h-5 animate-bounce" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">Free Download: First 90 Days Risk Map™</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        required
                        type="email" 
                        placeholder="your.email@address.com"
                        className="flex-grow h-14 px-6 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl focus:ring-4 focus:ring-authority-blue/10 outline-none transition-all font-bold text-sm"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                      />
                      <button type="submit" className="h-14 bg-signal-gold text-authority-blue font-black uppercase tracking-widest px-8 rounded-2xl hover:bg-white active:scale-95 transition-all shadow-lg whitespace-nowrap">
                        Get It Now
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            <div className="hidden lg:block relative group animate-reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-slate-100 dark:bg-surface-dark p-3 rounded-[3.5rem] shadow-2xl relative overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700">
                <img 
                  src={content.hero.imageUrl || fallbackContent.hero.imageUrl} 
                  alt="Professional Trucking Fleet" 
                  className="rounded-[3rem] w-full h-[650px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-10 left-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-border-light dark:border-border-dark max-w-[260px] animate-float">
                  <div className="flex items-center space-x-3 mb-3">
                    <ShieldCheck className="text-authority-blue dark:text-signal-gold w-8 h-8" />
                    <span className="text-lg font-black tracking-tight leading-none uppercase italic">Compliance <br/> <span className="text-authority-blue dark:text-signal-gold">Unlocks Profit</span></span>
                  </div>
                  <p className="text-[11px] text-text-muted dark:text-text-dark-muted font-black uppercase tracking-wider">Course verified for Box Trucks & Semis.</p>
                </div>

                <div className="absolute bottom-10 right-10 flex space-x-2">
                   <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-border-light">FMCSA Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-on-scroll">
              <div className="inline-flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-10 border border-red-100 dark:border-red-900/30">
                <AlertTriangle className="w-5 h-5" />
                <span>Regulatory Death Valley</span>
              </div>
              <h2 className="text-3xl lg:text-6xl font-black mb-10 font-serif leading-tight tracking-tight">The 18-Month Survival Gap</h2>
              <div className="space-y-8 text-xl text-text-muted dark:text-text-dark-muted leading-relaxed">
                <p>Most new authorities fail not for lack of work, but for lack of <span className="text-text-primary dark:text-white font-black underline decoration-signal-gold underline-offset-4">audit-proof systems</span>. LaunchPath™ closes the knowledge gap before the DOT inspector arrives.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 stagger-parent">
                  {(content.stats.length ? content.stats : fallbackContent.stats).map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl transition-all group stagger-item">
                      <div className="text-5xl font-black text-authority-blue dark:text-signal-gold mb-3 group-hover:scale-110 transition-transform origin-left">{stat.value}</div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-text-muted leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] border border-border-light dark:border-border-dark shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-authority-blue/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-3xl font-black font-serif mb-10 text-authority-blue dark:text-white leading-tight">
                {content.mission.headline || fallbackContent.mission.headline}
              </h3>
              <div className="prose prose-lg dark:prose-invert font-medium leading-relaxed text-text-muted space-y-6" dangerouslySetInnerHTML={{ __html: content.mission.content || fallbackContent.mission.content }}>
              </div>
              <Link to="/about" className="inline-flex items-center text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-xs mt-12 hover:gap-4 transition-all group/btn">
                Our Core Philosophy <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 border-t border-border-light dark:border-border-dark bg-slate-50 dark:bg-surface-dark/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <div className="w-16 h-16 bg-authority-blue/10 dark:bg-signal-gold/10 text-authority-blue dark:text-signal-gold rounded-[1.5rem] flex items-center justify-center mx-auto mb-8">
                <Sparkles size={32} />
             </div>
             <h2 className="text-4xl lg:text-6xl font-black mb-6 font-serif tracking-tighter">Zero Ambiguity</h2>
             <p className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted">Direct answers to industry hurdles</p>
          </div>
          <div className="space-y-6">
            {(content.faqs.length ? content.faqs : fallbackContent.faqs).map((faq, idx) => (
              <div key={idx} className={`border rounded-3xl overflow-hidden transition-all duration-500 bg-white dark:bg-surface-dark ${openFAQ === idx ? 'shadow-2xl border-authority-blue ring-4 ring-authority-blue/5' : 'border-border-light dark:border-border-dark hover:border-text-muted/30 shadow-sm'}`}>
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
                >
                  <span className={`font-black text-xl leading-tight transition-colors ${openFAQ === idx ? 'text-authority-blue dark:text-white' : 'text-text-primary dark:text-text-dark-primary'}`}>{faq.q}</span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${openFAQ === idx ? 'bg-authority-blue text-white rotate-180' : 'bg-slate-100 dark:bg-gray-800 text-text-muted group-hover:bg-slate-200'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openFAQ === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-8 pt-0 text-text-muted dark:text-text-dark-muted leading-relaxed text-lg border-t border-gray-100 dark:border-gray-800 mt-2">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action / Scroll Observer Implementation */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
