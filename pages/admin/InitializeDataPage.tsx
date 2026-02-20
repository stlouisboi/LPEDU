import React, { useState } from 'react';
import { 
  Database, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  FileText, 
  Settings, 
  Quote, 
  Layers,
  RefreshCw
} from 'lucide-react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { 
  INITIAL_BLOGS, 
  INITIAL_SETTINGS, 
  INITIAL_TESTIMONIALS, 
  COURSE_MODULES 
} from '../../constants';

const InitializeDataPage = () => {
  // Section 1: Blog Posts
  const [blogStatus, setBlogStatus] = useState<string>('');
  const [blogSuccess, setBlogSuccess] = useState<boolean>(false);
  const [blogUploading, setBlogUploading] = useState<boolean>(false);

  // Section 2: Site Settings
  const [settingsStatus, setSettingsStatus] = useState<string>('');
  const [settingsUploading, setSettingsUploading] = useState<boolean>(false);

  // Section 3: Testimonials
  const [testimonialStatus, setTestimonialStatus] = useState<string>('');
  const [testimonialUploading, setTestimonialUploading] = useState<boolean>(false);

  // Section 4: Course Modules
  const [moduleStatus, setModuleStatus] = useState<string>('');
  const [moduleUploading, setModuleUploading] = useState<boolean>(false);

  const uploadBlogPosts = async () => {
    if (!db) return;
    setBlogUploading(true);
    setBlogSuccess(false);
    setBlogStatus('Initializing upload...');
    let count = 0;
    
    try {
      for (const post of INITIAL_BLOGS) {
        const id = post.id || post.slug;
        await setDoc(doc(db, 'blogPosts', id), post, { merge: true });
        count++;
        setBlogStatus(`Uploading ${count} of ${INITIAL_BLOGS.length}...`);
      }
      setBlogStatus(`✅ Successfully uploaded ${count} blog posts`);
      setBlogSuccess(true);
    } catch (error) {
      console.error('Error uploading post:', error);
      setBlogStatus('❌ Error uploading blog posts. Check console.');
    } finally {
      setBlogUploading(false);
    }
  };

  const initializeSettings = async () => {
    if (!db) return;
    setSettingsUploading(true);
    setSettingsStatus('Checking settings...');
    try {
      await setDoc(doc(db, "settings", "general"), INITIAL_SETTINGS, { merge: true });
      
      // Also init homepage draft if missing
      const homeDraftRef = doc(db, "pages", "home_draft");
      const homeDraftSnap = await getDoc(homeDraftRef);
      if (!homeDraftSnap.exists()) {
        const defaultHome = {
          hero: {
            headline: INITIAL_SETTINGS.heroTitle,
            subheadline: INITIAL_SETTINGS.heroSubtitle,
            imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200',
            primaryCTA: { text: 'Start Learning', link: '/pricing' },
            secondaryCTA: { text: 'View Roadmap', link: '/learning-path' }
          },
          mission: {
            headline: 'Accuracy Over Hype.',
            content: 'We provide the technical education required to survive the critical 18-month new entrant phase.',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
          },
          stats: [{ value: '500+', label: 'Active Carriers' }, { value: '100%', label: 'Audit Success' }, { value: '24/7', label: 'AI Support' }],
          faqs: [{ q: 'Is this for CDL only?', a: 'No, our systems apply to all motor carriers.' }]
        };
        await setDoc(homeDraftRef, defaultHome);
        await setDoc(doc(db, "pages", "home_live"), defaultHome);
      }
      setSettingsStatus('✅ Site settings initialized successfully');
    } catch (err) {
      setSettingsStatus('❌ Failed to initialize settings.');
    } finally {
      setSettingsUploading(false);
    }
  };

  const uploadTestimonials = async () => {
    if (!db) return;
    setTestimonialUploading(true);
    setTestimonialStatus('Syncing testimonials...');
    let count = 0;
    try {
      for (const t of INITIAL_TESTIMONIALS) {
        await setDoc(doc(db, "testimonials", t.id), t, { merge: true });
        count++;
        setTestimonialStatus(`Uploading ${count} of ${INITIAL_TESTIMONIALS.length}...`);
      }
      setTestimonialStatus(`✅ Successfully uploaded ${count} testimonials`);
    } catch (err) {
      setTestimonialStatus('❌ Failed to upload testimonials.');
    } finally {
      setTestimonialUploading(false);
    }
  };

  const uploadModules = async () => {
    if (!db) return;
    setModuleUploading(true);
    setModuleStatus('Provisioning modules...');
    let count = 0;
    try {
      for (const mod of COURSE_MODULES) {
        await setDoc(doc(db, "courseModules", mod.id.toString()), mod, { merge: true });
        count++;
        setModuleStatus(`Uploading ${count} of ${COURSE_MODULES.length}...`);
      }
      setModuleStatus(`✅ Successfully uploaded ${count} course modules`);
    } catch (err) {
      setModuleStatus('❌ Failed to upload course modules.');
    } finally {
      setModuleUploading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Initialize Firebase Database</h1>
        <p className="text-text-muted mt-2 text-lg font-medium">
          Populate Firestore with sample data from constants
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 1: Blog Posts */}
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue rounded-2xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">SECTION 1: Blog Posts</h3>
          </div>
          <div className="mb-8 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Upload the archive of safety bulletins and compliance guides from the system constants.
            </p>
            <p id="placeholder-image-task" className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed font-medium italic opacity-60">
              Create placeholder images for articles.
            </p>
          </div>
          <div className="mt-auto space-y-4">
            {blogStatus && (
              <div className={`text-xs font-bold ${blogSuccess ? 'text-green-600' : 'text-authority-blue dark:text-signal-gold animate-pulse'}`}>
                {blogStatus}
              </div>
            )}
            <button
              onClick={uploadBlogPosts}
              disabled={blogUploading}
              className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-authority-blue text-white hover:bg-steel-blue shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {blogUploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Play size={14} className="mr-2" />}
              Upload All Blog Posts to Firebase
            </button>
          </div>
        </div>

        {/* SECTION 2: Site Settings */}
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue rounded-2xl flex items-center justify-center">
              <Settings size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">SECTION 2: Site Settings</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
            Initialize global brand identity, contact details, and homepage configuration.
          </p>
          <div className="mt-auto space-y-4">
            {settingsStatus && (
              <div className="text-xs font-bold text-green-600">
                {settingsStatus}
              </div>
            )}
            <button
              onClick={initializeSettings}
              disabled={settingsUploading}
              className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-authority-blue text-white hover:bg-steel-blue shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {settingsUploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Play size={14} className="mr-2" />}
              Initialize Site Settings
            </button>
          </div>
        </div>

        {/* SECTION 3: Testimonials */}
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue rounded-2xl flex items-center justify-center">
              <Quote size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">SECTION 3: Testimonials</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
            Populate student success stories and industry social proof.
          </p>
          <div className="mt-auto space-y-4">
            {testimonialStatus && (
              <div className="text-xs font-bold text-authority-blue dark:text-signal-gold">
                {testimonialStatus}
              </div>
            )}
            <button
              onClick={uploadTestimonials}
              disabled={testimonialUploading}
              className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-authority-blue text-white hover:bg-steel-blue shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {testimonialUploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Play size={14} className="mr-2" />}
              Upload Testimonials
            </button>
          </div>
        </div>

        {/* SECTION 4: Course Modules */}
        <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 text-authority-blue rounded-2xl flex items-center justify-center">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-gray-900 dark:text-white">SECTION 4: Course Modules</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
            Provision the 6-module curriculum structure for the learning pathway.
          </p>
          <div className="mt-auto space-y-4">
            {moduleStatus && (
              <div className="text-xs font-bold text-authority-blue dark:text-signal-gold">
                {moduleStatus}
              </div>
            )}
            <button
              onClick={uploadModules}
              disabled={moduleUploading}
              className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] bg-authority-blue text-white hover:bg-steel-blue shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {moduleUploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Play size={14} className="mr-2" />}
              Upload Course Modules
            </button>
          </div>
        </div>
      </div>

      <div className="bg-authority-blue p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold font-serif mb-4 flex items-center">
              <RefreshCw className="mr-3 text-signal-gold" size={24} />
              Sync Protocol
            </h3>
            <p className="opacity-70 leading-relaxed font-medium">
              Running these initializations will merge data with existing cloud records. IDs are used as primary keys to prevent duplication while allowing for easy content updates from constants.
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status: Cloud Linked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitializeDataPage;