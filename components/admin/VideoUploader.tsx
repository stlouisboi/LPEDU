import React from 'react';
import MediaUploader from './MediaUploader';
import { FileVideo, Film, CheckCircle2, Layout, Zap, Monitor } from 'lucide-react';

interface VideoUploaderProps {
  onUploadComplete: (url: string, path: string) => void;
  label?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadComplete, label = "Upload Curriculum Video" }) => {
  return (
    <div className="space-y-6">
      <div className="p-8 bg-authority-blue/[0.03] dark:bg-authority-blue/5 rounded-[2.5rem] border-2 border-dashed border-authority-blue/10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
        <Film className="text-authority-blue mb-4 opacity-40 group-hover:scale-110 transition-transform duration-500" size={48} />
        <p className="text-sm font-black text-authority-blue dark:text-steel-blue uppercase tracking-widest">Master Video Gateway</p>
        <p className="text-[10px] text-text-muted mt-2 uppercase font-bold max-w-[250px] leading-relaxed">
           H.264 / HEVC Master Assets for <br/>8-Module Curriculum Streaming
        </p>
        
        <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
           <Monitor size={120} />
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
         <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-800 p-3 rounded-xl border border-slate-100 dark:border-border-dark">
            <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-md">
              <CheckCircle2 size={12} className="text-green-600" />
            </div>
            <span className="text-[9px] font-black uppercase text-text-muted tracking-tight">1080p Max Target</span>
         </div>
         <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-800 p-3 rounded-xl border border-slate-100 dark:border-border-dark">
            <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-md">
              <Zap size={12} className="text-blue-600" />
            </div>
            <span className="text-[9px] font-black uppercase text-text-muted tracking-tight">Fast-Start Stream</span>
         </div>
      </div>
    </div>
  );
};

export default VideoUploader;