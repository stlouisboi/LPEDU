
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ShieldCheck, ArrowRight, Globe, ExternalLink, Terminal, Activity, Zap, Cpu } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

/**
 * AIChatWidget: The Institutional Reference Terminal
 * Provides neutral educational context on compliance terminology.
 */
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "SYSTEM_ONLINE: Welcome to the LaunchPath™ Compliance Assistant. I can assist in clarifying trucking regulations and institutional standards. How can I facilitate your understanding today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isInitializing]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsInitializing(true);
    setTimeout(() => setIsInitializing(false), 2000);
  };

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    if (!customInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the LaunchPath™ Compliance Assistant.
ROLE: You act as a neutral educational resource explaining compliance terminology and FMCSA system logic.
CORE PURPOSE: Help visitors understand trucking compliance concepts at a high level. Explain risks and terminology.
THE FOUR PILLARS: "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen." Always use this definition when asked about the Pillars.
NON-NEGOTIABLE RULES: Do NOT provide step-by-step instructions. Do NOT give personalized advice. Do NOT attempt to sell or coach. Do NOT auto-open.
DISCLAIMER: "LaunchPath is an educational and coaching program only. This information is not legal, tax, financial, insurance, or regulatory advice."`,
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        }
      });

      const assistantText = response.text || "I was unable to synthesize a response. Please rephrase your inquiry.";
      
      const sources: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && Array.isArray(chunks)) {
        chunks.forEach((chunk: any) => {
          if (chunk.web && chunk.web.uri) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title || 'Regulatory Reference' });
          }
        });
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (err: any) {
      console.error("AI Reference Error:", err);
      const errorMsg = "SYSTEM_FAULT: Compliance assistant uplink unstable. Please re-initialize inquiry.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-[#0c1a2d] w-[380px] sm:w-[440px] h-[600px] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border-[4px] border-white/5 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          
          {/* Header */}
          <div className="bg-authority-blue p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-signal-gold rounded-2xl flex items-center justify-center text-authority-blue shadow-[0_0_20px_rgba(198,146,42,0.3)]">
                <Terminal size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] leading-none">ADVISOR_TERMINAL</h3>
                <p className="text-signal-gold/60 text-[9px] font-black uppercase tracking-[0.4em] mt-2 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                  SECURE_LINK_V4.2
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-all p-2 bg-white/5 rounded-full" aria-label="Close Assistant">
              <X size={20} />
            </button>
          </div>

          {/* Initializing Animation */}
          {isInitializing ? (
            <div className="flex-grow flex flex-col items-center justify-center space-y-8 bg-black/40">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-signal-gold/10 border-t-signal-gold rounded-full animate-spin"></div>
                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-signal-gold" size={32} />
              </div>
              <div className="text-center space-y-2">
                <p className="text-[10px] font-black text-signal-gold uppercase tracking-[0.5em] animate-pulse">INITIATING_NEURAL_LINK...</p>
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">CFR_REGS_DATABASE_SYNC</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Body */}
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-[#0c1a2d]/50 custom-scrollbar relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in duration-500`}>
                    <div className={`max-w-[90%] px-6 py-4 rounded-[1.8rem] text-sm leading-relaxed shadow-xl border-b-4 ${
                      m.role === 'user' 
                      ? 'bg-authority-blue text-white rounded-tr-none border-slate-900 font-bold' 
                      : 'bg-[#1e293b] text-slate-200 border-black rounded-tl-none font-medium'
                    }`}>
                      {m.content}
                    </div>
                    
                    {m.sources && (
                      <div className="mt-3 flex flex-wrap gap-2 max-w-[90%]">
                        {m.sources.slice(0, 3).map((src, sIdx) => (
                          <a 
                            key={sIdx} 
                            href={src.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] font-black uppercase text-signal-gold rounded-xl hover:bg-white hover:text-authority-blue transition-all"
                          >
                            <Globe size={10} className="mr-2" /> {src.title || 'Regulatory Source'}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start animate-in fade-in">
                    <div className="bg-[#1e293b] px-6 py-4 rounded-[1.8rem] rounded-tl-none border-b-4 border-black flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-signal-gold rounded-full animate-bounce [animation-delay:0s]"></div>
                      <div className="w-1.5 h-1.5 bg-signal-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-signal-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-[#0c1a2d] border-t border-white/10">
                <div className="relative group">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Input terminal inquiry..."
                    className="w-full bg-black/40 border-2 border-white/5 pl-6 pr-16 py-5 rounded-2xl outline-none focus:border-signal-gold/50 text-sm font-bold text-white placeholder:text-white/10 uppercase tracking-widest transition-all shadow-inner"
                    aria-label="Compliance Assistant input"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-signal-gold text-authority-blue p-3.5 rounded-xl hover:bg-white transition-all disabled:opacity-20 disabled:grayscale shadow-lg active:scale-95 group"
                    aria-label="Send message"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                  </button>
                </div>
                <p className="text-[8px] text-center text-white/20 uppercase tracking-[0.5em] mt-4 font-black">
                  Registry Encryption: AES-256_ACTIVE
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <button 
          onClick={handleOpen}
          className="group relative h-20 w-20 sm:h-24 sm:w-24 bg-authority-blue rounded-[2.5rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white/10 overflow-hidden"
          aria-label="Open Compliance Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-signal-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex flex-col items-center">
            <MessageCircle size={28} className="text-signal-gold group-hover:rotate-12 transition-transform duration-500" />
            <div className="mt-2 h-1 w-6 bg-signal-gold/20 rounded-full overflow-hidden">
               <div className="h-full bg-signal-gold w-1/2 animate-shimmer"></div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 opacity-10 group-hover:opacity-30 transition-all rotate-12">
            <Cpu size={48} />
          </div>
        </button>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default AIChatWidget;
