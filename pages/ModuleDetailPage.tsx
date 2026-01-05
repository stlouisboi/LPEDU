
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';
import { 
  ChevronLeft, 
  Video, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  ArrowRight,
  Loader2,
  Clock,
  Info
} from 'lucide-react';

const ModuleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-primary-light">
        <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-border-light max-w-md">
          <Info className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold font-serif mb-4">Module Not Found</h2>
          <p className="text-text-muted mb-8">The requested curriculum module does not exist or has been moved.</p>
          <Link to="/learning-path" className="inline-block bg-authority-blue text-white px-8 py-3 rounded-xl font-bold">Back to Path</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pt-24 pb-32 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link to="/learning-path" className="inline-flex items-center text-authority-blue hover:underline font-bold text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to 90-Day Roadmap
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Module Detail Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3rem] border border-border-light dark:border-border-dark shadow-sm">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-authority-blue text-white rounded-2xl flex items-center justify-center shadow-lg font-black text-2xl">
                  {module.id}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-1">Official Curriculum Module</p>
                  <h1 className="text-3xl md:text-5xl font-bold font-serif">{module.title}</h1>
                </div>
              </div>

              <p className="text-xl text-text-muted leading-relaxed mb-10">
                {module.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-border-light text-center">
                  <BookOpen className="w-8 h-8 text-authority-blue mx-auto mb-3" />
                  <p className="text-xs font-black uppercase tracking-widest text-text-muted">Lessons</p>
                  <p className="text-2xl font-bold">{module.lessons}</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-border-light text-center">
                  <Video className="w-8 h-8 text-authority-blue mx-auto mb-3" />
                  <p className="text-xs font-black uppercase tracking-widest text-text-muted">Visual Aids</p>
                  <p className="text-2xl font-bold">{loading ? '...' : videos.length}</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-border-light text-center">
                  <ShieldCheck className="w-8 h-8 text-authority-blue mx-auto mb-3" />
                  <p className="text-xs font-black uppercase tracking-widest text-text-muted">Status</p>
                  <p className="text-lg font-bold text-green-600">Audit Ready</p>
                </div>
              </div>

              {/* Lesson Roadmap (Mocked) */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-serif mb-6 border-b border-gray-100 pb-4">Key Regulatory Concepts</h3>
                {[...Array(module.lessons)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-2xl transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-authority-blue/10 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 size={16} className="text-authority-blue" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-lg leading-none mb-1 group-hover:text-authority-blue transition-colors">Lesson {module.id}.{i + 1}: Professional Mastery</h4>
                      <p className="text-sm text-text-muted">Detailed walkthrough of FMCSA compliance area Section {390 + (module.id * 5) + i}.</p>
                    </div>
                    <ArrowRight className="text-text-muted opacity-0 group-hover:opacity-100 transition-all" size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Video Sidebar */}
          <div className="space-y-8">
            <div className="bg-authority-blue p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
              <Sparkles className="w-10 h-10 text-signal-gold mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold font-serif mb-4 leading-tight">Visual Compliance Lab</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">
                The clips below are generated by our cinematic Veo 3.1 engine to visualize complex regulatory inspections and professional standards for this module.
              </p>
              
              <Link to="/enroll" className="flex items-center justify-center space-x-2 bg-signal-gold text-authority-blue py-4 rounded-xl font-bold hover:bg-white transition-all shadow-lg w-full">
                <span>Unlock Full Course</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted flex items-center">
                <Video size={14} className="mr-2" /> Module Visualization Clips
              </h3>
              
              {loading ? (
                <div className="py-12 flex flex-col items-center space-y-4">
                  <Loader2 className="animate-spin text-authority-blue" size={32} />
                  <p className="text-[10px] font-black uppercase text-text-muted">Loading Media...</p>
                </div>
              ) : videos.length > 0 ? (
                videos.map((vid) => (
                  <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm group hover:shadow-md transition-all">
                    <div className="relative aspect-video bg-black">
                      <video 
                        src={vid.url} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        poster="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=400"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                         <div className="w-12 h-12 bg-white text-authority-blue rounded-full flex items-center justify-center shadow-2xl">
                           <Play size={20} fill="currentColor" />
                         </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-text-muted italic line-clamp-2">"{vid.prompt}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 bg-slate-50 dark:bg-gray-800/30 rounded-3xl border border-dashed border-border-light text-center">
                  <Video className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-30" />
                  <p className="text-xs text-text-muted font-bold">No visual clips associated yet.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-border-light">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue mb-3">Audit Readiness Tip</h4>
               <p className="text-[11px] leading-relaxed text-text-muted">
                 FMCSA Section {390 + moduleId} requires specific record-keeping protocols. Ensure you've downloaded the corresponding Checklist Pack from our Resources page.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
