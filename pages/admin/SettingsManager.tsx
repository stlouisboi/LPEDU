
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import { 
  Save, 
  Layout, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Search, 
  ShieldCheck, 
  Palette, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Code,
  Zap,
  Award,
  CreditCard,
  Link as LinkIcon
} from 'lucide-react';
import { SiteSettings } from '../../types';

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'seo' | 'checkout'>('site');
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
      setMessage({ type: 'success', text: 'Global settings synchronized successfully.' });
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, field: 'logoUrl' | 'faviconUrl' | 'ogImage') => {
    if (!storage) return;
    setSaving(true);
    try {
      const storageRef = ref(storage, `brand/${field}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      if (field === 'ogImage') {
        setSettings(prev => prev ? { ...prev, seo: { ...prev.seo, ogImage: url } } : null);
      } else {
        setSettings(prev => prev ? { ...prev, [field]: url } : null);
      }
    } catch (err) {
      alert("Asset upload failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;
  if (!settings) return null;

  const checkoutUrls = settings?.checkoutUrls || { selfPaced: '', mastery: '', elite: '' };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Global Configuration</h1>
          <p className="text-text-muted mt-1">Manage core brand identity, tracking, and regional data.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-steel-blue transition-all disabled:opacity-50"
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
          <span className="text-sm font-bold">{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-1 rounded-2xl shadow-sm overflow-x-auto whitespace-nowrap">
        {[
          { id: 'site', label: 'Site Identity', icon: <Layout size={16} /> },
          { id: 'contact', label: 'Contact Info', icon: <Phone size={16} /> },
          { id: 'social', label: 'Social Media', icon: <Facebook size={16} /> },
          { id: 'checkout', label: 'Checkout Config', icon: <CreditCard size={16} /> },
          { id: 'seo', label: 'SEO & Tracking', icon: <Search size={16} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-grow flex items-center justify-center space-x-2 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
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
        <div className="lg:col-span-2 space-y-8">
          
          {/* Site Identity Tab */}
          {activeTab === 'site' && (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-serif border-b pb-4">Brand Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Site Name</label>
                    <input 
                      value={settings.siteName}
                      onChange={e => setSettings({...settings, siteName: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Tagline</label>
                    <input 
                      value={settings.tagline}
                      onChange={e => setSettings({...settings, tagline: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Site Logo</label>
                      <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center p-4 relative group">
                        {settings.logoUrl ? (
                          <img src={settings.logoUrl} className="max-h-full max-w-full object-contain" alt="Logo Preview" />
                        ) : (
                          <ImageIcon className="text-text-muted opacity-30" size={32} />
                        )}
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logoUrl')}
                        />
                      </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
