import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute, { GuestRoute } from './components/ProtectedRoute';

// Styles
import './styles/main.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Categories from './pages/Categories';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

// Checkout Page
const Checkout = () => (
  <div className="page">
    <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>💳</div>
      <h1>إتمام الشراء</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>قيد التطوير...</p>
      <a href="/cart" className="btn btn-primary">العودة للسلة</a>
    </div>
  </div>
);

// Orders Page
const Orders = () => (
  <div className="page">
    <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>📦</div>
      <h1>طلباتي</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>قيد التطوير...</p>
      <a href="/products" className="btn btn-primary">تصفح المنتجات</a>
    </div>
  </div>
);

// Wishlist Page
const Wishlist = () => (
  <div className="page">
    <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>❤️</div>
      <h1>المفضلة</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>قيد التطوير...</p>
      <a href="/products" className="btn btn-primary">تصفح المنتجات</a>
    </div>
  </div>
);

// Contact Page
const Contact = () => (
  <div className="page">
    <div className="container" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>📞</div>
      <h1>تواصل معنا</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>
        نحن هنا لمساعدتك! تواصل معنا عبر:
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', minWidth: '200px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>📧</div>
          <p style={{ fontWeight: '600' }}>البريد الإلكتروني</p>
          <p style={{ color: 'var(--primary)' }}>support@techstore.sa</p>
        </div>
        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', minWidth: '200px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>📱</div>
          <p style={{ fontWeight: '600' }}>الهاتف</p>
          <p style={{ color: 'var(--primary)' }}>920001234</p>
        </div>
        <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', minWidth: '200px' }}>
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>💬</div>
          <p style={{ fontWeight: '600' }}>واتساب</p>
          <p style={{ color: 'var(--primary)' }}>+966 50 123 4567</p>
        </div>
      </div>
      <a href="/" className="btn btn-primary">العودة للرئيسية</a>
    </div>
  </div>
);

// FAQ Page
const FAQ = () => (
  <div className="page">
    <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>❓ الأسئلة الشائعة</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-body">
            <h4>كيف يمكنني تتبع طلبي؟</h4>
            <p style={{ color: 'var(--gray-600)', margin: 0 }}>بعد إتمام الطلب، ستصلك رسالة على بريدك الإلكتروني تحتوي على رقم التتبع.</p>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-body">
            <h4>ما هي طرق الدفع المتاحة؟</h4>
            <p style={{ color: 'var(--gray-600)', margin: 0 }}>نقبل الدفع عبر مدى، فيزا، ماستركارد، وتقسيط عبر تابي وتمارا.</p>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-body">
            <h4>كم يستغرق التوصيل؟</h4>
            <p style={{ color: 'var(--gray-600)', margin: 0 }}>التوصيل خلال 24-48 ساعة للمدن الرئيسية، و3-5 أيام للمناطق الأخرى.</p>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="card-body">
            <h4>هل المنتجات أصلية؟</h4>
            <p style={{ color: 'var(--gray-600)', margin: 0 }}>نعم، جميع منتجاتنا أصلية 100% ومستوردة من الوكلاء الرسميين مع ضمان كامل.</p>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="card-body">
            <h4>ما هي سياسة الاسترجاع؟</h4>
            <p style={{ color: 'var(--gray-600)', margin: 0 }}>يمكنك استرجاع المنتج خلال 7 أيام من الاستلام بشرط أن يكون بحالته الأصلية.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <a href="/" className="btn btn-primary">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  </div>
);

// Shipping Page
const Shipping = () => (
  <div className="page">
    <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>🚚 سياسة الشحن</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>مناطق التوصيل</h3>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-md)' }}>
              نوصل لجميع مدن ومناطق المملكة العربية السعودية.
            </p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>مدة التوصيل:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• الرياض، جدة، الدمام: 24-48 ساعة</p>
            <p style={{ color: 'var(--gray-600)' }}>• المدن الرئيسية الأخرى: 2-3 أيام</p>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>• المناطق النائية: 3-5 أيام</p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>تكلفة الشحن:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• مجاني للطلبات فوق 500 ريال</p>
            <p style={{ color: 'var(--gray-600)' }}>• 25 ريال للطلبات أقل من 500 ريال</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <a href="/" className="btn btn-primary">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  </div>
);

// Warranty Page
const Warranty = () => (
  <div className="page">
    <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>🛡️ الضمان</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>سياسة الضمان</h3>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-md)' }}>
              جميع منتجاتنا مشمولة بضمان الوكيل الرسمي.
            </p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>مدة الضمان:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• كروت الشاشة: 3 سنوات</p>
            <p style={{ color: 'var(--gray-600)' }}>• المعالجات: 3 سنوات</p>
            <p style={{ color: 'var(--gray-600)' }}>• اللوحات الأم: 3 سنوات</p>
            <p style={{ color: 'var(--gray-600)' }}>• الذاكرة RAM: ضمان مدى الحياة</p>
            <p style={{ color: 'var(--gray-600)' }}>• أقراص SSD: 5 سنوات</p>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>• باور سبلاي: 5-10 سنوات</p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>لا يشمل الضمان:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• الأضرار الناتجة عن سوء الاستخدام</p>
            <p style={{ color: 'var(--gray-600)' }}>• الأضرار الناتجة عن الكوارث الطبيعية</p>
            <p style={{ color: 'var(--gray-600)' }}>• التعديلات غير المصرح بها</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <a href="/" className="btn btn-primary">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  </div>
);

// Returns Page
const Returns = () => (
  <div className="page">
    <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>↩️ سياسة الاسترجاع</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>شروط الاسترجاع</h3>
            <p style={{ color: 'var(--gray-600)' }}>• يمكن الاسترجاع خلال 7 أيام من تاريخ الاستلام</p>
            <p style={{ color: 'var(--gray-600)' }}>• المنتج يجب أن يكون بحالته الأصلية وغير مستخدم</p>
            <p style={{ color: 'var(--gray-600)' }}>• يجب إرفاق جميع الملحقات والعلبة الأصلية</p>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>• الفاتورة الأصلية مطلوبة</p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>كيفية الاسترجاع:</h4>
            <p style={{ color: 'var(--gray-600)' }}>1. تواصل معنا عبر support@techstore.sa</p>
            <p style={{ color: 'var(--gray-600)' }}>2. سنرسل لك رقم طلب الاسترجاع</p>
            <p style={{ color: 'var(--gray-600)' }}>3. أرسل المنتج عبر شركة الشحن المعتمدة</p>
            <p style={{ color: 'var(--gray-600)' }}>4. سيتم استرداد المبلغ خلال 5-7 أيام عمل</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <a href="/" className="btn btn-primary">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  </div>
);

// Privacy Page
const Privacy = () => (
  <div className="page">
    <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>🔒 سياسة الخصوصية</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-body">
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>
              نحن في TechStore نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            </p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>البيانات التي نجمعها:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• الاسم والبريد الإلكتروني ورقم الهاتف</p>
            <p style={{ color: 'var(--gray-600)' }}>• عنوان الشحن</p>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>• معلومات الطلبات والمشتريات</p>
            <h4 style={{ marginBottom: 'var(--space-sm)' }}>كيف نستخدم بياناتك:</h4>
            <p style={{ color: 'var(--gray-600)' }}>• معالجة وتوصيل طلباتك</p>
            <p style={{ color: 'var(--gray-600)' }}>• التواصل معك بخصوص طلباتك</p>
            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-lg)' }}>• إرسال العروض والتحديثات (بموافقتك)</p>
            <p style={{ color: 'var(--gray-600)' }}>
              لن نشارك بياناتك مع أي طرف ثالث إلا لأغراض الشحن والدفع.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <a href="/" className="btn btn-primary">العودة للرئيسية</a>
        </div>
      </div>
    </div>
  </div>
);

// 404 Page
const NotFound = () => (
  <div className="page" style={{ textAlign: 'center', paddingTop: 'var(--space-3xl)' }}>
    <div className="container">
      <h1 style={{ fontSize: '8rem', color: 'var(--gray-200)', marginBottom: 0 }}>404</h1>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>😕</div>
      <h2 style={{ marginBottom: 'var(--space-md)' }}>الصفحة غير موجودة</h2>
      <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-xl)' }}>
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)' }}>
        <a href="/" className="btn btn-primary">🏠 الرئيسية</a>
        <a href="/products" className="btn btn-secondary">🛒 المنتجات</a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Guest Routes */}
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

              {/* Protected Routes */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;