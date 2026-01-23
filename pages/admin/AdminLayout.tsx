import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Logo from '../../components/Logo';
import { 
  LayoutDashboard, 
  Download, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Globe,
  Menu,
  X,
  ChevronRight,
  Video,
  Database,
  Users
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Pages', path: '/admin/pages', icon: <Globe size={20} /> },
    { name: 'Leads', path: '/admin/leads', icon: <Users size={20} /> },
    { name: 'Video Lab', path: '/admin/video-lab', icon: <Video size={20} /> },
    { name: 'Resources', path: '/admin/resources', icon: <Download size={20} /> },
    { name: 'Forms', path: '/admin/forms', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    { name: 'Init Cloud', path: '/admin/initialize-data', icon: <Database size={20} /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary-dark flex">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-surface-dark border-r border-border-light dark:border-border-dark transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex items-center justify-between">
            <Link to="/admin" className="flex items-center">
              <Logo className="h-10" />
            </Link>
            <button className="lg:hidden p-2 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === item.path 
                  ? 'bg-authority-blue text-white shadow-lg' 
                  : 'text-text-muted hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {location.pathname === item.path && <ChevronRight size={14} />}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-border-light dark:border-border-dark">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="font-bold text-authority-blue dark:text-white uppercase tracking-widest text-xs">
              {navItems.find(n => n.path === location.pathname)?.name || 'Admin Area'}
            </h2>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;