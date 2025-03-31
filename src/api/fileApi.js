import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPIFile = `${addressAPI}/api/v1/file-service`;
const fileApi = {
   
    uploadFile: async (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        const response = await axios.post(`${prefixAPIFile}/files/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response;
    }
}
export default fileApi;