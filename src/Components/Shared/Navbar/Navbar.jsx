import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Pages/Authentication/Provider/AuthProvider";
import { IoCart } from "react-icons/io5";
import UseCart from "../UseCart";
import logo from '../../../assets/logo.png';
import useRole from "../../../hooks/UseRole";

const Navbar = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [cart] = UseCart();
  let [role] = useRole();
  const handleLogout = () => {
    logout().then(() => setUser(null));
  };

  return (
    <nav className="  px-6 py-2 max-w-screen-2xl mx-auto  flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-20 rounded-full bg-white p-1" />
      </Link>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg
            className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        {/* Wishlist / Compare / Cart */}
        <IoCart className="text-white  relative text-2xl  cursor-pointer" />
        <span className="bg-red-500 absolute top-5  text-white text-xs rounded-full px-1">
          {cart?.length || 0}
        </span>

        {/* User Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white shadow rounded-box mt-3 w-40 p-2"
            >
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>

              {
               ! role.admin === 'admin'&&
                <li>
                  <Link to={'/dashboard/userHome'}>Dashboard</Link>
                </li>}
           { 
            role.admin === 'admin'&&  <li>
                <Link to={'/dashboard/adminHome'}>Dashboard</Link>
              </li>}
            </ul>
          </div>
        ) : (
          <div className="text-white flex gap-2">
            <Link to="/Login">Sign In</Link> | <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
