import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Zap, 
  ShieldAlert, 
  ArrowRight, 
  Info,
  ChevronDown,
  ChevronUp,
  FileText,
  PieChart,
  Target,
  Sparkles,
  Loader2,
  Save,
  Printer
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const TCOCalculatorPage: React.FC = () => {
  // --- STATE ---
  const [activeSection, setActiveSection] = useState<'inputs' | 'analysis'>('inputs');
  const [fixedCosts, setFixedCosts] = useState({
    truckPayment: 2200,
    insurance: 1500,
    permits: 100,
    parking: 250,
    software: 80,
    other: 0
  });

  const [variableCosts, setVariableCosts] = useState({
    fuelPrice: 4.25,
    mpg: 7.5,
    maintenance: 0.15, // per mile
    tires: 0.03, // per mile
    tolls: 0.05 // per mile
  });

  const [operation, setOperation] = useState({
    monthlyMiles: 8000,
    ratePerMile: 2.50,
    deadheadPercentage: 15
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- CALCULATIONS ---
  const totals = useMemo(() => {
    // Fix: Explicitly cast values to number[] to resolve "Operator '+' cannot be applied to types 'unknown' and 'unknown'" error on line 55
    const totalFixed = (Object.values(fixedCosts) as number[]).reduce((a, b) => a + b, 0);
    const fuelPerMile = variableCosts.fuelPrice / variableCosts.mpg;
    const totalVarPerMile = fuelPerMile + variableCosts.maintenance + variableCosts.tires + variableCosts.tolls;
    
    const grossRevenue = operation.monthlyMiles * operation.ratePerMile;
    const paidMiles = operation.monthlyMiles * (1 - operation.deadheadPercentage / 100);
    const actualGrossRevenue = paidMiles * operation.ratePerMile;
    
    const totalVarCosts = totalVarPerMile * operation.monthlyMiles;
    // Fix: Using totalFixed (now correctly inferred as number) to resolve errors on lines 64 and 65
    const netProfit = actualGrossRevenue - (totalFixed + totalVarCosts);
    const cpm = (totalFixed + totalVarCosts) / operation.monthlyMiles;
    const breakEvenRate = cpm / (1 - operation.deadheadPercentage / 100);

    return {
      totalFixed,
      totalVarPerMile,
      fuelPerMile,
      grossRevenue,
      actualGrossRevenue,
      totalVarCosts,
      netProfit,
      cpm,
      breakEvenRate,
      margin: (netProfit / actualGrossRevenue) * 100
    };
  }, [fixedCosts, variableCosts, operation]);

  // --- AI HANDLER ---
  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this trucking carrier's financial profile:
      MONTHLY FIXED COSTS: $${totals.totalFixed}
      VARIABLE COST PER MILE: $${totals.totalVarPerMile.toFixed(2)}
      MONTHLY MILES: ${operation.monthlyMiles}
      RATE PER MILE: $${operation.ratePerMile.toFixed(2)}
      DEADHEAD: ${operation.deadheadPercentage}%
      
      DERIVED METRICS:
      - Total CPM: $${totals.cpm.toFixed(2)}
      - Break-even Rate: $${totals.breakEvenRate.toFixed(2)}
      - Net Monthly Profit: $${totals.netProfit.toFixed(2)}
      - Profit Margin: ${totals.margin.toFixed(1)}%

      Please provide a professional, "Institutional Standard" analysis. 
      Identify specific risk areas (e.g., is deadhead too high? Is CPM above market?). 
      Suggest 3 specific tactical adjustments. 
      Keep the tone firm, professional, and data-driven. Use "LaunchPath Standard" terminology.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiAnalysis(response.text || "Analysis link failed.");
      setActiveSection('analysis');
    } catch (err) {
      console.error(err);
      setAiAnalysis("Technical error during economic synthesis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-signal-gold/30">
      {/* Header Overlay */}
      <div className="sticky top-0 z-40 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-signal-gold rounded-xl flex items-center justify-center text-authority-blue shadow-lg shadow-signal-gold/10">
            <Calculator size={22} />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">TCO Economic Engine</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocol: Pillar 4 // Cash-Flow Oxygen</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => window.print()} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Printer size={18} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-signal-gold text-authority-blue rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-xl shadow-signal-gold/5">
            <Save size={14} />
            Save Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* TOP STATS HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F172A] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Activity size={80} /></div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Break-Even Threshold</p>
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white leading-none">${totals.breakEvenRate.toFixed(2)}</span>
                 <span className="text-xs font-bold text-slate-500 uppercase">/ RPM</span>
               </div>
               <div className="mt-4 flex items-center gap-2">
                 <div className="h-1 flex-grow bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-signal-gold" style={{ width: `${(totals.breakEvenRate / operation.ratePerMile) * 100}%` }}></div>
                 </div>
               </div>
            </div>

            <div className="bg-[#0F172A] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><DollarSign size={80} /></div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Oxygen Level (Profit)</p>
               <div className="flex items-baseline gap-2">
                 <span className={`text-4xl font-black leading-none ${totals.netProfit >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                   ${Math.abs(totals.netProfit).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                 </span>
                 <span className="text-xs font-bold text-slate-500 uppercase">/ MO</span>
               </div>
               <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-400/80">
                 {totals.margin.toFixed(1)}% Operational Margin
               </p>
            </div>

            <div className="bg-[#0F172A] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Zap size={80} /></div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Total CPM</p>
               <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black text-white leading-none">${totals.cpm.toFixed(2)}</span>
                 <span className="text-xs font-bold text-slate-500 uppercase">/ MI</span>
               </div>
               <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                 Market Avg: ~$2.15
               </p>
            </div>
          </div>

          {/* INPUT FORMS */}
          <div className="bg-[#0F172A] border border-white/5 rounded-[3rem] p-10 space-y-12">
            
            <section>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <ShieldAlert className="mr-3" size={18} /> Fixed Structural Costs
                </h3>
                <span className="text-xs font-bold text-slate-500">MONTHLY TOTAL: ${totals.totalFixed.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Truck/Trailer Payment", key: "truckPayment", state: fixedCosts, set: setFixedCosts },
                  { label: "Insurance Premium", key: "insurance", state: fixedCosts, set: setFixedCosts },
                  { label: "Permits/UCR/BOC-3", key: "permits", state: fixedCosts, set: setFixedCosts },
                  { label: "Parking Fees", key: "parking", state: fixedCosts, set: setFixedCosts },
                  { label: "Software (ELD/TMS)", key: "software", state: fixedCosts, set: setFixedCosts },
                  { label: "Misc Overhead", key: "other", state: fixedCosts, set: setFixedCosts },
                ].map((item) => (
                  <div key={item.key} className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{item.label}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                      <input 
                        type="number"
                        className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 pl-10 pr-6 text-white font-black text-lg focus:border-signal-gold outline-none transition-all"
                        value={(item.state as any)[item.key]}
                        onChange={(e) => item.set({ ...item.state, [item.key]: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <Activity className="mr-3" size={18} /> Variable Operating Costs
                </h3>
                <span className="text-xs font-bold text-slate-500">CPM TOTAL: ${totals.totalVarPerMile.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Fuel Price (Gal)</label>
                  <input 
                    type="number" step="0.01"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={variableCosts.fuelPrice}
                    onChange={(e) => setVariableCosts({ ...variableCosts, fuelPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Est. MPG</label>
                  <input 
                    type="number" step="0.1"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={variableCosts.mpg}
                    onChange={(e) => setVariableCosts({ ...variableCosts, mpg: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Maintenance / Mile</label>
                  <input 
                    type="number" step="0.01"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={variableCosts.maintenance}
                    onChange={(e) => setVariableCosts({ ...variableCosts, maintenance: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tolls / Mile</label>
                  <input 
                    type="number" step="0.01"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={variableCosts.tolls}
                    onChange={(e) => setVariableCosts({ ...variableCosts, tolls: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold flex items-center">
                  <Target className="mr-3" size={18} /> Performance Goals
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Monthly Target Miles</label>
                  <input 
                    type="number"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={operation.monthlyMiles}
                    onChange={(e) => setOperation({ ...operation, monthlyMiles: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Avg. Rate Per Mile</label>
                  <input 
                    type="number" step="0.05"
                    className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                    value={operation.ratePerMile}
                    onChange={(e) => setOperation({ ...operation, ratePerMile: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Deadhead %</label>
                  <div className="relative">
                    <input 
                      type="number"
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none"
                      value={operation.deadheadPercentage}
                      onChange={(e) => setOperation({ ...operation, deadheadPercentage: parseInt(e.target.value) || 0 })}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT COLUMN: AI ANALYSIS & SUMMARY */}
        <div className="lg:col-span-4 space-y-10">
          
          <div className="bg-[#1E3A5F] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-white/10">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Sparkles size={120} /></div>
             <h3 className="text-xl font-black font-serif uppercase text-white mb-4 leading-tight">Economic Synthesis</h3>
             <p className="text-white/70 text-sm leading-relaxed mb-10 font-medium italic">
               "Data without analysis is simply noise. Use the AI Economic Advisor to interpret your structural health."
             </p>
             
             {isAnalyzing ? (
               <div className="py-12 flex flex-col items-center justify-center space-y-6 bg-black/20 rounded-[2rem]">
                 <Loader2 className="animate-spin text-signal-gold" size={40} />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white animate-pulse">Processing Carrier Data...</p>
               </div>
             ) : aiAnalysis ? (
               <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="p-6 bg-[#020617] rounded-[2rem] border border-white/10">
                    <div className="prose prose-sm prose-invert max-w-none text-xs leading-loose font-medium text-slate-300">
                       {aiAnalysis.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                    </div>
                  </div>
                  <button onClick={performAIAnalysis} className="w-full py-4 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                    Re-Run Analysis
                  </button>
               </div>
             ) : (
               <button 
                 onClick={performAIAnalysis}
                 className="w-full bg-signal-gold text-authority-blue py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group"
               >
                 <Sparkles className="mr-3 group-hover:rotate-12 transition-transform" size={20} />
                 Initiate AI Review
               </button>
             )}
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-[3rem] p-10 shadow-sm space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 border-b border-white/5 pb-4">Revenue Attribution</h4>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Theoretical Gross</span>
                <span className="text-xl font-black text-slate-200">${totals.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Efficiency Adjustment</span>
                <span className="text-lg font-black text-red-400">-${(totals.grossRevenue - totals.actualGrossRevenue).toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Net Market Capture</span>
                <span className="text-2xl font-black text-emerald-400">${totals.actualGrossRevenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert size={14} className="text-signal-gold" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Survival Logic</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                "Operating below the break-even RPM (${totals.breakEvenRate.toFixed(2)}) results in immediate depletion of Pillar 4 capital reserves."
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 pb-20 opacity-30 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Economic models are for educational orientation only. Projections do not constitute financial advice. Carrier results depend on localized market volatility.
        </p>
      </div>

    </div>
  );
};

export default TCOCalculatorPage;