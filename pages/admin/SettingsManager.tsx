
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import { 
  Save, 
  Globe, 
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
  Layout, 
  Palette, 
  Image as ImageIcon, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Code,
  Zap,
  Award
} from 'lucide-react';
import { SiteSettings } from '../../types';

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'seo'>('site');
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
                  <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Favicon (32x32 ICO/PNG)</label>
                      <div className="w-24 h-24 bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center relative">
                        {settings.faviconUrl ? (
                          <img src={settings.faviconUrl} className="w-12 h-12 object-contain" alt="Favicon" />
                        ) : (
                          <ImageIcon className="text-text-muted opacity-30" size={24} />
                        )}
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'faviconUrl')}
                        />
                      </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold font-serif border-b pb-4 flex items-center">
                   <Zap className="mr-2 text-signal-gold" size={20} /> Home Hero Defaults
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Hero Headline</label>
                    <input 
                      value={settings.heroTitle}
                      onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      value={settings.heroSubtitle}
                      onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold font-serif border-b pb-4 flex items-center">
                   <Award className="mr-2 text-authority-blue" size={20} /> Badges & Credentials
                </h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-border-light">
                   <div>
                     <p className="text-sm font-bold">Veteran-Owned Business Badge</p>
                     <p className="text-xs text-text-muted mt-1">Show Service-Disabled Veteran Owned status in footer.</p>
                   </div>
                   <button 
                    type="button"
                    onClick={() => setSettings({...settings, showVeteranBadge: !settings.showVeteranBadge})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.showVeteranBadge ? 'bg-authority-blue' : 'bg-gray-300'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.showVeteranBadge ? 'right-1' : 'left-1'}`}></div>
                   </button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue flex items-center">
                  <Palette size={14} className="mr-2" /> Theme Customization
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-border-light">
                    <input 
                      type="color" 
                      value={settings.primaryColor}
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                    />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Primary Brand</p>
                      <p className="text-xs font-mono">{settings.primaryColor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-border-light">
                    <input 
                      type="color" 
                      value={settings.secondaryColor}
                      onChange={e => setSettings({...settings, secondaryColor: e.target.value})}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden"
                    />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Accent Gold</p>
                      <p className="text-xs font-mono">{settings.secondaryColor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-6 animate-in slide-in-from-right duration-300">
               <h3 className="text-lg font-bold font-serif border-b pb-4">Regional & Contact Data</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Public Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        value={settings.contact.email}
                        onChange={e => setSettings({...settings, contact: {...settings.contact, email: e.target.value}})}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Inbound Phone Line</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        value={settings.contact.phone}
                        onChange={e => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      />
                    </div>
                  </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Physical/Corporate Address</label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      value={settings.contact.address}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, address: e.target.value}})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                    />
                  </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Office Operating Hours</label>
                 <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input 
                      value={settings.contact.hours}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, hours: e.target.value}})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="e.g. Mon-Fri: 9am - 6pm EST"
                    />
                  </div>
               </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-6 animate-in slide-in-from-right duration-300">
               <h3 className="text-lg font-bold font-serif border-b pb-4">Social Ecosystem Links</h3>
               <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Facebook size={20} />
                    </div>
                    <input 
                      value={settings.social.facebook || ''}
                      onChange={e => setSettings({...settings, social: {...settings.social, facebook: e.target.value}})}
                      className="flex-grow px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="Facebook Profile URL"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center shrink-0">
                      <Twitter size={20} />
                    </div>
                    <input 
                      value={settings.social.twitter || ''}
                      onChange={e => setSettings({...settings, social: {...settings.social, twitter: e.target.value}})}
                      className="flex-grow px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="Twitter / X Profile URL"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
                      <Linkedin size={20} />
                    </div>
                    <input 
                      value={settings.social.linkedin || ''}
                      onChange={e => setSettings({...settings, social: {...settings.social, linkedin: e.target.value}})}
                      className="flex-grow px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="LinkedIn Company URL"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center shrink-0">
                      <Instagram size={20} />
                    </div>
                    <input 
                      value={settings.social.instagram || ''}
                      onChange={e => setSettings({...settings, social: {...settings.social, instagram: e.target.value}})}
                      className="flex-grow px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="Instagram Profile URL"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                      <Youtube size={20} />
                    </div>
                    <input 
                      value={settings.social.youtube || ''}
                      onChange={e => setSettings({...settings, social: {...settings.social, youtube: e.target.value}})}
                      className="flex-grow px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                      placeholder="YouTube Channel URL"
                    />
                  </div>
               </div>
            </div>
          )}

          {/* SEO & Tracking Tab */}
          {activeTab === 'seo' && (
            <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-6 animate-in slide-in-from-right duration-300">
               <h3 className="text-lg font-bold font-serif border-b pb-4">SEO & Traffic Analytics</h3>
               
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Global Title Format</label>
                 <input 
                    value={settings.seo.titleFormat}
                    onChange={e => setSettings({...settings, seo: {...settings.seo, titleFormat: e.target.value}})}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm font-mono"
                    placeholder="e.g. {{pageTitle}} | LaunchPath"
                 />
                 <p className="text-[9px] text-text-muted italic">Use &#123;&#123;pageTitle&#125;&#125; as a dynamic placeholder.</p>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Default Meta Description</label>
                 <textarea 
                    rows={4}
                    value={settings.metaDescription}
                    onChange={e => setSettings({...settings, metaDescription: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm leading-relaxed"
                    placeholder="Recommended length: 150-160 characters."
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center">
                      <BarChart3 size={12} className="mr-1" /> Google Analytics ID
                    </label>
                    <input 
                      value={settings.googleAnalyticsId || ''}
                      onChange={e => setSettings({...settings, googleAnalyticsId: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs font-mono"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center">
                      <Code size={12} className="mr-1" /> Facebook Pixel ID
                    </label>
                    <input 
                      value={settings.facebookPixelId || ''}
                      onChange={e => setSettings({...settings, facebookPixelId: e.target.value})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs font-mono"
                      placeholder="Pixel ID"
                    />
                  </div>
               </div>

               <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Twitter Card Type</label>
                  <select 
                    value={settings.seo.twitterCard}
                    onChange={e => setSettings({...settings, seo: {...settings.seo, twitterCard: e.target.value as any}})}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                  </select>
               </div>

               <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Default OpenGraph Share Image</label>
                  <div className="aspect-[1.91/1] bg-slate-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center relative overflow-hidden group">
                    {settings.seo.ogImage ? (
                      <img src={settings.seo.ogImage} className="w-full h-full object-cover" alt="OG Preview" />
                    ) : (
                      <ImageIcon className="text-text-muted opacity-30" size={40} />
                    )}
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'ogImage')}
                    />
                  </div>
               </div>

               <div className="space-y-2 pt-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Organization Schema Markup (JSON-LD)</label>
                 <textarea 
                    rows={6}
                    value={settings.seo.schemaMarkup || ''}
                    onChange={e => setSettings({...settings, seo: {...settings.seo, schemaMarkup: e.target.value}})}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-xs font-mono"
                    placeholder='{ "@context": "https://schema.org", "@type": "Organization", ... }'
                 />
               </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
           {/* Summary Stats/Info */}
           <div className="bg-authority-blue text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
             <ShieldCheck className="mb-4 text-signal-gold" size={32} />
             <h3 className="text-xl font-bold font-serif mb-4">Core Settings Sync</h3>
             <p className="text-sm opacity-80 leading-relaxed mb-8">
               Modifying these settings impacts the live site immediately. Ensure brand colors maintain WCAG accessibility standards before applying.
             </p>
             <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                   <span className="opacity-60">Last Updated</span>
                   <span className="font-bold">Today</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                   <span className="opacity-60">Config Profile</span>
                   <span className="font-bold uppercase">Production</span>
                </div>
             </div>
           </div>

           <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-border-light dark:border-border-dark space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Live Brand Preview</h4>
              <div className="p-4 rounded-xl border border-border-light flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: settings.primaryColor }}>
                    {settings.siteName?.charAt(0) || 'L'}
                 </div>
                 <div>
                    <p className="text-sm font-bold">{settings.siteName}</p>
                    <p className="text-[10px] text-text-muted">{settings.tagline}</p>
                 </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-800 space-y-2">
                 <h5 className="text-[10px] font-bold text-text-muted">Hero Preview</h5>
                 <p className="text-xs font-bold leading-tight">{settings.heroTitle}</p>
                 <p className="text-[10px] line-clamp-2 text-text-muted">{settings.heroSubtitle}</p>
              </div>
              <button 
                style={{ backgroundColor: settings.primaryColor }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm shadow-md"
              >
                Sample Button
              </button>
              <p className="text-[10px] text-center italic text-text-muted" style={{ color: settings.secondaryColor }}>
                Sample Secondary Accent Text
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
