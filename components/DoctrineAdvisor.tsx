/**
 * Doctrine Advisor Component
 * Round 4 Build 4D: Copilot placement and UI
 * 
 * Terminal-style interface for institutional inquiry
 * Following Portal Brief: "Terminal or formal inquiry system style. Dark background. Monospace font."
 */

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, X, ShieldAlert, AlertTriangle } from 'lucide-react';
import { copilotService } from '../services/copilotService';
import { useEnhancedAuth } from '../EnhancedAuthContext';
import { carrierService } from '../services/carrierService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const DoctrineAdvisor: React.FC = () => {
  const { currentUser } = useEnhancedAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [carrierId, setCarrierId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      loadCarrier();
    }
  }, [currentUser]);

  const loadCarrier = async () => {
    if (currentUser) {
      const carrier = await carrierService.getCarrierByUserId(currentUser.uid);
      if (carrier) {
        setCarrierId(carrier.id);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentUser || !carrierId || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const { response, escalated } = await copilotService.askAdvisor(
        currentUser.uid,
        carrierId,
        userMessage
      );

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'System error. Your coach has been notified.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#020617] border-2 border-signal-gold rounded-full flex items-center justify-center text-signal-gold shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-110 transition-transform z-50 group"
        title="DOCTRINE ADVISOR"
      >
        <Terminal size={24} />
        <span className="absolute right-20 bg-[#020617] border border-signal-gold px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Doctrine Advisor
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-md h-[600px] bg-[#020617] border-2 border-signal-gold rounded-3xl flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)] z-[100] overflow-hidden">
      {/* Terminal Header */}
      <div className="p-6 border-b border-signal-gold/20 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-signal-gold" size={20} />
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Doctrine Advisor</h2>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest">Institutional Terminal v1.0</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="text-slate-500 italic">
            <p>State your question. I will answer from the LaunchPath Standard or direct you to your coach.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-signal-gold/10 border border-signal-gold/20 text-signal-gold' 
                : 'bg-white/5 border border-white/10 text-slate-300'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
            <span className="text-[8px] uppercase tracking-widest text-slate-600 mt-2 px-2">
              {msg.role === 'user' ? 'Carrier' : 'Advisor'}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-signal-gold animate-pulse">
            <div className="w-1.5 h-1.5 bg-signal-gold rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-signal-gold rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-signal-gold rounded-full"></div>
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="p-6 border-t border-signal-gold/20 bg-white/[0.02]">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Inquiry..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs text-white font-mono outline-none focus:border-signal-gold/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 p-2 text-signal-gold hover:scale-110 transition-transform disabled:opacity-30 disabled:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4 text-[8px] text-slate-600 uppercase tracking-widest">
          <AlertTriangle size={10} />
          <span>Answers restricted to LaunchPath Doctrine</span>
        </div>
      </div>
    </div>
  );
};
