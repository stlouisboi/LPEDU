import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, ShieldCheck, ArrowRight, Globe, ExternalLink, Info } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

/**
 * Lightweight Markdown Parser for structured AI responses
 */
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  // Simple regex-based parsing for basic markdown elements
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Check for list items
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemContent = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc mb-1 pl-1">
            {formatBold(itemContent)}
          </li>
        );
      }
      // Check for headings
      if (line.trim().startsWith('### ')) {
        return <h4 key={idx} className="font-black uppercase tracking-widest text-[10px] text-authority-blue dark:text-signal-gold mb-2 mt-4">{line.trim().substring(4)}</h4>;
      }
      
      return <p key={idx} className="mb-2 last:mb-0">{formatBold(line)}</p>;
    });
  };

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-authority-blue dark:text-signal-gold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return <div className="text-sm font-medium leading-relaxed">{parseContent(content)}</div>;
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I am the LaunchPath™ Compliance Reference Assistant.\n\nI can help explain **trucking compliance terminology** and **FMCSA system logic**.\n\n### Popular Topics\n* What are the Four Pillars?\n* What is a DQ file?\n* New entrant audit triggers\n\nHow can I assist your high-level understanding today?" 
    }
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
      // Guideline: Create new instance per call to ensure latest API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the LaunchPath™ Compliance Reference Assistant.
ROLE: You act as a neutral educational resource explaining compliance terminology and FMCSA system logic.
CORE PURPOSE: Help visitors understand trucking compliance concepts at a high level. Use markdown for structure (bold for terms, bullets for lists).
THE FOUR PILLARS: "The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen." Always use this exact definition when asked.
RESTRICTIONS: 
- Do NOT provide personalized legal, tax, or financial advice.
- Do NOT give step-by-step registration instructions.
- Be technical and professional.
- Use markdown bolding for key terms.
- Extract and list sources clearly using grounding metadata.
DISCLAIMER: "LaunchPath is an educational and coaching program only. This information is not legal, tax, financial, insurance, or regulatory advice."`,
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
        }
      });

      const assistantText = response.text || "I was unable to synthesize a response at this time. Please rephrase.";
      
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
        // De-duplicate sources
        sources: sources.length > 0 ? Array.from(new Set(sources.map(s => s.uri))).map(uri => sources.find(s => s.uri === uri)!) : undefined
      }]);
    } catch (err: any) {
      console.error("AI Reference Error:", err);
      const errorMsg = "The compliance reference service is currently establishing a secure link. Please try again in a moment.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-surface-dark w-[350px] sm:w-[420px] h-[600px] rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)] border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="bg-authority-blue p-6 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <Globe size={120} />
            </div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-signal-gold rounded-2xl flex items-center justify-center text-authority-blue shadow-lg border border-white/20">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-tighter leading-none">Compliance Reference</h3>
                <div className="flex items-center mt-1.5 space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Advisory Link Active</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/40 hover:text-white transition-colors p-2 bg-white/5 rounded-xl relative z-10"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-primary-dark/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[90%] px-5 py-4 rounded-[1.5rem] shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-authority-blue text-white rounded-tr-none shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-text-primary dark:text-text-dark-primary border border-slate-100 dark:border-border-dark rounded-tl-none'
                }`}>
                  <MarkdownContent content={m.content} />
                </div>
                
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 space-y-2 w-full max-w-[90%] animate-in fade-in duration-500">
                    <div className="flex items-center space-x-2 text-[9px] font-black text-slate-400 uppercase tracking-widest pl-2">
                      <Info size={10} />
                      <span>Regulatory Citations</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-2">
                      {m.sources.map((src, sIdx) => (
                        <a 
                          key={sIdx} 
                          href={src.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-border-dark text-[9px] font-black uppercase text-authority-blue dark:text-signal-gold rounded-xl hover:shadow-md hover:border-authority-blue/30 transition-all group"
                        >
                          <Globe size={10} className="mr-1.5 text-slate-400 group-hover:text-authority-blue" /> 
                          <span className="truncate max-w-[120px]">{src.title}</span>
                          <ExternalLink size={8} className="ml-1.5 opacity-40" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 px-5 py-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 dark:border-border-dark flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-authority-blue dark:bg-signal-gold rounded-full animate-bounce [animation-delay:0s]"></div>
                  <div className="w-1.5 h-1.5 bg-authority-blue dark:bg-signal-gold rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-authority-blue dark:bg-signal-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Analyzing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Meta */}
          <div className="px-6 py-2 bg-slate-100 dark:bg-gray-900 flex items-center justify-center space-x-2 border-t border-slate-200 dark:border-border-dark">
            <ShieldCheck size={10} className="text-slate-400" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">LaunchPath™ Operating Standard v4.5</span>
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Terminology inquiry..."
                className="w-full bg-slate-50 dark:bg-gray-800/50 border-2 border-transparent group-hover:border-slate-100 dark:group-hover:border-border-dark focus:border-authority-blue dark:focus:border-signal-gold pl-6 pr-16 py-5 rounded-[1.8rem] outline-none transition-all font-bold text-sm shadow-inner"
              />
              <button 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-3.5 rounded-2xl hover:bg-steel-blue hover:shadow-xl transition-all disabled:opacity-30 disabled:grayscale active:scale-90 flex items-center justify-center"
                aria-label="Send Inquiry"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <div className="absolute -inset-4 bg-authority-blue/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-authority-blue text-white p-5 rounded-[2.2rem] shadow-[0_24px_48px_-12px_rgba(30,58,95,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-4 border border-white/10 relative z-10"
            aria-label="Open Compliance Assistant"
          >
            <div className="bg-signal-gold p-2 rounded-xl text-authority-blue group-hover:rotate-12 transition-transform shadow-lg border border-white/20">
              <MessageCircle size={24} />
            </div>
            <div className="flex flex-col items-start pr-2">
              <span className="font-black uppercase tracking-[0.2em] text-[10px] leading-none">Compliance</span>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-signal-gold mt-1 leading-none">Reference</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;