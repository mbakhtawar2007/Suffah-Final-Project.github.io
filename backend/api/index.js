import axios from 'axios';

// 🔗 Dynamic Backend API base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ✅ Include JWT token from localStorage or sessionStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

/* ------------------- 🛍️ PRODUCT ROUTES ------------------- */
// These routes need to have '/api' prepended to them
export const fetchProducts = () => API.get('/api/products'); // MODIFIED
export const createProduct = (productData, imageFile) => {
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return API.post('/api/products', formData, { // MODIFIED
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProduct = (id, updatedData, imageFile) => {
  const formData = new FormData();
  Object.entries(updatedData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return API.put(`/api/products/${id}`, formData, { // MODIFIED
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = (id) => API.delete(`/api/products/${id}`); // MODIFIED

/* ------------------- 🔐 AUTH ROUTES ------------------- */
// These routes also need to have '/api' prepended to them
export const register = (userData) => API.post('/api/auth/register', userData); // MODIFIED
export const login = (credentials) => API.post('/api/auth/login', credentials); // MODIFIED
export const logout = () => API.post('/api/auth/logout'); // MODIFIED