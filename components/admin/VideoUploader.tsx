
import React from 'react';
import MediaUploader from './MediaUploader';
import { FileVideo, Film } from 'lucide-react';

interface VideoUploaderProps {
  onUploadComplete: (url: string, path: string) => void;
  label?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUploadComplete, label = "Upload Curriculum Video" }) => {
  return (
    <div className="space-y-4">
      <div className="p-8 bg-authority-blue/5 rounded-[2rem] border-2 border-dashed border-authority-blue/20 flex flex-col items-center justify-center text-center">
        <Film className="text-authority-blue mb-4 opacity-40" size={40} />
        <p className="text-xs font-bold text-authority-blue dark:text-steel-blue uppercase tracking-widest">Production Media Sync</p>
        <p className="text-[10px] text-text-muted mt-1 uppercase">Supports MP4, MOV, and WebM formats</p>
      </div>
      <MediaUploader 
        label={label}
        folder="curriculum_videos"
        accept="video/*"
        iconType="video"
        onUploadComplete={onUploadComplete}
      />
    </div>
  );
};

export default VideoUploader;
