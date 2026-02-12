import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need both a USDOT and MC number?",
      answer: "Yes. The USDOT number is your safety registration with the federal government. The MC number is your operating authority—your legal permission to haul freight for compensation. Without both, your equipment can be seized at roadside inspection.",
      cta: "Learn the full authority process",
      link: "/learning-path"
    },
    {
      question: "What happens if I fail the New Entrant Safety Audit?",
      answer: "Immediate authority revocation. The FMCSA will shut down your operation. You'll lose your MC number, your insurance will cancel, and you'll be prohibited from operating. The audit is the 'final exam' of your first 18 months.",
      cta: "See how we prepare you",
      link: "/learning-path"
    },
    {
      question: "How long does it take to get active authority?",
      answer: "Minimum 21 days after FMCSA approval. But being 'active' and being 'audit-ready' are two different states. Most carriers go active without the compliance infrastructure needed to survive the first audit.",
      cta: "Understand the 90-day window",
      link: "/learning-path"
    },
    {
      question: "What's the difference between a drug test and a drug program?",
      answer: "A drug test is a single event. A drug program is a federally-mandated system: random pool enrollment, consortium membership, MRO physician, documented policies, and ongoing compliance. The audit looks for the program, not just the test.",
      cta: "View Module 2: Substance Governance",
      link: "/learning-path"
    },
    {
      question: "Can I use my personal auto insurance for my truck?",
      answer: "No. You need commercial auto liability insurance with minimum $750,000 coverage (or $1M for certain commodities). Your insurance must file Form BMC-91 with FMCSA. Personal insurance will not cover commercial operations and provides no federal compliance.",
      cta: "See the Insurance Continuity pillar",
      link: "/learning-path"
    },
    {
      question: "What files do I need for a DOT audit?",
      answer: "Driver Qualification Files (medical cards, MVRs, employment history), drug & alcohol program documentation, vehicle maintenance records, hours of service logs, and insurance certificates. Each file has specific federal requirements. Missing or incomplete files result in violations.",
      cta: "Access the DQ File Factory",
      link: "/pricing"
    },
    {
      question: "How much does it cost to run a truck per month?",
      answer: "Industry average: $15,000-$18,000 per month. This includes truck payment, insurance, fuel, maintenance, permits, and compliance costs. Without proper cash-flow planning, carriers run out of 'oxygen' within 90 days.",
      cta: "Use the TCO Calculator",
      link: "/tools/tco-calculator"
    }
  ];

  return (
    <section className="relative bg-[#002244] py-16 md:py-24 border-t-4 border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-4">
            REGULATORY INTELLIGENCE
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 px-4">
            COMMON <span className="text-signal-gold">QUESTIONS</span>.
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto px-4">
            Direct answers to the questions that prevent most carriers from achieving audit-ready status. Each answer includes a path to the full institutional solution.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-signal-gold/50 transition-all duration-300 group"
            >
              {/* Question */}
              <h3 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4 flex items-start leading-tight">
                <span className="text-signal-gold mr-2 md:mr-3 text-xl md:text-2xl flex-shrink-0">Q:</span>
                <span>{faq.question}</span>
              </h3>

              {/* Answer */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6 pl-7 md:pl-8">
                {faq.answer}
              </p>

              {/* CTA Link */}
              <Link 
                to={faq.link}
                className="inline-flex items-center text-signal-gold font-bold uppercase text-xs md:text-sm tracking-wider hover:text-white transition-colors duration-300 pl-7 md:pl-8 group-hover:translate-x-2 transition-transform"
              >
                {faq.cta}
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center px-4">
          <Link 
            to="/blog"
            className="inline-flex items-center bg-signal-gold text-[#002244] px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm hover:bg-white hover:text-[#002244] transition-all duration-300 shadow-2xl"
          >
            VIEW ALL COMPLIANCE INSIGHTS
            <ChevronRight size={20} className="ml-2 md:ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
