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
  Scale
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import DeadlySinsGrid from '../components/DeadlySinsGrid';

const FAQItem: React.FC<{ 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void 
}> = ({ question, answer, isOpen, onClick }) => {
  return (
    <article className={`border-b transition-all duration-300 ${isOpen ? 'bg-white/5 border-signal-gold/30' : 'border-white/10'}`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-8 px-6 text-left focus:outline-none group"
      >
        <span className={`text-lg sm:text-xl font-black tracking-tight uppercase transition-colors ${isOpen ? 'text-signal-gold' : 'text-white/70'}`}>
          {question}
        </span>
        <div className={`transition-all duration-500 ${isOpen ? 'rotate-45 text-signal-gold' : 'text-white/20'}`}>
          <Plus size={24} />
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-8 text-slate-400 font-medium leading-relaxed">
            <p className="text-base sm:text-lg whitespace-pre-wrap">{answer}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

const Plus = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'syncing' | 'complete'>('idle');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    document.title = "LaunchPath | 90-Day Owner-Operator Survival System";
  }, []);

  const scanSteps = [
    "INITIALIZING_NEURAL_UPLINK...",
    "MAPPING_EXPOSURE_VECTORS...",
    "CROSS_REFERENCING_49_CFR_PART_382...",
    "IDENTIFYING_AUTHORITY_GAP_PATTERNS...",
    "SEQUENCING_90_DAY_REMEDIATION...",
    "ESTABLISHING_CRM_HANDSHAKE..."
  ];

  const handleRiskMapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setScanState('scanning');
    
    // Phase 1: Visual Diagnostic Scan
    for (let i = 0; i < scanSteps.length; i++) {
      setScanLog(prev => [...prev, scanSteps[i]]);
      await new Promise(r => setTimeout(r, 600));
    }

    setScanState('syncing');
    setScanLog(prev => [...prev, "UPLINKING_TO_INSTITUTIONAL_REGISTRY..."]);
    
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      // Phase 2: Registry Handshake (Firebase)
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-hero-risk-map"
        });
      }
      
      // Phase 3: CRM Synchronization (MailerLite)
      await syncToMailerLite({ 
        email: formData.email, 
        fields: { 
          name: formData.firstName,
          source: 'homepage-risk-map'
        } 
      });

      setScanLog(prev => [...prev, "SYNCHRONIZATION_COMPLETE."]);
      await new Promise(r => setTimeout(r, 800));
      setScanState('complete');
      navigate(destination);
    } catch (err) {
      console.error("Registry Sync Fault:", err);
      // Graceful fallback: navigate even if sync fails to preserve user journey
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: "What if my insurance quote is higher than expected?", a: "Insurance is a fixed economic reality. We help you build a risk profile that underwriters value, even if initial costs are high." },
    { q: "Does LaunchPath guarantee I will pass an audit?", a: "No system can guarantee results. We provide the infrastructure and implementation requirements used by the nation's most compliant carriers." },
    { q: "How long does authority activation take?", a: "The mandatory protest period is 10 days, with typical processing totaling 21 days. We use this window for system initialization." }
  ];

  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-signal-gold/30">
      <style>{`
        @keyframes truck-drive {
          0% { transform: translateX(-5px) translateY(0px); }
          25% { transform: translateX(5px) translateY(-1px); }
          50% { transform: translateX(-5px) translateY(1px); }
          75% { transform: translateX(5px) translateY(-1px); }
          100% { transform: translateX(-5px) translateY(0px); }
        }
        .animate-truck-drive {
          animation: truck-drive 3s ease-in-out infinite;
        }
      `}</style>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center border-b border-white/5 py-20">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-7 space-y-12 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="relative z-10 space-y-8 md:space-y-12">
              <div className="flex flex-wrap gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center"><ShieldCheck size={12} className="mr-2 text-signal-gold" /> VETERAN OPERATED</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center"><Award size={12} className="mr-2 text-signal-gold" /> SAFETY CERTIFIED</span>
              </div>
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black font-serif uppercase tracking-tighter leading-[0.85] animate-reveal-up">
                PROTECT <br/>YOUR <br/><span className="text-signal-gold">AUTHORITY</span> <br/>WITH ORDER.
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-bold max-w-xl border-l-8 border-signal-gold pl-8 py-2 animate-reveal-up [animation-delay:200ms]">
                Most new carriers establish compliance within the first 90 days — or inherit consequences for 18 months.
              </p>
              <div className="pt-4 animate-reveal-up [animation-delay:400ms]">
                <Link 
                  to="/reach-test" 
                  className="group relative bg-signal-gold text-white px-14 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-[0_20px_50px_rgba(198,146,42,0.3)] hover:shadow-[0_30px_70px_rgba(198,146,42,0.4)] hover:scale-[1.03] active:scale-0.98 transition-all duration-500 flex items-center w-fit border-b-[10px] border-slate-900 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Verify Admission Readiness <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] translate-x-[-200%] group-hover:animate-shine pointer-events-none"></div>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="bg-[#0D1B2A] p-8 md:p-12 rounded-[3rem] shadow-2xl border border-signal-gold/40 w-full max-w-lg relative overflow-hidden group">
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none"></div>
              <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <Truck size={48} className="text-signal-gold animate-truck-drive" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black font-serif uppercase text-white leading-tight">90 DAY</h3>
                    <h3 className="text-3xl font-black font-serif uppercase text-signal-gold italic leading-none">RISK MAP™</h3>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 transition-transform duration-700 group-hover:rotate-12">
                    <Truck size={28} className="text-signal-gold" />
                  </div>
                </div>
                
                {scanState === 'idle' ? (
                  <form onSubmit={handleRiskMapSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/40 ml-2">LEGAL ENTITY NA</label>
                      <input 
                        required 
                        value={formData.firstName} 
                        onChange={e => setFormData({...formData, firstName: e.target.value})} 
                        placeholder="CARRIER_NAME_HERE" 
                        className="w-full bg-black/40 border border-signal-gold/20 px-6 py-5 rounded-2xl font-mono font-bold text-sm outline-none focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 transition-all placeholder:text-white/10" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/40 ml-2">REGISTRY EMAIL</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        placeholder="OPERATOR@CARRIER.COM" 
                        className="w-full bg-black/40 border border-signal-gold/20 px-6 py-5 rounded-2xl font-mono font-bold text-sm outline-none focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 transition-all placeholder:text-white/10" 
                      />
                    </div>
                    <button type="submit" className="w-full relative bg-signal-gold text-white py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-white hover:text-authority-blue transition-all overflow-hidden group/btn border-b-4 border-[#8e7340]">
                      <span className="relative z-10 flex items-center justify-center">
                        GENERATE DIAGNOSTIC <ChevronRight size={16} className="ml-2" />
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="py-10 space-y-6">
                    <div className="flex justify-center relative">
                      <Loader2 className="animate-spin text-signal-gold relative z-10" size={48} />
                    </div>
                    <div className="bg-black/60 rounded-2xl p-6 font-mono text-[10px] text-emerald-500 h-40 overflow-hidden shadow-inner border border-white/5">
                      {scanLog.map((log, i) => <div key={i} className="mb-1">&gt; {log}</div>)}
                      <div className="animate-pulse">_</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS INTERDEPENDENCE */}
      <section className="py-32 px-10 md:px-20 lg:px-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto space-y-24">
          <header className="text-center space-y-6 animate-reveal-up">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">SYSTEM ARCHITECTURE</p>
            <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">
              THE <span className="text-signal-gold italic">FOUR</span> PILLARS.
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
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
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
          <div className="lg:col-span-7 space-y-10">
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
          <div className="lg:col-span-5">
             <div className="bg-[#002244] p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
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
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">THE OUTCOME</p>
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

      {/* 6. FAQ SECTION */}
      <section className="py-48 px-10 md:px-20 lg:px-40 bg-[#020617]">
        <header className="text-center mb-32 space-y-6">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">KNOWLEDGE BASE</p>
          <h2 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tighter text-white">COMMON <br/><span className="text-signal-gold italic">QUESTIONS.</span></h2>
        </header>

        <div className="max-w-4xl mx-auto divide-y divide-white/5 border-y border-white/5">
           {faqs.map((faq, i) => (
             <FAQItem 
               key={i} 
               question={faq.q} 
               answer={faq.a} 
               isOpen={openFaqIndex === i} 
               onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} 
             />
           ))}
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-48 px-10 md:px-20 lg:px-40 text-center bg-[#002244] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 space-y-16">
           <h2 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tight text-white leading-none">BUILD YOUR CARRIER LIKE A <br/><span className="text-signal-gold italic">CARRIER EXECUTIVE.</span></h2>
           <div className="h-2 w-48 bg-signal-gold mx-auto rounded-full"></div>
           <p className="text-2xl md:text-4xl font-black text-white/50 max-w-4xl mx-auto uppercase tracking-tighter italic">"Order precedes revenue. Discipline precedes expansion. Wisdom precedes the riches."</p>
           <div className="flex flex-col sm:flex-row gap-8 justify-center pt-10">
              <Link 
                to="/reach-test" 
                className="relative overflow-hidden bg-signal-gold text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-white hover:text-authority-blue transition-all active:scale-95 border-b-8 border-slate-900 group"
              >
                <span className="relative z-10">Take the REACH Test™</span>
              </Link>
              <Link to="/pricing" className="bg-white/5 border-2 border-white/20 text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white/10 transition-all flex items-center justify-center">Admission Protocol</Link>
           </div>
        </div>
      </section>

      <div className="bg-[#020617] text-center py-10">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
          CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
        </p>
      </div>
    </div>
  );
};

export default HomePage;