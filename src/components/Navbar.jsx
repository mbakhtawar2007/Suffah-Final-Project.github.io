import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Track window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      
      // Close menu when switching to desktop view
      if (!mobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && 
          navbarRef.current && 
          !navbarRef.current.contains(e.target) && 
          hamburgerRef.current && 
          !hamburgerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close menu when pressing Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" aria-label="Main navigation" ref={navbarRef}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="logo navbar-logo">
        <NavLink to="/" aria-label="ShopEase Home">ShopEase</NavLink>
      </div>
      {isMobile && (
        <button
          ref={hamburgerRef}
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="navbar-links"
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          type="button"
          style={{ display: 'flex' }}
        >
          <svg width="36" height="36" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <rect className="bar top" x="6" y="9" width="20" height="3" rx="1.5" />
            <rect className="bar middle" x="6" y="15" width="20" height="3" rx="1.5" />
            <rect className="bar bottom" x="6" y="21" width="20" height="3" rx="1.5" />
          </svg>
        </button>
      )}
      <ul
        id="navbar-links"
        className={`nav-links navbar-links${menuOpen ? ' active' : ''}`}
        onKeyDown={handleKeyDown}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            aria-current="page"
            tabIndex={menuOpen || !isMobile ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            aria-current="page"
            tabIndex={menuOpen || !isMobile ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            aria-current="page"
            tabIndex={menuOpen || !isMobile ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/checkout"
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            aria-current="page"
            tabIndex={menuOpen || !isMobile ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Checkout
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/order-history"
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
            aria-current="page"
            tabIndex={menuOpen || !isMobile ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Order History
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active-link' : undefined)}
              aria-current="page"
              tabIndex={menuOpen || !isMobile ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;