import React, { useState } from 'react';
import '../styles/Checkout.css';

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setFormError('');
    if (currentStep === 1 && !shippingAddress) {
      setFormError('Please enter your shipping address.');
      return;
    }
    if (currentStep === 2 && !paymentMethod) {
      setFormError('Please select a payment method.');
      return;
    }
    setCurrentStep(currentStep + 1);
    setSuccess(false);
  };

  const handleBack = () => {
    setFormError('');
    setSuccess(false);
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setSuccess(true);
    setShippingAddress('');
    setPaymentMethod('');
    setCurrentStep(1);
  };

  return (
    <section className="checkout" aria-label="Checkout Process">
      <h2>Checkout</h2>

      <div className="checkout-steps" aria-label="Checkout Steps Progress">
        <span className={currentStep === 1 ? 'active' : ''}>Step 1: Shipping</span>
        <span className="arrow">→</span>
        <span className={currentStep === 2 ? 'active' : ''}>Step 2: Payment</span>
        <span className="arrow">→</span>
        <span className={currentStep === 3 ? 'active' : ''}>Step 3: Confirm</span>
      </div>

      {formError && <p className="error" role="alert">{formError}</p>}
      {success && <p className="success" role="status">Checkout complete! Your order has been placed.</p>}

      <form onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
        {currentStep === 1 && (
          <div className="form-section" aria-labelledby="shipping-heading">
            <h3 id="shipping-heading">Shipping Information</h3>
            <label htmlFor="shipping-address">Shipping Address</label>
            <input
              type="text"
              id="shipping-address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              placeholder="Enter your shipping address"
              aria-required="true"
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-section" aria-labelledby="payment-heading">
            <h3 id="payment-heading">Payment Method</h3>
            <label htmlFor="payment-method">Payment Method</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              aria-required="true"
            >
              <option value="">Select a payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-section" aria-labelledby="confirm-heading">
            <h3 id="confirm-heading">Confirm Your Order</h3>
            <div className="summary-details">
              <h4>Shipping To:</h4>
              <p>{shippingAddress}</p>
              <h4>Payment Via:</h4>
              <p>
                {paymentMethod === 'credit-card' && 'Credit Card'}
                {paymentMethod === 'paypal' && 'PayPal'}
                {paymentMethod === 'bank-transfer' && 'Bank Transfer'}
              </p>
            </div>
          </div>
        )}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack} aria-label="Go back to previous step">
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button type="submit" aria-label={`Proceed to ${currentStep === 1 ? 'Payment' : 'Confirm'} step`}>
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button type="submit" aria-label="Place Order">
              Place Order
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Checkout;
