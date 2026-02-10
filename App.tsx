import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Sun, Moon, Menu, X, ChevronRight, Lock, Youtube, Facebook, 
  Linkedin, ShieldCheck, LayoutDashboard, Music, Layout 
} from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";

// Core Config
import { db, isFirebaseConfigured } from './firebase';
import { INITIAL_SETTINGS, INITIAL_BLOGS } from './constants';
import { BlogPost, SiteSettings, Testimonial } from './types';
import { AuthProvider, useAuth } from './AuthContext';

// Components
import ScrollToTop from './components/ScrollToTop';
import AIChatWidget from './components/AIChatWidget';
import Logo from './components/Logo';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearningPathPage from './pages/LearningPathPage'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import RequestAdmission from './pages/RequestAdmission';
import AuthorityAccess from './pages/AuthorityAccess';
import EnrollmentPendingPage from './pages/EnrollmentPendingPage';
import ReachTestPage from './pages/ReachTestPage';
import OperatorPortal from './pages/OperatorPortal';
import ExposureMatrixPage from './pages/ExposureMatrixPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardHome from './pages/admin/AdminDashboardHome'; 
import SettingsManager from './pages/admin/SettingsManager';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  settings: SiteSettings;
  updateSettings: (s: SiteSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- FIXING THE HEADER ---
const Header = () => {
  const { theme, toggleTheme } = useApp();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // If you want the menu back immediately, comment out this hide logic:
  // const hideHeaderRoutes = ['/admin', '/portal', '/enrollment-pending'];
  // if (hideHeaderRoutes.some(route => location.pathname.startsWith(route))) return null;

  return (
    <header className="sticky top-0 z-[100] bg-authority-blue border-b border-white/10 text-signal-gold h-24 sm:h-32 flex items-center">
      <div className="max-w-[1800px] mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/"><Logo light={true} className="h-10 sm:h-14 w-auto" /></Link>
        <div className="flex items-center space-x-6">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-white/5 rounded-xl xl:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden xl:flex items-center space-x-6">
             <Link to="/about" className="uppercase font-black text-[11px] tracking-widest">About</Link>
             <Link to="/pricing" className="bg-signal-gold text-authority-blue px-6 py-3 rounded-xl font-black text-[11px] tracking-widest">Admission Protocol</Link>
             <button onClick={toggleTheme} className="p-3 bg-white/5 rounded-xl">
               {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// --- FIXING THE FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-authority-blue py-12 border-t border-white/5 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic">
        CARRIER OPERATING STANDARD: LP-SYS-V4.2 — INSTITUTIONAL INTEGRITY ACTIVE
      </p>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  // Temporarily set loading to false to force a render
  const [appLoading, setAppLoading] = useState(false); 

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ theme, toggleTheme, settings, updateSettings: setSettings }}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white dark:bg-authority-blue">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/exposure-matrix" element={<ExposureMatrixPage />} />
                <Route path="/reach-test" element={<ReachTestPage />} />
                <Route path="/portal" element={<AuthorityAccess />} />
                <Route path="/pricing" element={<RequestAdmission />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <AIChatWidget />
          </div>
        </Router>
      </AuthProvider>
    </AppContext.Provider>
  );
}
