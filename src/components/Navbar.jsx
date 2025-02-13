import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user } = useAuth();

  {/* Removed handleLogout function */}

  return (
    <nav className="navbar">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="logo">
        <NavLink to="/" aria-label="ShopEase Home">
          ShopEase
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            exact="true"
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
            aria-current="page"
          >
            Products
          </NavLink>
        </li>
<li>
  <NavLink
    to="/cart"
    className={({ isActive }) => (isActive ? "active-link" : undefined)}
    aria-current="page"
  >
    Cart
  </NavLink>
</li>
<li>
  <NavLink
    to="/checkout"
    className={({ isActive }) => (isActive ? "active-link" : undefined)}
    aria-current="page"
  >
    Checkout
  </NavLink>
</li>
<li>
  <NavLink
    to="/order-history"
    className={({ isActive }) => (isActive ? "active-link" : undefined)}
    aria-current="page"
  >
    Order History
  </NavLink>
</li>
      </ul>
      {/* Removed welcome message */}
    </nav>
  );
}

export default Navbar;
