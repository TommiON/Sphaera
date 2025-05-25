import { AxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants"
import { LoggedUserData } from "../types/LoggedUserData";

export const generateHTTPHeaderWithToken = (): AxiosRequestConfig => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token) {
        const headerLine = 'Bearer '.concat(token);
        return { headers: { Authorization: headerLine } };
    } else {
        return {};
    }
}

export const setupUserInLocalStorage = (userinfo: LoggedUserData) => {
    window.localStorage.setItem('token', userinfo.token);
}

export const wipeCurrentUserFromLocalStorage = () => {
    window.localStorage.removeItem('token');
}