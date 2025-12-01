import React from 'react';
import { useCart } from '../context/CartContext';
import { announce } from '../utils/announce';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    announce(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="product-card" role="region" aria-labelledby={`product-${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="product-image"
      />
      <h3 id={`product-${product.id}`}>{product.name}</h3>
      <p>${Number(product.price).toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>

      {/* Announcements are handled by the global announcer (src/utils/announce.js) */}
    </div>
  );
}

export default React.memo(ProductCard);
