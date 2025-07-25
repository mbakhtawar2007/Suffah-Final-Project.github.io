import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetails.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState([
    { id: 1, name: 'Alice', rating: 5, comment: 'Amazing product!' },
    { id: 2, name: 'Bob', rating: 4, comment: 'Great quality but a bit expensive.' },
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: '', rating: '', comment: '' });
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  return (
    <section className="product-details" aria-label="Product Details">
      <h1>{product.name}</h1>
      <div className="product-carousel" aria-label="Product Images">
        <img src={product.image || '/placeholder-250.svg'} alt={product.name} />
      </div>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="review">
              <div className="review-header">
                <strong>{review.name}</strong> - {review.rating} stars
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleReviewSubmit} aria-label="Submit a review">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            required
            aria-label="Your Name"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            min="1"
            max="5"
            required
            aria-label="Rating (1-5)"
          />
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <button type="submit" className="submit-review-btn">Submit Review</button>
        </form>
      </div>
    </section>
  );
}

export default ProductDetails;
