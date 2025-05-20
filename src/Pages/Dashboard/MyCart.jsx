import React from 'react';
import UseCart from '../../Components/Shared/UseCart';
import UseAxiosSecure from '../../Components/hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
const MyCart = () => {
    let [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    let axiosSecure = UseAxiosSecure();
    let handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let { data } = await axiosSecure.delete(`/cart/${id}`)
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                }
            }
        });

    }
    return (
        <>
            <div className="overflow-x-auto">
                <div className='flex mb-5 items-center justify-evenly'>
                    <h1 className='text-xl font-semibold'>Total Cart : {cart.length}</h1>
                    <h1 className='text-xl font-semibold'>Total Price : {totalPrice.toString().slice(0,3)} </h1>
                    <NavLink to={'/dashboard/pay'} className='btn bg-[#D1A054] text-white font-semibold px-4'>Pay</NavLink>
                </div>
                <table className="table">
                    {/* head */}
                    <thead className=' text-white font-semibold  bg-[#D1A054]'>
                        <tr>
                            <th className='hidden lg:flex'>

                            </th>
                            <th>Name</th>
                            <th className='hidden lg:flex'>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cart.map((carts, index) =>
                                <tr>
                                    <th className='hidden lg:flex' >
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={carts.img}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{carts.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='hidden lg:flex'>
                                        ${carts.price}

                                    </td>
                                    <td><button onClick={() => handleDelete(carts._id)} className='btn '>Cancel</button></td>

                                </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>
        </>
    );

};



export default MyCart;