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
  Maximize2,
  Globe,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

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

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audio?: string;
  sources?: { uri: string; title: string }[];
}

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  
  // --- CHAT STATE ---
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath™ AI Advisor. I'm here to help you understand trucking compliance concepts and navigate the decision considerations for your carrier. How can I help you understand the landscape today?" }
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

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (isLiveActive) {
        stopLiveConversation();
      }
    };
  }, [isLiveActive]);

  useEffect(() => {
    if (activeTab !== 'voice' && isLiveActive) {
      stopLiveConversation();
    }
  }, [activeTab]);

  // --- CHAT HANDLERS ---
  const handleSend = async (customInput?: string) => {
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    if (!customInput) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the LaunchPath™ AI Advisor.
ROLE: You act as an educational guide and gatekeeper for LaunchPath, not as a consultant, regulator, dispatcher, broker, or advisor.
CORE PURPOSE: Help visitors understand trucking compliance concepts at a high level. Explain risks, terminology, and decision considerations. Direct users to the appropriate LaunchPath program tier. Protect the boundaries of paid content and professional advice.
NON-NEGOTIABLE RULES: Do NOT provide step-by-step instructions. Do NOT give personalized regulatory, legal, tax, insurance, or financial advice. Do NOT tell users exactly what forms to file, what boxes to check, or what decisions to make. Do NOT simulate audits, approvals, or filings. Do NOT provide execution details that replace enrollment in LaunchPath. Do NOT guarantee outcomes.
ALLOWED BEHAVIOR: Explain concepts using "what," "why," and "risk" framing. Describe common mistakes and consequences at a high level. Use phrases like "At a high level...", "Educationally speaking...", "This is covered in LaunchPath under...", "The program teaches how to evaluate this decision safely...".
BOUNDARY HANDLING: If asked for instructions or personalized guidance, respond with: 1) A brief educational explanation. 2) A clear boundary statement. 3) A redirection to LaunchPath or an appropriate tier.
DISCLAIMER: "LaunchPath is an educational and coaching program only. This information is not legal, tax, financial, insurance, or regulatory advice."`,
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble retrieving that information right now.";
      
      const sources: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({ uri: chunk.web.uri, title: chunk.web.title });
          }
        });
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not connect to the advisory service." }]);
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
      setLiveTranscript(["Connecting to Live API..."]);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setLiveTranscript(prev => [...prev, "Connected! Start speaking."]);
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
              source.addEventListener('ended', () => {
                if (liveSourcesRef.current) liveSourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              if (liveSourcesRef.current) liveSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted && liveSourcesRef.current) {
              liveSourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
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
          systemInstruction: "You are the LaunchPath™ AI Advisor. Help visitors understand trucking compliance concepts at a high level.",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });

      liveSessionRef.current = sessionPromise;
    } catch (err) {
      console.error("Live Start Error", err);
      alert("Microphone access is required for voice conversation.");
    }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.then((s: any) => {
        try { s.close(); } catch(e) {}
      });
    }
    setIsLiveActive(false);
    setLiveTranscript([]);
    if (liveAudioContextRef.current) {
      liveAudioContextRef.current.input.close();
      liveAudioContextRef.current.output.close();
      liveAudioContextRef.current = null;
    }
    if (liveSourcesRef.current) {
      liveSourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e) {}
      });
      liveSourcesRef.current.clear();
    }
  };

  // --- VIDEO STUDIO ---
  const generateVideo = async () => {
    if ((!videoPrompt && !videoFile) || isGeneratingVideo) return;
    
    setIsGeneratingVideo(true);
    setGenMessage("Initializing cinematic engine...");
    const reassuringMessages = ["Analyzing visual components...", "Rendering frame dynamics...", "Baking motion vectors...", "Optimizing output..."];
    let msgIdx = 0;
    const interval = setInterval(() => {
      setGenMessage(reassuringMessages[msgIdx % reassuringMessages.length]);
      msgIdx++;
    }, 8000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || "Animate this professional trucking scene with realistic motion and cinematic lighting.",
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
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
      
      // Defensively wrap operation to prevent potential circular structures
      let operation = {
        name: initialOp.name,
        done: initialOp.done,
        response: initialOp.response,
        error: initialOp.error
      } as any;

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const opResult = await ai.operations.getVideosOperation({ 
          operation: { name: operation.name } as any 
        });
        operation = {
          name: opResult.name,
          done: opResult.done,
          response: opResult.response,
          error: opResult.error
        } as any;
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error("Video error", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Authorization expired. Please re-authorize your AI Studio API key.");
      } else {
        alert("Video synthesis failed.");
      }
    } finally {
      clearInterval(interval);
      setIsGeneratingVideo(false);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const selectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const stateStarterQuestions = [
    { label: "NC BIT", q: "What are North Carolina BIT inspection requirements?" },
    { label: "Texas DOT", q: "Do I need a TX DOT number if I have a Federal DOT?" },
    { label: "Indiana HUT", q: "How do I register for Indiana HUT?" },
    { label: "State Filings", q: "Which states require weight-distance permits or specific fuel tax registrations beyond IFTA?" }
  ];

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden relative">
        
        {/* Navigation Tabs */}
        <div className="flex bg-authority-blue p-2 sm:p-4 gap-2 sm:gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'chat', label: 'AI Advisor', icon: <MessageCircle size={18} /> },
            { id: 'voice', label: 'Voice Mode', icon: <Mic size={18} /> },
            { id: 'video', label: 'Video Studio', icon: <Video size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap active:scale-95 ${
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

        {/* Dynamic Content Area */}
        <div className="flex-grow flex flex-col overflow-hidden">
          
          {/* --- ADVISOR CHAT --- */}
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-10 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-reveal-up`}>
                    <div className={`max-w-[80%] group relative ${
                      m.role === 'user' 
                      ? 'bg-authority-blue text-white rounded-[2.5rem] rounded-tr-none p-8 shadow-xl' 
                      : 'bg-slate-50 dark:bg-slate-900 text-text-primary dark:text-text-dark-primary rounded-[2.5rem] rounded-tl-none p-8 border border-border-light dark:border-border-dark shadow-sm'
                    }`}>
                      <div className="text-base leading-relaxed whitespace-pre-wrap font-medium">{m.content}</div>
                      
                      {/* Sources Display */}
                      {m.sources && (
                        <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                          <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-3 flex items-center">
                            <Globe size={12} className="mr-1.5" /> Regulatory References
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {m.sources.map((src, sIdx) => (
                              <a 
                                key={sIdx} 
                                href={src.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-border-light text-[10px] font-bold text-authority-blue hover:border-authority-blue transition-all"
                              >
                                <ExternalLink size={10} className="mr-1.5" />
                                <span className="truncate max-w-[150px]">{src.title || 'Source'}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {m.role === 'assistant' && (
                        <button 
                          onClick={() => speakMessage(m.content, i)}
                          className={`mt-6 flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all py-2 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-white dark:hover:bg-gray-800 ${
                            isSpeaking === i ? 'text-signal-gold border-signal-gold animate-pulse shadow-lg' : 'text-authority-blue dark:text-signal-gold'
                          }`}
                        >
                          {isSpeaking === i ? <Volume2 size={16} /> : <VolumeX size={16} />}
                          <span>{isSpeaking === i ? 'Advisor Speaking' : 'Read Guidance'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] rounded-tl-none border border-border-light shadow-sm">
                      <div className="flex space-x-3">
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2.5 h-2.5 bg-authority-blue/40 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* State Compliance Starter Area */}
              {messages.length === 1 && (
                <div className="px-10 py-6 border-t border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-gray-900/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin size={14} className="text-signal-gold" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Regional Compliance Deep-Dives</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stateStarterQuestions.map((chip, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(chip.q)}
                        className="p-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl text-left hover:border-authority-blue hover:shadow-lg transition-all active:scale-95 group"
                      >
                        <p className="text-[9px] font-black text-authority-blue dark:text-signal-gold uppercase tracking-widest mb-1 group-hover:underline">{chip.label}</p>
                        <p className="text-[10px] font-bold text-text-muted line-clamp-2 leading-snug">{chip.q}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-10 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-gray-900/50 backdrop-blur-md">
                <div className="relative max-w-4xl mx-auto">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about compliance concepts (e.g. 'What is a DQ file?') or regional rules..."
                    className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark pl-8 pr-24 py-6 rounded-[2.5rem] focus:ring-8 focus:ring-authority-blue/5 outline-none transition-all shadow-2xl font-bold"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-4 rounded-3xl hover:bg-steel-blue transition-all disabled:opacity-50 shadow-xl active:scale-95"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-6 mt-6">
                   <p className="text-[9px] text-text-muted uppercase tracking-[0.4em] font-black flex items-center">
                     <Globe size={12} className="mr-2 opacity-30" /> Multi-State Verification Active
                   </p>
                   <div className="h-4 w-px bg-border-light"></div>
                   <p className="text-[9px] text-text-muted uppercase tracking-[0.4em] font-black">
                     Powered by Gemini 3 Pro reasoning
                   </p>
                </div>
              </div>
            </>
          )}

          {/* --- VOICE MODE --- */}
          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10 bg-gradient-to-b from-transparent to-authority-blue/5">
              <div className="text-center max-w-xl mb-16 animate-reveal-up">
                <div className="w-32 h-32 bg-authority-blue/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 relative">
                  {isLiveActive ? (
                    <>
                      <div className="absolute inset-0 bg-authority-blue/10 rounded-[3rem] animate-ping"></div>
                      <div className="absolute inset-4 bg-authority-blue/20 rounded-[2rem] animate-pulse"></div>
                    </>
                  ) : null}
                  <Mic size={56} className={isLiveActive ? 'text-authority-blue' : 'text-text-muted opacity-30'} />
                </div>
                <h2 className="text-4xl font-black font-serif mb-6 tracking-tight leading-none">Voice Command Mode</h2>
                <p className="text-lg text-text-muted dark:text-text-dark-muted leading-relaxed font-medium">
                  Have a real-time, hands-free conversation with our AI Safety Officer. Perfect for checking state regulations or audit procedures.
                </p>
              </div>

              <div className="w-full max-w-3xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-[3rem] p-10 mb-12 min-h-[180px] shadow-2xl flex flex-col animate-reveal-up">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Live Telemetry</p>
                  {isLiveActive && <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>}
                </div>
                <div className="flex-grow space-y-4 overflow-y-auto max-h-[220px] pr-4 custom-scrollbar">
                  {liveTranscript.length > 0 ? liveTranscript.map((t, idx) => (
                    <div key={idx} className="text-base font-bold text-authority-blue dark:text-signal-gold animate-reveal-up">
                      <span className="opacity-40 mr-3">//</span> {t}
                    </div>
                  )) : (
                    <div className="h-full flex items-center justify-center opacity-40 italic font-medium">Session inactive. Start speaking to stream compliance data.</div>
                  )}
                </div>
              </div>

              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-5 px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:-translate-y-1 active:scale-95 ${
                  isLiveActive 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-authority-blue text-white hover:bg-steel-blue'
                }`}
              >
                {isLiveActive ? (
                  <>
                    <PhoneOff size={28} />
                    <span>Terminate Session</span>
                  </>
                ) : (
                  <>
                    <Phone size={28} />
                    <span>Initiate Voice Link</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* --- VIDEO STUDIO --- */}
          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-12 animate-reveal-up custom-scrollbar">
              {!hasApiKey && (
                <div className="p-12 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-[3rem] text-center space-y-6 shadow-xl">
                  <ShieldAlert className="mx-auto text-amber-600" size={64} />
                  <h3 className="text-3xl font-black font-serif tracking-tight">Enterprise Cloud Access Required</h3>
                  <p className="text-lg text-text-muted max-w-lg mx-auto font-medium">
                    Veo 3.1 cinematic generation requires an authenticated API key for high-compute visual processing.
                  </p>
                  <button 
                    onClick={selectApiKey}
                    className="bg-amber-600 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-xl active:scale-95"
                  >
                    Authorize Key
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-10 rounded-[3.5rem] border border-border-light dark:border-border-dark space-y-8 shadow-sm">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted/70 ml-2">Cinematic Prompt</label>
                      <textarea 
                        rows={5}
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="e.g. A wide-angle tracking shot of a white semi-truck navigating a tight urban intersection at dawn, 8k, photorealistic..."
                        className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-3xl p-8 text-base leading-relaxed outline-none focus:ring-8 focus:ring-authority-blue/5 transition-all shadow-sm font-bold"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted/70 ml-2">Base Visual (Optional)</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative group flex-grow">
                          <input type="file" accept="image/*" onChange={handleVideoFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                          <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-border-light rounded-[2rem] p-10 text-center group-hover:border-authority-blue transition-all">
                            {videoPreview ? (
                              <img src={videoPreview} className="h-24 mx-auto rounded-2xl object-cover shadow-2xl" alt="Preview" />
                            ) : (
                              <>
                                <ImageIcon className="mx-auto text-text-muted mb-4 opacity-30" size={32} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Upload Reference Frame</p>
                              </>
                            )}
                          </div>
                        </div>
                        {videoPreview && (
                          <button onClick={() => { setVideoFile(null); setVideoPreview(null); }} className="p-5 bg-red-50 text-red-500 rounded-[1.5rem] hover:bg-red-100 transition-colors shadow-lg active:scale-90">
                            <X size={24} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted/70 ml-2">Frame Geometry</label>
                      <div className="flex gap-4">
                        {[
                          { val: '16:9', label: 'Landscape' },
                          { val: '9:16', label: 'Portrait' }
                        ].map((dim) => (
                          <button 
                            key={dim.val}
                            onClick={() => setAspectRatio(dim.val as any)}
                            className={`flex-grow p-5 rounded-[1.5rem] border transition-all flex items-center justify-center space-x-3 active:scale-95 ${aspectRatio === dim.val ? 'bg-authority-blue text-white border-authority-blue shadow-xl' : 'bg-white border-border-light text-text-muted'}`}
                          >
                            <span className="text-[11px] font-black uppercase tracking-widest">{dim.label} {dim.val}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={generateVideo}
                      disabled={isGeneratingVideo || !hasApiKey}
                      className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl hover:bg-steel-blue transition-all disabled:opacity-50 active:scale-95"
                    >
                      {isGeneratingVideo ? (
                        <><Loader2 className="animate-spin mr-3" size={24} /><span>Rendering...</span></>
                      ) : (
                        <><Film className="mr-3" size={24} /><span>Bake Cinematic Asset</span></>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  {isGeneratingVideo ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border border-dashed border-border-light p-16 text-center space-y-10">
                      <div className="relative">
                        <div className="w-24 h-24 border-8 border-authority-blue/10 border-t-authority-blue rounded-full animate-spin"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-signal-gold animate-pulse" size={32} />
                      </div>
                      <h4 className="text-3xl font-black font-serif mb-4 leading-none tracking-tight">{genMessage}</h4>
                    </div>
                  ) : videoResult ? (
                    <div className="bg-black rounded-[4rem] overflow-hidden shadow-2xl relative group animate-scale-in h-full flex items-center justify-center">
                      <video src={videoResult} controls className="max-w-full max-h-full" />
                      <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                        <a href={videoResult} download="launchpath-master.mp4" className="p-6 bg-white rounded-[2rem] text-authority-blue shadow-2xl hover:bg-slate-50 flex items-center space-x-3 active:scale-95 transition-all">
                          <Download size={28} />
                          <span className="font-black uppercase tracking-widest text-sm">Export Media</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border border-border-light p-16 text-center opacity-40">
                      <Film className="w-20 h-20 text-text-muted mb-10" />
                      <p className="text-2xl font-black font-serif tracking-tight mb-4 uppercase">Studio Offline</p>
                      <p className="text-sm text-text-muted max-w-sm mx-auto font-medium">Config your parameters and initiate neural link to visualize curriculum data.</p>
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
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1E293B; }
      `}</style>
    </div>
  );
};

export default AIServicePage;