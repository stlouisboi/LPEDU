import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  RefreshCw,
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';

const AccessBadge = ({ type }: { type: 'FREE' | 'MEMBERS' }) => (
  <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] border transition-all duration-500 backdrop-blur-md shadow-lg group-hover:scale-110 group-hover:rotate-3 z-20 ${
    type === 'FREE' 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-500/20' 
      : 'bg-authority-blue/80 text-signal-gold border-signal-gold/30 shadow-authority-blue/40'
  }`}>
    <span className="flex items-center gap-2">
      {type === 'FREE' ? <Zap size={10} className="fill-current" /> : <Lock size={10} />}
      {type}
    </span>
  </div>
);

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
  const [isInstitutionalModalOpen, setIsInstitutionalModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAllBriefs, setShowAllBriefs] = useState(false);

  useEffect(() => {
    document.title = "Resources | LaunchPath Compliance Downloads";
    const update = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };
    update('meta[name="description"]', "DQ file checklists, maintenance templates, and compliance documentation. Practical tools for new motor carriers. Download and implement.");
    update('meta[property="og:title"]', "Resources | LaunchPath Compliance Downloads");
    update('meta[property="og:description"]', "Checklists, templates, and calculators for owner-operators building audit-ready systems.");
    update('meta[property="og:type"]', "website");
  }, []);

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
      
      setSyncing(true);
      await syncToMailerLite({
        email: leadEmail,
        fields: { name: leadName, company: 'Resource Requester' }
      });

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
      setSyncing(false);
    }
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setLeadName('');
    setLeadEmail('');
    setShowSuccess(false);
  };

  const referenceBriefs = [
    { id: 'new-entrant-audit-failures', title: "Why New Carriers Fail Audits", focus: "REGULATORY EXPOSURE", color: "border-red-500", iconColor: "text-red-500", d: "Analysis of structural reasons new carriers fail federal safety investigations." },
    { id: 'recordkeeping-errors-investigations', title: "Documentation Mistakes", focus: "DOCUMENTATION INTEGRITY", color: "border-blue-500", iconColor: "text-blue-500", d: "How disjointed files escalate into mandatory federal investigations." },
    { id: 'load-selection-risk-factors', title: "Load Selection Risks", focus: "OPERATIONAL STABILITY", color: "border-amber-500", iconColor: "text-amber-500", d: "The correlation between early load decisions and authority revocation." },
    { id: 'cash-flow-vs-revenue-illusions', title: "Real Operating Costs", focus: "FISCAL OXYGEN", color: "border-emerald-500", iconColor: "text-emerald-500", d: "Distinguishing between earned revenue and actual operational liquidity." },
    { id: 'order-before-expansion', title: "Order Before Expansion", focus: "SYSTEMIC SCALING", color: "border-purple-500", iconColor: "text-purple-500", d: "Why expansion before administrative stabilization creates a collapse vector." },
    { id: 'decision-making-under-pressure', title: "Compliance Under Stress", focus: "COGNITIVE DISCIPLINE", color: "border-cyan-500", iconColor: "text-cyan-500", d: "Preserving compliance integrity during high-stress operational windows." },
    { id: 'patience-competitive-advantage', title: "Strategic Restraint", focus: "STRATEGIC RESTRAINT", color: "border-pink-500", iconColor: "text-pink-500", d: "The role of patience as a primary risk-control mechanism for new entrants." }
  ];

  const featuredBriefs = showAllBriefs ? referenceBriefs : referenceBriefs.slice(0, 4);

  const officialLinks = [
    { title: "FMCSA New Entrant Program", d: "Official requirements for your first 18 months", url: "https://www.fmcsa.dot.gov/safety/new-entrant-safety-assurance-program", btn: "Visit FMCSA" },
    { title: "SAFER System", d: "Look up carrier safety records and authority status", url: "https://safer.fmcsa.dot.gov/", btn: "Open SAFER" },
    { title: "Drug & Alcohol Rules (49 CFR 382)", d: "Federal requirements for drug testing", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-382", btn: "View Regulation" },
    { title: "DQ File Rules (49 CFR 391)", d: "What must be in every DQ file", url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-391", btn: "View Regulation" }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans selection:bg-authority-blue/10 relative overflow-hidden transition-colors duration-500">
      
      {/* Enhanced Dynamic System Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] [background-size:32px:32px] [background-image:radial-gradient(#1e3a5f_1px,transparent_1px)]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-signal-gold/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-authority-blue/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* HEADER & ORIENTATION */}
      <section className="relative pt-24 sm:pt-32 pb-16 text-center px-6 z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 px-6 py-2.5 rounded-full mb-8 border border-slate-200 dark:border-white/10 animate-reveal-up backdrop-blur-xl shadow-xl">
            <Scale size={14} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">The Standard Library</span>
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black text-authority-blue dark:text-white tracking-tighter uppercase leading-[0.85] font-serif animate-reveal-up drop-shadow-sm">
            Compliance <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-authority-blue via-signal-gold to-steel-blue italic relative">
              Resources
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-500 dark:text-text-dark-muted font-bold max-w-2xl mx-auto animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            Technical assets and diagnostic tools for motor carrier governance.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-1 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-[3rem] mt-12 animate-reveal-up shadow-2xl group relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-6 px-10 py-6 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-authority-blue to-steel-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-4 ring-authority-blue/5">
                <ShieldCheck size={28} />
              </div>
              <p className="text-left text-lg font-black text-authority-blue dark:text-white leading-tight">
                New here? <br/><span className="text-slate-400 font-bold">Start with the REACH Test™.</span>
              </p>
            </div>
            <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-12 py-8 rounded-[2.8rem] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-8 border-slate-900 group/btn relative z-10">
              Take the REACH Test™ <ArrowRight size={14} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. DIAGNOSTIC TOOLS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 flex items-center justify-between">
          <div className="animate-reveal-up">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3 flex items-center gap-2">
              <Terminal size={12} className="text-signal-gold" /> 01. DIAGNOSTIC TOOLS
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">ASSESS YOUR RISK.</h2>
          </div>
          <div className="hidden lg:block w-32 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* REACH Test Card - Vibrant Emerald */}
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-transparent hover:border-emerald-500/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col group transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_60px_100px_-30px_rgba(16,185,129,0.15)]">
            <AccessBadge type="FREE" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-8 ring-emerald-500/10">
              <FileSearch size={32} />
            </div>
            <h3 className="text-3xl font-black text-authority-blue dark:text-white uppercase mb-6 font-serif leading-none">REACH Test™</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-extrabold mb-12 flex-grow leading-relaxed">
              Analyze your current compliance posture across the four pillars of carrier safety.
            </p>
            <Link to="/reach-test" className="w-full bg-emerald-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-emerald-700 active:scale-95 flex items-center justify-center group/btn border-b-4 border-emerald-900">
              Start Assessment <ArrowRight size={18} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Risk Map - Vibrant Gold */}
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-transparent hover:border-signal-gold/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col group transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_60px_100px_-30px_rgba(198,146,42,0.15)]">
            <AccessBadge type="FREE" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-signal-gold/5 rounded-full blur-3xl group-hover:bg-signal-gold/10 transition-colors duration-700"></div>
            <div className="w-20 h-20 bg-signal-gold text-authority-blue rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-8 ring-signal-gold/10">
              <Activity size={32} className="group-hover:animate-pulse" />
            </div>
            <h3 className="text-3xl font-black text-authority-blue dark:text-white uppercase mb-6 font-serif leading-none">90 Days Risk Map™</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-extrabold mb-12 flex-grow leading-relaxed">
              A comprehensive visualization of common failure points for new entrants.
            </p>
            <button 
              onClick={() => setSelectedGuide({ title: "90 Days Risk Map™", link: "#" })}
              className="w-full bg-authority-blue text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center hover:bg-steel-blue transition-all active:scale-95 shadow-xl border-b-4 border-slate-900"
            >
              View Risk Map <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Survival Scorecard - Vibrant Blue */}
          <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-transparent hover:border-authority-blue/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col group transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_60px_100px_-30px_rgba(30,58,95,0.15)]">
            <AccessBadge type="FREE" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-authority-blue/5 rounded-full blur-3xl group-hover:bg-authority-blue/10 transition-colors duration-700"></div>
            <div className="w-20 h-20 bg-authority-blue text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-8 ring-authority-blue/10">
              <ClipboardList size={32} />
            </div>
            <h3 className="text-3xl font-black text-authority-blue dark:text-white uppercase mb-6 font-serif leading-none">Survival Scorecard</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-extrabold mb-12 flex-grow leading-relaxed">
              Binary evaluation tool to verify if your entity is ready for operations.
            </p>
            <Link 
              to="/readiness"
              className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] border-2 border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all active:scale-95 shadow-sm"
            >
              Open Scorecard <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DOCUMENT TEMPLATES */}
      <section className="py-20 lg:py-40 bg-gradient-to-br from-[#F0F2F5] to-white dark:from-primary-dark/80 dark:to-primary-dark backdrop-blur-sm relative transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3 flex items-center justify-center gap-2">
              <FileDown size={14} className="text-authority-blue dark:text-signal-gold" /> 02. DOCUMENT TEMPLATES
            </p>
            <h2 className="text-4xl sm:text-7xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">READY-TO-USE FILES.</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mt-8 max-w-2xl mx-auto">Audit-tested templates for carrier documentation. Download, customize, implement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "t1", title: "DQ File Starter Pack", d: "Essential documents for driver qualification.", icon: <User />, btn: "Download Pack", color: "from-blue-500/20", iconBg: "bg-blue-500" },
              { id: "t2", title: "Maintenance Log", d: "Equipment inspection and tracking.", icon: <Monitor />, btn: "Download Template", color: "from-indigo-500/20", iconBg: "bg-indigo-500" },
              { id: "t3", title: "Accident Quick Form", d: "Incident documentation protocol.", icon: <FileWarning />, btn: "Download Form", color: "from-red-500/20", iconBg: "bg-red-500" },
              { id: "t4", title: "Daily Activity Log", d: "Daily record-keeping template.", icon: <Clock />, btn: "Download Template", color: "from-emerald-500/20", iconBg: "bg-emerald-500" }
            ].map((tool) => (
              <div key={tool.id} className={`bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 flex flex-col items-center text-center group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 relative hover:-translate-y-2 overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${tool.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                <AccessBadge type="MEMBERS" />
                <div className={`w-16 h-16 ${tool.iconBg} text-white rounded-2xl flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-white/10 z-10`}>
                  {React.cloneElement(tool.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase font-serif mb-6 leading-tight group-hover:text-authority-blue dark:group-hover:text-signal-gold transition-colors z-10">{tool.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-12 flex-grow leading-relaxed z-10">{tool.d}</p>
                <button 
                  onClick={() => setIsInstitutionalModalOpen(true)}
                  className="w-full py-5 bg-authority-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-steel-blue transition-all active:scale-95 group/btn border-b-4 border-slate-900 z-10"
                >
                  <span className="flex items-center justify-center gap-2">
                    {tool.btn} <ArrowRight size={14} className="group-hover/btn:translate-x-1" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REFERENCE LIBRARY */}
      <section className="py-20 lg:py-40 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <div className="animate-reveal-up">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3 flex items-center gap-2">
              <BookMarked size={14} className="text-signal-gold" /> 03. REFERENCE LIBRARY
            </p>
            <h2 className="text-4xl sm:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">COMPLIANCE BRIEFS.</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold mt-8 max-w-2xl">Short guides on common compliance risks and operational patterns.</p>
          </div>
          {!showAllBriefs && (
            <button 
              onClick={() => setShowAllBriefs(true)}
              className="flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold hover:underline group px-10 py-5 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 active:scale-95 transition-all"
            >
              View All Briefs <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredBriefs.map((brief) => (
            <Link 
              key={brief.id} 
              to={`/resources/${brief.id}`}
              className={`bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border-l-[12px] ${brief.color} border-y border-r border-slate-100 dark:border-white/5 flex items-start group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className={`w-14 h-14 bg-slate-50 dark:bg-gray-800 ${brief.iconColor} rounded-2xl flex items-center justify-center mr-8 group-hover:scale-110 group-hover:bg-authority-blue group-hover:text-white transition-all duration-500 shrink-0 shadow-inner z-10`}>
                <BookMarked size={24} />
              </div>
              <div className="z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{brief.focus}</p>
                <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase font-serif mb-3 leading-tight group-hover:text-authority-blue dark:group-hover:text-signal-gold transition-colors">{brief.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 font-bold mb-8 leading-relaxed line-clamp-2">{brief.d}</p>
                <div className={`inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] ${brief.iconColor} group-hover:translate-x-2 transition-transform`}>
                  Read Analysis <ArrowRight size={14} className="ml-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. OFFICIAL REFERENCES */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-white/5 transition-all duration-500">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-20 text-center space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-3">REGULATORY SOURCES</p>
            <h2 className="text-4xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">OFFICIAL FMCSA LINKS.</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto italic">Direct links to federal regulatory sources. We interpret, you implement.</p>
          </div>

          <div className="bg-white dark:bg-primary-dark rounded-[4rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl">
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {officialLinks.map((link, idx) => (
                <div key={idx} className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-10 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group">
                  <div className="space-y-3">
                    <h4 className="text-lg font-black text-authority-blue dark:text-white uppercase tracking-tight flex items-center group-hover:text-signal-gold transition-colors">
                      {link.title}
                      <Globe size={14} className="ml-3 opacity-30 group-hover:rotate-12 transition-transform text-authority-blue" />
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic leading-relaxed">{link.d}</p>
                  </div>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 px-10 py-5 bg-white dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] border border-slate-200 dark:border-white/10 hover:bg-authority-blue hover:text-white dark:hover:bg-signal-gold dark:hover:text-authority-blue transition-all shrink-0 shadow-xl active:scale-95"
                  >
                    <span>{link.btn}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex items-center justify-center space-x-6 opacity-30">
            <Gavel size={24} className="text-authority-blue dark:text-white" />
            <p className="text-[12px] font-black uppercase tracking-[0.6em] text-authority-blue dark:text-white">Official Regulatory Compliance Standards Active</p>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/95 backdrop-blur-3xl animate-in fade-in duration-700">
          <div className="bg-white dark:bg-surface-dark rounded-[5rem] p-10 sm:p-20 border border-white/20 shadow-[0_50px_100px_-25px_rgba(0,0,0,0.5)] max-w-2xl w-full relative animate-in zoom-in-95 duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-authority-blue via-signal-gold to-steel-blue"></div>
            <button onClick={closeModal} className="absolute top-12 right-12 p-4 text-slate-400 hover:text-white transition-all bg-slate-100 dark:bg-gray-800 rounded-full shadow-2xl group">
              <X size={28} className="group-hover:rotate-90 transition-transform" />
            </button>
            
            {showSuccess ? (
              <div className="text-center py-20 animate-in zoom-in-95 duration-500">
                <div className="w-32 h-32 bg-emerald-500 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/30 ring-8 ring-emerald-500/10">
                  <CheckCircle size={64} className="animate-bounce" />
                </div>
                <h3 className="text-4xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-6">Transfer Authorized</h3>
                <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Initiating secure download sequence...</p>
              </div>
            ) : (
              <div className="space-y-16">
                <div className="text-center space-y-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-authority-blue to-steel-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl border-4 border-white/10 ring-12 ring-authority-blue/10">
                    <ShieldCheck size={48} className="text-signal-gold" />
                  </div>
                  <div>
                    <h3 className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white">Secure Access</h3>
                    <div className="h-1.5 w-24 bg-signal-gold mx-auto rounded-full mt-6"></div>
                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mt-8">Asset: {selectedGuide.title}</p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-10 block">Full Legal Name</label>
                    <div className="relative group">
                      <User className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-authority-blue transition-colors" size={24} />
                      <input 
                        required 
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        placeholder="Registry Name"
                        className="w-full pl-20 pr-10 py-8 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none rounded-[2.5rem] font-black text-xl transition-all shadow-inner dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-10 block">Professional Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-authority-blue transition-colors" size={24} />
                      <input 
                        required 
                        type="email"
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)}
                        placeholder="legal@carrier.com"
                        className="w-full pl-20 pr-10 py-8 bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none rounded-[2.5rem] font-black text-xl transition-all shadow-inner dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-authority-blue text-white py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[14px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-8 border-slate-900 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          {syncing ? <RefreshCw className="animate-spin mr-4" size={28} /> : <Loader2 className="animate-spin mr-4" size={28} />}
                          {syncing ? 'SYNCHRONIZING...' : 'AUTHORIZING...'}
                        </span>
                      ) : (
                        <>
                          <Download className="mr-6 group-hover:translate-y-1 transition-transform" size={28} />
                          Download Asset
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 uppercase tracking-[0.5em] mt-10 font-black opacity-60">System Registry Access Protocol v4.5</p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESTRICTED ACCESS GATE MODAL */}
      {isInstitutionalModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/98 backdrop-blur-3xl animate-in fade-in duration-1000">
          <div className="bg-white dark:bg-surface-dark rounded-[5rem] p-12 sm:p-24 border border-white/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)] max-w-3xl w-full relative animate-in zoom-in-95 duration-500 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={() => setIsInstitutionalModalOpen(false)} className="absolute top-12 right-12 p-5 text-slate-400 hover:text-white transition-all bg-slate-100 dark:bg-gray-800 rounded-full shadow-2xl group"><X size={32} className="group-hover:rotate-90 transition-transform" /></button>
            <div className="text-center space-y-12">
              <div className="w-28 h-28 bg-authority-blue rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl border-4 border-signal-gold/30 ring-[20px] ring-authority-blue/10">
                <Lock size={48} className="text-signal-gold animate-pulse" />
              </div>
              <h3 className="text-5xl sm:text-6xl font-black text-authority-blue dark:text-white uppercase leading-[0.85] font-serif tracking-tight">Restricted <br/><span className="text-signal-gold italic">Registry</span></h3>
              <p className="text-xl sm:text-2xl text-slate-700 dark:text-text-dark-primary font-extrabold leading-relaxed text-left border-l-[12px] border-signal-gold pl-12 py-4 rounded-r-3xl bg-slate-50 dark:bg-white/5">
                This asset is a core component of the LaunchPath Operating Standard™. Access is granted only to verified carrier executives.
              </p>
              <div className="space-y-8 text-left border-t border-slate-100 dark:border-white/10 pt-16">
                <p className="text-[14px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[0.6em] mb-8">Authorization Path:</p>
                <div className="space-y-8">
                  {[
                    { num: "01", text: "Complete REACH Test™ Diagnosis" },
                    { num: "02", text: "Verify Admission Readiness" },
                    { num: "03", text: "Secure Implementation Access" }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-10 group">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-gray-800 rounded-[1.5rem] flex items-center justify-center font-black text-slate-400 group-hover:bg-authority-blue group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                        {step.num}
                      </div>
                      <div className="text-2xl font-black text-slate-500 group-hover:text-authority-blue dark:group-hover:text-white transition-colors uppercase tracking-tighter">
                        {step.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/reach-test" className="block w-full bg-authority-blue text-white py-10 rounded-[3.5rem] font-black uppercase tracking-[0.4em] text-[14px] shadow-2xl hover:bg-steel-blue active:scale-95 transition-all border-b-8 border-slate-900 mt-16 flex items-center justify-center group">
                Initiate Diagnosis <ArrowRight size={24} className="ml-5 group-hover:translate-x-3 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Terminal Signature - Local Instance */}
      <section className="py-24 bg-[#020617] text-center border-t border-white/5 transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px:32px]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="w-12 h-1 bg-slate-800 mx-auto mb-10 rounded-full"></div>
          <p className="text-[11px] font-black uppercase tracking-[0.85em] text-slate-500 italic">
            REFERENCE LIBRARY REGISTRY: LP-RES-V4.5 — INSTITUTIONAL STANDARDS ACTIVE
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;