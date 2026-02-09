import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Activity,
  LogOut
} from 'lucide-react';
import Logo from './Logo';

interface SuccessProtocolModalProps {
  isOpen: boolean;
}

/**
 * SuccessProtocolModal: The Institutional Confirmation Terminal
 * Finalizes the admission sequence with clear fiscal boundaries and restricted access alerts.
 */
const SuccessProtocolModal: React.FC<SuccessProtocolModalProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleExitTerminal = () => {
    navigate('/enrollment-pending');
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[#002244] animate-in fade-in duration-500">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>

      <div className="bg-[#FAF9F6] dark:bg-primary-dark w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[12px] border-white/5 relative animate-in zoom-in-95 duration-500">
        
        {/* Header Ribbon */}
        <div className="bg-[#002244] py-6 px-10 border-b-4 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <Activity size={14} className="text-[#C5A059] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Status: Uplink Verified</span>
          </div>
          <Logo light={true} className="h-6 w-auto opacity-50" />
        </div>

        <div className="p-12 md:p-16 text-center space-y-10">
          {/* Central Iconography */}
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.3)] relative z-10 border-4 border-white dark:border-primary-dark">
              <CheckCircle size={48} />
            </div>
            <div className="absolute -inset-4 bg-green-500/10 rounded-[3rem] animate-ping opacity-20"></div>
          </div>

          {/* Success Messaging */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black font-serif text-[#002244] dark:text-white uppercase tracking-tighter leading-none">
              REGISTRY UPLINK <br/><span className="text-[#C5A059] italic">SUCCESSFUL.</span>
            </h2>
            <div className="h-1 w-20 bg-[#C5A059]/20 mx-auto"></div>
            <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto uppercase tracking-tight">
              Your credentials have been submitted to the LaunchPath Registry. Your account is currently in a <span className="text-authority-blue dark:text-white underline decoration-[#C5A059] underline-offset-4 font-black">Pending Audit</span> state as we verify your Stewardship Alignment.
            </p>
          </div>

          {/* Restricted Access Box */}
          <div className="bg-[#002244]/5 dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center justify-center space-x-3 text-red-600 dark:text-red-400">
               <Lock size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Access Alert</span>
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-tighter">
              Access to the Operating Standard infrastructure is restricted until the one-time <span className="text-[#002244] dark:text-white font-black">$2,500 Implementation Investment</span> is finalized and confirmed by the treasury.
            </p>
          </div>

          {/* Primary Action */}
          <div className="space-y-8">
            <button 
              onClick={handleExitTerminal}
              className="w-full bg-[#002244] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-[#0c1a2d] transition-all active:scale-[0.98] border-b-8 border-slate-900 flex items-center justify-center group"
            >
              EXIT TERMINAL <LogOut className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold font-black uppercase tracking-[0.2em] text-[10px]">
                <Mail size={14} />
                <span>Next Procedure</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-relaxed">
                Check your email for the Admission Protocol packet <br/>and USDOT verification steps.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="bg-slate-50 dark:bg-black/30 py-6 px-10 text-center border-t border-slate-100 dark:border-white/5">
           <div className="flex items-center justify-center space-x-4 opacity-30 grayscale">
              <ShieldCheck size={16} />
              <p className="text-[9px] font-black uppercase tracking-[0.5em]">Integrity Standard Certified // LP-SYS-V4.2</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessProtocolModal;