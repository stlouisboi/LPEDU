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
  // Tabs: 'chat', 'voice', 'video'
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  
  // --- CHAT STATE ---
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, audio?: string}[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath Compliance Advisor Pro. I'm now powered by Gemini 3 Pro to handle complex regulatory questions. How can I help your carrier today?" }
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

  // --- VIDEO STATE ---
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [genMessage, setGenMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, liveTranscript]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (isLiveActive) stopLiveConversation();
    };
  }, [isLiveActive]);

  useEffect(() => {
    if (activeTab !== 'voice' && isLiveActive) stopLiveConversation();
  }, [activeTab, isLiveActive]);

  // --- CHAT HANDLERS ---
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
          systemInstruction: "You are an expert FMCSA compliance consultant for LaunchPath. Your tone is authoritative, professional, and calm. Answer complex trucking regulations with clarity. Focus on safety management, audits, and legal authority.",
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble retrieving that information right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the advisory service. Please check your network." }]);
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
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
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
      }
    } catch (err) {
      console.error("TTS failed", err);
      setIsSpeaking(null);
    }
  };

  // --- LIVE AUDIO HANDLERS ---
  const startLiveConversation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      liveAudioContextRef.current = { input: inputCtx, output: outputCtx };
      
      nextStartTimeRef.current = 0;
      setIsLiveActive(true);
      setLiveTranscript(["Establishing secure audio link..."]);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setLiveTranscript(prev => [...prev, "Advisor online. Ask your question."]);
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
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && liveAudioContextRef.current) {
              const outCtx = liveAudioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => liveSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              liveSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
              liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              liveSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: (e) => {
            console.error("Live Error", e);
            setIsLiveActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are the LaunchPath Voice Assistant. Professional, brief, and accurate regarding FMCSA rules.",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });

      liveSessionRef.current = sessionPromise;
    } catch (err) {
      console.error("Live Start Error", err);
      alert("Microphone access is required for real-time mode.");
    }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.then((s: any) => { try { s.close(); } catch(e) {} });
    }
    setIsLiveActive(false);
    setLiveTranscript([]);
    if (liveAudioContextRef.current) {
      liveAudioContextRef.current.input.close();
      liveAudioContextRef.current.output.close();
      liveAudioContextRef.current = null;
    }
    liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    liveSourcesRef.current.clear();
  };

  // --- VIDEO GENERATION HANDLERS ---
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const generateVideo = async () => {
    if ((!videoPrompt && !videoFile) || isGeneratingVideo) return;
    
    setIsGeneratingVideo(true);
    setGenMessage("Initializing cinematic engine...");
    const loadingStates = ["Analyzing visual components...", "Rendering frame dynamics...", "Baking motion vectors...", "Optimizing 720p output..."];
    let msgIdx = 0;
    const interval = setInterval(() => {
      setGenMessage(loadingStates[msgIdx % loadingStates.length]);
      msgIdx++;
    }, 8000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || "Professional trucking scene with cinematic lighting.",
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

      let initialOp = await ai.models.generateVideos(config);
      let operation = { name: initialOp.name, done: initialOp.done } as any;

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const opResult = await ai.operations.getVideosOperation({ 
          operation: { name: operation.name } as any 
        });
        operation = { name: opResult.name, done: opResult.done, response: opResult.response };
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error("Video error", err);
      alert("Visual generation encountered a cloud error.");
    } finally {
      clearInterval(interval);
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden relative">
        
        {/* Navigation Tabs */}
        <div className="flex bg-authority-blue p-2 sm:p-4 gap-2 sm:gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'chat', label: 'AI Advisor', icon: <MessageCircle size={18} /> },
            { id: 'voice', label: 'Voice Link', icon: <Mic size={18} /> },
            { id: 'video', label: 'Video Studio', icon: <Video size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap active:scale-95 ${
                activeTab === tab.id 
                ? 'bg-white text-authority-blue shadow-xl' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-grow flex flex-col overflow-hidden">
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-8 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal-up`}>
                    <div className={`max-w-[80%] group relative ${
                      m.role === 'user' 
                      ? 'bg-authority-blue text-white rounded-[2.5rem] rounded-tr-none p-8 shadow-xl' 
                      : 'bg-slate-50 dark:bg-slate-900 text-text-primary dark:text-text-dark-primary rounded-[2.5rem] rounded-tl-none p-8 border border-border-light dark:border-border-dark shadow-sm'
                    }`}>
                      <div className="text-base leading-relaxed whitespace-pre-wrap font-medium">{m.content}</div>
                      {m.role === 'assistant' && (
                        <button 
                          onClick={() => speakMessage(m.content, i)}
                          className={`mt-6 flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all py-2 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-white dark:hover:bg-gray-800 ${
                            isSpeaking === i ? 'text-signal-gold border-signal-gold animate-pulse' : 'text-authority-blue dark:text-signal-gold'
                          }`}
                        >
                          {isSpeaking === i ? <Volume2 size={16} /> : <VolumeX size={16} />}
                          <span>Read Guidance</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] rounded-tl-none border border-border-light shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-10 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-gray-900/50 backdrop-blur-md">
                <div className="relative max-w-4xl mx-auto">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about compliance regulations or safety systems..."
                    className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark pl-8 pr-24 py-6 rounded-[2.5rem] focus:ring-8 focus:ring-authority-blue/5 outline-none transition-all shadow-2xl font-bold"
                  />
                  <button onClick={handleSend} disabled={isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-4 rounded-3xl hover:bg-steel-blue transition-all disabled:opacity-50 shadow-xl active:scale-95">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10 bg-gradient-to-b from-transparent to-authority-blue/5">
              <div className="text-center max-w-xl mb-12 animate-reveal-up">
                <div className="w-32 h-32 bg-authority-blue/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 relative">
                  {isLiveActive && <div className="absolute inset-0 bg-authority-blue/10 rounded-[3rem] animate-ping"></div>}
                  <Mic size={56} className={isLiveActive ? 'text-authority-blue' : 'text-text-muted opacity-30'} />
                </div>
                <h2 className="text-4xl font-black font-serif mb-6 tracking-tight">Voice Telemetry</h2>
                <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium">Real-time low-latency link with our AI Safety Officer.</p>
              </div>
              <div className="w-full max-w-3xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-[3rem] p-8 min-h-[180px] shadow-2xl flex flex-col mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-6">Session Logs</p>
                <div className="flex-grow space-y-4 overflow-y-auto max-h-[220px] custom-scrollbar">
                  {liveTranscript.map((t, idx) => (
                    <div key={idx} className="text-base font-bold text-authority-blue dark:text-signal-gold animate-reveal-up">
                      <span className="opacity-30 mr-2">&gt;</span> {t}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={isLiveActive ? stopLiveConversation : startLiveConversation} className={`flex items-center space-x-4 px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 ${isLiveActive ? 'bg-red-500 text-white' : 'bg-authority-blue text-white'}`}>
                {isLiveActive ? <><PhoneOff size={24} /><span>End Session</span></> : <><Phone size={24} /><span>Initiate Link</span></>}
              </button>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-12 animate-reveal-up custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-10 rounded-[3.5rem] border border-border-light dark:border-border-dark space-y-8 shadow-sm">
                    <h3 className="text-2xl font-black font-serif tracking-tight flex items-center"><Sparkles className="mr-3 text-signal-gold" size={24} /> Video Directives</h3>
                    <textarea rows={4} value={videoPrompt} onChange={(e) => setVideoPrompt(e.target.value)} placeholder="Describe your cinematic compliance visualization..." className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-3xl p-6 text-base outline-none focus:ring-8 focus:ring-authority-blue/5 transition-all shadow-sm font-bold" />
                    <div className="flex gap-4">
                      {['16:9', '9:16'].map(v => (
                        <button key={v} onClick={() => setAspectRatio(v as any)} className={`flex-grow p-5 rounded-[1.5rem] border transition-all text-[11px] font-black uppercase tracking-widest ${aspectRatio === v ? 'bg-authority-blue text-white border-authority-blue shadow-xl' : 'bg-white border-border-light text-text-muted'}`}>{v === '16:9' ? 'Landscape' : 'Portrait'}</button>
                      ))}
                    </div>
                    <button onClick={generateVideo} disabled={isGeneratingVideo || !hasApiKey} className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-steel-blue transition-all disabled:opacity-50 active:scale-95">
                      {isGeneratingVideo ? <><Loader2 className="animate-spin mr-3" /> Rendering...</> : <><Film className="mr-3" /> Bake Asset</>}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  {isGeneratingVideo ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border border-dashed border-border-light p-16 text-center space-y-8 shadow-inner">
                      <div className="w-20 h-20 border-8 border-authority-blue/10 border-t-authority-blue rounded-full animate-spin"></div>
                      <h4 className="text-2xl font-black font-serif">{genMessage}</h4>
                      <p className="text-text-muted">High-fidelity cloud processing typically requires 120s.</p>
                    </div>
                  ) : videoResult ? (
                    <div className="bg-black rounded-[4rem] overflow-hidden shadow-2xl relative animate-scale-in">
                      <video src={videoResult} controls className="w-full h-full object-contain" />
                      <a href={videoResult} download className="absolute bottom-6 right-6 p-4 bg-white rounded-2xl text-authority-blue shadow-2xl flex items-center space-x-2 font-black uppercase tracking-widest text-[10px] active:scale-90 transition-all"><Download size={20} /><span>Export</span></a>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border border-border-light p-16 text-center opacity-40">
                      <Film className="w-16 h-16 text-text-muted mb-6" />
                      <p className="text-lg font-black uppercase tracking-widest">Studio Offline</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; }
      `}</style>
    </div>
  );
};

export default AIServicePage;
