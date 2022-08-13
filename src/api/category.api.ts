import { GET_CATEGORIES } from 'configs/url.config';
import http from 'services/http.services';

interface ICategory {
    id: string;
}

export async function AddCategory(category: ICategory) {
    try {
        const response = await http.post(`${GET_CATEGORIES}`, category);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}



export async function EditCategory(category: ICategory) {
    try {
        const response = await http.put(`${GET_CATEGORIES}/${category.id}`, category);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}