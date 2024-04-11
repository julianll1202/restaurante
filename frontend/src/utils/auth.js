import API from "./api";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getRoles = async () => {
    const res = await API.get('roles/listar')
    return res.data
}

export const getRol = async (rolId) => {
    try {
        const res = await API.get(`roles/ver/${Number(rolId)}`)
        return res.data
    } catch (err) {
        return {
            data: null,
            status: 400
        }
    }
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
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    localStorage.clear()
    return res
}

export const isAccessTokenExpired = (accessToken) => {
    try {
      const decodedToken = jwtDecode(accessToken)
      console.log(decodedToken.exp -(Date.now()/1000))
      return (decodedToken.exp -(Date.now()/1000)) <= 700
    } catch (error) {
      return true;
    }
  };


export const setAuthUser = async (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, {
        secure: true
    })

    Cookies.set('refresh_token', refreshToken, {
        expires: 1,
        secure: true
    })
}