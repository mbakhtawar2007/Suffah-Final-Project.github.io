import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Find the best deals and products tailored to your needs.</p>
        <div className="cta-buttons">
          <a href="/products">Shop Now</a>
          <a href="/signup">Join Us</a>
        </div>
      </div>

      <div className="categories">
        <div className="category-card">
          <h3>Electronics</h3>
          <p>Explore the latest gadgets and devices.</p>
        </div>
        <div className="category-card">
          <h3>Fashion</h3>
          <p>Stay trendy with our exclusive collections.</p>
        </div>
        <div className="category-card">
          <h3>Home Appliances</h3>
          <p>Upgrade your home with cutting-edge appliances.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
