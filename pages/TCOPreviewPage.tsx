import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  Target, 
  Lock,
  CheckCircle2
} from 'lucide-react';

const TCOPreviewPage = () => {
  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen pt-24 pb-32 font-sans selection:bg-authority-blue/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header Section */}
        <header className="mb-20 text-center space-y-8 animate-reveal-up">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full mb-4">
            <Lock size={14} className="text-authority-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">Enrolled Tool</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter leading-none text-authority-blue dark:text-white">
            TRUE COST OF <br/><span className="text-signal-gold italic">OWNERSHIP</span> CALCULATOR
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
            Financial viability diagnostic for owner-operators. Know your real numbers before you haul your first load.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Content Column */}
          <div className="lg:col-span-6 space-y-12 animate-reveal-up">
            <section className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold border-b border-slate-100 dark:border-white/5 pb-4">
                SYSTEM CAPABILITIES
              </h2>
              
              <ul className="space-y-6">
                {[
                  { title: "Fixed Overhead Mapping", desc: "Calculate your locked monthly costs including insurance, permits, and equipment payments." },
                  { title: "Variable CPM Modeling", desc: "Model real-time costs per mile for fuel, tires, and proactive maintenance reserves." },
                  { title: "Fiscal Stewardship Reserves", desc: "Define your mandatory operator wage and business tax reserve thresholds." },
                  { title: "Break-Even RPM Logic", desc: "Establish the exact rate-per-mile needed to maintain solvency and achieve target profit margins." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-5 group">
                    <div className="w-10 h-10 bg-white dark:bg-surface-dark border-2 border-slate-100 dark:border-border-dark rounded-xl flex items-center justify-center shrink-0 group-hover:border-authority-blue transition-all">
                      <CheckCircle2 size={18} className="text-authority-blue dark:text-signal-gold" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-authority-blue dark:text-white uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-10 bg-authority-blue text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target size={120} />
              </div>
              <h3 className="text-xl font-bold font-serif mb-6 uppercase text-signal-gold">Why It Matters</h3>
              <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                "Most new carriers guess at their rates. They take loads that feel profitable but slowly drain their capital. This calculator removes speculation — you'll know exactly what you need to charge before you accept a single load."
              </p>
            </section>
          </div>

          {/* Preview/Mockup Column */}
          <div className="lg:col-span-6 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.15)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-authority-blue">
                      <Calculator size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Preview</span>
                 </div>
                 <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-gray-800"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-gray-800"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-100 dark:bg-gray-800"></div>
                 </div>
              </div>

              {/* Styled Placeholder Mockup */}
              <div className="space-y-8 bg-slate-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-border-dark blur-[2px] pointer-events-none select-none">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-border-dark">
                       <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Break-Even RPM</p>
                       <p className="text-2xl font-black text-authority-blue dark:text-white">$X.XX<span className="text-xs ml-1 opacity-40">/mi</span></p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-100 dark:border-border-dark">
                       <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Cost Per Mile</p>
                       <p className="text-2xl font-black text-authority-blue dark:text-white">$X.XX<span className="text-xs ml-1 opacity-40">/mi</span></p>
                    </div>
                 </div>
                 <div className="bg-authority-blue p-8 rounded-2xl text-center">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Monthly Operating Cost</p>
                    <p className="text-3xl font-black text-white">$X,XXX.XX</p>
                 </div>
                 <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-gray-700 rounded-full"></div>
                 </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-[2px]">
                 <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-4">
                    <Lock size={16} className="text-authority-blue dark:text-signal-gold" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-white">Authorized Access Required</span>
                 </div>
              </div>
            </div>
            
            <div className="mt-12 space-y-6">
              <div className="p-8 bg-white dark:bg-surface-dark rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm">
                <p className="text-sm font-bold text-slate-500 leading-relaxed text-center">
                  This tool is available to enrolled LaunchPath members as part of the <span className="text-authority-blue dark:text-white">Ground 0</span> verification framework.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <Link 
                  to="/reach-test" 
                  className="w-full bg-signal-gold text-authority-blue py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center justify-center group border-b-8 border-slate-900"
                >
                  View Admission Protocol <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/reach-test" 
                  className="w-full bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark text-authority-blue dark:text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Take the REACH Test™ First
                </Link>
              </div>
              
              <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest font-black opacity-60 leading-relaxed">
                The REACH Test™ is free and helps you assess your <br/>compliance readiness before enrollment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCOPreviewPage;