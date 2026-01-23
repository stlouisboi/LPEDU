import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Zap,
  Activity,
  Quote,
  Info,
  Shield
} from 'lucide-react';
import Logo from '../components/Logo';

const EnrollPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen font-sans">
      <section className="relative py-24 md:py-32 bg-white dark:bg-surface-dark/30 text-center border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-authority-blue/10">
            <Award className="w-3.5 h-3.5 text-signal-gold" />
            <span>One Standard. One System.</span>
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black font-serif mb-8 leading-[0.9] text-authority-blue dark:text-white tracking-tighter uppercase">
            Standard <br/><span className="text-signal-gold italic">Admission.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted dark:text-text-dark-muted mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
            Join the carriers who build on systems, not shortcuts. We provide the technical foundation required to survive federal scrutiny.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-authority-blue dark:text-signal-gold mb-8 uppercase tracking-[0.3em]">
          Pricing reflects the seriousness of the work and the standard required to operate compliantly.
        </p>
        <div className="bg-white dark:bg-surface-dark rounded-[4rem] border-4 border-slate-200 dark:border-border-dark shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-10 md:p-16 space-y-10">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-steel-blue mb-4">LaunchPath Standard</h2>
                <h3 className="text-4xl font-black uppercase tracking-tighter text-authority-blue dark:text-white leading-none font-serif">Complete 90-Day <br/>Implementation</h3>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      "Audit readiness logic",
                      "Implementation roadmap",
                      "Operational procedure assets",
                      "Technical file templates",
                      "Implementation walkthroughs",
                      "Systematic oversight tools",
                      "Documentation standards",
                      "Lifetime updates"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Shield className="text-authority-blue dark:text-steel-blue shrink-0" size={16} />
                        <span className="text-sm font-bold text-text-primary dark:text-text-dark-muted">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="pt-8 border-t border-slate-100 flex items-center space-x-6">
                 <div className="flex items-center space-x-3">
                    <ShieldCheck size={32} className="text-authority-blue" />
                    <div className="leading-tight">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Status</p>
                       <p className="text-sm font-black uppercase text-authority-blue">Audit Ready</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 dark:bg-gray-900/50 p-10 md:p-16 flex flex-col justify-center border-l border-slate-100">
               <div className="mb-12 text-center lg:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">Implementation Investment</p>
                  <div className="flex items-baseline justify-center lg:justify-start">
                     <span className="text-3xl font-black text-slate-400 mr-1">$</span>
                     <span className="text-[5.5rem] font-black tracking-tighter text-authority-blue dark:text-white leading-none">1,500</span>
                  </div>
                  <p className="text-sm font-bold text-text-muted mt-2">One-time payment.</p>
               </div>
               <div className="space-y-6">
                  <button 
                    onClick={() => navigate('/contact?topic=Admission+Request')}
                    className="w-full bg-authority-blue text-white py-7 rounded-2xl font-black uppercase tracking-[0.25em] text-sm shadow-xl hover:bg-[#152a44] transition-colors flex items-center justify-center"
                  >
                    <span>ENTER THE SYSTEM</span>
                  </button>
                  <div className="p-4 bg-white/50 rounded-xl flex items-start space-x-3">
                     <Info size={14} className="text-authority-blue mt-0.5" />
                     <p className="text-[10px] font-bold text-text-muted uppercase leading-relaxed text-center">
                        Administrative access issued upon successful registration.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs font-bold text-text-muted mt-12 uppercase tracking-[0.3em] leading-relaxed opacity-80">
          This is the current entry point. <br/>
          The system operates under one standard, which will increase as it matures.
        </p>
      </section>

      <section className="py-32 bg-white border-y border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-authority-blue p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                 <Quote className="text-signal-gold/20 absolute top-10 right-10" size={80} />
                 <div className="relative z-10 space-y-10">
                    <p className="text-2xl font-medium italic leading-relaxed font-serif">
                      "LaunchPath isn't a course you watch; it's a system you implement. By the time my audit letter arrived, I wasn't nervous. I just sent them the files we built. Passed with zero findings."
                    </p>
                    <div className="flex items-center space-x-4">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden">
                          <img src="https://picsum.photos/seed/trucker/80/80" alt="Student" className="grayscale" />
                       </div>
                       <div>
                          <p className="font-black uppercase tracking-widest text-sm">Marcus T., Texas</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="text-center">
                <Logo className="mx-auto mb-12 h-24 opacity-30 grayscale" />
                <h2 className="text-4xl font-black font-serif uppercase tracking-tight mb-8">Secure Your Authority.</h2>
                <button 
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                  className="bg-authority-blue text-white px-14 py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-steel-blue transition-all active:scale-95"
                >
                  ENTER THE SYSTEM
                </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;