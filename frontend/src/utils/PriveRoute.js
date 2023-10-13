import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const PriveRoute = () => {
    const { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return <Outlet />;
  };

export default PriveRoute;