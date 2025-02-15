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
    getFriendshipByIdAccountAndName: async (idAccount, name, page, size=10, sort="asc") => {
        const response = await axios.get(`${prefixAPI}/friends/idAccount/${idAccount}`, {
            params: { page: page, name: name, size:size, sort:sort }
        });
        return response;
    },
    getFriendRequestesByIdAccountReceiveAndName: async (idAccountReceive, name, sort, page, size=10, ) => {
        const response = await axios.get(`${prefixAPI}/friend-requestes/account-receive/${idAccountReceive}`, {
            params: { 
                name: name,
                sortDirection: sort,
                page: page,
                size: size
            }
        });
        return response;
    },
    getFriendRequestStatusBetweenTwoIdAccount: async (idAccountSent, idAccountReceive) => {
        const response = await axios.get(`${prefixAPI}/friend-requestes/status/idAccountSent/${idAccountSent}/idAccountReceive/${idAccountReceive}`);
        return response;
    },
    deleteFriend: async (idFriend) => {
        const response = await axios.delete(`${prefixAPI}/friends/${idFriend}`)
        return response;
    }
}
export default friendApi;