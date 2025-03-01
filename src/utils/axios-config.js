// src/utils/axios-config.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // This is important for CSRF cookie
});

// Setup interceptor to handle CSRF token
api.interceptors.request.use(config => {
    // Get the CSRF token from the cookie if it exists
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    
    if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    
    return config;
});

export default api;