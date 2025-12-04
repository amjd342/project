import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById, getProductsByCategory } from '../utils/database';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const categories = [
    { id: 'gpu', name: 'كروت الشاشة', icon: '🎮' },
    { id: 'cpu', name: 'المعالجات', icon: '⚡' },
    { id: 'ram', name: 'الذاكرة RAM', icon: '🧠' },
    { id: 'storage', name: 'التخزين SSD', icon: '💾' },
    { id: 'motherboard', name: 'اللوحات الأم', icon: '🔧' },
    { id: 'psu', name: 'الطاقة PSU', icon: '🔌' },
    { id: 'cooling', name: 'التبريد', icon: '❄️' },
    { id: 'case', name: 'الكيسات', icon: '🖥️' }
  ];

  useEffect(() => {
    const loadProduct = () => {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    };
    
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }
    addToCart(id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📦';
  };

  const getCategoryName = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.name : category;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div style={{ fontSize: '2rem' }}>جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>😕</div>
          <h1>المنتج غير موجود</h1>
          <p style={{ color: 'var(--gray-500)', marginBottom: '30px' }}>
            عذراً، لم نتمكن من العثور على هذا المنتج
          </p>
          <Link to="/products" className="btn btn-primary">العودة للمنتجات</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Breadcrumb */}
      <div style={{ 
        background: 'var(--gray-50)', 
        padding: '15px 20px',
        borderBottom: '1px solid var(--gray-100)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'var(--gray-500)' }}>الرئيسية</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <Link to="/products" style={{ color: 'var(--gray-500)' }}>المنتجات</Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <Link to={`/products?category=${product.category}`} style={{ color: 'var(--gray-500)' }}>
              {getCategoryName(product.category)}
            </Link>
            <span style={{ color: 'var(--gray-400)' }}>/</span>
            <span style={{ color: 'var(--gray-700)' }}>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          
          {/* Product Image */}
          <div style={{
            background: (!product.image || imageError) 
              ? 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' 
              : '#f8f9fa',
            borderRadius: '16px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '450px',
            position: 'relative'
          }}>
            {product.image && !imageError ? (
              <img 
                src={product.image} 
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <span style={{ fontSize: '10rem', color: '#00ff88' }}>
                {getCategoryIcon(product.category)}
              </span>
            )}
            
            {product.featured && (
              <span style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#ff6b6b',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: '600'
              }}>
                مميز 🔥
              </span>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Brand & Category */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <span style={{
                background: 'var(--primary-lighter)',
                color: 'var(--primary)',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                {getCategoryName(product.category)}
              </span>
              <span style={{
                background: 'var(--gray-100)',
                color: 'var(--gray-600)',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                {product.brand}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--gray-800)' }}>
              {product.name}
            </h1>
            <p style={{ color: 'var(--gray-500)', marginBottom: '20px' }}>
              {product.nameEn}
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: star <= Math.round(product.rating) ? '#f59e0b' : '#e5e7eb', fontSize: '1.25rem' }}>
                    ★
                  </span>
                ))}
              </div>
              <span style={{ fontWeight: '600' }}>{product.rating}</span>
              <span style={{ color: 'var(--gray-400)' }}>({product.reviewCount} تقييم)</span>
            </div>

            {/* Price */}
            <div style={{ 
              background: 'var(--gray-50)', 
              padding: '20px', 
              borderRadius: '12px',
              marginBottom: '25px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                  {product.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.25rem', color: 'var(--gray-500)' }}>ر.س</span>
              </div>
              <p style={{ color: 'var(--gray-500)', marginTop: '5px', fontSize: '0.875rem' }}>
                شامل الضريبة
              </p>
            </div>

            {/* Stock Status */}
            <div style={{ marginBottom: '25px' }}>
              {product.stock > 10 ? (
                <span style={{ color: 'var(--success)', fontWeight: '600' }}>
                  ✓ متوفر في المخزون ({product.stock} قطعة)
                </span>
              ) : product.stock > 0 ? (
                <span style={{ color: 'var(--warning)', fontWeight: '600' }}>
                  ⚠️ متبقي {product.stock} قطع فقط
                </span>
              ) : (
                <span style={{ color: 'var(--error)', fontWeight: '600' }}>
                  ✗ نفذت الكمية
                </span>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ marginBottom: '10px' }}>الوصف</h3>
              <p style={{ color: 'var(--gray-600)', lineHeight: '1.8' }}>
                {product.description}
              </p>
            </div>

            {/* Specs */}
            {product.specs && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px' }}>المواصفات</h3>
                <div style={{ 
                  background: 'var(--gray-50)', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <div 
                      key={key}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderBottom: index < Object.entries(product.specs).length - 1 ? '1px solid var(--gray-200)' : 'none'
                      }}
                    >
                      <span style={{ color: 'var(--gray-500)', textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span style={{ fontWeight: '600', color: 'var(--gray-700)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
              {/* Quantity */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                background: 'var(--gray-100)',
                borderRadius: '8px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '45px',
                    height: '45px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  −
                </button>
                <span style={{ 
                  minWidth: '50px', 
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  style={{
                    width: '45px',
                    height: '45px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    opacity: quantity >= product.stock ? 0.5 : 1
                  }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary btn-lg"
                style={{
                  flex: 1,
                  padding: '15px 30px',
                  fontSize: '1.1rem',
                  background: addedToCart 
                    ? 'var(--success)' 
                    : 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  color: '#1a1a2e'
                }}
              >
                {addedToCart ? '✓ تمت الإضافة للسلة' : '🛒 أضف للسلة'}
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link 
                to="/cart" 
                className="btn btn-secondary"
                style={{ flex: 1, textAlign: 'center' }}
              >
                عرض السلة
              </Link>
            </div>

            {/* Features */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '15px',
              marginTop: '30px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🚚</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>شحن سريع 24-48 ساعة</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>ضمان الوكيل الرسمي</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>↩️</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>استرجاع خلال 7 أيام</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>💳</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>تقسيط بدون فوائد</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ marginBottom: '30px' }}>منتجات مشابهة</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {relatedProducts.map(relProduct => (
                <Link 
                  key={relProduct.id} 
                  to={`/products/${relProduct.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{
                      height: '150px',
                      background: relProduct.image ? '#f8f9fa' : 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '15px'
                    }}>
                      {relProduct.image ? (
                        <img 
                          src={relProduct.image} 
                          alt={relProduct.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '3rem', color: '#00ff88' }}>
                          {getCategoryIcon(relProduct.category)}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--gray-800)' }}>
                        {relProduct.name}
                      </h4>
                      <p style={{ fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
                        {relProduct.price.toLocaleString()} ر.س
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;