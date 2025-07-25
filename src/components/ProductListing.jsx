import React, { useState, useEffect, useMemo } from 'react';
import '../styles/ProductListing.css';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
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

  // Filter and sort products efficiently
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

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-listing">
      <div className="sub-navbar">
        <ul>
          <li><button onClick={() => setCategoryFilter('')} aria-label="All categories">All Categories</button></li>
          <li><button onClick={() => setCategoryFilter('Electronics')} aria-label="Electronics">Electronics</button></li>
          <li><button onClick={() => setCategoryFilter('Fashion')} aria-label="Fashion">Fashion</button></li>
          <li><button onClick={() => setCategoryFilter('Home Appliances')} aria-label="Home Appliances">Home Appliances</button></li>
        </ul>
      </div>

      <div className="filters">
        <select
          aria-label="Sort products"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
        </select>
        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {/* Product Cards Grid */}
      <div className="products-grid">
        {displayedProducts.length === 0 ? (
          <div className="empty-state">
            <img src="/placeholder-250.svg" alt="No products found" style={{width:'120px',marginBottom:'16px',opacity:0.7}} />
            <p>No products found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          displayedProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id} style={{textDecoration:'none'}}>
              <div className="product-card" aria-label={`Product: ${product.name}`} role="region">
                <div style={{position:'relative',width:'100%'}}>
                  <img
                    src={product.image || '/placeholder-250.svg'}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-250.svg';
                    }}
                  />
                  <span className="badge" style={{position:'absolute',top:'10px',left:'10px'}}>{product.category || 'Category'}</span>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description || 'No description available for this product yet.'}</p>
                <button
                  className="add-to-cart-btn"
                  aria-label={`Add ${product.name} to Cart`}
                  onClick={() => addToCart(product)}
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
