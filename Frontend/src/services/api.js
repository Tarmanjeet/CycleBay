import axios from 'axios';

const API_BASE_URL = 'https://cyclebay-backend.onrender.com/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

export const profileAPI = {
    getUserProducts: (userId) => api.get(`/product/user/${userId}`),
    deleteProduct: (productId) => api.delete(`/product/delete/${productId}`),
};

export default api; 