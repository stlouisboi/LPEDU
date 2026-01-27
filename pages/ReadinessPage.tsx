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
  Home
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
    text: "Preliminary capitalization assessment: Available startup capital?",
    helperText: "Verified liquid assets, credit capacity, and secured financing components.",
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
    text: "Operational runway assessment: Post-startup household expense coverage?",
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
    text: "Stewardship alignment: Household understanding of operational demands?",
    options: [
      { label: 'A', text: 'Decision not yet disclosed to household', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'Household opposition or critical skepticism', points: 0, flag: 'RED' },
      { label: 'C', text: 'General support without technical understanding', points: 2 },
      { label: 'D', text: 'Support present without income disruption plan', points: 3 },
      { label: 'E', text: 'Full alignment with variable income contingency plan', points: 4 }
    ]
  },
  {
    id: 'time',
    text: "Administrative capacity: Weekly allocation for system implementation?",
    options: [
      { label: 'A', text: 'Minimal allocation (Concurrent full-time commitment)', points: 0, flag: 'RED' },
      { label: 'B', text: 'Partial allocation (15–25 hours/week)', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'Substantial allocation (25–40 hours/week)', points: 3 },
      { label: 'D', text: 'Primary dedication (40+ hours/week)', points: 4 }
    ]
  },
  {
    id: 'experience',
    text: "Operational background: Verified commercial driving experience?",
    options: [
      { label: 'A', text: 'Initial research phase (Pre-CDL)', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'CDL obtained without commercial driving record', points: 1 },
      { label: 'C', text: 'Less than 12 months commercial driving', points: 2 },
      { label: 'D', text: '1–3 years commercial driving', points: 3 },
      { label: 'E', text: 'Extensive background (3+ years)', points: 4 }
    ]
  },
  {
    id: 'awareness',
    text: "Regulatory literacy: Understanding of 49 CFR and New Entrant Audit criteria?",
    options: [
      { label: 'A', text: 'Unfamiliar with federal regulatory criteria', points: 0 },
      { label: 'B', text: 'General awareness without technical detail', points: 1 },
      { label: 'C', text: 'Basic understanding of compliance frameworks', points: 2 },
      { label: 'D', text: 'Advanced research into audit requirements', points: 3 },
      { label: 'E', text: 'High literacy in compliance systems', points: 4 }
    ]
  },
  {
    id: 'risk',
    text: "Risk mitigation profile: Response to significant operational setbacks?",
    options: [
      { label: 'A', text: 'Operational termination (Return to employment)', points: 0, flag: 'RED' },
      { label: 'B', text: 'Significant struggle without recovery protocol', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'Stress-driven adaptation and adjustment', points: 2 },
      { label: 'D', text: 'Absorption via established contingency plans', points: 3 },
      { label: 'E', text: 'Expected volatility managed via reserves and protocols', points: 4 }
    ]
  }
];

