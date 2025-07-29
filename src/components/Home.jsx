import React from 'react';
import '../styles/Home.css';
import CategoryCard from './CategoryCard';

// --- ProductCard Component ---
const ProductCard = ({ name, price, imageUrl, description }) => (
  <div className="product-card">
    {imageUrl && <img src={imageUrl} alt={name} className="product-image" />}
    <h3 className="product-name">{name}</h3>
    <p className="product-price">${price.toFixed(2)}</p>
    {description && <p className="product-description">{description}</p>}
    <button className="add-to-cart-button">Add to Cart</button>
  </div>
);

function Home() {
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await new Promise(resolve =>
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve([
                  { id: 1, name: 'Electronics', description: 'Explore the latest gadgets and devices.', icon: '⚡' },
                  { id: 2, name: 'Fashion', description: 'Stay trendy with our exclusive collections.', icon: '👗' },
                  { id: 3, name: 'Home Appliances', description: 'Upgrade your home with cutting-edge appliances.', icon: '🏠' },
                  { id: 4, name: 'Books', description: 'Dive into new worlds with our vast collection.', icon: '📚' },
                  { id: 5, name: 'Sports & Outdoors', description: 'Gear up for your next adventure.', icon: '🚴' },
                ]),
            });
          }, 800)
        );

        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const productsResponse = await new Promise(resolve =>
          setTimeout(() => {
            resolve({
              ok: true,
              json: () =>
                Promise.resolve([
                  { id: 101, name: 'Wireless Headphones', price: 149.99, imageUrl: '/placeholder-250.svg', description: 'Immersive sound experience.' },
                  { id: 102, name: 'Smartwatch', price: 199.99, imageUrl: '/placeholder-250.svg', description: 'Track your fitness and notifications.' },
                  { id: 103, name: 'Designer Dress', price: 79.5, imageUrl: '/placeholder-250.svg', description: 'Elegant and comfortable.' },
                  { id: 104, name: 'Coffee Maker', price: 89.0, imageUrl: '/placeholder-250.svg', description: 'Brew your perfect cup every morning.' },
                  { id: 105, name: 'Running Shoes', price: 110.0, imageUrl: '/placeholder-250.svg', description: 'Lightweight and supportive.' },
                ]),
            });
          }, 1200)
        );

        if (!productsResponse.ok) throw new Error('Failed to fetch featured products');
        const productsData = await productsResponse.json();
        setFeaturedProducts(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <main>
      {/* Hero Section */}
      <section className="hero enhanced-hero" aria-labelledby="hero-heading">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 id="hero-heading" className="animated-heading">Welcome to ShopEase</h1>
          <p className="animated-subheading">
            Your one-stop destination for exclusive deals, trending products, and seamless shopping experiences.
          </p>
          <div className="search-bar-container">
            <input
              type="search"
              placeholder="Search for the latest gadgets, fashion, and more..."
              className="search-input"
              aria-label="Search products"
            />
            <button className="search-button">Search</button>
          </div>
          <div className="cta-buttons">
            <a href="/products" className="cta-button" aria-label="Shop Now">Shop Now</a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="section-heading">Explore Our Top Categories</h2>
        <p className="section-subheading">Find products by category and discover new favorites.</p>
        <div className="category-cards">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description}
              icon={category.icon}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-heading">Featured Products</h2>
        <p className="section-subheading">Handpicked items just for you. Limited time offers!</p>
        <div className="product-cards">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
              />
            ))
          ) : (
            <p>No featured products available at the moment.</p>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-signup enhanced-newsletter" aria-labelledby="newsletter-heading">
        <div className="newsletter-content">
          <span className="newsletter-icon" aria-hidden="true">📧</span>
          <h2 id="newsletter-heading" className="section-heading animated-heading">Stay Updated!</h2>
          <p className="newsletter-description animated-subheading">
            Subscribe to our newsletter and never miss out on <strong>exclusive deals</strong>, <strong>new arrivals</strong>, and <strong>shopping tips</strong>.
            <br />Get the best of ShopEase delivered to your inbox!
          </p>
          <form className="newsletter-form" autoComplete="off">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              aria-label="Enter your email for newsletter"
              required
            />
            <button className="newsletter-button" type="submit">Subscribe</button>
          </form>
          <small className="newsletter-privacy">We respect your privacy. Unsubscribe anytime.</small>
        </div>
      </section>
    </main>
  );
}

export default Home;
