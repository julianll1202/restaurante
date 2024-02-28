import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

const MainLayout = () => {
    const isLogged = useContext(UserContext).isLoggedIn;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(isLogged);
        if (!isLogged)
            navigate('/iniciar-sesion');
    });
    return (
        <>
            <Outlet />
        </>
    );
};

export default MainLayout;