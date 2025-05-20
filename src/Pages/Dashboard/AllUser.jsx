import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
const AllUser = () => {
    let [isOpen, setIsOpen] = useState(false);
    let { logout, setUser } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();
    let { user: f } = useContext(AuthContext);
    let { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/user');
            return data;
        }
    })



    let handleUserBlocked = async (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Blocked it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/user/block/${e.email}`);
                refetch();
                console.log(data)
                    console.log(users)
                    console.log(e)
                Swal.fire({
                    title: "Blocked!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });



    }

    let handleUnBlock = async (e) => {
        const { data } = await axiosSecure.patch(`/user/unblock/${e.email}`)
        console.log(data)
        Swal.fire({
            title: " Un Blocked!",
            text: "Your file has been deleted.",
            icon: "success"
        });
        refetch();
    }





    let handleRemoveAdmin = async (e) => {
        setIsOpen(true);
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className="hidden lg:flex">#</th>
                        <th className="hidden lg:flex">Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <tr>
                            <th className="hidden lg:flex">{index + 1}</th>
                            <td className="hidden lg:flex">{user.name}</td>
                            <td >{user.email}</td>
                            <td className="space-y-3 lg:space-y-0 flex items-center flex-col lg:flex-row">
                                {
                                    user.blocked === true ?
                                        <button onClick={() => handleUnBlock(user)} className="bg-orange-500 btn text-white  ">UnBlock</button>

                                        :

                                        <button disabled={user.role === 'admin'} onClick={() => handleUserBlocked(user)} className={`btn  bg-red-500  text-white  `}>Block</button>
                                }

                                {
                                    user.role === 'admin' ?
                                        <button onClick={handleRemoveAdmin} disabled={user.email === f.email} className="bg-orange-500 btn ml-2 text-white">Remove From Admin</button> :
                                        <button disabled={user.email === f.email} className={`btn ml-2`}> Make Admin</button>
                                }

                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-slate-600 p-6 backdrop-blur-2xl duration-500 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                sorry!!
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                This Action Not at now for you please try some day later.
                                if you need this action very argent you can message
                                this email 'diptoray292@gmail.com'


                            </p>
                            <div className="mt-4">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"

                                >
                                    Got it, thanks!
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default AllUser;