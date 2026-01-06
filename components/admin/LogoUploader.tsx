
import React from 'react';
import MediaUploader from './MediaUploader';
import { Palette, ImageIcon } from 'lucide-react';

interface LogoUploaderProps {
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  label?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ currentUrl, onUploadComplete, label = "Upload Brand Logo" }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-slate-50 dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-border-light dark:border-border-dark flex items-center justify-center relative overflow-hidden group">
        {currentUrl ? (
          <img src={currentUrl} className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform" alt="Logo Preview" />
        ) : (
          <div className="text-center opacity-30">
            <ImageIcon size={48} className="mx-auto mb-2" />
            <p className="text-[10px] font-black uppercase tracking-widest">No Visual Assigned</p>
          </div>
        )}
      </div>
      <MediaUploader 
        label={label}
        folder="brand"
        accept="image/*"
        iconType="image"
        onUploadComplete={(url) => onUploadComplete(url)}
      />
    </div>
  );
};

export default LogoUploader;
