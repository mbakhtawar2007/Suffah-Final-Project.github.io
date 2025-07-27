import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/RegisterForm.css';

function RegisterForm() {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
    try {
      await register(username, email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          name="username"
          placeholder="Your full name"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create a password"
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

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="submit-btn">
          Register
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
