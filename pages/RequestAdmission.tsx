import React, { useState } from 'react';
import { 
  Award, 
  DollarSign, 
  FileText, 
  Lock, 
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowRight
} from 'lucide-react';
import AdmissionTerminalV42 from '../components/AdmissionTerminalV42';

/**
 * RequestAdmission: Institutional Entry Gate
 * Blueprint: image_797f31.jpg
 * Now utilizing the extracted AdmissionTerminalV42 component.
 */
const RequestAdmission: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans selection:bg-[#002244]/10">
      
      {/* SECTION: HEADER (Blueprint: image_797f31.jpg) */}
      <section className="pt-32 pb-20 px-6 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-authority-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center space-y-10 animate-reveal-up relative z-10">
          <div className="inline-flex items-center space-x-3 bg-[#002244]/5 dark:bg-white/5 px-6 py-2.5 rounded-full border border-[#002244]/10 dark:border-white/10 shadow-sm">
             <Lock size={14} className="text-[#C5A059]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#002244] dark:text-white">Admission Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-serif text-[#002244] dark:text-white tracking-tighter uppercase leading-[0.85]">
            REQUEST <br/><span className="text-[#C5A059] italic">ADMISSION.</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
            LaunchPath is selective by design. We build infrastructure for carriers who prioritize stewardship over short-term revenue.
          </p>
        </div>
      </section>

      {/* SECTION: STEWARDSHIP CARDS (3-Column Grid) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card: Wisdom */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <Award size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">WISDOM STANDARD</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Order precedes revenue. Admission requires a formal recognition that systems are the floor, not the ceiling of your business.
               </p>
            </div>
          </article>

          {/* Card: Fiscal */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <DollarSign size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">FISCAL DISCIPLINE</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Capital is oxygen. We require a commitment to maintaining 90 days of operational reserves before initiating fleet expansion.
               </p>
            </div>
          </article>

          {/* Card: Documentary */}
          <article className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:border-[#002244]/20 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <FileText size={48} className="text-[#C5A059]" />
            </div>
            <div className="space-y-6">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white">DOCUMENTARY ORDER</h3>
               <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                 Clinical record-keeping is non-negotiable. Evidence of refuge must be established before the first load is booked.
               </p>
            </div>
          </article>

        </div>
      </section>

      {/* SECTION: CALL TO ACTION (Access the standard) */}
      <section className="py-40 px-6 bg-white dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-16 animate-reveal-up relative z-10">
           <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black font-serif uppercase text-[#002244] dark:text-white leading-tight">ACCESS THE <br/><span className="text-[#C5A059] italic">OPERATING STANDARD.</span></h2>
              <div className="h-2 w-40 bg-[#C5A059] mx-auto rounded-full"></div>
              <p className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
                One-time implementation investment of <span className="text-[#002244] dark:text-white">$2,500</span>. Includes lifetime access to the 90-Day Survival System.
              </p>
           </div>
           
           <div className="flex flex-col items-center space-y-12">
             <button 
               onClick={() => setIsTerminalOpen(true)}
               className="bg-[#002244] text-white px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_-10px_rgba(0,34,68,0.4)] hover:bg-[#0c1a2d] hover:scale-105 transition-all active:scale-95 border-b-[12px] border-slate-900 group"
             >
               OPEN ADMISSION TERMINAL <ChevronRight className="inline ml-4 group-hover:translate-x-2 transition-transform" size={24} />
             </button>

             <div className="flex items-center space-x-6 opacity-30">
               <ShieldCheck size={24} className="text-[#C5A059]" />
               <div className="h-px w-20 bg-[#002244] dark:bg-white"></div>
               <p className="text-[11px] font-black uppercase tracking-[0.5em] text-[#002244] dark:text-white">INTEGRITY STANDARD CERTIFIED</p>
               <div className="h-px w-20 bg-[#002244] dark:bg-white"></div>
               <Activity size={24} className="text-[#C5A059]" />
             </div>
           </div>
        </div>
      </section>

      {/* ADMISSION TERMINAL COMPONENT */}
      <AdmissionTerminalV42 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />

      {/* FOOTER ANCHOR */}
      <section className="py-32 bg-[#FAF9F6] dark:bg-[#020617] text-center border-t border-slate-200 dark:border-white/5">
         <p className="text-[12px] font-black uppercase tracking-[1em] text-slate-400 italic mb-8">
            BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.
         </p>
         <div className="flex items-center justify-center space-x-6 opacity-10">
            <Lock size={20} />
            <Activity size={20} />
            <ShieldCheck size={20} />
         </div>
      </section>
    </div>
  );
};

export default RequestAdmission;