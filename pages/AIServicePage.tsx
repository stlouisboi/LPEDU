import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageCircle, 
  Mic, 
  Volume2, 
  VolumeX,
  Video, 
  Sparkles,
  Loader2,
  X,
  Download,
  Film,
  Phone,
  PhoneOff,
  Globe,
  Maximize2,
  ShieldAlert
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

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, sources?: any[]}[]>([
    { role: 'assistant', content: "Hello! I'm the LaunchPath™ AI Advisor. Powered by Gemini 3 Pro for complex compliance reasoning. How can I help your carrier today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string[]>([]);
  const liveSessionRef = useRef<any>(null);
  const liveAudioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const liveSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [genMessage, setGenMessage] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the LaunchPath™ AI Advisor. Provide high-level trucking compliance guidance. Neutral, institutional tone.",
          tools: [{ googleSearch: {} }],
          temperature: 0.3,
        }
      });

      const assistantText = response.text || "Connection error. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Reference service offline." }]);
    } finally {
      /* Fix: set isLoading to false to recover from loading state */
      setIsLoading(false);
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
      setLiveTranscript(["Connecting..."]);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setLiveTranscript(prev => [...prev, "Link Established. Speak now."]);
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
          onmessage: async (msg: LiveServerMessage) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
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
            if (msg.serverContent?.interrupted) {
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
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) {
      alert("Microphone access denied.");
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

  const generateVideo = async () => {
    if ((!videoPrompt && !videoFile) || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setGenMessage("Initializing production engine...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let config: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || "Professional trucking cinematic animation.",
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
      while (!op.done) {
        await new Promise(r => setTimeout(r, 10000));
        const opResult = await ai.operations.getVideosOperation({ operation: { name: op.name } as any });
        op = { name: opResult.name, done: opResult.done, response: opResult.response, error: opResult.error } as any;
      }

      const link = op.response?.generatedVideos?.[0]?.video?.uri;
      if (link) {
        const res = await fetch(`${link}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err) {
      alert("Synthesis failed.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-primary-light dark:bg-primary-dark min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col h-[85vh] bg-white dark:bg-surface-dark rounded-[3.5rem] border border-border-light shadow-2xl overflow-hidden relative">
        
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
                activeTab === tab.id ? 'bg-white text-authority-blue shadow-xl' : 'text-white/60 hover:text-white'
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
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-10 scroll-smooth">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[80%] p-8 rounded-[2.5rem] ${m.role === 'user' ? 'bg-authority-blue text-white rounded-tr-none shadow-xl' : 'bg-slate-50 dark:bg-slate-900 border border-border-light rounded-tl-none'}`}>
                      <div className="text-base font-medium leading-relaxed">{m.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && <Loader2 className="animate-spin text-authority-blue mx-auto" />}
              </div>
              <div className="p-10 border-t border-border-light bg-slate-50/50 backdrop-blur-md">
                <div className="relative max-w-4xl mx-auto flex items-center space-x-4">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Inquiry terminal..."
                    className="flex-grow bg-white border border-border-light pl-8 pr-24 py-6 rounded-[2.5rem] outline-none shadow-2xl font-bold"
                  />
                  <button onClick={handleSend} className="bg-authority-blue text-white p-4 rounded-3xl hover:bg-steel-blue active:scale-95 shadow-xl">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10">
              <div className="text-center mb-16">
                <div className="w-32 h-32 bg-authority-blue/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 relative">
                  {isLiveActive && <div className="absolute inset-0 bg-authority-blue/10 rounded-[3rem] animate-ping"></div>}
                  <Mic size={56} className={isLiveActive ? 'text-authority-blue' : 'text-text-muted opacity-30'} />
                </div>
                <h2 className="text-4xl font-black font-serif uppercase">Voice Mode</h2>
                <p className="text-lg text-text-muted mt-4">Low-latency compliance reference audio link.</p>
              </div>
              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`flex items-center space-x-5 px-14 py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all ${
                  isLiveActive ? 'bg-red-500 text-white' : 'bg-authority-blue text-white'
                }`}
              >
                {isLiveActive ? <PhoneOff size={28} /> : <Phone size={28} />}
                <span>{isLiveActive ? 'Terminate Link' : 'Establish Link'}</span>
              </button>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-10">
              {!hasApiKey ? (
                <div className="p-12 bg-amber-50 rounded-[3rem] text-center space-y-6">
                  <ShieldAlert className="mx-auto text-amber-600" size={64} />
                  <h3 className="text-3xl font-black uppercase">Authorization Required</h3>
                  <button onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))} className="bg-amber-600 text-white px-12 py-5 rounded-2xl font-black uppercase shadow-xl">Authorize Studio Key</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div className="space-y-8">
                     <textarea rows={5} value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} placeholder="Visual directives..." className="w-full bg-slate-50 border p-8 rounded-3xl font-bold" />
                     <button onClick={generateVideo} disabled={isGeneratingVideo} className="w-full py-6 rounded-[2rem] bg-authority-blue text-white font-black uppercase tracking-[0.2em] flex items-center justify-center shadow-xl active:scale-95 disabled:opacity-50">
                        {isGeneratingVideo ? <Loader2 className="animate-spin mr-3" /> : <Film className="mr-3" />}
                        Synthesize Asset
                     </button>
                   </div>
                   <div className="bg-slate-50 rounded-[3rem] flex items-center justify-center min-h-[400px] border border-dashed">
                      {isGeneratingVideo ? <div className="text-center space-y-4"><Loader2 className="animate-spin mx-auto" /> <p className="font-bold uppercase tracking-widest text-[10px]">{genMessage}</p></div> : videoResult ? <video src={videoResult} controls className="w-full h-full rounded-[3rem] object-cover" /> : <p className="opacity-30 uppercase font-black tracking-widest text-sm">Studio Idle</p>}
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIServicePage;
