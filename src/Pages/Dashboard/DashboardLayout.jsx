import React, { useState } from 'react';
import { FaAmazonPay, FaCartPlus, FaHome, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { MdEmail, MdOutlineRateReview } from 'react-icons/md';
import { VscError } from 'react-icons/vsc';
import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../../hooks/UseRole';
import { GiFruitBowl } from 'react-icons/gi';
import { IoIosAddCircle } from 'react-icons/io';
import { RiHomeOfficeFill } from 'react-icons/ri';
import { FaHouseChimneyUser } from 'react-icons/fa6';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, isLoading] = useRole();

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Mobile Menu Button */}
            <div>
                {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="lg:hidden ml-4 mt-3">
                        <IoMenu size={20} />
                    </button>
                )}
            </div>

            {/* Sidebar */}
            <div
                className={`bg-[#f2e9e4] z-30 duration-300 min-h-screen
          ${isOpen ? 'fixed left-0 top-0 w-60' : 'fixed -left-64 top-0 w-60'} 
          lg:relative lg:left-0 lg:top-auto lg:w-64`}
            >
                <div className="text-right p-2">
                    <button onClick={() => setIsOpen(false)} className="lg:hidden">
                        <VscError size={24} />
                    </button>
                </div>
                 

                {role.admin === 'admin' ? (
                    <ul onClick={() => setIsOpen(false)} className="menu p-4 space-y-3">
                        <li>
                            <NavLink to="/dashboard" end
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <RiHomeOfficeFill size={22} /> Admin Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/all-user"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <FaUsers size={22} /> All user
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/all-fruits"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <GiFruitBowl size={22} /> All Fruits
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-fruits"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <IoIosAddCircle size={22} /> Add Fruits
                            </NavLink>
                        </li>
                    </ul>
                ) : (
                    <ul onClick={() => setIsOpen(false)} className="menu p-4 space-y-3">
                        <li>
                            <NavLink to="/dashboard" end
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <FaHouseChimneyUser size={22} /> User Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/cart"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <FaCartPlus size={22} /> My Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/add-review"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <MdOutlineRateReview size={22} /> Add a Review
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/history"
                                className={({ isActive }) => isActive ? "text-rose-600 font-bold" : ""}>
                                <FaAmazonPay size={22} /> Payment History
                            </NavLink>
                        </li>
                    </ul>
                )}

                <div className="border-black border-b-2"></div>

                <ul onClick={() => setIsOpen(false)} className="menu p-4 space-y-3">
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/shop"><FaShoppingCart /> Shop now</NavLink></li>
                    <li><NavLink to="/contact"><MdEmail /> Contact</NavLink></li>
                </ul>
            </div>

            {/* Main Content */}
            <div onClick={() => setIsOpen(false)} className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
