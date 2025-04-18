import axios from "axios"; 
import { useQuery } from "@tanstack/react-query"; 
import { useContext } from "react";
import { AuthContext } from "../../Pages/Authentication/Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";


const UseCart = () => {
    let { user } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();
    let { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            let res = await axiosSecure.get(`/cart?email=${user.email}`);
            return res.data;
        }
    })
    return [cart, refetch];
};

export default UseCart;