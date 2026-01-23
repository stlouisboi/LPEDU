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
  Truck
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
    text: "How much capital do you have available to start your trucking business?",
    helperText: "Include savings, available credit you're willing to use, and secured financing.",
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
    text: "After startup costs, how many months of household expenses could you cover if you earned $0 from trucking?",
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
    text: "Does your spouse, partner, or household understand what starting a trucking business involves?",
    options: [
      { label: 'A', text: 'I haven\'t discussed it with them yet', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'They\'re skeptical or opposed', points: 0, flag: 'RED' },
      { label: 'C', text: 'They\'re supportive but don\'t fully understand the demands', points: 2 },
      { label: 'D', text: 'They understand and support me, but we haven\'t planned for income disruption', points: 3 },
      { label: 'E', text: 'They fully understand, support the decision, and we\'ve planned for variable income', points: 4 }
    ]
  },
  {
    id: 'time',
    text: "How much time can you dedicate to building and running your trucking business in the first 90 days?",
    options: [
      { label: 'A', text: 'A few hours per week (I have other full-time commitments)', points: 0, flag: 'RED' },
      { label: 'B', text: 'Part-time (15–25 hours/week)', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'Significant time (25–40 hours/week)', points: 3 },
      { label: 'D', text: 'Full-time dedication (40+ hours/week)', points: 4 }
    ]
  },
  {
    id: 'experience',
    text: "What is your commercial driving experience?",
    options: [
      { label: 'A', text: 'No CDL yet — still researching', points: 0, flag: 'YELLOW' },
      { label: 'B', text: 'CDL obtained, no commercial driving experience', points: 1 },
      { label: 'C', text: 'Less than 1 year of commercial driving', points: 2 },
      { label: 'D', text: '1–3 years of commercial driving', points: 3 },
      { label: 'E', text: 'More than 3 years of commercial driving', points: 4 }
    ]
  },
  {
    id: 'awareness',
    text: "How familiar are you with FMCSA regulations, DOT authority requirements, and the New Entrant Safety Audit?",
    options: [
      { label: 'A', text: 'I\'ve never heard of most of this', points: 0 },
      { label: 'B', text: 'I\'ve heard of it but don\'t understand the details', points: 1 },
      { label: 'C', text: 'I understand the basics but haven\'t studied the specifics', points: 2 },
      { label: 'D', text: 'I\'ve researched it and understand most requirements', points: 3 },
      { label: 'E', text: 'I\'m confident in my knowledge of compliance requirements', points: 4 }
    ]
  },
  {
    id: 'risk',
    text: "If you experienced a major setback in your first 90 days — loss of a contract, unexpected repair, insurance issue — how would you respond?",
    options: [
      { label: 'A', text: 'I would probably shut down and return to employment', points: 0, flag: 'RED' },
      { label: 'B', text: 'I would struggle significantly and might not recover', points: 1, flag: 'YELLOW' },
      { label: 'C', text: 'I would be stressed but could adapt with adjustments', points: 2 },
      { label: 'D', text: 'I have contingency plans and could absorb the impact', points: 3 },
      { label: 'E', text: 'I expect setbacks and have reserves and backup plans in place', points: 4 }
    ]
  }
];

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
      console.error("Failed to save assessment", error);
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
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-authority-blue">Question {step} of 7</span>
          <span className="text-[10px] font-bold text-slate-400">{Math.round((step / 7) * 100)}% Complete</span>
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
            <h1 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight mb-6 leading-none">
              Are You Actually Ready to <br/><span className="text-signal-gold italic">Start a Trucking Business?</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Answer 7 questions. 2 minutes. Find out if now is the right time — or if preparing first could protect your household and your investment.
            </p>
            <div className="space-y-6">
              <button 
                onClick={handleNext}
                className="bg-authority-blue text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-sm hover:bg-steel-blue transition-all shadow-2xl active:scale-95 flex items-center mx-auto group"
              >
                <span>Check My Readiness</span>
                <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                No spam. No sales pitch. Just an honest assessment.
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
              <button onClick={handleBack} className="flex items-center space-x-2 text-slate-400 hover:text-authority-blue font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 8: REVIEW & EMAIL --- */}
        {step === 8 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-green-100 shadow-lg">
              <FileText size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight mb-6">
              Your Results Are Ready
            </h1>
            <p className="text-lg text-slate-500 dark:text-text-dark-muted font-medium max-w-xl mx-auto mb-12">
              Enter your email to view your readiness assessment. You'll also receive a permanent copy for your records.
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
                  I understand LaunchPath will email me information about compliance education. I can unsubscribe anytime.
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading || !consent}
                className="w-full bg-authority-blue text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-steel-blue transition-all flex items-center justify-center disabled:opacity-50 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-3" /> : <ArrowRight className="mr-3" />}
                View My Results
              </button>

              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Your responses are used only to generate your assessment. <br/>We do not sell or share your information.
              </p>
            </form>
          </div>
        )}

        {/* --- STEP 9: RESULTS --- */}
        {step === 9 && (
          <div ref={resultsRef} className="animate-reveal-up space-y-12">
            
            {/* GREEN RESULT */}
            {resultType === 'GREEN' && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border-4 border-green-100 shadow-2xl">
                    <ShieldCheck size={56} />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6">
                    You Appear <span className="text-green-600 italic">Ready.</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
                    Based on your responses, you have the foundational elements in place to begin building a compliant motor carrier operation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-authority-blue mb-8">Verification Summary</h3>
                    <ul className="space-y-6">
                      {[
                        "Sufficient startup capital identified",
                        "Adequate household reserves stabilized",
                        "Time allocated for implementation",
                        "Household alignment on decision",
                        "Realistic expectations about setbacks"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start space-x-4">
                          <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} />
                          <span className="text-sm font-bold text-slate-700 dark:text-text-dark-muted">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-authority-blue text-white p-10 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                    <Target className="absolute -bottom-10 -right-10 text-white/5" size={200} />
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-signal-gold mb-6">What This Means</h3>
                    <p className="text-lg leading-relaxed font-medium italic mb-8">
                      "You meet the baseline criteria for enrollment in LaunchPath. This does not guarantee success — it means you are not starting from a position of structural disadvantage."
                    </p>
                    <div className="h-px w-full bg-white/10 mb-8"></div>
                    <div className="flex items-center space-x-3 text-signal-gold">
                      <Zap size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Enrollment Window: OPEN</span>
                    </div>
                  </div>
                </div>

                {yellowFlags > 0 && (
                   <div className="p-8 bg-amber-50 dark:bg-amber-950/20 rounded-[2.5rem] border border-amber-200 flex items-start space-x-6">
                      <AlertTriangle className="text-amber-600 shrink-0" size={32} />
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-2">Soft Advisory</p>
                        <p className="text-sm font-bold text-amber-700 dark:text-amber-300">Your overall readiness is strong, but some flagged items may require attention before enrollment to ensure maximum implementation speed.</p>
                      </div>
                   </div>
                )}

                <section className="py-16 text-center border-t border-slate-200">
                  <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-6">Review Admission Information</h2>
                  <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10">
                    LaunchPath operates on an admission-based enrollment model. Review the program structure, requirements, and expectations before proceeding.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/pricing" className="bg-authority-blue text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-steel-blue transition-all shadow-xl">
                      View Admission Details
                    </Link>
                    <button onClick={() => window.print()} className="flex items-center space-x-2 text-slate-400 hover:text-authority-blue font-bold uppercase tracking-widest text-[10px] transition-all">
                      <Printer size={16} />
                      <span>Download Result (PDF)</span>
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* YELLOW RESULT */}
            {resultType === 'YELLOW' && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border-4 border-amber-100 shadow-2xl">
                    <AlertCircle size={56} />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none">
                    Preparation <br/><span className="text-amber-600 italic">Recommended.</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
                    Based on your responses, you have some foundational elements in place — but gaps remain that could create unnecessary risk if not addressed first.
                  </p>
                </div>

                <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-authority-blue flex items-center">
                    <ShieldAlert className="mr-3 text-amber-600" size={20} /> Areas of Concern
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {answers[0] < 2 && (
                      <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl">
                        <Wallet className="text-amber-600 shrink-0" size={24} />
                        <p className="text-sm font-bold text-slate-600 dark:text-text-dark-muted">Your startup capital is below the recommended threshold for most owner-operator launches.</p>
                      </div>
                    )}
                    {answers[1] < 2 && (
                      <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl">
                        <Briefcase className="text-amber-600 shrink-0" size={24} />
                        <p className="text-sm font-bold text-slate-600 dark:text-text-dark-muted">Your household reserves may not provide adequate runway if revenue is delayed.</p>
                      </div>
                    )}
                    {answers[2] < 2 && (
                      <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl">
                        <Users className="text-amber-600 shrink-0" size={24} />
                        <p className="text-sm font-bold text-slate-600 dark:text-text-dark-muted">Your household may not fully understand the demands of this business model.</p>
                      </div>
                    )}
                    {answers[3] < 2 && (
                      <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl">
                        <Clock className="text-amber-600 shrink-0" size={24} />
                        <p className="text-sm font-bold text-slate-600 dark:text-text-dark-muted">Your available time may limit your ability to implement compliance systems properly.</p>
                      </div>
                    )}
                    {answers[4] < 2 && (
                      <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl">
                        <Truck size={24} className="text-amber-600 shrink-0" />
                        <p className="text-sm font-bold text-slate-600 dark:text-text-dark-muted">Limited commercial driving experience increases your operational learning curve.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-authority-blue text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                  <Scale className="absolute -bottom-10 -left-10 text-white/5" size={250} />
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8">One Standard Policy</h3>
                  <div className="prose prose-invert max-w-none text-lg leading-relaxed font-medium space-y-6">
                    <p>LaunchPath does not offer a simplified or reduced version of compliance education.</p>
                    <p>FMCSA does not conduct reduced audits. Insurance underwriters do not offer reduced scrutiny. Enforcement does not apply reduced consequences.</p>
                    <p className="text-signal-gold italic">LaunchPath is built as one standard — a complete system that protects authority, supports audit readiness, and requires disciplined follow-through.</p>
                    <p>If readiness gaps exist, the most responsible path is to address them first, then return when you can meet the standard.</p>
                  </div>
                </div>

                <section className="py-16 text-center border-t border-slate-200">
                  <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-6">Prepare First. Return When Ready.</h2>
                  <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    Use the resources below to address your specific gaps. When your situation changes, retake this assessment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/resources" className="bg-authority-blue text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-steel-blue transition-all shadow-xl">
                      Download Preparation Guide
                    </Link>
                  </div>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-slate-400">We will be here when you're ready.</p>
                </section>
              </div>
            )}

            {/* RED RESULT */}
            {resultType === 'RED' && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-50 text-red-700 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border-4 border-red-100 shadow-2xl">
                    <XCircle size={56} />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black font-serif text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none">
                    Now Is Probably <br/><span className="text-red-700 italic">Not the Right Time.</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium max-w-2xl mx-auto leading-relaxed">
                    Based on your responses, launching a motor carrier operation right now would expose you to significant structural risk — not because of your ability, but because of your current circumstances.
                  </p>
                </div>

                <div className="bg-red-50/50 dark:bg-red-950/20 p-12 rounded-[4rem] border border-red-100 shadow-sm space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-red-700 flex items-center">
                    <ShieldAlert className="mr-3" size={20} /> Primary Concern
                  </h3>
                  
                  <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-red-200">
                    <p className="text-xl font-bold text-authority-blue dark:text-white leading-relaxed">
                      {answers[0] === 0 ? "Starting with less than $10,000 in available capital leaves no margin for the deposits, fees, insurance costs, and unexpected expenses that define the first 90 days. This is not a judgment of your potential — it is a structural reality." :
                       answers[1] === 0 ? "Without at least one month of household expenses in reserve, any delay in revenue — which is common — could create immediate financial crisis. Building reserves first protects your household and your authority." :
                       answers[3] === 0 ? "The first 90 days require consistent attention to implement compliance systems, manage insurance requirements, and prepare for audit readiness. A few hours per week is not sufficient to build the documentation logic and preventive systems required." :
                       answers[2] === 1 ? "Starting a trucking business without household support creates pressure that compounds every operational challenge. Alignment before launch is not optional — it is foundational." :
                       answers[6] === 0 ? "If a single setback would cause you to shut down, the volatility of the first year will be difficult to sustain. Building resilience — financial and psychological — before launch is essential." :
                       "Your current structural indicators suggest that launching an authority at this moment would carry an extremely high probability of preventable failure."}
                    </p>
                  </div>
                </div>

                <div className="bg-authority-blue text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
                  <AlertCircle className="absolute -top-10 -right-10 text-white/5" size={250} />
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-signal-gold mb-8">One Standard Policy</h3>
                  <div className="prose prose-invert max-w-none text-lg leading-relaxed font-medium space-y-6">
                    <p>LaunchPath does not offer a simplified version of compliance education, and we do not accept enrollment from individuals whose circumstances suggest premature launch.</p>
                    <p className="text-signal-gold italic">This is not rejection. This is protection.</p>
                    <p>We will not take your money when the structural conditions for success are not yet in place. We take stewardship seriously.</p>
                  </div>
                </div>

                <section className="py-16 text-center border-t border-slate-200">
                  <h2 className="text-3xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-6">Build First. Return When Ready.</h2>
                  <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    The resources below address your specific situation. Use them to build your foundation. When circumstances change, retake this assessment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/resources" className="bg-authority-blue text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-steel-blue transition-all shadow-xl">
                      Download Foundation-Building Guide
                    </Link>
                  </div>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-slate-400">We will be here when you're ready.</p>
                </section>
              </div>
            )}

          </div>
        )}

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; }
      `}</style>
    </div>
  );
};

export default ReadinessPage;