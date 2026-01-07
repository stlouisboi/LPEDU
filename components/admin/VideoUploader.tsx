
import React from 'react';
import MediaUploader from './MediaUploader';
import { FileVideo, Film, CheckCircle2 } from 'lucide-react';

interface VideoUploaderProps {
  onUploadComplete: (url: string, path: string) => void;
  label?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadComplete, label = "Upload Curriculum Video" }) => {
  return (
    <div className="space-y-6">
      <div className="p-8 bg-authority-blue/5 rounded-[2.5rem] border-2 border-dashed border-authority-blue/20 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden group">
        <Film className="text-authority-blue mb-4 opacity-40 group-hover:scale-110 transition-transform" size={48} />
        <p className="text-sm font-black text-authority-blue dark:text-steel-blue uppercase tracking-widest">Production Media Gateway</p>
        <p className="text-[10px] text-text-muted mt-2 uppercase font-bold max-w-[200px]">Optimized for streaming in H.264 / HEVC / WebM</p>
        
        <div className="absolute top-4 right-4 opacity-10">
           <FileVideo size={64} />
        </div>
      </div>
      
      <MediaUploader 
        label={label}
        folder="curriculum_videos"
        accept="video/*"
        iconType="video"
        onUploadComplete={onUploadComplete}
      />
      
      <div className="grid grid-cols-2 gap-3">
         <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <CheckCircle2 size={12} className="text-green-500" />
            <span className="text-[9px] font-black uppercase text-text-muted">720p/1080p Target</span>
         </div>
         <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <CheckCircle2 size={12} className="text-green-500" />
            <span className="text-[9px] font-black uppercase text-text-muted">Fast Start Web-M</span>
         </div>
      </div>
    </div>
  );
};

export default VideoUploader;
