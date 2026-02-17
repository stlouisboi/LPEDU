import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEnhancedAuth } from '../../EnhancedAuthContext';
import { Loader2 } from 'lucide-react';

export const FreeRoute: React.FC = () => {
  const { userProfile, loading } = useEnhancedAuth();
  
  if (loading) return <LoadingScreen />;
  if (!userProfile) return <Navigate to="/portal" />;
  
  return <Outlet />;
};

export const PaidRoute: React.FC = () => {
  const { userProfile, loading, currentUser } = useEnhancedAuth();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = React.useState(false);

  // Set a timeout to prevent infinite loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // If loading and timeout not reached, show loading screen
  if (loading && !timeoutReached) return <LoadingScreen />;
  
  // If no user is authenticated, redirect to login
  if (!currentUser) return <Navigate to="/portal" state={{ from: location }} />;
  
  // If user is authenticated but profile is still being fetched after timeout, allow access
  if (!userProfile && !timeoutReached) return <LoadingScreen />;
  if (!userProfile && timeoutReached) return <Outlet />; // Allow access after timeout
  
  // Allow access if user has paid or admin role
  if (userProfile.role === 'paid' || userProfile.role === 'admin') {
    return <Outlet />;
  }
  
  // Otherwise redirect to enrollment pending
  return <Navigate to="/enrollment-pending" />;
};

export const AdminRoute: React.FC = () => {
  const { userProfile, loading, currentUser } = useEnhancedAuth();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = React.useState(false);

  // Set a timeout to prevent infinite loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // If loading and timeout not reached, show loading screen
  if (loading && !timeoutReached) return <LoadingScreen />;
  
  // If no user is authenticated, redirect to login
  if (!currentUser) return <Navigate to="/admin/login" state={{ from: location }} />;
  
  // If user is authenticated but profile is still being fetched after timeout, allow access
  if (!userProfile && !timeoutReached) return <LoadingScreen />;
  if (!userProfile && timeoutReached) return <Outlet />; // Allow access after timeout
  
  // Allow access if user has admin role
  if (userProfile.role === 'admin') {
    return <Outlet />;
  }
  
  // Otherwise redirect to home
  return <Navigate to="/" />;
};

const LoadingScreen = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
    <Loader2 className="animate-spin text-authority-blue mb-4" size={40} />
    <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Verifying Credentials...</p>
  </div>
);