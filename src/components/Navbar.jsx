import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav>
      <div className="logo">
        <Link to="/">ShopEase</Link>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {isAuthenticated && <li><Link to="/cart">Cart</Link></li>}
        {isAuthenticated && <li><Link to="/order-history">Orders</Link></li>}
        {!isAuthenticated ? (
          <li><Link to="/signin">Sign In</Link></li>
        ) : (
          <li><button onClick={logout}>Sign Out</button></li>
        )}
      </ul>
      {isAuthenticated && <p className="welcome">Welcome, {user.name}!</p>}
    </nav>
  );
}

export default Navbar;
