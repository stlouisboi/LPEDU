
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { useApp } from '../App';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { blogs } = useApp();
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-authority-blue underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-primary-dark min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Ledger
            </Link>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-signal-gold text-authority-blue font-bold text-xs uppercase rounded-full">
                {post.category}
              </span>
              <div className="flex items-center text-white/80 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-2" /> {post.publishedAt}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
          {/* Main Content */}
          <article className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-authority-blue dark:prose-headings:text-steel-blue max-w-none">
            <p className="text-xl font-medium text-text-muted mb-12 italic leading-relaxed border-l-4 border-steel-blue pl-6 py-2">
              {post.excerpt}
            </p>
            
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            
            <div className="mt-20 p-8 bg-gray-50 dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src={`https://picsum.photos/seed/${post.author}/48/48`} alt={post.author} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Written By</p>
                  <p className="font-bold text-lg">{post.author}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-border-light dark:border-border-dark">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-authority-blue mb-6">Trending Tags</h4>
              <div className="flex flex-wrap gap-2">
                {['#DOT', '#Compliance', '#AuditPrep', '#TruckingLife'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-semibold hover:bg-steel-blue hover:text-white cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-authority-blue text-white rounded-2xl">
              <h4 className="font-bold text-lg mb-4">Stay Compliant</h4>
              <p className="text-sm text-white/70 mb-6">Join our newsletter to receive weekly safety bulletins directly from FMCSA sources.</p>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 mb-4"
              />
              <button className="w-full bg-signal-gold text-authority-blue font-bold py-3 rounded-xl hover:bg-white transition-all">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
