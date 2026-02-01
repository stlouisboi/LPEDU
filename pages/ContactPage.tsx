
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
        
        <div className="max-w-4xl mb-20 animate-reveal-up">
          <h1 className="text-6xl lg:text-7xl font-black font-serif text-authority-blue dark:text-white mb-8 uppercase tracking-tight">Contact LaunchPath</h1>
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
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.1)] border border-slate-100 dark:border-white/10 relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-20 animate-scale-in">
                   <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                      <CheckCircle size={48} />
                   </div>
                   <h2 className="text-3xl font-black font-serif mb-6 uppercase tracking-tight text-authority-blue dark:text-white">Uplink Secured</h2>
                   <p className="text-text-muted max-w-sm mx-auto font-medium leading-relaxed mb-12">
                     A compliance specialist will review your inquiry and respond within one business day.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 ml-4 block">Full Legal Name</label>
                      <input 
                        required 
                        placeholder="e.g. Jane Doe" 
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 dark:placeholder:text-white/20"
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 ml-4 block">Professional Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="jane@carrier.com" 
                        className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 dark:placeholder:text-white/20"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 ml-4 block">Motor Carrier Name</label>
                    <input 
                      placeholder="e.g. Integrity Logistics LLC" 
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold focus:bg-white dark:focus:bg-slate-900 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 dark:placeholder:text-white/20"
                      value={formData.businessName} 
                      onChange={e => setFormData({...formData, businessName: e.target.value})} 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 ml-4 block">Detailed Context</label>
                    <textarea 
                      required 
                      rows={6} 
                      placeholder="How can our specialists assist you today?" 
                      className="w-full px-7 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border-2 border-slate-100 dark:border-white/10 focus:border-authority-blue dark:focus:border-signal-gold focus:bg-white dark:focus:bg-slate-900 outline-none font-medium transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white placeholder:text-slate-300 dark:placeholder:text-white/20 leading-relaxed resize-none"
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
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
