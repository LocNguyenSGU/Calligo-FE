import userApi from "../api/userApi";

const userService = {
    getBasicAccountWithRelation: async (phone, idAccountSource) => {
        const response = await userApi.getBasicAccountWithRelation(phone, idAccountSource)
        return response.data;
    },

    updateAccount: async (idAccount, data) => {
        const response = await userApi.updateAccount(idAccount, data);
        return response.data;
    }
}
export default userService;