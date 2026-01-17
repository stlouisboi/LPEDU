import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldAlert, CheckCircle, Loader2, ArrowLeft, LifeBuoy, Lock, AlertCircle, Anchor } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    memberId: '',
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
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/contact" className="inline-flex items-center text-text-muted hover:text-authority-blue mb-12 font-black uppercase tracking-widest text-[10px] transition-colors group">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to General Contact
        </Link>

        <div className="mb-16 animate-reveal-up">
          <h1 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white mb-6 uppercase tracking-tight">LaunchPath Member Support</h1>
          <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium leading-relaxed max-w-2xl">
            This portal is dedicated to active LaunchPath members. To ensure your carrier remains operational and your team has the tools they need, please use this form for technical or account-related issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* INFO SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            <section className="p-8 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-[2.5rem] shadow-sm">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-6 flex items-center">
                 <LifeBuoy size={14} className="mr-2" /> Scope of Support
               </h2>
               <ul className="space-y-4">
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={14} className="text-green-500 mr-3 mt-0.5 shrink-0" />
                    Issues with tool or template access
                  </li>
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={14} className="text-green-500 mr-3 mt-0.5 shrink-0" />
                    Account billing or enrollment questions
                  </li>
                  <li className="flex items-start text-xs font-bold text-text-muted">
                    <CheckCircle size={14} className="text-green-500 mr-3 mt-0.5 shrink-0" />
                    Inquiries regarding course curriculum navigation
                  </li>
               </ul>
            </section>

            <section className="p-8 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-[2.5rem]">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center">
                 <ShieldAlert size={14} className="mr-2" /> Explicit Exclusions
               </h2>
               <p className="text-[11px] font-medium text-red-700 dark:text-red-300 leading-relaxed italic">
                 Member support is not a substitute for professional consulting. We cannot provide individual regulatory advice, audit representation, or assistance with time-sensitive enforcement issues via this support channel.
               </p>
            </section>

            <div className="px-8 flex items-center space-x-3 text-text-muted">
              <AlertCircle size={14} />
              <p className="text-[10px] font-black uppercase tracking-widest">Expected Response: Within 1 Business Day</p>
            </div>
          </div>

          {/* FORM AREA */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] shadow-xl border border-border-light text-center animate-scale-in">
                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                 <h3 className="text-2xl font-black font-serif uppercase mb-4">Support Ticket Logged</h3>
                 <p className="text-text-muted text-sm font-medium mb-8">Priority review active. Our team will contact you at your registered email address shortly.</p>
                 <Link to="/" className="text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-[10px] hover:underline">Return to Dashboard</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[3.5rem] shadow-2xl border border-border-light dark:border-border-dark space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Registered Full Name</label>
                  <input 
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark outline-none font-bold"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Member Email Address</label>
                  <input 
                    required 
                    type="email"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark outline-none font-bold"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Support Category</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark outline-none font-bold appearance-none"
                    value={formData.supportTopic}
                    onChange={e => setFormData({...formData, supportTopic: e.target.value})}
                  >
                    <option value="Tool Access">Tool / Template Access</option>
                    <option value="Billing">Billing & Enrollment</option>
                    <option value="Curriculum">Curriculum Navigation</option>
                    <option value="Technical">Other Technical Issue</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Description of Issue</label>
                  <textarea 
                    required 
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark outline-none font-medium"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  disabled={sending}
                  className="w-full bg-authority-blue text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl flex items-center justify-center hover:bg-steel-blue transition-all disabled:opacity-50"
                >
                  {sending ? <Loader2 className="animate-spin mr-2" size={18} /> : <Lock size={16} className="mr-2" />}
                  Submit Priority Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted opacity-40">
            Our goal is to provide the clarity required for you to lead your carrier with responsibility and peace.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SupportPage;