import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { FaSpinner } from "react-icons/fa";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let { user, loading } = useContext(AuthContext);
    let location = useLocation();
    console.log(loading)
    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <FaSpinner className="animate-spin text-4xl" />
        </div>
    );

    if (user) return children;
    
  return <Navigate to='/login' state={location.pathname} replace='true' />
};

export default PrivateRoute;