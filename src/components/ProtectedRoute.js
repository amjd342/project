import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null,
  redirectTo = '/login' 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner lg"></div>
          <p style={{ marginTop: 'var(--space-lg)', color: 'var(--gray-600)' }}>
            جاري التحقق...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ 
          from: location,
          message: 'يجب تسجيل الدخول للوصول إلى هذه الصفحة'
        }} 
        replace 
      />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === 'seller' && requiredRole === 'buyer') {
      return (
        <Navigate 
          to="/seller/dashboard" 
          state={{ message: 'هذه الصفحة للمشترين فقط' }}
          replace 
        />
      );
    }
    
    if (user?.role === 'buyer' && requiredRole === 'seller') {
      return (
        <Navigate 
          to="/" 
          state={{ message: 'هذه الصفحة للبائعين فقط' }}
          replace 
        />
      );
    }
    
    return (
      <Navigate 
        to="/" 
        state={{ message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة' }}
        replace 
      />
    );
  }

  return children;
};

export const GuestRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="loading-overlay">
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner lg"></div>
          <p style={{ marginTop: 'var(--space-lg)', color: 'var(--gray-600)' }}>
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated()) {
    const destination = user?.role === 'seller' 
      ? '/seller/dashboard' 
      : redirectTo;
    
    return <Navigate to={destination} replace />;
  }

  return children;
};

export const SellerRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="seller">
      {children}
    </ProtectedRoute>
  );
};

export const BuyerRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="buyer">
      {children}
    </ProtectedRoute>
  );
};

export default ProtectedRoute;