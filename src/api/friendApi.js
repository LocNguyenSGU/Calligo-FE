import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/friend-service`;
const friendApi = {
    createFriendRequest: async (data) => {
        const response = axios.post(`${prefixAPI}/friend-requestes`, data)
        return response
    },
    updateStatusFriendRequest: async (idFriendRequest, data) => {
        const response = await axios.put(`${prefixAPI}/friend-requestes/${idFriendRequest}/status`, data);
        return response
    },
    getFriendshipByIdAccountAndName: async (idAccount, name) => {
        const response = await axios.get(`${prefixAPI}/friends/idAccount/${idAccount}`, {
            params: { name: name }
        });
        return response;
    },
    getFriendRequestesByIdAccountReceiveAndName: async (idAccountReceive, name, sort) => {
        const response = await axios.get(`${prefixAPI}/friend-requestes/account-receive/${idAccountReceive}`, {
            params: { 
                name: name,
                sortDirection: sort
            }
        });
        return response;
    },
}
export default friendApi;