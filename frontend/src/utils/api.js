import axios from "axios";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const aToken = Cookies.get('access_token');
const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'es',
        Authorization: `Bearer ${aToken}`
    },
});

API.interceptors.request.use((request) => {
    const token = Cookies.get('access_token');
    request.headers['Authorization'] = `Bearer ${token}`;
    return request;
  });
export default API;
