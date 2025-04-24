import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Load user's cart when they log in
  useEffect(() => {
    if (user?.id) {
      loadUserCart();
    }
  }, [user]);

  const loadUserCart = async () => {
    try {
      setLoading(true);
      const userCart = await api.getUserCart(user.id);
      // FakeStore API returns cart with product IDs, we need to fetch product details
      const cartWithDetails = await Promise.all(
        userCart.products.map(async (item) => {
          const product = await api.getProduct(item.productId);
          return {
            ...product,
            quantity: item.quantity
          };
        })
      );
      setCartItems(cartWithDetails);
    } catch (err) {
      setError(err.message);
      // If API fails, fall back to local storage
      const savedCart = localStorage.getItem('cart_items');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  };

  // Save cart to both API and local storage
  const saveCart = async (items) => {
    setCartItems(items);
    localStorage.setItem('cart_items', JSON.stringify(items));

    if (user?.id) {
      try {
        await api.addToCart({
          userId: user.id,
          date: new Date().toISOString(),
          products: items.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        });
      } catch (err) {
        console.error('Failed to sync cart with server:', err);
      }
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      await saveCart(updatedItems);
    } else {
      await saveCart([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = async (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    await saveCart(updatedItems);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    await saveCart(updatedItems);
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;