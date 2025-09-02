import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const AllUser = () => {
    let [isOpen, setIsOpen] = useState(false);
    let { user: f } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();

    let { data: users = [], refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/user");
            return data;
        },
    });

    let handleUserBlocked = async (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to block this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Block user!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/user/block/${e.email}`);
                refetch();
                Swal.fire("Blocked!", "The user has been blocked.", "success");
            }
        });
    };

    let handleUnBlock = async (e) => {
        await axiosSecure.patch(`/user/unblock/${e.email}`);
        Swal.fire("Unblocked!", "The user has been unblocked.", "success");
        refetch();
    };

    let handleRemoveAdmin = async () => {
        setIsOpen(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">All Users</h1>

            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-gray-700">
                    {/* head */}
                    <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-left">
                        <tr>
                            <th className="px-6 py-3 hidden lg:table-cell">#</th>
                            <th className="px-6 py-3 hidden lg:table-cell">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.email}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 hidden lg:table-cell font-medium text-gray-600">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {user.role === "admin" ? (
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-600">
                                            Admin
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                                            User
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 flex flex-col lg:flex-row gap-2">
                                    {user.blocked ? (
                                        <button
                                            onClick={() => handleUnBlock(user)}
                                            className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
                                        >
                                            Unblock
                                        </button>
                                    ) : (
                                        <button
                                            disabled={user.role === "admin"}
                                            onClick={() => handleUserBlocked(user)}
                                            className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium transition ${
                                                user.role === "admin"
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-500 hover:bg-red-600"
                                            }`}
                                        >
                                            Block
                                        </button>
                                    )}

                                    {user.role === "admin" ? (
                                        <button
                                            onClick={handleRemoveAdmin}
                                            disabled={user.email === f.email}
                                            className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium transition ${
                                                user.email === f.email
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-indigo-500 hover:bg-indigo-600"
                                            }`}
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            disabled={user.email === f.email}
                                            className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium transition ${
                                                user.email === f.email
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-500 hover:bg-green-600"
                                            }`}
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dialog */}
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => setIsOpen(false)}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl duration-300 ease-out"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-lg font-bold text-gray-800"
                            >
                                Action Not Allowed 🚫
                            </DialogTitle>
                            <p className="mt-2 text-sm text-gray-600">
                                Sorry! This action is currently restricted. If you
                                urgently need this feature, please contact support at{" "}
                                <span className="font-medium text-purple-600">
                                    diptoray292@gmail.com
                                </span>
                                .
                            </p>
                            <div className="mt-4">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 transition"
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
