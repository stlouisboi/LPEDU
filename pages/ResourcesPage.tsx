
import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Loader2, 
  Mail, 
  Lock, 
  Shield, 
  FolderOpen, 
  CheckCircle2, 
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

interface StaticResource {
  phase: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  includes: string[];
  version: string;
  updatedAt: string;
}

const STATIC_RESOURCES: StaticResource[] = [
  {
    phase: 1,
    title: "Phase 1: Legal Setup & Authority",
    description: "Everything you need to get your USDOT/MC authority legally set up.",
    icon: <ClipboardList className="w-12 h-12 text-authority-blue" />,
    includes: [
      "USDOT/MC Application Checklist",
      "BOC-3 Provider Comparison",
      "UCR Registration Guide",
      "Clearinghouse Enrollment Steps",
      "Fatal Mistakes to Avoid"
    ],
    version: "v2.4",
    updatedAt: "Jan 2025"
  },
  {
    phase: 2,
    title: "Phase 2: Insurance & Fiscal",
    description: "Protect your assets and meet federal insurance minimums.",
    icon: <Shield className="w-12 h-12 text-authority-blue" />,
    includes: [
      "Insurance Requirements Breakdown",
      "Quote Comparison Template",
      "Form 2290 Tax Filing Guide",
      "IRP/IFTA Registration (if needed)",
      "Insurance Agent Questions"
    ],
    version: "v2.4",
    updatedAt: "Jan 2025"
  },
  {
    phase: 3,
    title: "Phase 3: The Compliance System",
    description: "Build the administrative backbone that protects you during audits.",
    icon: <FolderOpen className="w-12 h-12 text-authority-blue" />,
    includes: [
      "Driver Qualification File Template",
      "Maintenance Management Guide",
      "HOS & ELD Policy Template",
      "Accident Register Template",
      "Maintenance Logbook"
    ],
    version: "v2.4",
    updatedAt: "Jan 2025"
  },
  {
    phase: 4,
    title: "Phase 4: Audit Readiness",
    description: "Prepare for and pass your new entrant safety audit.",
    icon: <CheckCircle2 className="w-12 h-12 text-authority-blue" />,
    includes: [
      "Mock Safety Audit Checklist",
      "Quarterly Self-Evaluation Form",
      "Driver Training Templates",
      "Safety-First Hiring Guide",
      "SMS/CSA Score Monitoring Guide"
    ],
    version: "v2.4",
    updatedAt: "Jan 2025"
  }
];

const ResourcesPage = () => {
  const { addFormSubmission } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<StaticResource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadClick = (res: StaticResource) => {
    setActiveResource(res);
    setIsModalOpen(true);
    setIsSubmitted(false);
    setError(null);
  };

  const triggerDownload = (phaseNum: number) => {
    const link = document.createElement('a');
    link.href = `./downloads/phase-${phaseNum}-pack.pdf`;
    link.download = `LaunchPath-Phase-${phaseNum}-Pack.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      if (db) {
        await addDoc(collection(db, "leads"), {
          name,
          email,
          phase: activeResource?.phase,
          phaseName: activeResource?.title,
          newsletter,
          timestamp: serverTimestamp(),
          source: "resource-library",
          userAgent: navigator.userAgent
        });
      }

      addFormSubmission({
        type: 'Resource Lead',
        resourceName: activeResource?.title,
        name,
        email,
        date: new Date().toISOString()
      });

      setIsSubmitted(true);
      triggerDownload(activeResource?.phase || 1);

      setTimeout(() => {
          setIsModalOpen(false);
          setIsSubmitted(false);
          setName('');
          setEmail('');
      }, 2500);
    } catch (err) {
      console.error("Lead capture failed", err);
      // Still allow download
      triggerDownload(activeResource?.phase || 1);
      setError("⚠️ Download started, but we couldn't save your email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Carrier Resource Library</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Free downloadable compliance packs for new owner-operators. Build your authority with verified FMCSA checklists, templates, and step-by-step guides.
          </p>
        </div>

        {/* 2x2 Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {STATIC_RESOURCES.map((res) => (
            <div key={res.phase} className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-border-light dark:border-border-dark flex flex-col hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="mb-6">
                {res.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-serif text-authority-blue dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                {res.title}
              </h3>
              
              <p className="text-sm text-text-muted dark:text-text-dark-muted mb-6 leading-relaxed">
                {res.description}
              </p>

              <div className="mb-8 flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue/60 mb-3">Includes:</p>
                <ul className="space-y-2">
                  {res.includes.map((item, i) => (
                    <li key={i} className="flex items-start text-[13px] text-text-muted">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-authority-blue/40 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleDownloadClick(res)}
                className="flex items-center justify-center space-x-2 bg-authority-blue text-white py-4 rounded-xl font-bold hover:bg-steel-blue transition-all shadow-md group-hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Download Phase {res.phase} Pack</span>
              </button>

              <div className="mt-6 flex items-center justify-between text-[11px] text-text-dark-muted font-medium opacity-60">
                <span>Version: {res.version}</span>
                <span>Updated: {res.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Want the Complete Course Banner */}
        <div className="bg-blue-50 dark:bg-authority-blue/10 border border-blue-100 dark:border-authority-blue/20 p-8 lg:p-12 rounded-[2.5rem] text-center shadow-sm">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle className="text-authority-blue w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 font-serif text-authority-blue dark:text-white">🎓 Want the Complete Course?</h2>
            <p className="text-text-muted dark:text-text-dark-muted mb-8 leading-relaxed">
              These free packs are just the beginning. Get the full 8-module course with video lessons, interactive compliance scorecards, and 1-on-1 audit preparation support.
            </p>
            <Link 
              to="/enroll"
              className="inline-flex items-center justify-center space-x-2 bg-authority-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-steel-blue transition-all shadow-lg"
            >
              <span>View Course Details</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Email Capture Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark max-w-lg w-full relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                     <CheckCircle className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl font-bold font-serif mb-2">Success!</h3>
                   <p className="text-text-muted">Downloading now! Check your email for your copy.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-serif leading-none">Get Your Pack</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1">Compliance Ledger Integration</p>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-4 font-serif text-authority-blue">Get Your Phase {activeResource?.phase} Pack</h4>
                  <p className="text-sm text-text-muted mb-8 leading-relaxed">Enter your email to download your free compliance pack with checklists, templates, and guides.</p>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleLeadCapture} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Your Name (Optional)" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <input 
                      required
                      type="email" 
                      placeholder="Your Email Address" 
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-2 focus:ring-authority-blue"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <div className="flex items-center space-x-3 mb-6">
                      <input 
                        type="checkbox" 
                        id="newsletter-check" 
                        checked={newsletter}
                        onChange={e => setNewsletter(e.target.checked)}
                        className="w-5 h-5 accent-authority-blue cursor-pointer"
                      />
                      <label htmlFor="newsletter-check" className="text-xs font-medium text-text-muted cursor-pointer">
                        Send me the LaunchPath First 90 Days newsletter
                      </label>
                    </div>

                    <button 
                      disabled={loading}
                      className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl flex items-center justify-center group shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Download className="mr-2 w-5 h-5" />
                          <span>Download Now</span>
                        </>
                      )}
                    </button>
                    
                    <div className="text-center mt-4">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="text-xs text-text-muted hover:text-authority-blue hover:underline"
                      >
                        No thanks
                      </button>
                    </div>

                    <p className="text-[9px] text-center text-text-muted mt-6 uppercase tracking-widest font-black">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
