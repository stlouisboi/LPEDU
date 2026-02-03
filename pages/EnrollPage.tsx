
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight,
  Lock,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Building2,
  Mail,
  Scale,
  Zap,
  Activity,
  CheckCircle,
  FileText
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
      if (!db) throw new Error("Synchronization offline. Check connection.");
      await addDoc(collection(db, "admissionInquiries"), {
        ...formData,
        submittedAt: serverTimestamp(),
        origin: 'enrollment_v5'
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError({ message: err.message || "Verification error.", code: err.code || "ERR" });
    } finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-1000">
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-border-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                <ShieldCheck size={300} />
              </div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-authority-blue text-signal-gold rounded-[2rem] flex items-center justify-center shadow-xl mb-12 border border-white/20">
                  <Lock size={32} />
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-8">Admission <br/><span className="text-signal-gold">Validated</span></h1>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-extrabold leading-relaxed mb-12">
                  Your entity credentials have been logged. The LaunchPath standard requires capital readiness verification before Implementation Access is granted.
                </p>
                <Link to="/pricing" className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-[12px] border-slate-900 group">
                  Finalize Access Protocol <ArrowRight size={18} className="ml-4 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
      <section className="relative pt-32 pb-44 bg-white dark:bg-primary-dark border-b border-slate-100 dark:border-border-dark overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-3 rounded-full mb-12 shadow-sm">
            <Scale size={18} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue">System Admission Protocol v5.0</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter mb-10 leading-none">
            Verified <span className="text-signal-gold italic">Admission</span>
          </h1>
          <p className="text-2xl text-slate-500 dark:text-text-dark-muted font-extrabold max-w-3xl mx-auto leading-relaxed">
            Transitioning from Orientation to Active Implementation requires formal credential verification.
          </p>
        </div>
      </section>

      <section className="py-32 relative -mt-20 z-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4.5rem] shadow-[0_80px_160px_-40px_rgba(30,58,95,0.25)] border border-white dark:border-border-dark relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6 block">Verification Category</label>
                <div className="relative group">
                  <select 
                    required
                    className="w-full px-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-lg appearance-none cursor-pointer transition-all shadow-inner"
                    value={formData.carrierStatus}
                    onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                  >
                    <option value="">Select Category...</option>
                    <option value="Existing Carrier">Existing Motor Carrier (Active DOT)</option>
                    <option value="Pre-Authority">Pre-Authority Applicant</option>
                  </select>
                  <ChevronDown className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6 block">Legal Entity Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
                    <input required placeholder="Legal Name..." className="w-full pl-20 pr-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold text-lg transition-all shadow-inner" value={formData.legalName} onChange={e => setFormData({...formData, legalName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6 block">Professional Registry Email</label>
                  <div className="relative">
                    <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={22} />
                    <input required type="email" placeholder="Email..." className="w-full pl-20 pr-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold text-lg transition-all shadow-inner" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6 block">Structural Capital Verification</label>
                <div className="relative group">
                  <select required className="w-full px-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold text-lg appearance-none cursor-pointer transition-all shadow-inner" value={formData.capitalStatus} onChange={e => setFormData({...formData, capitalStatus: e.target.value})}>
                    <option value="">Select Level...</option>
                    <option value="Level 1">$10k - $20k (Entry Level)</option>
                    <option value="Level 2">$20k - $50k (Stabilized)</option>
                    <option value="Level 3">Over $50k (Expansion Ready)</option>
                  </select>
                  <ChevronDown className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={24} />
                </div>
              </div>

              <button disabled={isSubmitting} className="w-full bg-authority-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-95 border-b-[12px] border-slate-900 group">
                {isSubmitting ? <Loader2 className="animate-spin mr-3" /> : <ShieldCheck className="mr-3" />}
                Transmit Verified Credentials
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;
