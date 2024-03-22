import useAuth from "./useAuth"
import API from './../utils/api';
import { setAuthUser } from "../utils/auth";
import Cookies from 'js-cookie';
const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const res = await API.post('/auth/refresh-token', {
            refreshToken: Cookies.get('refresh_token'),
        })
        console.log(res.data)
        setAuth({ user: res.data.user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
        setAuthUser(res.data.accessToken, res.data.refreshToken)
        return res.data.accessToken
    }
    return refresh
}

export default useRefreshToken