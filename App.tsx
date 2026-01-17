import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  Loader2
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';
import ScrollToTop from './components/ScrollToTop';
import AIChatWidget from './components/AIChatWidget';
import Logo from './components/Logo';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import PageList from './pages/admin/PageList';
import HomePageEditor from './pages/admin/HomePageEditor';
import BlogList from './pages/admin/BlogList';
import BlogEditor from './pages/admin/BlogEditor';
import ResourceManager from './pages/admin/ResourceManager';
import FormManagement from './pages/admin/FormManagement';
import SubmissionsList from './pages/admin/SubmissionsList';
import LeadsManager from './pages/admin/LeadsManager';
import SettingsManager from './pages/admin/SettingsManager';
import VideoLab from './pages/admin/VideoLab';
import InitializeDataPage from './pages/admin/InitializeDataPage';

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

const Header = () => {
  const { theme, toggleTheme } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Roadmap', path: '/learning-path' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'AI Advisor', path: '/advisor' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-primary-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold transition-all hover:text-authority-blue ${
                  location.pathname === item.path ? 'text-authority-blue dark:text-signal-gold' : 'text-text-muted dark:text-text-dark-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pl-4 border-l border-border-light dark:border-border-dark">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                {theme === 'light' ? <Moon className="w-5 h-5 text-authority-blue" /> : <Sun className="w-5 h-5 text-signal-gold" />}
              </button>
              <Link
                to="/pricing"
                className="bg-authority-blue text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-steel-blue transition-all shadow-md"
              >
                Enroll
              </Link>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-authority-blue dark:text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-primary-dark border-b border-border-light dark:border-border-dark animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block p-4 rounded-xl font-bold ${
                  location.pathname === item.path ? 'bg-authority-blue text-white' : 'text-text-muted hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-light mt-2">
              <Link
                to="/pricing"
                className="block w-full bg-authority-blue text-white py-4 rounded-xl text-center font-black uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return (
    <footer className="bg-white dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-12">
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center space-y-6">
         <Logo className="opacity-60 transition-all grayscale hover:grayscale-0 hover:opacity-100" />
         <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">© {new Date().getFullYear()} LaunchPath™ Transportation EDU.</p>
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
    if (!isFirebaseConfigured || !db) {
      setAppLoading(false);
      return;
    }
    
    const settingsRef = doc(db, "settings", "general");
    const unsub = onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as SiteSettings);
      }
      setAppLoading(false);
    }, (error) => {
      console.warn("App: Settings listener failed. Using defaults.", error.message);
      setAppLoading(false);
    });
    
    return () => unsub();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  if (appLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark">
      <Loader2 className="animate-spin text-authority-blue" size={32} />
    </div>
  );

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, settings, updateSettings: setSettings, blogs, addBlog: (b) => setBlogs([b, ...blogs]), updateBlog: (u) => setBlogs(blogs.map(b => b.id === u.id ? u : b)),
      formSubmissions, addFormSubmission: (s) => setFormSubmissions([s, ...formSubmissions]), testimonials, addTestimonial: (t) => setTestimonials([t, ...testimonials]), deleteTestimonial: (id) => setTestimonials(testimonials.filter(t => t.id !== id))
    }}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/advisor" element={<AIServicePage />} />
              <Route path="/pricing" element={<EnrollPage />} />
              <Route path="/modules/:id" element={<ModuleDetailPage />} />
              <Route path="/download/risk-map" element={<DownloadPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
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
                <Route path="leads" element={<LeadsManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route path="video-lab" element={<VideoLab />} />
                <Route path="initialize-data" element={<InitializeDataPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <AIChatWidget />
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}