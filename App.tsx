import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronRight, 
  Lock,
  Youtube,
  Facebook,
  Linkedin,
  ShieldCheck,
  LayoutDashboard,
  Music,
  Brain,
  Scale,
  FileText,
  ShieldAlert,
  Activity,
  Anchor,
  Zap,
  Globe,
  Database,
  // Added ArrowRight to imports to fix the error on line 216
  ArrowRight
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings } from './types';
import { EnhancedAuthProvider, useEnhancedAuth } from './EnhancedAuthContext';
import { FreeRoute, PaidRoute, AdminRoute } from './components/auth/RoleBasedRoutes';
import ScrollToTop from './components/ScrollToTop';
import Logo from './components/Logo';
import AIChatWidget from './components/AIChatWidget';

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
import RequestAdmission from './pages/RequestAdmission';
import ModuleDetailPage from './pages/ModuleDetailPage';
import DownloadPage from './pages/DownloadPage';
import ReadinessPage from './pages/ReadinessPage';
import EnhancedPortalLogin from './pages/EnhancedPortalLogin';
import EnrollmentPendingPage from './pages/EnrollmentPendingPage';
import ReachTestPage from './pages/ReachTestPage';
import TCOCalculatorPage from './pages/TCOCalculatorPage';
import TCOPreviewPage from './pages/TCOPreviewPage';
import OperatorPortal from './pages/OperatorPortal';
import ExposureMatrixPage from './pages/ExposureMatrixPage';
import SudokuPage from './pages/SudokuPage';

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

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => void;
  blogs: BlogPost[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const SystemStatusBar = () => {
  const [activeSignal, setActiveSignal] = useState(0);
  const signals = [
    { label: "AUTHORITY", value: "ACTIVE", icon: <ShieldCheck size={10} /> },
    { label: "REGISTRY", value: "SYNCED", icon: <Database size={10} /> },
    { label: "INTEGRITY", value: "100%", icon: <Zap size={10} /> },
    { label: "UPLINK", value: "STABLE", icon: <Globe size={10} /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % signals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary-dark/95 border-b border-white/5 h-8 flex items-center px-6 overflow-hidden">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-[9px] font-black text-signal-gold uppercase tracking-[0.2em]">
          <Activity size={10} className="animate-pulse" />
          <span>SYSTEM_STATUS_MONITOR</span>
        </div>
        <div className="h-3 w-px bg-white/10"></div>
        <div className="flex items-center space-x-8">
          {signals.map((sig, i) => (
            <div key={i} className={`flex items-center space-x-2 transition-opacity duration-1000 ${activeSignal === i ? 'opacity-100' : 'opacity-20 hidden sm:flex'}`}>
              <span className="text-white/40">{sig.icon}</span>
              <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">{sig.label}:</span>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{sig.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-auto hidden lg:flex items-center space-x-4">
         <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">CFR_SYNC: 2026_V4.2</span>
      </div>
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useApp();
  const { currentUser } = useEnhancedAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const hideHeaderRoutes = ['/admin', '/portal', '/enrollment-pending'];
  if (hideHeaderRoutes.some(route => location.pathname.startsWith(route))) return null;

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Program', path: '/learning-path' },
    { name: 'Matrix', path: '/exposure-matrix' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Ground 0', path: '/readiness' }
  ];

  return (
    <>
      <SystemStatusBar />
      <header 
        className={`sticky top-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-authority-blue/90 backdrop-blur-xl border-b border-white/10 h-20 sm:h-24' 
            : 'bg-authority-blue border-b border-white/5 h-20 sm:h-28 md:h-32'
        }`} 
        role="banner"
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 h-full">
          <div className="flex justify-between items-center h-full">
            
            <Link to="/" className="flex items-center shrink-0 transition-all hover:scale-105 active:scale-95 duration-300" aria-label="LaunchPath Home">
              <Logo light={true} className={`${isScrolled ? 'h-7 sm:h-9' : 'h-8 sm:h-10 md:h-14'} w-auto transition-all`} />
            </Link>

            <nav className="hidden xl:flex items-center" aria-label="Main Navigation">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group filter ${
                      location.pathname === item.path 
                      ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                      : 'text-signal-gold/70 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-4 right-4 h-[3px] bg-signal-gold transition-all duration-300 origin-center ${
                      location.pathname === item.path ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}></span>
                  </Link>
                ))}
              </div>
              
              <div className="w-[1.5px] h-8 bg-white/10 mx-6" />

              <div className="flex items-center space-x-4">
                {currentUser ? (
                  <Link to="/operator-portal" className="bg-white/5 border-2 border-white/20 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center hover:bg-white hover:text-authority-blue transition-all active:scale-95">
                    <LayoutDashboard size={12} className="mr-2" />
                    Portal
                  </Link>
                ) : (
                  <Link to="/portal" className="border-2 border-signal-gold text-signal-gold px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center hover:bg-signal-gold hover:text-authority-blue transition-all active:scale-95">
                    <Lock size={12} className="mr-2" />
                    Enter
                  </Link>
                )}

                <Link to="/pricing" className="bg-signal-gold text-authority-blue px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all active:scale-95 shadow-xl border-b-4 border-slate-900 group">
                  Admission <ArrowRight size={12} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button onClick={toggleTheme} className="p-3 rounded-2xl bg-white/5 text-signal-gold hover:scale-110 transition-all border border-white/10" aria-label="Toggle Theme">
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>
            </nav>

            <div className="xl:hidden flex items-center space-x-2 sm:space-x-4">
              <button onClick={toggleTheme} className="p-3 rounded-xl bg-white/10 text-signal-gold border border-white/10" aria-label="Toggle Theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-3 bg-signal-gold text-authority-blue rounded-xl shadow-lg transition-transform active:scale-90"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="fixed inset-0 top-20 sm:top-24 bg-authority-blue z-[99] xl:hidden flex flex-col animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto" aria-label="Mobile Navigation">
            <div className="flex flex-col p-6 sm:p-10 space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block p-5 rounded-[2rem] font-black text-xl uppercase tracking-tighter transition-all ${location.pathname === '/' ? 'bg-white text-authority-blue shadow-xl' : 'text-white/40'}`}>
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block p-5 rounded-[2rem] font-black text-xl uppercase tracking-tighter transition-all ${
                    location.pathname === item.path ? 'bg-white text-authority-blue shadow-xl' : 'text-signal-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-10 space-y-4">
                <Link to={currentUser ? "/operator-portal" : "/portal"} onClick={() => setIsMenuOpen(false)} className="block w-full text-center border-2 border-signal-gold text-signal-gold py-5 rounded-[2rem] text-lg font-black uppercase tracking-widest">
                  {currentUser ? 'My Portal' : 'Portal Access'}
                </Link>
                <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-signal-gold text-authority-blue py-6 rounded-[2rem] text-lg font-black uppercase tracking-widest shadow-2xl border-b-8 border-slate-950">
                  Admission Protocol
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

const Footer = () => {
  const { settings } = useApp();
  const location = useLocation();
  
  const hideFooterRoutes = ['/admin', '/portal', '/enrollment-pending'];
  if (hideFooterRoutes.some(route => location.pathname.startsWith(route))) return null;

  return (
    <footer className="w-full font-sans border-t border-white/5" role="contentinfo">
      <section className="bg-authority-blue dark:bg-surface-dark py-16 md:py-32 transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {[
              { 
                title: 'FOUNDATION', 
                links: [
                  { name: 'Home', path: '/' }, 
                  { name: 'About', path: '/about' }, 
                  { name: 'Contact', path: '/contact' }
                ] 
              },
              { 
                title: 'SYSTEM', 
                links: [
                  { name: 'Program Roadmap', path: '/learning-path' }, 
                  { name: 'Admission Protocol', path: '/pricing' }, 
                  { name: 'TCO Calculator', path: '/tools/tco-calculator' }
                ] 
              },
              { 
                title: 'RESOURCES', 
                links: [
                  { name: 'REACH Test™', path: '/reach-test' }, 
                  { name: 'The Blog', path: '/blog' }, 
                  { name: 'Exposure Matrix', path: '/exposure-matrix' }
                ] 
              },
              { 
                title: 'GOVERNANCE', 
                links: [
                  { name: 'Privacy Policy', path: '/legal/privacy' }, 
                  { name: 'Terms of Service', path: '/legal/terms' }, 
                  { name: 'FMCSA Official', path: 'https://www.fmcsa.dot.gov/' }
                ] 
              }
            ].map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-[11px] font-black text-signal-gold uppercase tracking-[0.3em] flex items-center">
                  <span className="w-4 h-px bg-signal-gold/40 mr-3"></span>
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.path.startsWith('http') ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-white/60 hover:text-white transition-all block py-1">
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.path} className="text-base font-medium text-white/60 hover:text-white transition-all block py-1">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-authority-blue dark:bg-surface-dark border-t border-white/5 py-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="space-y-8 max-w-2xl">
              <div className="flex items-center gap-4">
                <Logo light={true} className="h-10 sm:h-12" />
                <div className="h-6 w-px bg-white/20"></div>
                <div className="flex items-center space-x-2 text-signal-gold/80">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Certified Integrity</span>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                LaunchPath is an institutional educational platform. All materials are for educational purposes only and do not constitute legal or regulatory advice. Success depends on individual operator discipline.
              </p>
              <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
                CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={20} />, path: settings.social.facebook, label: 'Facebook' },
                { icon: <Linkedin size={20} />, path: settings.social.linkedin, label: 'LinkedIn' },
                { icon: <Youtube size={20} />, path: settings.social.youtube, label: 'YouTube' },
                { icon: <Music size={20} />, path: settings.social.tiktok, label: 'TikTok' }
              ].map((social, i) => social.path && (
                <a key={i} href={social.path} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:bg-signal-gold hover:text-authority-blue transition-all" aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('launchpath-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark'; 
    }
    return 'dark';
  });
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  
  const isPreview = typeof window !== 'undefined' && (
    window.location.hostname.includes("googlevideo.com") || 
    window.location.hostname.includes("usercontent.goog") ||
    window.location.hostname.includes("web-hub.corp.google.com")
  );

  const [appLoading, setAppLoading] = useState(!isPreview);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('launchpath-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('launchpath-theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const faviconLink = document.getElementById('favicon-link') as HTMLLinkElement;
    if (faviconLink && settings.faviconUrl) faviconLink.href = settings.faviconUrl;
  }, [settings.faviconUrl]);

  useEffect(() => {
    if (isPreview) {
      setAppLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !db) {
      setAppLoading(false);
      return;
    }
    
    try {
      const settingsRef = doc(db, "settings", "general");
      const unsub = onSnapshot(settingsRef, (snap) => {
        if (snap.exists()) setSettings(snap.data() as SiteSettings);
        setAppLoading(false);
      }, (err) => {
        setAppLoading(false);
      });
      return () => unsub();
    } catch (e) {
      setAppLoading(false);
    }
  }, [isPreview]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, settings, updateSettings: setSettings, blogs
    }}>
      {appLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-primary-dark transition-colors duration-500">
          <Logo className="h-16 w-auto animate-pulse brightness-110" />
        </div>
      ) : (
        <EnhancedAuthProvider>
          <Router>
            <ScrollToTop />
            <Header />
            <ChatWidgetWrapper />
            <main id="main-content" className="flex-grow" role="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/clarification" element={<ClarificationPage />} />
                <Route path="/exposure-matrix" element={<ExposureMatrixPage />} />
                <Route path="/learning-path" element={<LearningPathPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:briefId" element={<ReferenceBriefPage />} />
                <Route path="/readiness" element={<ReadinessPage />} />
                <Route path="/reach-test" element={<ReachTestPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/pricing" element={<RequestAdmission />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                
                <Route path="/portal" element={<EnhancedPortalLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<FreeRoute />}>
                  <Route path="/enrollment-pending" element={<EnrollmentPendingPage />} />
                  <Route path="/download/risk-map" element={<DownloadPage />} />
                  <Route path="/tools/sudoku" element={<SudokuPage />} />
                </Route>

                <Route element={<PaidRoute />}>
                  <Route path="/operator-portal" element={<OperatorPortal />} />
                  <Route path="/ai-advisor" element={<AIServicePage />} />
                  <Route path="/tools/tco-calculator" element={<TCOCalculatorPage />} />
                  <Route path="/modules/:id" element={<ModuleDetailPage />} />
                </Route>

                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
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
                </Route>

                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </EnhancedAuthProvider>
      )}
    </AppContext.Provider>
  );
}

const ChatWidgetWrapper = () => {
  const location = useLocation();
  const hideOnPaths = ['/', '/admin', '/portal', '/operator-portal', '/enrollment-pending'];
  const shouldShow = !hideOnPaths.some(path => path === location.pathname || (path !== '/' && location.pathname.startsWith(path)));
  
  if (!shouldShow) return null;
  return <AIChatWidget />;
};