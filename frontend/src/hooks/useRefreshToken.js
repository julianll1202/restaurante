import useAuth from "./useAuth"
import API from './../utils/api';
import { isAccessTokenExpired, setAuthUser } from "../utils/auth";
import Cookies from 'js-cookie';
const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const accessToken = Cookies.get('access_token')
        const refreshToken = Cookies.get('access_token')
        console.log(accessToken, refreshToken)
        if (refreshToken) {
            if (isAccessTokenExpired(accessToken)) {
                console.log('Access token expired')
                const res = await API.post('/auth/refresh-token', {
                    refreshToken: refreshToken,
                })
                console.log(res.data)
                setAuth({ user: res.data.user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
                setAuthUser(res.data.accessToken, res.data.refreshToken)
                return res.data.accessToken
            } else {
                return accessToken
            }
        } else {
            return 'No refresh token available'
        }
    }
    return refresh
}

export default useRefreshToken