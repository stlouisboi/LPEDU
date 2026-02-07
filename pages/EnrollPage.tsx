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
  Scale,
  Shield,
  FileText,
  Activity,
  Zap,
  Info,
  ChevronRight,
  XCircle,
  DollarSign
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import RemediationProtocolBlock from '../components/RemediationProtocolBlock';

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
  const [showForm, setShowForm] = useState(false);
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
      <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 selection:bg-authority-blue/10">
        <section className="py-20 sm:py-24">
          <div className="max-w-4xl mx-auto px-6 space-y-8 sm:space-y-10">
            
            <RemediationProtocolBlock />

            <div className="bg-white dark:bg-surface-dark p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-border-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-none hidden sm:block">
                <ShieldCheck size={240} className="text-authority-blue" />
              </div>
              
              <div className="flex items-center space-x-5 mb-10 sm:mb-12">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <Lock size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Registry Result: APPROVED</p>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif uppercase text-authority-blue dark:text-white tracking-tight">ADMISSION APPROVED</h2>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 relative z-10">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed">
                    Based on your REACH Test™ classification and submitted admission credentials, your entity has been verified as eligible for entry into the LaunchPath Standard Implementation Environment.
                  </p>
                  <div className="h-px w-20 bg-signal-gold/30"></div>
                  <p className="text-sm sm:text-base text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed italic">
                    LaunchPath is not a course or subscription. Admission represents access to a structured operating standard designed to protect authority, insurance continuity, and long-term regulatory viability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-none hidden sm:block">
                 <Activity size={180} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-10 sm:space-y-12">
                <div className="space-y-4">
                  <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-signal-gold">THE INVESTMENT (ONE-TIME)</h3>
                  <p className="text-lg sm:text-xl text-white font-bold leading-relaxed max-w-2xl">
                    Entry into the LaunchPath Standard Implementation Environment requires a one-time implementation investment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="p-6 sm:p-8 bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 space-y-4">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Tier 1: Founding Cohort</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl sm:text-4xl font-black text-white">$2,500</span>
                       <span className="text-[9px] sm:text-[10px] font-bold text-signal-gold uppercase tracking-widest">Early Access</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-white/[0.02] rounded-2xl sm:rounded-3xl border border-white/5 space-y-4 opacity-60 grayscale">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Future Standard</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl sm:text-4xl font-black text-slate-400">$3,500</span>
                       <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Tier</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">SYSTEM INCLUSIONS</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-10">
                    {[
                      "Ground 0 qualification framework",
                      "Core safety management installation",
                      "Driver Qualification (DQ) file systems",
                      "Authority protection safeguards",
                      "90-Day implementation sequence",
                      "Vetted institutional service links",
                      "Private operator cohort access"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-tight">
                        <Zap size={14} className="text-signal-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <button className="w-full bg-authority-blue text-white py-6 sm:py-8 rounded-2xl sm:rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-[0.98] flex items-center justify-center border-b-[8px] sm:border-b-8 border-slate-900 group">
                PROCEED TO SECURE IMPLEMENTATION ACCESS
                <ArrowRight size={18} className="ml-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
      {/* 1. INSTITUTIONAL HEADER */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 bg-white dark:bg-primary-dark overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 sm:px-6 py-2 sm:2.5 rounded-full mb-8 sm:mb-10 shadow-sm">
            <ShieldCheck size={16} className="text-authority-blue" />
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Standard Admission Protocol v4.2</span>
          </div>
        </div>
      </section>

      {/* INVESTMENT SECTION - MATCHING PROVIDED IMAGE WITH MOBILE OPTIMIZATION */}
      <section className="py-4 sm:py-8 pb-24 sm:pb-32 bg-white dark:bg-primary-dark">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <p className="text-[12px] sm:text-[14px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-8 sm:mb-10">ENROLLMENT INVESTMENT</p>
            
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-12 mb-12 sm:mb-20">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-[0.85]">
                  ONE-TIME <br/><span className="text-signal-gold italic">ADMISSION.</span>
                </h2>
                <p className="text-base sm:text-xl font-bold text-slate-500 uppercase tracking-widest mt-4 sm:mt-6">
                  SINGLE PAYMENT. LIFETIME ACCESS. NO <br className="hidden sm:block" />RECURRING FEES.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <div className="relative">
                    <span className="text-[5rem] sm:text-[8rem] md:text-[9rem] lg:text-[11rem] font-black text-authority-blue dark:text-white leading-none tracking-tighter">
                    $2500
                    </span>
                </div>
                <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mt-2 sm:mt-6 lg:text-right">USD // INSTITUTIONAL TIER</p>
              </div>
            </div>

            <div className="h-px w-full bg-slate-100 dark:bg-white/5 mb-10 sm:mb-16"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-32">
              {/* Included */}
              <div className="space-y-8 sm:space-y-10">
                 <h3 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center">
                   <CheckCircle2 size={20} className="mr-3 sm:mr-4 shrink-0" /> WHAT'S INCLUDED
                 </h3>
                 <div className="space-y-4 sm:space-y-5">
                   {[
                     "Full 90-Day Implementation Curriculum",
                     "All Four Pillar Module Access",
                     "16 Deadly Sins Framework + Guards",
                     "TCO Calculator (Margin Master)",
                     "DQ File Templates & Documentation Systems",
                     "Drug & Alcohol Program Templates",
                     "Maintenance Governance System",
                     "Compliance Assistant Access",
                     "Resource Library (Templates, Checklists, References)",
                     "Implementation Calendar",
                     "Lifetime Updates"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center space-x-4 sm:space-x-5 text-sm sm:text-base font-bold text-slate-700 dark:text-text-dark-muted">
                       <div className="w-1.5 h-1.5 sm:w-2 h-2 rounded-full bg-signal-gold shrink-0"></div>
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Not Included */}
              <div className="space-y-8 sm:space-y-10">
                 <h3 className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-red-600 flex items-center">
                   <XCircle size={20} className="mr-3 sm:mr-4 shrink-0" /> WHAT'S NOT INCLUDED
                 </h3>
                 <div className="space-y-4 sm:space-y-5">
                   {[
                     "Legal advice or representation",
                     "Dispatch services or load booking",
                     "Insurance brokerage or policy sales",
                     "Guaranteed audit outcomes"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center space-x-4 sm:space-x-5 text-sm sm:text-base font-bold text-slate-400 italic">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0"></div>
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <div className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-slate-100 dark:border-white/5">
                   <p className="text-base sm:text-lg font-bold text-slate-500 leading-relaxed italic">
                     LaunchPath is a one-time investment in infrastructure — not a subscription to content. You're building systems that protect your authority for years, not renting access to videos.
                   </p>
                 </div>
              </div>
            </div>

            <div className="mt-16 sm:mt-24 pt-10 sm:pt-16 border-t border-slate-100 dark:border-white/5 flex flex-col items-center">
              {!showForm ? (
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full max-w-2xl bg-authority-blue text-white py-8 sm:py-10 rounded-2xl sm:rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs sm:text-sm shadow-[0_25px_50px_-12px_rgba(30,58,95,0.4)] hover:bg-steel-blue transition-all active:scale-[0.98] group border-b-[8px] sm:border-b-[12px] border-slate-900"
                >
                  <span className="flex items-center justify-center">
                    BEGIN ADMISSION SEQUENCE <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              ) : (
                <div id="admission-terminal" className="w-full max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-slate-50 dark:bg-gray-800/50 p-8 sm:p-10 md:p-14 rounded-2xl sm:rounded-[3.5rem] border-2 border-slate-200 dark:border-border-dark shadow-inner relative overflow-hidden">
                        <header className="mb-10 sm:mb-12 flex items-center justify-between">
                            <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue">Registry Input Terminal</h3>
                            <Lock size={16} className="text-slate-300" />
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            <div className="space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Carrier Operating Status</label>
                                <select 
                                    required
                                    className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold appearance-none cursor-pointer shadow-sm text-sm"
                                    value={formData.carrierStatus}
                                    onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Existing Carrier">Active Authority</option>
                                    <option value="Pre-Authority">Pre-Authority</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Legal Name</label>
                                    <input 
                                        required 
                                        className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold shadow-sm text-sm"
                                        value={formData.legalName}
                                        onChange={e => setFormData({...formData, legalName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Registry Email</label>
                                    <input 
                                        required 
                                        type="email"
                                        className="w-full px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-800 border-2 border-slate-100 focus:border-authority-blue outline-none font-bold shadow-sm text-sm"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-authority-blue text-white py-6 sm:py-8 rounded-2xl sm:rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] sm:text-[12px] shadow-xl hover:bg-steel-blue transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "SUBMIT ADMISSION CREDENTIALS"}
                            </button>
                        </form>
                    </div>
                </div>
              )}
              
              <div className="mt-12 sm:mt-16 text-center space-y-4">
                <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">
                    VETERAN OWNED & OPERATED • ACCURACY OVER HYPE.™
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                    Questions before enrolling? Contact us at <br className="sm:hidden" /><span className="text-authority-blue dark:text-signal-gold font-black">contact@launchpathedu.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnrollPage;
