
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { Search, Filter, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '../App';
import { BlogPost, BlogCategory } from '../types';

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!db) return;
    
    /**
     * FIX: To avoid the 'The query requires an index' error without requiring the user 
     * to manually create composite indexes in the Firebase Console, we remove the 
     * orderBy clause from the server-side query and perform the sort on the client side.
     */
    const q = query(
      collection(db, "blogPosts"), 
      where("status", "==", "published")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
      
      // Client-side sort by date descending
      const sortedData = data.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      
      setBlogs(sortedData);
      setLoading(false);
    }, (err) => {
      console.error("Public Blog Fetch Error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories: (BlogCategory | 'All')[] = [
    'All', 'Compliance', 'Audit', 'Authority', 'Insurance', 'HOS', 'ELD', 'Maintenance'
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
    <div className="bg-white dark:bg-primary-dark min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 font-serif">The Compliance Ledger</h1>
          <p className="text-xl text-text-muted dark:text-text-dark-muted max-w-2xl mx-auto">
            Weekly deep-dives into the latest safety regulations, business ethics, and operational excellence.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0 bg-primary-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedCategory === cat 
                  ? 'bg-authority-blue text-white shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-text-muted hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input 
              type="text"
              placeholder="Search guides..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-authority-blue outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(post => (
              <article key={post.id} className="flex flex-col bg-white dark:bg-primary-dark rounded-3xl overflow-hidden border border-border-light dark:border-border-dark group transition-all hover:shadow-2xl hover:-translate-y-1">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-60">
                  <img src={post.image || 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-steel-blue mb-4">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-text-muted flex items-center">
                      <Calendar className="w-3 h-3 mr-1" /> {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-authority-blue transition-colors font-serif leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-text-muted dark:text-text-dark-muted mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${post.author}/40/40`} alt={post.author} />
                      </div>
                      <span className="text-xs font-bold">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-authority-blue font-bold flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-text-muted" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No results found</h2>
              <p className="text-text-muted">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
