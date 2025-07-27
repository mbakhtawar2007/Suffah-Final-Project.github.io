import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css';

function LoginForm() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError('Please fill in all fields.');
    }

    try {
      await login(formData.email, formData.password, formData.rememberMe);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label>Remember Me</label>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="submit-btn">
          Login
        </button>

        <p className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
