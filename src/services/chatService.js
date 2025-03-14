import chatApi from "../api/chatApi";

const chatService = {
    getConversation: async () => {
        const response = await chatApi.getConversation()
        return response.data;
    },

    getMessages: async (idConversation) => {
        const response = await chatApi.getMessages(idConversation)
        return response.data;
    },

    nameConversation: async () => {
        const nameStorage = localStorage.getItem("infoUser");
      const name = JSON.parse(nameStorage);
      return name.firstName.trim();
    },
}
export default chatService;