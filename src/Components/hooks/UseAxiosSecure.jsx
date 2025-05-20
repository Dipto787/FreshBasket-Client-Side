import axios from "axios";

let axiosSecure = axios.create({
    baseURL: 'https://fresh-basket-server-side.vercel.app',
    withCredentials: true
})

const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;