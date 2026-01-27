import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';
import { 
  ChevronLeft, 
  Video, 
  BookOpen, 
  ShieldCheck, 
  Play, 
  Loader2
} from 'lucide-react';

const ModuleDetailPage = () => {
  const { id } = useParams();
  const moduleId = parseInt(id || '0');
  const module = COURSE_MODULES.find(m => m.id === moduleId);
  
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "generatedVideos"), where("moduleId", "==", moduleId));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
      setLoading(false);
    }, (error) => {
      console.warn("ModuleDetailPage: Video fetch error", error);
      setLoading(false);
    });
    return unsub;
  }, [moduleId]);

  if (!module) return <div>Module not found.</div>;

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-6xl lg:text-7xl font-black font-serif uppercase tracking-tight mb-8 text-authority-blue dark:text-white">{module.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 p-8 bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark">
             <p className="text-xl text-text-muted dark:text-text-dark-muted mb-12 font-medium leading-relaxed">{module.description}</p>
             <div className="h-px bg-slate-100 dark:bg-border-dark mb-12"></div>
             <div className="grid grid-cols-2 gap-8">
               <div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold mb-4">Module Assets</h3>
                 <p className="text-sm font-bold text-slate-500 dark:text-text-dark-muted">{module.resourcesCount} Downloadable Templates</p>
               </div>
               <div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold mb-4">Difficulty</h3>
                 <p className="text-sm font-bold text-slate-500 uppercase dark:text-text-dark-muted">{module.difficulty}</p>
               </div>
             </div>
           </div>
           <div className="space-y-8">
             <h3 className="text-xl font-black uppercase tracking-tight mb-6">Visualization Clips</h3>
             {loading ? <Loader2 className="animate-spin text-authority-blue" /> : videos.length > 0 ? videos.map(vid => (
               <div key={vid.id} className="bg-black rounded-2xl overflow-hidden shadow-xl border border-white/10 group relative">
                 <video src={vid.url} controls className="w-full" />
                 <div className="absolute top-4 left-4">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase">Neural Clip</span>
                 </div>
               </div>
             )) : (
               <div className="p-8 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-dashed border-border-light dark:border-border-dark text-center">
                 <Video className="mx-auto text-text-muted opacity-20 mb-3" />
                 <p className="text-xs font-bold text-text-muted uppercase">No clips available</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;