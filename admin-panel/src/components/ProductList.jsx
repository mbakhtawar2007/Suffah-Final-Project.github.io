// admin-panel/src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';

// Add refreshTrigger and onDeleteSuccess props
const ProductList = ({ onEdit, refreshTrigger, onDeleteSuccess }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products.');
      if (err.response) {
        console.error('Error fetching products:', err.response.status, err.response.data);
        if (err.response.status === 401 || err.response.status === 403) {
             // Optional: Redirect to login if token is invalid/expired
             // navigate('/admin/login'); 
             setError('Session expired or unauthorized. Please log in again.');
        }
      } else if (err.request) {
        console.error('Error fetching products: No response received', err.request);
      } else {
        console.error('Error fetching products:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      alert('Product deleted successfully!');
      if (onDeleteSuccess) {
        onDeleteSuccess(); // Trigger refresh after successful deletion
      }
    } catch (err) {
      console.error('Delete failed:', err.response ? err.response.data : err.message);
      alert(`Failed to delete product: ${err.response && err.response.data ? err.response.data.message : 'Please try again.'}`);
    }
  };

  // Trigger product fetch whenever refreshTrigger changes
  useEffect(() => {
    getProducts();
  }, [refreshTrigger]); // Depend on refreshTrigger

  return (
    <div>
      <h2>All Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="card">
              <h3>{p.name}</h3>
              <p><strong>Price:</strong> ${p.price}</p>
              <p><strong>Category:</strong> {p.category}</p> {/* Display category */}
              <p>{p.description}</p>
              {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.name} style={{ maxWidth: '100%', height: 'auto' }} />}
              <div className="buttons">
                <button onClick={() => onEdit(p)}>✏️ Edit</button>
                <button onClick={() => handleDelete(p._id)} className="danger">🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;