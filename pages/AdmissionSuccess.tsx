import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, LogIn, Shield, Activity } from 'lucide-react';

const AdmissionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white/5 border border-emerald-500/30 rounded-[4rem] overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-8 px-12 text-center">
            <CheckCircle size={80} className="text-emerald-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-emerald-500 mb-4">
              ✓ ADMISSION COMPLETE
            </h1>
            <p className="text-xl text-slate-200">
              Your access to the Operating Standard is now active.
            </p>
          </div>

          {/* Body */}
          <div className="p-12 space-y-8">
            
            {/* Confirmation Details */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide text-slate-300">
                    Payment Processed
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    $2,500 implementation investment confirmed
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide text-slate-300">
                    Account Activated
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Full operator portal access granted
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide text-slate-300">
                    Confirmation Email Sent
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Check your inbox for access credentials and next steps
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-signal-gold/10 border border-signal-gold/30 rounded-2xl p-6">
              <h3 className="text-lg font-black uppercase tracking-tight text-signal-gold mb-4">
                What's Next
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="text-signal-gold font-black">1.</span>
                  <span>Access your Operator Portal to begin Module 1</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-signal-gold font-black">2.</span>
                  <span>Complete modules sequentially (Module 1 → Module 6)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-signal-gold font-black">3.</span>
                  <span>Use the TCO Calculator to track your financial metrics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-signal-gold font-black">4.</span>
                  <span>Download compliance templates from the DQ File Factory</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/operator-portal')}
              className="w-full bg-signal-gold text-[#002244] py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_40px_80px_rgba(218,165,32,0.4)] hover:bg-[#D4B06A] transition-all active:scale-95 border-b-[12px] border-[#9D7A3E] flex items-center justify-center space-x-4 group"
            >
              <LogIn size={24} />
              <span>ACCESS YOUR SYSTEM</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-3 opacity-40 pt-6">
              <Shield size={16} className="text-signal-gold" />
              <p className="text-xs font-black uppercase tracking-[0.3em]">
                INSTITUTIONAL INTEGRITY ACTIVE
              </p>
              <Activity size={16} className="text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Support Note */}
        <p className="text-center text-xs text-slate-400 mt-8 uppercase tracking-wider">
          Questions? Contact <span className="text-signal-gold font-bold">support@launchpathedu.com</span>
        </p>
      </div>
    </div>
  );
};

export default AdmissionSuccess;
