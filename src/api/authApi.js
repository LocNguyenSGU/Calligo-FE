import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/user-service`;
const authApi = {
    login: async (credentials) => {
        const response = axios.post(`${prefixAPI}/auth/login`, credentials, {
            withCredentials: true, // 🔥 Quan trọng để trình duyệt nhận cookie
        });
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
    logout: async () => {
        return axios.post(`${prefixAPI}/auth/logout`,{},{ withCredentials: true });
    },
    refreshToken: async () => {
        // Gọi API refresh token
        const response = await axios.post(`${prefixAPI}/auth/refresh-token`, {
            withCredentials: true, // Để gửi cookie chứa refresh token
        });
        return response;
    },
    getAccountByPhone: async (phone) => {
        const response = await axios.get(`${prefixAPI}/accounts/phone/${phone}`);
        return response 
    },
    getInfoAccounBasicByPhoneToFriend: async (phone, idAccountSource, idAccountTarget) => {
        const response = await axios.get(`${addressAPI}/api/v1/apigateway/friend-user/phone/${phone}/idAccountSource/${idAccountSource}/idAccountTarget/${idAccountTarget}`);
        return response 
    }

}
export default authApi;