
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  ShieldAlert, 
  MessageCircle, 
  Mic, 
  Volume2, 
  VolumeX,
  Video, 
  Image as ImageIcon,
  Sparkles,
  Loader2, 
  Film,
  Phone,
  PhoneOff,
  Bot,
  User,
  Lock
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, GenerateContentResponse } from '@google/genai';

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
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, audio?: string}[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath Compliance Advisor Pro. I'm powered by Gemini 3 Pro to handle complex regulatory questions. How can I help your carrier today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [isLiveActive, setIsLiveActive] = useState(false);
  const liveSessionRef = useRef<any>(null);
  const liveAudioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const liveSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [genMessage, setGenMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (isLiveActive) stopLiveConversation();
    };
  }, [isLiveActive]);

  useEffect(() => {
    if (activeTab !== 'voice' && isLiveActive) stopLiveConversation();
  }, [activeTab]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are an expert FMCSA compliance consultant for LaunchPath. Authoritative, professional tone. Use markdown for lists and bold text.",
          temperature: 0.7,
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Neural logic fault detected." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the neural advisory service." }]);
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
        contents: [{ parts: [{ text: `Read this professionally and calmly: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      let base64Audio = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            base64Audio = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Audio) {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(null);
        source.start();
      } else {
        setIsSpeaking(null);
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

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            let base64Audio = '';
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  base64Audio = part.inlineData.data;
                  break;
                }
              }
            }

            if (base64Audio && liveAudioContextRef.current) {
              const outCtx = liveAudioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => {
                if (liveSourcesRef.current) liveSourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              liveSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              if (liveSourcesRef.current) {
                liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
                liveSourcesRef.current.clear();
              }
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the LaunchPath Compliance Expert. Professional, authoritative, and concise.'
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      alert("Microphone access is mandatory for Voice Mode.");
    }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.then((s: any) => { try { s.close(); } catch(e) {} });
    }
    setIsLiveActive(false);
    if (liveAudioContextRef.current) {
      liveAudioContextRef.current.input.close().catch(() => {});
      liveAudioContextRef.current.output.close().catch(() => {});
      liveAudioContextRef.current = null;
    }
    if (liveSourcesRef.current) {
      liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
      liveSourcesRef.current.clear();
    }
  };

  const generateVideo = async () => {
    if ((!videoPrompt && !videoFile) || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setGenMessage("Initializing neural synthesis...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || "Professional trucking fleet visualization.",
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
      };
      if (videoFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((res) => {
          reader.onload = () => res((reader.result as string).split(',')[1]);
          reader.readAsDataURL(videoFile);
        });
        config.image = { imageBytes: base64, mimeType: videoFile.type };
      }

      let op = await ai.models.generateVideos(config);
      let opName = op.name;

      while (!op.done) {
        await new Promise(r => setTimeout(r, 10000));
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const result = await pollAi.operations.getVideosOperation({ operation: { name: opName } as any });
        op = { done: result.done, response: result.response, error: result.error, name: opName } as any;
        if (op.error) throw new Error(op.error.message);
      }

      const link = op.response?.generatedVideos?.[0]?.video?.uri;
      if (link) {
        const res = await fetch(`${link}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Session expired. Re-authorization mandatory.");
      } else {
        alert("Synthesis failure. Check directives.");
      }
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-primary-dark min-h-screen py-12 px-6 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 h-[calc(100vh-160px)]">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-xl">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-authority-blue dark:text-signal-gold mb-8 flex items-center">
              <Bot size={18} className="mr-3" /> Neural Advisors
            </h2>
            <nav className="space-y-3">
              {[
                { id: 'chat', label: 'Compliance GPT', icon: <MessageCircle size={18} />, sub: 'Institutional Q&A' },
                { id: 'voice', label: 'Voice Terminal', icon: <Mic size={18} />, sub: 'Low-latency Link' },
                { id: 'video', label: 'Video Studio', icon: <Video size={18} />, sub: 'Asset Synthesis' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-5 rounded-3xl transition-all flex items-center space-x-4 border-2 ${
                    activeTab === tab.id 
                    ? 'bg-authority-blue border-authority-blue text-white shadow-2xl scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-slate-900 border-transparent text-text-muted dark:text-text-dark-muted hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-white dark:bg-gray-800 shadow-sm'}`}>
                    {tab.icon}
                  </div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest">{tab.label}</p>
                    <p className={`text-[10px] uppercase font-bold opacity-60 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>{tab.sub}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Interface */}
        <main className="lg:col-span-9 bg-white dark:bg-surface-dark rounded-[4rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col relative">
          
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-8 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className="flex items-start max-w-[85%] space-x-4">
                      {m.role === 'assistant' && (
                        <div className="w-10 h-10 bg-authority-blue rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg">
                          <Bot size={20} />
                        </div>
                      )}
                      <div className={`p-8 rounded-[2.5rem] ${
                        m.role === 'user' 
                        ? 'bg-authority-blue text-white rounded-tr-none shadow-xl' 
                        : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-tl-none'
                      }`}>
                        <div className="text-base font-medium leading-relaxed prose dark:prose-invert max-w-none">
                          {m.content.split('\n').map((line, li) => <p key={li} className="mb-2 last:mb-0">{line}</p>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 bg-slate-50/50 dark:bg-gray-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10">
                <div className="max-w-4xl mx-auto flex items-center space-x-5">
                  <div className="relative flex-grow">
                    <input 
                      type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Input regulatory inquiry..." 
                      className="w-full bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-white/10 pl-8 pr-16 py-6 rounded-[2.5rem] outline-none shadow-2xl font-bold text-text-primary dark:text-white focus:border-authority-blue dark:focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/5 transition-all dark:placeholder:text-white/20"
                    />
                    <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-authority-blue dark:text-signal-gold opacity-20" size={24} />
                  </div>
                  <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-authority-blue text-white p-6 rounded-[2rem] hover:bg-steel-blue active:scale-95 shadow-xl disabled:opacity-50 transition-all">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-gradient-to-b from-transparent to-authority-blue/[0.02]">
              <div className="text-center mb-16 space-y-10">
                <div className="relative inline-block">
                  <div className={`w-40 h-40 rounded-[4rem] flex items-center justify-center mx-auto transition-all duration-700 border-4 ${isLiveActive ? 'bg-authority-blue border-signal-gold shadow-[0_0_50px_rgba(212,175,55,0.3)]' : 'bg-slate-50 dark:bg-gray-800 border-slate-100 dark:border-white/10'}`}>
                    <Mic size={64} className={isLiveActive ? 'text-white' : 'text-text-muted opacity-30 dark:opacity-50'} />
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Voice Terminal</h2>
                  <p className="text-lg text-text-muted dark:text-text-dark-muted mt-4 font-medium uppercase tracking-[0.2em]">Institutional Low-latency Link</p>
                </div>
              </div>
              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-6 px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl active:scale-95 transition-all ${
                  isLiveActive 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-authority-blue text-white hover:bg-steel-blue'
                }`}
              >
                {isLiveActive ? <PhoneOff size={24} /> : <Phone size={24} />}
                <span>{isLiveActive ? 'Terminate Uplink' : 'Establish Advisory Link'}</span>
              </button>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
              {!hasApiKey ? (
                <div className="max-w-2xl mx-auto p-16 bg-amber-50 dark:bg-amber-950/20 rounded-[4rem] text-center space-y-10 border border-amber-200 dark:border-amber-900/40 shadow-xl mt-12">
                  <ShieldAlert className="mx-auto text-amber-600" size={80} />
                  <button onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))} className="bg-amber-600 text-white px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-amber-700 active:scale-95 transition-all">Authorize Key</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-10">
                     <textarea 
                        rows={8} value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} 
                        placeholder="Describe the cinematic visualization..." 
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-white/10 p-8 rounded-[3rem] font-bold text-sm text-text-primary dark:text-white focus:border-authority-blue dark:focus:border-signal-gold focus:ring-4 focus:ring-signal-gold/5 outline-none shadow-inner dark:placeholder:text-white/20" 
                     />
                     <button onClick={generateVideo} disabled={isGeneratingVideo} className="w-full py-10 rounded-[2.5rem] bg-authority-blue text-white font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center shadow-lg hover:bg-steel-blue active:scale-95 disabled:opacity-50 group border-b-8 border-slate-900">
                        {isGeneratingVideo ? <Loader2 className="animate-spin mr-4" size={24} /> : <Film className="mr-4 group-hover:rotate-12 transition-transform" size={24} />}
                        Synthesize Digital Asset
                     </button>
                   </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIServicePage;
