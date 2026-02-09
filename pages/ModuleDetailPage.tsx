
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebase';
import { COURSE_MODULES } from '../constants';
import { GeneratedVideo } from '../types';
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
    "PLANNING VISUAL SEQUENCING...", 
    "CALIBRATING NEURAL TEXTURES...", 
    "RENDER BUFFERING ACTIVE...",
    "FINALIZING CURRICULUM ASSET...",
    "UPLINKING TO CLOUD ARCHIVE..."
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
      setVideos(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
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
      const prompt = `Educational technical visualization for carrier training: ${genPrompt}. Module context: ${module?.title}. Style: Cinematic logistics, professional, clear focus, 16:9 aspect ratio. High fidelity.`;
      
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
        // Requirement: New instance for polling robustness
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation });
      }

      if (operation.error) throw new Error(operation.error.message);

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink && storage) {
        // Must append key for fetch
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        
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
      console.error("Synthesis Failure:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Session expired. Please re-authorize your key.");
      } else {
        alert("Neural synthesis terminal error.");
      }
    } finally {
      clearInterval(msgInterval);
      setIsGenerating(false);
    }
  };

  if (!module) return <div className="p-20 text-center">Module registry mismatch.</div>;

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#020617] min-h-screen pt-24 pb-32 font-sans selection:bg-authority-blue/10">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
        
        <Link to="/learning-path" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-authority-blue transition-all mb-12 group">
          <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          BACK_TO_ROADMAP
        </Link>

        <header className="mb-20 space-y-8">
           <div className="flex items-center space-x-6">
              <span className="bg-authority-blue text-signal-gold px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl border border-white/5">
                {moduleId === 0 ? 'GROUND 0' : `MODULE ${moduleId}`}
              </span>
              <div className="h-px w-20 bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">{module.pillar} CORE PILLAR</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black font-serif uppercase tracking-tighter leading-none text-authority-blue dark:text-white">
             {module.title}
           </h1>
           <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-bold max-w-4xl leading-tight">
             {module.description}
           </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           <div className="lg:col-span-8 space-y-12">
              {/* Module Metadata Card */}
              <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-16 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-[0.03] text-authority-blue">
                   <BookOpen size={200} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                   {[
                     { label: 'Units', val: module.lessons, icon: <BookOpen size={18} /> },
                     { label: 'Phase', val: module.duration, icon: <Clock size={18} /> },
                     { label: 'Rigor', val: module.difficulty, icon: <Zap size={18} /> },
                     { label: 'Archive', val: `${module.resourcesCount} Files`, icon: <FileText size={18} /> }
                   ].map((stat, i) => (
                     <div key={i} className="space-y-3">
                        <div className="flex items-center space-x-3 text-slate-400">
                           {stat.icon}
                           <p className="text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tighter">{stat.val}</p>
                     </div>
                   ))}
                </div>
                
                <div className="mt-16 pt-16 border-t border-slate-50 dark:border-slate-800">
                   <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-authority-blue rounded-2xl flex items-center justify-center text-signal-gold shadow-xl">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold">Institutional Objective</h3>
                   </div>
                   <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic max-w-3xl">
                     "{module.reachTest}"
                   </p>
                </div>
              </div>

              {/* Neural Synthesis Section */}
              <section className="bg-slate-950 rounded-[4.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] border border-white/5">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="relative z-10 space-y-16">
                   <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="space-y-4">
                         <div className="inline-flex items-center space-x-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl">
                            <Sparkles className="text-signal-gold" size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Neural Concept Architect</span>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight leading-none">Synthesize <br/><span className="text-signal-gold italic">Curriculum</span> Visuals</h2>
                      </div>
                      {!hasApiKey && (
                        <button 
                          onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))}
                          className="px-10 py-5 bg-amber-600 text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-amber-700 transition-all flex items-center active:scale-95"
                        >
                           <ShieldAlert size={18} className="mr-3" /> Authorize Key
                        </button>
                      )}
                   </header>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                      <div className="space-y-10">
                         <p className="text-slate-400 font-medium leading-relaxed text-lg italic">
                           Provision high-fidelity 720p visualizations for clinical clarification. Describe the operational standard you wish to see synthesized.
                         </p>
                         
                         <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Visual Directive</label>
                           <div className="relative group">
                              <Terminal className="absolute left-8 top-8 text-slate-600 group-focus-within:text-signal-gold transition-colors" size={24} />
                              <textarea 
                                disabled={!hasApiKey || isGenerating}
                                value={genPrompt}
                                onChange={e => setGenPrompt(e.target.value)}
                                rows={5}
                                placeholder="e.g. A clinical demonstration of unassigned ELD mileage reconciliation..."
                                className="w-full bg-white/5 border border-white/10 rounded-[3rem] pl-20 pr-10 py-8 text-lg font-bold focus:border-signal-gold focus:bg-white/10 outline-none transition-all disabled:opacity-30 resize-none shadow-inner"
                              />
                           </div>
                         </div>

                         <div className="pt-4">
                            <button 
                              onClick={handleGenerateVisual}
                              disabled={!hasApiKey || isGenerating || !genPrompt.trim()}
                              className="w-full h-24 bg-authority-blue text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center shadow-2xl hover:bg-slate-800 active:scale-95 disabled:opacity-10 transition-all group border-b-[12px] border-black"
                            >
                               {isGenerating ? (
                                 <><Loader2 className="animate-spin mr-5" size={28} /> <span>Synthesis sequence active</span></>
                               ) : (
                                 <><Film className="mr-5 group-hover:rotate-12 transition-transform" size={28} /> <span>Initialize production</span></>
                               )}
                            </button>
                         </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-10 flex flex-col items-center justify-center text-center min-h-[500px] relative overflow-hidden shadow-inner group/monitor">
                         {isGenerating ? (
                           <div className="space-y-10 animate-in fade-in duration-500">
                              <div className="relative">
                                <div className="w-32 h-32 rounded-full border-[6px] border-signal-gold/10 border-t-signal-gold animate-spin mx-auto shadow-2xl"></div>
                                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-signal-gold" size={32} />
                              </div>
                              <div className="space-y-3">
                                <p className="text-sm font-black uppercase tracking-[0.4em] animate-pulse leading-none">{genMessage}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Engine Terminal v4.2</p>
                              </div>
                           </div>
                         ) : newVideoUrl ? (
                           <div className="w-full h-full animate-in zoom-in-95 duration-1000">
                             <video src={newVideoUrl} controls className="w-full h-full object-cover rounded-[3rem]" />
                             <button 
                               onClick={() => setNewVideoUrl(null)}
                               className="absolute top-8 right-8 p-3 bg-black/60 rounded-full hover:bg-red-600 transition-colors shadow-2xl"
                             >
                               <XIcon size={20} />
                             </button>
                           </div>
                         ) : (
                           <div className="opacity-10 group-hover/monitor:opacity-30 transition-opacity">
                              <Monitor size={120} className="mx-auto mb-10" />
                              <p className="text-[11px] font-black uppercase tracking-[0.6em]">Terminal Standby</p>
                           </div>
                         )}
                      </div>
                   </div>
                   
                   <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between opacity-30 gap-6">
                      <div className="flex items-center space-x-4">
                         <Lock size={14} />
                         <span className="text-[9px] font-black uppercase tracking-widest">Restricted Curriculum Environment</span>
                      </div>
                      <div className="flex items-center space-x-4">
                         <Info size={14} />
                         <span className="text-[9px] font-black uppercase tracking-widest">Synthesis associative tagging: MOD_{moduleId}</span>
                      </div>
                   </div>
                </div>
              </section>
           </div>

           {/* Sidebar: Curriculum Assets */}
           <div className="lg:col-span-4 space-y-12 h-full">
              <aside className="sticky top-40">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Curriculum Clips</h3>
                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-400">ARCHIVE_0{moduleId}</div>
                </div>
                
                <div className="space-y-8">
                   {loading ? (
                     <div className="py-20 text-center">
                        <Loader2 className="animate-spin text-authority-blue mx-auto mb-6" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Indexing neural vault...</p>
                     </div>
                   ) : videos.length > 0 ? (
                     videos.map((vid) => (
                       <div key={vid.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm group hover:shadow-2xl transition-all duration-500">
                          <div className="aspect-video bg-black relative overflow-hidden">
                             <video src={vid.url} controls className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                             <div className="absolute top-5 left-5">
                                <span className="bg-[#C5A059] text-[#002244] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                                  NEURAL ASSET
                                </span>
                             </div>
                          </div>
                          <div className="p-8">
                             <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic line-clamp-3">
                               "{vid.prompt}"
                             </p>
                          </div>
                       </div>
                     ))
                   ) : (
                     <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-16 text-center">
                        <Video size={56} className="text-slate-200 dark:text-slate-700 mx-auto mb-6" />
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">No visualization assets indexed.</p>
                     </div>
                   )}
                </div>

                <div className="mt-12 bg-authority-blue p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
                   <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Cpu size={140}/></div>
                   <h4 className="text-xl font-bold font-serif mb-6 uppercase text-signal-gold">Remediation Link</h4>
                   <p className="text-base font-medium leading-relaxed text-white/60 mb-10">
                     Each institutional concept includes downloadable implementation guards for your authority.
                   </p>
                   <Link to="/resources" className="w-full bg-white text-authority-blue py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center shadow-2xl hover:bg-signal-gold transition-all active:scale-95 group">
                      Access Security Files <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </aside>
           </div>

        </div>
      </div>
    </div>
  );
};

// Reusable local icon components
const Monitor = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const XIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Cpu = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/>
  </svg>
);

export default ModuleDetailPage;
