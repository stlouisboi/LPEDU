import React from 'react';
import { Link } from 'react-router-dom';

const RemediationProtocol: React.FC = () => {
  return (
    <div className="w-full bg-authority-blue border border-white/10 overflow-hidden shadow-2xl">
      {/* Header Metadata Section */}
      <div className="bg-[#0c1a2d] px-8 py-6 border-b border-signal-gold/30">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-gold/60 space-y-1">
          <p>– Classification: Authorized Personnel</p>
          <p>– Current Phase: Implementation & Remediation</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 md:p-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black font-serif text-signal-gold uppercase tracking-tight leading-none">
            REMEDIATION & EXECUTION PROTOCOL
          </h2>
          <div className="h-px w-full bg-signal-gold/20"></div>
        </div>

        <div className="space-y-6 text-slate-300 font-medium leading-relaxed max-w-3xl">
          <p>
            The AUTO Diagnostic™ Diagnostic has been successfully completed and logged. This transition marks the formal authorization to move from exposure identification to the systematic installation of Institutional Guards. 
          </p>
          <p>
            You are now operating within an Authorized Repair Zone. All prior diagnostic data has been transferred into the remediation framework for immediate corrective action.
          </p>
        </div>

        {/* Scope of Authority */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-signal-gold">Scope of Authority</h3>
          <ul className="space-y-4 text-sm text-slate-400 font-mono">
            <li className="flex items-start">
              <span className="mr-4 text-signal-gold">01</span>
              <span>Active Remediation: Clearance to correct deficiencies identified in the Four Pillars Self-Assessment.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 text-signal-gold">02</span>
              <span>Sequential Implementation: All actions must follow the 90-Day Implementation Calendar as defined by the Standard.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 text-signal-gold">03</span>
              <span>Standard Verification: Each installed guard (DQ files, Drug & Alcohol programs, Insurance filings, etc.) is verified against the LaunchPath Operating Standard at defined checkpoints.</span>
            </li>
          </ul>
        </div>

        {/* Operating Status Declaration */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Operating Status</p>
              <p className="text-sm font-bold text-white uppercase tracking-widest">Enrollment Shield Active</p>
            </div>
            
            <Link 
              to="/modules/1" 
              className="bg-signal-gold text-authority-blue px-10 py-5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all text-center"
            >
              Proceed to Module 1: Business & Authority Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemediationProtocol;