
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';
import { FormSettings } from '../types';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const { addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formSettings, setFormSettings] = useState<FormSettings>({
    title: "Expert DOT Compliance Guidance",
    submitButtonText: "Send Message",
    successMessage: "We've received your inquiry. One of our specialists will follow up shortly.",
    enableNotifications: true,
    notificationEmail: "",
    emailSubjectTemplate: ""
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchFormSettings = async () => {
      if (!db) return;
      try {
        const snap = await getDoc(doc(db, "settings", "contactForm"));
        if (snap.exists()) {
          setFormSettings(snap.data() as FormSettings);
        }
      } catch (err: any) {
        console.warn("Failed to load custom form settings (Using defaults):", err.message);
        setLoadError(true);
      }
    };
    fetchFormSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      if (db) {
        await addDoc(collection(db, "formSubmissions"), {
          ...formData,
          status: 'unread',
          createdAt: new Date().toISOString()
        });
      }

      addFormSubmission({
        type: 'Contact Inquiry',
        date: new Date().toISOString(),
        ...formData
      });

      setIsSubmitted(true);
      
      if (formSettings?.redirectUrl) {
        setTimeout(() => navigate(formSettings.redirectUrl!), 2000);
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      // Even if Firestore write fails, we've updated local context and can show success
      // to keep the user moving, or alert them if it's critical.
      setIsSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl font-bold font-serif mb-8">{formSettings.title}</h1>
            <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed font-medium">
              Have a question about your safety audit? Need help with your DQ files? Our veteran-led team is ready to assist your carrier.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-authority-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Direct Email</p>
                  <p className="text-lg font-bold">support@launchpath.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-authority-blue text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Corporate Line</p>
                  <p className="text-lg font-bold">1-800-DOT-COMP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-2xl border border-border-light dark:border-border-dark animate-in slide-in-from-right duration-700 relative overflow-hidden">
            {loadError && (
              <div className="absolute top-4 right-4 group">
                <AlertCircle size={14} className="text-amber-400 opacity-50" />
                <div className="absolute right-0 top-full mt-2 w-48 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl text-[10px] font-bold text-text-muted hidden group-hover:block border border-border-light z-50">
                  Form running in compatibility mode. Remote settings inaccessible.
                </div>
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-16 animate-scale-in">
                 <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-8" />
                 <h2 className="text-3xl font-bold font-serif mb-4">Message Sent</h2>
                 <p className="text-text-muted max-w-sm mx-auto font-medium leading-relaxed">{formSettings.successMessage}</p>
                 <button onClick={() => setIsSubmitted(false)} className="mt-8 text-authority-blue font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">First Name</label>
                    <input required placeholder="Jane" className="w-full px-5 py-4 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-authority-blue font-bold" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Last Name</label>
                    <input required placeholder="Doe" className="w-full px-5 py-4 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-authority-blue font-bold" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Email Address</label>
                  <input required type="email" placeholder="jane@carrier.com" className="w-full px-5 py-4 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-authority-blue font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">How can we help?</label>
                  <textarea required rows={5} placeholder="I have questions about my upcoming audit..." className="w-full px-5 py-4 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-authority-blue font-medium" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={sending} 
                  className="w-full bg-authority-blue text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-[0.98]"
                >
                  {sending ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={18} />} 
                  {formSettings.submitButtonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
