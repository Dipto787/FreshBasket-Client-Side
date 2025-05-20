import { TbFidgetSpinner } from "react-icons/tb";
import UseRole from "./UseRole";
import { Navigate } from "react-router-dom";

const IsAdmin = ({ children }) => {
    let [role, isLoading] = UseRole();
    console.log(role)
    if (isLoading) return
    if (role.admin === 'admin') return children
    return <Navigate to={'/dashboard'}></Navigate>
};

export default IsAdmin;