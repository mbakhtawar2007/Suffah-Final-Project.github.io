import React, { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // `user` will hold authentication info.

  const login = (userData) => {
    setUser(userData); // Simulating login by setting user info.
    localStorage.setItem('authUser', JSON.stringify(userData)); // Optional: Store user info persistently.
  };

  const logout = () => {
    setUser(null); // Clear user info.
    localStorage.removeItem('authUser'); // Clear from storage.
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Higher-order component to protect routes.
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
