import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';

const ProductList = ({ onEdit }) => {
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
      // Update local state instead of refetching
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
