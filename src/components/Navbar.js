import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isSeller, logout } = useAuth();
  const { getItemCount } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const cartCount = getItemCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-brand-icon">🖥️</div>
          <span>TechStore</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
            >
              المنتجات
            </Link>
          </li>
          <li>
            <Link 
              to="/categories" 
              className={`navbar-link ${isActive('/categories') ? 'active' : ''}`}
            >
              التصنيفات
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            >
              عن TechStore
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Search Button */}
          <button 
            className="btn btn-ghost"
            onClick={() => navigate('/search')}
            title="البحث"
          >
            🔍
          </button>

          {isAuthenticated() ? (
            <>
              {/* Cart - Only for buyers */}
              {!isSeller() && (
                <Link to="/cart" className="btn btn-ghost cart-badge">
                  🛒
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </Link>
              )}

              {/* Seller Dashboard Link */}
              {isSeller() && (
                <Link 
                  to="/seller/dashboard" 
                  className="btn btn-secondary btn-sm"
                >
                  لوحة التحكم
                </Link>
              )}

              {/* User Menu */}
              <div style={{ position: 'relative' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-sm)' 
                  }}
                >
                  <span style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-lighter)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)'
                  }}>
                    {user?.firstName?.[0] || '👤'}
                  </span>
                  <span style={{ fontSize: '0.875rem' }}>
                    {user?.firstName || 'المستخدم'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: 'var(--space-sm)',
                      background: 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      minWidth: '200px',
                      overflow: 'hidden',
                      zIndex: 1000
                    }}
                  >
                    {/* User Info */}
                    <div style={{ 
                      padding: 'var(--space-md) var(--space-lg)',
                      borderBottom: '1px solid var(--gray-100)'
                    }}>
                      <p style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                        {user?.email}
                      </p>
                      <span style={{
                        display: 'inline-block',
                        marginTop: 'var(--space-xs)',
                        padding: '2px 8px',
                        background: isSeller() ? 'var(--accent-lighter)' : 'var(--primary-lighter)',
                        color: isSeller() ? 'var(--accent-dark)' : 'var(--primary-dark)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {isSeller() ? '🏪 بائع' : '🛒 مشتري'}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div style={{ padding: 'var(--space-sm) 0' }}>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        style={{
                          display: 'block',
                          padding: 'var(--space-sm) var(--space-lg)',
                          color: 'var(--gray-700)',
                          transition: 'background var(--transition-fast)'
                        }}
                      >
                        👤 الملف الشخصي
                      </Link>
                      
                      {isSeller() ? (
                        <>
                          <Link
                            to="/seller/products"
                            onClick={() => setShowUserMenu(false)}
                            style={{
                              display: 'block',
                              padding: 'var(--space-sm) var(--space-lg)',
                              color: 'var(--gray-700)'
                            }}
                          >
                            📦 منتجاتي
                          </Link>
                          <Link
                            to="/seller/orders"
                            onClick={() => setShowUserMenu(false)}
                            style={{
                              display: 'block',
                              padding: 'var(--space-sm) var(--space-lg)',
                              color: 'var(--gray-700)'
                            }}
                          >
                            📋 الطلبات
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/orders"
                            onClick={() => setShowUserMenu(false)}
                            style={{
                              display: 'block',
                              padding: 'var(--space-sm) var(--space-lg)',
                              color: 'var(--gray-700)'
                            }}
                          >
                            📦 طلباتي
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setShowUserMenu(false)}
                            style={{
                              display: 'block',
                              padding: 'var(--space-sm) var(--space-lg)',
                              color: 'var(--gray-700)'
                            }}
                          >
                            ❤️ المفضلة
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Logout */}
                    <div style={{ 
                      padding: 'var(--space-sm) 0',
                      borderTop: '1px solid var(--gray-100)'
                    }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'right',
                          padding: 'var(--space-sm) var(--space-lg)',
                          background: 'none',
                          border: 'none',
                          color: 'var(--error)',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          fontSize: 'inherit'
                        }}
                      >
                        🚪 تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn btn-primary">
                إنشاء حساب
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;