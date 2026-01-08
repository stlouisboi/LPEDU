import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "I'm your FMCSA Quick-Advisor. Ask me anything about compliance for box trucks or semi-trucks. I'll keep it short and sweet." }
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
          systemInstruction: "You are the LaunchPath Quick-Advisor. Role: FMCSA Compliance Expert for both Box Trucks and Semi-Trucks. Style: DIRECT, SHORT, SWEET. NO fluff. NO long introductions. Use bullet points for steps. Maximum 3 sentences per response unless strictly necessary. Provide specific regulatory guidance (e.g., mention CDL requirements where they differ for Semis). Focus on helping new carriers survive audits.",
          temperature: 0.5,
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Connection lost. Try again." }]);
    } catch (err: any) {
      console.error("AI Advisor Error:", err);
      let errorMsg = "System offline. Check your connection.";
      if (err.message === "API_KEY_MISSING") {
        errorMsg = "AI service is currently unconfigured. Please contact support.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const starterQuestions = [
    "DQ file checklist?",
    "HOS rules for Semis?",
    "Box truck audit prep?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-surface-dark w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-authority-blue p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-signal-gold rounded-xl flex items-center justify-center text-authority-blue">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-tighter leading-none">Compliance AI</h3>
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-1">Short & Sweet Guidance</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-primary-dark/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-authority-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-text-primary dark:text-text-dark-primary border border-border-light dark:border-border-dark rounded-tl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
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
              {starterQuestions.map((q) => (
                <button 
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left px-4 py-2 bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-700 text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold rounded-xl border border-slate-100 dark:border-gray-700 transition-all flex items-center justify-between group"
                >
                  <span>{q}</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
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
                placeholder="Ask about compliance..."
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
          className="bg-authority-blue text-white p-5 rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center space-x-3 group border border-white/10"
        >
          <div className="bg-signal-gold p-1.5 rounded-lg text-authority-blue group-hover:rotate-12 transition-transform">
            <MessageCircle size={24} />
          </div>
          <span className="font-black uppercase tracking-widest text-xs pr-2 hidden sm:block">Ask Advisor</span>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;