import { useState } from "react";
import UserContext from "./userContext";
import PropTypes from "prop-types";

const GlobalContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const store = (newUser) => {
        setUser(newUser);
    };
    return (
        <UserContext.Provider value={{ user:user, storeUser: store, isLoggedIn: logged, setLoggedState: setLogged }}>
            {children}
        </UserContext.Provider>
    );
};

GlobalContext.propTypes = {
    children: PropTypes.node,
}
export default GlobalContext;