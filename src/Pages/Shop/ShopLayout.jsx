import { Link, NavLink, Outlet } from "react-router-dom";
import Shop from "./Shop";
import banner_bg from '../../assets/banner-fruits.jpg'
import AllFruits from "./Nav/AllFruits/AllFruits"; import Categories from "../../Components/Shared/Categories";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
;

const ShopLayout = () => {
    let axiosSecure = UseAxiosSecure();
    let { data: fruits = [] } = useQuery({
        queryKey: ['fruits'],
        queryFn: async () => {
            const { data } = await axiosSecure(`fruit`);
            return data;
        }
    })

    let categories = [];

    fruits.forEach(item => {
        if (item.category && !categories.includes(item.category)) {
            categories.push(item.category);
        }
    }); 
    return (
        <div >
            <Shop></Shop>
            <div className="flex flex-col md:flex-row   max-w-7xl mx-auto gap-16 mt-12">
                <div className=" ml-8 w-72  h-auto">
                    <h1 className="text-2xl font-semibold ">Categories</h1>
                    <div className="flex text-green-500 font-bold flex-col space-y-4 mt-8 ">

                        {
                            categories.map(category => <Categories label={category}></Categories>)
                        }
                    </div>
                    <div className="mt-10 relative ">
                        <h1 className="text-4xl bottom-0 right-0 top-20 text-orange-600 font-bold   absolute">
                            Fresh
                            <br />
                            Fruits
                            <br />
                            Banner</h1>
                        <img className="rounded-xl" src={banner_bg} alt="" />
                    </div>
                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                    <AllFruits></AllFruits>
                </div>

            </div>
        </div>
    );
};

export default ShopLayout;