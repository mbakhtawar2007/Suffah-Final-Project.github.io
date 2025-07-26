import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('jwtToken') || '');

  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
      } catch (e) {
        // Invalid token, clear auth
        setUser(null);
        setToken('');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
      }
    }
  }, [token, user]);

  const login = async (email, password) => {
    // 🔐 Try login
    let res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    }

    // ✏️ If login fails, register then login
    const registerRes = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, email, password }),
    });

    if (!registerRes.ok) {
      throw new Error('Registration failed');
    }

    // 🔁 Re-attempt login
    res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed after registration');

    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('jwtToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return await res.json();
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
