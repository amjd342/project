// Database utility functions for local JSON storage
// In a real app, this would connect to Supabase or another backend

const DB_KEY = 'usaruna_database';
let currentDB = null; // 👈 إضافة متغير حالة على مستوى الوحدة لحل مشكلة التوقيت

// Initialize database from JSON file or localStorage
export const initDatabase = async () => {
    // 1. التحقق أولاً من الذاكرة
    if (currentDB) return currentDB;

    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
        currentDB = JSON.parse(stored); // 👈 تحديث الحالة
        return currentDB;
    }
    
    // Load initial data from JSON file
    try {
        const response = await fetch('/data/database.json');
        if (!response.ok) {
             throw new Error(`Failed to fetch database: ${response.statusText}`);
        }
        const data = await response.json();
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        currentDB = data; // 👈 تحديث الحالة
        return data;
    } catch (error) {
        // Default empty database structure
        const defaultDB = {
            users: [],
            products: [],
            orders: [],
            cart: [],
            reviews: []
        };
        localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
        currentDB = defaultDB; // 👈 تحديث الحالة
        return defaultDB;
    }
};

// Get current database state
export const getDatabase = () => {
    // 1. التحقق من الحالة في الذاكرة أولاً
    if (currentDB) return currentDB; 

    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
        currentDB = JSON.parse(stored); // 👈 تحديث الحالة إذا تم الجلب من localStorage
        return currentDB;
    }
    return null;
};

// Save database to localStorage
export const saveDatabase = (data) => {
    currentDB = data; // 👈 تحديث الحالة عند الحفظ
    localStorage.setItem(DB_KEY, JSON.stringify(data));
};

// Generate unique ID
export const generateId = (prefix = 'id') => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ==================== USER OPERATIONS ====================

