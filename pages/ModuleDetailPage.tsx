
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
        <h1 className="text-4xl font-bold mb-8">{module.title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 p-8 bg-white dark:bg-surface-dark rounded-3xl shadow-sm">
             <p className="text-xl text-text-muted mb-12">{module.description}</p>
           </div>
           <div className="space-y-8">
             <h3 className="text-xl font-bold mb-6">Visualization Clips</h3>
             {loading ? <Loader2 className="animate-spin" /> : videos.map(vid => (
               <video key={vid.id} src={vid.url} controls className="w-full rounded-2xl shadow-sm" />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
