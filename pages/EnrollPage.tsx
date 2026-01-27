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
  Scale
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import RemediationProtocol from '../components/RemediationProtocol';

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
        throw new Error("Cloud synchronization service is currently unavailable. Please verify connection.");
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
      console.error("Enrollment Submission Failure:", err);
      setError({ 
        message: err.message || "System verification error. Please try again or contact support.",
        code: err.code || "UNKNOWN_ERROR"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
        <RemediationProtocol />
        
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-border-dark text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-black font-serif uppercase mb-6 text-authority-blue dark:text-white tracking-tight">Credentials Logged</h2>
              <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed max-w-md mx-auto mb-12">
                Your alignment profile is queued for administrative review. You have been granted immediate access to Phase 1 remediation protocols.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/operator-portal" className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-steel-blue transition-all active:scale-95">Enter Operator Portal</Link>
                <Link to="/" className="text-text-muted font-black uppercase tracking-widest text-[10px] hover:text-authority-blue">Return to Repository</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
      {/* 1. INSTITUTIONAL HEADER */}
      <section className="relative pt-32 pb-40 bg-white dark:bg-primary-dark border-b border-slate-100 dark:border-slate-800 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10 shadow-sm">
            <ShieldCheck size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Standard Admission Protocol v4.2</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter mb-8 leading-none">
            System <span className="text-signal-gold italic">Admission</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
            Entrance into the LaunchPath Standard is a formal verification sequence. We evaluate structural readiness to ensure systemic risk mitigation.
          </p>
        </div>
      </section>

      {/* 2. CLASSIFICATION GATE / FORM */}
      <section className="py-32 relative -mt-16 z-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-surface-dark p-12 md:p-16 rounded-[4.5rem] shadow-[0_40px_100px_-30px_rgba(30,58,95,0.15)] border border-white dark:border-border-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-signal-gold/40"></div>
            
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue/60 dark:text-slate-400">Registry Input Terminal</h3>
              <Lock size={16} className="text-slate-200 dark:text-slate-700" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900/50 p-6 rounded-3xl flex items-start space-x-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-red-500 text-white p-1.5 rounded-lg shadow-md">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-red-700 dark:text-red-400 mb-1">System Verification Fault</p>
                    <p className="text-[13px] font-bold text-red-600/80 dark:text-red-300/80 leading-relaxed">{error.message}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Carrier Operating Status</label>
                <div className="relative group">
                  <select 
                    required
                    className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base appearance-none cursor-pointer transition-all shadow-inner"
                    value={formData.carrierStatus}
                    onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                  >
                    <option value="">Select Verification Category</option>
                    <option value="Existing Carrier">Existing Motor Carrier (Active Authority)</option>
                    <option value="Pre-Authority">Pre-Authority (Verification of Intent)</option>
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Legal Entity Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      required 
                      placeholder="e.g. Integrity Hauling LLC"
                      className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.legalName}
                      onChange={e => setFormData({...formData, legalName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Registry Email</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      required 
                      type="email"
                      placeholder="legal@carrier.com"
                      className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {formData.carrierStatus === 'Existing Carrier' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">USDOT Number</label>
                    <input 
                      required 
                      placeholder="Required Field"
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.dotNumber}
                      onChange={e => setFormData({...formData, dotNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">MC Number</label>
                    <input 
                      required 
                      placeholder="Required Field"
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.mcNumber}
                      onChange={e => setFormData({...formData, mcNumber: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Capital Liquidity Verification</label>
                <div className="relative group">
                  <select 
                    required
                    className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base appearance-none cursor-pointer transition-all shadow-inner"
                    value={formData.capitalStatus}
                    onChange={e => setFormData({...formData, capitalStatus: e.target.value})}
                  >
                    <option value="">Select Liquidity Level</option>
                    <option value="Under 10k">Less than $10,000 (Red Flag)</option>
                    <option value="10k-20k">$10,000 - $20,000</option>
                    <option value="20k-50k">$20,000 - $50,000</option>
                    <option value="Over 50k">Over $50,000 (Recommended)</option>
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={20} />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-3" /> : <RefreshCw className="mr-3" />}
                Submit Admission Credentials
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;