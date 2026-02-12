import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield,
  ChevronRight,
  Calculator,
  Zap,
  Activity,
  ShieldAlert,
  ChevronDown,
  Award,
  ShieldX,
  FileWarning,
  HardDrive,
  Fingerprint,
  Gavel,
  Terminal,
  FileSearch,
  ClipboardCheck,
  UserCheck,
  BarChart3,
  Target,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Lock,
  Search,
  MessageCircle,
  HelpCircle,
  Loader2,
  Truck,
  Scale,
  ChevronUp
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import DeadlySinsGrid from '../components/DeadlySinsGrid';
import FAQSection from '../components/FAQSection';
import AIChatWidget from '../components/AIChatWidget';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.title = "LaunchPath | 90-Day Owner-Operator Survival System";
    
    // Set Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', '90-day owner-operator survival system. Protect your authority with audit-ready compliance infrastructure. Veteran-operated, OSHA-certified safety training.');

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-signal-gold/30">
      
      {/* 1. HERO SECTION - REWRITTEN TO MATCH SCREENSHOT */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-authority-blue text-white px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto space-y-16 animate-reveal-up relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-serif uppercase tracking-tight leading-[0.9]">
            BUILD YOUR <br/>
            CARRIER LIKE <br/>
            A <br/>
            <span className="text-signal-gold italic">CARRIER EXECUTIVE.</span>
          </h1>

          <div className="flex flex-col items-center space-y-8">
            <div className="h-1.5 w-32 bg-signal-gold rounded-full"></div>
            <p className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase tracking-tight max-w-4xl opacity-80 leading-relaxed">
              "ORDER PRECEDES REVENUE. DISCIPLINE PRECEDES EXPANSION. WISDOM PRECEDES THE RICHES."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link 
              to="/reach-test" 
              className="w-full sm:w-auto bg-signal-gold text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white transition-all active:scale-95 border-b-8 border-[#8e7340]"
            >
              TAKE THE REACH TEST™
            </Link>
            <Link 
              to="/pricing" 
              className="w-full sm:w-auto border-2 border-white/20 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
            >
              ADMISSION PROTOCOL
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS INTERDEPENDENCE */}
      <section className="py-32 px-10 md:px-20 lg:px-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto space-y-24">
          <header className="text-center space-y-6 animate-reveal-up">
            <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.5em]">SYSTEM ARCHITECTURE</p>
            <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">
              THE <span className="text-signal-gold italic">FOUR</span> PILLARS.
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
              Institutional logic: A failure in the Compliance Backbone (Documentation) results in a loss of Insurance Continuity, which suffocates Cash-Flow Oxygen.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Authority Protection", icon: <Scale />, desc: "The legal right to operate and the center of the structure." },
              { title: "Insurance Continuity", icon: <ShieldCheck />, desc: "The financial shield required to move freight and protect assets." },
              { title: "Compliance Backbone", icon: <FileText />, desc: "The documentary evidence of safety required to satisfy federal investigators." },
              { title: "Cash-Flow Oxygen", icon: <Zap />, desc: "The capital required to keep the other three pillars alive." }
            ].map((pillar, i) => (
              <div key={i} className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center space-y-6 hover:shadow-2xl transition-all duration-700">
                <div className="w-16 h-16 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg">{pillar.icon}</div>
                <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight leading-tight">{pillar.title}</h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE MATH OF SURVIVAL */}
      <section className="py-48 px-10 md:px-20 bg-signal-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
          <div className="space-y-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center text-[#002244] opacity-70"><Target size={14} className="mr-2" /> FISCAL STABILIZATION</p>
            <h2 className="text-6xl md:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85] text-[#002244]">THE MATH <br/>OF <span className="italic">SURVIVAL.</span></h2>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight max-w-xl text-[#002244]">
               Monthly operating costs per truck range from <span className="underline decoration-[#002244] decoration-8 underline-offset-8">$10,300 – $18,800.</span> 
            </p>
            <p className="text-lg text-[#002244] font-bold opacity-80 max-w-lg">
              Operating on intuition is the primary cause of carrier collapse. Secure your margins with clinical math.
            </p>
            <div className="pt-10">
               <Link to="/tools/tco-calculator" className="relative overflow-hidden bg-[#002244] text-white px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center w-fit border-b-8 border-black group">
                 <span className="relative z-10 flex items-center">
                   Calculate Your Survival Math <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </span>
               </Link>
            </div>
          </div>
          <div>
             <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-6"><Calculator size={140} /></div>
                <div className="space-y-10 relative z-10">
                   <h4 className="text-xl font-black font-serif uppercase tracking-tight text-signal-gold italic">TCO Engine v4.0</h4>
                   <div className="space-y-6">
                      <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Fixed Cost</span>
                        <span className="text-2xl font-black">$4,200/mo</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-4">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Variable CPM</span>
                        <span className="text-2xl font-black">$0.98/mi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[11px] font-black text-signal-gold uppercase tracking-widest">Break-Even RPM</span>
                        <span className="text-2xl font-black text-signal-gold">$1.84/mi</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. THE 16 DEADLY SINS MATRIX GRID */}
      <DeadlySinsGrid />
      
      <div className="flex justify-center bg-[#020617] pb-32">
        <Link to="/exposure-matrix" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-white transition-all group">
            Analyze Complete Exposure Matrix <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      {/* 5. THE EXECUTIVE STANDARD */}
      <section className="py-48 px-10 md:px-20 bg-[#FAF9F6] dark:bg-surface-dark">
        <header className="text-center mb-32 space-y-6">
          <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.5em]">THE OUTCOME</p>
          <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">THE <span className="text-signal-gold italic">EXECUTIVE</span> STANDARD.</h2>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto uppercase">The transformation from a driver with a dream to a carrier with infrastructure.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { letter: "D", title: "Audit-Ready Infrastructure", desc: "Establish a documentation standard where federal auditors find zero \"Reach Test\" hazards." },
             { letter: "A", title: "Preferred Risk Profile", desc: "Build a safety-first operational structure that underwriters value." },
             { letter: "F", title: "Financial Stability", desc: "Deploy systems that maximize operating margins and preserve cash-flow oxygen." }
           ].map((item, i) => (
             <div key={i} className="bg-white dark:bg-primary-dark p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-2xl text-signal-gold">{item.letter}</div>
                <div className="space-y-4">
                  <h4 className="text-xl font-black text-[#002244] dark:text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* AIChatWidget - Fixed and visible on all platforms for immediate advisor access */}
      <AIChatWidget />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 bg-signal-gold text-[#002244] p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 border-4 border-white/20 animate-in fade-in zoom-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <div className="bg-[#020617] text-center py-10">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
          CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
        </p>
      </div>
    </div>
  );
};

export default HomePage;