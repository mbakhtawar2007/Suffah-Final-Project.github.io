import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('token'); // Or wherever you store your token
};

export const deleteProduct = async (productId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; // Re-throw the error for the component to handle
  }
};