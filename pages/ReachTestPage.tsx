import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Scale, 
  Zap, 
  MoveDown, 
  MoveRight, 
  MoveLeft, 
  MoveUp,
  ShieldAlert,
  Anchor,
  ChevronRight,
  Info,
  Lock,
  FileSearch,
  Activity,
  FileText,
  Target,
  Gavel,
  HardDrive,
  Cpu,
  AlertTriangle
} from 'lucide-react';

const ReachTestPage = () => {
  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Institutional Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10">
            <Scale size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Standard Diagnostic Protocol</span>
          </div>
          <h1 className="text-4xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
            THE <span className="text-signal-gold italic">REACH</span> TEST™
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed uppercase tracking-tight">
            A Structural Readiness Assessment for the First 90 Days Under Authority
          </p>
          <p className="text-[10px] text-slate-400 italic mt-6 uppercase tracking-[0.4em] font-black">
            Based on the OSHA-Mandated "Point of Operation" Safety Protocol
          </p>
        </div>

        {/* Narrative Section: From Factory Floor to Open Road */}
        <section className="max-w-4xl mx-auto mb-24 space-y-12">
          <div className="bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-slate-800 p-10 md:p-16 rounded-[4rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <ShieldAlert size={160} />
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">From the Factory Floor to the Open Road</h3>
                <div className="h-1 w-20 bg-signal-gold"></div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed space-y-6">
                <p>
                  In manufacturing, a machine that isn't properly guarded can cause catastrophic injury. The Occupational Safety and Health Administration (OSHA) uses a simple but effective tool—the <span className="text-authority-blue dark:text-white font-black">"gotcha stick"</span>—to determine if a worker's body can <span className="text-signal-gold font-black italic">reach</span> a machine's point of operation. If it can, the machine has failed its safety inspection.
                </p>
                <p>
                  We've adapted this rigorous safety protocol for the trucking industry. The REACH Test™ is our "gotcha stick." It is a proprietary diagnostic that identifies where your new trucking business is dangerously exposed to the five most common points of failure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hierarchical Exposure Vectors */}
        <section className="mb-24 max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Hierarchical Exposure Vectors</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] italic">Where is your business vulnerable?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                num: "01", 
                title: "Regulatory Violations", 
                desc: "Small compliance errors that trigger automatic federal review. What appears minor internally can initiate formal oversight externally.",
                icon: <Gavel size={24} className="text-red-500" />
              },
              { 
                num: "02", 
                title: "Underwriting Isolation", 
                desc: "Missing or inconsistent information that causes insurers to restrict, cancel, or refuse coverage. Without underwriting support, authority becomes fragile.",
                icon: <ShieldAlert size={24} className="text-amber-500" />
              },
              { 
                num: "03", 
                title: "Administrative Inconsistency", 
                desc: "Incomplete, mismatched, or poorly maintained documentation during audit review. When records do not align, confidence erodes quickly.",
                icon: <FileText size={24} className="text-blue-500" />
              },
              { 
                num: "04", 
                title: "Financial Structure Gaps", 
                desc: "Poor separation of revenue, reserves, and tax obligations. When financial structure is weak, cash flow destabilizes under pressure.",
                icon: <HardDrive size={24} className="text-slate-500" />
              },
              { 
                num: "05", 
                title: "System Misalignment", 
                desc: "Operating practices that conflict with how regulators, insurers, and brokers evaluate risk. When your internal system does not match institutional expectations, access narrows.",
                icon: <Cpu size={24} className="text-signal-gold" />
              }
            ].map((v, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {v.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 dark:text-slate-800 font-serif">{v.num}</span>
                </div>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-4">{v.title}</h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                  {v.desc}
                </p>
              </div>
            ))}
            
            <div className="hidden lg:flex bg-authority-blue rounded-[3rem] p-10 flex-col items-center justify-center text-center text-white relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-10 rotate-12"><Scale size={200}/></div>
               <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">OSHA Standard Applied</p>
                  <p className="text-xl font-black font-serif italic uppercase tracking-tighter">"Can an Auditor Reach the Defect?"</p>
                  <div className="space-y-4 mt-6">
                    <p className="text-sm font-medium leading-relaxed">
                      If the vulnerability is accessible, exposure is inevitable.
                    </p>
                    <p className="text-sm font-medium leading-relaxed">
                      In other words: if documentation gaps, compliance errors, or structural weaknesses are visible during review, corrective action will not be optional.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Diagnostic Completion Callout */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-surface-dark border-2 border-authority-blue rounded-[4rem] p-12 md:p-20 text-center space-y-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-2 bg-authority-blue"></div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Diagnostic Completion</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                Completion of the REACH Test™ marks the end of the <span className="text-authority-blue dark:text-white font-black">Orientation</span> phase. Corrective action and systematic implementation are restricted to the admission phase.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex items-start space-x-6 text-left">
               <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
               <div className="space-y-2">
                 <p className="text-xs font-black uppercase tracking-widest text-amber-800 dark:text-amber-400">Important Advisory</p>
                 <p className="text-sm font-medium text-amber-700 dark:text-amber-300 leading-relaxed italic">
                   The diagnostic assessment is an evaluation based on your self-reported data. It is not a substitute for a legal audit but serves as a critical first step in identifying your structural vulnerabilities.
                 </p>
               </div>
            </div>

            <div className="pt-8 flex flex-col items-center gap-8">
              <Link to="/readiness" className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center group border-b-[12px] border-slate-900">
                RUN THE REACH TEST™ <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 opacity-50">Verified Stewardship before Operational Movement</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ReachTestPage;