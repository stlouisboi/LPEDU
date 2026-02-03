
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';
// Added missing Clock and FileText imports
import { 
  ChevronLeft, 
  Video, 
  BookOpen, 
  ShieldCheck, 
  Play, 
  Loader2,
  Sparkles,
  Film,
  Zap,
  Lock,
  Terminal,
  ArrowRight,
  Info,
  ShieldAlert,
  Clock,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ModuleDetailPage = () => {
  const { id } = useParams();
  const moduleId = parseInt(id || '0');
  const module = COURSE_MODULES.find(m => m.id === moduleId);
  
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Video Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genPrompt, setGenPrompt] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState<string | null>(null);

  const reassuringMessages = [
    "Synthesizing compliance visuals...", 
    "Baking neural light models...", 
    "Rendering motion vectors...",
    "Finalizing administrative rendering..."
  ];

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkApiKey();
  }, []);

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

  const handleGenerateVisual = async () => {
    if (!genPrompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGenMessage(reassuringMessages[0]);
    
    const msgInterval = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 10000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Institutional cinematic visualization for LaunchPath Module ${moduleId} (${module?.title}): ${genPrompt}. Style: High-fidelity, cinematic logistics, professional, clear focus, 16:9.`;
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        // Use fresh instance for polling per guidelines
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation });
      }

      if (operation.error) throw new Error(operation.error.message);

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink && storage) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        
        // Internal Archive Logic (Admin only technically, but here for demonstration)
        const vidPath = `curriculum_videos/module_${moduleId}_${Date.now()}.mp4`;
        const storageRef = ref(storage, vidPath);
        await uploadBytes(storageRef, blob);
        const persistentUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, "generatedVideos"), {
          prompt: genPrompt,
          url: persistentUrl,
          storagePath: vidPath,
          aspectRatio: '16:9',
          moduleId: moduleId,
          createdAt: new Date().toISOString()
        });

        setNewVideoUrl(persistentUrl);
        setGenPrompt('');
      }
    } catch (err: any) {
      console.error("Visual Synthesis Failure:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
      } else {
        alert("Synthesis Terminal Error: Verify visual directives and API key capacity.");
      }
    } finally {
      clearInterval(msgInterval);
      setIsGenerating(false);
    }
  };

  if (!module) return <div>Module not found.</div>;

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen pt-24 pb-32 font-sans selection:bg-authority-blue/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        {/* Navigation Breadcrumb */}
        <Link to="/learning-path" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-authority-blue transition-colors mb-12 group">
          <ChevronLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Roadmap
        </Link>

        {/* Module Header */}
        <header className="mb-16 space-y-6">
           <div className="flex items-center space-x-4">
              <span className="bg-authority-blue text-signal-gold px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                {moduleId === 0 ? 'Ground 0' : `Module ${moduleId}`}
              </span>
              <div className="h-px w-12 bg-slate-200 dark:bg-border-dark"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{module.pillar} Pillar</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter leading-none text-authority-blue dark:text-white">
             {module.title}
           </h1>
           <p className="text-xl md:text-2xl text-slate-500 dark:text-text-dark-muted font-medium max-w-3xl leading-relaxed italic">
             "{module.description}"
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           {/* Primary Content Column */}
           <div className="lg:col-span-8 space-y-12">
              
              {/* Module Metadata Card */}
              <div className="bg-white dark:bg-surface-dark rounded-[3.5rem] p-10 md:p-14 border border-slate-100 dark:border-border-dark shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-authority-blue">
                   <BookOpen size={160} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
                   {[
                     { label: 'Lessons', val: module.lessons, icon: <LayoutDashboard size={16} /> },
                     { label: 'Status', val: module.duration, icon: <Clock size={16} /> },
                     { label: 'Difficulty', val: module.difficulty, icon: <Zap size={16} /> },
                     { label: 'Assets', val: `${module.resourcesCount} Files`, icon: <FileText size={16} /> }
                   ].map((stat, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex items-center space-x-2 text-slate-400">
                           {stat.icon}
                           <p className="text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-lg font-black text-authority-blue dark:text-white uppercase">{stat.val}</p>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 pt-12 border-t border-slate-50 dark:border-white/5">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-6 flex items-center">
                     <ShieldCheck size={16} className="mr-3" /> Core Learning Objective
                   </h3>
                   <p className="text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                     {module.reachTest}
                   </p>
                </div>
              </div>

              {/* Neural Concept Visualizer Section */}
              <section className="bg-[#020617] rounded-[4rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="relative z-10 space-y-12">
                   <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-3">
                         <div className="inline-flex items-center space-x-3 bg-white/5 px-5 py-2 rounded-full border border-white/10">
                            <Sparkles className="text-signal-gold" size={14} />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Neural Concept Visualizer</span>
                         </div>
                         <h2 className="text-3xl font-black font-serif uppercase tracking-tight">Synthesize <span className="text-signal-gold italic">Educational</span> Visuals</h2>
                      </div>
                      {!hasApiKey && (
                        <button 
                          onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))}
                          className="px-8 py-4 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-amber-700 transition-all flex items-center"
                        >
                           <ShieldAlert size={16} className="mr-3" /> Authorize Synthesis Key
                        </button>
                      )}
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <p className="text-slate-400 font-medium leading-relaxed text-sm">
                           Generate a cinematic 720p visualization of any concept from this module. Use this to clarify technical standards or simulate operational scenarios.
                         </p>
                         
                         <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Visual Directive</label>
                           <div className="relative group">
                              <Terminal className="absolute left-6 top-6 text-slate-600" size={18} />
                              <textarea 
                                disabled={!hasApiKey || isGenerating}
                                value={genPrompt}
                                onChange={e => setGenPrompt(e.target.value)}
                                rows={4}
                                placeholder="e.g. A professional fleet manager organizing a secure compliance cabinet..."
                                className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] pl-16 pr-8 py-6 text-sm font-bold focus:border-signal-gold focus:bg-white/10 outline-none transition-all disabled:opacity-30 resize-none shadow-inner"
                              />
                           </div>
                         </div>

                         <div className="pt-4">
                            <button 
                              onClick={handleGenerateVisual}
                              disabled={!hasApiKey || isGenerating || !genPrompt.trim()}
                              className="w-full h-20 bg-authority-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center shadow-2xl hover:bg-steel-blue active:scale-95 disabled:opacity-20 transition-all group border-b-4 border-slate-900"
                            >
                               {isGenerating ? (
                                 <><Loader2 className="animate-spin mr-4" size={24} /> <span>Synthesis Active</span></>
                               ) : (
                                 <><Film className="mr-4 group-hover:rotate-12 transition-transform" size={20} /> <span>Initialize Synthesis</span></>
                               )}
                            </button>
                         </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden shadow-inner group/monitor">
                         {isGenerating ? (
                           <div className="space-y-8 animate-in fade-in duration-500">
                              <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-signal-gold/20 border-t-signal-gold animate-spin mx-auto"></div>
                                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-signal-gold" size={24} />
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-black uppercase tracking-[0.3em] animate-pulse">{genMessage}</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Veo 3.1 Neural Engine Active</p>
                              </div>
                           </div>
                         ) : newVideoUrl ? (
                           <div className="w-full h-full animate-in zoom-in-95 duration-700">
                             <video src={newVideoUrl} controls className="w-full h-full object-cover rounded-[2.5rem]" />
                             <button 
                               onClick={() => setNewVideoUrl(null)}
                               className="absolute top-6 right-6 p-2 bg-black/50 rounded-full hover:bg-red-500 transition-colors"
                             >
                               <X size={16} />
                             </button>
                           </div>
                         ) : (
                           <div className="opacity-20 group-hover/monitor:opacity-40 transition-opacity">
                              <Monitor size={80} className="mx-auto mb-6" />
                              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Synthesis Terminal Idle</p>
                           </div>
                         )}
                      </div>
                   </div>
                   
                   <div className="pt-8 border-t border-white/5 flex items-center justify-between opacity-40">
                      <div className="flex items-center space-x-3">
                         <Lock size={12} />
                         <span className="text-[8px] font-black uppercase tracking-widest">Institutional Sandbox Restricted</span>
                      </div>
                      <div className="flex items-center space-x-3">
                         <Info size={12} />
                         <span className="text-[8px] font-black uppercase tracking-widest">Asset tagging auto-associates with Module {moduleId}</span>
                      </div>
                   </div>
                </div>
              </section>
           </div>

           {/* Sidebar: Media & Lessons */}
           <div className="lg:col-span-4 space-y-12">
              <aside>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Module Clips</h3>
                  <Film size={20} className="text-slate-300" />
                </div>
                
                <div className="space-y-6">
                   {loading ? (
                     <div className="py-12 text-center">
                        <Loader2 className="animate-spin text-authority-blue mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading neural assets...</p>
                     </div>
                   ) : videos.length > 0 ? (
                     videos.map((vid) => (
                       <div key={vid.id} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-3xl overflow-hidden shadow-sm group hover:shadow-xl transition-all">
                          <div className="aspect-video bg-black relative">
                             <video src={vid.url} controls className="w-full h-full object-cover" />
                             <div className="absolute top-4 left-4">
                                <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                                  Neural Concept
                                </span>
                             </div>
                          </div>
                          <div className="p-6">
                             <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic line-clamp-2">
                               "{vid.prompt}"
                             </p>
                          </div>
                       </div>
                     ))
                   ) : (
                     <div className="bg-slate-50 dark:bg-gray-800/50 border-2 border-dashed border-slate-200 dark:border-border-dark rounded-[3rem] p-12 text-center">
                        <Video size={48} className="text-slate-200 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No visualization clips indexed for this module.</p>
                     </div>
                   )}
                </div>
              </aside>

              <div className="bg-authority-blue p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                 <h4 className="text-xl font-bold font-serif mb-6 uppercase text-signal-gold">Remediation Link</h4>
                 <p className="text-sm font-medium leading-relaxed text-white/70 mb-10">
                   Each technical concept in this module includes downloadable implementation guards.
                 </p>
                 <Link to="/resources" className="w-full bg-white text-authority-blue py-5 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center shadow-xl hover:bg-signal-gold hover:text-white transition-all">
                    Access Implementation Library <ArrowRight size={14} className="ml-2" />
                 </Link>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

// Simplified sub-components for internal use
const LayoutDashboard = ({ size, className }: { size: number, className?: string }) => <BookOpen size={size} className={className} />;
const Monitor = ({ size, className }: { size: number, className?: string }) => <Video size={size} className={className} />;
const X = ({ size, className }: { size: number, className?: string }) => <Play size={size} className={`rotate-45 ${className}`} />;

export default ModuleDetailPage;
