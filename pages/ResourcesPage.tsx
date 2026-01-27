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
  Sparkles
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { GoogleGenAI } from "@google/genai";

const ResourcesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<{title: string, link: string} | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // AI Image State
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
      const prompt = `A professional, corporate 3D isometric digital asset representing "${title}" for a trucking logistics company. Design features clean lines, high-tech aesthetics, a professional color palette of authority blue and gold. Studio lighting, sharp focus, 1:1 aspect ratio, high resolution.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let imageUrl = '';
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        setGeneratedImages(prev => ({ ...prev, [id]: imageUrl }));
      }
    } catch (error) {
      console.error("AI Image generation failed:", error);
    } finally {
      setIsGenerating(prev => ({ ...prev, [id]: false }));
    }
  };

  const SocialShare = ({ title }: { title: string }) => (
    <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Share Resource</span>
      <div className="flex items-center space-x-3 text-slate-400">
        <button title="Share on Facebook" className="hover:text-authority-blue dark:hover:text-signal-gold transition-colors"><Facebook size={14} /></button>
        <button title="Share on LinkedIn" className="hover:text-authority-blue dark:hover:text-signal-gold transition-colors"><Linkedin size={14} /></button>
        <button title="Share on Instagram" className="hover:text-authority-blue dark:hover:text-signal-gold transition-colors"><Instagram size={14} /></button>
        <button title="Share on Pinterest" className="hover:text-authority-blue dark:hover:text-signal-gold transition-colors"><Share2 size={14} /></button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen font-sans text-slate-800 transition-colors duration-500 selection:bg-authority-blue/10">
      
      {/* 1. INSTITUTIONAL HERO & PURPOSE STATEMENT */}
      <section className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark pt-32 pb-24 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-6 py-2.5 rounded-full mb-10">
            <Scale size={16} className="text-authority-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue">Institutional Standards Repository</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-authority-blue dark:text-white tracking-tighter mb-4 uppercase leading-none font-serif">
            LaunchPath <span className="text-signal-gold italic font-serif">Resources</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-text-dark-muted font-bold uppercase tracking-[0.15em] mb-16">
            Tools, Guidance, and Standards for Lawful Motor Carrier Operations
          </p>
          
          <div className="max-w-3xl mx-auto p-12 bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-border-dark rounded-[3.5rem] text-left relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-authority-blue"></div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-authority-blue mb-6">Purpose Statement</h2>
            <p className="text-lg text-slate-600 dark:text-text-dark-primary leading-relaxed mb-8 font-medium">
              LaunchPath resources are designed to support disciplined, compliance-first motor carrier operations. These materials provide education, orientation, and risk awareness — not shortcuts, legal representation, or revenue promises.
            </p>
            <div className="pt-8 border-t border-slate-200 dark:border-border-dark">
              <p className="text-[11px] font-black text-red-600 uppercase tracking-[0.3em] flex items-center">
                <AlertTriangle size={14} className="mr-3 shrink-0" />
                If you are looking for speed without structure, these resources are not for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. READINESS & RISK DIAGNOSTICS */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-4">1. Readiness & Risk Diagnostics</p>
          <h2 className="text-4xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif mb-6">Know where you stand before you move.</h2>
          <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">These tools help operators identify exposure before mistakes become irreversible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              id: "diag-1",
              title: "REACH Test™", 
              sub: "Readiness & Exposure Diagnostic",
              desc: "A structured assessment to identify authority, insurance, compliance, and operational risk. Diagnostic only. Implementation occurs through Admission & Implementation.", 
              icon: <FileSearch />, 
              link: "/reach-test" 
            },
            { 
              id: "diag-2",
              title: "First 90 Days Risk Map™", 
              sub: "Visual Enforcement Sequence",
              desc: "A visual breakdown of the most common failure points during early carrier operations.", 
              icon: <Activity />, 
              isGated: true,
              link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003"
            },
            { 
              id: "diag-3",
              title: "Carrier Survival Scorecard (Lite)", 
              sub: "Snap Evaluation",
              desc: "A snapshot evaluation of financial, compliance, and operational viability.", 
              icon: <ClipboardList />, 
              link: "/readiness" 
            }
          ].map((item, i) => (
            <div key={item.id} className="bg-white dark:bg-surface-dark p-12 rounded-[3.5rem] border border-slate-100 dark:border-border-dark shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col relative overflow-hidden">
              <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner relative overflow-hidden">
                {generatedImages[item.id] ? (
                  <img src={generatedImages[item.id]} className="w-full h-full object-cover animate-in fade-in duration-700" alt={item.title} />
                ) : (
                  isGenerating[item.id] ? (
                    <Loader2 className="animate-spin text-authority-blue" size={24} />
                  ) : (
                    React.cloneElement(item.icon as React.ReactElement, { size: 32 })
                  )
                )}
              </div>

              {!generatedImages[item.id] && !isGenerating[item.id] && (
                <button 
                  onClick={() => handleGenerateAIImage(item.title, item.id)}
                  className="absolute top-12 right-12 p-2 bg-authority-blue/5 hover:bg-authority-blue/10 text-authority-blue rounded-full transition-all opacity-0 group-hover:opacity-100"
                  title="Generate AI Visualization"
                >
                  <Sparkles size={14} />
                </button>
              )}

              <h3 className="text-2xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-2 leading-none font-serif">{item.title}</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">{item.sub}</p>
              <p className="text-base text-slate-500 dark:text-text-dark-muted font-medium mb-12 leading-relaxed flex-grow">{item.desc}</p>
              
              <div className="mt-auto">
                {item.isGated ? (
                  <button 
                    onClick={() => setSelectedGuide({title: item.title, link: item.link})}
                    className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold hover:underline group-hover:translate-x-1 transition-transform"
                  >
                    <Download size={14} className="mr-3" /> Request Transfer
                  </button>
                ) : (
                  <Link to={item.link} className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold hover:underline group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} className="mr-3" /> Open Diagnostic
                  </Link>
                )}
                <SocialShare title={item.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUTHORITY & COMPLIANCE FOUNDATIONS */}
      <section className="py-40 bg-authority-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-signal-gold mb-4">2. Authority & Compliance Foundations</p>
            <h2 className="text-4xl md:text-6xl font-black font-serif uppercase tracking-tight leading-none mb-6">Understand the rules <br/>before you operate under them.</h2>
            <p className="text-xl text-white/60 max-w-2xl font-medium leading-relaxed">These guides provide clarity on the regulatory environment every carrier must navigate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "DOT & MC Authority Overview",
              "New Entrant Safety Audit Orientation",
              "FMCSA Compliance Basics (Required vs Optional)",
              "Insurance Continuity Fundamentals",
              "CSA Scores & Monitoring Explained",
              "Common Regulatory Red Flags"
            ].map((text, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all flex items-center space-x-6 group cursor-default shadow-lg">
                <div className="w-14 h-14 bg-signal-gold/10 text-signal-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest leading-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* CONCEPTUAL ANCHOR INTEGRATION */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-5 group/anchor">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all group-hover/anchor:bg-signal-gold group-hover/anchor:text-authority-blue">
                <Anchor size={20} className="text-signal-gold group-hover/anchor:text-current transition-colors" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-1">Contextual Grounding</p>
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-white">
                  Conceptual Anchor: <span className="text-signal-gold underline decoration-signal-gold/30 underline-offset-4">DOT vs MC Authority Logic</span>
                </p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">Registry Reference LP-REF-02</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STARTER TEMPLATES & OPERATING TOOLS - ENHANCED CARDS */}
      <section className="py-32 bg-slate-50/50 dark:bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-24">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-4">3. Starter Templates & Operating Tools</p>
            <h2 className="text-4xl md:text-5xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif mb-6">Structure beats memory.</h2>
            <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">These tools introduce proper recordkeeping habits. They are not substitutes for a full compliance system.</p>
          </div>

          {/* COMPLIANCE REFERENCE FLOATING BRANDING */}
          <div className="absolute top-0 right-6 hidden xl:block translate-y-12">
            <div className="bg-authority-blue text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center space-x-4 border border-white/10 group hover:scale-105 transition-transform cursor-default">
               <div className="w-12 h-12 bg-signal-gold rounded-2xl flex items-center justify-center text-authority-blue shadow-lg group-hover:rotate-12 transition-transform">
                  <MessageCircle size={24} />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap">Compliance Reference</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { id: "template-1", title: "Driver Qualification File Starter Pack", icon: <User /> },
              { id: "template-2", title: "Vehicle Maintenance Log (Basic)", icon: <Monitor /> },
              { id: "template-3", title: "Accident Reporting Quick Form", icon: <FileWarning /> },
              { id: "template-4", title: "Daily Compliance Activity Log", icon: <Clock /> },
              { id: "template-5", title: "Recordkeeping Folder Structure Guide", icon: <HardDrive /> }
            ].map((tool, i) => (
              <div key={tool.id} className="bg-white dark:bg-surface-dark p-12 md:p-16 rounded-[4.5rem] border border-slate-100 dark:border-border-dark flex flex-col items-center text-center group transition-all hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:border-authority-blue/20 relative">
                
                <div className="w-24 h-24 bg-white dark:bg-surface-dark text-authority-blue dark:text-signal-gold rounded-[2rem] flex items-center justify-center mb-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-border-dark group-hover:scale-110 transition-all relative overflow-hidden">
                  {generatedImages[tool.id] ? (
                    <img src={generatedImages[tool.id]} className="w-full h-full object-cover animate-in fade-in duration-700" alt={tool.title} />
                  ) : (
                    isGenerating[tool.id] ? (
                      <Loader2 className="animate-spin text-authority-blue" size={32} />
                    ) : (
                      React.cloneElement(tool.icon as React.ReactElement, { size: 40 })
                    )
                  )}
                </div>

                {!generatedImages[tool.id] && !isGenerating[tool.id] && (
                  <button 
                    onClick={() => handleGenerateAIImage(tool.title, tool.id)}
                    className="absolute top-12 right-12 p-3 bg-authority-blue/5 hover:bg-authority-blue/10 text-authority-blue rounded-full transition-all opacity-0 group-hover:opacity-100"
                    title="Generate AI Illustration"
                  >
                    <Sparkles size={16} />
                  </button>
                )}
                
                <h4 className="text-xl md:text-2xl font-black text-authority-blue dark:text-white uppercase leading-tight mb-12 max-w-sm tracking-tight font-serif flex-grow">
                  {tool.title}
                </h4>
                
                <div className="w-full mt-auto">
                  <button 
                    onClick={() => setSelectedGuide({title: tool.title, link: "#"})}
                    className="mx-auto text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-authority-blue dark:hover:text-signal-gold transition-colors flex items-center group/btn"
                  >
                    Access File <ChevronRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <SocialShare title={tool.title} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-12 bg-authority-blue/5 border border-authority-blue/10 rounded-[3.5rem] text-center max-w-4xl mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-[0.3em] text-authority-blue/80 dark:text-text-dark-muted leading-relaxed">
              Full systems, verification standards, and implementation protocols are provided inside LaunchPath.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALCULATORS & DECISION TOOLS - ENHANCED WITH CALIBRATION BANNER */}
      <section className="py-40 bg-white dark:bg-surface-dark border-y border-slate-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-4">4. Calculators & Decision Tools</p>
            <h2 className="text-4xl md:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif mb-6 leading-none font-serif">Clarity before <br/><span className="text-signal-gold italic">commitment.</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">These tools are designed to slow decisions down — not speed them up.</p>
          </div>

          {/* CALIBRATION BANNER FROM REFERENCE IMAGE */}
          <div className="bg-[#020617] p-10 md:p-16 rounded-[4rem] mb-16 shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
              <Calculator size={200} className="text-white" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                CLARITY BEFORE COMMITMENT
              </h3>
              
              <p className="text-lg md:text-xl text-slate-400 font-bold leading-relaxed max-w-4xl italic">
                "Profit is the byproduct of calculated restraint. If the math does not survive the terminal, the operation will not survive the market."
              </p>
              
              <div className="pt-10 space-y-6">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                   <div className="absolute top-0 left-0 h-full w-[75%] bg-signal-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]"></div>
                </div>
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] flex items-center">
                  <span className="w-2 h-2 rounded-full bg-signal-gold mr-3 animate-pulse"></span>
                  RESOURCE CALIBRATION: 75% ACTIVE
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Cost-Per-Mile Calculator", icon: <Calculator /> },
              { title: "Break-Even Load Rate Calculator", icon: <TrendingDown /> },
              { title: "Maintenance Reserve Estimator", icon: <Zap /> },
              { title: "Insurance Cost Planning Tool", icon: <Calendar /> },
              { title: "Revenue vs Risk Comparison Tool", icon: <Scale /> }
            ].map((calc, i) => (
              <div key={i} className="flex items-center space-x-8 p-10 bg-slate-50 dark:bg-gray-800/40 rounded-[3rem] border border-slate-100 dark:border-border-dark group hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 shadow-sm hover:shadow-xl">
                <div className="p-5 bg-white dark:bg-surface-dark text-signal-gold rounded-2xl shadow-inner border border-slate-50 dark:border-slate-700">
                  {React.cloneElement(calc.icon as React.ReactElement, { size: 32 })}
                </div>
                <span className="text-lg font-bold uppercase tracking-tight text-authority-blue dark:text-white font-serif">{calc.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL SHIELD - SCAMS & FRAUD */}
      <section className="py-40 max-w-7xl mx-auto px-6">
        <div className="bg-red-50 dark:bg-red-950/10 border-2 border-red-100 dark:border-red-900/30 rounded-[5rem] p-12 md:p-24 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none rotate-12 scale-150">
            <ShieldAlert size={500} />
          </div>

          <div className="relative z-10 max-w-5xl">
            <div className="inline-flex items-center space-x-4 bg-red-600 text-white px-6 py-3 rounded-full mb-12 shadow-xl">
              <ShieldAlert size={20} />
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">5. Protection Protocol</span>
            </div>
            
            <h2 className="text-4xl lg:text-7xl font-black text-authority-blue dark:text-white uppercase tracking-tighter mb-12 leading-[0.9] font-serif">
              Scam, Fraud, and <br/><span className="text-red-600 italic">Predatory Service Warnings</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
               <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-2xl text-slate-700 dark:text-text-dark-primary font-bold leading-relaxed font-serif italic">
                      "Protection is a fundamental element of stewardship."
                    </p>
                    <p className="text-lg text-slate-600 dark:text-text-dark-muted font-medium leading-relaxed">
                      The moment a DOT or MC number is filed, carrier information enters the public domain. This triggers a wave of predatory solicitations designed to exploit the New Entrant window. LaunchPath classifies these threats as <span className="font-black text-red-600 uppercase">External Exposure Vectors</span>.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-text-dark-muted font-medium leading-relaxed">
                      Most early carrier losses are preventable. Awareness is a form of protection.
                    </p>
                  </div>

                  <div className="space-y-8 pt-10 border-t border-red-200 dark:border-red-900/40">
                    <h4 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Common Exposure Vectors Include:</h4>
                    <ul className="space-y-6">
                      {[
                        "Fake FMCSA or DOT solicitation calls and mailers",
                        "Overpriced or “expedited” compliance services",
                        "Dispatch and factoring fraud",
                        "“Guaranteed load” and “instant authority” schemes",
                        "High-pressure sales tactics designed to bypass verification"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start group">
                          <div className="mt-1.5 w-2 h-2 bg-red-600 rounded-full shrink-0 mr-6 transition-transform group-hover:scale-150 duration-500"></div>
                          <span className="text-base font-bold text-slate-700 dark:text-text-dark-primary uppercase tracking-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               <div className="space-y-12">
                  <div className="p-12 bg-white dark:bg-gray-900 rounded-[4rem] border border-red-100 dark:border-red-900/20 shadow-2xl space-y-8 relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <ShieldAlert size={64} />
                    </div>
                    <div className="flex items-center space-x-3 text-authority-blue dark:text-signal-gold">
                      <Info size={24} />
                      <span className="text-[11px] font-black uppercase tracking-[0.4em]">Critical Orientation</span>
                    </div>
                    <p className="text-lg font-medium text-slate-600 dark:text-text-dark-muted leading-relaxed italic">
                      "Any service promising to bypass fixed federal timelines or regulatory sequencing represents an <span className="text-red-600 font-black decoration-red-600/30 underline decoration-4">Around risk</span> and should be treated as a compliance threat."
                    </p>
                    <div className="pt-8 border-t border-slate-50 dark:border-white/5">
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Patience is a Competitive Advantage.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDUCATION LIBRARY */}
      <section className="py-40 max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-4">6. Education Library</p>
          <h2 className="text-4xl md:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none">Short, serious, <br/>and operational.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { 
              cat: "Compliance", 
              items: ["Why Carriers Fail New Entrant Audits", "Recordkeeping Errors That Trigger Investigations"] 
            },
            { 
              cat: "Operations", 
              items: ["Load Selection Risk Factors", "Cash Flow vs Revenue Illusions"] 
            },
            { 
              cat: "Authority Protection", 
              items: ["How Authority Gets Revoked", "Insurance Cancellation Triggers"] 
            },
            { 
              cat: "Leadership & Discipline", 
              items: ["Order Before Expansion", "Decision-Making Under Pressure", "Patience as a Competitive Advantage"] 
            }
          ].map((group, i) => (
            <div key={i} className="space-y-10 group">
              <h4 className="text-xs font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold border-b border-slate-100 dark:border-border-dark pb-6 group-hover:border-signal-gold transition-colors">{group.cat}</h4>
              <ul className="space-y-8">
                {group.items.map((item, j) => (
                  <li key={j} className="group/item cursor-pointer">
                    <p className="text-sm font-bold text-slate-600 dark:text-text-dark-primary group-hover/item:text-authority-blue transition-colors leading-relaxed uppercase tracking-tight">
                      {item}
                    </p>
                    <div className="w-0 group-hover/item:w-12 h-[2px] bg-authority-blue mt-3 transition-all duration-500 ease-out"></div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FIELD LESSON & CASE INSIGHTS */}
      <section className="py-40 bg-slate-50 dark:bg-primary-dark border-y border-slate-100 dark:border-border-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-4">7. Field Lessons & Case Insights</p>
            <h2 className="text-4xl md:text-6xl font-black text-authority-blue dark:text-white uppercase tracking-tight font-serif leading-none mb-8">Learn from outcomes, <br/><span className="text-signal-gold italic">not opinions.</span></h2>
            <p className="text-xl text-slate-500 max-w-4xl font-medium leading-relaxed italic border-l-4 border-slate-200 pl-10">
              "These are not testimonials. They are structured Incident Case Reviews modeled after institutional safety reporting. Each focuses on decisions, sequencing, and regulatory consequence — not personalities."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { id: "CASE-REVIEW-011", title: "Why This Carrier Lost Their Authority", focus: "Authority Revocation" },
              { id: "CASE-REVIEW-012", title: "What Caused an Insurance Non-Renewal", focus: "Underwriting Isolation" },
              { id: "CASE-REVIEW-013", title: "How Poor Documentation Failed an Audit", focus: "Administrative Default" },
              { id: "CASE-REVIEW-014", title: "When Expansion Came Too Early", focus: "Structural Collapse" }
            ].map((caseStudy, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-12 rounded-[3.5rem] shadow-sm relative group overflow-hidden transition-all hover:shadow-2xl hover:translate-x-1">
                <div className="absolute -right-10 -bottom-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 rotate-12">
                   <ShieldAlert size={200} />
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 group-hover:text-authority-blue transition-colors duration-500">{caseStudy.id}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 bg-slate-50 dark:bg-gray-800 px-4 py-2 rounded-full group-hover:bg-authority-blue group-hover:text-white transition-all duration-500 border border-slate-100">Outcome Review</span>
                </div>
                <h4 className="text-2xl font-black uppercase text-authority-blue dark:text-white mb-8 tracking-tight leading-tight font-serif">{caseStudy.title}</h4>
                <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  <Target size={14} className="text-signal-gold" />
                  <span>Primary Anchor: {caseStudy.focus}</span>
                </div>
                <button className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-authority-blue opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 flex items-center">
                  Request Incident Report <ArrowRight size={12} className="ml-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAITH-ALIGNED STEWARDSHIP */}
      <section className="py-48 bg-authority-blue text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-16 shadow-2xl border border-white/10 group">
             <Anchor className="text-signal-gold group-hover:rotate-12 transition-transform duration-1000" size={48} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-serif uppercase tracking-tight text-white mb-8">8. Faith-Aligned Stewardship</h2>
          <p className="text-xl font-bold uppercase tracking-[0.4em] text-white/40 mb-20 leading-relaxed">Integrity shows up in structure. <br/>LaunchPath approaches business through:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { t: "Order", s: "Over Chaos" },
              { t: "Truth", s: "Over Urgency" },
              { t: "Discipline", s: "Over Emotion" },
              { t: "Stewardship", s: "Over Exploitation" }
            ].map((p, i) => (
              <div key={i} className="space-y-4 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all duration-500 shadow-xl">
                <p className="text-2xl font-black text-signal-gold uppercase group-hover:scale-110 transition-transform font-serif leading-none">{p.t}</p>
                <div className="h-[1px] w-8 bg-white/10 mx-auto"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{p.s}</p>
              </div>
            ))}
          </div>
          
          <p className="mt-24 text-lg text-white/60 font-medium italic max-w-2xl mx-auto leading-relaxed">
            "Faith is reflected through restraint, clarity, and responsibility — not hype or pressure."
          </p>
        </div>
      </section>

      {/* 10. PATH FORWARD */}
      <section className="py-60 bg-white dark:bg-primary-dark text-center border-t border-slate-100 dark:border-border-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 p-20 opacity-[0.02] pointer-events-none">
           <Scale size={600} className="text-authority-blue" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-10">9. When You’re Ready for Structured Implementation</p>
          <h2 className="text-5xl lg:text-8xl font-black font-serif uppercase tracking-tighter text-authority-blue dark:text-white mb-12 leading-[0.9]">LaunchPath <span className="text-signal-gold italic">Implementation.</span></h2>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted font-medium mb-20 max-w-3xl mx-auto leading-relaxed italic">
            "These resources are designed for orientation and awareness. Verified execution occurs through structured implementation."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link to="/reach-test" className="w-full sm:w-auto px-20 py-10 bg-authority-blue text-white rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs shadow-[0_30px_60px_-15px_rgba(30,58,95,0.4)] active:scale-95 transition-all group flex items-center justify-center border-b-4 border-slate-900">
              → Begin the REACH Test™
            </Link>
            <Link to="/learning-path" className="w-full sm:w-auto px-20 py-10 bg-white dark:bg-gray-800 text-authority-blue dark:text-white border-2 border-authority-blue rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs active:scale-95 shadow-xl hover:bg-slate-50">
              → View Program Overview
            </Link>
          </div>
          
          <div className="mt-40 space-y-8 max-w-lg mx-auto">
            <div className="h-px w-20 bg-slate-200 mx-auto"></div>
            <p className="text-sm font-bold text-slate-400 italic leading-relaxed">
              LaunchPath is built for operators who want to operate lawfully, deliberately, and with long-term integrity.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
              LAUNCHPATH™ TRANSPORTATION EDU — SYSTEM REPOSITORY LP-RES-01
            </p>
          </div>
        </div>
      </section>

      {/* AUTHORIZATION MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-authority-blue/60 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-surface-dark rounded-[5rem] p-12 md:p-20 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.6)] border border-white/20 max-w-xl w-full relative animate-in zoom-in-95 duration-500">
            <button onClick={closeModal} className="absolute top-12 right-12 p-4 text-slate-300 hover:text-slate-600 transition-colors transform hover:rotate-90 duration-500"><X size={32} /></button>
            <div className="text-center mb-16">
              <div className="w-24 h-24 bg-authority-blue/5 text-authority-blue rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner border border-authority-blue/10"><FileText size={40} /></div>
              <h3 className="text-3xl font-black text-authority-blue dark:text-white uppercase tracking-tight mb-6 leading-none font-serif">Administrative <br/>Verification</h3>
              <p className="text-slate-500 font-medium text-lg leading-relaxed px-6">Registry credentials required to provision the <br/><strong className="text-authority-blue dark:text-white">{selectedGuide.title}</strong>.</p>
            </div>
            {showSuccess ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-green-100"><CheckCircle2 size={48} /></div>
                <p className="text-xl font-black text-authority-blue uppercase tracking-[0.4em]">Link Verified</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 ml-8 block">Full Legal Name</label>
                  <input required placeholder="Jane Doe" className="w-full px-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all text-authority-blue dark:text-white shadow-inner" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 ml-8 block">Registry Email</label>
                  <input required type="email" placeholder="jane@carrier.com" className="w-full px-10 py-7 rounded-[2.5rem] bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:border-authority-blue outline-none font-bold transition-all text-authority-blue dark:text-white shadow-inner" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-8 rounded-[3rem] bg-authority-blue text-white font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-steel-blue transition-all active:scale-95 flex items-center justify-center border-b-4 border-slate-900 mt-6 disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin mr-4" size={24} /> : <Download className="mr-4" size={20} />} Authorize Transfer
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .selection\\:bg-authority-blue\\/10 ::selection {
          background-color: rgba(30, 58, 95, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ResourcesPage;