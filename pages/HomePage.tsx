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
  // Fix: Added missing Loader2 import from lucide-react
  Loader2
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';

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
    "AUTHORIZATION_GRANTED."
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
      await syncToMailerLite({ email: formData.email, fields: { name: formData.firstName } });
      setScanState('complete');
      navigate(destination);
    } catch (err) {
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  const riskDomains = [
    {
      domain: "Substance Governance",
      items: [
        { id: "01", text: "Random Pool Enrollment", result: "AUDIT DEFAULT" },
        { id: "02", text: "Positive Driver Results", result: "IMMEDIATE REVOCATION" },
        { id: "03", text: "Clearinghouse Query Failure", result: "OPERATING BAN" },
        { id: "04", text: "Omission of Pre-Employment", result: "STRICT LIABILITY" }
      ]
    },
    {
      domain: "Human Capital",
      items: [
        { id: "05", text: "Revoked License Usage", result: "OOS EVENT" },
        { id: "06", text: "Missing Med-Cert", result: "DRIVER DOWN GRADE" },
        { id: "07", text: "Fragmented DQ Files", result: "AUDIT RED FLAG" },
        { id: "08", text: "Omitted Background Inq", result: "NEGLIGENT ENTRUSTMENT" }
      ]
    },
    {
      domain: "Operational Control",
      items: [
        { id: "09", text: "Falsification of HOS", result: "CRIMINAL DEFAULT" },
        { id: "10", text: "Dispatching OOS Vehicles", result: "AUTHORITY SEIZURE" },
        { id: "11", text: "Deficient Roadside History", result: "PREMIUM SPIKE" },
        { id: "12", text: "No Maintenance Log", result: "LIABILITY DEFAULT" }
      ]
    },
    {
      domain: "Administrative",
      items: [
        { id: "13", text: "Insurance Coverage Lapse", result: "AUTHORITY TERMINATION" },
        { id: "14", text: "Failure to Update MCS-150", result: "ADMIN REVOCATION" },
        { id: "15", text: "BOC-3 Process Agent", result: "FILING SUSPENSION" },
        { id: "16", text: "Late Accident Reporting", result: "LEGAL DEFAULT" }
      ]
    }
  ];

  const faqs = [
    { q: "What if my insurance quote is higher than expected?", a: "Insurance is a fixed economic reality. We help you build a risk profile that underwriters value, even if initial costs are high." },
    { q: "Does LaunchPath guarantee I will pass an audit?", a: "No system can guarantee results. We provide the infrastructure and implementation requirements used by the nation's most compliant carriers." },
    { q: "How long does authority activation take?", a: "The mandatory protest period is 10 days, with typical processing totaling 21 days. We use this window for system initialization." }
  ];

  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-signal-gold/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col lg:flex-row border-b border-white/5">
        <div className="w-full lg:w-[60%] p-10 sm:p-20 lg:p-32 flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 space-y-12">
            <div className="flex gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center"><ShieldCheck size={12} className="mr-2 text-signal-gold" /> VETERAN OPERATED</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center"><Award size={12} className="mr-2 text-signal-gold" /> SAFETY CERTIFIED</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black font-serif uppercase tracking-tighter leading-[0.85] animate-reveal-up">
              PROTECT <br/>YOUR <br/><span className="text-signal-gold">AUTHORITY</span> <br/>WITH ORDER.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-bold max-w-xl border-l-8 border-signal-gold pl-8 py-2">
              Most new carriers establish compliance within the first 90 days — or inherit consequences for 18 months.
            </p>
            <div className="pt-8">
              <Link to="/reach-test" className="bg-signal-gold text-[#002244] px-12 py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-white transition-all active:scale-95 flex items-center w-fit group border-b-8 border-slate-900">
                Verify Admission Readiness <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] bg-white/5 p-10 sm:p-20 flex items-center justify-center border-l border-white/5">
          <div className="bg-[#0c1a2d] p-10 rounded-[3rem] shadow-2xl border border-white/10 w-full max-w-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4"><Zap size={24} className="text-signal-gold opacity-30" /></div>
            <h3 className="text-3xl font-black font-serif uppercase text-white mb-2">90 DAY</h3>
            <h3 className="text-4xl font-black font-serif uppercase text-signal-gold italic mb-8">RISK MAP™</h3>
            
            {scanState === 'idle' ? (
              <form onSubmit={handleRiskMapSubmit} className="space-y-6">
                <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="LEGAL ENTITY NAME" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl font-black text-sm outline-none focus:border-signal-gold transition-all" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="REGISTRY EMAIL" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl font-black text-sm outline-none focus:border-signal-gold transition-all" />
                <button type="submit" className="w-full bg-signal-gold text-[#002244] py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-white transition-all">GENERATE DIAGNOSTIC</button>
              </form>
            ) : (
              <div className="py-10 space-y-4">
                <div className="flex justify-center"><Loader2 className="animate-spin text-signal-gold" size={40} /></div>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-[9px] text-emerald-500 h-32 overflow-hidden shadow-inner">
                  {scanLog.map((log, i) => <div key={i}>> {log}</div>)}
                </div>
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-40">
               <p className="text-[8px] font-black uppercase tracking-[0.2em]">LP-SYS-V4.5</p>
               <ShieldCheck size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PATTERN SECTION */}
      <section className="py-32 px-10 md:px-20 lg:px-40 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-slate-100 relative">
              <img src="https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/LaunchPath%20Vince.png" alt="Vince" className="w-full grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute bottom-0 left-0 w-full bg-[#002244] py-6 text-center">
                <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.4em]">SYSTEM CUSTODIAN</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-signal-gold p-8 rounded-3xl shadow-2xl border-8 border-white hidden lg:block group-hover:rotate-12 transition-transform">
               <ShieldCheck size={40} className="text-[#002244]" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-10">
            <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] uppercase tracking-tighter leading-[0.95]">
              I'VE WATCHED THIS <br/><span className="text-red-600 italic">FAIL 200 TIMES.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-bold leading-relaxed border-l-8 border-slate-200 pl-10">
              Systems aren't elective; they are survival. I refuse to reverse the order of wisdom. <span className="text-[#002244]">Order precedes revenue.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. WARNING SECTION */}
      <section className="py-32 px-10 md:px-20 lg:px-40 bg-[#020617] border-y border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tight leading-none text-white">SYSTEM <br/>ACCESS <br/><span className="text-red-600 italic">WARNING.</span></h2>
            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-md">
              If you are using home-spun files or "winging it," your authority is currently in a state of terminal exposure.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { title: "Driver Qualification Files", desc: "Fragmented documentation that fails the 48-hour federal reach test." },
              { title: "Insurance Lapse", desc: "Missing renewal buffers that trigger immediate authority termination." },
              { title: "Hours of Service", desc: "Unassigned mileage traps that prove lack of systemic control." }
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
                <div>
                  <h4 className="font-black uppercase tracking-tight text-white group-hover:text-signal-gold transition-colors">{card.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{card.desc}</p>
                </div>
                <ChevronRight size={20} className="text-white/20" />
              </div>
            ))}
            <div className="pt-10">
               <Link to="/reach-test" className="bg-red-600 text-white px-16 py-8 rounded-2xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center w-full active:scale-95 border-b-8 border-red-900">
                 TAKE THE RISK TEST
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 16 DEADLY SINS MATRIX */}
      <section className="py-32 px-10 md:px-20 bg-[#020617] relative">
        <div className="max-w-[1600px] mx-auto space-y-32">
          <header className="text-center space-y-6">
             <div className="w-20 h-20 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto border border-red-600/20"><ShieldX size={40} className="text-red-600" /></div>
             <h2 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tighter text-white">THE 16 DEADLY SINS OF <br/><span className="text-red-600 italic">CARRIER FAILURE.</span></h2>
             <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-500 italic">Identification of high-probability failure patterns used by investigators</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {riskDomains.map((domain, i) => (
              <div key={i} className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-signal-gold border-b border-white/10 pb-4 flex items-center"><ChevronDown size={14} className="mr-2" /> {domain.domain}</h3>
                <div className="space-y-4">
                  {domain.items.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-4 group hover:border-red-600/30 transition-all">
                       <span className="text-[9px] font-black text-slate-600">FAULT-{item.id}</span>
                       <h4 className="text-base font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors leading-tight">{item.text}</h4>
                       <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Result</span>
                          <span className="text-[10px] font-black text-red-500 uppercase">{item.result}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE EXECUTIVE STANDARD */}
      <section className="py-48 px-10 md:px-20 bg-[#FAF9F6]">
        <header className="text-center mb-32 space-y-6">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">THE OUTCOME</p>
          <h2 className="text-5xl md:text-8xl font-black font-serif text-[#002244] uppercase tracking-tighter leading-none">THE <span className="text-signal-gold italic">EXECUTIVE</span> STANDARD.</h2>
          <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl mx-auto uppercase">The transformation from a driver with a dream to a carrier with infrastructure.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { letter: "D", title: "Audit-Ready Infrastructure", desc: "Establish a documentation standard where federal auditors find zero \"Reach Test\" hazards." },
             { letter: "A", title: "Preferred Risk Profile", desc: "Maintain a safety record that forces insurance underwriters to offer your business the lowest possible rates." },
             { letter: "F", title: "Financial Sovereignty", desc: "Use industrial-grade tracking to ensure every mile driven contributes to net wealth, not just revenue." }
           ].map((card, i) => (
             <div key={i} className="bg-white p-12 rounded-[4rem] border border-slate-200 flex flex-col items-center text-center space-y-10 group hover:shadow-2xl transition-all duration-700">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center font-black text-3xl text-signal-gold shadow-inner group-hover:scale-110 transition-transform">{card.letter}</div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black font-serif text-[#002244] uppercase tracking-tight leading-none group-hover:text-signal-gold transition-colors">{card.title}</h4>
                  <p className="text-base font-bold text-slate-500 uppercase tracking-tighter leading-relaxed">{card.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 6. THE MATH OF SURVIVAL */}
      <section className="py-48 px-10 md:px-20 bg-signal-gold text-[#002244]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 space-y-10">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center"><Target size={14} className="mr-2" /> FISCAL STABILIZATION</p>
            <h2 className="text-6xl md:text-9xl font-black font-serif uppercase tracking-tighter leading-[0.85]">THE MATH <br/>OF <span className="italic">SURVIVAL.</span></h2>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight max-w-xl">
               Monthly operating costs per truck currently range from $10,300 – $18,800. 
            </p>
            <div className="pt-10">
               <Link to="/tools/tco-calculator" className="bg-[#002244] text-white px-12 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[12px] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center w-fit border-b-8 border-black group">
                 CALCULATE YOUR MATH <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
             <div className="bg-[#002244] p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator size={140} /></div>
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

      {/* 7. FAQ SECTION */}
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

      {/* 8. FINAL CTA */}
      <section className="py-48 px-10 md:px-20 lg:px-40 text-center bg-[#002244] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 space-y-16">
           <h2 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tight text-white leading-none">BUILD YOUR CARRIER LIKE A <br/><span className="text-signal-gold italic">CARRIER EXECUTIVE.</span></h2>
           <div className="h-2 w-48 bg-signal-gold mx-auto rounded-full"></div>
           <p className="text-2xl md:text-4xl font-black text-white/50 max-w-4xl mx-auto uppercase tracking-tighter italic">"Order precedes revenue. Discipline precedes expansion. Wisdom precedes the riches."</p>
           <div className="flex flex-col sm:flex-row gap-8 justify-center pt-10">
              <Link to="/reach-test" className="bg-signal-gold text-[#002244] px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-white transition-all active:scale-95 border-b-8 border-slate-900">TAKE THE REACH TEST™</Link>
              <Link to="/pricing" className="bg-white/5 border-2 border-white/20 text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white/10 transition-all">ADMISSION PROTOCOL</Link>
           </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;