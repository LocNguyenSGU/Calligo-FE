import fileApi from "../api/fileApi";

const fileService = {
    uploadAvatar: async (files) => {
        try {
            const response = await fileApi.uploadFile(files);
            console.log("Kết quả upload:", response.data);
            return response.data
        } catch (error) {
            console.error("Lỗi khi upload file:", error);
            throw error;
        }
    }
};

export default fileService;