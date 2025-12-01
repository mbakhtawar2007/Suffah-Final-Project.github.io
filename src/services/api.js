// src/services/api.js

// This should define the BASE URL for your backend API.
// It should NOT include '/api/auth' or any specific endpoint.
// It should be something like 'https://your-vercel-backend-app.vercel.app'
// or 'http://localhost:5000' during local development.

// Corrected:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// You can create a reusable fetch utility or an Axios instance here
// For now, let's keep your direct fetch calls but use the correct base URL.

import apiClient from './apiClient';

export async function loginUser(credentials) {
  const res = await apiClient.post('/api/auth/login', credentials);
  return res;
}

export async function registerUser(data) {
  const res = await apiClient.post('/api/auth/register', data);
  return res;
}

// Keep this file focused on auth endpoints; other API helpers can be added here as needed.