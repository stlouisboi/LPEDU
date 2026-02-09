import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  Activity, 
  Terminal as TerminalIcon,
  CheckCircle2,
  Lock
} from 'lucide-react';
import Logo from './Logo';

interface SuccessProtocolProps {
  isOpen: boolean;
}

/**
 * SuccessProtocol: The Institutional Confirmation Gate
 * Visual Architecture for Registry Uplink verification.
 */
const SuccessProtocol: React.FC<SuccessProtocolProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleExit = () => {
    navigate('/enrollment-pending');
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-[#002244]/95 backdrop-blur-2xl animate-in fade-in duration-500 overflow-hidden">
      {/* Structural Background Accents */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>

      <div className="bg-[#FAF9F6] dark:bg-primary-dark w-full max-w-2xl rounded-[4rem] border-[6px] border-[#C5A059] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] relative animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-[#002244] py-8 px-12 flex flex-col items-center border-b-2 border-[#C5A059]/20">
          <Logo light={true} className="h-10 w-auto mb-6" />
          <div className="flex items-center space-x-3">
             <Activity size={16} className="text-[#C5A059] animate-pulse" />
             <h2 className="text-xl font-black text-white uppercase tracking-[0.3em]">REGISTRY UPLINK SUCCESSFUL</h2>
          </div>
        </div>

        <div className="p-12 md:p-16 text-center space-y-10">
          {/* Status Message */}
          <div className="space-y-6">
            <p className="text-lg font-bold text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-tight">
              Your credentials have been authorized and your professional profile is now secured in our registry.
            </p>

            {/* System Readout Box */}
            <div className="bg-slate-100 dark:bg-black/40 border-l-8 border-[#C5A059] p-6 rounded-2xl inline-block w-full">
              <div className="flex items-center justify-center space-x-4">
                <TerminalIcon size={18} className="text-[#002244] dark:text-[#C5A059]" />
                <p className="font-mono text-sm md:text-base font-black text-[#002244] dark:text-[#C5A059] uppercase tracking-widest">
                  STEWARDSHIP STATUS: PENDING AUDIT
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Instruction */}
          <div className="space-y-8 text-left">
            <div className="flex items-start space-x-4 group">
               <div className="mt-1 p-2 bg-authority-blue/5 dark:bg-white/5 rounded-xl border border-authority-blue/10 dark:border-white/10">
                  <CheckCircle2 size={18} className="text-[#C5A059]" />
               </div>
               <p className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-tighter">
                  An Admission Protocol packet has been dispatched to your email.
               </p>
            </div>
            
            <div className="flex items-start space-x-4 group">
               <div className="mt-1 p-2 bg-red-500/5 rounded-xl border border-red-500/10">
                  <Lock size={18} className="text-red-500" />
               </div>
               <p className="text-sm font-bold text-red-600/80 dark:text-red-400 leading-relaxed uppercase tracking-tighter">
                  Your terminal access will remain restricted until the $2,500 implementation investment is finalized.
               </p>
            </div>
          </div>

          {/* Action Terminal */}
          <div className="pt-6 space-y-8">
            <button 
              onClick={handleExit}
              className="w-full bg-[#002244] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-[#0c1a2d] transition-all active:scale-[0.98] border-b-8 border-slate-900 flex items-center justify-center group"
            >
              EXIT TO PENDING TERMINAL <LogOut className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            
            <div className="flex items-center justify-center space-x-3 opacity-30">
               <ShieldCheck size={16} className="text-authority-blue dark:text-white" />
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002244] dark:text-white">INTEGRITY STANDARD CERTIFIED // SYSTEM SECURE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessProtocol;