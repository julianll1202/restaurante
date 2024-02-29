import { createContext } from "react";

const UserContext = createContext({
    user: {user: {
        username: "",
    }},
    storeUser: () => {},
    isLoggedIn: false,
    setLoggedState: () => {},
});

export default UserContext;

