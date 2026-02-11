import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award
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
  const location = useLocation();
  const [activeStep, setActiveStep] = useState<number>(0); 
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

  // Handle Query Params for Pre-filling
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q1 = params.get('q1'); // Capital
    if (q1) {
      const score = parseInt(q1);
      // Pre-fill fixed costs based on capital score (example logic)
      if (score === 0) setFixedCosts(prev => ({ ...prev, other: 1000 })); // High entry barrier penalty
    }
    
    const result = params.get('result');
    if (result) {
      setActiveStep(1); // Jump straight into input if coming from quiz
    }
  }, [location]);

  useEffect(() => {
    document.title = "Economic Engine | LaunchPath TCO Calculator";
  }, []);

  const totals = useMemo(() => {
    const totalFixed = (Object.values(fixedCosts) as number[]).reduce((a, b) => a + Math.max(0, Number(b) || 0), 0);
    const fuelPerMile = (Math.max(0, Number(variableCosts.fuelPrice) || 0)) / (Math.max(0.1, Number(variableCosts.mpg) || 1));
    const totalVarPerMile = fuelPerMile + (Number(variableCosts.maintenance) || 0) + (Number(variableCosts.tires) || 0) + (Number(variableCosts.tolls) || 0);
    
    const paidMilesFactor = (1 - (Number(operation.deadheadPercentage) || 0) / 100);
    const paidMiles = (Number(operation.monthlyMiles) || 0) * paidMilesFactor;
    
    const actualGrossRevenue = paidMiles * (Number(operation.ratePerMile) || 0);
    const totalVarCosts = totalVarPerMile * (Number(operation.monthlyMiles) || 0);
    const netProfit = actualGrossRevenue - (totalFixed + totalVarCosts);
    const cpm = (totalFixed + totalVarCosts) / (Math.max(1, Number(operation.monthlyMiles) || 1));
    const breakEvenRate = paidMilesFactor > 0 ? (cpm / paidMilesFactor) : 99.99;

    return { totalFixed, totalVarPerMile, netProfit, cpm, breakEvenRate, margin: actualGrossRevenue > 0 ? (netProfit / actualGrossRevenue) * 100 : 0, actualGrossRevenue };
  }, [fixedCosts, variableCosts, operation]);

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Trucking Carrier TCO Analysis: Fixed $${totals.totalFixed}, Var $${totals.totalVarPerMile.toFixed(2)}/mi, Net $${totals.netProfit.toFixed(2)}. Suggest 3 tactical improvements for sustainability in an authoritative institutional tone.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-pro-preview', contents: prompt });
      setAiAnalysis(response.text || "Analysis complete.");
    } catch (err) { setAiAnalysis("Analysis terminal fault."); } finally { setIsAnalyzing(false); }
  };

  const nextStep = () => setActiveStep(prev => prev + 1);
  const prevStep = () => setActiveStep(prev => prev - 1);

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const exportCSV = () => {
    const headers = ['Metric', 'Value'];
    const data = [
      ['Total Fixed Costs', totals.totalFixed],
      ['Total Variable CPM', totals.totalVarPerMile],
      ['Net Profit', totals.netProfit],
      ['CPM', totals.cpm],
      ['Break Even Rate', totals.breakEvenRate],
      ['Margin', totals.margin]
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + data.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tco_analysis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-signal-gold/20">
      
      {/* STEALTH HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 px-8 py-5 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-signal-gold rounded-xl flex items-center justify-center text-authority-blue shadow-lg">
               <Calculator size={22} />
            </div>
            <div className="hidden sm:block">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold leading-none mb-1.5">Economic Engine v4.0</p>
               <p className="text-xs font-bold text-white uppercase tracking-widest opacity-60">Pillar 4: Cash-Flow Oxygen</p>
            </div>
         </div>
         {activeStep > 0 && activeStep < 4 && (
           <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${activeStep >= i ? 'bg-signal-gold' : 'bg-white/10'}`}></div>
                 ))}
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400">Step {activeStep} of 3</p>
           </div>
         )}
         <div className="flex items-center space-x-4">
            <button onClick={() => window.print()} className="p-2.5 text-slate-400 hover:text-white transition-colors"><Printer size={20}/></button>
            <button onClick={() => setActiveStep(4)} className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Summary View</button>
         </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-6 pt-40 pb-32 min-h-screen flex flex-col items-center">
        
        {/* STEP 0: START */}
        {activeStep === 0 && (
          <div className="legibility-container text-center space-y-12 animate-reveal-up py-12">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-white/10">
               <Target size={48} className="text-signal-gold" />
            </div>
            <div className="space-y-4">
               <h1 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tight text-white leading-none">The Economic <br/><span className="text-signal-gold italic">Engine.</span></h1>
               <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-xl mx-auto">Analyze your true cost per mile, break-even rate, and monthly net margin. Revenue without profit is busy-work.</p>
            </div>
            <button onClick={nextStep} className="bg-signal-gold text-authority-blue px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:scale-105 transition-all active:scale-95 border-b-8 border-slate-900 group">
               Begin Calculation <ChevronRight className="inline ml-3 group-hover:translate-x-1" size={20} />
            </button>
          </div>
        )}

        {/* STEP 1: FIXED COSTS */}
        {activeStep === 1 && (
          <div className="legibility-container w-full space-y-16 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-4">
                <div className="flex items-center space-x-3 text-signal-gold">
                   <ShieldAlert size={20} />
                   <h2 className="text-xs font-black uppercase tracking-[0.4em]">Section 01: Fixed Structural Costs</h2>
                </div>
                <p className="text-lg text-slate-400 font-bold italic">Monthly overhead that persists regardless of mileage.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { label: "Truck Payment", id: "truckPayment" },
                  { label: "Insurance Premium", id: "insurance" },
                  { label: "Parking Fees", id: "parking" },
                  { label: "Permits & Plates", id: "permits" },
                  { label: "Software Subscriptions", id: "software" },
                  { label: "Other Fixed Costs", id: "other" }
                ].map((input) => (
                  <div key={input.id} className="space-y-3 group">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-signal-gold transition-colors ml-2">{input.label}</label>
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">$</span>
                        <input 
                          type="number" 
                          value={fixedCosts[input.id as keyof FixedCosts]} 
                          onChange={e => setFixedCosts({...fixedCosts, [input.id]: parseFloat(e.target.value) || 0})}
                          className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-6 pl-12 pr-8 text-white font-black text-2xl focus:border-signal-gold outline-none shadow-inner transition-all"
                        />
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-12 border-t border-white/5 flex justify-between">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-colors"><ChevronLeft className="mr-2" size={16}/> Back</button>
                <button onClick={nextStep} className="bg-white text-authority-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-xl flex items-center group">Continue to Variable Costs <ChevronRight className="ml-2 group-hover:translate-x-1" size={16}/></button>
             </div>
          </div>
        )}

        {/* STEP 2: VARIABLE COSTS */}
        {activeStep === 2 && (
          <div className="legibility-container w-full space-y-16 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-4">
                <div className="flex items-center space-x-3 text-signal-gold">
                   <Wrench size={20} />
                   <h2 className="text-xs font-black uppercase tracking-[0.4em]">Section 02: Variable Operating Costs</h2>
                </div>
                <p className="text-lg text-slate-400 font-bold italic">Costs driven directly by active movement and utilization.</p>
             </div>

             <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Average Fuel Price</label>
                      <div className="relative">
                         <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">$</span>
                         <input type="number" step="0.01" value={variableCosts.fuelPrice} onChange={e => setVariableCosts({...variableCosts, fuelPrice: parseFloat(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-6 pl-12 pr-8 text-white font-black text-2xl focus:border-signal-gold outline-none shadow-inner"/>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Target Fuel Efficiency (MPG)</label>
                      <input type="number" step="0.1" value={variableCosts.mpg} onChange={e => setVariableCosts({...variableCosts, mpg: parseFloat(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-6 px-8 text-white font-black text-2xl focus:border-signal-gold outline-none shadow-inner"/>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {[
                     { label: "Maintenance Reserve", id: "maintenance" },
                     { label: "Tire Degradation", id: "tires" },
                     { label: "Toll Estimates", id: "tolls" }
                   ].map(input => (
                     <div key={input.id} className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{input.label} / Mi</label>
                        <div className="relative">
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                           <input type="number" step="0.01" value={variableCosts[input.id as keyof VariableCosts]} onChange={e => setVariableCosts({...variableCosts, [input.id]: parseFloat(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-4 pl-10 pr-6 text-white font-black text-lg focus:border-signal-gold outline-none"/>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-start space-x-6">
                   <div className="p-4 bg-signal-gold/10 rounded-2xl text-signal-gold shrink-0"><Info size={24}/></div>
                   <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">Maintenance reserves should be funded at a minimum of <span className="text-white font-black">$0.15 per mile</span> to cover catastrophic engine or transmission failure over time.</p>
                </div>
             </div>

             <div className="pt-12 border-t border-white/5 flex justify-between">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-colors"><ChevronLeft className="mr-2" size={16}/> Back</button>
                <button onClick={nextStep} className="bg-white text-authority-blue px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-signal-gold transition-all shadow-xl flex items-center group">Operational Goals <ChevronRight className="ml-2 group-hover:translate-x-1" size={16}/></button>
             </div>
          </div>
        )}

        {/* STEP 3: OPERATIONAL GOALS */}
        {activeStep === 3 && (
          <div className="legibility-container w-full space-y-16 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-4">
                <div className="flex items-center space-x-3 text-signal-gold">
                   <Activity size={20} />
                   <h2 className="text-xs font-black uppercase tracking-[0.4em]">Section 03: Operational Performance</h2>
                </div>
                <p className="text-lg text-slate-400 font-bold italic">Define your utilization targets and market pricing.</p>
             </div>

             <div className="space-y-12">
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Monthly Total Mileage</label>
                   <input type="number" value={operation.monthlyMiles} onChange={e => setOperation({...operation, monthlyMiles: parseInt(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-8 px-10 text-white font-black text-4xl focus:border-signal-gold outline-none shadow-inner"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Average Gross Rate / Mi</label>
                      <div className="relative">
                         <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">$</span>
                         <input type="number" step="0.05" value={operation.ratePerMile} onChange={e => setOperation({...operation, ratePerMile: parseFloat(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-6 pl-12 pr-8 text-white font-black text-2xl focus:border-signal-gold outline-none shadow-inner"/>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Deadhead Factor (%)</label>
                      <div className="relative">
                         <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">%</span>
                         <input type="number" value={operation.deadheadPercentage} onChange={e => setOperation({...operation, deadheadPercentage: parseInt(e.target.value) || 0})} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl py-6 pl-8 pr-12 text-white font-black text-2xl focus:border-signal-gold outline-none shadow-inner"/>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-red-500/5 rounded-[2.5rem] border border-red-500/10 flex items-start space-x-6">
                   <div className="p-4 bg-red-500/10 rounded-2xl text-red-400 shrink-0"><TrendingDown size={24}/></div>
                   <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">Deadhead miles are unbillable utilization. Every percentage point increase in deadhead forces a mathematically higher <span className="text-white font-black">Break-Even RPM</span>.</p>
                </div>
             </div>

             <div className="pt-12 border-t border-white/5 flex justify-between">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-colors"><ChevronLeft className="mr-2" size={16}/> Back</button>
                <button onClick={nextStep} className="bg-signal-gold text-authority-blue px-16 py-7 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center border-b-8 border-slate-900">Synthesize Economic Summary <ChevronRight className="ml-2" size={16}/></button>
             </div>
          </div>
        )}

        {/* STEP 4: SUMMARY & ANALYSIS */}
        {activeStep === 4 && (
          <div className="w-full space-y-12 animate-in fade-in duration-1000">
             
             {/* THE CORE METRICS BAR */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Cost Per Mile", val: totals.cpm.toFixed(4), unit: "/MI", icon: <Zap size={18}/> },
                  { label: "Break-Even RPM", val: totals.breakEvenRate.toFixed(4), unit: "/MI", icon: <Award size={18}/> },
                  { label: "Net Monthly Profit", val: totals.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 }), unit: "/MO", icon: <DollarSign size={18}/>, color: totals.netProfit >= 0 ? 'text-green-500' : 'text-red-600' },
                  { label: "Operating Margin", val: totals.margin.toFixed(2), unit: "%", icon: <Activity size={18}/> }
                ].map((metric, i) => (
                  <div key={i} className="bg-[#0F172A] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">{metric.icon}</div>
                     <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6">{metric.label}</p>
                     <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-black tracking-tighter ${metric.color || 'text-white'}`}>${metric.val}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{metric.unit}</span>
                     </div>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Visual Analysis Column */}
                <div className="lg:col-span-8 space-y-10">
                   <div className="bg-white/5 border border-white/10 rounded-[4rem] p-10 md:p-16 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12"><Activity size={180}/></div>
                      
                      <div className="relative z-10 space-y-12">
                         <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black font-serif uppercase text-white">Institutional Forecast</h3>
                            <div className="px-4 py-1.5 bg-signal-gold/10 rounded-xl border border-signal-gold/20 flex items-center space-x-2">
                               <div className={`w-2 h-2 rounded-full ${totals.netProfit >= 0 ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`}></div>
                               <span className="text-[9px] font-black uppercase text-signal-gold">Solvency Status: {totals.netProfit >= 0 ? 'Verified' : 'Exposure Risk'}</span>
                            </div>
                         </div>

                         <div className="space-y-8">
                            <div className="flex items-center justify-between">
                               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Market Pressure Threshold</p>
                               <p className="text-lg font-black text-white">$2.10 <span className="text-xs text-slate-500">Benchmark</span></p>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                               <div className={`h-full rounded-full transition-all duration-1000 ${totals.cpm > 2.1 ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.5)]'}`} style={{ width: `${Math.min(100, (totals.cpm / 3.5) * 100)}%` }}></div>
                            </div>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-2xl italic">
                               {totals.cpm > 2.1 
                                 ? "Current structural overhead exceeds market efficiency standards. Immediate reduction in fixed structural costs recommended." 
                                 : "Entity maintains efficient structural overhead. Operational expansion viable under current rate environment."}
                            </p>
                         </div>
                      </div>
                   </div>

                   <section className="bg-authority-blue text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120}/></div>
                      <div className="relative z-10 space-y-12">
                         <div>
                            <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-white mb-2">Neural Strategic Review</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold opacity-60">Thinking Terminal Active</p>
                         </div>

                         {isAnalyzing ? (
                           <div className="py-20 flex flex-col items-center justify-center space-y-6">
                              <Loader2 className="animate-spin text-signal-gold" size={48} />
                              <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Analyzing Economic Structural Integrity...</p>
                           </div>
                         ) : aiAnalysis ? (
                           <div className="space-y-10 animate-in fade-in">
                              <div className="text-lg font-medium leading-relaxed prose prose-invert max-w-none border-l-4 border-signal-gold/30 pl-10">
                                 {aiAnalysis.split('\n').map((line, i) => <p key={i} className="mb-6">{line}</p>)}
                              </div>
                              <button onClick={performAIAnalysis} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-signal-gold hover:text-white transition-colors">
                                 Re-Synthesize Perspective <ArrowRight className="ml-2" size={14}/>
                              </button>
                           </div>
                         ) : (
                           <div className="py-12">
                              <button onClick={performAIAnalysis} className="w-full bg-signal-gold text-authority-blue py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center">
                                 Synthesize Strategic Review <Sparkles className="ml-3" size={20}/>
                              </button>
                           </div>
                         )}
                      </div>
                   </section>
                </div>

                {/* System Controls Column */}
                <aside className="lg:col-span-4 space-y-8">
                   <div className="bg-[#0F172A] border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-xl">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 flex items-center border-b border-white/5 pb-6">
                        <Save size={16} className="mr-3" /> Registry Controls
                      </h4>
                      <div className="space-y-4">
                         <button onClick={handleSaveProfile} disabled={saveStatus !== 'idle'} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all ${saveStatus==='saved' ? 'bg-green-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'}`}>
                            {saveStatus==='saving' ? <Loader2 size={16} className="animate-spin"/> : saveStatus==='saved' ? <CheckCircle2 size={16}/> : <Save size={16}/>}
                            {saveStatus==='saved' ? 'Sync Complete' : 'Sync to Registry'}
                         </button>
                         <button onClick={exportCSV} className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-300 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                            <FileDown size={16}/> Export Diagnostic CSV
                         </button>
                      </div>
                   </div>

                   <div className="bg-gradient-to-br from-signal-gold/10 to-transparent border border-signal-gold/20 p-10 rounded-[3rem] space-y-6 shadow-2xl">
                      <div className="w-12 h-12 bg-signal-gold text-authority-blue rounded-xl flex items-center justify-center shadow-lg"><ShieldCheck size={28}/></div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">Institutional Standard</h4>
                      <p className="text-sm font-medium text-slate-400 leading-relaxed italic">"A carrier's solvency is not determined by its freight; it is determined by its stewardship of the operating margins. Order precedes revenue."</p>
                      <div className="pt-6 border-t border-white/5">
                         <Link to="/reach-test" className="text-[10px] font-black uppercase tracking-widest text-signal-gold hover:underline flex items-center">Verify Structural Readiness <ChevronRight size={14} className="ml-1"/></Link>
                      </div>
                   </div>

                   <button onClick={() => setActiveStep(0)} className="w-full py-6 text-slate-500 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center transition-all">
                      <RefreshCw size={14} className="mr-3"/> Reset Economic Engine
                   </button>
                </aside>
             </div>
          </div>
        )}

      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media print {
          .fixed, button, aside, .pt-40 { display: none !important; }
          main { padding: 0 !important; color: black !important; }
          .bg-[#020617], .bg-[#0F172A] { background: white !important; }
          .text-white, .text-slate-200 { color: black !important; }
          .border-white\/5 { border-color: #eee !important; }
          .legibility-container { max-width: 100% !important; padding: 0 !important; }
          h1, h2, h3, .text-3xl { color: #1e3a5f !important; }
        }
      `}</style>
    </div>
  );
};

const RefreshCw = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>
  </svg>
);

export default TCOCalculatorPage;