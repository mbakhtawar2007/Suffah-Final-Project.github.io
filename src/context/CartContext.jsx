import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';  // Importing the AuthContext to use authentication state

// Create Context
const CartContext = createContext();

// CartProvider component to provide the cart state to the rest of the app
export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Accessing authentication status
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if available and if the user is authenticated
    if (!isAuthenticated) {
      return [];
    }
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to load cart items from localStorage:', error);
      return [];
    }
  });

  // Add item to cart (only if authenticated)
  const addToCart = useCallback((product) => {
    if (!isAuthenticated) {
      console.log("User is not authenticated.");
      return; // Prevent adding to cart if not authenticated
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, [isAuthenticated]);

  // Remove item from cart (only if authenticated)
  const removeFromCart = useCallback((id) => {
    if (!isAuthenticated) {
      console.log("User is not authenticated.");
      return; // Prevent removing from cart if not authenticated
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, [isAuthenticated]);

  // Update item quantity in cart (only if authenticated)
  const updateQuantity = useCallback((id, quantity) => {
    if (!isAuthenticated) {
      console.log("User is not authenticated.");
      return; // Prevent updating quantity if not authenticated
    }
    if (quantity < 1) return; // Prevent negative or zero quantities
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [isAuthenticated]);

  // Clear all items in the cart (only if authenticated)
  const clearCart = useCallback(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated.");
      return; // Prevent clearing cart if not authenticated
    }
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clean up localStorage
  }, [isAuthenticated]);

  // Calculate total (memoized for better performance)
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
  }, [cartItems]);

  // Persist cart state to localStorage (only if authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      return; // Don't persist if not authenticated
    }
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items to localStorage:', error);
    }
  }, [cartItems, isAuthenticated]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext in components
export const useCart = () => {
  return useContext(CartContext);
};
