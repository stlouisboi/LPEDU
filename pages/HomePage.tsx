import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Shield,
  Activity,
  UserCheck,
  ShieldAlert,
  FileWarning,
  Layers,
  ChevronDown,
  ChevronRight,
  Lock,
  MousePointer2,
  Briefcase,
  Award,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  AlertCircle,
  Clock,
  Calendar,
  CreditCard,
  Scale,
  HelpCircle,
  MoveDown,
  MoveRight,
  MoveLeft,
  MoveUp,
  Skull,
  Zap,
  Calculator,
  Sparkles,
  Server,
  Fingerprint,
  CheckCircle,
  Verified,
  Anchor,
  Settings,
  ClipboardList,
  Target,
  FileSearch,
  Cpu,
  Trophy,
  History,
  XCircle,
  AlertOctagon,
  FileText,
  MapPin,
  Loader2,
  Mail,
  Send
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import TrustArchitecture from '../components/TrustArchitecture';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const destination = `/download/risk-map?name=${encodeURIComponent(formData.firstName || 'Carrier')}`;

    try {
      // 1. Internal Lead Tracking (Firebase)
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: formData.firstName || 'Carrier',
          email: formData.email,
          downloadedAt: serverTimestamp(),
          source: "risk-assessment-hero"
        });
      }

      // 2. Email Automation (MailerLite)
      const mailerliteId = (process.env as any).VITE_MAILERLITE_FORM_ID;
      const mailerliteKey = (process.env as any).VITE_MAILERLITE_API_KEY;

      if (mailerliteId && mailerliteKey) {
        await fetch(`https://connect.mailerlite.com/api/subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mailerliteKey}`
          },
          body: JSON.stringify({
            email: formData.email,
            fields: { name: formData.firstName },
            groups: [mailerliteId]
          })
        }).catch(err => console.error("MailerLite Integration Failure:", err));
      }

      navigate(destination);
    } catch (err: any) {
      console.error("Critical Submission Error:", err);
      navigate(destination);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsLoading(true);
    
    const mailerliteId = (process.env as any).VITE_MAILERLITE_FORM_ID;
    const mailerliteKey = (process.env as any).VITE_MAILERLITE_API_KEY;

    try {
      if (mailerliteId && mailerliteKey) {
        const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${mailerliteKey}`
          },
          body: JSON.stringify({
            email: newsletterEmail,
            groups: [mailerliteId]
          })
        });

        if (response.ok) {
          alert("Verification sequence initiated. Check your inbox.");
          setNewsletterEmail('');
        } else {
          throw new Error("MailerLite API rejection");
        }
      } else {
        console.warn("MailerLite credentials missing in environment variables.");
        alert("Configuration error. Please contact the administrator.");
      }
    } catch (error) {
      console.error("Newsletter registration failed", error);
      alert("Registration failed. Please try again or check your connectivity.");
    } finally {
      setNewsLoading(false);
    }
  };

  const pillars = [
    { 
      t: "Authority Protection", 
      focus: "Structural Fortress",
      d: "Establish a legal foundation designed to withstand federal scrutiny and separate personal assets from liability.", 
      icon: <Briefcase />,
      link: "/learning-path",
      secondaryLink: "/clarification",
      accent: "border-authority-blue",
      bgHover: "hover:bg-authority-blue/5",
      iconColor: "text-authority-blue"
    },
    { 
      t: "Insurance Continuity", 
      focus: "Premium Stability",
      d: "Eliminate the “30-Day Trap.” Install the documentation processes underwriters require to maintain coverage.", 
      icon: <Shield />,
      link: "/clarification",
      secondaryLink: "/learning-path",
      accent: "border-signal-gold",
      bgHover: "hover:bg-signal-gold/5",
      iconColor: "text-signal-gold"
    },
    { 
      t: "Compliance Backbone", 
      focus: "16-Exposure Defense",
      d: "Replace guesswork with documented compliance. Install the Exposure-vs-Refuge framework for DQ files.", 
      icon: <Layers />,
      link: "/readiness",
      secondaryLink: "/resources",
      accent: "border-steel-blue",
      bgHover: "hover:bg-steel-blue/5",
      iconColor: "text-steel-blue"
    },
    { 
      t: "Cash-Flow Oxygen", 
      focus: "TCO Survival Math",
      d: "Eliminate revenue blindness. Use the TCO framework to identify real break-even thresholds and profit.", 
      icon: <Calculator />,
      link: "/tools/tco-calculator",
      secondaryLink: "/readiness",
      isTool: true,
      accent: "border-emerald-600",
      bgHover: "hover:bg-emerald-600/5",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 relative overflow-x-hidden bg-primary-light dark:bg-primary-dark font-sans text-authority-blue leading-relaxed">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] lg:min-h-screen flex items-center w-full bg-authority-blue overflow-hidden py-24 lg:py-56">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-7 text-center lg:text-left space-y-12 lg:space-y-16">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white shadow-xl animate-reveal-up mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-signal-gold animate-pulse"></span>
                <span>Institutional FMCSA Standard LP-2026</span>
              </div>
              
              <h1 id="hero-heading" className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight sm:tracking-tighter text-white font-serif uppercase drop-shadow-sm animate-reveal-up">
                Protect Your <br className="hidden sm:block"/><span className="text-signal-gold italic">Authority</span> <br className="hidden sm:block"/>Before Mistakes <br className="hidden sm:block"/>Cost You.
              </h1>
              
              <div className="animate-reveal-up max-w-2xl mx-auto lg:mx-0 space-y-8" style={{ animationDelay: '0.1s' }}>
                <div className="pt-2 border-l-4 border-signal-gold pl-8">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-relaxed">
                      First-time interstate owner-operators in the initial 90-day authority window — a narrow season of instruction, preparation, and stewardship.
                    </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-6 animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/pricing" className="w-full sm:w-auto bg-white text-authority-blue px-12 py-7 rounded-2xl font-black text-xs hover:bg-signal-gold hover:text-white transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-4 border-slate-200">
                  Admission Protocol
                  <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
                <Link to="/learning-path" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-12 py-7 rounded-2xl font-black text-xs hover:bg-white/10 transition-all flex items-center justify-center active:scale-95 uppercase tracking-[0.2em]">
                  View System Roadmap
                </Link>
              </div>
            </div>

            {/* HERO FORM */}
            <div className="lg:col-span-5 animate-reveal-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                  <Shield size={160} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black font-serif text-authority-blue dark:text-white mb-4 uppercase tracking-tight">The 90-Day Risk Map™</h3>
                  <p className="text-sm text-text-muted dark:text-text-dark-muted mb-10 font-bold leading-relaxed">
                    Identify the top failure points for new entrants. Get the visual diagnostic map sent to your terminal.
                  </p>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">First Name</label>
                      <input 
                        required 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none px-6 py-4 rounded-2xl font-bold transition-all shadow-inner dark:text-white" 
                        placeholder="Operator Name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                      <input 
                        required 
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none px-6 py-4 rounded-2xl font-bold transition-all shadow-inner dark:text-white" 
                        placeholder="registry@carrier.com" 
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full bg-authority-blue text-white py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] shadow-xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-4 border-slate-900 group"
                    >
                      {loading ? <Loader2 className="animate-spin mr-3" /> : <ShieldCheck className="mr-3 group-hover:rotate-12 transition-transform" size={18} />}
                      Transmit Diagnostic Map
                    </button>
                    <p className="text-[9px] text-center text-slate-400 uppercase tracking-widest font-black opacity-50">Secure Registry Link • No Marketing Spam</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-slate-50 dark:bg-primary-dark py-20 border-b border-slate-200 dark:border-border-dark">
         <div className="max-w-7xl mx-auto px-5">
           <p className="text-[11px] font-black text-center text-slate-400 uppercase tracking-[0.5em] mb-12">Institutional Trust Architecture</p>
           <TrustArchitecture />
         </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="py-32 lg:py-56 bg-white dark:bg-primary-dark relative">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32 items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-5 py-2 rounded-full text-authority-blue">
                <Target size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Core Framework</span>
              </div>
              <h2 className="text-5xl lg:text-[6rem] font-black font-serif text-authority-blue dark:text-white uppercase leading-none tracking-tighter">The Four <span className="text-signal-gold italic">Pillars</span></h2>
            </div>
            <p className="text-xl sm:text-2xl text-slate-500 font-extrabold leading-relaxed border-l-4 border-signal-gold pl-8 max-w-xl">
              Compliance is not an administrative task; it is the physical evidence of stewardship. We build your carrier on these stable foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {pillars.map((p, i) => (
              <div key={i} className={`group p-10 sm:p-16 rounded-[4rem] border-2 transition-all duration-500 ${p.accent} ${p.bgHover} relative overflow-hidden flex flex-col justify-between h-full`}>
                <div className="relative z-10">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mb-10 shadow-lg bg-white dark:bg-gray-800 ${p.iconColor}`}>
                    {React.cloneElement(p.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{p.focus}</p>
                  <h3 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-6 leading-none">{p.t}</h3>
                  <p className="text-lg sm:text-xl font-bold text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-sm">{p.d}</p>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                  <Link to={p.link} className={`w-full sm:w-auto text-center px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-authority-blue text-white shadow-xl hover:scale-105 active:scale-95 transition-all`}>
                    Enter Pillar
                  </Link>
                  <Link to={p.secondaryLink} className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-authority-blue transition-colors flex items-center group/link">
                    Protocol Brief <ChevronRight size={14} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER / COMPLIANCE BULLETIN */}
      <section className="py-32 lg:py-48 bg-authority-blue relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="bg-white/5 border border-white/10 p-12 lg:p-24 rounded-[5rem] backdrop-blur-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="absolute top-0 left-0 w-32 h-32 bg-signal-gold/20 rounded-full blur-[100px] -translate-x-16 -translate-y-16"></div>
            
            <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
               <div className="inline-flex items-center space-x-3 bg-white/10 px-6 py-2.5 rounded-full border border-white/20 shadow-2xl">
                 <Mail className="text-signal-gold" size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Institutional Updates</span>
               </div>
               <h2 className="text-4xl lg:text-[5rem] font-black font-serif text-white uppercase leading-none tracking-tighter">Stay <span className="text-signal-gold italic">Audit</span> Ready.</h2>
               <p className="text-xl lg:text-2xl text-white/70 font-extrabold leading-relaxed max-w-xl">
                 Join 5,000+ motor carriers receiving our weekly <span className="text-white">Compliance Ledger</span>. Technical regulatory alerts, direct from the LaunchPath terminal.
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                 <div className="flex items-center space-x-2 text-white">
                   <CheckCircle size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Regulatory Alerts</span>
                 </div>
                 <div className="flex items-center space-x-2 text-white">
                   <CheckCircle size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">HOS Protocols</span>
                 </div>
                 <div className="flex items-center space-x-2 text-white">
                   <CheckCircle size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Stewardship Logic</span>
                 </div>
               </div>
            </div>

            <div className="lg:w-1/2 w-full max-w-xl">
               <div className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
                  <form onSubmit={handleNewsletterSignup} className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 block">Terminal Email</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                          <input 
                            required 
                            type="email"
                            value={newsletterEmail}
                            onChange={e => setNewsletterEmail(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none pl-16 pr-8 py-6 rounded-3xl font-black text-lg transition-all shadow-inner dark:text-white placeholder:text-slate-300" 
                            placeholder="operator@fleet.com" 
                          />
                        </div>
                     </div>
                     <button 
                        disabled={newsLoading}
                        className="w-full bg-authority-blue text-white py-8 rounded-3xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-8 border-slate-900 group disabled:opacity-50"
                     >
                        {newsLoading ? <Loader2 className="animate-spin mr-4" size={24} /> : <Send className="mr-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />}
                        Initiate Bulletin Sequence
                     </button>
                     <div className="flex items-center justify-center space-x-3 text-slate-400 opacity-60">
                        <Lock size={12} />
                        <p className="text-[9px] font-black uppercase tracking-widest">Registry Privacy Standards Active</p>
                     </div>
                  </form>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 lg:py-64 bg-white dark:bg-primary-dark">
         <div className="max-w-5xl mx-auto px-5 text-center space-y-16">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-authority-blue/5 rounded-[3rem] border border-authority-blue/10 flex items-center justify-center mx-auto shadow-inner">
               <ShieldCheck size={64} className="text-authority-blue dark:text-signal-gold" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-[7rem] font-black font-serif text-authority-blue dark:text-white uppercase leading-none tracking-tighter">Your Authority. <br/><span className="text-signal-gold italic">Your Legacy.</span></h2>
            <p className="text-xl sm:text-3xl text-slate-500 font-extrabold max-w-3xl mx-auto leading-relaxed uppercase tracking-widest">
              Moving from administrative exposure to systematic operating posture.
            </p>
            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
               <Link to="/pricing" className="bg-authority-blue text-white px-16 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[12px] hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center group border-b-[10px] border-slate-900">
                 Initiate Admission Protocol
                 <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] pt-12">The Standard • LP-2026-V5</p>
         </div>
      </section>

    </div>
  );
};

export default HomePage;