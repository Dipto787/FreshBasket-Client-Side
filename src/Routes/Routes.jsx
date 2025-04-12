import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import ShopLayout from "../Pages/Shop/ShopLayout";
import AllFruits from "../Pages/Shop/Nav/AllFruits/AllFruits";

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
        

        ],

    },
   
    
])

export default router;