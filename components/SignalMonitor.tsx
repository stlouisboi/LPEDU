import React, { useEffect, useState } from 'react';
import { calculateCarrierSignal, SignalStatus } from '../services/signalService';
import { Activity, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

interface SignalMonitorProps {
  carrierId: string;
}

const SignalMonitor: React.FC<SignalMonitorProps> = ({ carrierId }) => {
  const [signal, setSignal] = useState<SignalStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const status = await calculateCarrierSignal(carrierId);
        setSignal(status);
      } catch (err) {
        console.error('Failed to fetch signal:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSignal();
  }, [carrierId]);

  if (loading) return <div className="h-48 bg-[#0A1628] rounded-3xl animate-pulse"></div>;
  if (!signal) return null;

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'text-[#C5A059] border-[#C5A059]';
    if (grade === 'B') return 'text-emerald-500 border-emerald-500';
    return 'text-red-500 border-red-500';
  };

  const getSignalColor = (overall: number) => {
    if (overall >= 90) return 'stroke-[#C5A059]';
    if (overall >= 60) return 'stroke-emerald-500';
    return 'stroke-red-500';
  };

  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        
        {/* CIRCULAR SIGNAL GAUGE (The "Cornerstone" Upgrade) */}
        <div className="relative w-48 h-48 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={552.9}
              strokeDashoffset={552.9 - (552.9 * signal.overall) / 100}
              strokeLinecap="round"
              className={`${getSignalColor(signal.overall)} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white tracking-tighter font-mono">{signal.overall}%</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">SIGNAL</span>
          </div>
        </div>

        {/* SYSTEM STATUS & INDICATORS */}
        <div className="flex-grow space-y-8 w-full">
              <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 font-mono">SYSTEM_STATUS_MONITOR</p>
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${getGradeColor(signal.grade)}`}>
                {signal.label}
              </h3>
            </div>
            <div className={`px-4 py-2 border-2 rounded-xl text-[12px] font-black uppercase tracking-widest ${getGradeColor(signal.grade)}`}>
              GRADE: {signal.grade}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"            {[                  { label: 'Documentary Integrity', val: signal.indicators.integrity, icon: <FileText size={16} /> },
              { label: 'System Pulse', val: signal.indicators.pulse, icon: <Activity size={16} /> },
              { label: 'Regulatory Alignment', val: signal.indicators.alignment, icon: <ShieldCheck size={16} /> }
            ].map((indicator, i) => (
              <div key={i} className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    {indicator.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest font-mono">{indicator.label}</span>
                  </div>
                  <span className="text-[12px] font-black text-white font-mono">{indicator.val}%</span>
                </div>                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${getSignalColor(indicator.val).replace('stroke', 'bg')}`}
                    style={{ width: `${indicator.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER - LAST UPDATE */}
      <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>OPERATIONAL_DOCTRINE: ACTIVE</span>
        </div>
        <span>LAST_SIGNAL_UPDATE: {signal.lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default SignalMonitor;
