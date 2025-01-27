import axios from '../utils/axiosConfig';
const prefixAPI = "http://localhost:8089/api/v1/user-requests";
const authApi = {
    login: async (credentials) => {
        const response = axios.post(`${prefixAPI}/auth/login`, credentials)
        return response
    },
    register: async (data) => {
        const response = await axios.post(`${prefixAPI}/auth/register`, data);
        return response
    },
    verify: async () => {
        const response = await axios.get(`${prefixAPI}/accounts/info`);
        return response 
    },
    refreshToken: async () => {
        // Gọi API refresh token
        const response = await axios.post(`${prefixAPI}/auth/refresh-token`, {
            withCredentials: true, // Để gửi cookie chứa refresh token
        });
        return response;
    },
}
export default authApi;