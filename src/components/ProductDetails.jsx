import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetails.css';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
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
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product details');
        const data = await res.json();
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
    const { name, rating, comment } = newReview;
    if (name && rating && comment) {
      setReviews((prev) => [...prev, { id: Date.now(), ...newReview }]);
      setNewReview({ name: '', rating: '', comment: '' });
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <section className="product-details" aria-label="Product Details">
      <h1>{product.name}</h1>
      <div className="product-carousel">
        <img
          src={product.image && (product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`)}
          alt={product.name}
        />
      </div>
      <p>{product.description}</p>
      <div className="price">${Number(product.price).toFixed(2)}</div>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <ul className="reviews-list">
          {reviews.map(({ id, name, rating, comment }) => (
            <li key={id} className="review">
              <div className="review-header">
                <strong>{name}</strong> - {`${rating} star${rating > 1 ? 's' : ''}`}
              </div>
              <p>{comment}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProductDetails;
