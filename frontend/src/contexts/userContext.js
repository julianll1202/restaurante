import { createContext } from "react";

const UserContext = createContext({
    user: {},
    storeUser: () => {},
    isLoggedIn: false,
    setLoggedState: () => {},
});

export default UserContext;

