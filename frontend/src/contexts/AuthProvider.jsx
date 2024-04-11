import { createContext, useState } from "react";
import { PropTypes } from 'prop-types';


const AuthContext = createContext({})

export const  AuthProvider = ({ children }) => {
    const [ auth, setAuth] = useState({})
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || 'false');
    const [canEdit, setCanEdit] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, canEdit, setCanEdit }} >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthContext