import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Search, Filter, Calendar, User, ArrowRight, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { useApp } from '../App';
import { BlogPost, BlogCategory } from '../types';
import { INITIAL_BLOGS } from '../constants';

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "Blog | LaunchPath Compliance Insights";
    const update = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, content);
    };
    update('meta[name="description"]', "Practical guidance on FMCSA compliance, insurance continuity, and carrier operations. No hype. No shortcuts. Just what you need to know.");
    update('meta[property="og:title"]', "Blog | LaunchPath Compliance Insights");
    update('meta[property="og:description"]', "Compliance guidance for new motor carriers. Accuracy over hype.");
    update('meta[property="og:type"]', "website");
  }, []);

  const categories: (BlogCategory | 'All')[] = [
    'All', 
    'Compliance', 
    'Audit', 
    'Authority', 
    'Insurance', 
    'DQ Files', 
    'Drug & Alcohol', 
    'Hours of Service', 
    'Maintenance'
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-authority-blue" size={40} />
        <p className="text-text-muted font-bold uppercase tracking-widest text-xs">Accessing Knowledge Base...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] dark:bg-primary-dark min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 animate-reveal-up">
          <div className="inline-flex items-center space-x-3 bg-authority-blue/5 border border-authority-blue/10 px-4 py-2 rounded-full mb-8">
            <BookOpen size={14} className="text-authority-blue dark:text-signal-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-authority-blue dark:text-signal-gold">Regulatory Insights</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black mb-6 font-serif uppercase tracking-tight text-authority-blue dark:text-white">The Compliance Ledger</h1>
          <p className="text-xl text-slate-500 dark:text-text-dark-muted max-w-2xl mx-auto font-bold">
            Weekly deep-dives into FMCSA regulations, audit preparation, and carrier operations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0 bg-white dark:bg-surface-dark p-6 rounded-3xl border border-slate-100 dark:border-border-dark shadow-sm">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                  ? 'bg-authority-blue text-white shadow-lg' 
                  : 'bg-slate-50 dark:bg-gray-800 text-text-muted hover:bg-slate-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input 
              type="text"
              placeholder="Search guides..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-800 border border-slate-100 dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-authority-blue outline-none transition-all font-medium text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(post => (
              <article key={post.id} className="flex flex-col bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-border-dark group transition-all hover:shadow-2xl hover:-translate-y-1">
                {/* Image: hidden on mobile, visible on sm and up */}
                <div className="hidden sm:block aspect-video w-full overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-[9px] font-black uppercase tracking-widest text-signal-gold mb-6">
                    <span className="bg-authority-blue/5 px-3 py-1 rounded-lg">{post.category}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-slate-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1.5" /> {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black mb-4 group-hover:text-authority-blue dark:group-hover:text-signal-gold transition-colors font-serif leading-tight uppercase tracking-tight text-authority-blue dark:text-white">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 mb-10 line-clamp-4 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-50 dark:border-white/5 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-authority-blue dark:text-signal-gold">
                        <User size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-authority-blue dark:text-signal-gold font-black flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-[0.2em] text-[10px]">
                      Read Analysis <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white dark:bg-surface-dark rounded-[3rem] border border-dashed border-slate-200">
              <div className="bg-slate-50 dark:bg-gray-800 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-2xl font-black font-serif uppercase text-authority-blue dark:text-white mb-2">No Matching Records</h2>
              <p className="text-slate-400 font-medium">Adjust your criteria to broaden the search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;