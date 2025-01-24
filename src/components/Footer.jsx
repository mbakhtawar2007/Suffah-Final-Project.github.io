import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About ShopEase</h4>
          <p>
            At ShopEase, we are dedicated to providing a seamless online shopping experience. 
            Explore a wide variety of high-quality products at competitive prices, 
            delivered with exceptional customer service.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/" aria-label="Go to Home">Home</a></li>
            <li><a href="/products" aria-label="Browse Products">Products</a></li>
            <li><a href="/cart" aria-label="View Cart">Cart</a></li>
            <li><a href="/signin" aria-label="Sign In to your account">Sign In</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>If you have any questions or need support, feel free to reach out:</p>
          <p><FaEnvelope /> Email: <a href="mailto:support@shopease.com">support@shopease.com</a></p>
          <p><FaPhone /> Phone: +1 234 567 890</p>
          <p>Address: 123 Market Street, New York, NY</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-media">
            <a href="https://facebook.com" aria-label="Follow us on Facebook"><FaFacebook /></a>
            <a href="https://twitter.com" aria-label="Follow us on Twitter"><FaTwitter /></a>
            <a href="https://instagram.com" aria-label="Follow us on Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
