import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
    getUserCart,
    addToCart as dbAddToCart,
    updateCartQuantity as dbUpdateQuantity,
    removeFromCart as dbRemoveFromCart,
    clearCart as dbClearCart,
    getProductById
} from '../utils/database'; // 🚨 تم تحديث الاستيرادات لتشمل جميع دوال قاعدة البيانات

// Create Cart Context
const CartContext = createContext(null);

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const { user, isAuthenticated, loading: authLoading } = useAuth(); // 🚨 إضافة isAuthenticated و authLoading
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false); // 🚨 تم إضافة حالة تحميل خاصة بالسلة

    // Load user's cart from database
    const loadCart = () => {
        if (!user) {
            setCartItems([]);
            return;
        }

        setLoading(true);
        try {
            const cart = getUserCart(user.id);
            // Enrich cart items with product details
            const enrichedCart = cart.map(item => {
                const product = getProductById(item.productId);
                return {
                    ...item,
                    product
                };
            }).filter(item => item.product); // Remove items with deleted products
            
            setCartItems(enrichedCart);
        } catch (error) {
            console.error("Error loading cart:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Load cart when user changes (منطق التحميل الأولي)
    useEffect(() => {
        // الانتظار حتى ينتهي تحميل المصادقة وقاعدة البيانات
        if (authLoading) return; 

        if (isAuthenticated() && user) {
            loadCart();
        } else {
            setCartItems([]);
        }
    }, [user, authLoading]); // 🚨 تم ربط التحميل بـ user و authLoading

    // Add item to cart
    const addToCart = (productId, quantity = 1) => {
        if (!user) {
            return { success: false, error: 'يجب تسجيل الدخول أولاً - Please login first' };
        }

        setLoading(true);
        try {
            dbAddToCart(user.id, productId, quantity);
            loadCart(); // إعادة تحميل السلة بعد التعديل
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        if (!user) return { success: false };

        setLoading(true);
        try {
            dbUpdateQuantity(user.id, productId, quantity);
            loadCart(); // إعادة تحميل السلة بعد التعديل
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        if (!user) return { success: false };

        setLoading(true);
        try {
            dbRemoveFromCart(user.id, productId);
            loadCart(); // إعادة تحميل السلة بعد التعديل
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Clear entire cart
    const clearCart = () => {
        if (!user) return { success: false };

        setLoading(true);
        try {
            dbClearCart(user.id);
            setCartItems([]); // مسح فوري لواجهة المستخدم
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Calculate cart totals
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product?.price || 0) * item.quantity;
        }, 0);
    };

    // Get total items count
    const getItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    // Check if product is in cart
    const isInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
    };

    // Get item quantity in cart
    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    };

    const value = {
        cartItems,
        loading, // 🚨 تم إضافة حالة التحميل
        addToCart,
        updateQuantity, // 🚨 دالة جديدة
        removeFromCart, // 🚨 دالة جديدة
        clearCart, // 🚨 دالة جديدة
        getCartTotal, // 🚨 دالة جديدة
        getItemCount, // 🚨 دالة جديدة
        isInCart, // 🚨 دالة جديدة
        getItemQuantity, // 🚨 دالة جديدة
        loadCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;