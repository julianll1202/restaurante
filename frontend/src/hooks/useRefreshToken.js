import useAuth from "./useAuth"
import API from './../utils/api';
import { isAccessTokenExpired, setAuthUser } from "../utils/auth";
import Cookies from 'js-cookie';
const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const accessToken = Cookies.get('access_token')
        if (isAccessTokenExpired(accessToken)) {
            console.log('Access token expired')
            const res = await API.post('/auth/refresh-token', {
                refreshToken: Cookies.get('refresh_token'),
            })
            console.log(res.data)
            setAuth({ user: res.data.user, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken })
            setAuthUser(res.data.accessToken, res.data.refreshToken)
            return res.data.accessToken
        } else {
            return accessToken
        }
    }
    return refresh
}

export default useRefreshToken