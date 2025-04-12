import { useEffect, useState } from "react";
import { IoBag } from "react-icons/io5";
import ReactStarsRating from 'react-awesome-stars-rating';
import UseAxiosSecure from "../../../../Components/hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
const AllFruits = () => { 
    let axiosSecure = UseAxiosSecure();
    let [params, setParams] = useSearchParams();
    let category = params.get('category');
    console.log(category);
    let { data: fruits = [] } = useQuery({
        queryKey: ['fruits',category],
        queryFn: async () => {
            const { data } =  await axiosSecure(`fruits?category=${category}`);
            return data;
        }
    })

    console.log(fruits)
    return (
        <div>
            <div className="grid px-2 md:px-0 grid-cols-1 md:grid-cols-2 mb-8 gap-4">
                {
                    fruits.map(fruit => <div className="border-2   border-orange-500 flex flex-col p-2 rounded-xl">
                        <figure className="relative">
                            <div>
                                <span className="absolute bg-[#ffb524] top-2 px-2 py-1 rounded-xl text-white font-bold text-center   right-40">{fruit.category}</span>
                            </div>
                            <img className="h-64 w-full hover:scale-105 hover:rounded-xl  duration-150"
                                src={fruit.img}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{fruit.name}</h2>
                            <p>{fruit.description}</p>
                            <div className="flex gap-0 ">
                                <p className="text-xl font-semibold">{fruit.price} $</p>
                                <ReactStarsRating className='flex' value={fruit.rating} />
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn bg-blue-500  border-none btn-primary flex-grow"> <IoBag /> Add To Cart </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllFruits;