import authApi from "../api/authApi";

const authService = {
    login: async (credentials) => {
        const response = await authApi.login(credentials);
        localStorage.setItem('token', response.data.data);
        return response.data;
    },
    register: async (data) => {
        const response = await authApi.register(data);
        console.log("Response ~ register: ", response);
    },
    verify: async () => {
        const response = await authApi.verify();
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
}
export default authService;