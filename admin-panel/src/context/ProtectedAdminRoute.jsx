import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token

  if (!token) {
    // If no token, redirect to the admin login page
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    // Check if the token has expired
    const currentTime = Date.now() / 1000; // in seconds
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // Clear expired token
      return <Navigate to="/admin/login" replace />;
    }

    // Check if the user has the 'admin' role
    if (decodedToken.role !== 'admin') {
      localStorage.removeItem('token'); // Clear non-admin token from admin panel context
      alert('Access denied. You do not have administrator privileges.');
      return <Navigate to="/admin/login" replace />; // Redirect non-admins
    }

  } catch (error) {
    // If token is invalid (e.g., malformed, signature mismatch), treat as unauthenticated
    console.error("Failed to decode token or token invalid:", error);
    localStorage.removeItem('token'); // Clear invalid token
    return <Navigate to="/admin/login" replace />;
  }

  // If token exists and is valid and role is 'admin', render the children components
  return children;
};

export default ProtectedAdminRoute;