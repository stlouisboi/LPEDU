import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Users, 
  ArrowRight, 
  Award, 
  BookOpen, 
  ShieldAlert, 
  MessageSquare, 
  Zap, 
  Star, 
  Calendar,
  Check,
  X,
  Sparkles,
  Info,
  TrendingDown,
  Clock
} from 'lucide-react';
import Logo from '../components/Logo';

const DecisionWindow = () => (
  <section className="max-w-4xl mx-auto px-4 py-12">
    <div className="bg-[#F8F9FA] dark:bg-slate-900 border-2 border-authority-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 scale-150 pointer-events-none">
        <ShieldCheck size={200} className="text-authority-blue" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="w-16 h-16 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck size={32} />
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-black uppercase tracking-widest text-authority-blue dark:text-white mb-4">🛡️ 7-Day Decision Window</h3>
          <div className="prose prose-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            <p className="mb-4">
              LaunchPath does not offer a free trial, but we do offer a 7-day decision window. We believe in clarity, responsibility, and commitment.
            </p>
            <p className="mb-4">
              If within 7 days you determine the standard is not aligned with your operational needs, you may request a refund.
            </p>
            <p className="font-bold text-authority-blue dark:text-signal-gold">
              After that period, all investments are final due to immediate access to proprietary documentation and standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ScopeClarity = () => (
  <section className="max-w-5xl mx-auto px-4 py-16">
    <div className="bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-border-dark p-10 md:p-16 shadow-sm overflow-hidden relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">What LaunchPath Is — and Is Not</h2>
        <p className="text-lg text-text-muted mt-2 font-medium">Clear boundaries create successful partnerships.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-green-600 flex items-center">
            <Check size={18} className="mr-2" /> LaunchPath Is
          </h3>
          <ul className="space-y-4">
            {[
              "Education and coaching focused on authority survival",
              "Structured standards for compliance, insurance continuity, and cash flow",
              "Federally-aligned operating standards and templates"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-base font-bold text-text-primary dark:text-text-dark-muted">
                <CheckCircle2 size={20} className="text-green-500 shrink-0 mr-3 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-red-500 flex items-center">
            <X size={18} className="mr-2" /> LaunchPath Is Not
          </h3>
          <ul className="space-y-4">
            {[
              "Dispatching or load finding service",
              "Legal, tax, or insurance advice",
              "Individual representation in federal audits"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-base font-bold text-text-muted">
                <ShieldAlert size={20} className="text-red-400 shrink-0 mr-3 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const AfterEnrollment = () => (
  <section className="py-24 bg-slate-50 dark:bg-surface-dark/20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-[0.03] pointer-events-none">
          <Sparkles size={200} className="text-authority-blue" />
        </div>
        <div className="inline-flex items-center space-x-2 text-authority-blue dark:text-signal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">
          <span>The Path to Peace of Mind</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">
          What Happens After Approval
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto font-medium leading-relaxed">
          Upon admission, the "guessing game" ends. You transition from uncertainty to a guided implementation rhythm built for operational order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-12 z-0"></div>

        {[
          { 
            step: "01", 
            title: "Instant Portal Access", 
            icon: <Zap className="text-signal-gold" />, 
            desc: "Breathe easier knowing the standard is in your hands. You'll receive an immediate login to our secure student dashboard where Phase 1 orientation is waiting.",
            relief: "No waiting. Start securing your identity today."
          },
          { 
            step: "02", 
            title: "90-Day Rhythm", 
            icon: <Calendar className="text-authority-blue" />, 
            desc: "We follow a proven sequence that matches the 90-day authority containment window. lessons and tools are provided in a rhythm designed to prevent overwhelm.",
            relief: "Focus on one pillar at a time without the noise."
          },
          { 
            step: "03", 
            title: "Guided Checkpoints", 
            icon: <Users className="text-signal-gold" />, 
            desc: "You will be plugged into implementation calls or sessions as dictated by the 90-day rhythm. You aren't building this carrier in isolation.",
            relief: "Expert eyes on your compliance backbone."
          }
        ].map((item, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8 border border-border-light dark:border-border-dark group relative">
               <div className="absolute -top-3 -right-3 w-10 h-10 bg-authority-blue text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg">{item.step}</div>
               {item.icon}
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tight text-authority-blue dark:text-white mb-4 leading-tight">{item.title}</h4>
            <p className="text-base text-text-muted font-medium leading-relaxed mb-6 px-4">{item.desc}</p>
            <div className="mt-auto inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 dark:border-green-900/20">
               <CheckCircle2 size={12} />
               <span>{item.relief}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ROISection = () => (
  <section className="py-24 bg-white dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-[3.5rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-none">Investment vs <br/>Cost of Failure</h2>
        <p className="text-lg text-text-muted font-medium">One avoided compliance failure can offset the full investment.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-red-50 dark:bg-red-950/20 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/20">
          <h3 className="text-xl font-black uppercase tracking-widest text-red-700 mb-8 flex items-center">
            <TrendingDown className="mr-3" /> Average Cost of First-Year Failure
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-red-200/50 pb-4">
              <span className="font-bold text-red-900/70">Truck down payment (lost)</span>
              <span className="font-black text-red-700">$10,000</span>
            </div>
            <div className="flex justify-between items-center border-b border-red-200/50 pb-4">
              <span className="font-bold text-red-900/70">Business debt accumulated</span>
              <span className="font-black text-red-700">$25,000</span>
            </div>
            <div className="flex justify-between items-center border-b border-red-200/50 pb-4">
              <span className="font-bold text-red-900/70">Living expenses during shutdown</span>
              <span className="font-black text-red-700">$15,000</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-text-muted">A single error in documentation often leads to these financial impacts:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { t: "Insurance cancellation", d: "$31,200/yr typical impact" },
              { t: "Expectation gaps in audits", d: "$10,000 typical cost" },
              { t: "Unprofitable load cycles", d: "$3,000 monthly loss" },
              { t: "Critical SMS violations", d: "$10,000+ impact" }
            ].map((item, i) => (
              <li key={i} className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-authority-blue dark:text-white uppercase leading-tight">{item.t}</p>
                  <p className="text-[10px] font-bold text-text-muted mt-1">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 bg-[#F8F9FA] dark:bg-primary-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 text-signal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">
          <Star size={12} fill="currentColor" />
          <span>Carrier Experience</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Systematic Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote: "LaunchPath saved me from the mistakes that bankrupted my friend's trucking company. The insurance logic was worth 10x the price.",
            author: "Marcus T., Georgia",
            context: "Met audit expectations on first try",
            img: "https://picsum.photos/seed/marcus/80/80"
          },
          {
            quote: "Vince's approach is different. No hype about revenue - just straight talk about compliance and standards. That's exactly what I needed.",
            author: "Jennifer K., Texas",
            context: "6 months in business",
            img: "https://picsum.photos/seed/jennifer/80/80"
          },
          {
            quote: "The mock audit was intense but invaluable. When the real audit came, I was completely prepared. Met all federal expectations.",
            author: "David M., California",
            context: "Audit Status: SATISFACTORY",
            img: "https://picsum.photos/seed/david/80/80"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] shadow-xl border border-border-light dark:border-border-dark flex flex-col group hover:-translate-y-2 transition-all">
            <div className="mb-8 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-authority-blue/10">
                <img src={t.img} alt={t.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-authority-blue dark:text-white uppercase text-sm leading-none">{t.author}</p>
                <p className="text-[10px] font-bold text-signal-gold uppercase tracking-widest mt-1.5">{t.context}</p>
              </div>
            </div>
            <p className="text-base text-text-muted dark:text-text-dark-muted font-medium italic leading-relaxed flex-grow">
              "{t.quote}"
            </p>
            <div className="mt-8 flex space-x-1">
              {[1,2,3,4,5].map(star => <Star key={star} size={12} fill="#D4AF37" className="text-signal-gold" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { 
      q: "How does admission work?", 
      a: "We review fit first to ensure you are ready for the administrative discipline required. Once you request admission, we'll review your status and, if approved, send enrollment instructions for the current cohort." 
    },
    { 
      q: "What happens after I’m approved?", 
      a: "You’ll receive a secure link to confirm your investment and set up your student credentials. You'll get immediate access to Ground Zero and the Phase 1 implementation rhythm." 
    },
    { 
      q: "Is LaunchPath self-paced?", 
      a: "Yes, you have lifetime access to the curriculum. However, we follow a 90-day implementation rhythm for the live cohort to ensure carriers reach audit readiness within the federal window." 
    },
    { 
      q: "Do you complete documents for carriers?", 
      a: "No. LaunchPath is an educational and coaching institution. We teach you how to build and maintain your own standards so you aren't dependent on outside consultants for your authority's survival." 
    },
    { 
      q: "What if I can't attend live checkpoints?", 
      a: "All implementation calls are recorded and archived in the student portal. You can submit questions in advance and review the expert guidance on your own schedule." 
    }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Admission FAQ</h2>
        <p className="text-text-muted mt-2 font-medium">Order and clarity for the admission process.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="font-black text-base uppercase tracking-tight text-authority-blue dark:text-white">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="p-6 pt-0 text-base text-text-muted dark:text-text-dark-muted font-medium leading-relaxed border-t border-slate-50 dark:border-border-dark">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const EnrollPage = () => {
  const navigate = useNavigate();

  const handleRequestAdmission = () => {
    navigate('/request-admission');
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-surface-dark/30 text-center border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-authority-blue/10">
            <Award className="w-3.5 h-3.5 text-signal-gold" />
            <span>The Compliance Operating Standard</span>
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black font-serif mb-8 leading-[0.9] text-authority-blue dark:text-white tracking-tighter uppercase">
            One Standard. <br/><span className="text-signal-gold italic">One Path.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted dark:text-text-dark-muted mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            LaunchPath is not a collection of tips. It is an admission-based 90-day implementation rhythm built for operational integrity.
          </p>
          <button 
            onClick={handleRequestAdmission}
            className="bg-authority-blue text-white px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 group"
          >
            Request Admission
          </button>
        </div>
      </section>

      {/* 2. SINGLE PRICING BLOCK */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] border-4 border-authority-blue shadow-[0_40px_100px_-20px_rgba(30,58,95,0.15)] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 scale-150 pointer-events-none">
              <Logo light className="h-64" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">
              LaunchPath — The 90-Day Standard
            </h2>
            <p className="text-lg text-text-muted font-bold uppercase tracking-widest mb-12 text-signal-gold">
              Admission-based enrollment
            </p>

            <div className="mb-12">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-slate-400">$</span>
                <span className="text-7xl font-black tracking-tighter text-authority-blue dark:text-white">1,500</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mt-4">
                Founding Investment • <span className="text-authority-blue dark:text-steel-blue underline">Standard Investment $2,500</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
              {[
                "Structured 90-day implementation rhythm",
                "Audit-ready documentation logic",
                "Preventive systems mapped to real risk",
                "Calm, disciplined expert guidance",
                "Complete template & asset library",
                "Lifetime curriculum access"
              ].map((f, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-authority-blue dark:text-signal-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-text-primary dark:text-text-dark-muted">{f}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted space-y-1">
                <span className="block italic opacity-60">Professional Boundaries:</span>
                <span className="block">• We do not represent carriers in audits</span>
                <span className="block">• We do not complete documents on your behalf</span>
                <span className="block">• We do not offer shortcuts or alternative paths</span>
              </p>
            </div>

            <button 
              onClick={handleRequestAdmission}
              className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95"
            >
              Request Admission
            </button>
            <p className="mt-6 text-[10px] font-bold text-text-muted uppercase tracking-widest leading-relaxed">
              We review fit first. If approved, you’ll receive enrollment instructions <br/>and confirm your investment.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AFTER ADMISSION SECTION */}
      <AfterEnrollment />

      {/* 4. SCOPE CLARITY */}
      <ScopeClarity />

      {/* 5. ADMISSION FAQ */}
      <FAQSection />

      {/* 6. POLICY SECTION */}
      <DecisionWindow />

      {/* 7. ROI SECTION */}
      <ROISection />

      {/* 8. SOCIAL PROOF */}
      <TestimonialsSection />

      {/* 9. FINAL CTA */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Logo light className="mx-auto mb-12 h-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight mb-8 leading-tight">Build Your Carrier on <br/><span className="text-signal-gold italic text-white/90">Order, Not Accidents.</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Shortcuts are the most expensive path in trucking. Request admission to the 90-day standard today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleRequestAdmission}
              className="bg-signal-gold text-authority-blue px-14 py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] active:scale-95"
            >
              Request Admission
            </button>
          </div>
          <div className="mt-16 flex items-center justify-center space-x-6 grayscale opacity-40">
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest">
              <ShieldAlert size={16} />
              <span>Veteran Owned</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={16} />
              <span>OSHA Standard</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest">
              <Star size={16} fill="currentColor" />
              <span>Systems Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DISCLAIMER */}
      <footer className="bg-slate-50 dark:bg-primary-dark py-12 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-loose max-w-2xl mx-auto opacity-60">
            © {new Date().getFullYear()} LaunchPath Transportation EDU. <br/>
            Information provided by LaunchPath is for educational purposes only and does not constitute legal, tax, financial, or insurance advice. <br/>
            One Standard. Dedicated to Operational Integrity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnrollPage;