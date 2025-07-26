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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobile(mobile);
      if (!mobile && menuOpen) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart' },
    { to: '/checkout', label: 'Checkout' },
    { to: '/order-history', label: 'Order History' },
  ];

  if (user) {
    navItems.push({ to: '/profile', label: 'Profile' });
  }

  return (
    <nav className="navbar" aria-label="Main navigation" ref={navbarRef}>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="navbar-logo">
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
          type="button"
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
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? 'active-link' : undefined)}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              tabIndex={menuOpen || !isMobile ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
