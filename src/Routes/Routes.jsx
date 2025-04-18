import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import ShopLayout from "../Pages/Shop/ShopLayout";
import AllFruits from "../Pages/Shop/Nav/AllFruits/AllFruits";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },

            {
                path:'/shop',
                element:<ShopLayout></ShopLayout>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
        

        ],

    },
   
    
])

export default router;