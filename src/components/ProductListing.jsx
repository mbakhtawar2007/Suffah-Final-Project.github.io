import React, { useState, useEffect, useMemo } from 'react';
import '../styles/ProductListing.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const displayedProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
    );

    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    return filtered;
  }, [products, search, sortBy, categoryFilter]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-listing">
      <div className="sub-navbar">
        <ul>
          <li><button onClick={() => setCategoryFilter('')}>All Categories</button></li>
          <li><button onClick={() => setCategoryFilter('Electronics')}>Electronics</button></li>
          <li><button onClick={() => setCategoryFilter('Fashion')}>Fashion</button></li>
          <li><button onClick={() => setCategoryFilter('Home Appliances')}>Home Appliances</button></li>
        </ul>
      </div>

      <div className="filters">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
        </select>
        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {displayedProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          displayedProducts.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              style={{ textDecoration: 'none' }}
            >
              <div className="product-card" role="region" aria-label={`Product: ${product.name}`}>
                <div className="image-wrapper">
                  <img
                    src={product.image && (product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`)}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  {product.category && (
                    <span className="badge">{product.category}</span>
                  )}
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                {product.description && (
                  <p className="product-description">{product.description}</p>
                )}
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductListing;
