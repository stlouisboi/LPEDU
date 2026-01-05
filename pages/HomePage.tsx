
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
  Info
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
    <div className="animate-in fade-in duration-500">
      {/* System Alert for Admins if API/DB is missing */}
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
              <a href="https://console.cloud.google.com/datastore/setup?project=launchpathedu-426fb" target="_blank" rel="noreferrer" className="underline hover:text-red-600">Resolve in Console</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-authority-blue/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue dark:text-steel-blue px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-authority-blue/10">
                <ShieldCheck className="w-3 h-3" />
                <span>Accuracy Over Hype — Verified FMCSA Methodology</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-authority-blue dark:text-white mb-8 font-serif leading-tight">
                {content.hero.headline || settings.heroTitle}
              </h1>
              <p className="text-lg lg:text-xl text-text-muted dark:text-text-dark-muted mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {content.hero.subheadline || settings.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center lg:justify-start mb-8">
                <Link to="/enroll" className="w-full sm:w-auto bg-authority-blue text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-steel-blue transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                  Start Learning
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto border-2 border-authority-blue/20 text-authority-blue dark:text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-authority-blue/5 transition-all flex items-center justify-center group">
                  View the Learning Path
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Lead Magnet CTA */}
              <div className="max-w-md mx-auto lg:mx-0 p-6 bg-primary-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm">
                {leadSubmitted ? (
                  <div className="text-center py-4 flex flex-col items-center">
                    <CheckCircle className="text-green-500 w-10 h-10 mb-3" />
                    <h4 className="font-bold text-lg">Check your inbox!</h4>
                    <p className="text-sm text-text-muted">The First 90 Days Risk Map™ is on its way.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="flex items-center space-x-2 text-authority-blue dark:text-signal-gold mb-2">
                      <Download className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Download Free: First 90 Days Risk Map™</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        required
                        type="email" 
                        placeholder="your@email.com"
                        className="flex-grow px-4 py-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-authority-blue outline-none transition-all"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                      />
                      <button type="submit" className="bg-signal-gold text-authority-blue font-bold px-6 py-3 rounded-xl hover:bg-white transition-all">
                        Get It Now
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="bg-gray-100 dark:bg-surface-dark p-2 rounded-3xl shadow-2xl relative overflow-hidden">
                <img 
                  src={content.hero.imageUrl || fallbackContent.hero.imageUrl} 
                  alt="Professional Trucking Fleet" 
                  className="rounded-2xl w-full h-[600px] object-cover"
                />
                <div className="absolute top-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-border-light dark:border-border-dark max-w-[240px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShieldCheck className="text-authority-blue w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-wider leading-none">Compliance <br/> First</span>
                  </div>
                  <p className="text-[11px] text-text-muted dark:text-text-dark-muted font-medium">Verified curriculum for box trucks, step vans, and semis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-primary-light dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-100 dark:border-red-900/20">
                <AlertTriangle className="w-4 h-4" />
                <span>The Stakes are High</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 font-serif leading-tight">Why Most New Authorities Fail in Year One</h2>
              <div className="space-y-6 text-lg text-text-muted dark:text-text-dark-muted">
                <p>Because 1 in 5 new authorities fail their first audit, we built LaunchPath™ to close the compliance knowledge gap that causes preventable shutdowns.</p>
                <ul className="space-y-4">
                  {(content.stats.length ? content.stats : fallbackContent.stats).map((stat, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center flex-shrink-0 mt-1 mr-4 font-bold text-xs">
                        {stat.value}
                      </div>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-text-primary dark:text-white pt-4">Whether you're starting with a box truck, step van, or semi—compliance is the only path to survival.</p>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-12 rounded-[3rem] border border-border-light dark:border-border-dark shadow-xl">
              <h3 className="text-2xl font-bold font-serif mb-6 text-authority-blue dark:text-white">
                {content.mission.headline || fallbackContent.mission.headline}
              </h3>
              <div className="space-y-8 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.mission.content || fallbackContent.mission.content }}>
              </div>
              {(content.mission.imageUrl || fallbackContent.mission.imageUrl) && (
                <img src={content.mission.imageUrl || fallbackContent.mission.imageUrl} className="mt-8 rounded-2xl w-full h-48 object-cover shadow-lg" alt="Mission" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-y border-border-light dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {(content.faqs.length ? content.faqs : fallbackContent.faqs).map((faq, idx) => (
              <div key={idx} className="border border-border-light dark:border-border-dark rounded-2xl overflow-hidden bg-white dark:bg-surface-dark">
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 overflow-hidden ${openFAQ === idx ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="p-6 pt-0 text-text-muted dark:text-text-dark-muted leading-relaxed text-base border-t border-gray-100 dark:border-gray-800 mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
