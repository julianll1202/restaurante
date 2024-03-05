import axios from "axios";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const accessToken = Cookies.get('accessToken');
const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'es',
        'Authorization': `Bearer ${accessToken}`,
    },
});

export default API;