
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
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { 
  INITIAL_BLOGS, 
  INITIAL_SETTINGS, 
  INITIAL_TESTIMONIALS, 
  COURSE_MODULES 
} from '../../constants';

type SyncStatus = 'idle' | 'processing' | 'success' | 'error';

interface SyncSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: SyncStatus;
  progress?: string;
  onSync: () => void;
}

const SyncSection: React.FC<SyncSectionProps> = ({ title, description, icon, status, progress, onSync }) => (
  <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-sm flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      {status === 'success' && <CheckCircle className="text-green-500" size={20} />}
      {status === 'error' && <AlertCircle className="text-red-500" size={20} />}
    </div>
    
    <h3 className="text-xl font-bold font-serif mb-2">{title}</h3>
    <p className="text-xs text-text-muted mb-8 leading-relaxed font-medium">
      {description}
    </p>

    <div className="mt-auto space-y-4">
      {status === 'processing' && progress && (
        <div className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold animate-pulse">
          {progress}
        </div>
      )}
      
      <button
        onClick={onSync}
        disabled={status === 'processing'}
        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center transition-all active:scale-95 ${
          status === 'processing' 
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
          : status === 'success'
          ? 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100'
          : 'bg-authority-blue text-white hover:bg-steel-blue shadow-lg'
        }`}
      >
        {status === 'processing' ? (
          <>
            <Loader2 size={14} className="mr-2 animate-spin" />
            Synchronizing...
          </>
        ) : status === 'success' ? (
          <>
            <RefreshCw size={14} className="mr-2" />
            Re-Sync Data
          </>
        ) : (
          <>
            <Play size={14} className="mr-2" />
            Initialize {title.split(' ')[0]}
          </>
        )}
      </button>
    </div>
  </div>
);

const InitializeDataPage = () => {
  const [statuses, setStatuses] = useState<Record<string, SyncStatus>>({
    blogs: 'idle',
    settings: 'idle',
    testimonials: 'idle',
    modules: 'idle'
  });
  
  const [progress, setProgress] = useState<Record<string, string>>({
    blogs: '',
    testimonials: '',
    modules: ''
  });

  const updateStatus = (key: string, status: SyncStatus) => {
    setStatuses(prev => ({ ...prev, [key]: status }));
  };

  const updateProgress = (key: string, val: string) => {
    setProgress(prev => ({ ...prev, [key]: val }));
  };

  const syncBlogs = async () => {
    if (!db) return;
    updateStatus('blogs', 'processing');
    let count = 0;
    try {
      for (const blog of INITIAL_BLOGS) {
        const id = blog.id || blog.slug;
        await setDoc(doc(db, "blogPosts", id), blog, { merge: true });
        count++;
        updateProgress('blogs', `Uploading ${count} of ${INITIAL_BLOGS.length}...`);
      }
      updateStatus('blogs', 'success');
    } catch (err) {
      console.error(err);
      updateStatus('blogs', 'error');
    }
  };

  const syncSettings = async () => {
    if (!db) return;
    updateStatus('settings', 'processing');
    try {
      await setDoc(doc(db, "settings", "general"), INITIAL_SETTINGS, { merge: true });
      // Initialize homepage drafts as well
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
      updateStatus('settings', 'success');
    } catch (err) {
      console.error(err);
      updateStatus('settings', 'error');
    }
  };

  const syncTestimonials = async () => {
    if (!db) return;
    updateStatus('testimonials', 'processing');
    let count = 0;
    try {
      for (const t of INITIAL_TESTIMONIALS) {
        await setDoc(doc(db, "testimonials", t.id), t, { merge: true });
        count++;
        updateProgress('testimonials', `Syncing ${count} of ${INITIAL_TESTIMONIALS.length}...`);
      }
      updateStatus('testimonials', 'success');
    } catch (err) {
      console.error(err);
      updateStatus('testimonials', 'error');
    }
  };

  const syncModules = async () => {
    if (!db) return;
    updateStatus('modules', 'processing');
    let count = 0;
    try {
      for (const mod of COURSE_MODULES) {
        await setDoc(doc(db, "courseModules", mod.id.toString()), mod, { merge: true });
        count++;
        updateProgress('modules', `Syncing ${count} of ${COURSE_MODULES.length}...`);
      }
      updateStatus('modules', 'success');
    } catch (err) {
      console.error(err);
      updateStatus('modules', 'error');
    }
  };

  const runFullProvisioning = async () => {
    await syncSettings();
    await syncBlogs();
    await syncTestimonials();
    await syncModules();
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold font-serif text-authority-blue dark:text-white uppercase tracking-tight">Database Provisioning</h1>
          <p className="text-text-muted mt-2 text-lg font-medium">
            Initialize or reset your Cloud Firestore environment with baseline production data from local constants.
          </p>
        </div>
        <button 
          onClick={runFullProvisioning}
          className="bg-authority-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group"
        >
          <Database size={18} className="mr-3 group-hover:rotate-12 transition-transform" />
          Run Full Cloud Sync
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <SyncSection 
          title="Blog Archive"
          description="Populates the knowledge base with initial safety bulletins and compliance deep-dives."
          icon={<FileText size={28} />}
          status={statuses.blogs}
          progress={progress.blogs}
          onSync={syncBlogs}
        />
        
        <SyncSection 
          title="Site Settings"
          description="Resets brand identity, contact information, and homepage content drafts to defaults."
          icon={<Settings size={28} />}
          status={statuses.settings}
          onSync={syncSettings}
        />

        <SyncSection 
          title="Testimonials"
          description="Populates social proof and student success stories across the marketing site."
          icon={<Quote size={28} />}
          status={statuses.testimonials}
          progress={progress.testimonials}
          onSync={syncTestimonials}
        />

        <SyncSection 
          title="Course Pathway"
          description="Initializes the 6-module curriculum structure for the Carrier Mastery framework."
          icon={<Layers size={28} />}
          status={statuses.modules}
          progress={progress.modules}
          onSync={syncModules}
        />
      </div>

      <div className="bg-authority-blue p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold font-serif mb-4 flex items-center">
              <RefreshCw className="mr-3 text-signal-gold" size={24} />
              Protocol Note
            </h3>
            <p className="opacity-70 leading-relaxed font-medium">
              Synchronizing will overwrite existing records with the same IDs. This utility is primarily for new project deployments or resetting testing environments. Ensure you have backups if you've made manual cloud edits.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Database: Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitializeDataPage;
