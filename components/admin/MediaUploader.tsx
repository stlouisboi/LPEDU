import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import { Upload, X, CheckCircle, Loader2, FileVideo, ImageIcon, FileCheck, Info } from 'lucide-react';

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
  const [uploadedAsset, setUploadedAsset] = useState<{url: string, path: string} | null>(null);

  const handleUpload = (file: File) => {
    if (!storage) return;
    
    setUploadedAsset(null);
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
        alert("Upload failed. Verify Storage permissions or file size limits.");
        setProgress(null);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUploadedAsset({ url, path });
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
      className={`relative border-2 border-dashed rounded-[2rem] p-8 text-center transition-all duration-300 ${
        uploadedAsset ? 'border-green-200 bg-green-50/10' :
        isDragging ? 'border-authority-blue bg-authority-blue/5 scale-[0.98]' : 
        'border-border-light hover:border-authority-blue bg-white dark:bg-transparent'
      }`}
    >
      {progress !== null ? (
        <div className="space-y-6 py-6 animate-pulse">
          <div className="relative w-20 h-20 bg-authority-blue/5 rounded-full flex items-center justify-center mx-auto">
             <Loader2 className="text-authority-blue animate-spin" size={32} />
          </div>
          <div className="space-y-3">
            <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner max-w-xs mx-auto">
              <div className="bg-authority-blue h-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue">Streaming to Secure CDN: {Math.round(progress)}%</p>
          </div>
        </div>
      ) : uploadedAsset ? (
        <div className="space-y-4 py-4 animate-in zoom-in-95 duration-500">
           <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
              <FileCheck size={32} />
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-1">Asset Staged Successfully</p>
              <div className="flex items-center justify-center space-x-2 text-[9px] text-text-muted font-mono uppercase">
                 <span className="truncate max-w-[120px]">{uploadedAsset.path.split('/').pop()}</span>
                 <span>•</span>
                 <CheckCircle size={10} className="text-green-500" />
              </div>
           </div>
           <button 
             onClick={() => setUploadedAsset(null)}
             className="text-[9px] font-black uppercase tracking-widest text-authority-blue hover:underline"
           >
             Replace Master File
           </button>
        </div>
      ) : (
        <label className="cursor-pointer block group">
          <input 
            type="file" 
            accept={accept} 
            className="hidden" 
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 dark:bg-gray-900/50 rounded-[1.5rem] flex items-center justify-center mb-6 border-2 border-transparent group-hover:border-authority-blue/20 transition-all group-hover:scale-110">
              {iconType === 'image' ? <ImageIcon className="text-text-muted opacity-30 group-hover:text-authority-blue" size={32} /> : <FileVideo className="text-text-muted opacity-30 group-hover:text-authority-blue" size={32} />}
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-authority-blue mb-2">{label}</span>
            <div className="flex items-center text-[9px] text-text-muted uppercase font-bold bg-slate-50 dark:bg-gray-900/50 px-4 py-1.5 rounded-full border border-slate-100 dark:border-border-dark">
               <Info size={10} className="mr-1.5 opacity-50" />
               Drag & Drop or Primary Uplink
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default MediaUploader;