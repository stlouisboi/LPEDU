
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDocs, collection, query, where, limit } from "firebase/firestore";
import { db } from '../firebase';
import { Calendar, User, ChevronLeft, Share2, Bookmark, Loader2, ShieldAlert, ShieldCheck, X, Maximize2, ZoomIn } from 'lucide-react';
import { BlogPost } from '../types';
import { INITIAL_BLOGS } from '../constants';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const foundPost = INITIAL_BLOGS.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          document.title = foundPost.seoTitle || foundPost.title;
        }

        if (db) {
          const q = query(collection(db, "blogPosts"), where("slug", "==", slug), limit(1));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const dbPost = { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPost;
            setPost(dbPost);
            document.title = dbPost.seoTitle || dbPost.title;
          }
        }
      } catch (err) {
        console.error("Post Fetch Fault:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // Handle clicks on images within dangerouslySetInnerHTML
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const src = (target as HTMLImageElement).src;
      setActiveImage(src);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-primary-dark">
        <div className="max-w-md w-full text-center p-12 bg-white dark:bg-surface-dark rounded-[3.5rem] border border-border-light dark:border-border-dark shadow-2xl animate-in zoom-in-95">
          <ShieldAlert className="mx-auto mb-8 text-red-500" size={64} />
          <h2 className="text-3xl font-black font-serif uppercase text-authority-blue dark:text-white mb-4">Registry Fault</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-bold">The requested compliance record could not be retrieved from the archive.</p>
          <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-authority-blue text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-steel-blue transition-all">
            <ChevronLeft size={16} className="mr-2" /> Back to Ledger
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen relative">
      {/* Cinematic Hero Header */}
      <div className="relative h-[40vh] md:h-[60vh] min-h-[400px] w-full bg-slate-900 overflow-hidden cursor-zoom-in group" onClick={() => setActiveImage(post.image)}>
        <img 
          src={post.image || 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200'} 
          alt={post.title} 
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md p-4 rounded-full text-white pointer-events-none">
          <Maximize2 size={24} />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 pointer-events-none">
          <div className="max-w-5xl mx-auto space-y-8 animate-reveal-up">
            <Link to="/blog" className="inline-flex items-center text-white/60 hover:text-signal-gold mb-4 transition-all font-black uppercase tracking-[0.4em] text-[10px] group pointer-events-auto">
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
              Back to Compliance Ledger
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <span className="px-5 py-2 bg-signal-gold text-authority-blue font-black text-[10px] uppercase rounded-xl shadow-2xl">
                  {post.category}
                </span>
                <div className="flex items-center text-white/70 text-[10px] font-black uppercase tracking-[0.4em]">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-signal-gold" /> 
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-serif leading-[1.1] drop-shadow-2xl uppercase tracking-tighter max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
          
          <article className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-authority-blue dark:prose-headings:text-signal-gold max-w-none">
            {post.excerpt && (
              <div className="mb-16 p-10 bg-slate-50 dark:bg-surface-dark border-l-[12px] border-signal-gold rounded-r-[3rem] shadow-sm">
                <p className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200 italic leading-relaxed m-0">
                  "{post.excerpt}"
                </p>
              </div>
            )}
            
            <div 
              className="blog-content leading-[1.8] text-slate-600 dark:text-slate-300 font-medium" 
              onClick={handleContentClick}
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            <div className="mt-24 p-12 bg-slate-50 dark:bg-surface-dark rounded-[3.5rem] border border-slate-200 dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-authority-blue"><ShieldCheck size={120}/></div>
              <div className="flex items-center space-x-6 relative z-10">
                <div className="w-20 h-20 bg-authority-blue rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-signal-gold">
                   <User size={40} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">STATIONED SPECIALIST</p>
                  <p className="font-black text-2xl text-authority-blue dark:text-white uppercase tracking-tight">{post.author}</p>
                </div>
              </div>
              <div className="flex space-x-4 relative z-10">
                <button className="p-5 bg-white dark:bg-gray-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-all border border-slate-200 dark:border-border-dark shadow-xl group">
                  <Share2 className="w-6 h-6 text-authority-blue dark:text-signal-gold group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-5 bg-white dark:bg-gray-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-all border border-slate-200 dark:border-border-dark shadow-xl group">
                  <Bookmark className="w-6 h-6 text-authority-blue dark:text-signal-gold group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-16 lg:sticky lg:top-40">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-authority-blue dark:text-white border-b border-slate-100 dark:border-white/5 pb-4">Article Taxonomy</h4>
              <div className="flex flex-wrap gap-3">
                {(post.tags && post.tags.length > 0 ? post.tags : ['DOT', 'FMCSA', 'Compliance', 'Carrier']).map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100 dark:border-border-dark hover:border-authority-blue hover:text-authority-blue dark:hover:text-signal-gold cursor-pointer transition-all shadow-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-10 bg-[#002244] text-white rounded-[3rem] shadow-2xl relative overflow-hidden border-t-8 border-signal-gold">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <h4 className="font-black font-serif text-2xl mb-6 leading-tight uppercase tracking-tight text-signal-gold italic">Stay <br/>Audit Ready</h4>
              <p className="text-sm text-white/60 mb-10 leading-relaxed font-medium uppercase tracking-tight">
                Join 5,000+ carriers receiving the weekly LaunchPath Compliance Ledger directly to their terminal.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="OPERATOR@CARRIER.COM" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-signal-gold/50 placeholder:text-white/20 uppercase tracking-widest"
                />
                <button className="w-full bg-signal-gold text-authority-blue font-black uppercase tracking-[0.4em] text-[10px] py-5 rounded-2xl hover:bg-white transition-all shadow-2xl border-b-4 border-[#8e7340] active:scale-95">
                  Authorize Alerts
                </button>
              </form>
            </div>

            <div className="text-center opacity-30 flex flex-col items-center gap-4">
               <ShieldCheck size={24} />
               <p className="text-[9px] font-black uppercase tracking-[0.5em] leading-relaxed">
                 Institutional Integrity <br/>Standards Active
               </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Institutional Lightbox Terminal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary-dark/95 backdrop-blur-2xl animate-in fade-in duration-300 p-4 md:p-12"
          onClick={() => setActiveImage(null)}
        >
          <div className="absolute top-8 right-8 z-[1010] flex items-center space-x-4">
             <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md hidden md:block">
                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Institutional Inspection Mode</p>
             </div>
             <button 
              className="p-4 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all border border-white/10 group"
              onClick={() => setActiveImage(null)}
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
          
          <div className="relative max-w-7xl w-full max-h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
            <img 
              src={activeImage} 
              alt="Inspected Asset" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-4 border-white/5" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none">
             <div className="flex flex-col items-center space-y-2">
                <ShieldCheck size={20} className="text-signal-gold" />
                <p className="text-[9px] font-black text-white uppercase tracking-[0.5em]">Registry Asset Secure</p>
             </div>
          </div>
        </div>
      )}

      <style>{`
        .blog-content img {
          cursor: zoom-in;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          margin-top: 3rem;
          margin-bottom: 3rem;
        }
        .blog-content img:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default BlogPostPage;
