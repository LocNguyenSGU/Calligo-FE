import authApi from "../api/authApi";

const authService = {
    login: async (credentials) => {
        const response = await authApi.login(credentials);
        console.log("Response ~ login: ", response);
    },
    register: async (data) => {
        const response = await authApi.register(data);
        console.log("Response ~ register: ", response);
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    isAuthenticated: () => {
        return localStorage.getItem('token') ? true : false;
    }

}
export default authService;