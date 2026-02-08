
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const PageList = () => {
  const pages = [
    { id: 'home', name: 'Homepage', status: 'Published', lastModified: '2 hours ago' },
    { id: 'about', name: 'About Us', status: 'Draft', lastModified: '1 day ago' },
    { id: 'learning-path', name: 'Learning Path', status: 'Published', lastModified: '5 days ago' },
    { id: 'resources', name: 'Resources', status: 'Published', lastModified: '1 week ago' },
    { id: 'contact', name: 'Contact', status: 'Published', lastModified: '2 weeks ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold font-serif text-authority-blue dark:text-white">Page Management</h1>
        <p className="text-text-muted mt-1">Select a page to modify its content and SEO settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <Link 
            key={page.id} 
            to={page.id === 'home' ? '/admin/pages/home' : `/admin/pages/${page.id}`}
            className="flex items-center justify-between p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl hover:shadow-xl transition-all group"
          >
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl">
                <Globe className="text-authority-blue" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif group-hover:text-authority-blue transition-colors">
                  {page.name}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    page.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {page.status}
                  </span>
                  <div className="flex items-center text-xs text-text-muted">
                    <Clock size={12} className="mr-1" />
                    Modified {page.lastModified}
                  </div>
                </div>
              </div>
            </div>
            <ArrowRight className="text-text-muted group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageList;
