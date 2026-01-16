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
  Type,
  Maximize2,
  Settings2,
  Upload,
  Layers,
  ImageIcon,
  ShieldAlert,
  Info,
  Server,
  Activity
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../../types';
import { COURSE_MODULES } from '../../constants';
import VideoUploader from '../../components/admin/VideoUploader';

const VideoLab = () => {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [productionMode, setProductionMode] = useState<'ai' | 'manual'>('ai');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [refFile, setRefFile] = useState<File | null>(null);
  const [refPreview, setRefPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    aspectRatio: '16:9' as '16:9' | '9:16',
    moduleId: 0
  });

  const reassuringMessages = [
    "Synthesizing compliance visuals...",
    "Calibrating authority registration scenes...",
    "Rendering cinematic motion vectors...",
    "Polishing regulatory high-fidelity output...",
    "Baking neural light models..."
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
    }, (error) => {
      console.error("VideoLab: Sync failed.", error);
      setLoading(false);
    });
    
    return unsub;
  }, []);

  const selectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleManualUploadComplete = async (url: string, path: string) => {
    try {
      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.title || "Manual Archive: Instruction Asset",
        url,
        storagePath: path,
        aspectRatio: '16:9',
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });
      setShowModal(false);
      setFormData({ ...formData, title: '', prompt: '' });
    } catch (e) {
      console.error("Failed to save video record:", e);
    }
  };

  const generateAIVideo = async () => {
    if (!formData.prompt || isGenerating) return;
    setIsGenerating(true);
    setGenMessage(reassuringMessages[0]);
    const msgInt = setInterval(() => setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]), 15000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Professional, cinematic trucking compliance visualization: ${formData.prompt}`,
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

      let initialOp = await ai.models.generateVideos(config);
      let opName = initialOp.name;

      let operationDone = false;
      let finalOp: any = null;

      while (!operationDone) {
        await new Promise(r => setTimeout(r, 10000));
        const opResult = await ai.operations.getVideosOperation({ 
          operation: { name: opName } as any 
        });
        if (opResult.done) {
          operationDone = true;
          finalOp = opResult;
        }
      }

      const downloadLink = finalOp?.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed - no URI returned.");

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
      setRefPreview(null);
    } catch (e: any) {
      console.error("AI Gen Failed", e);
      if (e.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Authorization expired. Please re-select your AI Studio API key.");
      } else {
        alert(`AI Synthesis error: ${e.message || "Unknown error."}`);
      }
    } finally {
      clearInterval(msgInt);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-serif text-authority-blue dark:text-white">Curriculum Video Lab</h1>
          <p className="text-text-muted mt-1">Manage cinematic visualizations and instructional media assets.</p>
        </div>
        <button 
          onClick={() => { setShowModal(true); setProductionMode('ai'); }}
          className="bg-authority-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group"
        >
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" /> 
          Initialize Production
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden flex flex-col group relative shadow-sm hover:shadow-2xl transition-all">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video src={vid.url} className="w-full h-full object-cover" controls />
              <button 
                onClick={async () => {
                   if(window.confirm("Purge this video asset from curriculum?")) {
                     await deleteDoc(doc(db, "generatedVideos", vid.id));
                     if(vid.storagePath) {
                       try { await deleteObject(ref(storage, vid.storagePath)); } catch(e) {}
                     }
                   }
                }}
                className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-red-600 active:scale-90 z-20"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-8">
               <span className="bg-authority-blue/10 text-authority-blue dark:text-steel-blue px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-authority-blue/20">
                 Module {vid.moduleId}
               </span>
               <h4 className="font-bold text-sm text-text-primary dark:text-white mt-4 line-clamp-2">{vid.prompt}</h4>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[4rem] shadow-2xl max-w-5xl w-full relative border border-border-light dark:border-border-dark overflow-y-auto max-h-[95vh] custom-scrollbar">
              <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 p-3 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-all active:scale-90"><X /></button>
              
              <div className="mb-10">
                <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white flex items-center">
                  <Settings2 className="mr-4 text-signal-gold" size={36} />
                  Asset Production Studio
                </h2>
              </div>

              <div className="flex bg-slate-50 dark:bg-gray-900 p-2 rounded-[2.5rem] mb-12 max-w-md mx-auto md:mx-0 border border-border-light shadow-inner">
                <button 
                  onClick={() => setProductionMode('ai')}
                  className={`flex-grow flex items-center justify-center space-x-3 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'ai' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted'}`}
                >
                  <Sparkles size={16} />
                  <span>AI Generation</span>
                </button>
                <button 
                  onClick={() => setProductionMode('manual')}
                  className={`flex-grow flex items-center justify-center space-x-3 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'manual' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted'}`}
                >
                  <Upload size={16} />
                  <span>Manual Upload</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3 flex items-center">
                      <Layers size={14} className="mr-2 text-authority-blue" /> Target Curriculum Module
                    </label>
                    <select 
                      value={formData.moduleId}
                      onChange={(e) => setFormData({...formData, moduleId: parseInt(e.target.value)})}
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 rounded-3xl font-black text-sm outline-none focus:border-authority-blue transition-all"
                    >
                      {COURSE_MODULES.map(m => <option key={m.id} value={m.id}>Module {m.id}: {m.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3 flex items-center">
                      <Type size={14} className="mr-2 text-authority-blue" /> Production Title
                    </label>
                    <input 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Title or description..."
                      className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 rounded-3xl px-8 py-5 font-bold outline-none focus:border-authority-blue transition-all"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-900 rounded-[3rem] p-8 border-2 border-slate-100 relative flex flex-col justify-center min-h-[400px]">
                  {productionMode === 'ai' ? (
                    <div className="space-y-6">
                       {!hasApiKey ? (
                          <div className="text-center space-y-6">
                             <ShieldAlert className="mx-auto text-amber-600" size={48} />
                             <p className="text-sm font-bold">Enterprise Cloud Access Required</p>
                             <button onClick={selectApiKey} className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl">Authorize Key</button>
                          </div>
                       ) : (
                         <>
                          <textarea 
                            rows={5}
                            value={formData.prompt}
                            onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                            placeholder="Describe scene for AI visualization..."
                            className="w-full bg-white dark:bg-gray-800 border-2 border-slate-100 rounded-[2rem] p-6 text-sm font-bold focus:border-authority-blue outline-none"
                          />
                          <button 
                            onClick={generateAIVideo}
                            disabled={isGenerating || !formData.prompt}
                            className="w-full h-24 bg-authority-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl transition-all disabled:opacity-30"
                          >
                            {isGenerating ? (
                              <div className="flex flex-col items-center">
                                <div className="flex items-center space-x-3 mb-1">
                                  <Loader2 className="animate-spin" size={28} />
                                  <span className="text-lg">Neural Bake Active</span>
                                </div>
                                <span className="text-[8px] opacity-60 uppercase tracking-[0.5em]">{genMessage}</span>
                              </div>
                            ) : (
                              <><Sparkles className="mr-3" size={24} /><span>Synthesize Visual Asset</span></>
                            )}
                          </button>
                         </>
                       )}
                    </div>
                  ) : (
                    <VideoUploader 
                      label="Stream Master Production File"
                      onUploadComplete={handleManualUploadComplete}
                    />
                  )}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const Settings2 = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 7h-9M14 17H5M17 12H7M21 12h-1M5 12H3M21 7h-1M8 7H3M21 17h-4M11 17H3" />
  </svg>
);

export default VideoLab;