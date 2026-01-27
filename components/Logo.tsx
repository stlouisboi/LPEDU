import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * Sized relative to container to allow flexible header presentation.
 * Automatically handles theme-switching for dark mode visibility.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-12", light }) => {
  const { settings, theme } = useApp();
  const siteName = settings?.siteName || "LaunchPath";

  // Institutional Hosted Logo
  const logoSrc = "https://raw.githubusercontent.com/stlouisboi/assets-launchpath/main/logo.png";

  // If 'light' prop is explicitly passed, use it. Otherwise, use 'light' mode if theme is dark.
  const isLightVersion = light !== undefined ? light : theme === 'dark';

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoSrc} 
        alt={`${siteName} Logo`} 
        className={`h-full w-auto object-contain transition-all duration-300 ${isLightVersion ? 'brightness-0 invert' : ''}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="font-black text-xl sm:text-2xl tracking-tighter ${isLightVersion ? 'text-white' : 'text-authority-blue'} uppercase">LaunchPath™</span>`;
          }
        }}
      />
    </div>
  );
};

export default Logo;