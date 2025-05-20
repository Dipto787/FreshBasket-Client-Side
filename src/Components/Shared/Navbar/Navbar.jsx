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

    let Links = <>
        <li><NavLink
            to='/'
            className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded-md transition-colors cursor-pointer ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`
            }
            smooth={true}
            duration={500}
            spy={true}
            offset={-50}  // Adjust for fixed navbar
            activeClass="text-orange-500 font-bold border-b-2 border-orange-500"
        > Home</NavLink></li>
        <li><NavLink
            to='/shop'
            className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-4 rounded-md transition-colors cursor-pointer ${isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`
            }
            smooth={true}
            duration={500}
            spy={true}
            offset={-50}  // Adjust for fixed navbar
            activeClass="text-orange-500 font-bold border-b-2 border-orange-500"
        > Shop</NavLink></li>
        <li><NavLink to='/contact'> Contact</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        <li className="relative"><NavLink to='dashboard/cart'><IoCart size={28} /><span className="absolute top-0 left-10 bg-red-600 rounded-full px-2 py-0.50  font-bold">{cart.length}</span></NavLink></li>


    </>

    const handleLogout = () => {
        logout()
            .then(() => {
                setUser(null);
            });
    };

    return (
        <div className="fixed bg-opacity-30  shadow-xl  text-black md:text-white w-full z-10 bg-[#3d348b]">
            <div className="navbar  max-w-7xl mx-auto flex justify-between px-4 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {Links}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn  w-32 bg-white  text-xl font-bold shadow-xl text-red-500"><img src={logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {Links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content text-black font-semibold bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow">

                                    <li><NavLink to={'dashboard'}>Dashboard</NavLink></li>
                                    <li><NavLink to={'/profile'}>My Profile</NavLink></li>
                                    <li onClick={handleLogout}><NavLink>Logout</NavLink></li>
                                </ul>
                            </div>
                        </div> : <div><button className="bg-orange-400 px-4 py-2 mr-3 rounded text-white hover:border-orange-400 hover:border-2  hover:bg-transparent hover:text-black "><NavLink to='/login'> login</NavLink></button>
                            <button className="bg-purple-600   px-4 py-2 rounded text-white "><NavLink to='/register'> register</NavLink></button></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;