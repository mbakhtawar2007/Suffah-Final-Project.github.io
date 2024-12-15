import React from 'react';
import '../styles/Cart.css';

function Cart() {
  return (
    <div className="cart">
    <h2>Your Shopping Cart</h2>
    <p>Items listed here...</p>
    <div className="cart-summary">
      <p>Subtotal: $100</p>
      <input type="text" placeholder="Enter coupon code" />
      <button>Apply Coupon</button>
      <p>Shipping: $20</p>
      <h3>Total: $120</h3>
      <button>Proceed to Checkout</button>
    </div>
  </div>
  
  );
}

export default Cart;
