
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
  Monitor
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
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    aspectRatio: '16:9' as '16:9' | '9:16',
    moduleId: 0
  });

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
        prompt: `Institutional cinematic visualization for LaunchPath: ${formData.prompt}. High-quality, professional tone.`,
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
        // Use a new instance to ensure we use the latest key from the environment
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation: operation });
      }

      if (operation.error) {
        throw new Error(operation.error.message || "Neural synthesis failed.");
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Generated video link missing.");

      // Fetch the video bytes using the current API key
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
        alert("Session authorization expired. Please re-authorize your Studio key.");
      } else {
        console.error("Video Generation Error:", e);
        alert("Neural synthesis failed. Please review your visual directives.");
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
      alert("Database synchronization failed.");
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-authority-blue" size={40} />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Video Studio Lab</h1>
          <p className="text-text-muted mt-1 font-medium">Directing institutional curriculum visualizations.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-authority-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] active:scale-95 transition-all shadow-lg hover:bg-steel-blue">Initialize Production</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm group relative hover:shadow-xl transition-all">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video src={vid.url} className="w-full h-full object-cover" controls />
              <button 
                onClick={async () => { 
                  if(window.confirm("Permanently purge this asset?")) { 
                    await deleteDoc(doc(db, "generatedVideos", vid.id)); 
                    if(vid.storagePath) try { await deleteObject(ref(storage, vid.storagePath)); } catch(e){} 
                  } 
                }} 
                className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-8">
              <span className="bg-authority-blue/10 text-authority-blue dark:text-signal-gold px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                {vid.moduleId === 0 ? 'Ground 0' : `Module ${vid.moduleId}`}
              </span>
              <h4 className="font-bold text-sm text-text-primary dark:text-white mt-4 line-clamp-2 leading-relaxed">{vid.prompt}</h4>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[4rem] shadow-2xl max-w-5xl w-full relative overflow-y-auto max-h-[95vh] custom-scrollbar border border-white/10">
              <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 p-3 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-all"><X /></button>
              <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white flex items-center mb-10"><Settings2 className="mr-4 text-signal-gold" size={36} />Production Studio</h2>

              <div className="flex bg-slate-50 dark:bg-gray-900 p-2 rounded-[2.5rem] mb-12 max-w-md border shadow-inner border-slate-100 dark:border-border-dark">
                <button onClick={() => setProductionMode('ai')} className={`flex-grow py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'ai' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted dark:text-text-dark-muted'}`}>AI Generation</button>
                <button onClick={() => setProductionMode('manual')} className={`flex-grow py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'manual' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted dark:text-text-dark-muted'}`}>Manual Upload</button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3">Target Module</label>
                    <select value={formData.moduleId} onChange={(e) => setFormData({...formData, moduleId: parseInt(e.target.value)})} className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border dark:border-border-dark rounded-3xl font-black text-sm outline-none focus:ring-4 focus:ring-authority-blue/10">
                      {COURSE_MODULES.map(m => <option key={m.id} value={m.id}>{m.id === 0 ? 'Ground 0' : `Module ${m.id}`}: {m.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3">Asset Title</label>
                    <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Archive label..." className="w-full bg-slate-50 dark:bg-gray-800 border dark:border-border-dark border-slate-100 rounded-3xl px-8 py-5 font-bold" />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-900 rounded-[3rem] p-8 border border-slate-100 dark:border-border-dark relative flex flex-col justify-center min-h-[400px] shadow-inner">
                  {productionMode === 'ai' ? (
                    <div className="space-y-6">
                       {!hasApiKey ? <button onClick={selectApiKey} className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-amber-700 transition-all">Authorize Terminal Key</button> : 
                       <>
                          <textarea rows={5} value={formData.prompt} onChange={(e) => setFormData({...formData, prompt: e.target.value})} placeholder="Describe cinematic directive..." className="w-full bg-white dark:bg-gray-800 border dark:border-border-dark rounded-[2rem] p-6 text-sm font-bold shadow-sm" />
                          <button onClick={generateAIVideo} disabled={isGenerating || !formData.prompt} className="w-full h-24 bg-authority-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl active:scale-95 disabled:opacity-30 border-b-4 border-slate-900">
                            {isGenerating ? <><Loader2 className="animate-spin mr-3" size={28} /><span>Neural Synthesis Active</span></> : <><Sparkles className="mr-3" size={24} /><span>Synthesize Visual</span></>}
                          </button>
                       </>}
                    </div>
                  ) : <VideoUploader onUploadComplete={handleManualUploadComplete} />}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;
