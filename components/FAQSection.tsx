import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need both a USDOT and MC number?",
      answer: "Yes. The USDOT number is your safety registration with the federal government. The MC number is your operating authority—your legal permission to haul freight for compensation. Without both, your equipment can be seized at roadside inspection.",
      cta: "Learn the full authority process",
      link: "/program"
    },
    {
      question: "What happens if I fail the New Entrant Safety Audit?",
      answer: "Immediate authority revocation. The FMCSA will shut down your operation. You'll lose your MC number, your insurance will cancel, and you'll be prohibited from operating. The audit is the 'final exam' of your first 18 months.",
      cta: "See how we prepare you",
      link: "/program"
    },
    {
      question: "How long does it take to get active authority?",
      answer: "Minimum 21 days after FMCSA approval. But being 'active' and being 'audit-ready' are two different states. Most carriers go active without the compliance infrastructure needed to survive the first audit.",
      cta: "Understand the 90-day window",
      link: "/program"
    },
    {
      question: "What's the difference between a drug test and a drug program?",
      answer: "A drug test is a single event. A drug program is a federally-mandated system: random pool enrollment, consortium membership, MRO physician, documented policies, and ongoing compliance. The audit looks for the program, not just the test.",
      cta: "View Module 2: Substance Governance",
      link: "/program"
    },
    {
      question: "Can I use my personal auto insurance for my truck?",
      answer: "No. You need commercial auto liability insurance with minimum $750,000 coverage (or $1M for certain commodities). Your insurance must file Form BMC-91 with FMCSA. Personal insurance will not cover commercial operations and provides no federal compliance.",
      cta: "See the Insurance Continuity pillar",
      link: "/program"
    },
    {
      question: "What files do I need for a DOT audit?",
      answer: "Driver Qualification Files (medical cards, MVRs, employment history), drug & alcohol program documentation, vehicle maintenance records, hours of service logs, and insurance certificates. Each file has specific federal requirements. Missing or incomplete files result in violations.",
      cta: "Access the DQ File Factory",
      link: "/admission"
    },
    {
      question: "How much does it cost to run a truck per month?",
      answer: "Industry average: $15,000-$18,000 per month. This includes truck payment, insurance, fuel, maintenance, permits, and compliance costs. Without proper cash-flow planning, carriers run out of 'oxygen' within 90 days.",
      cta: "Use the TCO Calculator",
      link: "/program"
    }
  ];

  return (
    <section className="relative bg-[#002244] py-24 border-t-4 border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 mb-4">
            REGULATORY INTELLIGENCE
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            COMMON <span className="text-signal-gold">QUESTIONS</span>.
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Direct answers to the questions that prevent most carriers from achieving audit-ready status. Each answer includes a path to the full institutional solution.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 hover:border-signal-gold/50 transition-all duration-300 group"
            >
              {/* Question */}
              <h3 className="text-xl font-black text-white mb-4 flex items-start">
                <span className="text-signal-gold mr-3 text-2xl">Q:</span>
                <span>{faq.question}</span>
              </h3>

              {/* Answer */}
              <p className="text-white/80 leading-relaxed mb-6 pl-8">
                {faq.answer}
              </p>

              {/* CTA Link */}
              <Link 
                to={faq.link}
                className="inline-flex items-center text-signal-gold font-bold uppercase text-sm tracking-wider hover:text-white transition-colors duration-300 pl-8 group-hover:translate-x-2 transition-transform"
              >
                {faq.cta}
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center bg-signal-gold text-[#002244] px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-[#002244] transition-all duration-300 shadow-2xl"
          >
            VIEW ALL COMPLIANCE INSIGHTS
            <ChevronRight size={20} className="ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
