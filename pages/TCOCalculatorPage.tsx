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
  CheckCircle2
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

  useEffect(() => {
    document.title = "TCO Calculator | Know Your Cost Per Mile";
    const update = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };
    update('meta[name="description"]', "Calculate your true cost per mile, break-even rate, and monthly net. The math most carriers skip. Know your numbers before you accept the load.");
    update('meta[property="og:title"]', "TCO Calculator | LaunchPath");
    update('meta[property="og:description"]', "True cost of ownership calculator for owner-operators. Know your numbers.");
    update('meta[property="og:type"]', "website");
  }, []);

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
    const paidMiles = (Number(operation.monthlyMiles) || 0) * paidMilesFactor;
    
    const actualGrossRevenue = paidMiles * (Number(operation.ratePerMile) || 0);
    const totalVarCosts = totalVarPerMile * (Number(operation.monthlyMiles) || 0);
    const netProfit = actualGrossRevenue - (totalFixed + totalVarCosts);
    const cpm = (totalFixed + totalVarCosts) / (Math.max(1, Number(operation.monthlyMiles) || 1));
    
    const breakEvenRate = paidMilesFactor > 0 ? (cpm / paidMilesFactor) : 99.99;

    return {
      totalFixed,
      totalVarPerMile,
      netProfit,
      cpm,
      breakEvenRate,
      margin: actualGrossRevenue > 0 ? (netProfit / actualGrossRevenue) * 100 : 0,
      actualGrossRevenue,
      grossRevenue: (Number(operation.monthlyMiles) || 0) * (Number(operation.ratePerMile) || 0)
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

  const exportCSV = () => {
    const rows = [
      ['Category', 'Item', 'Value'],
      ['Fixed Costs', 'Truck Payment', fixedCosts.truckPayment],
      ['Fixed Costs', 'Insurance', fixedCosts.insurance],
      ['Fixed Costs', 'Permits', fixedCosts.permits],
      ['Fixed Costs', 'Parking', fixedCosts.parking],
      ['Fixed Costs', 'Software', fixedCosts.software],
      ['Fixed Costs', 'Other', fixedCosts.other],
      ['', '', ''],
      ['Variable Costs', 'Fuel Price', variableCosts.fuelPrice],
      ['Variable Costs', 'MPG Target', variableCosts.mpg],
      ['Variable Costs', 'Maintenance/mi', variableCosts.maintenance],
      ['Variable Costs', 'Tires/mi', variableCosts.tires],
      ['Variable Costs', 'Tolls/mi', variableCosts.tolls],
      ['', '', ''],
      ['Operational', 'Monthly Miles', operation.monthlyMiles],
      ['Operational', 'Rate Per Mile', operation.ratePerMile],
      ['Operational', 'Deadhead %', operation.deadheadPercentage],
      ['', '', ''],
      ['Totals', 'Monthly Fixed Overhead', totals.totalFixed],
      ['Totals', 'Total CPM', totals.cpm.toFixed(4)],
      ['Totals', 'Break-Even RPM', totals.breakEvenRate.toFixed(4)],
      ['Totals', 'Actual Gross Revenue', totals.actualGrossRevenue.toFixed(2)],
      ['Totals', 'Net Profit', totals.netProfit.toFixed(2)],
      ['Totals', 'Profit Margin %', totals.margin.toFixed(2)]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LaunchPath_TCO_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a high-precision economic analysis for a trucking carrier:
      OPERATING DATA:
      - Monthly Fixed Overhead: $${totals.totalFixed}
      - Variable CPM: $${totals.totalVarPerMile.toFixed(2)}
      - Utilization: ${operation.monthlyMiles} miles/mo
      - Market Rate: $${operation.ratePerMile.toFixed(2)}/mi
      - Deadhead Factor: ${operation.deadheadPercentage}%
      - Projected Net Profit: $${totals.netProfit.toFixed(2)}
      
      TASK: Provide a sophisticated tactical review in an institutional tone. Highlight structural vulnerabilities and suggest 3 high-impact adjustments for sustainability.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt
      });
      setAiAnalysis(response.text || "Analysis complete. Suggestion: Audit variable expense leaks.");
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setAiAnalysis("Neural synchronization failed. Note: Current data shows a net margin of " + totals.margin.toFixed(1) + "%. Verify overhead variables.");
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
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            title="Export CSV Data"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-2"
          >
            <FileDown size={18} />
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Export CSV</span>
          </button>
          <button onClick={() => window.print()} title="Print/PDF" className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Printer size={18} />
          </button>
          <button 
            onClick={handleSaveProfile}
            disabled={saveStatus !== 'idle'}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all ${
              saveStatus === 'saved' ? 'bg-green-600 text-white' : 'bg-signal-gold text-authority-blue'
            }`}
          >
            {saveStatus === 'saving' ? (
              <Loader2 size={14} className="animate-spin" />
            ) : saveStatus === 'saved' ? (
              <CheckCircle2 size={14} />
            ) : (
              <Save size={14} />
            )}
            {saveStatus === 'saved' ? 'Profile Saved' : 'Save Profile'}
          </button>
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
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 80 })}
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black leading-none ${stat.color || 'text-white'}`}>${Math.abs(stat.val).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">/ {stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0F172A] border border-white/5 rounded-[3rem] p-10 space-y-16">
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
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8 border-b border-white/5 pb-4 flex items-center"><Wrench className="mr-3" size={18} /> Variable Operating Costs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Fuel Price (Avg)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input type="number" step="0.01" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 pl-10 pr-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={variableCosts.fuelPrice} onChange={(e) => setVariableCosts({...variableCosts, fuelPrice: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">MPG Target</label>
                  <input type="number" step="0.1" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={variableCosts.mpg} onChange={(e) => setVariableCosts({...variableCosts, mpg: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Maintenance / Mi</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input type="number" step="0.01" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 pl-10 pr-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={variableCosts.maintenance} onChange={(e) => setVariableCosts({...variableCosts, maintenance: parseFloat(e.target.value) || 0})} />
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl">
                    <Info size={14} className="text-signal-gold shrink-0 mt-0.5" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed italic">Directly impacts total CPM. Covers wear, tier degradation, and unplanned mechanical failure reserves.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8 border-b border-white/5 pb-4 flex items-center"><Target className="mr-3" size={18} /> Performance Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Total Monthly Miles</label>
                  <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.monthlyMiles} onChange={(e) => setOperation({...operation, monthlyMiles: parseInt(e.target.value) || 0})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Gross Avg. RPM</label>
                  <input type="number" step="0.05" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.ratePerMile} onChange={(e) => setOperation({...operation, ratePerMile: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Deadhead %</label>
                  <input type="number" className="w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-lg focus:border-signal-gold outline-none" value={operation.deadheadPercentage} onChange={(e) => setOperation({...operation, deadheadPercentage: parseInt(e.target.value) || 0})} />
                  <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                    <TrendingDown size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed italic">Miles driven unpaid. High deadhead reduces your paid revenue capacity and forces a higher break-even RPM requirement.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#1E3A5F] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-white/10">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Sparkles size={120} /></div>
             <h3 className="text-xl font-black font-serif uppercase text-white mb-4">Strategic Review</h3>
             {isAnalyzing ? (
               <div className="py-12 flex flex-col items-center justify-center space-y-6 bg-black/20 rounded-[2rem]">
                 <Loader2 className="animate-spin text-signal-gold" size={40} />
                 <p className="text-[10px] font-black uppercase tracking-widest text-white animate-pulse">Neural Economic Analysis...</p>
               </div>
             ) : aiAnalysis ? (
               <div className="space-y-6 animate-in fade-in">
                  <div className="p-6 bg-[#020617] rounded-[2rem] border border-white/10 text-xs leading-loose text-slate-300 font-medium whitespace-pre-wrap">{aiAnalysis}</div>
                  <button onClick={performAIAnalysis} className="w-full py-4 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20">Refresh Analysis</button>
               </div>
             ) : (
               <button onClick={performAIAnalysis} className="w-full bg-signal-gold text-authority-blue py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group"><Sparkles className="mr-3 group-hover:rotate-12 transition-transform" size={20} />Synthesize Economic Forecast</button>
             )}
          </div>

          <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6">
             <div className="flex items-center gap-3">
               <Info className="text-signal-gold" size={18} />
               <h4 className="text-[10px] font-black uppercase tracking-widest">Operating Guideline</h4>
             </div>
             <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
               "Revenue without an understanding of cost-per-mile is simply busy-work. Institutional carriers track these variables to maintain fiscal oxygen during market volatility."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCOCalculatorPage;