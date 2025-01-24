import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // For accessibility: Announcing that the product has been added to the cart
    const announcement = `${product.name} has been added to your cart.`;
    const liveRegion = document.getElementById('live-region');
    liveRegion.textContent = announcement;
  };

  return (
    <div className="product-card" aria-label={`Product: ${product.name}`} role="region">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy" // Lazy loading for images
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button 
        onClick={handleAddToCart} 
        aria-label={`Add ${product.name} to Cart`}
        aria-live="assertive" // Announcing actions to screen readers
      >
        Add to Cart
      </button>

      {/* Live region for screen readers */}
      <div id="live-region" aria-live="polite" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}></div>
    </div>
  );
}

export default ProductCard;
