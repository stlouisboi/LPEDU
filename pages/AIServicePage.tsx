
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

  // Memory Check & Cleanup Effect
  useEffect(() => {
    return () => {
      // Close standard audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      // Stop live sessions
      if (isLiveActive) {
        stopLiveConversation();
      }
    };
  }, [isLiveActive]);

  // Handle cleanup when switching tabs
  useEffect(() => {
    if (activeTab !== 'voice' && isLiveActive) {
      stopLiveConversation();
    }
  }, [activeTab]);

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
          systemInstruction: "You are an expert FMCSA compliance consultant for LaunchPath. Your tone is authoritative, professional, and calm. Use Gemini 3 Pro's deep reasoning to answer complex trucking regulations. Focus on safety management, audits, and legal authority.",
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble retrieving that information right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
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
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
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
              source.addEventListener('ended', () => liveSourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              liveSourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
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
          systemInstruction: "You are the LaunchPath Voice Assistant. Help owner-operators with FMCSA rules. Be brief and professional.",
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
    liveSourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
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
    const messages = ["Analyzing visual components...", "Rendering frame dynamics...", "Baking motion vectors...", "Optimizing output..."];
    let msgIdx = 0;
    const interval = setInterval(() => {
      setGenMessage(messages[msgIdx % messages.length]);
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

      // Clean the initial operation object to strip circular references
      let operation = {
        name: initialOp.name,
        done: initialOp.done,
        response: initialOp.response,
        error: initialOp.error
      } as any;

      // Polling using a cleaned object literal to avoid circular structure crash
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
        alert("Please re-select your AI Studio API key.");
      } else {
        alert("Video generation failed.");
      }
    } finally {
      clearInterval(interval);
      setIsGeneratingVideo(false);
    }
  };

  const selectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden relative">
        
        {/* Navigation Tabs */}
        <div className="flex bg-authority-blue p-2 sm:p-4 gap-2 sm:gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'chat', label: 'AI Advisor', icon: <MessageCircle size={18} /> },
            { id: 'voice', label: 'Voice Command', icon: <Mic size={18} /> },
            { id: 'video', label: 'Video Studio', icon: <Video size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                ? 'bg-white text-authority-blue shadow-lg' 
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
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] group relative ${
                      m.role === 'user' 
                      ? 'bg-authority-blue text-white rounded-3xl rounded-tr-none p-6 shadow-md' 
                      : 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-text-dark-primary rounded-3xl rounded-tl-none p-6 border border-border-light dark:border-border-dark'
                    }`}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                      {m.role === 'assistant' && (
                        <button 
                          onClick={() => speakMessage(m.content, i)}
                          className={`mt-4 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                            isSpeaking === i ? 'text-signal-gold animate-pulse' : 'text-authority-blue dark:text-steel-blue hover:text-signal-gold'
                          }`}
                        >
                          {isSpeaking === i ? <Volume2 size={14} /> : <VolumeX size={14} />}
                          <span>{isSpeaking === i ? 'Speaking...' : 'Read Aloud (TTS)'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl rounded-tl-none border border-border-light">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-authority-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-authority-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-authority-blue rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 border-t border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-900/50">
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your compliance situation for deep reasoning..."
                    className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark pl-6 pr-20 py-5 rounded-2xl focus:ring-4 focus:ring-authority-blue/10 outline-none transition-all shadow-sm font-bold"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-3 rounded-xl hover:bg-steel-blue transition-all disabled:opacity-50 shadow-md"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-text-muted mt-4 uppercase tracking-widest font-bold">
                  Powered by Gemini 3 Pro • Advanced Regulatory Reasoning
                </p>
              </div>
            </>
          )}

          {/* --- VOICE COMMAND --- */}
          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gradient-to-b from-transparent to-authority-blue/5">
              <div className="text-center max-w-lg mb-12 animate-reveal-up">
                <div className="w-24 h-24 bg-authority-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  {isLiveActive ? (
                    <div className="absolute inset-0 bg-authority-blue/20 rounded-full animate-ping"></div>
                  ) : null}
                  <Mic size={48} className={isLiveActive ? 'text-authority-blue animate-pulse' : 'text-text-muted'} />
                </div>
                <h2 className="text-3xl font-bold font-serif mb-4">Conversational Voice App</h2>
                <p className="text-text-muted dark:text-text-dark-muted leading-relaxed">
                  Have a real-time, zero-latency conversation with our AI Safety Officer. Perfect for hands-free compliance checks or mock audit walkthroughs.
                </p>
              </div>

              <div className="w-full max-w-2xl bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-[2rem] p-6 mb-8 min-h-[150px] shadow-sm flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Live Session Activity</p>
                <div className="flex-grow space-y-3 overflow-y-auto max-h-[200px] no-scrollbar">
                  {liveTranscript.length > 0 ? liveTranscript.map((t, idx) => (
                    <div key={idx} className="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                      • {t}
                    </div>
                  )) : (
                    <p className="text-sm text-text-muted italic">Click "Start Session" to begin talking.</p>
                  )}
                </div>
              </div>

              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-3 px-10 py-5 rounded-[2rem] font-bold transition-all shadow-xl hover:scale-105 active:scale-95 ${
                  isLiveActive 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-authority-blue text-white hover:bg-steel-blue'
                }`}
              >
                {isLiveActive ? (
                  <>
                    <PhoneOff size={24} />
                    <span>End Voice Session</span>
                  </>
                ) : (
                  <>
                    <Phone size={24} />
                    <span>Start Voice Session</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* --- VIDEO STUDIO --- */}
          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-8 space-y-12">
              {!hasApiKey && (
                <div className="p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl text-center space-y-4">
                  <ShieldAlert className="mx-auto text-amber-600" size={48} />
                  <h3 className="text-xl font-bold font-serif">Cloud API Key Required</h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto">
                    Veo 3.1 video generation requires a billing-enabled API key from Google AI Studio. This is mandatory for professional video processing.
                  </p>
                  <button 
                    onClick={selectApiKey}
                    className="bg-amber-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-md"
                  >
                    Select API Key
                  </button>
                  <p className="text-[10px] text-text-muted">
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Learn about billing requirements</a>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Generation Form */}
                <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-6">
                    <h3 className="text-lg font-bold font-serif flex items-center">
                      <Sparkles className="mr-2 text-signal-gold" size={20} /> Creative Parameters
                    </h3>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Prompt-to-Video</label>
                      <textarea 
                        rows={4}
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="Describe the cinematic scene..."
                        className="w-full bg-white dark:bg-gray-800 border border-border-light rounded-2xl p-5 text-sm leading-relaxed outline-none focus:ring-4 focus:ring-authority-blue/10 transition-all font-bold"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Animate Image (Optional)</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative group flex-grow">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleVideoFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-border-light rounded-2xl p-6 text-center group-hover:border-authority-blue transition-all">
                            {videoPreview ? (
                              <img src={videoPreview} className="h-16 mx-auto rounded-lg object-cover" alt="Preview" />
                            ) : (
                              <>
                                <ImageIcon className="mx-auto text-text-muted mb-2" size={24} />
                                <p className="text-[10px] font-bold text-text-muted">Upload Photo to Animate</p>
                              </>
                            )}
                          </div>
                        </div>
                        {videoPreview && (
                          <button onClick={() => { setVideoFile(null); setVideoPreview(null); }} className="p-3 bg-red-50 text-red-500 rounded-xl">
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Frame Geometry</label>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setAspectRatio('16:9')}
                          className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center space-x-2 ${aspectRatio === '16:9' ? 'bg-authority-blue text-white border-authority-blue' : 'bg-white border-border-light text-text-muted'}`}
                        >
                          <Maximize2 size={16} />
                          <span className="text-[10px] font-black">Landscape 16:9</span>
                        </button>
                        <button 
                          onClick={() => setAspectRatio('9:16')}
                          className={`flex-grow p-4 rounded-2xl border transition-all flex items-center justify-center space-x-2 ${aspectRatio === '9:16' ? 'bg-authority-blue text-white border-authority-blue' : 'bg-white border-border-light text-text-muted'}`}
                        >
                          <Maximize2 size={16} className="rotate-90" />
                          <span className="text-[10px] font-black">Portrait 9:16</span>
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={generateVideo}
                      disabled={isGeneratingVideo || !hasApiKey}
                      className="w-full bg-authority-blue text-white py-5 rounded-2xl font-bold flex items-center justify-center shadow-xl hover:bg-steel-blue transition-all disabled:opacity-50"
                    >
                      {isGeneratingVideo ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={20} />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Film className="mr-2" size={20} />
                          <span>Generate Veo 3.1 Clip</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Generation Output/Status */}
                <div className="flex flex-col">
                  {isGeneratingVideo ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-dashed border-border-light p-12 text-center space-y-6">
                      <div className="relative">
                        <Loader2 className="w-16 h-16 text-authority-blue animate-spin" />
                        <Sparkles className="absolute -top-2 -right-2 text-signal-gold animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold font-serif mb-2">{genMessage}</h4>
                        <p className="text-sm text-text-muted">Rendering typically requires 2-3 minutes.</p>
                      </div>
                    </div>
                  ) : videoResult ? (
                    <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                      <video src={videoResult} controls className="w-full h-full object-contain" />
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={videoResult} download="launchpath-gen.mp4" className="p-4 bg-white rounded-2xl text-authority-blue shadow-xl hover:bg-slate-50 flex items-center space-x-2">
                          <Download size={20} />
                          <span className="font-bold text-sm">Download</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[2.5rem] border border-border-light p-12 text-center opacity-50">
                      <Film className="w-16 h-16 text-text-muted mb-4" />
                      <p className="text-lg font-bold font-serif">No Content Yet</p>
                      <p className="text-sm text-text-muted max-w-xs mx-auto">Set parameters and click "Generate" to visualize compliance.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIServicePage;
