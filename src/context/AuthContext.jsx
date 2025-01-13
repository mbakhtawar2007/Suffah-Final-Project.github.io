import React, { createContext, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Holds authentication info.

  // Load token from localStorage on initial load
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Optionally, decode token to extract user info (JWT decoding can be done here)
        setUser({ token }); // Set user info if token is available
      }
    } catch (error) {
      console.error('Failed to load token from localStorage:', error);
    }
  }, []);

  // Handle login with JWT token
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password }); // Update with actual backend URL
      const { token } = response.data; // Assume backend sends the token

      localStorage.setItem('authToken', token); // Store token securely
      setUser({ token }); // Store the token in state (you can also decode it to extract user data if needed)

    } catch (error) {
      console.error('Failed to log in:', error);
      throw new Error('Invalid credentials');
    }
  };

  // Handle registration with JWT token
  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/register', { email, password }); // Update with actual backend URL
      const { token } = response.data; // Assume backend sends the token

      localStorage.setItem('authToken', token); // Store token securely
      setUser({ token }); // Store the token in state (you can also decode it to extract user data if needed)

    } catch (error) {
      console.error('Failed to register:', error);
      throw new Error('Registration failed');
    }
  };

  // Handle logout
  const logout = () => {
    try {
      setUser(null); // Clear user info
      localStorage.removeItem('authToken'); // Clear the token from storage
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isAuthenticated = !!user?.token; // Check if token exists

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
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
