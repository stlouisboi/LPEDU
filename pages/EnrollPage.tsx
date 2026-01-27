import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Scale,
  FileText,
  ShieldAlert,
  Lock,
  Info,
  Check,
  X,
  Calendar,
  Activity,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
  Building2,
  Loader2,
  ChevronDown,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const EnrollPage = () => {
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
        classification: formData.carrierStatus,
        metadata: {
          platform: 'web_v4',
          origin: 'enrollment_protocol'
        }
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Enrollment Submission Failure:", err);
      if (err.message?.includes('database')) {
        setError({ message: "Database instance not found. Verify Firestore initialization.", code: "DB_NOT_FOUND" });
      } else if (err.code === 'permission-denied') {
        setError({ message: "Access denied. Verification protocol requires rule alignment.", code: "PERM_DENIED" });
      } else {
        setError({ message: "System verification error. Check your data or contact technical support.", code: "GENERIC" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700">
      {/* 1. INSTITUTIONAL HEADER */}
      <section className="relative pt-32 pb-40 bg-white dark:bg-primary-dark border-b border-slate-100 dark:border-slate-800 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10 shadow-sm">
            <ShieldCheck size={16} className="text-authority-blue" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-authority-blue">Standard Admission Protocol v4.2</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tighter mb-8 leading-none">
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
          {isSubmitted ? (
            <div className="bg-white dark:bg-surface-dark p-16 md:p-24 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-border-dark text-center animate-scale-in">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black font-serif uppercase mb-6 text-authority-blue dark:text-white tracking-tight">Credentials Logged</h2>
              <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed max-w-md mx-auto mb-12">
                Your alignment profile is queued for administrative review. You will receive a determination via registry email within 24 business hours.
              </p>
              <Link to="/" className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-xl hover:bg-steel-blue transition-all active:scale-95">Return to Repository</Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-dark p-12 md:p-16 rounded-[4.5rem] shadow-[0_40px_100px_-30px_rgba(30,58,95,0.15)] border border-white dark:border-border-dark relative overflow-hidden">
              {/* Decorative side accent */}
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
                      <p className="text-[10px] font-black text-red-400 dark:text-red-800 uppercase tracking-widest mt-2">Error ID: {error.code}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Carrier Operating Status</label>
                  <div className="relative group">
                    <select 
                      required
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base appearance-none cursor-pointer transition-all shadow-inner group-hover:bg-slate-100 dark:group-hover:bg-gray-800"
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
                    <input 
                      required 
                      placeholder="e.g. Integrity Hauling LLC"
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.legalName}
                      onChange={e => setFormData({...formData, legalName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-4 block">Registry Email</label>
                    <input 
                      required 
                      type="email"
                      placeholder="legal@carrier.com"
                      className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 dark:bg-gray-800/50 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-bold text-base transition-all shadow-inner"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
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
                      <option value="Under 10k">Less than $10,000 (Non-Recommended)</option>
                      <option value="10k-20k">$10,000 - $20,000 (Baseline Readiness)</option>
                      <option value="Above 20k">More than $20,000 (Standard Readiness)</option>
                    </select>
                    <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue transition-colors" size={20} />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-authority-blue dark:bg-signal-gold text-white dark:text-authority-blue py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_25px_50px_-15px_rgba(30,58,95,0.4)] hover:bg-steel-blue dark:hover:bg-white transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center border-b-4 border-black/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin mr-4" size={24} />
                    ) : (
                      <RefreshCw className="mr-4 group-hover:rotate-180 transition-transform duration-700" size={20} />
                    )}
                    <span>Initiate Verification Review</span>
                  </button>
                </div>
                
                <p className="text-[10px] text-center text-slate-400 dark:text-slate-600 uppercase tracking-[0.35em] font-black leading-relaxed max-w-xl mx-auto">
                  Transmission initiates a formal administrative window. Verified data is required for Standard alignment determination.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 3. EXPECTATIONS SECTION */}
      <section className="py-40 bg-white dark:bg-primary-dark">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
             <div className="h-px w-24 bg-signal-gold/30 mx-auto mb-8"></div>
             <h2 className="text-xs font-black uppercase tracking-[0.6em] text-authority-blue dark:text-signal-gold">Operational Integrity Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Retained Liability", 
                icon: <Scale size={28} />, 
                desc: "The motor carrier retains absolute legal liability for regulatory adherence. LaunchPath provides the standard; the carrier provides the defense." 
              },
              { 
                title: "Enforced Sequence", 
                icon: <Activity size={28} />, 
                desc: "Admitted entities must follow the technical sequence without deviation to ensure systematic mitigation of safety exposure." 
              },
              { 
                title: "Restricted Access", 
                icon: <ClipboardCheck size={28} />, 
                desc: "Registry credentials are non-transferable. System alignment is monitored to maintain the integrity of the LaunchPath Safety Standard." 
              }
            ].map((box, i) => (
              <div key={i} className="bg-[#fafaf9] dark:bg-surface-dark p-12 rounded-[3rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
                <div className="text-authority-blue dark:text-signal-gold mb-8 group-hover:scale-110 transition-transform">{box.icon}</div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-authority-blue dark:text-white mb-6">{box.title}</h4>
                <p className="text-[13px] text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GOVERNANCE POLICY */}
      <section className="py-24 bg-slate-50 dark:bg-surface-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-12 border-l-8 border-signal-gold bg-white dark:bg-primary-dark rounded-r-[3rem] shadow-xl">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-8 flex items-center">
              <Lock size={16} className="mr-3" /> Governance Exclusion Registry
            </h4>
            <div className="space-y-6 text-[12px] font-bold text-slate-500 dark:text-text-dark-muted uppercase leading-loose tracking-wider">
              <p>LaunchPath is an educational standards organization. We do not provide individualized professional consulting, legal defense, or insurance brokering services.</p>
              <p>Admission is contingent upon the verification of structural readiness. Failure to meet prerequisites results in mandatory deferral of system access to maintain Standard integrity.</p>
              <p className="text-authority-blue dark:text-white font-black italic">Unauthorized credential sharing results in permanent system revocation.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-white dark:bg-primary-dark py-20 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-700">
          LP_EDU // ADMISSIONS_REGISTRY // VERIFICATION_SEQUENCE_ACTIVE
        </p>
      </footer>
    </div>
  );
};

export default EnrollPage;