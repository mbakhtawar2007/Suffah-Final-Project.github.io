import React, { createContext, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Holds authentication info.
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Load token from localStorage on initial load
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        setUser({ token }); // Set user info if token is available
      }
    } catch (error) {
      console.error('Failed to load token from localStorage:', error);
    }
  }, []);

  // Handle login with JWT token
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      setUser({ token });
    } catch (error) {
      console.error('Failed to log in:', error);
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Handle registration with JWT token
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/register', { email, password });
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      setUser({ token });
    } catch (error) {
      console.error('Failed to register:', error);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isAuthenticated = !!user?.token;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Higher-order component to protect routes
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
