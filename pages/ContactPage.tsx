import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, Send, CheckCircle, Loader2, AlertCircle, ArrowRight, MessageSquare, Anchor, User, ChevronDown, Building2, Globe } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const FloatingInput = ({ label, icon: Icon, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div className="relative group mb-6">
      <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${focused || hasValue ? 'opacity-0 scale-50' : 'opacity-40 group-hover:opacity-100'}`}>
        <Icon size={18} className="text-authority-blue" />
      </div>
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white dark:bg-gray-800 border-2 transition-all duration-300 px-6 pt-7 pb-3 rounded-2xl outline-none font-bold text-text-primary dark:text-white shadow-sm hover:shadow-md focus:shadow-xl ${
          focused ? 'border-authority-blue' : 'border-slate-100 dark:border-border-dark'
        } ${!Icon ? 'pl-6' : 'pl-14'}`}
        placeholder=" "
      />
      <label
        className={`absolute left-1 transition-all duration-300 pointer-events-none uppercase font-black tracking-widest text-[10px] ${
          focused || hasValue
            ? '-top-2.5 left-4 bg-white dark:bg-gray-800 px-2 text-authority-blue'
            : `top-1/2 -translate-y-1/2 text-slate-400 ${!Icon ? 'left-6' : 'left-14'}`
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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      if (!db) {
        throw new Error("Cloud synchronization is currently offline. Please verify connection.");
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
      setError(err.message || "An unexpected error occurred while transmitting your inquiry.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full mb-8">
            <Anchor size={14} className="text-authority-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">Institutional Connection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white mb-6 uppercase tracking-tighter leading-none">
            Direct <span className="text-signal-gold italic">Advisory</span> Link
          </h1>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted max-w-2xl font-bold leading-relaxed">
            Secure communication channel for motor carriers entering the 90-Day Stabilization Window.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 h-full">
            <div className="relative h-full min-h-[600px] w-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white dark:border-surface-dark group">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200" 
                alt="Carrier Operations" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-authority-blue/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl">
                  <h3 className="text-white text-2xl font-black font-serif uppercase tracking-tight mb-2">Operating Integrity</h3>
                  <p className="text-white/70 text-sm font-medium leading-relaxed italic">
                    "Stewardship is the prerequisite for momentum. We help you establish order before you seek scale."
                  </p>
                </div>
                <div className="flex items-center space-x-4 px-6">
                  <div className="w-10 h-10 rounded-xl bg-signal-gold flex items-center justify-center text-authority-blue">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Institutional Guard Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 flex items-center">
            <div className="w-full bg-white dark:bg-surface-dark p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(30,58,95,0.08)] border border-slate-100 dark:border-border-dark relative overflow-hidden h-fit">
              {isSubmitted ? (
                <div className="text-center py-20 animate-scale-in">
                   <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg border border-green-100">
                      <CheckCircle size={48} />
                   </div>
                   <h2 className="text-4xl font-black font-serif mb-6 uppercase tracking-tight text-authority-blue dark:text-white">Uplink Secured</h2>
                   <p className="text-slate-500 max-w-sm mx-auto font-bold leading-relaxed mb-12">
                     A compliance specialist has been notified. Expect a formal response within one business day.
                   </p>
                   <button onClick={() => setIsSubmitted(false)} className="bg-authority-blue text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95">Send New Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative group">
                      <select 
                        required
                        className="w-full px-6 pt-7 pb-3 rounded-2xl bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-sm appearance-none cursor-pointer transition-all"
                        value={formData.currentStatus}
                        onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                      >
                        <option value="">Select Phase</option>
                        <option value="New Authority">First 90 Days</option>
                        <option value="Existing Carrier">Active Operator</option>
                        <option value="Pre-Filing">Pre-Filing Stage</option>
                      </select>
                      <label className="absolute left-6 top-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Current Phase</label>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue" size={16} />
                    </div>
                    <div className="relative group">
                      <select 
                        required
                        className="w-full px-6 pt-7 pb-3 rounded-2xl bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-bold text-sm appearance-none cursor-pointer transition-all"
                        value={formData.areaOfInterest}
                        onChange={e => setFormData({...formData, areaOfInterest: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        <option value="Compliance Systems">The Four Pillars</option>
                        <option value="Audit Prep">New Entrant Audit</option>
                        <option value="Training">Training Programs</option>
                        <option value="General">General Inquiry</option>
                      </select>
                      <label className="absolute left-6 top-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Primary Inquiry Area</label>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-authority-blue" size={16} />
                    </div>
                  </div>

                  <div className="relative group mb-10">
                    <textarea 
                      required 
                      rows={5} 
                      className="w-full px-6 pt-8 pb-4 rounded-[2rem] bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark focus:border-authority-blue outline-none font-medium text-sm transition-all leading-relaxed resize-none"
                      placeholder=" "
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                    />
                    <label className={`absolute left-6 transition-all duration-300 pointer-events-none uppercase font-black tracking-widest text-[10px] ${formData.message.length > 0 ? '-top-2.5 bg-white dark:bg-gray-800 px-2 text-authority-blue' : 'top-8 text-slate-400'}`}>Detailed Context</label>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center space-x-3 mb-6 animate-in slide-in-from-top-4">
                      <AlertCircle className="text-red-600" size={18} />
                      <p className="text-[10px] font-black uppercase text-red-700">{error}</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={sending} 
                    className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.4em] py-8 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(30,58,95,0.3)] hover:bg-steel-blue hover:shadow-[0_25px_60px_-12px_rgba(30,58,95,0.4)] transition-all flex items-center justify-center disabled:opacity-50 active:scale-95 group border-b-8 border-slate-900"
                  >
                    {sending ? <Loader2 className="animate-spin mr-4" size={24} /> : <Send className="mr-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />} 
                    Establish Advisory Connection
                  </button>
                  
                  <div className="pt-8 flex flex-col items-center space-y-4">
                    <p className="text-[9px] text-slate-400 uppercase tracking-[0.4em] font-black opacity-60">High-Trust Environment • Administrative Protocol Active</p>
                    <div className="h-px w-20 bg-slate-100 dark:bg-border-dark"></div>
                    <Link to="/support" className="text-[10px] font-black uppercase tracking-widest text-authority-blue hover:text-signal-gold transition-colors flex items-center">
                      <MessageSquare size={12} className="mr-2" /> Member Support Portal (Paid Enrollees)
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Trust Signals */}
      <section className="py-24 bg-white dark:bg-surface-dark border-t border-slate-100 dark:border-border-dark">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="flex items-center justify-center space-x-12 opacity-20">
            <Anchor size={32} className="text-authority-blue" />
            <div className="h-px w-32 bg-authority-blue"></div>
            <Anchor size={32} className="text-authority-blue" />
          </div>
          <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-400">LaunchPath™ Operating Standard</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;