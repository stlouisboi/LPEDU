import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  Scale, 
  Award,
  ShieldAlert,
  Lock,
  Calendar,
  Truck,
  Building2,
  DollarSign,
  AlertTriangle,
  FileText
} from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      q: "What if my insurance quote is higher than expected?",
      a: `Insurance pricing for new authorities is strictly risk-based and market-driven. LaunchPath does not set, negotiate, or guarantee insurance rates. While high initial premiums are a financial hurdle, they do not invalidate the Operating Standard. 

The Insurance Continuity pillar moves you from "Exposure" to "Refuge" through three technical disciplines:
1. Systemic Documentation: Evidence underwriters require to verify safety posture.
2. Safety Posture Implementation: Installing the "Compliance Backbone" to demonstrate lower risk.
3. Renewal Discipline: Habits required to maintain coverage and improve long-term insurability.

The LaunchPath Stance: We treat insurance as a fixed economic reality. If TCO analysis indicates the business model is non-viable, the Standard dictates a "Delay" in operations rather than a compromise in compliance.`,
      icon: <CreditCard size={18} />
    },
    {
      q: "Does LaunchPath guarantee I will pass a New Entrant Safety Audit?",
      a: `No. LaunchPath does not guarantee audit outcomes. Final determination is made solely by the FMCSA based on their independent investigation. 

The 90-Day Survival System provides the Infrastructure required to manage obligations, but success depends on your daily execution. We focus on:
1. The 16 Deadly Sins Framework: Identifying violations that trigger automatic failure.
2. Documentation as Evidence of Refuge: Using the "DQ File Factory" and maintenance logs to prove intent and organization to investigators.

The LaunchPath Stance: We provide Standardized Implementation Requirements; the carrier provides Operational Discipline. We don't sell a "pass"; we sell the institutional framework for carriers who refuse to operate in a state of Exposure.`,
      icon: <ShieldAlert size={18} />
    },
    {
      q: "How long does it take for my MC Number to become active?",
      a: "Activation timelines vary based on filings, insurance submissions, and FMCSA processing. LaunchPath provides structure and sequencing, but does not control federal timelines. Delays are common and must be planned for within the first 90 days of authority.",
      icon: <Calendar size={18} />
    },
    {
      q: "Can I skip sections or move ahead before completing required steps?",
      a: "No. LaunchPath progression is gated by verification checkpoints. Advancement requires submission and review against the LaunchPath Standard. This structure exists to protect authority, insurance continuity, and compliance integrity.",
      icon: <Lock size={18} />
    },
    {
      q: "Is LaunchPath intended for non-CDL box truck carriers?",
      a: "Yes. The operating standard applies to all motor carriers operating commercial motor vehicles in interstate commerce, regardless of driver licensing class (CDL or non-CDL). Regulatory requirements for DQ files, HOS, and maintenance are consistent across both categories.",
      icon: <Truck size={18} />
    },
    {
      q: "Do I need to own a vehicle before beginning the program?",
      a: "Ownership is not a prerequisite for enrollment. The standard covers entity structure and preliminary filing protocols that precede equipment acquisition. However, operational safety files must be completed once equipment and drivers are staged.",
      icon: <Building2 size={18} />
    },
    {
      q: "Is there a recurring monthly subscription fee?",
      a: "LaunchPath operates on a system-access model. Once admitted, the carrier receives access to the implementation protocols and technical files required for the 90-day stabilization window. Check with the enrollment terminal for current pricing structures.",
      icon: <DollarSign size={18} />
    }
  ];

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 stagger-parent">
          <div className="w-20 h-20 bg-authority-blue text-signal-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl stagger-item">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 font-serif text-authority-blue dark:text-white tracking-tighter uppercase leading-none stagger-item">
            Institutional <span className="text-signal-gold italic">Answers</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted max-w-2xl mx-auto font-medium leading-relaxed stagger-item">
            Clarification on the LaunchPath Operating Standard, regulatory timelines, and administrative expectations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`group border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                  isOpen 
                  ? 'border-authority-blue bg-white dark:bg-surface-dark shadow-2xl ring-1 ring-authority-blue/5' 
                  : 'border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-authority-blue/30 shadow-sm'
                }`}
              >
                <h3>
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${isOpen ? 'bg-authority-blue text-signal-gold' : 'bg-slate-50 dark:bg-gray-800 text-text-muted'}`}>
                        {faq.icon}
                      </div>
                      <span className={`text-lg font-black tracking-tight transition-colors duration-300 uppercase ${isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'}`}>
                        {faq.q}
                      </span>
                    </div>
                    <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                </h3>
                
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-8 pt-0 text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 animate-in slide-in-from-top-4 duration-500">
                      <p className="text-base whitespace-pre-wrap">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 p-12 bg-authority-blue rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-signal-gold/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Still Need Technical Clarity?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Regulatory compliance can be complex. I'm here to simplify it so you can focus on building your fleet with integrity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact" 
                className="bg-white text-authority-blue px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-xl active:scale-95 flex items-center"
              >
                Message Vince Directly
              </Link>
              <Link 
                to="/auto-diagnostic" 
                className="text-signal-gold font-black uppercase tracking-widest text-xs flex items-center hover:underline group"
              >
                Validate Readiness 
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;