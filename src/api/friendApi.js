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
    getFriendshipByIdAccount: async (idAccount) => {
        const response = await axios.get(`${prefixAPI}/friends/idAccount/${idAccount}`);
        return response 
    },
}
export default friendApi;