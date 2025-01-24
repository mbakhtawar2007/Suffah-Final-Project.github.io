import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/SignUp.css';

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate input fields
  const validateInputs = () => {
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs before proceeding
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      await register(userData.email, userData.password);
      navigate('/signin'); // Redirect to sign-in after successful registration
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          aria-label="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          aria-label="Password"
          required
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
