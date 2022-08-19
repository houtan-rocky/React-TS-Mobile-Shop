import { LOGIN, REFRESH_TOKEN_URL } from 'configs/url.config';
import { ACCESS_TOKEN, IS_LOGGED_IN, REFRESH_TOKEN } from 'configs/variables.config';
import http from 'services/http.services';
import { parseJwt } from 'utils/functions.util';

export async function Login(data: Object) {
    try {
        const response = await http.post(LOGIN, data);

        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem(REFRESH_TOKEN, response.data.token);
        localStorage.setItem(IS_LOGGED_IN, true.toString());

        const allUserData = parseJwt(response.data.token);
        allUserData.loggedIn = true;
        allUserData.token = response.data.token;

        localStorage.setItem('userData', JSON.stringify(allUserData));

        return allUserData;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function refreshToken(data: Object) {
    try {
        const response = await http.post(REFRESH_TOKEN_URL, data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}