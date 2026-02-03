
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield,
  Layers,
  ChevronRight,
  Briefcase,
  Calculator,
  Loader2,
  CheckCircle2,
  Lock,
  Zap,
  Activity,
  ShieldAlert,
  Fingerprint,
  XCircle,
  Quote,
  Scale,
  Anchor,
  ShieldCheck,
  Map as MapIcon,
  Target,
  Radar,
  ChevronDown,
  Award,
  Truck,
  HelpCircle,
  MessageCircle,
  Skull,
  AlertOctagon,
  AlertCircle,
  ClipboardCheck,
  Cpu,
  FileText,
  DollarSign,
  CreditCard,
  Building2,
  Play
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const InstitutionalLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center space-x-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full mb-6">
    <span className="flex h-1.5 w-1.5 rounded-full bg-signal-gold animate-pulse"></span>
    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">{children}</span>
  </div>
);

// Fix: Changed title and subtitle to React.ReactNode to handle JSX content and resolve children requirement errors
const SectionHeading = ({ title, subtitle, centered = false }: { title: React.ReactNode; subtitle: React.ReactNode; centered?: boolean }) => (
  <div className={`space-y-6 ${centered ? 'text-center mx-auto' : 'text-left'}`}>
    <InstitutionalLabel>{subtitle}</InstitutionalLabel>
    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white tracking-tighter uppercase leading-[0.9]">
      {title}
    </h2>
  </div>
);

