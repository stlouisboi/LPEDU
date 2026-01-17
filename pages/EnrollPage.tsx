import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ChevronDown,
  Users,
  Mail,
  ArrowRight,
  Target,
  Award,
  BookOpen,
  Scale,
  FileText,
  Calculator,
  Zap,
  Star,
  Phone,
  Clock,
  TrendingDown,
  ShieldAlert,
  MessageSquare,
  Lock,
  DollarSign
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
          <h3 className="text-xl font-black uppercase tracking-widest text-authority-blue dark:text-white mb-4">🛡️ 7-Day Decision Window</h3>
          <div className="prose prose-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            <p className="mb-4">
              LaunchPath does not offer a free trial, but we do offer a 7-day decision window. We believe in clarity, responsibility, and commitment.
            </p>
            <p className="mb-4">
              If within 7 days you determine the course is not aligned with where you are, you may request a refund.
            </p>
            <p className="font-bold text-authority-blue dark:text-signal-gold">
              After that period, all sales are final due to immediate access to proprietary content and tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ROISection = () => (
  <section className="py-24 bg-white dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">💰 Investment vs Cost of Failure</h2>
        <p className="text-lg text-text-muted font-medium">Why structured education is your carrier's cheapest insurance policy.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-red-50 dark:bg-red-900/10 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/20">
          <h3 className="text-xl font-black uppercase tracking-widest text-red-700 mb-8 flex items-center">
            <TrendingDown className="mr-3" /> Avg. Cost of First-Year Failure
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
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-black text-red-800 uppercase tracking-tighter">Total Potential Loss</span>
              <span className="text-3xl font-black text-red-600">$50,000+</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-border-light dark:border-border-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Value Logic</div>
            <h4 className="text-lg font-black text-authority-blue dark:text-white uppercase mb-4">LaunchPath Investment: $797 (Tier 2)</h4>
            <p className="text-3xl font-black text-green-600 mb-2">98.4% Risk Reduction</p>
            <p className="text-sm font-bold text-text-muted">for only 1.6% of the cost of total business failure.</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-text-muted">ONE avoided mistake pays for the entire course:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: "Insurance cancellation", d: "$31,200/yr saved" },
                { t: "Failed audit", d: "$10,000 saved" },
                { t: "Unprofitable loads", d: "$3,000 saved" },
                { t: "SMS violations", d: "$10,000+ saved" }
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
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
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 bg-[#F8F9FA] dark:bg-primary-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 text-signal-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">
          <Star size={12} fill="currentColor" />
          <span>Student Success Stories</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">What Students Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote: "LaunchPath saved me from the mistakes that bankrupted my friend's trucking company. The insurance module alone was worth 10x the price.",
            author: "Marcus T., Georgia",
            context: "Passed audit on first try",
            img: "https://picsum.photos/seed/marcus/80/80"
          },
          {
            quote: "Vince's approach is different. No hype about revenue - just straight talk about compliance and systems. That's exactly what I needed.",
            author: "Jennifer K., Texas",
            context: "6 months in business",
            img: "https://picsum.photos/seed/jennifer/80/80"
          },
          {
            quote: "The mock audit (Tier 3) was intense but invaluable. When the real audit came, I was completely prepared. Passed with zero findings.",
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
                <p className="font-black text-authority-blue dark:text-white uppercase text-sm leading-tight">{t.author}</p>
                <p className="text-[10px] font-bold text-signal-gold uppercase tracking-widest mt-1">{t.context}</p>
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

      <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="flex items-center space-x-2 text-authority-blue dark:text-white font-black uppercase text-[10px] tracking-widest">
          <Star size={16} fill="currentColor" className="text-signal-gold" />
          <span>4.9/5 Average Rating</span>
        </div>
        <div className="h-4 w-px bg-border-light hidden sm:block"></div>
        <div className="flex items-center space-x-2 text-authority-blue dark:text-white font-black uppercase text-[10px] tracking-widest">
          <CheckCircle2 size={16} className="text-green-500" />
          <span>94% Success Rate</span>
        </div>
        <div className="h-4 w-px bg-border-light hidden sm:block"></div>
        <div className="flex items-center space-x-2 text-authority-blue dark:text-white font-black uppercase text-[10px] tracking-widest">
          <MessageSquare size={16} className="text-authority-blue" />
          <span>47 Verified Reviews</span>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Can I upgrade from Tier 1 to Tier 2 later?", a: "Yes! Upgrade anytime and only pay the difference. Many students start with Tier 1 and upgrade once they experience the curriculum quality." },
    { q: "What if I can't attend the live group calls?", a: "All calls are recorded and available within 24 hours. You'll never miss content due to schedule conflicts." },
    { q: "Do I need to complete modules by a deadline?", a: "No deadlines. Access is lifetime. The 12-week cohort schedule is recommended for accountability, but you can go at your own pace." },
    { q: "What if I already filed my DOT authority?", a: "Perfect! You can skip sections you've completed and focus on what's next. Most students are at different stages - that's normal." },
    { q: "Is this course only for semi-truck operators?", a: "No. LaunchPath covers all commercial motor vehicles: box trucks, semi-trucks, hotshot, etc. The compliance requirements apply to all carriers." },
    { q: "What's the difference between the 7-day window and a money-back guarantee?", a: "We don't offer unconditional refunds. Within 7 days, review the content and decide if it aligns with where you are. After 7 days, all sales are final due to immediate access to proprietary systems and tools. We believe in clarity and responsibility." }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="font-black text-sm uppercase tracking-tight text-authority-blue dark:text-white">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="p-6 pt-0 text-sm text-text-muted dark:text-text-dark-muted font-medium leading-relaxed border-t border-slate-50 dark:border-border-dark">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ComparisonTable = () => (
  <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Feature Comparison</h2>
      <p className="text-text-muted mt-2 font-medium">See exactly what's included in each tier</p>
    </div>
    <div className="bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-border-dark overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Feature</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-white text-center">Tier 1</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-signal-gold text-center">Tier 2</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-white text-center">Tier 3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {[
              { f: "Ground 0 + Modules 1-6", t1: true, t2: true, t3: true },
              { f: "46 Video Lessons (~7hrs)", t1: true, t2: true, t3: true },
              { f: "50+ PDF Checklists", t1: true, t2: true, t3: true },
              { f: "6 Excel Templates", t1: true, t2: true, t3: true },
              { f: "Lifetime Access & Updates", t1: true, t2: true, t3: true },
              { f: "Web-Based Calculators (6)", t1: false, t2: true, t3: true },
              { f: "Weekly Group Calls (12)", t1: false, t2: true, t3: true },
              { f: "Private Community", t1: false, t2: true, t3: true },
              { f: "Email Support", t1: false, t2: true, t3: true },
              { f: "1-on-1 Mock Audit", t1: false, t2: false, t3: true },
              { f: "Direct Phone/Text", t1: false, t2: false, t3: true },
              { f: "Priority Support (24hr)", t1: false, t2: false, t3: true },
              { f: "Quarterly Check-ins", t1: false, t2: false, t3: true },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-8 py-4 text-xs font-bold text-text-primary dark:text-text-dark-muted">{row.f}</td>
                <td className="px-8 py-4 text-center">{row.t1 ? <CheckCircle2 className="mx-auto text-green-500" size={18} /> : <XCircle className="mx-auto text-slate-200" size={18} />}</td>
                <td className="px-8 py-4 text-center bg-signal-gold/5">{row.t2 ? <CheckCircle2 className="mx-auto text-signal-gold" size={18} /> : <XCircle className="mx-auto text-slate-200" size={18} />}</td>
                <td className="px-8 py-4 text-center">{row.t3 ? <CheckCircle2 className="mx-auto text-authority-blue dark:text-white" size={18} /> : <XCircle className="mx-auto text-slate-200" size={18} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const EnrollPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-surface-dark/30 text-center border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-authority-blue/10">
            <Award className="w-3.5 h-3.5 text-signal-gold" />
            <span>Structured Implementation Pathway</span>
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black font-serif mb-8 leading-[0.9] text-authority-blue dark:text-white tracking-tighter uppercase">
            Survive the First <br/><span className="text-signal-gold italic">18 Months.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted dark:text-text-dark-muted mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Stop guessing and start operating with federal-grade confidence. Choose the implementation tier that fits your growth plan.
          </p>
        </div>
      </section>

      {/* 2. PRICING CARDS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-6">
          
          {/* TIER 1: SELF-PACED FUNDAMENTALS */}
          <div className="lg:w-1/3 bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-authority-blue/20 flex flex-col shadow-sm group hover:shadow-xl transition-all h-full order-2 lg:order-1 mt-8 lg:mt-12">
            <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest self-start mb-6 border border-red-100">
              ⚠️ Self-Study Only - No Support
            </div>
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white leading-none">Self-Paced <br/>Fundamentals</h3>
              <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                <BookOpen size={24} />
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-slate-400 mr-1">$</span>
                <span className="text-6xl font-black tracking-tighter text-authority-blue dark:text-white">397</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">Curriculum Access Only</p>
            </div>
            <div className="space-y-6 mb-12 flex-grow">
              <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">What's Included:</p>
              <ul className="space-y-4">
                {[
                  "Ground 0 + Modules 1-6",
                  "46 Video Lessons (~7 hours)",
                  "50+ PDF Checklists",
                  "6 Excel Master Templates",
                  "Lifetime Curriculum Access",
                  "All Future Updates Included"
                ].map((f, i) => (
                  <li key={i} className="flex items-start text-sm font-bold text-text-muted"><CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" /> {f}</li>
                ))}
                {[
                  "NO Web-Based Calculators",
                  "NO Live Coaching Calls",
                  "NO Private Community",
                  "NO Email Support"
                ].map((f, i) => (
                  <li key={i} className="flex items-start text-sm font-bold text-slate-300 dark:text-slate-600"><XCircle className="w-5 h-5 mr-3 text-slate-200 shrink-0" /> {f}</li>
                ))}
              </ul>
            </div>
            <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-border-dark">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Best For:</p>
              <p className="text-[11px] font-bold text-slate-500 italic">"Experienced operators who just need the curriculum, or DIY learners who prefer complete independence."</p>
            </div>
            <button className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all active:scale-95 shadow-xl">Select Fundamentals</button>
          </div>

          {/* TIER 2: IMPLEMENTATION MASTERY - RECOMMENDED */}
          <div className="lg:w-1/3 bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border-4 border-signal-gold flex flex-col relative z-20 shadow-[0_40px_100px_-20px_rgba(212,175,55,0.2)] transform lg:scale-110 order-1 lg:order-2">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-signal-gold text-authority-blue font-black text-[11px] px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl whitespace-nowrap">
              ⭐ Most Popular - 73% Choose This
            </div>
            <div className="flex justify-between items-start mb-8 pt-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white leading-none">Implementation <br/>Mastery</h3>
              <div className="p-3 bg-signal-gold/10 rounded-2xl text-signal-gold">
                <Zap size={24} fill="currentColor" />
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-signal-gold mr-1">$</span>
                <span className="text-7xl font-black tracking-tighter text-authority-blue dark:text-white">797</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-signal-gold mt-2">Curriculum + Group Education</p>
            </div>
            <div className="space-y-6 mb-12 flex-grow">
              <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">Premium Features:</p>
              <ul className="space-y-4">
                <li className="flex items-start text-sm font-black text-authority-blue dark:text-signal-gold"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> EVERYTHING IN TIER 1</li>
                {[
                  "ALL 6 Web-Based Calculators",
                  "12 Weekly Live Coaching Calls",
                  "Jan-March 2026 Cohort Access",
                  "Private Community (Slack)",
                  "Email Support (48hr Response)",
                  "Live Call Recordings 24/7"
                ].map((f, i) => (
                  <li key={i} className="flex items-start text-sm font-bold text-text-primary dark:text-text-dark-muted"><CheckCircle2 className="w-5 h-5 mr-3 text-signal-gold shrink-0" /> {f}</li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
                <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-3">🎁 Founding Bonuses:</p>
                <ul className="space-y-2">
                  <li className="text-[11px] font-bold text-green-800 flex items-center">✨ Audit Readiness Pack ($47)</li>
                  <li className="text-[11px] font-bold text-green-800 flex items-center">✨ CSA Monitoring Guide ($97)</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-border-dark">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Best For:</p>
                <p className="text-[11px] font-bold text-slate-500 italic">"New owner-operators who want implementation support, accountability, and access to professional tools."</p>
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">8 spots remaining</span>
                </div>
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Starts Feb 1, 2026</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-signal-gold text-authority-blue py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl active:scale-95 hover:bg-authority-blue hover:text-white transition-all">Start Implementation →</button>
              <div className="flex justify-center items-center space-x-3 text-[9px] font-black text-text-muted uppercase tracking-widest">
                <span>OR</span>
                <span className="text-authority-blue underline decoration-signal-gold decoration-2">3 PAYMENTS OF $280/MO</span>
              </div>
            </div>
          </div>

          {/* TIER 3: ELITE GUIDED REVIEW */}
          <div className="lg:w-1/3 bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-authority-blue flex flex-col shadow-sm group hover:shadow-xl transition-all h-full order-3 lg:order-3 mt-8 lg:mt-12">
            <div className="bg-authority-blue text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest self-start mb-6 shadow-md">
              🏆 Elite - Personal Attention
            </div>
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-authority-blue dark:text-white leading-none">Elite <br/>Guided Review</h3>
              <div className="p-3 bg-slate-50 dark:bg-gray-800 rounded-2xl text-authority-blue">
                <Scale size={24} />
              </div>
            </div>
            <div className="mb-10">
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-slate-400 mr-1">$</span>
                <span className="text-6xl font-black tracking-tighter text-authority-blue dark:text-white">1,497</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">High-Touch Individual Education</p>
            </div>
            <div className="space-y-6 mb-12 flex-grow">
              <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">Elite Features:</p>
              <ul className="space-y-4">
                <li className="flex items-start text-sm font-black text-authority-blue dark:text-white"><CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue shrink-0" /> EVERYTHING IN TIER 2</li>
                {[
                  "1-on-1 Mock New Entrant Audit",
                  "90-Minute Audit Simulation",
                  "Direct Phone/Text Access",
                  "Priority Email (24hr Response)",
                  "Quarterly 1-on-1 Check-ins",
                  "Personalized Compliance Review"
                ].map((f, i) => (
                  <li key={i} className="flex items-start text-sm font-bold text-text-muted"><CheckCircle2 className="w-5 h-5 mr-3 text-authority-blue shrink-0" /> {f}</li>
                ))}
              </ul>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center">
                  <Clock size={12} className="mr-2" /> Limited to 5 students
                </p>
              </div>
            </div>
            <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-border-dark">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Best For:</p>
              <p className="text-[11px] font-bold text-slate-500 italic">"High-value operators ($150K+ equipment investment) who want personal attention from Vince."</p>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all active:scale-95 shadow-xl">Inquire For Review →</button>
              <div className="flex justify-center items-center space-x-3 text-[9px] font-black text-text-muted uppercase tracking-widest">
                <span>OR</span>
                <span className="text-authority-blue">6 PAYMENTS OF $270/MO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POLICY SECTION */}
      <DecisionWindow />

      {/* 4. COMPARISON SECTION */}
      <ComparisonTable />

      {/* 5. ROI SECTION */}
      <ROISection />

      {/* 6. SOCIAL PROOF */}
      <TestimonialsSection />

      {/* 7. FAQ SECTION */}
      <FAQSection />

      {/* 8. FINAL CTA */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Logo light className="mx-auto mb-12 h-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight mb-8 leading-tight">Build Your Carrier on <br/><span className="text-signal-gold italic">Systems, Not Shortcuts.</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            The road to carrier bankruptcy is paved with shortcuts. We teach you how to build a compliance backbone that stands up to federal scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-signal-gold text-authority-blue px-14 py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] active:scale-95">
              Secure Your Enrollment Today
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
            Accuracy Over Hype. Dedicated to Operational Integrity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnrollPage;