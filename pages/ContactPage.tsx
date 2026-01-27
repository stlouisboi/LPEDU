import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, Send, CheckCircle, Loader2, AlertCircle, ArrowRight, MessageSquare, Anchor, User, RefreshCw, ChevronDown } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    currentStatus: '',
    areaOfInterest: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      if (!db) {
        throw new Error("Cloud synchronization is currently offline. Please check your internet connection and try again.");
      }

      if (formData.message.length < 10) {
        throw new Error("Please provide more context in your message (minimum 10 characters).");
      }

      await addDoc(collection(db, "formSubmissions"), {
        ...formData,
        type: 'Primary Contact',
        status: 'unread',
        createdAt: serverTimestamp()
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(err.message || "An unexpected error occurred while transmitting your inquiry.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-20 animate-reveal-up">
          <h1 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white mb-8 uppercase tracking-tight">Contact LaunchPath</h1>
          <p className="text-base md:text-lg text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">
            If you are navigating the critical first 90 days of your operating authority or preparing for a New Entrant Safety Audit, we are here to provide clarity. LaunchPath serves carriers who prioritize technical precision and stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-12 animate-in slide-in-from-left duration-700">
            <div className="relative h-[600px] w-full overflow-hidden rounded-[4rem] shadow-2xl border-4 border-white dark:border-surface-dark group bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {!imgError ? (
                <img 
                  src="https://img.freepik.com/free-photo/afro-american-driver-truck-using-smartphone_1303-27083.jpg" 
                  alt="Operator" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                <User size={64} className="text-text-muted opacity-40" />
              )}
              <div className="absolute inset-0 bg-authority-blue/5 mix-blend-overlay"></div>
              <div className="absolute bottom-10 left-10 bg-white/95 backdrop-blur-md px-8 py-4 rounded-[2rem] shadow-2xl border border-white/50">
                <p className="text-[12px] font-black uppercase tracking-[0.3em] text-authority-blue flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-4 animate-pulse"></span>
                  Advisory Link Active
                </p>
              </div>
            </div>

            <section className="space-y-6 px-4">
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center">
                <ShieldCheck size={20} className="mr-3" /> Operational Integrity
              </h2>
              <div className="prose dark:prose-invert text-lg text-text-muted font-medium leading-relaxed space-y-4">
                <p>
                  LaunchPath provides the technical foundation required to navigate federal scrutiny with confidence.
                </p>
                <div className="h-px w-20 bg-signal-gold/30 my-8"></div>
                <p className="italic text-base text-authority-blue/70 dark:text-signal-gold/70">
                  "Establishing order before seeking momentum."
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.1)] border border-slate-100 dark:border-border-dark relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-20 animate-scale-in">
                   <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                      <CheckCircle size={48} />
                   </div>
                   <h2 className="text-3xl font-black font-serif mb-6 uppercase tracking-tight text-authority-blue dark:text-white">Uplink Secured</h2>
                   <p className="text-text-muted max-w-sm mx-auto font-medium leading-relaxed mb-12">
                     A compliance specialist will review your inquiry and respond within one business day.
                   </p>
                   <button onClick={() => setIsSubmitted(false)} className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-steel-blue transition-all shadow-xl active:scale-95">New Inquiry</button>
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
                      <input 
                        required 
                        placeholder="e.g. Jane Doe" 
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300"
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Professional Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="jane@carrier.com" 
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Motor Carrier Name</label>
                    <input 
                      placeholder="e.g. Integrity Logistics LLC" 
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300"
                      value={formData.businessName} 
                      onChange={e => setFormData({...formData, businessName: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Current Phase</label>
                      <div className="relative group">
                        <select 
                          required
                          className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white appearance-none cursor-pointer"
                          value={formData.currentStatus}
                          onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                        >
                          <option value="">Select Phase</option>
                          <option value="New Authority">First 90 Days</option>
                          <option value="Existing Carrier">Active Operator</option>
                          <option value="Pre-Filing">Pre-Filing Stage</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-authority-blue transition-colors" size={18} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Primary Inquiry Area</label>
                      <div className="relative group">
                        <select 
                          required
                          className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white appearance-none cursor-pointer"
                          value={formData.areaOfInterest}
                          onChange={e => setFormData({...formData, areaOfInterest: e.target.value})}
                        >
                          <option value="">Select Category</option>
                          <option value="Compliance Systems">The Four Pillars</option>
                          <option value="Audit Prep">New Entrant Audit</option>
                          <option value="Training">Training Programs</option>
                          <option value="General">General Inquiry</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-authority-blue transition-colors" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-text-dark-muted ml-4 block">Detailed Context</label>
                    <textarea 
                      required 
                      rows={6} 
                      placeholder="How can our specialists assist you today?" 
                      className="w-full px-7 py-5 rounded-3xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-medium transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 leading-relaxed resize-none"
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending} 
                    className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.35em] py-7 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(30,58,95,0.3)] hover:bg-steel-blue hover:shadow-[0_25px_60px_-12px_rgba(30,58,95,0.4)] transition-all flex items-center justify-center disabled:opacity-50 active:scale-[0.98] group"
                  >
                    {sending ? <Loader2 className="animate-spin mr-4" size={24} /> : <Send className="mr-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />} 
                    Secure Inquiry Link
                  </button>
                  
                  <p className="text-[9px] text-center text-slate-400 dark:text-text-dark-muted uppercase tracking-[0.3em] font-black opacity-60">
                    High-Trust Environment • Administrative Protocol Active
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-40 pt-20 border-t border-border-light dark:border-border-dark text-center space-y-8">
           <div className="flex items-center justify-center space-x-8 text-authority-blue dark:text-signal-gold opacity-20">
              <Anchor size={28} />
              <div className="h-px w-40 bg-current"></div>
              <Anchor size={28} />
           </div>
           <div className="max-w-2xl mx-auto space-y-4">
             <p className="text-[13px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-text-dark-muted">
               Built on Stewardship.
             </p>
           </div>
        </div>

        <div className="mt-16 text-center">
           <Link to="/support" className="inline-flex items-center space-x-3 bg-white dark:bg-surface-dark px-12 py-5 rounded-full border border-slate-200 dark:border-border-dark text-[11px] font-black uppercase tracking-[0.2em] text-text-muted hover:text-authority-blue hover:shadow-xl transition-all active:scale-95 shadow-sm">
              <MessageSquare size={16} />
              <span>Priority Member Support (Paid Enrollees)</span>
           </Link>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;