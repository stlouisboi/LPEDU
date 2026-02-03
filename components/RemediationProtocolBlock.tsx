import React from 'react';
import { Link } from 'react-router-dom';

const RemediationProtocolBlock: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm font-sans mb-12">
      {/* Header Bar */}
      <div className="bg-authority-blue px-8 py-4">
        <h2 className="text-signal-gold text-sm font-black uppercase tracking-[0.3em] leading-none">
          REMEDIATION & EXECUTION PROTOCOL
        </h2>
      </div>

      {/* Body Content */}
      <div className="p-8 md:p-12">
        <div className="flex flex-col space-y-2 mb-10 font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
          <p>Operating Status: Active Authority</p>
          <p>Current Phase: Implementation & Remediation</p>
        </div>

        <div className="max-w-3xl space-y-6 mb-12">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed">
            The REACH Test™ diagnostic sequence is complete and registry data has been finalized. 
            Formal remediation clearance is now granted to the authorized entity. 
            This transition authorizes the move from Exposure Vector identification to the systematic installation of LaunchPath compliance infrastructure and safety management systems.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-authority-blue dark:text-signal-gold border-b border-slate-100 dark:border-slate-800 pb-3">
            Scope of Authority
          </h3>
          <ul className="space-y-4">
            <li className="text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">Active Remediation:</span> Clearance to correct deficiencies identified during the Four Pillars Self-Assessment.
            </li>
            <li className="text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">Sequential Implementation:</span> Corrective actions must follow the 90-Day Implementation Calendar as defined by the Operating Standard.
            </li>
            <li className="text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">Standard Verification:</span> Each compliance element is verified against LaunchPath technical requirements at defined system checkpoints.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-signal-gold">
            90-Day Implementation Protocol: ACTIVE
          </p>
          
          <Link 
            to="/modules/1" 
            className="w-full sm:w-auto bg-authority-blue text-white px-10 py-5 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-800 transition-all text-center shadow-lg"
          >
            Proceed to Module 1: Business & Authority Setup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RemediationProtocolBlock;