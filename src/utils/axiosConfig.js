import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8089/api', // Thay bằng URL của bạn
    headers: { 'Content-Type': 'application/json' },
});

// Gắn token vào mỗi request nếu cần
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;