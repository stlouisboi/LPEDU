import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Loader2, X, Bot, User, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

const AIServicePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "SYSTEM_ONLINE: Welcome to the LaunchPath™ Compliance Advisor. I am your high-fidelity advisor for 49 CFR Part 382, 391, and 396 regulations. Ask me anything about carrier compliance, institutional governance, or operational readiness." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are the LaunchPath™ Lead Compliance Specialist. Professional, authoritative, institutional tone. Use Markdown for structured responses. Focus on Accuracy Over Hype. Your goal is to guide new motor carriers toward audit-readiness and institutional governance. Reference the Four Pillars of Survival: Authority, Insurance, Compliance, and Cash Flow.",
          tools: [{ googleSearch: {} }],
          thinkingConfig: { thinkingBudget: 4000 },
          temperature: 0.2,
        }
      });

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
        content: response.text || "LOGIC_ERROR: Communication link timeout.",
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_FAULT: Connection to neural advisor lost. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-authority-navy to-authority-navy-dark pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-8 h-8 text-signal-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Compliance <span className="text-signal-gold italic">ADVISOR</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Your institutional AI advisor for 49 CFR compliance, operational readiness, and governance questions.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-authority-navy-light rounded-lg border border-signal-gold/20 overflow-hidden flex flex-col h-[600px] sm:h-[700px]">
          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-signal-gold/20 border border-signal-gold/50 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-signal-gold" />
                    </div>
                  </div>
                )}
                
                <div className={`max-w-2xl ${msg.role === 'user' ? 'bg-signal-gold text-authority-navy rounded-lg rounded-tr-none' : 'bg-authority-navy border border-signal-gold/20 text-gray-100 rounded-lg rounded-tl-none'} p-4`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  
                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className={`text-xs font-semibold mb-2 ${msg.role === 'user' ? 'text-authority-navy/70' : 'text-gray-400'}`}>
                        Regulatory References:
                      </p>
                      <div className="space-y-2">
                        {msg.sources.map((source, i) => (
                          <a
                            key={i}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-xs hover:underline ${msg.role === 'user' ? 'text-authority-navy/80' : 'text-signal-gold'}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-signal-gold/20 border border-signal-gold/50 flex items-center justify-center">
                      <User className="w-5 h-5 text-signal-gold" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-signal-gold/20 border border-signal-gold/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-signal-gold" />
                  </div>
                </div>
                <div className="bg-authority-navy border border-signal-gold/20 text-gray-100 rounded-lg rounded-tl-none p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-signal-gold" />
                    <span className="text-sm">Synthesizing response...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-signal-gold/20 p-4 bg-authority-navy">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about compliance, regulations, or operational readiness..."
                className="flex-1 bg-authority-navy-light border border-signal-gold/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-signal-gold transition"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-signal-gold hover:bg-signal-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-authority-navy font-bold px-6 py-3 rounded transition flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Four Pillars Reference */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Authority', desc: 'Regulatory Compliance' },
            { title: 'Insurance', desc: 'Risk Mitigation' },
            { title: 'Compliance', desc: 'Operational Standards' },
            { title: 'Cash Flow', desc: 'Financial Sustainability' },
          ].map((pillar, idx) => (
            <div key={idx} className="bg-authority-navy-light rounded p-4 border border-signal-gold/20 text-center">
              <p className="text-signal-gold font-bold mb-1">{pillar.title}</p>
              <p className="text-gray-400 text-sm">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-authority-navy-light rounded-lg p-8 border border-signal-gold/20 text-center">
          <p className="text-gray-300 mb-4">
            Ready for a comprehensive institutional assessment?
          </p>
          <a
            href="/ground-0"
            className="inline-block bg-signal-gold hover:bg-signal-gold/90 text-authority-navy font-bold px-8 py-3 rounded transition"
          >
            Enter Ground 0
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIServicePage;
