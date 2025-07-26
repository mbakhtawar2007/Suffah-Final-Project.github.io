import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = `${product.name} has been added to your cart.`;
    }
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

      {/* Screen reader live region */}
      <div
        id="live-region"
        aria-live="polite"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
}

export default ProductCard;
