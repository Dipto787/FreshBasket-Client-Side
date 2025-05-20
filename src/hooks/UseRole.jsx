import { useContext } from "react"; 
import { AuthContext } from "../Pages/Authentication/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Components/hooks/UseAxiosSecure";


const useRole = () => {
    let axiosSecure = UseAxiosSecure();
    let { user, loading } = useContext(AuthContext); 
    let { data: role = '', isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading,
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/user/admin/${user?.email}`)
            return data;
        }
    })
console.log(role)
    return [role, isLoading];

};

export default useRole;