import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * Uses the hosted image asset for consistent branding across environments.
 */
const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  const app = useApp();
  const siteName = app?.settings?.siteName || "LaunchPath";

  // Use the official hosted logo asset from the provided repo
  const logoSrc = "https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/logo.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt={`${siteName} Logo`} 
        className={`h-8 sm:h-12 w-auto object-contain transition-all duration-300 ${light ? 'brightness-0 invert' : ''}`}
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="font-black text-xl tracking-tighter ${light ? 'text-white' : 'text-authority-blue'}">LaunchPath™</span>`;
          }
        }}
      />
    </div>
  );
};

export default Logo;