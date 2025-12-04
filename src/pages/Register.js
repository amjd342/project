import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    firstNameEn: '',
    lastNameEn: '',
    phone: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const saudiCities = [
    'الرياض - Riyadh',
    'جدة - Jeddah',
    'مكة المكرمة - Makkah',
    'المدينة المنورة - Madinah',
    'الدمام - Dammam',
    'الخبر - Khobar',
    'الظهران - Dhahran',
    'الطائف - Taif',
    'تبوك - Tabuk',
    'أبها - Abha',
    'القصيم - Qassim',
    'حائل - Hail',
    'نجران - Najran',
    'جازان - Jazan'
  ];

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'يجب أن تحتوي على حرف كبير وصغير ورقم';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'كلمات المرور غير متطابقة';
    }
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'الاسم الأول مطلوب';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'اسم العائلة مطلوب';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'رقم الجوال مطلوب';
    } else if (!/^(\+966|05)\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'صيغة رقم الجوال غير صحيحة';
    }
    
    if (!formData.city) {
      errors.city = 'المدينة مطلوبة';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const userData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      firstNameEn: formData.firstNameEn || formData.firstName,
      lastNameEn: formData.lastNameEn || formData.lastName,
      phone: formData.phone,
      city: formData.city.split(' - ')[1] || formData.city,
      role: 'buyer'
    };
    
    const result = await register(userData);
    
    if (result.success) {
      navigate('/', { 
        replace: true,
        state: { message: 'تم إنشاء حسابك بنجاح! مرحباً بك في TechStore' }
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="auth-page" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <div className="auth-container animate-fade-in">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header" style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)'
          }}>
            <div className="auth-logo" style={{
              background: 'rgba(0, 255, 136, 0.2)',
              border: '2px solid rgba(0, 255, 136, 0.3)'
            }}>
              🖥️
            </div>
            <h1 className="auth-title">إنشاء حساب جديد</h1>
            <p className="auth-subtitle">انضم إلى TechStore الآن</p>
          </div>

          {/* Body */}
          <div className="auth-body">
            {/* Error Alert */}
            {error && (
              <div className="alert alert-error">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label className="form-label required" htmlFor="email">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  dir="ltr"
                />
                {formErrors.email && (
                  <span className="form-error">{formErrors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label required" htmlFor="password">
                  كلمة المرور
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input ${formErrors.password ? 'error' : ''}`}
                    placeholder="8 أحرف على الأقل"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--gray-400)'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formErrors.password && (
                  <span className="form-error">{formErrors.password}</span>
                )}
                <span className="form-hint">
                  يجب أن تحتوي على حرف كبير وصغير ورقم
                </span>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label required" htmlFor="confirmPassword">
                  تأكيد كلمة المرور
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  dir="ltr"
                />
                {formErrors.confirmPassword && (
                  <span className="form-error">{formErrors.confirmPassword}</span>
                )}
              </div>

              {/* Name Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label required" htmlFor="firstName">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                    placeholder="محمد"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {formErrors.firstName && (
                    <span className="form-error">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label required" htmlFor="lastName">
                    اسم العائلة
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                    placeholder="السعودي"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {formErrors.lastName && (
                    <span className="form-error">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label required" htmlFor="phone">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${formErrors.phone ? 'error' : ''}`}
                  placeholder="+966 5X XXX XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  dir="ltr"
                />
                {formErrors.phone && (
                  <span className="form-error">{formErrors.phone}</span>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label className="form-label required" htmlFor="city">
                  المدينة
                </label>
                <select
                  id="city"
                  name="city"
                  className={`form-select ${formErrors.city ? 'error' : ''}`}
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">اختر المدينة</option>
                  {saudiCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {formErrors.city && (
                  <span className="form-error">{formErrors.city}</span>
                )}
              </div>

              {/* Terms */}
              <div className="form-group" style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                <p>
                  بالتسجيل، أنت توافق على{' '}
                  <Link to="/terms" style={{ textDecoration: 'underline' }}>
                    شروط الاستخدام
                  </Link>
                  {' '}و{' '}
                  <Link to="/privacy" style={{ textDecoration: 'underline' }}>
                    سياسة الخصوصية
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={isSubmitting || loading}
                style={{
                  background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  color: '#1a1a2e'
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner" style={{ width: '20px', height: '20px' }}></span>
                    <span>جاري إنشاء الحساب...</span>
                  </>
                ) : (
                  <>
                    <span>إنشاء الحساب</span>
                    <span>←</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              لديك حساب بالفعل؟{' '}
              <Link to="/login" style={{ fontWeight: '600', color: '#00cc6a' }}>
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
          <Link 
            to="/" 
            style={{ 
              color: 'rgba(255,255,255,0.7)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-sm)'
            }}
          >
            <span>→</span>
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;