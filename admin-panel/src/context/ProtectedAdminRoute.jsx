// admin-panel/src/context/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token

  if (!token) {
    // If no token, redirect to the admin login page
    return <Navigate to="/admin/login" replace />;
  }

  // If token exists, render the children components (the protected content)
  return children;
};

export default ProtectedAdminRoute;