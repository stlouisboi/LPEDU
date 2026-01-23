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
  DollarSign,
  Info,
  Check,
  X,
  Sparkles,
  Calendar,
  MousePointer2,
  Activity,
  // Added Quote icon to resolve "Cannot find name 'Quote'" error on line 320
  Quote
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
              "Structured systems for compliance, insurance continuity, and cash flow",
              "Federally-aligned operating roadmaps and templates"
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
              "Income or audit guarantees"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-base font-bold text-text-muted">
                <XCircle size={20} className="text-red-400 shrink-0 mr-3 mt-0.5" />
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
          What Happens After You Enroll
        </h2>
        <p className="text-xl text-text-muted max-w-3xl mx-auto font-medium leading-relaxed">
          The moment you join, the "guessing game" ends. You transition from uncertainty to a guided implementation sequence built for operational order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-12 z-0"></div>
        {[
          { 
            step: "01", 
            title: "Instant Portal Access", 
            icon: <Zap className="text-signal-gold" />, 
            desc: "Breathe easier knowing the blueprint is in your hands. You'll receive an immediate login to our secure student dashboard where 'Ground 0' and the Phase 1 orientation modules are waiting.",
            relief: "No waiting. Start securing your identity today."
          },
          { 
            step: "02", 
            title: "Guided 90-Day Release", 
            icon: <Calendar className="text-authority-blue" />, 
            desc: "We don't overwhelm you with everything at once. Lessons and tools are released in a proven sequence that matches the 90-day authority containment window.",
            relief: "Focus on one pillar at a time without the noise."
          },
          { 
            step: "03", 
            title: "Live Support Checkpoints", 
            icon: <Users className="text-signal-gold" />, 
            desc: "You'll be plugged into weekly group implementation calls. You aren't building this carrier in isolation. Direct expert access is the standard.",
            relief: "Expert eyes on your compliance backbone."
          }
        ].map((item, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8 border border-border-light dark:border-border-dark group-hover:scale-105 transition-transform duration-500 relative">
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

const EnrollPage = () => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/contact?topic=Enrollment+Inquiry&tier=Master+Implementation');
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-surface-dark/30 text-center border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-authority-blue/10">
            <Award className="w-3.5 h-3.5 text-signal-gold" />
            <span>One Standard. One Price. One System.</span>
          </div>
          <h1 className="text-5xl md:text-[5.5rem] font-black font-serif mb-8 leading-[0.9] text-authority-blue dark:text-white tracking-tighter uppercase">
            Master Your <br/><span className="text-signal-gold italic">Implementation.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted dark:text-text-dark-muted mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
            Stop choosing between partial solutions. We provide the complete technical foundation required to survive the critical first 18 months of federal scrutiny.
          </p>
        </div>
      </section>

      {/* 2. THE SINGLE OFFER SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-surface-dark rounded-[4rem] border-4 border-signal-gold shadow-[0_50px_100px_-20px_rgba(212,175,55,0.2)] overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Product Info */}
            <div className="lg:col-span-7 p-10 md:p-16 space-y-10">
              <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold mb-4">The LaunchPath Standard</h2>
                <h3 className="text-4xl font-black uppercase tracking-tighter text-authority-blue dark:text-white leading-none">Complete 90-Day <br/>Master Implementation</h3>
              </div>

              <div className="space-y-6">
                 <p className="text-lg text-text-muted font-bold leading-relaxed italic">"Everything you need to move from exposure to active, audit-proof protection."</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      "Ground 0mindset verification",
                      "All 6 Core Learning Modules",
                      "46 Professional Video Lessons",
                      "50+ Audit-Ready PDF Templates",
                      "6 Interactive Financial Calculators",
                      "12 Weekly Live Group Calls",
                      "Private Member Community",
                      "Direct Email Implementation Support",
                      "Annual Renewal Trackers",
                      "Lifetime Content Updates"
                    ].map((f, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                        <span className="text-sm font-bold text-text-primary dark:text-text-dark-muted">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-border-dark flex items-center space-x-6">
                 <div className="flex items-center space-x-3">
                    <ShieldCheck size={32} className="text-authority-blue dark:text-signal-gold" />
                    <div className="leading-tight">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Status</p>
                       <p className="text-sm font-black uppercase text-authority-blue dark:text-white">Audit Ready</p>
                    </div>
                 </div>
                 <div className="h-10 w-px bg-slate-200"></div>
                 <div className="flex items-center space-x-3">
                    <Activity size={32} className="text-authority-blue dark:text-signal-gold" />
                    <div className="leading-tight">
                       <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Sync</p>
                       <p className="text-sm font-black uppercase text-authority-blue dark:text-white">Live Updates</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Checkout Sidebar */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-gray-900/50 p-10 md:p-16 flex flex-col justify-center border-l border-slate-100 dark:border-border-dark">
               <div className="mb-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">Total Investment</p>
                  <div className="flex items-baseline">
                     <span className="text-3xl font-black text-signal-gold mr-1">$</span>
                     <span className="text-[5.5rem] font-black tracking-tighter text-authority-blue dark:text-white leading-none">797</span>
                  </div>
                  <p className="text-sm font-bold text-text-muted mt-2">One-time payment. No recurring fees.</p>
               </div>

               <div className="space-y-6">
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-signal-gold text-authority-blue py-7 rounded-2xl font-black uppercase tracking-[0.25em] text-sm shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:bg-authority-blue hover:text-white transition-all active:scale-95 flex items-center justify-center group"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl flex items-start space-x-3">
                     <Info size={14} className="text-authority-blue mt-0.5" />
                     <p className="text-[10px] font-bold text-text-muted uppercase leading-relaxed">
                        Secure checkout via Stripe. Immediate portal credentials issued upon successful transaction.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POLICY SECTION */}
      <DecisionWindow />

      {/* 4. AFTER ENROLLMENT */}
      <AfterEnrollment />

      {/* 5. ROI & TESTIMONIALS (Consolidated) */}
      <section className="py-24 bg-white dark:bg-surface-dark border-y border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-3xl md:text-[3.5rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-8 leading-none">Cheaper Than <br/>A Failed Audit.</h2>
                 <p className="text-xl text-text-muted font-medium mb-10 leading-relaxed">
                   The average cost of a carrier's first-year failure exceeds $50,000 in lost down payments and accumulated debt. LaunchPath is a $797 insurance policy for your business continuity.
                 </p>
                 <div className="space-y-4">
                    {[
                      { t: "Avoid Insurance Cancellations", d: "Save up to $30k/yr in non-renewal premiums." },
                      { t: "Pass New Entrant Audits", d: "Zero fines and protected operating authority." },
                      { t: "Master Cash Flow Oxygen", d: "Maintain solvency during 60-day payment cycles." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start space-x-4 p-5 bg-slate-50 dark:bg-gray-800 rounded-3xl border border-slate-100 dark:border-border-dark">
                        <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                        <div>
                          <p className="font-black uppercase tracking-tight text-authority-blue dark:text-white">{item.t}</p>
                          <p className="text-sm text-text-muted font-bold mt-1">{item.d}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-authority-blue p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                 <Quote className="text-signal-gold/20 absolute top-10 right-10" size={80} />
                 <div className="relative z-10 space-y-10">
                    <p className="text-2xl font-medium italic leading-relaxed">
                      "LaunchPath isn't a course you watch; it's a system you implement. By the time my audit letter arrived, I wasn't nervous. I just sent them the files we built in Module 3. Passed with zero findings."
                    </p>
                    <div className="flex items-center space-x-4">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden">
                          <img src="https://picsum.photos/seed/trucker/80/80" alt="Student" className="grayscale" />
                       </div>
                       <div>
                          <p className="font-black uppercase tracking-widest text-sm">Marcus T., Texas</p>
                          <p className="text-[10px] font-bold text-signal-gold uppercase tracking-[0.2em]">6-Month Authority Owner</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. SCOPE CLARITY */}
      <ScopeClarity />

      {/* 7. FINAL CTA */}
      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Logo light className="mx-auto mb-12 h-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default" />
          <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight mb-8 leading-tight">Secure Your Authority. <br/><span className="text-signal-gold italic text-white/90">Build Your Legacy.</span></h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            There is only one path to professional operating integrity. Join the carriers who build on systems, not shortcuts.
          </p>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="bg-signal-gold text-authority-blue px-14 py-7 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] active:scale-95"
          >
            Start Your Master Implementation
          </button>
        </div>
      </section>

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