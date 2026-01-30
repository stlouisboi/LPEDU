
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Shield,
  X,
  Loader2,
  Monitor,
  Clock,
  Scale,
  Zap,
  ShieldAlert,
  FileSearch,
  Anchor,
  AlertTriangle,
  MoveDown,
  MoveUp,
  MoveLeft,
  MoveRight,
  Calculator,
  HardDrive,
  FileWarning,
  Eye,
  Info,
  User,
  BookOpen,
  TrendingDown,
  Target,
  ClipboardList,
  Calendar,
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  Share2,
  Sparkles,
  Unlock,
  Mail,
  BookMarked
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
  const [isInstitutionalModalOpen, setIsInstitutionalModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
          source: "institutional-library-gate"
        });
      }
      setShowSuccess(true);
      setTimeout(() => {
        if (selectedGuide?.link && selectedGuide.link !== "#") window.open(selectedGuide.link, '_blank');
        closeModal();
      }, 1500);
    } catch (err) {
      console.error(err);
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
    { id: 'new-entrant-audit-failures', title: "Audit Failures", focus: "REGULATORY EXPOSURE", d: "Analysis of structural reasons new carriers fail federal safety investigations." },
    { id: 'recordkeeping-errors-investigations', title: "Recordkeeping Errors", focus: "DOCUMENTATION INTEGRITY", d: "How disjointed files escalate into mandatory federal investigations." },
    { id: 'load-selection-risk-factors', title: "Load Selection Risk", focus: "OPERATIONAL STABILITY", d: "The correlation between early load decisions and authority revocation." },
    { id: 'cash-flow-vs-revenue-illusions', title: "Cash-Flow Illusions", focus: "FISCAL OXYGEN", d: "Distinguishing between earned revenue and actual operational liquidity." },
    { id: 'order-before-expansion', title: "Order Over Growth", focus: "SYSTEMIC SCALING", d: "Why expansion before administrative stabilization creates a collapse vector." },
    { id: 'decision-making-under-pressure', title: "Pressure Response", focus: "COGNITIVE DISCIPLINE", d: "Preserving compliance integrity during high-stress operational windows." },
    { id: 'patience-competitive-advantage', title: "Patience Factor", focus: "STRATEGIC RESTRAINT", d: "The role of patience as a primary risk-control mechanism for new entrants." }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans overflow-x-hidden selection:bg-authority-blue/10">
      
      {/* HERO */}
      <section className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark pt-24 sm:pt-32 pb-16 sm:pb-24 text-center px-5">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full mb-8">
            <Scale size={14} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">Standards Repository</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-authority-blue dark:text-white tracking-tight uppercase leading-none font-serif mb-6">
            LaunchPath <span className="text-signal-gold italic">Resources</span>
          </h1>
          
          <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-border-dark rounded-3xl sm:rounded-[3.5rem] text-left relative overflow-hidden shadow-sm mt-8">
            <div className="absolute top-0 left-0 w-2 h-full bg-authority-blue dark:bg-signal-gold"></div>
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-text-dark-primary leading-relaxed mb-6 font-extrabold">
              The Standard Library: Validated assets supporting compliance-first operations. Education and orientation — not legal advice.
            </p>
            <p className="text-[12px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center">
              <AlertTriangle size={14} className="mr-2" /> Structural evidence exceeds operational momentum.
            </p>
          </div>
        </div>
      </section>

      {/* 1. READINESS DIAGNOSTICS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-5 sm:px-10">
        <div className="mb-12 sm:mb-20 text-center sm:text-left">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-3">01. Readiness Diagnostics</p>
          <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif">Identify Exposure Early.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { id: "diag-1", title: "REACH Test™", sub: "DIAGNOSTIC UNIT", desc: "Structured assessment of authority, insurance, and operational risk vectors.", icon: <FileSearch />, link: "/reach-test" },
            { id: "diag-2", title: "90 Days Risk Map™", sub: "VISUAL SCHEMATIC", desc: "Visual breakdown of common failure points during early carrier operations.", icon: <Activity />, isGated: true, link: "#" },
            { id: "diag-3", title: "Survival Scorecard", sub: "QUICK EVALUATION", desc: "Binary evaluation of financial and compliance viability markers.", icon: <ClipboardList />, link: "/readiness" }
          ].map((item, i) => (
            <div key={item.id} className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 font-serif leading-none">{item.title}</h3>
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">{item.sub}</p>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-extrabold mb-10 flex-grow leading-relaxed">{item.desc}</p>
              
              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-white/5">
                {item.isGated ? (
                  <button onClick={() => setSelectedGuide({title: item.title, link: item.link})} className="w-full bg-authority-blue text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-lg active:scale-95 flex items-center justify-center">
                    <Download size={14} className="mr-2" /> Verify to Access
                  </button>
                ) : (
                  <Link to={item.link} className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center hover:bg-white active:scale-95 border border-slate-200 dark:border-slate-700">
                    <Unlock size={14} className="mr-2" /> Open Diagnostic
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. STARTER TEMPLATES */}
      <section className="py-20 lg:py-32 bg-slate-50/50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="mb-16 text-center sm:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-3">02. Starter Templates</p>
            <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-tight">Structure Beats Memory.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {[
              { id: "t1", title: "DQ File Starter Pack", focus: "DRIVER COMPLIANCE", icon: <User />, d: "The essential documentation suite for driver qualifications." },
              { id: "t2", title: "Maintenance Log", focus: "EQUIPMENT SAFETY", icon: <Monitor />, d: "A structured ledger for tracking mandated equipment inspections." },
              { id: "t3", title: "Accident Quick Form", focus: "FIELD DOCUMENTATION", icon: <FileWarning />, d: "Critical protocol for documenting operational incidents." },
              { id: "t4", title: "Daily Activity Log", focus: "ADMINISTRATIVE HABIT", icon: <Clock />, d: "Governance tool for consistent daily record keeping." }
            ].map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:shadow-xl transition-all relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mb-6 sm:mb-10 shadow-inner">
                  {React.cloneElement(tool.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-1 max-w-xs tracking-tight font-serif">
                  {tool.title}
                </h4>
                <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">{tool.focus}</p>
                <p className="text-lg sm:text-xl font-extrabold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-sm">
                  {tool.d}
                </p>
                <button 
                  onClick={() => setIsInstitutionalModalOpen(true)}
                  className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-steel-blue active:scale-95"
                >
                  Authorize Transfer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDUCATIONAL REFERENCE BRIEFS - RESTORED & TYPOGRAPHY ENHANCED */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-5 sm:px-10">
        <div className="mb-16 text-center sm:text-left">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-3">03. Reference Library</p>
          <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif">Technical Briefs.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {referenceBriefs.map((brief) => (
            <Link 
              key={brief.id} 
              to={`/resources/${brief.id}`}
              className="bg-white dark:bg-surface-dark p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 dark:border-border-dark flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <BookMarked size={100} />
              </div>
              
              <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              
              <h3 className="text-lg sm:text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 leading-tight group-hover:text-signal-gold transition-colors font-serif">
                {brief.title}
              </h3>
              
              <p className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center">
                <span className="w-4 h-[2px] bg-slate-200 mr-2"></span>
                {brief.focus}
              </p>
              
              <p className="text-lg sm:text-xl font-extrabold text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed">
                {brief.d}
              </p>
              
              <div className="mt-auto flex items-center text-[9px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold group-hover:translate-x-2 transition-transform">
                Read Technical Brief <ArrowRight size={14} className="ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Footer Meta */}
      <section className="py-20 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-border-dark">
         <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700 italic">Reference Library Registry: LP-RES-V4.5 — Institutional Standards Active</p>
      </section>
      
      {/* MODAL Gateways */}
      {isInstitutionalModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md">
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-14 border border-white/20 shadow-2xl max-w-2xl w-full relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
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
    </div>
  );
};

export default ResourcesPage;
