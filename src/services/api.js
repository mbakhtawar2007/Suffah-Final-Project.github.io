// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE_URL + '/api/auth';

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Login failed');
    error.response = { data: errorData };
    throw error;
  }
  return { data: await response.json() };
}

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || 'Registration failed');
    error.response = { data: errorData };
    throw error;
  }
  return { data: await response.json() };
}
