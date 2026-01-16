import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import ReactQuill from 'react-quill';
import { 
  Save, 
  Send, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Eye,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { HomepageContent } from '../../types';
import HomePage from '../HomePage';

const HomePageEditor = () => {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!isFirebaseConfigured || !db || !(db as any).app) {
        setError("Firebase is not configured. Local edits will not be saved.");
        setLoading(false);
        return;
      }

      try {
        const draftRef = doc(db, "pages", "home_draft");
        const snap = await getDoc(draftRef);
        if (snap.exists()) {
          setContent(snap.data() as HomepageContent);
        } else {
          setContent({
            hero: { headline: '', subheadline: '', imageUrl: '', primaryCTA: { text: '', link: '' }, secondaryCTA: { text: '', link: '' } },
            mission: { headline: '', content: '', imageUrl: '' },
            stats: [{ value: '', label: '' }],
            faqs: [{ q: '', a: '' }]
          });
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        if (err.code === 'permission-denied') {
          setError("Cloud Firestore API is disabled or permissions are insufficient for project lpedu-d9bb2. Please enable it in your Google Cloud Console.");
        } else {
          setError(err.message || "An unexpected error occurred while loading page content.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, []);

  const handleSaveDraft = async () => {
    if (!content || !db) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "pages", "home_draft"), content);
      setMessage({ type: 'success', text: 'Draft saved to secure cloud.' });
    } catch (err: any) {
      console.error("Save Error:", err);
      setMessage({ type: 'error', text: `Failed to save: ${err.code === 'permission-denied' ? 'API Disabled' : err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handlePublish = async () => {
    if (!content || !db) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "pages", "home_draft"), content);
      await setDoc(doc(db, "pages", "home_live"), content);
      setMessage({ type: 'success', text: 'Homepage published successfully!' });
    } catch (err: any) {
      console.error("Publish Error:", err);
      setMessage({ type: 'error', text: `Publishing failed: ${err.message}` });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleImageUpload = async (file: File, path: string) => {
    if (!storage) return;
    const storageRef = ref(storage, `site/home/${path}_${Date.now()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    if (path === 'hero') {
      setContent(prev => prev ? { ...prev, hero: { ...prev.hero, imageUrl: url } } : null);
    } else if (path === 'mission') {
      setContent(prev => prev ? { ...prev, mission: { ...prev.mission, imageUrl: url } } : null);
    }
  };

  const handleGenerateHeroImage = async () => {
    if (generatingImage) return;
    setGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A wide-angle, high-quality photograph of a professional trucking fleet owner-operator confidently reviewing compliance documents on a clipboard. In the background, a modern white semi-truck and a clean box truck are parked side-by-side at a logistics center. The lighting is cinematic and bright, conveying authority and success. Corporate professional style, sharp focus, 16:9 aspect ratio.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      let generatedImageUrl = '';
      if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImageUrl) {
        const res = await fetch(generatedImageUrl);
        const blob = await res.blob();
        const file = new File([blob], `hero_ai_${Date.now()}.png`, { type: "image/png" });
        await handleImageUpload(file, 'hero');
        setMessage({ type: 'success', text: 'AI Hero image generated and assigned!' });
      } else {
        throw new Error("No image was returned by the AI. Please try again.");
      }
    } catch (err: any) {
      console.error("AI Image Generation Error:", err);
      setMessage({ type: 'error', text: `AI Generation failed: ${err.message}` });
    } finally {
      setGeneratingImage(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
        <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Accessing Secure Database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-in fade-in duration-500">
        <div className="bg-red-50 dark:bg-red-900/20 p-12 rounded-[3rem] border border-red-100 dark:border-red-900/30 shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold font-serif mb-4 text-red-700 dark:text-red-400">Database Connection Failed</h2>
          <p className="text-red-600/80 dark:text-red-300/80 mb-8 leading-relaxed">
            {error}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=lpedu-d9bb2" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center shadow-lg"
            >
              Enable Firestore API <ExternalLink size={16} className="ml-2" />
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-8 py-4 rounded-2xl font-bold border border-red-200 dark:border-red-900/50 hover:bg-red-50 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-180px)]">
      {/* Editor Form */}
      <div className="w-full lg:w-1/2 overflow-y-auto pr-4 space-y-12">
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-lg mb-8">
           <div className="flex items-center space-x-2">
             <Eye size={18} className="text-authority-blue" />
             <span className="font-bold text-sm">Editing: Homepage Content</span>
           </div>
           <div className="flex items-center space-x-3">
             <button 
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-slate-100 dark:bg-gray-800 text-text-primary dark:text-white rounded-xl text-xs font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
             >
               {saving ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Save size={14} className="mr-2" />} 
               Save Draft
             </button>
             <button 
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-authority-blue text-white rounded-xl text-xs font-bold shadow-md hover:bg-steel-blue transition-all disabled:opacity-50"
             >
               <Send size={14} className="mr-2" /> Publish Live
             </button>
           </div>
        </div>

        {message && (
          <div className={`p-4 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300 ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-bold">{message.text}</span>
          </div>
        )}

        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border-light pb-4">
            <h2 className="text-2xl font-bold font-serif text-authority-blue dark:text-white">Hero Section</h2>
            <button 
              onClick={handleGenerateHeroImage}
              disabled={generatingImage}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-authority-blue to-steel-blue text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {generatingImage ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Sparkles size={14} className="mr-2" />}
              AI Image Gen
            </button>
          </div>
          
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-text-muted">Headline</label>
            <input 
              value={content.hero.headline}
              onChange={e => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
              className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-text-muted">Subheadline</label>
            <textarea 
              rows={3}
              value={content.hero.subheadline}
              onChange={e => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
              className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-authority-blue transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-text-muted">Hero Image</label>
            <div className="flex flex-col space-y-4">
              <div className="w-full aspect-video bg-slate-100 dark:bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center border border-dashed border-border-light relative group shadow-inner">
                {content.hero.imageUrl ? (
                  <img src={content.hero.imageUrl} className="w-full h-full object-cover" alt="Hero" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={40} className="text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="text-xs text-text-muted font-bold">No Hero Image Selected</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <input 
                  type="file" 
                  id="hero-upload"
                  accept="image/*"
                  onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'hero')}
                  className="hidden"
                />
                <label 
                  htmlFor="hero-upload"
                  className="flex items-center px-4 py-3 bg-white dark:bg-gray-700 border border-border-light dark:border-border-dark rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
                >
                  <ImageIcon size={16} className="mr-2" /> Upload Manually
                </label>
                <button 
                  onClick={handleGenerateHeroImage}
                  disabled={generatingImage}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-authority-blue to-steel-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-xl transition-all shadow-lg disabled:opacity-50 group"
                >
                  <Sparkles className="mr-2 group-hover:rotate-12 transition-transform" size={16} />
                  Generate AI Fleet Hero
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="hidden lg:block w-1/2 bg-slate-100 dark:bg-primary-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden relative group shadow-2xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-authority-blue/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20 shadow-2xl pointer-events-none">
          Live Real-Time Preview
        </div>
        <div className="h-full overflow-y-auto transform scale-[0.85] origin-top transition-transform duration-500 custom-scrollbar">
           <HomePage />
        </div>
      </div>
    </div>
  );
};

export default HomePageEditor;