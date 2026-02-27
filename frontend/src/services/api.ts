import axios from 'axios';

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
            // Don't redirect for MetaMask or dev-mode tokens (they aren't real JWTs)
            const stored = localStorage.getItem('auth-storage');
            if (stored) {
                try {
                    const { state } = JSON.parse(stored);
                    const token = state?.token || '';
                    if (token.startsWith('metamask-') || token === 'dev-token') {
                        // Silently ignore 401 for mock tokens
                        return Promise.reject(error);
                    }
                } catch { }
            }
            // Real JWT expired — redirect to login
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default api;
