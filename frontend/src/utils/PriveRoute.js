import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const PriveRoute = () =>{
    const {user} = useContext(AuthContext)
    return (
        user ? <Outlet /> : <Navigate to="/authentication"/>
    )
}

export default PriveRoute;