import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage')!).state.token
        : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Because we are relying on local storage mock authentication,
            // we will bypass the aggressive redirect to '/auth' so the app 
            // doesn't loop infinitely when components fetch using fake tokens.
            console.warn("Caught a 401 Unauthorized from backend. Ignoring redirect for mock local dev.");
        }
        return Promise.reject(error);
    }
);

export default api;
