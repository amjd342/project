import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, updateProfile, loading, error, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    firstNameEn: user?.firstNameEn || '',
    lastNameEn: user?.lastNameEn || '',
    phone: user?.phone || '',
    city: user?.city || '',
    storeName: user?.storeName || '',
    storeNameEn: user?.storeNameEn || '',
    storeDescription: user?.storeDescription || ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const saudiCities = [
    'Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 
    'Khobar', 'Dhahran', 'Taif', 'Tabuk', 'Abha',
    'Qassim', 'Hail', 'Najran', 'Jazan'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setSuccessMessage('');

    const result = await updateProfile(formData);
    
    if (result.success) {
      setSuccessMessage('تم تحديث البيانات بنجاح');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      firstNameEn: user?.firstNameEn || '',
      lastNameEn: user?.lastNameEn || '',
      phone: user?.phone || '',
      city: user?.city || '',
      storeName: user?.storeName || '',
      storeNameEn: user?.storeNameEn || '',
      storeDescription: user?.storeDescription || ''
    });
    setIsEditing(false);
    clearError();
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">الملف الشخصي</h1>
            <p className="dashboard-subtitle">إدارة معلومات حسابك</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success">
              <span>✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Profile Card */}
          <div className="card">
            <div className="card-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <h3>المعلومات الشخصية</h3>
              {!isEditing && (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ تعديل
                </button>
              )}
            </div>

            <div className="card-body">
              {/* Profile Picture Section */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-xl)',
                paddingBottom: 'var(--space-xl)',
                borderBottom: '1px solid var(--gray-100)'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  fontSize: '2.5rem',
                  fontWeight: '700'
                }}>
                  {user?.firstName?.[0] || '👤'}
                </div>
                <div>
                  <h3 style={{ marginBottom: 'var(--space-xs)' }}>
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-sm)' }}>
                    {user?.email}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: user?.role === 'seller' ? 'var(--accent-lighter)' : 'var(--primary-lighter)',
                    color: user?.role === 'seller' ? 'var(--accent-dark)' : 'var(--primary-dark)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {user?.role === 'seller' ? '🏪 بائع' : '🛒 مشتري'}
                  </span>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: 'var(--space-md)' 
                }}>
                  <div className="form-group">
                    <label className="form-label">الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">اسم العائلة</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* English Name Fields */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: 'var(--space-md)' 
                }}>
                  <div className="form-group">
                    <label className="form-label">First Name (English)</label>
                    <input
                      type="text"
                      name="firstNameEn"
                      className="form-input"
                      value={formData.firstNameEn}
                      onChange={handleChange}
                      disabled={!isEditing}
                      dir="ltr"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name (English)</label>
                    <input
                      type="text"
                      name="lastNameEn"
                      className="form-input"
                      value={formData.lastNameEn}
                      onChange={handleChange}
                      disabled={!isEditing}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Email (Read-only) */}
                <div className="form-group">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-input"
                    value={user?.email || ''}
                    disabled
                    dir="ltr"
                    style={{ background: 'var(--gray-50)' }}
                  />
                  <span className="form-hint">لا يمكن تغيير البريد الإلكتروني</span>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">رقم الجوال</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    dir="ltr"
                  />
                </div>

                {/* City */}
                <div className="form-group">
                  <label className="form-label">المدينة</label>
                  <select
                    name="city"
                    className="form-select"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">اختر المدينة</option>
                    {saudiCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Seller-specific fields */}
                {user?.role === 'seller' && (
                  <>
                    <div style={{ 
                      margin: 'var(--space-xl) 0',
                      padding: 'var(--space-lg) 0',
                      borderTop: '1px solid var(--gray-100)',
                      borderBottom: '1px solid var(--gray-100)'
                    }}>
                      <h4 style={{ marginBottom: 'var(--space-lg)' }}>معلومات المتجر</h4>

                      <div className="form-group">
                        <label className="form-label">اسم المتجر (عربي)</label>
                        <input
                          type="text"
                          name="storeName"
                          className="form-input"
                          value={formData.storeName}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Store Name (English)</label>
                        <input
                          type="text"
                          name="storeNameEn"
                          className="form-input"
                          value={formData.storeNameEn}
                          onChange={handleChange}
                          disabled={!isEditing}
                          dir="ltr"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">وصف المتجر</label>
                        <textarea
                          name="storeDescription"
                          className="form-textarea"
                          value={formData.storeDescription}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading-spinner" style={{ width: '20px', height: '20px' }}></span>
                          <span>جاري الحفظ...</span>
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          <span>حفظ التغييرات</span>
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-ghost"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      إلغاء
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3>معلومات الحساب</h3>
            </div>
            <div className="card-body">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-lg)'
              }}>
                <div>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>تاريخ التسجيل</p>
                  <p style={{ fontWeight: '500' }}>
                    {new Date(user?.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>حالة الحساب</p>
                  <p style={{ 
                    fontWeight: '500',
                    color: user?.verified ? 'var(--success)' : 'var(--warning)'
                  }}>
                    {user?.verified ? '✓ موثق' : '⏳ قيد المراجعة'}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>معرف المستخدم</p>
                  <p style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {user?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card" style={{ marginTop: 'var(--space-xl)', borderColor: 'var(--error)' }}>
            <div className="card-header" style={{ background: '#fee2e2' }}>
              <h3 style={{ color: 'var(--error)' }}>⚠️ منطقة الخطر</h3>
            </div>
            <div className="card-body">
              <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--gray-600)' }}>
                هذه الإجراءات لا يمكن التراجع عنها. يرجى التأكد قبل المتابعة.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                  تغيير كلمة المرور
                </button>
                <button className="btn btn-danger">
                  حذف الحساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;