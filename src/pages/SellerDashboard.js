import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductsBySeller, getSellerOrders } from '../utils/database';
import Navbar from '../components/Navbar';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    if (user) {
      // Load seller products
      const sellerProducts = getProductsBySeller(user.id);
      setProducts(sellerProducts);

      // Load seller orders
      const sellerOrders = getSellerOrders(user.id);
      setOrders(sellerOrders);

      // Calculate stats
      const totalRevenue = sellerOrders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total || 0), 0);

      const pendingOrders = sellerOrders.filter(o => o.status === 'pending').length;

      setStats({
        totalProducts: sellerProducts.length,
        totalOrders: sellerOrders.length,
        totalRevenue,
        pendingOrders
      });
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container">
          {/* Header */}
          <div className="dashboard-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 className="dashboard-title">
                  مرحباً، {user?.firstName} 👋
                </h1>
                <p className="dashboard-subtitle">
                  {user?.storeName || 'متجرك'} - لوحة تحكم البائع
                </p>
              </div>
              <Link to="/seller/products/new" className="btn btn-primary">
                <span>➕</span>
                <span>إضافة منتج</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-value">{stats.totalProducts}</div>
              <div className="stat-label">المنتجات</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--accent-lighter)', color: 'var(--accent-dark)' }}>
                📋
              </div>
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">إجمالي الطلبات</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>
                ⏳
              </div>
              <div className="stat-value">{stats.pendingOrders}</div>
              <div className="stat-label">طلبات معلقة</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#d1fae5', color: '#065f46' }}>
                💰
              </div>
              <div className="stat-value">{stats.totalRevenue} ر.س</div>
              <div className="stat-label">إجمالي المبيعات</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card-header">
              <h3>إجراءات سريعة</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <Link to="/seller/products/new" className="btn btn-primary">
                  ➕ إضافة منتج جديد
                </Link>
                <Link to="/seller/products" className="btn btn-secondary">
                  📦 إدارة المنتجات
                </Link>
                <Link to="/seller/orders" className="btn btn-secondary">
                  📋 عرض الطلبات
                </Link>
                <Link to="/profile" className="btn btn-ghost">
                  ⚙️ إعدادات المتجر
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>منتجاتي الحديثة</h3>
              <Link to="/seller/products" style={{ fontSize: '0.875rem' }}>
                عرض الكل ←
              </Link>
            </div>
            <div className="card-body">
              {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>📦</div>
                  <h4 style={{ marginBottom: 'var(--space-sm)' }}>لا توجد منتجات بعد</h4>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-lg)' }}>
                    ابدأ بإضافة منتجاتك لعرضها للمشترين
                  </p>
                  <Link to="/seller/products/new" className="btn btn-primary">
                    إضافة منتج جديد
                  </Link>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>المنتج</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>السعر</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>المخزون</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>التقييم</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                          <td style={{ padding: 'var(--space-md)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                              <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--gray-100)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                              }}>
                                {product.category === 'food' && '🍯'}
                                {product.category === 'fragrance' && '🌸'}
                                {product.category === 'dates' && '🌴'}
                                {!['food', 'fragrance', 'dates'].includes(product.category) && '📦'}
                              </div>
                              <div>
                                <p style={{ fontWeight: '500' }}>{product.name}</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                  {product.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>
                            {product.price} ر.س
                          </td>
                          <td style={{ padding: 'var(--space-md)' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.875rem',
                              background: product.stock > 10 ? '#d1fae5' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                              color: product.stock > 10 ? '#065f46' : product.stock > 0 ? '#92400e' : '#991b1b'
                            }}>
                              {product.stock} قطعة
                            </span>
                          </td>
                          <td style={{ padding: 'var(--space-md)' }}>
                            <span style={{ color: 'var(--accent)' }}>⭐ {product.rating}</span>
                            <span style={{ color: 'var(--gray-400)', marginRight: 'var(--space-xs)' }}>
                              ({product.reviewCount})
                            </span>
                          </td>
                          <td style={{ padding: 'var(--space-md)' }}>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                              <Link 
                                to={`/seller/products/${product.id}/edit`}
                                className="btn btn-ghost btn-sm"
                              >
                                ✏️
                              </Link>
                              <Link 
                                to={`/products/${product.id}`}
                                className="btn btn-ghost btn-sm"
                              >
                                👁️
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>الطلبات الأخيرة</h3>
              <Link to="/seller/orders" style={{ fontSize: '0.875rem' }}>
                عرض الكل ←
              </Link>
            </div>
            <div className="card-body">
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>📋</div>
                  <h4 style={{ marginBottom: 'var(--space-sm)' }}>لا توجد طلبات بعد</h4>
                  <p style={{ color: 'var(--gray-500)' }}>
                    ستظهر الطلبات هنا عندما يشتري العملاء منتجاتك
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--gray-100)' }}>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>رقم الطلب</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>العميل</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>المبلغ</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>الحالة</th>
                        <th style={{ padding: 'var(--space-md)', textAlign: 'right' }}>التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                          <td style={{ padding: 'var(--space-md)', fontFamily: 'monospace' }}>
                            #{order.id.slice(-8)}
                          </td>
                          <td style={{ padding: 'var(--space-md)' }}>
                            {order.customerName || 'عميل'}
                          </td>
                          <td style={{ padding: 'var(--space-md)', fontWeight: '600' }}>
                            {order.total} ر.س
                          </td>
                          <td style={{ padding: 'var(--space-md)' }}>
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.875rem',
                              background: order.status === 'completed' ? '#d1fae5' : 
                                         order.status === 'pending' ? '#fef3c7' : '#fee2e2',
                              color: order.status === 'completed' ? '#065f46' : 
                                    order.status === 'pending' ? '#92400e' : '#991b1b'
                            }}>
                              {order.status === 'completed' && '✓ مكتمل'}
                              {order.status === 'pending' && '⏳ معلق'}
                              {order.status === 'cancelled' && '✗ ملغي'}
                            </span>
                          </td>
                          <td style={{ padding: 'var(--space-md)', color: 'var(--gray-500)' }}>
                            {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="card" style={{ marginTop: 'var(--space-xl)', background: 'var(--accent-lighter)' }}>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-lg)' }}>
                <span style={{ fontSize: '2rem' }}>💡</span>
                <div>
                  <h4 style={{ marginBottom: 'var(--space-sm)' }}>نصيحة لزيادة المبيعات</h4>
                  <p style={{ color: 'var(--gray-600)' }}>
                    أضف صوراً عالية الجودة لمنتجاتك واكتب وصفاً تفصيلياً. 
                    المنتجات ذات الصور الواضحة تحقق مبيعات أعلى بنسبة 40%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;