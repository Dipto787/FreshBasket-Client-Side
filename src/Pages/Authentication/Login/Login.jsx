
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
    console.log(location)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let onSubmit = async (e) => {
        try {
          

            let result = await signIn(e.email, e.password);
            Swal.fire({
                title: "Sign in success full",
                icon: "success",
                draggable: true
            });
            navigate(from || '/');


        } catch (err) {
            setLoading(false);
            Swal.fire({
                title: err.message,
                icon: "warning",
                draggable: true
            });
        }
    }
    return (
        <div>
            <div className="flex items-center min-h-screen justify-center">

                <div className="card  w-full max-w-md    shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input {...register("email", { required: true })} name='email' type="email" className="input w-full" placeholder="Email" />
                            {errors.email && <span className="text-red-500 font-bold p-2">This field is required</span>}
                            <label className="fieldset-label">Password</label>
                            <input {...register("password", { required: true })} name='password' type="password" className="input w-full" placeholder="Password" />
                            {errors.password && <span className="text-red-500 font-bold p-2">This field is required</span>}
                            <p>don't have an Account? please <Link className='text-blue-600 underline' to={'/register'}>register</Link> </p>
                            <button className="btn bg-rose-500 w-full rounded-md py-3 text-white mt-4"> {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Login'}</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;