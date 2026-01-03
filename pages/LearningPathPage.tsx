
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  Trophy,
  Clock,
  Zap,
  Briefcase,
  ShieldCheck,
  Download,
  ArrowRight,
  PlayCircle,
  Video
} from 'lucide-react';
import { collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from '../firebase';
import { ROADMAP_STEPS } from '../constants';
import { GeneratedVideo } from '../types';

const LearningPathPage = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "generatedVideos"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedVideo));
      setVideos(data);
    });
    return unsub;
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Foundation': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'Moderate': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Advanced': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Find videos matching the roadmap step
  // Roadmap steps 1-4 correspond roughly to modules or themes.
  // For demonstration, we'll map roadmap step ID to moduleId for video lookup.
  const getVideosForStep = (stepId: number) => {
    return videos.filter(v => v.moduleId === stepId || v.moduleId === stepId - 1);
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen pb-32 animate-in fade-in duration-700">
      {/* Header */}
      <section className="relative py-24 bg-authority-blue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
            <Zap className="w-3 h-3 text-signal-gold" />
            <span>Structured 90-Day Authority Journey</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight">The Carrier Success Roadmap</h1>
          <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            The LaunchPath™ 3-phase system takes new owner-operators from authority registration through audit readiness in 90 days. Built on verified FMCSA regulations, not shortcuts.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <Clock className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">12 Month Comprehensive Path</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-signal-gold" />
              <span className="text-sm font-semibold">FMCSA Verified Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Roadmap */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-signal-gold via-steel-blue to-authority-blue -translate-x-1/2 rounded-full hidden md:block opacity-30"></div>

          <div className="space-y-20">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === step.id;
              const stepVideos = getVideosForStep(step.id);

              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Node */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl z-20 shadow-xl border-4 transition-all duration-500 ${
                    isActive 
                    ? 'bg-white dark:bg-surface-dark border-signal-gold text-authority-blue scale-110' 
                    : 'bg-gray-100 dark:bg-gray-800 border-border-light dark:border-border-dark text-text-muted'
                  }`}>
                    {step.id}
                  </div>

                  <div className="hidden md:block md:w-[45%]"></div>

                  {/* The actual Card */}
                  <div className="w-full md:w-[45%] pl-16 md:pl-0">
                    <div 
                      onClick={() => setActiveStep(step.id)}
                      className={`group bg-white dark:bg-surface-dark p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden ${
                        isActive 
                        ? 'border-authority-blue ring-4 ring-authority-blue/5 translate-y-[-4px]' 
                        : 'border-border-light dark:border-border-dark grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      {isActive && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-authority-blue to-steel-blue"></div>}

                      <div className="mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-blue block">{step.phase}</span>
                           <span className="text-[10px] font-black text-authority-blue dark:text-signal-gold bg-authority-blue/5 px-2 py-0.5 rounded uppercase">⏱️ {step.timeline}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-2xl md:text-3xl font-bold font-serif leading-tight">{step.title}</h3>
                          <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-authority-blue text-white' : 'bg-gray-50 dark:bg-gray-800 text-text-muted'}`}>
                            {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      <p className="text-text-muted dark:text-text-dark-muted mb-6 leading-relaxed text-base">{step.description}</p>
                      
                      {/* Preview Stats */}
                      <div className="flex flex-wrap gap-4 mb-2">
                        <div className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${getDifficultyColor(step.difficulty)}`}>
                          <Zap className="w-3 h-3 mr-1.5" />
                          {step.difficulty}
                        </div>
                        {stepVideos.length > 0 && (
                          <div className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                             <Video className="w-3 h-3 mr-1.5" />
                             {stepVideos.length} AI Clip{stepVideos.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>

                      {isActive && (
                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
                          
                          {/* AI Orientation Videos */}
                          {stepVideos.length > 0 && (
                            <div className="space-y-4">
                               <h4 className="text-xs font-black uppercase tracking-widest text-authority-blue flex items-center">
                                 <PlayCircle className="w-4 h-4 mr-2" />
                                 AI Orientation Clips
                               </h4>
                               <div className="space-y-4">
                                  {stepVideos.map(vid => (
                                    <div key={vid.id} className="rounded-2xl overflow-hidden border border-border-light bg-black aspect-video relative group">
                                       <video 
                                        src={vid.url} 
                                        className="w-full h-full object-cover"
                                        controls
                                       />
                                       <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                          <p className="text-[10px] text-white font-medium leading-tight line-clamp-1">{vid.prompt}</p>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                          )}

                          {/* Details Section */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-authority-blue dark:text-steel-blue flex items-center">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Key Requirements
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start text-sm group/item">
                                  <div className="w-1.5 h-1.5 bg-signal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="text-text-muted dark:text-text-dark-muted">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-4 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Fatal Mistakes to Avoid
                            </h4>
                            <ul className="space-y-3">
                              {step.mistakes.map((mistake, i) => (
                                <li key={i} className="text-xs text-red-700/80 dark:text-red-300/80 italic flex items-start">
                                  <span className="mr-2">"</span>
                                  {mistake}
                                  <span className="ml-1">"</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Final Mastery Step */}
            <div className="relative z-10 flex flex-col items-center mt-32 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-signal-gold rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="bg-authority-blue text-white w-48 h-48 rounded-[3rem] flex flex-col items-center justify-center shadow-2xl relative z-10 border-4 border-signal-gold/30">
                  <Trophy className="w-12 h-12 mb-2 text-signal-gold" />
                  <span className="font-bold text-sm uppercase tracking-widest">Compliant Carrier</span>
                </div>
              </div>
              <div className="mt-8 max-w-sm">
                <h3 className="text-2xl font-bold font-serif mb-2">Sustainable Success</h3>
                <p className="text-text-muted text-sm">You are now part of the top 5% of carriers who treat compliance as a competitive advantage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Action Card (Conversion CTA) */}
        <div className="mt-32 p-12 lg:p-20 bg-white dark:bg-surface-dark rounded-[4rem] border border-border-light dark:border-border-dark text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-serif leading-tight">Ready to Start Building Your Audit-Ready Business?</h2>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto leading-relaxed mb-12">
            Get immediate access to all 3 phases, 8 modules, and 46 lessons—plus downloadable templates, checklists, and ongoing support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/enroll" className="bg-authority-blue text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-steel-blue transition-all shadow-xl hover:shadow-2xl flex items-center group">
              View Course Details & Pricing
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathPage;
