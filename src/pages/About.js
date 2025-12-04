import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const About = () => {
  const stats = [
    { number: '10,000+', label: 'عميل سعيد', icon: '😊' },
    { number: '500+', label: 'منتج متوفر', icon: '📦' },
    { number: '50+', label: 'ماركة عالمية', icon: '🏷️' },
    { number: '24/7', label: 'دعم فني', icon: '🎧' }
  ];

  const team = [
    { name: 'محمد السعودي', role: 'المؤسس والمدير التنفيذي', emoji: '👨‍💼' },
    { name: 'أحمد التقني', role: 'مدير المنتجات', emoji: '👨‍💻' },
    { name: 'خالد القيمر', role: 'خبير الدعم الفني', emoji: '🎮' },
    { name: 'سارة المبدعة', role: 'مديرة التسويق', emoji: '👩‍💼' }
  ];

  const timeline = [
    { year: '2020', title: 'البداية', description: 'انطلقنا بحلم بسيط: توفير أفضل قطع الكمبيوتر للقيمرز في السعودية' },
    { year: '2021', title: 'التوسع', description: 'افتتحنا أول فرع في الرياض ووصلنا لـ 1000 عميل' },
    { year: '2022', title: 'النمو', description: 'أضفنا التوصيل لجميع مدن المملكة وتجاوزنا 5000 عميل' },
    { year: '2023', title: 'التميز', description: 'حصلنا على تقييم 4.9 نجوم ونفخر بخدمة أكثر من 10,000 عميل' },
    { year: '2024', title: 'المستقبل', description: 'نستمر في التطور ونسعى لنكون الوجهة الأولى للتقنية في الخليج' }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: 'var(--space-3xl) var(--space-lg)',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>🖥️</div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: 'var(--space-md)', 
            color: 'var(--white)' 
          }}>
            عن TechStore
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9, 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            نحن متجرك الأول لقطع الكمبيوتر والقيمنق في المملكة العربية السعودية. 
            نوفر لك أحدث المنتجات من أفضل الماركات العالمية بأسعار منافسة وضمان حقيقي.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: 'var(--space-2xl) var(--space-lg)',
        background: 'var(--white)',
        marginTop: '-40px'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-lg)',
            background: 'var(--white)',
            padding: 'var(--space-xl)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '800', 
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-xs)'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--gray-500)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>📖 قصتنا</h2>
            <p style={{ color: 'var(--gray-500)' }}>رحلتنا من البداية إلى الآن</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {timeline.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  gap: 'var(--space-xl)',
                  marginBottom: 'var(--space-xl)',
                  position: 'relative'
                }}
              >
                {/* Year */}
                <div style={{
                  minWidth: '80px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                    color: '#1a1a2e',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '700',
                    fontSize: '0.9rem'
                  }}>
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="card" style={{ flex: 1 }}>
                  <div className="card-body">
                    <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--gray-600)', margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {/* Vision */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body" style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🎯</div>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>رؤيتنا</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: '1.8' }}>
                  أن نكون الوجهة الأولى والأكثر ثقة لعشاق التقنية والقيمرز 
                  في المملكة العربية السعودية والخليج العربي
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body" style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>🚀</div>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>مهمتنا</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: '1.8' }}>
                  توفير أحدث وأفضل قطع الكمبيوتر بأسعار عادلة مع تجربة شراء 
                  سلسة ودعم فني احترافي يضمن رضا العميل
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body" style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>💎</div>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>قيمنا</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: '1.8' }}>
                  الجودة، الأمانة، خدمة العملاء الممتازة، والابتكار المستمر 
                  هي المبادئ التي نعمل بها كل يوم
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>✨ لماذا TechStore؟</h2>
            <p style={{ color: 'var(--gray-500)' }}>ما يميزنا عن غيرنا</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#fee2e2',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                ✅
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>منتجات أصلية 100%</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                جميع منتجاتنا أصلية ومستوردة من الوكلاء الرسميين
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#dbeafe',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                🚚
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>شحن سريع</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                توصيل خلال 24-48 ساعة لجميع مدن المملكة
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#d1fae5',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                🛡️
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>ضمان شامل</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                ضمان يصل إلى 5 سنوات على جميع المنتجات
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#fef3c7',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                💳
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>دفع مرن</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                ادفع بالبطاقة أو مدى أو تقسيط عبر تابي وتمارا
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#e9d5ff',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                🎧
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>دعم فني 24/7</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                فريق دعم متخصص جاهز لمساعدتك في أي وقت
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#fce7f3',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-lg)',
                fontSize: '2rem'
              }}>
                💰
              </div>
              <h4 style={{ marginBottom: 'var(--space-sm)' }}>أسعار منافسة</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                نضمن لك أفضل الأسعار في السوق السعودي
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: 'var(--space-3xl) var(--space-lg)', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-sm)' }}>👥 فريقنا</h2>
            <p style={{ color: 'var(--gray-500)' }}>نحن هنا لخدمتك</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-xl)'
          }}>
            {team.map((member, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div className="card-body">
                  <div style={{ 
                    fontSize: '4rem', 
                    marginBottom: 'var(--space-md)' 
                  }}>
                    {member.emoji}
                  </div>
                  <h4 style={{ marginBottom: 'var(--space-xs)' }}>{member.name}</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: 'var(--space-3xl) var(--space-lg)',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
            📞 تواصل معنا
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 'var(--space-xl)', maxWidth: '500px', margin: '0 auto var(--space-xl)' }}>
            لديك سؤال أو استفسار؟ فريقنا جاهز لمساعدتك على مدار الساعة
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <a 
              href="mailto:support@techstore.sa" 
              className="btn btn-lg"
              style={{
                background: '#00ff88',
                color: '#1a1a2e',
                fontWeight: '700'
              }}
            >
              📧 support@techstore.sa
            </a>
            <a 
              href="tel:920001234" 
              className="btn btn-lg"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              📞 920001234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;