
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Building2,
  Mail,
  Zap,
  Cpu,
  Shield,
  FileSearch,
  Terminal,
  Server
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const EnrollPage: React.FC = () => {
  const [formData, setFormData] = useState({
    carrierStatus: '',
    legalName: '',
    email: '',
    dotNumber: '',
    mcNumber: '',
    capitalStatus: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<{message: string, code?: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!db) {
        throw new Error("Registry synchronization offline.");
      }

      await addDoc(collection(db, "admissionInquiries"), {
        ...formData,
        submittedAt: serverTimestamp(),
        metadata: {
          platform: 'web_v4',
          origin: 'enrollment_protocol'
        }
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError({ message: "Verification failed. Check local network connectivity." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
        <section className="py-24 md:py-40">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            
            <div className="bg-white dark:bg-surface-dark p-12 md:p-24 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-border-dark relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <ShieldCheck size={300} className="text-authority-blue" />
              </div>
              
              <div className="w-24 h-24 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-green-500/20">
                <ShieldCheck size={48} />
              </div>

              <div className="space-y-8 relative z-10">
                <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-green-600">Verification Result: SUCCESS</h2>
                <h1 className="text-4xl md:text-6xl font-black font-serif uppercase text-authority-blue dark:text-white tracking-tighter leading-none">APPLICATION <br/><span className="text-signal-gold italic">ACCEPTED.</span></h1>
                <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-xl mx-auto">
                  Your entity data has been securely logged. The LaunchPath Implementation terminal is preparing your personalized onboarding sequence.
                </p>
                <div className="pt-12">
                  <button className="bg-authority-blue text-white px-16 py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-steel-blue transition-all border-b-8 border-slate-900 active:scale-95">
                    ACCESS SYSTEM TERMINAL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
      {/* 1. INSTITUTIONAL HEADER */}
      <section className="relative pt-32 pb-44 bg-white dark:bg-primary-dark border-b border-slate-100 dark:border-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px:40px] opacity-20"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-12 shadow-sm">
            <Cpu size={16} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">System Registry: Admission Protocol LP-ENT-V4</span>
          </div>
          <h1 className="text-6xl lg:text-[8rem] font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter mb-10 leading-[0.85]">
            Secure <span className="text-signal-gold italic">Admission</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-text-dark-muted font-black uppercase tracking-tight max-w-3xl mx-auto leading-relaxed">
            The standard is a controlled environment. admission is a formal verification of carrier intent, capital readiness, and stewardship alignment.
          </p>
        </div>
      </section>

      {/* 2. PRICE & VALUE PROPOSITION */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Investment Logic */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-authority-blue p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden border-b-[12px] border-slate-900">
               <div className="absolute top-0 right-0 p-10 opacity-5"><Shield size={200} /></div>
               <div className="relative z-10 space-y-10">
                  <div className="space-y-4">
                    <p className="text-signal-gold text-[10px] font-black uppercase tracking-[0.4em]">INVESTMENT FRAMEWORK</p>
                    <h3 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight">One-Time <br/>$3,500 <br/><span className="text-signal-gold italic">System Entry.</span></h3>
                  </div>
                  <div className="h-px w-full bg-white/10"></div>
                  <p className="text-lg font-bold text-white/70 leading-relaxed italic">
                    "We do not sell information. We install infrastructure. $3,500 represents the cost of establishing a high-integrity safety posture before operational commencement."
                  </p>
                  <ul className="space-y-6">
                    {[
                      "90-Day Implementation Architecture",
                      "The Four Pillars Operating Manual",
                      "Automated DQ File Workflows",
                      "Private Institutional Advisor Access",
                      "Registry Identification Mapping"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-slate-300">
                        <Zap size={14} className="text-signal-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            <div className="p-10 border-2 border-slate-100 dark:border-white/5 rounded-[3rem] space-y-6 bg-white/50 backdrop-blur-sm">
               <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold">
                  <FileSearch size={24} />
                  <h4 className="text-sm font-black uppercase tracking-widest">Eligibility Filter</h4>
               </div>
               <p className="text-base text-slate-500 font-bold leading-relaxed">
                 Admission is not guaranteed. Applicants displaying systemic capital fragility (less than $10k reserves) will be redirected to preliminary orientation resources.
               </p>
            </div>
          </div>

          {/* Right Column: Admission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] md:rounded-[5rem] shadow-[0_60px_120px_-30px_rgba(30,58,95,0.22)] border border-white dark:border-border-dark relative">
              <div className="flex items-center justify-between mb-16">
                 <h3 className="text-xs font-black uppercase tracking-[0.5em] text-authority-blue/40 dark:text-white/20 flex items-center">
                   <Server size={14} className="mr-3" /> ADMISSION_INPUT_TERMINAL
                 </h3>
                 <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {error && (
                  <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/50 p-8 rounded-[2rem] flex items-start space-x-5 animate-in slide-in-from-top-4">
                    <AlertTriangle className="text-red-600 mt-1" size={24} />
                    <div>
                      <p className="font-black uppercase tracking-widest text-red-700 text-xs">Credential Validation Error</p>
                      <p className="text-sm font-bold text-red-600/80 mt-1">{error.message}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4 block">Select Carrier Classification</label>
                  <div className="relative group">
                    <select 
                      required
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none font-black text-sm appearance-none cursor-pointer transition-all shadow-inner"
                      value={formData.carrierStatus}
                      onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                    >
                      <option value="">CLASS: SELECT...</option>
                      <option value="New">NEW AUTHORITY (PRE-LAUNCH)</option>
                      <option value="Existing">EXISTING CARRIER (REMEDIATION)</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4 block">Legal Entity Identity</label>
                    <div className="relative">
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        required 
                        placeholder="ENTITY NAME..."
                        className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none font-black text-sm transition-all shadow-inner"
                        value={formData.legalName}
                        onChange={e => setFormData({...formData, legalName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4 block">Registry Verification Email</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        required 
                        type="email"
                        placeholder="ADDRESS@CARRIER.COM"
                        className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none font-black text-sm transition-all shadow-inner"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4 block">Capital Liquidity Verification (Restricted access for under $10k)</label>
                  <div className="relative group">
                    <select 
                      required
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-authority-blue dark:focus:border-signal-gold outline-none font-black text-sm appearance-none cursor-pointer transition-all shadow-inner"
                      value={formData.capitalStatus}
                      onChange={e => setFormData({...formData, capitalStatus: e.target.value})}
                    >
                      <option value="">LIQUIDITY: SELECT...</option>
                      <option value="Restricted">UNDER $10,000 (INELIGIBLE)</option>
                      <option value="Tier1">$10,000 - $35,000</option>
                      <option value="Tier2">$35,000 - $75,000</option>
                      <option value="Tier3">OVER $75,000 (RECOMMENDED)</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={20} />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-authority-blue text-white py-8 md:py-10 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-xs md:text-sm shadow-[0_40px_80px_-20px_rgba(30,58,95,0.4)] hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-95 border-b-[12px] border-slate-900 group"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mr-4" size={24} /> : <Terminal className="mr-4 group-hover:rotate-12 transition-transform" size={24} />}
                    VALIDATE & SECURE ADMISSION
                  </button>
                  <div className="flex items-center justify-center space-x-6 mt-12 opacity-40">
                     <p className="text-[9px] font-black uppercase tracking-widest">SSL_ENCRYPTED_UPLINK</p>
                     <div className="h-1 w-1 rounded-full bg-slate-400"></div>
                     <p className="text-[9px] font-black uppercase tracking-widest">IP_MAPPED_AUDIT_LOG</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;
