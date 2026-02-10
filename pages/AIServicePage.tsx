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
  Cpu
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
  "FINALIZING ADMINISTRATIVE RENDERING..."
];

const AIServicePage = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'video'>('chat');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "SYSTEM_ONLINE: Welcome to the LaunchPath™ Compliance Advisor Terminal. How may I assist your authority today?" }
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
          systemInstruction: "You are the LaunchPath™ Lead Compliance Specialist. Professional, authoritative tone. Accuracy Over Hype.",
          temperature: 0.2,
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "COMMUNICATION_LINK_FAULT." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "CRITICAL_FAULT: LINK LOST." }]);
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

      let base64Audio = '';
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) { base64Audio = part.inlineData.data; break; }
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
            let base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && liveAudioContextRef.current) {
              const outCtx = liveAudioContextRef.current.output;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              liveSourcesRef.current.add(source);
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the LaunchPath Live Assistant. Professional and direct.'
        }
      });
      liveSessionRef.current = sessionPromise;
    } catch (err) { alert("Microphone access required."); }
  };

  const stopLiveConversation = () => {
    if (liveSessionRef.current) liveSessionRef.current.then((s: any) => s.close());
    setIsLiveActive(false);
  };

  const generateVideo = async () => {
    if (!videoPrompt.trim() || isGeneratingVideo) return;
    setIsGeneratingVideo(true);
    setGenMessage(reassuringMessages[0]);
    const msgInterval = setInterval(() => {
      setGenMessage(reassuringMessages[Math.floor(Math.random() * reassuringMessages.length)]);
    }, 8000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Trucking professional visual: ${videoPrompt}`,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await res.blob();
        setVideoResult(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error(err);
      alert("Synthesis fault.");
    } finally {
      clearInterval(msgInterval);
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#020617] min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-12 font-sans overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-auto lg:h-[calc(100vh-140px)]">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3 space-y-4 lg:space-y-8 flex flex-col">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] shadow-xl relative overflow-hidden flex-shrink-0">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold mb-6 flex items-center">
              <Bot size={16} className="mr-2" /> MODES
            </h2>
            <nav className="space-y-2 sm:space-y-4">
              {[
                { id: 'chat', label: 'Compliance GPT', icon: <MessageCircle size={20} /> },
                { id: 'voice', label: 'Live Link', icon: <Mic size={20} /> },
                { id: 'video', label: 'Video Studio', icon: <Video size={20} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all flex items-center space-x-4 border-2 ${
                    activeTab === tab.id 
                    ? 'bg-authority-blue border-authority-blue text-white shadow-xl' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-transparent text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${activeTab === tab.id ? 'bg-white/20' : 'bg-white dark:bg-slate-700 shadow-inner'}`}>
                    {tab.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-xs uppercase tracking-widest">{tab.label}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex bg-authority-blue p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex-grow flex-col justify-end">
             <div className="absolute top-0 right-0 p-8 opacity-5 scale-150"><Zap size={200}/></div>
             <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-3 text-signal-gold">
                   <Activity size={18} className="animate-pulse" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em]">SYSTEM ACTIVE</p>
                </div>
                <h3 className="text-2xl font-black font-serif uppercase tracking-tight">Institutional <br/><span className="text-signal-gold italic">Uplink.</span></h3>
             </div>
          </div>
        </aside>

        {/* MAIN CONSOLE */}
        <main className="lg:col-span-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] sm:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col relative min-h-[500px]">
          
          {activeTab === 'chat' && (
            <>
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-8 sm:space-y-12 scroll-smooth custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className="flex items-start max-w-[90%] sm:max-w-[85%] space-x-4 sm:space-x-6">
                      {m.role === 'assistant' && (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-authority-blue rounded-xl sm:rounded-2xl flex items-center justify-center text-white shrink-0 mt-1">
                          <Bot size={20} />
                        </div>
                      )}
                      <div className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] ${
                        m.role === 'user' 
                        ? 'bg-authority-blue text-white rounded-tr-none shadow-2xl' 
                        : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 rounded-tl-none'
                      }`}>
                        <div className="text-base sm:text-lg font-medium leading-relaxed">
                          {m.content}
                        </div>
                        {m.role === 'assistant' && (
                          <button onClick={() => speakMessage(m.content, i)} className={`mt-6 flex items-center space-x-2 text-[9px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-xl border transition-all ${isSpeaking === i ? 'text-signal-gold border-signal-gold animate-pulse' : 'text-authority-blue border-slate-200 dark:text-signal-gold'}`}>
                            {isSpeaking === i ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            <span>{isSpeaking === i ? 'Speaking' : 'Speak'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-3xl border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto flex items-center space-x-3 sm:space-x-6">
                  <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Input inquiry..." className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 pl-6 sm:pl-10 pr-6 py-4 sm:py-6 rounded-[2rem] sm:rounded-[3rem] outline-none shadow-xl font-bold text-base transition-all"
                  />
                  <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-authority-blue text-white p-5 sm:p-6 rounded-full hover:bg-slate-800 active:scale-95 shadow-xl disabled:opacity-50 shrink-0">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'voice' && (
            <div className="flex-grow flex flex-col items-center justify-center p-8 sm:p-20 text-center">
              <div className={`w-40 h-40 sm:w-56 sm:h-56 rounded-[4rem] sm:rounded-[5rem] flex items-center justify-center mx-auto transition-all duration-700 border-[4px] sm:border-[6px] mb-12 ${isLiveActive ? 'bg-authority-blue border-signal-gold shadow-[0_0_80px_rgba(212,175,55,0.3)]' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-50'}`}>
                <Mic size={64} className={isLiveActive ? 'text-white' : 'text-slate-300'} />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight text-authority-blue dark:text-white mb-10">Voice Link</h2>
              <button
                onClick={isLiveActive ? stopLiveConversation : startLiveConversation}
                className={`px-12 sm:px-20 py-5 sm:py-8 rounded-[2rem] sm:rounded-[3rem] font-black uppercase tracking-[0.3em] text-[10px] sm:text-sm shadow-2xl transition-all border-b-4 sm:border-b-[12px] ${
                  isLiveActive ? 'bg-red-600 text-white border-red-900' : 'bg-authority-blue text-white border-slate-950'
                }`}
              >
                {isLiveActive ? 'Terminate Link' : 'Establish Link'}
              </button>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="flex-grow overflow-y-auto p-6 sm:p-12 lg:p-20 custom-scrollbar">
              {!hasApiKey ? (
                <div className="max-w-2xl mx-auto p-10 sm:p-20 bg-amber-50 dark:bg-amber-950/20 rounded-[2.5rem] sm:rounded-[4rem] text-center space-y-10 border-2 border-amber-200">
                  <ShieldAlert className="mx-auto text-amber-600" size={64} />
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-amber-800 dark:text-amber-400 font-serif">Key Required</h3>
                  <button onClick={() => window.aistudio.openSelectKey().then(() => setHasApiKey(true))} className="bg-amber-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-amber-700">Authorize Key</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                   <div className="space-y-8 sm:space-y-12">
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-10 rounded-[2rem] sm:rounded-[4rem] border border-slate-100">
                       <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue mb-6">Directives</h3>
                       <textarea 
                        rows={6} value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} 
                        placeholder="Describe visualization..." 
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 p-6 sm:p-8 rounded-[2rem] font-black text-lg focus:border-authority-blue outline-none shadow-2xl" 
                       />
                     </div>
                     <button onClick={generateVideo} disabled={isGeneratingVideo || !videoPrompt.trim()} className="w-full py-6 sm:py-8 rounded-[2rem] sm:rounded-[3rem] bg-authority-blue text-white font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs flex items-center justify-center shadow-2xl group border-b-4 sm:border-b-[10px] border-slate-950">
                        {isGeneratingVideo ? <Loader2 className="animate-spin mr-3" /> : <Film className="mr-3" />}
                        Synthesize
                     </button>
                   </div>
                   
                   <div className="bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] sm:rounded-[5rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[600px] relative overflow-hidden group shadow-inner">
                        {isGeneratingVideo ? (
                          <div className="text-center space-y-6 px-10">
                             <div className="w-20 h-20 sm:w-32 sm:h-32 bg-authority-blue/5 rounded-full border-4 sm:border-[6px] border-authority-blue border-t-transparent animate-spin mx-auto"></div>
                             <p className="font-black text-sm sm:text-2xl uppercase tracking-[0.3em] text-authority-blue animate-pulse leading-tight">{genMessage}</p>
                          </div>
                        ) : videoResult ? (
                          <video src={videoResult} controls className="w-full h-full object-cover rounded-[3rem] sm:rounded-[4.6rem]" />
                        ) : (
                          <Film size={80} className="opacity-10" />
                        )}
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