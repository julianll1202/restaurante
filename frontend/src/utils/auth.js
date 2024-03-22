import API from "./api";
import Cookies from 'js-cookie';

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