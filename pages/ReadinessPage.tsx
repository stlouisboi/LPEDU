import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  XCircle, 
  ChevronRight, 
  Loader2, 
  CheckCircle,
  Award,
  Lock,
  RefreshCw
} from 'lucide-react';
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { syncToMailerLite } from '../mailerlite';
import { createUserProfile } from '../utils/userRoles';

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
    text: "How much cash do you have available to start?",
    options: [
      { label: 'A', text: 'Less than $10,000', points: 0, flag: 'RED' },
      { label: 'B', text: '$10,000 – $20,000', points: 1, flag: 'YELLOW' },
      { label: 'C', text: '$20,000 – $35,000', points: 2 },
      { label: 'D', text: '$35,000 – $50,000', points: 3 },
      { label: 'E', text: 'More than $50,000', points: 4 }
    ]
  },
  {
    id: 'reserves',
    text: "How long can your household cover bills without business income?",
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
    text: "Does your household support this decision?",
    options: [
      { label: 'A', text: "Haven't told them yet", points: 0, flag: 'YELLOW' },
      { label: 'B', text: "They're against it", points: 0, flag: 'RED' },
      { label: 'C', text: "They're okay with it", points: 2 },
      { label: 'D', text: "They support it but we haven't planned together", points: 3 },
      { label: 'E', text: "Fully aligned — we've discussed and planned together", points: 4 }
    ]
  },
  {
    id: 'time',
    text: "How many hours per week can you spend on admin and compliance?",
    options: [
      { label: 'A', text: 'Less than 10 hours', points: 0, flag: 'RED' },
      { label: 'B', text: '10–20 hours', points: 1, flag: 'YELLOW' },
      { label: 'C', text: '20–30 hours', points: 2 },
      { label: 'D', text: '30–40 hours', points: 3 },
      { label: 'E', text: '40+ hours', points: 4 }
    ]
  },
  {
    id: 'experience',
    text: "What is your commercial driving background?",
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
    text: "How familiar are you with FMCSA audit requirements?",
    options: [
      { label: 'A', text: "I don't know what that means", points: 0 },
      { label: 'B', text: "I've heard of it but haven't studied it", points: 1 },
      { label: 'C', text: 'I understand the basics', points: 2 },
      { label: 'D', text: "I've researched it in detail", points: 3 },
      { label: 'E', text: 'I could explain it to someone else', points: 4 }
    ]
  },
  {
    id: 'risk',
    text: "If you had a $5,000 unexpected expense in month two, what happens?",
    options: [
      { label: 'A', text: "I'd have to shut down", points: 0, flag: 'RED' },
      { label: 'B', text: 'It would be a serious problem', points: 1, flag: 'YELLOW' },
      { label: 'C', text: "I'd figure it out somehow", points: 2 },
      { label: 'D', text: 'I have a plan for this', points: 3 },
      { label: 'E', text: "That's already budgeted — I expect setbacks", points: 4 }
    ]
  }
];

const ReadinessPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.title = "Readiness Assessment | LaunchPath Carrier Diagnostic";
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
      if (db) {
        // 1. Log the assessment
        await addDoc(collection(db, "readinessAssessments"), { 
          email, 
          totalScore, 
          resultType, 
          answers,
          createdAt: serverTimestamp() 
        });

        // 2. Create/Update user document to mark completed status
        // Note: We don't have a password here for full Auth creation, 
        // so we track via email in a 'leads' pattern that matches 'users' schema.
        await addDoc(collection(db, "users"), {
          email,
          role: 'free',
          quizStatus: 'completed',
          quizResult: resultType,
          lastActivity: serverTimestamp()
        });
      }

      // 3. Sync to CRM (MailerLite) with specific tagging
      setSyncing(true);
      await syncToMailerLite({
        email,
        fields: {
          name: 'Ready Operator',
          tags: ['Readiness_Test_Complete', `Result_${resultType}`]
        }
      });
      
      setStep(9);
    } catch (error) { 
      console.error("Diagnostic Registry Error:", error);
      setStep(9); 
    } finally { 
      setLoading(false); 
      setSyncing(false);
    }
  };

  const handleInitiateSequence = () => {
    // Construct query parameters from quiz answers
    const params = answers.map((val, idx) => `q${idx + 1}=${QUESTIONS[idx].options[val].points}`).join('&');
    navigate(`/tools/tco-calculator?${params}&result=${resultType}`);
  };

  return (
    <div className="bg-[#fafaf9] dark:bg-primary-dark min-h-screen font-sans text-authority-blue overflow-x-hidden">
      <div className="max-w-[800px] mx-auto px-5 py-12 sm:py-24 min-h-[80vh] flex flex-col">
        
        {/* PROGRESS BAR */}
        {step >= 1 && step <= 7 && (
          <div className="w-full mb-12 animate-in fade-in duration-500">
             <div className="flex justify-between items-end mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Diagnostic Phase</p>
                <p className="text-sm font-black text-authority-blue dark:text-signal-gold">{Math.round((step / 7) * 100)}% Complete</p>
             </div>
             <div className="h-2 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-authority-blue dark:bg-signal-gold transition-all duration-700 ease-out shadow-[0_0_15px_rgba(30,58,95,0.3)]" style={{ width: `${(step / 7) * 100}%` }}></div>
             </div>
          </div>
        )}

        {/* STEP 0: INTRODUCTION */}
        {step === 0 && (
          <div className="text-center animate-reveal-up flex-grow flex flex-col justify-center legibility-container">
            <div className="w-24 h-24 bg-authority-blue/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
               <ShieldCheck size={48} className="text-authority-blue dark:text-signal-gold" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-tight mb-8 text-authority-blue dark:text-white">
              Carrier <span className="text-signal-gold italic">Diagnostic</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-12">
              Before you file for authority, identify the exposure points that could bankrupt your operation in the first 90 days. Accuracy over ambition.
            </p>
            <button 
              onClick={() => setStep(1)} 
              className="bg-authority-blue text-white px-16 py-7 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-steel-blue transition-all active:scale-95 mx-auto flex items-center border-b-8 border-slate-900"
            >
              Initiate Diagnostic Sequence <ChevronRight className="ml-3" size={20} />
            </button>
          </div>
        )}

        {/* SINGLE TASK QUESTIONS */}
        {step >= 1 && step <= 7 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-grow legibility-container">
            <h2 className="text-2xl sm:text-4xl font-black font-serif uppercase mb-12 leading-tight text-authority-blue dark:text-white">
              {QUESTIONS[step-1].text}
            </h2>
            <div className="space-y-4 mb-16">
              {QUESTIONS[step-1].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => { const n=[...answers]; n[step-1]=i; setAnswers(n); setTimeout(()=>setStep(step+1), 400); }} 
                  className="w-full text-left p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-100 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-authority-blue dark:hover:border-signal-gold transition-all flex items-center group shadow-sm hover:shadow-xl"
                >
                  <span className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mr-6 text-sm font-black group-hover:bg-authority-blue group-hover:text-white transition-colors">{opt.label}</span>
                  <span className="text-lg sm:text-xl font-bold text-authority-blue dark:text-white leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(step-1)} 
              className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-authority-blue flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Previous Step
            </button>
          </div>
        )}

        {/* REVIEW & EMAIL CAPTURE */}
        {step === 8 && (
          <div className="text-center animate-in fade-in duration-500 flex-grow flex flex-col justify-center legibility-container">
            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-10 text-green-600 shadow-sm border border-green-100">
               <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase mb-8 text-authority-blue dark:text-white">Diagnostic Ready</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-bold mb-12">Submit your credentials to authorize the release of your structural classification.</p>
            
            <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto w-full">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Professional Email Address</label>
                <input 
                  required 
                  type="email" 
                  placeholder="legal@carrier.com" 
                  className="w-full px-8 py-5 rounded-[2rem] border-2 border-slate-100 dark:border-border-dark bg-white dark:bg-gray-800 focus:border-authority-blue outline-none font-black text-lg placeholder:text-slate-300 dark:text-white shadow-inner" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                />
              </div>
              <div className="flex items-start text-left space-x-4 p-4 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-border-dark">
                <input 
                  type="checkbox" 
                  className="mt-1.5 w-5 h-5 rounded accent-authority-blue cursor-pointer" 
                  checked={consent} 
                  onChange={e=>setConsent(e.target.checked)} 
                />
                <span className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tighter">I acknowledge that this assessment is for educational guidance only and does not constitute a legal audit result.</span>
              </div>
              <button 
                disabled={loading || !consent} 
                className="w-full bg-authority-blue text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl disabled:opacity-50 hover:bg-steel-blue transition-all border-b-8 border-slate-900 flex items-center justify-center"
              >
                {loading ? <div className="flex items-center"><RefreshCw className="animate-spin mr-3" size={18} /> {syncing ? 'SYNCING CRM...' : 'AUTHORIZING...'}</div> : "Authorize Classification Result"}
              </button>
            </form>
          </div>
        )}

        {/* RESULTS PAGE */}
        {step === 9 && (
          <div className="animate-reveal-up space-y-12 sm:space-y-20 pb-20 legibility-container">
            <div className="text-center">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl transition-all duration-1000 ${resultType==='GREEN'?'bg-green-50 text-green-600':resultType==='YELLOW'?'bg-amber-50 text-amber-600':'bg-red-50 text-red-700'}`}>
                {resultType==='GREEN'?<ShieldCheck size={64}/>:resultType==='YELLOW'?<AlertCircle size={64}/>:<XCircle size={64}/>}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-serif text-authority-blue dark:text-white uppercase leading-none tracking-tighter">
                Classification: <br/>
                <span className={resultType==='GREEN'?'text-green-600':resultType==='YELLOW'?'text-amber-600':'text-red-700'}>
                  {resultType==='GREEN'?'READY TO LAUNCH.':resultType==='YELLOW'?'PREPARATION REQUIRED.':'NOT RECOMMENDED.'}
                </span>
              </h1>
            </div>

            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[4rem] border border-slate-100 dark:border-border-dark shadow-sm space-y-12">
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold flex items-center">
                    <CheckCircle size={16} className="mr-3" /> Diagnostic Summary
                  </h3>
                  <p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    {resultType === 'GREEN' 
                      ? "Your structural entity displays high stewardship alignment and sufficient capital reserves for a Tier 1 launch." 
                      : resultType === 'YELLOW'
                      ? "Exposure vectors detected in capital or household alignment. Corrective action required before authority activation."
                      : "Critical failure points detected in solvency and admin capacity. Immediate strategic pivot recommended."}
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-50 dark:border-white/5">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Score</p>
                     <p className="text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tighter">{totalScore} / 28</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Flags</p>
                     <p className={`text-3xl font-black uppercase tracking-tighter ${redFlags > 0 ? 'text-red-600' : 'text-green-600'}`}>{redFlags} Red // {yellowFlags} Yellow</p>
                  </div>
               </div>
            </div>

            <div className="pt-12 flex flex-col items-center gap-10">
               <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                  <button 
                    onClick={handleInitiateSequence}
                    className="flex-grow bg-authority-blue text-white px-12 py-7 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-steel-blue transition-all active:scale-95 text-center border-b-8 border-slate-900"
                  >
                    INITIATE ADMISSION SEQUENCE
                  </button>
                  <button onClick={() => window.print()} className="px-10 py-7 rounded-[2rem] border-4 border-slate-100 dark:border-border-dark text-authority-blue dark:text-white font-black uppercase tracking-widest text-[11px] hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm">
                    Print Certification
                  </button>
               </div>
               
               <div className="flex items-center space-x-4 opacity-30">
                  <Award size={20} />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em]">Verified Registry ID: LP-READY-STND</p>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReadinessPage;