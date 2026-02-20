import React from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this for CDL only?",
      answer: "No. The LaunchPath Operating Standard applies to all motor carriers operating commercial motor vehicles in interstate commerce (10,001+ GVWR), regardless of driver licensing class.",
      cta: "Verify your asset class",
      link: "/auto-diagnostic"
    },
    {
      question: "Do I need both a USDOT and MC number?",
      answer: "Yes. The USDOT number is your safety registration; the MC number is your Operating Authority. Hauling for-hire freight without an active MC number results in immediate equipment seizure.",
      cta: "Review Authority Protection",
      link: "/learning-path"
    },
    {
      question: "What happens if I fail the New Entrant Safety Audit?",
      answer: "Immediate authority revocation. The FMCSA shut-down is terminal for most carriers. LaunchPath installs the infrastructure to prevent hazards before an auditor reaches your files.",
      cta: "See failure patterns",
      link: "/exposure-matrix"
    },
    {
      question: "How much does it cost to run a truck per month?",
      answer: "Industry average is $10,300 – $18,800. Revenue without margin analysis is busyness, not business. We require a True Cost of Ownership (TCO) check before enrollment.",
      cta: "Run TCO Economic Engine",
      link: "/tools/tco-calculator"
    },
    {
      question: "Can I skip sections or move ahead?",
      answer: "No. LaunchPath is a governed implementation sequence. Each milestone provides the 'Refuge' required to safely navigate the next phase of your authority.",
      cta: "View the sequence",
      link: "/learning-path"
    },
    {
      question: "What is Ground 0?",
      answer: "The Admission Gate. 6 lessons (~90 minutes) designed to determine a Go / Wait / No-Go decision. We prioritize your capital over our enrollment numbers.",
      cta: "Enter Ground 0",
      link: "/readiness"
    }
  ];

  return (
    <section className="relative bg-[#002244] py-24 md:py-32 border-t-4 border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} className="text-signal-gold" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
            SYSTEM CLARIFICATION
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase font-serif tracking-tighter leading-none">
            INSTITUTIONAL <span className="text-signal-gold">ANSWERS</span>.
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto font-medium">
            Direct responses to the questions that determine carrier longevity. Accuracy over persuasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-3xl p-8 md:p-10 hover:border-signal-gold/50 transition-all duration-500 group"
            >
              <h3 className="text-lg md:text-xl font-black text-white mb-4 flex items-start leading-tight uppercase font-serif tracking-tight">
                <span className="text-signal-gold mr-3 text-xl flex-shrink-0 opacity-50">Q:</span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 pl-8 font-medium">
                {faq.answer}
              </p>
              <Link 
                to={faq.link}
                className="inline-flex items-center text-signal-gold font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors duration-300 pl-8 group-hover:translate-x-2 transition-transform"
              >
                {faq.cta}
                <ChevronRight size={14} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <Link 
            to="/faq"
            className="inline-flex items-center bg-white/5 text-white border border-white/10 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-primary-dark transition-all duration-300 shadow-2xl active:scale-95"
          >
            VIEW FULL TECHNICAL ARCHIVE
            <ChevronRight size={16} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;