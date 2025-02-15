import friendApi from "../api/friendApi";

const friendService = {
    createFriendRequest: async (data) => {
        try {
            const response = await friendApi.createFriendRequest(data);
            return response.data;
        } catch (error) {
            console.error("Error creating friend request:", error);
            throw error;
        }
    },

    updateStatusFriendRequest: async (idFriendRequest, data) => {
        try {
            const response = await friendApi.updateStatusFriendRequest(idFriendRequest, data);
            return response.data;
        } catch (error) {
            console.error("Error updating friend request status:", error);
            throw error;
        }
    },

    getFriendshipByIdAccountAndName: async (idAccount, name, page, size, sort) => {
        try {
            const response = await friendApi.getFriendshipByIdAccountAndName(idAccount, name, page, size, sort);
            return response.data;
        } catch (error) {
            console.error("Error fetching friends:", error);
            throw error;
        }
    },

    getFriendRequestesByIdAccountReceiveAndName: async (idAccountReceive, name, sort, page, size=10) => {
        try {
            const response = await friendApi.getFriendRequestesByIdAccountReceiveAndName(idAccountReceive, name, sort, page, size)
            return response.data;
        } catch (error) {
            console.error("Error fetching friends:", error);
            throw error;
        }
    },
    getFriendRequestStatusBetweenTwoIdAccount: async (idAccountSent, idAccountReceive) => {
        try {
            const response = await friendApi.getFriendRequestStatusBetweenTwoIdAccount(idAccountSent, idAccountReceive);
            return response.data;
        } catch (error) {
            console.error("Error fetching friends:", error);
            throw error;
        }
    }
};

export default friendService;