import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { TbFidgetSpinner } from 'react-icons/tb';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    let { signUp, loading, setLoading, updateUserProfile } = useContext(AuthContext);
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let onSubmit = async (e) => {
        console.log(e)
        let formData = new FormData();
        formData.append('image', e.photoUrl[0])
        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );


            let result = await signUp(e.email, e.password);
            console.log(result);
            await updateUserProfile(e.name, data.data.display_url);
            Swal.fire({
                title: "Sign up success full",
                icon: "success",
                draggable: true
            });
            navigate('/');


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
        <div className="flex items-center min-h-screen justify-center">

            <div className="card  w-full max-w-md    shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <fieldset className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input {...register("name", { required: true })} name='name' type="text" className="input w-full" placeholder="Name" />
                        {errors.name && <span className="text-red-500 font-bold p-2">This field is required</span>}
                        <label className="fieldset-label">Email</label>
                        <input {...register("email", { required: true })} name='email' type="email" className="input w-full" placeholder="Email" />
                        {errors.email && <span className="text-red-500 font-bold p-2">This field is required</span>}
                        <label className="fieldset-label">Image</label>
                        <input {...register("photoUrl", { required: true })} name='photoUrl' type="file" className="file-input w-full" />
                        {errors.photoUrl && <span className="text-red-500 font-bold p-2">This field is required</span>}
                        <label className="fieldset-label">Password</label>
                        <input {...register("password", { required: true })} name='password' type="password" className="input w-full" placeholder="Password" />
                        {errors.password && <span className="text-red-500 font-bold p-2">This field is required</span>}
                        <p>Already have an Account? please <Link className='text-blue-600 underline' to={'/login'}>Login</Link> </p>
                        <button className="btn bg-rose-500 w-full rounded-md py-3 text-white mt-4"> {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Register'}</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
};

export default Register;