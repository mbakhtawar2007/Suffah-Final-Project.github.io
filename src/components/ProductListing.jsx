import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductListing.css';

const mockProducts = [
  { id: 1, name: 'Smartphone', price: '$699', category: 'Electronics' },
  { id: 2, name: 'Sneakers', price: '$199', category: 'Fashion' },
  { id: 3, name: 'Microwave', price: '$120', category: 'Home Appliances' },
];

function ProductListing() {
  const [products] = useState(mockProducts);

  return (
    <div className="product-listing">
      <div className="filters">
        <select>
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <input type="text" placeholder="Search products" />
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="product-card">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <span className="badge">{product.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
