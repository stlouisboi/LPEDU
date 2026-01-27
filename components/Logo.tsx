
import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * Sized relative to container to allow flexible header presentation.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-12", light = false }) => {
  const app = useApp();
  const siteName = app?.settings?.siteName || "LaunchPath";

  // Institutional Hosted Logo
  const logoSrc = "https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/logo.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt={`${siteName} Logo`} 
        className={`h-full w-auto object-contain transition-all duration-300 ${light ? 'brightness-0 invert' : ''}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="font-black text-xl sm:text-2xl tracking-tighter ${light ? 'text-white' : 'text-authority-blue'} uppercase">LaunchPath™</span>`;
          }
        }}
      />
    </div>
  );
};

export default Logo;
