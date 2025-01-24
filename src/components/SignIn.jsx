import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/SignIn.css';

function SignIn() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to home page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Validate email and password inputs
  const validateInputs = () => {
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    setLoading(true);

    try {
      await login(credentials.email, credentials.password);
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          aria-label="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          aria-label="Password"
          required
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
