import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getAllProducts } from '../utils/database';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(null);

  useEffect(() => {
    const products = getAllProducts();
    const featured = products.filter(p => p.featured).slice(0, 8);
    setFeaturedProducts(featured);
  }, []);

  const handleAddToCart = (productId) => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    addToCart(productId, 1);
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const categories = [
    { id: 'gpu', name: 'كروت الشاشة', icon: '🎮', color: '#fee2e2' },
    { id: 'cpu', name: 'المعالجات', icon: '⚡', color: '#dbeafe' },
    { id: 'ram', name: 'الذاكرة RAM', icon: '🧠', color: '#d1fae5' },
    { id: 'storage', name: 'التخزين SSD', icon: '💾', color: '#fef3c7' },
    { id: 'motherboard', name: 'اللوحات الأم', icon: '🔧', color: '#e9d5ff' },
    { id: 'psu', name: 'الطاقة PSU', icon: '🔌', color: '#fce7f3' },
    { id: 'cooling', name: 'التبريد', icon: '❄️', color: '#cffafe' },
    { id: 'case', name: 'الكيسات', icon: '🖥️', color: '#f3f4f6' }
  ];

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📦';
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: 'var(--space-3xl) var(--space-lg)',
        color: 'var(--white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(0, 255, 136, 0.2)',
              color: '#00ff88',
              padding: 'var(--space-xs) var(--space-md)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: 'var(--space-lg)',
              border: '1px solid rgba(0, 255, 136, 0.3)'
            }}>
              🎮 متجرك الأول لقطع الكمبيوتر
            </span>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '800',
              marginBottom: 'var(--space-lg)',
              color: 'var(--white)',
              textShadow: '0 0 40px rgba(0, 255, 136, 0.3)'
            }}>
              🖥️ TechStore
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: 'var(--space-xl)',
              lineHeight: '1.8'
            }}>
              أحدث قطع الكمبيوتر وأكسسوارات الألعاب بأفضل الأسعار في السعودية
            </p>

            <div style={{
              display: 'flex',
              gap: 'var(--space-md)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-2xl)'
            }}>
              <Link
                to="/products"
                className="btn btn-lg"
                style={{
                  background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                  color: '#1a1a2e',
                  fontWeight: '700',
                  padding: 'var(--space-md) var(--space-2xl)'
                }}
              >
                تسوق الآن 🛒
              </Link>
              <Link
                to="/products?category=gpu"
                className="btn btn-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'var(--white)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                🎮 كروت الشاشة
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-2xl)',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#00ff88' }}>500+</div>
                <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>منتج متوفر</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#00ff88' }}>10K+</div>
                <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>عميل سعيد</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#00ff88' }}>24/7</div>
                <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>دعم فني</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section style={{
        padding: 'var(--space-xl) var(--space-lg)',
        background: 'var(--white)',
        borderBottom: '1px solid var(--gray-100)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-2xl)',
            flexWrap: 'wrap',
            opacity: 0.6
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>NVIDIA</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>AMD</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Intel</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>ASUS</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>MSI</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Corsair</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>📂 تصفح حسب الفئة</h2>
            <p style={{ color: 'var(--gray-500)' }}>اختر القسم الذي تريده</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 'var(--space-lg)'
          }}>
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                style={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: 'var(--space-xl)',
                  background: category.color,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>
                  {category.icon}
                </div>
                <div style={{ fontWeight: '600', color: 'var(--gray-800)' }}>
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-2xl)',
            flexWrap: 'wrap',
            gap: 'var(--space-md)'
          }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-xs)' }}>🔥 المنتجات المميزة</h2>
              <p style={{ color: 'var(--gray-500)' }}>أفضل المنتجات المختارة لك</p>
            </div>
            <Link to="/products" className="btn btn-secondary">
              عرض الكل ←
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-lg)'
          }}>
            {featuredProducts.map(product => (
              <div 
                key={product.id} 
                className="card"
                style={{ overflow: 'hidden' }}
              >
                {/* Product Image */}
                <div style={{
                  height: '200px',
                  background: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  position: 'relative'
                }}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{
                    display: product.image ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: '4rem',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
                    color: '#00ff88'
                  }}>
                    {getCategoryIcon(product.category)}
                  </div>
                  
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ff6b6b',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    مميز 🔥
                  </span>
                </div>

                {/* Product Content */}
                <div style={{ padding: 'var(--space-lg)' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 'var(--space-sm)' 
                  }}>
                    <span style={{
                      background: 'var(--primary-lighter)',
                      color: 'var(--primary)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: '600' }}>
                      {product.brand}
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1rem', 
                    marginBottom: 'var(--space-sm)',
                    color: 'var(--gray-800)'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-500)',
                    marginBottom: 'var(--space-sm)',
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-xs)',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    <span style={{ color: '#f59e0b' }}>⭐</span>
                    <span style={{ fontWeight: '600' }}>{product.rating}</span>
                    <span style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 'var(--space-md)'
                  }}>
                    <p style={{ 
                      fontWeight: '700', 
                      fontSize: '1.25rem',
                      color: 'var(--primary)',
                      margin: 0
                    }}>
                      {product.price.toLocaleString()} <span style={{ fontSize: '0.875rem' }}>ر.س</span>
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <Link 
                      to={`/products/${product.id}`} 
                      className="btn btn-secondary"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      التفاصيل
                    </Link>
                    <button 
                      className="btn btn-primary"
                      style={{ 
                        flex: 1,
                        background: addedToCart === product.id ? 'var(--success)' : ''
                      }}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      {addedToCart === product.id ? '✓ تمت الإضافة' : '🛒 أضف'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>✨ لماذا TechStore؟</h2>
            <p style={{ color: 'var(--gray-500)' }}>نقدم لك أفضل تجربة تسوق</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>✅</div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>منتجات أصلية</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                جميع منتجاتنا أصلية 100% مع ضمان الوكيل
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🚚</div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>شحن سريع</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                توصيل خلال 24-48 ساعة لجميع مدن المملكة
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>💳</div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>دفع آمن</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                ادفع بالبطاقة أو مدى أو تقسيط عبر تابي
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🛡️</div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>ضمان شامل</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                ضمان يصل إلى 5 سنوات على المنتجات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: 'var(--space-3xl) var(--space-lg)',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🎁</div>
            <h2 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
              احصل على خصم 10%
            </h2>
            <p style={{ opacity: 0.8, marginBottom: 'var(--space-xl)' }}>
              اشترك في نشرتنا البريدية واحصل على خصم 10% على طلبك الأول
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <input
                type="email"
                className="form-input"
                placeholder="بريدك الإلكتروني"
                style={{ flex: 1 }}
                dir="ltr"
              />
              <button 
                className="btn"
                style={{
                  background: '#00ff88',
                  color: '#1a1a2e',
                  fontWeight: '600'
                }}
              >
                اشترك
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0f0f1a',
        color: 'var(--white)',
        padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-2xl)'
          }}>
            {/* Brand */}
            <div>
              <h3 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
                🖥️ TechStore
              </h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.7' }}>
                متجرك الأول لقطع الكمبيوتر والقيمنق في السعودية
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>التصنيفات</h4>
              <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/products?category=gpu" style={{ color: 'inherit' }}>كروت الشاشة</Link>
                </li>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/products?category=cpu" style={{ color: 'inherit' }}>المعالجات</Link>
                </li>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/products?category=ram" style={{ color: 'inherit' }}>الذاكرة RAM</Link>
                </li>
                <li>
                  <Link to="/products?category=storage" style={{ color: 'inherit' }}>التخزين SSD</Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>الدعم</h4>
              <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/faq" style={{ color: 'inherit' }}>الأسئلة الشائعة</Link>
                </li>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/shipping" style={{ color: 'inherit' }}>سياسة الشحن</Link>
                </li>
                <li style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to="/returns" style={{ color: 'inherit' }}>الاسترجاع</Link>
                </li>
                <li>
                  <Link to="/warranty" style={{ color: 'inherit' }}>الضمان</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>تواصل معنا</h4>
              <ul style={{ listStyle: 'none', opacity: 0.7, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: 'var(--space-sm)' }}>📧 support@techstore.sa</li>
                <li style={{ marginBottom: 'var(--space-sm)' }}>📞 920001234</li>
                <li>💬 واتساب: +966 50 123 4567</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 'var(--space-xl)',
            textAlign: 'center',
            opacity: 0.5,
            fontSize: '0.875rem'
          }}>
            © 2024 TechStore - صنع بـ ❤️ للقيمرز في السعودية
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;