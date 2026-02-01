import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth data and redirect to login
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// Auth API
export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),

    getCurrentUser: () => api.get('/auth/me'),

    logout: () => api.post('/auth/logout'),
};

// Dashboard API
export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
    getRecentPatients: (limit = 5) => api.get(`/dashboard/recent-patients?limit=${limit}`),
    getTodayAppointments: () => api.get('/dashboard/today-appointments'),
};

// Patients API
export const patientsApi = {
    getAll: (page = 1, limit = 10, search = '') =>
        api.get(`/patients?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),

    getById: (id: string) => api.get(`/patients/${id}`),

    create: (data: any) => api.post('/patients', data),

    update: (id: string, data: any) => api.put(`/patients/${id}`, data),

    delete: (id: string) => api.delete(`/patients/${id}`),
};
