
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from '../../firebase';
import { 
  Save, 
  Layout, 
  Mail, 
  Phone, 
  Facebook, 
  Search, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Palette,
  Eye,
  Globe,
  Award,
  ShieldCheck
} from 'lucide-react';
import { SiteSettings } from '../../types';
import MediaUploader from '../../components/admin/MediaUploader';

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'checkout' | 'seo'>('site');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!isFirebaseConfigured || !db) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "settings", "general"));
        if (snap.exists()) {
          setSettings(snap.data() as SiteSettings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings || !db) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "general"), settings);
      setMessage({ type: 'success', text: 'Global brand configurations applied.' });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Synchronization failed.' });
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
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Global Configuration</h1>
          <p className="text-text-muted mt-1 text-sm">Control the LaunchPath operating system parameters.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
          Apply Global Changes
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300 ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
        }`}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span className="text-xs font-black uppercase tracking-widest">{message.text}</span>
        </div>
      )}

      <div className="flex bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-1 rounded-2xl shadow-sm overflow-x-auto">
        {[
          { id: 'site', label: 'Identity', icon: <Layout size={16} /> },
          { id: 'contact', label: 'Inbound', icon: <Phone size={16} /> },
          { id: 'social', label: 'Networks', icon: <Facebook size={16} /> },
          { id: 'checkout', label: 'Finance', icon: <CreditCard size={16} /> },
          { id: 'seo', label: 'Indexing', icon: <Search size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-grow flex items-center justify-center space-x-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-authority-blue text-white shadow-md' 
              : 'text-text-muted hover:bg-slate-50 dark:hover:bg-gray-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'site' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">App Name</label>
                  <input 
                    value={settings.siteName}
                    onChange={e => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Secondary Accent Color</label>
                  <div className="flex space-x-4">
                    <input 
                      type="color"
                      value={settings.secondaryColor}
                      onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                      className="h-14 w-14 rounded-xl cursor-pointer bg-transparent border-none"
                    />
                    <input 
                      value={settings.secondaryColor}
                      onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                      className="flex-grow px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl outline-none font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl border border-border-light flex flex-col space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Award className="text-authority-blue" />
                        <span className="text-xs font-bold uppercase tracking-widest">Veteran Owned Badge</span>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, showVeteranBadge: !settings.showVeteranBadge})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.showVeteranBadge ? 'bg-authority-blue' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.showVeteranBadge ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>
                   <p className="text-[10px] text-text-muted leading-relaxed uppercase font-black">Displays "Veteran Owned Business" in the footer trust signals.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 border-2 border-signal-gold rounded-3xl flex flex-col space-y-4 shadow-[0_4px_20px_rgba(212,175,55,0.1)]">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-authority-blue">
                        <ShieldCheck />
                        <span className="text-xs font-bold uppercase tracking-widest">SDVOSB Badge</span>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, showDisabledVeteranBadge: !settings.showDisabledVeteranBadge})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.showDisabledVeteranBadge ? 'bg-signal-gold' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.showDisabledVeteranBadge ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>
                   <p className="text-[10px] text-text-muted leading-relaxed uppercase font-black">Displays "Service-Disabled Veteran-Owned Small Business" trust logo.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-authority-blue border-b pb-4 flex items-center">
                   <Palette size={14} className="mr-2" /> Visual Assets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Primary Brand Logo</label>
                    <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-border-light flex flex-col items-center justify-center relative overflow-hidden group">
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="max-h-[80%] max-w-[80%] object-contain drop-shadow-xl" alt="Logo" />
                      ) : (
                        <div className="text-center opacity-30">
                           <Layout size={40} className="mx-auto mb-2" />
                           <p className="text-[10px] font-bold uppercase">No Logo Map</p>
                        </div>
                      )}
                    </div>
                    <MediaUploader 
                      label="Replace Brand Logo"
                      folder="brand"
                      accept="image/*"
                      iconType="image"
                      onUploadComplete={(url) => setSettings({...settings, logoUrl: url})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Browser Favicon</label>
                    <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-border-light flex flex-col items-center justify-center relative overflow-hidden group">
                      {settings.faviconUrl ? (
                        <img src={settings.faviconUrl} className="w-16 h-16 object-contain shadow-lg rounded-xl" alt="Favicon" />
                      ) : (
                        <Globe size={40} className="opacity-30" />
                      )}
                    </div>
                    <MediaUploader 
                      label="Update Favicon"
                      folder="brand"
                      accept="image/x-icon,image/png"
                      iconType="image"
                      onUploadComplete={(url) => setSettings({...settings, faviconUrl: url})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs remain consistent with form patterns */}
          {activeTab === 'contact' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-8 animate-reveal-up">
               <h3 className="text-lg font-bold font-serif">Inbound Infrastructure</h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Public Support Email</label>
                    <input 
                      value={settings.contact.email}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Headquarters Address</label>
                    <textarea 
                      rows={3}
                      value={settings.contact.address}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
           <div className="bg-authority-blue p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <Eye className="mb-4 text-signal-gold" size={24} />
              <h4 className="text-xl font-bold font-serif mb-2">Interface Preview</h4>
              <p className="text-sm opacity-70 leading-relaxed mb-8">Brand changes synchronize across the public facing frontend and AI Advisor interfaces instantly.</p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                 <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20"></div>
                    <div className="h-2 w-24 bg-white/40 rounded-full"></div>
                 </div>
                 <div className="h-20 w-full bg-white/5 rounded-xl"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
