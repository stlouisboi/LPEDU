
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  CheckCircle,
  FileDown,
  ShieldAlert,
  Sparkles,
  Loader2,
  Lock,
  Cpu
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const DownloadPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const firstName = queryParams.get('name') || 'Carrier';
  
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide a 3-sentence, professional, institutional compliance warning for a new trucking carrier named "${firstName}". Focus on the concept of 'Exposure' in the first 90 days of authority. Tone: Authoritative, helpful, serious. Mention 'LaunchPath Operating Standard'.`,
          config: {
            temperature: 0.7,
            systemInstruction: "You are the LaunchPath Neural Advisor. You provide tactical regulatory insights for motor carriers."
          }
        });
        setAiInsight(response.text || null);
      } catch (err) {
        console.error("AI Insight Error:", err);
      } finally {
        setLoadingInsight(false);
      }
    };
    fetchInsight();
  }, [firstName]);

  const downloads = [
    {
      title: "THE FIRST 90 DAYS RISK MAP™",
      description: "Identify compliance gaps before they become violations. This diagnostic tool reveals exactly what FMCSA auditors look for in new carriers.",
      icon: <FileText className="w-8 h-8" />,
      buttonText: "DOWNLOAD RISK MAP™",
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPathtm-First-90-Days-Overview.pdf?alt=media&token=95f49ef1-f594-4985-a534-68cd09750003",
      bonus: false
    },
    {
      title: "OWNER-OPERATOR SURVIVAL BLUEPRINT",
      description: "Complete system for audit-proof operations. Learn what 75% of failed carriers wish they knew on day one.",
      icon: <ShieldCheck className="w-8 h-8" />,
      buttonText: "DOWNLOAD BLUEPRINT",
      link: "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2FLaunchPath_The_Owner-Operator_Survival_Blueprint%20(2).pdf?alt=media&token=2e42b7cb-e308-49f7-a12f-92dbd19edeca",
      bonus: true
    }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen py-20 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-8 shadow-sm">
             <CheckCircle size={24} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-serif text-authority-blue dark:text-white tracking-tighter mb-4 leading-tight uppercase">
            REGISTRY ACCESS <br/>
            <span className="text-signal-gold italic">AUTHORIZED.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-text-dark-muted font-bold max-w-2xl mx-auto leading-relaxed">
            Welcome, {firstName}. Your requested compliance resources have been staged for download.
          </p>
        </div>

        {/* AI INSIGHT BLOCK - HIGH CONVERSION TOOL */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-[#020617] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border-t-8 border-signal-gold">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
              <Cpu size={140} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="text-signal-gold" size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">ADVISOR_PRE_DIAGNOSTIC_INSIGHT</span>
              </div>
              
              <div className="min-h-[80px]">
                {loadingInsight ? (
                  <div className="flex items-center space-x-4 animate-pulse">
                    <Loader2 className="animate-spin text-signal-gold" size={24} />
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Synthesizing Initial Risk Analysis...</p>
                  </div>
                ) : (
                  <p className="text-xl md:text-2xl font-bold font-serif leading-relaxed italic animate-in slide-in-from-bottom-4">
                    "{aiInsight || `The window of exposure for ${firstName} is open. Without the LaunchPath Operating Standard, the first 90 days often trigger terminal insurance volatility.`}"
                  </p>
                )}
              </div>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  <Lock size={12} className="text-signal-gold" />
                  <span>SECURE_DATA_TRANSMISSION</span>
                </div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">EST_READ: 45s</p>
              </div>
            </div>
          </div>
        </div>

        {/* DOWNLOAD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {downloads.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-signal-gold to-yellow-500 rounded-[3rem] blur opacity-5 group-hover:opacity-10 transition duration-500"></div>
              <div className="relative bg-white dark:bg-surface-dark border border-slate-100 dark:border-border-dark p-10 rounded-[2.5rem] shadow-xl flex flex-col h-full hover:translate-y-[-4px] transition-all duration-300">
                {item.bonus && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-signal-gold text-white px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                    🏅 BONUS_PROTOCOL
                  </div>
                )}
                <div className="w-16 h-16 bg-slate-50 dark:bg-gray-800 text-authority-blue dark:text-signal-gold rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black font-serif text-authority-blue dark:text-white uppercase mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-text-dark-muted font-bold leading-relaxed mb-10 flex-grow text-sm">
                  {item.description}
                </p>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-authority-blue text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center shadow-xl hover:bg-steel-blue transition-all active:scale-95 group/btn"
                >
                  <FileDown className="mr-3 w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="bg-authority-blue rounded-[3.5rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tight mb-8 leading-tight">
              READY TO BUILD YOUR <br/>
              <span className="text-signal-gold italic">COMPLETE COMPLIANCE SYSTEM?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
              These guides show you the gaps. LaunchPath gives you the implementation guards—step by step, pillar by pillar. Secure your authority today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/pricing" 
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-signal-gold text-authority-blue px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl active:scale-95 group"
              >
                <span>VIEW ADMISSION PROTOCOL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/readiness" className="text-white/60 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">Take REACH Test Diagnosis</Link>
            </div>
          </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale pb-12">
          <div className="flex items-center space-x-3">
             <ShieldAlert size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">FMCSA_STND</span>
          </div>
          <div className="flex items-center space-x-3">
             <ShieldCheck size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">AUDIT_READY_V4</span>
          </div>
          <div className="flex items-center space-x-3">
             <CheckCircle size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">LP_CERTIFIED</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DownloadPage;
