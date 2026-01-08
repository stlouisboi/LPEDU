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
  Settings2,
  Upload,
  Layers,
  Zap,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
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
  
  // AI Reference Image state
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
    
    // Added error handling to stop uncaught permission-denied errors
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
      alert("Video uploaded but database record failed.");
    }
  };

  const handleRefImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRefFile(file);
      setRefPreview(URL.createObjectURL(file));
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

      let operation = await ai.models.generateVideos(config);

      while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
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
        alert(`AI Synthesis error: ${e.message || "Unknown error during cloud generation."}`);
      }
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
          <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Curriculum Video Lab</h1>
          <p className="text-text-muted mt-1">Manage cinematic visualizations and instructional media assets for the 8-module pathway.</p>
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
                       try { await deleteObject(ref(storage, vid.storagePath)); } catch(e) { console.warn("Storage cleanup skipped", e); }
                     }
                   }
                }}
                className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-red-600 active:scale-90 z-20"
              >
                <Trash2 size={18} />
              </button>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest pointer-events-none">
                {vid.storagePath?.includes('generated') ? 'Neural Synthesis' : 'Manual Archive'}
              </div>
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
          <div className="col-span-full py-32 bg-slate-50 dark:bg-gray-900/30 rounded-[3rem] border-4 border-dashed border-border-light dark:border-border-dark text-center">
            <div className="w-20 h-20 bg-slate-200 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center mx-auto mb-6 opacity-30">
               <Film size={40} />
            </div>
            <p className="text-text-muted font-bold uppercase tracking-widest">No curriculum assets found.</p>
            <button onClick={() => setShowModal(true)} className="mt-6 text-authority-blue font-black uppercase text-[10px] tracking-[0.2em] hover:underline underline-offset-4">Bake first visualization clip</button>
          </div>
        )}
      </div>

      {/* COMPREHENSIVE PRODUCTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[4rem] shadow-2xl max-w-5xl w-full relative border border-border-light dark:border-border-dark overflow-y-auto max-h-[95vh] custom-scrollbar">
              <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 p-3 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-all active:scale-90"><X /></button>
              
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-4xl font-black font-serif text-authority-blue dark:text-white flex items-center justify-center md:justify-start">
                  <Settings2 className="mr-4 text-signal-gold" size={36} />
                  Asset Production Studio
                </h2>
                <p className="text-text-muted mt-2 text-lg font-medium">Link production-grade visuals to specific learning modules.</p>
              </div>

              {/* MODE SELECTOR */}
              <div className="flex bg-slate-50 dark:bg-gray-900 p-2 rounded-[2.5rem] mb-12 max-w-md mx-auto md:mx-0 border border-border-light dark:border-border-dark">
                <button 
                  onClick={() => setProductionMode('ai')}
                  className={`flex-grow flex items-center justify-center space-x-3 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'ai' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted hover:text-authority-blue'}`}
                >
                  <Sparkles size={16} />
                  <span>Neural Synthesis</span>
                </button>
                <button 
                  onClick={() => setProductionMode('manual')}
                  className={`flex-grow flex items-center justify-center space-x-3 py-4 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${productionMode === 'manual' ? 'bg-authority-blue text-white shadow-xl' : 'text-text-muted hover:text-authority-blue'}`}
                >
                  <Upload size={16} />
                  <span>Manual Archive</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: General Info */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3 flex items-center">
                      <Layers size={14} className="mr-2 text-authority-blue" /> Target Curriculum Module
                    </label>
                    <select 
                      value={formData.moduleId}
                      onChange={(e) => setFormData({...formData, moduleId: parseInt(e.target.value)})}
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-3xl font-black text-sm outline-none focus:ring-4 focus:ring-authority-blue/10 focus:border-authority-blue transition-all"
                    >
                      {COURSE_MODULES.map(m => <option key={m.id} value={m.id}>Module {m.id}: {m.title}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3 flex items-center">
                      <Type size={14} className="mr-2 text-authority-blue" /> Production Title
                    </label>
                    <div className="relative">
                      <input 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. DOT Audit: The Safety Meeting Scene"
                        className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-3xl px-8 py-5 font-bold outline-none focus:ring-4 focus:ring-authority-blue/10 focus:border-authority-blue transition-all"
                      />
                    </div>
                  </div>

                  {productionMode === 'ai' && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3">Asset Frame Geometry</label>
                      <div className="flex gap-4">
                        {(['16:9', '9:16'] as const).map(ratio => (
                          <button 
                            key={ratio}
                            onClick={() => setFormData({...formData, aspectRatio: ratio})}
                            className={`flex-grow flex items-center justify-center p-5 rounded-3xl border-2 transition-all active:scale-95 ${formData.aspectRatio === ratio ? 'bg-authority-blue text-white border-authority-blue shadow-lg' : 'bg-white border-border-light text-text-muted'}`}
                          >
                            <Maximize2 size={16} className={ratio === '9:16' ? 'rotate-90 mr-2' : 'mr-2'} />
                            <span className="text-[10px] font-black">{ratio}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Mode-Specific Actions */}
                <div className="bg-slate-50 dark:bg-gray-900 rounded-[3rem] p-8 border-2 border-slate-100 dark:border-border-dark relative flex flex-col justify-center min-h-[400px]">
                  {productionMode === 'ai' ? (
                    <div className="space-y-6 animate-in fade-in duration-500">
                       {!hasApiKey ? (
                          <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 text-center space-y-4">
                             <ShieldAlert className="mx-auto text-amber-600" size={32} />
                             <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Enterprise authentication required for Veo Studio access.</p>
                             <button onClick={selectApiKey} className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg">Authorize Key</button>
                          </div>
                       ) : (
                         <>
                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-authority-blue flex items-center">
                              <Sparkles size={16} className="mr-2" /> Visual Directives
                            </label>
                            <textarea 
                              rows={4}
                              value={formData.prompt}
                              onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                              placeholder="Describe the cinematic scene: Cinematic 8k tracking shot of a truck fleet at sunrise..."
                              className="w-full bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-[2rem] p-6 text-sm font-bold focus:ring-4 focus:ring-authority-blue/10 transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-authority-blue flex items-center">
                              <ImageIcon size={16} className="mr-2" /> Reference Start Frame (Optional)
                            </label>
                            <div className="flex items-center space-x-4">
                               <div className="flex-grow relative group cursor-pointer">
                                  <input type="file" accept="image/*" onChange={handleRefImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                  <div className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-border-light rounded-3xl flex flex-col items-center justify-center text-center transition-all group-hover:border-authority-blue">
                                     {refPreview ? (
                                       <img src={refPreview} className="h-20 rounded-xl object-cover shadow-lg" alt="ref" />
                                     ) : (
                                       <>
                                         <Upload size={24} className="text-text-muted mb-2 opacity-30" />
                                         <span className="text-[10px] font-black text-text-muted uppercase">Bake From Base Image</span>
                                       </>
                                     )}
                                  </div>
                               </div>
                               {refPreview && (
                                 <button onClick={() => { setRefFile(null); setRefPreview(null); }} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all"><X size={20}/></button>
                               )}
                            </div>
                          </div>

                          <button 
                            onClick={generateAIVideo}
                            disabled={isGenerating || !formData.prompt}
                            className="w-full h-20 bg-authority-blue text-white rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl active:scale-95 transition-all hover:bg-steel-blue disabled:opacity-30"
                          >
                            {isGenerating ? (
                              <div className="flex flex-col items-center">
                                <div className="flex items-center space-x-3 mb-1">
                                  <Loader2 className="animate-spin" size={24} />
                                  <span>Neural Bake In Progress</span>
                                </div>
                                <span className="text-[8px] opacity-60 uppercase tracking-[0.4em]">{genMessage}</span>
                              </div>
                            ) : (
                              <><Sparkles className="mr-3" /><span>Synthesize Asset</span></>
                            )}
                          </button>
                         </>
                       )}
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in duration-500">
                       <div className="text-center mb-6">
                          <Film className="w-16 h-16 text-authority-blue mx-auto mb-4 opacity-40" />
                          <h4 className="text-xl font-black font-serif uppercase text-authority-blue">Archive Production Sync</h4>
                          <p className="text-xs text-text-muted font-medium mt-1">Upload and optimize local video files for curriculum streaming.</p>
                       </div>
                       
                       <VideoUploader 
                          label="Upload Optimized Master File"
                          onUploadComplete={handleManualUploadComplete}
                        />

                        <div className="p-6 bg-blue-50 dark:bg-authority-blue/10 rounded-3xl border border-blue-100 dark:border-authority-blue/20">
                           <div className="flex items-center space-x-3 mb-3">
                              <CheckCircle2 size={16} className="text-authority-blue" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Production Requirements</span>
                           </div>
                           <ul className="space-y-2 text-[10px] font-bold text-text-muted uppercase tracking-tight">
                              <li>• Max File Size: 100MB</li>
                              <li>• Recommended Bitrate: 4-6 Mbps</li>
                              <li>• Format: MP4 / HEVC / WebM</li>
                              <li>• Resolution: 720p or 1080p</li>
                           </ul>
                        </div>
                    </div>
                  )}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoLab;