
import React from 'react';
import { useApp } from '../App';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Professional Logo Component
 * Renders the brand logo from site settings with theme-aware fallback.
 */
const Logo: React.FC<LogoProps> = ({ className = "h-12", light }) => {
  const { settings, theme } = useApp();
  const siteName = settings?.siteName || "LaunchPath";

  // Institutional Brand Assets (Latest Tokens)
  const BLUE_LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fblue_logo.png?alt=media&token=57100c1c-e867-4f10-9d2a-30e9d641b8cf";
  const WHITE_LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2";

  // Determine which master asset to use based on theme or context (e.g., dark footer)
  const isDarkContext = theme === 'dark' || light === true;
  const defaultAsset = isDarkContext ? WHITE_LOGO_URL : BLUE_LOGO_URL;
  
  // If the database setting is either empty or matches our old/current default blue, 
  // we allow the dynamic theme logic to take over.
  const hasCustomLogo = settings?.logoUrl && 
                        settings.logoUrl !== BLUE_LOGO_URL && 
                        !settings.logoUrl.includes('blue_logo.png');

  const logoSrc = hasCustomLogo ? settings.logoUrl : defaultAsset;

  return (
    <img 
      src={logoSrc} 
      alt={siteName} 
      className={`${className} transition-opacity duration-300`} 
      onError={(e) => {
        // Fallback in case of individual asset failure
        (e.target as HTMLImageElement).src = BLUE_LOGO_URL;
      }}
    />
  );
};

export default Logo;
