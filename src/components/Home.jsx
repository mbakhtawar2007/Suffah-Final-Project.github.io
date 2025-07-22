
import React from 'react';
import CategoryCard from './CategoryCard';

function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <h1 id="hero-heading">Welcome to ShopEase</h1>
        <p>Discover the best deals and products tailored to your needs.</p>
        <div className="cta-buttons">
          <a href="/products" className="cta-button" aria-label="Shop Now">
            Shop Now
          </a>
        </div>
      </section>

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

      <section className="featured-products" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-heading">Featured Products</h2>
        <p>Coming soon! Stay tuned for our top picks.</p>
      </section>
    </main>
  );
}

export default Home;
