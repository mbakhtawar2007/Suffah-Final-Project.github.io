import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ userId: '', products: [], total: 0, status: 'pending' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add order');
      const newOrder = await res.json();
      setOrders([...orders, newOrder]);
      setForm({ userId: '', products: [], total: 0, status: 'pending' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOrder = (order) => {
    setEditId(order._id);
    setForm({ userId: order.userId?._id || '', products: order.products || [], total: order.total, status: order.status });
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update order');
      const updatedOrder = await res.json();
      setOrders(orders.map(o => (o._id === editId ? updatedOrder : o)));
      setEditId(null);
      setForm({ userId: '', products: [], total: 0, status: 'pending' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter(o => o._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Manage Orders</h3>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <form onSubmit={editId ? handleUpdateOrder : handleAddOrder}>
        <input
          value={form.userId}
          onChange={e => setForm({ ...form, userId: e.target.value })}
          placeholder="User ID"
          required
        />
        <input
          value={form.total}
          onChange={e => setForm({ ...form, total: parseFloat(e.target.value) })}
          placeholder="Total"
          type="number"
          min="0"
          step="0.01"
          required
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
          required
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" disabled={loading}>
          {editId ? 'Update' : 'Add'} Order
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ userId: '', products: [], total: 0, status: 'pending' });
            }}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {orders.map(o => (
          <li key={o._id}>
            User: {o.userId?.name || o.userId} - Total: ${o.total} - Status: {o.status}
            <button onClick={() => handleEditOrder(o)} disabled={loading}>
              Edit
            </button>
            <button onClick={() => handleDeleteOrder(o._id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersAdmin;
