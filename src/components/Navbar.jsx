import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Logout function clears the token
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
            exact
            to="/"
            activeClassName="active-link"
            aria-current="page"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            activeClassName="active-link"
            aria-current="page"
          >
            Products
          </NavLink>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/cart"
                activeClassName="active-link"
                aria-current="page"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order-history"
                activeClassName="active-link"
                aria-current="page"
              >
                Orders
              </NavLink>
            </li>
          </>
        )}
        {!isAuthenticated ? (
          <li>
            <NavLink
              to="/signin"
              activeClassName="active-link"
              aria-current="page"
            >
              Sign In
            </NavLink>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="signout-btn"
              aria-label="Sign Out"
              disabled={!logout}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
      {isAuthenticated && (
        <p className="welcome" aria-live="polite">
          Welcome, {user?.name || 'Guest'}!
        </p>
      )}
    </nav>
  );
}

export default Navbar;
