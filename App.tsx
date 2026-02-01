
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  Loader2,
  Lock,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShieldCheck
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
import ReferenceBriefPage from './pages/ReferenceBriefPage';
import FAQPage from './pages/FAQPage';
import ClarificationPage from './pages/ClarificationPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import LegalPage from './pages/LegalPage';
import AIServicePage from './pages/AIServicePage';
import EnrollPage from './pages/EnrollPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';
import ReadinessPage from './pages/ReadinessPage';
import PortalInterstitial from './pages/PortalInterstitial';
import ReachTestPage from './pages/ReachTestPage';
import TCOCalculatorPage from './pages/TCOCalculatorPage';
import OperatorPortal from './pages/OperatorPortal';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './AdminDashboard'; 
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
    { name: 'About', path: '/about' },
    { name: 'Clarification', path: '/clarification' },
    { name: 'Roadmap', path: '/learning-path' },
    { name: 'Resources', path: '/resources' }
  ];

  return (
    <header className="sticky top-0 z-[100] bg-white dark:bg-primary-dark border-b border-slate-100 dark:border-border-dark transition-all duration-500" role="banner">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center h-24 sm:h-32">
          
          <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-80 active:scale-95 duration-300" aria-label="LaunchPath Home">
            <Logo className="h-10 sm:h-14 w-auto" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center" aria-label="Main Navigation">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                    location.pathname === item.path 
                    ? 'text-authority-blue dark:text-signal-gold' 
                    : 'text-slate-500 dark:text-text-dark-muted hover:text-authority-blue'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-6 right-6 h-[2px] bg-authority-blue dark:bg-signal-gold transition-all duration-300 scale-x-0 group-hover:scale-x-100 ${location.pathname === item.path ? 'scale-x-100' : ''}`}></span>
                </Link>
              ))}
            </div>
            
            <div className="w-[1.5px] h-8 bg-slate-200 dark:bg-slate-700 mx-8" aria-hidden="true" />

            <div className="flex items-center space-x-6">
              <Link 
                to="/portal" 
                className="border-2 border-signal-gold text-signal-gold px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] flex items-center hover:bg-signal-gold hover:text-authority-blue transition-all active:scale-95 shadow-sm"
              >
                <Lock size={12} className="mr-3 -mt-0.5" />
                Portal Access
              </Link>

              <Link 
                to="/readiness" 
                className="bg-authority-blue text-white px-10 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-steel-blue hover:shadow-2xl transition-all active:scale-95 shadow-xl border-b-4 border-slate-900"
              >
                Admission Protocol
              </Link>

              <button
                onClick={toggleTheme}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-authority-blue dark:text-signal-gold hover:scale-110 transition-all border border-slate-200 dark:border-border-dark shadow-sm"
                aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </nav>

          <div className="xl:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-authority-blue dark:text-signal-gold border border-slate-200 dark:border-border-dark"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2.5 bg-authority-blue text-white rounded-xl shadow-lg active:scale-90 transition-transform"
              aria-expanded={isMenuOpen}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="fixed inset-0 top-24 sm:top-32 bg-white dark:bg-primary-dark z-[99] xl:hidden animate-in fade-in slide-in-from-top-4 duration-500 overflow-y-auto" aria-label="Mobile Navigation">
          <div className="flex flex-col p-8 sm:p-12 space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`block p-6 rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter transition-all ${
                location.pathname === '/' ? 'bg-authority-blue text-white shadow-2xl' : 'text-slate-400'
              }`}
            >
              Home
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block p-6 rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter transition-all ${
                  location.pathname === item.path ? 'bg-authority-blue text-white shadow-2xl' : 'text-slate-800 dark:text-slate-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-12 space-y-6">
              <Link 
                to="/portal" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center border-2 border-signal-gold text-signal-gold py-7 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.2em]"
              >
                <Lock size={20} className="inline mr-3 -mt-1" />
                Portal Access
              </Link>

              <Link 
                to="/readiness" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-authority-blue text-white py-9 rounded-[2.5rem] text-xl font-black uppercase tracking-[0.2em] shadow-2xl border-b-8 border-slate-900"
              >
                Admission Protocol
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

const Footer = () => {
  const { settings } = useApp();
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full font-sans" role="contentinfo">
      <section className="bg-authority-blue dark:bg-surface-dark py-24 md:py-32 border-t border-white/5 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16" aria-label="Footer Site Map">
            <div className="space-y-8">
              <h3 className="text-[13px] font-black text-signal-gold uppercase tracking-[0.3em] mb-8 flex items-center">
                  <span className="w-6 h-[1px] bg-signal-gold/40 mr-4"></span>
                  FOUNDATION
              </h3>
              <ul className="space-y-5">
                {[
                  { name: 'LaunchPath Home', path: '/' },
                  { name: 'About the Standard', path: '/about' },
                  { name: 'Contact Us', path: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-lg font-medium text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-[13px] font-black text-signal-gold uppercase tracking-[0.3em] mb-8 flex items-center">
                  <span className="w-6 h-[1px] bg-signal-gold/40 mr-4"></span>
                  SYSTEM
              </h3>
              <ul className="space-y-5">
                {[
                  { name: 'Operating Roadmap', path: '/learning-path' },
                  { name: 'Admission Protocol', path: '/readiness' },
                  { name: 'TCO Calculator', path: '/tools/tco-calculator' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-lg font-medium text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-[13px] font-black text-signal-gold uppercase tracking-[0.3em] mb-8 flex items-center">
                  <span className="w-6 h-[1px] bg-signal-gold/40 mr-4"></span>
                  RESOURCES
              </h3>
              <ul className="space-y-5">
                {[
                  { name: 'FMCSA Safety Checklists', path: '/download/risk-map' },
                  { name: 'Educational Downloads', path: '/resources' },
                  { name: 'Truth & Clarification', path: '/clarification' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-lg font-medium text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-[13px] font-black text-signal-gold uppercase tracking-[0.3em] mb-8 flex items-center">
                  <span className="w-6 h-[1px] bg-signal-gold/40 mr-4"></span>
                  GOVERNANCE
              </h3>
              <ul className="space-y-5">
                {[
                  { name: 'Privacy Policy', path: '/legal' },
                  { name: 'Terms of Service', path: '/legal' },
                  { name: 'Educational Disclaimer', path: '/legal' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-lg font-medium text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <section className="bg-authority-blue dark:bg-surface-dark border-t border-white/5 py-20 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">
            <div className="flex-grow space-y-8">
              <div className="flex items-center gap-6">
                <Logo light={true} className="h-16 grayscale-0" />
                <div className="h-10 w-[1px] bg-white/20"></div>
                <div className="flex items-center space-x-3 text-signal-gold/80">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Integrity Standard Certified</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-base text-white/60 font-bold uppercase tracking-[0.15em]">
                    © {new Date().getFullYear()} LaunchPath™ Transportation EDU. All Rights Reserved.
                </p>
                <p className="text-sm font-black text-white/40 uppercase tracking-[0.4em]">
                    Veteran Owned & Operated • Charlotte, NC • NC-2025-LP
                </p>
              </div>

              <div className="max-w-[800px] p-8 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-sm text-white/50 leading-relaxed italic font-medium">
                  LaunchPath is an institutional educational platform providing technical training and resources for motor carrier operations. All materials are for educational purposes only and do not constitute legal, tax, financial, insurance, or regulatory advice. Success is contingent on individual operator execution and discipline.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-start lg:items-end gap-10">
                <div className="flex items-center space-x-8">
                {settings.social.facebook && (
                    <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-signal-gold hover:scale-125 transition-all duration-300" aria-label="Facebook">
                    <Facebook size={28} />
                    </a>
                )}
                {settings.social.twitter && (
                    <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-signal-gold hover:scale-125 transition-all duration-300" aria-label="Twitter">
                    <Twitter size={28} />
                    </a>
                )}
                {settings.social.linkedin && (
                    <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-signal-gold hover:scale-125 transition-all duration-300" aria-label="LinkedIn">
                    <Linkedin size={28} />
                    </a>
                )}
                {settings.social.instagram && (
                    <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-signal-gold hover:scale-125 transition-all duration-300" aria-label="Instagram">
                    <Instagram size={28} />
                    </a>
                )}
                {settings.social.youtube && (
                    <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-signal-gold hover:scale-125 transition-all duration-300" aria-label="YouTube">
                    <Youtube size={28} />
                    </a>
                )}
                </div>
                
                <div className="flex flex-col items-start lg:items-end space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">System Infrastructure</p>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white/50 uppercase tracking-widest">
                            SSL: ACTIVE
                        </div>
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white/50 uppercase tracking-widest">
                            CDN: STABLE
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

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
      console.warn("App: Settings listener failed.", error.message);
      setAppLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (appLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark">
      <div className="flex flex-col items-center gap-10">
        <img 
          src={theme === 'dark' 
            ? "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fwhite_logo.png?alt=media&token=54e9f47f-ef40-46c4-942b-00b2d91c6dd2"
            : "https://firebasestorage.googleapis.com/v0/b/lpedu-d9bb2.firebasestorage.app/o/Downloads%2Flogo%2Fblue_logo.png?alt=media&token=57100c1c-e867-4f10-9d2a-30e9d641b8cf"
          } 
          alt="LaunchPath Loading" 
          className="h-20 w-auto animate-pulse" 
        />
        <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-authority-blue" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Initializing Secure Standard...</p>
        </div>
      </div>
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
          <main id="main-content" className="flex-grow" role="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/clarification" element={<ClarificationPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:briefId" element={<ReferenceBriefPage />} />
              <Route path="/readiness" element={<ReadinessPage />} />
              <Route path="/reach-test" element={<ReachTestPage />} />
              <Route path="/portal" element={<PortalInterstitial />} />
              <Route path="/operator-portal" element={<OperatorPortal />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/ai-advisor" element={<AIServicePage />} />
              <Route path="/pricing" element={<EnrollPage />} />
              <Route path="/tools/tco-calculator" element={<TCOCalculatorPage />} />
              <Route path="/modules/:id" element={<ModuleDetailPage />} />
              <Route path="/download/risk-map" element={<DownloadPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
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
