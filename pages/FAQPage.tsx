
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is this for CDL only?",
      a: "No. LaunchPath works whether you need a CDL or not. The course teaches compliance systems that apply to all motor carriers—we just call out where CDL vs non-CDL regulations differ. Module 0 helps you decide which path makes sense for your situation."
    },
    {
      q: "How long does the course take?",
      a: "Most students complete the core modules in 2-4 weeks working part-time. You get lifetime access, so you can move at your own pace and return as regulations change. The goal isn't speed—it's audit readiness before you file for authority."
    },
    {
      q: "What type of vehicle do I need to take this course?",
      a: "None yet. This course works whether you're considering a box truck, step van, or semi. LaunchPath teaches you how to evaluate your options and understand the compliance differences before you invest in equipment."
    },
    {
      q: "Will this help me find loads or teach me dispatch?",
      a: "No. LaunchPath focuses on compliance, audit readiness, and new-entrant survival—the things that get carriers shut down in their first 18 months. We teach you how to operate legally and sustainably. Load finding and dispatch are separate skills you'll need, but they don't matter if you can't pass an audit."
    },
    {
      q: "Can I manage my own compliance or should I hire a consultant?",
      a: "You can absolutely do it yourself. FMCSA regulations are public. Our platform is built to teach you the skills so you don't have to pay a consultant thousands of dollars for simple paperwork. We move you from 'trying to start' to 'operating a regulated company'."
    }
  ];

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Frequently Asked Questions</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto">
            Direct, compliance-first answers to the most common hurdles new carrier owners face.
          </p>
        </div>

        <div className="space-y-4" role="tablist">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                  ? 'border-authority-blue bg-gray-50/50 dark:bg-surface-dark/50 shadow-md ring-1 ring-authority-blue/10' 
                  : 'border-border-light dark:border-border-dark bg-white dark:bg-surface-dark'
                }`}
              >
                <h3>
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${i}`}
                    id={`faq-header-${i}`}
                  >
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-authority-blue' : 'text-text-primary dark:text-text-dark-primary'}`}>
                      {faq.q}
                    </span>
                    <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'bg-authority-blue text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-text-muted group-hover:bg-gray-200 dark:group-hover:bg-gray-700'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                </h3>
                <div 
                  id={`faq-content-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-text-muted dark:text-text-dark-muted leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                    <p className="text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 p-10 bg-primary-light dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark text-center">
          <p className="text-lg text-text-muted dark:text-text-dark-muted mb-6">Didn't find the answer you were looking for?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact" 
              className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-steel-blue transition-all shadow-lg"
            >
              Contact Support
            </Link>
            <Link 
              to="/advisor" 
              className="text-authority-blue dark:text-steel-blue font-bold flex items-center hover:underline group"
            >
              Ask Our AI Advisor 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
