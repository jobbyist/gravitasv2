import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Route guard that requires authentication
 * Redirects to /client-dashboard with returnTo parameter if not authenticated
 */
export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to client dashboard with return URL
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/client-dashboard?returnTo=${returnTo}`} replace />;
  }

  return <>{children}</>;
};

interface RequireClientMatchProps {
  children: ReactNode;
}

/**
 * Route guard that ensures the authenticated user matches the client username in the URL
 * Prevents managing another client's account
 */
export const RequireClientMatch = ({ children }: RequireClientMatchProps) => {
  const { user, isAuthenticated } = useAuth();
  const { username } = useParams<{ username: string }>();

  if (!isAuthenticated) {
    // This should be wrapped in RequireAuth first, but just in case
    return <Navigate to="/client-dashboard" replace />;
  }

  if (user?.username !== username) {
    // Redirect to the authenticated user's manage overview
    return <Navigate to={`/client-area/${user?.username}/manage/overview`} replace />;
  }

  return <>{children}</>;
};
