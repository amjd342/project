import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Categories = () => {
  const categories = [
    { 
      id: 'gpu', 
      name: 'كروت الشاشة', 
      nameEn: 'Graphics Cards',
      icon: '🎮', 
      color: '#fee2e2',
      description: 'أحدث كروت الشاشة من NVIDIA و AMD للألعاب والتصميم',
      brands: ['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte']
    },
    { 
      id: 'cpu', 
      name: 'المعالجات', 
      nameEn: 'Processors',
      icon: '⚡', 
      color: '#dbeafe',
      description: 'معالجات Intel و AMD لأفضل أداء في الألعاب والعمل',
      brands: ['Intel', 'AMD']
    },
    { 
      id: 'ram', 
      name: 'الذاكرة RAM', 
      nameEn: 'Memory',
      icon: '🧠', 
      color: '#d1fae5',
      description: 'رامات DDR4 و DDR5 بسرعات عالية وإضاءة RGB',
      brands: ['Corsair', 'G.Skill', 'Kingston', 'Crucial']
    },
    { 
      id: 'storage', 
      name: 'التخزين SSD', 
      nameEn: 'Storage',
      icon: '💾', 
      color: '#fef3c7',
      description: 'أقراص SSD NVMe فائقة السرعة من أفضل الماركات',
      brands: ['Samsung', 'Western Digital', 'Crucial', 'Seagate']
    },
    { 
      id: 'motherboard', 
      name: 'اللوحات الأم', 
      nameEn: 'Motherboards',
      icon: '🔧', 
      color: '#e9d5ff',
      description: 'لوحات أم لمعالجات Intel و AMD بأحدث الشرائح',
      brands: ['ASUS', 'MSI', 'Gigabyte', 'ASRock']
    },
    { 
      id: 'psu', 
      name: 'الطاقة PSU', 
      nameEn: 'Power Supply',
      icon: '🔌', 
      color: '#fce7f3',
      description: 'باور سبلاي بكفاءة عالية 80+ Gold و Platinum',
      brands: ['Corsair', 'EVGA', 'Seasonic', 'be quiet!']
    },
    { 
      id: 'cooling', 
      name: 'التبريد', 
      nameEn: 'Cooling',
      icon: '❄️', 
      color: '#cffafe',
      description: 'مراوح تبريد هوائي ومائي لأفضل درجات حرارة',
      brands: ['NZXT', 'Corsair', 'Noctua', 'be quiet!']
    },
    { 
      id: 'case', 
      name: 'الكيسات', 
      nameEn: 'PC Cases',
      icon: '🖥️', 
      color: '#f3f4f6',
      description: 'كيسات أنيقة مع تهوية ممتازة ودعم RGB',
      brands: ['Lian Li', 'NZXT', 'Corsair', 'Fractal Design']
    }
  ];

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
            📂 التصنيفات
          </h1>
          <p style={{ opacity: 0.8 }}>
            تصفح منتجاتنا حسب الفئة
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div 
                  className="card"
                  style={{
                    height: '100%',
                    transition: 'all var(--transition-normal)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Category Header */}
                  <div style={{
                    background: category.color,
                    padding: 'var(--space-xl)',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '4rem' }}>{category.icon}</span>
                  </div>

                  {/* Category Content */}
                  <div className="card-body">
                    <h3 style={{ marginBottom: 'var(--space-sm)', color: 'var(--gray-800)' }}>
                      {category.name}
                    </h3>
                    
                    <p style={{ 
                      color: 'var(--gray-500)', 
                      fontSize: '0.9rem',
                      marginBottom: 'var(--space-md)'
                    }}>
                      {category.description}
                    </p>

                    {/* Brands */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 'var(--space-xs)' 
                    }}>
                      {category.brands.map(brand => (
                        <span 
                          key={brand}
                          style={{
                            background: 'var(--gray-100)',
                            color: 'var(--gray-600)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem'
                          }}
                        >
                          {brand}
                        </span>
                      ))}
                    </div>

                    {/* View Button */}
                    <div style={{ 
                      marginTop: 'var(--space-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ 
                        color: 'var(--primary)', 
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        تصفح المنتجات ←
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: 'var(--space-3xl) var(--space-lg)',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
            🎯 لا تجد ما تبحث عنه؟
          </h2>
          <p style={{ opacity: 0.8, marginBottom: 'var(--space-xl)' }}>
            تواصل معنا وسنساعدك في إيجاد القطعة المناسبة لك
          </p>
          <Link 
            to="/contact" 
            className="btn btn-lg"
            style={{
              background: '#00ff88',
              color: '#1a1a2e',
              fontWeight: '700'
            }}
          >
            تواصل معنا 💬
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;