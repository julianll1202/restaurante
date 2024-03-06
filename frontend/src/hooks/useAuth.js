import { useContext } from "react"
import AuthContext from "../contexts/AuthProvider"

const useAuth = () => {
    // const { auth } = useContext(AuthContext)
    // useDebugValue(auth, auth => auth?.user ? "Logged in" : "Logged out")
    return useContext(AuthContext)
}

export default useAuth