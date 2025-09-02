import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { TbFidgetSpinner } from 'react-icons/tb';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Components/hooks/UseAxiosSecure';

const Login = () => {
    let { signIn, loading, setLoading } = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();
    let axiosSecure = UseAxiosSecure();
    let from = location?.state;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let onSubmit = async (data) => {
        try {
            let result = await signIn(data.email, data.password);
            Swal.fire({
                title: "Sign in successful!",
                icon: "success",
                draggable: true,
            });
            navigate(from || '/');
        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: err.message,
                icon: "warning",
                draggable: true,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Login to access your account
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Email</label>
                        <input
                            {...register("email", { required: true })}
                            name='email'
                            type="email"
                            className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:outline-none transition"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">This field is required</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">Password</label>
                        <input
                            {...register("password", { required: true })}
                            name='password'
                            type="password"
                            className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 focus:outline-none transition"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">This field is required</span>
                        )}
                    </div>

                    <p className="text-gray-500 text-sm text-center">
                        Don't have an account?{" "}
                        <Link className='text-pink-500 font-semibold underline' to={'/register'}>
                            Register
                        </Link>
                    </p>

                    <button
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:scale-105 transform transition-all flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? <TbFidgetSpinner className='animate-spin text-xl' /> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
