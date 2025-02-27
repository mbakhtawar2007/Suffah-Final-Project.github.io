import React, { useState } from 'react';
import '../styles/Checkout.css';

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate if all fields are filled
    if (!shippingAddress || !paymentMethod) {
      setFormError('Please fill in all fields.');
      return;
    }

    setFormError(''); // Clear any previous errors
    // Reset form after submission (optional)
    setShippingAddress('');
    setPaymentMethod('');

    // Here you could send the form data to the server
    alert('Checkout Complete!');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-steps">
        <span>Step 1: Shipping</span> → 
        <span>Step 2: Payment</span> → 
        <span>Step 3: Confirm</span>
      </div>

      {formError && <p className="error">{formError}</p>} {/* Display error message */}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="shipping-address">Shipping Address</label>
          <input 
            type="text" 
            id="shipping-address" 
            value={shippingAddress} 
            onChange={(e) => setShippingAddress(e.target.value)} 
            required 
            placeholder="Enter your shipping address"
          />
        </div>
        <div className="form-section">
          <label htmlFor="payment-method">Payment Method</label>
          <select 
            id="payment-method" 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)} 
            required
          >
            <option value="">Select a payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" aria-label="Proceed to Confirm">Proceed to Confirm</button>
      </form>
    </div>
  );
}

export default Checkout;
