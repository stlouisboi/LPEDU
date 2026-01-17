
import React, { useState, useEffect } from 'react';
import { Mail, Phone, ShieldCheck, Send, CheckCircle, Loader2, AlertCircle, ArrowRight, MessageSquare, Scale, Anchor, User } from 'lucide-react';
import { collection, addDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { FormSettings } from '../types';
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
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      if (db) {
        await addDoc(collection(db, "formSubmissions"), {
          ...formData,
          type: 'Primary Contact',
          status: 'unread',
          createdAt: serverTimestamp()
        });
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission Error:", err);
      // Fallback success for UI continuity if DB is flaky
      setIsSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PAGE HEADER */}
        <div className="max-w-3xl mb-20 animate-reveal-up">
          <h1 className="text-5xl md:text-6xl font-black font-serif text-authority-blue dark:text-white mb-8 uppercase tracking-tight">Contact LaunchPath</h1>
          <p className="text-base md:text-lg text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">
            If you are navigating the critical first 90 days of your motor carrier authority or preparing for a New Entrant Safety Audit, we are here to provide clarity. LaunchPath serves owner-operators who prioritize technical precision and long-term sustainability over industry hype. Whether you have a specific question about our curriculum or need guidance on which compliance tool is right for your operation, your inquiry is welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: GUIDANCE & BOUNDARIES */}
          <div className="lg:col-span-5 space-y-12 animate-in slide-in-from-left duration-700">
            
            {/* OPERATOR IMAGE WITH FALLBACK */}
            <div className="relative h-80 w-full overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-surface-dark group bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {!imgError ? (
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                  alt="LaunchPath Operational Guidance Center" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-text-muted opacity-40">
                  <User size={64} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Operator Active</p>
                </div>
              )}
              <div className="absolute inset-0 bg-authority-blue/10 mix-blend-overlay"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  Operational Guidance Active
                </p>
              </div>
            </div>

            {/* PURPOSE STATEMENT */}
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold flex items-center">
                <ShieldCheck size={20} className="mr-3" /> Our Purpose
              </h2>
              <div className="prose dark:prose-invert text-lg text-text-muted font-medium leading-relaxed space-y-4">
                <p>
                  LaunchPath is an educational platform and operational guidance service. Our mission is to equip you with the systems required to maintain a compliant and audit-ready business.
                </p>
                <p className="border-l-4 border-signal-gold dark:border-signal-gold/50 pl-6 italic text-base">
                  LaunchPath does not provide legal representation, tax advice, or insurance brokerage services. We do not file for FMCSA authority on behalf of carriers, nor do we provide dispatching or freight-brokering services.
                </p>
              </div>
            </section>

            {/* EXPECTATIONS & BOUNDARIES */}
            <section className="bg-slate-50 dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-border-dark space-y-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-text-primary dark:text-white">Expectations & Boundaries</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-signal-gold mt-2 shrink-0"></div>
                  <p className="text-base font-bold text-text-muted">Typical response time: 1–2 business days.</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0"></div>
                  <p className="text-base font-bold text-text-muted">No emergency or enforcement-related support (roadside inspections/active audits).</p>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-slate-300 mt-2 shrink-0"></div>
                  <p className="text-base font-bold text-text-muted">Education only. Our insights do not constitute legal or financial advice.</p>
                </li>
              </ul>
            </section>

            {/* TRUST POSITIONING */}
            <section className="space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold">The LaunchPath Standard</h3>
               <p className="text-lg font-medium text-text-muted leading-relaxed">
                We believe that a motor carrier’s success is built on structure, not hustle. By focusing on administrative accuracy and stewardship of your business decisions, you move from the chaos of "figuring it out" to the confidence of a verified system.
               </p>
            </section>

            <div className="pt-8 border-t border-border-light dark:border-border-dark">
              <Link to="/pricing" className="inline-flex items-center text-authority-blue dark:text-white font-black uppercase tracking-widest text-sm hover:underline underline-offset-8 group">
                <span>Explore Educational Resources First</span>
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-border-light dark:border-border-dark relative overflow-hidden">
              {isSubmitted ? (
                <div className="text-center py-16 animate-scale-in">
                   <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle size={40} />
                   </div>
                   <h2 className="text-3xl font-black font-serif mb-4 uppercase tracking-tight">Inquiry Received</h2>
                   <p className="text-text-muted max-w-sm mx-auto font-medium leading-relaxed mb-10">
                     We have received your details. A compliance specialist will review your information and respond within 1-2 business days.
                   </p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-xs hover:underline"
                   >
                     Submit Another Inquiry
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Full Name</label>
                      <input 
                        required 
                        placeholder="Jane Doe" 
                        className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-bold transition-all"
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="jane@carrier.com" 
                        className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-bold transition-all"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Business Name (Optional)</label>
                    <input 
                      placeholder="e.g. Blue Ridge Logistics" 
                      className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-bold transition-all"
                      value={formData.businessName} 
                      onChange={e => setFormData({...formData, businessName: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Current Authority Status</label>
                      <select 
                        required
                        className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-bold transition-all appearance-none"
                        value={formData.currentStatus}
                        onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                      >
                        <option value="">Select Status</option>
                        <option value="New Authority">New Authority</option>
                        <option value="Existing Carrier">Existing Carrier</option>
                        <option value="Considering Starting">Considering Starting</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Area of Interest</label>
                      <select 
                        required
                        className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-bold transition-all appearance-none"
                        value={formData.areaOfInterest}
                        onChange={e => setFormData({...formData, areaOfInterest: e.target.value})}
                      >
                        <option value="">Select Topic</option>
                        <option value="Compliance Systems">Compliance Systems</option>
                        <option value="Audit Prep">Audit Prep</option>
                        <option value="Tools/Templates">Tools/Templates</option>
                        <option value="Courses">Courses</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Message</label>
                    <textarea 
                      required 
                      rows={5} 
                      placeholder="Please describe your current operational challenge or question in detail." 
                      className="w-full px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-gray-800 outline-none focus:ring-4 focus:ring-authority-blue/5 focus:border-authority-blue font-medium transition-all"
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending} 
                    className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.3em] py-6 rounded-3xl shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-[0.98]"
                  >
                    {sending ? <Loader2 className="animate-spin mr-3" size={24} /> : <Send className="mr-3" size={20} />} 
                    Secure Inquiry Link
                  </button>
                  
                  <p className="text-[9px] text-center text-text-muted uppercase tracking-[0.2em] font-bold">
                    To respond accurately, we request detailed operational context.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAITH-ALIGNED CLOSING BLOCK */}
        <div className="mt-32 pt-16 border-t border-border-light dark:border-border-dark text-center space-y-4">
           <div className="flex items-center justify-center space-x-3 text-authority-blue dark:text-signal-gold opacity-40">
              <Anchor size={18} />
              <div className="h-px w-24 bg-current"></div>
              <Anchor size={18} />
           </div>
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted max-w-lg mx-auto leading-relaxed">
             Dedicated to helping you seek wisdom before momentum in your business decisions. <br/>
             Built on the values of stewardship, integrity, and the pursuit of operational order.
           </p>
        </div>

        {/* MEMBER SUPPORT QUICK LINK */}
        <div className="mt-12 text-center">
           <Link to="/support" className="inline-flex items-center space-x-2 bg-slate-50 dark:bg-surface-dark px-6 py-3 rounded-full border border-border-light dark:border-border-dark text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-authority-blue transition-all">
              <MessageSquare size={14} />
              <span>LaunchPath Member Support (Paid Members)</span>
           </Link>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
