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
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            
            <RemediationProtocolBlock />

            {/* 1. ADMISSION APPROVED HEADER */}
            <div className="bg-white dark:bg-surface-dark p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-border-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-none">
                <ShieldCheck size={240} className="text-authority-blue" />
              </div>
              
              <div className="flex items-center space-x-5 mb-12">
                <div className="w-14 h-14 bg-authority-blue text-signal-gold rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Registry Result: APPROVED</p>
                  <h2 className="text-3xl font-black font-serif uppercase text-authority-blue dark:text-white tracking-tight">ADMISSION APPROVED</h2>
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed">
                    Based on your REACH Test™ classification and submitted admission credentials, your entity has been verified as eligible for entry into the LaunchPath Standard Implementation Environment.
                  </p>
                  <div className="h-px w-20 bg-signal-gold/30"></div>
                  <p className="text-base text-slate-500 dark:text-text-dark-muted font-medium leading-relaxed italic">
                    LaunchPath is not a course or subscription. Admission represents access to a structured operating standard designed to protect authority, insurance continuity, and long-term regulatory viability.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. THE INVESTMENT SECTION (FILTRATION MECHANISM) */}
            <div className="bg-[#0f172a] p-12 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-none">
                 <Activity size={180} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-signal-gold">THE INVESTMENT (ONE-TIME)</h3>
                  <p className="text-xl text-white font-bold leading-relaxed max-w-2xl">
                    Entry into the LaunchPath Standard Implementation Environment requires a one-time implementation investment.
                  </p>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
                    This investment covers the installation of compliance and safety management systems, structured sequencing, and verified operational standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tier 1: Founding Cohort</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl font-black text-white">$2,500</span>
                       <span className="text-[10px] font-bold text-signal-gold uppercase tracking-widest">Early Access</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      This tier is designed to validate system execution and student behavior. It reflects early-stage institutional tooling and feedback participation.
                    </p>
                  </div>

                  <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-4 opacity-60 grayscale">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Future Standard</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl font-black text-slate-400">$3,500</span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Tier</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed italic">
                      The full Institutional Standard price will move to this tier in the next implementation cycle.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-signal-gold">SYSTEM INCLUSIONS</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                    {[
                      "Ground 0 qualification framework",
                      "Core safety management installation",
                      "Driver Qualification (DQ) file systems",
                      "Authority protection safeguards",
                      "90-Day implementation sequence",
                      "Vetted institutional service links",
                      "Private operator cohort access"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-xs font-bold text-slate-300 uppercase tracking-tight">
                        <Zap size={14} className="text-signal-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. FINAL ACTIONS */}
            <div className="space-y-8">
              <div className="p-8 bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-3xl">
                <div className="flex items-start space-x-4">
                  <Info size={20} className="text-authority-blue shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold">IMPORTANT CLARIFICATION</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                      LaunchPath does not provide legal, tax, insurance, or regulatory representation. Execution responsibility remains with the motor carrier. LaunchPath provides structure, sequencing, and verification standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-authority-blue text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-4 border-slate-900 group">
                  PROCEED TO SECURE IMPLEMENTATION ACCESS
                  <ArrowRight size={18} className="ml-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[9px] text-center text-slate-400 uppercase tracking-[0.4em] font-black">
                  Capital Readiness Verification v4.2
                </p>
              </div>

              <div className="pt-10 text-center">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">OPTIONAL ADMISSION CLARIFICATION CALL</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl mx-auto mb-8 italic">
                   For operators who want confirmation before proceeding, a brief clarification call is available. This call is optional and is not a sales call. Its purpose is to confirm alignment and expectations.
                 </p>
                 <button className="inline-flex items-center space-x-3 px-10 py-5 bg-white border border-slate-200 text-authority-blue rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                    <span>REQUEST OPTIONAL CLARIFICATION CALL</span>
                 </button>
              </div>
            </div>

            <div className="text-center pt-16">
              <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-authority-blue transition-colors">Return to Institutional Repository</Link>
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

      {/* NEW: INVESTMENT SECTION */}
      <section className="py-20 lg:py-32 bg-white dark:bg-primary-dark">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-[4rem] p-10 md:p-20 shadow-sm relative overflow-hidden">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-4">ENROLLMENT INVESTMENT</p>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">
                  ONE-TIME <br/><span className="text-signal-gold italic">ADMISSION.</span>
                </h2>
                <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">
                  Single payment. Lifetime access. No recurring fees.
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="text-6xl md:text-8xl font-black text-authority-blue dark:text-white leading-none">$2500</span>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">USD // Institutional Tier</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-slate-200 dark:border-white/5 pt-16">
              {/* Included */}
              <div className="space-y-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold flex items-center">
                   <CheckCircle2 size={16} className="mr-3" /> WHAT'S INCLUDED
                 </h3>
                 <div className="space-y-4">
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
                     <div key={i} className="flex items-center space-x-4 text-sm font-bold text-slate-600 dark:text-text-dark-muted">
                       <div className="w-1.5 h-1.5 rounded-full bg-signal-gold shrink-0"></div>
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Not Included */}
              <div className="space-y-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 flex items-center">
                   <XCircle size={16} className="mr-3" /> WHAT'S NOT INCLUDED
                 </h3>
                 <div className="space-y-4">
                   {[
                     "Legal advice or representation",
                     "Dispatch services or load booking",
                     "Insurance brokerage or policy sales",
                     "Guaranteed audit outcomes"
                   ].map((item, i) => (
                     <div key={i} className="flex items-center space-x-4 text-sm font-medium text-slate-400 italic">
                       <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0"></div>
                       <span>{item}</span>
                     </div>
                   ))}
                 </div>
                 
                 <div className="pt-8 border-t border-slate-200 dark:border-white/5">
                   <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                     LaunchPath is a one-time investment in infrastructure — not a subscription to content. You're building systems that protect your authority for years, not renting access to videos.
                   </p>
                 </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col items-center">
              <a 
                href="#admission-terminal" 
                className="inline-flex items-center space-x-4 bg-authority-blue text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group border-b-4 border-slate-900 mb-8"
              >
                <span>BEGIN ADMISSION SEQUENCE</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Questions before enrolling? Contact us at <span className="text-authority-blue dark:text-signal-gold font-black">contact@launchpathedu.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLASSIFICATION GATE / FORM */}
      <section id="admission-terminal" className="py-32 relative z-20">
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