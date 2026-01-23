import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Loader2,
  Anchor,
  User,
  Building2,
  Scale,
  ClipboardCheck,
  ChevronDown,
  X,
  FileText
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const RequestAdmissionPage = () => {
  // Fix: Initialize navigate hook using useNavigate() to resolve "Cannot find name 'navigate'" error on line 237
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    currentStatus: '',
    mcNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      if (!db) {
        throw new Error("Cloud synchronization is currently offline.");
      }

      await addDoc(collection(db, "formSubmissions"), {
        ...formData,
        type: 'Admission Request',
        status: 'unread',
        createdAt: serverTimestamp()
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting your request.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-primary-dark min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-surface-dark/30 text-center border-b border-border-light dark:border-border-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-reveal-up">
          <div className="inline-flex items-center space-x-2 bg-authority-blue/5 text-authority-blue px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-authority-blue/10 dark:bg-white/5 dark:text-signal-gold dark:border-white/10">
            <Scale className="w-3.5 h-3.5" />
            <span>Admission Protocol Active</span>
          </div>
          <h1 className="text-4xl md:text-[4.5rem] font-black font-serif mb-8 leading-[1.0] text-authority-blue dark:text-white tracking-tighter uppercase">
            The Standard of <br/><span className="text-signal-gold italic">Operating Integrity.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted dark:text-text-dark-muted mb-0 max-w-2xl mx-auto leading-relaxed font-medium">
            LaunchPath is not open enrollment. This standard requires operational readiness, administrative discipline, and consistent follow-through. We screen for alignment to protect the integrity of the system.
          </p>
        </div>
      </section>

      {/* 2. WHO THIS IS FOR / NOT FOR */}
      <section className="py-20 border-b border-border-light dark:border-border-dark bg-white dark:bg-primary-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-border-dark">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-authority-blue dark:text-signal-gold mb-8 flex items-center">
                <CheckCircle2 className="mr-3" size={20} /> LaunchPath Is For:
              </h3>
              <ul className="space-y-6">
                {[
                  "Carriers who want to build audit-ready systems early",
                  "Operators willing to follow steps in sequence",
                  "Owners who value prevention over reaction"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-base font-bold text-text-primary dark:text-text-dark-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-authority-blue dark:bg-signal-gold mt-2 mr-4 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark">
              <h3 className="text-sm font-black uppercase tracking-[0.25em] text-red-600 mb-8 flex items-center">
                <X className="mr-3" size={20} /> LaunchPath Is Not For:
              </h3>
              <ul className="space-y-6">
                {[
                  "Shortcut seekers or speculators",
                  "Carriers looking for done-for-you compliance",
                  "Anyone unwilling to maintain documentation discipline"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-base font-medium text-text-muted dark:text-text-dark-muted italic opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 mr-4 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT ADMISSION MEANS & 4. PROCESS */}
      <section className="py-24 bg-slate-50 dark:bg-surface-dark/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">The Purpose of Admission</h2>
              <div className="prose prose-lg dark:prose-invert text-text-muted dark:text-text-dark-muted font-medium leading-relaxed">
                <p>
                  LaunchPath utilizes a request-based admission process to ensure that every motor carrier entering the program is prepared for the administrative weight of the 90-day implementation cycle.
                </p>
                <p>
                  This selectivity protects the standard of our systems and the focus of the cohort. Alignment with our principles of stewardship and discipline matters more than the urgency of a launch date.
                </p>
              </div>
              <div className="pt-8">
                 <div className="flex items-center space-x-4 p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark shadow-sm">
                   <Anchor className="text-signal-gold" size={28} />
                   <p className="text-sm font-black uppercase tracking-widest text-authority-blue dark:text-white leading-relaxed">
                     Built on Stewardship. Dedicated to Order.
                   </p>
                 </div>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-10">The Admission Sequence</h2>
              <div className="space-y-10">
                {[
                  "Submit request for admission",
                  "Responses are reviewed for operational alignment",
                  "Approved applicants receive secure enrollment instructions",
                  "Investment is confirmed via official gateway",
                  "Ground Zero implementation begins"
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-authority-blue text-white font-black text-xs shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      0{i + 1}
                    </div>
                    <div className="pt-2 border-b border-slate-200 dark:border-border-dark pb-4 w-full">
                      <p className="text-base font-bold text-text-primary dark:text-white uppercase tracking-tight">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INVESTMENT TRANSPARENCY */}
      <section className="py-24 bg-white dark:bg-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4">Investment Transparency</h2>
            <p className="text-lg text-text-muted font-medium">Pricing reflects the seriousness of the work and the integrity of the standard.</p>
          </div>
          
          <div className="bg-[#F8FAFC] dark:bg-surface-dark p-12 md:p-20 rounded-[4rem] border-4 border-authority-blue shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 scale-150 pointer-events-none">
              <ShieldCheck size={300} className="text-authority-blue" />
            </div>
            
            <div className="relative z-10 space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-4">Current Entry Point</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold text-slate-400">$</span>
                  <span className="text-7xl font-black tracking-tighter text-authority-blue dark:text-white leading-none">1,500</span>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-text-muted mt-4">Founding Investment</p>
              </div>

              <div className="h-px w-24 bg-slate-200 dark:bg-border-dark mx-auto"></div>

              <div>
                <div className="flex items-center justify-center space-x-2 opacity-50">
                  <span className="text-xl font-bold text-slate-400">$</span>
                  <span className="text-4xl font-black tracking-tighter text-text-muted dark:text-white leading-none">2,500</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mt-2">Future Standard Investment (Post-Founding)</p>
              </div>

              <p className="text-[11px] font-medium text-text-muted italic max-w-sm mx-auto leading-relaxed">
                "The standard is not adjusted. These figures reflect the commitment required to build a compliant motor carrier from day one."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FORM INTRO & 7. SUBMISSION */}
      <section className="py-32 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Admission Request Form</h2>
            <div className="prose dark:prose-invert text-base text-text-muted font-medium leading-relaxed">
              <p>
                Please provide honest responses regarding your current operational phase. We review every submission for readiness. Submit this request only if you are prepared to maintain the documentation discipline required by the LaunchPath Standard.
              </p>
              <p className="font-bold text-authority-blue dark:text-signal-gold uppercase tracking-widest text-[10px]">
                Submitting a request does not guarantee acceptance.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-border-dark relative">
            {isSubmitted ? (
              <div className="text-center py-20 animate-scale-in">
                 <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                    <ClipboardCheck size={48} />
                 </div>
                 <h2 className="text-3xl font-black font-serif mb-6 uppercase tracking-tight text-authority-blue dark:text-white">Request Logged</h2>
                 <p className="text-text-muted max-w-sm mx-auto font-medium leading-relaxed mb-12">
                   Your operational profile is being reviewed for alignment with the LaunchPath Standard. You will receive a response via email.
                 </p>
                 <button onClick={() => navigate('/')} className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-steel-blue transition-all shadow-xl active:scale-95">Return to Home</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {error && (
                  <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-start space-x-4 animate-in slide-in-from-top-4">
                    <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={24} />
                    <p className="text-sm font-bold text-red-700 leading-relaxed">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Full Legal Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required 
                        placeholder="e.g. Jane Doe" 
                        className="w-full pl-14 pr-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Professional Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jane@carrier.com" 
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Carrier Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        placeholder="e.g. Integrity Hauling LLC" 
                        className="w-full pl-14 pr-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                        value={formData.businessName} 
                        onChange={e => setFormData({...formData, businessName: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">USDOT / MC Number</label>
                    <div className="relative">
                      <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        placeholder="Optional" 
                        className="w-full pl-14 pr-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                        value={formData.mcNumber} 
                        onChange={e => setFormData({...formData, mcNumber: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Operational Phase</label>
                  <div className="relative group">
                    <select 
                      required
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white appearance-none cursor-pointer"
                      value={formData.currentStatus}
                      onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                    >
                      <option value="">Select Phase</option>
                      <option value="Pre-Filing">Phase 0: Pre-Filing</option>
                      <option value="First 90 Days">Phase 1: First 90 Days</option>
                      <option value="Post Audit">Phase 2: Active (Post-Audit)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">State your objective for admission</label>
                  <textarea 
                    required 
                    rows={5} 
                    placeholder="Briefly describe your commitment to operational compliance." 
                    className="w-full px-7 py-5 rounded-3xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-medium transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 leading-relaxed resize-none"
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={sending} 
                  className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.35em] py-7 rounded-[2rem] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-[0.98]"
                >
                  {sending ? <Loader2 className="animate-spin mr-4" size={24} /> : <ClipboardCheck className="mr-4" size={20} />} 
                  Request Admission
                </button>
                
                <p className="text-[9px] text-center text-slate-400 dark:text-text-dark-muted uppercase tracking-[0.3em] font-black opacity-60">
                  Submitting a request does not guarantee acceptance.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER DISCLAIMER */}
      <footer className="bg-white dark:bg-primary-dark py-12 border-t border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-loose max-w-2xl mx-auto opacity-60">
            LaunchPath Transportation EDU is an educational platform. Admission processes are utilized to maintain the technical quality of the cohort. <br/>
            Accuracy Over Hype. Dedicated to Operational Integrity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RequestAdmissionPage;
