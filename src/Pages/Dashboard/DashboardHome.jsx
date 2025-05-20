import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
 
const DashboardHome = () => {
    let { user } = useContext(AuthContext);
    return (
        <div>
            <h1 className="  text-4xl">Hi, {user?.displayName} </h1>
        </div>
    );
};

export default DashboardHome;