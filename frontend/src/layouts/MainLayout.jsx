// import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from './../hooks/useAuth';

const MainLayout = () => {
    const { auth } = useAuth()
    const location = useLocation()
    return (
        auth?.user ? <Outlet /> : <Navigate to="/iniciar-sesion"  state={{ from: location }} replace/>
    );
};

export default MainLayout;