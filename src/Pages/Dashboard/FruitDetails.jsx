import { useContext, useState } from "react";
import { Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import toast from "react-hot-toast";
import useRole from "../../hooks/UseRole";


const FruitDetails = () => {
    let axiosSecure = UseAxiosSecure();
    let [role] = useRole();
    const [kg, setKg] = useState(1);
    let { user } = useContext(AuthContext);
    let navigate = useNavigate();
    let handleAddToCart = async (cart) => {
        if (!user) {
            return navigate('/Login')
        }
        let cartDetails = {
            name: cart.name,
            image: cart.image,
            price: cart.price,
            email: user?.email,
            kg

        }

        let { data } = await axiosSecure.post('/cart', cartDetails);
        toast.success('Cart added Success')



    }
    let params = useParams();
    console.log(params.id)
    let { data: fruit = [] } = useQuery({
        queryKey: ['fruits'],
        queryFn: async () => {
            let { data } = await axiosSecure.get(`/fruits/${params.id}`);
            return data;
        }
    })




    return (
        <div className="w-full bg-white p-6">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left - Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={fruit.image}
                        alt={fruit.name}
                        className="w-full max-w-md rounded-xl border shadow"
                    />
                </div>

                {/* Right - Info */}
                <div>
                    {/* Title */}
                    <h1 className="text-3xl font-bold">{fruit.name}</h1>

                    {/* Category + Brand */}
                    <div className="mt-2 space-y-1">
                        <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Category:</span>{" "}
                            {fruit.category}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium text-gray-900">Brand:</span>{" "}
                            {fruit.brand}
                        </p>
                    </div>

                    {/* Rating & Sold */}
                    <div className="flex items-center mt-3 text-yellow-500">
                        <Star className="w-5 h-5 fill-yellow-400" />
                        <span className="ml-1 text-gray-700">{fruit.rating} ★</span>
                        <span className="ml-3 text-gray-500">({fruit.sold} sold)</span>
                    </div>

                    {/* Price */}
                    <div className="mt-5">
                        <p className="text-gray-700 font-medium">Price</p>
                        <p className="text-3xl font-bold text-green-600">
                            ${fruit.price}{" "}
                            <span className="text-lg text-gray-600">/{fruit.unit}</span>
                        </p>
                    </div>

                    {/* Quantity input */}
                    <div className="mt-4">
                        <label className="text-gray-600 text-sm font-medium">KG:</label>
                        <input
                            type="number"
                            min="1"
                            value={kg}
                            onChange={(e) => setKg(e.target.value)}
                            className="ml-2 w-24 border rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Free Shipping */}
                    {fruit.free_shipping && (
                        <p className="mt-3 text-sm text-green-500 font-semibold">
                            ✔ Free Shipping Available
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button onClick={() => handleAddToCart(fruit)} disabled={role.admin === 'admin'} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom - Details */}
            <div className="mt-10 border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">Product Details</h2>
                <p className="text-gray-700 leading-relaxed">{fruit.details}</p>
            </div>
        </div>
    );
};

export default FruitDetails;