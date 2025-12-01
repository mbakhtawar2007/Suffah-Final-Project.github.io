import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor to add Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to normalize errors
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) return Promise.reject(err.response);
    return Promise.reject(err);
  }
);

export default apiClient;
