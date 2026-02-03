
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
  X,
  Film,
  Phone,
  PhoneOff,
  Maximize2,
  Lock,
  Zap,
  Bot,
  User,
  ArrowRight,
  Terminal,
  Activity
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

const reassuringMessages = [
  "Synthesizing compliance visuals...", 
  "Baking neural light models...", 
  "Rendering motion vectors...",
  "Finalizing administrative rendering..."
];

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, audio?: string}[]>([
    { role: 'assistant', content: "Authorized Link Active. I am the LaunchPath™ Institutional Advisor. How can I assist your regulatory framework today?" }
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
          systemInstruction: "You are the LaunchPath™ Institutional Compliance Advisor. Authoritative, precise, and professional. Use the Four Pillars as your foundational logic: Authority Protection, Insurance Continuity, Compliance Backbone, Cash-Flow Oxygen.",
          temperature: 0.7,
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Communication timeout." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not reach the neural repository." }]);
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
      } else { setIsSpeaking(null); }
    } catch (err) { setIsSpeaking(null); }
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
                if (part.inlineData?.data) { base64Audio = part.inlineData.data; break; }
              }
            }
            if (base64Audio && liveAudioContextRef.current) {
              const outCtx = liveAudioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => { if (liveSourcesRef.current) liveSourcesRef.current.delete(source); });
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
          systemInstruction: 'You are the LaunchPath Advisor. Professional, authoritative, and direct. Guide carriers through their 90-day stabilization window.'
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) { alert("Microphone access mandatory."); }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) { liveSessionRef.current.then((s: any) => { try { s.close(); } catch(e) {} }); }
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
    setGenMessage(reassuringMessages[0]);
    const msgInterval = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 10000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || "Professional trucking fleet in cinematic lighting.",
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
      let operation = await ai.models.generateVideos(config);
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation: operation });
      }
      if (operation.error) throw new Error(operation.error.message || "Synthesis failed.");
      const link = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (link) {
        const res = await fetch(`${link}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) { setHasApiKey(false); alert("Session expired."); }
      else alert("Synthesis failure.");
    } finally { clearInterval(msgInterval); setIsGeneratingVideo(false); }
  };

  return (
    <div className="bg-[#f0f2f5] dark:bg-primary-dark min-h-screen py-12 px-6">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 h-[calc(100vh-140px)]">
        
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-white dark:bg-surface-dark p-10 rounded-[3.5rem] border border-slate-200 dark:border-border-dark shadow-2xl">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-10 flex items-center">
              <Bot size={18} className="mr-4" /> System Hub
            </h2>
            <nav className="space-y-4">
              {[
                { id: 'chat', label: 'Knowledge Advisor', icon: <MessageCircle size={18} />, sub: 'Institutional Q&A' },
                { id: 'voice', label: 'Audio Link', icon: <Mic size={18} />, sub: 'Low-latency Voice' },
                { id: 'video', label: 'Asset Studio', icon: <Video size={18} />, sub: 'Veo Synthesis' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-6 rounded-[2rem] transition-all flex items-center space-x-5 border-2 ${
                    activeTab === tab.id 
                    ? 'bg-authority-blue border-authority-blue text-white shadow-2xl scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-gray-800 border-transparent text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-white dark:bg-gray-700 shadow-sm'}`}>{tab.icon}</div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest">{tab.label}</p>
                    <p className={`text-[10px] uppercase font-bold opacity-60 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.sub}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          <div className="bg-authority-blue p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
             <Zap className="text-signal-gold mb-6" size={32} />
             <h3 className="text-xl font-black font-serif mb-4 uppercase tracking-tight">Standard Active</h3>
             <p className="text-xs font-medium text-white/50 leading-relaxed uppercase tracking-widest">Training synchronized to FMCSA technical standards. Encryption verified.</p>
          </div>
        </aside>

        <main className="lg:col-span-9 bg-white dark:bg-surface-dark rounded-[5rem] border border-slate-200 dark:border-border-dark shadow-2xl overflow-hidden flex flex-col relative">
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 space-y-10 custom-scrollbar scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className="flex items-start max-w-[80%] space-x-5">
                      {m.role === 'assistant' && <div className="w-12 h-12 bg-authority-blue rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><Bot size={24} /></div>}
                      <div className={`p-10 rounded-[3.5rem] ${
                        m.role === 'user' 
                        ? 'bg-authority-blue text-white rounded-tr-none shadow-xl border-b-[10px] border-slate-900' 
                        : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-tl-none'
                      }`}>
                        <div className="text-lg font-medium leading-relaxed prose dark:prose-invert max-w-none">
                          {m.content.split('\n').map((line, li) => <p key={li} className="mb-3 last:mb-0">{line}</p>)}
                        </div>
                        {m.role === 'assistant' && (
                          <button 
                            onClick={() => speakMessage(m.content, i)} 
                            className={`mt-8 flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.3em] py-3 px-6 rounded-2xl border transition-all ${
                              isSpeaking === i ? 'text-signal-gold border-signal-gold bg-signal-gold/5' : 'text-authority-blue border-slate-200 dark:text-signal-gold'
                            }`}
                          >
                            {isSpeaking === i ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            <span>{isSpeaking === i ? 'Transmitting Audio' : 'Listen to Brief'}</span>
                          </button>
                        )}
                      </div>
                      {m.role === 'user' && <div className="w-12 h-12 bg-slate-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-authority-blue shrink-0 shadow-sm"><User size={24} /></div>}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start"><div className="w-12 h-12 bg-authority-blue/10 rounded-2xl flex items-center justify-center text-authority-blue shrink-0 animate-pulse"><Bot size={24} /></div></div>
                )}
              </div>
              <div className="p-12 bg-slate-50/50 backdrop-blur-2xl border-t border-slate-200">
                <div className="max-w-5xl mx-auto flex items-center space-x-6">
                  <div className="relative flex-grow">
                    <input 
                      type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Input regulatory inquiry..." className="w-full bg-white dark:bg-gray-800 border-2 border-slate-100 pl-10 pr-20 py-8 rounded-[3rem] outline-none shadow-2xl font-black text-lg focus:border-authority-blue"
                    />
                    <Sparkles className="absolute right-8 top-1/2 -translate-y-1/2 text-authority-blue opacity-30" size={32} />
                  </div>
                  <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-authority-blue text-white p-8 rounded-[2.5rem] hover:bg-steel-blue active:scale-95 shadow-2xl transition-all border-b-[8px] border-slate-900">
                    <Send className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-24 bg-gradient-to-b from-transparent to-authority-blue/5">
              <div className="text-center mb-20 space-y-12">
                <div className="relative inline-block">
                  <div className={`w-48 h-48 rounded-[5rem] flex items-center justify-center mx-auto transition-all duration-1000 border-8 ${isLiveActive ? 'bg-authority-blue border-signal-gold shadow-[0_0_100px_rgba(212,175,55,0.4)]' : 'bg-slate-50 dark:bg-gray-800 border-slate-100'}`}>
                    <Mic size={80} className={isLiveActive ? 'text-white' : 'text-slate-200'} />
                  </div>
                  {isLiveActive && <div className="absolute inset-0 bg-signal-gold/20 rounded-[5rem] animate-ping"></div>}
                </div>
                <div>
                  <h2 className="text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Voice Mode</h2>
                  <p className="text-xl text-slate-500 mt-6 uppercase tracking-[0.3em] font-black">Low-latency Institutional Link</p>
                </div>
              </div>
              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-8 px-20 py-10 rounded-[3.5rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl transition-all active:scale-95 border-b-[12px] ${
                  isLiveActive ? 'bg-red-500 text-white border-red-900' : 'bg-authority-blue text-white border-slate-900'
                }`}
              >
                {isLiveActive ? <PhoneOff size={32} /> : <Phone size={32} />}
                <span>{isLiveActive ? 'Terminate Uplink' : 'Initialize Terminal Link'}</span>
              </button>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-16 custom-scrollbar">
              {!hasApiKey ? (
                <div className="max-w-3xl mx-auto p-20 bg-amber-50 rounded-[4rem] text-center space-y-10 border border-amber-200">
                  <ShieldAlert className="mx-auto text-amber-600" size={100} />
                  <h3 className="text-5xl font-black uppercase font-serif tracking-tight text-amber-900">Studio Auth Locked</h3>
                  <button onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))} className="bg-amber-600 text-white px-20 py-8 rounded-[3rem] font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:bg-amber-700 active:scale-95 transition-all">Authorize Terminal Key</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                   <div className="space-y-12">
                     <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[4rem] border border-slate-100">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue mb-8 flex items-center"><Terminal size={18} className="mr-3" /> Synthesis Directives</h3>
                       <textarea rows={8} value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} placeholder="Describe curriculum visual sequence..." className="w-full bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] font-black text-lg outline-none focus:border-authority-blue shadow-inner" />
                     </div>
                     <button onClick={generateVideo} disabled={isGeneratingVideo} className="w-full py-12 rounded-[3rem] bg-authority-blue text-white font-black uppercase tracking-[0.5em] text-[12px] flex items-center justify-center shadow-2xl active:scale-95 border-b-[16px] border-slate-900 disabled:opacity-50">
                        {isGeneratingVideo ? <Loader2 className="animate-spin mr-6" size={32} /> : <Film className="mr-6" size={32} />} Synthesize Digital Asset
                     </button>
                   </div>
                   <div className="space-y-8 flex flex-col h-full">
                      <div className="flex items-center space-x-3 text-authority-blue opacity-40"><Activity size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.5em]">Real-time Synthesis Monitor</span></div>
                      <div className="bg-slate-50 dark:bg-gray-800 rounded-[5rem] border-4 border-dashed border-slate-200 flex-grow flex items-center justify-center relative overflow-hidden group shadow-inner">
                        {isGeneratingVideo ? (
                          <div className="text-center space-y-8 animate-pulse"><Loader2 className="animate-spin text-authority-blue mx-auto" size={60} /><p className="font-black uppercase tracking-[0.4em] text-authority-blue">{genMessage}</p></div>
                        ) : videoResult ? (
                          <video src={videoResult} controls className="w-full h-full object-cover rounded-[4.8rem]" />
                        ) : (
                          <div className="text-center opacity-20"><Film size={120} className="mx-auto mb-8" /><p className="font-black uppercase tracking-[0.5em] text-xl">Terminal Idle</p></div>
                        )}
                      </div>
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
