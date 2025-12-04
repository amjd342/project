import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initDatabase, 
  validateCredentials, 
  createUser, 
  findUserById,
  updateUser 
} from '../utils/database';

// Create the Auth Context
const AuthContext = createContext(null);

// Session storage key
const SESSION_KEY = 'usaruna_session';

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize database and check for existing session
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 🔑 الخطوة الحاسمة: انتظار تهيئة قاعدة البيانات (حل مشكلة التوقيت)
        await initDatabase();
        
        // Check for existing session
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const userData = findUserById(session.userId);
          if (userData) {
            const { password, ...userWithoutPassword } = userData;
            setUser(userWithoutPassword);
          } else {
            // Invalid session, clear it
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('فشل في تهيئة النظام - System initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = validateCredentials(email, password);
      
      if (!userData) {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة - Invalid email or password');
      }
      
      // Create session
      const session = {
        userId: userData.id,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!userData.email || !userData.password) {
        throw new Error('البريد الإلكتروني وكلمة المرور مطلوبان - Email and password are required');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('صيغة البريد الإلكتروني غير صحيحة - Invalid email format');
      }
      
      // Validate password strength
      if (userData.password.length < 8) {
        throw new Error('كلمة المرور يجب أن تكون 8 أحرف على الأقل - Password must be at least 8 characters');
      }
      
      // Check for uppercase, lowercase, and number
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
      if (!passwordRegex.test(userData.password)) {
        throw new Error('كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم - Password must contain uppercase, lowercase, and number');
      }
      
      // Create the user
      const newUser = createUser(userData);
      
      // Auto login after registration
      const session = {
        userId: newUser.id,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      
      setUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setError(null);
  };

  // Update profile function
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('يجب تسجيل الدخول أولاً - Must be logged in');
      }
      
      const updatedUser = updateUser(user.id, updates);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Check if user is a seller
  const isSeller = () => {
    return user?.role === 'seller';
  };

  // Check if user is a buyer
  const isBuyer = () => {
    return user?.role === 'buyer';
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isSeller,
    isBuyer,
    clearError
  };

  // 🚨 التعديل لإضافة شاشة التحميل
  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'var(--gray-900)', 
        color: 'var(--white)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          margin: '0 auto 1rem',
          border: '5px solid rgba(255, 255, 255, 0.2)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>جاري تحميل بيانات المتجر...</p>
      </div>
    );
  }
  

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;