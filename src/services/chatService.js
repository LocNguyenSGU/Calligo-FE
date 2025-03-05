import chatApi from "../api/chatApi";

const chatService = {
    getConversation: async () => {
        const response = await chatApi.getConversation()
        return response.data;
    },
}
export default chatService;