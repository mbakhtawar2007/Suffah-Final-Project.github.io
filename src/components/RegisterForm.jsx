import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import './LoginForm.css';

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(password) {
  if (password.length < 6) return { label: 'Too short', color: '#e53e3e' };
  if (!/[A-Z]/.test(password)) return { label: 'Add uppercase', color: '#ed8936' };
  if (!/[0-9]/.test(password)) return { label: 'Add a number', color: '#ed8936' };
  if (!/[^A-Za-z0-9]/.test(password)) return { label: 'Add a symbol', color: '#ed8936' };
  if (password.length < 8) return { label: 'Weak', color: '#ecc94b' };
  return { label: 'Strong', color: '#38a169' };
}

function RegisterForm({ onSwitch }) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const isEmailValid = validateEmail(email);
  const isUsernameValid = username.length >= 3;
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length >= 6;
  const isFormValid = isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerUser({ username, email, password });
      localStorage.setItem('jwtToken', data.token);
      setUser(data.user);
      setSuccess('Registered successfully!');
      window.location.reload();
    } catch (registerError) {
      const regMsg = registerError?.response?.data?.message;
      if (registerError?.response && registerError.response.data) {
        if (registerError.response.data.message === 'User already exists') {
          setError('An account with this email already exists. Please log in.');
        } else {
          setError(regMsg || 'Registration failed. Please try again.');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off" aria-label="Register form">
        <h2>Register</h2>
        <p className="info">Create a new account.</p>
        <label htmlFor="register-username" style={{fontWeight:'500'}}>Username</label>
        <input
          id="register-username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          required
          aria-invalid={!isUsernameValid}
          aria-describedby="usernameHelp"
        />
        <div id="usernameHelp" style={{fontSize:'0.9em', color:!isUsernameValid?'#e53e3e':'#718096'}}>
          {isUsernameValid ? '' : 'Username must be at least 3 characters.'}
        </div>
        <label htmlFor="register-email" style={{fontWeight:'500'}}>Email</label>
        <input
          id="register-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={!isEmailValid}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" style={{fontSize:'0.9em', color:!isEmailValid?'#e53e3e':'#718096'}}>
          {isEmailValid ? '' : 'Enter a valid email address.'}
        </div>
        <label htmlFor="register-password" style={{fontWeight:'500'}}>Password</label>
        <div style={{position:'relative'}}>
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            aria-invalid={!isPasswordValid}
            aria-describedby="passwordHelp"
            style={{paddingRight:'2.5rem'}}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            style={{position:'absolute', right:'0.5rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#3182ce', fontWeight:'bold', fontSize:'1.1em'}}
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div id="passwordHelp" style={{fontSize:'0.9em', color:passwordStrength.color}}>
          {password && `Password strength: ${passwordStrength.label}`}
        </div>
        <label htmlFor="register-confirm-password" style={{fontWeight:'500'}}>Confirm Password</label>
        <div style={{position:'relative'}}>
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            aria-invalid={!isConfirmPasswordValid}
            aria-describedby="confirmPasswordHelp"
            style={{paddingRight:'2.5rem'}}
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            onClick={() => setShowConfirmPassword((v) => !v)}
            style={{position:'absolute', right:'0.5rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#3182ce', fontWeight:'bold', fontSize:'1.1em'}}
            tabIndex={-1}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div id="confirmPasswordHelp" style={{fontSize:'0.9em', color:!isConfirmPasswordValid?'#e53e3e':'#718096'}}>
          {confirmPassword && !isConfirmPasswordValid ? 'Passwords do not match.' : ''}
        </div>
        <button type="submit" disabled={loading || !isFormValid} aria-disabled={loading || !isFormValid}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Already have an account?{' '}
          <span style={{ color: '#3182ce', cursor: 'pointer' }} onClick={onSwitch} tabIndex={0} role="button" aria-label="Switch to login">Login</span>
        </div>
        {error && <div className="error" role="alert">{error}</div>}
        {success && <div className="success" role="status">{success}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
