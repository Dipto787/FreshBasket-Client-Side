import { createBrowserRouter, Link } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import ShopLayout from "../Pages/Shop/ShopLayout";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import MyCart from "../Pages/Dashboard/MyCart";
import PaymentSystem from "../Pages/Dashboard/PaymentSystem";
import PaymentHistory from "../Pages/PaymentHistory";
import PrivateRoute from "../Pages/Authentication/PrivateRoute";
import errorPage from '../assets/404.png'
import IsAdmin from "../hooks/IsAdmin";
import AllUser from "../Pages/Dashboard/AllUser";
import IsBlocked from "../Components/hooks/IsBlocked";
import Blocked from "../Pages/Blocked";
import AllFruits from "../Components/AllFruits";
import UpdateFruit from "../Components/UpdateFruit";
import AddFruits from "../Components/AddFruits";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>, 
        children: [
            {
                index: true,
                element: <IsBlocked>  <Home></Home></IsBlocked>
            },

            {
                path: '/shop',
                element: <IsBlocked> <PrivateRoute><ShopLayout></ShopLayout></PrivateRoute></IsBlocked>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            // {
            //     path: '/blocked',
            //     element: <IsBlocked><Blocked></Blocked></IsBlocked>
            // }


        ],

    },

    {
        path: '/dashboard',
        element: <IsBlocked> <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute></IsBlocked>,
        children: [
            {
                index: true,
                element: <IsBlocked> <DashboardHome></DashboardHome></IsBlocked>
            },
            {
                path: 'cart',
                element: <IsBlocked> <MyCart></MyCart></IsBlocked>
            },
            {
                path: 'pay',
                element: <IsBlocked><PaymentSystem></PaymentSystem></IsBlocked>
            },
            {
                path: 'history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'all-user',
                element: <IsAdmin><AllUser></AllUser></IsAdmin>
            },
            {
                path: 'all-fruits',
                element: <IsAdmin><AllFruits></AllFruits></IsAdmin>
            },
            {
                path: 'update-fruit/:id',
                element: <IsAdmin><UpdateFruit></UpdateFruit></IsAdmin>
            },
            {
                path: 'add-fruits',
                element: <IsAdmin><AddFruits></AddFruits></IsAdmin>
            }
        ]

    }


])

export default router;