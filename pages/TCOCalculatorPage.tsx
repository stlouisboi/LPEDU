
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Activity, 
  Zap, 
  ShieldAlert, 
  Target, 
  Sparkles, 
  Loader2, 
  Save, 
  Printer,
  Info,
  TrendingDown,
  Wrench,
  FileDown,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface FixedCosts {
  truckPayment: number;
  insurance: number;
  permits: number;
  parking: number;
  software: number;
  other: number;
}

interface VariableCosts {
  fuelPrice: number;
  mpg: number;
  maintenance: number;
  tires: number;
  tolls: number;
}

const TCOCalculatorPage: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<FixedCosts>({
    truckPayment: 2200,
    insurance: 1500,
    permits: 100,
    parking: 250,
    software: 80,
    other: 0
  });

  const [variableCosts, setVariableCosts] = useState<VariableCosts>({
    fuelPrice: 4.25,
    mpg: 7.5,
    maintenance: 0.15,
    tires: 0.03,
    tolls: 0.05
  });

  const [operation, setOperation] = useState({
    monthlyMiles: 8000,
    ratePerMile: 2.50,
    deadheadPercentage: 15
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load saved profile on mount
  useEffect(() => {
    const saved = localStorage.getItem('launchpath_tco_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fixedCosts) setFixedCosts(parsed.fixedCosts);
        if (parsed.variableCosts) setVariableCosts(parsed.variableCosts);
        if (parsed.operation) setOperation(parsed.operation);
      } catch (e) {
        console.error("Failed to restore TCO profile", e);
      }
    }
  }, []);

  const totals = useMemo(() => {
    const totalFixed = (Object.values(fixedCosts) as number[]).reduce((a, b) => a + Math.max(0, Number(b) || 0), 0);
    const fuelPerMile = (Math.max(0, Number(variableCosts.fuelPrice) || 0)) / (Math.max(0.1, Number(variableCosts.mpg) || 1));
    const totalVarPerMile = fuelPerMile + (Number(variableCosts.maintenance) || 0) + (Number(variableCosts.tires) || 0) + (Number(variableCosts.tolls) || 0);
    
    const safeDeadhead = Math.min(99.9, Math.max(0, Number(operation.deadheadPercentage) || 0));
    const paidMilesFactor = (1 - safeDeadhead / 100);
    const totalMiles = Number(operation.monthlyMiles) || 0;
    const paidMiles = totalMiles * paidMilesFactor;
    
    const actualGrossRevenue = paidMiles * (Number(operation.ratePerMile) || 0);
    const totalVarCosts = totalVarPerMile * totalMiles;
    const totalOperatingCosts = totalFixed + totalVarCosts;
    const netProfit = actualGrossRevenue - totalOperatingCosts;
    const cpm = totalOperatingCosts / (Math.max(1, totalMiles));
    
    const breakEvenRate = paidMiles > 0 ? (totalOperatingCosts / paidMiles) : 99.99;

    return {
      totalFixed,
      totalVarPerMile,
      totalOperatingCosts,
      netProfit,
      cpm,
      breakEvenRate,
      margin: actualGrossRevenue > 0 ? (netProfit / actualGrossRevenue) * 100 : 0,
      actualGrossRevenue,
      grossRevenue: totalMiles * (Number(operation.ratePerMile) || 0)
    };
  }, [fixedCosts, variableCosts, operation]);

  const handleSaveProfile = () => {
    setSaveStatus('saving');
    const profile = { fixedCosts, variableCosts, operation };
    localStorage.setItem('launchpath_tco_profile', JSON.stringify(profile));
    
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 600);
  };

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a high-precision economic analysis for a trucking carrier:
      OPERATING DATA:
      - Monthly Fixed Overhead: $${totals.totalFixed}
      - Variable CPM: $${totals.totalVarPerMile.toFixed(4)}
      - Utilization: ${operation.monthlyMiles} miles/mo
      - Market Rate: $${operation.ratePerMile.toFixed(2)}/mi
      - Deadhead Factor: ${operation.deadheadPercentage}%
      - Breakdown CPM: $${totals.cpm.toFixed(4)}
      - Projected Net Profit: $${totals.netProfit.toFixed(2)}
      
      TASK: Provide a sophisticated tactical review. Identify if this model is structurally sound or fragile. Suggest 3 high-impact adjustments. Institutional tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt
      });
      setAiAnalysis(response.text || "Analysis complete. Recommendation: Audit variable expense leaks.");
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setAiAnalysis("Neural link timeout. Margin: " + totals.margin.toFixed(1) + "%. Recommendation: Review fuel and maintenance variables.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-signal-gold/20">
      {/* Precision Header */}
      <div className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-2xl border-b border-white/5 px-8 py-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-signal-gold rounded-2xl flex items-center justify-center text-authority-blue shadow-lg shadow-signal-gold/10">
            <Calculator size={26} />
          </div>
          <div>
            <h1 className="text-base font-black uppercase tracking-[0.4em] text-white">Economic Engine v4.2</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live Analytical Channel
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.print()} className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Printer size={20} />
          </button>
          <button 
            onClick={handleSaveProfile}
            disabled={saveStatus !== 'idle'}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all ${
              saveStatus === 'saved' ? 'bg-green-600 text-white' : 'bg-signal-gold text-authority-blue hover:bg-white'
            }`}
          >
            {saveStatus === 'saving' ? <Loader2 size={16} className="animate-spin" /> : saveStatus === 'saved' ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saveStatus === 'saved' ? 'Registry Saved' : 'Save Profile'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Stats & Inputs */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Stats HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Break-Even RPM', val: totals.breakEvenRate, unit: 'RPM', icon: <Activity />, sub: 'Min Target' },
              { label: 'Net Profit', val: totals.netProfit, unit: 'MO', icon: <DollarSign />, color: totals.netProfit >= 0 ? 'text-emerald-400' : 'text-red-500', sub: 'Bottom Line' },
              { label: 'Total CPM', val: totals.cpm, unit: 'MI', icon: <Zap />, sub: 'Cost/Mile' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0F172A] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group hover:border-signal-gold/20 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                   {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 100 })}
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-5xl font-black leading-none tracking-tighter ${stat.color || 'text-white'}`}>
                    ${Math.abs(stat.val).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">/ {stat.unit}</span>
                </div>
                <p className="text-[9px] font-black uppercase text-slate-600 tracking-[0.4em]">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Input Sections */}
          <div className="bg-[#0F172A] border border-white/5 rounded-[4rem] p-10 md:p-16 space-y-20 shadow-2xl">
            <section>
              <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <ShieldAlert className="mr-4" size={20} /> Fixed Structural Overhead
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Monthly Commitment</span>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {(Object.keys(fixedCosts) as Array<keyof FixedCosts>).map((key) => (
                  <div key={key} className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="relative group">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold group-focus-within:text-signal-gold transition-colors">$</span>
                      <input type="number" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 pl-12 pr-6 text-white font-black text-xl focus:border-signal-gold outline-none transition-all shadow-inner" value={fixedCosts[key]} onChange={(e) => setFixedCosts({...fixedCosts, [key]: parseFloat(e.target.value) || 0})} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <Wrench className="mr-4" size={20} /> Variable Performance Data
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Operational Flux</span>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Avg Fuel Price</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input type="number" step="0.01" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 pl-12 pr-6 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={variableCosts.fuelPrice} onChange={(e) => setVariableCosts({...variableCosts, fuelPrice: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">MPG Target</label>
                  <input type="number" step="0.1" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 px-8 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={variableCosts.mpg} onChange={(e) => setVariableCosts({...variableCosts, mpg: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Maint / Mi</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input type="number" step="0.01" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 pl-12 pr-6 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={variableCosts.maintenance} onChange={(e) => setVariableCosts({...variableCosts, maintenance: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <Target className="mr-4" size={20} /> Utilization & Market Velocity
                </h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Productivity Map</span>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Monthly Miles</label>
                  <input type="number" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 px-8 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={operation.monthlyMiles} onChange={(e) => setOperation({...operation, monthlyMiles: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Avg Market RPM</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input type="number" step="0.05" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 pl-12 pr-6 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={operation.ratePerMile} onChange={(e) => setOperation({...operation, ratePerMile: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Deadhead %</label>
                  <input type="number" className="w-full bg-[#020617] border-2 border-white/5 rounded-2xl py-5 px-8 text-white font-black text-xl focus:border-signal-gold outline-none shadow-inner" value={operation.deadheadPercentage} onChange={(e) => setOperation({...operation, deadheadPercentage: parseInt(e.target.value) || 0})} />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: AI & Analysis */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Sustainability Gauge */}
          <div className="bg-[#0F172A] rounded-[3rem] p-10 border border-white/5 shadow-2xl">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Sustainability Gauge</h3>
             <div className="relative flex flex-col items-center">
                <div className="w-48 h-48 rounded-full border-[12px] border-white/5 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-signal-gold/10 to-transparent"></div>
                   <div className="text-center z-10">
                      <span className={`text-4xl font-black ${totals.margin > 15 ? 'text-emerald-400' : totals.margin > 5 ? 'text-amber-400' : 'text-red-500'}`}>
                        {Math.round(totals.margin)}%
                      </span>
                      <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mt-1">Net Margin</p>
                   </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Fixed %</p>
                      <p className="text-sm font-bold text-white">{Math.round((totals.totalFixed / totals.totalOperatingCosts) * 100)}%</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Variable %</p>
                      <p className="text-sm font-bold text-white">{100 - Math.round((totals.totalFixed / totals.totalOperatingCosts) * 100)}%</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-[#1E3A5F] rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
             <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Sparkles size={140} /></div>
             <div className="relative z-10">
                <h3 className="text-xl font-black font-serif uppercase text-white mb-6">Strategic Forecast</h3>
                {isAnalyzing ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-6">
                    <Loader2 className="animate-spin text-signal-gold" size={48} />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse">Neural Economic Analysis Active</p>
                  </div>
                ) : aiAnalysis ? (
                  <div className="space-y-6 animate-in fade-in">
                     <div className="p-8 bg-[#020617] rounded-[2.5rem] border border-white/10 text-[11px] leading-relaxed text-slate-300 font-medium whitespace-pre-wrap max-h-[400px] overflow-y-auto custom-scrollbar">
                       {aiAnalysis}
                     </div>
                     <button onClick={performAIAnalysis} className="w-full py-5 bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Regenerate Analysis</button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <p className="text-sm text-white/70 leading-relaxed font-medium">
                      Synthesize a custom economic review based on your current inputs. Identifies structural fragile points.
                    </p>
                    <button onClick={performAIAnalysis} className="w-full h-24 bg-signal-gold text-authority-blue rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group">
                      <Sparkles className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
                      Synthesize Forecast
                    </button>
                  </div>
                )}
             </div>
          </div>

          {totals.cpm > 2.20 && (
            <div className="bg-red-500/10 border-2 border-red-500/30 p-8 rounded-[2.5rem] flex items-start space-x-5 animate-in slide-in-from-right-4 duration-700">
               <AlertTriangle className="text-red-500 shrink-0" size={28} />
               <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-red-400 mb-1">High Cost Alert</h4>
                  <p className="text-xs text-red-200/70 font-medium leading-relaxed">Your CPM exceeds the 2026 survival threshold. Structural adjustments to overhead or fuel efficiency are mandatory for continuity.</p>
               </div>
            </div>
          )}

          <div className="p-10 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
             <div className="flex items-center gap-3">
               <Info className="text-signal-gold" size={18} />
               <h4 className="text-[10px] font-black uppercase tracking-widest">Operating Standard</h4>
             </div>
             <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
               "Revenue is an illusion; cash-flow is reality. A carrier without a precise TCO model operates in a state of terminal exposure."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCOCalculatorPage;
