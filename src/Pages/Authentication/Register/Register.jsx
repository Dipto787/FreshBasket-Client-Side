import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Components/hooks/UseAxiosSecure';

const Register = () => {
    let axiosSecure = UseAxiosSecure();
    let { signUp, loading, setLoading, updateUserProfile } = useContext(AuthContext);
    let navigate = useNavigate();
    let [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let onSubmit = async (e) => {
        let formData = new FormData();
        setLoader(true);
        formData.append('image', e.photoUrl[0]);

        try {
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            let result = await signUp(e.email, e.password);
            await updateUserProfile(e.name, data.data.display_url);
            Swal.fire({
                title: "Sign up successful!",
                icon: "success",
                draggable: true,
            }); 
            await axiosSecure.post('/user', { email: e.email, name: e.name });
            setLoader(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setLoader(false);
            Swal.fire({
                title: err.message,
                icon: "warning",
                draggable: true,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign up to get started with your account
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none transition"
                            placeholder="Your name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1">
                                This field is required
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none transition"
                            placeholder="Your email"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                This field is required
                            </span>
                        )}
                    </div>

                    {/* Photo */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Profile Image</label>
                        <input
                            {...register("photoUrl", { required: true })}
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.photoUrl && (
                            <span className="text-red-500 text-sm mt-1">
                                This field is required
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:outline-none transition"
                            placeholder="Your password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">
                                This field is required
                            </span>
                        )}
                    </div>

                    <p className="text-gray-500 text-sm text-center">
                        Already have an account?{" "}
                        <Link className="text-purple-500 font-semibold underline" to="/login">
                            Login
                        </Link>
                    </p>

                    <button
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg hover:scale-105 transform transition-all flex justify-center items-center"
                        disabled={loading}
                    >
                        { loader ? <TbFidgetSpinner className="animate-spin text-xl" /> : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
