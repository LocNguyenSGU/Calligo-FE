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
        if (response.status === 200) {
            console.log("User is verified ~ ", response);
            localStorage.setItem('infoUser', JSON.stringify(response.data.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('infoUser');
    },
    getAccountByPhone: async(phone) => {
        const response = await authApi.getAccountByPhone(phone);
        console.log("Response getAccountByPhone: ", response.data)
        return response.data;
    },
    getInfoAccounBasicByPhoneToFriend: async(phone, idAccountSource, idAccountTarget) => {
        const response = await authApi.getInfoAccounBasicByPhoneToFriend(phone, idAccountSource, idAccountTarget);
        console.log("Response getAccountByPhone: ", response.data)
        return response.data;
    }
}
export default authService;