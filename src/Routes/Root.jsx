import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Root = () => {
    let location = useLocation();
    let unable = (location?.pathname === '/Login') || (location?.pathname === '/register') || (location?.pathname === '/blocked');
    return (
        <div style={{ overflowX: 'hidden' }} className="">
            {unable || <div className="bg-blue-600"> <Navbar></Navbar></div>}
            <div className='pt-10 max-w-screen-2xl mx-auto min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            {unable || <Footer></Footer>}
        </div>
    );
};

export default Root;