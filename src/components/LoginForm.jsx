import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import './LoginForm.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LoginForm({ onSwitch }) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.trim().length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      localStorage.setItem('jwtToken', data.token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      setUser(data.user);
      setSuccess('✅ Logged in successfully!');
      setTimeout(() => window.location.reload(), 800); // delay reload for user to see success
    } catch (loginError) {
      const msg = loginError?.response?.data?.message;
      if (msg === 'User not found') {
        setError('No account found with this email. Please register.');
      } else if (msg === 'Invalid credentials') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(msg || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off" aria-label="Login form">
        <h2>Login</h2>
        <p className="info">Enter your email and password to log in.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!isEmailValid}
          aria-describedby="loginEmailHelp"
        />
        <div id="loginEmailHelp" className="inline-validation">
          {!isEmailValid && 'Enter a valid email address.'}
        </div>

        <label htmlFor="login-password">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-invalid={!isPasswordValid}
            aria-describedby="loginPasswordHelp"
            style={{ paddingRight: '2.5rem' }}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword((v) => !v)}
            onKeyDown={(e) => (e.key === 'Enter' ? setShowPassword((v) => !v) : null)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div id="loginPasswordHelp" className="inline-validation">
          {!isPasswordValid && 'Password is required.'}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '-0.5rem', marginTop: '-0.5rem' }}>
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe((v) => !v)}
            style={{ width: '1rem', height: '1rem' }}
          />
          <label htmlFor="remember-me" style={{ fontSize: '0.97em', color: '#4a5568', cursor: 'pointer' }}>
            Remember Me
          </label>
        </div>
        <button type="submit" disabled={loading || !isFormValid}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Don’t have an account?{' '}
          <span
            onClick={onSwitch}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSwitch()}
            style={{ color: '#3182ce', cursor: 'pointer' }}
          >
            Register
          </span>
        </div>

        {error && <div className="error" role="alert">{error}</div>}
        {success && <div className="success" role="status">{success}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
