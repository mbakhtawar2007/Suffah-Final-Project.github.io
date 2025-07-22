
function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress || !paymentMethod) {
      setFormError('Please fill in all fields.');
      setSuccess(false);
      return;
    }
    setFormError('');
    setSuccess(true);
    setShippingAddress('');
    setPaymentMethod('');
  };

  return (
    <section className="checkout" aria-label="Checkout">
      <h2>Checkout</h2>
      <div className="checkout-steps" aria-label="Checkout Steps">
        <span>Step 1: Shipping</span> &rarr;{' '}
        <span>Step 2: Payment</span> &rarr;{' '}
        <span>Step 3: Confirm</span>
      </div>

      {formError && <p className="error" role="alert">{formError}</p>}
      {success && <p className="success" role="status">Checkout Complete!</p>}

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
            aria-label="Shipping Address"
          />
        </div>
        <div className="form-section">
          <label htmlFor="payment-method">Payment Method</label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            aria-label="Payment Method"
          >
            <option value="">Select a payment method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" aria-label="Proceed to Confirm">Proceed to Confirm</button>
      </form>
    </section>
  );
}

export default Checkout;
