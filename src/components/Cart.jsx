import '../styles/Cart.css';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <section className="cart" aria-label="Shopping Cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn decrease-btn"
                    aria-label={`Decrease quantity of ${item.name}`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn increase-btn"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;