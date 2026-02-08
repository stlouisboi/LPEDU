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
  DollarSign,
  Award,
  Verified,
  LockKeyhole
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
      if (!db) throw new Error("Cloud synchronization service is currently unavailable.");
      await addDoc(collection(db, "admissionInquiries"), { ...formData, submittedAt: serverTimestamp() });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError({ message: err.message || "System verification error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 selection:bg-authority-blue/10">
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            
            <div className="flex flex-col items-center text-center space-y-10 py-16">
               <div className="relative">
                  <div className="w-32 h-32 bg-green-50 rounded-[3rem] flex items-center justify-center shadow-xl border border-green-100">
                    <Verified size={56} className="text-green-600 animate-bounce" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-authority-blue p-4 rounded-2xl shadow-2xl border-4 border-white dark:border-primary-dark">
                     <ShieldCheck size={24} className="text-signal-gold" />
                  </div>
               </div>
               <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl font-black font-serif uppercase text-authority-blue dark:text-white">Admission Authorized.</h1>
                  <p className="text-xl text-slate-500 font-bold uppercase tracking-widest">Master Standard Authenticated // Registry Active</p>
               </div>
            </div>

            <div className="bg-[#020617] p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
              <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><Lock size={180}/></div>
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-signal-gold">Next Steps: Secure Implementation Access</h3>
                  <p className="text-xl font-black font-serif leading-relaxed italic">"Welcome to the LaunchPath Standard. Your entity has been staged for implementation phase authorization."</p>
                </div>
                
                <div className="space-y-8 border-t border-white/5 pt-10">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Activation sequence:</p>
                  <div className="space-y-6">
                    {[
                      "Check your email for the Admission Portal login key.",
                      "Complete the Stewardship Orientation session.",
                      "Authorize the one-time implementation investment."
                    ].map((step, i) => (
                      <div key={i} className="flex items-center space-x-5">
                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-xs text-signal-gold border border-white/10">{i + 1}</div>
                         <p className="text-lg font-bold text-slate-300 uppercase tracking-tight">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/operator-portal" className="w-full bg-white text-authority-blue py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-signal-gold transition-all active:scale-[0.98] flex items-center justify-center group border-b-8 border-slate-300">
                  Enter Secure Operator Portal <ArrowRight className="ml-4 group-hover:translate-x-2" size={24}/>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans animate-in fade-in duration-700 selection:bg-authority-blue/10">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 text-center px-6">
        <div className="max-w-5xl mx-auto space-y-8 legibility-container">
          <div className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 px-6 py-2.5 rounded-full border border-slate-200 dark:border-white/10 shadow-xl">
            <LockKeyhole size={16} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-white">Admission Registry</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tighter leading-[0.85] text-authority-blue dark:text-white">
            Request <br/><span className="text-signal-gold italic">Admission.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed">LaunchPath is selective by design. Admission begins with alignment and structural readiness, not payment.</p>
        </div>
      </section>

      {/* 2. STEWARDSHIP REQUIREMENTS (LEGIBILITY CARDS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center space-y-4">
           <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">THE REQUISITES</p>
           <h2 className="text-4xl font-black font-serif uppercase text-authority-blue dark:text-white leading-tight">STEWARDSHIP ALIGNMENT.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: "Wisdom First", icon: <Award className="text-signal-gold"/>, desc: "An acknowledgement that business longevity is a direct result of early systemic formation, not random market luck." },
             { title: "Fiscal Restraint", icon: <ShieldCheck className="text-signal-gold"/>, desc: "The discipline to maintain 90 days of cash-flow oxygen before initiating fleet expansion or high-risk loads." },
             { title: "Documentary Order", icon: <FileText className="text-signal-gold"/>, desc: "A commitment to absolute documentation integrity. Evidence of refuge must exist before the load is booked." }
           ].map((req, i) => (
             <div key={i} className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border-2 border-slate-50 dark:border-border-dark flex flex-col items-center text-center space-y-10 group hover:shadow-2xl hover:border-authority-blue/20 transition-all duration-700">
                <div className="w-20 h-20 bg-slate-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">{req.icon}</div>
                <div className="space-y-4 flex-grow">
                   <h4 className="text-2xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white leading-none">{req.title}</h4>
                   <p className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">{req.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 3. ENROLLMENT TERMINAL */}
      <section className="py-32 bg-white dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 legibility-container">
          {!showForm ? (
            <div className="text-center space-y-12">
               <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black font-serif uppercase text-authority-blue dark:text-white leading-tight tracking-tight">Access the <br/><span className="text-signal-gold italic">Operating Standard.</span></h2>
                  <p className="text-xl text-slate-500 dark:text-slate-400 font-bold max-w-xl mx-auto">One-time implementation investment of <span className="text-authority-blue dark:text-white">$2,500</span>. Lifetime access to the infrastructure. No recurring fees.</p>
               </div>
               <button 
                onClick={() => setShowForm(true)} 
                className="bg-authority-blue text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-[0.98] border-b-[12px] border-slate-900 group"
               >
                 Open Admission Terminal <ChevronRight className="inline ml-3 group-hover:translate-x-1" size={18}/>
               </button>
            </div>
          ) : (
            <div className="bg-[#FAF9F6] dark:bg-gray-900/50 p-10 md:p-20 rounded-[4rem] border-2 border-slate-200 dark:border-border-dark shadow-inner relative animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03]"><Lock size={120}/></div>
               
               <header className="mb-16 flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-8">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">Admission Terminal v4.2</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Registry Protocol: SECURE_UPLINK</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="text-slate-300 hover:text-red-500 transition-colors"><XCircle size={24}/></button>
               </header>

               <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Legal Name</label>
                    <div className="relative">
                       <input 
                        required 
                        placeholder="Master Registry Name"
                        className="w-full px-8 py-6 rounded-[2rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold outline-none font-black text-lg shadow-sm placeholder:text-slate-200 dark:text-white"
                        value={formData.legalName}
                        onChange={e => setFormData({...formData, legalName: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email</label>
                      <input 
                        required 
                        type="email"
                        placeholder="legal@carrier.com"
                        className="w-full px-8 py-6 rounded-[2rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-black text-lg shadow-sm placeholder:text-slate-200 dark:text-white"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Operating Authority Status</label>
                      <select 
                        required
                        className="w-full px-8 py-6 rounded-[2rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-black text-sm shadow-sm appearance-none cursor-pointer dark:text-white"
                        value={formData.carrierStatus}
                        onChange={e => setFormData({...formData, carrierStatus: e.target.value})}
                      >
                        <option value="">Select Phase</option>
                        <option value="Pre-Authority">Pre-Authority</option>
                        <option value="New Entrant">First 90 Days</option>
                        <option value="Existing">Active Carrier</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-4 animate-in slide-in-from-top-2">
                       <AlertTriangle className="text-red-600" />
                       <p className="text-xs font-black uppercase text-red-700 tracking-widest">{error.message}</p>
                    </div>
                  )}

                  <div className="pt-8">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-authority-blue text-white py-10 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-[0.98] border-b-[12px] border-slate-900 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto"/> : "Authorize Admission Credentials"}
                    </button>
                    <p className="text-[9px] text-center text-slate-400 uppercase tracking-[0.5em] mt-8 font-black">Institutional Integrity Standards Active</p>
                  </div>
               </form>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 text-center opacity-30 border-t border-slate-100 dark:border-white/5">
         <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-400 italic">BUILT ON WISDOM. ESTABLISHED WITH UNDERSTANDING. DESIGNED FOR ENDURANCE.</p>
      </section>

    </div>
  );
};

export default EnrollPage;