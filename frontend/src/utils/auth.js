import API from "./api";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getRoles = async () => {
    const res = await API.get('roles/listar')
    return res.data
}
export const login = async(username, password) => {
    const res = await API.post('users/login', {
        username: username, password: password
    })
    setAuthUser(res.data.accessToken, res.data.refreshToken)
    return res;
}

export const logout = async () => {
    const res = await API.post('users/logout')
    return res
}

export const isAccessTokenExpired = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      return decodedToken.exp <= (Date.now() / 10000);
    } catch (error) {
      return true;
    }
  };


export const setAuthUser = async (accessToken, refreshToken) => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    Cookies.set('access_token', accessToken, {
        expires: 1,
        secure: true
    })

    Cookies.set('refresh_token', refreshToken, {
        expires: 1,
        secure: true
    })
}