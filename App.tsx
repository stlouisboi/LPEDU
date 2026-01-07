
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  LogOut, 
  ArrowRight,
  Loader2,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ShieldCheck,
  CheckCircle,
  ShieldAlert,
  FileText,
  BadgeCheck,
  Star,
  Shield,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // monolithic tabbed view in pages folder
import AdminLayout from './pages/admin/AdminLayout'; // modular layout
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import PageList from './pages/admin/PageList';
import HomePageEditor from './pages/admin/HomePageEditor';
import BlogList from './pages/admin/BlogList';
import BlogEditor from './pages/admin/BlogEditor';
import ResourceManager from './pages/admin/ResourceManager';
import FormManagement from './pages/admin/FormManagement';
import SubmissionsList from './pages/admin/SubmissionsList';
import SettingsManager from './pages/admin/SettingsManager';
import VideoLab from './pages/admin/VideoLab';

// Security
import ProtectedRoute from './components/admin/ProtectedRoute';

// Contexts
interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => void;
  blogs: BlogPost[];
  addBlog: (b: BlogPost) => void;
  updateBlog: (b: BlogPost) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  formSubmissions: any[];
  addFormSubmission: (sub: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-signal-gold transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme, settings } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Learning Path', path: '/learning-path' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Advisor', path: '/advisor' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-primary-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-300">
      <ProgressBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMenuOpen(false)}>
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-10 w-auto object-contain transform group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-10 h-10 bg-black dark:bg-authority-blue rounded-xl flex items-center justify-center group-hover:bg-logo-red transition-colors shadow-sm">
                <span className="text-white font-black text-lg">{settings.siteName.charAt(0)}</span>
              </div>
            )}
            <span className="text-xl font-black tracking-tighter text-authority-blue dark:text-white uppercase font-serif group-hover:opacity-80 transition-opacity">
              {settings.siteName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold transition-all hover:text-authority-blue relative group ${
                  location.pathname === item.path ? 'text-authority-blue dark:text-signal-gold' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-authority-blue transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 pl-4 border-l border-border-light dark:border-border-dark">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5 text-authority-blue" /> : <Sun className="w-5 h-5 text-signal-gold" />}
              </button>
              
              <Link
                to="/enroll"
                className="bg-authority-blue text-white px-7 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-steel-blue transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Enroll Now
              </Link>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl active:scale-90">
              {theme === 'light' ? <Moon className="w-5 h-5 text-authority-blue" /> : <Sun className="w-5 h-5 text-signal-gold" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 active:scale-90 transition-all">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark px-4 py-8 space-y-4 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-xl font-black rounded-2xl transition-colors ${
                location.pathname === item.path ? 'bg-authority-blue/5 text-authority-blue dark:text-signal-gold' : 'text-text-primary dark:text-text-dark-primary hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { settings } = useApp();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;
  
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark pt-24 pb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-authority-blue/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              {settings.logoUrl ? (
                <img 
                  src={settings.logoUrl} 
                  alt={settings.siteName} 
                  loading="lazy" 
                  className="h-10 w-auto" 
                />
              ) : (
                <div className="w-10 h-10 bg-black dark:bg-authority-blue rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <span className="text-white font-black">{settings.siteName.charAt(0)}</span>
                </div>
              )}
              <span className="text-3xl font-black tracking-tighter text-authority-blue dark:text-white uppercase font-serif">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-text-muted dark:text-text-dark-muted mb-10 leading-relaxed font-black uppercase tracking-widest text-[10px]">
              Accuracy Over Hype.™
            </p>
            
            <div className="space-y-4">
               <div className="flex items-center space-x-3 text-sm font-bold text-text-muted">
                  <Mail size={16} className="text-authority-blue" />
                  <span>support@launchpath.com</span>
               </div>
               <div className="flex items-center space-x-3 text-sm font-bold text-text-muted">
                  <Phone size={16} className="text-authority-blue" />
                  <span>1-800-DOT-COMP</span>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-authority-blue dark:text-signal-gold">Knowledge</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted text-sm font-bold">
              <li><Link to="/resources" className="hover:text-authority-blue transition-colors">Compliance Guides</Link></li>
              <li><Link to="/blog" className="hover:text-authority-blue transition-colors">Safety Ledger Blog</Link></li>
              <li><Link to="/learning-path" className="hover:text-authority-blue transition-colors">90-Day Success Map</Link></li>
              <li><Link to="/advisor" className="hover:text-authority-blue transition-colors">AI Advisor Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-authority-blue dark:text-signal-gold">Company</h4>
            <ul className="space-y-4 text-text-muted dark:text-text-dark-muted text-sm font-bold mb-10">
              <li><Link to="/about" className="hover:text-authority-blue transition-colors">Our Methodology</Link></li>
              <li><Link to="/contact" className="hover:text-authority-blue transition-colors">Contact Support</Link></li>
              <li><Link to="/legal" className="hover:text-authority-blue transition-colors">Legal Disclosure</Link></li>
            </ul>
            
            {/* STANDOUT SDVOSB BADGE */}
            <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-[2rem] border-2 border-signal-gold shadow-xl animate-in slide-in-from-bottom-2 duration-1000">
               <div className="flex items-center space-x-4">
                  <div className="relative flex-shrink-0">
                    <ShieldCheck size={32} className="text-authority-blue" />
                    <Star size={14} fill="currentColor" className="absolute -top-1.5 -right-1.5 text-signal-gold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-tight text-authority-blue leading-none">SDVOSB Certified</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-text-muted mt-1 leading-tight">Service-Disabled <br/>Veteran Owned</span>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs text-authority-blue dark:text-signal-gold">Verified Trust</h4>
            <div className="space-y-6">
               <div className="flex items-center space-x-3 bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-border-light dark:border-border-dark">
                  <BadgeCheck size={24} className="text-signal-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white">FMCSA Verified Standards</span>
               </div>
               <div className="flex items-center space-x-3 bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-border-light dark:border-border-dark">
                  <ShieldCheck size={24} className="text-green-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary dark:text-white">Audit Pass Guarantee</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-border-light dark:border-border-dark flex flex-col lg:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-muted dark:text-text-dark-muted space-y-8 lg:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <p>© {new Date().getFullYear()} LaunchPath Transportation EDU. All rights reserved.</p>
            <div className="flex space-x-8">
              <Link to="/legal" className="hover:text-authority-blue transition-colors">Privacy Policy</Link>
              <Link to="/legal" className="hover:text-authority-blue transition-colors">Terms of Service</Link>
              <Link to="/legal" className="hover:text-authority-blue transition-colors">Disclaimer</Link>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-gray-800 px-4 py-2 rounded-full border border-border-light">
             <Shield size={12} className="text-authority-blue" />
             <span>256-bit Secure Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !db || typeof db !== 'object') {
      setAppLoading(false);
      return;
    }

    try {
      const unsub = onSnapshot(doc(db, "settings", "general"), (snap) => {
        if (snap.exists()) {
          const data = snap.data() as SiteSettings;
          setSettings(data);
          
          const root = document.documentElement;
          root.style.setProperty('--authority-blue', data.primaryColor || '#1e3a5f');
          root.style.setProperty('--signal-gold', data.secondaryColor || '#d4af37');
          
          const pageTitle = document.title.split('|')[0].trim() || 'Home';
          document.title = (data.seo?.titleFormat || INITIAL_SETTINGS.seo.titleFormat).replace('{{pageTitle}}', pageTitle);
          
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', data.metaDescription);
          
          if (data.faviconUrl) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'icon';
            link.href = data.faviconUrl;
            if (!document.head.contains(link)) document.head.appendChild(link);
          }
        }
        setAppLoading(false);
      }, (err: any) => {
        console.warn("LaunchPath: Settings Sync Error (Using Defaults):", err);
        setSettings(INITIAL_SETTINGS);
        setAppLoading(false);
      });

      return () => unsub();
    } catch (e) {
      console.error("LaunchPath: Snapshot setup failed", e);
      setAppLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const updateSettings = (s: SiteSettings) => setSettings(s);
  const addBlog = (b: BlogPost) => setBlogs([b, ...blogs]);
  const updateBlog = (u: BlogPost) => setBlogs(blogs.map(b => b.id === u.id ? u : b));
  const addTestimonial = (t: Testimonial) => setTestimonials([t, ...testimonials]);
  const deleteTestimonial = (id: string) => setTestimonials(testimonials.filter(t => t.id !== id));
  const addFormSubmission = (sub: any) => setFormSubmissions([sub, ...formSubmissions]);

  if (appLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-primary-light">
        <Loader2 className="animate-spin text-authority-blue mb-6" size={56} />
        <p className="font-black uppercase tracking-[0.3em] text-authority-blue/40 text-xs">Synchronizing Knowledge Base</p>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, settings, updateSettings, blogs, addBlog, updateBlog,
      formSubmissions, addFormSubmission, testimonials, addTestimonial, deleteTestimonial
    }}>
      <AuthProvider>
        <Router>
          <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${theme === 'dark' ? 'dark' : ''}`}>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/learning-path" element={<LearningPathPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/advisor" element={<AIServicePage />} />
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/modules/:id" element={<ModuleDetailPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboardHome />} />
                  <Route path="pages" element={<PageList />} />
                  <Route path="pages/home" element={<HomePageEditor />} />
                  <Route path="blog" element={<BlogList />} />
                  <Route path="blog/new" element={<BlogEditor />} />
                  <Route path="blog/edit/:id" element={<BlogEditor />} />
                  <Route path="resources" element={<ResourceManager />} />
                  <Route path="forms" element={<FormManagement />} />
                  <Route path="forms/submissions" element={<SubmissionsList />} />
                  <Route path="settings" element={<SettingsManager />} />
                  <Route path="video-lab" element={<VideoLab />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}
