import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import { 
  Save, 
  Layout, 
  Mail, 
  Phone, 
  Facebook, 
  Linkedin,
  Youtube,
  Search, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Palette,
  Eye,
  Globe,
  Award,
  ShieldCheck,
  Link as LinkIcon,
  Sparkles,
  Command,
  Shield,
  Zap,
  Activity,
  HelpCircle,
  ExternalLink,
  FileText,
  Music
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SiteSettings } from '../../types';
import MediaUploader from '../../components/admin/MediaUploader';

const SettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'site' | 'contact' | 'social' | 'checkout' | 'seo'>('site');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // MailerLite status
  const mailerLiteFormId = (process.env as any).VITE_MAILERLITE_FORM_ID;
  const mailerLiteAccountId = '1989508';

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

  const handleSynthesizeIcon = async (type: 'shield' | 'truck' | 'seal') => {
    if (generating) return;
    setGenerating(true);
    setMessage({ type: 'success', text: 'Initializing AI Brand Architect...' });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptMap = {
        shield: "A high-fidelity 3D isometric corporate icon of a security shield. Color palette: deep authority blue (#1e3a5f) with signal gold (#d4af37) trim. Clean white background, studio lighting, professional logistics branding, sharp edges, 4k resolution.",
        truck: "A minimalist 3D isometric icon of a sleek modern white box truck with gold accents. Color palette: authority blue highlights. Clean white background, corporate tech style, professional, 4k resolution.",
        seal: "A professional institutional round seal for a transportation authority. Inner logo is an anchor and shield. Colors: Authority Blue and Signal Gold. 3D embossed look, white background, high-end corporate style."
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: promptMap[type] }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      let generatedImageUrl = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImageUrl && storage) {
        const res = await fetch(generatedImageUrl);
        const blob = await res.blob();
        const file = new File([blob], `brand_icon_${type}_${Date.now()}.png`, { type: "image/png" });
        
        const storageRef = ref(storage, `brand/ai_generated/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        
        setSettings(prev => prev ? { ...prev, faviconUrl: url } : null);
        setMessage({ type: 'success', text: `Success! New ${type} icon synthesized and assigned as favicon.` });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Synthesis failed. Verify API configuration.' });
    } finally {
      setGenerating(false);
      setTimeout(() => setMessage(null), 5000);
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

      <div className="flex bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark p-1 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
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
            <div className="space-y-8">
              {/* BRAND ARCHITECT TOOL */}
              <div className="bg-gradient-to-br from-authority-blue to-steel-blue p-8 sm:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-b-8 border-slate-900">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                   <Command size={180} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Sparkles className="text-signal-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif uppercase tracking-tight">AI Brand Architect</h3>
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Synthesis Terminal v2.4</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white/80 leading-relaxed max-w-xl">
                    Generate professional brand icons for your site avatar or favicon. Each synthesis is tailored to the LaunchPath Institutional standard.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    <button 
                      disabled={generating}
                      onClick={() => handleSynthesizeIcon('shield')}
                      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group"
                    >
                      {generating ? <Loader2 className="animate-spin mb-3 opacity-50" /> : <Shield className="mb-3 text-signal-gold group-hover:scale-110 transition-transform" />}
                      <span className="text-[9px] font-black uppercase tracking-widest">Shield Icon</span>
                    </button>
                    <button 
                      disabled={generating}
                      onClick={() => handleSynthesizeIcon('truck')}
                      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group"
                    >
                      {generating ? <Loader2 className="animate-spin mb-3 opacity-50" /> : <ShieldCheck className="mb-3 text-signal-gold group-hover:scale-110 transition-transform" />}
                      <span className="text-[9px] font-black uppercase tracking-widest">Fleet Icon</span>
                    </button>
                    <button 
                      disabled={generating}
                      onClick={() => handleSynthesizeIcon('seal')}
                      className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group"
                    >
                      {generating ? <Loader2 className="animate-spin mb-3 opacity-50" /> : <Award className="mb-3 text-signal-gold group-hover:scale-110 transition-transform" />}
                      <span className="text-[9px] font-black uppercase tracking-widest">Institutional Seal</span>
                    </button>
                  </div>
                </div>
              </div>

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
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Brand Avatar / Favicon</label>
                      <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-3xl border-2 border-dashed border-border-light flex flex-col items-center justify-center relative overflow-hidden group">
                        {settings.faviconUrl ? (
                          <img src={settings.faviconUrl} className="w-24 h-24 object-contain shadow-2xl rounded-[2rem] border-4 border-white dark:border-surface-dark" alt="Favicon" />
                        ) : (
                          <Globe size={40} className="opacity-30" />
                        )}
                      </div>
                      <MediaUploader 
                        label="Update Brand Avatar"
                        folder="brand"
                        accept="image/x-icon,image/png"
                        iconType="image"
                        onUploadComplete={(url) => setSettings({...settings, faviconUrl: url})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Support Phone Line</label>
                    <input 
                      value={settings.contact.phone}
                      onChange={e => setSettings({...settings, contact: {...settings.contact, phone: e.target.value}})}
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

          {activeTab === 'social' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-8 animate-reveal-up">
               <h3 className="text-lg font-bold font-serif">Social Network Connectivity</h3>
               <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center"><Facebook size={14} className="mr-2 text-[#1877F2]" /> Facebook</label>
                      <input 
                        value={settings.social.facebook || ''}
                        onChange={e => setSettings({...settings, social: {...settings.social, facebook: e.target.value}})}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl font-bold text-sm"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center"><Linkedin size={14} className="mr-2 text-[#0A66C2]" /> LinkedIn</label>
                      <input 
                        value={settings.social.linkedin || ''}
                        onChange={e => setSettings({...settings, social: {...settings.social, linkedin: e.target.value}})}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl font-bold text-sm"
                        placeholder="https://linkedin.com/company/..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center"><Youtube size={14} className="mr-2 text-[#FF0000]" /> YouTube</label>
                      <input 
                        value={settings.social.youtube || ''}
                        onChange={e => setSettings({...settings, social: {...settings.social, youtube: e.target.value}})}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl font-bold text-sm"
                        placeholder="https://youtube.com/@..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center"><Music size={14} className="mr-2 text-pink-500" /> TikTok</label>
                      <input 
                        value={settings.social.tiktok || ''}
                        onChange={e => setSettings({...settings, social: {...settings.social, tiktok: e.target.value}})}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl font-bold text-sm"
                        placeholder="https://tiktok.com/@..."
                      />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'checkout' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-8 animate-reveal-up">
               <h3 className="text-lg font-bold font-serif">Checkout & Enrollment Links</h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Self-Paced Enrollment URL</label>
                    <input 
                      value={settings.checkoutUrls?.selfPaced || ''}
                      onChange={e => setSettings({...settings, checkoutUrls: {...(settings.checkoutUrls || {selfPaced: '', mastery: '', elite: ''}), selfPaced: e.target.value}})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Mastery Enrollment URL</label>
                    <input 
                      value={settings.checkoutUrls?.mastery || ''}
                      onChange={e => setSettings({...settings, checkoutUrls: {...(settings.checkoutUrls || {selfPaced: '', mastery: '', elite: ''}), mastery: e.target.value}})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm space-y-8 animate-reveal-up">
               <h3 className="text-lg font-bold font-serif">SEO & Indexing Controls</h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Global Meta Description</label>
                    <textarea 
                      rows={4}
                      value={settings.metaDescription}
                      onChange={e => setSettings({...settings, metaDescription: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Google Analytics ID (G-XXXXXX)</label>
                    <input 
                      value={settings.googleAnalyticsId || ''}
                      onChange={e => setSettings({...settings, googleAnalyticsId: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Default OG Image URL</label>
                    <input 
                      value={settings.seo.ogImage || ''}
                      onChange={e => setSettings({...settings, seo: {...settings.seo, ogImage: e.target.value}})}
                      className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold"
                    />
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
           {/* MailerLite Monitor */}
           <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                  <Activity size={18} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue dark:text-white">Lead Capture Sync</h4>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-text-muted">Provider:</span>
                    <span className="text-authority-blue">MailerLite</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-text-muted">Registry Form ID:</span>
                    <span className={mailerLiteFormId ? "text-green-600 font-black" : "text-red-600 font-black"}>
                       {mailerLiteFormId || "NOT CONFIGURED"}
                    </span>
                 </div>
                 <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 border ${mailerLiteFormId ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {mailerLiteFormId ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
                    <p className="text-[9px] font-black uppercase leading-tight">
                       {mailerLiteFormId 
                        ? "Institutional lead capture is synchronized and reporting active." 
                        : "VITE_MAILERLITE_FORM_ID must be set in deployment environment variables."}
                    </p>
                 </div>
              </div>

              {/* SETUP GUIDE SECTION */}
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-6">
                 <div className="flex items-center space-x-2 text-authority-blue dark:text-signal-gold">
                    <HelpCircle size={14} />
                    <h5 className="text-[10px] font-black uppercase tracking-widest">Setup Guide</h5>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                       <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">Go to MailerLite &gt; Forms &gt; <span className="text-authority-blue dark:text-white">Embedded Forms</span>.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                       <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">Create a form and save it. Look at the URL in your browser.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                       <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">Your ID is the <span className="text-authority-blue dark:text-white">last number</span> in the URL (e.g. 178039977112766339).</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <div className="w-5 h-5 bg-slate-100 dark:bg-gray-800 rounded flex items-center justify-center text-[10px] font-black shrink-0">4</div>
                       <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase italic">Do not use the PDF download link as an ID.</p>
                    </div>
                 </div>
              </div>
           </div>

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