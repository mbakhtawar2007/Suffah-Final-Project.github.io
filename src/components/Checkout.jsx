// Checkout.jsx
import '../styles/Checkout.css';
import React, { useState } from 'react';

function Checkout() {
    const [currentStep, setCurrentStep] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleNext = (e) => {
        e.preventDefault();
        setFormError(''); // Clear previous errors
        if (currentStep === 1 && !shippingAddress) {
            setFormError('Please enter your shipping address.');
            return;
        }
        if (currentStep === 2 && !paymentMethod) {
            setFormError('Please select a payment method.');
            return;
        }
        setSuccess(false); // Reset success message on step change
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setFormError(''); // Clear errors when going back
        setSuccess(false); // Reset success message
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a server
        console.log('Submitting order with:', { shippingAddress, paymentMethod });
        setFormError('');
        setSuccess(true);
        // Reset form fields after successful submission
        setShippingAddress('');
        setPaymentMethod('');
        setCurrentStep(1); // Go back to the first step
    };

    return (
        <section className="checkout" aria-label="Checkout Process">
            <h2>Checkout</h2>

            <div className="checkout-steps" aria-label="Checkout Steps Progress">
                <span className={currentStep === 1 ? 'active' : ''}>Step 1: Shipping</span>
                <span className="arrow">&rarr;</span>
                <span className={currentStep === 2 ? 'active' : ''}>Step 2: Payment</span>
                <span className="arrow">&rarr;</span>
                <span className={currentStep === 3 ? 'active' : ''}>Step 3: Confirm</span>
            </div>

            {formError && <p className="error" role="alert">{formError}</p>}
            {success && <p className="success" role="status">Checkout Complete! Your order has been placed.</p>}

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
                            <p>{shippingAddress || 'Not provided'}</p>
                            <h4>Payment Via:</h4>
                            <p>
                                {paymentMethod === 'credit-card' && 'Credit Card'}
                                {paymentMethod === 'paypal' && 'PayPal'}
                                {paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                                {!paymentMethod && 'Not selected'}
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