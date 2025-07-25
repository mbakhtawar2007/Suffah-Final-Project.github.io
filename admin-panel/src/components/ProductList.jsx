import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error('Error fetching products:', err.response.status, err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error('Error fetching products: No response received', err.request);
      } else {
        // Something else happened
        console.error('Error fetching products:', err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteProduct(id);
      getProducts(); // Refresh list
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
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
