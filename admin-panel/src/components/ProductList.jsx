import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      if (err.response) {
        console.error('Error fetching products:', err.response.status, err.response.data);
      } else if (err.request) {
        console.error('Error fetching products: No response received', err.request);
      } else {
        console.error('Error fetching products:', err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      getProducts(); // Refresh
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="card">
              <h3>{p.name}</h3>
              <p><strong>Price:</strong> ${p.price}</p>
              <p>{p.description}</p>
              <div className="buttons">
                <button onClick={() => onEdit(p)}>✏️ Edit</button>
                <button onClick={() => handleDelete(p._id)} className="danger">🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
