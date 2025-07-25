import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add user');
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditId(user._id);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const updatedUser = await res.json();
      setUsers(users.map(u => (u._id === editId ? updatedUser : u)));
      setEditId(null);
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Manage Users</h3>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <form onSubmit={editId ? handleUpdateUser : handleAddUser}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          required={!editId}
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {editId ? 'Update' : 'Add'} User
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: '', email: '', password: '', role: 'user' });
            }}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} ({u.email}) - Role: {u.role}
            <button onClick={() => handleEditUser(u)} disabled={loading}>
              Edit
            </button>
            <button onClick={() => handleDeleteUser(u._id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersAdmin;
