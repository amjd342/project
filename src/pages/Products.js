import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getAllProducts } from '../utils/database';
import Navbar from '../components/Navbar';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [addedToCart, setAddedToCart] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const categories = [
    { id: 'all', name: 'الكل', icon: '📦' },
    { id: 'gpu', name: 'كروت الشاشة', icon: '🎮' },
    { id: 'cpu', name: 'المعالجات', icon: '⚡' },
    { id: 'ram', name: 'الذاكرة RAM', icon: '🧠' },
    { id: 'storage', name: 'التخزين SSD', icon: '💾' },
    { id: 'motherboard', name: 'اللوحات الأم', icon: '🔧' },
    { id: 'psu', name: 'الطاقة PSU', icon: '🔌' },
    { id: 'cooling', name: 'التبريد', icon: '❄️' },
    { id: 'case', name: 'الكيسات', icon: '🖥️' }
  ];

  const brands = ['all', 'NVIDIA', 'AMD', 'Intel', 'ASUS', 'MSI', 'Corsair', 'G.Skill', 'Samsung', 'NZXT', 'Lian Li', 'Kingston', 'Western Digital', 'EVGA'];

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    const allProducts = getAllProducts();
    setProducts(allProducts);
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
      );
    }

    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, sortBy, searchQuery, priceRange]);

  const handleAddToCart = (productId) => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    addToCart(productId, 1);
    setAddedToCart(productId);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : '📦';
  };

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
            🛒 المنتجات
          </h1>
          <p style={{ opacity: 0.8 }}>
            اكتشف أحدث قطع الكمبيوتر بأفضل الأسعار
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: 'var(--space-xl) var(--space-lg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-xl)' }}>
          
          {/* Sidebar Filters */}
          <aside>
            {/* Search */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="card-body">
                <h4 style={{ marginBottom: 'var(--space-md)' }}>🔍 البحث</h4>
                <input
                  type="text"
                  className="form-input"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="card-body">
                <h4 style={{ marginBottom: 'var(--space-md)' }}>📂 التصنيفات</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        padding: 'var(--space-sm) var(--space-md)',
                        background: selectedCategory === cat.id ? 'var(--primary-lighter)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'right',
                        cursor: 'pointer',
                        color: selectedCategory === cat.id ? 'var(--primary)' : 'var(--gray-700)',
                        fontWeight: selectedCategory === cat.id ? '600' : '400',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="card-body">
                <h4 style={{ marginBottom: 'var(--space-md)' }}>🏷️ الماركات</h4>
                <select
                  className="form-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="all">جميع الماركات</option>
                  {brands.slice(1).map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="card">
              <div className="card-body">
                <h4 style={{ marginBottom: 'var(--space-md)' }}>💰 السعر</h4>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="من"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    style={{ width: '100px' }}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="إلى"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    style={{ width: '100px' }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main>
            {/* Sort & Results Count */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--space-lg)',
              flexWrap: 'wrap',
              gap: 'var(--space-md)'
            }}>
              <p style={{ color: 'var(--gray-600)' }}>
                عرض <strong>{filteredProducts.length}</strong> منتج
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <label>ترتيب حسب:</label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="featured">المميزة</option>
                  <option value="price-low">السعر: الأقل</option>
                  <option value="price-high">السعر: الأعلى</option>
                  <option value="rating">التقييم</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: 'var(--space-3xl)',
                background: 'var(--gray-50)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>🔍</div>
                <h3 style={{ marginBottom: 'var(--space-sm)' }}>لا توجد منتجات</h3>
                <p style={{ color: 'var(--gray-500)' }}>جرب تغيير معايير البحث</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-lg)'
              }}>
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="card"
                    style={{
                      overflow: 'hidden',
                      transition: 'all var(--transition-normal)'
                    }}
                  >
                    {/* Product Image */}
                    <div style={{
                      height: '200px',
                      background: (!product.image || imageErrors[product.id]) 
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)' 
                        : '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                      position: 'relative'
                    }}>
                      {product.image && !imageErrors[product.id] ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          onError={() => handleImageError(product.id)}
                        />
                      ) : (
                        <span style={{ fontSize: '4rem', color: '#00ff88' }}>
                          {getCategoryIcon(product.category)}
                        </span>
                      )}
                      
                      {product.featured && (
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: '#ff6b6b',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          مميز 🔥
                        </span>
                      )}
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
                        <span style={{
                          fontSize: '0.75rem',
                          color: product.stock > 10 ? 'var(--success)' : product.stock > 0 ? 'var(--warning)' : 'var(--error)'
                        }}>
                          {product.stock > 10 ? '✓ متوفر' : product.stock > 0 ? `⚠️ ${product.stock} فقط` : '✗ نفذ'}
                        </span>
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
                          disabled={product.stock === 0}
                        >
                          {addedToCart === product.id ? '✓ تمت الإضافة' : '🛒 أضف'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;