import React, { useState, useMemo } from 'react';
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
  Printer 
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

  const totals = useMemo(() => {
    // Fix: Explicitly cast Object.values to number[] to resolve 'unknown' type arithmetic errors on lines 61, 68, and 69
    const totalFixed = (Object.values(fixedCosts) as number[]).reduce((a, b) => a + b, 0);
    const fuelPerMile = variableCosts.fuelPrice / variableCosts.mpg;
    const totalVarPerMile = fuelPerMile + variableCosts.maintenance + variableCosts.tires + variableCosts.tolls;
    
    const paidMiles = operation.monthlyMiles * (1 - operation.deadheadPercentage / 100);
    const actualGrossRevenue = paidMiles * operation.ratePerMile;
    const totalVarCosts = totalVarPerMile * operation.monthlyMiles;
    const netProfit = actualGrossRevenue - (totalFixed + totalVarCosts);
    const cpm = (totalFixed + totalVarCosts) / operation.monthlyMiles;
    const breakEvenRate = cpm / (1 - operation.deadheadPercentage / 100);

    return {
      totalFixed,
      totalVarPerMile,
      netProfit,
      cpm,
      breakEvenRate,
      margin: actualGrossRevenue > 0 ? (netProfit / actualGrossRevenue) * 100 : 0,
      actualGrossRevenue,
      grossRevenue: operation.monthlyMiles * operation.ratePerMile
    };
  }, [fixedCosts, variableCosts, operation]);

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this trucking carrier's financial profile:
      Fixed: $${totals.totalFixed}, Var: $${totals.totalVarPerMile.toFixed(2)}/mi, Miles: ${operation.monthlyMiles}, RPM: $${operation.ratePerMile.toFixed(2)}, Deadhead: ${operation.deadheadPercentage}%.
      Net Profit: $${totals.netProfit.toFixed(2)}. Suggest 3 tactical adjustments in a professional institutional tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiAnalysis(response.text || "Analysis link failed.");
    } catch (err) {
      setAiAnalysis("Technical error during synthesis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans">
      <div className="sticky top-0 z-40 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-signal-gold rounded-xl flex items-center justify-center text-authority-blue">
            <Calculator size={22} />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">TCO Economic Engine</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pillar 4 // Cash-Flow Oxygen</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.print()} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"><Printer size={18} /></button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-signal-gold text-authority-blue rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95"><Save size={14} />Save Profile</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Break-Even RPM', val: totals.breakEvenRate, unit: 'RPM', icon: <Activity /> },
              { label: 'Net Profit', val: totals.netProfit, unit: 'MO', icon: <DollarSign />, color: totals.netProfit >= 0 ? 'text-emerald-400' : 'text-red-500' },
              { label: 'Total CPM', val: totals.cpm, unit: 'MI', icon: <Zap /> }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0F172A] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5"><stat.icon.type {...stat.icon.props} size={80} /></div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black leading-none ${stat.color || 'text-white'}`}>${Math.abs(stat.val).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">/ {stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-[3rem] p-10 space-y-12">
            <section>
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8 border-b border-white/5 pb-4 flex items-center"><ShieldAlert className="mr-3" size={18} /> Fixed Structural Costs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(Object.keys(fixedCosts) as Array<keyof FixedCosts>).map((key) => (
                  <div key={key} className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 pl-10 pr-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={fixedCosts[key]} onChange={(e) => setFixedCosts({...fixedCosts, [key]: parseFloat(e.target.value) || 0})} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8 border-b border-white/5 pb-4 flex items-center"><Target className="mr-3" size={18} /> Performance Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Target Miles</label>
                  <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.monthlyMiles} onChange={(e) => setOperation({...operation, monthlyMiles: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Avg. RPM</label>
                  <input type="number" step="0.05" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.ratePerMile} onChange={(e) => setOperation({...operation, ratePerMile: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Deadhead %</label>
                  <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.deadheadPercentage} onChange={(e) => setOperation({...operation, deadheadPercentage: parseInt(e.target.value) || 0})} />
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#1E3A5F] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-white/10">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Sparkles size={120} /></div>
             <h3 className="text-xl font-black font-serif uppercase text-white mb-4">Synthesis</h3>
             {isAnalyzing ? (
               <div className="py-12 flex flex-col items-center justify-center space-y-6 bg-black/20 rounded-[2rem]">
                 <Loader2 className="animate-spin text-signal-gold" size={40} />
                 <p className="text-[10px] font-black uppercase tracking-widest text-white animate-pulse">Analyzing...</p>
               </div>
             ) : aiAnalysis ? (
               <div className="space-y-6 animate-in fade-in">
                  <div className="p-6 bg-[#020617] rounded-[2rem] border border-white/10 text-xs leading-loose text-slate-300 font-medium whitespace-pre-wrap">{aiAnalysis}</div>
                  <button onClick={performAIAnalysis} className="w-full py-4 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20">Re-Analyze</button>
               </div>
             ) : (
               <button onClick={performAIAnalysis} className="w-full bg-signal-gold text-authority-blue py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group"><Sparkles className="mr-3 group-hover:rotate-12 transition-transform" size={20} />Initiate Review</button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCOCalculatorPage;