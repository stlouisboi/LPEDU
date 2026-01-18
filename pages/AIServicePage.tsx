
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
  Download,
  Film,
  Phone,
  PhoneOff,
  Globe,
  ExternalLink,
  Maximize2,
  Brush
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
  // Fix: Handle Uint8Array views correctly on the underlying ArrayBuffer
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

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audio?: string;
  sources?: { uri: string; title: string }[];
}

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'image' | 'video'>('chat');
  
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

  // --- IMAGE STATE ---
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('16:9');

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
      if (audioContextRef.current) audioContextRef.current.close();
      if (isLiveActive) stopLiveConversation();
    };
  }, [isLiveActive]);

  useEffect(() => {
    if (activeTab !== 'voice' && isLiveActive) stopLiveConversation();
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
          systemInstruction: "You are the LaunchPath™ AI Advisor. Help visitors understand trucking compliance concepts at a high level. Explain risks, terminology, and decision considerations. THE FOUR PILLARS: \"The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen.\" Always use this definition. Direct users to the appropriate LaunchPath program tier. Disclaimer: LaunchPath is an educational program only. This is not legal or regulatory advice.",
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble retrieving that information right now.";
      const sources: { uri: string; title: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) sources.push({ uri: chunk.web.uri, title: chunk.web.title });
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
        contents: [{ parts: [{ text: `Read this professionally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
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
              liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              liveSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are the LaunchPath™ AI Advisor. Help trucking operators with FMCSA compliance concepts professionally. THE FOUR PILLARS: \"The Four Pillars are the four operational systems that determine whether a new carrier keeps its authority active: Authority Protection, Insurance Continuity, Compliance Backbone, and Cash-Flow Oxygen.\"",
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      alert("Microphone access is required.");
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
    if (liveSourcesRef.current) {
      liveSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
      liveSourcesRef.current.clear();
    }
  };

  // --- IMAGE STUDIO ---
  const generateImage = async () => {
    if (!imagePrompt.trim() || isGeneratingImage) return;
    setIsGeneratingImage(true);
    setGenMessage("Synthesizing professional visualization...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `A professional, high-quality photograph of ${imagePrompt}. The scene should look realistic and authoritative, suitable for trucking compliance education. Sharp focus, clean composition.` }] },
        config: {
          imageConfig: {
            aspectRatio: imageAspectRatio
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setImageResult(`data:image/png;base64,${base64Data}`);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Image gen error:", error);
      alert("Failed to synthesize image. Please try a different prompt.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // --- VIDEO STUDIO ---
  const generateVideo = async () => {
    if ((!videoPrompt && !videoFile) || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setGenMessage("Initializing cinematic engine...");
    const reassuringMessages = ["Analyzing frame dynamics...", "Baking neural light models...", "Rendering visual output..."];
    let msgIdx = 0;
    const interval = setInterval(() => {
      setGenMessage(reassuringMessages[msgIdx % reassuringMessages.length]);
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

      // Fix: Poll with minimal operation identifier to avoid circular structure crash
      let opResponse = await ai.models.generateVideos(config);
      let operation = { name: opResponse.name, done: opResponse.done };
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const updatedOp = await ai.operations.getVideosOperation({ operation: { name: operation.name } as any });
        operation.done = updatedOp.done;
        if (updatedOp.done) {
          opResponse = updatedOp;
        }
      }

      const downloadLink = opResponse.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error("Video error", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Authorization expired. Please re-select your key.");
      } else {
        alert("Video generation failed.");
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

  const starterQuestions = [
    { label: "NC BIT", q: "What are North Carolina BIT inspection requirements?" },
    { label: "Texas DOT", q: "Do I need a TX DOT number if I have a Federal DOT?" },
    { label: "DQ Files", q: "What documents are required in a DQ file?" },
    { label: "Audit Risks", q: "What are the common compliance risks for new carriers?" }
  ];

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-2xl overflow-hidden relative">
        
        {/* Navigation Tabs */}
        <div className="flex bg-authority-blue p-2 sm:p-4 gap-2 sm:gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'chat', label: 'AI Advisor', icon: <MessageCircle size={18} /> },
            { id: 'voice', label: 'Voice Mode', icon: <Mic size={18} /> },
            { id: 'image', label: 'Image Studio', icon: <Brush size={18} /> },
            { id: 'video', label: 'Video Studio', icon: <Video size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap active:scale-95 ${
                activeTab === tab.id ? 'bg-white text-authority-blue shadow-xl' : 'text-white/60 hover:text-white hover:bg-white/10'
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
                      {m.sources && (
                        <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                          <p className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-3 flex items-center">
                            <Globe size={12} className="mr-1.5" /> Regulatory References
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {m.sources.map((src, sIdx) => (
                              <a key={sIdx} href={src.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-border-light text-[10px] font-bold text-authority-blue hover:border-authority-blue transition-all">
                                <ExternalLink size={10} className="mr-1.5" />
                                <span className="truncate max-w-[150px]">{src.title || 'Source'}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      {m.role === 'assistant' && (
                        <button onClick={() => speakMessage(m.content, i)} className={`mt-6 flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all py-2 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-white dark:hover:bg-gray-800 ${isSpeaking === i ? 'text-signal-gold border-signal-gold animate-pulse shadow-lg' : 'text-authority-blue dark:text-signal-gold'}`}>
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
              
              {messages.length === 1 && (
                <div className="px-10 py-6 border-t border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-gray-900/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {starterQuestions.map((chip, idx) => (
                      <button key={idx} onClick={() => handleSend(chip.q)} className="p-4 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl text-left hover:border-authority-blue hover:shadow-lg transition-all active:scale-95 group">
                        <p className="text-[9px] font-black text-authority-blue dark:text-signal-gold uppercase tracking-widest mb-1 group-hover:underline">{chip.label}</p>
                        <p className="text-[10px] font-bold text-text-muted line-clamp-2 leading-snug">{chip.q}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-10 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-gray-900/50 backdrop-blur-md">
                <div className="relative max-w-4xl mx-auto">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about compliance concepts..." className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark pl-8 pr-24 py-6 rounded-[2.5rem] focus:ring-8 focus:ring-authority-blue/5 outline-none transition-all shadow-2xl font-bold" />
                  <button onClick={() => handleSend()} disabled={isLoading} className="absolute right-3 top-1/2 -translate-y-1/2 bg-authority-blue text-white p-4 rounded-3xl hover:bg-steel-blue transition-all disabled:opacity-50 shadow-xl active:scale-95">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* --- VOICE MODE --- */}
          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10 bg-gradient-to-b from-transparent to-authority-blue/5">
              <div className="text-center max-w-xl mb-16">
                <div className="w-32 h-32 bg-authority-blue/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 relative">
                  {isLiveActive && <div className="absolute inset-0 bg-authority-blue/10 rounded-[3rem] animate-ping"></div>}
                  <Mic size={56} className={isLiveActive ? 'text-authority-blue' : 'text-text-muted opacity-30'} />
                </div>
                <h2 className="text-4xl font-black font-serif mb-6 tracking-tight">Voice Command Mode</h2>
                <p className="text-lg text-text-muted dark:text-text-dark-muted font-medium">Hands-free compliance assistance powered by Gemini Real-time API.</p>
              </div>
              <button onClick={isLiveActive ? stopLiveConversation : startLiveConversation} className={`flex items-center space-x-5 px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${isLiveActive ? 'bg-red-500 text-white' : 'bg-authority-blue text-white'}`}>
                {isLiveActive ? <><PhoneOff size={28} /><span>Terminate Session</span></> : <><Phone size={28} /><span>Initiate Voice Link</span></>}
              </button>
            </div>
          )}

          {/* --- IMAGE STUDIO --- */}
          {activeTab === 'image' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-12 animate-reveal-up custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-10 rounded-[3.5rem] border border-border-light space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3">Visual Prompt</label>
                      <textarea rows={5} value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} placeholder="Describe a compliance scenario or truck design (e.g., A clean white box truck parked professionally in a logistics yard at sunset)..." className="w-full bg-white dark:bg-gray-800 border rounded-3xl p-8 outline-none focus:ring-8 focus:ring-authority-blue/5 font-bold" />
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-3">Aspect Ratio</label>
                      <div className="flex flex-wrap gap-3">
                        {['1:1', '4:3', '3:4', '16:9', '9:16'].map(ratio => (
                          <button 
                            key={ratio} 
                            onClick={() => setImageAspectRatio(ratio as any)} 
                            className={`px-6 py-3 rounded-xl border transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest ${imageAspectRatio === ratio ? 'bg-authority-blue text-white shadow-lg' : 'bg-white text-text-muted'}`}
                          >
                            {ratio}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={generateImage} disabled={isGeneratingImage || !imagePrompt.trim()} className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl active:scale-95 disabled:opacity-50">
                      {isGeneratingImage ? <><Loader2 className="animate-spin mr-3" size={24} /><span>Synthesizing...</span></> : <><Brush className="mr-3" size={24} /><span>Synthesize Visualization</span></>}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  {isGeneratingImage ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border-dashed border p-16 text-center space-y-10">
                      <div className="w-24 h-24 border-8 border-authority-blue/10 border-t-authority-blue rounded-full animate-spin"></div>
                      <h4 className="text-3xl font-black font-serif leading-none">{genMessage}</h4>
                    </div>
                  ) : imageResult ? (
                    <div className="relative group animate-scale-in">
                      <div className="bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center">
                        <img src={imageResult} className="max-w-full max-h-full" alt="Generated compliance visualization" />
                      </div>
                      <a href={imageResult} download="launchpath-visualization.png" className="absolute bottom-10 right-10 p-6 bg-white rounded-full text-authority-blue shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95">
                        <Download size={24} />
                      </a>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border p-16 text-center opacity-40">
                      <ImageIcon className="w-20 h-20 text-text-muted mb-10" />
                      <p className="text-2xl font-black font-serif uppercase">Studio Offline</p>
                      <p className="text-sm font-bold text-text-muted mt-4">Enter a prompt to generate high-fidelity regulatory visualizations.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --- VIDEO STUDIO --- */}
          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-12 animate-reveal-up custom-scrollbar">
              {!hasApiKey && (
                <div className="p-12 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-[3rem] text-center shadow-xl">
                  <ShieldAlert className="mx-auto text-amber-600 mb-6" size={64} />
                  <h3 className="text-3xl font-black font-serif mb-6">Cloud Authorization Required</h3>
                  <button onClick={selectApiKey} className="bg-amber-600 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest active:scale-95">Authorize API Key</button>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="bg-slate-50 dark:bg-gray-800/50 p-10 rounded-[3.5rem] border border-border-light space-y-8">
                    <textarea rows={5} value={videoPrompt} onChange={(e) => setVideoPrompt(e.target.value)} placeholder="Describe your compliance visualization..." className="w-full bg-white dark:bg-gray-800 border rounded-3xl p-8 outline-none focus:ring-8 focus:ring-authority-blue/5 font-bold" />
                    <div className="flex items-center space-x-4">
                      <div className="relative group flex-grow">
                        <input type="file" accept="image/*" onChange={handleVideoFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="bg-white dark:bg-gray-800 border-2 border-dashed rounded-[2rem] p-10 text-center group-hover:border-authority-blue">
                          {videoPreview ? <img src={videoPreview} className="h-24 mx-auto rounded-2xl" alt="Preview" /> : <p className="text-[10px] font-black uppercase text-text-muted">Upload Reference Frame</p>}
                        </div>
                      </div>
                      {videoPreview && <button onClick={() => { setVideoFile(null); setVideoPreview(null); }} className="p-5 bg-red-50 text-red-500 rounded-[1.5rem] active:scale-90"><X size={24} /></button>}
                    </div>
                    <div className="flex gap-4">
                      {['16:9', '9:16'].map(ratio => (
                        <button key={ratio} onClick={() => setAspectRatio(ratio as any)} className={`flex-grow p-5 rounded-[1.5rem] border transition-all active:scale-95 ${aspectRatio === ratio ? 'bg-authority-blue text-white shadow-xl' : 'bg-white text-text-muted'}`}>
                          <Maximize2 className={ratio === '9:16' ? 'rotate-90 mx-auto' : 'mx-auto'} size={20} />
                          <span className="text-[10px] font-black uppercase">{ratio}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={generateVideo} disabled={isGeneratingVideo || !hasApiKey} className="w-full bg-authority-blue text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center shadow-2xl active:scale-95 disabled:opacity-50">
                      {isGeneratingVideo ? <><Loader2 className="animate-spin mr-3" size={24} /><span>Rendering...</span></> : <><Film className="mr-3" size={24} /><span>Bake Cinematic Asset</span></>}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  {isGeneratingVideo ? (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border-dashed border p-16 text-center space-y-10">
                      <div className="w-24 h-24 border-8 border-authority-blue/10 border-t-authority-blue rounded-full animate-spin"></div>
                      <h4 className="text-3xl font-black font-serif leading-none">{genMessage}</h4>
                    </div>
                  ) : videoResult ? (
                    <div className="bg-black rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center">
                      <video src={videoResult} controls className="max-w-full max-h-full" />
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-800/30 rounded-[4rem] border p-16 text-center opacity-40">
                      <Film className="w-20 h-20 text-text-muted mb-10" />
                      <p className="text-2xl font-black font-serif uppercase">Studio Offline</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AIServicePage;
