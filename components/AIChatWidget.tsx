import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ShieldCheck, ArrowRight, Globe, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am the LaunchPath™ Compliance Reference Assistant. I can help explain trucking compliance terminology and FMCSA system logic. How can I assist your high-level understanding today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    if (!customInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the LaunchPath™ Compliance Reference Assistant.
ROLE: You act as a neutral educational resource explaining compliance terminology and FMCSA system logic.
CORE PURPOSE: Help visitors understand trucking compliance concepts at a high level. Explain risks and terminology.
THE FOUR PILLARS: "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen." Always use this definition when asked about the Pillars.
NON-NEGOTIABLE RULES: Do NOT provide step-by-step instructions. Do NOT give personalized advice. Do NOT attempt to sell or coach. Do NOT auto-open. Do NOT promote yourself as a feature.
ALLOWED BEHAVIOR: Use phrases like "At a high level...", "Educationally speaking...", "Regulatory terminology defines this as...".
DISCLAIMER: "LaunchPath is an educational and coaching program only. This information is not legal, tax, financial, insurance, or regulatory advice."`,
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        }
      });

      const assistantText = response.text || "Connection lost. Try again.";
      
      const sources: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title });
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
      let errorMsg = "System offline. Check your connection.";
      if (err.message === "API_KEY_MISSING") {
        errorMsg = "Reference service is currently unconfigured. Please contact support.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const starterQuestions = [
    "What are The Four Pillars?",
    "What are BIT inspection requirements?",
    "What is a DQ file?",
    "Compliance risks for new carriers?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-surface-dark w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-authority-blue p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-signal-gold rounded-xl flex items-center justify-center text-authority-blue shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-tighter leading-none">Compliance Reference</h3>
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-1">Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-primary-dark/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-authority-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-text-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark rounded-tl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
                
                {m.sources && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                    {m.sources.slice(0, 2).map((src, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={src.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-2 py-1 bg-white/50 dark:bg-gray-900/50 border border-border-light text-[8px] font-black uppercase text-authority-blue rounded-md hover:bg-white transition-all"
                      >
                        <ExternalLink size={8} className="mr-1" /> {src.title || 'Source'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 px-5 py-3.5 rounded-[1.5rem] rounded-tl-none border border-border-light dark:border-border-dark flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-authority-blue/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Starter Prompts */}
          {messages.length === 1 && !loading && (
            <div className="p-4 grid grid-cols-1 gap-2 bg-white dark:bg-gray-900 border-t border-border-light dark:border-border-dark">
              <div className="flex items-center space-x-2 mb-1 px-1">
                <Globe size={10} className="text-signal-gold" />
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Inquiries</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {starterQuestions.map((q) => (
                  <button 
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left px-3 py-1.5 bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-[9px] font-bold uppercase tracking-tight text-authority-blue dark:text-signal-gold rounded-lg border border-slate-100 dark:border-gray-700 transition-all flex items-center justify-between group"
                  >
                    <span>{q}</span>
                    <ArrowRight size={10} className="ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Terminology search..."
                className="w-full bg-slate-50 dark:bg-gray-800 border border-border-light dark:border-border-dark pl-5 pr-14 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-authority-blue/5 text-sm font-bold placeholder:opacity-50"
              />
              <button 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-2.5 rounded-xl hover:bg-steel-blue transition-all disabled:opacity-30 disabled:grayscale shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-authority-blue text-white p-5 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(30,58,95,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center space-x-3 group border border-white/10 relative"
        >
          <div className="absolute inset-0 rounded-[2rem] ring-4 ring-authority-blue/20 animate-pulse"></div>
          <div className="bg-signal-gold p-1.5 rounded-lg text-authority-blue group-hover:rotate-12 transition-transform shadow-sm">
            <MessageCircle size={24} />
          </div>
          <span className="font-black uppercase tracking-widest text-xs pr-2 hidden sm:block">Compliance Reference</span>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;