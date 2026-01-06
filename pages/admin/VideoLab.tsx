
import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from '../../firebase';
import { 
  Video, 
  Plus, 
  Trash2, 
  Loader2, 
  Download, 
  ShieldAlert, 
  Sparkles, 
  X, 
  Edit, 
  Save, 
  Film
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
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editModuleId, setEditModuleId] = useState<number>(0);
  
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
    "Calibrating authority registration animations..."
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
      const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setVideos(sorted);
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let initialOp = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Professional instructional video for a trucking business: ${formData.prompt}.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: formData.aspectRatio
        }
      });

      let operation = {
        name: initialOp.name,
        done: initialOp.done,
        response: initialOp.response,
        error: initialOp.error
      } as any;

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const opResult = await ai.operations.getVideosOperation({ 
          operation: { name: operation.name } as any 
        });
        operation = {
          name: opResult.name,
          done: opResult.done,
          response: opResult.response,
          error: opResult.error
        } as any;
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed to return a link.");

      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error("Failed to download video.");
      const blob = await response.blob();

      const videoId = `video_${Date.now()}`;
      const storagePath = `curriculum_videos/${videoId}.mp4`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, blob);
      const persistentUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "generatedVideos"), {
        prompt: formData.prompt,
        url: persistentUrl,
        storagePath: storagePath,
        aspectRatio: formData.aspectRatio,
        moduleId: formData.moduleId,
        createdAt: new Date().toISOString()
      });

      setShowGenerator(false);
      setFormData({ prompt: '', aspectRatio: '16:9', moduleId: 0 });
    } catch (err: any) {
      console.error("Video Gen Error:", err);
      alert("Failed to generate video.");
    } finally {
      clearInterval(messageInterval);
      setIsGenerating(false);
    }
  };

  const handleUpdateModule = async (vidId: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "generatedVideos", vidId), {
        moduleId: editModuleId
      });
      setEditingVideoId(null);
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handleDelete = async (vid: GeneratedVideo) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      if (storage && vid.storagePath) {
        const fileRef = ref(storage, vid.storagePath);
        await deleteObject(fileRef).catch(e => console.warn("Storage delete failed", e));
      }
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
          <p className="text-text-muted mt-1">Generate cinematic clips using Veo 3.1.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light overflow-hidden flex flex-col">
            <div className={`relative ${vid.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
              <video src={vid.url} className="w-full h-full object-cover" controls />
              <button 
                onClick={() => handleDelete(vid)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLab;