const StewardshipAlignmentBlock = ({ status }: { status: 'Verified' | 'Unverified' | 'Misaligned' }) => {
  const isGood = status === 'Verified';
  
  return (
    <div className={`p-10 rounded-[3rem] border-2 transition-all ${
      status === 'Verified' ? 'bg-green-50/30 border-green-100' :
      status === 'Misaligned' ? 'bg-red-50/30 border-red-100 shadow-lg' :
      'bg-amber-50/30 border-amber-100'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
            System Input Component
          </h3>
          <h4 className="text-xl font-black text-authority-blue dark:text-white uppercase tracking-tight">
            STEWARDSHIP ALIGNMENT — HOUSEHOLD OPERATING CONSENT
          </h4>
        </div>
        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center shrink-0 ${
          status === 'Verified' ? 'bg-green-600 text-white shadow-md' :
          status === 'Misaligned' ? 'bg-red-600 text-white shadow-md animate-pulse' :
          'bg-amber-500 text-white shadow-md'
        }`}>
          {status === 'Verified' ? <ShieldCheck size={14} className="mr-2" /> : <ShieldAlert size={14} className="mr-2" />}
          Status: {status}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm font-medium text-slate-500 dark:text-text-dark-muted leading-relaxed">
          {status === 'Verified' ? (
            "Verification of household alignment confirmed. Strategic continuity is supported by documented contingency plans for variable operational income."
          ) : status === 'Misaligned' ? (
            "Critical operational exposure detected. Lack of household alignment creates systemic instability that typically manifests as administrative default during high-pressure cycles."
          ) : (
            "Baseline alignment is currently unverified or incomplete. The technical dependency of household consent must be satisfied to ensure long-term operational refuge."
          )}
        </p>

        {!isGood && (
          <div className="pt-4 border-t border-slate-100 dark:border-border-dark flex items-center">
            <Link 
              to="/resources" 
              className="inline-flex items-center space-x-3 text-authority-blue dark:text-signal-gold font-black uppercase tracking-widest text-[11px] hover:underline group"
            >
              <span>Initiate Stewardship Alignment Review</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const ReadinessPage = () => {
  const [step, setStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(0, prev - 1));

  const selectOption = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = index;
    setAnswers(newAnswers);
    setTimeout(handleNext, 300);
  };

  const totalScore = answers.reduce((acc, curr, idx) => {
    if (curr === -1) return acc;
    return acc + QUESTIONS[idx].options[curr].points;
  }, 0);

  const redFlags = answers.filter((ans, idx) => ans !== -1 && QUESTIONS[idx].options[ans].flag === 'RED').length;
  const yellowFlags = answers.filter((ans, idx) => ans !== -1 && QUESTIONS[idx].options[ans].flag === 'YELLOW').length;

  const getStewardshipStatus = (): 'Verified' | 'Unverified' | 'Misaligned' => {
    const ansIdx = answers[2];
    if (ansIdx === 4) return 'Verified'; 
    if (ansIdx === 1) return 'Misaligned'; 
    return 'Unverified'; 
  };

  let resultType: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
  if (redFlags > 0 || totalScore < 14) {
    resultType = 'RED';
  } else if (yellowFlags > 0 || totalScore < 21) {
    resultType = 'YELLOW';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setLoading(true);
    
    try {
      if (db) {
        await addDoc(collection(db, "readinessAssessments"), {
          email,
          totalScore,
          redFlags,
          yellowFlags,
          resultType,
          answers: answers.map((a, i) => ({ 
            question: QUESTIONS[i].text, 
            answer: QUESTIONS[i].options[a]?.text || 'N/A',
            points: QUESTIONS[i].options[a]?.points || 0,
            flag: QUESTIONS[i].options[a]?.flag || null
          })),
          createdAt: serverTimestamp()
        });
      }
      setStep(9);
    } catch (error) {
      setStep(9);
    } finally {
      setLoading(false);
    }
  };

  const renderProgress = () => {
    if (step < 1 || step > 7) return null;
    return (
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue">Classification Data {step} of 7</span>
          <span className="text-[10px] font-bold text-slate-400">{Math.round((step / 7) * 100)}% Data Mapped</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-authority-blue dark:bg-signal-gold transition-all duration-500" 
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans text-authority-blue">
      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32 min-h-screen flex flex-col">
        
        {/* --- STEP 0: LANDING --- */}
        {step === 0 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center">
            <div className="w-20 h-20 bg-authority-blue/5 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-authority-blue/10">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black font-serif uppercase tracking-tight mb-6 leading-tight">
              Institutional <span className="text-signal-gold italic">Classification Assessment</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Identification of structural readiness for carrier implementation. Results generate a preliminary risk exposure classification which may lead to approval, delay, or redirection.
            </p>
            <div className="space-y-6">
              <button 
                onClick={handleNext}
                className="bg-authority-blue text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center mx-auto group"
              >
                <span>Initiate Classification Assessment</span>
                <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                Data used for preliminary classification purposes only.
              </p>
            </div>
          </div>
        )}

        {/* --- STEPS 1-7: QUESTIONS --- */}
        {step >= 1 && step <= 7 && (
          <div className="animate-reveal-up flex-grow">
            {renderProgress()}
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-4 leading-tight">
                {QUESTIONS[step - 1].text}
              </h2>
              {QUESTIONS[step - 1].helperText && (
                <p className="text-lg text-slate-500 font-medium italic mb-8">{QUESTIONS[step - 1].helperText}</p>
              )}
            </div>

            <div className="space-y-4 mb-16">
              {QUESTIONS[step - 1].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={`w-full flex items-center text-left p-6 rounded-[2rem] border-2 transition-all group ${
                    answers[step - 1] === i 
                    ? 'border-authority-blue bg-white dark:bg-gray-800 shadow-xl ring-4 ring-authority-blue/5' 
                    : 'border-slate-200 dark:border-border-dark bg-white/50 hover:border-authority-blue/30 hover:bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mr-6 transition-colors ${
                    answers[step - 1] === i ? 'bg-authority-blue text-white' : 'bg-slate-100 dark:bg-gray-700 text-slate-400 group-hover:bg-authority-blue group-hover:text-white'
                  }`}>
                    {opt.label}
                  </div>
                  <span className="text-lg font-bold text-slate-700 dark:text-text-dark-primary">{opt.text}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto">
              <button onClick={handleBack} className="flex items-center space-x-2 text-slate-400 hover:text-authority-blue font-black uppercase tracking-[0.2em] text-[10px] transition-all">
                <ArrowLeft size={16} />
                <span>Reference Prior Data Point</span>
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 8: REVIEW --- */}
        {step === 8 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center">
            <div className="w-20 h-20 bg-slate-50 text-authority-blue rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-slate-100 shadow-lg">
              <FileText size={40} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black font-serif uppercase tracking-tight mb-6 leading-none">
              Classification Data Ready
            </h1>
            <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium max-w-xl mx-auto mb-12">
              Submit registry email to receive formal exposure classification and assessment result.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-left ml-4">Registry Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    required
                    type="email"
                    placeholder="jane@carrier.com"
                    className="w-full pl-16 pr-8 py-6 rounded-3xl border-2 border-slate-100 dark:bg-gray-800 dark:border-border-dark focus:border-authority-blue outline-none transition-all font-bold shadow-sm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-start text-left space-x-4">
                <input 
                  type="checkbox"
                  id="consent"
                  className="mt-1 w-5 h-5 accent-authority-blue rounded cursor-pointer"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                />
                <label htmlFor="consent" className="text-xs text-slate-500 font-medium leading-relaxed cursor-pointer">
                  I acknowledge LaunchPath will provide educational compliance notifications. Communication can be terminated at any time.
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading || !consent}
                className="w-full bg-authority-blue text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-3" /> : <ArrowRight className="mr-3" />}
                View Classification
              </button>

              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Assessment records are maintained in a secure registry.
              </p>
            </form>
          </div>
        )}

        {/* --- STEP 9: RESULTS --- */}
        {step === 9 && (
          <div ref={resultsRef} className="animate-reveal-up space-y-16 pb-20">
            
            {/* Header Classification Area */}
            <div className="text-center">
              <div className={`w-24 h-24 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border-4 shadow-2xl ${
                resultType === 'GREEN' ? 'bg-green-50 text-green-600 border-green-100' :
                resultType === 'YELLOW' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-red-50 text-red-700 border-red-100'
              }`}>
                {resultType === 'GREEN' ? <ShieldCheck size={56} /> : 
                 resultType === 'YELLOW' ? <AlertCircle size={56} /> : 
                 <XCircle size={56} />}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none">
                Classification: <br/>
                <span className={
                  resultType === 'GREEN' ? 'text-green-600 italic' :
                  resultType === 'YELLOW' ? 'text-amber-600 italic' :
                  'text-red-700 italic'
                }>
                  {resultType === 'GREEN' ? 'READY.' : 
                   resultType === 'YELLOW' ? 'PREPARATION REQ.' : 
                   'NOT RECOMMENDED.'}
                </span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
                {resultType === 'GREEN' ? 
                  "Assessment indicates the presence of structural prerequisites required for motor carrier operating standard implementation." :
                 resultType === 'YELLOW' ?
                  "Identified structural gaps create elevated risk. Addressing these indicators is recommended prior to system admission." :
                  "Assessments indicates significant structural risk. Operational launch at this stage would result in an extremely high probability of preventable failure."
                }
              </p>
            </div>

            {/* NEW: STEWARDSHIP ALIGNMENT VERIFICATION POINT */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                 <Home className="text-authority-blue" size={20} />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-authority-blue">Institutional Verification Point</span>
              </div>
              <StewardshipAlignmentBlock status={getStewardshipStatus()} />
            </section>

            {/* Grid for Analysis Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue mb-8 flex items-center">
                  <ClipboardCheck className="mr-3" size={16} /> Verification Points
                </h3>
                <ul className="space-y-6">
                  {[
                    { text: "Capitalization levels meeting thresholds", pass: answers[0] >= 2 },
                    { text: "Household runway alignment verified", pass: answers[1] >= 2 },
                    { text: "Allocation capacity for administrative files", pass: answers[3] >= 2 },
                    { text: "Stewardship alignment documented", pass: answers[2] >= 2 },
                    { text: "Risk contingency awareness confirmed", pass: answers[6] >= 2 }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      {item.pass ? (
                        <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                      ) : (
                        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
                      )}
                      <span className={`text-sm font-bold ${item.pass ? 'text-slate-700' : 'text-slate-400'} dark:text-text-dark-muted`}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-authority-blue text-white p-10 rounded-[3.5rem] relative overflow-hidden shadow-2xl flex flex-col">
                <Target className="absolute -bottom-10 -right-10 text-white/5" size={200} />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-signal-gold mb-6">Classification Meaning</h3>
                <p className="text-lg leading-relaxed font-medium italic flex-grow">
                  {resultType === 'GREEN' ? 
                    "Entity meets foundational criteria for admission. This indicates a baseline readiness for Technical Safety File installation." :
                   resultType === 'YELLOW' ?
                    "Entity displays structural fragility. Admission to Phase-specific modules is restricted until risk indicators are addressed." :
                    "Entity does not currently meet admission criteria. Strategic redirection to foundation-building protocols is required to maintain stewardship."
                  }
                </p>
                <div className="h-px w-full bg-white/10 my-8"></div>
                <div className="flex items-center space-x-3 text-signal-gold">
                  <Zap size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Registry Sync Status: {resultType === 'GREEN' ? 'ACTIVE' : 'HELD'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <section className="py-16 text-center border-t border-slate-100 dark:border-border-dark">
              <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-10">
                {resultType === 'GREEN' ? 'Initiate Formal Admission' : 
                 resultType === 'YELLOW' ? 'Address Gaps. Return When Validated.' : 
                 'Strategic Redirection Required.'}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                {resultType === 'GREEN' ? (
                  <Link to="/pricing" className="bg-authority-blue text-white px-16 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95">
                    Admission Terminal
                  </Link>
                ) : (
                  <Link to="/resources" className="bg-authority-blue text-white px-16 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-steel-blue transition-all shadow-xl active:scale-95">
                    Foundation Framework
                  </Link>
                )}
                
                <button onClick={() => window.print()} className="flex items-center space-x-2 text-slate-400 hover:text-authority-blue font-bold uppercase tracking-widest text-[10px] transition-all group">
                  <Printer size={16} className="group-hover:scale-110 transition-transform" />
                  <span>Generate Classification PDF</span>
                </button>
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
};

export default ReadinessPage;