// components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ editingProduct, onClearEdit }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm({ name: '', price: '', description: '' });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
        alert('Product updated!');
      } else {
        await createProduct(form);
        alert('Product added!');
      }
      setForm({ name: '', price: '', description: '' });
      onClearEdit();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        {editingProduct && <button type="button" onClick={onClearEdit} className="danger">Cancel Edit</button>}
      </form>
    </div>
  );
};

export default ProductForm;
