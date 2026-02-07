import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  XCircle, 
  Shield, 
  Target,
  FileText,
  Clock,
  Briefcase,
  Wallet,
  Users,
  Printer,
  ChevronRight,
  Loader2,
  Mail,
  Scale,
  Zap,
  ShieldAlert,
  Truck,
  Lock,
  ExternalLink,
  ClipboardCheck,
  Home,
  CheckCircle,
  Verified,
  Award
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

interface Question {
  id: string;
  text: string;
  helperText?: string;
  options: {
    label: string;
    text: string;
    points: number;
    flag?: 'RED' | 'YELLOW';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'capital',
    text: "Capitalization: Available startup capital?",
    helperText: "Verified liquid assets and credit capacity.",
    options: [
      { label: 'A', text: 'Less than $10,000', points: 0, flag: 'RED' },
      { label: 'B', text: '$10,000 – $19,999', points: 1, flag: 'YELLOW' },
      { label: 'C', text: '$20,000 – $34,999', points: 2 },
      { label: 'D', text: '$35,000 – $50,000', points: 3 },
      { label: 'E', text: 'More than $50,000', points: 4 }
    ]
  },
  {
    id: 'reserves',
    text: "Runway: Household expense coverage?",
    options: [
      { label: 'A', text: 'Less than 1 month', points: 0, flag: 'RED' },
      { label: 'B', text: '1–2 months', points: 1, flag: 'YELLOW' },
      { label: 'C', text: '3–4 months', points: 2 },
      { label: 'D', text: '5–6 months', points: 3 },
      { label: 'E', text: 'More than 6 months', points: 4 }
    ]
  },
  {
    id: 'support',
    text: "Stewardship: Household alignment?",
    options: [
      { label: 'A', text: 'Not yet disclosed', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'Household opposition', points: 0, flag: 'RED' },
      { label: 'C', text: 'General support', points: 2 },
      { label: 'D', text: 'Support without plan', points: 3 },
      { label: 'E', text: 'Full alignment', points: 4 }
    ]
  },
  {
    id: 'time',
    text: "Capacity: Weekly hours for admin?",
    options: [
      { label: 'A', text: 'Minimal (<10h)', points: 0, flag: 'RED' },
      { label: 'B', text: 'Partial (15–25h)', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'Substantial (25–40h)', points: 3 },
      { label: 'D', text: 'Primary (40h+)', points: 4 }
    ]
  },
  {
    id: 'experience',
    text: "Background: Commercial driving record?",
    options: [
      { label: 'A', text: 'Initial phase (Pre-CDL)', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'CDL, no record', points: 1 },
      { label: 'C', text: '<12 months driving', points: 2 },
      { label: 'D', text: '1–3 years driving', points: 3 },
      { label: 'E', text: '3+ years driving', points: 4 }
    ]
  },
  {
    id: 'awareness',
    text: "Literacy: Federal audit criteria understanding?",
    options: [
      { label: 'A', text: 'Unfamiliar', points: 0 },
      { label: 'B', text: 'General awareness', points: 1 },
      { label: 'C', text: 'Basic framework knowledge', points: 2 },
      { label: 'D', text: 'Advanced research', points: 3 },
      { label: 'E', text: 'High literacy', points: 4 }
    ]
  },
  {
    id: 'risk',
    text: "Risk: Response to major setbacks?",
    options: [
      { label: 'A', text: 'Operational termination', points: 0, flag: 'RED' },
      { label: 'B', text: 'Significant struggle', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'Driven adaptation', points: 2 },
      { label: 'D', text: 'Absorption via plan', points: 3 },
      { label: 'E', text: 'Expected volatility managed', points: 4 }
    ]
  }
];

