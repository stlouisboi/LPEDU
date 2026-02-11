
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../firebase';
import { 
  X, 
  Loader2, 
  ShieldCheck, 
  Activity, 
  User, 
  Mail, 
  Building2, 
  Terminal, 
  ChevronRight,
  Lock
} from 'lucide-react';
import Logo from './Logo';
import SuccessProtocol from './SuccessProtocol';
import { createUserProfile } from '../utils/userRoles';

interface AdmissionTerminalV42Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionTerminalV42: React.FC<AdmissionTerminalV42Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    carrierName: '',
    dotNumber: ''
  });

  if (!isOpen) return null;

  const handleRegistrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!db || !auth) throw new Error("SYSTEM_OFFLINE");

      // Use a secure temporary pattern for first-time registry
      const tempPass = `LP!${Math.random().toString(36).slice(-8)}`;
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, tempPass);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.fullName });
      
      // Initialize profile in centralized 'users' collection
      await createUserProfile(user.uid, formData.email, formData.fullName, 'free');
      
      // Log specific carrier meta-data
      await setDoc(doc(db, "operators", user.uid), {
        carrierName: formData.carrierName,
        dotNumber: formData.dotNumber,
        terminalVersion: '4.2.0',
        createdAt: serverTimestamp()
      });

      setIsSuccess(true);
    } catch (error: any) {
      console.error(error);
      alert(error.code === 'auth/email-already-in-use' 
        ? "IDENTITY CONFLICT: THIS EMAIL IS ALREADY ENROLLED." 
        : "ADMISSION ERROR: UNABLE TO SYNCHRONIZE REGISTRY.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessProtocol isOpen={isSuccess} />;
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 sm:p-4 bg-[#002244]/98 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto">
      <div className="bg-[#FAF9F6] dark:bg-primary-dark w-full max-w-5xl sm:rounded-[4rem] overflow-hidden shadow-2xl border-0 sm:border-[10px] border-white/5 relative flex flex-col lg:flex-row min-h-screen sm:min-h-0">
        
        <div className="w-full lg:w-[38%] bg-[#002244] p-8 sm:p-14 text-white flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
          <div className="space-y-8 sm:space-y-12 relative z-10">
            <div className="flex justify-between items-center lg:block lg:space-y-12">
              <Logo light={true} className="h-8 sm:h-10 w-auto" />
              <button onClick={onClose} className="lg:hidden p-2 bg-white/5 rounded-lg text-white/40"><X size={24} /></button>
            </div>
            
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-[#C5A059]">Registry Terminal</h3>
              <p className="text-4xl sm:text-5xl font-black font-serif uppercase tracking-tighter">V4.2</p>
              <div className="h-1 w-12 bg-[#C5A059] mt-4 sm:mt-6"></div>
            </div>

            <div className="flex items-center space-x-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span>LINK_SYNCHRONIZED</span>
            </div>
          </div>
          
          <div className="hidden lg:block absolute bottom-0 left-0 p-8 opacity-[0.03] pointer-events-none">
            <Terminal size={180} />
          </div>
        </div>

        <div className="flex-grow p-8 sm:p-16 lg:p-20 relative bg-white dark:bg-primary-dark">
          <button 
            onClick={onClose}
            className="hidden lg:flex absolute top-10 right-10 p-3 bg-slate-100 dark:bg-gray-800 rounded-full hover:text-red-500 transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>

          <form onSubmit={handleRegistrySubmit} className="space-y-8 sm:space-y-12">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white leading-none">Admission Sequence</h2>
              <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Master Identity Profile</p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Master Registry Name" className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl sm:rounded-2xl pl-14 pr-6 py-5 outline-none font-black text-base sm:text-lg dark:text-white uppercase" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="legal@carrier.com" className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl sm:rounded-2xl pl-14 pr-6 py-5 outline-none font-black text-base sm:text-lg dark:text-white uppercase" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Motor Carrier Name</label>
                  <input required value={formData.carrierName} onChange={e => setFormData({...formData, carrierName: e.target.value})} placeholder="Carrier Entity" className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl sm:rounded-2xl px-6 py-5 outline-none font-black text-sm dark:text-white uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">DOT Number (Optional)</label>
                  <input value={formData.dotNumber} onChange={e => setFormData({...formData, dotNumber: e.target.value})} placeholder="DOT #######" className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-xl sm:rounded-2xl px-6 py-5 outline-none font-black text-sm dark:text-white" />
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-8">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#002244] text-white py-6 sm:py-8 rounded-2xl sm:rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs shadow-2xl hover:bg-[#0c1a2d] transition-all active:scale-[0.98] border-b-4 sm:border-b-8 border-slate-950 flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin mr-3" size={24} />
                    <span className="font-black">PROCESSING...</span>
                  </div>
                ) : (
                  <span className="flex items-center font-black">AUTHORIZE REGISTRY UPLINK <ChevronRight className="ml-2" size={18} /></span>
                )}
              </button>
              <div className="flex items-center justify-center space-x-3 opacity-40 mt-8">
                <ShieldCheck size={16} className="text-[#C5A059]" />
                <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#002244] dark:text-white">Security Standard Certified</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionTerminalV42;
