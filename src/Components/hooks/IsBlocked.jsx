import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Pages/Authentication/Provider/AuthProvider";

const IsBlocked = ({ children }) => {
    let axiosSecure = UseAxiosSecure();
    let navigate = useNavigate();
    let { user: userSecund } = useContext(AuthContext);
    let { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/user')
            return data;
        },
        enabled: !!userSecund?.email,
    })



    useEffect(() => {
        if (!isLoading && users.length > 0 && userSecund?.email) {
            const currentUser = users.find(user => user.email === userSecund.email);
            if (currentUser?.blocked === true) {
                navigate('/blocked');
            }
         
        }
    }, [users, isLoading, navigate, userSecund]);

    if (isLoading) return;

    return children;

};

export default IsBlocked;