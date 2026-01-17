import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ArrowRight, BookOpen, UserCheck, CreditCard, ShieldCheck, Target, Heart, Scale, Clock, Award } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      q: "Who is this course for?",
      a: "LaunchPath is for new and aspiring owner-operators who want to build a trucking business with structure, discipline, and integrity. It’s designed for people preparing to file authority or operating in their first 12–18 months who want to avoid costly mistakes and survive the critical early phase.",
      icon: <UserCheck size={18} />
    },
    {
      q: "How is LaunchPath different from other trucking courses?",
      a: "Most courses teach tasks. LaunchPath teaches order and survival systems. Instead of hype or shortcuts, we focus on: why carriers actually fail in the first year; how insurance, compliance, and cash flow interact; and how to keep authority, insurance, and revenue continuously active. This is not a CDL school or dispatcher course. It’s a business survival system.",
      icon: <Award size={18} />
    },
    {
      q: "Is this course faith-based?",
      a: "Yes. LaunchPath is faith-based and principle-driven, built on stewardship, accountability, discipline, and integrity. You won’t be preached at, but biblical principles are applied to real business decisions.",
      icon: <Heart size={18} />
    },
    {
      q: "Do I need a CDL to take this course?",
      a: "No. LaunchPath does not teach driving skills. It teaches how to operate and protect a trucking business under your own authority, whether you drive or manage drivers.",
      icon: <Scale size={18} />
    },
    {
      q: "How long do I have access to the curriculum?",
      a: "You receive 12 months of access to the full curriculum, including updates to tools and resources as best practices evolve.",
      icon: <Clock size={18} />
    },
    {
      q: "What’s included in the Implementation Mastery tier?",
      a: "Implementation Mastery includes: the full LaunchPath curriculum, live group coaching calls, and priority Q&A and real-world scenario walkthroughs. It’s for students who want support and accountability, not just information.",
      icon: <ShieldCheck size={18} />
    },
    {
      q: "Is there a risk-free trial?",
      a: "LaunchPath does not offer a free trial, but we do offer a 7-day decision window. We believe in clarity, responsibility, and commitment. If within 7 days you determine the course is not aligned with where you are, you may request a refund. After that period, all sales are final due to immediate access to proprietary content and tools.",
      icon: <CreditCard size={18} />
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
          <h1 className="text-5xl md:text-6xl font-black mb-6 font-serif text-authority-blue dark:text-white tracking-tighter uppercase leading-none stagger-item">
            The Compliance <span className="text-signal-gold italic">Answers</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted max-w-2xl mx-auto font-medium leading-relaxed stagger-item">
            Clarity, structure, and a principled path forward. If you’re looking for shortcuts, this isn’t it.
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
                  : 'border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-authority-blue/30 dark:hover:border-signal-gold/30 shadow-sm'
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
                
                {/* Smooth Height Transition using CSS Grid */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-8 pt-0 text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 animate-in slide-in-from-top-4 duration-500">
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
                to="/advisor" 
                className="text-signal-gold font-black uppercase tracking-widest text-xs flex items-center hover:underline group"
              >
                Ask Our AI Advisor 
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