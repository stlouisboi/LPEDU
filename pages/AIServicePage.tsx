
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  ShieldAlert, 
  Book, 
  Scale, 
  MessageCircle, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Video, 
  Image as ImageIcon,
  Sparkles,
  Loader2,
  X,
  Plus,
  Play,
  Download,
  Film,
  Phone,
  PhoneOff,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';

// --- AUDIO UTILS ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array) {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  
  // --- CHAT STATE ---
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath Compliance Advisor Pro. I handle compliance for both box trucks and semi-truck operations. How can I help your carrier today? I'll keep it short and sweet." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // --- VOICE (LIVE API) STATE ---
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);
  const liveSessionRef = useRef<any>(null);
  const liveAudioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const liveSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, liveTranscript]);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (isLiveActive) stopLiveConversation();
    };
  }, [isLiveActive]);

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
          systemInstruction: "You are the Lead FMCSA Advisor at LaunchPath. Coverage: Box Trucks and Semi-Trucks/CDL. Instructions: Provide DIRECT, SHORT, and SWEET answers. Use bold text for critical regulations. Bullet points for checklists. Differentiate between CDL (Semi) and Non-CDL (Box Truck) rules when relevant. No fluff, just the data needed to pass an audit.",
          temperature: 0.3,
        }
      });

      const aiResponse = response.text || "Connection timeout. Please retry.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to cloud intelligence." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = async (text: string, index: number) => {
    if (isSpeaking === index) return;
    setIsSpeaking(index);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Professional summary: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(null);
        source.start();
      }
    } catch (err) {
      setIsSpeaking(null);
    }
  };

  const startLiveConversation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      liveAudioContextRef.current = { input: inputCtx, output: outputCtx };
      nextStartTimeRef.current = 0;
      setIsLiveActive(true);
      setLiveTranscript(["Establishing Voice Link..."]);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setLiveTranscript(prev => [...prev, "Link Established. Speak now."]);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              sessionPromise.then(session => session.sendRealtimeInput({ media: createBlob(inputData) }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && liveAudioContextRef.current) {
              const outCtx = liveAudioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are the Voice FMCSA Advisor. Give very short, direct voice answers for both semi and box truck owners.",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      alert("Mic access required.");
    }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) liveSessionRef.current.then((s: any) => s.close());
    setIsLiveActive(false);
    if (liveAudioContextRef.current) {
      liveAudioContextRef.current.input.close();
      liveAudioContextRef.current.output.close();
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden relative">
        <div className="flex bg-authority-blue p-4 gap-4 shrink-0">
          <button onClick={() => setActiveTab('chat')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-white text-authority-blue shadow-lg' : 'text-white/60 hover:text-white'}`}>AI Chat Advisor</button>
          <button onClick={() => setActiveTab('voice')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'voice' ? 'bg-white text-authority-blue shadow-lg' : 'text-white/60 hover:text-white'}`}>Hands-Free Voice</button>
        </div>

        <div className="flex-grow flex flex-col overflow-hidden">
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-8 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal-up`}>
                    <div className={`max-w-[75%] p-6 rounded-[2rem] text-base leading-relaxed font-medium shadow-sm ${m.role === 'user' ? 'bg-authority-blue text-white rounded-tr-none' : 'bg-slate-50 dark:bg-slate-900 border border-border-light dark:border-border-dark rounded-tl-none'}`}>
                      {m.content}
                      {m.role === 'assistant' && (
                        <button onClick={() => speakMessage(m.content, i)} className="mt-4 flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold hover:underline">
                          {isSpeaking === i ? <Loader2 className="animate-spin" size={12} /> : <Volume2 size={12} />}
                          <span>Read Aloud</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="animate-spin text-authority-blue mx-auto" />}
              </div>
              <div className="p-8 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-gray-900/50">
                <div className="relative max-w-4xl mx-auto flex items-center space-x-4">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about Semi or Box Truck compliance..." className="flex-grow bg-white dark:bg-gray-800 border border-border-light rounded-[2rem] px-8 py-5 focus:ring-4 focus:ring-authority-blue/5 outline-none font-bold" />
                  <button onClick={handleSend} disabled={isLoading} className="bg-authority-blue text-white p-5 rounded-full shadow-xl hover:bg-steel-blue active:scale-95 transition-all"><Send size={24}/></button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
               <div className={`w-32 h-32 rounded-full mb-8 flex items-center justify-center border-8 transition-all ${isLiveActive ? 'border-signal-gold animate-pulse' : 'border-slate-100 dark:border-gray-800'}`}>
                 <Mic size={56} className={isLiveActive ? 'text-authority-blue' : 'text-slate-300'} />
               </div>
               <h2 className="text-3xl font-black font-serif mb-4">Hands-Free Mode</h2>
               <p className="text-text-muted max-w-md mb-12">Perfect for checking compliance steps while driving or inspecting your truck. Professional guidance for both CDL and non-CDL carriers.</p>
               <button onClick={isLiveActive ? stopLiveConversation : startLiveConversation} className={`px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-white shadow-2xl transition-all active:scale-95 ${isLiveActive ? 'bg-red-500' : 'bg-authority-blue hover:bg-steel-blue'}`}>
                 {isLiveActive ? "Terminate Link" : "Establish Voice Link"}
               </button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; }
      `}</style>
    </div>
  );
};

export default AIServicePage;
