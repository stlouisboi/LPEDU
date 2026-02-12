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
  ChevronUp,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import DeadlySinsGrid from '../components/DeadlySinsGrid';
import FAQSection from '../components/FAQSection';
import AIChatWidget from '../components/AIChatWidget';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'syncing' | 'complete'>('idle');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.title = "LaunchPath | 90-Day Owner-Operator Survival System";
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    
    for (let i = 0; i < scanSteps.length; i++) {
      setScanLog(prev => [...prev, scanSteps[i]]);
      await new Promise(r => setTimeout(r, 600));
    }

    setScanState('syncing');
    setScanLog(prev => [...prev, "UPLINKING_TO_INSTITUTIONAL_REGISTRY..."]);
    
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-hero-risk-map"
        });
      }
      
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
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

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
      
      {/* 1. HERO SECTION (THE DECLARATION) */}
      <section className="relative min-h-screen flex items-center border-b border-white/5 px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          
          <div className="lg:col-span-7 space-y-12 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="relative z-10 space-y-8 md:space-y-12">
              <div className="flex flex-wrap gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 flex items-center"><ShieldCheck size={12} className="mr-2 text-signal-gold" /> VETERAN OPERATED</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70 flex items-center"><Award size={12} className="mr-2 text-signal-gold" /> SAFETY CERTIFIED</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-none mb-6 sm:mb-8 animate-reveal-up">
                I'VE WATCHED THIS <br/>FAIL <span className="text-signal-gold italic">200 TIMES.</span>
              </h1>
              <div className="space-y-6 animate-reveal-up [animation-delay:200ms]">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl font-medium">
                  A compliance-first operating system for new motor carriers who treat their authority as institutional infrastructure.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl border-l-8 border-signal-gold pl-8 py-2">
                  Most new carriers establish compliance within the first 90 days — or inherit consequences for 18 months.
                </p>
              </div>
              <div className="pt-4 animate-reveal-up [animation-delay:400ms]">
                <Link 
                  to="/reach-test" 
                  className="inline-flex items-center space-x-3 border-2 border-signal-gold text-signal-gold px-10 py-5 rounded-xl font-black uppercase tracking-widest text-base md:text-lg hover:bg-signal-gold hover:text-primary-dark transition-all shadow-2xl active:scale-95 group"
                >
                  <span>VERIFY READINESS DIAGNOSTIC</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-full sm:max-w-md lg:max-w-lg relative overflow-hidden group">
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
                      <label className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/60 ml-2">LEGAL ENTITY NAME</label>
                      <input 
                        required 
                        value={formData.firstName} 
                        onChange={e => setFormData({...formData, firstName: e.target.value})} 
                        placeholder="CARRIER_NAME_HERE" 
                        className="w-full bg-black/40 border border-signal-gold/20 px-6 py-5 rounded-2xl font-mono font-bold text-sm outline-none focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 transition-all placeholder:text-white/10" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/60 ml-2">REGISTRY EMAIL</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        placeholder="OPERATOR@CARRIER.COM" 
                        className="w-full bg-black/40 border border-signal-gold/20 px-6 py-5 rounded-2xl font-mono font-bold text-sm outline-none focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/10 transition-all placeholder:text-white/10" 
                      />
                    </div>
                    <button type="submit" disabled={loading} className="w-full relative bg-signal-gold text-white py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-white hover:text-authority-blue transition-all overflow-hidden group/btn border-b-4 border-[#8e7340] disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin mr-2" size={16} />
                            PROCESSING...
                          </>
                        ) : (
                          <>
                            GENERATE DIAGNOSTIC <ChevronRight size={16} className="ml-2" />
                          </>
                        )}
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

      {/* 2. EXECUTIVE TARGET DECLARATION (THE LAW) */}
      <section className="bg-[#020617] py-16 md:py-32 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Shield className="text-signal-gold" size={28} />
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-signal-gold font-serif">
              CARRIER EXECUTIVE. NOT HUSTLER.
            </h2>
          </div>
          <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-bold">
            LaunchPath is built for operators who treat their authority as a governed asset, not a revenue experiment. If you view compliance as overhead instead of infrastructure, this system will not serve you.
          </p>
          <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-bold mt-8">
            Entry requires peer-level participation inside a sequenced, audit-verified operating framework. Enrollment is not a transaction. It is authorization to access institutional-grade carrier governance.
          </p>
        </div>
      </section>

      {/* 3. FOUNDER'S BRIEF (THE DOCTRINE) */}
      <section className="bg-primary-dark py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 lg:col-span-3">
            <img
              src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png"
              alt="Vince Lawrence, Founder of LaunchPath"
              className="rounded-full w-48 h-48 md:w-full md:h-auto object-cover mx-auto border-4 border-signal-gold/50 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="md:col-span-8 lg:col-span-9 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-signal-gold mb-8">
              A WORD FROM THE FOUNDER.
            </h2>

            <blockquote className="text-lg md:text-xl text-white/70 leading-relaxed font-medium space-y-6 border-l-4 border-signal-gold/30 pl-8">
              <p>I’ve watched hundreds of carriers collapse. Not from a lack of effort — from structural weakness.</p>
              <p>The industry hands you the keys to a truck, but not the blueprints to a governed operation. That omission creates exposure under scrutiny.</p>
              <p>LaunchPath was not built to be another training product. It was architected as the missing institutional layer — an operating system that installs order, documentation integrity, and verification so your authority is built to last.</p>
            </blockquote>

            <p className="text-right text-white/50 font-serif italic mt-8 pr-8">— Vince Lawrence, Founder</p>
          </div>
        </div>
      </section>

      {/* 4. THE SYSTEM (FOUR PILLARS + INTERDEPENDENCE) */}
      <section className="py-32 px-10 md:px-20 lg:px-40 bg-white dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto space-y-24">
          <header className="text-center space-y-6 animate-reveal-up">
            <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.5em]">SYSTEM ARCHITECTURE</p>
            <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">
              THE <span className="text-signal-gold italic">FOUR</span> PILLARS.
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-bold max-w-2xl mx-auto leading-relaxed">
              Institutional logic: A failure in the Compliance Backbone results in a loss of Insurance Continuity, which suffocates Cash-Flow Oxygen.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Authority Protection", icon: <Scale />, desc: "The legal right to operate and the asset at the center of the structure." },
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

      <section className="bg-signal-gold py-16 md:py-32 px-6 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary-dark mb-12 font-serif">
            THE INTERDEPENDENCE LOGIC.
          </h2>
          <p className="text-xl md:text-2xl text-primary-dark leading-relaxed font-black mb-8">
            The Four Pillars are not independent modules. They are a causal chain.
          </p>
          <p className="text-xl md:text-2xl text-primary-dark leading-relaxed font-bold mb-8">
            Compliance failure triggers underwriting isolation. Underwriting isolation triggers insurance lapse. Insurance lapse triggers authority revocation. Authority revocation triggers operational collapse.
          </p>
          
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-primary-dark">
            <span className="font-black text-xl tracking-tighter">COMPLIANCE</span>
            <ArrowRight size={32} className="hidden md:block opacity-30" />
            <ChevronDown size={32} className="md:hidden opacity-30" />
            <span className="font-black text-xl tracking-tighter">INSURANCE</span>
            <ArrowRight size={32} className="hidden md:block opacity-30" />
            <ChevronDown size={32} className="md:hidden opacity-30" />
            <span className="font-black text-xl tracking-tighter">CASH FLOW</span>
            <ArrowRight size={32} className="hidden md:block opacity-30" />
            <ChevronDown size={32} className="md:hidden opacity-30" />
            <span className="font-black text-xl tracking-tighter">AUTHORITY</span>
          </div>
        </div>
      </section>

      {/* 5. THE UNIFIED DOSSIER (THE PROOF) */}
      <section className="bg-[#FAF9F6] dark:bg-[#0F172A] py-20 md:py-48 px-6 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-primary-dark dark:text-white mb-10 font-serif leading-none">
            THE UNIFIED DOSSIER.
          </h2>
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold mb-16 leading-relaxed uppercase tracking-tight">
            Authority Protection, Insurance Continuity, and Compliance Backbone collapse into a single governed file.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-10">
              <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                LaunchPath installs a Unified, Audit-Ready Dossier — a sequenced, verification-backed infrastructure file that governs:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {[
                  'Driver Qualification Files (DQF) with federal sequencing',
                  'Substance Governance Program (Drug & Alcohol Consortium enrollment)',
                  'Hours of Service Compliance Architecture',
                  'Maintenance & Inspection Documentation Protocol',
                  'Insurance Continuity & Underwriting Verification',
                  'Authority Registration & Biennial Update Tracking'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-5 group">
                    <CheckCircle className="text-signal-gold flex-shrink-0 mt-1 shadow-2xl" size={28} />
                    <span className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-black uppercase tracking-tight leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-xl md:text-3xl text-slate-900 dark:text-white leading-relaxed mt-12 font-black border-l-8 border-signal-gold pl-10 py-4 uppercase tracking-tighter">
                This is not content. This is documentation integrity. This is what survives an audit.
              </p>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center">
               <div className="w-full aspect-[4/5] bg-[#020617] rounded-[4rem] border-[12px] border-white/5 shadow-2xl p-12 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><FileText size={200}/></div>
                  <div className="space-y-6 relative z-10">
                    <div className="w-16 h-16 bg-signal-gold rounded-2xl flex items-center justify-center text-primary-dark shadow-xl"><Lock size={32}/></div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none font-serif">REGISTRY ARCHIVE v4.5</h4>
                    <div className="space-y-4">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-signal-gold mb-2">Institutional Guard</p>
                    <p className="text-xs text-white/40 uppercase font-bold tracking-widest leading-relaxed">Systematic verification of refuge before operational dispatch.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE JUDGMENT (16 DEADLY SINS + REACH BRIDGE) */}
      <DeadlySinsGrid />
      
      <section className="bg-primary-dark py-24 md:py-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/[0.02] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 animate-reveal-up">
          <div className="w-24 h-24 bg-red-600/10 rounded-[2.5rem] border border-red-600/30 flex items-center justify-center mx-auto mb-10 shadow-2xl">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-signal-gold font-serif leading-none">
            LOCATE YOUR <br/><span className="text-white italic">EXPOSURE.</span>
          </h2>
          <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-bold max-w-2xl mx-auto">
            The REACH Test™ is a diagnostic clearance protocol that maps your current compliance posture against the 16 terminal failure vectors.
          </p>
          <div className="pt-10">
            <Link 
              to="/reach-test" 
              className="inline-flex items-center space-x-6 border-4 border-signal-gold text-signal-gold px-12 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm md:text-lg hover:bg-signal-gold hover:text-primary-dark transition-all shadow-[0_30px_60px_rgba(198,146,42,0.3)] active:scale-95 group"
            >
              <span>VERIFY READINESS DIAGNOSTIC</span>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. ADMISSION SEQUENCE (THE PATH) */}
      <section className="bg-[#FAF9F6] dark:bg-[#020617] py-20 md:py-48 px-6 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-primary-dark dark:text-white mb-12 text-center font-serif leading-none">
            ADMISSION <span className="text-signal-gold italic">SEQUENCE.</span>
          </h2>
          <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold mb-24 text-center leading-relaxed uppercase tracking-tight">
            LaunchPath operates on a governed entry protocol. There is no instant access.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-signal-gold text-primary-dark rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-b-8 border-slate-900">
                <span className="text-3xl font-black font-serif">1</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase text-primary-dark dark:text-white tracking-tight leading-none font-serif">
                  DIAGNOSTIC & <br/>EXPOSURE CONFIRMATION
                </h3>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                  Complete the REACH Test™ to map your compliance posture and identify terminal exposure vectors.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-signal-gold text-primary-dark rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-b-8 border-slate-900">
                <span className="text-3xl font-black font-serif">2</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase text-primary-dark dark:text-white tracking-tight leading-none font-serif">
                  ADMISSION & <br/>AUTHORIZATION REVIEW
                </h3>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                  Submit your diagnostic results for admission review. Authorization is granted based on operational readiness, not payment.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 group">
              <div className="w-20 h-20 bg-signal-gold text-primary-dark rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-b-8 border-slate-900">
                <span className="text-3xl font-black font-serif">3</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase text-primary-dark dark:text-white tracking-tight leading-none font-serif">
                  GUIDED SYSTEM <br/>INSTALLATION BEGINS
                </h3>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                  Upon authorization, you receive access to the Unified Dossier framework and begin sequenced implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE MATH OF SURVIVAL (THE TOOLS) */}
      <section className="py-48 px-10 md:px-20 bg-signal-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
          <div className="space-y-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center text-[#002244] opacity-70"><Target size={14} className="mr-2" /> FISCAL STABILIZATION</p>
            <h2 className="text-6xl md:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85] text-[#002244]">THE MATH <br/>OF <span className="italic">SURVIVAL.</span></h2>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight max-w-xl text-[#002244]">
               Monthly operating costs per truck range from <span className="underline decoration-[#002244] decoration-8 underline-offset-8">$10,300 – $18,800.</span> 
            </p>
            <div className="pt-10">
               <Link to="/tools/tco-calculator" className="relative overflow-hidden bg-[#002244] text-white px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center w-fit border-b-8 border-black group">
                 <span className="relative z-10 flex items-center">
                   Launch TCO Economic Engine <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                 </span>
               </Link>
            </div>
          </div>
          <div>
             <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-6"><Calculator size={140} /></div>
                <div className="space-y-10 relative z-10">
                   <h4 className="text-xl font-black font-serif uppercase tracking-tight text-signal-gold italic">Economic Terminal v4.0</h4>
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

      {/* 9. FAQ (THE CLARIFICATION) */}
      <FAQSection />

      {/* 10. THE EXECUTIVE STANDARD (THE INVITATION) */}
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

        <div className="mt-32 text-center">
          <Link 
            to="/reach-test" 
            className="inline-flex items-center space-x-6 border-4 border-authority-blue text-authority-blue px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm md:text-lg hover:bg-authority-blue hover:text-white transition-all shadow-2xl active:scale-95 group"
          >
            <span>INITIATE ADMISSION DIAGNOSTIC</span>
            <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <AIChatWidget />

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
