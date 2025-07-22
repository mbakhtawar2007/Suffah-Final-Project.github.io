
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: 'Smartphone', price: 699, category: 'Electronics', image: '/placeholder-250.svg' },
  { id: 2, name: 'Sneakers', price: 199, category: 'Fashion', image: '/placeholder-250.svg' },
  { id: 3, name: 'Microwave', price: 120, category: 'Home Appliances', image: '/placeholder-250.svg' },
  { id: 4, name: 'Laptop', price: 999, category: 'Electronics', image: '/placeholder-250.svg' },
  { id: 5, name: 'Jacket', price: 129, category: 'Fashion', image: '/placeholder-250.svg' },
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
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {/* Product Cards Grid */}
      <div className="products-grid">
        {displayedProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          displayedProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="product-card" aria-label={`Product: ${product.name}`}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <span className="badge">{product.category}</span>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductListing;
