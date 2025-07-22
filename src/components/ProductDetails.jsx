
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Alice', rating: 5, comment: 'Amazing product!' },
    { id: 2, name: 'Bob', rating: 4, comment: 'Great quality but a bit expensive.' },
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: '', rating: '', comment: '' });
    }
  };

  return (
    <section className="product-details" aria-label="Product Details">
      <h1>Product Name</h1>
      <div className="product-carousel" aria-label="Product Images">
        <img src="/assets/images/product1.jpg" alt="Product 1" />
        <img src="/assets/images/product2.jpg" alt="Product 2" />
      </div>
      <p>Description of the product goes here.</p>
      <div className="price">$699</div>
      <button className="add-to-cart-btn">Add to Cart</button>

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

ProductDetails.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ),
};

export default ProductDetails;
