
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../../firebase';
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Sparkles, 
  X, 
  Film,
  Settings2,
  CheckCircle2,
  Zap,
  Monitor,
  Calendar,
  FileText,
  Cpu,
  Terminal,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../../types';
import { COURSE_MODULES } from '../../constants';
import VideoUploader from '../../components/admin/VideoUploader';

/**
 * Video Studio Lab: Neural Curriculum Asset Synthesis
 * This component directs the synthesis and archival of educational visualizations.
 */
const VideoLab = () => {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [productionMode, setProductionMode] = useState<'ai' | 'manual'>('ai');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [refFile, setRefFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    aspectRatio: '16:9' as '16:9' | '9:16',
    moduleId: 0
  });

  const reassuringMessages = [
    "SEQUENCING NEURAL ASSET...", 
    "BAKING LIGHT TRANSPORT MODELS...", 
    "PROVISIONING RENDER NODES...",
    "FINALIZING CINEMATIC BUFFERS...",
    "UPLINKING TO CLOUD REGISTRY..."
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
    const q = query(collection(db, "generatedVideos"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);

  const selectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  /**
   * generateAIVideo: Triggers Veo 3.1 Synthesis
   * Adheres to long-polling and persistent download patterns.
   */
  const generateAIVideo = async () => {
    if (!formData.prompt || isGenerating) return;
    setIsGenerating(true);
    setGenMessage(reassuringMessages[0]);
    const msgInt = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 12000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Institutional curriculum visualization for LaunchPath: ${formData.prompt}. Cinematic, professional, 1080p target.`,
        config: { 
          numberOfVideos: 1, 
          resolution: '720p', 
          aspectRatio: formData.aspectRatio 
        }
      };

      if (refFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((res) => {
          reader.onload = () => res((reader.result as string).split(',')[1]);
          reader.readAsDataURL(refFile);
        });
        config.image = { imageBytes: base64, mimeType: refFile.type };
      }

      let operation = await ai.models.generateVideos(config);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        // Requirement: Renewed instance for polling
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation });
      }

      if (operation.error) {
        throw new Error(operation.error.message || "Synthesis error.");
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Terminal mismatch: Result missing.");

      // Requirement: Fetch with API Key
      const vidRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await vidRes.blob();
      const vidPath = `generated/${Date.now()}.mp4`;
      const storageRef = ref(storage, vidPath);
      await uploadBytes(storageRef, blob);
      const persistentUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.prompt,
        url: persistentUrl,
        storagePath: vidPath,
        aspectRatio: formData.aspectRatio,
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });
      
      setShowModal(false);
      setFormData({ ...formData, title: '', prompt: '' });
      setRefFile(null);
    } catch (e: any) {
      if (e.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Session authorization fault. Re-authenticate Studio key.");
      } else {
        console.error("Video Lab Fault:", e);
        alert("Synthesis rejected. Verify terminal directives.");
      }
    } finally {
      clearInterval(msgInt);
      setIsGenerating(false);
    }
  };

  const handleManualUploadComplete = async (url: string, path: string) => {
    try {
      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.title || "Manual Archive Asset",
        url,
        storagePath: path,
        aspectRatio: '16:9',
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });
      setShowModal(false);
    } catch (e) {
      alert("Registry synchronization failed.");
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-authority-blue" size={40} />
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Production Studio</h1>
          <p className="text-text-muted mt-1 font-bold text-sm uppercase tracking-widest opacity-60">Directing neural curriculum assets</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-authority-blue text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,34,68,0.2)] hover:bg-slate-800 border-b-4 border-black">Initialize Production</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm group relative hover:shadow-2xl transition-all duration-700">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video src={vid.url} className="w-full h-full object-cover" controls />
              <button 
                onClick={async () => { 
                  if(window.confirm("Permanently purge this asset from the registry?")) { 
                    await deleteDoc(doc(db, "generatedVideos", vid.id)); 
                    if(vid.storagePath) try { await deleteObject(ref(storage, vid.storagePath)); } catch(e){} 
                  } 
                }} 
                className="absolute top-6 right-6 p-3 bg-red-600 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all z-20 shadow-2xl hover:scale-110 active:scale-95"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="bg-authority-blue/5 text-authority-blue dark:text-signal-gold px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-authority-blue/10">
                  {vid.moduleId === 0 ? 'Ground 0' : `Module ${vid.moduleId}`}
                </span>
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  <Activity size={10} className="text-signal-gold" />
                  <span>{new Date(vid.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <Terminal size={14} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Directive Summary</p>
                </div>
                <h4 className="font-bold text-sm text-text-primary dark:text-white line-clamp-3 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{vid.prompt}"</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] max-w-6xl w-full relative overflow-y-auto max-h-[95vh] custom-scrollbar border-4 border-white/5">
              <button onClick={() => setShowModal(false)} className="absolute top-12 right-12 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all group z-20"><X className="group-hover:rotate-90 transition-transform" /></button>
              
              <header className="mb-12 space-y-3">
                 <div className="flex items-center space-x-4">
                    <Settings2 className="text-signal-gold" size={32} />
                    <h2 className="text-4xl md:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight leading-none">Production Interface</h2>
                 </div>
                 <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">System Registry Asset Generator v2.4</p>
              </header>

              <div className="flex bg-slate-50 dark:bg-slate-950 p-2 rounded-[2.5rem] mb-16 max-w-md border border-slate-100 dark:border-slate-800 shadow-inner">
                <button 
                  onClick={() => setProductionMode('ai')}
                  className={`flex-grow py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all ${productionMode === 'ai' ? 'bg-white dark:bg-slate-800 text-authority-blue dark:text-signal-gold shadow-2xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Neural Synthesis
                </button>
                <button 
                  onClick={() => setProductionMode('manual')}
                  className={`flex-grow py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest transition-all ${productionMode === 'manual' ? 'bg-white dark:bg-slate-800 text-authority-blue dark:text-signal-gold shadow-2xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Manual Archive
                </button>
              </div>

              {productionMode === 'ai' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Visual Directive (High Fidelity Prompt)</label>
                         <div className="relative">
                            <Terminal className="absolute left-8 top-8 text-slate-400" size={24} />
                            <textarea 
                              rows={6}
                              value={formData.prompt}
                              onChange={e => setFormData({ ...formData, prompt: e.target.value })}
                              placeholder="Describe the cinematic visualization directive for curriculum synthesis..."
                              className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-authority-blue dark:focus:border-signal-gold outline-none rounded-[3rem] pl-20 pr-10 py-8 font-black text-lg transition-all shadow-inner dark:text-white"
                            />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-10">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Aspect Ratio</label>
                            <select 
                              value={formData.aspectRatio}
                              onChange={e => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                              className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-authority-blue outline-none rounded-[2rem] px-8 py-5 font-black text-sm appearance-none cursor-pointer dark:text-white"
                            >
                               <option value="16:9">Landscape (16:9)</option>
                               <option value="9:16">Portrait (9:16)</option>
                            </select>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Module Map</label>
                            <select 
                              value={formData.moduleId}
                              onChange={e => setFormData({ ...formData, moduleId: parseInt(e.target.value) })}
                              className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-authority-blue outline-none rounded-[2rem] px-8 py-5 font-black text-sm appearance-none cursor-pointer dark:text-white"
                            >
                               {COURSE_MODULES.map(m => (
                                 <option key={m.id} value={m.id}>{m.title}</option>
                               ))}
                            </select>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Start Image Reference (Optional)</label>
                         <input 
                           type="file" 
                           accept="image/*"
                           onChange={e => setRefFile(e.target.files?.[0] || null)}
                           className="w-full text-[11px] font-black uppercase file:mr-6 file:py-3 file:px-8 file:rounded-2xl file:border-0 file:bg-authority-blue file:text-white file:cursor-pointer hover:file:bg-slate-800 transition-all"
                         />
                      </div>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        {!hasApiKey ? (
                          <button 
                            onClick={selectApiKey}
                            className="w-full py-8 rounded-[2.5rem] bg-amber-600 text-white font-black uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-95 transition-all border-b-8 border-amber-900"
                          >
                            Authorize Synthesis key
                          </button>
                        ) : (
                          <button 
                            onClick={generateAIVideo}
                            disabled={isGenerating || !formData.prompt}
                            className="w-full py-10 rounded-[3rem] bg-authority-blue text-white font-black uppercase tracking-[0.5em] text-sm flex items-center justify-center gap-4 shadow-2xl active:scale-95 disabled:opacity-20 transition-all border-b-[12px] border-black group"
                          >
                             {isGenerating ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />}
                             {isGenerating ? 'SYNTHESIZING...' : 'INITIALIZE PRODUCTION'}
                          </button>
                        )}
                      </div>
                   </div>

                   <div className="bg-slate-50 dark:bg-slate-950 rounded-[5rem] flex flex-col items-center justify-center text-center p-16 border-4 border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden group/monitor shadow-inner min-h-[600px]">
                      {isGenerating ? (
                        <div className="space-y-12 animate-in zoom-in-95 duration-700">
                           <div className="relative">
                              <div className="w-40 h-40 bg-authority-blue/5 rounded-full border-[8px] border-authority-blue border-t-transparent dark:border-signal-gold dark:border-t-transparent animate-spin mx-auto shadow-2xl"></div>
                              <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-authority-blue dark:text-signal-gold" size={48} />
                           </div>
                           <div className="space-y-4">
                              <p className="font-black text-3xl uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold animate-pulse leading-none">{genMessage}</p>
                              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">Provisioning Neural Frame Buffers</p>
                           </div>
                        </div>
                      ) : (
                        <div className="opacity-10 group-hover/monitor:opacity-30 transition-opacity duration-700">
                           <Monitor size={160} className="mx-auto mb-10" />
                           <p className="font-black uppercase tracking-[1em] text-sm">Standby Mode</p>
                        </div>
                      )}
                      
                      <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-center opacity-30 text-[9px] font-black uppercase tracking-widest">
                         <div className="flex items-center gap-2"><Activity size={10} /> LINK_STABLE</div>
                         <div>UPLINK_VEO_3.1</div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto space-y-16 animate-reveal-up py-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Asset Identification</label>
                        <input 
                          value={formData.title}
                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                          placeholder="e.g. 03_Safety_Brief_Final"
                          className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-authority-blue outline-none rounded-2xl px-8 py-5 font-black text-sm shadow-inner dark:text-white"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Curriculum Mapping</label>
                        <select 
                          value={formData.moduleId}
                          onChange={e => setFormData({ ...formData, moduleId: parseInt(e.target.value) })}
                          className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 focus:border-authority-blue outline-none rounded-2xl px-8 py-5 font-black text-sm appearance-none cursor-pointer dark:text-white"
                        >
                           {COURSE_MODULES.map(m => (
                             <option key={m.id} value={m.id}>{m.title}</option>
                           ))}
                        </select>
                      </div>
                   </div>
                   <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-1 shadow-2xl">
                      <VideoUploader onUploadComplete={handleManualUploadComplete} label="Archive Master asset" />
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;
