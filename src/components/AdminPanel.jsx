import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setForm({ name: '', price: '', description: '' });
  };

  const handleEditProduct = (product) => {
    setEditId(product._id);
    setForm({ name: product.name, price: product.price, description: product.description });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/products/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const updatedProduct = await res.json();
    setProducts(products.map(p => p._id === editId ? updatedProduct : p));
    setEditId(null);
    setForm({ name: '', price: '', description: '' });
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE'
    });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={editId ? handleUpdateProduct : handleAddProduct}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" required type="number" />
        <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" required />
        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', price: '', description: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - ${p.price} <br /> {p.description}
            <button onClick={() => handleEditProduct(p)}>Edit</button>
            <button onClick={() => handleDeleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
