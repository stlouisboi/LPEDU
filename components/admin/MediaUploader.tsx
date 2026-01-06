
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import { Upload, X, CheckCircle, Loader2, FileVideo, ImageIcon } from 'lucide-react';

interface MediaUploaderProps {
  onUploadComplete: (url: string, path: string) => void;
  folder: string;
  accept: string;
  label: string;
  iconType: 'image' | 'video';
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onUploadComplete, folder, accept, label, iconType }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (file: File) => {
    if (!storage) return;
    
    const path = `${folder}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error("Upload failed", error);
        alert("Upload failed. Verify Storage permissions.");
        setProgress(null);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        onUploadComplete(url, path);
        setProgress(null);
      }
    );
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
      }}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
        isDragging ? 'border-authority-blue bg-authority-blue/5' : 'border-border-light hover:border-authority-blue'
      }`}
    >
      {progress !== null ? (
        <div className="space-y-4 py-4">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
            <div className="bg-authority-blue h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue">Streaming to Cloud: {Math.round(progress)}%</p>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <input 
            type="file" 
            accept={accept} 
            className="hidden" 
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
          <div className="flex flex-col items-center">
            {iconType === 'image' ? <ImageIcon className="text-text-muted opacity-30 mb-4" size={32} /> : <FileVideo className="text-text-muted opacity-30 mb-4" size={32} />}
            <span className="text-[11px] font-black uppercase tracking-widest text-authority-blue mb-1">{label}</span>
            <span className="text-[9px] text-text-muted uppercase">Drag & Drop or Click to Browse</span>
          </div>
        </label>
      )}
    </div>
  );
};

export default MediaUploader;
