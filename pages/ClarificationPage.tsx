
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  CreditCard, 
  ShieldAlert, 
  ArrowRight,
  Lock,
  Scale,
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';

const ClarificationPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const clarifications = [
    {
      q: "What if my insurance quote is higher than expected?",
      icon: <CreditCard size={20} />,
      content: (
        <div className="space-y-6">
          <p>Insurance pricing for new authorities in 2026 is strictly risk-based and market-driven. It is critical for applicants to understand that LaunchPath does not set, negotiate, or guarantee insurance rates.</p>
          <p>While high initial premiums can be a significant financial hurdle, they do not invalidate the LaunchPath Operating Standard. Instead, the Insurance Continuity pillar is designed to move you from a state of "Exposure" to a state of "Refuge" through three specific technical disciplines:</p>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start">
              <span className="font-black mr-2">Systemic Documentation:</span> Building the evidence-based files that underwriters require to verify your safety posture.
            </li>
            <li className="flex items-start">
              <span className="font-black mr-2">Safety Posture Implementation:</span> Installing the "Compliance Backbone" (The 16 Deadly Sins framework) to demonstrate to insurers that you are a lower-risk bet than the average new entrant.
            </li>
            <li className="flex items-start">
              <span className="font-black mr-2">Renewal Discipline:</span> Establishing the administrative habits required to maintain coverage continuity and improve your long-term insurability over the life of your authority.
            </li>
          </ul>
          <div className="mt-8 p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border-l-4 border-authority-blue">
            <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-2">The LaunchPath Stance</h4>
            <p className="text-sm italic font-medium">We treat insurance as a fixed economic reality of the interstate carrier business. If your TCO Economic Analysis indicates that your current quotes make the business model non-viable, the LaunchPath Standard dictates a "Delay" in operations rather than a compromise in compliance. We do not sell "cheap insurance" shortcuts; we provide the institutional framework required to survive the market until your safety record allows for premium stabilization.</p>
          </div>
        </div>
      )
    },
    {
      q: "Does LaunchPath guarantee I will pass a New Entrant Safety Audit?",
      icon: <ShieldAlert size={20} />,
      content: (
        <div className="space-y-6">
          <p>No. LaunchPath does not, and cannot, guarantee the outcome of a federal or state safety audit. The final determination of your safety rating is made solely by the FMCSA or its state-level partners based on their independent investigation.</p>
          <p>The LaunchPath 90-Day Survival System is designed to provide you with the Systems and Infrastructure required to manage your regulatory obligations, but your success depends entirely on your daily execution of those systems.</p>
          <p>Our Compliance Backbone pillar focuses on two primary areas to reduce your exposure:</p>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start">
              <span className="font-black mr-2">The 16 Deadly Sins Framework:</span> We provide the technical knowledge and checklists needed to identify and address the specific violations that lead to automatic audit failure.
            </li>
            <li className="flex items-start">
              <span className="font-black mr-2">Documentation as Evidence of Refuge:</span> We provide the "DQ File Factory" and standardized maintenance logs required to prove to an investigator that your carrier is operating with intent and organization.
            </li>
          </ul>
          <div className="mt-8 p-6 bg-slate-50 dark:bg-gray-800 rounded-2xl border-l-4 border-authority-blue">
            <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-2">The LaunchPath Stance on Accountability</h4>
            <p className="text-sm italic font-medium">We provide the Standardized Implementation Requirements; the carrier owner provides the Operational Discipline. A "guarantee" of a passing audit would be a marketing shortcut that contradicts our institutional values. Instead, we provide Checkpoint Verifications throughout the 90-day roadmap to stress-test your files against the LaunchPath standard before a real investigator arrives. We don't sell a "pass"; we sell the institutional framework for carriers who refuse to operate in a state of Exposure.</p>
          </div>
        </div>
      )
    },
    {
      q: "How long does it take for my MC Number to become active?",
      icon: <Calendar size={20} />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold opacity-60">The Reality</h4>
            <p>Federal processing timelines are fixed and non-negotiable. The standard waiting period for a new Motor Carrier (MC) number is generally 21 days. This timeframe includes the mandatory 10-day public protest period and administrative processing by the FMCSA.</p>
          </div>
          
          <div className="p-5 bg-slate-50 dark:bg-gray-800 rounded-2xl border-l-4 border-authority-blue">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue mb-2">The LaunchPath Stance</h4>
            <p className="text-sm font-medium italic">We do not attempt to bypass federal administrative requirements.</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold opacity-60">Strategic Utilization</h4>
            <p>Within the 90-Day Survival System, this 21-day window is intentionally utilized for Phase 2: Authority Hardening. This ensures that your "Compliance Backbone" and DQ File Factory are fully operational before your authority is granted, preventing early-stage regulatory exposure.</p>
          </div>
        </div>
      )
    },
    {
      q: "Can I skip sections or move ahead before completing required steps?",
      icon: <Lock size={20} />,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold opacity-60">The Reality</h4>
            <p className="font-bold">No. LaunchPath is an engineered Implementation Path, not a collection of elective tutorials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Structural Integrity</h4>
              <p className="text-sm leading-relaxed">The program is built on a Systematic Path Implementation where each milestone provides the necessary "Refuge" required to safely navigate the next phase.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Mandatory Progression</h4>
              <p className="text-sm leading-relaxed">Each student must pass defined Verification Points—such as the TCO Economic Analysis and Stewardship Alignment—before the next level of the standard is unlocked.</p>
            </div>
          </div>

          <div className="mt-4 p-6 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border-l-4 border-red-600">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Risk Prevention</h4>
            <p className="text-sm font-medium">Skipping foundational steps introduces "Operational Instability" and "Underwriting Isolation," the very risks this standard was built to eliminate. Success in this program requires a commitment to <span className="font-black text-authority-blue dark:text-white underline decoration-signal-gold/50 decoration-2">Order and Certainty</span> over speed.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-32 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Mockup Header Implementation */}
        <div className="text-center mb-24">
          <div className="w-20 h-20 bg-authority-blue rounded-[1.5rem] flex items-center justify-center mx-auto mb-12 shadow-[0_20px_40px_-10px_rgba(30,58,95,0.4)]">
             <HelpCircle size={40} className="text-signal-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
            Institutional <span className="text-signal-gold italic">Clarifications</span>
          </h1>
          <p className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
            Truth over Marketing. Reality over Persuasion.
          </p>
        </div>

        {/* Clarification Accordion */}
        <div className="space-y-6">
          {clarifications.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`group bg-white dark:bg-surface-dark border rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                  isOpen 
                  ? 'border-authority-blue shadow-2xl ring-1 ring-authority-blue/5' 
                  : 'border-slate-100 dark:border-border-dark shadow-sm hover:border-authority-blue/20'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-10 text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isOpen ? 'bg-authority-blue text-signal-gold shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-300 ${
                      isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'
                    }`}>
                      {item.q}
                    </span>
                  </div>
                  <div className={`p-3 rounded-full transition-all duration-500 ${
                    isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-300 group-hover:bg-slate-200'
                  }`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-10 pt-0 text-slate-500 dark:text-text-dark-muted font-bold text-base leading-relaxed border-t border-slate-50 dark:border-border-dark mt-4 animate-in slide-in-from-top-4 duration-500">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote CTA */}
        <div className="mt-20 text-center space-y-12">
          <Link to="/faq" className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-slate-500 hover:text-signal-gold transition-colors block">
            View All Technical Answers
          </Link>
          <div className="pt-20 border-t border-slate-100 dark:border-slate-800">
             <Link to="/readiness" className="bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95 inline-flex items-center">
               Initiate Admission Protocol
               <ArrowRight className="ml-4" size={18} />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarificationPage;
