import axios from 'axios';
import authApi from '../api/authApi';

const instance = axios.create({
    baseURL: 'http://localhost:8089',
    headers: { 'Content-Type': 'application/json' },
});

// Gắn token vào mỗi request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy accessToken từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi 401
        if (error.response?.status === 401) {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken'); // Lưu refreshToken nếu có

            // Nếu không có token hoặc refreshToken, chuyển hướng trực tiếp đến trang đăng nhập
            if (!token || !refreshToken) {
                console.warn('User is not logged in. Redirecting to signin page.');
                window.location.href = '/signin';
                return Promise.reject(error);
            }

            // Nếu đã có refreshToken và chưa retry
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Gọi API refresh token
                    const refreshResponse = await authApi.refreshToken();

                    // Lấy token mới từ response
                    const newToken = refreshResponse.data.data;
                    localStorage.setItem('token', newToken);

                    // Cập nhật header Authorization với token mới
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    // Gửi lại request ban đầu với token mới
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    localStorage.removeItem('token'); // Xóa token cũ
                    localStorage.removeItem('refreshToken'); // Xóa refreshToken cũ
                    alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                    window.location.href = '/signin'; // Chuyển hướng đến trang đăng nhập
                }
            }
        }

        return Promise.reject(error);
    }
);

export default instance;