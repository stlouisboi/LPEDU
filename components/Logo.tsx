import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * Now utilizes the local logo.png asset for improved performance and brand control.
 */
const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  const app = useApp();
  const siteName = app?.settings?.siteName || "LaunchPath";

  // Using the local logo file as requested
  const logoSrc = "/logo.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt={`${siteName} Logo`} 
        className={`h-12 sm:h-16 w-auto object-contain transition-all duration-300 ${light ? 'brightness-0 invert' : ''}`}
        onError={(e) => {
          // Fallback to stylized text if logo file is missing or fails to load
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="font-black text-2xl tracking-tighter ${light ? 'text-white' : 'text-authority-blue'}">LaunchPath™</span>`;
          }
        }}
      />
    </div>
  );
};

export default Logo;