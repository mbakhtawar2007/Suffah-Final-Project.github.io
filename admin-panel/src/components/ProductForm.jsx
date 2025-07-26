// components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ editingProduct, onClearEdit }) => {
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setImageFile(null);
    } else {
      setForm({ name: '', price: '', description: '' });
      setImageFile(null);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, form, imageFile);
      } else {
        await createProduct(form, imageFile);
      }
      setForm({ name: '', price: '', description: '' });
      setImageFile(null);
      onClearEdit();
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product. Please try again.');
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        {editingProduct && <button type="button" onClick={onClearEdit} className="danger">Cancel Edit</button>}
      </form>
    </div>
  );
};

export default ProductForm;