const StewardshipAlignmentBlock = ({ status }: { status: 'Verified' | 'Unverified' | 'Misaligned' }) => (
  <div className={`p-6 sm:p-10 rounded-3xl sm:rounded-[3rem] border-2 ${
    status === 'Verified' ? 'bg-green-50/30 border-green-100' :
    status === 'Misaligned' ? 'bg-red-50/30 border-red-100' : 'bg-amber-50/30 border-amber-100'
  }`}>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">System Component</h3>
        <h4 className="text-lg font-black text-authority-blue uppercase leading-tight">STEWARDSHIP ALIGNMENT</h4>
      </div>
      <div className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center w-fit ${
        status === 'Verified' ? 'bg-green-600 text-white' : status === 'Misaligned' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
      }`}>
        {status}
      </div>
    </div>
    <p className="text-sm font-medium text-slate-500 leading-relaxed">
      {status === 'Verified' ? "Alignment confirmed. Strategic continuity supported." : "Operational exposure detected or unverified. Address before launch."}
    </p>
  </div>
);

const ReadinessPage = () => {
  const [step, setStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.title = "Readiness Assessment | LaunchPath Carrier Diagnostic";
    const update = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };
    update('meta[name="description"]', "Are you ready to launch? Evaluate your capital, household alignment, and compliance posture before you file for authority. Know where you stand.");
    update('meta[property="og:title"]', "Readiness Assessment | LaunchPath");
    update('meta[property="og:description"]', "Evaluate your readiness across the Four Pillars before you launch. GO, WAIT, or NO-GO.");
    update('meta[property="og:type"]', "website");
  }, []);

  const totalScore = answers.reduce((acc, curr, idx) => curr === -1 ? acc : acc + QUESTIONS[idx].options[curr].points, 0);
  const redFlags = answers.filter((ans, idx) => ans !== -1 && QUESTIONS[idx].options[ans].flag === 'RED').length;
  const yellowFlags = answers.filter((ans, idx) => ans !== -1 && QUESTIONS[idx].options[ans].flag === 'YELLOW').length;

  let resultType: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
  if (redFlags > 0 || totalScore < 14) resultType = 'RED';
  else if (yellowFlags > 0 || totalScore < 21) resultType = 'YELLOW';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (db) await addDoc(collection(db, "readinessAssessments"), { email, totalScore, resultType, createdAt: serverTimestamp() });
      setStep(9);
    } catch (error) { setStep(9); } finally { setLoading(false); }
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans text-authority-blue overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-5 py-12 sm:py-24 min-h-[80vh] flex flex-col">
        
        {/* STEP 0 */}
        {step === 0 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center">
            <ShieldCheck size={48} className="mx-auto mb-8 text-authority-blue/20" />
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-serif uppercase tracking-tight mb-6">
              Classification <span className="text-signal-gold italic">Assessment</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
              Evaluates structural readiness for carrier implementation. results map to risk exposure levels.
            </p>
            <button onClick={() => setStep(1)} className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl mx-auto flex items-center active:scale-95">
              Initiate Assessment <ChevronRight className="ml-2" size={16} />
            </button>
          </div>
        )}

        {/* QUESTIONS 1-7 */}
        {step >= 1 && step <= 7 && (
          <div className="animate-reveal-up flex-grow">
            <div className="max-w-xl mx-auto mb-8 sm:mb-12">
              <div className="flex justify-between text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                <span>Step {step} of 7</span>
                <span>{Math.round((step / 7) * 100)}% Complete</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-authority-blue transition-all" style={{width:`${(step/7)*100}%`}}></div></div>
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-serif uppercase mb-8 leading-tight">{QUESTIONS[step-1].text}</h2>
            <div className="space-y-3 sm:space-y-4 mb-12">
              {QUESTIONS[step-1].options.map((opt, i) => (
                <button key={i} onClick={() => { const n=[...answers]; n[step-1]=i; setAnswers(n); setTimeout(()=>setStep(step+1), 300); }} className="w-full text-left p-5 sm:p-6 rounded-2xl border-2 border-slate-100 bg-white hover:border-authority-blue transition-all flex items-center">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg flex items-center justify-center mr-4 text-xs font-black">{opt.label}</span>
                  <span className="text-sm sm:text-lg font-bold">{opt.text}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(step-1)} className="text-[10px] font-black uppercase text-slate-300 flex items-center hover:text-authority-blue"><ArrowLeft size={12} className="mr-2" /> Back</button>
          </div>
        )}

        {/* REVIEW 8 */}
        {step === 8 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase mb-6">Results Ready</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="email" placeholder="Registry Email" className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-authority-blue outline-none font-bold" value={email} onChange={e=>setEmail(e.target.value)} />
              <div className="flex items-start text-left space-x-3">
                <input type="checkbox" className="mt-1" checked={consent} onChange={e=>setConsent(e.target.checked)} />
                <span className="text-[10px] text-slate-500 font-medium">I acknowledge that results are for educational purposes.</span>
              </div>
              <button disabled={loading || !consent} className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "View Classification"}
              </button>
            </form>
          </div>
        )}

        {/* RESULTS 9 */}
        {step === 9 && (
          <div className="animate-reveal-up space-y-12 sm:space-y-16 pb-12 sm:pb-20">
            <div className="text-center">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl ${resultType==='GREEN'?'bg-green-50 text-green-600':resultType==='YELLOW'?'bg-amber-50 text-amber-600':'bg-red-50 text-red-700'}`}>
                {resultType==='GREEN'?<ShieldCheck size={48}/>:resultType==='YELLOW'?<AlertCircle size={48}/>:<XCircle size={48}/>}
              </div>
              <h1 className="text-3xl sm:text-6xl font-black font-serif text-authority-blue uppercase leading-tight">
                Classification: <br/><span className={resultType==='GREEN'?'text-green-600':resultType==='YELLOW'?'text-amber-600':'text-red-700'}>{resultType==='GREEN'?'READY.':resultType==='YELLOW'?'PREPARATION REQ.':'NOT RECOMMENDED.'}</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-authority-blue mb-6">Verification Points</h3>
                <ul className="space-y-4">
                  {["Capitalization", "Household runway", "Admin capacity", "Stewardship alignment"].map((text, i) => (
                    <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-500"><CheckCircle size={16} className="text-green-500" /> <span>{text}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-authority-blue text-white p-8 sm:p-10 rounded-3xl shadow-2xl">
                 <h3 className="text-[10px] font-black uppercase text-signal-gold mb-4">Meaning</h3>
                 <p className="text-base sm:text-lg leading-relaxed font-medium italic">{resultType==='GREEN'?"Entity meets foundational criteria for admission.":"Entity displays structural fragility. Redirection recommended."}</p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-100">
              <Link to={resultType==='GREEN'?'/pricing':'/resources'} className="bg-authority-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl inline-block">
                {resultType==='GREEN'?'Initiate Admission':'View Resources'}
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReadinessPage;