import axios, {AxiosRequestConfig} from "axios";
import { BASE_URL } from "../utils/variables.config";

class HttpService {
    constructor() {
        axios.defaults.baseURL = BASE_URL;
        axios.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
    }

    get(url: string, config: AxiosRequestConfig) {
        return axios.get(url, config);
    }

    post(url: string, data: any, config: AxiosRequestConfig) {
        return axios.post(url, data, config);
    }

    put(url: string, data: any, config: AxiosRequestConfig) {
        return axios.put(url, data, config);
    }

    patch(url: string, data: any, config: AxiosRequestConfig) {
        return axios.patch(url, data, config);
    }

    delete(url: string, config: AxiosRequestConfig) {
        return axios.delete(url, config);
    }

}

export default new HttpService();