import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const FruitCard = ({ fruit }) => {
    return (
        <Link>
            <div className="bg-white shadow-xl p-4">
                <figure>
                    <img
                        src={fruit.image}
                        className="mx-auto rounded-lg h-52"
                        alt="Shoes" />
                </figure>
                <div className="p-3">
                    <div className="flex justify-between items-center">
                        <h2 className=" text-sm ">{fruit.name} </h2>
                        <h2 className="pt-1"><CiHeart size={22} className="cursor-pointer" /></h2>
                    </div>

                    <div className="flex mt-5 justify-between">
                        <div className="bg-[#388e3c] text-lg px-1 py-0 font-semibold flex items-center gap-1 rounded-sm text-white">
                            <p>{fruit.rating}</p>
                            <p><FaStar /></p>
                        </div>
                        |
                        <div className="italic  text-[#838281]">

                            {fruit.sold} Sold
                        </div>
                    </div>


                    <div className="mt-2 flex gap-2 items-center text-xl font-semibold">
                        <p>${fruit.price}</p>
                        <del className="text-[#838281]"> ${fruit.price*2}</del>
                    </div>

                        <p className="text-[#008000] text-sm mt-1 font-bold">Earn Reward Points on Purchase</p>

                </div>
            </div>
        </Link>
    );
};

export default FruitCard;