import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../services/api'; // Changed to directly use loginUser and registerUser
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check both localStorage and sessionStorage for a stored user
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array means this runs once on mount

  const login = async (email, password, rememberMe = false) => {
    try {
      // Call the loginUser function from api.js
      const res = await loginUser({ email, password });
      const { token, user: userData } = res.data;

      // Store token and user data based on 'rememberMe'
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userData));
      }

      setUser(userData); // Update user state
      toast.success('Logged in successfully!'); // Show success message
      navigate('/products'); // Redirect to products page
    } catch (err) {
      // Handle login errors and display a toast message
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      // Call the registerUser function from api.js
      const res = await registerUser({ name, email, password });
      const { token, user: userData } = res.data;

      // Store token and user data (typically localStorage for registration for persistence)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData); // Update user state
      toast.success('Account created!'); // Show success message
      navigate('/products'); // Redirect to products page
    } catch (err) {
      // Handle registration errors and display a toast message
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    // Clear all stored data, user state, and redirect to login
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate('/login');
    toast.info('Logged out'); // Inform user
  };

  // Provide user, login, register, and logout functions to children components
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => useContext(AuthContext);