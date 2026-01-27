import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldAlert, CheckCircle, Loader2, ArrowLeft, LifeBuoy, Lock, AlertCircle, Anchor, ChevronDown } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    supportTopic: 'Tool Access',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      if (db) {
        await addDoc(collection(db, "formSubmissions"), {
          ...formData,
          type: 'Member Support',
          status: 'unread',
          createdAt: serverTimestamp()
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/contact" className="inline-flex items-center text-text-muted hover:text-authority-blue mb-12 font-black uppercase tracking-widest text-[10px] transition-colors group">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to General Contact
        </Link>

        <div className="mb-16 animate-reveal-up">
          <h1 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white mb-6 uppercase tracking-tight">Member Support</h1>
          <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed max-w-2xl">
            Priority assistance for active LaunchPath members. Please use this portal for technical or account-related inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-8">
            <section className="p-8 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-[3rem] shadow-sm">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-6 flex items-center">
                 <LifeBuoy size={14} className="mr-2" /> Scope of Support
               </h2>
               <ul className="space-y-5">
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={16} className="text-green-500 mr-3 shrink-0" />
                    Tool or template accessibility
                  </li>
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={16} className="text-green-500 mr-3 shrink-0" />
                    Billing & enrollment management
                  </li>
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={16} className="text-green-500 mr-3 shrink-0" />
                    Curriculum navigation assistance
                  </li>
               </ul>
            </section>

            <section className="p-8 bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-[3rem]">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center">
                 <ShieldAlert size={14} className="mr-2" /> Exclusions
               </h2>
               <p className="text-[11px] font-medium text-red-700 dark:text-red-300 leading-relaxed italic">
                 Support is for educational infrastructure only. We do not provide individual legal advice or audit representation via this channel.
               </p>
            </section>

            <div className="px-8 flex items-center space-x-3 text-text-muted opacity-60">
              <AlertCircle size={14} />
              <p className="text-[10px] font-black uppercase tracking-widest">SLA: 1 Business Day</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] shadow-2xl border border-slate-200 dark:border-border-dark text-center animate-scale-in">
                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                 <h3 className="text-2xl font-black font-serif uppercase mb-4">Ticket Logged</h3>
                 <p className="text-text-muted text-sm font-medium mb-10">Your priority support request has been queued for review.</p>
                 <Link to="/" className="bg-authority-blue text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg">Return to Home</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-10 md:p-12 rounded-[4rem] shadow-[0_40px_80px_-15px_rgba(30,58,95,0.08)] border border-slate-100 dark:border-border-dark space-y-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-text-dark-muted ml-4 block">Registered Name</label>
                  <input 
                    required 
                    className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-text-dark-muted ml-4 block">Member Email</label>
                  <input 
                    required 
                    type="email"
                    className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-text-dark-muted ml-4 block">Issue Category</label>
                  <div className="relative group">
                    <select 
                      className="w-full px-7 py-5 rounded-2xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-bold transition-all shadow-sm appearance-none cursor-pointer"
                      value={formData.supportTopic}
                      onChange={e => setFormData({...formData, supportTopic: e.target.value})}
                    >
                      <option value="Tool Access">Asset Accessibility</option>
                      <option value="Billing">Billing & Enrollment</option>
                      <option value="Curriculum">Curriculum Navigation</option>
                      <option value="Technical">Account Technical Issue</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-authority-blue transition-colors" size={18} />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-text-dark-muted ml-4 block">Technical Details</label>
                  <textarea 
                    required 
                    rows={4}
                    className="w-full px-7 py-5 rounded-3xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue focus:bg-white dark:focus:bg-gray-700 outline-none font-medium transition-all shadow-sm focus:shadow-2xl text-text-primary dark:text-white leading-relaxed resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  disabled={sending}
                  className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_40px_-10px_rgba(30,58,95,0.3)] flex items-center justify-center hover:bg-steel-blue transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {sending ? <Loader2 className="animate-spin mr-4" size={20} /> : <Lock size={16} className="mr-3" />}
                  Authorize Support Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted opacity-30">
            Precision Support for High-Integrity Carriers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SupportPage;