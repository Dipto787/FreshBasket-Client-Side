import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./hooks/UseAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { fromJSON } from "postcss";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateFruit = () => {
    const axiosSecure = UseAxiosSecure();
    const { id } = useParams();
    console.log("Fruit ID from URL:", id);
    let navigate = useNavigate();

    const { data: fruit, isLoading, refetch } = useQuery({
        queryKey: ['fruit', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/fruits/${id}`);
            return data;
        },
        enabled: !!id,
    });

    if (isLoading) return <p>Loading...</p>;

    if (!fruit) return <p>Fruit not found.</p>;
    let handleUpdateItem = async (e) => {
        e.preventDefault();
        let form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        let details = form.details.value;
        let category = form.category.value;
        const photoInput = form.photoUrl;
        let imageUrl = fruit.img;
        if (photoInput.files.length > 0) {
            const formData = new FormData();
            formData.append('image', photoInput.files[0]);

            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            imageUrl = data.data.url;
        }
        let updateData = {
            name,
            price,
            details,
            category,
            image: imageUrl
        }

        let { data: result } = await axiosSecure.put(`/fruits/${id}`, updateData);
        toast.success('Updated Success')
        navigate('/dashboard/all-fruits')
        refetch();
        console.log(result);

    }

    return (
        <div className='w-full lg:px-16 min-h-[calc(100vh-40px)] flex flex-col justify-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleUpdateItem}>
                <div className='lg:grid space-y-4 px-4 grid-cols-2 gap-10'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='title' className='block text-gray-600'>
                            Title
                        </label>
                        <input
                            defaultValue={fruit.name}
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='name'
                            id='title'
                            type='text'
                            placeholder='Title'
                            required
                        />
                    </div>

                    <div className='space-y-1 text-sm'>
                        <label htmlFor='category' className='block text-gray-600'>
                            Category
                        </label>
                        <select
                            required
                            className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                            name='category'
                            defaultValue={fruit.category}
                        >
                            <option value='fruit'> Banana</option>
                            <option value='dry'>Apple</option>
                            <option value='tropical'>    Strawberry</option>
                            <option value='tropical'>    Orange</option>
                        </select>
                    </div>

                    <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                        <div className='px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                            <div className='flex flex-col w-max mx-auto text-center'>
                                <label>
                                    <input type="file" name="photoUrl" className="file-input file-input-ghost" />

                                </label>
                                <div className='mt-2'>
                                    <p className="text-sm text-gray-600">Previously uploaded image:</p>
                                    <img src={fruit.img} alt="Current" className="w-32 h-32 object-cover border rounded mt-1" />
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='space-y-1 text-sm'>
                        <label htmlFor='price' className='block text-gray-600'>
                            Price
                        </label>
                        <input
                            defaultValue={fruit.price}
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='price'
                            id='price'
                            type='number'
                            placeholder='Price'
                            required
                        />
                    </div>

                    <div className='space-y-1 col-span-2 text-sm'>
                        <label htmlFor='description' className='block text-gray-600'>
                            Description
                        </label>

                        <textarea
                            defaultValue={fruit.description}
                            id='description'
                            className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                            name='details'
                        ></textarea>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateFruit;
