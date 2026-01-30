
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  CreditCard, 
  ShieldAlert, 
  ArrowRight,
  Lock,
  Calendar
} from 'lucide-react';

const ClarificationPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const clarifications = [
    {
      q: "What if my insurance quote is higher than expected?",
      icon: <CreditCard size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-lg sm:text-xl font-extrabold leading-relaxed text-slate-700 dark:text-text-dark-primary">Insurance pricing for new authorities in 2026 is strictly risk-based and market-driven. It is critical for applicants to understand that LaunchPath does not set, negotiate, or guarantee insurance rates.</p>
          <p className="text-base sm:text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">While high initial premiums can be a significant financial hurdle, they do not invalidate the LaunchPath Operating Standard. Instead, the Insurance Continuity pillar is designed to move you from a state of "Exposure" to a state of "Refuge" through specific technical disciplines:</p>
          <ul className="space-y-6 ml-4">
            <li className="flex items-start">
              <span className="font-black text-authority-blue dark:text-signal-gold mr-3 shrink-0">•</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-600 dark:text-slate-300">Systemic Documentation: Building the evidence-based files that underwriters require to verify your safety posture.</span>
            </li>
            <li className="flex items-start">
              <span className="font-black text-authority-blue dark:text-signal-gold mr-3 shrink-0">•</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-600 dark:text-slate-300">Safety Posture Implementation: Installing the "Compliance Backbone" framework to demonstrate to insurers that you are a lower-risk bet than the average new entrant.</span>
            </li>
          </ul>
          <div className="mt-8 p-8 bg-slate-50 dark:bg-gray-800 rounded-3xl border-l-8 border-authority-blue">
            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-4">The LaunchPath Stance</h4>
            <p className="text-base sm:text-lg italic font-extrabold leading-relaxed text-slate-700 dark:text-slate-200">"We treat insurance as a fixed economic reality. If your TCO Economic Analysis indicates that your quotes make the business model non-viable, the LaunchPath Standard dictates a 'Delay' in operations rather than a compromise in compliance."</p>
          </div>
        </div>
      )
    },
    {
      q: "Does LaunchPath guarantee I will pass a New Entrant Safety Audit?",
      icon: <ShieldAlert size={20} />,
      content: (
        <div className="space-y-6">
          <p className="text-lg sm:text-xl font-extrabold leading-relaxed text-slate-700 dark:text-text-dark-primary">No. LaunchPath does not guarantee the outcome of a federal or state safety audit. The final determination of your safety rating is made solely by the FMCSA based on their independent investigation.</p>
          <p className="text-base sm:text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">The 90-Day Survival System provides the infrastructure to manage your regulatory obligations, but your success depends entirely on your execution. Our Compliance Backbone focuses on:</p>
          <ul className="space-y-6 ml-4">
            <li className="flex items-start">
              <span className="font-black text-red-600 mr-3 shrink-0">•</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-600 dark:text-slate-300">The 16 Deadly Sins: Checklists needed to identify and address violations that lead to automatic failure.</span>
            </li>
            <li className="flex items-start">
              <span className="font-black text-red-600 mr-3 shrink-0">•</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-600 dark:text-slate-300">Evidence of Refuge: The "DQ File Factory" required to prove organizational intent to investigators.</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      q: "How long does it take for my MC number to become active?",
      icon: <Calendar size={20} />,
      content: (
        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Reality</h4>
            <p className="text-lg sm:text-xl font-extrabold leading-relaxed text-slate-700 dark:text-text-dark-primary">Federal processing timelines are fixed and non-negotiable. The standard waiting period for a new Motor Carrier (MC) number is generally 21 days. This timeframe includes the mandatory 10-day public protest period and administrative processing by the FMCSA.</p>
          </div>
          <div className="p-8 bg-authority-blue text-white rounded-3xl border-l-8 border-signal-gold">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-signal-gold mb-3">The LaunchPath Stance</h4>
            <p className="text-base sm:text-lg font-extrabold italic leading-relaxed">"We do not attempt to bypass federal administrative requirements."</p>
          </div>
        </div>
      )
    },
    {
      q: "Can I skip sections or move ahead before completing required steps?",
      icon: <Lock size={20} />,
      content: (
        <div className="space-y-8">
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Requirement</h4>
            <p className="text-lg sm:text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight">No. LaunchPath is an engineered Implementation Path, not a collection of elective tutorials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3 p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">Structural Integrity</h4>
              <p className="text-base font-extrabold leading-relaxed text-slate-600 dark:text-slate-300">The program is built on a Systematic Path Implementation where each milestone provides the necessary "Refuge" required to safely navigate the next phase.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">Mandatory Progression</h4>
              <p className="text-base font-extrabold leading-relaxed text-slate-600 dark:text-slate-300">Each student must pass defined Verification Points—such as the TCO Economic Analysis and Stewardship Alignment—before the next level is unlocked.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="w-20 h-20 bg-authority-blue rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/10">
             <HelpCircle size={40} className="text-signal-gold" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
            Institutional <span className="text-signal-gold italic">Clarifications</span>
          </h1>
          <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-600">Truth over Marketing. Reality over Persuasion.</p>
        </div>

        <div className="space-y-6">
          {clarifications.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`group bg-white dark:bg-surface-dark border rounded-[3rem] overflow-hidden transition-all duration-500 ${isOpen ? 'border-authority-blue shadow-2xl ring-1 ring-authority-blue/5' : 'border-slate-100 dark:border-border-dark shadow-sm hover:border-authority-blue/20'}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : idx)} className="w-full flex items-center justify-between p-10 text-left focus:outline-none">
                  <div className="flex items-center space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-authority-blue text-signal-gold shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'}`}>{item.icon}</div>
                    <span className={`text-xl font-black uppercase tracking-tight transition-colors duration-300 ${isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'}`}>{item.q}</span>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-all duration-500 ${isOpen ? 'rotate-180 text-authority-blue' : 'text-slate-300'}`} />
                </button>
                <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden"><div className="p-10 pt-0 border-t border-slate-50 dark:border-border-dark mt-4 animate-in slide-in-from-top-4 duration-500">{item.content}</div></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center space-y-12">
          <Link to="/faq" className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-authority-blue transition-colors">View All Technical Answers</Link>
          <div className="pt-20 border-t border-slate-100 dark:border-slate-800">
             <Link to="/readiness" className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[12px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 inline-flex items-center group">
               Initiate Admission Protocol<ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarificationPage;
