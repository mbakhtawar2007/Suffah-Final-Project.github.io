import React from 'react';
import { useCart } from '../context/CartContext'; // Ensure the path is correct
import '../styles/Cart.css'; // Make sure this file exists and is properly styled

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className="cart" aria-label="Shopping Cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="increase-btn"
                >
                  Increase
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="decrease-btn"
                >
                  Decrease
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
