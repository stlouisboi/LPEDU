import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEnhancedAuth } from '../../contexts/EnhancedAuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Base Protected Route - Requires authentication only
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useEnhancedAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <Loader2 className="animate-spin text-authority-blue mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
          Verifying Credentials...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * Free Route - Requires authentication (all users including free)
 */
export const FreeRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useEnhancedAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <Loader2 className="animate-spin text-authority-blue mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
          Verifying Credentials...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/**
 * Paid Route - Requires paid or admin role
 */
export const PaidRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, enrollmentStatus, loading } = useEnhancedAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <Loader2 className="animate-spin text-authority-blue mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
          Verifying Access Level...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }

  if (!enrollmentStatus?.hasFullAccess) {
    return <Navigate to="/enrollment-pending" replace />;
  }

  return <>{children}</>;
};

/**
 * Admin Route - Requires admin role
 */
export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, enrollmentStatus, loading } = useEnhancedAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <Loader2 className="animate-spin text-authority-blue mb-4" size={40} />
        <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!enrollmentStatus?.isAdmin) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-primary-dark">
        <ShieldAlert className="text-red-500 mb-4" size={48} />
        <h1 className="text-2xl font-black uppercase tracking-wider text-authority-blue mb-2">
          Access Denied
        </h1>
        <p className="text-sm text-text-muted uppercase tracking-widest">
          Admin Privileges Required
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
