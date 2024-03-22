import useAuth from "./useAuth"
import API from './../utils/api';
import { setAuthUser } from "../utils/auth";
import Cookies from 'js-cookie';
const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        console.log(Cookies.get('refresh_token'))
        const res = await API.post('/auth/refresh-token', {
            refreshToken: Cookies.get('refresh_token'),
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(res.data.accessToken)
            return {...prev, accessToken: res.data.accessToken}
        })
        setAuthUser(res.data.accessToken, res.data.refreshToken)
        return res.data.accessToken
    }
    return refresh
}

export default useRefreshToken