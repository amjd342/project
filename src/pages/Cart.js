import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    loading 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const shippingCost = getCartTotal() >= 500 ? 0 : 25;
  const subtotal = getCartTotal();
  const total = subtotal - discount + shippingCost;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    
    const coupons = {
      'TECH10': 10,
      'GAMER20': 20,
      'WELCOME15': 15
    };

    const upperCode = couponCode.toUpperCase();
    
    if (coupons[upperCode]) {
      const discountPercent = coupons[upperCode];
      const discountAmount = (subtotal * discountPercent) / 100;
      setDiscount(discountAmount);
      setCouponApplied(true);
    } else {
      setCouponError('كود الخصم غير صالح');
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
    setCouponError('');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      gpu: '🎮',
      cpu: '⚡',
      ram: '🧠',
      storage: '💾',
      motherboard: '🔧',
      psu: '🔌',
      cooling: '❄️',
      case: '🖥️'
    };
    return icons[category] || '📦';
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="page">
          <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
            <div style={{ 
              fontSize: '6rem', 
              marginBottom: 'var(--space-xl)',
              opacity: 0.5
            }}>
              🛒
            </div>
            <h1 style={{ marginBottom: 'var(--space-md)' }}>سلة التسوق فارغة</h1>
            <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>
              لم تقم بإضافة أي منتجات بعد. ابدأ التسوق الآن!
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              🛍️ تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: 'var(--space-2xl) var(--space-lg)',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-sm)', color: 'var(--white)' }}>
            🛒 سلة التسوق
          </h1>
          <p style={{ opacity: 0.8 }}>
            لديك {cartItems.length} {cartItems.length === 1 ? 'منتج' : 'منتجات'} في السلة
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 380px', 
          gap: 'var(--space-xl)',
          alignItems: 'start'
        }}>
          
          {/* Cart Items */}
          <div>
            {/* Clear Cart Button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--space-lg)'
            }}>
              <h3>المنتجات</h3>
              <button 
                className="btn btn-ghost"
                onClick={() => {
                  if (window.confirm('هل تريد إفراغ السلة؟')) {
                    clearCart();
                  }
                }}
                style={{ color: 'var(--error)' }}
              >
                🗑️ إفراغ السلة
              </button>
            </div>

            {/* Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {cartItems.map(item => (
                <div 
                  key={item.productId} 
                  className="card"
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--space-lg)',
                    padding: 'var(--space-lg)'
                  }}>
                    {/* Product Image */}
                    <div style={{
                      width: '120px',
                      height: '120px',
                      background: '#f8f9fa',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                      padding: '10px'
                    }}>
                      {item.product?.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '3rem' }}>
                          {getCategoryIcon(item.product?.category)}
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        <div>
                          <Link 
                            to={`/products/${item.productId}`}
                            style={{ 
                              fontWeight: '600', 
                              fontSize: '1.1rem',
                              color: 'var(--gray-800)'
                            }}
                          >
                            {item.product?.name}
                          </Link>
                          <p style={{ 
                            color: 'var(--gray-500)', 
                            fontSize: '0.875rem',
                            marginTop: 'var(--space-xs)'
                          }}>
                            {item.product?.brand}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--gray-400)',
                            fontSize: '1.25rem',
                            padding: 'var(--space-xs)'
                          }}
                          title="حذف المنتج"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'var(--space-md)'
                      }}>
                        {/* Quantity Controls */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 'var(--space-sm)',
                          background: 'var(--gray-50)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-xs)'
                        }}>
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            style={{
                              width: '36px',
                              height: '36px',
                              border: 'none',
                              background: 'var(--white)',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              fontSize: '1.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'var(--shadow-sm)'
                            }}
                          >
                            −
                          </button>
                          <span style={{ 
                            minWidth: '40px', 
                            textAlign: 'center',
                            fontWeight: '600'
                          }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= (item.product?.stock || 10)}
                            style={{
                              width: '36px',
                              height: '36px',
                              border: 'none',
                              background: 'var(--white)',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              fontSize: '1.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: 'var(--shadow-sm)',
                              opacity: item.quantity >= (item.product?.stock || 10) ? 0.5 : 1
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ 
                            fontWeight: '700', 
                            fontSize: '1.25rem',
                            color: 'var(--primary)'
                          }}>
                            {(item.product?.price * item.quantity).toLocaleString()} ر.س
                          </p>
                          {item.quantity > 1 && (
                            <p style={{ 
                              fontSize: '0.75rem', 
                              color: 'var(--gray-500)' 
                            }}>
                              {item.product?.price.toLocaleString()} ر.س × {item.quantity}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.product?.stock <= 5 && (
                        <p style={{ 
                          marginTop: 'var(--space-sm)',
                          fontSize: '0.75rem',
                          color: 'var(--warning)'
                        }}>
                          ⚠️ متبقي {item.product?.stock} قطع فقط
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
              <Link to="/products" className="btn btn-secondary">
                ← متابعة التسوق
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <div className="card-header">
                <h3>ملخص الطلب</h3>
              </div>
              <div className="card-body">
                {/* Coupon Code */}
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <label 
                    className="form-label" 
                    style={{ marginBottom: 'var(--space-sm)', display: 'block' }}
                  >
                    كود الخصم
                  </label>
                  {!couponApplied ? (
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="أدخل كود الخصم"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{ flex: 1 }}
                        dir="ltr"
                      />
                      <button 
                        className="btn btn-secondary"
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                      >
                        تطبيق
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-sm) var(--space-md)',
                      background: '#d1fae5',
                      borderRadius: 'var(--radius-md)',
                      color: '#065f46'
                    }}>
                      <span>✓ {couponCode.toUpperCase()}</span>
                      <button
                        onClick={handleRemoveCoupon}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#065f46'
                        }}
                      >
                        إزالة
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p style={{ color: 'var(--error)', fontSize: '0.875rem', marginTop: 'var(--space-xs)' }}>
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ 
                  borderTop: '1px solid var(--gray-100)',
                  paddingTop: 'var(--space-lg)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-sm)',
                    color: 'var(--gray-600)'
                  }}>
                    <span>المجموع الفرعي</span>
                    <span>{subtotal.toLocaleString()} ر.س</span>
                  </div>

                  {discount > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-sm)',
                      color: 'var(--success)'
                    }}>
                      <span>الخصم</span>
                      <span>- {discount.toLocaleString()} ر.س</span>
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-md)',
                    color: 'var(--gray-600)'
                  }}>
                    <span>الشحن</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span style={{ color: 'var(--success)' }}>مجاني ✓</span>
                      ) : (
                        `${shippingCost} ر.س`
                      )}
                    </span>
                  </div>

                  {subtotal < 500 && (
                    <div style={{
                      background: '#fef3c7',
                      padding: 'var(--space-sm) var(--space-md)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-md)',
                      fontSize: '0.875rem',
                      color: '#92400e'
                    }}>
                      🚚 أضف {(500 - subtotal).toLocaleString()} ر.س للحصول على شحن مجاني
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    paddingTop: 'var(--space-md)',
                    borderTop: '2px solid var(--gray-200)',
                    fontWeight: '700',
                    fontSize: '1.25rem'
                  }}>
                    <span>الإجمالي</span>
                    <span style={{ color: 'var(--primary)' }}>
                      {total.toLocaleString()} ر.س
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary btn-full btn-lg"
                  style={{
                    marginTop: 'var(--space-xl)',
                    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                    color: '#1a1a2e'
                  }}
                  disabled={loading}
                >
                  إتمام الشراء 💳
                </button>

                {/* Payment Methods */}
                <div style={{ 
                  marginTop: 'var(--space-lg)',
                  textAlign: 'center'
                }}>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--gray-500)',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    طرق الدفع المتاحة
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 'var(--space-md)',
                    fontSize: '1.5rem',
                    opacity: 0.7
                  }}>
                    <span title="مدى">💳</span>
                    <span title="فيزا">💳</span>
                    <span title="ماستركارد">💳</span>
                    <span title="تابي">🏷️</span>
                  </div>
                </div>

                {/* Security Note */}
                <div style={{
                  marginTop: 'var(--space-lg)',
                  padding: 'var(--space-md)',
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--gray-500)'
                }}>
                  🔒 جميع المعاملات مشفرة وآمنة
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;