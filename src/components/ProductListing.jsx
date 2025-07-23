
import React, { useState, useMemo } from 'react';
import '../styles/ProductListing.css';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: 'Smartphone', price: 699, category: 'Electronics', image: '/placeholder-250.svg', description: 'Latest smartphone with high-resolution display and long battery life.' },
  { id: 2, name: 'Sneakers', price: 199, category: 'Fashion', image: '/placeholder-250.svg', description: 'Comfortable and stylish sneakers for everyday wear.' },
  { id: 3, name: 'Microwave', price: 120, category: 'Home Appliances', image: '/placeholder-250.svg', description: 'Efficient microwave oven for quick and easy meals.' },
  { id: 4, name: 'Laptop', price: 999, category: 'Electronics', image: '/placeholder-250.svg', description: 'Powerful laptop for work, study, and entertainment.' },
  { id: 5, name: 'Jacket', price: 129, category: 'Fashion', image: '/placeholder-250.svg', description: 'Warm and trendy jacket for all seasons.' },
];

function ProductListing() {

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Filter and sort products efficiently
  const displayedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
    );
    if (sortBy === 'price') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }
    return filtered;
  }, [search, sortBy, categoryFilter]);

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
            <Link to={`/products/${product.id}`} key={product.id} style={{textDecoration:'none'}}>
              <div className="product-card" aria-label={`Product: ${product.name}`} role="region">
                <div style={{position:'relative',width:'100%'}}>
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <span className="badge" style={{position:'absolute',top:'10px',left:'10px'}}>{product.category}</span>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description || 'No description available for this product yet.'}</p>
                <button className="add-to-cart-btn" aria-label={`Add ${product.name} to Cart`}>
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
