import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    let Links = <>
        <li><NavLink to='/'> Home</NavLink></li>
        <li><NavLink to='/shop'> Shop</NavLink></li>
        <li><NavLink to='/contact'> Contact</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>


    </>
    return (
        <div className="navbar  ">
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
                <Link to={'/'} className="btn btn-ghost text-xl font-bold shadow-xl text-red-500">FreshBasket</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="bg-orange-400 px-4 py-2 mr-3 rounded text-white hover:border-orange-400 hover:border-2  hover:bg-transparent hover:text-black "><NavLink to='/login'> login</NavLink></button>
                <button className="bg-purple-600   px-4 py-2 rounded text-white "><NavLink to='/register'> register</NavLink></button>
            </div>
        </div>
    );   
};

export default Navbar;