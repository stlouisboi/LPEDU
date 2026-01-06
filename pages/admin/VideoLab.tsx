
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from '../../firebase';
import { 
  Video, 
  Plus, 
  Trash2, 
  Loader2, 
  ShieldAlert, 
  Sparkles, 
  X, 
  Film,
  Upload,
  Maximize2,
  BookOpen
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../../types';
import { COURSE_MODULES } from '../../constants';
import MediaUploader from '../../components/admin/MediaUploader';

const VideoLab = () => {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  
  const [formData, setFormData] = useState({
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

  const handleManualUpload = async (url: string, path: string) => {
    await addDoc(collection(db, "generatedVideos"), {
      prompt: "Manual Upload - Core Curriculum",
      url,
      storagePath: path,
      aspectRatio: '16:9',
      moduleId: formData.moduleId,
      createdAt: new Date().toISOString()
    });
    setShowUploader(false);
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
        const res = await ai.operations.getVideosOperation({ operation: { name: operation.name } as any });
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
    } catch (e) {
      alert("AI Generation failed.");
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
          <h1 className="text-3xl font-bold font-serif text-authority-blue">Video Curriculum Lab</h1>
          <p className="text-text-muted mt-1 text-sm">Synchronize AI visualizations and manual curriculum assets.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowUploader(true)}
            className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-steel-blue transition-all"
          >
            <Plus size={18} className="mr-2" /> Add Curriculum Media
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light overflow-hidden flex flex-col group relative shadow-sm hover:shadow-xl transition-all">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video src={vid.url} className="w-full h-full object-cover" controls />
              <button 
                onClick={async () => {
                   if(window.confirm("Purge this video?")) {
                     await deleteDoc(doc(db, "generatedVideos", vid.id));
                     if(vid.storagePath) await deleteObject(ref(storage, vid.storagePath));
                   }
                }}
                className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="p-6">
               <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-authority-blue/10 text-authority-blue px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Module {vid.moduleId}
                  </span>
                  <span className="text-[10px] text-text-muted font-bold font-mono">
                    {new Date(vid.createdAt).toLocaleDateString()}
                  </span>
               </div>
               <p className="text-xs font-bold text-text-primary line-clamp-2 leading-relaxed">{vid.prompt}</p>
            </div>
          </div>
        ))}
      </div>

      {showUploader && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl max-w-2xl w-full relative">
              <button onClick={() => setShowUploader(false)} className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full"><X /></button>
              <h2 className="text-2xl font-bold font-serif mb-8 text-authority-blue">Add Asset to Curriculum</h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Target Course Module</label>
                  <select 
                    value={formData.moduleId}
                    onChange={(e) => setFormData({...formData, moduleId: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-border-light rounded-2xl font-bold outline-none"
                  >
                    {COURSE_MODULES.map(m => <option key={m.id} value={m.id}>Module {m.id}: {m.title}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-8 py-4">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue border-b pb-2">Option A: Manual Sync</p>
                      <MediaUploader 
                        label="Upload Production File"
                        folder="curriculum_videos"
                        accept="video/*"
                        iconType="video"
                        onUploadComplete={handleManualUpload}
                      />
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue border-b pb-2">Option B: Neural Synthesis</p>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-border-light space-y-4">
                        <textarea 
                          rows={3}
                          value={formData.prompt}
                          onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                          placeholder="Describe the cinematic scene..."
                          className="w-full bg-white border border-border-light rounded-xl p-4 text-xs font-bold"
                        />
                        <button 
                          onClick={generateAIVideo}
                          disabled={!hasApiKey || isGenerating}
                          className="w-full bg-gradient-to-r from-authority-blue to-steel-blue text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center disabled:opacity-30"
                        >
                          {isGenerating ? <Loader2 className="animate-spin mr-2" size={14}/> : <Sparkles className="mr-2" size={14} />}
                          Synthesize Asset
                        </button>
                      </div>
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
