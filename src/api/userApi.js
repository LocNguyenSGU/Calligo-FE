import axios from '../utils/axiosConfig';
import { addressAPI } from '../utils/prefixAPI';
const prefixAPI = `${addressAPI}/api/v1/user-service`;
const userApi = {
    getBasicAccountWithRelation: async (phone, idAccountSource) => {
        const response = axios.get(`${prefixAPI}/accounts/basic/relation/phone/${phone}/idAccountSource/${idAccountSource}`)
        return response
    },
}
export default userApi;