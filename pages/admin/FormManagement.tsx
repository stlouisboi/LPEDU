
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Save, 
  MessageSquare, 
  Bell, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Settings,
  Zap
} from 'lucide-react';
import { FormSettings } from '../../types';
import { Link } from 'react-router-dom';

const FormManagement = () => {
  const [settings, setSettings] = useState<FormSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!isFirebaseConfigured || !db) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "settings", "contactForm");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSettings(snap.data() as FormSettings);
        } else {
          setSettings({
            title: 'Expert DOT Compliance Guidance',
            submitButtonText: 'Send Message',
            successMessage: "We've received your inquiry. One of our compliance specialists will reach out within 24 business hours.",
            enableNotifications: true,
            notificationEmail: 'guidance@launchpath.com',
            emailSubjectTemplate: 'New Contact Inquiry: {{firstName}} {{lastName}}'
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !db) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "contactForm"), settings);
      setMessage({ type: 'success', text: 'Form configuration updated successfully.' });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;
  if (!settings) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Contact Form Configuration</h1>
          <p className="text-text-muted mt-1">Control how your leads interact with your brand.</p>
        </div>
        <Link 
          to="/admin/forms/submissions" 
          className="bg-white dark:bg-gray-800 text-authority-blue dark:text-white border border-border-light dark:border-border-dark px-6 py-3 rounded-xl font-bold flex items-center shadow-sm hover:bg-slate-50 transition-all"
        >
          <MessageSquare size={18} className="mr-2" /> View Submissions
        </Link>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-serif flex items-center text-authority-blue dark:text-white border-b pb-4 border-border-light">
              <Settings className="mr-2" size={20} /> Interface Customization
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Form Title</label>
              <input 
                value={settings.title}
                onChange={e => setSettings({...settings, title: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Submit Button Text</label>
              <input 
                value={settings.submitButtonText}
                onChange={e => setSettings({...settings, submitButtonText: e.target.value})}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Success Message</label>
              <textarea 
                rows={4}
                value={settings.successMessage}
                onChange={e => setSettings({...settings, successMessage: e.target.value})}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Redirect URL (Optional)</label>
              <input 
                value={settings.redirectUrl || ''}
                placeholder="e.g. /thank-you"
                onChange={e => setSettings({...settings, redirectUrl: e.target.value})}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-serif flex items-center text-authority-blue dark:text-white border-b pb-4 border-border-light">
              <Bell className="mr-2" size={20} /> Notifications
            </h3>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
               <span className="text-xs font-bold uppercase tracking-widest dark:text-gray-300">Enable Email Alerts</span>
               <button 
                type="button"
                onClick={() => setSettings({...settings, enableNotifications: !settings.enableNotifications})}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.enableNotifications ? 'bg-authority-blue' : 'bg-gray-300'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.enableNotifications ? 'right-1' : 'left-1'}`}></div>
               </button>
            </div>

            {settings.enableNotifications && (
              <div className="space-y-4 animate-in slide-in-from-top duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Notification Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      type="email"
                      value={settings.notificationEmail}
                      onChange={e => setSettings({...settings, notificationEmail: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-gray-400">Subject Template</label>
                  <input 
                    value={settings.emailSubjectTemplate}
                    onChange={e => setSettings({...settings, emailSubjectTemplate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-authority-blue p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <Zap className="mb-4 text-signal-gold" size={24} />
            <h4 className="font-bold text-lg mb-2">Automated Leads</h4>
            <p className="text-sm opacity-70 leading-relaxed mb-8">All submissions are securely stored in the cloud knowledge base and can be exported for CRM use.</p>
            <button 
              type="submit"
              disabled={saving}
              className="w-full bg-signal-gold text-authority-blue py-4 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
              Save All Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormManagement;
