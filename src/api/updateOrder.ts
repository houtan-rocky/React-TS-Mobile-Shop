import { GET_ORDERS } from "configs/url.config";
import http from 'services/http.services';

export async function addOrder(data: Object) {
    try {
        const response = await http.post(GET_ORDERS, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function updateOrder(orderId: string, data: Object) {
    try {
        const response = await http.put(`${GET_ORDERS}/${orderId}`, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function deleteOrder(orderId: string) {
    try {
        const response = await http.delete(`${GET_ORDERS}/${orderId}`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}