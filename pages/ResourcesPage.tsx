
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Shield,
  X,
  Loader2,
  Monitor,
  Clock,
  Scale,
  ShieldAlert,
  FileSearch,
  AlertTriangle,
  FileWarning,
  User,
  ClipboardList,
  Mail,
  BookMarked,
  FileDown,
  Unlock,
  ChevronRight,
  ExternalLink,
  Globe,
  Gavel,
  CheckCircle
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const AccessBadge = ({ type }: { type: 'FREE' | 'MEMBERS' }) => (
  <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
    type === 'FREE' 
      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 shadow-sm' 
      : 'bg-authority-blue text-white border-white/10 shadow-sm'
  }`}>
    {type}
  </div>
);

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
  const [isInstitutionalModalOpen, setIsInstitutionalModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAllBriefs, setShowAllBriefs] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: leadName,
          email: leadEmail,
          resourceTitle: selectedGuide?.title,
          downloadedAt: serverTimestamp(),
          source: "resource-page-lead"
        });
      }
      setShowSuccess(true);
      
      setTimeout(() => {
        if (selectedGuide?.link && selectedGuide.link !== "#") {
          window.open(selectedGuide.link, '_blank');
        } else if (selectedGuide?.title === "90 Days Risk Map™") {
            window.open("https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003", "_blank");
        }
        closeModal();
      }, 2000);
    } catch (err) {
      console.error("Lead Capture Error:", err);
      alert("Submission failed. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setLeadName('');
    setLeadEmail('');
    setShowSuccess(false);
  };

  const referenceBriefs = [
    { id: 'new-entrant-audit-failures', title: "Why New Carriers Fail Audits", focus: "REGULATORY EXPOSURE", d: "Analysis of structural reasons new carriers fail federal safety investigations." },
    { id: 'recordkeeping-errors-investigations', title: "Documentation Mistakes That Trigger Investigations", focus: "DOCUMENTATION INTEGRITY", d: "How disjointed files escalate into mandatory federal investigations." },
    { id: 'load-selection-risk-factors', title: "How Bad Load Choices Lead to Authority Loss", focus: "OPERATIONAL STABILITY", d: "The correlation between early load decisions and authority revocation." },
    { id: 'cash-flow-vs-revenue-illusions', title: "Understanding Real Operating Costs", focus: "FISCAL OXYGEN", d: "Distinguishing between earned revenue and actual operational liquidity." },
    { id: 'order-before-expansion', title: "Why Stability Comes Before Scaling", focus: "SYSTEMIC SCALING", d: "Why expansion before administrative stabilization creates a collapse vector." },
    { id: 'decision-making-under-pressure', title: "Maintaining Compliance Under Stress", focus: "COGNITIVE DISCIPLINE", d: "Preserving compliance integrity during high-stress operational windows." },
    { id: 'patience-competitive-advantage', title: "Risk Control Through Restraint", focus: "STRATEGIC RESTRAINT", d: "The role of patience as a primary risk-control mechanism for new entrants." }
  ];

  const featuredBriefs = showAllBriefs ? referenceBriefs : referenceBriefs.slice(0, 4);

  const officialLinks = [
    { title: "FMCSA New Entrant Program", d: "Official requirements for your first 18 months", url: "https://www.fmcsa.dot.gov/safety/new-entrant-safety-assurance-program", btn: "Visit FMCSA" },
    { title: "SAFER System", d: "Look up carrier safety records and authority status", url: "https://safer.fmcsa.dot.gov/", btn: "Open SAFER" },
    { title: "Drug & Alcohol Testing Rules (49 CFR Part 382)", d: "Federal requirements for controlled substances testing", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-382", btn: "View Regulation" },
    { title: "Driver Qualification File Requirements (49 CFR Part 391)", d: "What must be in every DQ file", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-391", btn: "View Regulation" },
    { title: "Hours of Service Regulations (49 CFR Part 395)", d: "ELD and hours of service rules", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395", btn: "View Regulation" },
    { title: "Vehicle Maintenance Requirements (49 CFR Part 396)", d: "Inspection and maintenance standards", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-396", btn: "View Regulation" },
    { title: "FMCSA Safety Audit Information", d: "What to expect during a new entrant audit", url: "https://www.fmcsa.dot.gov/safety/new-entrant-safety-assurance-program/new-entrant-safety-audit", btn: "Visit FMCSA" }
  ];

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen font-sans selection:bg-authority-blue/10">
      
      {/* HEADER & ORIENTATION */}
      <section className="pt-24 sm:pt-32 pb-16 text-center px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 px-4 py-2 rounded-full border border-authority-blue/10">
            <Scale size={14} className="text-authority-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">The Standard Library</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black text-authority-blue dark:text-white tracking-tighter uppercase leading-none font-serif">
            Compliance <span className="text-signal-gold italic">Resources</span>
          </h1>
          
          <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto">
            Technical assets, diagnostic tools, and verified templates for motor carrier governance.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 bg-slate-50 dark:bg-surface-dark border-2 border-dashed border-authority-blue/20 rounded-[2.5rem] mt-12 animate-reveal-up">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <p className="text-left text-lg font-black text-authority-blue dark:text-white">
                New here? <span className="text-slate-400 font-bold">Start with the REACH Test™ — it's free and takes 5 minutes.</span>
              </p>
            </div>
            <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center">
              Take the REACH Test™ <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. DIAGNOSTIC TOOLS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">01. DIAGNOSTIC TOOLS</p>
          <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">ASSESS YOUR RISK.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* REACH Test Card - Highlighted */}
          <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border-2 border-authority-blue shadow-2xl relative overflow-hidden flex flex-col group">
            <AccessBadge type="FREE" />
            <div className="absolute top-0 left-0 bg-authority-blue text-white text-[9px] font-black uppercase px-6 py-2 tracking-widest rounded-br-2xl">
              START HERE
            </div>
            <div className="w-16 h-16 bg-authority-blue text-signal-gold rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl">
              <FileSearch size={28} />
            </div>
            <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase mb-4 font-serif leading-none">REACH Test™</h3>
            <p className="text-lg text-slate-500 font-extrabold mb-10 flex-grow leading-relaxed">
              Analyze your current compliance posture across the four pillars of carrier safety.
            </p>
            <Link to="/reach-test" className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-steel-blue active:scale-95 flex items-center justify-center">
              Start Assessment <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Risk Map */}
          <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden group">
            <AccessBadge type="FREE" />
            <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
              <Activity size={28} />
            </div>
            <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase mb-4 font-serif leading-none">90 Days Risk Map™</h3>
            <p className="text-lg text-slate-500 font-extrabold mb-10 flex-grow leading-relaxed">
              A comprehensive visualization of common failure points for new entrants.
            </p>
            <button 
              onClick={() => setSelectedGuide({ title: "90 Days Risk Map™", link: "#" })}
              className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-200 dark:border-border-dark flex items-center justify-center hover:bg-white transition-all active:scale-95"
            >
              View Risk Map <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          {/* Survival Scorecard */}
          <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden group">
            <AccessBadge type="FREE" />
            <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[1.5rem] flex items-center justify-center mb-8 shadow-inner">
              <ClipboardList size={28} />
            </div>
            <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase mb-4 font-serif leading-none">Survival Scorecard</h3>
            <p className="text-lg text-slate-500 font-extrabold mb-10 flex-grow leading-relaxed">
              Binary evaluation tool to verify if your entity is ready for federal operations.
            </p>
            <Link 
              to="/readiness"
              className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-200 dark:border-border-dark flex items-center justify-center hover:bg-white transition-all active:scale-95"
            >
              Open Scorecard <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DOCUMENT TEMPLATES */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">02. DOCUMENT TEMPLATES</p>
            <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">READY-TO-USE FILES.</h2>
            <p className="text-lg text-slate-500 font-bold mt-4">Audit-tested templates for carrier documentation. Download, customize, implement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "t1", title: "DQ File Starter Pack", d: "Essential documents for driver qualification files.", icon: <User />, btn: "Download Pack", badge: "MEMBERS" },
              { id: "t2", title: "Maintenance Log", d: "Equipment inspection and maintenance tracking.", icon: <Monitor />, btn: "Download Template", badge: "MEMBERS" },
              { id: "t3", title: "Accident Quick Form", d: "Incident documentation protocol.", icon: <FileWarning />, btn: "Download Form", badge: "MEMBERS" },
              { id: "t4", title: "Daily Activity Log", d: "Daily record-keeping template.", icon: <Clock />, btn: "Download Template", badge: "MEMBERS" }
            ].map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:shadow-xl transition-all relative">
                <AccessBadge type={tool.badge as any} />
                <div className="w-14 h-14 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                  {React.cloneElement(tool.icon as React.ReactElement, { size: 24 })}
                </div>
                <h4 className="text-lg font-black text-authority-blue dark:text-white uppercase font-serif mb-4 leading-tight">{tool.title}</h4>
                <p className="text-sm text-slate-500 font-bold mb-10 flex-grow">{tool.d}</p>
                <button 
                  onClick={() => setIsInstitutionalModalOpen(true)}
                  className="w-full py-4 bg-authority-blue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-steel-blue transition-all active:scale-95"
                >
                  {tool.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REFERENCE LIBRARY */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">03. REFERENCE LIBRARY</p>
            <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">COMPLIANCE BRIEFS.</h2>
            <p className="text-lg text-slate-500 font-bold mt-4 max-w-xl">Short guides on common compliance risks and operational patterns.</p>
          </div>
          {!showAllBriefs && (
            <button 
              onClick={() => setShowAllBriefs(true)}
              className="flex items-center text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold hover:underline group"
            >
              View All Briefs <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBriefs.map((brief) => (
            <Link 
              key={brief.id} 
              to={`/resources/${brief.id}`}
              className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-slate-100 dark:border-border-dark flex items-start group hover:shadow-xl transition-all duration-500 relative"
            >
              <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shrink-0">
                <BookMarked size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-authority-blue dark:text-white uppercase font-serif mb-2 leading-tight group-hover:text-signal-gold transition-colors">{brief.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">{brief.d}</p>
                <div className="inline-flex items-center text-[9px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold group-hover:translate-x-1 transition-transform">
                  Read Brief <ArrowRight size={12} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. OFFICIAL REFERENCES */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-surface-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-3">REGULATORY SOURCES</p>
            <h2 className="text-3xl sm:text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">OFFICIAL FMCSA & DOT LINKS.</h2>
            <p className="text-base text-slate-500 font-medium mt-4 max-w-2xl mx-auto">Direct links to federal regulatory sources. LaunchPath helps you interpret and implement — these are the standards we build to.</p>
          </div>

          <div className="bg-white dark:bg-primary-dark rounded-[2.5rem] border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-border-dark">
              {officialLinks.map((link, idx) => (
                <div key={idx} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-authority-blue dark:text-white uppercase tracking-tight flex items-center">
                      {link.title}
                      <Globe size={12} className="ml-2 opacity-30" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium italic">{link.d}</p>
                  </div>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-border-dark hover:bg-authority-blue hover:text-white dark:hover:bg-signal-gold dark:hover:text-authority-blue transition-all shrink-0"
                  >
                    <span>{link.btn}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-4 opacity-30">
            <Gavel size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Official Regulatory Compliance Standards Active</p>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] p-8 sm:p-14 border border-white/10 shadow-2xl max-w-xl w-full relative animate-in zoom-in-95">
            <button onClick={closeModal} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-authority-blue transition-colors">
              <X size={24} />
            </button>
            
            {showSuccess ? (
              <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-4">Transfer Authorized</h3>
                <p className="text-lg font-bold text-slate-500 dark:text-slate-400">Initiating secure download sequence...</p>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-authority-blue rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-signal-gold/30">
                    <ShieldCheck size={32} className="text-signal-gold" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Secure Access Request</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Asset: {selectedGuide.title}</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Legal Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required 
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none rounded-2xl font-bold transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required 
                        type="email"
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)}
                        placeholder="legal@carrier.com"
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none rounded-2xl font-bold transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-authority-blue text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-4 border-slate-900 group"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mr-3" /> : <Download className="mr-3 group-hover:translate-y-0.5 transition-transform" size={18} />}
                      Download Resource
                    </button>
                    <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest mt-6 font-black opacity-60">System Registry Access Protocol v4.5</p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESTRICTED ACCESS GATE MODAL */}
      {isInstitutionalModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] p-8 sm:p-14 border border-white/20 shadow-2xl max-w-2xl w-full relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsInstitutionalModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-authority-blue"><X size={24} /></button>
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-authority-blue rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-signal-gold/30">
                <Lock size={32} className="text-signal-gold" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-authority-blue dark:text-white uppercase leading-tight font-serif">Restricted Access</h3>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-text-dark-primary font-extrabold leading-relaxed text-left border-l-4 border-signal-gold pl-6">
                The asset you are attempting to access is a structural component of the LaunchPath Operating Standard™.
              </p>
              <div className="space-y-4 text-left border-t border-slate-100 dark:border-white/5 pt-8">
                <p className="text-[11px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.4em]">Required Sequence:</p>
                <div className="space-y-4">
                  <div className="text-lg font-extrabold text-slate-500">1. Complete REACH Test™ Diagnosis</div>
                  <div className="text-lg font-extrabold text-slate-500">2. Verify Admission Readiness</div>
                  <div className="text-lg font-extrabold text-slate-500">3. Secure Implementation Access</div>
                </div>
              </div>
              <Link to="/reach-test" className="block w-full bg-authority-blue text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-steel-blue active:scale-95">
                Initiate Diagnosis
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer Meta */}
      <section className="py-20 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-border-dark">
         <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 italic">Reference Library Registry: LP-RES-V4.5 — Institutional Standards Active</p>
      </section>
    </div>
  );
};

export default ResourcesPage;