const FAQItem: React.FC<{ 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  icon: React.ReactNode;
  onClick: () => void 
}> = ({ question, answer, isOpen, icon, onClick }) => {
  return (
    <article className={`border transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
      isOpen 
      ? 'border-authority-blue bg-white dark:bg-surface-dark shadow-2xl ring-1 ring-authority-blue/5' 
      : 'border-slate-100 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-authority-blue/20'
    }`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-10 text-left focus:outline-none group"
      >
        <div className="flex items-center space-x-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isOpen ? 'bg-authority-blue text-signal-gold shadow-lg' : 'bg-slate-50 dark:bg-gray-800 text-slate-300'
          }`}>
            {icon}
          </div>
          <span className={`text-xl font-black tracking-tight uppercase transition-colors duration-300 ${
            isOpen ? 'text-authority-blue dark:text-signal-gold' : 'text-slate-700 dark:text-text-dark-primary'
          }`}>
            {question}
          </span>
        </div>
        <div className={`p-2 rounded-full transition-all duration-500 ${
          isOpen ? 'bg-authority-blue text-white rotate-180 shadow-lg' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200'
        }`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-10' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-10 pt-0 text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed border-t border-slate-50 dark:border-border-dark mt-2 pt-8">
            <p className="text-lg whitespace-pre-wrap">{answer}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const destination = `/readiness?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;
    try {
      if (db) {
        await addDoc(collection(db, "admissionInquiries"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "homepage-v5-hero"
        });
      }
      navigate(destination);
    } catch (err) { navigate(destination); } finally { setLoading(false); }
  };

  return (
    <div id="main-content" className="animate-in fade-in duration-1000 relative overflow-x-hidden bg-white dark:bg-primary-dark font-sans selection:bg-signal-gold/30">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 md:pt-48 bg-white dark:bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#1e3a5f_0.8px,transparent_0.8px)] [background-size:48px:48px] opacity-[0.04]"></div>
        
        <div className="max-w-[1700px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start relative z-10">
          <div className="lg:col-span-7 space-y-12 animate-in slide-in-from-left duration-1000">
            <SectionHeading 
              subtitle="Institutional FMCSA Safety Standards" 
              title={<>PROTECT YOUR <br/><span className="italic text-signal-gold underline decoration-authority-blue/10 underline-offset-[16px]">AUTHORITY</span> WITH <br/>ABSOLUTE ORDER.</>} 
            />
            
            <div className="max-w-3xl border-l-[10px] border-authority-blue dark:border-signal-gold pl-12 py-4 space-y-8">
              <p className="text-2xl sm:text-3xl font-black uppercase text-authority-blue dark:text-white leading-[1.1] tracking-tight">
                LaunchPath is a structured setup standard for new motor carriers. We verify stewardship before you begin hauling.
              </p>
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] leading-relaxed">
                THE STANDARD FOR TECHNICAL INTEGRITY AND LONG-TERM VIABILITY.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <Link to="/reach-test" className="w-full sm:w-auto bg-authority-blue text-white px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 border-b-[12px] border-slate-900 flex items-center justify-center group">
                Initiate REACH Test™ <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto bg-transparent border-2 border-slate-200 dark:border-white/10 text-authority-blue dark:text-white px-14 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center">
                Review Program Standard
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5 w-full animate-in slide-in-from-bottom-12 duration-1000 delay-200">
            <div className="bg-white dark:bg-surface-dark p-12 md:p-16 rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(30,58,95,0.2)] border border-slate-100 dark:border-border-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform">
                <ShieldAlert size={220} />
              </div>
              
              <div className="relative z-10 space-y-12">
                <header className="flex justify-between items-start">
                   <div>
                     <h3 className="text-[10px] font-black uppercase text-authority-blue/50 dark:text-signal-gold tracking-[0.5em] mb-3">FORMAL REGISTRY</h3>
                     <h3 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">ADMISSION <br/>INQUIRY</h3>
                   </div>
                   <div className="w-12 h-12 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-300 shadow-inner">
                     <Lock size={18} />
                   </div>
                </header>
                
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">FULL LEGAL NAME</label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-8 py-6 rounded-[2rem] font-bold transition-all shadow-inner text-base dark:text-white" 
                      placeholder="Input Name..." 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">REGISTRY EMAIL</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue outline-none px-8 py-6 rounded-[2rem] font-bold transition-all shadow-inner text-base dark:text-white" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-authority-blue text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center group"
                  >
                    {loading ? <Loader2 className="animate-spin mr-3" /> : <ChevronRight className="mr-3" size={20} />}
                    REQUEST SYSTEM ACCESS
                  </button>
                </form>
                <div className="pt-4 flex items-center justify-center space-x-3 opacity-40">
                  <Fingerprint size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Biometric Data Encyption Active</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 2. THE FAILURE TRAP */}
      <section className="py-32 lg:py-60 bg-authority-blue dark:bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          <div className="lg:col-span-7 space-y-12">
            <InstitutionalLabel>Structural Risk Exposure</InstitutionalLabel>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black font-serif leading-[0.85] tracking-tighter uppercase">
              FAILURE IS <br/>A <span className="text-signal-gold italic">SETUP</span> <br/>PROBLEM.
            </h2>
            
            <div className="max-w-2xl border-l-[12px] border-signal-gold pl-12 py-4">
              <p className="text-2xl sm:text-3xl font-black uppercase leading-tight mb-8 tracking-tight text-white/90">
                Most carriers fail because they enter structurally exposed. Small mistakes today create terminal risks tomorrow.
              </p>
              <p className="text-lg opacity-80 leading-relaxed font-medium mb-12 italic">
                "We don't rely on luck. We build engineering controls into your business model so the federal audit is an effortless reflection of your standard."
              </p>
              <Link to="/readiness" className="bg-white text-authority-blue px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-signal-gold hover:text-white transition-all shadow-2xl inline-flex items-center group">
                Diagnose Compliance Gaps <ArrowRight className="ml-4 group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-20 bg-signal-gold opacity-10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] border border-white/20 relative z-10 text-authority-blue group">
               <h3 className="text-3xl font-black font-serif uppercase tracking-tight leading-[1.1] text-authority-blue mb-12">Institutional <br/>Hardening</h3>
               <div className="space-y-6">
                  {[
                    "DQ File Framework Integrity",
                    "Clearinghouse Governance",
                    "HOS Policy Installation",
                    "Maintenance Stewardship"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-7 bg-slate-50 rounded-[2rem] border border-slate-100 group/item hover:bg-white hover:shadow-xl hover:border-authority-blue/20 transition-all duration-300">
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center group-hover/item:border-signal-gold transition-all">
                            <ShieldCheck size={20} className="text-slate-300 group-hover/item:text-signal-gold" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-slate-700 leading-tight group-hover/item:text-authority-blue transition-colors">
                            {item}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="absolute -bottom-8 -right-8 p-6 bg-signal-gold rounded-3xl shadow-2xl group-hover:rotate-6 transition-transform">
                  <Lock className="text-authority-blue" size={32} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FOUR PILLARS (REFINED GRID) */}
      <section className="py-32 lg:py-60 bg-white dark:bg-primary-dark">
        <div className="max-w-[1600px] mx-auto px-6">
          <SectionHeading centered subtitle="The Operational Framework" title={<>The Four <span className="text-signal-gold italic">Pillars.</span></>} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-32">
             {[
               { icon: <Briefcase />, title: "Authority Protection", tag: "STRUCTURAL STEWARDSHIP", desc: "Manage federal authority as an entrusted asset. Build a foundation that survives administrative scrutiny." },
               { icon: <Shield />, title: "Insurance Continuity", tag: "RISK RESPONSIBILITY", desc: "Protect your right to operate. Maintain coverage by documenting safety as a non-negotiable discipline." },
               { icon: <Layers />, title: "Compliance Backbone", tag: "SYSTEMIC INTEGRITY", desc: "Execute federal standards with precision. Verifiable systems that prove your compliance daily." },
               { icon: <Calculator />, title: "Cash-Flow Oxygen", tag: "FISCAL STEWARDSHIP", desc: "Securing the mission through economic truth. TCO math ensures your business remains solvent." }
             ].map((pillar, i) => (
               <article key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border border-slate-100 dark:border-border-dark flex flex-col text-center group hover:shadow-2xl transition-all duration-500">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-inner group-hover:scale-110 transition-transform">
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-3 font-serif tracking-tight">{pillar.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold mb-8">{pillar.tag}</p>
                  <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* 4. THE 16 DEADLY SINS (STRATEGIC LIST) */}
      <section className="py-32 lg:py-60 bg-slate-50 dark:bg-primary-dark border-t border-slate-200 dark:border-border-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <header className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <SectionHeading subtitle="Audit Failure Vectors" title={<>The 16 <br/><span className="text-red-600 italic">Deadly Sins.</span></>} />
            <div className="max-w-xl p-10 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-[3rem] shadow-sm">
               <Skull className="text-red-600 mb-6" size={40} />
               <p className="text-xl font-bold text-red-800 dark:text-red-400 leading-relaxed uppercase tracking-tight">
                 Over 30 audit-level violations mapped to their regulatory consequence. Do not launch without identifying these vectors.
               </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: "01", t: "Drug Program Absence", s: "TERMINAL" },
              { id: "02", t: "OOS Vehicle Dispatch", s: "TERMINAL" },
              { id: "03", t: "Revoked License Use", s: "CRITICAL" },
              { id: "04", t: "DQ File Negligence", s: "HIGH RISK" },
              { id: "05", t: "Insurance Filings Gap", s: "CRITICAL" },
              { id: "06", t: "HOS Falsification", s: "TERMINAL" },
              { id: "07", t: "Clearinghouse Error", s: "HIGH RISK" },
              { id: "08", t: "Late Accident Record", s: "CRITICAL" }
            ].map((sin, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-border-dark shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <span className="absolute -top-4 -right-4 text-7xl font-black opacity-5 text-slate-900 dark:text-white">{sin.id}</span>
                <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase leading-tight mb-8 relative z-10">{sin.t}</h4>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                  sin.s === 'TERMINAL' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  <AlertOctagon size={10} />
                  <span>{sin.s} VECTOR</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL CALL TO ACTION */}
      <section className="py-32 lg:py-64 bg-white dark:bg-primary-dark text-center">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          <div className="space-y-8">
            <h2 className="text-5xl sm:text-7xl lg:text-[10rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter leading-[0.85]">
              STAY <br/><span className="text-signal-gold italic underline decoration-authority-blue/5 underline-offset-[32px]">OPERATING.</span>
            </h2>
            <p className="text-2xl sm:text-3xl text-slate-500 font-extrabold max-w-3xl mx-auto leading-relaxed uppercase tracking-tight">
              Build your carrier on systems that survive the 18-month New Entrant window.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link to="/readiness" className="w-full sm:w-auto bg-authority-blue text-white px-16 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[12px] hover:bg-steel-blue transition-all shadow-[0_30px_60px_-15px_rgba(30,58,95,0.4)] active:scale-95 border-b-[16px] border-slate-900 group">
              Apply For Admission <ArrowRight size={24} className="ml-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/faq" className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 hover:text-authority-blue transition-colors">
              Technical Q&A Terminal
            </Link>
          </div>
          
          <footer className="pt-20 border-t border-slate-100 dark:border-border-dark flex flex-col items-center gap-8">
             <div className="flex items-center gap-12 grayscale opacity-30">
               <ShieldCheck size={32} />
               <Target size={32} />
               <Award size={32} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-300 dark:text-slate-700 italic">SYSTEM REGISTRY IDENTIFIER: NC-LP-V5.0 — END OF REPOSITORY BRIEF</p>
          </footer>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
