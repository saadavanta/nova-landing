import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Only this email can access the admin panel.
const ADMIN_EMAIL = 'slisaad445@gmail.com';

const Fallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

const AccessDenied = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
      <svg className="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h1 className="mt-6 text-2xl font-extrabold text-foreground">Access Denied</h1>
    <p className="mt-2 max-w-sm text-muted-foreground">
      You don't have permission to view this page. This area is restricted to administrators only.
    </p>
    <a href="/student" className="btn-primary mt-6">Go to Student Dashboard</a>
  </div>
);

export default function AdminRoute() {
  const { user, isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return <Fallback />;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Restrict admin access to the authorized email only
  if (!user || user.email !== ADMIN_EMAIL) {
    return <AccessDenied />;
  }

  return <Outlet />;
}
