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
  Globe,
  ClipboardList,
  Calendar,
  Search,
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
  // Fix: Added missing User icon import from lucide-react
  User
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
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
        if (selectedGuide?.link) window.open(selectedGuide.link, '_blank');
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

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans text-slate-800 transition-colors duration-500">
      
      {/* 1. INSTITUTIONAL HERO */}
      <section className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark pt-32 pb-24 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 dark:bg-white/5 border border-authority-blue/10 dark:border-white/10 px-6 py-2.5 rounded-full mb-10 shadow-sm">
            <Scale size={16} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Institutional Library & Orientation Layer</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-authority-blue dark:text-white tracking-tight mb-8 uppercase leading-tight">
            Compliance <br/><span className="text-signal-gold italic">Repository</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Professional orientation resources for motor carrier operations. These materials are provisioned for conceptual alignment and the identification of regulatory exposure vectors.
          </p>
          
          <div className="max-w-3xl mx-auto p-8 bg-slate-50/50 dark:bg-gray-900/30 border-l-4 border-authority-blue rounded-r-3xl">
            <p className="text-sm font-medium text-slate-500 dark:text-text-dark-muted leading-relaxed italic text-left">
              “Administrative order is the primary defense against institutional scrutiny. This repository functions as a protective orientation layer to identify risks before irreversible operational commitments are finalized.”
            </p>
          </div>
        </div>
      </section>

      {/* 2. READINESS & RISK DIAGNOSTICS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">01. Diagnostics</p>
          <h2 className="text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tight">Readiness Assessment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "REACH Test™ Diagnostic", 
              desc: "Identify failure vectors across Authority, Insurance, Compliance, and Cash-Flow.", 
              icon: <FileSearch />, 
              link: "/reach-test" 
            },
            { 
              title: "90-Day Risk Map™", 
              desc: "Visual sequence of enforcement triggers during the 18-month New Entrant phase.", 
              icon: <Activity />, 
              isGated: true,
              link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003"
            },
            { 
              title: "Carrier Survival Scorecard", 
              desc: "Objective evaluation of administrative readiness and capitalization thresholds.", 
              icon: <ClipboardList />, 
              link: "/readiness" 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-authority-blue/5 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-sm text-slate-500 dark:text-text-dark-muted font-medium mb-10 leading-relaxed">{item.desc}</p>
              {item.isGated ? (
                <button 
                  onClick={() => setSelectedGuide({title: item.title, link: item.link})}
                  className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:underline"
                >
                  <Download size={14} className="mr-2" /> Access Diagnostic
                </button>
              ) : (
                <Link to={item.link} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:underline">
                  <ArrowRight size={14} className="mr-2" /> Open Terminal
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUTHORITY & COMPLIANCE FOUNDATIONS */}
      <section className="py-24 bg-authority-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold mb-3">02. Foundations</p>
            <h2 className="text-4xl font-black font-serif uppercase tracking-tight">Regulatory Context</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { title: "DOT vs MC Authority Logic", text: "The technical distinction between safety footprints and commercial operating rights." },
              { title: "New Entrant Audit Orientation", text: "Standardized investigation criteria used during the federal 18-month monitoring window." },
              { title: "Insurance Continuity Standards", text: "Documentation frameworks required to satisfy primary liability underwriters." },
              { title: "CSA Monitoring Protocol", text: "How public safety data influences long-term insurability and authority status." }
            ].map((foundation, i) => ( foundation &&
              <div key={i} className="flex items-start space-x-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all">
                <div className="p-3 bg-signal-gold/20 text-signal-gold rounded-xl">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{foundation.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">{foundation.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STARTER TEMPLATES & OPERATING TOOLS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">03. Implementation Preview</p>
          <h2 className="text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tight">Starter Tools</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "DQ File Starter Pack", cat: "Driver Compliance", icon: <User /> },
            { title: "Vehicle Maintenance Log", cat: "Equipment Safety", icon: <Monitor /> },
            { title: "Accident Reporting Form", cat: "Incident Data", icon: <FileWarning /> },
            { title: "Daily Activity Log", cat: "Operational Order", icon: <Clock /> }
          ].map((tool, i) => (
            <div key={i} className="bg-slate-50 dark:bg-gray-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-border-dark flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white dark:bg-surface-dark text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-all">
                {React.cloneElement(tool.icon as React.ReactElement, { size: 24 })}
              </div>
              <h4 className="text-lg font-black text-authority-blue dark:text-white uppercase leading-tight mb-2">{tool.title}</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">{tool.cat}</p>
              <button 
                onClick={() => setSelectedGuide({title: tool.title, link: "#"})}
                className="mt-auto px-6 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-authority-blue hover:border-authority-blue transition-all"
              >
                Request Download
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALCULATORS & DECISION TOOLS */}
      <section className="py-24 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">04. Economic Engines</p>
            <h2 className="text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tight">Decisive Clarity</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-lg text-slate-500 dark:text-text-dark-muted leading-relaxed font-medium">
                Slowing down decisions is a defensive strategy. Use these calculators to identify real break-even thresholds and profit margins before committing to operational overhead.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Cost-Per-Mile Engine",
                  "Break-Even Load Analyzer",
                  "Maintenance Reserve Estimator",
                  "Revenue vs Risk Comparison"
                ].map((calc, i) => (
                  <div key={i} className="flex items-center space-x-3 p-5 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-border-dark shadow-sm">
                    <Calculator size={18} className="text-signal-gold" />
                    <span className="text-xs font-bold uppercase tracking-tight">{calc}</span>
                  </div>
                ))}
              </div>
              <Link to="/tools/tco-calculator" className="inline-flex items-center px-10 py-5 bg-authority-blue text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg active:scale-95 transition-all">
                Launch Synthesis Terminal <ArrowRight size={16} className="ml-3" />
              </Link>
            </div>
            <div className="bg-[#020617] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]"><Calculator size={200} /></div>
              <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">Clarity Before Commitment</h3>
              <p className="text-white/60 text-sm leading-relaxed italic mb-8">
                “Profit is the byproduct of calculated restraint. If the math does not survive the terminal, the operation will not survive the market.”
              </p>
              <div className="space-y-4">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-signal-gold w-[75%]"></div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Resource Calibration: 75% Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL SHIELD - SCAMS & FRAUD */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="bg-red-50/50 dark:bg-red-950/10 border-2 border-red-100 dark:border-red-900/30 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none rotate-12 scale-150">
            <ShieldAlert size={400} />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-3 bg-red-600 text-white px-5 py-2.5 rounded-full mb-10 shadow-lg">
              <ShieldAlert size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Institutional Shield Protocol</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-8 leading-[0.9]">
              The External <br/><span className="text-red-600 italic">Exposure Defense</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-text-dark-primary font-bold mb-14 leading-relaxed">
              Predatory services leverage regulatory complexity to exploit new entrants. Frame scams as systems failures:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { label: "AROUND", title: "Fake FMCSA Solicitation", desc: "Official-looking correspondence demanding immediate payment for 'BOC-3' or 'Registration' services.", icon: <MoveLeft /> },
                { label: "THROUGH", title: "Compliance Fraud", desc: "Overpriced, non-standard compliance packages that fail to meet actual federal documentation requirements.", icon: <MoveRight /> },
                { label: "UNDER", title: "Operational Gimmicks", desc: "'Instant authority' or 'guaranteed loads' that collapse your structural safety management foundation.", icon: <MoveUp /> }
              ].map((risk, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center space-x-3 text-red-600">
                    {risk.icon}
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{risk.label}</span>
                  </div>
                  <h4 className="text-lg font-black uppercase text-authority-blue dark:text-white tracking-tight">{risk.title}</h4>
                  <p className="text-xs font-medium text-slate-500 dark:text-text-dark-muted leading-relaxed">{risk.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-red-100 dark:border-red-900/20 shadow-sm">
               <p className="text-sm font-black uppercase tracking-[0.2em] text-authority-blue dark:text-white mb-4">Patience is a Competitive Advantage.</p>
               <p className="text-xs text-slate-500 dark:text-text-dark-muted font-medium italic">
                 Do not commit funds to solicitations received via unsolicited email or postal mail. Use the LaunchPath Verification Terminal if legitimacy is unconfirmed.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FIELD LESSONS & CASE INSIGHTS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-3">05. Case Synthesis</p>
          <h2 className="text-4xl font-black text-authority-blue dark:text-white uppercase tracking-tight">Incident Case Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: "CASE-001", title: "DQ File Data Lag", outcome: "Failed Audit", lesson: "Administrative delays in pre-employment testing trigger automatic federal safety rating downgrades." },
            { id: "CASE-002", title: "ELD Policy Omission", outcome: "OOS Violation", lesson: "Lack of documented device instruction cards for drivers leads to immediate out-of-service status during roadside inspection." }
          ].map((caseStudy, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{caseStudy.id}</span>
                  <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-full">{caseStudy.outcome}</span>
               </div>
               <h4 className="text-xl font-black uppercase text-authority-blue dark:text-white mb-4 tracking-tight">{caseStudy.title}</h4>
               <p className="text-sm text-slate-500 dark:text-text-dark-muted leading-relaxed font-medium border-l-2 border-slate-100 pl-6">{caseStudy.lesson}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAITH-ALIGNED STEWARDSHIP (Implicit Core) */}
      <section className="py-32 bg-authority-blue text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
           <Anchor className="text-signal-gold mx-auto mb-10 opacity-40" size={48} />
           <h2 className="text-4xl font-black font-serif uppercase tracking-tight text-white mb-8">Governance Principles</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { t: "Order", s: "Over Chaos" },
                { t: "Truth", s: "Over Urgency" },
                { t: "Discipline", s: "Over Emotion" },
                { t: "Stewardship", s: "Over Exploitation" }
              ].map((p, i) => (
                <div key={i} className="space-y-2">
                   <p className="text-lg font-black text-signal-gold uppercase">{p.t}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{p.s}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 9. PATH FORWARD */}
      <section className="py-40 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-5xl lg:text-7xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white mb-10 leading-none">Formalize <br/><span className="text-signal-gold italic">The Process.</span></h2>
           <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium mb-16 max-w-2xl mx-auto">
             Transition from conceptual orientation to systematic implementation. Adoption of the standard requires documented alignment.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/reach-test" className="w-full sm:auto px-16 py-7 bg-authority-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl active:scale-95 transition-all">
                Initiate Diagnosis
              </Link>
              <Link to="/learning-path" className="w-full sm:w-auto px-16 py-7 bg-white dark:bg-gray-800 text-authority-blue dark:text-white border-2 border-authority-blue rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] active:scale-95 transition-all">
                Program Overview
              </Link>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mt-20">
             LAUNCHPATH™ TRANSPORTATION EDU — SYSTEM REPOSITORY LP-RES-01
           </p>
        </div>
      </section>

      {/* AUTHORIZATION MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-authority-blue/40 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/10 max-w-lg w-full relative animate-in zoom-in-95 duration-300">
            <button onClick={closeModal} className="absolute top-10 right-10 p-2 text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-authority-blue/5 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><FileText size={32} /></div>
              <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">Registry Authorization</h3>
              <p className="text-slate-500 font-medium text-sm">Provisioning the <strong>{selectedGuide.title}</strong> requires administrative verification.</p>
            </div>
            {showSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
                <p className="text-lg font-black text-authority-blue uppercase tracking-widest">Access Granted</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Legal Name</label>
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

    </div>
  );
};

export default ResourcesPage;