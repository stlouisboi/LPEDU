import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
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
  Award, 
  BarChart3, 
  FileText, 
  PieChart, 
  LineChart,
  // Added Globe to fix the error on line 504
  Globe,
  Share2,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import OpenAI from 'openai';

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

// Added TechnicalPattern component definition to fix the error on line 421
const TechnicalPattern = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '120px 120px' }}></div>
  </div>
);

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
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q1 = params.get('q1');
    if (q1) {
      const score = parseInt(q1);
      if (score === 0) setFixedCosts(prev => ({ ...prev, other: 1000 }));
    }
    
    const result = params.get('result');
    if (result) {
      setActiveStep(1);
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
    const totalMonthlyExpense = totalFixed + totalVarCosts;
    const netProfit = actualGrossRevenue - totalMonthlyExpense;
    const cpm = totalMonthlyExpense / (Math.max(1, Number(operation.monthlyMiles) || 1));
    const breakEvenRate = paidMilesFactor > 0 ? (cpm / paidMilesFactor) : 99.99;

    return { totalFixed, totalVarPerMile, netProfit, cpm, breakEvenRate, margin: actualGrossRevenue > 0 ? (netProfit / actualGrossRevenue) * 100 : 0, actualGrossRevenue, totalMonthlyExpense };
  }, [fixedCosts, variableCosts, operation]);

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const client = new OpenAI();
      const prompt = `You are an institutional compliance and financial advisor for motor carriers. Analyze this trucking operation's Total Cost of Ownership:

**FINANCIAL METRICS:**
- Total Fixed Costs: $${totals.totalFixed.toFixed(2)}/month
- Variable Cost Per Mile: $${totals.totalVarPerMile.toFixed(2)}/mile
- Monthly Miles: ${operation.monthlyMiles.toLocaleString()}
- Rate Per Mile: $${operation.ratePerMile.toFixed(2)}
- Deadhead: ${operation.deadheadPercentage}%
- Gross Revenue: $${totals.actualGrossRevenue.toFixed(2)}/month
- Total Monthly Expense: $${totals.totalMonthlyExpense.toFixed(2)}/month
- Net Profit: $${totals.netProfit.toFixed(2)}/month
- Profit Margin: ${totals.margin.toFixed(2)}%
- Cost Per Mile: $${totals.cpm.toFixed(2)}/mile
- Break-Even Rate: $${totals.breakEvenRate.toFixed(2)}/mile

Provide a concise, authoritative analysis with:
1. **SOLVENCY ASSESSMENT** - Current financial health and sustainability
2. **CRITICAL VULNERABILITIES** - Top 2-3 specific risks to authority/operations
3. **TACTICAL CORRECTIONS** - 3 specific, actionable improvements with expected impact

Use institutional, consequence-based language. Be direct. No fluff. Format with markdown headers and bullet points.`;
      
      const response = await client.chat.completions.create({
        model: 'gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      const analysis = response.choices[0]?.message?.content || "Analysis complete. No recommendations generated.";
      setAiAnalysis(analysis);
    } catch (err) {
      console.error('AI Analysis Error:', err);
      setAiAnalysis("**ANALYSIS TERMINAL FAULT**\n\nUnable to synthesize strategic review. System may be offline or credentials invalid. Manual review recommended.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextStep = () => setActiveStep(prev => prev + 1);
  const prevStep = () => setActiveStep(prev => prev - 1);

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleShare = async () => {
    const data = { fixedCosts, variableCosts, operation };
    const encoded = btoa(JSON.stringify(data));
    const shareUrl = `${window.location.origin}/tco-calculator?data=${encoded}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const loadDemoData = () => {
    setFixedCosts({
      truckPayment: 2200,
      insurance: 1500,
      permits: 100,
      parking: 250,
      software: 80,
      other: 0
    });
    setVariableCosts({
      fuelPrice: 4.25,
      mpg: 7.5,
      maintenance: 0.15,
      tires: 0.03,
      tolls: 0.05
    });
    setOperation({
      monthlyMiles: 8000,
      ratePerMile: 2.50,
      deadheadPercentage: 15
    });
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
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-signal-gold/20 overflow-x-hidden">
      
      {/* STEALTH HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5 flex items-center justify-between shadow-2xl">
         <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <Logo className="h-8" light />
            <div className="hidden xs:block">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold leading-none mb-1">Economic Engine v4.0</p>
               <p className="text-xs font-bold text-white uppercase tracking-widest opacity-60">Authorized Assessment Terminal</p>
            </div>
         </Link>
         {activeStep > 0 && activeStep < 4 && (
           <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className={`h-1.5 w-12 rounded-full transition-all duration-700 ${activeStep >= i ? 'bg-signal-gold shadow-[0_0_10px_rgba(198,146,42,0.5)]' : 'bg-white/10'}`}></div>
                 ))}
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Step {activeStep} / 3</p>
           </div>
         )}
         <div className="flex items-center space-x-4">
            <button onClick={handleShare} className="p-2 text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95" title={shareStatus === 'copied' ? 'Link Copied!' : 'Share Results'}>
              {shareStatus === 'copied' ? <Check size={20} className="text-green-400"/> : <Share2 size={20}/>}
            </button>
            <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-95" title="Print Analysis"><Printer size={20}/></button>
            <button onClick={() => setActiveStep(4)} className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all hover:border-signal-gold/30">Summary</button>
         </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pt-32 sm:pt-48 pb-32 min-h-screen">
        
        {/* STEP 0: START */}
        {activeStep === 0 && (
          <div className="max-w-3xl mx-auto text-center space-y-12 animate-reveal-up py-24">
            <div className="relative inline-block">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-[2.5rem] sm:rounded-[3.5rem] flex items-center justify-center mx-auto shadow-inner border border-white/10">
                 <Target size={48} sm:size={64} className="text-signal-gold" />
              </div>
              <div className="absolute inset-0 bg-signal-gold/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="space-y-6">
               <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-serif uppercase tracking-tighter text-white leading-[0.85]">
                 THE ECONOMIC <br/><span className="text-signal-gold italic">ENGINE.</span>
               </h1>
               <div className="h-1 w-24 bg-signal-gold mx-auto"></div>
               <p className="text-xl sm:text-2xl text-slate-400 font-bold leading-relaxed max-w-xl mx-auto uppercase tracking-tighter">
                 Revenue without margin analysis is busyness. Establish your clinical cost-per-mile baseline before operational commencement.
               </p>
            </div>
            
            {/* Instructions */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto text-left space-y-4">
              <div className="flex items-center space-x-3 text-signal-gold mb-4">
                <Info size={24} />
                <h3 className="text-sm font-black uppercase tracking-widest">How to Use This Calculator</h3>
              </div>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p><span className="text-signal-gold font-bold">Step 1:</span> Enter your monthly fixed costs (truck payment, insurance, permits, etc.)</p>
                <p><span className="text-signal-gold font-bold">Step 2:</span> Input variable costs (fuel price, MPG, maintenance, tires, tolls)</p>
                <p><span className="text-signal-gold font-bold">Step 3:</span> Define your operation (monthly miles, rate per mile, deadhead %)</p>
                <p><span className="text-signal-gold font-bold">Step 4:</span> Review your complete analysis with AI-powered recommendations</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500 italic">💡 Tip: Not sure where to start? Load demo data to see an example calculation.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => { loadDemoData(); nextStep(); }} className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white/10 transition-all active:scale-95">
                 LOAD DEMO DATA
              </button>
              <button onClick={nextStep} className="bg-signal-gold text-authority-blue px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_30px_60px_rgba(198,146,42,0.3)] hover:scale-105 transition-all active:scale-95 border-b-[10px] border-slate-900 group">
                 START FRESH <ChevronRight className="inline ml-3 group-hover:translate-x-2 transition-transform" size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: FIXED COSTS */}
        {activeStep === 1 && (
          <div className="w-full max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="space-y-6">
                <div className="flex items-center space-x-4 text-signal-gold">
                   <ShieldAlert size={28} />
                   <h2 className="text-xs font-black uppercase tracking-[0.5em]">01_FIXED_STRUCTURAL_COSTS</h2>
                </div>
                <p className="text-2xl sm:text-3xl text-white font-black uppercase tracking-tight">Monthly overhead that persists regardless of utilization.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {[
                  { label: "Equipment Payment", id: "truckPayment", info: "Monthly finance or lease obligation." },
                  { label: "Insurance Premium", id: "insurance", info: "Monthly primary liability and cargo installment." },
                  { label: "Parking & Storage", id: "parking", info: "Secured terminal or lot fees." },
                  { label: "Permits & Compliance", id: "permits", info: "ELD service, permits, and filings." },
                  { label: "Enterprise Software", id: "software", info: "TMS, load boards, accounting tools." },
                  { label: "Reserved Overhead", id: "other", info: "Other non-varying monthly costs." }
                ].map((input) => (
                  <div key={input.id} className="space-y-4 group">
                     <div className="flex justify-between items-end ml-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-signal-gold transition-colors">{input.label}</label>
                       <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{input.info}</span>
                     </div>
                     <div className="relative">
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 font-black text-3xl">$</span>
                        <input 
                          type="number" 
                          value={fixedCosts[input.id as keyof FixedCosts]} 
                          onChange={e => setFixedCosts({...fixedCosts, [input.id]: parseFloat(e.target.value) || 0})}
                          className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[2.5rem] py-8 pl-16 pr-8 text-white font-black text-3xl sm:text-4xl focus:border-signal-gold outline-none shadow-inner transition-all hover:bg-black/20"
                        />
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-16 border-t border-white/5 flex flex-col sm:flex-row gap-8 sm:justify-between items-center">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-all hover:scale-105 active:scale-95"><ChevronLeft className="mr-2" size={16}/> PREVIOUS</button>
                <button onClick={nextStep} className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-signal-gold transition-all shadow-2xl flex items-center justify-center group active:scale-95">CONTINUE_VARIABLE_INPUT <ChevronRight className="ml-3 group-hover:translate-x-1" size={18}/></button>
             </div>
          </div>
        )}

        {/* STEP 2: VARIABLE COSTS */}
        {activeStep === 2 && (
          <div className="w-full max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="space-y-6">
                <div className="flex items-center space-x-4 text-signal-gold">
                   <Wrench size={28} />
                   <h2 className="text-xs font-black uppercase tracking-[0.5em]">02_VARIABLE_OPERATING_COSTS</h2>
                </div>
                <p className="text-2xl sm:text-3xl text-white font-black uppercase tracking-tight">Costs driven directly by active utilization and movement.</p>
             </div>

             <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Average Fuel Price (Diesel)</label>
                      <div className="relative">
                         <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 font-black text-3xl">$</span>
                         <input type="number" step="0.01" value={variableCosts.fuelPrice} onChange={e => setVariableCosts({...variableCosts, fuelPrice: parseFloat(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[2.5rem] py-8 pl-16 pr-8 text-white font-black text-3xl sm:text-4xl focus:border-signal-gold outline-none shadow-inner"/>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Asset Efficiency (MPG)</label>
                      <div className="relative">
                         <input type="number" step="0.1" value={variableCosts.mpg} onChange={e => setVariableCosts({...variableCosts, mpg: parseFloat(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[2.5rem] py-8 px-10 text-white font-black text-3xl sm:text-4xl focus:border-signal-gold outline-none shadow-inner"/>
                         <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/20 font-black text-xl">AVG_MPG</span>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                   {[
                     { label: "Maintenance Fund", id: "maintenance" },
                     { label: "Tire Replacement", id: "tires" },
                     { label: "Operational Tolls", id: "tolls" }
                   ].map(input => (
                     <div key={input.id} className="space-y-4 group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">{input.label} / Mi</label>
                        <div className="relative">
                           <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                           <input type="number" step="0.01" value={variableCosts[input.id as keyof VariableCosts]} onChange={e => setVariableCosts({...variableCosts, [input.id]: parseFloat(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-3xl py-6 pl-12 pr-6 text-white font-black text-2xl focus:border-signal-gold outline-none"/>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="p-10 bg-authority-blue/30 rounded-[3rem] border border-white/5 flex items-start space-x-8 shadow-inner">
                   <div className="p-4 bg-signal-gold/10 rounded-2xl text-signal-gold shrink-0 border border-signal-gold/20 shadow-lg"><Info size={28}/></div>
                   <div className="space-y-2">
                     <p className="text-xs font-black uppercase tracking-widest text-white">Stewardship Protocol</p>
                     <p className="text-base font-medium text-slate-400 leading-relaxed uppercase tracking-tight italic">"Maintenance reserves should be funded at a minimum of <span className="text-signal-gold font-black">$0.15 per mile</span> to mitigate terminal equipment failures."</p>
                   </div>
                </div>
             </div>

             <div className="pt-16 border-t border-white/5 flex flex-col sm:flex-row gap-8 sm:justify-between items-center">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-all"><ChevronLeft className="mr-2" size={16}/> PREVIOUS</button>
                <button onClick={nextStep} className="w-full sm:w-auto bg-white text-authority-blue px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-signal-gold transition-all shadow-2xl flex items-center justify-center group">UTILIZATION_TARGETS <ChevronRight className="ml-3 group-hover:translate-x-1" size={18}/></button>
             </div>
          </div>
        )}

        {/* STEP 3: OPERATIONAL GOALS */}
        {activeStep === 3 && (
          <div className="w-full max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-8 duration-700">
             <div className="space-y-6">
                <div className="flex items-center space-x-4 text-signal-gold">
                   <Activity size={28} />
                   <h2 className="text-xs font-black uppercase tracking-[0.5em]">03_OPERATIONAL_UTILIZATION</h2>
                </div>
                <p className="text-2xl sm:text-3xl text-white font-black uppercase tracking-tight">Define utilization targets and clinical market pricing.</p>
             </div>

             <div className="space-y-12">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-6">Target Total Monthly Mileage</label>
                   <input type="number" value={operation.monthlyMiles} onChange={e => setOperation({...operation, monthlyMiles: parseInt(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[3rem] py-8 px-12 text-white font-black text-4xl sm:text-6xl focus:border-signal-gold outline-none shadow-inner text-center sm:text-left"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-6">Gross Market RPM</label>
                      <div className="relative">
                         <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 font-black text-3xl">$</span>
                         <input type="number" step="0.05" value={operation.ratePerMile} onChange={e => setOperation({...operation, ratePerMile: parseFloat(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[2.5rem] py-8 pl-16 pr-8 text-white font-black text-3xl sm:text-4xl focus:border-signal-gold outline-none shadow-inner"/>
                         <span className="absolute right-10 top-1/2 -translate-y-1/2 text-white/10 font-bold uppercase text-sm tracking-widest">Rate_Target</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-6">Deadhead Percentage (%)</label>
                      <div className="relative">
                         <input type="number" value={operation.deadheadPercentage} onChange={e => setOperation({...operation, deadheadPercentage: parseInt(e.target.value) || 0})} className="w-full bg-[#0c1a2d] border-2 border-white/5 rounded-[2.5rem] py-8 px-10 text-white font-black text-3xl sm:text-4xl focus:border-signal-gold outline-none shadow-inner"/>
                         <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500/40 font-black text-3xl">%</span>
                      </div>
                   </div>
                </div>

                <div className="p-10 bg-red-500/5 rounded-[3rem] border border-red-500/10 flex items-start space-x-8 shadow-inner">
                   <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 shrink-0 border border-red-500/20"><TrendingDown size={28}/></div>
                   <div className="space-y-2">
                     <p className="text-xs font-black uppercase tracking-widest text-red-500">Unbillable Exposure Alert</p>
                     <p className="text-base font-medium text-slate-400 leading-relaxed uppercase tracking-tight italic">"Every percentage point of deadhead requires an exponential increase in billable RPM to maintain authority solvency."</p>
                   </div>
                </div>
             </div>

             <div className="pt-16 border-t border-white/5 flex flex-col sm:flex-row gap-8 sm:justify-between items-center">
                <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center transition-all"><ChevronLeft className="mr-2" size={16}/> PREVIOUS</button>
                <button onClick={nextStep} className="w-full sm:w-auto bg-signal-gold text-authority-blue px-14 py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-[0_30px_60px_rgba(198,146,42,0.4)] hover:scale-105 transition-all active:scale-95 flex items-center justify-center border-b-[10px] border-slate-900 group">SYNTHESIZE_ECONOMIC_SUMMARY <ChevronRight className="ml-3" size={20}/></button>
             </div>
          </div>
        )}

        {/* STEP 4: SUMMARY & ANALYSIS (WORLD CLASS REDESIGN) */}
        {activeStep === 4 && (
          <div className="w-full space-y-16 animate-in fade-in duration-1000 max-w-6xl mx-auto">
             
             {/* HEADER BRIEF */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 gap-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-3 bg-signal-gold/10 border border-signal-gold/30 px-5 py-2 rounded-full">
                    <ShieldCheck size={14} className="text-signal-gold" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold">FISCAL_DIAGNOSTIC_BRIEF</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-black font-serif text-white uppercase tracking-tighter leading-none">THE EXECUTIVE <br/><span className="text-signal-gold italic">SUMMARY.</span></h2>
                </div>
                <div className="flex items-center space-x-4">
                   <button onClick={exportCSV} className="flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                      <FileDown size={14} /> <span>Download CSV</span>
                   </button>
                   <button onClick={() => window.print()} className="flex items-center space-x-3 bg-signal-gold text-primary-dark px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                      <Printer size={14} /> <span>Print Brief</span>
                   </button>
                </div>
             </div>

             {/* KEY PERFORMANCE INDICATORS */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Cost Per Mile", val: totals.cpm.toFixed(4), unit: "/MI", icon: <Zap size={18}/>, status: totals.cpm < 2.1 ? 'OPTIMIZED' : 'EXPOSURE' },
                  { label: "Break-Even RPM", val: totals.breakEvenRate.toFixed(4), unit: "/MI", icon: <Award size={18}/>, status: 'STND' },
                  { label: "Monthly Margin", val: totals.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 }), unit: "/MO", icon: <DollarSign size={18}/>, color: totals.netProfit >= 0 ? 'text-emerald-400' : 'text-red-500', status: totals.netProfit >= 0 ? 'SOLVENT' : 'INSOLVENT' },
                  { label: "Profit Percentage", val: totals.margin.toFixed(2), unit: "%", icon: <Activity size={18}/>, status: totals.margin > 15 ? 'ELITE' : 'STABILIZED' }
                ].map((metric, i) => (
                  <div key={i} className="bg-[#0F172A] border-2 border-white/5 p-10 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">{metric.icon}</div>
                     <div className="flex justify-between items-start mb-10">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">{metric.label}</p>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${metric.status === 'INSOLVENT' || metric.status === 'EXPOSURE' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{metric.status}</span>
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className={`text-3xl sm:text-4xl font-black tracking-tighter ${metric.color || 'text-white'}`}>${metric.val}</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">{metric.unit}</span>
                     </div>
                  </div>
                ))}
             </div>

             {/* DIAGNOSTIC VISUALIZATION */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                <div className="lg:col-span-7 bg-white/5 border-2 border-white/5 rounded-[4rem] p-12 md:p-16 relative overflow-hidden flex flex-col justify-between group shadow-inner">
                   <TechnicalPattern />
                   <div className="relative z-10 space-y-12">
                      <div className="flex items-center space-x-6">
                         <div className="w-16 h-16 bg-[#0c1a2d] rounded-2xl flex items-center justify-center text-signal-gold border border-white/10 shadow-2xl">
                           <BarChart3 size={32} />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black font-serif uppercase text-white">Efficiency Variance Analysis</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Benchmark: Market_STND_2026</p>
                         </div>
                      </div>

                      <div className="space-y-10">
                         <div className="space-y-6">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                               <span className="text-slate-400">Current Structural CPM</span>
                               <span className="text-white">${totals.cpm.toFixed(3)}</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                               <div className={`h-full rounded-full transition-all duration-1000 ${totals.cpm > 2.1 ? 'bg-gradient-to-r from-red-500 to-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`} style={{ width: `${Math.min(100, (totals.cpm / 3.5) * 100)}%` }}></div>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-3 p-8 bg-black/40 rounded-3xl border border-white/5">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gross Monthly Rev</p>
                               <p className="text-3xl font-black text-white">${totals.actualGrossRevenue.toLocaleString()}</p>
                            </div>
                            <div className="space-y-3 p-8 bg-black/40 rounded-3xl border border-white/5">
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Monthly Exp</p>
                               <p className="text-3xl font-black text-white">${totals.totalMonthlyExpense.toLocaleString()}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-12 pt-8 border-t border-white/5 relative z-10 flex items-center space-x-4">
                      <ShieldAlert size={16} className="text-signal-gold" />
                      <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                         {totals.cpm > 2.1 
                           ? "OVERHEAD_CRITICAL: Corrective cost containment required to stabilize authority profile." 
                           : "OVERHEAD_OPTIMAL: Entity shows structural resilience for market utilization scaling."}
                      </p>
                   </div>
                </div>

                <div className="lg:col-span-5 flex flex-col space-y-10">
                   <div className="bg-authority-blue p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden flex-grow border-t-8 border-signal-gold">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120}/></div>
                      <div className="relative z-10 space-y-10">
                         <div className="space-y-3">
                            <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-white leading-none">Neural Insights</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-signal-gold opacity-60">Advisor Terminal v4.2 Active</p>
                         </div>

                         {isAnalyzing ? (
                           <div className="py-20 flex flex-col items-center justify-center space-y-6">
                              <Loader2 className="animate-spin text-signal-gold" size={48} />
                              <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Analyzing Solvency Vectors...</p>
                           </div>
                         ) : aiAnalysis ? (
                           <div className="space-y-8 animate-in fade-in">
                              <div className="text-sm leading-relaxed border-l-4 border-signal-gold/30 pl-6 custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
                                 {aiAnalysis.split('\n').map((line, i) => {
                                   // Handle markdown bold headers
                                   if (line.startsWith('**') && line.endsWith('**')) {
                                     const text = line.replace(/\*\*/g, '');
                                     return <h4 key={i} className="text-base font-black uppercase tracking-wider text-signal-gold mt-6 mb-3 first:mt-0">{text}</h4>;
                                   }
                                   // Handle markdown headers with #
                                   if (line.startsWith('###')) {
                                     return <h4 key={i} className="text-base font-black uppercase tracking-wider text-signal-gold mt-6 mb-3 first:mt-0">{line.replace(/###/g, '').trim()}</h4>;
                                   }
                                   if (line.startsWith('##')) {
                                     return <h3 key={i} className="text-lg font-black uppercase tracking-wider text-signal-gold mt-6 mb-3 first:mt-0">{line.replace(/##/g, '').trim()}</h3>;
                                   }
                                   // Handle bullet points
                                   if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                                     const text = line.replace(/^[\s-•]+/, '');
                                     return <li key={i} className="text-white/90 mb-2 ml-4 list-disc">{text}</li>;
                                   }
                                   // Handle numbered lists
                                   if (/^\d+\./.test(line.trim())) {
                                     const text = line.replace(/^\d+\.\s*/, '');
                                     return <li key={i} className="text-white/90 mb-2 ml-4 list-decimal">{text}</li>;
                                   }
                                   // Regular paragraphs
                                   if (line.trim()) {
                                     return <p key={i} className="text-white/90 mb-3 leading-relaxed">{line}</p>;
                                   }
                                   // Empty lines for spacing
                                   return <div key={i} className="h-2"></div>;
                                 })}
                              </div>
                              <button onClick={performAIAnalysis} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-signal-gold hover:text-white transition-all hover:scale-105 active:scale-95">
                                 Re-Synthesize Report <RefreshCw className="ml-2" size={14}/>
                              </button>
                           </div>
                         ) : (
                           <div className="py-12">
                              <button onClick={performAIAnalysis} className="w-full bg-signal-gold text-authority-blue py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl active:scale-95 transition-all flex items-center justify-center hover:bg-white">
                                 SYNTHESIZE_STRATEGIC_REVIEW <Sparkles className="ml-3" size={20}/>
                              </button>
                           </div>
                         )}
                      </div>
                   </div>
                   
                   <div className="bg-[#0F172A] border border-white/5 p-10 rounded-[3.5rem] flex flex-col justify-center space-y-8 shadow-xl">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Registry Sync</span>
                         <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center">
                           <Globe size={10} className="mr-2" /> ONLINE
                         </span>
                      </div>
                      <button onClick={handleSaveProfile} disabled={saveStatus !== 'idle'} className={`w-full py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 transition-all active:scale-[0.98] ${saveStatus==='saved' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'}`}>
                         {saveStatus==='saving' ? <Loader2 size={18} className="animate-spin"/> : saveStatus==='saved' ? <CheckCircle2 size={18}/> : <Save size={18}/>}
                         {saveStatus==='saved' ? 'SYCHRONIZED' : 'SAVE_TO_REGISTRY'}
                      </button>
                   </div>
                </div>
             </div>

             <div className="pt-20 text-center opacity-30 flex flex-col items-center gap-6">
                <div className="flex items-center space-x-12">
                   <ShieldCheck size={32} />
                   <div className="h-px w-32 bg-white"></div>
                   <Activity size={32} />
                   <div className="h-px w-32 bg-white"></div>
                   <Award size={32} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white">Institutional Economic Guard System</p>
             </div>
          </div>
        )}

      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media print {
          .fixed, button, aside, .pt-48 { display: none !important; }
          main { padding: 40px !important; color: black !important; }
          .bg-[#020617], .bg-[#0F172A], .bg-[#0c1a2d] { background: white !important; }
          .text-white, .text-slate-200, .text-slate-400, .text-slate-500 { color: black !important; }
          .border-white\/5, .border-white\/10 { border-color: #eee !important; border-width: 1px !important; }
          h2, h3, .text-4xl, .text-6xl { color: #1e3a5f !important; }
          .shadow-2xl, .shadow-inner, .shadow-xl { shadow: none !important; }
          .bg-white\/5 { background: #f9f9f9 !important; }
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