// Find user by email
export const findUserByEmail = (email) => {
    const db = getDatabase();
    if (!db) return null;
    return db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by ID
export const findUserById = (id) => {
    const db = getDatabase();
    if (!db) return null;
    return db.users.find(user => user.id === id);
};

// Create new user
export const createUser = (userData) => {
    const db = getDatabase();
    if (!db) return null;
    
    // Check if email already exists
    if (findUserByEmail(userData.email)) {
        throw new Error('البريد الإلكتروني مسجل مسبقاً - Email already registered');
    }
    
    const newUser = {
        id: generateId('user'),
        ...userData,
        verified: false,
        createdAt: new Date().toISOString(),
        profileImage: null
    };
    
    db.users.push(newUser);
    saveDatabase(db);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

// Update user
export const updateUser = (userId, updates) => {
    const db = getDatabase();
    if (!db) return null;
    
    const userIndex = db.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;
    
    db.users[userIndex] = { ...db.users[userIndex], ...updates };
    saveDatabase(db);
    
    const { password, ...userWithoutPassword } = db.users[userIndex];
    return userWithoutPassword;
};

// Validate user credentials
export const validateCredentials = (email, password) => {
    const user = findUserByEmail(email);
    if (!user) return null;
    
    // Simple password comparison (in production, use bcrypt)
    if (user.password !== password) return null;
    
    const { password: pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

// ==================== PRODUCT OPERATIONS ====================

// Get all products
export const getAllProducts = () => {
    const db = getDatabase();
    if (!db) return [];
    return db.products;
};

// Get products by seller
export const getProductsBySeller = (sellerId) => {
    const db = getDatabase();
    if (!db) return [];
    return db.products.filter(product => product.sellerId === sellerId);
};

// Get product by ID
export const getProductById = (productId) => {
    const db = getDatabase();
    if (!db) return null;
    return db.products.find(product => product.id === productId);
};

// Create product
export const createProduct = (productData) => {
    const db = getDatabase();
    if (!db) return null;
    
    const newProduct = {
        id: generateId('prod'),
        ...productData,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
        featured: false
    };
    
    db.products.push(newProduct);
    saveDatabase(db);
    return newProduct;
};

// Update product
export const updateProduct = (productId, updates) => {
    const db = getDatabase();
    if (!db) return null;
    
    const productIndex = db.products.findIndex(p => p.id === productId);
    if (productIndex === -1) return null;
    
    db.products[productIndex] = { ...db.products[productIndex], ...updates };
    saveDatabase(db);
    return db.products[productIndex];
};

// Delete product
export const deleteProduct = (productId) => {
    const db = getDatabase();
    if (!db) return false;
    
    const productIndex = db.products.findIndex(p => p.id === productId);
    if (productIndex === -1) return false;
    
    db.products.splice(productIndex, 1);
    saveDatabase(db);
    return true;
};

// Search products
export const searchProducts = (query) => {
    const db = getDatabase();
    if (!db) return [];
    
    const lowerQuery = query.toLowerCase();
    return db.products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.nameEn.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.descriptionEn.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
};

// Get products by category
export const getProductsByCategory = (category) => {
    const db = getDatabase();
    if (!db) return [];
    return db.products.filter(product => product.category === category);
};

// Get featured products
export const getFeaturedProducts = () => {
    const db = getDatabase();
    if (!db) return [];
    return db.products.filter(product => product.featured);
};

// ==================== CART OPERATIONS ====================

// Get user cart
export const getUserCart = (userId) => {
    const db = getDatabase();
    if (!db) return [];
    return db.cart.filter(item => item.userId === userId);
};

// Add to cart
export const addToCart = (userId, productId, quantity = 1) => {
    const db = getDatabase();
    if (!db) return null;
    
    const existingIndex = db.cart.findIndex(
        item => item.userId === userId && item.productId === productId
    );
    
    if (existingIndex !== -1) {
        db.cart[existingIndex].quantity += quantity;
    } else {
        db.cart.push({
            id: generateId('cart'),
            userId,
            productId,
            quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    saveDatabase(db);
    return getUserCart(userId);
};

// Update cart item quantity
export const updateCartQuantity = (userId, productId, quantity) => {
    const db = getDatabase();
    if (!db) return null;
    
    const itemIndex = db.cart.findIndex(
        item => item.userId === userId && item.productId === productId
    );
    
    if (itemIndex === -1) return null;
    
    if (quantity <= 0) {
        db.cart.splice(itemIndex, 1);
    } else {
        db.cart[itemIndex].quantity = quantity;
    }
    
    saveDatabase(db);
    return getUserCart(userId);
};

// Remove from cart
export const removeFromCart = (userId, productId) => {
    const db = getDatabase();
    if (!db) return null;
    
    db.cart = db.cart.filter(
        item => !(item.userId === userId && item.productId === productId)
    );
    
    saveDatabase(db);
    return getUserCart(userId);
};

// Clear user cart
export const clearCart = (userId) => {
    const db = getDatabase();
    if (!db) return null;
    
    db.cart = db.cart.filter(item => item.userId !== userId);
    saveDatabase(db);
    return [];
};

// ==================== ORDER OPERATIONS ====================

// Create order
export const createOrder = (orderData) => {
    const db = getDatabase();
    if (!db) return null;
    
    const newOrder = {
        id: generateId('order'),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    db.orders.push(newOrder);
    saveDatabase(db);
    return newOrder;
};

// Get user orders
export const getUserOrders = (userId) => {
    const db = getDatabase();
    if (!db) return [];
    return db.orders.filter(order => order.userId === userId);
};

// Get seller orders
export const getSellerOrders = (sellerId) => {
    const db = getDatabase();
    if (!db) return [];
    return db.orders.filter(order => order.sellerId === sellerId);
};

// Update order status
export const updateOrderStatus = (orderId, status) => {
    const db = getDatabase();
    if (!db) return null;
    
    const orderIndex = db.orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return null;
    
    db.orders[orderIndex].status = status;
    db.orders[orderIndex].updatedAt = new Date().toISOString();
    saveDatabase(db);
    return db.orders[orderIndex];
};

// ==================== REVIEW OPERATIONS ====================

// Add review
export const addReview = (reviewData) => {
    const db = getDatabase();
    if (!db) return null;
    
    const newReview = {
        id: generateId('review'),
        ...reviewData,
        createdAt: new Date().toISOString()
    };
    
    db.reviews.push(newReview);
    
    // Update product rating
    const productReviews = db.reviews.filter(r => r.productId === reviewData.productId);
    const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    
    const productIndex = db.products.findIndex(p => p.id === reviewData.productId);
    if (productIndex !== -1) {
        db.products[productIndex].rating = Math.round(avgRating * 10) / 10;
        db.products[productIndex].reviewCount = productReviews.length;
    }
    
    saveDatabase(db);
    return newReview;
};

// Get product reviews
export const getProductReviews = (productId) => {
    const db = getDatabase();
    if (!db) return [];
    return db.reviews.filter(review => review.productId === productId);
};

export default {
    initDatabase,
    getDatabase,
    saveDatabase,
    generateId,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    validateCredentials,
    getAllProducts,
    getProductsBySeller,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getUserCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    getUserOrders,
    getSellerOrders,
    updateOrderStatus,
    addReview,
    getProductReviews
};