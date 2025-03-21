import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/chat-service`;
const chatApi = {
    getConversationWithIdAccount: async () => {
        const infoUser = localStorage.getItem("infoUser");
        const currentUser = JSON.parse(infoUser);
        const response = axios.get(`${prefixAPI}/conversation/idParticipant/${currentUser.idAccount}`)
        return response
    },
    

    getMessages: async (idConversation) => {
        const response = axios.get(`${prefixAPI}/messages/${idConversation}`) 
        return response
    },
}
export default chatApi;