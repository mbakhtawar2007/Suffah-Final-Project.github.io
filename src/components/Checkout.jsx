import React from 'react';
import '../styles/Checkout.css';

function Checkout() {
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-steps">
        <span>Step 1: Shipping</span> → 
        <span>Step 2: Payment</span> → 
        <span>Step 3: Confirm</span>
      </div>
      <p>Checkout details here...</p>
    </div>
  );
}

export default Checkout;
