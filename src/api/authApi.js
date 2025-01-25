import axios from '../utils/axiosConfig';
const authApi = {
    login: async (credentials) => {
        const response = axios.post('http://localhost:8089/api/v1/auth/login', credentials)
        return response
    },
    register: async (data) => {
        const response = await axios.post('api/v1/auth/register', data);
        return response
    },
}
export default authApi;