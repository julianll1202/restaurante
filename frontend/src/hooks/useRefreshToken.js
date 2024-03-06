import useAuth from "./useAuth"
import API from './../utils/api';

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const res = await API.get('/refresh-token', {
            withCredentials: true
        })
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log(res.data.accessToken)
            return {...prev, accessToken: res.data.accessToken}
        })
        return res.data.accessToken
    }
    return refresh
}

export default useRefreshToken