
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../../firebase';
import { 
  Video, 
  Plus, 
  Trash2, 
  Loader2, 
  Sparkles, 
  X, 
  Film,
  Type,
  Maximize2,
  Settings2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../../types';
import { COURSE_MODULES } from '../../constants';
import VideoUploader from '../../components/admin/VideoUploader';

const VideoLab = () => {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  
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
    "Polishing regulatory high-fidelity output..."
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
    });
    return unsub;
  }, []);

  const handleManualUploadComplete = async (url: string, path: string) => {
    try {
      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.title || "Manual Upload - Core Curriculum",
        url,
        storagePath: path,
        aspectRatio: '16:9',
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });
      setShowUploader(false);
      setFormData({ ...formData, title: '', prompt: '' });
    } catch (e) {
      console.error("Failed to save video record:", e);
      alert("Video uploaded but database record failed.");
    }
  };

  const generateAIVideo = async () => {
    if (!formData.prompt || isGenerating) return;
    setIsGenerating(true);
    setGenMessage(reassuringMessages[0]);
    const msgInt = setInterval(() => setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]), 15000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let initialOp = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic professional trucking compliance scene: ${formData.prompt}`,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: formData.aspectRatio }
      });

      let operation = { name: initialOp.name, done: initialOp.done } as any;
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        const res = await ai.operations.getVideosOperation({ 
          operation: { name: operation.name } as any 
        });
        operation = { name: res.name, done: res.done, response: res.response };
      }

      const link = operation.response?.generatedVideos?.[0]?.video?.uri;
      const vidRes = await fetch(`${link}&key=${process.env.API_KEY}`);
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
      setShowUploader(false);
      setFormData({ ...formData, title: '', prompt: '' });
    } catch (e) {
      console.error("AI Gen Failed", e);
      alert("AI Generation encountered an error.");
    } finally {
      clearInterval(msgInt);
      setIsGenerating(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Video Curriculum Lab</h1>
          <p className="text-text-muted mt-1">Manage cinematic visualizations and instructional media assets.</p>
        </div>
        <button 
          onClick={() => setShowUploader(true)}
          className="bg-authority-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center shadow-2xl hover:bg-steel-blue transition-all active:scale-95 group"
        >
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" /> 
          Add Production Asset
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
                       try { await deleteObject(ref(storage, vid.storagePath)); } catch(e) { console.warn("Storage cleanup skipped", e); }
                     }
                   }
                }}
                className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-red-600 active:scale-90"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-8">
               <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-authority-blue/10 text-authority-blue dark:text-steel-blue px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-authority-blue/20">
                    Module {vid.moduleId}
                  </span>
                  <span className="text-[10px] text-text-muted font-bold font-mono">
                    {new Date(vid.createdAt).toLocaleDateString()}
                  </span>
               </div>
               <h4 className="font-bold text-sm text-text-primary dark:text-white line-clamp-2 leading-relaxed">{vid.prompt}</h4>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="col-span-full py-24 bg-slate-50 dark:bg-gray-900/30 rounded-[3rem] border border-dashed border-border-light dark:border-border-dark text-center">
            <Film className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-20" />
            <p className="text-text-muted font-bold">No production assets found in the lab.</p>
          </div>
        )}
      </div>

      {showUploader && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] shadow-2xl max-w-4xl w-full relative border border-border-light dark:border-border-dark overflow-y-auto max-h-[95vh] custom-scrollbar">
              <button onClick={() => setShowUploader(false)} className="absolute top-8 right-8 p-3 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-all active:scale-90"><X /></button>
              
              <div className="mb-10">
                <h2 className="text-3xl font-black font-serif text-authority-blue dark:text-white flex items-center">
                  <Settings2 className="mr-3 text-signal-gold" size={28} />
                  Asset Configuration
                </h2>
                <p className="text-text-muted mt-2 font-medium">Link production-grade visuals to specific learning modules.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Target Curriculum Module</label>
                    <select 
                      value={formData.moduleId}
                      onChange={(e) => setFormData({...formData, moduleId: parseInt(e.target.value)})}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl font-bold outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                    >
                      {COURSE_MODULES.map(m => <option key={m.id} value={m.id}>Module {m.id}: {m.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Asset Title / Description</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-4 text-text-muted" size={18} />
                      <textarea 
                        rows={2}
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Master Class: HOS Rule Visualization"
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl pl-12 pr-6 py-4 font-bold outline-none focus:ring-2 focus:ring-authority-blue transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-gray-900 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-4 shadow-inner">
                    <div className="flex items-center space-x-2 text-authority-blue dark:text-steel-blue mb-2">
                       <Sparkles size={16} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Neural Synthesis Mode</span>
                    </div>
                    <textarea 
                      rows={3}
                      value={formData.prompt}
                      onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                      placeholder="Describe the cinematic scene for AI generation..."
                      className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl p-4 text-xs font-bold focus:ring-2 focus:ring-authority-blue transition-all"
                    />
                    <button 
                      onClick={generateAIVideo}
                      disabled={!hasApiKey || isGenerating}
                      className="w-full bg-authority-blue text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all shadow-xl hover:bg-steel-blue"
                    >
                      {isGenerating ? <Loader2 className="animate-spin mr-2" size={14}/> : <Sparkles className="mr-2" size={14} />}
                      Synthesize via AI
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Manual Production Sync</label>
                  <VideoUploader 
                    label="Upload Local Production File"
                    onUploadComplete={handleManualUploadComplete}
                  />
                  <div className="p-6 bg-blue-50 dark:bg-authority-blue/10 rounded-2xl border border-blue-100 dark:border-authority-blue/20">
                    <p className="text-[10px] font-black text-authority-blue uppercase mb-2">System Note</p>
                    <p className="text-xs text-text-muted leading-relaxed">Manual uploads are immediately optimized for web streaming and stored in the 'curriculum_videos' cloud bucket.</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;
