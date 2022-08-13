import { REGISTER } from 'configs/url.config';
import http from 'services/http.services';

export async function Register(data: Object) {
    try {
        const response = await http.post(REGISTER, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}