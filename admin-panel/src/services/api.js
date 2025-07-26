import axios from 'axios';

// 🔗 Backend API base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Allow cookies (for sessions or tokens if needed)
});

// ✅ Intercept requests to include JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

/* ------------------- 🛍️ PRODUCT ROUTES ------------------- */

/**
 * 📦 Fetch all products
 */
export const fetchProducts = () => API.get('/products');

/**
 * ➕ Create a new product
 */
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

/**
 * ✏️ Update a product
 */
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

/**
 * ❌ Delete a product
 */
export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* ------------------- 🔐 AUTH ROUTES ------------------- */

/**
 * 🧾 Register a new user
 */
export const register = (userData) => API.post('/auth/register', userData);

/**
 * 🔐 Login user and receive JWT
 */
export const login = (credentials) => API.post('/auth/login', credentials);

/**
 * 👤 Get authenticated user profile
 */
export const getProfile = () => API.get('/auth/profile');

/**
 * 🚪 Logout user
 */
export const logout = () => API.post('/auth/logout');
