import React from 'react';
import CategoryCard from './CategoryCard';
import '../styles/Home.css';

function Home() {
  const [loading, setLoading] = React.useState(true); // Loading state

  // Simulate loading data
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <React.Fragment>
          {/* Hero Section */}
          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading">Welcome to ShopEase</h1>
            <p>Discover the best deals and products tailored to your needs.</p>
            <div className="cta-buttons">
              <a href="/products" className="cta-button" aria-label="Shop Now">
                Shop Now
              </a>
              <a href="/signup" className="cta-button secondary" aria-label="Join Us">
                Join Us
              </a>
            </div>
          </section>

          {/* Categories Section */}
          <section className="categories" aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="section-heading">Explore Categories</h2>
            <div className="category-cards">
              <CategoryCard
                title="Electronics"
                description="Explore the latest gadgets and devices."
              />
              <CategoryCard
                title="Fashion"
                description="Stay trendy with our exclusive collections."
              />
              <CategoryCard
                title="Home Appliances"
                description="Upgrade your home with cutting-edge appliances."
              />
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="featured-products" aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="section-heading">Featured Products</h2>
            <p>Coming soon! Stay tuned for our top picks.</p>
          </section>
        </React.Fragment>
      )}
    </main>
  );
}

export default Home;
