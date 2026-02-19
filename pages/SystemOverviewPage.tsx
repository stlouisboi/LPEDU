
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_MODULES } from '../constants';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Truck, 
  AlertCircle, 
  Clock, 
  Wrench,
  Search, 
  BookOpen, 
  Route,
  Calculator,
  Target
} from 'lucide-react';

/**
 * SystemOverviewPage: A top-level view of the LaunchPath operating standard, highlighting lead magnets and core modules.
 */
const SystemOverviewPage: React.FC = () => {
  useEffect(() => {
    document.title = "System Overview | LaunchPath Transportation Education";
    const metaDesc = document.querySelector('meta[name="description"]
');
    if (metaDesc) metaDesc.setAttribute('content', 'The complete architecture of the LaunchPath operating standard, including the 8 core modules, TCO Calculator, and Ground 0 readiness briefing.');
  }, []);

  const coreModules = COURSE_MODULES.filter(m => m.id !== 0); // Exclude Ground 0
  const ground0Module = COURSE_MODULES.find(m => m.id === 0);

  return (
    <div className="bg-primary-dark min-h-screen font-sans text-white">
      
      {/* HERO SECTION - System Architecture */}
      <section className="relative bg-[#002244] py-24 sm:py-32 md:py-40 text-center border-b-4 border-signal-gold">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 z-10">
          <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4">SYSTEM ARCHITECTURE</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.9]">
            THE OPERATING <br/><span className="text-signal-gold italic">STANDARD.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            This is the documented framework for building a resilient motor carrier authority. Each component is an interdependent system designed to prevent structural collapse during the 18-month New Entrant window.
          </p>
        </div>
      </section>

      {/* LEAD MAGNETS SECTION */}
      <section className="py-24 md:py-32 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tighter text-white">
              Initial Diagnostic Tools
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Diagnostics precede instruction. These tools provide an objective assessment of operational readiness and financial viability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Ground 0 Card */}
            <div className="bg-[#002244] border-2 border-signal-gold rounded-[3rem] p-10 md:p-12 flex flex-col group">
              <div className="flex-grow">
                <Target size={32} className="text-signal-gold mb-6" />
                <h3 className="text-2xl md:text-3xl font-black font-serif uppercase text-signal-gold tracking-tight">Ground 0: The Discipline Standard</h3>
                <p className="mt-4 text-base md:text-lg text-white/70 font-medium leading-relaxed">
                  A preliminary framework verification that evaluates carrier discipline before authority filing. This is the mandatory first step. Stewardship requires saying no to those who are not ready.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/ground-0" className="inline-flex items-center justify-center w-full bg-signal-gold text-[#002244] px-10 py-5 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-white transition-all active:scale-95 group-hover:scale-105">
                  BEGIN READINESS BRIEFING <ArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* TCO Calculator Card */}
            <div className="bg-[#002244] border border-white/10 rounded-[3rem] p-10 md:p-12 flex flex-col group">
              <div className="flex-grow">
                <Calculator size={32} className="text-signal-gold mb-6" />
                <h3 className="text-2xl md:text-3xl font-black font-serif uppercase text-signal-gold tracking-tight">TCO Economic Engine</h3>
                <p className="mt-4 text-base md:text-lg text-white/70 font-medium leading-relaxed">
                  A clinical tool to cure Undercapitalization and the Money Loop. Identify your true cost of operations per mile before it dictates your failure. Clinical math precedes revenue.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/tools/tco-calculator" className="inline-flex items-center justify-center w-full bg-white/10 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-[11px] border border-white/20 hover:bg-white hover:text-[#002244] transition-all active:scale-95 group-hover:scale-105">
                  LAUNCH TCO ENGINE <ArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE MODULES SECTION */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tighter text-white">
              Core System Modules
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              The 8 interdependent modules that form the LaunchPath operating standard. Each is a non-negotiable component of a resilient authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreModules.map((module) => (
              <Link to={`/modules/${module.id}`} key={module.id} className="block bg-[#002244] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-signal-gold hover:-translate-y-2 group">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">{module.pillar}</p>
                    <h3 className="mt-4 text-xl font-black font-serif uppercase text-white tracking-tight leading-tight">{module.title}</h3>
                    <p className="mt-4 text-sm text-white/60 font-medium leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs font-bold text-white/40 group-hover:text-signal-gold transition-colors">View Module <ArrowRight className="inline-block ml-2 h-4 w-4"/></p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SystemOverviewPage;
