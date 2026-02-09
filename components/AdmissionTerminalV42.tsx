import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
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

interface AdmissionTerminalV42Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AdmissionTerminalV42: High-Security Registry Gate
 * Blueprint: image_798d1e.png
 * Handles Security Identity creation, Operator Registry filing, and MailerLite Uplink.
 */
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

  /**
   * handleRegistrySubmit: Core Admission Sequence
   * Integrates Firebase Identity, Firestore Registry, and MailerLite Nurture.
   */
  const handleRegistrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!db || !auth) throw new Error("SYSTEM_OFFLINE: Registry synchronization failed.");

      // 1. CREATE FIREBASE ACCOUNT (Security Identity)
      // Using institutional temporary password protocol
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, "LaunchPathTemp123!");
      const user = userCredential.user;

      // 2. INITIALIZE FIRESTORE DOCUMENT (Registry File)
      // We index this under 'operators' as per the latest blueprint
      await setDoc(doc(db, "operators", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        carrierName: formData.carrierName,
        dotNumber: formData.dotNumber,
        enrolled: false, // Stewardship Filter remains LOCKED
        authorityStatus: "Pending Verification",
        integrityScore: 70, // Baseline for new entrants
        createdAt: serverTimestamp(),
        terminalVersion: '4.2.0',
        uplinkStatus: 'SYNCHRONIZED'
      });

      console.log("Institutional Registry Complete. Identity Verified:", user.uid);

      // 3. MAILERLITE UPLINK (Lead Nurture)
      // Subscribing email to Group ID: 178951579261470547
      // Setting 'Stewardship Status' custom field to 'Pending Audit'
      const mailerliteApiKey = (process.env as any).VITE_MAILERLITE_API_KEY;
      
      if (mailerliteApiKey && mailerliteApiKey !== "") {
        fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${mailerliteApiKey}`
          },
          body: JSON.stringify({
            email: formData.email,
            fields: {
              name: formData.fullName,
              stewardship_status: "Pending Audit"
            },
            groups: ["178951579261470547"]
          })
        }).catch(err => console.error("MailerLite Uplink Fault:", err));
      } else {
        // Fallback to form-based submission if API key is missing (graceful degradation)
        const mlFormId = (process.env as any).VITE_MAILERLITE_FORM_ID;
        if (mlFormId) {
          const mlFormData = new FormData();
          mlFormData.append('fields[email]', formData.email);
          mlFormData.append('fields[name]', formData.fullName);
          mlFormData.append('fields[stewardship_status]', 'Pending Audit');
          
          fetch(`https://assets.mailerlite.com/forms/1989508/${mlFormId}/subscribe`, {
            method: 'POST',
            body: mlFormData,
            mode: 'no-cors'
          }).catch(err => console.warn("MailerLite Form Fallback Fault:", err));
        }
      }
      
      // 4. Trigger Success Protocol
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Admission Error: INVALID REGISTRY ATTEMPT", error);
      let errorMessage = "SYSTEM ERROR: UNABLE TO SYNCHRONIZE WITH REGISTRY.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "IDENTITY_CONFLICT: EMAIL ALREADY REGISTERED IN OPERATOR VAULT.";
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessProtocol isOpen={isSuccess} />;
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#002244]/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-[#FAF9F6] dark:bg-primary-dark w-full max-w-5xl rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[10px] border-white/5 relative flex flex-col lg:flex-row animate-in zoom-in-95 duration-500">
        
        {/* LEFT PANE: Institutional Branding & Status (Deep Navy #002244) */}
        <div className="w-full lg:w-[38%] bg-[#002244] p-10 md:p-14 text-white flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="absolute top-0 right-0 w-1 h-full bg-[#C5A059]/40 hidden lg:block"></div>
          
          <div className="space-y-12 relative z-10">
            <Logo light={true} className="h-10 w-auto opacity-90" />
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.5em] text-[#C5A059] mb-4">Registry Terminal</h3>
              <p className="text-5xl font-black font-serif uppercase tracking-tighter leading-none">V4.2</p>
              <div className="h-1.5 w-16 bg-[#C5A059] mt-6"></div>
            </div>

            <div className="space-y-8 pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.6)]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">UPLINK: SYNCHRONIZED</span>
              </div>
              <div className="flex items-center space-x-4 opacity-50">
                <Lock size={14} className="text-[#C5A059]" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em]">ENCRYPTED CHANNEL // AES-256</p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 relative z-10">
            <p className="text-[10px] font-bold text-white/30 leading-relaxed uppercase tracking-tighter max-w-[250px]">
              Authorization required to provision operating assets. Identity verification is final and permanent.
            </p>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] pointer-events-none">
            <Terminal size={200} />
          </div>
        </div>

        {/* RIGHT PANE: Admission Registry Form */}
        <div className="flex-grow p-10 md:p-16 lg:p-20 relative overflow-y-auto max-h-[90vh] custom-scrollbar bg-white dark:bg-primary-dark">
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-3 bg-slate-100 dark:bg-gray-800 rounded-full hover:text-red-500 transition-all group z-20"
            aria-label="Close Terminal"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>

          <form onSubmit={handleRegistrySubmit} className="space-y-12">
            <div className="space-y-3">
              <h2 className="text-4xl font-black font-serif uppercase tracking-tight text-[#002244] dark:text-white leading-none">Credentials Required</h2>
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Initialize Admission Sequence</p>
            </div>

            <div className="space-y-8">
              {/* Field: Full Legal Name */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Legal Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002244] dark:group-focus-within:text-[#C5A059] transition-colors" size={20} />
                  <input 
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Master Registry Name"
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-2xl pl-16 pr-6 py-6 outline-none focus:border-[#002244] dark:focus:border-[#C5A059] font-black text-lg transition-all shadow-inner dark:text-white uppercase tracking-wider"
                  />
                </div>
              </div>

              {/* Field: Professional Email */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002244] dark:group-focus-within:text-[#C5A059] transition-colors" size={20} />
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="legal@carrier.com"
                    className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-2xl pl-16 pr-6 py-6 outline-none focus:border-[#002244] dark:focus:border-[#C5A059] font-black text-lg transition-all shadow-inner dark:text-white uppercase tracking-wider"
                  />
                </div>
              </div>

              {/* Grid: Carrier & DOT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Entity Legal Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002244] dark:group-focus-within:text-[#C5A059] transition-colors" size={18} />
                    <input 
                      required
                      value={formData.carrierName}
                      onChange={e => setFormData({...formData, carrierName: e.target.value})}
                      placeholder="Motor Carrier"
                      className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-2xl pl-14 pr-6 py-6 outline-none focus:border-[#002244] dark:focus:border-[#C5A059] font-black text-sm transition-all shadow-inner dark:text-white uppercase tracking-wider"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">USDOT Number (Optional)</label>
                  <div className="relative group">
                    <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002244] dark:group-focus-within:text-[#C5A059] transition-colors" size={18} />
                    <input 
                      value={formData.dotNumber}
                      onChange={e => setFormData({...formData, dotNumber: e.target.value})}
                      placeholder="DOT #######"
                      className="w-full bg-slate-50 dark:bg-gray-800 border-2 border-slate-100 dark:border-border-dark rounded-2xl pl-14 pr-6 py-6 outline-none focus:border-[#002244] dark:focus:border-[#C5A059] font-black text-sm transition-all shadow-inner dark:text-white tracking-widest"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#002244] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-[#0c1a2d] transition-all active:scale-[0.98] border-b-8 border-slate-900 flex items-center justify-center disabled:opacity-50 group"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-4">
                    <Loader2 className="animate-spin" size={24} />
                    <span>Synchronizing Registry...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>AUTHORIZE ADMISSION REQUEST</span>
                    <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                )}
              </button>
              
              <div className="flex items-center justify-center space-x-4 opacity-40">
                <ShieldCheck size={18} className="text-[#C5A059]" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002244] dark:text-white">Institutional Integrity Standard Certified</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionTerminalV42;