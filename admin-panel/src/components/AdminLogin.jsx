// admin-panel/src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Reusing the login function from your shared api.js
import './AdminLogin.css'; 
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await login({ email, password });
      // Assuming your backend sends the token in res.data.token
      const token = res.data.token; 

      if (token) {
        localStorage.setItem('token', token); // Store the token
        alert('Login successful! Welcome Admin.');
        navigate('/admin'); // Redirect to the admin dashboard/product management page
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // More specific error handling based on backend response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="admin-login-container"> {/* You can style this */}
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;