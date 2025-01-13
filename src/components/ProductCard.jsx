import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card" aria-label={`Product: ${product.name}`}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} aria-label={`Add ${product.name} to Cart`}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
