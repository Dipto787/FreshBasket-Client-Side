import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Root = () => {
    let location = useLocation();
    let unable = (location?.pathname === '/login') || (location?.pathname === '/register') || (location?.pathname === '/blocked'); 
    return (
        <div style={{ overflowX: 'hidden' }} className="">
            {unable || <Navbar></Navbar>}
            <Outlet></Outlet>
            {unable || <Footer></Footer>}
        </div>
    );
};

export default Root;