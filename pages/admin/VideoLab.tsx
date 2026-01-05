
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import { 
  Video, 
  Plus, 
  Trash2, 
  Loader2, 
  Play, 
  Download, 
  ShieldAlert, 
  Zap, 
  Clock,
  Sparkles,
  ExternalLink,
  X,
  ChevronRight,
  Film,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { GeneratedVideo } from '../../types';
import { COURSE_MODULES } from '../../constants';

const VideoLab = () => {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [genMessage, setGenMessage] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);
  
  const [formData, setFormData] = useState({
    prompt: '',
    aspectRatio: '16:9' as '16:9' | '9:16',
    moduleId: 0
  });

  const reassuringMessages = [
    "Synthesizing visual compliance components...",
    "Rendering realistic motion profiles...",
    "Applying regulatory textures to scene...",
    "Finalizing safety audit visual flow...",
    "Calibrating authority registration animations...",
    "Baking cinematic lighting into explanatory clips...",
    "Optimizing video for streaming delivery...",
    "Generating professional narrative flow..."
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
    const q = query(collection(db, "generatedVideos"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
      setLoading(false);
    }, (error) => {
      console.warn("VideoLab: Sync error.", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleOpenSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const generateVideo = async () => {
    if (!formData.prompt || isGenerating) return;
    if (!storage) {
      alert("Firebase Storage is not initialized.");
      return;
    }

    setIsGenerating(true);
    setGenMessage(reassuringMessages[0]);
    const messageInterval = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 12000);

    try {
      // Create fresh instance per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Professional instructional video for a trucking business: ${formData.prompt}. High definition, cinematic corporate education style, clean visuals.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: formData.aspectRatio
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed to return a link.");

      setGenMessage("Transferring media to secure storage...");
      
      // Fetch the binary data
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error("Failed to download video from Veo server.");
      const blob = await response.blob();

      // Upload to Firebase Storage for persistence
      const videoId = `video_${Date.now()}`;
      const storageRef = ref(storage, `curriculum_videos/${videoId}.mp4`);
      const uploadResult = await uploadBytes(storageRef, blob);
      const persistentUrl = await getDownloadURL(uploadResult.ref);

      // Save metadata to Firestore
      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.prompt,
        url: persistentUrl,
        storagePath: `curriculum_videos/${videoId}.mp4`,
        aspectRatio: formData.aspectRatio,
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });

      setShowGenerator(false);
      setFormData({ prompt: '', aspectRatio: '16:9', moduleId: 0 });
    } catch (err: any) {
      console.error("Video Gen Error:", err);
      if (err.message?.includes("Requested entity was not found") || err.message?.includes("404")) {
        setHasApiKey(false);
        alert("Requested entity was not found. Please select your API key again.");
      } else {
        alert("Failed to generate video: " + err.message);
      }
    } finally {
      clearInterval(messageInterval);
      setIsGenerating(false);
    }
  };

  const handleDelete = async (vid: GeneratedVideo) => {
    if (!window.confirm("Delete this video clip permanently?")) return;
    try {
      // Delete from Storage first
      if (storage && (vid as any).storagePath) {
        const fileRef = ref(storage, (vid as any).storagePath);
        await deleteObject(fileRef).catch(e => console.warn("Storage delete failed", e));
      }
      
      // Delete from Firestore
      await deleteDoc(doc(db, "generatedVideos", vid.id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-authority-blue" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Video Content Lab</h1>
          <p className="text-text-muted mt-1">Generate cinematic clips for carrier orientation using Veo 3.1.</p>
        </div>
        {!hasApiKey ? (
          <button 
            onClick={handleOpenSelectKey}
            className="bg-signal-gold text-authority-blue px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-white transition-all"
          >
            <ShieldAlert size={18} className="mr-2" /> Connect Paid API Key
          </button>
        ) : (
          <button 
            onClick={() => setShowGenerator(true)}
            className="bg-authority-blue text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-steel-blue transition-all"
          >
            <Plus size={18} className="mr-2" /> Create Clip
          </button>
        )}
      </div>

      {!hasApiKey && (
        <div className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-[2.5rem] border border-amber-200 dark:border-amber-900/50 text-center space-y-4">
          <Film className="mx-auto text-amber-600" size={48} />
          <h3 className="text-xl font-bold font-serif text-amber-900 dark:text-amber-400">Paid API Key Required</h3>
          <p className="text-amber-800/70 dark:text-amber-300/70 max-w-xl mx-auto">
            Veo video generation requires a billing-enabled Google Cloud project. 
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="mx-1 underline font-bold">Learn about billing</a>.
          </p>
          <button 
            onClick={handleOpenSelectKey}
            className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all"
          >
            Select API Key
          </button>
        </div>
      )}

      {/* Grid of Generated Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video 
                src={vid.url} 
                className="w-full h-full object-cover" 
                controls
              />
              <button 
                onClick={() => handleDelete(vid)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold bg-authority-blue/5 px-2 py-1 rounded">
                  Module {vid.moduleId}: {COURSE_MODULES.find(m => m.id === vid.moduleId)?.title || 'General'}
                </span>
                <span className="text-[10px] font-bold text-text-muted">{new Date(vid.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-text-muted line-clamp-2 italic">"{vid.prompt}"</p>
            </div>
          </div>
        ))}

        {videos.length === 0 && !loading && hasApiKey && (
          <div className="col-span-full py-24 text-center bg-slate-50 dark:bg-gray-800/50 border-2 border-dashed border-border-light rounded-[3rem]">
            <Sparkles className="mx-auto text-authority-blue/20 mb-4" size={48} />
            <p className="text-text-muted font-bold">No generated clips yet.</p>
            <p className="text-xs text-text-muted mt-1">Use the "Create Clip" button to visualize your curriculum.</p>
          </div>
        )}
      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[3rem] shadow-2xl border border-border-light dark:border-border-dark max-w-2xl w-full relative">
            <button 
              disabled={isGenerating}
              onClick={() => setShowGenerator(false)}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <X size={24} />
            </button>

            {isGenerating ? (
              <div className="py-12 text-center space-y-8 animate-pulse">
                <div className="relative w-24 h-24 mx-auto">
                   <Film className="w-24 h-24 text-authority-blue animate-spin" />
                   <Sparkles className="absolute -top-2 -right-2 text-signal-gold animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-serif">{genMessage}</h3>
                  <p className="text-text-muted text-sm max-w-sm mx-auto">Generation and storage can take up to 3 minutes. Please stay on this page.</p>
                </div>
                <div className="w-full bg-slate-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                   <div className="bg-authority-blue h-full w-1/3 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-authority-blue/10 text-authority-blue rounded-2xl flex items-center justify-center">
                    <Video size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-serif leading-none">AI Video Generator</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1">Veo 3.1 Cinematic Engine</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Module Association</label>
                    <select 
                      value={formData.moduleId}
                      onChange={e => setFormData({...formData, moduleId: parseInt(e.target.value)})}
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light rounded-xl outline-none text-sm font-bold"
                    >
                      {COURSE_MODULES.map(m => (
                        <option key={m.id} value={m.id}>Module {m.id}: {m.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Visual Concept Prompt</label>
                    <textarea 
                      rows={4}
                      value={formData.prompt}
                      onChange={e => setFormData({...formData, prompt: e.target.value})}
                      placeholder="e.g. An owner-operator performing a detailed pre-trip inspection on a clean white box truck at sunset, high quality, professional photography style."
                      className="w-full px-5 py-3 bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl outline-none text-sm leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setFormData({...formData, aspectRatio: '16:9'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.aspectRatio === '16:9' ? 'border-authority-blue bg-authority-blue/5 text-authority-blue' : 'border-border-light opacity-50'}`}
                    >
                       <div className="w-8 h-4 bg-current opacity-20 rounded-sm"></div>
                       <span className="text-[10px] font-black uppercase">Landscape 16:9</span>
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, aspectRatio: '9:16'})}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${formData.aspectRatio === '9:16' ? 'border-authority-blue bg-authority-blue/5 text-authority-blue' : 'border-border-light opacity-50'}`}
                    >
                       <div className="w-4 h-8 bg-current opacity-20 rounded-sm"></div>
                       <span className="text-[10px] font-black uppercase">Portrait 9:16</span>
                    </button>
                  </div>

                  <button 
                    onClick={generateVideo}
                    className="w-full bg-authority-blue text-white py-5 rounded-2xl font-bold flex items-center justify-center group shadow-xl hover:bg-steel-blue transition-all"
                  >
                    <Sparkles className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
                    Generate Media Asset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default VideoLab;
