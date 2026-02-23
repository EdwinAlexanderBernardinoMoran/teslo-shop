import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const tesloApi = axios.create({
    baseURL: BASE_URL,
})

// Interceptores de request
tesloApi.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export { tesloApi };