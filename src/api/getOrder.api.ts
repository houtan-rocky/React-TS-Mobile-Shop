import { GET_ORDERS } from 'configs/url.config';
import http from 'services/http.services';

export async function getOrders() {
    try {
        const response = await http.get(GET_ORDERS);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function getOrder(id: string) {
    try {
        const response = await http.get(`${GET_ORDERS}/${id}`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deleteOrder(id: string) {
    try {
        const response = await http.get(`${GET_ORDERS}/${id}`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}