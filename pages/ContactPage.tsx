
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useApp } from '../App';
import { FormSettings } from '../types';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const { settings, addFormSubmission } = useApp();
  const navigate = useNavigate();
  const [formSettings, setFormSettings] = useState<FormSettings | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchFormSettings = async () => {
      if (!db) return;
      try {
        const snap = await getDoc(doc(db, "settings", "contactForm"));
        if (snap.exists()) {
          setFormSettings(snap.data() as FormSettings);
        }
      } catch (err) {
        console.error("Failed to load form settings", err);
      }
    };
    fetchFormSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSending(true);
    
    try {
      await addDoc(collection(db, "formSubmissions"), {
        ...formData,
        status: 'unread',
        createdAt: new Date().toISOString()
      });

      addFormSubmission({
        type: 'Contact Inquiry',
        date: new Date().toISOString(),
        ...formData
      });

      setIsSubmitted(true);
      
      if (formSettings?.redirectUrl) {
        setTimeout(() => navigate(formSettings.redirectUrl!), 2000);
      }
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const currentTitle = formSettings?.title || "Expert DOT Compliance Guidance";
  const currentSubmitText = formSettings?.submitButtonText || "Send Message";
  const currentSuccessMsg = formSettings?.successMessage || "We've received your inquiry.";

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="animate-in slide-in-from-left duration-700">
            <h1 className="text-5xl font-bold font-serif mb-8">{currentTitle}</h1>
            <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 leading-relaxed">
              Have a question about your safety audit? Need help with your DQ files?
            </p>
          </div>

          <div className="bg-white dark:bg-surface-dark p-12 rounded-[3rem] shadow-xl border border-border-light dark:border-border-dark animate-in slide-in-from-right duration-700">
            {isSubmitted ? (
              <div className="text-center py-16">
                 <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-8" />
                 <h2 className="text-3xl font-bold font-serif mb-4">Message Sent</h2>
                 <p className="text-text-muted max-w-sm mx-auto">{currentSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="First Name" className="w-full px-5 py-4 rounded-xl border" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  <input required placeholder="Last Name" className="w-full px-5 py-4 rounded-xl border" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <input required type="email" placeholder="Email" className="w-full px-5 py-4 rounded-xl border" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea required rows={5} placeholder="Message" className="w-full px-5 py-4 rounded-xl border" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" disabled={sending} className="w-full bg-authority-blue text-white font-bold py-5 rounded-2xl shadow-lg">{sending ? <Loader2 className="animate-spin" /> : currentSubmitText}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
