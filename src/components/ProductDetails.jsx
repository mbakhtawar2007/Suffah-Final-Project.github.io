import React, { useState } from 'react';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Alice', rating: 5, comment: 'Amazing product!' },
    { id: 2, name: 'Bob', rating: 4, comment: 'Great quality but a bit expensive.' },
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { id: Date.now(), ...newReview }]);
    setNewReview({ name: '', rating: '', comment: '' });
  };

  return (
    <div className="product-details">
      <h1>Product Name</h1>
      <div className="product-carousel">
        <img src="/assets/images/product1.jpg" alt="Product" />
        <img src="/assets/images/product2.jpg" alt="Product" />
      </div>
      <p>Description of the product goes here.</p>
      <button>Add to Cart</button>

      <div className="reviews">
        <h2>Customer Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <strong>{review.name}</strong>
            <span>{'⭐'.repeat(review.rating)}</span>
            <p>{review.comment}</p>
          </div>
        ))}

        <h3>Write a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
          >
            <option value="">Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetails;
