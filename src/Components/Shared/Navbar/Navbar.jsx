import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Pages/Authentication/Provider/AuthProvider";
import { IoCart } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseCart from "../UseCart";
import logo from '../../../assets/logo.png'
const Navbar = () => {
    let { user, logout, setUser } = useContext(AuthContext);
    let [cart] = UseCart();


    const handleLogout = () => {
        logout()
            .then(() => {
                setUser(null);
            });
    };

    return (
        <div className="navbar bg-lime-500 bg-opacity-70 px-9">
            <div className=" w-full border-4 items-center flex">
                <Link className="  text-xl"><img className="w-20 bg-white rounded-full p-1" src={logo} alt="" /></Link>
                <div>
                    <input type="search" placeholder="Search" className="input input-bordered w-full " />
                </div>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10  rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;