
import React, { useState, useRef, useEffect } from 'react';
import { Send, ShieldAlert, Book, Scale, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const AIServicePage = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath Compliance Advisor. I'm trained on FMCSA regulations and safety standards. How can I help you ensure your carrier is audit-ready today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are an expert FMCSA compliance consultant for LaunchPath. Your tone is authoritative, professional, and calm. You provide guidance based on the Federal Motor Carrier Safety Regulations. Always include a disclaimer that you are an AI and your guidance does not constitute legal advice. Focus on box trucks and small owner-operators.",
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble retrieving that information right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the advisory service. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col h-[80vh] bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-authority-blue p-8 text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif">Compliance Advisor</h1>
              <p className="text-white/60 text-xs uppercase tracking-widest font-bold">Expert AI Support</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-sm"><Book className="w-4 h-4 mr-1" /> Regulations</div>
            <div className="flex items-center text-sm"><Scale className="w-4 h-4 mr-1" /> FMCSA Rules</div>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-3xl ${
                m.role === 'user' 
                ? 'bg-authority-blue text-white rounded-tr-none' 
                : 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-text-dark-primary rounded-tl-none'
              }`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-text-muted rounded-full"></div>
                  <div className="w-2 h-2 bg-text-muted rounded-full"></div>
                  <div className="w-2 h-2 bg-text-muted rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-900/50">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about DQ files, Audit Prep, or Insurance requirements..."
              className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark pl-6 pr-20 py-5 rounded-2xl focus:ring-4 focus:ring-authority-blue/10 outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-3 rounded-xl hover:bg-steel-blue transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-center text-text-muted mt-4 uppercase tracking-widest font-bold">
            Disclaimer: Artificial Intelligence guidance. Verify with official FMCSA manuals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIServicePage;
