import { ADD_NEWSLETTER } from "configs/url.config";
import http from 'services/http.services';

export async function AddNewsletter(data: Object) {
    try {
        const response = await http.post(ADD_NEWSLETTER, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}