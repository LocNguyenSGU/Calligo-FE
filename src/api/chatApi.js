import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/chat-service`;
const chatApi = {
    getConversation: async () => {
        const response = axios.get(`${prefixAPI}/conversation`)
        return response
    },

    getMessages: async (idConversation) => {
        const response = axios.get(`${prefixAPI}/messages/${idConversation}`) 
        return response
    },
}
export default chatApi;