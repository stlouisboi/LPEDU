
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Shield,
  X,
  Loader2,
  Monitor,
  Clock,
  Scale,
  Zap,
  ShieldAlert,
  FileSearch,
  Anchor,
  AlertTriangle,
  MoveDown,
  MoveUp,
  MoveLeft,
  MoveRight,
  Calculator,
  HardDrive,
  FileWarning,
  Eye,
  Info,
  User,
  BookOpen,
  TrendingDown,
  Target,
  ClipboardList,
  Calendar,
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  Share2,
  Sparkles,
  Unlock,
  Mail
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { GoogleGenAI } from "@google/genai";

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
  const [isInstitutionalModalOpen, setIsInstitutionalModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOrientationModalOpen, setIsOrientationModalOpen] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (db) {
        await addDoc(collection(db, "leadMagnets"), {
          firstName: leadName,
          email: leadEmail,
          resourceTitle: selectedGuide?.title,
          downloadedAt: serverTimestamp(),
          source: "institutional-library-gate"
        });
      }
      setShowSuccess(true);
      setTimeout(() => {
        if (selectedGuide?.link && selectedGuide.link !== "#") window.open(selectedGuide.link, '_blank');
        closeModal();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setSelectedGuide(null);
    setLeadName('');
    setLeadEmail('');
    setShowSuccess(false);
  };

  const handleGenerateAIImage = async (title: string, id: string) => {
    if (isGenerating[id]) return;
    setIsGenerating(prev => ({ ...prev, [id]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A professional corporate 3D isometric representation of "${title}" for a logistics carrier. Palette: authority blue, gold, slate. Studio lighting, sharp focus, high res.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      let imageUrl = '';
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) { imageUrl = `data:image/png;base64,${part.inlineData.data}`; break; }
        }
      }
      if (imageUrl) setGeneratedImages(prev => ({ ...prev, [id]: imageUrl }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans overflow-x-hidden selection:bg-authority-blue/10">
      
      {/* HERO */}
      <section className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark pt-24 sm:pt-32 pb-16 sm:pb-24 text-center px-5">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full mb-8">
            <Scale size={14} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold">Standards Repository</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-authority-blue dark:text-white tracking-tight uppercase leading-none font-serif mb-6">
            LaunchPath <span className="text-signal-gold italic">Resources</span>
          </h1>
          
          <div className="max-w-3xl mx-auto p-8 sm:p-12 bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-border-dark rounded-3xl sm:rounded-[3.5rem] text-left relative overflow-hidden shadow-sm mt-8">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-authority-blue dark:bg-signal-gold"></div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-text-dark-primary leading-relaxed mb-6 font-medium">
              LaunchPath resources support compliance-first operations. Education and orientation — not legal advice or revenue promises.
            </p>
            <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center">
              <AlertTriangle size={12} className="mr-2" /> No shortcuts, only structure.
            </p>
          </div>
        </div>
      </section>

      {/* READINESS GRIDS */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-5 sm:px-10">
        <div className="mb-12 sm:mb-20 text-center sm:text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-3">1. Readiness Diagnostics</p>
          <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif">Identify Exposure Early.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {[
            { id: "diag-1", title: "REACH Test™", sub: "Diagnostic", desc: "Structured assessment of authority, insurance, and operational risk. diagnostic only.", icon: <FileSearch />, link: "/reach-test" },
            { id: "diag-2", title: "90 Days Risk Map™", sub: "Visual", desc: "Breakdown of common failure points during early carrier operations.", icon: <Activity />, isGated: true, link: "#" },
            { id: "diag-3", title: "Survival Scorecard", sub: "Snap Eval", desc: "Evaluation of financial and compliance viability.", icon: <ClipboardList />, link: "/readiness" }
          ].map((item, i) => (
            <div key={item.id} className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                {generatedImages[item.id] ? (
                  <img src={generatedImages[item.id]} className="w-full h-full object-cover rounded-2xl" alt="" />
                ) : isGenerating[item.id] ? <Loader2 className="animate-spin" /> : React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-1 font-serif leading-none">{item.title}</h3>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">{item.sub}</p>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium mb-10 flex-grow leading-relaxed">{item.desc}</p>
              
              <div className="mt-auto pt-6 border-t border-slate-50 dark:border-white/5">
                {item.isGated ? (
                  <button onClick={() => setSelectedGuide({title: item.title, link: item.link})} className="w-full bg-authority-blue text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-lg active:scale-95 flex items-center justify-center">
                    <Download size={14} className="mr-2" /> Verify to Access
                  </button>
                ) : (
                  <Link to={item.link} className="w-full bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] flex items-center justify-center hover:bg-white active:scale-95 border border-slate-200 dark:border-slate-700">
                    <Unlock size={14} className="mr-2" /> Open Diagnostic
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="py-20 lg:py-32 bg-slate-50/50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="mb-16 text-center sm:text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold mb-3">2. Starter Templates</p>
            <h2 className="text-3xl sm:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-tight">Structure Beats Memory.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {[
              { id: "t1", title: "DQ File Starter Pack", icon: <User /> },
              { id: "t2", title: "Maintenance Log (Basic)", icon: <Monitor /> },
              { id: "t3", title: "Accident Quick Form", icon: <FileWarning /> },
              { id: "t4", title: "Daily Activity Log", icon: <Clock /> }
            ].map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group hover:shadow-xl transition-all relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mb-6 sm:mb-10 shadow-inner">
                  {React.cloneElement(tool.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-lg sm:text-xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-8 sm:mb-10 max-w-xs tracking-tight font-serif">
                  {tool.title}
                </h4>
                <button 
                  onClick={() => setIsInstitutionalModalOpen(true)}
                  className="w-full bg-authority-blue text-white py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase tracking-widest text-[9px] sm:text-[10px] shadow-xl hover:bg-steel-blue active:scale-95"
                >
                  Authorize Transfer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FIX: MOBILE CENTERING & PADDING */}
      {isInstitutionalModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md">
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 border border-white/20 shadow-2xl max-w-2xl w-full relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsInstitutionalModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-authority-blue"><X size={24} /></button>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-authority-blue rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-signal-gold/30">
                <Lock size={28} className="text-signal-gold" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-authority-blue dark:text-white uppercase leading-tight font-serif">Restricted Access</h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-text-dark-primary font-bold leading-relaxed text-left">
                The asset you are attempting to access is a structural component of the LaunchPath Operating Standard™.
              </p>
              <div className="space-y-4 text-left border-t border-slate-100 dark:border-white/5 pt-6">
                <p className="text-[10px] font-black uppercase text-authority-blue dark:text-signal-gold tracking-widest">Required Sequence:</p>
                <div className="space-y-3">
                  <div className="text-[11px] font-medium text-slate-500">1. Complete REACH Test™ Diagnosis</div>
                  <div className="text-[11px] font-medium text-slate-500">2. Verify Admission Readiness</div>
                  <div className="text-[11px] font-medium text-slate-500">3. Secure Implementation Access</div>
                </div>
              </div>
              <Link to="/reach-test" className="block w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] shadow-2xl hover:bg-steel-blue active:scale-95">
                Initiate Diagnosis
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* LEAD GATE MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-authority-blue/60 backdrop-blur-md">
          <div className="bg-white dark:bg-surface-dark rounded-3xl sm:rounded-[4rem] p-8 sm:p-12 shadow-2xl max-w-xl w-full relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-600"><X size={28} /></button>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-authority-blue/5 text-authority-blue rounded-2xl flex items-center justify-center mx-auto mb-6"><FileText size={32} /></div>
              <h3 className="text-xl sm:text-2xl font-black uppercase font-serif mb-3">Verification</h3>
              <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed">Registry credentials required to provision the <br/><strong className="text-authority-blue dark:text-white uppercase">{selectedGuide.title}</strong>.</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <input required placeholder="Full Legal Name" className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
              <input required type="email" placeholder="Registry Email" className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold text-sm" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
              <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl bg-authority-blue text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-steel-blue active:scale-95 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Authorize Transfer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
