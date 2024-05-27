import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'https://backend-rentify1-production.up.railway.app/'
        // baseURL: 'http://localhost:8080'
    }
);