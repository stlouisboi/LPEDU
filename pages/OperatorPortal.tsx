import React from 'react';
import RemediationProtocol from '../components/RemediationProtocol';
import { COURSE_MODULES } from '../constants';
import { Link } from 'react-router-dom';
import { ChevronRight, Layout, Shield } from 'lucide-react';

const OperatorPortal: React.FC = () => {
  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen">
      {/* Protocol Block at the Top */}
      <RemediationProtocol />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight">Operator Dashboard</h1>
            <p className="text-text-muted mt-1 uppercase text-[10px] font-black tracking-widest">Registry ID: LP-AUTH-7729</p>
          </div>
          <div className="flex items-center space-x-3 bg-white dark:bg-surface-dark px-4 py-2 border border-slate-100 dark:border-border-dark rounded-xl shadow-sm">
            <Shield size={14} className="text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-white">Active Authority Standard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Module Sequence */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 flex items-center">
                <Layout size={16} className="mr-3" /> Implementation Sequence
              </h2>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 italic uppercase tracking-widest opacity-60">
                “Lazy people want much but get little, but those who work hard will prosper.” — Proverbs 13:4
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {COURSE_MODULES.map((module) => (
                <Link 
                  key={module.id} 
                  to={`/modules/${module.id}`}
                  className="flex items-center justify-between p-8 bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark rounded-[2rem] hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-authority-blue dark:text-signal-gold">
                      {module.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-authority-blue dark:text-white uppercase tracking-tight group-hover:text-signal-gold transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-xs text-text-muted font-medium mt-1">{module.pillar} • {module.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-authority-blue p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <h3 className="text-xl font-bold font-serif mb-6 uppercase tracking-tight text-signal-gold">System Integrity</h3>
              <div className="space-y-6">
                {[
                  { label: "BOC-3 Filing", status: "Verified" },
                  { label: "UCR Registration", status: "Verified" },
                  { label: "DQ File Framework", status: "In Progress" },
                  { label: "MCS-150 Update", status: "Pending" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Verified' ? 'text-green-400' : 'text-signal-gold'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorPortal;