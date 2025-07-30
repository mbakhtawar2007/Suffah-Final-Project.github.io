// admin-panel/src/services/api.js
import axios from 'axios';

const API = axios.create({
    // THIS IS THE CRUCIAL LINE: Ensure it points to your backend's base URL, including the /api prefix.
    // If you are using environment variables, ensure your .env file in admin-panel/ has:
    // VITE_API_BASE_URL=http://localhost:5000
    // Then you can use: baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    // But for a direct, immediate fix, hardcode it as follows:
    baseURL: 'http://localhost:5000/api', // <--- MAKE SURE THIS IS EXACTLY THIS URL
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

/* ------------------- 🛍️ PRODUCT ROUTES ------------------- */
// These paths should be relative to the baseURL (e.g., '/products', not '/api/products')
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
// These paths should be relative to the baseURL (e.g., '/auth/login', not '/api/auth/login')
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');