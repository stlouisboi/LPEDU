import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * LaunchPath™ Text-Based Logo
 * Professional, clean, and code-based.
 * Uses navy blue (#1e3a5f) which is 'authority-blue' in tailwind.config.
 */
const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  const textColor = light ? 'text-white' : 'text-authority-blue';
  const boxBg = light ? 'bg-white' : 'bg-authority-blue';
  const boxText = light ? 'text-authority-blue' : 'text-white';

  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      {/* Icon Box */}
      <div className={`w-9 h-9 sm:w-10 sm:h-10 ${boxBg} rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105 duration-300`}>
        <span className={`${boxText} font-bold text-lg sm:text-xl`}>L</span>
      </div>
      
      {/* Brand Typography */}
      <span className={`${textColor} font-bold text-lg sm:text-xl tracking-tight whitespace-nowrap`}>
        LaunchPath<sup className="text-[10px] sm:text-xs ml-0.5 opacity-80">™</sup>
      </span>
    </div>
  );
};

export default Logo;