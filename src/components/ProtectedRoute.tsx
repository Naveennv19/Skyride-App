
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case 'CUSTOMER':
        return <Navigate to="/customer-dashboard" replace />;
      case 'DRIVER':
        return <Navigate to="/driver-dashboard" replace />;
      case 'ADMIN':
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
