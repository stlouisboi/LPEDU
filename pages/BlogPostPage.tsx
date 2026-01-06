
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from '../firebase';
import { Calendar, User, ChevronLeft, Share2, Bookmark, Loader2, ShieldAlert } from 'lucide-react';
import { BlogPost } from '../types';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !slug) return;
    const fetchPost = async () => {
      try {
        const q = query(collection(db, "blogPosts"), where("slug", "==", slug), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const postData = { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPost;
          setPost(postData);
          
          // Set SEO metadata dynamically
          if (postData.seoTitle) document.title = postData.seoTitle;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && postData.seoDescription) {
            metaDesc.setAttribute("content", postData.seoDescription);
          }
        }
      } catch (err) {
        console.error("Fetch Single Post Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light shadow-xl">
          <ShieldAlert className="mx-auto mb-6 text-red-500" size={48} />
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <p className="text-text-muted mb-8">This article may have been moved or unpublished.</p>
          <Link to="/blog" className="bg-authority-blue text-white px-8 py-3 rounded-xl font-bold">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[65vh] min-h-[450px]">
        <img src={post.image || 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200'} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-[10px]">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Compliance Ledger
            </Link>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-1.5 bg-signal-gold text-authority-blue font-black text-[10px] uppercase rounded-full shadow-lg">
                {post.category}
              </span>
              <div className="flex items-center text-white/90 text-[10px] font-black uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5 mr-2" /> {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-authority-blue dark:prose-headings:text-steel-blue max-w-none">
            {post.excerpt && (
              <p className="text-2xl font-medium text-text-muted mb-12 italic leading-relaxed border-l-4 border-signal-gold pl-6 py-2">
                {post.excerpt}
              </p>
            )}
            
            <div 
              className="blog-content leading-loose" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            <div className="mt-20 p-8 bg-slate-50 dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <img src={`https://picsum.photos/seed/${post.author}/64/64`} alt={post.author} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Compliance Specialist</p>
                  <p className="font-bold text-xl text-authority-blue dark:text-white">{post.author}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark shadow-sm">
                  <Share2 className="w-5 h-5 text-steel-blue" />
                </button>
                <button className="p-4 bg-white dark:bg-gray-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark shadow-sm">
                  <Bookmark className="w-5 h-5 text-steel-blue" />
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-authority-blue mb-6">Article Tags</h4>
              <div className="flex flex-wrap gap-2">
                {(post.tags && post.tags.length > 0 ? post.tags : ['#DOT', '#FMCSA', '#Compliance', '#OwnerOperator']).map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-gray-800 rounded-lg text-[10px] font-bold uppercase text-text-muted border border-border-light dark:border-border-dark hover:bg-authority-blue hover:text-white cursor-pointer transition-all">
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-authority-blue text-white rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
              <h4 className="font-bold text-xl mb-4 leading-tight">Stay Audit Ready</h4>
              <p className="text-sm text-white/70 mb-8 leading-relaxed font-medium">Join 5,000+ carriers receiving weekly safety bulletins directly from FMCSA sources.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-white/40"
                />
                <button className="w-full bg-signal-gold text-authority-blue font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-white transition-all shadow-lg">
                  Get Bulletins
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
