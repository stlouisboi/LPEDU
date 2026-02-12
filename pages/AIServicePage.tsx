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
  Bot,
  User,
  ArrowRight,
  Terminal,
  RefreshCw,
  Lock,
  Zap,
  Activity,
  Cpu,
  ExternalLink,
  Globe
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, GenerateContentResponse } from '@google/genai';

// --- INSTITUTIONAL AUDIO UTILITIES (RAW PCM) ---
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
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
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
  "SYNTHESIZING COMPLIANCE VISUALS...", 
  "BAKING NEURAL LIGHT MODELS...", 
  "RENDERING MOTION VECTORS...",
  "FINALIZING ADMINISTRATIVE RENDERING...",
  "CROSS-REFERENCING REGULATORY ASSETS..."
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "SYSTEM_ONLINE: Welcome to the LaunchPath™ Compliance Advisor Terminal. I am your high-fidelity advisor for 49 CFR Part 382, 391, and 396 regulations. How may I assist your authority today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Live Mode State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const liveSessionRef = useRef<any>(null);
  const liveAudioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const liveSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  // Video Mode State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [genMessage, setGenMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, activeTab]);

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
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
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
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are the LaunchPath™ Lead Compliance Specialist. Professional, authoritative, institutional tone. Use Markdown for structured responses. Focus on Accuracy Over Hype. Your goal is to guide new motor carriers toward audit-readiness.",
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
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_FAULT: Connection to neural advisor lost." }]);
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
        contents: [{ parts: [{ text: `Synthesize this professional safety bulletin: ${text}` }] }],
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
          onerror: (e) => {
            console.error("Live Error", e);
            setIsLiveActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the LaunchPath Live Assistant. Speak clearly and professionally. You provide immediate compliance clarity for owner-operators.'
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      alert("Terminal access requires microphone authorization.");
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
    setGenMessage(reassuringMessages[0]);
    const msgInterval = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 8000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic professional trucking visualization: ${videoPrompt}`,
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
        operation = await pollAi.operations.getVideosOperation({ operation });
      }

      if (operation.error) throw new Error(operation.error.message);

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Authorization required. Please select your API key again.");
      } else {
        console.error(err);
        alert("Video synthesis failure. Verify visual directives.");
      }
    } finally {
      clearInterval(msgInterval);
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#020617] min-h-screen pt-24 pb-12 font-sans selection:bg-[#C5A059]/20">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 h-[calc(100vh-160px)]">
        
        {/* Sidebar Terminal Controls */}
        <aside className="lg:col-span-3 space-y-8 h-full flex flex-col">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-xl relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-12"><Cpu size={120}/></div>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-10 flex items-center">
              <Bot size={18} className="mr-3" /> ADVISORY MODES
            </h2>
            <nav className="space-y-4">
              {[
                { id: 'chat', label: 'Compliance GPT', icon: <MessageCircle size={20} />, desc: 'Text-based consultation' },
                { id: 'voice', label: 'Live Link', icon: <Mic size={20} />, desc: 'Voice-to-voice uplink' },
                { id: 'video', label: 'Video Studio', icon: <Video size={20} />, desc: 'Asset synthesis terminal' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-6 rounded-3xl transition-all flex items-center space-x-5 group border-2 ${
                    activeTab === tab.id 
                    ? 'bg-authority-blue border-authority-blue text-white shadow-2xl scale-[1.03]' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-white/20' : 'bg-white dark:bg-slate-700 shadow-inner group-hover:scale-110'}`}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-xs uppercase tracking-widest">{tab.label}</p>
                    <p className={`text-[10px] uppercase font-bold opacity-60 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.desc}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-authority-blue p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex-grow flex flex-col justify-end">
             <div className="absolute top-0 right-0 p-8 opacity-5 scale-150"><Zap size={200}/></div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-3 text-signal-gold">
                   <Activity size={18} className="animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em]">SYSTEM STATUS</p>
                </div>
                <h3 className="text-2xl font-black font-serif uppercase tracking-tight">Institutional <br/><span className="text-signal-gold italic">Uplink Active.</span></h3>
                <p className="text-sm font-medium text-white/50 leading-relaxed uppercase tracking-tighter">
                  Advisory models synchronized to latest 49 CFR Part 382/391 standards.
                </p>
             </div>
          </div>
        </aside>

        {/* Primary Interactive Console */}
        <main className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4rem] shadow-2xl overflow-hidden flex flex-col relative group">
          
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-12 space-y-12 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4`}>
                    <div className="flex items-start max-w-[85%] space-x-6">
                      {m.role === 'assistant' && (
                        <div className="w-12 h-12 bg-authority-blue rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xl border border-white/10 mt-1">
                          <Bot size={24} />
                        </div>
                      )}
                      <div className={`p-10 rounded-[3rem] ${
                        m.role === 'user' 
                        ? 'bg-authority-blue text-white rounded-tr-none shadow-2xl' 
                        : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 rounded-tl-none'
                      }`}>
                        <div className="text-lg font-medium leading-relaxed prose dark:prose-invert max-w-none">
                          {m.content.split('\n').map((line, li) => <p key={li} className="mb-4 last:mb-0">{line}</p>)}
                        </div>
                        
                        {m.sources && (
                          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 w-full mb-2">
                               <Globe size={14} />
                               <span>Regulatory Sources:</span>
                            </div>
                            {m.sources.map((src, sIdx) => (
                              <a 
                                key={sIdx} href={src.uri} target="_blank" rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-authority-blue dark:text-signal-gold hover:shadow-md transition-all active:scale-95"
                              >
                                {src.title} <ExternalLink size={12} className="ml-2" />
                              </a>
                            ))}
                          </div>
                        )}

                        {m.role === 'assistant' && (
                          <button 
                            onClick={() => speakMessage(m.content, i)} 
                            className={`mt-8 flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.3em] py-3 px-6 rounded-2xl border transition-all ${
                              isSpeaking === i 
                              ? 'text-signal-gold border-signal-gold bg-signal-gold/5 animate-pulse shadow-lg' 
                              : 'text-authority-blue border-slate-200 dark:border-slate-700 dark:text-signal-gold hover:bg-white dark:hover:bg-slate-700 hover:shadow-md'
                            }`}
                          >
                            {isSpeaking === i ? <Volume2 size={18} /> : <VolumeX size={18} />}
                            <span>{isSpeaking === i ? 'Advisor speaking' : 'Synthesize Audio'}</span>
                          </button>
                        )}
                      </div>
                      {m.role === 'user' && (
                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-authority-blue dark:text-signal-gold shrink-0 shadow-xl border border-slate-100 dark:border-slate-700 mt-1">
                          <User size={24} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-6 animate-pulse">
                      <div className="w-12 h-12 bg-authority-blue/10 rounded-2xl flex items-center justify-center text-authority-blue shrink-0">
                        <Bot size={24} />
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[3rem] rounded-tl-none border border-slate-100 dark:border-slate-800 flex space-x-3">
                         <div className="w-2.5 h-2.5 bg-authority-blue rounded-full animate-bounce"></div>
                         <div className="w-2.5 h-2.5 bg-authority-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
                         <div className="w-2.5 h-2.5 bg-authority-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-3xl border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto flex items-center space-x-6">
                  <div className="relative flex-grow">
                    <input 
                      type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Input regulatory inquiry here..." className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 pl-10 pr-20 py-7 rounded-[3rem] outline-none shadow-2xl font-black text-lg transition-all focus:border-authority-blue dark:focus:border-signal-gold"
                    />
                    <Sparkles className="absolute right-8 top-1/2 -translate-y-1/2 text-authority-blue dark:text-signal-gold opacity-30 group-hover:opacity-100 transition-opacity" size={28} />
                  </div>
                  <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-authority-blue text-white p-7 rounded-[2rem] hover:bg-slate-800 active:scale-95 shadow-2xl shadow-authority-blue/20 disabled:opacity-50 transition-all border-b-4 border-slate-950">
                    <Send className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-20 bg-gradient-to-b from-transparent to-authority-blue/[0.02]">
              <div className="text-center mb-20 space-y-12">
                <div className="relative inline-block">
                  <div className={`w-56 h-56 rounded-[5rem] flex items-center justify-center mx-auto transition-all duration-1000 border-[6px] ${isLiveActive ? 'bg-authority-blue border-signal-gold shadow-[0_0_100px_rgba(212,175,55,0.4)] scale-110' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-50'}`}>
                    <Mic size={96} className={isLiveActive ? 'text-white' : 'text-slate-300'} />
                  </div>
                  {isLiveActive && <div className="absolute inset-0 bg-signal-gold/30 rounded-[5rem] animate-ping"></div>}
                </div>
                <div>
                  <h2 className="text-6xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white">Voice Terminal</h2>
                  <div className="h-2 w-24 bg-signal-gold mx-auto mt-6 rounded-full"></div>
                  <p className="text-xl text-slate-400 mt-6 font-black uppercase tracking-[0.4em]">Live Multi-Modal Interface</p>
                </div>
              </div>
              
              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-8 px-20 py-10 rounded-[3rem] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] active:scale-95 transition-all border-b-[12px] ${
                  isLiveActive 
                  ? 'bg-red-600 text-white border-red-900 hover:bg-red-700' 
                  : 'bg-authority-blue text-white border-slate-950 hover:bg-slate-800'
                }`}
              >
                {isLiveActive ? <PhoneOff size={32} /> : <Phone size={32} />}
                <span>{isLiveActive ? 'Terminate Uplink' : 'Establish Advisory Link'}</span>
              </button>

              <div className="mt-20 flex items-center space-x-4 opacity-40">
                 <Lock size={16} className="text-signal-gold" />
                 <p className="text-[11px] font-black uppercase tracking-[0.5em]">Institutional Encryption Standard Active</p>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-12 lg:p-20 custom-scrollbar">
              {!hasApiKey ? (
                <div className="max-w-2xl mx-auto p-20 bg-amber-50 dark:bg-amber-950/20 rounded-[4rem] text-center space-y-12 border-2 border-amber-200 dark:border-amber-900/40 shadow-2xl mt-12 animate-reveal-up">
                  <ShieldAlert className="mx-auto text-amber-600" size={100} />
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-amber-800 dark:text-amber-400 font-serif leading-none">Studio Key Required</h3>
                    <p className="text-lg font-bold text-amber-700/60 dark:text-amber-300/60 leading-relaxed uppercase tracking-widest">
                      Visual synthesis requires a validated Google AI Studio key.
                    </p>
                  </div>
                  <button onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))} className="bg-amber-600 text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-amber-700 active:scale-95 transition-all border-b-8 border-amber-900">Authorize Terminal Key</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                   <div className="space-y-12 animate-reveal-up">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-8 flex items-center">
                          <Terminal size={18} className="mr-3" /> PRODUCTION DIRECTIVES
                       </h3>
                       <textarea 
                        rows={8} value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} 
                        placeholder="Describe the cinematic visualization (e.g. 'A professional box truck carrier inspecting a new unit at a clean logistics facility')..." 
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 p-8 rounded-[3rem] font-black text-lg focus:border-authority-blue dark:focus:border-signal-gold outline-none shadow-2xl transition-all" 
                       />
                     </div>
                     
                     <div className="space-y-8 px-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Cinematic Framework</h3>
                        <div className="flex gap-6">
                          {(['16:9', '9:16'] as const).map(ratio => (
                            <button 
                              key={ratio} onClick={() => setAspectRatio(ratio)}
                              className={`flex-grow py-6 rounded-3xl font-black border-2 transition-all uppercase tracking-widest text-[11px] ${aspectRatio === ratio ? 'bg-authority-blue border-authority-blue text-white shadow-2xl scale-105' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-authority-blue'}`}
                            >
                              {ratio === '16:9' ? 'Landscape (16:9)' : 'Portrait (9:16)'}
                            </button>
                          ))}
                        </div>
                     </div>

                     <button onClick={generateVideo} disabled={isGeneratingVideo || !videoPrompt.trim()} className="w-full py-10 rounded-[3rem] bg-authority-blue text-white font-black uppercase tracking-[0.5em] text-sm flex items-center justify-center shadow-2xl hover:bg-slate-800 active:scale-95 disabled:opacity-30 group border-b-[12px] border-slate-950 transition-all">
                        {isGeneratingVideo ? <Loader2 className="animate-spin mr-5" size={32} /> : <Film className="mr-5 group-hover:rotate-12 transition-transform" size={32} />}
                        SYNTESIZE ASSET
                     </button>
                   </div>
                   
                   <div className="space-y-8 animate-reveal-up" style={{ animationDelay: '0.1s' }}>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-signal-gold mb-8">SYNTHESIS MONITOR</h3>
                      <div className="bg-slate-50 dark:bg-slate-800/30 rounded-[5rem] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden group shadow-inner">
                        {isGeneratingVideo ? (
                          <div className="text-center space-y-10 px-12">
                            <div className="relative">
                              <div className="w-32 h-32 bg-authority-blue/5 rounded-full border-[6px] border-authority-blue border-t-transparent dark:border-signal-gold dark:border-t-transparent animate-spin mx-auto shadow-2xl"></div>
                              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-authority-blue dark:text-signal-gold" size={40} />
                            </div>
                            <div className="space-y-4">
                               <p className="font-black text-2xl uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold animate-pulse leading-tight">{genMessage}</p>
                               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Veo 3.1 Neural Production Engine</p>
                            </div>
                          </div>
                        ) : videoResult ? (
                          <div className="w-full h-full animate-in zoom-in-95 duration-1000">
                            <video src={videoResult} controls className="w-full h-full object-cover rounded-[4.6rem]" />
                          </div>
                        ) : (
                          <div className="text-center p-20 opacity-20 group-hover:opacity-40 transition-opacity">
                             <VisualMonitorIcon size={120} className="mx-auto mb-10" />
                             <p className="uppercase font-black tracking-[0.8em] text-sm">Monitor Standby</p>
                          </div>
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

// Reusable monitor icon component for the video state
const VisualMonitorIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export default AIServicePage;