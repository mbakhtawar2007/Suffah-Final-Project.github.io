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
export const fetchProducts = () => API.get('/products');

export const createProduct = (productData, imageFile) => {
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (imageFile) {
    formData.append('image', imageFile);
  }
  return API.post('/products', formData, {
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
  return API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* ------------------- 🔐 AUTH ROUTES ------------------- */
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');
