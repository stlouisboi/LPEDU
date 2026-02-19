
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
  Target,
  FileText,
  ShieldCheck,
  CheckCircle,
  TrendingDown,
  Loader2,
  Truck,
  Scale,
  ChevronUp,
  Lock,
  Terminal,
  Cpu,
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  Gavel,
  Database,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Anchor
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import DeadlySinsGrid from '../components/DeadlySinsGrid';
import FAQSection from '../components/FAQSection';

const TechnicalPattern = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '120px 120px' }}></div>
  </div>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'syncing' | 'complete'>('idle');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // --- TCO ANALYZER ANIMATION STATE ---
  const [metrics, setMetrics] = useState({ cpm: '1.92', rpm: '2.45' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [chartHeights, setChartHeights] = useState([40, 60, 30, 80, 50, 90, 45, 75, 55, 85]);
  const [terminalPhase, setTerminalPhase] = useState<'STANDBY' | 'INBOUND' | 'CALCULATING'>('STANDBY');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    document.title = "LaunchPath | Institutional Governance for Motor Carriers";
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Blinking cursor effect for terminal feel
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    // Advanced Economic Ticker Loop
    const tickerInterval = setInterval(() => {
      setTerminalPhase('INBOUND');
      setIsUpdating(true);
      
      let step = 0;
      const flicker = setInterval(() => {
        // Fast-moving data synthesis simulation
        setMetrics({
          cpm: (1.4 + Math.random() * 1.5).toFixed(2),
          rpm: (1.9 + Math.random() * 2.2).toFixed(2)
        });
        // Dynamic jitter for visual interest
        setChartHeights(prev => prev.map(() => Math.floor(Math.random() * 70) + 20));
        
        step++;
        if (step === 6) setTerminalPhase('CALCULATING');

        if (step > 12) {
          clearInterval(flicker);
          // Settle on clean standard metrics
          setMetrics({
            cpm: (1.85 + Math.random() * 0.1).toFixed(2),
            rpm: (2.35 + Math.random() * 0.2).toFixed(2)
          });
          setIsUpdating(false);
          setTerminalPhase('STANDBY');
        }
      }, 90); 

    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(tickerInterval);
      clearInterval(cursorInterval);
    };
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
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-signal-gold/30 break-words">
      
      {/* 1. THE DECLARATION: HERO SECTION */}
      <section className="relative min-h-screen flex items-center border-b border-white/5 px-4 sm:px-6 pt-32 pb-24 lg:py-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/40 via-primary-dark to-primary-dark"></div>
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-signal-gold/10 blur-[150px] rounded-full animate-pulse"></div>
          <TechnicalPattern />
        </div>

        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center relative z-10">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8 md:space-y-12">
              <div className="flex flex-wrap gap-4 animate-reveal-up justify-center lg:justify-start">
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/70 flex items-center backdrop-blur-md">
                  <ShieldCheck size={12} className="mr-2 text-signal-gold" /> VETERAN OPERATED
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/70 flex items-center backdrop-blur-md">
                  <Award size={12} className="mr-2 text-signal-gold" /> SAFETY CERTIFIED
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85] mb-6 animate-reveal-up text-center lg:text-left">
                90-DAY <br/>COMPLIANCE SYSTEM <br/>FOR <span className="text-signal-gold italic">NEW MOTOR CARRIERS.</span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-signal-gold font-bold leading-tight animate-reveal-up [animation-delay:100ms] text-center lg:text-left">
                Install the safety, documentation, and governance needed to keep your new FMCSA authority legal, insurable, and alive.
              </p>

              <div className="space-y-8 animate-reveal-up [animation-delay:200ms]">
                <p className="text-[22px] sm:text-2xl md:text-3xl text-white/70 leading-relaxed max-w-2xl font-medium text-center lg:text-left mx-auto lg:mx-0">
                  LaunchPath is not a "make money in trucking" course. It's a structured compliance system designed to protect your authority in the first 90 days — before small mistakes turn into big problems.
                </p>
                <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl font-medium text-center lg:text-left mx-auto lg:mx-0">
                  Most new carriers don't fail because they can't drive. They fail because their paperwork, insurance, or systems weren't built strong enough.
                </p>
                <div className="flex items-center space-x-6 justify-center lg:justify-start">
                  <div className="h-px w-12 bg-signal-gold"></div>
                  <p className="text-lg sm:text-xl text-signal-gold font-bold tracking-tight">
                    LaunchPath installs the structure before pressure hits.
                  </p>
                </div>
              </div>

              <div className="pt-4 animate-reveal-up [animation-delay:400ms] flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  to="/tools/tco-calculator" 
                  className="inline-flex items-center justify-center space-x-3 bg-signal-gold text-primary-dark px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base hover:bg-white transition-all shadow-[0_20px_40px_rgba(198,146,42,0.3)] active:scale-95 group border-b-4 border-[#8e7340]"
                >
                  <span>RUN TCO CALCULATOR</span>
                  <Calculator size={18} className="group-hover:rotate-12 transition-transform" />
                </Link>
                <Link 
                  to="/readiness" 
                  className="inline-flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base hover:bg-white/10 transition-all active:scale-95 group"
                >
                  <span>ENTER GROUND 0</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end animate-reveal-up [animation-delay:600ms]">
            <div className="bg-[#0c1a2d]/80 backdrop-blur-xl border-2 border-white/10 rounded-[3rem] p-8 sm:p-12 w-full max-w-lg relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.02)] pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black font-serif uppercase text-white/50 leading-tight">90 DAY</h3>
                    <h3 className="text-3xl sm:text-4xl font-black font-serif uppercase text-signal-gold italic leading-none tracking-tighter">RISK MAP™</h3>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 transition-transform duration-700 group-hover:rotate-12 shadow-inner">
                    <ShieldAlert size={28} className="text-signal-gold" />
                  </div>
                </div>
                
                {scanState === 'idle' ? (
                  <form onSubmit={handleRiskMapSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.4em] text-white/40 ml-2">ENTITY IDENTIFIER</label>
                      <input 
                        required 
                        value={formData.firstName} 
                        onChange={e => setFormData({...formData, firstName: e.target.value})} 
                        placeholder="CARRIER_NAME" 
                        className="w-full bg-black/40 border-2 border-white/5 px-6 py-5 rounded-2xl font-mono font-bold text-base sm:text-lg outline-none focus:border-signal-gold/50 focus:ring-4 focus:ring-signal-gold/5 transition-all placeholder:text-white/5 uppercase" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.4em] text-white/40 ml-2">UPLINK EMAIL</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        placeholder="ADMIN@CARRIER.COM" 
                        className="w-full bg-black/40 border-2 border-white/5 px-6 py-5 rounded-2xl font-mono font-bold text-base sm:text-lg outline-none focus:border-signal-gold/50 focus:ring-4 focus:ring-signal-gold/5 transition-all placeholder:text-white/5 uppercase" 
                      />
                    </div>
                    <button type="submit" disabled={loading} className="w-full relative bg-signal-gold text-primary-dark py-7 rounded-2xl font-black uppercase tracking-[0.3em] text-sm sm:text-base shadow-2xl hover:bg-white transition-all overflow-hidden group/btn border-b-8 border-[#8e7340] disabled:opacity-50 mt-4">
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <><Loader2 className="animate-spin mr-3" size={18} /> PROCESSING_DATA</>
                        ) : (
                          <>GENERATE DIAGNOSTIC <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" /></>
                        )}
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="py-10 space-y-8">
                    <div className="flex justify-center relative">
                      <div className="absolute inset-0 bg-signal-gold/20 blur-3xl rounded-full animate-pulse"></div>
                      <Loader2 className="animate-spin text-signal-gold relative z-10" size={64} />
                    </div>
                    <div className="bg-black/60 rounded-[2rem] p-8 font-mono text-[10px] text-emerald-500 h-48 overflow-hidden shadow-inner border border-white/10">
                      {scanLog.map((log, i) => <div key={i} className="mb-1.5">&gt; {log}</div>)}
                      <div className="animate-pulse">_</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 HOW LAUNCHPATH OPERATES */}
      <section className="bg-white dark:bg-[#0a0f1a] py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/5 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-20">
            <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">OPERATING_PROTOCOL</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-authority-blue dark:text-white font-serif leading-none">
              HOW LAUNCHPATH <br/><span className="text-signal-gold italic">OPERATES.</span>
            </h2>
          </div>

          <div className="space-y-8">
            {/* Step 1: REACH Test */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-white/5 dark:to-white/[0.02] border-2 border-slate-200 dark:border-white/10 rounded-3xl p-10 md:p-12 hover:border-signal-gold/50 hover:shadow-2xl hover:shadow-signal-gold/10 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-signal-gold/5 rounded-full blur-3xl group-hover:bg-signal-gold/10 transition-all duration-500"></div>
              <div className="relative flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-signal-gold/30 to-signal-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Target size={36} className="text-signal-gold" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-signal-gold/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-signal-gold">01</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-authority-blue dark:text-white tracking-tight group-hover:text-signal-gold dark:group-hover:text-signal-gold transition-colors">REACH Test</h3>
                    <ArrowRight size={24} className="text-signal-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-white/80 leading-relaxed font-medium">
                    Complete the REACH Test to map your first 90 days of authority and expose audit, insurance, and cash‑flow risks.
                  </p>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-signal-gold/70">Risk Mapping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Ground 0 Briefing */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-white/5 dark:to-white/[0.02] border-2 border-slate-200 dark:border-white/10 rounded-3xl p-10 md:p-12 hover:border-signal-gold/50 hover:shadow-2xl hover:shadow-signal-gold/10 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-signal-gold/5 rounded-full blur-3xl group-hover:bg-signal-gold/10 transition-all duration-500"></div>
              <div className="relative flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-signal-gold/30 to-signal-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FileText size={36} className="text-signal-gold" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-signal-gold/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-signal-gold">02</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-authority-blue dark:text-white tracking-tight group-hover:text-signal-gold dark:group-hover:text-signal-gold transition-colors">Ground 0 Briefing</h3>
                    <ArrowRight size={24} className="text-signal-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-white/80 leading-relaxed font-medium">
                    Enter a structured readiness briefing where we review your risk map, documentation, and governance against the operating standard.
                  </p>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-signal-gold/70">Structure Verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Admission Decision */}
            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-white/5 dark:to-white/[0.02] border-2 border-slate-200 dark:border-white/10 rounded-3xl p-10 md:p-12 hover:border-signal-gold/50 hover:shadow-2xl hover:shadow-signal-gold/10 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-signal-gold/5 rounded-full blur-3xl group-hover:bg-signal-gold/10 transition-all duration-500"></div>
              <div className="relative flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-signal-gold/30 to-signal-gold/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <ShieldCheck size={36} className="text-signal-gold" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-signal-gold/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-black text-signal-gold">03</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-authority-blue dark:text-white tracking-tight group-hover:text-signal-gold dark:group-hover:text-signal-gold transition-colors">Admission Decision</h3>
                    <ArrowRight size={24} className="text-signal-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-white/80 leading-relaxed font-medium">
                    If your operation reaches the minimum standard, you are invited into LaunchPath to install the full compliance system; if not, you receive corrective priorities and are not advanced.
                  </p>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest text-signal-gold/70">Qualified Admission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE LAW: EXECUTIVE TARGET DECLARATION */}
      <section className="bg-[#020617] py-32 md:py-56 px-4 sm:px-6 md:px-8 lg:px-12 border-y border-white/5 relative">
        <TechnicalPattern />
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Gavel className="text-signal-gold" size={32} />
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-signal-gold font-serif leading-[0.9]">
              CARRIER EXECUTIVE. <br/><span className="text-white italic">NOT HUSTLER.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-xl md:text-2xl text-white/70 leading-relaxed font-bold">
            <p className="border-l-4 border-signal-gold pl-10">
              LaunchPath serves operators who treat authority as a governed asset, not a revenue experiment. If you view compliance as overhead instead of infrastructure, this system will not serve you.
            </p>
            <p className="text-slate-500">
              Entry requires participation inside a sequenced, audit-verified framework. Enrollment is not a transaction; it is authorization to access institutional governance.
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 THE CREDENTIALS: STATION CUSTODIAN */}
      <section className="bg-white dark:bg-[#0a0f1a] py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Image Column */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-signal-gold/10 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative rounded-[4rem] overflow-hidden border-8 border-slate-200 dark:border-white/5 shadow-2xl">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Vincent.png?alt=media&token=bcffcecc-bbf8-41b2-98fe-29da3788a23d"
                alt="Vince Lawrence, Station Custodian"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Credentials Column */}
          <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
            <div className="space-y-4">
              <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">INSTITUTIONAL_FOUNDATION</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-authority-blue dark:text-white font-serif leading-none">
                CREDENTIALS & <br/><span className="text-signal-gold italic">FOUNDATION.</span>
              </h2>
            </div>

            <div className="bg-slate-50 dark:bg-white/5 border-l-4 border-signal-gold p-8 md:p-10 rounded-2xl space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Station Custodian</p>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-authority-blue dark:text-white tracking-tight">Vince Lawrence</h3>
              </div>
              
              <div className="space-y-6 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <p>
                  I have spent more than <strong className="text-authority-blue dark:text-signal-gold">20 years in operational leadership</strong> as a shift manager, business unit manager, supervisor, team leader, and OSHA safety coordinator, after <strong className="text-authority-blue dark:text-signal-gold">8 years of service in the United States Navy</strong>.
                </p>
                <p className="font-bold text-authority-blue dark:text-white">
                  That background informs how I install order, enforce boundaries, and refuse admission to carriers that are not structurally ready to operate.
                </p>
              </div>
            </div>

            {/* Scripture Foundation */}
            <div className="border-t border-slate-200 dark:border-white/10 pt-8">
              <blockquote className="text-sm md:text-base text-slate-600 dark:text-slate-400 italic leading-relaxed">
                <p>"By wisdom a house is built, and by understanding it is established; by knowledge the rooms are filled with all precious and pleasant riches."</p>
                <footer className="text-signal-gold font-bold not-italic mt-3 text-xs uppercase tracking-widest">— Proverbs 24:3-4</footer>
              </blockquote>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-authority-blue/10 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                  <Anchor size={28} className="text-authority-blue dark:text-signal-gold" />
                </div>
                <p className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">Navy Veteran</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-authority-blue/10 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                  <ShieldCheck size={28} className="text-authority-blue dark:text-signal-gold" />
                </div>
                <p className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">OSHA Certified</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-authority-blue/10 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                  <Award size={28} className="text-authority-blue dark:text-signal-gold" />
                </div>
                <p className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-wider">20+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SYSTEM: FOUR PILLARS + INTERDEPENDENCE LOGIC */}
      <section className="py-32 md:py-64 px-4 sm:px-6 md:px-8 lg:px-12 bg-white dark:bg-primary-dark transition-colors relative">
        <TechnicalPattern />
        <div className="max-w-[1400px] mx-auto space-y-32 relative z-10">
          <header className="text-center space-y-8">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em]">SYSTEM_ARCHITECTURE_MAP</p>
            <h2 className="text-5xl md:text-9xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-none">
              THE <span className="text-signal-gold italic">FOUR</span> PILLARS.
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-bold max-w-3xl mx-auto leading-tight uppercase tracking-tight">
              Institutional stability requires four interlocking systems of command and control.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Authority Protection", icon: <Scale />, desc: "The legal right to operate and the asset at the center of the structure.", code: "49_CFR_365" },
              { title: "Insurance Continuity", icon: <ShieldCheck />, desc: "The financial shield required to move freight and protect assets.", code: "49_CFR_387" },
              { title: "Compliance Backbone", icon: <FileText />, desc: "Documentary evidence required to satisfy federal investigators.", code: "49_CFR_391" },
              { title: "Cash-Flow Oxygen", icon: <Zap />, desc: "The capital required to keep the other three pillars alive.", code: "FISCAL_STND" }
            ].map((pillar, i) => (
              <div key={i} className="bg-slate-50 dark:bg-[#0c1a2d] p-12 rounded-[4rem] border border-slate-100 dark:border-white/5 flex flex-col items-center text-center space-y-8 hover:shadow-2xl transition-all duration-700 group shadow-lg">
                <div className="w-20 h-20 bg-authority-blue text-signal-gold rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{pillar.icon}</div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight leading-none font-serif">{pillar.title}</h4>
                  <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.4em]">{pillar.code}</p>
                </div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">{pillar.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-[#002244] dark:bg-white/5 p-12 md:p-20 rounded-[5rem] border-l-[16px] border-signal-gold shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Activity size={240}/></div>
            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl font-black uppercase text-signal-gold font-serif tracking-tight leading-none">Interdependence Logic Protocol</h3>
              <p className="text-xl md:text-4xl text-white font-bold leading-[1.1] uppercase tracking-tighter">
                Pillars are not independent modules. Compliance failure triggers underwriting isolation. Isolation triggers insurance lapse. Lapse triggers authority revocation. Operational collapse is the terminal output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 WHY THIS STANDARD EXISTS */}
      <section className="bg-white dark:bg-[#0a0f1a] py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-authority-blue/5 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-16">
            <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">PROTECTIVE_DOCTRINE</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-authority-blue dark:text-white font-serif leading-none">
              WHY THIS STANDARD <br/><span className="text-signal-gold italic">EXISTS.</span>
            </h2>
          </div>

          <div className="space-y-10">
            <div className="bg-slate-50 dark:bg-white/5 border-l-4 border-signal-gold rounded-2xl p-10 md:p-12 space-y-8">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-white/90 font-bold leading-relaxed">
                Most new carriers don't fail because they can't drive.
              </p>
              <p className="text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                They fail because their <strong className="text-authority-blue dark:text-signal-gold">paperwork, insurance, or systems weren't built strong enough</strong> to survive the first 90 days of pressure.
              </p>
              <p className="text-lg md:text-xl text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                Small mistakes — a missing driver file, a gap in insurance coverage, an ELD setup error — turn into <strong className="text-authority-blue dark:text-signal-gold">audit findings, policy cancellations, and authority revocation</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center space-y-4">
                <div className="text-5xl font-black text-signal-gold">18</div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Months Average Failure</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center space-y-4">
                <div className="text-5xl font-black text-signal-gold">90</div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Days Critical Window</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-8 text-center space-y-4">
                <div className="text-5xl font-black text-signal-gold">10</div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Structural Requirements</p>
              </div>
            </div>

            <div className="bg-authority-blue rounded-2xl p-10 md:p-12 text-center space-y-6">
              <p className="text-2xl md:text-3xl text-white font-bold leading-tight">
                LaunchPath exists to <span className="text-signal-gold">install the structure before pressure hits</span>.
              </p>
              <p className="text-lg text-white/70 font-medium">
                Not to motivate. Not to inspire. To <strong className="text-white">protect your authority</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PROOF: UNIFIED DOSSIER */}
      <section className="bg-[#FAF9F6] dark:bg-[#020617] py-32 md:py-64 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-6">
                <p className="text-signal-gold font-black uppercase tracking-[0.6em] text-[10px]">Verification Standard</p>
                <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-authority-blue dark:text-white font-serif leading-[0.85]">
                  THE UNIFIED <br/><span className="text-signal-gold italic">DOSSIER.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {[
                  { t: 'Driver Qualification Files (DQF)', d: '49 CFR § 391.51 Standard' },
                  { t: 'Substance Governance Program', d: 'Clearinghouse & Consortium Sync' },
                  { t: 'HOS Compliance Architecture', d: 'ELD Reconciliation Protocol' },
                  { t: 'Maintenance Documentation Protocol', d: 'Closed-Loop Inspection Records' },
                  { t: 'Insurance Underwriting Evidence', d: 'Standardized Carrier Profile' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-8 group">
                    <div className="w-12 h-12 bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-signal-gold shadow-sm group-hover:bg-authority-blue group-hover:text-white transition-all">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl text-authority-blue dark:text-white font-black uppercase tracking-tight leading-none">
                        {item.t}
                      </h4>
                      <p className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest mt-1.5 opacity-90">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-authority-blue p-10 rounded-[3rem] text-white/90 font-black text-2xl uppercase tracking-tighter leading-tight border-b-8 border-slate-950">
                 "This is documentation integrity. This is what survives an audit window."
              </div>
            </div>

            <div className="lg:col-span-5">
               <div className="aspect-[4/5] bg-primary-dark rounded-[5rem] border-[20px] border-white/5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)] p-16 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute -top-10 -right-10 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 rotate-12">
                    <FileText size={400}/>
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-signal-gold rounded-3xl flex items-center justify-center text-primary-dark shadow-[0_0_40px_rgba(198,146,42,0.4)] transition-transform group-hover:scale-110 duration-700">
                      <Lock size={40}/>
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-white uppercase tracking-tight leading-none font-serif">REGISTRY ARCHIVE</h4>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-signal-gold mt-3">VER_4.2.0_STABLE</p>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-white/10 rounded-full"></div>
                      <div className="h-2 w-3/5 bg-white/10 rounded-full"></div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity size={16} className="text-emerald-500 animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Encryption Active</p>
                    </div>
                    <p className="text-xs text-white/30 uppercase font-bold tracking-widest leading-relaxed">SystemATIC verification before operational dispatch required.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 THE MINIMUM STANDARD - 10 POINT OVERVIEW */}
      <section className="bg-authority-blue py-32 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-signal-gold/5 via-transparent to-transparent"></div>
        <TechnicalPattern />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-20">
            <p className="text-signal-gold font-black uppercase tracking-[0.4em] text-[10px]">ENFORCEMENT_FRAMEWORK</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-serif leading-none">
              THE MINIMUM <br/><span className="text-signal-gold italic">STANDARD.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
              This is not content. This is the <strong className="text-white">measuring rod</strong>. The <strong className="text-signal-gold">gate</strong>. The thing that separates LaunchPath from YouTube courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { num: '01', title: 'Authority and Identity', desc: 'DOT/MC active, legal name consistent, process agent filed' },
              { num: '02', title: 'Insurance and Risk', desc: 'Coverage limits match freight type, no gaps, certificate handling process' },
              { num: '03', title: 'Driver Qualification Files', desc: 'Valid CDL, application, MVR, medical card, clearinghouse query' },
              { num: '04', title: 'Hours of Service and ELD', desc: 'ELD compliant, written HOS policy, log review process defined' },
              { num: '05', title: 'Vehicle and Maintenance', desc: 'Unit list, ownership proof, maintenance files, inspection process' },
              { num: '06', title: 'Safety Program and Training', desc: 'Named safety officer, written policy, orientation checklist' },
              { num: '07', title: 'Compliance Recordkeeping', desc: 'Central file location, FMCSA audit structure, backup plan' },
              { num: '08', title: 'Financial and Cash-Flow', desc: '90-day cash plan, factoring/receivables plan, minimum rate process' },
              { num: '09', title: 'Operational Discipline', desc: 'Dispatch rules, out-of-service policy, corrective action process' },
              { num: '10', title: 'Governance and Review', desc: 'Monthly safety review, REACH results stored, Ground 0 tracking' }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-2xl p-8 space-y-4 hover:border-signal-gold/50 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-signal-gold/30 group-hover:text-signal-gold/50 transition-colors">{item.num}</span>
                  <div className="w-10 h-10 bg-signal-gold/20 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} className="text-signal-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight leading-tight">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border-l-4 border-signal-gold rounded-2xl p-10 md:p-12 space-y-6 text-center">
            <p className="text-2xl md:text-3xl text-white font-bold leading-tight">
              LaunchPath is <span className="text-signal-gold">not open enrollment</span>.
            </p>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed">
              You don't buy access. You <strong className="text-white">qualify</strong>.
            </p>
            <p className="text-base text-white/60 font-medium leading-relaxed max-w-3xl mx-auto">
              If your operation isn't structurally ready, you'll be told directly — along with what needs to be corrected. That protects your authority. And it protects the standard.
            </p>
          </div>
        </div>
      </section>

      {/* 6. THE JUDGMENT: 16 SINS + REACH BRIDGE */}
      <section className="bg-primary-dark py-32 md:py-64 relative overflow-hidden">
        <TechnicalPattern />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <div className="w-20 h-20 bg-red-600/10 border border-red-600/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <ShieldX size={40} className="text-red-600" />
            </div>
            <h2 className="text-5xl md:text-9xl font-black font-serif uppercase tracking-tighter text-white leading-none">THE 16 <span className="text-red-600 italic">SINS.</span></h2>
            <p className="text-xl md:text-2xl text-white/50 font-bold max-w-4xl mx-auto leading-relaxed border-l-4 border-red-600 pl-12 py-4 text-left uppercase">
              These are the clinical failure patterns used by federal investigators to determine if your entity is fundamentally unsafe. Each "Sin" represents a reachable hazard that triggers immediate administrative response.
            </p>
          </div>
          
          <DeadlySinsGrid />
          
          <div className="mt-32 max-w-4xl mx-auto text-center space-y-12">
            <div className="w-24 h-24 bg-red-600/10 rounded-[3rem] border border-red-600/30 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-red-600/20">
              <Target size={48} className="text-red-500" />
            </div>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-signal-gold font-serif leading-[0.85]">
              LOCATE YOUR <br/><span className="text-white italic">EXPOSURE.</span>
            </h2>
            <p className="text-xl md:text-3xl text-white/70 leading-tight font-black uppercase tracking-tight">
              The REACH Test™ maps your current compliance posture against the 16 terminal failure vectors.
            </p>
            <div className="pt-10">
              <Link 
                to="/reach-test" 
                className="inline-flex items-center space-x-6 bg-red-600 text-white px-16 py-10 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs md:text-sm shadow-[0_40px_80px_rgba(220,38,38,0.3)] hover:bg-white hover:text-red-600 transition-all active:scale-95 group border-b-[12px] border-red-900"
              >
                <span>VERIFY READINESS DIAGNOSTIC</span>
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE PATH: ADMISSION SEQUENCE */}
      <section className="bg-[#FAF9F6] dark:bg-[#020617] py-32 md:py-64 px-4 sm:px-6 md:px-8 lg:px-12 border-y border-slate-100 dark:border-white/5 relative">
        <TechnicalPattern />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <header className="text-center mb-32 space-y-8">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em]">ENROLLMENT_PROTOCOL_MAP</p>
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter text-authority-blue dark:text-white font-serif leading-[0.8]">
              ADMISSION <br/><span className="text-signal-gold italic">SEQUENCE.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed">
              You don't buy access. You <span className="text-signal-gold">qualify</span>. Every applicant completes REACH and Ground 0 before admission is considered.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {[
              { num: "01", title: "REACH TEST", desc: "Map your first 90 days and uncover audit triggers, insurance gaps, and cash-flow pressure points." },
              { num: "02", title: "GROUND 0 EVALUATION", desc: "We review your documents and structure against what a real FMCSA audit expects. Not theory. Not guesswork." },
              { num: "03", title: "ADMISSION DECISION", desc: "If you meet the minimum standard, you're invited to install the full system. If not, you receive corrective priorities before you scale." }
            ].map((step, i) => (
              <div key={i} className="space-y-10 group relative">
                <div className="w-24 h-24 bg-authority-blue text-signal-gold rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(30,58,95,0.3)] group-hover:scale-110 transition-transform duration-700 border-b-8 border-slate-950">
                  <span className="text-4xl font-black font-serif">{step.num}</span>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase text-authority-blue dark:text-white tracking-tighter leading-none font-serif">{step.title}</h3>
                  <div className="h-1 w-12 bg-signal-gold/40"></div>
                  <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tighter">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE TOOLS: MATH OF SURVIVAL / TCO CALCULATOR */}
      <section className="py-24 md:py-64 px-4 sm:px-6 md:px-8 lg:px-12 bg-signal-gold text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/10 to-transparent"></div>
        <TechnicalPattern />
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 items-start lg:items-center relative z-10">
          <div className="w-full lg:w-7/12 space-y-12">
            <div className="inline-flex items-center space-x-4 bg-[#002244]/10 border border-[#002244]/10 px-6 py-2.5 rounded-full">
              <Target size={16} className="text-[#002244]" />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002244]">FISCAL_STABILIZATION_TERMINAL</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-[9rem] font-black font-serif uppercase tracking-tighter leading-[0.8] text-[#002244]">THE MATH <br/>OF <span className="italic text-white underline decoration-white/20 underline-offset-[20px]">SURVIVAL.</span></h2>
            <p className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight max-w-2xl text-[#002244]/80">
               Revenue without margin analysis is busyness. Verify solvency before you commit.
            </p>
            
            {/* Enhanced Fiscal Benchmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {[
                { label: "AVG. OPERATING COST", val: "$10.3K - $18.8K", desc: "Per Unit / Per Month", icon: <TrendingUp size={16}/> },
                { label: "TERMINAL FAILURE LIMIT", val: "< 90 DAYS CASH", desc: "Solvency Threshold", icon: <ShieldAlert size={16}/> },
                { label: "MIN. MAINTENANCE FUND", val: "$0.15 / MILE", desc: "Escrow Protocol", icon: <DollarSign size={16}/> },
                { label: "AUDIT RISK MULTIPLIER", val: "12X EXPOSURE", desc: "No-System Penalty", icon: <Activity size={16}/> }
              ].map((b, i) => (
                <div key={i} className="bg-[#002244]/5 border border-[#002244]/10 p-6 rounded-3xl backdrop-blur-md">
                   <div className="flex items-center space-x-3 mb-3 text-[#002244]/70">
                      {b.icon}
                      <p className="text-[9px] font-black uppercase tracking-widest">{b.label}</p>
                   </div>
                   <p className="text-2xl font-black text-[#002244] tracking-tight">{b.val}</p>
                   <p className="text-[10px] font-bold text-[#002244]/60 uppercase mt-1">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-10">
               <Link to="/tools/tco-calculator" className="relative overflow-hidden bg-[#002244] text-white px-8 sm:px-12 md:px-20 py-8 sm:py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_40px_80px_-10px_rgba(0,0,0,0.4)] hover:bg-slate-800 transition-all active:scale-95 flex items-center w-fit border-b-[12px] border-black group">
                 <span className="relative z-10 flex items-center">
                   LAUNCH TCO ENGINE <ArrowRight size={24} className="ml-6 group-hover:translate-x-2 transition-transform" />
                 </span>
               </Link>
            </div>
          </div>

          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
             {/* High Fidelity Mockup with Advanced Animation - Refined for visibility */}
             <div className="bg-[#0c1a2d] border-[12px] border-white/5 rounded-[5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden group w-full max-w-sm lg:max-w-none">
                <div className="absolute top-0 right-0 p-12 opacity-5 transition-transform duration-1000 group-hover:scale-125 group-hover:rotate-6"><Calculator size={300} /></div>
                
                {/* Simulated Data Feed - Subtly muted to avoid clutter */}
                <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
                  <div className="flex flex-col gap-2 p-8 text-[8px] font-mono">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="flex justify-between w-full opacity-40 overflow-hidden whitespace-nowrap">
                        <span>DATA_PKT_{i*124}...</span>
                        <span>0x{Math.random().toString(16).slice(2,8).toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticker / Entry Animation Overlay */}
                <div className="space-y-12 relative z-10">
                   <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <h4 className="text-xl font-black font-serif uppercase tracking-widest italic text-white/50">Economic Analyzer v4.2</h4>
                        <div className="flex items-center space-x-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${isUpdating ? 'bg-signal-gold animate-ping' : 'bg-emerald-500'}`}></div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-white/80">{terminalPhase}</span>
                        </div>
                     </div>
                     <div className={`p-2.5 rounded-xl border transition-all duration-300 ${isUpdating ? 'bg-signal-gold/20 border-signal-gold/40 text-signal-gold' : 'bg-emerald-500/20 border-emerald-500/20 text-emerald-500'}`}>
                        <Activity size={18} className={`${isUpdating ? 'animate-spin' : 'animate-pulse'}`} />
                     </div>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-10">
                        <div className="flex justify-between items-end border-b border-white/15 pb-8 group/item">
                          <div className="space-y-2">
                            <span className="text-xs font-black text-white uppercase tracking-[0.4em]">Calculated CPM</span>
                            <div className="flex items-center space-x-2">
                               <TrendingDown size={14} className="text-emerald-500" />
                               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Input Feed...</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center">
                              <span className={`text-5xl md:text-6xl font-black tracking-tighter tabular-nums transition-all ${isUpdating ? 'text-signal-gold' : 'text-white'}`}>
                                ${metrics.cpm}
                              </span>
                              {isUpdating && cursorVisible && <span className="text-5xl md:text-6xl font-thin ml-1 text-signal-gold">|</span>}
                            </div>
                            {isUpdating && <div className="h-1 w-full bg-signal-gold/40 animate-pulse mt-2"></div>}
                          </div>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/15 pb-8 group/item">
                          <div className="space-y-2">
                            <span className="text-xs font-black text-white uppercase tracking-[0.4em]">Break-Even RPM</span>
                            <div className="flex items-center space-x-2">
                               <Activity size={14} className="text-signal-gold" />
                               <span className="text-[9px] font-black text-signal-gold uppercase tracking-widest">Neural Sync...</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center">
                              <span className={`text-5xl md:text-6xl font-black tracking-tighter tabular-nums transition-all ${isUpdating ? 'text-white/90' : 'text-signal-gold'}`}>
                                ${metrics.rpm}
                              </span>
                              {isUpdating && cursorVisible && <span className="text-5xl md:text-6xl font-thin ml-1 text-white">|</span>}
                            </div>
                            {isUpdating && <div className="h-1 w-full bg-white/30 animate-pulse mt-2"></div>}
                          </div>
                        </div>
                      </div>
                   </div>

                   {/* Mini Charts Visualization - Sharper colors */}
                   <div className="flex items-end space-x-2.5 h-20 pt-6">
                      {chartHeights.map((h, i) => (
                        <div key={i} className="bg-white/10 w-full rounded-t-md relative group/bar transition-all hover:bg-signal-gold/40">
                          <div className={`absolute bottom-0 w-full transition-all duration-500 group-hover/bar:bg-signal-gold rounded-t-sm ${isUpdating ? 'bg-signal-gold' : 'bg-signal-gold/40'}`} style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                   </div>

                   <div className="flex items-center space-x-5 pt-8">
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors ${isUpdating ? 'bg-signal-gold animate-pulse shadow-[0_0_10px_rgba(198,146,42,0.6)]' : 'bg-emerald-500'} `}></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
                        {isUpdating ? 'PROCESSING_FISCAL_VECTORS...' : 'Registry Synchronized // Protocol Ready'}
                      </p>
                   </div>
                </div>

                {/* Scanline Effect Overlay - Tuned for text protection */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[20] [background-size:100%_3px,4px_100%]"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 9. THE CLARIFICATION: FAQ SECTION */}
      <FAQSection />

      {/* 10. THE INVITATION: FINAL CTA SECTION */}
      <section className="py-48 md:py-72 px-4 sm:px-6 md:px-8 lg:px-12 bg-white dark:bg-primary-dark relative">
        <TechnicalPattern />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <header className="text-center mb-32 space-y-10">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[1em]">MISSION_FINALIZATION</p>
            <h2 className="text-6xl md:text-[10rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.8] mb-8">THE <span className="text-signal-gold italic">EXECUTIVE</span> <br/>STANDARD.</h2>
            <p className="text-2xl md:text-4xl font-bold text-slate-500 max-w-4xl mx-auto uppercase tracking-tighter leading-tight">Transformation from driver with a dream to carrier with infrastructure.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
             {[
               { letter: "D", title: "Audit-Ready Infrastructure", desc: "Documentation standards where federal auditors find zero reachable hazards." },
               { letter: "A", title: "Preferred Risk Profile", desc: "Safety-first operational structures that insurance underwriters value." },
               { letter: "F", title: "Financial Stability", desc: "Systems that maximize operating margins and preserve long-term cash-flow." }
             ].map((item, i) => (
               <div key={i} className="bg-slate-50 dark:bg-surface-dark p-12 md:p-16 rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-lg space-y-10 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-20 h-20 bg-authority-blue dark:bg-gray-800 rounded-3xl flex items-center justify-center font-black text-3xl text-signal-gold shadow-xl group-hover:scale-110 transition-transform">{item.letter}</div>
                  <div className="space-y-6">
                    <h4 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-tight">{item.title}</h4>
                    <p className="text-base text-slate-500 dark:text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="mt-40 text-center space-y-12">
            <Link 
              to="/reach-test" 
              className="inline-flex items-center space-x-6 sm:space-x-10 bg-authority-blue text-white px-8 sm:px-12 md:px-20 py-8 sm:py-10 rounded-[3.5rem] font-black uppercase tracking-[0.5em] text-xs md:text-sm shadow-[0_50px_100px_-20px_rgba(30,58,95,0.4)] hover:bg-steel-blue hover:scale-105 transition-all active:scale-95 group border-b-4 border-slate-950"
            >
              <span>INITIATE ADMISSION DIAGNOSTIC</span>
              <ArrowRight size={32} className="group-hover:translate-x-3 transition-transform" />
            </Link>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Stewardship First. Revenue Second.</p>
              <div className="flex items-center space-x-4 opacity-10">
                 <div className="h-px w-32 bg-slate-900 dark:bg-white"></div>
                 <Activity size={24} />
                 <div className="h-px w-32 bg-slate-900 dark:bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSERTION: Common Questions Before Proceeding */}
      <section className="py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-slate-50 dark:bg-surface-dark border-t border-slate-100 dark:border-white/5 relative">
        <TechnicalPattern />
        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-6">
            <p className="text-[11px] font-black uppercase tracking-[1em] text-slate-400">ORIENTATION_Q_AND_A</p>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">Common Questions Before Proceeding</h2>
            <div className="h-1 w-24 bg-signal-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {[
              { q: "Is this a \"make money trucking\" course?", a: "LaunchPath is compliance-first education focused on FMCSA regulations, audit readiness, and authority protection. It does not teach revenue tactics, dispatching, or freight brokerage." },
              { q: "Who is LaunchPath for?", a: "LaunchPath is for new motor carriers operating box trucks, cargo vans, or other non-CDL commercial vehicles under their own authority." },
              { q: "Is this only for brand-new carriers?", a: "LaunchPath is most effective within the first 90 days of operation, but active carriers use it to identify and correct existing compliance exposure before audits or insurance reviews." },
              { q: "Does LaunchPath guarantee audit approval?", a: "No system guarantees outcomes. LaunchPath installs the controls and documentation investigators evaluate when determining compliance." },
              { q: "How much time does this require?", a: "LaunchPath requires disciplined weekly implementation during the first 90 days of operation." },
              { q: "What if I'm not ready for this level of structure?", a: "Then LaunchPath is not a fit. The system assumes disciplined documentation and operational control from day one." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 group">
                <h3 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif group-hover:text-signal-gold transition-colors">Q{i+1}: {item.q}</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 bg-signal-gold text-primary-dark p-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-[100] border-4 border-white/20 animate-in fade-in zoom-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} />
        </button>
      )}

      <div className="bg-[#020617] py-32 px-6 border-t border-white/5 relative">
        <TechnicalPattern />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <p className="text-xs text-white/40 font-medium leading-relaxed uppercase tracking-widest max-w-3xl mx-auto">
            LaunchPath is an institutional educational platform. All materials are for educational purposes only and do not constitute legal, tax, financial, insurance, or regulatory advice. Success depends on individual operator discipline. Verify all filings with the FMCSA and qualified professionals.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-20">
             <div className="flex items-center space-x-3">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">FMCSA_COMP_SYNC</span>
             </div>
             <div className="flex items-center space-x-3">
                <Gavel size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">REGULATORY_GUARD</span>
             </div>
             <div className="flex items-center space-x-3">
                <Database size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">LP_REGISTRY_V4.2</span>
             </div>
          </div>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[1em] pt-12">
            CARRIER OPERATING STANDARD: LP-SYS-V4.2 — ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
