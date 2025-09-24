import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:2910/api', // Replace with your backend API URL
    withCredentials: true, // Include cookies in requests
})