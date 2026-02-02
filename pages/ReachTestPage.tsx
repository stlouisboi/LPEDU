
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
  FileText
} from 'lucide-react';

const ReachTestPage = () => {
  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Institutional Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10">
            <Scale size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Standard Diagnostic Protocol</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none mb-8">
            The <span className="text-signal-gold italic">REACH</span> Test™
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed italic">
            "Assessment of structural integrity under institutional pressure."
          </p>
          <p className="text-[10px] text-slate-400 italic mt-6 uppercase tracking-[0.4em] font-medium">
            Wisdom before movement. Discipline before expansion.
          </p>
        </div>

        {/* Resource Usage Orientation Block */}
        <div className="max-w-4xl mx-auto mb-16 space-y-12">
          <div className="bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <FileSearch size={120} />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3 text-authority-blue">
                <Info size={18} className="opacity-50" />
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Resource Usage Orientation</span>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <p className="text-base font-semibold text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                The REACH Test™ is strictly a <span className="text-authority-blue dark:text-white underline decoration-signal-gold/30">diagnostic instrument</span>. It identifies where your structural stewardship is misaligned with federal standards.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 pb-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <FileText size={14} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Diagnostic Output</h4>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-text-dark-muted leading-relaxed">
                    Results reveal <span className="font-bold text-slate-700 dark:text-slate-300">exposure vectors</span> within the carrier entity. Documentation templates and corrective sequencing remain restricted to the authorized portal.
                  </p>
                </div>
                <div className="space-y-3 border-l-2 border-slate-100 dark:border-slate-800 pl-8">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Activity size={14} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Remediation Protocol</h4>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-text-dark-muted leading-relaxed">
                    Implementation tools are unlocked exclusively through the formal <span className="font-bold text-authority-blue dark:text-signal-gold">Admission</span> phase, which transitions operators from identifying risk to active remediation.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[9px] text-slate-400 italic uppercase tracking-[0.3em]">
                  Stewardship is the active maintenance of order.
                </p>
              </div>
            </div>
          </div>
          
          {/* Institutional Sequencing Indicator */}
          <div className="flex flex-col items-center space-y-6 opacity-60">
            <div className="flex items-center justify-center space-x-4 w-full max-w-2xl">
              <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex items-center space-x-8 text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">
                <span className="text-authority-blue">01. Diagnostic</span>
                <ChevronRight size={12} className="opacity-30" />
                <span>02. Admission Review</span>
                <ChevronRight size={12} className="opacity-30" />
                <span>03. System Implementation</span>
              </div>
              <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Institutional Flow Sequence LP-DIAG-01</p>
          </div>
        </div>

        {/* REACH Visual Graphic Section */}
        <section className="mb-24">
          <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-authority-blue via-signal-gold to-authority-blue"></div>
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Central Graphic Container */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-16">
              {/* Central Shield */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-authority-blue dark:bg-signal-gold text-white dark:text-authority-blue rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 border-4 border-white/20">
                <ShieldCheck size={48} />
              </div>
              
              {/* Vector Arrows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 animate-bounce flex flex-col items-center">
                <p className="text-[10px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[1em] mb-2">OVER</p>
                <MoveDown size={40} className="text-authority-blue dark:text-signal-gold opacity-50" />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex items-center">
                <MoveLeft size={40} className="text-authority-blue dark:text-signal-gold opacity-50" />
                <p className="text-[10px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[1em] ml-2">AROUND</p>
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex items-center">
                <p className="text-[10px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[1em] mr-2">THROUGH</p>
                <MoveRight size={40} className="text-authority-blue dark:text-signal-gold opacity-50" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 flex flex-col items-center">
                <MoveUp size={40} className="text-authority-blue dark:text-signal-gold opacity-50" />
                <p className="text-[10px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-[1em] mt-2">UNDER</p>
              </div>
              
              {/* Pulsing Circles */}
              <div className="absolute inset-0 border-2 border-slate-100 dark:border-slate-800 rounded-full scale-100 animate-pulse"></div>
              <div className="absolute inset-4 border-2 border-slate-50 dark:border-border-dark rounded-full scale-100 opacity-50"></div>
            </div>

            {/* Graphic Subtitle */}
            <div className="text-center space-y-4 max-w-2xl relative z-10">
              <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Hierarchical Exposure Vectors</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                REACH Protocol Mapping • System Registry ID: LP-DIAG-01
              </p>
            </div>
          </div>
        </section>

        {/* 2-Column Layout for Note and Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pb-20">
          
          {/* Founder's Note Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div className="bg-slate-50 dark:bg-surface-dark border-l-4 border-authority-blue dark:border-signal-gold p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <Anchor size={80} />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-8">Founder’s Note</h4>
              <div className="space-y-6 text-sm font-medium text-slate-600 dark:text-text-dark-muted leading-[1.8] italic">
                <p>
                  "We do not rely on hope or human memory; we build engineering controls that prevent failure before it occurs. Stewardship requires the active maintenance of order."
                </p>
                <p>
                  "The REACH Test™ was developed to identify the vectors through which a motor carrier’s structural integrity is compromised. It reveals where your infrastructure fails to provide refuge before a federal auditor identifies the gap."
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-black text-authority-blue dark:text-white uppercase tracking-widest mb-1">— Vince Lawrence</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                  Founder & Lead Safety Officer, LaunchPath<br/>
                  OSHA-Certified Safety Professional
                </p>
              </div>
            </div>
          </aside>

          {/* Main Context / Vector Detail */}
          <div className="lg:col-span-8 space-y-20">
            <div className="space-y-8 prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-black font-serif uppercase text-authority-blue dark:text-white leading-none border-b border-slate-100 pb-6">Vector Analysis Protocol</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                The REACH Test™ evaluates structural alignment across the carrier entity. Diagnostic findings map to these conceptual anchors:
              </p>
              
              <div className="grid grid-cols-1 gap-12 mt-12">
                {[
                  { 
                    label: "OVER", 
                    title: "Regulatory Violations", 
                    desc: "Technical violations that bypass administrative filters, resulting in automatic federal investigation.", 
                    icon: <MoveDown className="text-signal-gold" />,
                    anchor: "DOT vs MC Authority Logic"
                  },
                  { 
                    label: "AROUND", 
                    title: "Underwriting Isolation", 
                    desc: "Administrative lapses that trigger insurance cancellation, isolating the carrier from the market.", 
                    icon: <MoveLeft className="text-signal-gold" />,
                    anchor: "New Entrant Risk Analysis"
                  },
                  { 
                    label: "THROUGH", 
                    title: "Administrative Inconsistency", 
                    desc: "Conflicting data identified during federal audits that prove a lack of systematic control.", 
                    icon: <MoveRight className="text-signal-gold" />,
                    anchor: "Clearinghouse Governance Logic"
                  },
                  { 
                    label: "UNDER", 
                    title: "Structural Taxonomy", 
                    desc: "Fiscal deficits and management gaps that compromise the mandated safety operation.", 
                    icon: <MoveUp className="text-signal-gold" />,
                    anchor: "16 Deadly Sins Exposure Taxonomy"
                  }
                ].map((v, i) => (
                  <div key={i} className="flex space-x-8 group">
                    <div className="w-14 h-14 bg-white dark:bg-gray-800 border border-slate-200 dark:border-border-dark rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all shrink-0">
                      {v.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[1em] text-authority-blue dark:text-signal-gold drop-shadow-sm">{v.label}</span>
                      <h4 className="text-xl font-bold text-authority-blue dark:text-white uppercase tracking-tight mt-1 mb-2">{v.title}</h4>
                      <p className="text-base text-slate-500 font-medium leading-relaxed mb-3">{v.desc}</p>
                      
                      <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl mt-2 transition-all hover:bg-white hover:shadow-md cursor-help">
                        <Anchor size={12} className="text-signal-gold" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold">
                          Conceptual Anchor: <span className="underline decoration-signal-gold/30 underline-offset-4">{v.anchor}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRATED CONTEXTUAL GROUNDING SECTION */}
            <div className="pt-16 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center space-x-4 mb-10">
                 <div className="w-12 h-12 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg">
                    <Scale size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Institutional Context</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Diagnostic Orientation Only</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { 
                      title: "Authority Logic Brief", 
                      desc: "Analyzing the distinction between safety identification and operational permission.",
                      link: "/clarification"
                    },
                    { 
                      title: "Clearinghouse Governance", 
                      desc: "Evaluating the systematic flow of compliance data through federal repositories.",
                      link: "/learning-path"
                    }
                  ].map((anchor, idx) => (
                    <div key={idx} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-8 rounded-[2.5rem] shadow-sm group hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
                       <div>
                          <div className="w-10 h-10 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                             <Anchor size={20} />
                          </div>
                          <h4 className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-white mb-3">{anchor.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed mb-8">{anchor.desc}</p>
                       </div>
                       <Link to={anchor.link} className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold hover:underline">
                          View Orientation Mapping <ArrowRight size={10} className="ml-2 transition-transform group-hover:translate-x-1" />
                       </Link>
                    </div>
                  ))}
               </div>
            </div>

            {/* Transition Logic Section */}
            <section className="bg-authority-blue text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden border-t-[10px] border-signal-gold/30">
              <Zap className="absolute -bottom-10 -right-10 text-white/5" size={300} />
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-signal-gold leading-none">Diagnostic Completion</h3>
                  <p className="text-lg opacity-70 font-medium leading-relaxed">
                    Completion of the REACH Test™ marks the end of the Orientation phase. Corrective actions and systematic implementation are restricted to the Admission phase.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-start space-x-5">
                  <Lock size={20} className="text-signal-gold shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-signal-gold">Access Protocol</p>
                    <p className="text-sm font-medium leading-relaxed opacity-70 italic">
                      Corrective algorithms and remediation tools are gated. Formal Admission is required to transition from identification to active system installation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-start gap-8">
                  <Link to="/readiness" className="bg-white text-authority-blue px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-sm hover:bg-signal-gold hover:text-white transition-all shadow-xl active:scale-95 inline-flex items-center group">
                    <span>Initiate Diagnostic Assessment</span>
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-[9px] text-white/30 italic uppercase tracking-[0.3em] font-medium">
                    Verified Stewardship before Operational Movement.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReachTestPage;
