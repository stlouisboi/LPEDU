import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Globe,
  ClipboardList,
  Calendar,
  Search,
  Activity,
  Shield
} from 'lucide-react';

const ResourcesPage = () => {
  return (
    <div className="bg-[#fafaf9] min-h-screen font-sans text-slate-800">
      
      <section className="bg-white border-b border-slate-200 pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-authority-blue tracking-tight mb-6 uppercase">System Assets</h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Orientation tools and technical references. Implementation systems are taught inside the LaunchPath standard.
          </p>
          <div className="flex justify-center">
            <Link to="/pricing" className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-steel-blue transition-all shadow-lg active:scale-95">
              Enter the System
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 uppercase">
          <h2 className="text-3xl font-black text-authority-blue tracking-tight mb-4">Quick Reference</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Pre-Authority Checklist", phase: "Orientation", icon: <ClipboardList /> },
            { title: "DQ File Standards", phase: "Compliance", icon: <FileText /> },
            { title: "Annual Filing Calendar", phase: "Maintenance", icon: <Calendar /> },
            { title: "Inspection Prep", phase: "Readiness", icon: <ShieldCheck /> },
            { title: "CSA Score Guide", phase: "Risk", icon: <Search /> },
            { title: "Audit Trigger Log", phase: "Survival", icon: <Activity /> }
          ].map((guide, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col group">
              <div className="w-14 h-14 bg-authority-blue/5 text-authority-blue rounded-2xl flex items-center justify-center mb-6">{guide.icon}</div>
              <div className="flex-grow">
                <h3 className="text-xl font-black text-authority-blue uppercase tracking-tight mb-3">{guide.title}</h3>
                <div className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full mb-8">
                  <Shield size={10} className="mr-1.5" /> {guide.phase}
                </div>
              </div>
              <Link to="/pricing" className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:border-authority-blue hover:text-authority-blue transition-all flex items-center justify-center">
                <Lock size={12} className="mr-2 opacity-50" /> System Required
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-authority-blue py-32 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">Build Your System.</h2>
          <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Orientation resources help you start. LaunchPath systems keep your authority alive through federal scrutiny.
          </p>
          <Link to="/pricing" className="inline-flex items-center space-x-3 bg-white text-authority-blue px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95">
            <span>Request Admission</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;