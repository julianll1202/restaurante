import API from "./api";
import Cookies from 'js-cookie';

export const login = async(username, password) => {
    const res = await API.post('users/login', {
        username: username, password: password
    })
    setAuthUser(res.data.accessToken, res.data.refreshToken)
    return res;
}

export const prueba = async () => {
    const res = await API.get('/')
    return res;
}

export const setAuthUser = async (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, {
        expires: 1,
        secure: true
    })

    Cookies.set('refresh_token', refreshToken, {
        expires: 1,
        secure: true
    })
}