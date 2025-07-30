// src/services/api.js

// This should define the BASE URL for your backend API.
// It should NOT include '/api/auth' or any specific endpoint.
// It should be something like 'https://your-vercel-backend-app.vercel.app'
// or 'http://localhost:5000' during local development.

// Corrected:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// You can create a reusable fetch utility or an Axios instance here
// For now, let's keep your direct fetch calls but use the correct base URL.

// For authentication specific endpoints, you can construct them relative to API_BASE_URL
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, { // Corrected URL
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
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, { // Corrected URL
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

// NOTE: You don't need to import React or other UI-related things in this service file.
// This file should strictly be about API interactions.