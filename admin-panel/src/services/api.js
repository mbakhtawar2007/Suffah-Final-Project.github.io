// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
});

export const fetchProducts = () => API.get('/products');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, updatedData) => API.put(`/products/${id}`, updatedData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
