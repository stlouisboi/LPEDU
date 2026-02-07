import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, Send, CheckCircle, Loader2, AlertCircle, MessageSquare, Anchor, User, ChevronDown, Building2, RefreshCw } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { syncToMailerLite } from '../mailerlite';

const FloatingInput = ({ label, icon: Icon, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div className="relative group mb-8">
      <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${focused || hasValue ? 'opacity-0 scale-50' : 'opacity-40 group-hover:opacity-100'}`}>
        <Icon size={24} className="text-authority-blue" />
      </div>
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white dark:bg-gray-800 border-2 transition-all duration-300 px-8 pt-10 pb-4 rounded-[1.5rem] outline-none font-bold text-[18px] text-text-primary dark:text-white shadow-sm hover:shadow-md focus:shadow-xl ${
          focused ? 'border-authority-blue' : 'border-slate-100 dark:border-border-dark'
        } ${!Icon ? 'pl-8' : 'pl-16'}`}
        placeholder=" "
      />
      <label
        className={`absolute left-1 transition-all duration-300 pointer-events-none uppercase font-black tracking-widest text-[12px] ${
          focused || hasValue
            ? '-top-3.5 left-6 bg-white dark:bg-gray-800 px-3 text-authority-blue'
            : `top-1/2 -translate-y-1/2 text-slate-400 ${!Icon ? 'left-8' : 'left-16'}`
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const ContactPage = () => {
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
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Contact | LaunchPath Support";
    const update = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };
    update('meta[name="description"]', "Questions about the program or your compliance readiness? Reach out. We respond to serious inquiries from serious operators.");
    update('meta[property="og:title"]', "Contact | LaunchPath Support");
    update('meta[property="og:description"]', "Questions about LaunchPath? Contact us.");
    update('meta[property="og:type"]', "website");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      // 1. Firebase Synchronization
      if (!db) {
        throw new Error("Cloud synchronization is currently offline. Please verify connection.");
      }

      await addDoc(collection(db, "formSubmissions"), {
        ...formData,
        type: 'Primary Contact',
        status: 'unread',
        createdAt: serverTimestamp()
      });
      
      // 2. MailerLite Synchronization
      setSyncing(true);
      await syncToMailerLite({
        email: formData.email,
        fields: {
          name: formData.fullName,
          company: formData.businessName
        }
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while transmitting your inquiry.");
    } finally {
      setSending(false);
      setSyncing(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[90%] md:max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-4 bg-authority-blue/5 border border-authority-blue/10 px-6 py-3 rounded-full mb-10">
            <Anchor size={18} className="text-authority-blue" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-authority-blue">CONTACT</span>
          </div>
          <h1 className="text-[48px] md:text-[80px] font-black font-serif text-authority-blue dark:text-white mb-8 uppercase tracking-tighter leading-none">
            GET IN <span className="text-signal-gold italic">TOUCH.</span>
          </h1>
          <p className="text-[22px] text-slate-500 dark:text-text-dark-muted max-w-3xl font-bold leading-relaxed">
            Questions about enrollment, compliance, or the program? We respond within 24-48 hours.
          </p>
        </div>
      </section>

      <section className="max-w-[90%] md:max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 h-full">
            <div className="relative h-full min-h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white dark:border-surface-dark group">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FPictures%2Fcall%20or%20text.png?alt=media&token=72ce99f3-0c26-401a-822f-2ce3835b2848" 
                alt="Professional carrier operator" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-authority-blue/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-16 left-16 right-16 space-y-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[3rem] shadow-2xl">
                  <h3 className="text-white text-[28px] font-black font-serif uppercase tracking-tight mb-4">QUESTIONS?</h3>
                  <p className="text-white/70 text-[18px] font-medium leading-relaxed italic">
                    "We're here to help you get started."
                  </p>
                </div>
                <div className="flex items-center space-x-6 px-6">
                  <div className="w-14 h-14 rounded-2xl bg-signal-gold flex items-center justify-center text-authority-blue">
                    <ShieldCheck size={28} />
                  </div>
                  <p className="text-white text-[12px] font-black uppercase tracking-[0.3em]">Institutional Guard Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-white dark:bg-surface-dark p-10 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.08)] border border-slate-100 dark:border-border-dark relative overflow-hidden h-fit">
              {isSubmitted ? (
                <div className="text-center py-24 animate-scale-in">
                   <div className="w-28 h-28 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-lg border border-green-100">
                      <CheckCircle size={56} />
                   </div>
                   <h2 className="text-[40px] font-black font-serif mb-8 uppercase tracking-tight text-authority-blue dark:text-white">Inquiry Secured</h2>
                   <p className="text-[20px] text-slate-500 dark:text-slate-400 max-w-md mx-auto font-bold leading-relaxed mb-16">
                     A specialist has been notified. Expect a response within 24-48 hours.
                   </p>
                   <button onClick={() => setIsSubmitted(false)} className="bg-authority-blue text-white px-16 py-8 rounded-[2rem] font-black uppercase tracking-widest text-[20px] hover:bg-steel-blue transition-all shadow-xl active:scale-95 border-b-[8px] border-slate-900">SEND ANOTHER</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FloatingInput 
                      label="Full Legal Name" 
                      icon={User} 
                      value={formData.fullName}
                      onChange={(e: any) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                    <FloatingInput 
                      label="Professional Email" 
                      icon={Mail} 
                      type="email"
                      value={formData.email}
                      onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <FloatingInput 
                    label="Motor Carrier Name" 
                    icon={Building2} 
                    value={formData.businessName}
                    onChange={(e: any) => setFormData({...formData, businessName: e.target.value})}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="relative group">
                      <select 
                        required
                        className="w-full px-8 pt-10 pb-4 rounded-[1.5rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-[18px] appearance-none cursor-pointer transition-all"
                        value={formData.currentStatus}
                        onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                      >
                        <option value="">Select Phase</option>
                        <option value="New Authority">First 90 Days</option>
                        <option value="Existing Carrier">Active Operator</option>
                        <option value="Pre-Filing">Pre-Filing Stage</option>
                      </select>
                      <label className="absolute left-8 top-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Current Phase</label>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue" size={24} />
                    </div>
                    <div className="relative group">
                      <select 
                        required
                        className="w-full px-8 pt-10 pb-4 rounded-[1.5rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-[18px] appearance-none cursor-pointer transition-all"
                        value={formData.areaOfInterest}
                        onChange={e => setFormData({...formData, areaOfInterest: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        <option value="Compliance Systems">The Four Pillars</option>
                        <option value="Audit Prep">New Entrant Audit</option>
                        <option value="Training">Training Programs</option>
                        <option value="General">General Inquiry</option>
                      </select>
                      <label className="absolute left-8 top-3 text-[11px] font-black uppercase tracking-widest text-slate-400">Primary Inquiry Area</label>
                      <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue" size={24} />
                    </div>
                  </div>

                  <div className="relative group mb-12">
                    <textarea 
                      required 
                      rows={5} 
                      className="w-full px-8 pt-12 pb-6 rounded-[2.5rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-medium text-[18px] transition-all leading-relaxed resize-none"
                      placeholder=" "
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                    />
                    <label className={`absolute left-8 transition-all duration-300 pointer-events-none uppercase font-black tracking-widest text-[12px] ${formData.message.length > 0 ? '-top-4 bg-white dark:bg-gray-800 px-3 text-authority-blue' : 'top-12 text-slate-400'}`}>Detailed Context</label>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center space-x-4 mb-8 animate-in slide-in-from-top-4">
                      <AlertCircle className="text-red-600" size={24} />
                      <p className="text-[14px] font-black uppercase text-red-700">{error}</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={sending} 
                    className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.4em] py-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(30,58,95,0.3)] hover:bg-steel-blue hover:shadow-[0_25px_60px_-12px_rgba(30,58,95,0.4)] transition-all flex items-center justify-center disabled:opacity-50 active:scale-95 group border-b-[12px] border-slate-900 text-[20px]"
                  >
                    {sending ? (
                      <span className="flex items-center">
                        {syncing ? <RefreshCw className="animate-spin mr-5" size={28} /> : <Loader2 className="animate-spin mr-5" size={28} />}
                        {syncing ? 'SYNCHRONIZING...' : 'PROCESSING...'}
                      </span>
                    ) : (
                      <>
                        <Send className="mr-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" size={24} />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                  
                  <div className="pt-12 flex flex-col items-center space-y-6">
                    <a href="mailto:contact@launchpathedu.com" className="text-[18px] font-bold text-authority-blue hover:text-signal-gold transition-colors flex items-center">
                      <Mail size={20} className="mr-4" /> contact@launchpathedu.com
                    </a>

                    <div className="h-px w-32 bg-slate-100 dark:bg-border-dark mt-4"></div>
                    
                    <Link to="/support" className="text-[13px] font-black uppercase tracking-[0.4em] text-authority-blue hover:text-signal-gold transition-colors flex items-center">
                      <MessageSquare size={16} className="mr-3" /> Member Support Portal
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Trust Signals */}
      <section className="py-32 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <div className="flex items-center justify-center space-x-16 opacity-20">
            <Anchor size={48} className="text-authority-blue" />
            <div className="h-px w-48 bg-authority-blue"></div>
            <Anchor size={48} className="text-authority-blue" />
          </div>
          <p className="text-[16px] font-black uppercase tracking-[0.6em] text-slate-400">LaunchPath™ Operating Standard</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;