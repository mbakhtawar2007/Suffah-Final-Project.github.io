import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductListing.css';

const mockProducts = [
  { id: 1, name: 'Smartphone', price: 699, category: 'Electronics', image: 'https://via.placeholder.com/250' },
  { id: 2, name: 'Sneakers', price: 199, category: 'Fashion', image: 'https://via.placeholder.com/250' },
  { id: 3, name: 'Microwave', price: 120, category: 'Home Appliances', image: 'https://via.placeholder.com/250' },
  { id: 4, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://via.placeholder.com/250' },
  { id: 5, name: 'Jacket', price: 129, category: 'Fashion', image: 'https://via.placeholder.com/250' },
];

function ProductListing() {
  const [products] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Memoize filtered products based on search and category filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter ? product.category === categoryFilter : true)
      );
    });
  }, [products, search, categoryFilter]);

  // Memoize sorted products based on selected criteria
  const sortedProducts = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="product-listing">
      {/* Sub Navbar for Categories */}
      <div className="sub-navbar">
        <ul>
          <li><button onClick={() => setCategoryFilter('')} aria-label="All categories">All Categories</button></li>
          <li><button onClick={() => setCategoryFilter('Electronics')} aria-label="Electronics">Electronics</button></li>
          <li><button onClick={() => setCategoryFilter('Fashion')} aria-label="Fashion">Fashion</button></li>
          <li><button onClick={() => setCategoryFilter('Home Appliances')} aria-label="Home Appliances">Home Appliances</button></li>
        </ul>
      </div>

      {/* Filters and Search */}
      <div className="filters">
        <select 
          aria-label="Sort products" 
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
        {sortedProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          sortedProducts.map((product) => (
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
