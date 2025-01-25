import axios from '../utils/axiosConfig';
const authApi = {
    login: async (credentials) => {
        const response = axios.post('/api/v1/auth/login', credentials)
        return response.data;
    },
    register: async (data) => {
        const response = await axios.post('api/v1/auth/register', data);
        return response.data;
    },
}
export default authApi;