import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/chat-service`; 
const chatApi = {
    getConversationWithIdAccount: async () => {
        const infoUser = localStorage.getItem("infoUser");
        const currentUser = JSON.parse(infoUser);
        const response = axios.get(`${prefixAPI}/conversation/idAccount/${currentUser.idAccount}`)
        return response
    },

    getMessages: async (idConversation) => {
        const response = axios.get(`${prefixAPI}/messages/${idConversation}`) 
        return response
    },

     getMessagesByIdConversation: async (idConversation, page, size) => {
        const response = axios.get(`${prefixAPI}/messages/conversation/${idConversation}?sortDirection=asc&page=${page}&size=${size}`) 
        return response
    },
}
export default chatApi;