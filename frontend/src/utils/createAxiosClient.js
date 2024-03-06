import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import API from "./api";

const useAxiosClient = () => {
    const api = API
    const { auth } = useAuth()

    useEffect(() => {
        const requestInterceptor = API.interceptors.request.use((config) =>{
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
            return config
        })
        return () => {
            API.interceptors.request.eject(requestInterceptor)
        }
    }, [auth])
    return api
}

export default useAxiosClient