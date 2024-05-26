import axios from 'axios'

export const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})
axiosClient.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});